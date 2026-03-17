import { hasInjectionContext, inject } from 'vue'

import { resolveVjmlRuntimeConfig } from '../../vjml'

import { VJML_RUNTIME_CONFIG_KEY } from '../internal/context'
import type { VjmlRuntimeConfig } from '../types'

export function useVjml(): Readonly<VjmlRuntimeConfig> {
  if (hasInjectionContext()) {
    const injectedConfig = inject(VJML_RUNTIME_CONFIG_KEY, null)

    if (injectedConfig) {
      return injectedConfig
    }
  }

  return resolveVjmlRuntimeConfig()
}
