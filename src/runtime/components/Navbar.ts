import { h } from 'vue'

import { requireVjmlComponentMetadata } from '../internal/componentMetadata'
import { createVjmlComponent } from '../internal/factory'
import { conditionalTag, msoConditionalTag } from '../internal/helpers/conditional'
import { makeLowerBreakpoint } from '../internal/helpers/measurements'
import { analyzeVjmlChildNodes, createVjmlStaticHtml } from '../internal/layout'
import {
  createVjmlInteractiveId,
  createVjmlNavbarContextState,
  provideVjmlNavbarContext,
} from '../internal/interactive'

const metadata = requireVjmlComponentMetadata('mj-navbar')

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
      createVjmlInteractiveId('mj-navbar'),
    )

    provideVjmlNavbarContext(navbarContext)

    return {
      navbarContext,
    }
  },
  render({ attrs, content }, extra) {
    const childEntries = analyzeVjmlChildNodes(content.childNodes)

    extra.navbarContext.baseUrl = attrs['base-url'] ?? null

    return [
      attrs.hamburger === 'hamburger'
        ? createVjmlStaticHtml(msoConditionalTag(
            `<input type="checkbox" id="${extra.navbarContext.hamburgerId}" class="mj-menu-checkbox" style="display:none !important; max-height:0; visibility:hidden;" />`,
            true,
          ))
        : '',
      attrs.hamburger === 'hamburger'
        ? h('div', {
            class: 'mj-menu-trigger',
            style: {
              'display': 'none',
              'font-size': '0px',
              'max-height': '0px',
              'max-width': '0px',
              'overflow': 'hidden',
            },
          }, [
            h('label', {
              align: attrs['ico-align'] || undefined,
              class: 'mj-menu-label',
              for: extra.navbarContext.hamburgerId,
              style: {
                '-moz-user-select': 'none',
                'color': attrs['ico-color'],
                'cursor': 'pointer',
                'display': 'block',
                'font-family': attrs['ico-font-family'],
                'font-size': attrs['ico-font-size'],
                'line-height': attrs['ico-line-height'],
                'mso-hide': 'all',
                'padding': attrs['ico-padding'],
                'padding-top': attrs['ico-padding-top'],
                'padding-right': attrs['ico-padding-right'],
                'padding-bottom': attrs['ico-padding-bottom'],
                'padding-left': attrs['ico-padding-left'],
                'text-decoration': attrs['ico-text-decoration'],
                'text-transform': attrs['ico-text-transform'],
                'userSelect': 'none',
              },
            }, [
              h('span', {
                class: 'mj-menu-icon-open',
                style: {
                  'mso-hide': 'all',
                },
                innerHTML: attrs['ico-open'],
              }),
              h('span', {
                class: 'mj-menu-icon-close',
                style: {
                  'display': 'none',
                  'mso-hide': 'all',
                },
                innerHTML: attrs['ico-close'],
              }),
            ]),
          ])
        : null,
      h('div', {
        class: 'mj-inline-links',
        style: '',
      }, [
        createVjmlStaticHtml(conditionalTag(
          `<table role="presentation" border="0" cellpadding="0" cellspacing="0" align="${attrs.align}"><tr>`,
        )),
        ...childEntries.map(entry => entry.vnode),
        createVjmlStaticHtml(conditionalTag('</tr></table>')),
      ]),
    ]
  },
})
