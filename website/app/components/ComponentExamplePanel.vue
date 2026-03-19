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

type ExampleTab = 'preview' | 'vjml' | 'mjml'

type ExampleFixture = {
  fixturePath: string
  previewHeight?: string
}

const props = defineProps<{
  tag: string
}>()

const fixtureByTag: Record<string, ExampleFixture> = {
  'mj-accordion': { fixturePath: 'accordion/head-attributes', previewHeight: '520px' },
  'mj-accordion-element': { fixturePath: 'accordion/head-attributes', previewHeight: '520px' },
  'mj-accordion-text': { fixturePath: 'accordion/head-attributes', previewHeight: '520px' },
  'mj-accordion-title': { fixturePath: 'accordion/head-attributes', previewHeight: '520px' },
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
const vjmlSourceModules = import.meta.glob('../../../test/components/**/*.vue', {
  import: 'default',
  query: '?raw',
})
const mjmlSourceModules = import.meta.glob('../../../test/components/**/*.mjml', {
  import: 'default',
  query: '?raw',
})

const activeTab = ref<ExampleTab>('preview')
const previewComponent = shallowRef<Component | null>(null)
const vjmlSource = ref('')
const mjmlSource = ref('')
const loadError = ref('')
const isLoading = ref(false)
const copyState = ref<'idle' | 'copied' | 'error'>('idle')

const tabOptions = [
  {
    value: 'preview',
    label: 'Preview',
  },
  {
    value: 'vjml',
    label: 'VJML',
  },
  {
    value: 'mjml',
    label: 'MJML',
  },
] as const satisfies ReadonlyArray<{
  value: ExampleTab
  label: string
}>

let loadVersion = 0
let copyResetTimer: ReturnType<typeof setTimeout> | null = null

const exampleFixture = computed(() => {
  return fixtureByTag[props.tag] ?? null
})

const componentTitle = computed(() => {
  return getVjmlComponentMetadata(props.tag)?.componentBaseName ?? props.tag
})

const activeSource = computed(() => {
  return activeTab.value === 'mjml' ? mjmlSource.value : vjmlSource.value
})

const activeFilename = computed(() => {
  if (!exampleFixture.value) {
    return ''
  }

  if (activeTab.value === 'preview') {
    return 'Live preview'
  }

  const baseName = exampleFixture.value.fixturePath.split('/').pop() ?? 'basic'
  return `${baseName}.${activeTab.value === 'vjml' ? 'vue' : 'mjml'}`
})

const activePanelTitle = computed(() => {
  return activeTab.value === 'preview' ? 'Preview' : 'Source'
})

const activePanelDescription = computed(() => {
  if (activeTab.value === 'preview') {
    return `${componentTitle.value} rendered through the browser preview pipeline.`
  }

  return activeFilename.value
})

const showCopyButton = computed(() => {
  return activeTab.value !== 'preview' && activeSource.value.length > 0
})

const copyButtonLabel = computed(() => {
  if (copyState.value === 'copied') {
    return 'Copied'
  }

  if (copyState.value === 'error') {
    return 'Copy failed'
  }

  return 'Copy'
})

const copyButtonIcon = computed(() => {
  if (copyState.value === 'copied') {
    return 'i-lucide-check'
  }

  return 'i-lucide-copy'
})

const previewHeight = computed(() => {
  return exampleFixture.value?.previewHeight ?? '420px'
})

function toDefaultExport<T>(value: T | { default: T }): T {
  return (value as { default?: T }).default ?? (value as T)
}

function toFixtureKey(fixturePath: string, extension: 'vue' | 'mjml') {
  return `../../../test/components/${fixturePath}.${extension}`
}

function resetCopyState() {
  copyState.value = 'idle'

  if (copyResetTimer) {
    clearTimeout(copyResetTimer)
    copyResetTimer = null
  }
}

async function writeTextToClipboard(value: string) {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value)
    return true
  }

  if (typeof document === 'undefined') {
    return false
  }

  const textArea = document.createElement('textarea')
  textArea.value = value
  textArea.setAttribute('readonly', '')
  textArea.style.position = 'absolute'
  textArea.style.left = '-9999px'
  document.body.appendChild(textArea)
  textArea.select()

  try {
    return document.execCommand('copy')
  }
  finally {
    document.body.removeChild(textArea)
  }
}

async function copyActiveSource() {
  resetCopyState()

  try {
    const didCopy = await writeTextToClipboard(activeSource.value)
    copyState.value = didCopy ? 'copied' : 'error'
  }
  catch {
    copyState.value = 'error'
  }

  copyResetTimer = setTimeout(() => {
    copyState.value = 'idle'
    copyResetTimer = null
  }, 2000)
}

async function loadExampleFixture() {
  const fixture = exampleFixture.value
  const currentLoadVersion = ++loadVersion

  activeTab.value = 'preview'
  loadError.value = ''

  if (!fixture) {
    previewComponent.value = null
    vjmlSource.value = ''
    mjmlSource.value = ''
    loadError.value = `No example fixture is mapped for ${props.tag}.`
    return
  }

  const componentLoader = componentModules[toFixtureKey(fixture.fixturePath, 'vue')]
  const vjmlLoader = vjmlSourceModules[toFixtureKey(fixture.fixturePath, 'vue')]
  const mjmlLoader = mjmlSourceModules[toFixtureKey(fixture.fixturePath, 'mjml')]

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

watch(activeTab, () => {
  resetCopyState()
})
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

    <div v-else class="overflow-hidden rounded-lg border border-default bg-default">
      <div class="flex flex-wrap items-start justify-between gap-3 border-b border-default px-4 py-3">
        <div class="space-y-1">
          <p class="text-sm font-medium">{{ activePanelTitle }}</p>
          <p class="text-sm">{{ activePanelDescription }}</p>
        </div>

        <div class="flex flex-wrap gap-2" role="tablist" aria-label="Example views">
          <UButton
            v-for="tab in tabOptions"
            :key="tab.value"
            color="neutral"
            :variant="activeTab === tab.value ? 'soft' : 'ghost'"
            :label="tab.label"
            role="tab"
            :aria-selected="activeTab === tab.value"
            @click="activeTab = tab.value"
          />
        </div>
      </div>

      <div class="p-4">
        <div v-if="isLoading" class="space-y-3">
          <USkeleton class="h-5 w-24" />
          <USkeleton class="h-80 w-full" />
        </div>

        <ClientOnly v-else-if="activeTab === 'preview'">
          <template #fallback>
            <div class="space-y-3">
              <USkeleton class="h-6 w-32" />
              <USkeleton class="h-80 w-full" />
            </div>
          </template>

          <div v-if="previewComponent" id="component-example-preview">
            <VjmlRenderFrame
              :component="previewComponent"
              :height="previewHeight"
              :title="`${componentTitle} example preview`"
            />
          </div>

          <div v-else>
            <USkeleton class="h-80 w-full" />
          </div>
        </ClientOnly>

        <div v-else class="relative">
          <div class="absolute right-3 top-3 z-10">
            <UButton
              v-if="showCopyButton"
              color="neutral"
              variant="outline"
              size="xs"
              :label="copyButtonLabel"
              :leading-icon="copyButtonIcon"
              @click="void copyActiveSource()"
            />
          </div>

          <pre
            :id="`component-example-${activeTab}`"
            class="max-h-144 overflow-auto rounded-md border border-default bg-elevated/50 p-4 pr-24 text-xs"
          ><code>{{ activeSource }}</code></pre>
        </div>
      </div>
    </div>
  </section>
</template>