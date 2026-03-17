<script setup lang="ts">
import {
  computed,
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
