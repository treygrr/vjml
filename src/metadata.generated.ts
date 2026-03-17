/* eslint-disable */

export const STATIC_VJML_COMPONENT_METADATA = [
  {
    "tagName": "mj-accordion",
    "source": "preset-core",
    "allowedAttributes": {
      "container-background-color": "color",
      "border": "string",
      "font-family": "string",
      "icon-align": "enum(top,middle,bottom)",
      "icon-width": "unit(px,%)",
      "icon-height": "unit(px,%)",
      "icon-wrapped-url": "string",
      "icon-wrapped-alt": "string",
      "icon-unwrapped-url": "string",
      "icon-unwrapped-alt": "string",
      "icon-position": "enum(left,right)",
      "padding-bottom": "unit(px,%)",
      "padding-left": "unit(px,%)",
      "padding-right": "unit(px,%)",
      "padding-top": "unit(px,%)",
      "padding": "unit(px,%){1,4}",
      "css-class": "string",
      "mj-class": "string"
    },
    "defaultAttributes": {
      "border": "2px solid black",
      "font-family": "Ubuntu, Helvetica, Arial, sans-serif",
      "icon-align": "middle",
      "icon-wrapped-url": "https://i.imgur.com/bIXv1bk.png",
      "icon-wrapped-alt": "+",
      "icon-unwrapped-url": "https://i.imgur.com/w4uTygT.png",
      "icon-unwrapped-alt": "-",
      "icon-position": "right",
      "icon-height": "32px",
      "icon-width": "32px",
      "padding": "10px 25px"
    },
    "allowedChildTagNames": [
      "mj-accordion-element",
      "mj-raw"
    ],
    "allowedParentTagNames": [
      "mj-column",
      "mj-hero"
    ],
    "supportsAnyChildTag": false,
    "endingTag": false,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": false,
      "slotKind": "mjml"
    },
    "componentBaseName": "Accordion"
  },
  {
    "tagName": "mj-accordion-element",
    "source": "preset-core",
    "allowedAttributes": {
      "background-color": "color",
      "border": "string",
      "font-family": "string",
      "icon-align": "enum(top,middle,bottom)",
      "icon-width": "unit(px,%)",
      "icon-height": "unit(px,%)",
      "icon-wrapped-url": "string",
      "icon-wrapped-alt": "string",
      "icon-unwrapped-url": "string",
      "icon-unwrapped-alt": "string",
      "icon-position": "enum(left,right)",
      "css-class": "string",
      "mj-class": "string"
    },
    "defaultAttributes": {
      "title": {
        "img": {
          "width": "32px",
          "height": "32px"
        }
      }
    },
    "allowedChildTagNames": [
      "mj-accordion-title",
      "mj-accordion-text",
      "mj-raw"
    ],
    "allowedParentTagNames": [
      "mj-accordion"
    ],
    "supportsAnyChildTag": false,
    "endingTag": false,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": false,
      "slotKind": "mjml"
    },
    "componentBaseName": "AccordionElement"
  },
  {
    "tagName": "mj-accordion-text",
    "source": "preset-core",
    "allowedAttributes": {
      "background-color": "color",
      "font-size": "unit(px)",
      "font-family": "string",
      "font-weight": "string",
      "letter-spacing": "unitWithNegative(px,em)",
      "line-height": "unit(px,%,)",
      "color": "color",
      "padding-bottom": "unit(px,%)",
      "padding-left": "unit(px,%)",
      "padding-right": "unit(px,%)",
      "padding-top": "unit(px,%)",
      "padding": "unit(px,%){1,4}",
      "css-class": "string",
      "mj-class": "string"
    },
    "defaultAttributes": {
      "font-size": "13px",
      "line-height": "1",
      "padding": "16px"
    },
    "allowedChildTagNames": [],
    "allowedParentTagNames": [
      "mj-accordion-element"
    ],
    "supportsAnyChildTag": false,
    "endingTag": true,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": true,
      "slotKind": "html"
    },
    "componentBaseName": "AccordionText"
  },
  {
    "tagName": "mj-accordion-title",
    "source": "preset-core",
    "allowedAttributes": {
      "background-color": "color",
      "color": "color",
      "font-size": "unit(px)",
      "font-family": "string",
      "font-weight": "string",
      "padding-bottom": "unit(px,%)",
      "padding-left": "unit(px,%)",
      "padding-right": "unit(px,%)",
      "padding-top": "unit(px,%)",
      "padding": "unit(px,%){1,4}",
      "css-class": "string",
      "mj-class": "string"
    },
    "defaultAttributes": {
      "font-size": "13px",
      "padding": "16px"
    },
    "allowedChildTagNames": [],
    "allowedParentTagNames": [
      "mj-accordion-element"
    ],
    "supportsAnyChildTag": false,
    "endingTag": true,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": true,
      "slotKind": "html"
    },
    "componentBaseName": "AccordionTitle"
  },
  {
    "tagName": "mj-all",
    "source": "manual",
    "allowedAttributes": {},
    "defaultAttributes": {},
    "allowedChildTagNames": [],
    "allowedParentTagNames": [
      "mj-attributes"
    ],
    "supportsAnyChildTag": false,
    "endingTag": false,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": true,
      "preservesRawContent": false,
      "slotKind": "none"
    },
    "componentBaseName": "All"
  },
  {
    "tagName": "mj-attributes",
    "source": "preset-core",
    "allowedAttributes": {},
    "defaultAttributes": {},
    "allowedChildTagNames": [],
    "allowedParentTagNames": [
      "mj-head"
    ],
    "supportsAnyChildTag": true,
    "endingTag": false,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": false,
      "slotKind": "mjml"
    },
    "componentBaseName": "Attributes"
  },
  {
    "tagName": "mj-body",
    "source": "preset-core",
    "allowedAttributes": {
      "width": "unit(px)",
      "background-color": "color",
      "css-class": "string",
      "mj-class": "string"
    },
    "defaultAttributes": {
      "width": "600px"
    },
    "allowedChildTagNames": [
      "mj-raw",
      "mj-section",
      "mj-wrapper",
      "mj-hero"
    ],
    "allowedParentTagNames": [
      "mjml"
    ],
    "supportsAnyChildTag": false,
    "endingTag": false,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": false,
      "slotKind": "mjml"
    },
    "componentBaseName": "Body"
  },
  {
    "tagName": "mj-breakpoint",
    "source": "preset-core",
    "allowedAttributes": {
      "width": "unit(px)"
    },
    "defaultAttributes": {},
    "allowedChildTagNames": [],
    "allowedParentTagNames": [
      "mj-head"
    ],
    "supportsAnyChildTag": false,
    "endingTag": true,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": true,
      "slotKind": "html"
    },
    "componentBaseName": "Breakpoint"
  },
  {
    "tagName": "mj-button",
    "source": "preset-core",
    "allowedAttributes": {
      "align": "enum(left,center,right)",
      "background-color": "color",
      "border-bottom": "string",
      "border-left": "string",
      "border-radius": "string",
      "border-right": "string",
      "border-top": "string",
      "border": "string",
      "color": "color",
      "container-background-color": "color",
      "font-family": "string",
      "font-size": "unit(px)",
      "font-style": "string",
      "font-weight": "string",
      "height": "unit(px,%)",
      "href": "string",
      "name": "string",
      "title": "string",
      "inner-padding": "unit(px,%){1,4}",
      "letter-spacing": "unitWithNegative(px,em)",
      "line-height": "unit(px,%,)",
      "padding-bottom": "unit(px,%)",
      "padding-left": "unit(px,%)",
      "padding-right": "unit(px,%)",
      "padding-top": "unit(px,%)",
      "padding": "unit(px,%){1,4}",
      "rel": "string",
      "target": "string",
      "text-decoration": "string",
      "text-transform": "string",
      "vertical-align": "enum(top,bottom,middle)",
      "text-align": "enum(left,right,center)",
      "width": "unit(px,%)",
      "css-class": "string",
      "mj-class": "string"
    },
    "defaultAttributes": {
      "align": "center",
      "background-color": "#414141",
      "border": "none",
      "border-radius": "3px",
      "color": "#ffffff",
      "font-family": "Ubuntu, Helvetica, Arial, sans-serif",
      "font-size": "13px",
      "font-weight": "normal",
      "inner-padding": "10px 25px",
      "line-height": "120%",
      "padding": "10px 25px",
      "target": "_blank",
      "text-decoration": "none",
      "text-transform": "none",
      "vertical-align": "middle"
    },
    "allowedChildTagNames": [],
    "allowedParentTagNames": [
      "mj-column",
      "mj-hero"
    ],
    "supportsAnyChildTag": false,
    "endingTag": true,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": true,
      "slotKind": "html"
    },
    "componentBaseName": "Button"
  },
  {
    "tagName": "mj-carousel",
    "source": "preset-core",
    "allowedAttributes": {
      "align": "enum(left,center,right)",
      "border-radius": "unit(px,%){1,4}",
      "container-background-color": "color",
      "icon-width": "unit(px,%)",
      "left-icon": "string",
      "padding": "unit(px,%){1,4}",
      "padding-top": "unit(px,%)",
      "padding-bottom": "unit(px,%)",
      "padding-left": "unit(px,%)",
      "padding-right": "unit(px,%)",
      "right-icon": "string",
      "thumbnails": "enum(visible,hidden,supported)",
      "tb-border": "string",
      "tb-border-radius": "unit(px,%)",
      "tb-hover-border-color": "color",
      "tb-selected-border-color": "color",
      "tb-width": "unit(px,%)",
      "css-class": "string",
      "mj-class": "string"
    },
    "defaultAttributes": {
      "align": "center",
      "border-radius": "6px",
      "icon-width": "44px",
      "left-icon": "https://i.imgur.com/xTh3hln.png",
      "right-icon": "https://i.imgur.com/os7o9kz.png",
      "thumbnails": "visible",
      "tb-border": "2px solid transparent",
      "tb-border-radius": "6px",
      "tb-hover-border-color": "#fead0d",
      "tb-selected-border-color": "#cccccc"
    },
    "allowedChildTagNames": [
      "mj-carousel-image"
    ],
    "allowedParentTagNames": [
      "mj-column",
      "mj-hero"
    ],
    "supportsAnyChildTag": false,
    "endingTag": false,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": false,
      "slotKind": "mjml"
    },
    "componentBaseName": "Carousel"
  },
  {
    "tagName": "mj-carousel-image",
    "source": "preset-core",
    "allowedAttributes": {
      "alt": "string",
      "href": "string",
      "rel": "string",
      "target": "string",
      "title": "string",
      "src": "string",
      "thumbnails-src": "string",
      "border-radius": "unit(px,%){1,4}",
      "tb-border": "string",
      "tb-border-radius": "unit(px,%){1,4}",
      "css-class": "string",
      "mj-class": "string"
    },
    "defaultAttributes": {
      "alt": "",
      "target": "_blank"
    },
    "allowedChildTagNames": [],
    "allowedParentTagNames": [
      "mj-carousel"
    ],
    "supportsAnyChildTag": false,
    "endingTag": true,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": true,
      "slotKind": "html"
    },
    "componentBaseName": "CarouselImage"
  },
  {
    "tagName": "mj-class",
    "source": "manual",
    "allowedAttributes": {
      "name": "string"
    },
    "defaultAttributes": {},
    "allowedChildTagNames": [],
    "allowedParentTagNames": [
      "mj-attributes"
    ],
    "supportsAnyChildTag": true,
    "endingTag": false,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": true,
      "preservesRawContent": false,
      "slotKind": "mjml"
    },
    "componentBaseName": "Class"
  },
  {
    "tagName": "mj-column",
    "source": "preset-core",
    "allowedAttributes": {
      "background-color": "color",
      "border": "string",
      "border-bottom": "string",
      "border-left": "string",
      "border-radius": "unit(px,%){1,4}",
      "border-right": "string",
      "border-top": "string",
      "direction": "enum(ltr,rtl)",
      "inner-background-color": "color",
      "padding-bottom": "unit(px,%)",
      "padding-left": "unit(px,%)",
      "padding-right": "unit(px,%)",
      "padding-top": "unit(px,%)",
      "inner-border": "string",
      "inner-border-bottom": "string",
      "inner-border-left": "string",
      "inner-border-radius": "unit(px,%){1,4}",
      "inner-border-right": "string",
      "inner-border-top": "string",
      "padding": "unit(px,%){1,4}",
      "vertical-align": "enum(top,bottom,middle)",
      "width": "unit(px,%)",
      "css-class": "string",
      "mj-class": "string"
    },
    "defaultAttributes": {
      "direction": "ltr",
      "vertical-align": "top"
    },
    "allowedChildTagNames": [
      "mj-accordion",
      "mj-button",
      "mj-carousel",
      "mj-divider",
      "mj-image",
      "mj-raw",
      "mj-social",
      "mj-spacer",
      "mj-table",
      "mj-text",
      "mj-navbar"
    ],
    "allowedParentTagNames": [
      "mj-group",
      "mj-section"
    ],
    "supportsAnyChildTag": false,
    "endingTag": false,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": false,
      "slotKind": "mjml"
    },
    "componentBaseName": "Column"
  },
  {
    "tagName": "mj-divider",
    "source": "preset-core",
    "allowedAttributes": {
      "border-color": "color",
      "border-style": "string",
      "border-width": "unit(px)",
      "container-background-color": "color",
      "padding": "unit(px,%){1,4}",
      "padding-bottom": "unit(px,%)",
      "padding-left": "unit(px,%)",
      "padding-right": "unit(px,%)",
      "padding-top": "unit(px,%)",
      "width": "unit(px,%)",
      "align": "enum(left,center,right)",
      "css-class": "string",
      "mj-class": "string"
    },
    "defaultAttributes": {
      "border-color": "#000000",
      "border-style": "solid",
      "border-width": "4px",
      "padding": "10px 25px",
      "width": "100%",
      "align": "center"
    },
    "allowedChildTagNames": [],
    "allowedParentTagNames": [
      "mj-column",
      "mj-hero"
    ],
    "supportsAnyChildTag": false,
    "endingTag": false,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": false,
      "slotKind": "none"
    },
    "componentBaseName": "Divider"
  },
  {
    "tagName": "mj-font",
    "source": "preset-core",
    "allowedAttributes": {
      "name": "string",
      "href": "string"
    },
    "defaultAttributes": {},
    "allowedChildTagNames": [],
    "allowedParentTagNames": [
      "mj-head"
    ],
    "supportsAnyChildTag": false,
    "endingTag": false,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": false,
      "slotKind": "none"
    },
    "componentBaseName": "Font"
  },
  {
    "tagName": "mj-group",
    "source": "preset-core",
    "allowedAttributes": {
      "background-color": "color",
      "direction": "enum(ltr,rtl)",
      "vertical-align": "enum(top,bottom,middle)",
      "width": "unit(px,%)",
      "css-class": "string",
      "mj-class": "string"
    },
    "defaultAttributes": {
      "direction": "ltr"
    },
    "allowedChildTagNames": [
      "mj-column",
      "mj-raw"
    ],
    "allowedParentTagNames": [
      "mj-section"
    ],
    "supportsAnyChildTag": false,
    "endingTag": false,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": false,
      "slotKind": "mjml"
    },
    "componentBaseName": "Group"
  },
  {
    "tagName": "mj-head",
    "source": "preset-core",
    "allowedAttributes": {},
    "defaultAttributes": {},
    "allowedChildTagNames": [
      "mj-attributes",
      "mj-breakpoint",
      "mj-html-attributes",
      "mj-font",
      "mj-preview",
      "mj-style",
      "mj-title",
      "mj-raw"
    ],
    "allowedParentTagNames": [
      "mjml"
    ],
    "supportsAnyChildTag": false,
    "endingTag": false,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": false,
      "slotKind": "mjml"
    },
    "componentBaseName": "Head"
  },
  {
    "tagName": "mj-hero",
    "source": "preset-core",
    "allowedAttributes": {
      "mode": "string",
      "height": "unit(px,%)",
      "background-url": "string",
      "background-width": "unit(px,%)",
      "background-height": "unit(px,%)",
      "background-position": "string",
      "border-radius": "string",
      "container-background-color": "color",
      "inner-background-color": "color",
      "inner-padding": "unit(px,%){1,4}",
      "inner-padding-top": "unit(px,%)",
      "inner-padding-left": "unit(px,%)",
      "inner-padding-right": "unit(px,%)",
      "inner-padding-bottom": "unit(px,%)",
      "padding": "unit(px,%){1,4}",
      "padding-bottom": "unit(px,%)",
      "padding-left": "unit(px,%)",
      "padding-right": "unit(px,%)",
      "padding-top": "unit(px,%)",
      "background-color": "color",
      "vertical-align": "enum(top,bottom,middle)",
      "css-class": "string",
      "mj-class": "string"
    },
    "defaultAttributes": {
      "mode": "fixed-height",
      "height": "0px",
      "background-url": null,
      "background-position": "center center",
      "padding": "0px",
      "padding-bottom": null,
      "padding-left": null,
      "padding-right": null,
      "padding-top": null,
      "background-color": "#ffffff",
      "vertical-align": "top"
    },
    "allowedChildTagNames": [
      "mj-accordion",
      "mj-button",
      "mj-carousel",
      "mj-divider",
      "mj-image",
      "mj-social",
      "mj-spacer",
      "mj-table",
      "mj-text",
      "mj-navbar",
      "mj-raw"
    ],
    "allowedParentTagNames": [
      "mj-body",
      "mj-wrapper"
    ],
    "supportsAnyChildTag": false,
    "endingTag": false,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": false,
      "slotKind": "mjml"
    },
    "componentBaseName": "Hero"
  },
  {
    "tagName": "mj-html-attribute",
    "source": "manual",
    "allowedAttributes": {
      "name": "string"
    },
    "defaultAttributes": {},
    "allowedChildTagNames": [],
    "allowedParentTagNames": [
      "mj-selector"
    ],
    "supportsAnyChildTag": false,
    "endingTag": true,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": true,
      "slotKind": "text"
    },
    "componentBaseName": "HtmlAttribute"
  },
  {
    "tagName": "mj-html-attributes",
    "source": "preset-core",
    "allowedAttributes": {},
    "defaultAttributes": {},
    "allowedChildTagNames": [
      "mj-selector"
    ],
    "allowedParentTagNames": [
      "mj-head"
    ],
    "supportsAnyChildTag": false,
    "endingTag": false,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": false,
      "slotKind": "mjml"
    },
    "componentBaseName": "HtmlAttributes"
  },
  {
    "tagName": "mj-image",
    "source": "preset-core",
    "allowedAttributes": {
      "alt": "string",
      "href": "string",
      "name": "string",
      "src": "string",
      "srcset": "string",
      "sizes": "string",
      "title": "string",
      "rel": "string",
      "align": "enum(left,center,right)",
      "border": "string",
      "border-bottom": "string",
      "border-left": "string",
      "border-right": "string",
      "border-top": "string",
      "border-radius": "unit(px,%){1,4}",
      "container-background-color": "color",
      "fluid-on-mobile": "boolean",
      "padding": "unit(px,%){1,4}",
      "padding-bottom": "unit(px,%)",
      "padding-left": "unit(px,%)",
      "padding-right": "unit(px,%)",
      "padding-top": "unit(px,%)",
      "target": "string",
      "width": "unit(px)",
      "height": "unit(px,auto)",
      "max-height": "unit(px,%)",
      "font-size": "unit(px)",
      "usemap": "string",
      "css-class": "string",
      "mj-class": "string"
    },
    "defaultAttributes": {
      "alt": "",
      "align": "center",
      "border": "0",
      "height": "auto",
      "padding": "10px 25px",
      "target": "_blank",
      "font-size": "13px"
    },
    "allowedChildTagNames": [],
    "allowedParentTagNames": [
      "mj-column",
      "mj-hero"
    ],
    "supportsAnyChildTag": false,
    "endingTag": false,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": false,
      "slotKind": "none"
    },
    "componentBaseName": "Image"
  },
  {
    "tagName": "mj-navbar",
    "source": "preset-core",
    "allowedAttributes": {
      "align": "enum(left,center,right)",
      "base-url": "string",
      "hamburger": "string",
      "ico-align": "enum(left,center,right)",
      "ico-open": "string",
      "ico-close": "string",
      "ico-color": "color",
      "ico-font-size": "unit(px,%)",
      "ico-font-family": "string",
      "ico-text-transform": "string",
      "ico-padding": "unit(px,%){1,4}",
      "ico-padding-left": "unit(px,%)",
      "ico-padding-top": "unit(px,%)",
      "ico-padding-right": "unit(px,%)",
      "ico-padding-bottom": "unit(px,%)",
      "padding": "unit(px,%){1,4}",
      "padding-left": "unit(px,%)",
      "padding-top": "unit(px,%)",
      "padding-right": "unit(px,%)",
      "padding-bottom": "unit(px,%)",
      "ico-text-decoration": "string",
      "ico-line-height": "unit(px,%,)",
      "css-class": "string",
      "mj-class": "string"
    },
    "defaultAttributes": {
      "align": "center",
      "base-url": null,
      "hamburger": null,
      "ico-align": "center",
      "ico-open": "&#9776;",
      "ico-close": "&#8855;",
      "ico-color": "#000000",
      "ico-font-size": "30px",
      "ico-font-family": "Ubuntu, Helvetica, Arial, sans-serif",
      "ico-text-transform": "uppercase",
      "ico-padding": "10px",
      "ico-text-decoration": "none",
      "ico-line-height": "30px"
    },
    "allowedChildTagNames": [
      "mj-navbar-link",
      "mj-raw"
    ],
    "allowedParentTagNames": [
      "mj-column",
      "mj-hero"
    ],
    "supportsAnyChildTag": false,
    "endingTag": false,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": false,
      "slotKind": "mjml"
    },
    "componentBaseName": "Navbar"
  },
  {
    "tagName": "mj-navbar-link",
    "source": "preset-core",
    "allowedAttributes": {
      "color": "color",
      "font-family": "string",
      "font-size": "unit(px)",
      "font-style": "string",
      "font-weight": "string",
      "href": "string",
      "name": "string",
      "target": "string",
      "rel": "string",
      "letter-spacing": "unitWithNegative(px,em)",
      "line-height": "unit(px,%,)",
      "padding-bottom": "unit(px,%)",
      "padding-left": "unit(px,%)",
      "padding-right": "unit(px,%)",
      "padding-top": "unit(px,%)",
      "padding": "unit(px,%){1,4}",
      "text-decoration": "string",
      "text-transform": "string",
      "css-class": "string",
      "mj-class": "string"
    },
    "defaultAttributes": {
      "color": "#000000",
      "font-family": "Ubuntu, Helvetica, Arial, sans-serif",
      "font-size": "13px",
      "font-weight": "normal",
      "line-height": "22px",
      "padding": "15px 10px",
      "target": "_blank",
      "text-decoration": "none",
      "text-transform": "uppercase"
    },
    "allowedChildTagNames": [],
    "allowedParentTagNames": [
      "mj-navbar"
    ],
    "supportsAnyChildTag": false,
    "endingTag": true,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": true,
      "slotKind": "html"
    },
    "componentBaseName": "NavbarLink"
  },
  {
    "tagName": "mj-preview",
    "source": "preset-core",
    "allowedAttributes": {},
    "defaultAttributes": {},
    "allowedChildTagNames": [],
    "allowedParentTagNames": [
      "mj-head"
    ],
    "supportsAnyChildTag": false,
    "endingTag": true,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": true,
      "slotKind": "text"
    },
    "componentBaseName": "Preview"
  },
  {
    "tagName": "mj-raw",
    "source": "preset-core",
    "allowedAttributes": {
      "position": "enum(file-start)",
      "css-class": "string",
      "mj-class": "string"
    },
    "defaultAttributes": {},
    "allowedChildTagNames": [],
    "allowedParentTagNames": [
      "mjml",
      "mj-accordion",
      "mj-accordion-element",
      "mj-body",
      "mj-column",
      "mj-group",
      "mj-head",
      "mj-hero",
      "mj-navbar",
      "mj-section",
      "mj-social",
      "mj-wrapper"
    ],
    "supportsAnyChildTag": false,
    "endingTag": true,
    "rawElement": true,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": true,
      "slotKind": "html"
    },
    "componentBaseName": "Raw"
  },
  {
    "tagName": "mj-section",
    "source": "preset-core",
    "allowedAttributes": {
      "background-color": "color",
      "background-url": "string",
      "background-repeat": "enum(repeat,no-repeat)",
      "background-size": "string",
      "background-position": "string",
      "background-position-x": "string",
      "background-position-y": "string",
      "border": "string",
      "border-bottom": "string",
      "border-left": "string",
      "border-radius": "string",
      "border-right": "string",
      "border-top": "string",
      "direction": "enum(ltr,rtl)",
      "full-width": "enum(full-width,false,)",
      "padding": "unit(px,%){1,4}",
      "padding-top": "unit(px,%)",
      "padding-bottom": "unit(px,%)",
      "padding-left": "unit(px,%)",
      "padding-right": "unit(px,%)",
      "text-align": "enum(left,center,right)",
      "text-padding": "unit(px,%){1,4}",
      "css-class": "string",
      "mj-class": "string"
    },
    "defaultAttributes": {
      "background-repeat": "repeat",
      "background-size": "auto",
      "background-position": "top center",
      "direction": "ltr",
      "padding": "20px 0",
      "text-align": "center",
      "text-padding": "4px 4px 4px 0"
    },
    "allowedChildTagNames": [
      "mj-column",
      "mj-group",
      "mj-raw"
    ],
    "allowedParentTagNames": [
      "mj-body",
      "mj-wrapper"
    ],
    "supportsAnyChildTag": false,
    "endingTag": false,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": false,
      "slotKind": "mjml"
    },
    "componentBaseName": "Section"
  },
  {
    "tagName": "mj-selector",
    "source": "manual",
    "allowedAttributes": {
      "path": "string"
    },
    "defaultAttributes": {},
    "allowedChildTagNames": [
      "mj-html-attribute"
    ],
    "allowedParentTagNames": [
      "mj-html-attributes"
    ],
    "supportsAnyChildTag": false,
    "endingTag": false,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": false,
      "slotKind": "mjml"
    },
    "componentBaseName": "Selector"
  },
  {
    "tagName": "mj-social",
    "source": "preset-core",
    "allowedAttributes": {
      "align": "enum(left,right,center)",
      "border-radius": "unit(px,%)",
      "container-background-color": "color",
      "color": "color",
      "font-family": "string",
      "font-size": "unit(px)",
      "font-style": "string",
      "font-weight": "string",
      "icon-size": "unit(px,%)",
      "icon-height": "unit(px,%)",
      "icon-padding": "unit(px,%){1,4}",
      "inner-padding": "unit(px,%){1,4}",
      "line-height": "unit(px,%,)",
      "mode": "enum(horizontal,vertical)",
      "padding-bottom": "unit(px,%)",
      "padding-left": "unit(px,%)",
      "padding-right": "unit(px,%)",
      "padding-top": "unit(px,%)",
      "padding": "unit(px,%){1,4}",
      "table-layout": "enum(auto,fixed)",
      "text-padding": "unit(px,%){1,4}",
      "text-decoration": "string",
      "vertical-align": "enum(top,bottom,middle)",
      "css-class": "string",
      "mj-class": "string"
    },
    "defaultAttributes": {
      "align": "center",
      "border-radius": "3px",
      "color": "#333333",
      "font-family": "Ubuntu, Helvetica, Arial, sans-serif",
      "font-size": "13px",
      "icon-size": "20px",
      "inner-padding": null,
      "line-height": "22px",
      "mode": "horizontal",
      "padding": "10px 25px",
      "text-decoration": "none"
    },
    "allowedChildTagNames": [
      "mj-social-element",
      "mj-raw"
    ],
    "allowedParentTagNames": [
      "mj-column",
      "mj-hero"
    ],
    "supportsAnyChildTag": false,
    "endingTag": false,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": false,
      "slotKind": "mjml"
    },
    "componentBaseName": "Social"
  },
  {
    "tagName": "mj-social-element",
    "source": "preset-core",
    "allowedAttributes": {
      "align": "enum(left,center,right)",
      "icon-position": "enum(left,right)",
      "background-color": "color",
      "color": "color",
      "border-radius": "unit(px)",
      "font-family": "string",
      "font-size": "unit(px)",
      "font-style": "string",
      "font-weight": "string",
      "href": "string",
      "icon-size": "unit(px,%)",
      "icon-height": "unit(px,%)",
      "icon-padding": "unit(px,%){1,4}",
      "line-height": "unit(px,%,)",
      "name": "string",
      "padding-bottom": "unit(px,%)",
      "padding-left": "unit(px,%)",
      "padding-right": "unit(px,%)",
      "padding-top": "unit(px,%)",
      "padding": "unit(px,%){1,4}",
      "text-padding": "unit(px,%){1,4}",
      "rel": "string",
      "src": "string",
      "srcset": "string",
      "sizes": "string",
      "alt": "string",
      "title": "string",
      "target": "string",
      "text-decoration": "string",
      "vertical-align": "enum(top,middle,bottom)",
      "css-class": "string",
      "mj-class": "string"
    },
    "defaultAttributes": {
      "alt": "",
      "align": "left",
      "icon-position": "left",
      "color": "#000",
      "border-radius": "3px",
      "font-family": "Ubuntu, Helvetica, Arial, sans-serif",
      "font-size": "13px",
      "line-height": "1",
      "padding": "4px",
      "text-padding": "4px 4px 4px 0",
      "target": "_blank",
      "text-decoration": "none",
      "vertical-align": "middle"
    },
    "allowedChildTagNames": [],
    "allowedParentTagNames": [
      "mj-social"
    ],
    "supportsAnyChildTag": false,
    "endingTag": true,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": true,
      "slotKind": "html"
    },
    "componentBaseName": "SocialElement"
  },
  {
    "tagName": "mj-spacer",
    "source": "preset-core",
    "allowedAttributes": {
      "border": "string",
      "border-bottom": "string",
      "border-left": "string",
      "border-right": "string",
      "border-top": "string",
      "container-background-color": "color",
      "padding-bottom": "unit(px,%)",
      "padding-left": "unit(px,%)",
      "padding-right": "unit(px,%)",
      "padding-top": "unit(px,%)",
      "padding": "unit(px,%){1,4}",
      "height": "unit(px,%)",
      "css-class": "string",
      "mj-class": "string"
    },
    "defaultAttributes": {
      "height": "20px"
    },
    "allowedChildTagNames": [],
    "allowedParentTagNames": [
      "mj-column",
      "mj-hero"
    ],
    "supportsAnyChildTag": false,
    "endingTag": false,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": false,
      "slotKind": "none"
    },
    "componentBaseName": "Spacer"
  },
  {
    "tagName": "mj-style",
    "source": "preset-core",
    "allowedAttributes": {
      "inline": "string"
    },
    "defaultAttributes": {},
    "allowedChildTagNames": [],
    "allowedParentTagNames": [
      "mj-head"
    ],
    "supportsAnyChildTag": false,
    "endingTag": true,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": true,
      "slotKind": "text"
    },
    "componentBaseName": "Style"
  },
  {
    "tagName": "mj-table",
    "source": "preset-core",
    "allowedAttributes": {
      "align": "enum(left,right,center)",
      "border": "string",
      "cellpadding": "integer",
      "cellspacing": "integer",
      "container-background-color": "color",
      "color": "color",
      "font-family": "string",
      "font-size": "unit(px)",
      "font-weight": "string",
      "line-height": "unit(px,%,)",
      "padding-bottom": "unit(px,%)",
      "padding-left": "unit(px,%)",
      "padding-right": "unit(px,%)",
      "padding-top": "unit(px,%)",
      "padding": "unit(px,%){1,4}",
      "role": "enum(none,presentation)",
      "table-layout": "enum(auto,fixed,initial,inherit)",
      "vertical-align": "enum(top,bottom,middle)",
      "width": "unit(px,%,auto)",
      "css-class": "string",
      "mj-class": "string"
    },
    "defaultAttributes": {
      "align": "left",
      "border": "none",
      "cellpadding": "0",
      "cellspacing": "0",
      "color": "#000000",
      "font-family": "Ubuntu, Helvetica, Arial, sans-serif",
      "font-size": "13px",
      "line-height": "22px",
      "padding": "10px 25px",
      "table-layout": "auto",
      "width": "100%"
    },
    "allowedChildTagNames": [],
    "allowedParentTagNames": [
      "mj-column",
      "mj-hero"
    ],
    "supportsAnyChildTag": false,
    "endingTag": true,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": true,
      "slotKind": "html"
    },
    "componentBaseName": "Table"
  },
  {
    "tagName": "mj-text",
    "source": "preset-core",
    "allowedAttributes": {
      "align": "enum(left,right,center,justify)",
      "background-color": "color",
      "color": "color",
      "container-background-color": "color",
      "font-family": "string",
      "font-size": "unit(px)",
      "font-style": "string",
      "font-weight": "string",
      "height": "unit(px,%)",
      "letter-spacing": "unitWithNegative(px,em)",
      "line-height": "unit(px,%,)",
      "padding-bottom": "unit(px,%)",
      "padding-left": "unit(px,%)",
      "padding-right": "unit(px,%)",
      "padding-top": "unit(px,%)",
      "padding": "unit(px,%){1,4}",
      "text-decoration": "string",
      "text-transform": "string",
      "vertical-align": "enum(top,bottom,middle)",
      "css-class": "string",
      "mj-class": "string"
    },
    "defaultAttributes": {
      "align": "left",
      "color": "#000000",
      "font-family": "Ubuntu, Helvetica, Arial, sans-serif",
      "font-size": "13px",
      "line-height": "1",
      "padding": "10px 25px"
    },
    "allowedChildTagNames": [],
    "allowedParentTagNames": [
      "mj-column",
      "mj-hero"
    ],
    "supportsAnyChildTag": false,
    "endingTag": true,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": true,
      "slotKind": "html"
    },
    "componentBaseName": "Text"
  },
  {
    "tagName": "mj-title",
    "source": "preset-core",
    "allowedAttributes": {},
    "defaultAttributes": {},
    "allowedChildTagNames": [],
    "allowedParentTagNames": [
      "mj-head"
    ],
    "supportsAnyChildTag": false,
    "endingTag": true,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": true,
      "slotKind": "text"
    },
    "componentBaseName": "Title"
  },
  {
    "tagName": "mj-wrapper",
    "source": "preset-core",
    "allowedAttributes": {
      "background-color": "color",
      "background-url": "string",
      "background-repeat": "enum(repeat,no-repeat)",
      "background-size": "string",
      "background-position": "string",
      "background-position-x": "string",
      "background-position-y": "string",
      "border": "string",
      "border-bottom": "string",
      "border-left": "string",
      "border-radius": "string",
      "border-right": "string",
      "border-top": "string",
      "direction": "enum(ltr,rtl)",
      "full-width": "enum(full-width,false,)",
      "padding": "unit(px,%){1,4}",
      "padding-top": "unit(px,%)",
      "padding-bottom": "unit(px,%)",
      "padding-left": "unit(px,%)",
      "padding-right": "unit(px,%)",
      "text-align": "enum(left,center,right)",
      "text-padding": "unit(px,%){1,4}",
      "gap": "unit(px)",
      "css-class": "string",
      "mj-class": "string"
    },
    "defaultAttributes": {
      "background-repeat": "repeat",
      "background-size": "auto",
      "background-position": "top center",
      "direction": "ltr",
      "padding": "20px 0",
      "text-align": "center",
      "text-padding": "4px 4px 4px 0"
    },
    "allowedChildTagNames": [
      "mj-hero",
      "mj-raw",
      "mj-section"
    ],
    "allowedParentTagNames": [
      "mj-body"
    ],
    "supportsAnyChildTag": false,
    "endingTag": false,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": false,
      "slotKind": "mjml"
    },
    "componentBaseName": "Wrapper"
  },
  {
    "tagName": "mjml",
    "source": "manual",
    "allowedAttributes": {
      "dir": "string",
      "lang": "string",
      "owa": "string"
    },
    "defaultAttributes": {
      "dir": "auto",
      "lang": "und",
      "owa": "none"
    },
    "allowedChildTagNames": [
      "mj-body",
      "mj-head",
      "mj-raw"
    ],
    "allowedParentTagNames": [],
    "supportsAnyChildTag": false,
    "endingTag": false,
    "rawElement": false,
    "serialization": {
      "allowsArbitraryAttributes": false,
      "preservesRawContent": false,
      "slotKind": "mjml"
    },
    "componentBaseName": "Mjml"
  }
] as const

export const STATIC_VJML_MANUAL_COMPONENT_TAG_NAMES = [
  "mjml",
  "mj-all",
  "mj-class",
  "mj-selector",
  "mj-html-attribute"
] as const
