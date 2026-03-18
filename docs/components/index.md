# Components

Every VJML component now has its own markdown page.

Use the **Components** section in the left sidebar to jump directly to the tag you need. The top-level groups stay collapsible, and related child tags now sit under their real parent components.

## What is included

- document shell tags like `Mjml`, `Head`, and `Body`
- layout and content tags such as `Section`, `Column`, `Text`, and `Button`
- head and global helpers including `Attributes`, `Style`, `Font`, and `Raw`
- interactive parents and leaf tags such as `AccordionElement`, `CarouselImage`, `NavbarLink`, and `SocialElement`
- nested trees for relationships such as `Head -> Title`, `Accordion -> AccordionElement -> AccordionTitle`, and `Social -> SocialElement`

## How to read the reference

- the page title is the Vue-facing component name
- the metadata table shows the underlying MJML tag name, parents, children, defaults, and allowed attributes
- each group dropdown mirrors the real MJML parent and child structure where that relationship exists