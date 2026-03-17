<script setup lang="ts">
import { VjmlRenderFrame, toVjmlComponentName, useVjml } from 'vjml'
import {
  catalogSections,
  importSnippet,
  installSnippet,
  renderSnippet,
} from './catalog/examples'

const config = useVjml()
</script>

<template>
  <main class="shell">
    <section class="panel setup-grid">
      <article class="setup-card">
        <p class="panel-label">Import Catalog</p>
        <h2>Everything exported by the main entry</h2>
        <pre><code>{{ importSnippet }}</code></pre>
      </article>

      <article class="setup-card">
        <p class="panel-label">Plugin Install</p>
        <h2>Register prefixed globals</h2>
        <pre><code>{{ installSnippet }}</code></pre>
      </article>

      <article class="setup-card">
        <p class="panel-label">Renderer Usage</p>
        <h2>Render a Vue email component to HTML</h2>
        <pre><code>{{ renderSnippet }}</code></pre>
      </article>
    </section>

    <nav class="section-nav panel" aria-label="Component sections">
      <a
        v-for="section in catalogSections"
        :key="section.id"
        class="section-link"
        :href="`#${section.id}`"
      >
        <span>{{ section.title }}</span>
        <strong>{{ section.examples.length }}</strong>
      </a>
    </nav>

    <section
      v-for="section in catalogSections"
      :id="section.id"
      :key="section.id"
      class="panel catalog-section"
    >
      <div class="section-copy">
        <p class="panel-label">{{ section.title }}</p>
        <h2>{{ section.title }}</h2>
        <p class="section-description">{{ section.description }}</p>
      </div>

      <div class="catalog-grid">
        <article v-for="example in section.examples" :key="example.id" class="catalog-card">
          <div class="card-top">
            <div>
              <p class="component-tag">{{ example.tag }}</p>
              <h3>{{ example.name }}</h3>
            </div>
            <span class="component-global">&lt;{{ toVjmlComponentName(example.tag, config.prefix) }}&gt;</span>
          </div>

          <p class="component-summary">{{ example.summary }}</p>

          <div class="example-preview">
            <VjmlRenderFrame :component="example.component" />
          </div>

          <pre><code>{{ example.source }}</code></pre>
        </article>
      </div>
    </section>
  </main>
</template>
