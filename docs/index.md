---
layout: home

hero:
  name: VJML
  text: Vue MJML-style email components
  tagline: Author MJML-like email templates with Vue, render them in the browser, and verify parity against official MJML.
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started
    - theme: alt
      text: Browse Samples
      link: /samples

features:
  - title: Vue-first authoring
    details: Compose email templates as Vue components with typed props, plugin-based registration, and direct component imports.
  - title: Browser previews
    details: Render full HTML documents in the browser with iframe previews and renderer diagnostics.
  - title: Parity-tested output
    details: Compare rendered VJML output against official MJML snapshots across components and full email samples.
---

## What this site covers

The docs are organized around the parts you will actually reach for when building emails:

- getting started with the plugin and direct imports
- rendering to browser previews or raw HTML
- global styling, fonts, selectors, and head content
- individual reference pages for every component in the sidebar
- full sample emails you can inspect in Vue and MJML form

## Featured sample

<ClientOnly>
  <SampleShowcase name="launch-announcement" />
</ClientOnly>