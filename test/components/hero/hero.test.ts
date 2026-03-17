import type { ComponentParityVariant } from '../../utils/runComponentParitySuite'
import { runComponentParitySuite } from '../../utils/runComponentParitySuite'

import basicComponent from './basic.vue'
import basicMjml from './basic.mjml?raw'
import fixedHeightComponent from './fixed-height.vue'
import fixedHeightMjml from './fixed-height.mjml?raw'
import headAttributesComponent from './head-attributes.vue'
import headAttributesMjml from './head-attributes.mjml?raw'
import innerBackgroundComponent from './inner-background.vue'
import innerBackgroundMjml from './inner-background.mjml?raw'
import mjClassDefaultsComponent from './mj-class-defaults.vue'
import mjClassDefaultsMjml from './mj-class-defaults.mjml?raw'

const heroVariants: ComponentParityVariant[] = [
  {
    component: basicComponent,
    mjml: basicMjml,
    name: 'basic',
  },
  {
    component: fixedHeightComponent,
    mjml: fixedHeightMjml,
    name: 'fixed-height',
  },
  {
    component: innerBackgroundComponent,
    mjml: innerBackgroundMjml,
    name: 'inner-background',
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

runComponentParitySuite('hero', 'test/components/hero', heroVariants)