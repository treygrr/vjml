/* eslint-disable */

import type { VjmlComponentSlotKind } from '../metadata'

export interface VjmlRuntimeComponentManifestEntry {
  readonly tagName: string
  readonly componentBaseName: string
  readonly exportName: string
  readonly sourcePath: string
  readonly slotKind: VjmlComponentSlotKind
  readonly acceptsChildren: boolean
  readonly isLeaf: boolean
  readonly requiresRawContent: boolean
  readonly allowsArbitraryAttributes: boolean
  readonly propInterfaceName: string
}

export const VJML_RUNTIME_COMPONENTS = [
  {
    "acceptsChildren": true,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "Accordion",
    "exportName": "Accordion",
    "isLeaf": false,
    "propInterfaceName": "VjmlAccordionProps",
    "requiresRawContent": false,
    "slotKind": "mjml",
    "sourcePath": "./runtime/components/Accordion",
    "tagName": "mj-accordion"
  },
  {
    "acceptsChildren": true,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "AccordionElement",
    "exportName": "AccordionElement",
    "isLeaf": false,
    "propInterfaceName": "VjmlAccordionElementProps",
    "requiresRawContent": false,
    "slotKind": "mjml",
    "sourcePath": "./runtime/components/AccordionElement",
    "tagName": "mj-accordion-element"
  },
  {
    "acceptsChildren": true,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "AccordionText",
    "exportName": "AccordionText",
    "isLeaf": false,
    "propInterfaceName": "VjmlAccordionTextProps",
    "requiresRawContent": true,
    "slotKind": "html",
    "sourcePath": "./runtime/components/AccordionText",
    "tagName": "mj-accordion-text"
  },
  {
    "acceptsChildren": true,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "AccordionTitle",
    "exportName": "AccordionTitle",
    "isLeaf": false,
    "propInterfaceName": "VjmlAccordionTitleProps",
    "requiresRawContent": true,
    "slotKind": "html",
    "sourcePath": "./runtime/components/AccordionTitle",
    "tagName": "mj-accordion-title"
  },
  {
    "acceptsChildren": false,
    "allowsArbitraryAttributes": true,
    "componentBaseName": "All",
    "exportName": "All",
    "isLeaf": true,
    "propInterfaceName": "VjmlAllProps",
    "requiresRawContent": false,
    "slotKind": "none",
    "sourcePath": "./runtime/components/All",
    "tagName": "mj-all"
  },
  {
    "acceptsChildren": true,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "Attributes",
    "exportName": "Attributes",
    "isLeaf": false,
    "propInterfaceName": "VjmlAttributesProps",
    "requiresRawContent": false,
    "slotKind": "mjml",
    "sourcePath": "./runtime/components/Attributes",
    "tagName": "mj-attributes"
  },
  {
    "acceptsChildren": true,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "Body",
    "exportName": "Body",
    "isLeaf": false,
    "propInterfaceName": "VjmlBodyProps",
    "requiresRawContent": false,
    "slotKind": "mjml",
    "sourcePath": "./runtime/components/Body",
    "tagName": "mj-body"
  },
  {
    "acceptsChildren": true,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "Breakpoint",
    "exportName": "Breakpoint",
    "isLeaf": false,
    "propInterfaceName": "VjmlBreakpointProps",
    "requiresRawContent": true,
    "slotKind": "html",
    "sourcePath": "./runtime/components/Breakpoint",
    "tagName": "mj-breakpoint"
  },
  {
    "acceptsChildren": true,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "Button",
    "exportName": "Button",
    "isLeaf": false,
    "propInterfaceName": "VjmlButtonProps",
    "requiresRawContent": true,
    "slotKind": "html",
    "sourcePath": "./runtime/components/Button",
    "tagName": "mj-button"
  },
  {
    "acceptsChildren": true,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "Carousel",
    "exportName": "Carousel",
    "isLeaf": false,
    "propInterfaceName": "VjmlCarouselProps",
    "requiresRawContent": false,
    "slotKind": "mjml",
    "sourcePath": "./runtime/components/Carousel",
    "tagName": "mj-carousel"
  },
  {
    "acceptsChildren": true,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "CarouselImage",
    "exportName": "CarouselImage",
    "isLeaf": false,
    "propInterfaceName": "VjmlCarouselImageProps",
    "requiresRawContent": true,
    "slotKind": "html",
    "sourcePath": "./runtime/components/CarouselImage",
    "tagName": "mj-carousel-image"
  },
  {
    "acceptsChildren": true,
    "allowsArbitraryAttributes": true,
    "componentBaseName": "Class",
    "exportName": "Class",
    "isLeaf": false,
    "propInterfaceName": "VjmlClassProps",
    "requiresRawContent": false,
    "slotKind": "mjml",
    "sourcePath": "./runtime/components/Class",
    "tagName": "mj-class"
  },
  {
    "acceptsChildren": true,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "Column",
    "exportName": "Column",
    "isLeaf": false,
    "propInterfaceName": "VjmlColumnProps",
    "requiresRawContent": false,
    "slotKind": "mjml",
    "sourcePath": "./runtime/components/Column",
    "tagName": "mj-column"
  },
  {
    "acceptsChildren": false,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "Divider",
    "exportName": "Divider",
    "isLeaf": true,
    "propInterfaceName": "VjmlDividerProps",
    "requiresRawContent": false,
    "slotKind": "none",
    "sourcePath": "./runtime/components/Divider",
    "tagName": "mj-divider"
  },
  {
    "acceptsChildren": false,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "Font",
    "exportName": "Font",
    "isLeaf": true,
    "propInterfaceName": "VjmlFontProps",
    "requiresRawContent": false,
    "slotKind": "none",
    "sourcePath": "./runtime/components/Font",
    "tagName": "mj-font"
  },
  {
    "acceptsChildren": true,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "Group",
    "exportName": "Group",
    "isLeaf": false,
    "propInterfaceName": "VjmlGroupProps",
    "requiresRawContent": false,
    "slotKind": "mjml",
    "sourcePath": "./runtime/components/Group",
    "tagName": "mj-group"
  },
  {
    "acceptsChildren": true,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "Head",
    "exportName": "Head",
    "isLeaf": false,
    "propInterfaceName": "VjmlHeadProps",
    "requiresRawContent": false,
    "slotKind": "mjml",
    "sourcePath": "./runtime/components/Head",
    "tagName": "mj-head"
  },
  {
    "acceptsChildren": true,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "Hero",
    "exportName": "Hero",
    "isLeaf": false,
    "propInterfaceName": "VjmlHeroProps",
    "requiresRawContent": false,
    "slotKind": "mjml",
    "sourcePath": "./runtime/components/Hero",
    "tagName": "mj-hero"
  },
  {
    "acceptsChildren": true,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "HtmlAttribute",
    "exportName": "HtmlAttribute",
    "isLeaf": false,
    "propInterfaceName": "VjmlHtmlAttributeProps",
    "requiresRawContent": true,
    "slotKind": "text",
    "sourcePath": "./runtime/components/HtmlAttribute",
    "tagName": "mj-html-attribute"
  },
  {
    "acceptsChildren": true,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "HtmlAttributes",
    "exportName": "HtmlAttributes",
    "isLeaf": false,
    "propInterfaceName": "VjmlHtmlAttributesProps",
    "requiresRawContent": false,
    "slotKind": "mjml",
    "sourcePath": "./runtime/components/HtmlAttributes",
    "tagName": "mj-html-attributes"
  },
  {
    "acceptsChildren": false,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "Image",
    "exportName": "Image",
    "isLeaf": true,
    "propInterfaceName": "VjmlImageProps",
    "requiresRawContent": false,
    "slotKind": "none",
    "sourcePath": "./runtime/components/Image",
    "tagName": "mj-image"
  },
  {
    "acceptsChildren": true,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "Mjml",
    "exportName": "Mjml",
    "isLeaf": false,
    "propInterfaceName": "VjmlMjmlProps",
    "requiresRawContent": false,
    "slotKind": "mjml",
    "sourcePath": "./runtime/components/Mjml",
    "tagName": "mjml"
  },
  {
    "acceptsChildren": true,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "Navbar",
    "exportName": "Navbar",
    "isLeaf": false,
    "propInterfaceName": "VjmlNavbarProps",
    "requiresRawContent": false,
    "slotKind": "mjml",
    "sourcePath": "./runtime/components/Navbar",
    "tagName": "mj-navbar"
  },
  {
    "acceptsChildren": true,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "NavbarLink",
    "exportName": "NavbarLink",
    "isLeaf": false,
    "propInterfaceName": "VjmlNavbarLinkProps",
    "requiresRawContent": true,
    "slotKind": "html",
    "sourcePath": "./runtime/components/NavbarLink",
    "tagName": "mj-navbar-link"
  },
  {
    "acceptsChildren": true,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "Preview",
    "exportName": "Preview",
    "isLeaf": false,
    "propInterfaceName": "VjmlPreviewProps",
    "requiresRawContent": true,
    "slotKind": "text",
    "sourcePath": "./runtime/components/Preview",
    "tagName": "mj-preview"
  },
  {
    "acceptsChildren": true,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "Raw",
    "exportName": "Raw",
    "isLeaf": false,
    "propInterfaceName": "VjmlRawProps",
    "requiresRawContent": true,
    "slotKind": "html",
    "sourcePath": "./runtime/components/Raw",
    "tagName": "mj-raw"
  },
  {
    "acceptsChildren": true,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "Section",
    "exportName": "Section",
    "isLeaf": false,
    "propInterfaceName": "VjmlSectionProps",
    "requiresRawContent": false,
    "slotKind": "mjml",
    "sourcePath": "./runtime/components/Section",
    "tagName": "mj-section"
  },
  {
    "acceptsChildren": true,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "Selector",
    "exportName": "Selector",
    "isLeaf": false,
    "propInterfaceName": "VjmlSelectorProps",
    "requiresRawContent": false,
    "slotKind": "mjml",
    "sourcePath": "./runtime/components/Selector",
    "tagName": "mj-selector"
  },
  {
    "acceptsChildren": true,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "Social",
    "exportName": "Social",
    "isLeaf": false,
    "propInterfaceName": "VjmlSocialProps",
    "requiresRawContent": false,
    "slotKind": "mjml",
    "sourcePath": "./runtime/components/Social",
    "tagName": "mj-social"
  },
  {
    "acceptsChildren": true,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "SocialElement",
    "exportName": "SocialElement",
    "isLeaf": false,
    "propInterfaceName": "VjmlSocialElementProps",
    "requiresRawContent": true,
    "slotKind": "html",
    "sourcePath": "./runtime/components/SocialElement",
    "tagName": "mj-social-element"
  },
  {
    "acceptsChildren": false,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "Spacer",
    "exportName": "Spacer",
    "isLeaf": true,
    "propInterfaceName": "VjmlSpacerProps",
    "requiresRawContent": false,
    "slotKind": "none",
    "sourcePath": "./runtime/components/Spacer",
    "tagName": "mj-spacer"
  },
  {
    "acceptsChildren": true,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "Style",
    "exportName": "Style",
    "isLeaf": false,
    "propInterfaceName": "VjmlStyleProps",
    "requiresRawContent": true,
    "slotKind": "text",
    "sourcePath": "./runtime/components/Style",
    "tagName": "mj-style"
  },
  {
    "acceptsChildren": true,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "Table",
    "exportName": "Table",
    "isLeaf": false,
    "propInterfaceName": "VjmlTableProps",
    "requiresRawContent": true,
    "slotKind": "html",
    "sourcePath": "./runtime/components/Table",
    "tagName": "mj-table"
  },
  {
    "acceptsChildren": true,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "Text",
    "exportName": "Text",
    "isLeaf": false,
    "propInterfaceName": "VjmlTextProps",
    "requiresRawContent": true,
    "slotKind": "html",
    "sourcePath": "./runtime/components/Text",
    "tagName": "mj-text"
  },
  {
    "acceptsChildren": true,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "Title",
    "exportName": "Title",
    "isLeaf": false,
    "propInterfaceName": "VjmlTitleProps",
    "requiresRawContent": true,
    "slotKind": "text",
    "sourcePath": "./runtime/components/Title",
    "tagName": "mj-title"
  },
  {
    "acceptsChildren": true,
    "allowsArbitraryAttributes": false,
    "componentBaseName": "Wrapper",
    "exportName": "Wrapper",
    "isLeaf": false,
    "propInterfaceName": "VjmlWrapperProps",
    "requiresRawContent": false,
    "slotKind": "mjml",
    "sourcePath": "./runtime/components/Wrapper",
    "tagName": "mj-wrapper"
  }
] as const satisfies readonly VjmlRuntimeComponentManifestEntry[]

export const VJML_RUNTIME_COMPONENTS_BY_TAG_NAME: Readonly<Record<string, VjmlRuntimeComponentManifestEntry>> = Object.freeze(
  Object.fromEntries(
    VJML_RUNTIME_COMPONENTS.map(component => [component.tagName, component]),
  ),
)

export function getVjmlRuntimeComponentManifestEntry(
  tagName: string,
): VjmlRuntimeComponentManifestEntry | null {
  return VJML_RUNTIME_COMPONENTS_BY_TAG_NAME[tagName.trim().toLowerCase()] ?? null
}

