import type { ComponentParityVariant } from '../../utils/runComponentParitySuite'
import { runComponentParitySuite } from '../../utils/runComponentParitySuite'

import basicComponent from './basic.vue'
import basicMjml from './basic.mjml?raw'
import headAttributesComponent from './head-attributes.vue'
import headAttributesMjml from './head-attributes.mjml?raw'
import leftPixelComponent from './left-pixel.vue'
import leftPixelMjml from './left-pixel.mjml?raw'
import mjClassDefaultsComponent from './mj-class-defaults.vue'
import mjClassDefaultsMjml from './mj-class-defaults.mjml?raw'
import rightPercentComponent from './right-percent.vue'
import rightPercentMjml from './right-percent.mjml?raw'

const dividerVariants: ComponentParityVariant[] = [
  {
    component: basicComponent,
    mjml: basicMjml,
    name: 'basic',
  },
  {
    component: rightPercentComponent,
    mjml: rightPercentMjml,
    name: 'right-percent',
  },
  {
    component: leftPixelComponent,
    mjml: leftPixelMjml,
    name: 'left-pixel',
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

runComponentParitySuite('divider', 'test/components/divider', dividerVariants)