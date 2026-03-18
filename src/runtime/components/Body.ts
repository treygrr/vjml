import { h } from 'vue'

import { getVjmlComponentMetadata } from '../../metadata'

import { createVjmlComponent } from '../internal/factory'
import {
  createVjmlStaticHtml,
  createVjmlLayoutState,
  provideVjmlLayoutContext,
} from '../internal/layout'

const metadata = getVjmlComponentMetadata('mj-body')

if (!metadata) {
  throw new Error('Missing metadata for \'mj-body\'.')
}

export default createVjmlComponent(metadata, {
  name: 'VjmlBody',
  setup() {
    const layoutState = createVjmlLayoutState()

    provideVjmlLayoutContext(layoutState)

    return {
      layoutState,
    }
  },
  render({ attrs, bodyRenderContext, content, documentContext }, extra) {
    bodyRenderContext?.setBackgroundColor(attrs['background-color'] ?? '')
    extra.layoutState.containerWidth = attrs.width ?? '600px'
    extra.layoutState.gap = ''
    extra.layoutState.parentWidth = attrs.width ?? '600px'
    extra.layoutState.preserveMobileWidth = false

    const bodyWrapperAttributes = [
      documentContext?.state.title
        ? ` aria-label="${documentContext.state.title}"`
        : '',
      ' aria-roledescription="email"',
      attrs['css-class']
        ? ` class="${attrs['css-class']}"`
        : '',
      documentContext?.state.dir
        ? ` dir="${documentContext.state.dir}"`
        : '',
      documentContext?.state.lang
        ? ` lang="${documentContext.state.lang}"`
        : '',
      ' role="article"',
      attrs['background-color']
        ? ` style="background-color:${attrs['background-color']};"`
        : '',
    ].join('')

    return [
      createVjmlStaticHtml(`<div${bodyWrapperAttributes}>`),
      ...content.childNodes,
      createVjmlStaticHtml('</div>'),
    ]
  },
})
