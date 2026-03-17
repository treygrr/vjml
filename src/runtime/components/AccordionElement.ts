import { h } from 'vue'

import { requireVjmlComponentMetadata } from '../internal/componentMetadata'
import { createVjmlComponent } from '../internal/factory'
import { conditionalTag } from '../internal/helpers/conditional'
import { analyzeVjmlChildNodes, createVjmlStaticHtml } from '../internal/layout'
import {
  createVjmlAccordionElementContextState,
  mergeVjmlInheritedAttributes,
  provideVjmlAccordionElementContext,
  useVjmlAccordionContext,
} from '../internal/interactive'
import AccordionText from './AccordionText'
import AccordionTitle from './AccordionTitle'

const metadata = requireVjmlComponentMetadata('mj-accordion-element')

export default createVjmlComponent(metadata, {
  name: 'VjmlAccordionElement',
  setup() {
    const accordionElementContext = createVjmlAccordionElementContextState()

    provideVjmlAccordionElementContext(accordionElementContext)

    return {
      accordionContext: useVjmlAccordionContext(),
      accordionElementContext,
    }
  },
  render({ attrs, content, explicitAttrs }, extra) {
    const resolvedAttrs = mergeVjmlInheritedAttributes(
      attrs,
      explicitAttrs,
      extra.accordionContext.inheritedAttrs,
    )
    const childEntries = analyzeVjmlChildNodes(content.childNodes)
    const childNodes = childEntries.map(entry => entry.vnode)
    const hasTitle = childEntries.some(entry => entry.tagName === 'mj-accordion-title')
    const hasText = childEntries.some(entry => entry.tagName === 'mj-accordion-text')

    extra.accordionElementContext.inheritedAttrs = resolvedAttrs

    return h('tr', {
      class: resolvedAttrs['css-class'] || undefined,
    }, [
      h('td', {
        style: {
          'background-color': resolvedAttrs['background-color'],
          'padding': '0px',
        },
      }, [
        h('label', {
          class: 'mj-accordion-element',
          style: {
            'font-family': resolvedAttrs['font-family'],
            'font-size': '13px',
          },
        }, [
          createVjmlStaticHtml(conditionalTag(
            '<input class="mj-accordion-checkbox" type="checkbox" style="display:none;" />',
            true,
          )),
          h('div', [
            !hasTitle ? h(AccordionTitle) : null,
            ...childNodes,
            !hasText ? h(AccordionText) : null,
          ]),
        ]),
      ]),
    ])
  },
})
