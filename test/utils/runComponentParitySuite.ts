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
      const officialResult = mjml2html(mjml, {
        filePath: variantDirectory,
        keepComments: true,
        minify: false,
        validationLevel: 'strict',
      })

      expect(officialResult.errors).toHaveLength(0)

      const renderResult = await renderVjmlToHtml(component)
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