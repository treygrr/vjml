# Components

Every VJML component now has its own markdown page.

Use the **Components** section in the left sidebar to jump directly to the tag you need. Each section stays collapsible, and every component inside that section is listed directly without nested submenus.

<UAlert
	class="not-prose"
	color="neutral"
	variant="subtle"
	title="Reference format"
	description="Each component page is generated around the same metadata model used by the renderer and validator, so parent rules, child rules, defaults, and allowed attributes stay aligned with runtime behavior."
/>

## What is included

- document shell tags like `Mjml`, `Head`, and `Body`
- layout and content tags such as `Section`, `Column`, `Text`, and `Button`
- head and global helpers including `Attributes`, `Style`, `Font`, and `Raw`
- interactive parents and leaf tags such as `AccordionElement`, `CarouselImage`, `NavbarLink`, and `SocialElement`

<div class="not-prose grid gap-4 md:grid-cols-2 xl:grid-cols-4 mt-6">
	<UCard>
		<template #header><span class="font-semibold">Layout</span></template>
		<p>Document shell, body, wrapper, section, group, and column primitives.</p>
	</UCard>
	<UCard>
		<template #header><span class="font-semibold">Content</span></template>
		<p>Text, button, image, divider, table, spacer, and hero content blocks.</p>
	</UCard>
	<UCard>
		<template #header><span class="font-semibold">Head and global</span></template>
		<p>Title, preview text, fonts, styles, defaults, selectors, and raw head content.</p>
	</UCard>
	<UCard>
		<template #header><span class="font-semibold">Interactive</span></template>
		<p>Accordion, carousel, navbar, and social tags with their supporting child elements.</p>
	</UCard>
</div>

## How to read the reference

- the page title is the Vue-facing component name
- the metadata table shows the underlying MJML tag name, parents, children, defaults, and allowed attributes
- each section dropdown opens to a flat list of component pages for that area