import type { ComponentParityVariant } from '../../utils/runComponentParitySuite'
import { runComponentParitySuite } from '../../utils/runComponentParitySuite'

import basicComponent from './basic.vue'
import basicMjml from './basic.mjml?raw'
import fullWidthComponent from './full-width.vue'
import fullWidthMjml from './full-width.mjml?raw'
import headAttributesComponent from './head-attributes.vue'
import headAttributesMjml from './head-attributes.mjml?raw'
import mjClassDefaultsComponent from './mj-class-defaults.vue'
import mjClassDefaultsMjml from './mj-class-defaults.mjml?raw'
import multiColumnComponent from './multi-column.vue'
import multiColumnMjml from './multi-column.mjml?raw'

const sectionVariants: ComponentParityVariant[] = [
  {
    component: basicComponent,
    mjml: basicMjml,
    name: 'basic',
  },
  {
    component: multiColumnComponent,
    mjml: multiColumnMjml,
    name: 'multi-column',
  },
  {
    component: fullWidthComponent,
    mjml: fullWidthMjml,
    name: 'full-width',
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

runComponentParitySuite('section', 'test/components/section', sectionVariants)