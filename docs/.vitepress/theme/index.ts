import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import VjmlPlugin from 'vjml'

import ComponentMetaTable from './components/ComponentMetaTable.vue'
import SampleShowcase from './components/SampleShowcase.vue'
import './style.css'

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(VjmlPlugin, {
      includeUnprefixedAliases: true,
      prefix: 'VJ',
      render: {
        validation: 'warn',
      },
    })

    app.component('ComponentMetaTable', ComponentMetaTable)
    app.component('SampleShowcase', SampleShowcase)
  },
}

export default theme