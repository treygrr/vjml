import { h } from 'vue'

import { requireVjmlComponentMetadata } from '../internal/componentMetadata'
import { createVjmlComponent } from '../internal/factory'

const metadata = requireVjmlComponentMetadata('mj-spacer')

export default createVjmlComponent(metadata, {
  name: 'VjmlSpacer',
  render({ attrs }) {
    return h('div', {
      style: {
        'height': attrs.height,
        'line-height': attrs.height,
      },
    }, '\u200A')
  },
})
