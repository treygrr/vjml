import type { ComponentParityVariant } from '../../utils/runComponentParitySuite'
import { runComponentParitySuite } from '../../utils/runComponentParitySuite'

import autoWidthComponent from './auto-width.vue'
import autoWidthMjml from './auto-width.mjml?raw'
import basicComponent from './basic.vue'
import basicMjml from './basic.mjml?raw'
import headAttributesComponent from './head-attributes.vue'
import headAttributesMjml from './head-attributes.mjml?raw'
import mjClassDefaultsComponent from './mj-class-defaults.vue'
import mjClassDefaultsMjml from './mj-class-defaults.mjml?raw'
import spacedFixedLayoutComponent from './spaced-fixed-layout.vue'
import spacedFixedLayoutMjml from './spaced-fixed-layout.mjml?raw'

const tableVariants: ComponentParityVariant[] = [
  {
    component: basicComponent,
    mjml: basicMjml,
    name: 'basic',
  },
  {
    component: autoWidthComponent,
    mjml: autoWidthMjml,
    name: 'auto-width',
  },
  {
    component: spacedFixedLayoutComponent,
    mjml: spacedFixedLayoutMjml,
    name: 'spaced-fixed-layout',
  },
  {
    component: headAttributesComponent,
    mjml: headAttributesMjml,
    name: 'head-attributes',
  },
  {
    component: mjClassDefaultsComponent,
    mjml: mjClassDefaultsMjml,
    name: 'mj-class-defaults',
  },
]

runComponentParitySuite('table', 'test/components/table', tableVariants)