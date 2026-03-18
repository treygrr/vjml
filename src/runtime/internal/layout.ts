import {
  createStaticVNode,
  defineComponent,
  h,
  inject,
  provide,
  reactive,
  type InjectionKey,
  type PropType,
  type VNode,
} from 'vue'

import { getVjmlComponentMetadata } from '../../metadata'

import {
  normalizeVjmlAttributes,
  type VjmlAttributeResolutionOptions,
} from './factory'
import type { VjmlParsedWidth } from './helpers/measurements'
import { widthParser } from './helpers/measurements'
import { borderParser, shorthandParser, type VjmlBoxSide } from './helpers/shorthand'
import {
  flattenVjmlVNodes,
  getVjmlVNodeAttrs,
  getVjmlVNodeTagName,
  getVjmlVNodeTextContent,
} from './vnodes'

export const DEFAULT_VJML_BODY_WIDTH = '600px'

export interface VjmlLayoutContext {
  containerWidth: string
  gap: string
  parentWidth: string
  preserveMobileWidth: boolean
}

export interface VjmlSiblingContext {
  first: boolean
  index: number
  last: boolean
  nonRawSiblings: number
  siblingCount: number
}

export interface VjmlAnalyzedChildNode {
  rawElement: boolean
  siblingContext: VjmlSiblingContext
  tagName: string | null
  vnode: VNode
}

type HtmlStyleValue = Record<string, string | number | null | undefined> | string
type HtmlAttributeValue = HtmlStyleValue | boolean | number | string | null | undefined

const DEFAULT_LAYOUT_CONTEXT: VjmlLayoutContext = Object.freeze({
  containerWidth: DEFAULT_VJML_BODY_WIDTH,
  gap: '',
  parentWidth: DEFAULT_VJML_BODY_WIDTH,
  preserveMobileWidth: false,
})

const DEFAULT_SIBLING_CONTEXT: VjmlSiblingContext = Object.freeze({
  first: true,
  index: 0,
  last: true,
  nonRawSiblings: 1,
  siblingCount: 1,
})

const VJML_LAYOUT_CONTEXT_KEY = Symbol(
  'vue-mjml-layout-context',
) as InjectionKey<VjmlLayoutContext>

const VJML_SIBLING_CONTEXT_KEY = Symbol(
  'vue-mjml-sibling-context',
) as InjectionKey<VjmlSiblingContext>

function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined
}

function escapeHtmlAttribute(
  value: string,
  options: {
    escapeAmpersand?: boolean
  } = {},
): string {
  const escapeAmpersand = options.escapeAmpersand ?? true
  const escapedValue = escapeAmpersand
    ? value.replace(/&/g, '&amp;')
    : value

  return escapedValue
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function createVjmlLayoutState(
  initialValue: Partial<VjmlLayoutContext> = {},
): VjmlLayoutContext {
  return reactive({
    ...DEFAULT_LAYOUT_CONTEXT,
    ...initialValue,
  }) as VjmlLayoutContext
}

export function provideVjmlLayoutContext(context: VjmlLayoutContext) {
  provide(VJML_LAYOUT_CONTEXT_KEY, context)
}

export function useVjmlLayoutContext(): VjmlLayoutContext {
  return inject(VJML_LAYOUT_CONTEXT_KEY, DEFAULT_LAYOUT_CONTEXT)
}

export function useVjmlSiblingContext(): VjmlSiblingContext {
  return inject(VJML_SIBLING_CONTEXT_KEY, DEFAULT_SIBLING_CONTEXT)
}

export const VjmlSiblingContextProvider = defineComponent({
  name: 'VjmlSiblingContextProvider',
  props: {
    value: {
      required: true,
      type: Object as PropType<VjmlSiblingContext>,
    },
  },
  setup(props, { slots }) {
    provide(VJML_SIBLING_CONTEXT_KEY, props.value)

    return () => slots.default?.() ?? []
  },
})

export function withVjmlSiblingContext(
  vnode: VNode,
  siblingContext: VjmlSiblingContext,
): VNode {
  return h(VjmlSiblingContextProvider, { value: siblingContext }, {
    default: () => [vnode],
  })
}

export function createVjmlStaticHtml(content: string) {
  if (content.length === 0) {
    return ''
  }

  return createStaticVNode(content, 1)
}

export function renderHtmlStyle(style: HtmlStyleValue): string {
  if (typeof style === 'string') {
    return style
  }

  return Object.entries(style)
    .filter(([, value]) => !isNullish(value))
    .map(([name, value]) => `${name}:${value};`)
    .join('')
}

export function compactStyleRecord(
  style: Record<string, string | number | null | undefined>,
): Record<string, string | number> {
  return Object.fromEntries(
    Object.entries(style).filter(([, value]) => !isNullish(value)),
  ) as Record<string, string | number>
}

export function renderHtmlAttributes(
  attributes: Record<string, HtmlAttributeValue>,
  options: {
    escapeAmpersand?: boolean
  } = {},
): string {
  return Object.entries(attributes)
    .filter(([, value]) => !isNullish(value) && value !== false)
    .map(([name, value]) => {
      const serializedValue = typeof value === 'boolean'
        ? name
        : name === 'style' && typeof value === 'object'
          ? renderHtmlStyle(value as HtmlStyleValue)
          : `${value}`

      return ` ${name}="${escapeHtmlAttribute(serializedValue, options)}"`
    })
    .join('')
}

function getNumericWidth(containerWidth: string): number {
  const parsedWidth = Number.parseInt(containerWidth, 10)

  return Number.isNaN(parsedWidth) ? 0 : parsedWidth
}

function getFallbackSiblingCount(nonRawSiblings: number): number {
  return Math.max(nonRawSiblings, 1)
}

function isIgnorableVNode(vnode: VNode): boolean {
  const tagName = getVjmlVNodeTagName(vnode)

  if (tagName) {
    return false
  }

  return getVjmlVNodeTextContent(vnode).trim().length === 0
}

export function analyzeVjmlChildNodes(
  children: readonly VNode[],
): VjmlAnalyzedChildNode[] {
  const normalizedChildren = flattenVjmlVNodes(children).filter(
    vnode => !isIgnorableVNode(vnode),
  )
  const nonRawSiblings = Math.max(
    normalizedChildren.filter((vnode) => {
      const tagName = getVjmlVNodeTagName(vnode)

      return tagName
        ? !(getVjmlComponentMetadata(tagName)?.rawElement ?? false)
        : true
    }).length,
    1,
  )

  return normalizedChildren.map((vnode, index) => {
    const tagName = getVjmlVNodeTagName(vnode)

    return {
      rawElement: tagName
        ? (getVjmlComponentMetadata(tagName)?.rawElement ?? false)
        : false,
      siblingContext: {
        first: index === 0,
        index,
        last: index + 1 === normalizedChildren.length,
        nonRawSiblings,
        siblingCount: normalizedChildren.length,
      },
      tagName,
      vnode,
    }
  })
}

export function getNormalizedVNodeAttributes(
  vnode: VNode,
  options: VjmlAttributeResolutionOptions = {},
): Record<string, string> {
  const tagName = getVjmlVNodeTagName(vnode)

  if (!tagName) {
    return {}
  }

  const metadata = getVjmlComponentMetadata(tagName)

  if (!metadata) {
    return {}
  }

  return normalizeVjmlAttributes(
    getVjmlVNodeAttrs(vnode),
    metadata,
    options,
  ).attrs
}

export function suffixCssClasses(
  classes: string | undefined,
  suffix: string,
): string {
  return classes
    ? classes
        .split(/\s+/)
        .filter(Boolean)
        .map(className => `${className}-${suffix}`)
        .join(' ')
    : ''
}

export function hasNonEmptyAttribute(value: string | undefined): boolean {
  return value !== undefined && value !== ''
}

export function getShorthandAttrValue(
  attrs: Readonly<Record<string, string>>,
  attributeName: string,
  direction: VjmlBoxSide,
): number {
  const directionalAttribute = attrs[`${attributeName}-${direction}`]

  if (directionalAttribute) {
    const parsedValue = Number.parseInt(directionalAttribute, 10)

    return Number.isNaN(parsedValue) ? 0 : parsedValue
  }

  const attributeValue = attrs[attributeName]

  return attributeValue ? shorthandParser(attributeValue, direction) : 0
}

export function getShorthandBorderValue(
  attrs: Readonly<Record<string, string>>,
  direction: Exclude<VjmlBoxSide, 'bottom' | 'top'> | VjmlBoxSide,
  attributeName = 'border',
): number {
  const directionalAttribute = attrs[`${attributeName}-${direction}`]
  const attributeValue = directionalAttribute || attrs[attributeName] || '0'

  return borderParser(attributeValue)
}

export function getBoxWidths(
  containerWidth: string,
  attrs: Readonly<Record<string, string>>,
) {
  const totalWidth = getNumericWidth(containerWidth)
  const paddings = getShorthandAttrValue(attrs, 'padding', 'left')
    + getShorthandAttrValue(attrs, 'padding', 'right')
  const borders = getShorthandBorderValue(attrs, 'left')
    + getShorthandBorderValue(attrs, 'right')

  return {
    borders,
    box: totalWidth - paddings - borders,
    paddings,
    totalWidth,
  }
}

export function getParsedWidthValue(
  explicitWidth: string | undefined,
  nonRawSiblings: number,
): VjmlParsedWidth {
  return widthParser(
    explicitWidth ?? `${100 / getFallbackSiblingCount(nonRawSiblings)}%`,
    { parseFloatToInt: false },
  )
}

export function getRenderedWidthAsPixel(
  explicitWidth: string | undefined,
  containerWidth: string,
  nonRawSiblings: number,
): string {
  const { parsedWidth, unit } = getParsedWidthValue(explicitWidth, nonRawSiblings)

  if (unit === '%') {
    return `${getNumericWidth(containerWidth) * parsedWidth / 100}px`
  }

  return `${parsedWidth}px`
}

export function getColumnContainerWidth(
  attrs: Readonly<Record<string, string>>,
  parentWidth: string,
  nonRawSiblings: number,
): string {
  const { borders, paddings } = getBoxWidths(parentWidth, attrs)
  const innerBorders = getShorthandBorderValue(attrs, 'left', 'inner-border')
    + getShorthandBorderValue(attrs, 'right', 'inner-border')
  const allPaddings = paddings + borders + innerBorders
  let containerWidth = attrs.width
    ?? `${getNumericWidth(parentWidth) / getFallbackSiblingCount(nonRawSiblings)}px`
  const { parsedWidth, unit } = widthParser(containerWidth, {
    parseFloatToInt: false,
  })

  if (unit === '%') {
    containerWidth = `${getNumericWidth(parentWidth) * parsedWidth / 100 - allPaddings}px`
  }
  else {
    containerWidth = `${parsedWidth - allPaddings}px`
  }

  return containerWidth
}

export function getGroupContainerWidth(
  attrs: Readonly<Record<string, string>>,
  parentWidth: string,
  nonRawSiblings: number,
): string {
  const paddingSize = getShorthandAttrValue(attrs, 'padding', 'left')
    + getShorthandAttrValue(attrs, 'padding', 'right')
  let containerWidth = attrs.width
    ?? `${getNumericWidth(parentWidth) / getFallbackSiblingCount(nonRawSiblings)}px`
  const { parsedWidth, unit } = widthParser(containerWidth, {
    parseFloatToInt: false,
  })

  if (unit === '%') {
    containerWidth = `${getNumericWidth(parentWidth) * parsedWidth / 100 - paddingSize}px`
  }
  else {
    containerWidth = `${parsedWidth - paddingSize}px`
  }

  return containerWidth
}

export function getColumnClassName(
  explicitWidth: string | undefined,
  nonRawSiblings: number,
  options: {
    truncatePercentage?: boolean
  } = {},
): {
  className: string
  parsedWidth: VjmlParsedWidth
} {
  const parsedWidth = getParsedWidthValue(explicitWidth, nonRawSiblings)
  const formattedWidth = parsedWidth.unit === '%'
    ? options.truncatePercentage
      ? `${Math.trunc(parsedWidth.parsedWidth)}`
      : `${parsedWidth.parsedWidth}`.replace(/\./g, '-')
    : `${parsedWidth.parsedWidth}`.replace(/\./g, '-')

  return {
    className: parsedWidth.unit === '%'
      ? `mj-column-per-${formattedWidth}`
      : `mj-column-px-${formattedWidth}`,
    parsedWidth,
  }
}

export function getColumnMobileWidth(
  attrs: Readonly<Record<string, string>>,
  parentWidth: string,
  nonRawSiblings: number,
  preserveMobileWidth: boolean,
): string {
  if (!preserveMobileWidth) {
    return '100%'
  }

  if (!attrs.width) {
    return `${Math.trunc(100 / getFallbackSiblingCount(nonRawSiblings))}%`
  }

  const parsedWidth = widthParser(attrs.width, {
    parseFloatToInt: false,
  })

  if (parsedWidth.unit === '%') {
    return attrs.width
  }

  return `${parsedWidth.parsedWidth / Math.max(getNumericWidth(parentWidth), 1) * 100}%`
}
