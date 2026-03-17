import type { ComponentParityVariant } from '../../utils/runComponentParitySuite'
import { runComponentParitySuite } from '../../utils/runComponentParitySuite'

import basicComponent from './basic.vue'
import basicMjml from './basic.mjml?raw'
import fixedWidthComponent from './fixed-width.vue'
import fixedWidthMjml from './fixed-width.mjml?raw'
import headAttributesComponent from './head-attributes.vue'
import headAttributesMjml from './head-attributes.mjml?raw'
import innerGutterComponent from './inner-gutter.vue'
import innerGutterMjml from './inner-gutter.mjml?raw'
import mjClassDefaultsComponent from './mj-class-defaults.vue'
import mjClassDefaultsMjml from './mj-class-defaults.mjml?raw'

const columnVariants: ComponentParityVariant[] = [
  {
    component: basicComponent,
    mjml: basicMjml,
    name: 'basic',
  },
  {
    component: fixedWidthComponent,
    mjml: fixedWidthMjml,
    name: 'fixed-width',
  },
  {
    component: innerGutterComponent,
    mjml: innerGutterMjml,
    name: 'inner-gutter',
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

runComponentParitySuite('column', 'test/components/column', columnVariants)