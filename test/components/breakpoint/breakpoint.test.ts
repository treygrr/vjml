import type { ComponentParityVariant } from '../../utils/runComponentParitySuite'
import { runComponentParitySuite } from '../../utils/runComponentParitySuite'

import basicComponent from './basic.vue'
import basicMjml from './basic.mjml?raw'
import fixedWidthComponent from './fixed-width.vue'
import fixedWidthMjml from './fixed-width.mjml?raw'
import groupLayoutComponent from './group-layout.vue'
import groupLayoutMjml from './group-layout.mjml?raw'
import narrowComponent from './narrow.vue'
import narrowMjml from './narrow.mjml?raw'
import wideComponent from './wide.vue'
import wideMjml from './wide.mjml?raw'

const breakpointVariants: ComponentParityVariant[] = [
  {
    component: basicComponent,
    mjml: basicMjml,
    name: 'basic',
  },
  {
    component: narrowComponent,
    mjml: narrowMjml,
    name: 'narrow',
  },
  {
    component: wideComponent,
    mjml: wideMjml,
    name: 'wide',
  },
  {
    component: fixedWidthComponent,
    mjml: fixedWidthMjml,
    name: 'fixed-width',
  },
  {
    component: groupLayoutComponent,
    mjml: groupLayoutMjml,
    name: 'group-layout',
  },
]

runComponentParitySuite('breakpoint', 'test/components/breakpoint', breakpointVariants)