import type { VNode } from 'vue'

import { getVjmlComponentMetadata } from '../../metadata'

import type {
  VjmlHeadCollectionContext,
  VjmlValidationReporter,
} from './context'
import { normalizeVjmlAttributes } from './factory'
import {
  getVjmlVNodeAttrs,
  getVjmlVNodeChildren,
  getVjmlVNodeTagName,
  getVjmlVNodeTextContent,
} from './vnodes'

function reportUnexpectedChild(
  parentTagName: string,
  childTagName: string,
  validationReporter: VjmlValidationReporter | null,
) {
  const parentMetadata = getVjmlComponentMetadata(parentTagName)

  if (
    !validationReporter
    || !parentMetadata
    || parentMetadata.supportsAnyChildTag
    || parentMetadata.allowedChildTagNames.includes(childTagName)
  ) {
    return
  }

  validationReporter.reportInvalidChild(
    parentTagName,
    childTagName,
    parentMetadata.allowedChildTagNames,
  )
}

function getNormalizedVNodeAttrs(
  tagName: string,
  vnode: VNode,
): Record<string, string> {
  const metadata = getVjmlComponentMetadata(tagName)

  if (!metadata) {
    return {}
  }

  return normalizeVjmlAttributes(getVjmlVNodeAttrs(vnode), metadata).attrs
}

function getNormalizedVNodeExplicitAttrs(
  tagName: string,
  vnode: VNode,
): Record<string, string> {
  const metadata = getVjmlComponentMetadata(tagName)

  if (!metadata) {
    return {}
  }

  return normalizeVjmlAttributes(getVjmlVNodeAttrs(vnode), metadata).explicitAttrs
}

function getResolvedVNodeContent(vnode: VNode, fallbackText: string): string {
  const props = getVjmlVNodeAttrs(vnode)

  for (const propName of ['text', 'html', 'content'] as const) {
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

  return fallbackText
}

function collectAttributesNode(
  vnode: VNode,
  headCollectionContext: VjmlHeadCollectionContext,
  validationReporter: VjmlValidationReporter | null,
) {
  for (const childVNode of getVjmlVNodeChildren(vnode)) {
    const childTagName = getVjmlVNodeTagName(childVNode)

    if (!childTagName) {
      continue
    }

    reportUnexpectedChild('mj-attributes', childTagName, validationReporter)

    if (childTagName === 'mj-class') {
      const classAttrs = getNormalizedVNodeExplicitAttrs(childTagName, childVNode)
      const className = classAttrs.name

      if (!className) {
        continue
      }

      const { name: _name, ...attrsWithoutName } = classAttrs
      headCollectionContext.add('classes', className, attrsWithoutName)

      for (const classDefaultVNode of getVjmlVNodeChildren(childVNode)) {
        const classDefaultTagName = getVjmlVNodeTagName(classDefaultVNode)

        if (!classDefaultTagName) {
          continue
        }

        const classDefaultAttrs = getNormalizedVNodeExplicitAttrs(
          classDefaultTagName,
          classDefaultVNode,
        )

        headCollectionContext.add(
          'classesDefault',
          `${className}.${classDefaultTagName}`,
          classDefaultAttrs,
        )
      }

      continue
    }

    const attrs = getNormalizedVNodeExplicitAttrs(childTagName, childVNode)
    headCollectionContext.add('defaultAttributes', childTagName, attrs)
  }
}

function collectHtmlAttributesNode(
  vnode: VNode,
  headCollectionContext: VjmlHeadCollectionContext,
  validationReporter: VjmlValidationReporter | null,
) {
  for (const selectorVNode of getVjmlVNodeChildren(vnode)) {
    const selectorTagName = getVjmlVNodeTagName(selectorVNode)

    if (!selectorTagName) {
      continue
    }

    reportUnexpectedChild('mj-html-attributes', selectorTagName, validationReporter)

    if (selectorTagName !== 'mj-selector') {
      continue
    }

    const selectorAttrs = getNormalizedVNodeAttrs(selectorTagName, selectorVNode)
    const path = selectorAttrs.path

    if (!path) {
      continue
    }

    for (const htmlAttributeVNode of getVjmlVNodeChildren(selectorVNode)) {
      const htmlAttributeTagName = getVjmlVNodeTagName(htmlAttributeVNode)

      if (!htmlAttributeTagName) {
        continue
      }

      reportUnexpectedChild('mj-selector', htmlAttributeTagName, validationReporter)

      if (htmlAttributeTagName !== 'mj-html-attribute') {
        continue
      }

      const htmlAttributeAttrs = getNormalizedVNodeAttrs(
        htmlAttributeTagName,
        htmlAttributeVNode,
      )
      const name = htmlAttributeAttrs.name

      if (!name) {
        continue
      }

      headCollectionContext.add(
        'htmlAttributes',
        path,
        name,
        getResolvedVNodeContent(
          htmlAttributeVNode,
          getVjmlVNodeTextContent(htmlAttributeVNode),
        ),
      )
    }
  }
}

export function collectVjmlHeadFromVNodes(
  vnodes: readonly VNode[],
  headCollectionContext: VjmlHeadCollectionContext | null,
  validationReporter: VjmlValidationReporter | null,
) {
  if (!headCollectionContext) {
    return
  }

  for (const vnode of vnodes) {
    const tagName = getVjmlVNodeTagName(vnode)

    if (!tagName) {
      continue
    }

    reportUnexpectedChild('mj-head', tagName, validationReporter)

    switch (tagName) {
      case 'mj-attributes':
        collectAttributesNode(vnode, headCollectionContext, validationReporter)
        continue
      case 'mj-html-attributes':
        collectHtmlAttributesNode(vnode, headCollectionContext, validationReporter)
        continue
      case 'mj-breakpoint': {
        const attrs = getNormalizedVNodeAttrs(tagName, vnode)

        if (attrs.width) {
          headCollectionContext.add('breakpoint', attrs.width)
        }
        continue
      }
      case 'mj-font': {
        const attrs = getNormalizedVNodeAttrs(tagName, vnode)

        if (attrs.name && attrs.href) {
          headCollectionContext.add('fonts', attrs.name, attrs.href)
        }
        continue
      }
      case 'mj-raw':
        headCollectionContext.add(
          'headRaw',
          getResolvedVNodeContent(vnode, getVjmlVNodeTextContent(vnode)),
        )
        continue
      case 'mj-preview':
        headCollectionContext.add(
          'preview',
          getResolvedVNodeContent(vnode, getVjmlVNodeTextContent(vnode)),
        )
        continue
      case 'mj-style': {
        const attrs = getNormalizedVNodeAttrs(tagName, vnode)
        const target = attrs.inline === 'inline' ? 'inlineStyle' : 'style'

        headCollectionContext.add(
          target,
          getResolvedVNodeContent(vnode, getVjmlVNodeTextContent(vnode)),
        )
        continue
      }
      case 'mj-title':
        headCollectionContext.add(
          'title',
          getResolvedVNodeContent(vnode, getVjmlVNodeTextContent(vnode)),
        )
        continue
    }
  }
}
