import {
  Comment,
  Fragment,
  Text,
  type VNode,
} from 'vue'

import { requireVjmlComponentMetadata } from '../internal/componentMetadata'
import { createVjmlComponent } from '../internal/factory'
import { conditionalTag } from '../internal/helpers/conditional'
import {
  createVjmlStaticHtml,
  renderHtmlAttributes,
  suffixCssClasses,
} from '../internal/layout'
import { useVjmlNavbarContext } from '../internal/interactive'
import { flattenVjmlVNodes, getVjmlVNodeChildren } from '../internal/vnodes'

const metadata = requireVjmlComponentMetadata('mj-navbar-link')

type HtmlStyleAttributeValue = Record<string, string | number | null | undefined> | string
type HtmlAttributeValue = HtmlStyleAttributeValue | boolean | number | string | null | undefined

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
    && Object.values(value as Record<string, unknown>).every((entry) => {
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

function serializeNavbarLinkContentNodes(nodes: readonly VNode[]): string {
  return nodes.map(serializeNavbarLinkContentNode).join('')
}

function serializeNavbarLinkContentNode(node: VNode): string {
  if (node.type === Comment) {
    return ''
  }

  if (node.type === Text) {
    return escapeHtmlText(typeof node.children === 'string' ? node.children : '')
  }

  if (node.type === Fragment) {
    return serializeNavbarLinkContentNodes(flattenVjmlVNodes(node.children))
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
      : serializeNavbarLinkContentNodes(getVjmlVNodeChildren(node))

    return `<${node.type}${renderHtmlAttributes(attrs)}>${children}</${node.type}>`
  }

  return ''
}

function resolveNavbarLinkContentHtml(
  source: 'none' | 'prop' | 'slot',
  propValue: string | null,
  childNodes: readonly VNode[],
): string {
  if (source === 'prop') {
    return propValue ?? ''
  }

  if (source === 'slot') {
    return serializeNavbarLinkContentNodes(childNodes)
  }

  return ''
}

export default createVjmlComponent(metadata, {
  name: 'VjmlNavbarLink',
  setup() {
    return {
      navbarContext: useVjmlNavbarContext(),
    }
  },
  render({ attrs, content }, extra) {
    const href = extra.navbarContext.baseUrl
      ? `${extra.navbarContext.baseUrl}${attrs.href ?? ''}`
      : attrs.href
    const contentHtml = resolveNavbarLinkContentHtml(
      content.source,
      content.propValue,
      content.childNodes,
    )

    return createVjmlStaticHtml(
      [
        conditionalTag(
          `<td${renderHtmlAttributes({
            class: suffixCssClasses(attrs['css-class'], 'outlook') || undefined,
            style: {
              'padding': attrs.padding,
              'padding-top': attrs['padding-top'],
              'padding-left': attrs['padding-left'],
              'padding-right': attrs['padding-right'],
              'padding-bottom': attrs['padding-bottom'],
            },
          })}>`,
        ),
        `<a${renderHtmlAttributes({
          class: ['mj-link', attrs['css-class']].filter(Boolean).join(' ') || undefined,
          href,
          name: attrs.name || undefined,
          rel: attrs.rel || undefined,
          style: {
            'color': attrs.color,
            'display': 'inline-block',
            'font-family': attrs['font-family'],
            'font-size': attrs['font-size'],
            'font-style': attrs['font-style'],
            'font-weight': attrs['font-weight'],
            'letter-spacing': attrs['letter-spacing'],
            'line-height': attrs['line-height'],
            'padding': attrs.padding,
            'padding-top': attrs['padding-top'],
            'padding-left': attrs['padding-left'],
            'padding-right': attrs['padding-right'],
            'padding-bottom': attrs['padding-bottom'],
            'text-decoration': attrs['text-decoration'],
            'text-transform': attrs['text-transform'],
          },
          target: attrs.target || undefined,
        })}>${contentHtml}</a>`,
        conditionalTag('</td>'),
      ].join(''),
    )
  },
})
