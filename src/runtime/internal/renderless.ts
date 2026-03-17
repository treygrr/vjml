import { createVjmlComponent } from './factory'
import { requireVjmlComponentMetadata } from './componentMetadata'

export function createVjmlRenderlessComponent(
  tagName: string,
  name?: string,
) {
  return createVjmlComponent(requireVjmlComponentMetadata(tagName), {
    name,
    render: () => '',
  })
}
