import { h } from 'vue'

import { requireVjmlComponentMetadata } from '../internal/componentMetadata'
import { renderVjmlContentNodes } from '../internal/content'
import { createVjmlComponent } from '../internal/factory'
import { conditionalTag } from '../internal/helpers/conditional'
import { createVjmlStaticHtml } from '../internal/layout'

const metadata = requireVjmlComponentMetadata('mj-text')

export default createVjmlComponent(metadata, {
  name: 'VjmlText',
  render({ attrs, content }) {
    const contentNode = h('div', {
      style: {
        'color': attrs.color,
        'font-family': attrs['font-family'],
        'font-size': attrs['font-size'],
        'font-style': attrs['font-style'],
        'font-weight': attrs['font-weight'],
        'height': attrs.height,
        'letter-spacing': attrs['letter-spacing'],
        'line-height': attrs['line-height'],
        'text-align': attrs.align,
        'text-decoration': attrs['text-decoration'],
        'text-transform': attrs['text-transform'],
      },
    }, renderVjmlContentNodes(content))

    if (!attrs.height) {
      return contentNode
    }

    return [
      createVjmlStaticHtml(conditionalTag(
        `<table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td height="${attrs.height}" style="vertical-align:top;height:${attrs.height};">`,
      )),
      contentNode,
      createVjmlStaticHtml(conditionalTag('</td></tr></table>')),
    ]
  },
})
