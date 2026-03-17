import type { VjmlDocumentState } from './context'

import {
  mergeOutlookConditionals,
  minifyOutlookConditionals,
} from './helpers/conditional'
import { buildVjmlDocumentHtml } from './helpers/documentShared'

function parseHtml(content: string): Document | null {
  if (typeof DOMParser === 'undefined') {
    return null
  }

  const normalizedContent = content.replace(/^\s*<!doctype html>\s*/i, '')

  return new DOMParser().parseFromString(normalizedContent, 'text/html')
}

function applyHtmlAttributesInBrowser(
  content: string,
  htmlAttributes: Readonly<Record<string, Record<string, string>>>,
): string {
  if (!content || Object.keys(htmlAttributes).length === 0) {
    return content
  }

  const parsedDocument = parseHtml(content)

  if (!parsedDocument) {
    return content
  }

  for (const [selector, attributes] of Object.entries(htmlAttributes)) {
    let elements: Element[] = []

    try {
      elements = Array.from(parsedDocument.querySelectorAll(selector))
    }
    catch {
      continue
    }

    for (const element of elements) {
      for (const [attributeName, value] of Object.entries(attributes)) {
        element.setAttribute(attributeName, value || '')
      }
    }
  }

  if (/^\s*(<!doctype html>|<html\b)/i.test(content)) {
    return `<!doctype html>\n${parsedDocument.documentElement.outerHTML}`
  }

  return parsedDocument.body.innerHTML || content
}

export function finalizeVjmlHtmlInBrowser(
  content: string,
  documentState: VjmlDocumentState,
): string {
  const normalizedContent = minifyOutlookConditionals(content)
  const htmlWithAttributes = applyHtmlAttributesInBrowser(
    normalizedContent,
    documentState.htmlAttributes,
  )
  const wrappedContent = documentState.wrapWithDocument
    ? buildVjmlDocumentHtml(htmlWithAttributes, documentState)
    : htmlWithAttributes

  return mergeOutlookConditionals(wrappedContent)
}
