import { h } from 'vue'

import { requireVjmlComponentMetadata } from '../internal/componentMetadata'
import { conditionalTag } from '../internal/helpers/conditional'
import { createVjmlComponent } from '../internal/factory'
import {
  analyzeVjmlChildNodes,
  createVjmlLayoutState,
  createVjmlStaticHtml,
  getColumnClassName,
  getGroupContainerWidth,
  getNormalizedVNodeAttributes,
  getRenderedWidthAsPixel,
  provideVjmlLayoutContext,
  renderHtmlAttributes,
  useVjmlLayoutContext,
  useVjmlSiblingContext,
  withVjmlSiblingContext,
} from '../internal/layout'

const metadata = requireVjmlComponentMetadata('mj-group')

export default createVjmlComponent(metadata, {
  name: 'VjmlGroup',
  setup() {
    const layoutState = createVjmlLayoutState({
      preserveMobileWidth: true,
    })

    provideVjmlLayoutContext(layoutState)

    return {
      layoutContext: useVjmlLayoutContext(),
      layoutState,
      siblingContext: useVjmlSiblingContext(),
    }
  },
  render({ activeMjClass, attrs, bodyRenderContext, content, documentContext }, extra) {
    const childEntries = analyzeVjmlChildNodes(content.childNodes)
    const groupWidth = getGroupContainerWidth(
      attrs,
      extra.layoutContext.containerWidth,
      extra.siblingContext.nonRawSiblings,
    )
    const classInfo = getColumnClassName(
      attrs.width,
      extra.siblingContext.nonRawSiblings,
      { truncatePercentage: true },
    )
    const className = [
      classInfo.className,
      'mj-outlook-group-fix',
      attrs['css-class'],
    ].filter(Boolean).join(' ')

    extra.layoutState.containerWidth = groupWidth
    extra.layoutState.gap = ''
    extra.layoutState.preserveMobileWidth = true

    bodyRenderContext?.addMediaQuery(classInfo.className, classInfo.parsedWidth)

    return h('div', {
      class: className,
      style: {
        'background-color': attrs['background-color'],
        'direction': attrs.direction,
        'display': 'inline-block',
        'font-size': '0',
        'line-height': '0',
        'text-align': 'left',
        'vertical-align': attrs['vertical-align'],
        'width': '100%',
      },
    }, [
      createVjmlStaticHtml(conditionalTag(
        `<table${renderHtmlAttributes({
          bgcolor: attrs['background-color'] === 'none'
            ? undefined
            : attrs['background-color'],
          border: '0',
          cellpadding: '0',
          cellspacing: '0',
          role: 'presentation',
        })}><tr>`,
      )),
      ...childEntries.flatMap((entry) => {
        const childVNode = withVjmlSiblingContext(entry.vnode, entry.siblingContext)

        if (entry.rawElement) {
          return [childVNode]
        }

        const childAttrs = getNormalizedVNodeAttributes(entry.vnode, {
          documentContext,
          inheritedMjClass: activeMjClass,
        })

        return [
          createVjmlStaticHtml(conditionalTag(
            `<td${renderHtmlAttributes({
              style: {
                'vertical-align': childAttrs['vertical-align'],
                'width': getRenderedWidthAsPixel(
                  childAttrs.width,
                  groupWidth,
                  entry.siblingContext.nonRawSiblings,
                ),
              },
            })}>`,
          )),
          childVNode,
          createVjmlStaticHtml(conditionalTag('</td>')),
        ]
      }),
      createVjmlStaticHtml(conditionalTag('</tr></table>')),
    ])
  },
})
