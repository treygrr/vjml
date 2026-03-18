<script setup lang="ts">
const route = useRoute()

await navigateTo(
  {
    path: `/docs${route.path}`,
    query: route.query,
    hash: route.hash,
  },
  {
    redirectCode: 301,
    replace: true,
  },
)
</script>

<template />
