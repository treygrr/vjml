import { h } from 'vue'

import { getVjmlComponentMetadata } from '../../metadata'

import { createVjmlComponent } from '../internal/factory'
import {
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

    return h(
      'div',
      {
        'aria-label': documentContext?.state.title || undefined,
        'aria-roledescription': 'email',
        'class': attrs['css-class'] || undefined,
        'dir': documentContext?.state.dir || undefined,
        'lang': documentContext?.state.lang || undefined,
        'role': 'article',
        'style': attrs['background-color']
          ? { backgroundColor: attrs['background-color'] }
          : undefined,
      },
      content.childNodes,
    )
  },
})
