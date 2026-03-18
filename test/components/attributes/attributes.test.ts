import type { ComponentParityVariant } from '../../utils/runComponentParitySuite'
import { runComponentParitySuite } from '../../utils/runComponentParitySuite'

import allDefaultsComponent from './all-defaults.vue'
import allDefaultsMjml from './all-defaults.mjml?raw'
import classChildDefaultsComponent from './class-child-defaults.vue'
import classChildDefaultsMjml from './class-child-defaults.mjml?raw'
import namedClassComponent from './named-class.vue'
import namedClassMjml from './named-class.mjml?raw'
import precedenceComponent from './precedence.vue'
import precedenceMjml from './precedence.mjml?raw'
import tagDefaultsComponent from './tag-defaults.vue'
import tagDefaultsMjml from './tag-defaults.mjml?raw'

const attributesVariants: ComponentParityVariant[] = [
  {
    component: allDefaultsComponent,
    mjml: allDefaultsMjml,
    name: 'all-defaults',
  },
  {
    component: tagDefaultsComponent,
    mjml: tagDefaultsMjml,
    name: 'tag-defaults',
  },
  {
    component: namedClassComponent,
    mjml: namedClassMjml,
    name: 'named-class',
  },
  {
    component: classChildDefaultsComponent,
    mjml: classChildDefaultsMjml,
    name: 'class-child-defaults',
  },
  {
    component: precedenceComponent,
    mjml: precedenceMjml,
    name: 'precedence',
  },
]

runComponentParitySuite('attributes', 'test/components/attributes', attributesVariants)