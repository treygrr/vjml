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

const activeTabLabel = computed(() => {
  if (activeTab.value === 'mjml') {
    return 'MJML source'
  }

  if (activeTab.value === 'vue') {
    return 'Vue source'
  }

  return 'Browser preview'
})

const activePathLabel = computed(() => {
  if (activeTab.value === 'mjml') {
    return `test/samples/${props.name}.mjml`
  }

  if (activeTab.value === 'vue') {
    return `test/samples/${props.name}.vue`
  }

  return 'Rendered with VjmlRenderFrame'
})

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
  <UCard class="not-prose overflow-hidden" :ui="{ body: 'p-0' }">
    <template #header>
      <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div class="space-y-2">
          <div class="flex flex-wrap gap-2">
            <UBadge>Sample</UBadge>
            <UBadge color="neutral" variant="subtle">{{ sample.title }}</UBadge>
            <UBadge color="neutral" variant="subtle">Paired parity fixture</UBadge>
          </div>
          <div>
            <h3 class="text-xl font-semibold">{{ sample.title }}</h3>
            <p class="mt-2">{{ sample.description }}</p>
          </div>
        </div>

        <UButtonGroup>
          <UButton
            :variant="activeTab === 'preview' ? 'solid' : 'ghost'"
            size="sm"
            @click="activeTab = 'preview'"
          >
            Preview
          </UButton>
          <UButton
            :variant="activeTab === 'vue' ? 'solid' : 'ghost'"
            size="sm"
            @click="activeTab = 'vue'"
          >
            Vue
          </UButton>
          <UButton
            :variant="activeTab === 'mjml' ? 'solid' : 'ghost'"
            size="sm"
            @click="activeTab = 'mjml'"
          >
            MJML
          </UButton>
        </UButtonGroup>
      </div>
    </template>

    <div class="flex items-center justify-between gap-3 border-y border-default bg-elevated/30 px-4 py-3 text-sm">
      <div class="flex flex-wrap gap-2">
        <UBadge color="neutral" variant="subtle">{{ activeTabLabel }}</UBadge>
        <UBadge color="neutral" variant="subtle">{{ activePathLabel }}</UBadge>
      </div>
      <div class="hidden md:flex flex-wrap gap-2">
        <UBadge color="neutral" variant="subtle">Preview + source</UBadge>
        <UBadge color="neutral" variant="subtle">Vue and MJML sidecars</UBadge>
      </div>
    </div>

    <div v-if="activeTab === 'preview'" class="bg-default p-4">
      <VjmlRenderFrame
        :component="sample.component"
        :height="sample.height"
        :title="`${sample.title} preview`"
      />
    </div>

    <div v-else class="overflow-x-auto bg-default p-4">
      <pre class="m-0"><code>{{ source }}</code></pre>
    </div>

    <template #footer>
      <div class="flex flex-wrap gap-2">
        <UBadge color="neutral" variant="subtle">Rendered in browser</UBadge>
        <UBadge color="neutral" variant="subtle">Snapshot-backed sample</UBadge>
        <UBadge color="neutral" variant="subtle">Designed for parity checks</UBadge>
      </div>
    </template>
  </UCard>
</template>