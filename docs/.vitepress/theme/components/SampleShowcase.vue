<script setup lang="ts">
import { computed, ref, watch, type Component } from 'vue'

import { VjmlRenderFrame } from 'vjml'

import billingSummaryComponent from '@samples/billing-summary.vue'
import billingSummaryMjml from '@samples/billing-summary.mjml?raw'
import billingSummaryVue from '@samples/billing-summary.vue?raw'
import launchAnnouncementComponent from '@samples/launch-announcement.vue'
import launchAnnouncementMjml from '@samples/launch-announcement.mjml?raw'
import launchAnnouncementVue from '@samples/launch-announcement.vue?raw'
import productShowcaseComponent from '@samples/product-showcase.vue'
import productShowcaseMjml from '@samples/product-showcase.mjml?raw'
import productShowcaseVue from '@samples/product-showcase.vue?raw'
import supportUpdateComponent from '@samples/support-update.vue'
import supportUpdateMjml from '@samples/support-update.mjml?raw'
import supportUpdateVue from '@samples/support-update.vue?raw'
import weeklyDigestComponent from '@samples/weekly-digest.vue'
import weeklyDigestMjml from '@samples/weekly-digest.mjml?raw'
import weeklyDigestVue from '@samples/weekly-digest.vue?raw'

type SampleName =
  | 'billing-summary'
  | 'launch-announcement'
  | 'product-showcase'
  | 'support-update'
  | 'weekly-digest'

type SampleTab = 'mjml' | 'preview' | 'vue'

interface SampleDefinition {
  component: Component
  description: string
  height: string
  mjmlSource: string
  title: string
  vueSource: string
}

const props = withDefaults(defineProps<{
  name: SampleName
}>(), {})

const sampleRegistry: Record<SampleName, SampleDefinition> = {
  'billing-summary': {
    component: billingSummaryComponent,
    description: 'Head raw, table layout, divider rhythm, and a focused billing CTA.',
    height: '460px',
    mjmlSource: billingSummaryMjml,
    title: 'Billing summary',
    vueSource: billingSummaryVue,
  },
  'launch-announcement': {
    component: launchAnnouncementComponent,
    description: 'Font imports, inline head styles, hero content, and follow-up social links.',
    height: '520px',
    mjmlSource: launchAnnouncementMjml,
    title: 'Launch announcement',
    vueSource: launchAnnouncementVue,
  },
  'product-showcase': {
    component: productShowcaseComponent,
    description: 'HTML attributes, carousel output, divider treatment, and a trailing collection CTA.',
    height: '560px',
    mjmlSource: productShowcaseMjml,
    title: 'Product showcase',
    vueSource: productShowcaseVue,
  },
  'support-update': {
    component: supportUpdateComponent,
    description: 'File-start raw content, preview text, accordion content, and a help-center CTA.',
    height: '560px',
    mjmlSource: supportUpdateMjml,
    title: 'Support update',
    vueSource: supportUpdateVue,
  },
  'weekly-digest': {
    component: weeklyDigestComponent,
    description: 'Shared defaults, grouped layout, wrapper composition, and navbar-driven structure.',
    height: '580px',
    mjmlSource: weeklyDigestMjml,
    title: 'Weekly digest',
    vueSource: weeklyDigestVue,
  },
}

const activeTab = ref<SampleTab>('preview')

watch(
  () => props.name,
  () => {
    activeTab.value = 'preview'
  },
)

const sample = computed(() => sampleRegistry[props.name])

const source = computed(() => {
  if (activeTab.value === 'mjml') {
    return sample.value.mjmlSource
  }

  if (activeTab.value === 'vue') {
    return sample.value.vueSource
  }

  return ''
})
</script>

<template>
  <article class="sample-showcase">
    <header class="sample-header">
      <h3>{{ sample.title }}</h3>
      <p class="sample-copy">{{ sample.description }}</p>

      <div class="sample-tabs">
        <button
          class="sample-tab"
          :class="{ '-active': activeTab === 'preview' }"
          type="button"
          @click="activeTab = 'preview'"
        >
          Preview
        </button>
        <button
          class="sample-tab"
          :class="{ '-active': activeTab === 'vue' }"
          type="button"
          @click="activeTab = 'vue'"
        >
          Vue
        </button>
        <button
          class="sample-tab"
          :class="{ '-active': activeTab === 'mjml' }"
          type="button"
          @click="activeTab = 'mjml'"
        >
          MJML
        </button>
      </div>
    </header>

    <div class="sample-panel" v-if="activeTab === 'preview'">
      <div class="sample-preview-frame">
        <VjmlRenderFrame
          :component="sample.component"
          :height="sample.height"
          :title="`${sample.title} preview`"
        />
      </div>
    </div>

    <div class="sample-panel" v-else>
      <pre class="sample-code"><code>{{ source }}</code></pre>
    </div>
  </article>
</template>