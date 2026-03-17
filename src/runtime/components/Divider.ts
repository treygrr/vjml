import { h } from 'vue'

import { requireVjmlComponentMetadata } from '../internal/componentMetadata'
import { createVjmlComponent } from '../internal/factory'
import { conditionalTag } from '../internal/helpers/conditional'
import {
  createVjmlStaticHtml,
  getShorthandAttrValue,
  useVjmlLayoutContext,
} from '../internal/layout'
import { widthParser } from '../internal/helpers/measurements'

const metadata = requireVjmlComponentMetadata('mj-divider')

function getDividerMargin(align: string | undefined): string {
  switch (align) {
    case 'left':
      return '0px'
    case 'right':
      return '0px 0px 0px auto'
    default:
      return '0px auto'
  }
}

function getOutlookWidth(
  width: string,
  containerWidth: string,
  attrs: Readonly<Record<string, string>>,
): string {
  const paddingSize = getShorthandAttrValue(attrs, 'padding', 'left')
    + getShorthandAttrValue(attrs, 'padding', 'right')
  const parsedWidth = widthParser(width)

  if (parsedWidth.unit === '%') {
    const effectiveWidth = Number.parseInt(containerWidth, 10) - paddingSize
    const percentMultiplier = parsedWidth.parsedWidth / 100

    return `${effectiveWidth * percentMultiplier}px`
  }

  return width
}

export default createVjmlComponent(metadata, {
  name: 'VjmlDivider',
  setup() {
    return {
      layoutContext: useVjmlLayoutContext(),
    }
  },
  render({ attrs }, extra) {
    const margin = getDividerMargin(attrs.align)
    const width = attrs.width ?? '100%'

    return [
      h('p', {
        style: {
          'border-top': [
            attrs['border-style'],
            attrs['border-width'],
            attrs['border-color'],
          ].join(' '),
          'font-size': '1px',
          'margin': margin,
          'width': width,
        },
      }),
      createVjmlStaticHtml(conditionalTag(
        `<table align="${attrs.align}" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-top:${[attrs['border-style'], attrs['border-width'], attrs['border-color']].join(' ')};font-size:1px;margin:${margin};width:${getOutlookWidth(width, extra.layoutContext.containerWidth, attrs)};" width="${getOutlookWidth(width, extra.layoutContext.containerWidth, attrs)}"><tr><td style="height:0;line-height:0;">&nbsp;</td></tr></table>`,
      )),
    ]
  },
})
