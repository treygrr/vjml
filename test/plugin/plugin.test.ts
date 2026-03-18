import { createApp } from 'vue'
import { describe, expect, it } from 'vitest'

import VjmlPlugin from '../../src/plugin'

function createTestApp() {
  return createApp({
    render: () => null,
  })
}

describe('VjmlPlugin', () => {
  it('registers prefixed aliases by default', () => {
    const app = createTestApp()

    app.use(VjmlPlugin, {
      prefix: 'VJ',
    })

    expect(app.component('VJMjml')).toBeDefined()
    expect(app.component('VJText')).toBeDefined()
    expect(app.component('Mjml')).toBeUndefined()
    expect(app.component('Text')).toBeUndefined()
    expect(app.config.globalProperties.$vjml.prefix).toBe('VJ')
  })

  it('can also register unprefixed aliases when requested', () => {
    const app = createTestApp()

    app.use(VjmlPlugin, {
      includeUnprefixedAliases: true,
      prefix: 'VJ',
      render: {
        validation: 'strict',
      },
    })

    expect(app.component('VJMjml')).toBeDefined()
    expect(app.component('VJButton')).toBeDefined()
    expect(app.component('Mjml')).toBeDefined()
    expect(app.component('Button')).toBeDefined()
    expect(app.config.globalProperties.$vjml.render.validation).toBe('strict')
  })
})