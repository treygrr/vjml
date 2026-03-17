import type { ComponentParityVariant } from '../../utils/runComponentParitySuite'
import { runComponentParitySuite } from '../../utils/runComponentParitySuite'

import alignWidthComponent from './align-width.vue'
import alignWidthMjml from './align-width.mjml?raw'
import basicComponent from './basic.vue'
import basicMjml from './basic.mjml?raw'
import headAttributesComponent from './head-attributes.vue'
import headAttributesMjml from './head-attributes.mjml?raw'
import mjClassDefaultsComponent from './mj-class-defaults.vue'
import mjClassDefaultsMjml from './mj-class-defaults.mjml?raw'
import noHrefComponent from './no-href.vue'
import noHrefMjml from './no-href.mjml?raw'

const buttonVariants: ComponentParityVariant[] = [
  {
    component: basicComponent,
    mjml: basicMjml,
    name: 'basic',
  },
  {
    component: alignWidthComponent,
    mjml: alignWidthMjml,
    name: 'align-width',
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
  {
    component: noHrefComponent,
    mjml: noHrefMjml,
    name: 'no-href',
  },
]

runComponentParitySuite('button', 'test/components/button', buttonVariants)