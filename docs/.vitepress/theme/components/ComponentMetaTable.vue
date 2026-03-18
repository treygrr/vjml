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
  <div v-if="metadata" class="meta-card">
    <div class="meta-summary">
      <div class="meta-badges">
        <span class="meta-chip -accent">{{ metadata.tagName }}</span>
        <span class="meta-chip">{{ metadata.componentBaseName }}</span>
        <span class="meta-chip">Source: {{ metadata.source }}</span>
        <span class="meta-chip">Slot: {{ metadata.serialization.slotKind }}</span>
      </div>

      <div class="meta-copy">
        This table is generated from the same component metadata used by the renderer and validator.
      </div>
    </div>

    <div class="meta-grid">
      <div class="meta-block">
        <h4>Parents</h4>
        <ul class="meta-list">
          <li v-for="parent in metadata.allowedParentTagNames" :key="parent">
            {{ parent }}
          </li>
          <li v-if="metadata.allowedParentTagNames.length === 0">Root only</li>
        </ul>
      </div>

      <div class="meta-block">
        <h4>Children</h4>
        <ul class="meta-list">
          <li v-if="metadata.supportsAnyChildTag">Any child tag</li>
          <li v-for="child in metadata.allowedChildTagNames" :key="child">
            {{ child }}
          </li>
          <li v-if="!metadata.supportsAnyChildTag && metadata.allowedChildTagNames.length === 0">No child tags</li>
        </ul>
      </div>

      <div class="meta-block">
        <h4>Serialization</h4>
        <ul class="meta-list">
          <li>Ending tag: {{ metadata.endingTag ? 'yes' : 'no' }}</li>
          <li>Raw element: {{ metadata.rawElement ? 'yes' : 'no' }}</li>
          <li>Arbitrary attrs: {{ metadata.serialization.allowsArbitraryAttributes ? 'yes' : 'no' }}</li>
          <li>Preserves raw content: {{ metadata.serialization.preservesRawContent ? 'yes' : 'no' }}</li>
        </ul>
      </div>

      <div class="meta-block">
        <h4>Defaults</h4>
        <ul class="meta-list">
          <li v-if="Object.keys(metadata.defaultAttributes).length === 0">No explicit defaults</li>
          <li v-for="(value, name) in metadata.defaultAttributes" :key="name">
            {{ name }}={{ formatValue(value) }}
          </li>
        </ul>
      </div>
    </div>

    <div class="meta-table-wrap" v-if="attributeRows.length > 0">
      <table class="meta-table">
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Type</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in attributeRows" :key="row.name">
            <td><code>{{ row.name }}</code></td>
            <td><code>{{ row.type }}</code></td>
            <td><code>{{ formatValue(row.defaultValue) }}</code></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div v-else class="meta-card">
    <p>No metadata found for <code>{{ tag }}</code>.</p>
  </div>
</template>