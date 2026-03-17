import { h } from 'vue'

import { requireVjmlComponentMetadata } from '../internal/componentMetadata'
import { createVjmlComponent } from '../internal/factory'
import { conditionalTag, msoConditionalTag } from '../internal/helpers/conditional'
import { makeLowerBreakpoint } from '../internal/helpers/measurements'
import {
  analyzeVjmlChildNodes,
  createVjmlStaticHtml,
  renderHtmlAttributes,
} from '../internal/layout'
import {
  createVjmlInteractiveId,
  createVjmlNavbarContextState,
  provideVjmlNavbarContext,
} from '../internal/interactive'

const metadata = requireVjmlComponentMetadata('mj-navbar')

function renderHamburgerMarkup(
  attrs: Readonly<Record<string, string>>,
  hamburgerId: string,
): string {
  return [
    msoConditionalTag(
      `<input type="checkbox" id="${hamburgerId}" class="mj-menu-checkbox" style="display:none !important; max-height:0; visibility:hidden;" />`,
      true,
    ),
    `<div${renderHtmlAttributes({
      class: 'mj-menu-trigger',
      style: {
        'display': 'none',
        'font-size': '0px',
        'max-height': '0px',
        'max-width': '0px',
        'overflow': 'hidden',
      },
    })}>`,
    `<label${renderHtmlAttributes({
      align: attrs['ico-align'] || undefined,
      class: 'mj-menu-label',
      for: hamburgerId,
      style: {
        'display': 'block',
        'cursor': 'pointer',
        'mso-hide': 'all',
        '-moz-user-select': 'none',
        'user-select': 'none',
        'color': attrs['ico-color'],
        'font-size': attrs['ico-font-size'],
        'font-family': attrs['ico-font-family'],
        'text-transform': attrs['ico-text-transform'],
        'text-decoration': attrs['ico-text-decoration'],
        'line-height': attrs['ico-line-height'],
        'padding': attrs['ico-padding'],
        'padding-top': attrs['ico-padding-top'],
        'padding-right': attrs['ico-padding-right'],
        'padding-bottom': attrs['ico-padding-bottom'],
        'padding-left': attrs['ico-padding-left'],
      },
    })}>`,
    `<span${renderHtmlAttributes({
      class: 'mj-menu-icon-open',
      style: {
        'mso-hide': 'all',
      },
    })}>${attrs['ico-open']}</span>`,
    `<span${renderHtmlAttributes({
      class: 'mj-menu-icon-close',
      style: {
        'display': 'none',
        'mso-hide': 'all',
      },
    })}>${attrs['ico-close']}</span>`,
    '</label>',
    '</div>',
  ].join('')
}

export default createVjmlComponent(metadata, {
  name: 'VjmlNavbar',
  setup({ bodyRenderContext }) {
    bodyRenderContext?.addHeadStyle(
      'mj-navbar',
      breakpoint => `
      noinput.mj-menu-checkbox { display:block!important; max-height:none!important; visibility:visible!important; }

      @media only screen and (max-width:${makeLowerBreakpoint(breakpoint)}) {
        .mj-menu-checkbox[type="checkbox"] ~ .mj-inline-links { display:none!important; }
        .mj-menu-checkbox[type="checkbox"]:checked ~ .mj-inline-links,
        .mj-menu-checkbox[type="checkbox"] ~ .mj-menu-trigger { display:block!important; max-width:none!important; max-height:none!important; font-size:inherit!important; }
        .mj-menu-checkbox[type="checkbox"] ~ .mj-inline-links > a { display:block!important; }
        .mj-menu-checkbox[type="checkbox"]:checked ~ .mj-menu-trigger .mj-menu-icon-close { display:block!important; }
        .mj-menu-checkbox[type="checkbox"]:checked ~ .mj-menu-trigger .mj-menu-icon-open { display:none!important; }
      }
    `,
    )

    const navbarContext = createVjmlNavbarContextState(
      createVjmlInteractiveId(),
    )

    provideVjmlNavbarContext(navbarContext)

    return {
      navbarContext,
    }
  },
  render({ attrs, content }, extra) {
    const childEntries = analyzeVjmlChildNodes(content.childNodes)

    extra.navbarContext.baseUrl = attrs['base-url'] ?? null

    const inlineLinksNode = h('div', {
      class: 'mj-inline-links',
    }, [
      createVjmlStaticHtml(conditionalTag(
        `<table role="presentation" border="0" cellpadding="0" cellspacing="0" align="${attrs.align}"><tr>`,
      )),
      ...childEntries.map(entry => entry.vnode),
      createVjmlStaticHtml(conditionalTag('</tr></table>')),
    ])

    if (attrs.hamburger !== 'hamburger') {
      return inlineLinksNode
    }

    return [
      createVjmlStaticHtml(renderHamburgerMarkup(
        attrs,
        extra.navbarContext.hamburgerId,
      )),
      inlineLinksNode,
    ]
  },
})
