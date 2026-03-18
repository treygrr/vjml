<script setup lang="ts">
import { computed } from 'vue'
import type { TableColumn } from '@nuxt/ui'

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
      attribute: name,
      default: formatValue(metadata.value?.defaultAttributes?.[name]),
      type,
    }
  })
})

const attributeColumns: TableColumn<(typeof attributeRows.value)[number]>[] = [
  {
    accessorKey: 'attribute',
    header: 'Attribute',
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'default',
    header: 'Default',
  },
]

const serializationNote = computed(() => {
  if (!metadata.value) {
    return ''
  }

  const notes: string[] = []

  if (metadata.value.rawElement) {
    notes.push('This component renders a raw element and may preserve literal content.')
  }

  if (metadata.value.serialization.preservesRawContent) {
    notes.push('Renderer output preserves raw content during serialization.')
  }

  if (metadata.value.serialization.allowsArbitraryAttributes) {
    notes.push('Arbitrary HTML attributes are allowed on the rendered tag.')
  }

  return notes.join(' ')
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

    <div class="grid gap-4 md:grid-cols-3">
      <UCard>
        <template #header>
          <h4 class="font-semibold">Allowed attributes</h4>
        </template>
        <p class="text-2xl font-semibold text-highlighted">{{ attributeRows.length }}</p>
        <p class="text-sm text-muted">Validated against the same metadata used by docs generation and runtime checks.</p>
      </UCard>

      <UCard>
        <template #header>
          <h4 class="font-semibold">Allowed parents</h4>
        </template>
        <p class="text-2xl font-semibold text-highlighted">{{ metadata.allowedParentTagNames.length || 1 }}</p>
        <p class="text-sm text-muted">Root-only components report a single root context instead of a parent tag list.</p>
      </UCard>

      <UCard>
        <template #header>
          <h4 class="font-semibold">Child model</h4>
        </template>
        <p class="text-2xl font-semibold text-highlighted">
          {{ metadata.supportsAnyChildTag ? 'Any' : metadata.allowedChildTagNames.length }}
        </p>
        <p class="text-sm text-muted">Quick summary of whether the component expects specific child tags or accepts arbitrary content.</p>
      </UCard>
    </div>

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

    <UAlert
      v-if="serializationNote"
      class="mt-6"
      color="neutral"
      variant="subtle"
      title="Serialization notes"
      :description="serializationNote"
    />

    <div v-if="attributeRows.length > 0" class="mt-6 overflow-x-auto">
      <UTable :data="attributeRows" :columns="attributeColumns" />
    </div>
  </UCard>

  <UAlert
    v-else
    class="not-prose"
    description="The requested component tag was not found in the current metadata set."
    :title="`Missing metadata for ${tag}`"
  />
</template>