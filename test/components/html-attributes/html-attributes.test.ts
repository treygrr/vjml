import type { ComponentParityVariant } from '../../utils/runComponentParitySuite'
import { runComponentParitySuite } from '../../utils/runComponentParitySuite'

import basicComponent from './basic.vue'
import basicMjml from './basic.mjml?raw'
import duplicateSelectorComponent from './duplicate-selector.vue'
import duplicateSelectorMjml from './duplicate-selector.mjml?raw'
import multipleAttributesComponent from './multiple-attributes.vue'
import multipleAttributesMjml from './multiple-attributes.mjml?raw'
import multipleSelectorsComponent from './multiple-selectors.vue'
import multipleSelectorsMjml from './multiple-selectors.mjml?raw'
import rootArticleComponent from './root-article.vue'
import rootArticleMjml from './root-article.mjml?raw'

const htmlAttributesVariants: ComponentParityVariant[] = [
  {
    component: basicComponent,
    mjml: basicMjml,
    name: 'basic',
  },
  {
    component: multipleAttributesComponent,
    mjml: multipleAttributesMjml,
    name: 'multiple-attributes',
  },
  {
    component: duplicateSelectorComponent,
    mjml: duplicateSelectorMjml,
    name: 'duplicate-selector',
  },
  {
    component: multipleSelectorsComponent,
    mjml: multipleSelectorsMjml,
    name: 'multiple-selectors',
  },
  {
    component: rootArticleComponent,
    mjml: rootArticleMjml,
    name: 'root-article',
  },
]

runComponentParitySuite(
  'html-attributes',
  'test/components/html-attributes',
  htmlAttributesVariants,
)