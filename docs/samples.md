# Samples

These are full-email fixtures, not isolated component snippets. Each sample exists as both a `.vue` component and a matching `.mjml` source file, and the parity suite snapshots them under `test/samples/snapshots`.

<UAlert
  class="not-prose"
  color="neutral"
  variant="subtle"
  title="Why the sample set matters"
  description="These pages show the same fixtures used in end-to-end parity testing. Each sample lets you compare a live browser preview with the paired Vue and MJML source files that feed the snapshot suite."
/>

<div class="not-prose grid gap-4 md:grid-cols-2 xl:grid-cols-5 mt-6">
  <UCard>
    <template #header><span class="font-semibold">Launch announcement</span></template>
    <p>Hero-led release email with font imports and social follow-up.</p>
  </UCard>
  <UCard>
    <template #header><span class="font-semibold">Weekly digest</span></template>
    <p>Grouped layout and navbar-heavy structure for newsletter-style updates.</p>
  </UCard>
  <UCard>
    <template #header><span class="font-semibold">Product showcase</span></template>
    <p>Carousel, HTML attributes, and promotional CTA composition.</p>
  </UCard>
  <UCard>
    <template #header><span class="font-semibold">Billing summary</span></template>
    <p>Transactional balance summary with tables, dividers, and a focused CTA.</p>
  </UCard>
  <UCard>
    <template #header><span class="font-semibold">Support update</span></template>
    <p>Accordion-driven content and raw head fragments for support messaging.</p>
  </UCard>
</div>

## Launch announcement

<ClientOnly>
  <SampleShowcase name="launch-announcement" />
</ClientOnly>

## Weekly digest

<ClientOnly>
  <SampleShowcase name="weekly-digest" />
</ClientOnly>

## Product showcase

<ClientOnly>
  <SampleShowcase name="product-showcase" />
</ClientOnly>

## Billing summary

<ClientOnly>
  <SampleShowcase name="billing-summary" />
</ClientOnly>

## Support update

<ClientOnly>
  <SampleShowcase name="support-update" />
</ClientOnly>