import {
  Comment,
  Fragment,
  Text,
  type VNode,
} from 'vue'

import { requireVjmlComponentMetadata } from '../internal/componentMetadata'
import { createVjmlComponent } from '../internal/factory'
import { widthParser } from '../internal/helpers/measurements'
import {
  createVjmlStaticHtml,
  getBoxWidths,
  getShorthandAttrValue,
  renderHtmlAttributes,
  useVjmlLayoutContext,
} from '../internal/layout'
import { flattenVjmlVNodes, getVjmlVNodeChildren } from '../internal/vnodes'

const metadata = requireVjmlComponentMetadata('mj-button')

type HtmlStyleAttributeValue = Record<string, string | number | null | undefined> | string
type HtmlAttributeValue = HtmlStyleAttributeValue | boolean | number | string | null | undefined

function calculateContentWidth(
  attrs: Readonly<Record<string, string>>,
  containerWidth: string,
): string | undefined {
  if (!attrs.width) {
    return undefined
  }

  const parsedWidth = widthParser(attrs.width, {
    parseFloatToInt: false,
  })

  if (parsedWidth.unit !== 'px') {
    return undefined
  }

  const { borders } = getBoxWidths(containerWidth, attrs)
  const innerPaddings = getShorthandAttrValue(attrs, 'inner-padding', 'left')
    + getShorthandAttrValue(attrs, 'inner-padding', 'right')

  return `${parsedWidth.parsedWidth - innerPaddings - borders}px`
}

function escapeHtmlText(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function isHtmlStyleAttributeValue(
  value: unknown,
): value is Record<string, string | number | null | undefined> {
  return Boolean(value)
    && typeof value === 'object'
    && !Array.isArray(value)
    && Object.values(value).every((entry) => {
      return entry === null
        || entry === undefined
        || typeof entry === 'number'
        || typeof entry === 'string'
    })
}

function toHtmlAttributeValue(value: unknown): HtmlAttributeValue | null {
  if (
    value === null
    || value === undefined
    || typeof value === 'boolean'
    || typeof value === 'number'
    || typeof value === 'string'
  ) {
    return value
  }

  if (isHtmlStyleAttributeValue(value)) {
    return value
  }

  return null
}

function serializeButtonContentNodes(nodes: readonly VNode[]): string {
  return nodes.map(serializeButtonContentNode).join('')
}

function serializeButtonContentNode(node: VNode): string {
  if (node.type === Comment) {
    return ''
  }

  if (node.type === Text) {
    return escapeHtmlText(typeof node.children === 'string' ? node.children : '')
  }

  if (node.type === Fragment) {
    return serializeButtonContentNodes(flattenVjmlVNodes(node.children))
  }

  if (typeof node.type === 'string') {
    const rawProps = (node.props ?? {}) as Record<string, unknown>
    const attrs = Object.fromEntries(
      Object.entries(rawProps).flatMap(([attributeName, attributeValue]) => {
        if (
          /^on[A-Z]/.test(attributeName)
          || attributeName === 'innerHTML'
          || attributeName === 'textContent'
        ) {
          return []
        }

        const normalizedValue = toHtmlAttributeValue(attributeValue)

        return normalizedValue === null
          ? []
          : [[attributeName, normalizedValue] as const]
      }),
    ) as Record<string, HtmlAttributeValue>
    const children = typeof node.children === 'string'
      ? escapeHtmlText(node.children)
      : serializeButtonContentNodes(getVjmlVNodeChildren(node))

    return `<${node.type}${renderHtmlAttributes(attrs)}>${children}</${node.type}>`
  }

  return ''
}

function resolveButtonContentHtml(
  source: 'none' | 'prop' | 'slot',
  propValue: string | null,
  childNodes: readonly VNode[],
): string {
  if (source === 'prop') {
    return propValue ?? ''
  }

  if (source === 'slot') {
    return serializeButtonContentNodes(childNodes)
  }

  return ''
}

export default createVjmlComponent(metadata, {
  name: 'VjmlButton',
  setup() {
    return {
      layoutContext: useVjmlLayoutContext(),
    }
  },
  render({ attrs, content }, extra) {
    const tagName = attrs.href ? 'a' : 'p'
    const contentWidth = calculateContentWidth(
      attrs,
      extra.layoutContext.containerWidth,
    )
    const contentHtml = resolveButtonContentHtml(
      content.source,
      content.propValue,
      content.childNodes,
    )

    return createVjmlStaticHtml(
      `<table${renderHtmlAttributes({
        border: '0',
        cellpadding: '0',
        cellspacing: '0',
        role: 'presentation',
        style: {
          'border-collapse': 'separate',
          'line-height': '100%',
          'width': attrs.width,
        },
      })}><tbody><tr><td${renderHtmlAttributes({
        align: 'center',
        bgcolor: attrs['background-color'] === 'none'
          ? undefined
          : attrs['background-color'],
        role: 'presentation',
        style: {
          'background': attrs['background-color'],
          'border': attrs.border,
          'border-bottom': attrs['border-bottom'],
          'border-left': attrs['border-left'],
          'border-radius': attrs['border-radius'],
          'border-right': attrs['border-right'],
          'border-top': attrs['border-top'],
          'cursor': 'auto',
          'font-style': attrs['font-style'],
          'height': attrs.height,
          'mso-padding-alt': attrs['inner-padding'],
          'text-align': attrs['text-align'],
        },
        valign: attrs['vertical-align'],
      })}><${tagName}${renderHtmlAttributes({
        href: tagName === 'a' ? attrs.href : undefined,
        name: tagName === 'a' ? attrs.name : undefined,
        rel: tagName === 'a' ? attrs.rel : undefined,
        style: {
          'background': attrs['background-color'],
          'border-radius': attrs['border-radius'],
          'color': attrs.color,
          'display': 'inline-block',
          'font-family': attrs['font-family'],
          'font-size': attrs['font-size'],
          'font-style': attrs['font-style'],
          'font-weight': attrs['font-weight'],
          'letter-spacing': attrs['letter-spacing'],
          'line-height': attrs['line-height'],
          'margin': '0',
          'mso-padding-alt': '0px',
          'padding': attrs['inner-padding'],
          'text-decoration': attrs['text-decoration'],
          'text-transform': attrs['text-transform'],
          'width': contentWidth,
        },
        target: tagName === 'a' ? attrs.target : undefined,
        title: attrs.title,
      })}>${contentHtml}</${tagName}></td></tr></tbody></table>`,
    )
  },
})
