<script setup lang="ts">
import {
  markRaw,
  type Component,
} from 'vue'
import { VJML_COMPONENT_METADATA, VjmlRenderFrame } from 'vjml'

type SampleSlug =
  | 'billing-summary'
  | 'launch-announcement'
  | 'product-showcase'
  | 'support-update'
  | 'weekly-digest'

type SampleDefinition = {
  slug: SampleSlug
  title: string
  summary: string
  howItWorks: string
  previewHeight: string
}

type LoadedSample = SampleDefinition & {
  component: Component | null
  loadError: string
  usedTags: string[]
}

const sampleDefinitions = [
  {
    slug: 'launch-announcement',
    title: 'Launch announcement',
    summary: 'A launch email that combines head metadata, a hero block, CTA copy, and social follow-up links.',
    howItWorks: 'The sample configures the document head with a title, preview text, a hosted web font, and inline CSS, then renders a hero-led announcement with a primary CTA and a social section underneath.',
    previewHeight: '620px',
  },
  {
    slug: 'weekly-digest',
    title: 'Weekly digest',
    summary: 'A compact digest that applies shared defaults and named classes across navigation, feature cards, and CTA sections.',
    howItWorks: 'The head defines global attributes, reusable classes, and navbar defaults so the body can compose a wrapper, grouped columns, images, and a closing CTA with minimal repeated styling.',
    previewHeight: '700px',
  },
  {
    slug: 'product-showcase',
    title: 'Product showcase',
    summary: 'A merchandising layout that demonstrates HTML attribute selectors, carousel output, and a post-gallery CTA.',
    howItWorks: 'The head attaches custom HTML attributes to selected nodes, then the body layers intro copy, a thumbnail-enabled carousel, a divider, and a follow-up button to form a complete product highlight email.',
    previewHeight: '760px',
  },
  {
    slug: 'billing-summary',
    title: 'Billing summary',
    summary: 'A transactional billing email that demonstrates mock fetched data, computed table rows, and conditional rendering inside a VJML document.',
    howItWorks: 'The sample hydrates a reactive billing record from a fetch helper, derives the table rows and CTA label with computed values, and uses v-if to show the expiring-card warning only when the fetched state needs attention.',
    previewHeight: '500px',
  },
  {
    slug: 'support-update',
    title: 'Support update',
    summary: 'A support email that uses file-start raw output, preview text, accordion content, and a help-center CTA.',
    howItWorks: 'The template emits a raw comment before the document, adds preview text in the head, then uses accordion items to answer common setup questions before linking out to the full help center.',
    previewHeight: '640px',
  },
] as const satisfies ReadonlyArray<SampleDefinition>

const sampleComponentModules = import.meta.glob('../../../test/samples/*.vue')
const sampleSourceModules = import.meta.glob('../../../test/samples/*.vue', {
  import: 'default',
  query: '?raw',
})

const tagByComponentBaseName = new Map(
  VJML_COMPONENT_METADATA.map(metadata => [metadata.componentBaseName, metadata.tagName] as const),
)

function toDefaultExport<T>(value: T | { default: T }): T {
  return (value as { default?: T }).default ?? (value as T)
}

function toSampleKey(slug: SampleSlug) {
  return `../../../test/samples/${slug}.vue`
}

function extractUsedTags(source: string) {
  const importMatch = source.match(/import\s*\{([\s\S]*?)\}\s*from\s*['"]vjml['"]/m)

  if (!importMatch) {
    return []
  }

  const importedBlock = importMatch[1] ?? ''

  const usedTags: string[] = []
  const seenTags = new Set<string>()

  for (const entry of importedBlock.split(',')) {
    const componentName = entry.trim().replace(/\s+as\s+.*/, '')

    if (!componentName) {
      continue
    }

    const tagName = tagByComponentBaseName.get(componentName)

    if (!tagName || seenTags.has(tagName)) {
      continue
    }

    seenTags.add(tagName)
    usedTags.push(tagName)
  }

  return usedTags
}

async function loadSamples() {
  return Promise.all(sampleDefinitions.map(async (sample): Promise<LoadedSample> => {
    const componentLoader = sampleComponentModules[toSampleKey(sample.slug)]
    const sourceLoader = sampleSourceModules[toSampleKey(sample.slug)]

    if (!componentLoader || !sourceLoader) {
      return {
        ...sample,
        component: null,
        loadError: `Sample fixture files for ${sample.slug} are missing.`,
        usedTags: [],
      }
    }

    try {
      const [componentModule, sourceModule] = await Promise.all([
        componentLoader(),
        sourceLoader(),
      ])
      const source = String(toDefaultExport(sourceModule))

      return {
        ...sample,
        component: markRaw(toDefaultExport(componentModule) as Component),
        loadError: '',
        usedTags: extractUsedTags(source),
      }
    }
    catch (error) {
      return {
        ...sample,
        component: null,
        loadError: error instanceof Error
          ? error.message
          : `Failed to load ${sample.slug}.`,
        usedTags: [],
      }
    }
  }))
}

const samples = await loadSamples()
const loadErrorCount = samples.filter(sample => sample.loadError).length
</script>

<template>
  <section class="samples-showcase not-prose space-y-6" aria-labelledby="samples-showcase-title">
    <div class="space-y-2">
      <h2 id="samples-showcase-title" class="text-2xl font-semibold tracking-tight">
        Sample gallery
      </h2>
      <p class="max-w-3xl text-sm leading-6">
        These previews are rendered from the parity fixtures under test/samples so the docs page shows the same end-to-end examples used for HTML verification.
      </p>
    </div>

    <UAlert
      v-if="loadErrorCount"
      color="warning"
      variant="subtle"
      title="Some sample previews could not be loaded"
      :description="`${loadErrorCount} sample preview${loadErrorCount === 1 ? '' : 's'} failed to load from test/samples.`"
    />

    <div class="space-y-6">
      <article
        v-for="sample in samples"
        :id="sample.slug"
        :key="sample.slug"
        class="scroll-mt-24"
      >
        <UCard>
          <template #header>
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div class="space-y-1">
                <h3 class="text-xl font-semibold tracking-tight">
                  {{ sample.title }}
                </h3>
                <p class="max-w-2xl text-sm leading-6">
                  {{ sample.summary }}
                </p>
              </div>

              <UBadge
                color="neutral"
                variant="subtle"
                :label="sample.slug"
              />
            </div>
          </template>

          <div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
            <div class="space-y-5">
              <section class="space-y-2">
                <p class="text-xs font-semibold uppercase tracking-[0.2em] text-toned">
                  How it works
                </p>
                <p class="text-sm leading-6">
                  {{ sample.howItWorks }}
                </p>
              </section>

              <section class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-[0.2em] text-toned">
                  Components used
                </p>

                <div class="flex flex-wrap gap-2">
                  <UBadge
                    v-for="tag in sample.usedTags"
                    :key="tag"
                    color="neutral"
                    variant="outline"
                    :label="tag"
                  />
                </div>
              </section>
            </div>

            <section class="space-y-3">
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-toned">
                Preview
              </p>

              <UAlert
                v-if="sample.loadError"
                color="warning"
                variant="subtle"
                title="Preview unavailable"
                :description="sample.loadError"
              />

              <UAlert
                v-else-if="!sample.component"
                color="warning"
                variant="subtle"
                title="Preview unavailable"
                description="The sample component did not load into the preview renderer."
              />

              <ClientOnly v-else>
                <template #fallback>
                  <USkeleton class="h-105 w-full rounded-lg" />
                </template>

                <div class="samples-showcase-preview overflow-hidden rounded-lg border border-default bg-default p-2">
                  <VjmlRenderFrame
                    :component="sample.component"
                    :height="sample.previewHeight"
                    :title="`${sample.title} preview`"
                    class="w-full"
                  />
                </div>
              </ClientOnly>
            </section>
          </div>
        </UCard>
      </article>
    </div>
  </section>
</template>

<style scoped>
.samples-showcase-preview :deep(.vjml-render-frame) {
  width: 100%;
}

.samples-showcase-preview :deep(.vjml-render-frame__iframe) {
  display: block;
  width: 100%;
}
</style>