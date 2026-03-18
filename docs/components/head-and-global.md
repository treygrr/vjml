# Head and Global Components

These tags shape the document head, global defaults, selector targeting, and raw document-level content.

## Head

`Head` is renderless. Its job is to collect metadata and head directives before the final email document is built.

<ComponentMetaTable tag="mj-head" />

## Title

Use title for the document title and to support email-root accessibility labeling.

<ComponentMetaTable tag="mj-title" />

## Preview

Preview text is injected as hidden preheader content so inbox clients can surface it.

<ComponentMetaTable tag="mj-preview" />

## Font

`Font` declares named web font imports. The renderer emits import tags only when the font is actually referenced.

<ComponentMetaTable tag="mj-font" />

## Style

Use style for global CSS rules or `inline="inline"` rules that should become element-level inline styles.

<ComponentMetaTable tag="mj-style" />

## Attributes

Attributes, `mj-all`, and `mj-class` let you express reusable defaults in MJML-native terms instead of relying on selectors for everything.

<ComponentMetaTable tag="mj-attributes" />

<ComponentMetaTable tag="mj-all" />

<ComponentMetaTable tag="mj-class" />

## HTML attributes

Use selector-based HTML attributes when you need literal data attributes or other DOM-level markers on rendered output.

<ComponentMetaTable tag="mj-html-attributes" />

<ComponentMetaTable tag="mj-selector" />

<ComponentMetaTable tag="mj-html-attribute" />

## Raw

Raw lets you inject literal content into the head, body, or even before the document doctype when required.

<ComponentMetaTable tag="mj-raw" />