import type { Component } from 'vue'

import { resolveVjmlRuntimeConfig, type VjmlRuntimeConfig } from '../../vjml'
import type { RenderVjmlToHtmlOptions, VjmlDebugRenderResult } from '../types'
import { renderVjmlWithDiagnostics } from '../internal/rendering'

export async function renderVjmlToDebugTreeWithConfig(
  component: Component,
  config: VjmlRuntimeConfig,
  props: Record<string, unknown> = {},
): Promise<VjmlDebugRenderResult> {
  return renderVjmlWithDiagnostics(component, config, props)
}

export async function renderVjmlToDebugTree(
  component: Component,
  options: RenderVjmlToHtmlOptions = {},
): Promise<VjmlDebugRenderResult> {
  return renderVjmlToDebugTreeWithConfig(
    component,
    resolveVjmlRuntimeConfig(options.runtime),
    options.props ?? {},
  )
}
