import { requireVjmlComponentMetadata } from '../internal/componentMetadata'
import { createVjmlComponent } from '../internal/factory'
import {
  mergeVjmlInheritedAttributes,
  useVjmlCarouselContext,
} from '../internal/interactive'
import {
  createVjmlStaticHtml,
  renderHtmlAttributes,
  useVjmlSiblingContext,
} from '../internal/layout'

const metadata = requireVjmlComponentMetadata('mj-carousel-image')

export default createVjmlComponent(metadata, {
  name: 'VjmlCarouselImage',
  setup() {
    return {
      carouselContext: useVjmlCarouselContext(),
      siblingContext: useVjmlSiblingContext(),
    }
  },
  render({ attrs, explicitAttrs }, extra) {
    const resolvedAttrs = mergeVjmlInheritedAttributes(
      attrs,
      explicitAttrs,
      extra.carouselContext.inheritedAttrs,
    )
    const imageHtml = `<img${renderHtmlAttributes({
      alt: resolvedAttrs.alt,
      border: '0',
      src: resolvedAttrs.src,
      style: {
        'border-radius': resolvedAttrs['border-radius'],
        'display': 'block',
        'height': 'auto',
        'max-width': '100%',
        'width': extra.carouselContext.containerWidth,
      },
      title: resolvedAttrs.title,
      width: Number.parseInt(extra.carouselContext.containerWidth, 10),
    })}>`
    const contentHtml = resolvedAttrs.href
      ? `<a${renderHtmlAttributes({
          href: resolvedAttrs.href,
          rel: resolvedAttrs.rel,
          target: '_blank',
        })}>${imageHtml}</a>`
      : imageHtml

    return createVjmlStaticHtml(
      `<div${renderHtmlAttributes({
        class: [
          'mj-carousel-image',
          `mj-carousel-image-${extra.siblingContext.index + 1}`,
          resolvedAttrs['css-class'],
        ].filter(Boolean).join(' ') || undefined,
        style: extra.siblingContext.index === 0
          ? undefined
          : {
              'display': 'none',
              'mso-hide': 'all',
            },
      })}>${contentHtml}</div>`,
    )
  },
})
