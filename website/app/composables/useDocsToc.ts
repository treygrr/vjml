import type { TocLink } from '@nuxt/content'
import type { Ref } from 'vue'

function buildTocLinks(headings: HTMLHeadingElement[]): TocLink[] {
  const rootLinks: TocLink[] = []
  const stack: TocLink[] = []

  for (const heading of headings) {
    const id = heading.id
    const text = heading.textContent?.trim()
    const depth = Number(heading.tagName.slice(1))

    if (!id || !text || Number.isNaN(depth)) {
      continue
    }

    const link: TocLink = {
      id,
      text,
      depth,
    }

    while (stack.length && stack[stack.length - 1].depth >= depth) {
      stack.pop()
    }

    if (stack.length) {
      const parent = stack[stack.length - 1]
      parent.children = [...(parent.children ?? []), link]
    }
    else {
      rootLinks.push(link)
    }

    stack.push(link)
  }

  return rootLinks
}

export function useDocsToc(contentRoot: Ref<HTMLElement | null>) {
  const route = useRoute()
  const tocLinks = ref<TocLink[]>([])
  let frameId = 0
  let observer: MutationObserver | null = null

  function refreshToc() {
    if (!contentRoot.value) {
      tocLinks.value = []
      return
    }

    const headings = Array.from(
      contentRoot.value.querySelectorAll<HTMLHeadingElement>('h2[id], h3[id]'),
    )

    tocLinks.value = buildTocLinks(headings)
  }

  function stopObserving() {
    observer?.disconnect()
    observer = null
  }

  function observeContent() {
    stopObserving()

    if (!contentRoot.value) {
      return
    }

    observer = new MutationObserver(() => {
      refreshToc()
    })

    observer.observe(contentRoot.value, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['id'],
    })
  }

  async function queueRefresh() {
    cancelAnimationFrame(frameId)
    await nextTick()

    frameId = requestAnimationFrame(() => {
      refreshToc()
      observeContent()
    })
  }

  onMounted(() => {
    void queueRefresh()
  })

  watch(() => route.path, () => {
    void queueRefresh()
  })

  watch(contentRoot, () => {
    void queueRefresh()
  })

  onBeforeUnmount(() => {
    cancelAnimationFrame(frameId)
    stopObserving()
  })

  return {
    tocLinks,
    refreshToc,
  }
}