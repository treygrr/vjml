<script setup lang="ts">
definePageMeta({
  layout: 'docs',
})

const { data: page, contentPath } = await useDocsPage()

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Documentation page not found',
    fatal: true,
  })
}

const { data: surroundings } = await useAsyncData(
  () => `docs-surround:${contentPath.value}`,
  () => queryCollectionItemSurroundings('content', contentPath.value),
  {
    watch: [contentPath],
  },
)

const docsSurroundings = computed(() => {
  return (surroundings.value ?? []).map(item => {
    if (!item) {
      return null
    }

    return {
      ...item,
      path: getDocsRoutePath(item.path),
    }
  })
})

const previousPage = computed(() => docsSurroundings.value[0])
const nextPage = computed(() => docsSurroundings.value[1])

useSeoMeta({
  title: () => page.value?.title ? `${page.value.title} · VJML Docs` : 'VJML Docs',
  description: () => page.value?.description ?? 'Guides, rendering workflows, and component reference pages for VJML.',
})
</script>

<template>
  <div class="space-y-10">
    <article class="docs-content max-w-none">
      <ContentRenderer :value="page" />
    </article>

    <div
      v-if="previousPage || nextPage"
      class="grid gap-4 md:grid-cols-2"
    >
      <UPageCard
        v-if="previousPage"
        :to="previousPage.path"
        title="Previous"
        :description="previousPage.title"
        icon="i-lucide-arrow-left"
      />

      <div v-else class="hidden md:block" />

      <UPageCard
        v-if="nextPage"
        :to="nextPage.path"
        title="Next"
        :description="nextPage.title"
        icon="i-lucide-arrow-right"
      />
    </div>
  </div>
</template>