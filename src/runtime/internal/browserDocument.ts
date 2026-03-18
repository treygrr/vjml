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

function serializeParsedHtml(content: string, parsedDocument: Document): string {
  if (/^\s*(<!doctype html>|<html\b)/i.test(content)) {
    return `<!doctype html>\n${parsedDocument.documentElement.outerHTML}`
  }

  return parsedDocument.body.innerHTML || content
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

  return serializeParsedHtml(content, parsedDocument)
}

function parseInlineCssRulesInBrowser(cssText: string): CSSRule[] {
  if (typeof document === 'undefined' || !document.head) {
    return []
  }

  const styleElement = document.createElement('style')

  styleElement.media = 'not all'
  styleElement.textContent = cssText
  document.head.append(styleElement)

  const cssRules = styleElement.sheet ? Array.from(styleElement.sheet.cssRules) : []

  styleElement.remove()

  return cssRules
}

function snapshotOriginalInlineStyles(
  parsedDocument: Document,
): WeakMap<Element, Map<string, string>> {
  const originalInlineStyles = new WeakMap<Element, Map<string, string>>()

  for (const element of Array.from(parsedDocument.querySelectorAll('[style]'))) {
    const style = (element as HTMLElement).style
    const originalDeclarations = new Map<string, string>()

    for (const propertyName of Array.from(style)) {
      originalDeclarations.set(
        propertyName,
        style.getPropertyPriority(propertyName),
      )
    }

    originalInlineStyles.set(element, originalDeclarations)
  }

  return originalInlineStyles
}

function shouldApplyInlineDeclaration(
  element: HTMLElement,
  propertyName: string,
  priority: string,
  originalInlineStyles: WeakMap<Element, Map<string, string>>,
): boolean {
  const originalDeclarations = originalInlineStyles.get(element)

  if (originalDeclarations?.has(propertyName)) {
    const originalPriority = originalDeclarations.get(propertyName) ?? ''

    if (originalPriority === 'important') {
      return priority === 'important'
    }

    return priority === 'important'
  }

  return !(
    element.style.getPropertyPriority(propertyName) === 'important'
    && priority !== 'important'
  )
}

function applyInlineStylesInBrowser(
  content: string,
  inlineStyles: readonly string[],
): string {
  if (!content || inlineStyles.length === 0) {
    return content
  }

  const parsedDocument = parseHtml(content)

  if (!parsedDocument) {
    return content
  }

  const cssRules = parseInlineCssRulesInBrowser(inlineStyles.join('\n'))

  if (cssRules.length === 0) {
    return content
  }

  const originalInlineStyles = snapshotOriginalInlineStyles(parsedDocument)
  const appliedDeclarations = new Map<HTMLElement, Map<string, string>>()

  for (const cssRule of cssRules) {
    if (cssRule.type !== CSSRule.STYLE_RULE) {
      continue
    }

    const styleRule = cssRule as CSSStyleRule
    let elements: Element[] = []

    try {
      elements = Array.from(parsedDocument.querySelectorAll(styleRule.selectorText))
    }
    catch {
      continue
    }

    for (const element of elements) {
      const target = element as HTMLElement

      for (const propertyName of Array.from(styleRule.style)) {
        const value = styleRule.style.getPropertyValue(propertyName)
        const priority = styleRule.style.getPropertyPriority(propertyName)

        if (
          !shouldApplyInlineDeclaration(
            target,
            propertyName,
            priority,
            originalInlineStyles,
          )
        ) {
          continue
        }

        target.style.setProperty(propertyName, value, priority)

        const appliedProperties = appliedDeclarations.get(target) ?? new Map<string, string>()

        appliedProperties.set(propertyName, value)
        appliedDeclarations.set(target, appliedProperties)
      }
    }
  }

  for (const [element, propertyValues] of appliedDeclarations) {
    for (const [propertyName, value] of propertyValues) {
      element.style.removeProperty(propertyName)
      element.style.setProperty(propertyName, value)
    }
  }

  return serializeParsedHtml(content, parsedDocument)
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
  const htmlWithInlineStyles = applyInlineStylesInBrowser(
    wrappedContent,
    documentState.inlineStyle,
  )

  return mergeOutlookConditionals(htmlWithInlineStyles)
}
