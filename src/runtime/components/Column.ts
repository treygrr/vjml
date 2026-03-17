import { h } from 'vue'

import { requireVjmlComponentMetadata } from '../internal/componentMetadata'
import { createVjmlComponent } from '../internal/factory'
import {
  analyzeVjmlChildNodes,
  compactStyleRecord,
  createVjmlLayoutState,
  getColumnClassName,
  getColumnContainerWidth,
  getColumnMobileWidth,
  getNormalizedVNodeAttributes,
  hasNonEmptyAttribute,
  provideVjmlLayoutContext,
  useVjmlLayoutContext,
  useVjmlSiblingContext,
  withVjmlSiblingContext,
} from '../internal/layout'

const metadata = requireVjmlComponentMetadata('mj-column')

function hasColumnGutter(attrs: Readonly<Record<string, string>>): boolean {
  return [
    'padding',
    'padding-bottom',
    'padding-left',
    'padding-right',
    'padding-top',
  ].some(attributeName => attributeName in attrs)
}

export default createVjmlComponent(metadata, {
  name: 'VjmlColumn',
  setup() {
    const layoutState = createVjmlLayoutState()

    provideVjmlLayoutContext(layoutState)

    return {
      layoutContext: useVjmlLayoutContext(),
      layoutState,
      siblingContext: useVjmlSiblingContext(),
    }
  },
  render({ activeMjClass, attrs, bodyRenderContext, content, documentContext }, extra) {
    const childEntries = analyzeVjmlChildNodes(content.childNodes)
    const childContainerWidth = getColumnContainerWidth(
      attrs,
      extra.layoutContext.containerWidth,
      extra.siblingContext.nonRawSiblings,
    )
    const classInfo = getColumnClassName(
      attrs.width,
      extra.siblingContext.nonRawSiblings,
    )
    const columnClassName = [
      classInfo.className,
      'mj-outlook-group-fix',
      attrs['css-class'],
    ].filter(Boolean).join(' ')
    const columnContent = h('table', {
      border: '0',
      cellpadding: '0',
      cellspacing: '0',
      role: 'presentation',
      style: {
        ...(hasColumnGutter(attrs)
          ? {
              'background-color': attrs['inner-background-color'],
              'border': attrs['inner-border'],
              'border-bottom': attrs['inner-border-bottom'],
              'border-left': attrs['inner-border-left'],
              'border-radius': attrs['inner-border-radius'],
              'border-right': attrs['inner-border-right'],
              'border-top': attrs['inner-border-top'],
            }
          : {
              'background-color': attrs['background-color'],
              'border': attrs.border,
              'border-bottom': attrs['border-bottom'],
              'border-left': attrs['border-left'],
              'border-radius': attrs['border-radius'],
              'border-right': attrs['border-right'],
              'border-top': attrs['border-top'],
              'vertical-align': attrs['vertical-align'],
            }),
        'border-collapse': hasNonEmptyAttribute(
          hasColumnGutter(attrs) ? attrs['inner-border-radius'] : attrs['border-radius'],
        )
          ? 'separate'
          : undefined,
      },
      width: '100%',
    }, [
      h('tbody', childEntries.map((entry) => {
        const childVNode = withVjmlSiblingContext(entry.vnode, entry.siblingContext)

        if (entry.rawElement) {
          return childVNode
        }

        const childAttrs = getNormalizedVNodeAttributes(entry.vnode, {
          documentContext,
          inheritedMjClass: activeMjClass,
        })

        return h('tr', [
          h('td', {
            align: childAttrs.align || undefined,
            class: childAttrs['css-class'] || undefined,
            style: compactStyleRecord({
              'background': childAttrs['container-background-color'],
              'font-size': '0px',
              'padding': childAttrs.padding,
              'padding-bottom': childAttrs['padding-bottom'],
              'padding-left': childAttrs['padding-left'],
              'padding-right': childAttrs['padding-right'],
              'padding-top': childAttrs['padding-top'],
              'word-break': 'break-word',
            }),
          }, [childVNode]),
        ])
      })),
    ])

    extra.layoutState.containerWidth = childContainerWidth
    extra.layoutState.gap = ''
    extra.layoutState.preserveMobileWidth = false

    bodyRenderContext?.addMediaQuery(classInfo.className, classInfo.parsedWidth)

    return h('div', {
      class: columnClassName,
      style: {
        'direction': attrs.direction,
        'display': 'inline-block',
        'font-size': '0px',
        'text-align': 'left',
        'vertical-align': attrs['vertical-align'],
        'width': getColumnMobileWidth(
          attrs,
          extra.layoutContext.containerWidth,
          extra.siblingContext.nonRawSiblings,
          extra.layoutContext.preserveMobileWidth,
        ),
      },
    }, [
      hasColumnGutter(attrs)
        ? h('table', {
            border: '0',
            cellpadding: '0',
            cellspacing: '0',
            role: 'presentation',
            style: {
              'border-collapse': hasNonEmptyAttribute(attrs['border-radius'])
                ? 'separate'
                : undefined,
            },
            width: '100%',
          }, [
            h('tbody', [
              h('tr', [
                h('td', {
                  style: {
                    'background-color': attrs['background-color'],
                    'border': attrs.border,
                    'border-bottom': attrs['border-bottom'],
                    'border-left': attrs['border-left'],
                    'border-radius': attrs['border-radius'],
                    'border-right': attrs['border-right'],
                    'border-top': attrs['border-top'],
                    'padding': attrs.padding,
                    'padding-bottom': attrs['padding-bottom'],
                    'padding-left': attrs['padding-left'],
                    'padding-right': attrs['padding-right'],
                    'padding-top': attrs['padding-top'],
                  },
                }, [columnContent]),
              ]),
            ]),
          ])
        : columnContent,
    ])
  },
})
