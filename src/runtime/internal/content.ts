import type { VNodeChild } from 'vue'

import type { VjmlResolvedContent } from './factory'
import { createVjmlStaticHtml } from './layout'

export function renderVjmlContentNodes(
  content: VjmlResolvedContent,
): VNodeChild[] {
  if (content.source === 'prop') {
    return content.propValue ? [createVjmlStaticHtml(content.propValue)] : []
  }

  return [...content.childNodes]
}
