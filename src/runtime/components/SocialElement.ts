import { h } from 'vue'

import { requireVjmlComponentMetadata } from '../internal/componentMetadata'
import { renderVjmlContentNodes } from '../internal/content'
import { createVjmlComponent } from '../internal/factory'
import {
  mergeVjmlInheritedAttributes,
  useVjmlSocialContext,
} from '../internal/interactive'

const IMG_BASE_URL = 'https://www.mailjet.com/images/theme/v1/icons/ico-social/'

const DEFAULT_SOCIAL_NETWORKS: Record<string, Record<string, string>> = {
  facebook: {
    'background-color': '#3b5998',
    'share-url': 'https://www.facebook.com/sharer/sharer.php?u=[[URL]]',
    'src': `${IMG_BASE_URL}facebook.png`,
  },
  twitter: {
    'background-color': '#55acee',
    'share-url': 'https://twitter.com/intent/tweet?url=[[URL]]',
    'src': `${IMG_BASE_URL}twitter.png`,
  },
  x: {
    'background-color': '#000000',
    'share-url': 'https://twitter.com/intent/tweet?url=[[URL]]',
    'src': `${IMG_BASE_URL}twitter-x.png`,
  },
  google: {
    'background-color': '#dc4e41',
    'share-url': 'https://plus.google.com/share?url=[[URL]]',
    'src': `${IMG_BASE_URL}google-plus.png`,
  },
  pinterest: {
    'background-color': '#bd081c',
    'share-url': 'https://pinterest.com/pin/create/button/?url=[[URL]]&media=&description=',
    'src': `${IMG_BASE_URL}pinterest.png`,
  },
  linkedin: {
    'background-color': '#0077b5',
    'share-url': 'https://www.linkedin.com/shareArticle?mini=true&url=[[URL]]&title=&summary=&source=',
    'src': `${IMG_BASE_URL}linkedin.png`,
  },
  instagram: {
    'background-color': '#3f729b',
    'src': `${IMG_BASE_URL}instagram.png`,
  },
  web: {
    'background-color': '#4BADE9',
    'src': `${IMG_BASE_URL}web.png`,
  },
  snapchat: {
    'background-color': '#FFFA54',
    'src': `${IMG_BASE_URL}snapchat.png`,
  },
  youtube: {
    'background-color': '#EB3323',
    'src': `${IMG_BASE_URL}youtube.png`,
  },
  tumblr: {
    'background-color': '#344356',
    'share-url': 'https://www.tumblr.com/widgets/share/tool?canonicalUrl=[[URL]]',
    'src': `${IMG_BASE_URL}tumblr.png`,
  },
  github: {
    'background-color': '#000000',
    'src': `${IMG_BASE_URL}github.png`,
  },
  xing: {
    'background-color': '#296366',
    'share-url': 'https://www.xing.com/app/user?op=share&url=[[URL]]',
    'src': `${IMG_BASE_URL}xing.png`,
  },
  vimeo: {
    'background-color': '#53B4E7',
    'src': `${IMG_BASE_URL}vimeo.png`,
  },
  medium: {
    'background-color': '#000000',
    'src': `${IMG_BASE_URL}medium.png`,
  },
  soundcloud: {
    'background-color': '#EF7F31',
    'src': `${IMG_BASE_URL}soundcloud.png`,
  },
  dribbble: {
    'background-color': '#D95988',
    'src': `${IMG_BASE_URL}dribbble.png`,
  },
}

for (const [networkName, value] of Object.entries(DEFAULT_SOCIAL_NETWORKS)) {
  DEFAULT_SOCIAL_NETWORKS[`${networkName}-noshare`] = {
    ...value,
    'share-url': '[[URL]]',
  }
}

const metadata = requireVjmlComponentMetadata('mj-social-element')

function getSocialAttributes(attrs: Readonly<Record<string, string>>) {
  const socialNetwork = attrs.name
    ? (DEFAULT_SOCIAL_NETWORKS[attrs.name] ?? {})
    : {}
  let href = attrs.href

  if (href && socialNetwork['share-url']) {
    href = socialNetwork['share-url'].replace('[[URL]]', href)
  }

  return {
    'background-color': attrs['background-color'] || socialNetwork['background-color'],
    href,
    'icon-height': attrs['icon-height'] || socialNetwork['icon-height'],
    'icon-size': attrs['icon-size'] || socialNetwork['icon-size'],
    'sizes': attrs.sizes || socialNetwork.sizes,
    'src': attrs.src || socialNetwork.src,
    'srcset': attrs.srcset || socialNetwork.srcset,
  }
}

export default createVjmlComponent(metadata, {
  name: 'VjmlSocialElement',
  setup() {
    return {
      socialContext: useVjmlSocialContext(),
    }
  },
  render({ attrs, content, explicitAttrs }, extra) {
    const resolvedAttrs = mergeVjmlInheritedAttributes(
      attrs,
      explicitAttrs,
      extra.socialContext.inheritedAttrs,
    )
    const socialAttrs = getSocialAttributes(resolvedAttrs)
    const hasLink = Boolean(resolvedAttrs.href)
    const iconSize = socialAttrs['icon-size'] || resolvedAttrs['icon-size'] || '20px'
    const iconNode = h('td', {
      style: {
        'padding': resolvedAttrs.padding,
        'padding-top': resolvedAttrs['padding-top'],
        'padding-right': resolvedAttrs['padding-right'],
        'padding-bottom': resolvedAttrs['padding-bottom'],
        'padding-left': resolvedAttrs['padding-left'],
        'vertical-align': resolvedAttrs['vertical-align'],
      },
    }, [
      h('table', {
        border: '0',
        cellpadding: '0',
        cellspacing: '0',
        role: 'presentation',
        style: {
          'background': socialAttrs['background-color'],
          'border-radius': resolvedAttrs['border-radius'],
          'width': iconSize,
        },
      }, [
        h('tbody', [
          h('tr', [
            h('td', {
              style: {
                'font-size': '0',
                'height': socialAttrs['icon-height'] || iconSize,
                'padding': resolvedAttrs['icon-padding'],
                'vertical-align': 'middle',
                'width': iconSize,
              },
            }, [
              hasLink
                ? h('a', {
                    href: socialAttrs.href,
                    rel: resolvedAttrs.rel,
                    target: resolvedAttrs.target,
                  }, [
                    h('img', {
                      alt: resolvedAttrs.alt,
                      sizes: socialAttrs.sizes,
                      src: socialAttrs.src,
                      srcset: socialAttrs.srcset,
                      style: {
                        'border-radius': resolvedAttrs['border-radius'],
                        'display': 'block',
                      },
                      title: resolvedAttrs.title,
                      width: Number.parseInt(iconSize, 10),
                    }),
                  ])
                : h('img', {
                    alt: resolvedAttrs.alt,
                    sizes: socialAttrs.sizes,
                    src: socialAttrs.src,
                    srcset: socialAttrs.srcset,
                    style: {
                      'border-radius': resolvedAttrs['border-radius'],
                      'display': 'block',
                    },
                    title: resolvedAttrs.title,
                    width: Number.parseInt(iconSize, 10),
                  }),
            ]),
          ]),
        ]),
      ]),
    ])
    const contentNode = content.hasContent
      ? h('td', {
          style: {
            'padding': resolvedAttrs['text-padding'],
            'text-align': resolvedAttrs.align,
            'vertical-align': 'middle',
          },
        }, [
          hasLink
            ? h('a', {
                href: socialAttrs.href,
                rel: resolvedAttrs.rel,
                style: {
                  'color': resolvedAttrs.color,
                  'font-family': resolvedAttrs['font-family'],
                  'font-size': resolvedAttrs['font-size'],
                  'font-style': resolvedAttrs['font-style'],
                  'font-weight': resolvedAttrs['font-weight'],
                  'line-height': resolvedAttrs['line-height'],
                  'text-decoration': resolvedAttrs['text-decoration'],
                },
                target: resolvedAttrs.target,
              }, renderVjmlContentNodes(content))
            : h('span', {
                style: {
                  'color': resolvedAttrs.color,
                  'font-family': resolvedAttrs['font-family'],
                  'font-size': resolvedAttrs['font-size'],
                  'font-style': resolvedAttrs['font-style'],
                  'font-weight': resolvedAttrs['font-weight'],
                  'line-height': resolvedAttrs['line-height'],
                  'text-decoration': resolvedAttrs['text-decoration'],
                },
              }, renderVjmlContentNodes(content)),
        ])
      : null

    return h('tr', {
      class: resolvedAttrs['css-class'] || undefined,
    }, resolvedAttrs['icon-position'] === 'left'
      ? [iconNode, contentNode]
      : [contentNode, iconNode])
  },
})
