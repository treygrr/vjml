import {
  defineComponent,
  inject,
  normalizeClass,
  provide,
  type InjectionKey,
  type SetupContext,
  type Slots,
  type VNode,
  type VNodeChild,
} from 'vue'

import {
  getVjmlComponentMetadata,
  type VjmlComponentMetadata,
  type VjmlComponentSlotKind,
} from '../../metadata'

import {
  useVjmlBodyRenderContext,
  useVjmlDocumentContext,
  useVjmlHeadCollectionContext,
  useVjmlValidationReporter,
  type VjmlBodyRenderContext,
  type VjmlDocumentContext,
  type VjmlHeadCollectionContext,
  type VjmlValidationReporter,
} from './context'
import { tagVjmlComponent } from './vnodes'

const ATTRIBUTE_ALIASES: Readonly<Record<string, string>> = {
  class: 'css-class',
  className: 'css-class',
  cssClass: 'css-class',
  mjClass: 'mj-class',
}

const CONTENT_ATTRIBUTE_NAMES = ['content', 'html', 'text'] as const

const TOKEN_BOOLEAN_ATTRIBUTES: Readonly<Record<string, string>> = {
  'full-width': 'full-width',
  'inline': 'inline',
}

const VJML_COMPONENT_TAG_NAME_KEY = Symbol(
  'vue-mjml-component-tag-name',
) as InjectionKey<string | null>

const VJML_ACTIVE_MJ_CLASS_KEY = Symbol(
  'vue-mjml-active-mj-class',
) as InjectionKey<string>

export type VjmlContentSource = 'none' | 'prop' | 'slot'

export interface VjmlResolvedContent {
  childNodes: VNode[]
  hasContent: boolean
  propName: 'content' | 'html' | 'text' | null
  propValue: string | null
  slotKind: VjmlComponentSlotKind
  source: VjmlContentSource
}

export interface VjmlNormalizedAttributesResult {
  attrs: Record<string, string>
  explicitAttrs: Record<string, string>
}

export interface VjmlComponentRenderContext {
  activeMjClass: string
  attrs: Readonly<Record<string, string>>
  bodyRenderContext: VjmlBodyRenderContext | null
  content: VjmlResolvedContent
  documentContext: VjmlDocumentContext | null
  explicitAttrs: Readonly<Record<string, string>>
  headCollectionContext: VjmlHeadCollectionContext | null
  inheritedMjClass: string
  metadata: VjmlComponentMetadata
  parentTagName: string | null
  rawAttrs: Readonly<Record<string, unknown>>
  slots: Slots
  validationReporter: VjmlValidationReporter | null
}

export interface VjmlComponentSetupContext {
  activeMjClass: string
  bodyRenderContext: VjmlBodyRenderContext | null
  documentContext: VjmlDocumentContext | null
  headCollectionContext: VjmlHeadCollectionContext | null
  inheritedMjClass: string
  metadata: VjmlComponentMetadata
  parentTagName: string | null
  slots: Slots
  validationReporter: VjmlValidationReporter | null
}

export interface VjmlAttributeResolutionOptions {
  documentContext?: VjmlDocumentContext | null
  inheritedMjClass?: string
}

export interface VjmlComponentFactoryOptions<TExtra = undefined> {
  name?: string
  setup?: (context: VjmlComponentSetupContext) => TExtra
  render: (context: VjmlComponentRenderContext, extra: TExtra) => VNodeChild
}

function toKebabCase(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

function isVueListenerAttributeName(attributeName: string): boolean {
  return /^on[A-Z]/.test(attributeName)
}

function isReservedContentAttributeName(attributeName: string): boolean {
  return CONTENT_ATTRIBUTE_NAMES.includes(
    attributeName as (typeof CONTENT_ATTRIBUTE_NAMES)[number],
  )
}

function mergeTokenList(
  currentValue: string | undefined,
  nextValue: string,
): string {
  return [currentValue, nextValue]
    .filter(Boolean)
    .join(' ')
    .trim()
}

  function splitAttributeTokens(value: string | undefined): string[] {
    return value
    ? value
      .split(/\s+/)
      .filter(Boolean)
    : []
  }

function normalizeAttributeName(attributeName: string): string {
  return ATTRIBUTE_ALIASES[attributeName] ?? toKebabCase(attributeName)
}

function getAllowedAttributeType(
  metadata: VjmlComponentMetadata,
  attributeName: string,
): string | null {
  return metadata.allowedAttributes[attributeName] ?? null
}

function isUnitLikeAttributeType(attributeType: string | null): boolean {
  return attributeType?.includes('unit(') === true
    || attributeType?.includes('unitWithNegative(') === true
}

function isIntegerAttributeType(attributeType: string | null): boolean {
  return attributeType?.startsWith('integer') === true
}

function isBooleanAttributeType(attributeType: string | null): boolean {
  return attributeType === 'boolean'
}

function resolveBooleanAttributeValue(
  attributeName: string,
  value: boolean,
  attributeType: string | null,
): string | null {
  const tokenBooleanValue = TOKEN_BOOLEAN_ATTRIBUTES[attributeName]

  if (tokenBooleanValue) {
    return value ? tokenBooleanValue : 'false'
  }

  if (isBooleanAttributeType(attributeType)) {
    return value ? 'true' : 'false'
  }

  return value ? 'true' : null
}

function serializeAttributeValue(
  attributeName: string,
  value: unknown,
  metadata: VjmlComponentMetadata,
): string | null {
  const attributeType = getAllowedAttributeType(metadata, attributeName)

  if (value === undefined || value === null) {
    return null
  }

  if (attributeName === 'css-class' || attributeName === 'mj-class') {
    const normalizedValue = normalizeClass(value)

    return normalizedValue.length > 0 ? normalizedValue : null
  }

  if (typeof value === 'boolean') {
    return resolveBooleanAttributeValue(attributeName, value, attributeType)
  }

  if (typeof value === 'number') {
    if (isIntegerAttributeType(attributeType)) {
      return `${Math.trunc(value)}`
    }

    if (isUnitLikeAttributeType(attributeType)) {
      return `${value}px`
    }

    return `${value}`
  }

  if (typeof value === 'string') {
    if (value === '') {
      const tokenBooleanValue = TOKEN_BOOLEAN_ATTRIBUTES[attributeName]

      if (tokenBooleanValue) {
        return tokenBooleanValue
      }

      if (isBooleanAttributeType(attributeType)) {
        return 'true'
      }
    }

    return value
  }

  return null
}

function getReservedContentValue(
  rawAttrs: Record<string, unknown>,
  attributeNames: readonly string[],
): {
  propName: 'content' | 'html' | 'text' | null
  propValue: string | null
} {
  for (const attributeName of attributeNames) {
    if (!Object.prototype.hasOwnProperty.call(rawAttrs, attributeName)) {
      continue
    }

    const rawValue = rawAttrs[attributeName]

    if (rawValue === undefined || rawValue === null) {
      return {
        propName: attributeName as 'content' | 'html' | 'text',
        propValue: null,
      }
    }

    if (
      typeof rawValue === 'string'
      || typeof rawValue === 'number'
      || typeof rawValue === 'boolean'
    ) {
      return {
        propName: attributeName as 'content' | 'html' | 'text',
        propValue: `${rawValue}`,
      }
    }
  }

  return {
    propName: null,
    propValue: null,
  }
}

function resolveComponentContent(
  rawAttrs: Record<string, unknown>,
  slots: Slots,
  metadata: VjmlComponentMetadata,
  validationReporter: VjmlValidationReporter | null,
): VjmlResolvedContent {
  const childNodes = slots.default?.() ?? []
  const slotKind = metadata.serialization.slotKind
  const preferredProp = slotKind === 'html'
    ? getReservedContentValue(rawAttrs, ['html', 'content'])
    : slotKind === 'text'
      ? getReservedContentValue(rawAttrs, ['text', 'content'])
      : getReservedContentValue(rawAttrs, ['content', 'html', 'text'])

  const hasSlotContent = childNodes.length > 0
  const hasPropContent = preferredProp.propName !== null

  if (slotKind === 'none' && (hasSlotContent || hasPropContent)) {
    validationReporter?.report({
      code: 'unexpected-content',
      message: `'${metadata.tagName}' does not accept child content.`,
      severity: 'warning',
      tagName: metadata.tagName,
    })
  }

  if (slotKind === 'mjml' && preferredProp.propName !== null) {
    validationReporter?.report({
      code: 'unexpected-content-prop',
      message: `'${metadata.tagName}' expects nested VJML children instead of a content prop.`,
      severity: 'warning',
      tagName: metadata.tagName,
    })
  }

  return {
    childNodes,
    hasContent: hasPropContent || hasSlotContent,
    propName: preferredProp.propName,
    propValue: preferredProp.propValue,
    slotKind,
    source: hasPropContent ? 'prop' : hasSlotContent ? 'slot' : 'none',
  }
}

function normalizeAttributes(
  rawAttrs: Record<string, unknown>,
  metadata: VjmlComponentMetadata,
): VjmlNormalizedAttributesResult {
  const attrs = { ...metadata.defaultAttributes }
  const explicitAttrs: Record<string, string> = {}

  for (const [rawAttributeName, rawValue] of Object.entries(rawAttrs)) {
    if (
      isVueListenerAttributeName(rawAttributeName)
      || isReservedContentAttributeName(rawAttributeName)
    ) {
      continue
    }

    const attributeName = normalizeAttributeName(rawAttributeName)
    const attributeIsKnown = attributeName in metadata.allowedAttributes

    if (!attributeIsKnown && !metadata.serialization.allowsArbitraryAttributes) {
      continue
    }

    const serializedValue = serializeAttributeValue(
      attributeName,
      rawValue,
      metadata,
    )

    if (serializedValue === null) {
      continue
    }

    if (attributeName === 'css-class' || attributeName === 'mj-class') {
      attrs[attributeName] = mergeTokenList(attrs[attributeName], serializedValue)
      explicitAttrs[attributeName] = mergeTokenList(
        explicitAttrs[attributeName],
        serializedValue,
      )
      continue
    }

    attrs[attributeName] = serializedValue
    explicitAttrs[attributeName] = serializedValue
  }

  return {
    attrs,
    explicitAttrs,
  }
}

function mergeResolvedAttributes(
  target: Record<string, string>,
  source: Readonly<Record<string, string>> | undefined,
  options: {
    omitMjClass?: boolean
  } = {},
) {
  if (!source) {
    return
  }

  for (const [attributeName, value] of Object.entries(source)) {
    if (value === undefined) {
      continue
    }

    if (options.omitMjClass && attributeName === 'mj-class') {
      continue
    }

    if (attributeName === 'css-class') {
      target[attributeName] = mergeTokenList(target[attributeName], value)
      continue
    }

    target[attributeName] = value
  }
}

function resolveNormalizedAttributes(
  rawAttrs: Record<string, unknown>,
  metadata: VjmlComponentMetadata,
  options: VjmlAttributeResolutionOptions = {},
): VjmlNormalizedAttributesResult {
  const normalized = normalizeAttributes(rawAttrs, metadata)
  const documentContext = options.documentContext

  if (!documentContext) {
    return normalized
  }

  const attrs = { ...metadata.defaultAttributes } as Record<string, string>
  const ownMjClasses = splitAttributeTokens(normalized.explicitAttrs['mj-class'])
  const inheritedMjClasses = splitAttributeTokens(options.inheritedMjClass)

  mergeResolvedAttributes(attrs, documentContext.state.defaultAttributes['mj-all'])
  mergeResolvedAttributes(attrs, documentContext.state.defaultAttributes[metadata.tagName])

  for (const className of ownMjClasses) {
    mergeResolvedAttributes(attrs, documentContext.state.classes[className])
  }

  for (const className of inheritedMjClasses) {
    mergeResolvedAttributes(
      attrs,
      documentContext.state.classesDefault[`${className}.${metadata.tagName}`],
    )
  }

  mergeResolvedAttributes(attrs, normalized.explicitAttrs, {
    omitMjClass: true,
  })

  return {
    attrs,
    explicitAttrs: normalized.explicitAttrs,
  }
}

function validateParentRelationship(
  metadata: VjmlComponentMetadata,
  parentTagName: string | null,
  validationReporter: VjmlValidationReporter | null,
) {
  if (
    !validationReporter
    || metadata.allowedParentTagNames.length === 0
    || (parentTagName && metadata.allowedParentTagNames.includes(parentTagName))
  ) {
    return
  }

  validationReporter.reportInvalidParent(
    metadata.tagName,
    parentTagName,
    metadata.allowedParentTagNames,
  )
}

function validateChildRelationship(
  metadata: VjmlComponentMetadata,
  parentTagName: string | null,
  validationReporter: VjmlValidationReporter | null,
) {
  if (!validationReporter || !parentTagName) {
    return
  }

  const parentMetadata = getVjmlComponentMetadata(parentTagName)

  if (
    !parentMetadata
    || parentMetadata.supportsAnyChildTag
    || parentMetadata.allowedChildTagNames.includes(metadata.tagName)
  ) {
    return
  }

  validationReporter.reportInvalidChild(
    parentMetadata.tagName,
    metadata.tagName,
    parentMetadata.allowedChildTagNames,
  )
}

export function normalizeVjmlAttributes(
  rawAttrs: Record<string, unknown>,
  metadata: VjmlComponentMetadata,
  options: VjmlAttributeResolutionOptions = {},
): VjmlNormalizedAttributesResult {
  return resolveNormalizedAttributes(rawAttrs, metadata, options)
}

export function resolveVjmlComponentContent(
  rawAttrs: Record<string, unknown>,
  slots: Slots,
  metadata: VjmlComponentMetadata,
  validationReporter: VjmlValidationReporter | null = null,
): VjmlResolvedContent {
  return resolveComponentContent(rawAttrs, slots, metadata, validationReporter)
}

export function createVjmlComponent<TExtra = undefined>(
  metadata: VjmlComponentMetadata,
  options: VjmlComponentFactoryOptions<TExtra>,
) {
  return tagVjmlComponent(defineComponent({
    name: options.name ?? `Vjml${metadata.componentBaseName}`,
    inheritAttrs: false,
    setup(_props, setupContext: SetupContext) {
      const parentTagName = inject(VJML_COMPONENT_TAG_NAME_KEY, null)
      const inheritedMjClass = inject(VJML_ACTIVE_MJ_CLASS_KEY, '')
      const documentContext = useVjmlDocumentContext()
      const bodyRenderContext = useVjmlBodyRenderContext()
      const headCollectionContext = useVjmlHeadCollectionContext()
      const validationReporter = useVjmlValidationReporter()
      const initialAttributes = normalizeAttributes(
        setupContext.attrs as Record<string, unknown>,
        metadata,
      )
      const initialActiveMjClass = initialAttributes.explicitAttrs['mj-class'] ?? inheritedMjClass

      validateParentRelationship(metadata, parentTagName, validationReporter)
      validateChildRelationship(metadata, parentTagName, validationReporter)

      provide(VJML_COMPONENT_TAG_NAME_KEY, metadata.tagName)
      provide(VJML_ACTIVE_MJ_CLASS_KEY, initialActiveMjClass)

      const extra = options.setup?.({
        activeMjClass: initialActiveMjClass,
        bodyRenderContext,
        documentContext,
        headCollectionContext,
        inheritedMjClass,
        metadata,
        parentTagName,
        slots: setupContext.slots,
        validationReporter,
      }) as TExtra

      return () => {
        const rawAttrs = setupContext.attrs as Record<string, unknown>
        const normalizedAttributes = resolveNormalizedAttributes(rawAttrs, metadata, {
          documentContext,
          inheritedMjClass,
        })
        const content = resolveComponentContent(
          rawAttrs,
          setupContext.slots,
          metadata,
          validationReporter,
        )
        const activeMjClass = normalizedAttributes.explicitAttrs['mj-class'] ?? inheritedMjClass

        return options.render({
          activeMjClass,
          attrs: normalizedAttributes.attrs,
          bodyRenderContext,
          content,
          documentContext,
          explicitAttrs: normalizedAttributes.explicitAttrs,
          headCollectionContext,
          inheritedMjClass,
          metadata,
          parentTagName,
          rawAttrs,
          slots: setupContext.slots,
          validationReporter,
        }, extra)
      }
    },
  }), metadata.tagName)
}
