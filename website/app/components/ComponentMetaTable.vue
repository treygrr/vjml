<script setup lang="ts">
import { getVjmlComponentMetadata } from 'vjml'
import { getComponentDocsRoute } from '~/composables/useComponentDocs'

const props = defineProps<{
  tag: string
}>()

const metadata = computed(() => getVjmlComponentMetadata(props.tag))

const allowedAttributes = computed(() => {
  return metadata.value ? Object.entries(metadata.value.allowedAttributes) : []
})

const defaultAttributes = computed(() => {
  return metadata.value ? Object.entries(metadata.value.defaultAttributes) : []
})

function formatValue(value: unknown): string {
  return typeof value === 'string' ? value : JSON.stringify(value, null, 2)
}
</script>

<template>
  <UAlert
    v-if="!metadata"
    class="not-prose"
    color="warning"
    variant="subtle"
    title="Metadata unavailable"
    :description="`No VJML component metadata was found for ${tag}.`"
  />

  <div v-else class="component-meta not-prose space-y-6">
    <section class="space-y-4" aria-labelledby="component-overview">
      <h2 id="component-overview" class="text-2xl font-semibold">
        Overview
      </h2>

      <div class="flex flex-wrap gap-2">
        <UBadge color="primary" variant="soft" :label="metadata.componentBaseName" />
        <UBadge color="neutral" variant="subtle" :label="metadata.tagName" />
        <UBadge color="neutral" variant="outline" :label="metadata.source" />
        <UBadge color="neutral" variant="outline" :label="`slot: ${metadata.serialization.slotKind}`" />
      </div>

      <p class="text-sm">
        This entry is generated from the same metadata model the renderer and validator use at runtime.
      </p>

      <dl class="grid gap-6 border-y border-default py-4 sm:grid-cols-2">
        <div class="space-y-1">
          <dt class="text-xs font-semibold uppercase">Ending tag</dt>
          <dd class="text-sm">{{ metadata.endingTag ? 'Yes' : 'No' }}</dd>
        </div>
        <div class="space-y-1">
          <dt class="text-xs font-semibold uppercase">Raw element</dt>
          <dd class="text-sm">{{ metadata.rawElement ? 'Yes' : 'No' }}</dd>
        </div>
        <div class="space-y-1">
          <dt class="text-xs font-semibold uppercase">Arbitrary attributes</dt>
          <dd class="text-sm">
            {{ metadata.serialization.allowsArbitraryAttributes ? 'Allowed' : 'Restricted' }}
          </dd>
        </div>
        <div class="space-y-1">
          <dt class="text-xs font-semibold uppercase">Raw content preservation</dt>
          <dd class="text-sm">
            {{ metadata.serialization.preservesRawContent ? 'Preserved' : 'Normalized' }}
          </dd>
        </div>
      </dl>

      <ComponentExamplePanel :key="tag" :tag="tag" />
    </section>

    <section class="space-y-6 border-t border-default pt-6" aria-labelledby="component-placement-rules">
      <div class="space-y-2">
        <h2 id="component-placement-rules" class="text-2xl font-semibold">
          Placement rules
        </h2>
        <p class="text-sm">
          Parent and child constraints come directly from the MJML compatibility model.
        </p>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <div class="space-y-3">
          <h3 id="component-allowed-parents" class="text-sm font-semibold uppercase tracking-wide">
            Allowed parents
          </h3>

          <div class="flex flex-wrap gap-2">
            <template v-if="metadata.allowedParentTagNames.length">
              <UButton
                v-for="parent in metadata.allowedParentTagNames"
                :key="parent"
                :to="getComponentDocsRoute(parent)"
                color="neutral"
                variant="soft"
                size="xs"
                :label="parent"
              />
            </template>
            <UBadge v-else color="neutral" variant="subtle" label="Any root context" />
          </div>
        </div>

        <div class="space-y-3">
          <h3 id="component-allowed-children" class="text-sm font-semibold uppercase tracking-wide">
            Allowed children
          </h3>

          <div class="flex flex-wrap gap-2">
            <template v-if="metadata.supportsAnyChildTag">
              <UBadge color="primary" variant="soft" label="Any child tag" />
            </template>
            <template v-else-if="metadata.allowedChildTagNames.length">
              <UButton
                v-for="child in metadata.allowedChildTagNames"
                :key="child"
                :to="getComponentDocsRoute(child)"
                color="neutral"
                variant="soft"
                size="xs"
                :label="child"
              />
            </template>
            <UBadge v-else color="neutral" variant="subtle" label="Leaf component" />
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-4 border-t border-default pt-6" aria-labelledby="component-allowed-attributes">
      <div class="space-y-2">
        <h2 id="component-allowed-attributes" class="text-2xl font-semibold">
          Allowed attributes
        </h2>
        <p class="text-sm">Attribute names and accepted value types.</p>
      </div>

      <div v-if="allowedAttributes.length" class="divide-y divide-default rounded-md border border-default">
        <div
          v-for="[name, type] in allowedAttributes"
          :key="name"
          class="flex flex-wrap items-center justify-between gap-3 p-4"
        >
          <span class="font-mono text-sm font-medium">{{ name }}</span>
          <span class="font-mono text-xs">{{ type }}</span>
        </div>
      </div>

      <p v-else class="text-sm">
        This component does not expose attributes beyond its structural role.
      </p>
    </section>

    <section class="space-y-4 border-t border-default pt-6" aria-labelledby="component-default-attributes">
      <div class="space-y-2">
        <h2 id="component-default-attributes" class="text-2xl font-semibold">
          Default attributes
        </h2>
        <p class="text-sm">Defaults injected when the attribute is omitted.</p>
      </div>

      <div v-if="defaultAttributes.length" class="space-y-4">
        <div
          v-for="[name, value] in defaultAttributes"
          :key="name"
          class="space-y-3 rounded-md border border-default p-4"
        >
          <p class="font-mono text-sm font-medium">{{ name }}</p>
          <pre class="overflow-x-auto rounded-md border border-default bg-elevated/50 p-4 text-xs"><code>{{ formatValue(value) }}</code></pre>
        </div>
      </div>

      <p v-else class="text-sm">
        No defaults are injected for this component.
      </p>
    </section>
  </div>
</template>