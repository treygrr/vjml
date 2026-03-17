import { getVjmlComponentMetadata } from '../../metadata'

import { normalizeVjmlAttributes, createVjmlComponent } from '../internal/factory'
import { collectVjmlHeadFromVNodes } from '../internal/head'
import {
  flattenVjmlVNodes,
  getVjmlVNodeAttrs,
  getVjmlVNodeChildren,
  getVjmlVNodeTagName,
  getVjmlVNodeTextContent,
} from '../internal/vnodes'

const metadata = getVjmlComponentMetadata('mjml')

if (!metadata) {
  throw new Error('Missing metadata for \'mjml\'.')
}

const rawMetadata = getVjmlComponentMetadata('mj-raw')

function getResolvedVNodeContent(vnode: Parameters<typeof getVjmlVNodeTagName>[0]): string {
  const props = getVjmlVNodeAttrs(vnode)

  for (const propName of ['html', 'content', 'text'] as const) {
    if (!Object.prototype.hasOwnProperty.call(props, propName)) {
      continue
    }

    const value = props[propName]

    if (value === undefined || value === null) {
      return ''
    }

    if (
      typeof value === 'string'
      || typeof value === 'number'
      || typeof value === 'boolean'
    ) {
      return `${value}`
    }
  }

  return getVjmlVNodeTextContent(vnode)
}

export default createVjmlComponent(metadata, {
  name: 'VjmlMjml',
  render({
    attrs,
    content,
    documentContext,
    headCollectionContext,
    validationReporter,
  }) {
    documentContext?.beginDocument({
      dir: attrs.dir,
      forceOWADesktop: attrs.owa === 'desktop',
      lang: attrs.lang,
    })

    const childNodes = flattenVjmlVNodes(content.childNodes)
    const headNodes = childNodes.filter(
      vnode => getVjmlVNodeTagName(vnode) === 'mj-head',
    )
    const rawNodes = childNodes.filter(
      vnode => getVjmlVNodeTagName(vnode) === 'mj-raw',
    )
    const bodyNodes = childNodes.filter(
      vnode => getVjmlVNodeTagName(vnode) === 'mj-body',
    )

    for (const childNode of childNodes) {
      const childTagName = getVjmlVNodeTagName(childNode)

      if (!childTagName) {
        continue
      }

      if (!metadata.allowedChildTagNames.includes(childTagName)) {
        validationReporter?.reportInvalidChild(
          metadata.tagName,
          childTagName,
          metadata.allowedChildTagNames,
        )
      }
    }

    for (const headNode of headNodes) {
      collectVjmlHeadFromVNodes(
        getVjmlVNodeChildren(headNode),
        headCollectionContext,
        validationReporter,
      )
    }

    for (const rawNode of rawNodes) {
      if (!rawMetadata) {
        continue
      }

      const rawAttrs = normalizeVjmlAttributes(
        getVjmlVNodeAttrs(rawNode),
        rawMetadata,
      ).attrs

      if (rawAttrs.position === 'file-start') {
        documentContext?.addBeforeDoctype(getResolvedVNodeContent(rawNode))
      }
    }

    if (bodyNodes.length === 0) {
      validationReporter?.report({
        code: 'missing-body',
        message: '\'mjml\' requires one \'mj-body\' child.',
        severity: 'error',
        tagName: metadata.tagName,
      })

      return ''
    }

    if (bodyNodes.length > 1) {
      validationReporter?.report({
        code: 'multiple-body-nodes',
        message: 'Only the first \'mj-body\' child is currently rendered.',
        severity: 'warning',
        tagName: metadata.tagName,
      })
    }

    return bodyNodes[0]
  },
})
