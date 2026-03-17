import type { Component } from 'vue'

import {
  mergeVjmlRuntimeConfig,
  type RenderVjmlToHtmlOptions,
  type VjmlDebugRenderResult,
  type VjmlRenderResult,
  type VjmlRuntimeConfigInput,
} from '../../vjml'

import { useVjml } from '../composables/useVjml'
import { renderVjmlToDebugTreeWithConfig } from './renderVjmlToDebugTree'
import { renderVjmlToHtmlWithConfig } from './renderVjmlToHtml'

function resolveRendererConfig(
  baseRuntime: VjmlRuntimeConfigInput,
  options: RenderVjmlToHtmlOptions,
) {
  return mergeVjmlRuntimeConfig(baseRuntime, options.runtime ?? {})
}

export function createVjmlRenderer(baseRuntime: VjmlRuntimeConfigInput = {}) {
  return {
    renderToHtml(
      component: Component,
      options: RenderVjmlToHtmlOptions = {},
    ): Promise<VjmlRenderResult> {
      return renderVjmlToHtmlWithConfig(
        component,
        resolveRendererConfig(baseRuntime, options),
        options.props ?? {},
      )
    },
    renderToDebugTree(
      component: Component,
      options: RenderVjmlToHtmlOptions = {},
    ): Promise<VjmlDebugRenderResult> {
      return renderVjmlToDebugTreeWithConfig(
        component,
        resolveRendererConfig(baseRuntime, options),
        options.props ?? {},
      )
    },
  }
}

export function useVjmlRenderer(baseRuntime: VjmlRuntimeConfigInput = {}) {
  return createVjmlRenderer(mergeVjmlRuntimeConfig(useVjml(), baseRuntime))
}
