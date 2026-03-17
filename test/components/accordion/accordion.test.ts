import basicComponent from './basic.vue'
import basicMjml from './basic.mjml?raw'
import headAttributesComponent from './head-attributes.vue'
import headAttributesMjml from './head-attributes.mjml?raw'
import iconLeftComponent from './icon-left.vue'
import iconLeftMjml from './icon-left.mjml?raw'
import mjClassDefaultsComponent from './mj-class-defaults.vue'
import mjClassDefaultsMjml from './mj-class-defaults.mjml?raw'
import missingChildrenComponent from './missing-children.vue'
import missingChildrenMjml from './missing-children.mjml?raw'
import type { ComponentParityVariant } from '../../utils/runComponentParitySuite'
import { runComponentParitySuite } from '../../utils/runComponentParitySuite'

const accordionVariants: ComponentParityVariant[] = [
  {
    component: basicComponent,
    mjml: basicMjml,
    name: 'basic',
  },
  {
    component: headAttributesComponent,
    mjml: headAttributesMjml,
    name: 'head-attributes',
  },
  {
    component: iconLeftComponent,
    mjml: iconLeftMjml,
    name: 'icon-left',
  },
  {
    component: mjClassDefaultsComponent,
    mjml: mjClassDefaultsMjml,
    name: 'mj-class-defaults',
  },
  {
    component: missingChildrenComponent,
    mjml: missingChildrenMjml,
    name: 'missing-children',
  },
]

runComponentParitySuite('accordion', 'test/components/accordion', accordionVariants)