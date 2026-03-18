import { createApp, nextTick, type Component } from 'vue'

import type {
  VjmlDebugDocumentState,
  VjmlDebugNode,
  VjmlDebugRenderResult,
  VjmlFontMap,
  VjmlRuntimeConfig,
  VjmlValidationIssue,
  VjmlValidationSeverity,
} from '../../vjml'
import { registerVjmlComponents } from '../../plugin'

import {
  VJML_BODY_RENDER_CONTEXT_KEY,
  VJML_DOCUMENT_CONTEXT_KEY,
  VJML_HEAD_COLLECTION_CONTEXT_KEY,
  VJML_RUNTIME_CONFIG_KEY,
  VJML_VALIDATION_REPORTER_KEY,
  createVjmlBodyRenderContext,
  createVjmlDocumentContext,
  createVjmlHeadCollectionContext,
  type VjmlDocumentState,
  type VjmlValidationReporter,
} from './context'
import { finalizeVjmlHtmlInBrowser } from './browserDocument'

function cloneNestedRecord(
  record: Record<string, Record<string, string>>,
): Record<string, Record<string, string>> {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [key, { ...value }]),
  )
}

function resolveBreakpointAwareValue(
  value: string | ((breakpoint: string) => string),
  breakpoint: string,
): string {
  return typeof value === 'function' ? value(breakpoint) : value
}

function serializeDocumentState(
  documentState: VjmlDocumentState,
): VjmlDebugDocumentState {
  const breakpoint = documentState.breakpoint

  return {
    backgroundColor: documentState.backgroundColor,
    beforeDoctype: [...documentState.beforeDoctype],
    breakpoint,
    classes: cloneNestedRecord(documentState.classes),
    classesDefault: cloneNestedRecord(documentState.classesDefault),
    componentsHeadStyle: documentState.componentsHeadStyle.map((styleValue) => {
      return resolveBreakpointAwareValue(styleValue, breakpoint)
    }),
    defaultAttributes: cloneNestedRecord(documentState.defaultAttributes),
    dir: documentState.dir,
    fonts: { ...documentState.fonts },
    forceOWADesktop: documentState.forceOWADesktop,
    headRaw: [...documentState.headRaw],
    headStyle: Object.fromEntries(
      Object.entries(documentState.headStyle).map(([identifier, styleValue]) => {
        return [identifier, resolveBreakpointAwareValue(styleValue, breakpoint)]
      }),
    ),
    htmlAttributes: cloneNestedRecord(documentState.htmlAttributes),
    inlineStyle: [...documentState.inlineStyle],
    lang: documentState.lang,
    mediaQueries: { ...documentState.mediaQueries },
    preview: documentState.preview,
    printerSupport: documentState.printerSupport,
    style: documentState.style.map((styleValue) => {
      return resolveBreakpointAwareValue(styleValue, breakpoint)
    }),
    title: documentState.title,
    wrapWithDocument: documentState.wrapWithDocument,
  }
}

function createValidationIssue(
  code: string,
  message: string,
  severity: VjmlValidationSeverity,
  extras: Partial<Pick<VjmlValidationIssue, 'path' | 'tagName'>> = {},
): VjmlValidationIssue {
  return {
    code,
    message,
    severity,
    ...extras,
  }
}

function formatValidationIssue(issue: VjmlValidationIssue): string {
  return `[${issue.severity}] ${issue.code}: ${issue.message}`
}

function getStructuralSeverity(config: VjmlRuntimeConfig): VjmlValidationSeverity {
  return config.render.mode === 'strict' ? 'error' : 'warning'
}

function createVjmlValidationReporter(
  config: VjmlRuntimeConfig,
): VjmlValidationReporter {
  const issues: VjmlValidationIssue[] = []

  const report = (issue: VjmlValidationIssue) => {
    if (config.render.validation === 'off') {
      return
    }

    issues.push(issue)
  }

  return {
    issues,
    report,
    reportInvalidChild(parentTagName, childTagName, allowedChildTagNames) {
      report(
        createValidationIssue(
          'invalid-child',
          `'${childTagName}' is not valid inside '${parentTagName}'. Allowed children: ${allowedChildTagNames.join(', ')}.`,
          getStructuralSeverity(config),
          { tagName: childTagName },
        ),
      )
    },
    reportInvalidParent(childTagName, actualParentTagName, allowedParentTagNames) {
      report(
        createValidationIssue(
          'invalid-parent',
          `'${childTagName}' requires one of these parents: ${allowedParentTagNames.join(', ')}. Received ${actualParentTagName ?? 'no parent'}.`,
          getStructuralSeverity(config),
          { tagName: childTagName },
        ),
      )
    },
  }
}

function fontMapsMatch(
  actualFonts: VjmlFontMap,
  expectedFonts: VjmlFontMap,
): boolean {
  const actualEntries = Object.entries(actualFonts)
  const expectedEntries = Object.entries(expectedFonts)

  if (actualEntries.length !== expectedEntries.length) {
    return false
  }

  return actualEntries.every(([fontName, href]) => expectedFonts[fontName] === href)
}

function hasDocumentShellContributions(
  documentState: VjmlDocumentState,
  config: VjmlRuntimeConfig,
): boolean {
  return documentState.backgroundColor.length > 0
    || documentState.beforeDoctype.length > 0
    || documentState.breakpoint !== config.render.breakpoint
    || Object.keys(documentState.classes).length > 0
    || Object.keys(documentState.classesDefault).length > 0
    || documentState.componentsHeadStyle.length > 0
    || Object.keys(documentState.defaultAttributes).length > 0
    || documentState.dir !== 'auto'
    || !fontMapsMatch(documentState.fonts, config.render.fonts)
    || documentState.forceOWADesktop
    || documentState.headRaw.length > 0
    || Object.keys(documentState.headStyle).length > 0
    || Object.keys(documentState.htmlAttributes).length > 0
    || documentState.inlineStyle.length > 0
    || documentState.lang !== 'und'
    || Object.keys(documentState.mediaQueries).length > 0
    || documentState.preview.length > 0
    || documentState.printerSupport
    || documentState.style.length > 0
    || documentState.title.length > 0
}

function collectDocumentContextIssues(
  documentState: VjmlDocumentState,
  config: VjmlRuntimeConfig,
): VjmlValidationIssue[] {
  if (config.render.validation === 'off') {
    return []
  }

  const issues: VjmlValidationIssue[] = []

  if (!documentState.wrapWithDocument && hasDocumentShellContributions(documentState, config)) {
    issues.push(
      createValidationIssue(
        'document-shell-not-enabled',
        'Document-level data was collected during render, but no VJML document shell was enabled. Add a root document component before relying on head or body collectors.',
        getStructuralSeverity(config),
      ),
    )
  }

  return issues
}

function assertValidationIssues(
  issues: readonly VjmlValidationIssue[],
  config: VjmlRuntimeConfig,
) {
  if (config.render.validation !== 'strict' || issues.length === 0) {
    return
  }

  throw new Error(`VJML render validation failed:\n${issues.map(formatValidationIssue).join('\n')}`)
}

function isMeaningfulTextNode(node: Node): node is Text {
  return node.nodeType === Node.TEXT_NODE && node.textContent?.trim().length !== 0
}

function isCommentNode(node: Node): node is Comment {
  return node.nodeType === Node.COMMENT_NODE
}

function isElementNode(node: Node): node is Element {
  return node.nodeType === Node.ELEMENT_NODE
}

function parseRenderedHtml(html: string): Node[] {
  const trimmedHtml = html.trim()

  if (!trimmedHtml) {
    return []
  }

  if (typeof DOMParser === 'undefined' || typeof document === 'undefined') {
    return []
  }

  if (/^(<!doctype html>|<html\b)/i.test(trimmedHtml)) {
    const parsedDocument = new DOMParser().parseFromString(
      trimmedHtml.replace(/^\s*<!doctype html>\s*/i, ''),
      'text/html',
    )

    return Array.from(parsedDocument.childNodes)
  }

  const template = document.createElement('template')
  template.innerHTML = trimmedHtml

  return Array.from(template.content.childNodes)
}

function toDebugNode(node: Node): VjmlDebugNode | null {
  if (isElementNode(node)) {
    return {
      type: 'element',
      tagName: node.tagName.toLowerCase(),
      attributes: Object.fromEntries(
        Array.from(node.attributes).map(attr => [attr.name, attr.value]),
      ),
      children: Array.from(node.childNodes).map(toDebugNode).filter((value): value is VjmlDebugNode => value !== null),
    }
  }

  if (isCommentNode(node)) {
    return {
      type: 'comment',
      value: node.data,
    }
  }

  if (isMeaningfulTextNode(node)) {
    return {
      type: 'text',
      value: node.textContent ?? '',
    }
  }

  return null
}

function buildVjmlDebugTree(html: string): VjmlDebugNode[] {
  return parseRenderedHtml(html)
    .map(toDebugNode)
    .filter((value): value is VjmlDebugNode => value !== null)
}

function collectRenderedHtmlIssues(
  html: string,
  config: VjmlRuntimeConfig,
): VjmlValidationIssue[] {
  if (config.render.validation === 'off') {
    return []
  }

  const issues: VjmlValidationIssue[] = []
  const trimmedHtml = html.trim()

  if (!trimmedHtml) {
    issues.push(
      createValidationIssue(
        'empty-output',
        'Rendered HTML is empty.',
        'error',
      ),
    )

    return issues
  }

  if (trimmedHtml.includes('<!--[-->') || trimmedHtml.includes('<!--]-->')) {
    issues.push(
      createValidationIssue(
        'vue-fragment-artifact',
        'Rendered HTML includes Vue fragment markers. VJML output should render concrete email HTML without SSR fragment comments.',
        getStructuralSeverity(config),
      ),
    )
  }

  if (config.render.minify) {
    issues.push(
      createValidationIssue(
        'minify-not-implemented',
        'Minify was requested, but the current render pipeline intentionally leaves output unminified until an email-safe minification pass exists.',
        'warning',
      ),
    )
  }

  if (config.render.mode === 'strict') {
    const meaningfulRootNodes = parseRenderedHtml(trimmedHtml).filter(node =>
      isElementNode(node) || isCommentNode(node) || isMeaningfulTextNode(node),
    )

    if (meaningfulRootNodes.length > 1) {
      issues.push(
        createValidationIssue(
          'multiple-root-nodes',
          'Strict parity mode expects a single meaningful root node in the rendered email fragment.',
          'error',
        ),
      )
    }

    if (meaningfulRootNodes.some(isMeaningfulTextNode)) {
      issues.push(
        createValidationIssue(
          'root-text-node',
          'Strict parity mode does not allow non-empty text nodes at the fragment root.',
          'error',
        ),
      )
    }
  }

  return issues
}

export async function renderVjmlInBrowserWithDiagnostics(
  component: Component,
  config: VjmlRuntimeConfig,
  props: Record<string, unknown> = {},
): Promise<VjmlDebugRenderResult> {
  if (typeof document === 'undefined') {
    throw new Error('VJML browser rendering requires DOM APIs.')
  }

  const runtimeConfig = Object.freeze(config)
  const validationReporter = createVjmlValidationReporter(runtimeConfig)
  const documentContext = createVjmlDocumentContext(runtimeConfig)
  const bodyRenderContext = createVjmlBodyRenderContext(documentContext)
  const headCollectionContext = createVjmlHeadCollectionContext(documentContext)
  const container = document.createElement('div')
  const app = createApp(component, props)

  registerVjmlComponents(app, runtimeConfig.prefix, true)
  app.provide(VJML_RUNTIME_CONFIG_KEY, runtimeConfig)
  app.provide(VJML_DOCUMENT_CONTEXT_KEY, documentContext)
  app.provide(VJML_BODY_RENDER_CONTEXT_KEY, bodyRenderContext)
  app.provide(VJML_HEAD_COLLECTION_CONTEXT_KEY, headCollectionContext)
  app.provide(VJML_VALIDATION_REPORTER_KEY, validationReporter)

  try {
    app.mount(container)
    await nextTick()

    const renderedHtml = container.innerHTML
    const documentState = documentContext.getState()
    const html = finalizeVjmlHtmlInBrowser(renderedHtml, documentState)
    const issues = [
      ...validationReporter.issues,
      ...collectDocumentContextIssues(documentState, runtimeConfig),
      ...collectRenderedHtmlIssues(html, runtimeConfig),
    ]

    assertValidationIssues(issues, runtimeConfig)

    return {
      html,
      warnings: runtimeConfig.render.validation === 'off'
        ? []
        : issues.map(formatValidationIssue),
      issues,
      config: runtimeConfig,
      document: serializeDocumentState(documentState),
      tree: buildVjmlDebugTree(html),
    }
  }
  finally {
    app.unmount()
    container.remove()
  }
}
