<script setup lang="ts">
import { computed } from 'vue'

import { getVjmlComponentMetadata } from '@src/metadata'

const props = defineProps<{
  tag: string
}>()

function formatValue(value: unknown): string {
  if (value === undefined) {
    return '—'
  }

  if (value === null) {
    return 'null'
  }

  return typeof value === 'string' ? value : JSON.stringify(value)
}

const metadata = computed(() => {
  return getVjmlComponentMetadata(props.tag) as unknown as {
    allowedAttributes: Record<string, string>
    allowedChildTagNames: string[]
    allowedParentTagNames: string[]
    componentBaseName: string
    defaultAttributes: Record<string, unknown>
    endingTag: boolean
    rawElement: boolean
    serialization: {
      allowsArbitraryAttributes: boolean
      preservesRawContent: boolean
      slotKind: string
    }
    source: string
    supportsAnyChildTag: boolean
    tagName: string
  } | null
})

const attributeRows = computed(() => {
  if (!metadata.value) {
    return []
  }

  return Object.entries(metadata.value.allowedAttributes).map(([name, type]) => {
    return {
      defaultValue: metadata.value?.defaultAttributes?.[name],
      name,
      type,
    }
  })
})
</script>

<template>
  <UCard v-if="metadata" class="not-prose overflow-hidden border-0 shadow-lg shadow-slate-950/5 ring-1 ring-slate-200/80">
    <template #header>
      <div class="flex flex-col gap-4">
        <div class="flex flex-wrap gap-2">
          <UBadge color="primary" variant="subtle">{{ metadata.tagName }}</UBadge>
          <UBadge color="neutral" variant="soft">{{ metadata.componentBaseName }}</UBadge>
          <UBadge color="neutral" variant="outline">Source: {{ metadata.source }}</UBadge>
          <UBadge color="neutral" variant="outline">Slot: {{ metadata.serialization.slotKind }}</UBadge>
        </div>

        <p class="text-sm leading-6 text-slate-600">
          This table is generated from the same component metadata used by the renderer and validator.
        </p>
      </div>
    </template>

    <div class="grid gap-4 lg:grid-cols-2">
      <UCard class="border-0 bg-slate-50/80 ring-1 ring-slate-200/80">
        <template #header>
          <h4 class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Parents</h4>
        </template>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="parent in metadata.allowedParentTagNames"
            :key="parent"
            color="neutral"
            variant="soft"
          >
            {{ parent }}
          </UBadge>
          <UBadge v-if="metadata.allowedParentTagNames.length === 0" color="neutral" variant="soft">Root only</UBadge>
        </div>
      </UCard>

      <UCard class="border-0 bg-slate-50/80 ring-1 ring-slate-200/80">
        <template #header>
          <h4 class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Children</h4>
        </template>
        <div class="flex flex-wrap gap-2">
          <UBadge v-if="metadata.supportsAnyChildTag" color="neutral" variant="soft">Any child tag</UBadge>
          <UBadge
            v-for="child in metadata.allowedChildTagNames"
            :key="child"
            color="neutral"
            variant="soft"
          >
            {{ child }}
          </UBadge>
          <UBadge
            v-if="!metadata.supportsAnyChildTag && metadata.allowedChildTagNames.length === 0"
            color="neutral"
            variant="soft"
          >
            No child tags
          </UBadge>
        </div>
      </UCard>

      <UCard class="border-0 bg-slate-50/80 ring-1 ring-slate-200/80">
        <template #header>
          <h4 class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Serialization</h4>
        </template>
        <div class="flex flex-wrap gap-2">
          <UBadge color="neutral" variant="soft">Ending tag: {{ metadata.endingTag ? 'yes' : 'no' }}</UBadge>
          <UBadge color="neutral" variant="soft">Raw element: {{ metadata.rawElement ? 'yes' : 'no' }}</UBadge>
          <UBadge color="neutral" variant="soft">Arbitrary attrs: {{ metadata.serialization.allowsArbitraryAttributes ? 'yes' : 'no' }}</UBadge>
          <UBadge color="neutral" variant="soft">Preserves raw content: {{ metadata.serialization.preservesRawContent ? 'yes' : 'no' }}</UBadge>
        </div>
      </UCard>

      <UCard class="border-0 bg-slate-50/80 ring-1 ring-slate-200/80">
        <template #header>
          <h4 class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Defaults</h4>
        </template>
        <div class="flex flex-wrap gap-2">
          <UBadge v-if="Object.keys(metadata.defaultAttributes).length === 0" color="neutral" variant="soft">No explicit defaults</UBadge>
          <UBadge
            v-for="(value, name) in metadata.defaultAttributes"
            :key="name"
            color="neutral"
            variant="soft"
          >
            {{ name }}={{ formatValue(value) }}
          </UBadge>
        </div>
      </UCard>
    </div>

    <div v-if="attributeRows.length > 0" class="mt-6 overflow-x-auto rounded-2xl ring-1 ring-slate-200/80">
      <table class="min-w-full border-collapse text-sm">
        <thead>
          <tr>
            <th class="bg-slate-50 px-4 py-3 text-left font-semibold text-slate-700">Attribute</th>
            <th class="bg-slate-50 px-4 py-3 text-left font-semibold text-slate-700">Type</th>
            <th class="bg-slate-50 px-4 py-3 text-left font-semibold text-slate-700">Default</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in attributeRows" :key="row.name">
            <td class="border-t border-slate-200 px-4 py-3 align-top"><code>{{ row.name }}</code></td>
            <td class="border-t border-slate-200 px-4 py-3 align-top"><code>{{ row.type }}</code></td>
            <td class="border-t border-slate-200 px-4 py-3 align-top"><code>{{ formatValue(row.defaultValue) }}</code></td>
          </tr>
        </tbody>
      </table>
    </div>
  </UCard>

  <UAlert
    v-else
    class="not-prose"
    color="warning"
    description="The requested component tag was not found in the current metadata set."
    :title="`Missing metadata for ${tag}`"
    variant="subtle"
  />
</template>