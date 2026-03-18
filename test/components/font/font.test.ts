import type { ComponentParityVariant } from '../../utils/runComponentParitySuite'
import { runComponentParitySuite } from '../../utils/runComponentParitySuite'

import basicComponent from './basic.vue'
import basicMjml from './basic.mjml?raw'
import buttonUsageComponent from './button-usage.vue'
import buttonUsageMjml from './button-usage.mjml?raw'
import multipleUsedComponent from './multiple-used.vue'
import multipleUsedMjml from './multiple-used.mjml?raw'
import textDefaultsComponent from './text-defaults.vue'
import textDefaultsMjml from './text-defaults.mjml?raw'
import unusedComponent from './unused.vue'
import unusedMjml from './unused.mjml?raw'

const fontVariants: ComponentParityVariant[] = [
  {
    component: basicComponent,
    mjml: basicMjml,
    name: 'basic',
  },
  {
    component: unusedComponent,
    mjml: unusedMjml,
    name: 'unused',
  },
  {
    component: multipleUsedComponent,
    mjml: multipleUsedMjml,
    name: 'multiple-used',
  },
  {
    component: buttonUsageComponent,
    mjml: buttonUsageMjml,
    name: 'button-usage',
  },
  {
    component: textDefaultsComponent,
    mjml: textDefaultsMjml,
    name: 'text-defaults',
  },
]

runComponentParitySuite('font', 'test/components/font', fontVariants)