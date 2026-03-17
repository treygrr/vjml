import { h } from 'vue'

import { requireVjmlComponentMetadata } from '../internal/componentMetadata'
import { conditionalTag } from '../internal/helpers/conditional'
import { createVjmlComponent } from '../internal/factory'
import {
  analyzeVjmlChildNodes,
  compactStyleRecord,
  createVjmlLayoutState,
  createVjmlStaticHtml,
  getBoxWidths,
  getNormalizedVNodeAttributes,
  hasNonEmptyAttribute,
  provideVjmlLayoutContext,
  renderHtmlAttributes,
  suffixCssClasses,
  useVjmlLayoutContext,
  useVjmlSiblingContext,
  withVjmlSiblingContext,
} from '../internal/layout'

const metadata = requireVjmlComponentMetadata('mj-wrapper')

function buildBackgroundPosition(attrs: Readonly<Record<string, string>>): string | undefined {
  if (attrs['background-position-x'] || attrs['background-position-y']) {
    return `${attrs['background-position-x'] ?? 'center'} ${attrs['background-position-y'] ?? 'top'}`
  }

  return attrs['background-position'] || undefined
}

function buildBackgroundStyle(
  attrs: Readonly<Record<string, string>>,
): Record<string, string | undefined> {
  if (!hasNonEmptyAttribute(attrs['background-url'])) {
    return {
      'background': attrs['background-color'],
      'background-color': attrs['background-color'],
    }
  }

  return {
    'background': attrs['background-color'],
    'background-color': attrs['background-color'],
    'background-image': `url('${attrs['background-url']}')`,
    'background-position': buildBackgroundPosition(attrs),
    'background-repeat': attrs['background-repeat'],
    'background-size': attrs['background-size'],
  }
}

export default createVjmlComponent(metadata, {
  name: 'VjmlWrapper',
  setup() {
    const layoutState = createVjmlLayoutState()

    provideVjmlLayoutContext(layoutState)

    return {
      layoutContext: useVjmlLayoutContext(),
      layoutState,
      siblingContext: useVjmlSiblingContext(),
    }
  },
  render({ activeMjClass, attrs, content, documentContext }, extra) {
    const fullWidth = attrs['full-width'] === 'full-width'
    const hasBorderRadius = hasNonEmptyAttribute(attrs['border-radius'])
    const inheritedGap = extra.layoutContext.gap
    const hasInheritedGap = inheritedGap.length > 0 && !extra.siblingContext.first
    const backgroundStyle = buildBackgroundStyle(attrs)
    const { box } = getBoxWidths(extra.layoutContext.containerWidth, attrs)
    const childEntries = analyzeVjmlChildNodes(content.childNodes)

    extra.layoutState.containerWidth = `${box}px`
    extra.layoutState.gap = attrs.gap ?? ''
    extra.layoutState.preserveMobileWidth = false

    const wrappedChildren = childEntries.flatMap((entry) => {
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
          `<tr><td${renderHtmlAttributes({
            align: childAttrs.align,
            class: suffixCssClasses(childAttrs['css-class'], 'outlook') || undefined,
            width: extra.layoutContext.containerWidth,
          })}>`,
        )),
        childVNode,
        createVjmlStaticHtml(conditionalTag('</td></tr>')),
      ]
    })
    const tableNode = h('table', {
      align: 'center',
      background: fullWidth ? undefined : attrs['background-url'] || undefined,
      border: '0',
      cellpadding: '0',
      cellspacing: '0',
      role: 'presentation',
      style: {
        ...(fullWidth ? {} : backgroundStyle),
        'border-collapse': hasBorderRadius ? 'separate' : undefined,
        'width': '100%',
      },
    }, [
      h('tbody', [
        h('tr', [
          h('td', {
            style: compactStyleRecord({
              'border': attrs.border,
              'border-bottom': attrs['border-bottom'],
              'border-left': attrs['border-left'],
              'border-radius': attrs['border-radius'],
              'border-right': attrs['border-right'],
              'border-top': attrs['border-top'],
              'direction': attrs.direction,
              'font-size': '0px',
              'padding': attrs.padding,
              'padding-bottom': attrs['padding-bottom'],
              'padding-left': attrs['padding-left'],
              'padding-right': attrs['padding-right'],
              'padding-top': attrs['padding-top'],
              'text-align': attrs['text-align'],
            }),
          }, [
            createVjmlStaticHtml(conditionalTag(
              '<table role="presentation" border="0" cellpadding="0" cellspacing="0">',
            )),
            ...wrappedChildren,
            createVjmlStaticHtml(conditionalTag('</table>')),
          ]),
        ]),
      ]),
    ])

    const wrapperContent = h(
      'div',
      {
        class: fullWidth ? undefined : attrs['css-class'] || undefined,
        style: compactStyleRecord({
          ...(fullWidth ? {} : backgroundStyle),
          'border-radius': attrs['border-radius'],
          'margin': '0px auto',
          'margin-top': hasInheritedGap ? inheritedGap : undefined,
          'max-width': extra.layoutContext.containerWidth,
          'overflow': hasBorderRadius ? 'hidden' : undefined,
        }),
      },
      [
        hasNonEmptyAttribute(attrs['background-url'])
          ? h('div', {
              style: {
                'font-size': '0px',
                'line-height': '0',
              },
            }, [tableNode])
          : tableNode,
      ],
    )

    const before = createVjmlStaticHtml(conditionalTag(
      `<table${renderHtmlAttributes({
        align: 'center',
        bgcolor: !hasInheritedGap ? attrs['background-color'] : undefined,
        border: '0',
        cellpadding: '0',
        cellspacing: '0',
        class: suffixCssClasses(attrs['css-class'], 'outlook') || undefined,
        role: 'presentation',
        style: {
          'padding-top': hasInheritedGap ? inheritedGap : undefined,
          'width': extra.layoutContext.containerWidth,
        },
        width: Number.parseInt(extra.layoutContext.containerWidth, 10),
      })}><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">`,
    ))
    const after = createVjmlStaticHtml(conditionalTag('</td></tr></table>'))

    if (fullWidth) {
      return h('table', {
        align: 'center',
        background: attrs['background-url'] || undefined,
        border: '0',
        cellpadding: '0',
        cellspacing: '0',
        class: attrs['css-class'] || undefined,
        role: 'presentation',
        style: {
          ...backgroundStyle,
          width: '100%',
        },
      }, [
        h('tbody', [
          h('tr', [
            h('td', [before, wrapperContent, after]),
          ]),
        ]),
      ])
    }

    return [before, wrapperContent, after]
  },
})
