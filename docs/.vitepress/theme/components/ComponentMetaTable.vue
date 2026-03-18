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
  <UCard v-if="metadata" class="not-prose">
    <template #header>
      <div class="flex flex-col gap-4">
        <div class="flex flex-wrap gap-2">
          <UBadge>{{ metadata.tagName }}</UBadge>
          <UBadge color="neutral" variant="subtle">{{ metadata.componentBaseName }}</UBadge>
          <UBadge color="neutral" variant="subtle">Source: {{ metadata.source }}</UBadge>
          <UBadge color="neutral" variant="subtle">Slot: {{ metadata.serialization.slotKind }}</UBadge>
        </div>

        <p>
          This table is generated from the same component metadata used by the renderer and validator.
        </p>
      </div>
    </template>

    <div class="grid gap-4 lg:grid-cols-2">
      <UCard>
        <template #header>
          <h4 class="font-semibold">Parents</h4>
        </template>
        <div class="flex flex-wrap gap-2">
          <UBadge
            v-for="parent in metadata.allowedParentTagNames"
            :key="parent"
            color="neutral"
            variant="subtle"
          >
            {{ parent }}
          </UBadge>
          <UBadge v-if="metadata.allowedParentTagNames.length === 0" color="neutral" variant="subtle">Root only</UBadge>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h4 class="font-semibold">Children</h4>
        </template>
        <div class="flex flex-wrap gap-2">
          <UBadge v-if="metadata.supportsAnyChildTag" color="neutral" variant="subtle">Any child tag</UBadge>
          <UBadge
            v-for="child in metadata.allowedChildTagNames"
            :key="child"
            color="neutral"
            variant="subtle"
          >
            {{ child }}
          </UBadge>
          <UBadge
            v-if="!metadata.supportsAnyChildTag && metadata.allowedChildTagNames.length === 0"
            color="neutral"
            variant="subtle"
          >
            No child tags
          </UBadge>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h4 class="font-semibold">Serialization</h4>
        </template>
        <div class="flex flex-wrap gap-2">
          <UBadge color="neutral" variant="subtle">Ending tag: {{ metadata.endingTag ? 'yes' : 'no' }}</UBadge>
          <UBadge color="neutral" variant="subtle">Raw element: {{ metadata.rawElement ? 'yes' : 'no' }}</UBadge>
          <UBadge color="neutral" variant="subtle">Arbitrary attrs: {{ metadata.serialization.allowsArbitraryAttributes ? 'yes' : 'no' }}</UBadge>
          <UBadge color="neutral" variant="subtle">Preserves raw content: {{ metadata.serialization.preservesRawContent ? 'yes' : 'no' }}</UBadge>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h4 class="font-semibold">Defaults</h4>
        </template>
        <div class="flex flex-wrap gap-2">
          <UBadge v-if="Object.keys(metadata.defaultAttributes).length === 0" color="neutral" variant="subtle">No explicit defaults</UBadge>
          <UBadge
            v-for="(value, name) in metadata.defaultAttributes"
            :key="name"
            color="neutral"
            variant="subtle"
          >
            {{ name }}={{ formatValue(value) }}
          </UBadge>
        </div>
      </UCard>
    </div>

    <div v-if="attributeRows.length > 0" class="mt-6 overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead>
          <tr>
            <th class="px-4 py-3 text-left font-semibold">Attribute</th>
            <th class="px-4 py-3 text-left font-semibold">Type</th>
            <th class="px-4 py-3 text-left font-semibold">Default</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in attributeRows" :key="row.name">
            <td class="px-4 py-3 align-top"><code>{{ row.name }}</code></td>
            <td class="px-4 py-3 align-top"><code>{{ row.type }}</code></td>
            <td class="px-4 py-3 align-top"><code>{{ formatValue(row.defaultValue) }}</code></td>
          </tr>
        </tbody>
      </table>
    </div>
  </UCard>

  <UAlert
    v-else
    class="not-prose"
    description="The requested component tag was not found in the current metadata set."
    :title="`Missing metadata for ${tag}`"
  />
</template>