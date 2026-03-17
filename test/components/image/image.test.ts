import type { ComponentParityVariant } from '../../utils/runComponentParitySuite'
import { runComponentParitySuite } from '../../utils/runComponentParitySuite'

import basicComponent from './basic.vue'
import basicMjml from './basic.mjml?raw'
import fluidOnMobileComponent from './fluid-on-mobile.vue'
import fluidOnMobileMjml from './fluid-on-mobile.mjml?raw'
import headAttributesComponent from './head-attributes.vue'
import headAttributesMjml from './head-attributes.mjml?raw'
import linkedFixedHeightComponent from './linked-fixed-height.vue'
import linkedFixedHeightMjml from './linked-fixed-height.mjml?raw'
import mjClassDefaultsComponent from './mj-class-defaults.vue'
import mjClassDefaultsMjml from './mj-class-defaults.mjml?raw'

const imageVariants: ComponentParityVariant[] = [
  {
    component: basicComponent,
    mjml: basicMjml,
    name: 'basic',
  },
  {
    component: linkedFixedHeightComponent,
    mjml: linkedFixedHeightMjml,
    name: 'linked-fixed-height',
  },
  {
    component: fluidOnMobileComponent,
    mjml: fluidOnMobileMjml,
    name: 'fluid-on-mobile',
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

runComponentParitySuite('image', 'test/components/image', imageVariants)