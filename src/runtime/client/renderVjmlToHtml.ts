import type { Component } from 'vue'

import { resolveVjmlRuntimeConfig, type VjmlRuntimeConfig } from '../../vjml'
import type { RenderVjmlToHtmlOptions, VjmlRenderResult } from '../types'
import { renderVjmlInBrowserWithDiagnostics } from '../internal/browserRendering'

export async function renderVjmlToHtmlWithConfig(
  component: Component,
  config: VjmlRuntimeConfig,
  props: Record<string, unknown> = {},
): Promise<VjmlRenderResult> {
  const { document: _document, tree: _tree, ...result } = await renderVjmlInBrowserWithDiagnostics(
    component,
    config,
    props,
  )

  return result
}

export async function renderVjmlToHtml(
  component: Component,
  options: RenderVjmlToHtmlOptions = {},
): Promise<VjmlRenderResult> {
  return renderVjmlToHtmlWithConfig(
    component,
    resolveVjmlRuntimeConfig(options.runtime),
    options.props ?? {},
  )
}
