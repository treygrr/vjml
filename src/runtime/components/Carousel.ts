import { h } from 'vue'

import { requireVjmlComponentMetadata } from '../internal/componentMetadata'
import type { VjmlDocumentContext } from '../internal/context'
import { createVjmlComponent } from '../internal/factory'
import {
  endNegationConditionalTag,
  msoConditionalTag,
  startMsoNegationConditionalTag,
} from '../internal/helpers/conditional'
import {
  analyzeVjmlChildNodes,
  createVjmlStaticHtml,
  getNormalizedVNodeAttributes,
  renderHtmlAttributes,
  useVjmlLayoutContext,
  withVjmlSiblingContext,
} from '../internal/layout'
import {
  createVjmlCarouselContextState,
  createVjmlInteractiveId,
  provideVjmlCarouselContext,
} from '../internal/interactive'

const metadata = requireVjmlComponentMetadata('mj-carousel')

function repeatString(value: string, count: number): string {
  return Array.from({ length: count }, () => value).join('')
}

function range(length: number): number[] {
  return Array.from({ length }, (_, index) => index)
}

function getThumbnailsWidth(
  explicitWidth: string | undefined,
  parentWidth: string,
  childrenLength: number,
): string {
  if (explicitWidth) {
    return explicitWidth
  }

  if (childrenLength === 0) {
    return '0px'
  }

  return `${Math.min(Number.parseInt(parentWidth, 10) / childrenLength, 110)}px`
}

function getCarouselHeadStyle(
  carouselId: string,
  length: number,
  attrs: Readonly<Record<string, string>>,
): string {
  if (length === 0) {
    return ''
  }

  const radioSelectors = range(length)
    .map(index => `.mj-carousel-${carouselId}-radio:checked ${repeatString('+ * ', index)}+ .mj-carousel-content .mj-carousel-image`)
    .join(',')
  const visibleSelectors = range(length)
    .map(index => `.mj-carousel-${carouselId}-radio-${index + 1}:checked ${repeatString('+ * ', length - index - 1)}+ .mj-carousel-content .mj-carousel-image-${index + 1}`)
    .join(',')
  const nextSelectors = range(length)
    .map(index => `.mj-carousel-${carouselId}-radio-${index + 1}:checked ${repeatString('+ * ', length - index - 1)}+ .mj-carousel-content .mj-carousel-next-${(index + 1) % length + 1}`)
    .join(',')
  const previousSelectors = range(length)
    .map(index => `.mj-carousel-${carouselId}-radio-${index + 1}:checked ${repeatString('+ * ', length - index - 1)}+ .mj-carousel-content .mj-carousel-previous-${(index - 1 + length) % length + 1}`)
    .join(',')
  const selectedThumbnailSelectors = range(length)
    .map(index => `.mj-carousel-${carouselId}-radio-${index + 1}:checked ${repeatString('+ * ', length - index - 1)}+ .mj-carousel-content .mj-carousel-${carouselId}-thumbnail-${index + 1}`)
    .join(',')
  const thumbnailDisplaySelectors = range(length)
    .map(index => `.mj-carousel-${carouselId}-radio-${index + 1}:checked ${repeatString('+ * ', length - index - 1)}+ .mj-carousel-content .mj-carousel-${carouselId}-thumbnail`)
    .join(',')
  const hoverHideSelectors = range(length)
    .map(index => `.mj-carousel-${carouselId}-thumbnail:hover ${repeatString('+ * ', length - index - 1)}+ .mj-carousel-main .mj-carousel-image`)
    .join(',')
  const hoverShowSelectors = range(length)
    .map(index => `.mj-carousel-${carouselId}-thumbnail-${index + 1}:hover ${repeatString('+ * ', length - index - 1)}+ .mj-carousel-main .mj-carousel-image-${index + 1}`)
    .join(',')

  return `
    .mj-carousel {
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
    }

    .mj-carousel-${carouselId}-icons-cell {
      display: table-cell !important;
      width: ${attrs['icon-width']} !important;
    }

    .mj-carousel-radio,
    .mj-carousel-next,
    .mj-carousel-previous {
      display: none !important;
    }

    .mj-carousel-thumbnail,
    .mj-carousel-next,
    .mj-carousel-previous {
      touch-action: manipulation;
    }

    ${radioSelectors} {
      display: none !important;
    }

    ${visibleSelectors} {
      display: block !important;
    }

    .mj-carousel-previous-icons,
    .mj-carousel-next-icons,
    ${nextSelectors},
    ${previousSelectors} {
      display: block !important;
    }

    ${selectedThumbnailSelectors} {
      border-color: ${attrs['tb-selected-border-color']} !important;
    }

    ${thumbnailDisplaySelectors} {
      display: inline-block !important;
    }

    .mj-carousel-image img + div,
    .mj-carousel-thumbnail img + div {
      display: none !important;
    }

    ${hoverHideSelectors} {
      display: none !important;
    }

    .mj-carousel-thumbnail:hover {
      border-color: ${attrs['tb-hover-border-color']} !important;
    }

    ${hoverShowSelectors} {
      display: block !important;
    }

    .mj-carousel noinput { display:block !important; }
    .mj-carousel noinput .mj-carousel-image-1 { display:block !important; }
    .mj-carousel noinput .mj-carousel-arrows,
    .mj-carousel noinput .mj-carousel-thumbnails { display:none !important; }

    [owa] .mj-carousel-thumbnail { display:none !important; }

    @media screen yahoo {
      .mj-carousel-${carouselId}-icons-cell,
      .mj-carousel-previous-icons,
      .mj-carousel-next-icons {
        display:none !important;
      }

      .mj-carousel-${carouselId}-radio-1:checked ${repeatString('+ *', length - 1)}+ .mj-carousel-content .mj-carousel-${carouselId}-thumbnail-1 {
        border-color: transparent;
      }
    }
  `
}

function getCarouselFallbackHtml(
  entry: ReturnType<typeof analyzeVjmlChildNodes>[number],
  containerWidth: string,
  inheritedAttrs: Readonly<Record<string, string>>,
  options: {
    activeMjClass: string
    documentContext: VjmlDocumentContext | null
  },
): string {
  const childAttrs = getNormalizedVNodeAttributes(entry.vnode, {
    documentContext: options.documentContext,
    inheritedMjClass: options.activeMjClass,
  })
  const borderRadius = childAttrs['border-radius'] ?? inheritedAttrs['border-radius']
  const imageWidth = Number.parseInt(containerWidth, 10)
  const imageHtml = `<img${renderHtmlAttributes({
    alt: childAttrs.alt,
    border: '0',
    src: childAttrs.src,
    title: childAttrs.title,
    width: imageWidth,
    style: {
      'border-radius': borderRadius,
      'display': 'block',
      'height': 'auto',
      'max-width': '100%',
      'width': containerWidth,
    },
  }, {
    escapeAmpersand: false,
  })}>`
  const contentHtml = childAttrs.href
    ? `<a${renderHtmlAttributes({
        href: childAttrs.href,
        rel: childAttrs.rel,
        target: '_blank',
      }, {
        escapeAmpersand: false,
      })}>${imageHtml}</a>`
    : imageHtml

  return `<div${renderHtmlAttributes({
    class: [
      'mj-carousel-image',
      `mj-carousel-image-${entry.siblingContext.index + 1}`,
      childAttrs['css-class'],
    ].filter(Boolean).join(' ') || undefined,
  })}>${contentHtml}</div>`
}

function getCarouselRadioHtml(
  carouselId: string,
  index: number,
): string {
  return `<input${renderHtmlAttributes({
    checked: index === 0 ? 'checked' : undefined,
    class: [
      'mj-carousel-radio',
      `mj-carousel-${carouselId}-radio`,
      `mj-carousel-${carouselId}-radio-${index + 1}`,
    ].join(' '),
    id: `mj-carousel-${carouselId}-radio-${index + 1}`,
    name: `mj-carousel-radio-${carouselId}`,
    style: {
      'display': 'none',
      'mso-hide': 'all',
    },
    type: 'radio',
  })}>`
}

function getCarouselControlHtml(
  carouselId: string,
  direction: 'next' | 'previous',
  iconSrc: string,
  iconWidth: string,
  childCount: number,
): string {
  return `<td${renderHtmlAttributes({
    class: `mj-carousel-${carouselId}-icons-cell`,
    style: {
      'display': 'none',
      'font-size': '0px',
      'mso-hide': 'all',
      'padding': '0px',
    },
  })}><div${renderHtmlAttributes({
    class: `mj-carousel-${direction}-icons`,
    style: {
      'display': 'none',
      'mso-hide': 'all',
    },
  })}>${range(childCount).map(index => {
    return `<label${renderHtmlAttributes({
      class: [
        `mj-carousel-${direction}`,
        `mj-carousel-${direction}-${index + 1}`,
      ].join(' '),
      for: `mj-carousel-${carouselId}-radio-${index + 1}`,
    })}><img${renderHtmlAttributes({
      alt: direction,
      src: iconSrc,
      style: {
        'display': 'block',
        'height': 'auto',
        'width': iconWidth,
      },
      width: Number.parseInt(iconWidth, 10),
    })}></label>`
  }).join('')}</div></td>`
}

export default createVjmlComponent(metadata, {
  name: 'VjmlCarousel',
  setup({ bodyRenderContext }) {
    const carouselId = createVjmlInteractiveId()
    const carouselContext = createVjmlCarouselContextState(carouselId)

    provideVjmlCarouselContext(carouselContext)

    return {
      bodyRenderContext,
      carouselContext,
      layoutContext: useVjmlLayoutContext(),
    }
  },
  render({ activeMjClass, attrs, content, documentContext }, extra) {
    const childEntries = analyzeVjmlChildNodes(content.childNodes)
    const thumbnailsWidth = getThumbnailsWidth(
      attrs['tb-width'],
      extra.layoutContext.parentWidth,
      childEntries.length,
    )

    extra.carouselContext.containerWidth = extra.layoutContext.containerWidth
    extra.carouselContext.thumbnails = attrs.thumbnails ?? 'visible'
    extra.carouselContext.inheritedAttrs = Object.fromEntries(
      [
        ['border-radius', attrs['border-radius']],
        ['tb-border', attrs['tb-border']],
        ['tb-border-radius', attrs['tb-border-radius']],
      ].filter(([, value]) => value !== undefined),
    ) as Record<string, string>

    extra.bodyRenderContext?.addHeadStyle(
      `mj-carousel-${extra.carouselContext.carouselId}`,
      getCarouselHeadStyle(
        extra.carouselContext.carouselId,
        childEntries.length,
        {
          ...attrs,
          'icon-width': attrs['icon-width'] ?? '44px',
          'tb-hover-border-color': attrs['tb-hover-border-color'] ?? '#fead0d',
          'tb-selected-border-color': attrs['tb-selected-border-color'] ?? '#cccccc',
        },
      ),
    )

    const browserMarkup = h('div', {
      class: 'mj-carousel',
    }, [
      ...childEntries.map((entry) => {
        return createVjmlStaticHtml(
          getCarouselRadioHtml(
            extra.carouselContext.carouselId,
            entry.siblingContext.index,
          ),
        )
      }),
      h('div', {
        class: `mj-carousel-content mj-carousel-${extra.carouselContext.carouselId}-content`,
        style: {
          'display': 'table',
          'font-size': '0px',
          'table-layout': 'fixed',
          'text-align': 'center',
          'width': '100%',
        },
      }, [
        ...(attrs.thumbnails === 'visible' || attrs.thumbnails === 'supported'
          ? childEntries.map((entry) => {
              const childAttrs = getNormalizedVNodeAttributes(entry.vnode, {
                documentContext,
                inheritedMjClass: activeMjClass,
              })

              return h('a', {
                class: [
                  'mj-carousel-thumbnail',
                  `mj-carousel-${extra.carouselContext.carouselId}-thumbnail`,
                  `mj-carousel-${extra.carouselContext.carouselId}-thumbnail-${entry.siblingContext.index + 1}`,
                ].filter(Boolean).join(' '),
                href: `#${entry.siblingContext.index + 1}`,
                style: {
                  'border': attrs['tb-border'],
                  'border-radius': attrs['tb-border-radius'],
                  'display': attrs.thumbnails === 'supported' ? 'none' : 'inline-block',
                  'overflow': 'hidden',
                  'width': thumbnailsWidth,
                },
                target: childAttrs.target || '_blank',
              }, [
                h('label', {
                  for: `mj-carousel-${extra.carouselContext.carouselId}-radio-${entry.siblingContext.index + 1}`,
                }, [
                  h('img', {
                    alt: childAttrs.alt,
                    src: childAttrs['thumbnails-src'] || childAttrs.src,
                    style: {
                      display: 'block',
                      height: 'auto',
                      width: '100%',
                    },
                    width: Number.parseInt(thumbnailsWidth, 10),
                  }),
                ]),
              ])
            })
          : []),
        h('table', {
          border: '0',
          cellpadding: '0',
          cellspacing: '0',
          class: 'mj-carousel-main',
          role: 'presentation',
          style: {
            'caption-side': 'top',
            'display': 'table-caption',
            'table-layout': 'fixed',
            'width': '100%',
          },
          width: '100%',
        }, [
          h('tbody', [
            h('tr', [
              createVjmlStaticHtml(getCarouselControlHtml(
                extra.carouselContext.carouselId,
                'previous',
                attrs['left-icon'] ?? 'https://i.imgur.com/xTh3hln.png',
                attrs['icon-width'] ?? '44px',
                childEntries.length,
              )),
              h('td', {
                style: {
                  padding: '0px',
                },
              }, [
                h('div', {
                  class: 'mj-carousel-images',
                }, childEntries.map(entry => withVjmlSiblingContext(entry.vnode, entry.siblingContext))),
              ]),
              createVjmlStaticHtml(getCarouselControlHtml(
                extra.carouselContext.carouselId,
                'next',
                attrs['right-icon'] ?? 'https://i.imgur.com/os7o9kz.png',
                attrs['icon-width'] ?? '44px',
                childEntries.length,
              )),
            ]),
          ]),
        ]),
      ]),
    ])
    const fallbackHtml = childEntries[0]
      ? getCarouselFallbackHtml(
          childEntries[0],
          extra.carouselContext.containerWidth,
          extra.carouselContext.inheritedAttrs,
          {
            activeMjClass,
            documentContext,
          },
        )
      : null

    const renderedNodes = [
      createVjmlStaticHtml(startMsoNegationConditionalTag),
      browserMarkup,
      createVjmlStaticHtml(endNegationConditionalTag),
    ]

    if (fallbackHtml) {
      renderedNodes.push(createVjmlStaticHtml(msoConditionalTag(fallbackHtml)))
    }

    return renderedNodes
  },
})
