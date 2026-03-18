import type { ComponentParityVariant } from '../../utils/runComponentParitySuite'
import { runComponentParitySuite } from '../../utils/runComponentParitySuite'

import basicComponent from './basic.vue'
import basicMjml from './basic.mjml?raw'
import headAttributesComponent from './head-attributes.vue'
import headAttributesMjml from './head-attributes.mjml?raw'
import mjClassDefaultsComponent from './mj-class-defaults.vue'
import mjClassDefaultsMjml from './mj-class-defaults.mjml?raw'
import noLinkComponent from './no-link.vue'
import noLinkMjml from './no-link.mjml?raw'
import supportedThumbnailsComponent from './supported-thumbnails.vue'
import supportedThumbnailsMjml from './supported-thumbnails.mjml?raw'

const carouselImageVariants: ComponentParityVariant[] = [
  {
    component: basicComponent,
    mjml: basicMjml,
    name: 'basic',
  },
  {
    component: noLinkComponent,
    mjml: noLinkMjml,
    name: 'no-link',
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

runComponentParitySuite('carousel-image', 'test/components/carousel-image', carouselImageVariants)