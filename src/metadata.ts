import {
  STATIC_VJML_COMPONENT_METADATA,
  STATIC_VJML_MANUAL_COMPONENT_TAG_NAMES,
} from './metadata.generated'

export type VjmlComponentMetadataSource = 'manual' | 'preset-core'

export type VjmlComponentSlotKind = 'html' | 'mjml' | 'none' | 'text'

export interface VjmlComponentSerializationMetadata {
  allowsArbitraryAttributes: boolean
  preservesRawContent: boolean
  slotKind: VjmlComponentSlotKind
}

export interface VjmlComponentMetadata {
  tagName: string
  componentBaseName: string
  source: VjmlComponentMetadataSource
  allowedAttributes: Record<string, string>
  defaultAttributes: Record<string, string>
  allowedChildTagNames: string[]
  allowedParentTagNames: string[]
  supportsAnyChildTag: boolean
  endingTag: boolean
  rawElement: boolean
  serialization: VjmlComponentSerializationMetadata
}

export const VJML_COMPONENT_METADATA: readonly VjmlComponentMetadata[] = Object.freeze(
  STATIC_VJML_COMPONENT_METADATA as unknown as VjmlComponentMetadata[],
)

export const VJML_COMPONENT_METADATA_BY_TAG_NAME: Readonly<
  Record<string, VjmlComponentMetadata>
> = Object.freeze(
  Object.fromEntries(
    VJML_COMPONENT_METADATA.map(metadata => [metadata.tagName, metadata]),
  ),
)

export const VJML_MANUAL_COMPONENT_TAG_NAMES: readonly string[] = Object.freeze(
  [...STATIC_VJML_MANUAL_COMPONENT_TAG_NAMES],
)

export function getVjmlComponentMetadata(
  tagName: string,
): VjmlComponentMetadata | null {
  return VJML_COMPONENT_METADATA_BY_TAG_NAME[tagName.trim().toLowerCase()] ?? null
}
