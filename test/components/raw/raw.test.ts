import type { ComponentParityVariant } from '../../utils/runComponentParitySuite'
import { runComponentParitySuite } from '../../utils/runComponentParitySuite'

import basicComponent from './basic.vue'
import basicMjml from './basic.mjml?raw'
import fileStartComponent from './file-start.vue'
import fileStartMjml from './file-start.mjml?raw'
import headRawComponent from './head-raw.vue'
import headRawMjml from './head-raw.mjml?raw'
import inColumnComponent from './in-column.vue'
import inColumnMjml from './in-column.mjml?raw'
import templatingComponent from './templating.vue'
import templatingMjml from './templating.mjml?raw'

const rawVariants: ComponentParityVariant[] = [
  {
    component: basicComponent,
    mjml: basicMjml,
    name: 'basic',
  },
  {
    component: inColumnComponent,
    mjml: inColumnMjml,
    name: 'in-column',
  },
  {
    component: headRawComponent,
    mjml: headRawMjml,
    name: 'head-raw',
  },
  {
    component: fileStartComponent,
    mjml: fileStartMjml,
    name: 'file-start',
  },
  {
    component: templatingComponent,
    mjml: templatingMjml,
    name: 'templating',
  },
]

runComponentParitySuite('raw', 'test/components/raw', rawVariants)