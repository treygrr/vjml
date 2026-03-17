import { h } from 'vue'

import { requireVjmlComponentMetadata } from '../internal/componentMetadata'
import { renderVjmlContentNodes } from '../internal/content'
import { createVjmlComponent } from '../internal/factory'
import { conditionalTag } from '../internal/helpers/conditional'
import {
  createVjmlStaticHtml,
  renderHtmlAttributes,
  suffixCssClasses,
} from '../internal/layout'
import { useVjmlNavbarContext } from '../internal/interactive'

const metadata = requireVjmlComponentMetadata('mj-navbar-link')

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
    const anchorNode = h('a', {
      class: ['mj-link', attrs['css-class']].filter(Boolean).join(' '),
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
    }, renderVjmlContentNodes(content))

    return [
      createVjmlStaticHtml(conditionalTag(
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
      )),
      anchorNode,
      createVjmlStaticHtml(conditionalTag('</td>')),
    ]
  },
})
