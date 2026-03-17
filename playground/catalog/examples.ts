import type { Component } from 'vue'

import { getCatalogDemo } from './demoRegistry'

export interface CatalogExampleData {
  id: string
  name: string
  tag: string
  summary: string
  component: Component
  source: string
}

export interface CatalogSectionData {
  id: string
  title: string
  description: string
  examples: CatalogExampleData[]
}

export const componentNames = [
  'Accordion',
  'AccordionElement',
  'AccordionText',
  'AccordionTitle',
  'All',
  'Attributes',
  'Body',
  'Breakpoint',
  'Button',
  'Carousel',
  'CarouselImage',
  'Class',
  'Column',
  'Divider',
  'Font',
  'Group',
  'Head',
  'Hero',
  'HtmlAttribute',
  'HtmlAttributes',
  'Image',
  'Mjml',
  'Navbar',
  'NavbarLink',
  'Preview',
  'Raw',
  'Section',
  'Selector',
  'Social',
  'SocialElement',
  'Spacer',
  'Style',
  'Table',
  'Text',
  'Title',
  'Wrapper',
] as const

export const componentCount = componentNames.length

export const importSnippet = `import {
${componentNames.map(name => `  ${name},`).join('\n')}
} from 'vjml'`

export const installSnippet = `import { createApp } from 'vue'
import App from './App.vue'
import VjmlPlugin from 'vjml'

createApp(App)
  .use(VjmlPlugin, {
    prefix: 'VJ',
    render: {
      validation: 'warn',
    },
  })
  .mount('#app')`

export const renderSnippet = `import WelcomeEmail from './WelcomeEmail.vue'
import { createVjmlRenderer } from 'vjml'

const { renderToHtml } = createVjmlRenderer({
  render: {
    validation: 'strict',
  },
})

const { html, issues } = await renderToHtml(WelcomeEmail, {
  props: {
    firstName: 'Ada',
  },
})`

function createCatalogExample(
  name: string,
  tag: string,
  summary: string,
): CatalogExampleData {
  const demo = getCatalogDemo(tag)

  return {
    id: tag,
    name,
    tag,
    summary,
    component: demo.component,
    source: demo.source,
  }
}

export const catalogSections: CatalogSectionData[] = [
  {
    id: 'layout',
    title: 'Layout',
    description: 'Structural components for assembling the document, rows, columns, grouped content, and large-format hero sections.',
    examples: [
      createCatalogExample('Mjml', 'mjml', 'The root component that defines a complete email tree.'),
      createCatalogExample('Head', 'mj-head', 'Collect document metadata such as title, preview text, styles, fonts, and attribute declarations.'),
      createCatalogExample('Body', 'mj-body', 'Controls the main email canvas width and background color.'),
      createCatalogExample('Section', 'mj-section', 'Creates a horizontal row that usually contains one or more columns.'),
      createCatalogExample('Column', 'mj-column', 'Splits a section into sibling cells for multi-column layouts.'),
      createCatalogExample('Group', 'mj-group', 'Keeps related columns grouped together as a row inside a section.'),
      createCatalogExample('Wrapper', 'mj-wrapper', 'Wraps multiple sections with a shared background or spacing treatment.'),
      createCatalogExample('Hero', 'mj-hero', 'Combines a background treatment with content blocks for large-format hero sections.'),
    ],
  },
  {
    id: 'content',
    title: 'Content',
    description: 'Renderable building blocks for copy, media, separators, spacing, raw HTML, and table-based data.',
    examples: [
      createCatalogExample('Text', 'mj-text', 'Renders the main copy blocks with email-safe typography controls.'),
      createCatalogExample('Button', 'mj-button', 'Renders a table-backed CTA button that survives hostile email clients.'),
      createCatalogExample('Image', 'mj-image', 'Displays responsive imagery with email-friendly sizing and alignment controls.'),
      createCatalogExample('Divider', 'mj-divider', 'Adds an email-safe horizontal rule between content blocks.'),
      createCatalogExample('Spacer', 'mj-spacer', 'Adds explicit vertical rhythm between content blocks.'),
      createCatalogExample('Table', 'mj-table', 'Renders HTML table markup inside the email body when you need tabular data.'),
      createCatalogExample('Raw', 'mj-raw', 'Injects raw HTML directly into the output without component wrapping.'),
    ],
  },
  {
    id: 'head-metadata',
    title: 'Head And Metadata',
    description: 'Renderless or metadata-oriented components that shape defaults, selectors, CSS, preview text, and document configuration.',
    examples: [
      createCatalogExample('Attributes', 'mj-attributes', 'Declares reusable attribute defaults for component tags and named classes.'),
      createCatalogExample('All', 'mj-all', 'Provides broad default attributes to multiple components through the attribute collection phase.'),
      createCatalogExample('Class', 'mj-class', 'Defines a named attribute bundle that can be reused with mj-class.'),
      createCatalogExample('Breakpoint', 'mj-breakpoint', 'Sets the responsive breakpoint used during email layout generation.'),
      createCatalogExample('Font', 'mj-font', 'Declares a web font for later use in body content components.'),
      createCatalogExample('HtmlAttributes', 'mj-html-attributes', 'Owns selector-based HTML attribute mutation during the document pass.'),
      createCatalogExample('Selector', 'mj-selector', 'Targets rendered HTML nodes so html attributes can be applied by CSS selector.'),
      createCatalogExample('HtmlAttribute', 'mj-html-attribute', 'Writes a concrete attribute value onto nodes selected by HtmlAttributes and Selector.'),
      createCatalogExample('Preview', 'mj-preview', 'Defines inbox preview text that remains hidden from the visible email body.'),
      createCatalogExample('Style', 'mj-style', 'Adds CSS to the final email head during client render.'),
      createCatalogExample('Title', 'mj-title', 'Declares the final HTML document title for the rendered email.'),
    ],
  },
  {
    id: 'interactive',
    title: 'Interactive And Navigation',
    description: 'Components for accordions, carousels, nav bars, social blocks, and their required child elements.',
    examples: [
      createCatalogExample('Accordion', 'mj-accordion', 'Creates an accordion block for question-and-answer or FAQ style sections.'),
      createCatalogExample('AccordionElement', 'mj-accordion-element', 'Represents one accordion item inside an Accordion container.'),
      createCatalogExample('AccordionTitle', 'mj-accordion-title', 'Supplies the clickable title row inside an accordion element.'),
      createCatalogExample('AccordionText', 'mj-accordion-text', 'Supplies the expanded content row inside an accordion element.'),
      createCatalogExample('Carousel', 'mj-carousel', 'Creates a slide-based image carousel for richer editorial layouts.'),
      createCatalogExample('CarouselImage', 'mj-carousel-image', 'Provides an image slide inside a Carousel.'),
      createCatalogExample('Navbar', 'mj-navbar', 'Creates an email-safe navigation block with linked items.'),
      createCatalogExample('NavbarLink', 'mj-navbar-link', 'Adds one linked item inside a Navbar.'),
      createCatalogExample('Social', 'mj-social', 'Renders a social follow/share block with icons and labels.'),
      createCatalogExample('SocialElement', 'mj-social-element', 'Adds one social link item inside a Social block.'),
    ],
  },
]
