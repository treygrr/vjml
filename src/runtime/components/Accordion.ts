import { h } from 'vue'

import { requireVjmlComponentMetadata } from '../internal/componentMetadata'
import { createVjmlComponent } from '../internal/factory'
import { analyzeVjmlChildNodes } from '../internal/layout'
import {
  createVjmlAccordionContextState,
  provideVjmlAccordionContext,
} from '../internal/interactive'

const metadata = requireVjmlComponentMetadata('mj-accordion')

export default createVjmlComponent(metadata, {
  name: 'VjmlAccordion',
  setup({ bodyRenderContext }) {
    bodyRenderContext?.addHeadStyle(
      'mj-accordion',
      () => `
      noinput.mj-accordion-checkbox { display:block!important; }

      @media yahoo, only screen and (min-width:0) {
        .mj-accordion-element { display:block; }
        input.mj-accordion-checkbox, .mj-accordion-less { display:none!important; }
        input.mj-accordion-checkbox + * .mj-accordion-title { cursor:pointer; touch-action:manipulation; -webkit-user-select:none; -moz-user-select:none; user-select:none; }
        input.mj-accordion-checkbox + * .mj-accordion-content { overflow:hidden; display:none; }
        input.mj-accordion-checkbox + * .mj-accordion-more { display:block!important; }
        input.mj-accordion-checkbox:checked + * .mj-accordion-content { display:block; }
        input.mj-accordion-checkbox:checked + * .mj-accordion-more { display:none!important; }
        input.mj-accordion-checkbox:checked + * .mj-accordion-less { display:block!important; }
      }

      .moz-text-html input.mj-accordion-checkbox + * .mj-accordion-title { cursor:auto; touch-action:auto; -webkit-user-select:auto; -moz-user-select:auto; user-select:auto; }
      .moz-text-html input.mj-accordion-checkbox + * .mj-accordion-content { overflow:hidden; display:block; }
      .moz-text-html input.mj-accordion-checkbox + * .mj-accordion-ico { display:none; }

      @goodbye { @gmail }
    `,
    )

    const accordionContext = createVjmlAccordionContextState()

    provideVjmlAccordionContext(accordionContext)

    return {
      accordionContext,
    }
  },
  render({ attrs, content }, extra) {
    const childEntries = analyzeVjmlChildNodes(content.childNodes)

    extra.accordionContext.inheritedAttrs = Object.fromEntries(
      [
        'border',
        'font-family',
        'icon-align',
        'icon-width',
        'icon-height',
        'icon-position',
        'icon-wrapped-url',
        'icon-wrapped-alt',
        'icon-unwrapped-url',
        'icon-unwrapped-alt',
      ]
        .map(attributeName => [attributeName, attrs[attributeName]])
        .filter(([, value]) => value !== undefined),
    ) as Record<string, string>

    return h('table', {
      cellpadding: '0',
      cellspacing: '0',
      class: 'mj-accordion',
      style: {
        'border': attrs.border,
        'border-bottom': 'none',
        'border-collapse': 'collapse',
        'font-family': attrs['font-family'],
        'width': '100%',
      },
    }, [
      h('tbody', childEntries.map(entry => entry.vnode)),
    ])
  },
})
