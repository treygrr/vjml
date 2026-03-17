import { h } from 'vue'

import { requireVjmlComponentMetadata } from '../internal/componentMetadata'
import { renderVjmlContentNodes } from '../internal/content'
import { createVjmlComponent } from '../internal/factory'
import { conditionalTag } from '../internal/helpers/conditional'
import {
  compactStyleRecord,
  createVjmlStaticHtml,
  renderHtmlAttributes,
} from '../internal/layout'
import {
  mergeVjmlInheritedAttributes,
  useVjmlAccordionElementContext,
} from '../internal/interactive'

const metadata = requireVjmlComponentMetadata('mj-accordion-title')

function resolveAccordionTitleFontFamily(
  explicitAttrs: Readonly<Record<string, string>>,
  inheritedAttrs: Readonly<Record<string, string>>,
): string | undefined {
  if (explicitAttrs['font-family'] !== undefined) {
    return explicitAttrs['font-family']
  }

  return inheritedAttrs['font-family']
}

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
    const fontFamily = resolveAccordionTitleFontFamily(
      explicitAttrs,
      extra.accordionElementContext.inheritedAttrs,
    )
    const titleCell = h('td', {
      class: resolvedAttrs['css-class'] || undefined,
      style: compactStyleRecord({
        'background-color': resolvedAttrs['background-color'],
        'color': resolvedAttrs.color,
        'font-family': fontFamily,
        'font-size': resolvedAttrs['font-size'],
        'font-weight': resolvedAttrs['font-weight'],
        'padding': resolvedAttrs.padding,
        'padding-bottom': resolvedAttrs['padding-bottom'],
        'padding-left': resolvedAttrs['padding-left'],
        'padding-right': resolvedAttrs['padding-right'],
        'padding-top': resolvedAttrs['padding-top'],
        'width': '100%',
      }),
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
