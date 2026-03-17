import { h } from 'vue'

import { requireVjmlComponentMetadata } from '../internal/componentMetadata'
import { createVjmlComponent } from '../internal/factory'
import { makeLowerBreakpoint } from '../internal/helpers/measurements'
import { getBoxWidths, useVjmlLayoutContext } from '../internal/layout'

const metadata = requireVjmlComponentMetadata('mj-image')

function getContentWidth(
  attrs: Readonly<Record<string, string>>,
  containerWidth: string,
): number {
  const width = attrs.width ? Number.parseInt(attrs.width, 10) : Number.POSITIVE_INFINITY
  const { box } = getBoxWidths(containerWidth, attrs)

  return Math.min(box, width)
}

function getImageHeight(height: string | undefined): number | string | undefined {
  if (!height) {
    return undefined
  }

  if (height === 'auto') {
    return height
  }

  const parsedHeight = Number.parseInt(height, 10)

  return Number.isNaN(parsedHeight) ? height : parsedHeight
}

export default createVjmlComponent(metadata, {
  name: 'VjmlImage',
  setup({ bodyRenderContext }) {
    const layoutContext = useVjmlLayoutContext()

    bodyRenderContext?.addHeadStyle(
      'mj-image-fluid-mobile',
      breakpoint => `
    @media only screen and (max-width:${makeLowerBreakpoint(breakpoint)}) {
      table.mj-full-width-mobile { width: 100% !important; }
      td.mj-full-width-mobile { width: auto !important; }
    }
  `,
    )

    return {
      layoutContext,
    }
  },
  render({ attrs }, extra) {
    const fluidOnMobile = attrs['fluid-on-mobile'] === 'true'
    const fullWidth = attrs['full-width'] === 'full-width'
    const contentWidth = getContentWidth(attrs, extra.layoutContext.containerWidth)
    const imageNode = h('img', {
      alt: attrs.alt,
      height: getImageHeight(attrs.height),
      sizes: attrs.sizes,
      src: attrs.src,
      srcset: attrs.srcset,
      style: {
        'border': attrs.border,
        'border-bottom': attrs['border-bottom'],
        'border-left': attrs['border-left'],
        'border-radius': attrs['border-radius'],
        'border-right': attrs['border-right'],
        'border-top': attrs['border-top'],
        'display': 'block',
        'font-size': attrs['font-size'],
        'height': attrs.height,
        'max-height': attrs['max-height'],
        'max-width': fullWidth ? '100%' : undefined,
        'min-width': fullWidth ? '100%' : undefined,
        'outline': 'none',
        'text-decoration': 'none',
        'width': '100%',
      },
      title: attrs.title,
      usemap: attrs.usemap,
      width: contentWidth,
    })

    return h('table', {
      border: '0',
      cellpadding: '0',
      cellspacing: '0',
      class: fluidOnMobile ? 'mj-full-width-mobile' : undefined,
      role: 'presentation',
      style: {
        'border-collapse': 'collapse',
        'border-spacing': '0px',
        'max-width': fullWidth ? '100%' : undefined,
        'min-width': fullWidth ? '100%' : undefined,
        'width': fullWidth ? `${contentWidth}px` : undefined,
      },
    }, [
      h('tbody', [
        h('tr', [
          h('td', {
            class: fluidOnMobile ? 'mj-full-width-mobile' : undefined,
            style: {
              width: fullWidth ? undefined : `${contentWidth}px`,
            },
          }, [
            attrs.href
              ? h('a', {
                  href: attrs.href,
                  name: attrs.name,
                  rel: attrs.rel,
                  target: attrs.target,
                  title: attrs.title,
                }, [imageNode])
              : imageNode,
          ]),
        ]),
      ]),
    ])
  },
})
