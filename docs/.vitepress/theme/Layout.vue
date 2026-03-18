<script setup lang="ts">
import { useData, useRoute, withBase } from 'vitepress'
import { useSidebar } from 'vitepress/theme'
import { computed, provide, ref, useSlots, watch } from 'vue'

import DocsSidebarNavigation from './components/DocsSidebarNavigation.vue'
import DocsTopNavigation from './components/DocsTopNavigation.vue'
import { VPContent, VPFooter, VPNavBarAppearance, VPNavBarSearch, VPSkipLink } from './vitepress-default.js'

const { hasSidebar } = useSidebar()

const route = useRoute()
const isSidebarOpen = ref(false)

watch(() => route.path, () => {
  isSidebarOpen.value = false
})

const { frontmatter, page, site } = useData()

const pageTitle = computed(() => {
  if (frontmatter.value.layout === 'home') {
    return site.value.title
  }

  return page.value.title || site.value.title
})

const slots = useSlots()
const heroImageSlotExists = computed(() => !!slots['home-hero-image'])

provide('hero-image-slot-exists', heroImageSlotExists)
</script>

<template>
  <UApp>
    <div v-if="frontmatter.layout !== false" class="Layout" :class="frontmatter.pageClass">
      <slot name="layout-top" />
      <VPSkipLink />
      <UDashboardGroup unit="rem" storage="local" storage-key="vjml-docs">
        <UDashboardSidebar
          v-if="hasSidebar"
          id="docs-sidebar"
          v-model:open="isSidebarOpen"
          resizable
          :default-size="18"
          :min-size="14"
          :max-size="22"
          :ui="{
            root: 'bg-default/95 supports-[backdrop-filter]:bg-default/85 backdrop-blur',
            body: 'gap-4 px-3 py-4',
            header: 'border-b border-default bg-elevated/30 px-3 py-4',
            footer: 'border-t border-default bg-elevated/15 px-3 py-3'
          }"
        >
          <template #header>
            <div class="space-y-3">
              <UButton
                color="neutral"
                variant="soft"
                class="w-full justify-start rounded-xl"
                icon="i-lucide-book-open"
                label="VJML Docs"
                block
                :href="withBase('/')"
              />
            </div>
          </template>

          <template #default>
            <slot name="sidebar-nav-before" />
            <DocsSidebarNavigation />
            <slot name="sidebar-nav-after" />
          </template>

          <template #footer>
            <div class="flex flex-col gap-2">
              <UButton
                color="neutral"
                variant="ghost"
                class="w-full justify-start rounded-xl"
                icon="i-lucide-gallery-vertical-end"
                label="Browse samples"
                block
                :href="withBase('/samples')"
              />
              <UButton
                color="neutral"
                variant="ghost"
                class="w-full justify-start rounded-xl"
                icon="i-simple-icons-github"
                label="Project repository"
                block
                href="https://github.com/gilbertrogers/vjml"
                target="_blank"
              />
            </div>
          </template>
        </UDashboardSidebar>

        <UDashboardPanel id="docs-panel" :ui="{ body: 'p-0 overflow-y-auto' }">
          <template #header>
            <UDashboardNavbar
              :title="pageTitle"
              :toggle="hasSidebar"
              :ui="{
                center: 'hidden xl:flex min-w-0 flex-1 items-center',
                right: 'flex-1 justify-end gap-2 sm:gap-3',
                title: 'truncate'
              }"
            >
              <template #default>
                <DocsTopNavigation />
              </template>

              <template #right>
                <div class="hidden md:flex min-w-0 flex-1 max-w-md items-center">
                  <VPNavBarSearch />
                </div>
                <VPNavBarAppearance />
              </template>
            </UDashboardNavbar>
          </template>

          <template #body>
            <div class="docs-content-shell">
              <VPContent>
                <template #page-top><slot name="page-top" /></template>
                <template #page-bottom><slot name="page-bottom" /></template>

                <template #not-found><slot name="not-found" /></template>
                <template #home-hero-before><slot name="home-hero-before" /></template>
                <template #home-hero-info-before><slot name="home-hero-info-before" /></template>
                <template #home-hero-info><slot name="home-hero-info" /></template>
                <template #home-hero-info-after><slot name="home-hero-info-after" /></template>
                <template #home-hero-actions-after><slot name="home-hero-actions-after" /></template>
                <template #home-hero-image><slot name="home-hero-image" /></template>
                <template #home-hero-after><slot name="home-hero-after" /></template>
                <template #home-features-before><slot name="home-features-before" /></template>
                <template #home-features-after><slot name="home-features-after" /></template>

                <template #doc-footer-before><slot name="doc-footer-before" /></template>
                <template #doc-before><slot name="doc-before" /></template>
                <template #doc-after><slot name="doc-after" /></template>
                <template #doc-top><slot name="doc-top" /></template>
                <template #doc-bottom><slot name="doc-bottom" /></template>

                <template #aside-top><slot name="aside-top" /></template>
                <template #aside-bottom><slot name="aside-bottom" /></template>
                <template #aside-outline-before><slot name="aside-outline-before" /></template>
                <template #aside-outline-after><slot name="aside-outline-after" /></template>
                <template #aside-ads-before><slot name="aside-ads-before" /></template>
                <template #aside-ads-after><slot name="aside-ads-after" /></template>
              </VPContent>

              <VPFooter />
            </div>
          </template>
        </UDashboardPanel>
      </UDashboardGroup>
      <slot name="layout-bottom" />
    </div>
    <Content v-else />
  </UApp>
</template>

<style scoped>
.Layout {
  min-height: 100vh;
}

.docs-content-shell {
  min-height: 100%;
}
</style>