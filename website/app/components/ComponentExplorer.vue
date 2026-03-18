<script setup lang="ts">
import { VJML_COMPONENT_METADATA } from 'vjml'
import { COMPONENT_DOC_GROUPS, getComponentDocsRoute } from '~/composables/useComponentDocs'

const groupedComponents = computed(() => {
  return COMPONENT_DOC_GROUPS.map(group => ({
    ...group,
    items: group.tags
      .map(tagName => VJML_COMPONENT_METADATA.find(metadata => metadata.tagName === tagName))
      .filter((metadata): metadata is (typeof VJML_COMPONENT_METADATA)[number] => Boolean(metadata)),
  }))
})
</script>

<template>
  <div class="not-prose space-y-8">
    <section
      v-for="group in groupedComponents"
      :key="group.title"
      class="space-y-4"
    >
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div class="space-y-1">
          <h3 class="text-2xl font-semibold">{{ group.title }}</h3>
          <p class="max-w-2xl text-sm">{{ group.description }}</p>
        </div>
        <UBadge color="neutral" variant="outline" :label="`${group.items.length} tags`" />
      </div>

      <UPageGrid>
        <UPageCard
          v-for="item in group.items"
          :key="item.tagName"
          :to="getComponentDocsRoute(item.tagName)"
          :title="item.componentBaseName"
          :description="item.tagName"
        >
          <div class="space-y-4">
            <div class="flex flex-wrap gap-2">
              <UBadge color="primary" variant="soft" :label="`${Object.keys(item.allowedAttributes).length} attributes`" />
              <UBadge color="neutral" variant="subtle" :label="`slot: ${item.serialization.slotKind}`" />
            </div>

            <p class="text-sm">
              {{ item.allowedChildTagNames.length ? `${item.allowedChildTagNames.length} named child tags.` : 'Leaf component with no child tags.' }}
            </p>
          </div>
        </UPageCard>
      </UPageGrid>
    </section>
  </div>
</template>