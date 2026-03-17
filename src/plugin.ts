import type { App, Plugin } from 'vue'

import { VJML_RUNTIME_CONFIG_KEY } from './runtime/internal/context'
import { VJML_RUNTIME_COMPONENT_EXPORTS } from './runtime/components.generated'
import { VJML_RUNTIME_COMPONENTS } from './runtime/manifest.generated'
import {
  mergeVjmlRuntimeConfig,
  toVjmlComponentName,
  type VjmlRuntimeConfig,
  type VjmlRuntimeConfigInput,
} from './vjml'

export interface VjmlPluginOptions extends VjmlRuntimeConfigInput {}

type VjmlRuntimeComponentExportName = keyof typeof VJML_RUNTIME_COMPONENT_EXPORTS

function getVjmlRuntimeComponent(exportName: string) {
  return VJML_RUNTIME_COMPONENT_EXPORTS[exportName as VjmlRuntimeComponentExportName]
}

export function resolveVjmlPluginConfig(
  options: VjmlPluginOptions = {},
): Readonly<VjmlRuntimeConfig> {
  return Object.freeze(mergeVjmlRuntimeConfig({}, options))
}

export function registerVjmlComponents(app: App, prefix: string) {
  for (const entry of VJML_RUNTIME_COMPONENTS) {
    const component = getVjmlRuntimeComponent(entry.exportName)

    if (!component) {
      continue
    }

    app.component(toVjmlComponentName(entry.tagName, prefix), component)
  }
}

export const VjmlPlugin: Plugin<VjmlPluginOptions> = {
  install(app: App, options: VjmlPluginOptions = {}) {
    const config = resolveVjmlPluginConfig(options)

    app.provide(VJML_RUNTIME_CONFIG_KEY, config)
    registerVjmlComponents(app, config.prefix)
    app.config.globalProperties.$vjml = config
  },
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $vjml: Readonly<VjmlRuntimeConfig>
  }
}

export default VjmlPlugin