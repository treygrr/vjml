import { h } from 'vue'

import { requireVjmlComponentMetadata } from '../internal/componentMetadata'
import { createVjmlComponent } from '../internal/factory'
import { conditionalTag } from '../internal/helpers/conditional'
import {
  analyzeVjmlChildNodes,
  createVjmlStaticHtml,
} from '../internal/layout'
import {
  createVjmlSocialContextState,
  provideVjmlSocialContext,
} from '../internal/interactive'

const metadata = requireVjmlComponentMetadata('mj-social')

const SOCIAL_INHERITED_ATTRIBUTE_NAMES = [
  'border-radius',
  'color',
  'font-family',
  'font-size',
  'font-weight',
  'font-style',
  'icon-size',
  'icon-height',
  'icon-padding',
  'line-height',
  'text-decoration',
  'text-padding',
] as const

function getSocialInheritedAttrs(attrs: Readonly<Record<string, string>>): Record<string, string> {
  const inheritedAttrs = Object.fromEntries(
    SOCIAL_INHERITED_ATTRIBUTE_NAMES
      .map(attributeName => [attributeName, attrs[attributeName]])
      .filter(([, value]) => value !== undefined),
  ) as Record<string, string>

  if (attrs['inner-padding']) {
    inheritedAttrs.padding = attrs['inner-padding']
  }

  return inheritedAttrs
}

export default createVjmlComponent(metadata, {
  name: 'VjmlSocial',
  setup() {
    const socialContext = createVjmlSocialContextState()

    provideVjmlSocialContext(socialContext)

    return {
      socialContext,
    }
  },
  render({ attrs, content }, extra) {
    const childEntries = analyzeVjmlChildNodes(content.childNodes)

    extra.socialContext.inheritedAttrs = getSocialInheritedAttrs(attrs)

    if (attrs.mode === 'vertical') {
      return h('table', {
        border: '0',
        cellpadding: '0',
        cellspacing: '0',
        role: 'presentation',
        style: {
          margin: '0px',
        },
      }, [
        h('tbody', childEntries.map(entry => entry.vnode)),
      ])
    }

    return [
      createVjmlStaticHtml(conditionalTag(
        `<table align="${attrs.align}" border="0" cellpadding="0" cellspacing="0" role="presentation"><tr>`,
      )),
      ...childEntries.flatMap((entry) => {
        if (entry.rawElement) {
          return [entry.vnode]
        }

        return [
          createVjmlStaticHtml(conditionalTag('<td>')),
          h('table', {
            align: attrs.align || undefined,
            border: '0',
            cellpadding: '0',
            cellspacing: '0',
            role: 'presentation',
            style: {
              display: 'inline-table',
              float: 'none',
            },
          }, [
            h('tbody', [entry.vnode]),
          ]),
          createVjmlStaticHtml(conditionalTag('</td>')),
        ]
      }),
      createVjmlStaticHtml(conditionalTag('</tr></table>')),
    ]
  },
})
