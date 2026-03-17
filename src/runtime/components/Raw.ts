import { requireVjmlComponentMetadata } from '../internal/componentMetadata'
import { renderVjmlContentNodes } from '../internal/content'
import { createVjmlComponent } from '../internal/factory'

const metadata = requireVjmlComponentMetadata('mj-raw')

export default createVjmlComponent(metadata, {
  name: 'VjmlRaw',
  render({ content }) {
    return renderVjmlContentNodes(content)
  },
})
