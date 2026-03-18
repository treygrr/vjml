import type { ComponentParityVariant } from '../utils/runComponentParitySuite'
import { runComponentParitySuite } from '../utils/runComponentParitySuite'

import billingSummaryComponent from './billing-summary.vue'
import billingSummaryMjml from './billing-summary.mjml?raw'
import launchAnnouncementComponent from './launch-announcement.vue'
import launchAnnouncementMjml from './launch-announcement.mjml?raw'
import productShowcaseComponent from './product-showcase.vue'
import productShowcaseMjml from './product-showcase.mjml?raw'
import supportUpdateComponent from './support-update.vue'
import supportUpdateMjml from './support-update.mjml?raw'
import weeklyDigestComponent from './weekly-digest.vue'
import weeklyDigestMjml from './weekly-digest.mjml?raw'

const sampleVariants: ComponentParityVariant[] = [
  {
    component: launchAnnouncementComponent,
    mjml: launchAnnouncementMjml,
    name: 'launch-announcement',
  },
  {
    component: weeklyDigestComponent,
    mjml: weeklyDigestMjml,
    name: 'weekly-digest',
  },
  {
    component: productShowcaseComponent,
    mjml: productShowcaseMjml,
    name: 'product-showcase',
  },
  {
    component: billingSummaryComponent,
    mjml: billingSummaryMjml,
    name: 'billing-summary',
  },
  {
    component: supportUpdateComponent,
    mjml: supportUpdateMjml,
    name: 'support-update',
  },
]

runComponentParitySuite('samples', 'test/samples', sampleVariants)