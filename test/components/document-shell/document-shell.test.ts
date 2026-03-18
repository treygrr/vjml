import type { ComponentParityVariant } from '../../utils/runComponentParitySuite'
import { runComponentParitySuite } from '../../utils/runComponentParitySuite'

import basicComponent from './basic.vue'
import basicMjml from './basic.mjml?raw'
import bodyAttributesComponent from './body-attributes.vue'
import bodyAttributesMjml from './body-attributes.mjml?raw'
import fileStartRawComponent from './file-start-raw.vue'
import fileStartRawMjml from './file-start-raw.mjml?raw'
import headMetadataComponent from './head-metadata.vue'
import headMetadataMjml from './head-metadata.mjml?raw'
import headRawComponent from './head-raw.vue'
import headRawMjml from './head-raw.mjml?raw'

const documentShellVariants: ComponentParityVariant[] = [
  {
    component: basicComponent,
    mjml: basicMjml,
    name: 'basic',
  },
  {
    component: headMetadataComponent,
    mjml: headMetadataMjml,
    name: 'head-metadata',
  },
  {
    component: headRawComponent,
    mjml: headRawMjml,
    name: 'head-raw',
  },
  {
    component: fileStartRawComponent,
    mjml: fileStartRawMjml,
    name: 'file-start-raw',
  },
  {
    component: bodyAttributesComponent,
    mjml: bodyAttributesMjml,
    name: 'body-attributes',
  },
]

runComponentParitySuite('document-shell', 'test/components/document-shell', documentShellVariants)