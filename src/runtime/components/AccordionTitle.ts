import { h } from 'vue'

import { requireVjmlComponentMetadata } from '../internal/componentMetadata'
import { renderVjmlContentNodes } from '../internal/content'
import { createVjmlComponent } from '../internal/factory'
import { conditionalTag } from '../internal/helpers/conditional'
import {
  createVjmlStaticHtml,
  renderHtmlAttributes,
} from '../internal/layout'
import {
  mergeVjmlInheritedAttributes,
  useVjmlAccordionElementContext,
} from '../internal/interactive'

const metadata = requireVjmlComponentMetadata('mj-accordion-title')

export default createVjmlComponent(metadata, {
  name: 'VjmlAccordionTitle',
  setup() {
    return {
      accordionElementContext: useVjmlAccordionElementContext(),
    }
  },
  render({ attrs, content, explicitAttrs }, extra) {
    const resolvedAttrs = mergeVjmlInheritedAttributes(
      attrs,
      explicitAttrs,
      extra.accordionElementContext.inheritedAttrs,
    )
    const titleCell = h('td', {
      class: resolvedAttrs['css-class'] || undefined,
      style: {
        'background-color': resolvedAttrs['background-color'],
        'color': resolvedAttrs.color,
        'font-family': resolvedAttrs['font-family'],
        'font-size': resolvedAttrs['font-size'],
        'font-weight': resolvedAttrs['font-weight'],
        'padding': resolvedAttrs.padding,
        'padding-bottom': resolvedAttrs['padding-bottom'],
        'padding-left': resolvedAttrs['padding-left'],
        'padding-right': resolvedAttrs['padding-right'],
        'padding-top': resolvedAttrs['padding-top'],
        'width': '100%',
      },
    }, renderVjmlContentNodes(content))
    const iconCell = createVjmlStaticHtml(conditionalTag(
      `<td${renderHtmlAttributes({
        class: 'mj-accordion-ico',
        style: {
          'background': resolvedAttrs['background-color'],
          'padding': '16px',
          'vertical-align': resolvedAttrs['icon-align'],
        },
      })}><img${renderHtmlAttributes({
        alt: resolvedAttrs['icon-wrapped-alt'],
        class: 'mj-accordion-more',
        src: resolvedAttrs['icon-wrapped-url'],
        style: {
          display: 'none',
          height: resolvedAttrs['icon-height'],
          width: resolvedAttrs['icon-width'],
        },
      })} /><img${renderHtmlAttributes({
        alt: resolvedAttrs['icon-unwrapped-alt'],
        class: 'mj-accordion-less',
        src: resolvedAttrs['icon-unwrapped-url'],
        style: {
          display: 'none',
          height: resolvedAttrs['icon-height'],
          width: resolvedAttrs['icon-width'],
        },
      })} /></td>`,
      true,
    ))

    return h('div', {
      class: 'mj-accordion-title',
    }, [
      h('table', {
        cellpadding: '0',
        cellspacing: '0',
        style: {
          'border-bottom': resolvedAttrs.border,
          'width': '100%',
        },
      }, [
        h('tbody', [
          h('tr', resolvedAttrs['icon-position'] === 'right'
            ? [titleCell, iconCell]
            : [iconCell, titleCell]),
        ]),
      ]),
    ])
  },
})
