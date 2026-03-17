import type { ComponentParityVariant } from '../../utils/runComponentParitySuite'
import { runComponentParitySuite } from '../../utils/runComponentParitySuite'

import basicComponent from './basic.vue'
import basicMjml from './basic.mjml?raw'
import fixedHeightComponent from './fixed-height.vue'
import fixedHeightMjml from './fixed-height.mjml?raw'
import headAttributesComponent from './head-attributes.vue'
import headAttributesMjml from './head-attributes.mjml?raw'
import mjClassDefaultsComponent from './mj-class-defaults.vue'
import mjClassDefaultsMjml from './mj-class-defaults.mjml?raw'
import richHtmlComponent from './rich-html.vue'
import richHtmlMjml from './rich-html.mjml?raw'

const textVariants: ComponentParityVariant[] = [
  {
    component: basicComponent,
    mjml: basicMjml,
    name: 'basic',
  },
  {
    component: richHtmlComponent,
    mjml: richHtmlMjml,
    name: 'rich-html',
  },
  {
    component: fixedHeightComponent,
    mjml: fixedHeightMjml,
    name: 'fixed-height',
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

runComponentParitySuite('text', 'test/components/text', textVariants)