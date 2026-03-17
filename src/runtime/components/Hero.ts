import { defineComponent, h, onMounted, onUpdated, ref } from 'vue'

import { requireVjmlComponentMetadata } from '../internal/componentMetadata'
import type { VjmlDocumentContext } from '../internal/context'
import { createVjmlComponent } from '../internal/factory'
import { conditionalTag } from '../internal/helpers/conditional'
import {
  analyzeVjmlChildNodes,
  compactStyleRecord,
  createVjmlLayoutState,
  createVjmlStaticHtml,
  getNormalizedVNodeAttributes,
  renderHtmlStyle,
  getShorthandAttrValue,
  provideVjmlLayoutContext,
  renderHtmlAttributes,
  useVjmlLayoutContext,
  withVjmlSiblingContext,
} from '../internal/layout'

const metadata = requireVjmlComponentMetadata('mj-hero')

const RawStyleTd = defineComponent({
  name: 'VjmlRawStyleTd',
  props: {
    background: {
      required: false,
      type: String,
    },
    height: {
      required: false,
      type: [Number, String],
    },
    styleText: {
      required: true,
      type: String,
    },
  },
  setup(props, { slots }) {
    const element = ref<HTMLElement | null>(null)

    const applyStyleText = () => {
      element.value?.setAttribute('style', props.styleText)
    }

    onMounted(applyStyleText)
    onUpdated(applyStyleText)

    return () => h('td', {
      background: props.background || undefined,
      height: props.height || undefined,
      ref: element,
    }, slots.default?.())
  },
})

function buildHeroBackground(attrs: Readonly<Record<string, string>>): string {
  return [
    attrs['background-color'],
    attrs['background-url'] ? `url('${attrs['background-url']}')` : null,
    attrs['background-url'] ? 'no-repeat' : null,
    attrs['background-url']
      ? `${attrs['background-position'] ?? 'center center'} / cover`
      : null,
  ].filter(Boolean).join(' ')
}

function getBackgroundRatio(attrs: Readonly<Record<string, string>>): number {
  const backgroundHeight = Number.parseInt(attrs['background-height'] ?? '', 10)
  const backgroundWidth = Number.parseInt(attrs['background-width'] ?? '', 10)

  if (
    Number.isNaN(backgroundHeight)
    || Number.isNaN(backgroundWidth)
    || backgroundWidth <= 0
  ) {
    return 0
  }

  return Math.round(backgroundHeight / backgroundWidth * 100)
}

function getHeroContentRows(
  childNodes: ReturnType<typeof analyzeVjmlChildNodes>,
  options: {
    activeMjClass: string
    documentContext: VjmlDocumentContext | null
  },
) {
  return childNodes.map((entry) => {
    const childVNode = withVjmlSiblingContext(entry.vnode, entry.siblingContext)

    if (entry.rawElement) {
      return childVNode
    }

    const childAttrs = getNormalizedVNodeAttributes(entry.vnode, {
      documentContext: options.documentContext,
      inheritedMjClass: options.activeMjClass,
    })

    return h('tr', [
      h('td', {
        align: childAttrs.align || undefined,
        background: childAttrs['container-background-color'] || undefined,
        class: childAttrs['css-class'] || undefined,
        style: compactStyleRecord({
          'background': childAttrs['container-background-color'],
          'font-size': '0px',
          'padding': childAttrs.padding,
          'padding-top': childAttrs['padding-top'],
          'padding-right': childAttrs['padding-right'],
          'padding-bottom': childAttrs['padding-bottom'],
          'padding-left': childAttrs['padding-left'],
          'word-break': 'break-word',
        }),
      }, [childVNode]),
    ])
  })
}

export default createVjmlComponent(metadata, {
  name: 'VjmlHero',
  setup() {
    const layoutState = createVjmlLayoutState()

    provideVjmlLayoutContext(layoutState)

    return {
      layoutContext: useVjmlLayoutContext(),
      layoutState,
    }
  },
  render({ activeMjClass, attrs, content, documentContext }, extra) {
    const currentContainerWidth = extra.layoutContext.containerWidth
    const heroBackground = buildHeroBackground(attrs)
    const childEntries = analyzeVjmlChildNodes(content.childNodes)
    const backgroundRatio = getBackgroundRatio(attrs)
    const backgroundWidth = attrs['background-width'] || currentContainerWidth
    const fixedHeight = Math.max(
      0,
      Number.parseInt(attrs.height ?? '0', 10)
      - getShorthandAttrValue(attrs, 'padding', 'top')
      - getShorthandAttrValue(attrs, 'padding', 'bottom'),
    )

    extra.layoutState.containerWidth = currentContainerWidth
    extra.layoutState.gap = ''
    extra.layoutState.preserveMobileWidth = false

    const contentNode = [
      createVjmlStaticHtml(conditionalTag(
        `<table${renderHtmlAttributes({
          align: attrs.align,
          border: '0',
          cellpadding: '0',
          cellspacing: '0',
          style: `width:${currentContainerWidth};`,
          width: currentContainerWidth.replace(/px$/, ''),
        })}><tr><td${renderHtmlAttributes({
          style: {
            'background-color': attrs['inner-background-color'],
            'padding': attrs['inner-padding'],
            'padding-top': attrs['inner-padding-top'],
            'padding-left': attrs['inner-padding-left'],
            'padding-right': attrs['inner-padding-right'],
            'padding-bottom': attrs['inner-padding-bottom'],
          },
        })}>`,
      )),
      h('div', {
        align: attrs.align || undefined,
        class: 'mj-hero-content',
        style: {
          'background-color': attrs['inner-background-color'],
          'float': attrs.align,
          'margin': '0px auto',
          'width': attrs.width,
        },
      }, [
        h('table', {
          border: '0',
          cellpadding: '0',
          cellspacing: '0',
          role: 'presentation',
          style: {
            margin: '0px',
            width: '100%',
          },
        }, [
          h('tbody', [
            h('tr', [
              h('td', [
                h('table', {
                  border: '0',
                  cellpadding: '0',
                  cellspacing: '0',
                  role: 'presentation',
                  style: {
                    margin: '0px',
                    width: '100%',
                  },
                }, [
                  h('tbody', getHeroContentRows(childEntries, {
                    activeMjClass,
                    documentContext,
                  })),
                ]),
              ]),
            ]),
          ]),
        ]),
      ]),
      createVjmlStaticHtml(conditionalTag('</td></tr></table>')),
    ]

    const backgroundCellStyle = compactStyleRecord({
      'background': heroBackground,
      'background-position': attrs['background-position'],
      'background-repeat': attrs['background-url'] ? 'no-repeat' : undefined,
      'border-radius': attrs['border-radius'],
      'padding': attrs.padding,
      'padding-top': attrs['padding-top'],
      'padding-left': attrs['padding-left'],
      'padding-right': attrs['padding-right'],
      'padding-bottom': attrs['padding-bottom'],
      'vertical-align': attrs['vertical-align'],
    })

    const fluidHeightSideCellStyle = renderHtmlStyle({
      'width': '0.01%',
      'padding-bottom': `${backgroundRatio}%`,
      'mso-padding-bottom-alt': 0,
    })

    const backgroundCellStyleText = renderHtmlStyle(backgroundCellStyle)

    const fixedBackgroundCellStyleText = renderHtmlStyle(
      compactStyleRecord({
        ...backgroundCellStyle,
        height: fixedHeight ? `${fixedHeight}px` : undefined,
      }),
    )

    const modeCells = attrs.mode === 'fluid-height'
      ? [
          h(RawStyleTd, {
            styleText: fluidHeightSideCellStyle,
          }),
          h(RawStyleTd, {
            background: attrs['background-url'] || undefined,
            styleText: backgroundCellStyleText,
          }, {
            default: () => contentNode,
          }),
          h(RawStyleTd, {
            styleText: fluidHeightSideCellStyle,
          }),
        ]
      : [
          h(RawStyleTd, {
            background: attrs['background-url'] || undefined,
            height: fixedHeight || undefined,
            styleText: fixedBackgroundCellStyleText,
          }, {
            default: () => contentNode,
          }),
        ]

    return [
      createVjmlStaticHtml(conditionalTag(
        `<table${renderHtmlAttributes({
          align: 'center',
          border: '0',
          cellpadding: '0',
          cellspacing: '0',
          role: 'presentation',
          style: {
            width: currentContainerWidth,
          },
          width: Number.parseInt(currentContainerWidth, 10),
        })}><tr><td${renderHtmlAttributes({
          style: {
            'font-size': 0,
            'line-height': 0,
            'mso-line-height-rule': 'exactly',
          },
        })}><v:image${renderHtmlAttributes({
          'src': attrs['background-url'],
          'style': {
            'border': '0',
            'height': attrs['background-height'],
            'mso-position-horizontal': 'center',
            'position': 'absolute',
            'top': 0,
            'width': backgroundWidth,
            'z-index': '-3',
          },
          'xmlns:v': 'urn:schemas-microsoft-com:vml',
        }, {
          escapeAmpersand: false,
        })} />`,
      )),
      h('div', {
        align: attrs.align || undefined,
        class: attrs['css-class'] || undefined,
        style: {
          'margin': '0 auto',
          'max-width': currentContainerWidth,
        },
      }, [
        h('table', {
          border: '0',
          cellpadding: '0',
          cellspacing: '0',
          role: 'presentation',
          style: {
            width: '100%',
          },
        }, [
          h('tbody', [
            h('tr', {
              style: {
                'vertical-align': 'top',
              },
            }, modeCells),
          ]),
        ]),
      ]),
      createVjmlStaticHtml(conditionalTag('</td></tr></table>')),
    ]
  },
})
