import type { ComponentParityVariant } from '../../utils/runComponentParitySuite'
import { runComponentParitySuite } from '../../utils/runComponentParitySuite'

import basicComponent from './basic.vue'
import basicMjml from './basic.mjml?raw'
import headAttributesComponent from './head-attributes.vue'
import headAttributesMjml from './head-attributes.mjml?raw'
import hiddenThumbnailsComponent from './hidden-thumbnails.vue'
import hiddenThumbnailsMjml from './hidden-thumbnails.mjml?raw'
import mjClassDefaultsComponent from './mj-class-defaults.vue'
import mjClassDefaultsMjml from './mj-class-defaults.mjml?raw'
import supportedThumbnailsComponent from './supported-thumbnails.vue'
import supportedThumbnailsMjml from './supported-thumbnails.mjml?raw'

const carouselVariants: ComponentParityVariant[] = [
  {
    component: basicComponent,
    mjml: basicMjml,
    name: 'basic',
  },
  {
    component: hiddenThumbnailsComponent,
    mjml: hiddenThumbnailsMjml,
    name: 'hidden-thumbnails',
  },
  {
    component: supportedThumbnailsComponent,
    mjml: supportedThumbnailsMjml,
    name: 'supported-thumbnails',
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

runComponentParitySuite('carousel', 'test/components/carousel', carouselVariants)