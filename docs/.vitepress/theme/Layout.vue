<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>
  <UApp>
    <div class="isolate min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.1),transparent_20%),radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_22%),linear-gradient(180deg,rgba(248,250,252,0.96),rgba(255,255,255,0.94))]">
      <Layout />
    </div>
  </UApp>
</template>