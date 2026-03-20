<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  type Component,
  type PropType,
} from 'vue'

import type {
  VjmlRuntimeConfigInput,
  VjmlValidationIssue,
} from '../vjml'
import { useVjmlRenderer } from '../runtime/client/useVjmlRenderer'

const props = defineProps({
  component: {
    required: true,
    type: [Object, Function] as PropType<Component>,
  },
  height: {
    default: '360px',
    type: [Number, String],
  },
  renderProps: {
    default: () => ({}),
    type: Object as PropType<Record<string, unknown>>,
  },
  runtime: {
    default: () => ({}),
    type: Object as PropType<VjmlRuntimeConfigInput>,
  },
  title: {
    default: 'VJML preview',
    type: String,
  },
})

const renderer = useVjmlRenderer()
const html = ref('')
const issues = ref<VjmlValidationIssue[]>([])
const renderError = ref('')
const isRendering = ref(false)

const VITE_AFTER_UPDATE_EVENT = 'vite:afterUpdate'
const VITE_CLIENT_MARKER = '/@vite/client'

type ViteHotUpdateHandler = () => void | Promise<void>

type ViteHotContext = {
  off?: (event: typeof VITE_AFTER_UPDATE_EVENT, handler: ViteHotUpdateHandler) => void
  on: (event: typeof VITE_AFTER_UPDATE_EVENT, handler: ViteHotUpdateHandler) => void
}

type ViteClientModule = {
  createHotContext?: (ownerPath: string) => ViteHotContext
}

function getViteClientImportPath(): string | null {
  if (typeof document === 'undefined') {
    return null
  }

  const viteClientScript = Array.from(document.scripts).find((script) => {
    return script.src.includes(VITE_CLIENT_MARKER)
  })

  return viteClientScript?.src ?? null
}

function createViteHotContextOwnerPath(): string {
  const token = typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`

  return `vjml:VjmlRenderFrame:${token}`
}

// Published builds lose import.meta.hot, so subscribe through the Vite client when it exists.
async function resolveViteHotContext(): Promise<ViteHotContext | null> {
  const viteClientImportPath = getViteClientImportPath()

  if (!viteClientImportPath || typeof window === 'undefined') {
    return null
  }

  const viteClientModule = await import(/* @vite-ignore */ viteClientImportPath)
    .then((module) => module as ViteClientModule)
    .catch(() => null)

  return viteClientModule?.createHotContext?.(createViteHotContextOwnerPath()) ?? null
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildStatusDocument(message: string): string {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:16px;background:#fffdf8;color:#173540;font-family:Arial,sans-serif;">
    <p style="margin:0;font-size:14px;line-height:22px;">${escapeHtml(message)}</p>
  </body>
</html>`
}

async function renderFrame() {
  isRendering.value = true
  renderError.value = ''

  try {
    const result = await renderer.renderToHtml(props.component, {
      props: props.renderProps,
      runtime: props.runtime,
    })

    html.value = result.html
    issues.value = result.issues
  }
  catch (error) {
    html.value = ''
    issues.value = []
    renderError.value = error instanceof Error ? error.message : 'Failed to render preview.'
  }
  finally {
    isRendering.value = false
  }
}

let isUnmounted = false
let unregisterHotUpdateListener: (() => void) | undefined

async function registerHotUpdateListener() {
  const hot = await resolveViteHotContext()

  if (!hot || unregisterHotUpdateListener || isUnmounted) {
    return
  }

  const onHotUpdate = async () => {
    if (isUnmounted) {
      return
    }

    await nextTick()
    void renderFrame()
  }

  hot.on(VITE_AFTER_UPDATE_EVENT, onHotUpdate)

  unregisterHotUpdateListener = () => {
    hot.off?.(VITE_AFTER_UPDATE_EVENT, onHotUpdate)
  }
}

onMounted(() => {
  void registerHotUpdateListener()
})

onBeforeUnmount(() => {
  isUnmounted = true
  unregisterHotUpdateListener?.()
})

watch(
  () => [props.component, props.renderProps, props.runtime],
  () => {
    void renderFrame()
  },
  {
    deep: true,
    immediate: true,
  },
)

const resolvedHeight = computed(() => {
  return typeof props.height === 'number' ? `${props.height}px` : props.height
})

const srcdoc = computed(() => {
  if (html.value) {
    return html.value
  }

  if (renderError.value) {
    return buildStatusDocument(renderError.value)
  }

  return buildStatusDocument(isRendering.value ? 'Rendering preview…' : 'Preparing preview…')
})

defineExpose({
  html,
  issues,
  renderFrame,
})
</script>

<template>
  <div class="vjml-render-frame">
    <iframe
      :srcdoc="srcdoc"
      :style="{ minHeight: resolvedHeight }"
      class="vjml-render-frame__iframe"
      :title="title"
    />
  </div>
</template>
