import type { ComponentParityVariant } from '../../utils/runComponentParitySuite'
import { runComponentParitySuite } from '../../utils/runComponentParitySuite'

import basicComponent from './basic.vue'
import basicMjml from './basic.mjml?raw'
import headAttributesComponent from './head-attributes.vue'
import headAttributesMjml from './head-attributes.mjml?raw'
import mjClassDefaultsComponent from './mj-class-defaults.vue'
import mjClassDefaultsMjml from './mj-class-defaults.mjml?raw'
import multiGroupComponent from './multi-group.vue'
import multiGroupMjml from './multi-group.mjml?raw'
import siblingColumnComponent from './sibling-column.vue'
import siblingColumnMjml from './sibling-column.mjml?raw'

const groupVariants: ComponentParityVariant[] = [
  {
    component: basicComponent,
    mjml: basicMjml,
    name: 'basic',
  },
  {
    component: siblingColumnComponent,
    mjml: siblingColumnMjml,
    name: 'sibling-column',
  },
  {
    component: multiGroupComponent,
    mjml: multiGroupMjml,
    name: 'multi-group',
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

runComponentParitySuite('group', 'test/components/group', groupVariants)