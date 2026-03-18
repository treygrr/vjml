import type { ComponentParityVariant } from '../../utils/runComponentParitySuite'
import { runComponentParitySuite } from '../../utils/runComponentParitySuite'

import basicComponent from './basic.vue'
import basicMjml from './basic.mjml?raw'
import customAssetComponent from './custom-asset.vue'
import customAssetMjml from './custom-asset.mjml?raw'
import headAttributesComponent from './head-attributes.vue'
import headAttributesMjml from './head-attributes.mjml?raw'
import mjClassDefaultsComponent from './mj-class-defaults.vue'
import mjClassDefaultsMjml from './mj-class-defaults.mjml?raw'
import verticalComponent from './vertical.vue'
import verticalMjml from './vertical.mjml?raw'

const socialElementVariants: ComponentParityVariant[] = [
  {
    component: basicComponent,
    mjml: basicMjml,
    name: 'basic',
  },
  {
    component: verticalComponent,
    mjml: verticalMjml,
    name: 'vertical',
  },
  {
    component: customAssetComponent,
    mjml: customAssetMjml,
    name: 'custom-asset',
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

runComponentParitySuite('social-element', 'test/components/social-element', socialElementVariants)