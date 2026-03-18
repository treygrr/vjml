import type { ComponentParityVariant } from '../../utils/runComponentParitySuite'
import { runComponentParitySuite } from '../../utils/runComponentParitySuite'

import basicComponent from './basic.vue'
import basicMjml from './basic.mjml?raw'
import entitiesComponent from './entities.vue'
import entitiesMjml from './entities.mjml?raw'
import longCopyComponent from './long-copy.vue'
import longCopyMjml from './long-copy.mjml?raw'
import multilineComponent from './multiline.vue'
import multilineMjml from './multiline.mjml?raw'
import previewPairedComponent from './preview-paired.vue'
import previewPairedMjml from './preview-paired.mjml?raw'

const titleVariants: ComponentParityVariant[] = [
  {
    component: basicComponent,
    mjml: basicMjml,
    name: 'basic',
  },
  {
    component: entitiesComponent,
    mjml: entitiesMjml,
    name: 'entities',
  },
  {
    component: multilineComponent,
    mjml: multilineMjml,
    name: 'multiline',
  },
  {
    component: previewPairedComponent,
    mjml: previewPairedMjml,
    name: 'preview-paired',
  },
  {
    component: longCopyComponent,
    mjml: longCopyMjml,
    name: 'long-copy',
  },
]

runComponentParitySuite('title', 'test/components/title', titleVariants)