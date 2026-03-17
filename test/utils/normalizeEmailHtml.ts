function escapeAttribute(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function escapeText(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function normalizeCssText(value: string): string {
  return value
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim()
}

const STYLE_SHORTHAND_EXPANSIONS: Readonly<Record<string, readonly string[]>> = {
  border: [
    'border-top-color',
    'border-top-style',
    'border-top-width',
    'border-right-color',
    'border-right-style',
    'border-right-width',
    'border-bottom-color',
    'border-bottom-style',
    'border-bottom-width',
    'border-left-color',
    'border-left-style',
    'border-left-width',
  ],
  'border-bottom': [
    'border-bottom-color',
    'border-bottom-style',
    'border-bottom-width',
  ],
  'border-color': [
    'border-top-color',
    'border-right-color',
    'border-bottom-color',
    'border-left-color',
  ],
  'border-left': [
    'border-left-color',
    'border-left-style',
    'border-left-width',
  ],
  'border-right': [
    'border-right-color',
    'border-right-style',
    'border-right-width',
  ],
  'border-style': [
    'border-top-style',
    'border-right-style',
    'border-bottom-style',
    'border-left-style',
  ],
  'border-top': [
    'border-top-color',
    'border-top-style',
    'border-top-width',
  ],
  'border-width': [
    'border-top-width',
    'border-right-width',
    'border-bottom-width',
    'border-left-width',
  ],
  margin: [
    'margin-top',
    'margin-right',
    'margin-bottom',
    'margin-left',
  ],
  padding: [
    'padding-top',
    'padding-right',
    'padding-bottom',
    'padding-left',
  ],
}

function splitCssDeclarations(value: string): string[] {
  const declarations: string[] = []
  let current = ''
  let depth = 0
  let quote: '"' | '\'' | '' = ''

  for (const character of value) {
    if (quote) {
      current += character

      if (character === quote) {
        quote = ''
      }

      continue
    }

    if (character === '"' || character === '\'') {
      quote = character
      current += character
      continue
    }

    if (character === '(') {
      depth += 1
      current += character
      continue
    }

    if (character === ')' && depth > 0) {
      depth -= 1
      current += character
      continue
    }

    if (character === ';' && depth === 0) {
      const declaration = current.trim()

      if (declaration.length > 0) {
        declarations.push(declaration)
      }

      current = ''
      continue
    }

    current += character
  }

  const declaration = current.trim()

  if (declaration.length > 0) {
    declarations.push(declaration)
  }

  return declarations
}

function splitCssDeclaration(
  value: string,
): readonly [name: string, cssValue: string] | null {
  let depth = 0
  let quote: '"' | '\'' | '' = ''

  for (let index = 0; index < value.length; index += 1) {
    const character = value[index]

    if (quote) {
      if (character === quote) {
        quote = ''
      }

      continue
    }

    if (character === '"' || character === '\'') {
      quote = character
      continue
    }

    if (character === '(') {
      depth += 1
      continue
    }

    if (character === ')' && depth > 0) {
      depth -= 1
      continue
    }

    if (character !== ':' || depth !== 0) {
      continue
    }

    const name = value.slice(0, index).trim().toLowerCase()
    const cssValue = value.slice(index + 1).trim()

    return name.length > 0 ? [name, cssValue] : null
  }

  return null
}

function splitCssValuePriority(
  value: string,
): readonly [cssValue: string, priority: string] {
  const importantPattern = /\s*!important\s*$/i

  if (!importantPattern.test(value)) {
    return [normalizeWhitespace(value), '']
  }

  return [
    normalizeWhitespace(value.replace(importantPattern, '')),
    'important',
  ]
}

function shouldOmitEmptyAttribute(name: string, value: string): boolean {
  return (name === 'class' || name === 'style') && value.length === 0
}

function shouldOmitStyleProperty(name: string, value: string): boolean {
  return name === 'border-image' && value === 'none'
}

function parseHtmlAttributes(
  value: string,
): Array<readonly [name: string, attributeValue: string | null]> {
  const attributes: Array<readonly [name: string, attributeValue: string | null]> = []
  const attributePattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g

  for (const match of value.matchAll(attributePattern)) {
    const name = match[1]?.toLowerCase()

    if (!name) {
      continue
    }

    const attributeValue = match[2] ?? match[3] ?? match[4] ?? null

    attributes.push([name, attributeValue])
  }

  return attributes
}

function normalizeHtmlTagInComment(value: string): string {
  const trimmedValue = normalizeWhitespace(value)

  if (/^<!/.test(trimmedValue) || /^<\?/.test(trimmedValue)) {
    return trimmedValue
  }

  if (/^<\//.test(trimmedValue)) {
    return trimmedValue.toLowerCase()
  }

  const selfClosing = trimmedValue.endsWith('/>')
  const tagContent = trimmedValue.slice(1, selfClosing ? -2 : -1).trim()
  const firstWhitespaceIndex = tagContent.search(/\s/)
  const rawTagName = firstWhitespaceIndex === -1
    ? tagContent
    : tagContent.slice(0, firstWhitespaceIndex)
  const rawAttributes = firstWhitespaceIndex === -1
    ? ''
    : tagContent.slice(firstWhitespaceIndex + 1)
  const tagName = rawTagName.toLowerCase()
  const attributes = parseHtmlAttributes(rawAttributes)
    .map(([name, attributeValue]) => {
      if (attributeValue === null) {
        return [name, null] as const
      }

      const normalizedValue = name === 'style'
        ? normalizeInlineStyle(attributeValue)
        : normalizeWhitespace(attributeValue)

      return [name, normalizedValue] as const
    })
    .filter(([name, attributeValue]) => {
      return attributeValue === null || !shouldOmitEmptyAttribute(name, attributeValue)
    })
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([name, attributeValue]) => {
      return attributeValue === null
        ? ` ${name}`
        : ` ${name}="${escapeAttribute(attributeValue)}"`
    })
    .join('')

  return `<${tagName}${attributes}${selfClosing ? ' />' : '>'}`
}

function normalizeCommentData(value: string): string {
  return normalizeWhitespace(value).replace(/<[^>]+>/g, tagValue => normalizeHtmlTagInComment(tagValue))
}

function omitRedundantStyleDeclarations(
  declarations: Map<string, readonly [cssValue: string, priority: string]>,
): void {
  const background = declarations.get('background')
  const backgroundColor = declarations.get('background-color')

  if (
    background
    && backgroundColor
    && background[0] === backgroundColor[0]
    && background[1] === backgroundColor[1]
  ) {
    declarations.delete('background-color')
  }
}

function normalizeInlineStyle(value: string): string {
  const normalizedDeclarations = new Map<string, readonly [cssValue: string, priority: string]>()

  for (const declaration of splitCssDeclarations(value)) {
    const entry = splitCssDeclaration(declaration)

    if (!entry) {
      continue
    }

    const [propertyName, rawCssValue] = entry
    const [cssValue, priority] = splitCssValuePriority(rawCssValue)
    const style = document.createElement('div').style

    style.setProperty(propertyName, cssValue, priority)

    const normalizedPropertyNames = STYLE_SHORTHAND_EXPANSIONS[propertyName] ?? [propertyName]

    normalizedPropertyNames.forEach((normalizedPropertyName) => {
      const normalizedPropertyValue = normalizeWhitespace(
        style.getPropertyValue(normalizedPropertyName),
      )
      const normalizedPropertyPriority = style.getPropertyPriority(normalizedPropertyName)
      const propertyValue = normalizedPropertyValue.length > 0
        ? normalizedPropertyValue
        : (normalizedPropertyName === propertyName ? cssValue : '')

      if (
        propertyValue.length === 0
        || shouldOmitStyleProperty(normalizedPropertyName, propertyValue)
      ) {
        return
      }

      const normalizedPriority = normalizedPropertyValue.length > 0
        ? normalizedPropertyPriority
        : priority

      normalizedDeclarations.set(normalizedPropertyName, [
        propertyValue,
        normalizedPriority,
      ])
    })
  }

  omitRedundantStyleDeclarations(normalizedDeclarations)

  return [...normalizedDeclarations.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([propertyName, [propertyValue, priority]]) => {
      return `${propertyName}:${propertyValue}${priority ? ` !${priority}` : ''}`
    })
    .join(';')
}

function serializeNode(node: Node, parentTagName = ''): string {
  if (node.nodeType === Node.ELEMENT_NODE) {
    const element = node as Element
    const tagName = element.tagName.toLowerCase()
    const attributes = Array.from(element.attributes)
      .map((attribute) => {
        const name = attribute.name.toLowerCase()
        const value = name === 'style'
          ? normalizeInlineStyle(attribute.value)
          : normalizeWhitespace(attribute.value)

        return [name, value] as const
      })
      .filter(([name, value]) => !shouldOmitEmptyAttribute(name, value))
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([name, value]) => ` ${name}="${escapeAttribute(value)}"`)
      .join('')
    const children = tagName === 'style'
      ? normalizeCssText(element.textContent ?? '')
      : Array.from(element.childNodes)
          .map(childNode => serializeNode(childNode, tagName))
          .join('')

    return `<${tagName}${attributes}>${children}</${tagName}>`
  }

  if (node.nodeType === Node.TEXT_NODE) {
    if (parentTagName === 'style') {
      return normalizeCssText(node.textContent ?? '')
    }

    const value = normalizeWhitespace(node.textContent ?? '')

    return value.length > 0 ? escapeText(value) : ''
  }

  if (node.nodeType === Node.COMMENT_NODE) {
    return `<!--${normalizeCommentData((node as Comment).data)}-->`
  }

  return ''
}

export function normalizeEmailHtml(value: string): string {
  const parser = new DOMParser()
  const documentNode = parser.parseFromString(
    value.replace(/^\s*<!doctype html>\s*/i, ''),
    'text/html',
  )

  return `<!doctype html>${serializeNode(documentNode.documentElement)}`
}