import {
  Comment,
  Fragment,
  Text,
  createTextVNode,
  isVNode,
  type VNode,
} from 'vue'

export interface VjmlTaggedComponent {
  __vjmlTagName?: string
}

export function tagVjmlComponent<T>(component: T, tagName: string): T {
  Object.assign(component as object, {
    __vjmlTagName: tagName,
  })

  return component
}

function flattenChildNodes(children: unknown, result: VNode[]) {
  if (
    children === undefined
    || children === null
    || typeof children === 'boolean'
  ) {
    return
  }

  if (Array.isArray(children)) {
    for (const child of children) {
      flattenChildNodes(child, result)
    }

    return
  }

  if (isVNode(children)) {
    if (children.type === Fragment) {
      flattenChildNodes(children.children, result)
      return
    }

    result.push(children)
    return
  }

  if (typeof children === 'string' || typeof children === 'number') {
    result.push(createTextVNode(`${children}`))
  }
}

export function flattenVjmlVNodes(children: unknown): VNode[] {
  const result: VNode[] = []

  flattenChildNodes(children, result)

  return result
}

export function getVjmlVNodeAttrs(vnode: VNode): Record<string, unknown> {
  return (vnode.props ?? {}) as Record<string, unknown>
}

export function getVjmlVNodeChildren(vnode: VNode): VNode[] {
  const children = vnode.children

  if (
    children
    && typeof children === 'object'
    && !Array.isArray(children)
    && 'default' in children
    && typeof children.default === 'function'
  ) {
    return flattenVjmlVNodes(children.default())
  }

  return flattenVjmlVNodes(children)
}

export function getVjmlVNodeTagName(vnode: VNode): string | null {
  if (typeof vnode.type === 'string') {
    return vnode.type
  }

  if (typeof vnode.type === 'object' && vnode.type !== null) {
    return (vnode.type as VjmlTaggedComponent).__vjmlTagName ?? null
  }

  return null
}

export function getVjmlVNodesTextContent(vnodes: readonly VNode[]): string {
  return vnodes
    .map((vnode) => {
      if (vnode.type === Comment) {
        return ''
      }

      if (vnode.type === Text) {
        return typeof vnode.children === 'string' ? vnode.children : ''
      }

      if (typeof vnode.children === 'string') {
        return vnode.children
      }

      return getVjmlVNodesTextContent(getVjmlVNodeChildren(vnode))
    })
    .join('')
}

export function getVjmlVNodeTextContent(vnode: VNode): string {
  if (typeof vnode.children === 'string') {
    return vnode.children
  }

  return getVjmlVNodesTextContent(getVjmlVNodeChildren(vnode))
}
