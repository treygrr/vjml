import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import mjml2html from 'mjml'
import type { Component } from 'vue'
import { describe, expect, it } from 'vitest'

import { renderVjmlToHtml } from 'vjml'

import { normalizeEmailHtml } from './normalizeEmailHtml'

export interface ComponentParityVariant {
  component: Component
  mjml: string
  name: string
}

function hashSeed(value: string): number {
  let hash = 2166136261

  for (const character of value) {
    hash ^= character.charCodeAt(0)
    hash = Math.imul(hash, 16777619)
  }

  return hash >>> 0
}

function createSeededRandom(seed: string): () => number {
  let state = hashSeed(seed)

  return () => {
    state += 0x6D2B79F5

    let mixed = Math.imul(state ^ (state >>> 15), 1 | state)

    mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), 61 | mixed)

    return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296
  }
}

async function withDeterministicMathRandom<T>(
  seed: string,
  callback: () => T | Promise<T>,
): Promise<T> {
  const originalRandom = Math.random

  Math.random = createSeededRandom(seed)

  try {
    return await callback()
  }
  finally {
    Math.random = originalRandom
  }
}

function ensureTrailingNewline(value: string): string {
  return value.endsWith('\n') ? value : `${value}\n`
}

function writeComponentParitySnapshots(
  componentDirectory: string,
  variantName: string,
  officialHtml: string,
  renderedHtml: string,
): {
  normalizedOfficialHtml: string
  normalizedRenderedHtml: string
} {
  const snapshotDirectory = resolve(
    process.cwd(),
    componentDirectory,
    'snapshots',
    variantName,
  )
  const normalizedOfficialHtml = normalizeEmailHtml(officialHtml)
  const normalizedRenderedHtml = normalizeEmailHtml(renderedHtml)

  mkdirSync(snapshotDirectory, { recursive: true })

  writeFileSync(
    resolve(snapshotDirectory, 'mjml.html'),
    ensureTrailingNewline(officialHtml),
  )
  writeFileSync(
    resolve(snapshotDirectory, 'vjml.html'),
    ensureTrailingNewline(renderedHtml),
  )
  writeFileSync(
    resolve(snapshotDirectory, 'mjml.normalized.html'),
    ensureTrailingNewline(normalizedOfficialHtml),
  )
  writeFileSync(
    resolve(snapshotDirectory, 'vjml.normalized.html'),
    ensureTrailingNewline(normalizedRenderedHtml),
  )

  return {
    normalizedOfficialHtml,
    normalizedRenderedHtml,
  }
}

export function runComponentParitySuite(
  componentName: string,
  componentDirectory: string,
  variants: readonly ComponentParityVariant[],
) {
  const variantDirectory = resolve(process.cwd(), componentDirectory)

  describe(`${componentName} HTML parity`, () => {
    it.each(variants)('$name matches official MJML output', async ({ component, mjml, name }) => {
      const randomSeed = `${componentName}:${name}`
      const officialResult = await withDeterministicMathRandom(randomSeed, () => {
        return mjml2html(mjml, {
          filePath: variantDirectory,
          keepComments: true,
          minify: false,
          validationLevel: 'strict',
        })
      })

      expect(officialResult.errors).toHaveLength(0)

      const renderResult = await withDeterministicMathRandom(
        randomSeed,
        () => renderVjmlToHtml(component),
      )
      const renderErrors = renderResult.issues.filter(
        issue => issue.severity === 'error',
      )
      const snapshots = writeComponentParitySnapshots(
        componentDirectory,
        name,
        officialResult.html,
        renderResult.html,
      )

      expect(renderErrors).toHaveLength(0)
      expect(snapshots.normalizedRenderedHtml).toBe(
        snapshots.normalizedOfficialHtml,
      )
    })
  })
}