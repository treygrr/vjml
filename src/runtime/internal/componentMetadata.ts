import {
  getVjmlComponentMetadata,
  type VjmlComponentMetadata,
} from '../../metadata'

export function requireVjmlComponentMetadata(
  tagName: string,
): VjmlComponentMetadata {
  const metadata = getVjmlComponentMetadata(tagName)

  if (!metadata) {
    throw new Error(`Missing VJML metadata for '${tagName}'.`)
  }

  return metadata
}
