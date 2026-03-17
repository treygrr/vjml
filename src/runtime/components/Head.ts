import { getVjmlComponentMetadata } from '../../metadata'

import { createVjmlComponent } from '../internal/factory'
import { collectVjmlHeadFromVNodes } from '../internal/head'
import { flattenVjmlVNodes } from '../internal/vnodes'

const metadata = getVjmlComponentMetadata('mj-head')

if (!metadata) {
  throw new Error('Missing metadata for \'mj-head\'.')
}

export default createVjmlComponent(metadata, {
  name: 'VjmlHead',
  render({ content, headCollectionContext, validationReporter }) {
    collectVjmlHeadFromVNodes(
      flattenVjmlVNodes(content.childNodes),
      headCollectionContext,
      validationReporter,
    )

    return ''
  },
})
