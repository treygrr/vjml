import { h } from 'vue'

import { requireVjmlComponentMetadata } from '../internal/componentMetadata'
import { renderVjmlContentNodes } from '../internal/content'
import { createVjmlComponent } from '../internal/factory'
import { compactStyleRecord } from '../internal/layout'
import {
  mergeVjmlInheritedAttributes,
  useVjmlAccordionElementContext,
} from '../internal/interactive'

const metadata = requireVjmlComponentMetadata('mj-accordion-text')

function resolveAccordionTextFontFamily(
  explicitAttrs: Readonly<Record<string, string>>,
  inheritedAttrs: Readonly<Record<string, string>>,
): string | undefined {
  if (explicitAttrs['font-family'] !== undefined) {
    return explicitAttrs['font-family']
  }

  return inheritedAttrs['font-family']
}

export default createVjmlComponent(metadata, {
  name: 'VjmlAccordionText',
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
    const fontFamily = resolveAccordionTextFontFamily(
      explicitAttrs,
      extra.accordionElementContext.inheritedAttrs,
    )

    return h('div', {
      class: 'mj-accordion-content',
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
          h('tr', [
            h('td', {
              class: resolvedAttrs['css-class'] || undefined,
              style: compactStyleRecord({
                'background': resolvedAttrs['background-color'],
                'color': resolvedAttrs.color,
                'font-family': fontFamily,
                'font-size': resolvedAttrs['font-size'],
                'font-weight': resolvedAttrs['font-weight'],
                'letter-spacing': resolvedAttrs['letter-spacing'],
                'line-height': resolvedAttrs['line-height'],
                'padding': resolvedAttrs.padding,
                'padding-bottom': resolvedAttrs['padding-bottom'],
                'padding-left': resolvedAttrs['padding-left'],
                'padding-right': resolvedAttrs['padding-right'],
                'padding-top': resolvedAttrs['padding-top'],
              }),
            }, renderVjmlContentNodes(content)),
          ]),
        ]),
      ]),
    ])
  },
})
