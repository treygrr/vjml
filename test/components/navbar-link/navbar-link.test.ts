import type { ComponentParityVariant } from '../../utils/runComponentParitySuite'
import { runComponentParitySuite } from '../../utils/runComponentParitySuite'

import baseUrlComponent from './base-url.vue'
import baseUrlMjml from './base-url.mjml?raw'
import basicComponent from './basic.vue'
import basicMjml from './basic.mjml?raw'
import headAttributesComponent from './head-attributes.vue'
import headAttributesMjml from './head-attributes.mjml?raw'
import htmlContentComponent from './html-content.vue'
import htmlContentMjml from './html-content.mjml?raw'
import mjClassDefaultsComponent from './mj-class-defaults.vue'
import mjClassDefaultsMjml from './mj-class-defaults.mjml?raw'

const navbarLinkVariants: ComponentParityVariant[] = [
  {
    component: basicComponent,
    mjml: basicMjml,
    name: 'basic',
  },
  {
    component: baseUrlComponent,
    mjml: baseUrlMjml,
    name: 'base-url',
  },
  {
    component: htmlContentComponent,
    mjml: htmlContentMjml,
    name: 'html-content',
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

runComponentParitySuite('navbar-link', 'test/components/navbar-link', navbarLinkVariants)