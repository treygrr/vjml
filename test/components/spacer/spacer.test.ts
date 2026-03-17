import type { ComponentParityVariant } from '../../utils/runComponentParitySuite'
import { runComponentParitySuite } from '../../utils/runComponentParitySuite'

import basicComponent from './basic.vue'
import basicMjml from './basic.mjml?raw'
import decoratedComponent from './decorated.vue'
import decoratedMjml from './decorated.mjml?raw'
import defaultHeightComponent from './default-height.vue'
import defaultHeightMjml from './default-height.mjml?raw'
import headAttributesComponent from './head-attributes.vue'
import headAttributesMjml from './head-attributes.mjml?raw'
import mjClassDefaultsComponent from './mj-class-defaults.vue'
import mjClassDefaultsMjml from './mj-class-defaults.mjml?raw'

const spacerVariants: ComponentParityVariant[] = [
  {
    component: basicComponent,
    mjml: basicMjml,
    name: 'basic',
  },
  {
    component: defaultHeightComponent,
    mjml: defaultHeightMjml,
    name: 'default-height',
  },
  {
    component: decoratedComponent,
    mjml: decoratedMjml,
    name: 'decorated',
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

runComponentParitySuite('spacer', 'test/components/spacer', spacerVariants)