# Layout Components

These tags define the email shell and its structural rows and columns. They are the first layer to reach for before you add content styling or interactivity.

## Mjml

The document root. It owns top-level language, direction, and shell orchestration.

<ComponentMetaTable tag="mjml" />

## Body

The body defines the canvas width, document background, and root article wrapper used by previews and selector-based styling.

<ComponentMetaTable tag="mj-body" />

## Section

Sections create horizontal bands inside the body. Most email content starts with a section.

<ComponentMetaTable tag="mj-section" />

## Column

Columns split a section into sibling cells. Use them for multi-column summaries, comparisons, and responsive grids.

<ComponentMetaTable tag="mj-column" />

## Group

Groups keep related columns visually paired within the same row behavior.

<ComponentMetaTable tag="mj-group" />

## Wrapper

Wrappers let multiple sections share a common background or frame treatment.

<ComponentMetaTable tag="mj-wrapper" />