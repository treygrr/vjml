<script setup lang="ts">
import {
  computed,
  markRaw,
  ref,
  shallowRef,
  watch,
  type Component,
} from 'vue'
import { VjmlRenderFrame, getVjmlComponentMetadata } from 'vjml'

type SourceTab = 'vjml' | 'mjml'

type ExampleFixture = {
  fixturePath: string
  previewHeight?: string
}

const props = defineProps<{
  tag: string
}>()

const fixtureByTag: Record<string, ExampleFixture> = {
  'mj-accordion': { fixturePath: 'accordion/basic', previewHeight: '520px' },
  'mj-accordion-element': { fixturePath: 'accordion/basic', previewHeight: '520px' },
  'mj-accordion-text': { fixturePath: 'accordion/basic', previewHeight: '520px' },
  'mj-accordion-title': { fixturePath: 'accordion/basic', previewHeight: '520px' },
  'mj-all': { fixturePath: 'attributes/all-defaults', previewHeight: '420px' },
  'mj-attributes': { fixturePath: 'attributes/all-defaults', previewHeight: '420px' },
  'mj-body': { fixturePath: 'document-shell/body-attributes', previewHeight: '420px' },
  'mj-breakpoint': { fixturePath: 'breakpoint/basic', previewHeight: '420px' },
  'mj-button': { fixturePath: 'button/basic', previewHeight: '360px' },
  'mj-carousel': { fixturePath: 'carousel/basic', previewHeight: '560px' },
  'mj-carousel-image': { fixturePath: 'carousel-image/basic', previewHeight: '460px' },
  'mj-class': { fixturePath: 'attributes/named-class', previewHeight: '420px' },
  'mj-column': { fixturePath: 'column/basic', previewHeight: '420px' },
  'mj-divider': { fixturePath: 'divider/basic', previewHeight: '320px' },
  'mj-font': { fixturePath: 'font/basic', previewHeight: '400px' },
  'mj-group': { fixturePath: 'group/basic', previewHeight: '420px' },
  'mj-head': { fixturePath: 'document-shell/head-metadata', previewHeight: '420px' },
  'mj-hero': { fixturePath: 'hero/basic', previewHeight: '520px' },
  'mj-html-attribute': { fixturePath: 'html-attributes/multiple-attributes', previewHeight: '420px' },
  'mj-html-attributes': { fixturePath: 'html-attributes/basic', previewHeight: '420px' },
  'mj-image': { fixturePath: 'image/basic', previewHeight: '420px' },
  'mj-navbar': { fixturePath: 'navbar/basic', previewHeight: '420px' },
  'mj-navbar-link': { fixturePath: 'navbar-link/basic', previewHeight: '420px' },
  'mj-preview': { fixturePath: 'preview/basic', previewHeight: '360px' },
  'mj-raw': { fixturePath: 'raw/basic', previewHeight: '400px' },
  'mj-section': { fixturePath: 'section/basic', previewHeight: '420px' },
  'mj-selector': { fixturePath: 'html-attributes/multiple-selectors', previewHeight: '420px' },
  'mj-social': { fixturePath: 'social/basic', previewHeight: '480px' },
  'mj-social-element': { fixturePath: 'social-element/basic', previewHeight: '420px' },
  'mj-spacer': { fixturePath: 'spacer/basic', previewHeight: '320px' },
  'mj-style': { fixturePath: 'style/basic', previewHeight: '400px' },
  'mj-table': { fixturePath: 'table/basic', previewHeight: '420px' },
  'mj-text': { fixturePath: 'text/basic', previewHeight: '360px' },
  'mj-title': { fixturePath: 'title/basic', previewHeight: '320px' },
  'mj-wrapper': { fixturePath: 'wrapper/basic', previewHeight: '460px' },
  'mjml': { fixturePath: 'document-shell/basic', previewHeight: '420px' },
}

const componentModules = import.meta.glob('../../../test/components/**/*.vue')
const vjmlSourceModules = import.meta.glob('../../../test/components/**/*.vue?raw')
const mjmlSourceModules = import.meta.glob('../../../test/components/**/*.mjml?raw')

const sourceTab = ref<SourceTab>('vjml')
const previewComponent = shallowRef<Component | null>(null)
const vjmlSource = ref('')
const mjmlSource = ref('')
const loadError = ref('')
const isLoading = ref(false)

let loadVersion = 0

const exampleFixture = computed(() => {
  return fixtureByTag[props.tag] ?? null
})

const componentTitle = computed(() => {
  return getVjmlComponentMetadata(props.tag)?.componentBaseName ?? props.tag
})

const activeSource = computed(() => {
  return sourceTab.value === 'vjml' ? vjmlSource.value : mjmlSource.value
})

const activeFilename = computed(() => {
  if (!exampleFixture.value) {
    return ''
  }

  const baseName = exampleFixture.value.fixturePath.split('/').pop() ?? 'basic'
  return `${baseName}.${sourceTab.value === 'vjml' ? 'vue' : 'mjml'}`
})

const previewHeight = computed(() => {
  return exampleFixture.value?.previewHeight ?? '420px'
})

function toDefaultExport<T>(value: T | { default: T }): T {
  return (value as { default?: T }).default ?? (value as T)
}

function toVueComponentKey(fixturePath: string) {
  return `../../../test/components/${fixturePath}.vue`
}

function toVjmlSourceKey(fixturePath: string) {
  return `../../../test/components/${fixturePath}.vue?raw`
}

function toMjmlSourceKey(fixturePath: string) {
  return `../../../test/components/${fixturePath}.mjml?raw`
}

async function loadExampleFixture() {
  const fixture = exampleFixture.value
  const currentLoadVersion = ++loadVersion

  sourceTab.value = 'vjml'
  loadError.value = ''

  if (!fixture) {
    previewComponent.value = null
    vjmlSource.value = ''
    mjmlSource.value = ''
    loadError.value = `No example fixture is mapped for ${props.tag}.`
    return
  }

  const componentLoader = componentModules[toVueComponentKey(fixture.fixturePath)]
  const vjmlLoader = vjmlSourceModules[toVjmlSourceKey(fixture.fixturePath)]
  const mjmlLoader = mjmlSourceModules[toMjmlSourceKey(fixture.fixturePath)]

  if (!componentLoader || !vjmlLoader || !mjmlLoader) {
    previewComponent.value = null
    vjmlSource.value = ''
    mjmlSource.value = ''
    loadError.value = `Example fixture files for ${props.tag} are missing.`
    return
  }

  isLoading.value = true

  try {
    const [componentModule, vjmlModule, mjmlModule] = await Promise.all([
      componentLoader(),
      vjmlLoader(),
      mjmlLoader(),
    ])

    if (currentLoadVersion !== loadVersion) {
      return
    }

    previewComponent.value = markRaw(toDefaultExport(componentModule) as Component)
    vjmlSource.value = String(toDefaultExport(vjmlModule))
    mjmlSource.value = String(toDefaultExport(mjmlModule))
  }
  catch (error) {
    if (currentLoadVersion !== loadVersion) {
      return
    }

    previewComponent.value = null
    vjmlSource.value = ''
    mjmlSource.value = ''
    loadError.value = error instanceof Error
      ? error.message
      : `Failed to load the example fixture for ${props.tag}.`
  }
  finally {
    if (currentLoadVersion === loadVersion) {
      isLoading.value = false
    }
  }
}

watch(
  () => props.tag,
  () => {
    void loadExampleFixture()
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <section class="space-y-4 border-t border-default pt-6" aria-labelledby="component-example">
    <div class="space-y-2">
      <h3 id="component-example" class="text-sm font-semibold uppercase tracking-wide">
        Example
      </h3>
      <p class="text-sm">
        Preview the paired parity fixture and compare the full VJML and MJML source required to render it.
      </p>
    </div>

    <UAlert
      v-if="loadError"
      color="warning"
      variant="subtle"
      title="Example unavailable"
      :description="loadError"
    />

    <div v-else class="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
      <div class="overflow-hidden rounded-lg border border-default bg-default">
        <div class="border-b border-default px-4 py-3">
          <p class="text-sm font-medium">Preview</p>
          <p class="text-sm">{{ componentTitle }} rendered through the browser preview pipeline.</p>
        </div>

        <ClientOnly>
          <template #fallback>
            <div class="space-y-3 p-4">
              <USkeleton class="h-6 w-32" />
              <USkeleton class="h-80 w-full" />
            </div>
          </template>

          <div v-if="previewComponent" class="p-4">
            <VjmlRenderFrame
              :component="previewComponent"
              :height="previewHeight"
              :title="`${componentTitle} example preview`"
            />
          </div>

          <div v-else class="p-4">
            <USkeleton class="h-80 w-full" />
          </div>
        </ClientOnly>
      </div>

      <div class="overflow-hidden rounded-lg border border-default bg-default">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-default px-4 py-3">
          <div class="space-y-1">
            <p class="text-sm font-medium">Source</p>
            <p class="text-sm">{{ activeFilename }}</p>
          </div>

          <div class="flex flex-wrap gap-2">
            <UButton
              color="neutral"
              :variant="sourceTab === 'vjml' ? 'soft' : 'ghost'"
              label="VJML"
              @click="sourceTab = 'vjml'"
            />
            <UButton
              color="neutral"
              :variant="sourceTab === 'mjml' ? 'soft' : 'ghost'"
              label="MJML"
              @click="sourceTab = 'mjml'"
            />
          </div>
        </div>

        <div class="p-4">
          <div v-if="isLoading" class="space-y-3">
            <USkeleton class="h-5 w-24" />
            <USkeleton class="h-80 w-full" />
          </div>

          <pre v-else class="max-h-144 overflow-auto rounded-md border border-default bg-elevated/50 p-4 text-xs"><code>{{ activeSource }}</code></pre>
        </div>
      </div>
    </div>
  </section>
</template>