<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>
  <UApp>
    <div class="isolate min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.12),transparent_24%),linear-gradient(180deg,rgba(255,249,240,0.92),rgba(241,245,249,0.92))]">
      <Layout />
    </div>
  </UApp>
</template>