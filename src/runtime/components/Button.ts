import { h } from 'vue'

import { requireVjmlComponentMetadata } from '../internal/componentMetadata'
import { renderVjmlContentNodes } from '../internal/content'
import { createVjmlComponent } from '../internal/factory'
import { widthParser } from '../internal/helpers/measurements'
import {
  getBoxWidths,
  getShorthandAttrValue,
  useVjmlLayoutContext,
} from '../internal/layout'

const metadata = requireVjmlComponentMetadata('mj-button')

function calculateContentWidth(
  attrs: Readonly<Record<string, string>>,
  containerWidth: string,
): string | undefined {
  if (!attrs.width) {
    return undefined
  }

  const parsedWidth = widthParser(attrs.width, {
    parseFloatToInt: false,
  })

  if (parsedWidth.unit !== 'px') {
    return undefined
  }

  const { borders } = getBoxWidths(containerWidth, attrs)
  const innerPaddings = getShorthandAttrValue(attrs, 'inner-padding', 'left')
    + getShorthandAttrValue(attrs, 'inner-padding', 'right')

  return `${parsedWidth.parsedWidth - innerPaddings - borders}px`
}

export default createVjmlComponent(metadata, {
  name: 'VjmlButton',
  setup() {
    return {
      layoutContext: useVjmlLayoutContext(),
    }
  },
  render({ attrs, content }, extra) {
    const tagName = attrs.href ? 'a' : 'p'
    const contentWidth = calculateContentWidth(
      attrs,
      extra.layoutContext.containerWidth,
    )

    return h('table', {
      border: '0',
      cellpadding: '0',
      cellspacing: '0',
      role: 'presentation',
      style: {
        'border-collapse': 'separate',
        'line-height': '100%',
        'width': attrs.width,
      },
    }, [
      h('tbody', [
        h('tr', [
          h('td', {
            align: 'center',
            bgcolor: attrs['background-color'] === 'none'
              ? undefined
              : attrs['background-color'],
            role: 'presentation',
            style: {
              'background': attrs['background-color'],
              'border': attrs.border,
              'border-bottom': attrs['border-bottom'],
              'border-left': attrs['border-left'],
              'border-radius': attrs['border-radius'],
              'border-right': attrs['border-right'],
              'border-top': attrs['border-top'],
              'cursor': 'auto',
              'font-style': attrs['font-style'],
              'height': attrs.height,
              'mso-padding-alt': attrs['inner-padding'],
              'text-align': attrs['text-align'],
            },
            valign: attrs['vertical-align'],
          }, [
            h(tagName, {
              href: attrs.href,
              name: attrs.name,
              rel: attrs.rel,
              style: {
                'background': attrs['background-color'],
                'border-radius': attrs['border-radius'],
                'color': attrs.color,
                'display': 'inline-block',
                'font-family': attrs['font-family'],
                'font-size': attrs['font-size'],
                'font-style': attrs['font-style'],
                'font-weight': attrs['font-weight'],
                'letter-spacing': attrs['letter-spacing'],
                'line-height': attrs['line-height'],
                'margin': '0',
                'mso-padding-alt': '0px',
                'padding': attrs['inner-padding'],
                'text-decoration': attrs['text-decoration'],
                'text-transform': attrs['text-transform'],
                'width': contentWidth,
              },
              target: tagName === 'a' ? attrs.target : undefined,
              title: attrs.title,
            }, renderVjmlContentNodes(content)),
          ]),
        ]),
      ]),
    ])
  },
})
