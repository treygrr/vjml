# Samples

Five end-to-end email fixtures live here as paired `.mjml` and `.vue` files.

- `launch-announcement`: head metadata, web font import, inline `mj-style`, hero, button, and social links.
- `weekly-digest`: `mj-attributes`, `mj-all`, `mj-class`, navbar, wrapper, group, image, and button composition.
- `product-showcase`: `mj-html-attributes`, carousel, divider, and CTA layout.
- `billing-summary`: head `mj-raw`, mock fetched data, computed table rows, conditional warning copy, and summary CTA.
- `support-update`: root `file-start` raw content, preview text, accordion content, and CTA.

Run `vitest run test/samples/parity.test.ts` to generate parity snapshots under `test/samples/snapshots`.