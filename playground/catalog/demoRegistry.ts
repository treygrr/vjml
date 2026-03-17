import type { Component } from 'vue'

export interface CatalogDemo {
  component: Component
  source: string
}

const demoComponents = import.meta.glob('../components/demos/*.vue', {
  eager: true,
  import: 'default',
}) as Record<string, Component>

const demoSources = import.meta.glob('../components/demos/*.vue', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>

function toDemoPath(id: string): string {
  return `../components/demos/${id}.vue`
}

export function getCatalogDemo(id: string): CatalogDemo {
  const path = toDemoPath(id)
  const component = demoComponents[path]
  const source = demoSources[path]

  if (!component || !source) {
    throw new Error(`Missing catalog demo for ${id}. Expected ${path}.`)
  }

  return {
    component,
    source: source.trim(),
  }
}
