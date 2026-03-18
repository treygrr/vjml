import type { ComponentParityVariant } from '../../utils/runComponentParitySuite'
import { runComponentParitySuite } from '../../utils/runComponentParitySuite'

import basicComponent from './basic.vue'
import basicMjml from './basic.mjml?raw'
import inlineFontFamilyComponent from './inline-font-family.vue'
import inlineFontFamilyMjml from './inline-font-family.mjml?raw'
import inlineImportantComponent from './inline-important.vue'
import inlineImportantMjml from './inline-important.mjml?raw'
import inlinePreserveExistingComponent from './inline-preserve-existing.vue'
import inlinePreserveExistingMjml from './inline-preserve-existing.mjml?raw'
import inlineRootArticleComponent from './inline-root-article.vue'
import inlineRootArticleMjml from './inline-root-article.mjml?raw'

const styleVariants: ComponentParityVariant[] = [
  {
    component: basicComponent,
    mjml: basicMjml,
    name: 'basic',
  },
  {
    component: inlineImportantComponent,
    mjml: inlineImportantMjml,
    name: 'inline-important',
  },
  {
    component: inlinePreserveExistingComponent,
    mjml: inlinePreserveExistingMjml,
    name: 'inline-preserve-existing',
  },
  {
    component: inlineRootArticleComponent,
    mjml: inlineRootArticleMjml,
    name: 'inline-root-article',
  },
  {
    component: inlineFontFamilyComponent,
    mjml: inlineFontFamilyMjml,
    name: 'inline-font-family',
  },
]

runComponentParitySuite('style', 'test/components/style', styleVariants)