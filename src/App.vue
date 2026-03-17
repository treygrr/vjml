<script setup lang="ts">
import {
  defineComponent,
  h,
  markRaw,
  nextTick,
  onMounted,
  onUpdated,
  provide,
  ref,
  type Component,
  type VNodeChild,
} from 'vue'

import {
  Accordion as VAccordion,
  AccordionElement as VAccordionElement,
  AccordionText as VAccordionText,
  AccordionTitle as VAccordionTitle,
  All as VAll,
  Attributes as VAttributes,
  Body as VBody,
  Breakpoint as VBreakpoint,
  Button as VButton,
  Carousel as VCarousel,
  CarouselImage as VCarouselImage,
  Class as VClass,
  Column as VColumn,
  Divider as VDivider,
  Font as VFont,
  Group as VGroup,
  Head as VHead,
  Hero as VHero,
  HtmlAttribute as VHtmlAttribute,
  HtmlAttributes as VHtmlAttributes,
  Image as VImage,
  Mjml as VMjml,
  Navbar as VNavbar,
  NavbarLink as VNavbarLink,
  Preview as VPreview,
  Raw as VRaw,
  Section as VSection,
  Selector as VSelector,
  Social as VSocial,
  SocialElement as VSocialElement,
  Spacer as VSpacer,
  Style as VStyle,
  Table as VTable,
  Text as VText,
  Title as VTitle,
  Wrapper as VWrapper,
  resolveVjmlRuntimeConfig,
  toVjmlComponentName,
  useVjml,
} from './index'
import {
  VJML_BODY_RENDER_CONTEXT_KEY,
  VJML_HEAD_COLLECTION_CONTEXT_KEY,
  VJML_RUNTIME_CONFIG_KEY,
  createVjmlBodyRenderContext,
  createVjmlDocumentContext,
  createVjmlHeadCollectionContext,
} from './runtime/internal/context'
import {
  buildMediaQueriesTags,
  buildStyleFromComponents,
  buildStyleFromTags,
} from './runtime/internal/helpers/document'

interface CatalogExample {
  id: string
  name: string
  tag: string
  globalName: string
  summary: string
  snippet: string
  demo: Component
  previewNote?: string
}

interface CatalogSection {
  id: string
  title: string
  description: string
  examples: CatalogExample[]
}

interface EmailPreviewOptions {
  bodyProps?: Record<string, unknown>
  headChildren?: VNodeChild[]
  mjmlProps?: Record<string, unknown>
  sectionProps?: Record<string, unknown>
}

const VjmlCatalogPreview = defineComponent({
  name: 'VjmlCatalogPreview',
  setup(_props, { slots }) {
    const runtimeConfig = Object.freeze(resolveVjmlRuntimeConfig(useVjml()))
    const documentContext = createVjmlDocumentContext(runtimeConfig)
    const bodyRenderContext = createVjmlBodyRenderContext(documentContext)
    const headCollectionContext = createVjmlHeadCollectionContext(documentContext)
    const collectedStyles = ref('')

    provide(VJML_RUNTIME_CONFIG_KEY, runtimeConfig)
    provide(VJML_BODY_RENDER_CONTEXT_KEY, bodyRenderContext)
    provide(VJML_HEAD_COLLECTION_CONTEXT_KEY, headCollectionContext)

    const syncStyles = () => {
      const state = documentContext.getState()

      collectedStyles.value = [
        buildMediaQueriesTags(state.breakpoint, state.mediaQueries, {
          forceOWADesktop: state.forceOWADesktop,
          printerSupport: state.printerSupport,
        }),
        buildStyleFromComponents(
          state.breakpoint,
          state.componentsHeadStyle,
          state.headStyle,
        ),
        buildStyleFromTags(state.breakpoint, state.style),
      ]
        .filter(Boolean)
        .join('\n')
    }

    onMounted(() => {
      void nextTick(syncStyles)
    })

    onUpdated(() => {
      void nextTick(syncStyles)
    })

    return () => h('div', { class: 'catalog-preview-frame' }, [
      collectedStyles.value
        ? h('div', {
            class: 'catalog-preview-head',
            innerHTML: collectedStyles.value,
          })
        : null,
      slots.default?.(),
    ])
  },
})

const config = useVjml()

const componentNames = [
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

const componentCount = componentNames.length

const heroImage = 'https://dummyimage.com/960x420/16353f/fffaf2.png&text=VJML+Hero'
const productImage = 'https://dummyimage.com/560x220/16353f/fffaf2.png&text=VJML+Image'
const carouselOne = 'https://dummyimage.com/600x240/16353f/fffaf2.png&text=Carousel+1'
const carouselTwo = 'https://dummyimage.com/600x240/db7636/fffaf2.png&text=Carousel+2'
const carouselThree = 'https://dummyimage.com/600x240/0c7a7f/fffaf2.png&text=Carousel+3'

const headCollectionNote = 'Collected from <Head> during render. The live preview shows companion body content rather than the final head-side effect.'
const nestedComponentNote = 'This preview wraps the component in the minimal parent structure it expects.'

const importSnippet = `import {
${componentNames.map(name => `  ${name},`).join('\n')}
} from 'vjml'`

const installSnippet = `import { createApp } from 'vue'
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

const renderSnippet = `import WelcomeEmail from './WelcomeEmail.vue'
import { createVjmlRenderer } from 'vjml/server'

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

function formatSnippet(value: string): string {
  return value.trim()
}

function createDemoComponent(name: string, render: () => VNodeChild): Component {
  return markRaw(defineComponent({
    name: `${name}CatalogDemo`,
    setup() {
      return () => render()
    },
  }))
}

function createCatalogExample(
  name: string,
  tag: string,
  summary: string,
  snippet: string,
  demo: Component,
  previewNote?: string,
): CatalogExample {
  return {
    id: tag,
    name,
    tag,
    globalName: toVjmlComponentName(tag, config.prefix),
    summary,
    snippet,
    demo,
    previewNote,
  }
}

function createTextPair(
  heading: string,
  copy: string,
  headingProps: Record<string, unknown> = {},
  copyProps: Record<string, unknown> = {},
): VNodeChild[] {
  return [
    h(VText, {
      color: '#173540',
      fontSize: '18px',
      fontWeight: '700',
      lineHeight: '24px',
      ...headingProps,
    }, {
      default: () => heading,
    }),
    h(VSpacer, { height: '10px' }),
    h(VText, {
      color: '#425d64',
      fontSize: '14px',
      lineHeight: '22px',
      ...copyProps,
    }, {
      default: () => copy,
    }),
  ]
}

function createColumn(children: VNodeChild[], props: Record<string, unknown> = {}) {
  return h(VColumn, props, {
    default: () => children,
  })
}

function createSection(children: VNodeChild[], props: Record<string, unknown> = {}) {
  return h(VSection, {
    backgroundColor: '#fffdf8',
    padding: '22px',
    ...props,
  }, {
    default: () => children,
  })
}

function createEmail(children: VNodeChild[], options: EmailPreviewOptions = {}) {
  const rootChildren: VNodeChild[] = []

  if (options.headChildren?.length) {
    rootChildren.push(h(VHead, null, {
      default: () => options.headChildren ?? [],
    }))
  }

  rootChildren.push(h(VBody, {
    width: '340px',
    backgroundColor: '#f7efe4',
    ...options.bodyProps,
  }, {
    default: () => children,
  }))

  return h(VMjml, {
    lang: 'en',
    ...options.mjmlProps,
  }, {
    default: () => rootChildren,
  })
}

function createOneColumnEmail(children: VNodeChild[], options: EmailPreviewOptions = {}) {
  return createEmail([
    createSection([
      createColumn(children),
    ], options.sectionProps),
  ], options)
}

function createMetadataDemo(
  name: string,
  headChildren: VNodeChild[],
  heading: string,
  copy: string,
) {
  return createDemoComponent(name, () => createOneColumnEmail([
    ...createTextPair(heading, copy),
  ], {
    headChildren,
  }))
}

const mjmlDemo = createDemoComponent('Mjml', () => createOneColumnEmail([
  ...createTextPair(
    'Hello from VJML',
    'A full email tree starts with <Mjml> and a single <Body>. Everything else composes underneath it.',
  ),
]))

const headDemo = createMetadataDemo(
  'Head',
  [
    h(VTitle, { text: 'Weekly summary' }),
    h(VPreview, { text: 'Open for this week\'s highlights.' }),
  ],
  'Head-driven metadata',
  'Use <Head> to collect preview text, title, fonts, styles, and attribute declarations before server render.',
)

const attributesDemo = createDemoComponent('Attributes', () => createOneColumnEmail([
  ...createTextPair(
    'Reusable defaults',
    'Attributes let you declare shared defaults for repeated content patterns across an email.',
  ),
  h(VSpacer, { height: '8px' }),
  h(VText, { mjClass: 'eyebrow' }, {
    default: () => 'Priority update',
  }),
], {
  headChildren: [
    h(VAttributes, null, {
      default: () => [
        h(VAll, {
          color: '#425d64',
          'font-size': '15px',
          'line-height': '22px',
        }),
        h(VClass, {
          name: 'eyebrow',
          color: '#db7636',
          'font-size': '12px',
          'font-weight': '700',
          'text-transform': 'uppercase',
        }),
        h(VText, {
          color: '#16353f',
          fontWeight: '700',
        }),
      ],
    }),
  ],
}))

const bodyDemo = createDemoComponent('Body', () => createEmail([
  createSection([
    createColumn([
      ...createTextPair(
        'Body controls the canvas',
        'Set the global width and background at the email body level, then compose sections inside it.',
        {
          color: '#fff5e8',
        },
        {
          color: '#d9e3df',
        },
      ),
    ]),
  ], {
    backgroundColor: '#16353f',
    padding: '24px',
  }),
], {
  bodyProps: {
    backgroundColor: '#ede3d7',
    width: '340px',
  },
}))

const breakpointDemo = createMetadataDemo(
  'Breakpoint',
  [h(VBreakpoint, { width: '320px' })],
  'Responsive breakpoint',
  'Adjust the responsive breakpoint used when the rendered email switches into its mobile layout rules.',
)

const buttonDemo = createDemoComponent('Button', () => createOneColumnEmail([
  ...createTextPair(
    'Primary actions',
    'Buttons render email-safe CTA markup with alignment, padding, and typography controls.',
  ),
  h(VSpacer, { height: '16px' }),
  h(VButton, {
    align: 'left',
    backgroundColor: '#db7636',
    borderRadius: '999px',
    color: '#fffaf2',
    fontWeight: '700',
    href: 'https://example.com',
    innerPadding: '12px 18px',
  }, {
    default: () => 'Review account activity',
  }),
]))

const carouselDemo = createDemoComponent('Carousel', () => createEmail([
  createSection([
    createColumn([
      h(VCarousel, {
        padding: '0px',
        thumbnails: 'visible',
      }, {
        default: () => [
          h(VCarouselImage, {
            alt: 'Carousel slide one',
            href: 'https://example.com/one',
            src: carouselOne,
          }),
          h(VCarouselImage, {
            alt: 'Carousel slide two',
            href: 'https://example.com/two',
            src: carouselTwo,
          }),
          h(VCarouselImage, {
            alt: 'Carousel slide three',
            href: 'https://example.com/three',
            src: carouselThree,
          }),
        ],
      }),
    ]),
  ], {
    padding: '0px',
  }),
]))

const classDemo = createDemoComponent('Class', () => createOneColumnEmail([
  ...createTextPair(
    'Named class presets',
    'Define a reusable class in <Attributes>, then reference it with mj-class on matching components.',
  ),
  h(VSpacer, { height: '8px' }),
  h(VText, { mjClass: 'eyebrow' }, {
    default: () => 'Priority update',
  }),
], {
  headChildren: [
    h(VAttributes, null, {
      default: () => [
        h(VClass, {
          name: 'eyebrow',
          color: '#db7636',
          'font-size': '12px',
          'font-weight': '700',
          'letter-spacing': '0.16em',
          'text-transform': 'uppercase',
        }),
      ],
    }),
  ],
}))

const columnDemo = createDemoComponent('Column', () => createEmail([
  createSection([
    createColumn([
      ...createTextPair('Left column', 'Columns split a section into sibling cells.', {
        color: '#fff5e8',
      }, {
        color: '#e4ece8',
      }),
    ], {
      backgroundColor: '#16353f',
      width: '50%',
    }),
    createColumn([
      ...createTextPair('Right column', 'Use them for multi-column summaries and comparison blocks.'),
    ], {
      backgroundColor: '#f2dfcf',
      width: '50%',
    }),
  ], {
    padding: '16px',
  }),
]))

const dividerDemo = createDemoComponent('Divider', () => createOneColumnEmail([
  h(VText, {
    color: '#173540',
    fontSize: '16px',
    fontWeight: '700',
  }, {
    default: () => 'Above the divider',
  }),
  h(VDivider, {
    borderTop: '2px solid #db7636',
    padding: '16px 0',
  }),
  h(VText, {
    color: '#425d64',
    fontSize: '14px',
    lineHeight: '22px',
  }, {
    default: () => 'Below the divider',
  }),
]))

const fontDemo = createMetadataDemo(
  'Font',
  [
    h(VFont, {
      href: 'https://fonts.googleapis.com/css2?family=Lora:wght@400;700&display=swap',
      name: 'Lora',
    }),
  ],
  'External font declarations',
  'Declare web fonts in <Head>, then reference them from content components such as <Text> and <Button>.',
)

const groupDemo = createDemoComponent('Group', () => createEmail([
  createSection([
    h(VGroup, null, {
      default: () => [
        createColumn([
          ...createTextPair('Feature A', 'Keep related columns together as a grouped row.'),
        ]),
        createColumn([
          ...createTextPair('Feature B', 'Group is useful when you want columns to stay visually paired.'),
        ]),
      ],
    }),
  ]),
]))

const heroDemo = createDemoComponent('Hero', () => createEmail([
  h(VHero, {
    backgroundColor: '#16353f',
    backgroundHeight: '220px',
    backgroundUrl: heroImage,
    backgroundWidth: '340px',
    innerPadding: '20px',
    mode: 'fluid-height',
    padding: '0px',
    verticalAlign: 'top',
  }, {
    default: () => [
      h(VText, {
        color: '#fff5e8',
        fontSize: '24px',
        fontWeight: '700',
        lineHeight: '30px',
      }, {
        default: () => 'Launch week',
      }),
      h(VSpacer, { height: '10px' }),
      h(VText, {
        color: '#e8d9ca',
        fontSize: '14px',
        lineHeight: '22px',
      }, {
        default: () => 'Hero blocks combine background treatment with real email content.',
      }),
      h(VSpacer, { height: '14px' }),
      h(VButton, {
        align: 'left',
        backgroundColor: '#db7636',
        borderRadius: '999px',
        color: '#fffaf2',
        href: 'https://example.com',
        innerPadding: '10px 16px',
      }, {
        default: () => 'Open dashboard',
      }),
    ],
  }),
]))

const htmlAttributesDemo = createDemoComponent('HtmlAttributes', () => createOneColumnEmail([
  ...createTextPair(
    'Selector-driven attributes',
    'HtmlAttributes, Selector, and HtmlAttribute target the rendered HTML tree during the document pass.',
  ),
  h(VSpacer, { height: '8px' }),
  h(VText, {
    cssClass: 'attr-target',
  }, {
    default: () => 'Selector target in the rendered HTML.',
  }),
], {
  headChildren: [
    h(VHtmlAttributes, null, {
      default: () => [
        h(VSelector, { path: '.attr-target' }, {
          default: () => [
            h(VHtmlAttribute, {
              name: 'style',
              text: 'color:#db7636;font-weight:700;',
            }),
          ],
        }),
      ],
    }),
  ],
}))

const imageDemo = createDemoComponent('Image', () => createOneColumnEmail([
  h(VImage, {
    alt: 'Product preview',
    borderRadius: '18px',
    padding: '0px',
    src: productImage,
    width: '280px',
  }),
  h(VSpacer, { height: '14px' }),
  h(VText, {
    color: '#425d64',
    fontSize: '14px',
    lineHeight: '22px',
  }, {
    default: () => 'Use Image for product cards, banners, and editorial artwork.',
  }),
]))

const navbarDemo = createDemoComponent('Navbar', () => createEmail([
  createSection([
    createColumn([
      h(VNavbar, {
        align: 'left',
        padding: '0px',
      }, {
        default: () => [
          h(VNavbarLink, { color: '#16353f', href: 'https://example.com/overview' }, {
            default: () => 'Overview',
          }),
          h(VNavbarLink, { color: '#16353f', href: 'https://example.com/billing' }, {
            default: () => 'Billing',
          }),
          h(VNavbarLink, { color: '#16353f', href: 'https://example.com/support' }, {
            default: () => 'Support',
          }),
        ],
      }),
    ]),
  ]),
]))

const previewDemo = createMetadataDemo(
  'Preview',
  [h(VPreview, { text: 'See this line in inbox previews.' })],
  'Preview text',
  'Preview content is intentionally hidden from the visible email body and is meant for inbox snippets.',
)

const rawDemo = createDemoComponent('Raw', () => createOneColumnEmail([
  h(VRaw, {
    html: '<div style="padding:14px;border-radius:16px;background:#173540;color:#fffaf2;font-weight:700;">Injected raw HTML</div>',
  }),
  h(VSpacer, { height: '12px' }),
  h(VText, {
    color: '#425d64',
    fontSize: '14px',
    lineHeight: '22px',
  }, {
    default: () => 'Use Raw for markup you want to pass through without additional component wrapping.',
  }),
]))

const sectionDemo = createDemoComponent('Section', () => createEmail([
  createSection([
    createColumn([
      ...createTextPair(
        'Section as a layout row',
        'Sections create horizontal bands in the email and usually contain one or more columns.',
        {
          color: '#fff5e8',
        },
        {
          color: '#d9e3df',
        },
      ),
    ]),
  ], {
    backgroundColor: '#16353f',
    padding: '24px',
  }),
]))

const socialDemo = createDemoComponent('Social', () => createEmail([
  createSection([
    createColumn([
      h(VSocial, {
        align: 'left',
        iconSize: '24px',
        mode: 'horizontal',
        padding: '0px',
      }, {
        default: () => [
          h(VSocialElement, { href: 'https://github.com', name: 'github' }, {
            default: () => 'GitHub',
          }),
          h(VSocialElement, { href: 'https://linkedin.com', name: 'linkedin' }, {
            default: () => 'LinkedIn',
          }),
          h(VSocialElement, { href: 'https://x.com', name: 'x' }, {
            default: () => 'X',
          }),
        ],
      }),
    ]),
  ]),
]))

const spacerDemo = createDemoComponent('Spacer', () => createOneColumnEmail([
  h(VText, {
    color: '#173540',
    fontSize: '16px',
    fontWeight: '700',
  }, {
    default: () => 'Line one',
  }),
  h(VSpacer, { height: '18px' }),
  h(VText, {
    color: '#425d64',
    fontSize: '14px',
    lineHeight: '22px',
  }, {
    default: () => 'Line two, separated by an email-safe vertical spacer.',
  }),
]))

const styleDemo = createMetadataDemo(
  'Style',
  [
    h(VStyle, {
      text: '.style-note div { color:#0c7a7f; font-weight:700; letter-spacing:0.04em; }',
    }),
  ],
  'Custom head styles',
  'Use <Style> for renderer-collected CSS you want emitted into the final email document head.',
)

const tableDemo = createDemoComponent('Table', () => createOneColumnEmail([
  h(VTable, {
    cellpadding: '6',
    cellspacing: '0',
    color: '#173540',
    fontSize: '14px',
    html: [
      '<tr><td><strong>Plan</strong></td><td>Pro</td></tr>',
      '<tr><td><strong>Status</strong></td><td>Active</td></tr>',
      '<tr><td><strong>Renewal</strong></td><td>May 27</td></tr>',
    ].join(''),
    padding: '0px',
    role: 'presentation',
    width: '100%',
  }),
]))

const textDemo = createDemoComponent('Text', () => createOneColumnEmail([
  h(VText, {
    color: '#173540',
    fontSize: '16px',
    lineHeight: '24px',
  }, {
    default: () => 'Compose copy with email-safe typography controls using the Text component.',
  }),
]))

const titleDemo = createMetadataDemo(
  'Title',
  [h(VTitle, { text: 'Account alert' })],
  'Document title',
  'Title contributes the final <title> tag during server render rather than drawing visible body content.',
)

const wrapperDemo = createDemoComponent('Wrapper', () => createEmail([
  h(VWrapper, {
    backgroundColor: '#fff2e7',
    padding: '16px 0',
  }, {
    default: () => [
      createSection([
        createColumn([
          ...createTextPair(
            'Wrapper groups sections',
            'Use Wrapper when you want a shared background or border treatment around multiple sections.',
          ),
        ]),
      ], {
        backgroundColor: '#fffdf8',
      }),
      createSection([
        createColumn([
          h(VButton, {
            align: 'left',
            backgroundColor: '#16353f',
            borderRadius: '999px',
            color: '#fffaf2',
            href: 'https://example.com',
            innerPadding: '10px 16px',
          }, {
            default: () => 'Take action',
          }),
        ]),
      ], {
        backgroundColor: '#fff8ef',
      }),
    ],
  }),
]))

const accordionDemo = createDemoComponent('Accordion', () => createEmail([
  createSection([
    createColumn([
      h(VAccordion, {
        padding: '0px',
      }, {
        default: () => [
          h(VAccordionElement, null, {
            default: () => [
              h(VAccordionTitle, { content: 'What changed?' }),
              h(VAccordionText, { content: 'The plugin now exports the full copied runtime and a plain Vue renderer.' }),
            ],
          }),
          h(VAccordionElement, null, {
            default: () => [
              h(VAccordionTitle, { content: 'How do I render email HTML?' }),
              h(VAccordionText, { content: 'Pass a Vue component to createVjmlRenderer().renderToHtml().' }),
            ],
          }),
        ],
      }),
    ]),
  ]),
]))

const catalogSections: CatalogSection[] = [
  {
    id: 'layout',
    title: 'Layout',
    description: 'Structural components for assembling the document, rows, columns, grouped content, and large-format hero sections.',
    examples: [
      createCatalogExample(
        'Mjml',
        'mjml',
        'The root component that defines a complete email tree.',
        formatSnippet(`
<Mjml lang="en">
  <Body>
    <Section>
      <Column>
        <Text>Hello from a full VJML tree.</Text>
      </Column>
    </Section>
  </Body>
</Mjml>`),
        mjmlDemo,
      ),
      createCatalogExample(
        'Head',
        'mj-head',
        'Collect document metadata such as title, preview text, styles, fonts, and attribute declarations.',
        formatSnippet(`
<Mjml>
  <Head>
    <Title>Weekly summary</Title>
    <Preview>Open for this week's highlights.</Preview>
  </Head>
  <Body>...</Body>
</Mjml>`),
        headDemo,
        headCollectionNote,
      ),
      createCatalogExample(
        'Body',
        'mj-body',
        'Controls the main email canvas width and background color.',
        formatSnippet(`
<Body background-color="#f7efe4" width="600px">
  <Section>
    <Column>
      <Text>Body owns the canvas.</Text>
    </Column>
  </Section>
</Body>`),
        bodyDemo,
      ),
      createCatalogExample(
        'Section',
        'mj-section',
        'Creates a horizontal row that usually contains one or more columns.',
        formatSnippet(`
<Section background-color="#16353f" padding="24px">
  <Column>
    <Text color="#fff5e8">A section is a horizontal band.</Text>
  </Column>
</Section>`),
        sectionDemo,
      ),
      createCatalogExample(
        'Column',
        'mj-column',
        'Splits a section into sibling cells for multi-column layouts.',
        formatSnippet(`
<Section>
  <Column width="50%">
    <Text>Left column</Text>
  </Column>
  <Column width="50%">
    <Text>Right column</Text>
  </Column>
</Section>`),
        columnDemo,
      ),
      createCatalogExample(
        'Group',
        'mj-group',
        'Keeps related columns grouped together as a row inside a section.',
        formatSnippet(`
<Section>
  <Group>
    <Column>...</Column>
    <Column>...</Column>
  </Group>
</Section>`),
        groupDemo,
      ),
      createCatalogExample(
        'Wrapper',
        'mj-wrapper',
        'Wraps multiple sections with a shared background or spacing treatment.',
        formatSnippet(`
<Wrapper background-color="#fff2e7">
  <Section>...</Section>
  <Section>...</Section>
</Wrapper>`),
        wrapperDemo,
      ),
      createCatalogExample(
        'Hero',
        'mj-hero',
        'Combines a background treatment with content blocks for large-format hero sections.',
        formatSnippet(`
<Hero
  background-url="https://dummyimage.com/960x420/16353f/fffaf2.png&text=VJML+Hero"
  background-width="600px"
  background-height="260px"
  mode="fluid-height"
>
  <Text>Launch week</Text>
  <Button>Open dashboard</Button>
</Hero>`),
        heroDemo,
      ),
    ],
  },
  {
    id: 'content',
    title: 'Content',
    description: 'Renderable building blocks for copy, media, separators, spacing, raw HTML, and table-based data.',
    examples: [
      createCatalogExample(
        'Text',
        'mj-text',
        'Renders the main copy blocks with email-safe typography controls.',
        formatSnippet(`
<Text font-size="16px" line-height="24px">
  Compose copy with email-safe typography controls.
</Text>`),
        textDemo,
      ),
      createCatalogExample(
        'Button',
        'mj-button',
        'Renders a table-backed CTA button that survives hostile email clients.',
        formatSnippet(`
<Button
  href="https://example.com"
  background-color="#db7636"
  border-radius="999px"
>
  Review account activity
</Button>`),
        buttonDemo,
      ),
      createCatalogExample(
        'Image',
        'mj-image',
        'Displays responsive imagery with email-friendly sizing and alignment controls.',
        formatSnippet(`
<Image
  src="https://dummyimage.com/560x220/16353f/fffaf2.png&text=VJML+Image"
  alt="Preview image"
  width="280px"
/>`),
        imageDemo,
      ),
      createCatalogExample(
        'Divider',
        'mj-divider',
        'Adds an email-safe horizontal rule between content blocks.',
        formatSnippet(`
<Divider border-top="2px solid #db7636" padding="16px 0" />`),
        dividerDemo,
      ),
      createCatalogExample(
        'Spacer',
        'mj-spacer',
        'Adds explicit vertical rhythm between content blocks.',
        formatSnippet(`
<Text>Line one</Text>
<Spacer height="18px" />
<Text>Line two</Text>`),
        spacerDemo,
      ),
      createCatalogExample(
        'Table',
        'mj-table',
        'Renders HTML table markup inside the email body when you need tabular data.',
        formatSnippet(`
<Table cellpadding="6" cellspacing="0" width="100%">
  <tr><td><strong>Plan</strong></td><td>Pro</td></tr>
  <tr><td><strong>Status</strong></td><td>Active</td></tr>
</Table>`),
        tableDemo,
      ),
      createCatalogExample(
        'Raw',
        'mj-raw',
        'Injects raw HTML directly into the output without component wrapping.',
        formatSnippet(`
<Raw>
  <div style="padding:14px;border-radius:16px;background:#173540;color:#fffaf2;font-weight:700;">
    Injected raw HTML
  </div>
</Raw>`),
        rawDemo,
      ),
    ],
  },
  {
    id: 'head-metadata',
    title: 'Head And Metadata',
    description: 'Renderless or metadata-oriented components that shape defaults, selectors, CSS, preview text, and document configuration.',
    examples: [
      createCatalogExample(
        'Attributes',
        'mj-attributes',
        'Declares reusable attribute defaults for component tags and named classes.',
        formatSnippet(`
<Head>
  <Attributes>
    <Text color="#16353f" font-weight="700" />
  </Attributes>
</Head>`),
        attributesDemo,
        headCollectionNote,
      ),
      createCatalogExample(
        'All',
        'mj-all',
        'Provides broad default attributes to multiple components through the attribute collection phase.',
        formatSnippet(`
<Attributes>
  <All font-size="15px" color="#425d64" />
</Attributes>`),
        attributesDemo,
        headCollectionNote,
      ),
      createCatalogExample(
        'Class',
        'mj-class',
        'Defines a named attribute bundle that can be reused with mj-class.',
        formatSnippet(`
<Attributes>
  <Class name="eyebrow" color="#db7636" text-transform="uppercase" />
</Attributes>

<Text mj-class="eyebrow">Priority update</Text>`),
        classDemo,
        headCollectionNote,
      ),
      createCatalogExample(
        'Breakpoint',
        'mj-breakpoint',
        'Sets the responsive breakpoint used during email layout generation.',
        formatSnippet(`
<Head>
  <Breakpoint width="320px" />
</Head>`),
        breakpointDemo,
        headCollectionNote,
      ),
      createCatalogExample(
        'Font',
        'mj-font',
        'Declares a web font for later use in body content components.',
        formatSnippet(`
<Head>
  <Font
    name="Lora"
    href="https://fonts.googleapis.com/css2?family=Lora:wght@400;700&display=swap"
  />
</Head>`),
        fontDemo,
        headCollectionNote,
      ),
      createCatalogExample(
        'HtmlAttributes',
        'mj-html-attributes',
        'Owns selector-based HTML attribute mutation during the document pass.',
        formatSnippet(`
<HtmlAttributes>
  <Selector path=".attr-target">
    <HtmlAttribute name="style">color:#db7636;font-weight:700;</HtmlAttribute>
  </Selector>
</HtmlAttributes>`),
        htmlAttributesDemo,
        headCollectionNote,
      ),
      createCatalogExample(
        'Selector',
        'mj-selector',
        'Targets rendered HTML nodes so html attributes can be applied by CSS selector.',
        formatSnippet(`
<Selector path=".attr-target">
  <HtmlAttribute name="style">color:#db7636;font-weight:700;</HtmlAttribute>
</Selector>`),
        htmlAttributesDemo,
        headCollectionNote,
      ),
      createCatalogExample(
        'HtmlAttribute',
        'mj-html-attribute',
        'Writes a concrete attribute value onto nodes selected by HtmlAttributes and Selector.',
        formatSnippet(`
<HtmlAttribute name="style">
  color:#db7636;font-weight:700;
</HtmlAttribute>`),
        htmlAttributesDemo,
        headCollectionNote,
      ),
      createCatalogExample(
        'Preview',
        'mj-preview',
        'Defines inbox preview text that remains hidden from the visible email body.',
        formatSnippet(`
<Head>
  <Preview>See this line in inbox previews.</Preview>
</Head>`),
        previewDemo,
        headCollectionNote,
      ),
      createCatalogExample(
        'Style',
        'mj-style',
        'Adds CSS to the final email head during server render.',
        formatSnippet(`
<Head>
  <Style>.style-note div { color:#0c7a7f; font-weight:700; }</Style>
</Head>`),
        styleDemo,
        headCollectionNote,
      ),
      createCatalogExample(
        'Title',
        'mj-title',
        'Declares the final HTML document title for the rendered email.',
        formatSnippet(`
<Head>
  <Title>Account alert</Title>
</Head>`),
        titleDemo,
        headCollectionNote,
      ),
    ],
  },
  {
    id: 'interactive',
    title: 'Interactive And Navigation',
    description: 'Components for accordions, carousels, nav bars, social blocks, and their required child elements.',
    examples: [
      createCatalogExample(
        'Accordion',
        'mj-accordion',
        'Creates an accordion block for question-and-answer or FAQ style sections.',
        formatSnippet(`
<Accordion>
  <AccordionElement>
    <AccordionTitle>What changed?</AccordionTitle>
    <AccordionText>The plugin now exports the full copied runtime.</AccordionText>
  </AccordionElement>
</Accordion>`),
        accordionDemo,
      ),
      createCatalogExample(
        'AccordionElement',
        'mj-accordion-element',
        'Represents one accordion item inside an Accordion container.',
        formatSnippet(`
<AccordionElement>
  <AccordionTitle>What changed?</AccordionTitle>
  <AccordionText>The plugin now exports the full copied runtime.</AccordionText>
</AccordionElement>`),
        accordionDemo,
        nestedComponentNote,
      ),
      createCatalogExample(
        'AccordionTitle',
        'mj-accordion-title',
        'Supplies the clickable title row inside an accordion element.',
        formatSnippet(`
<AccordionTitle>What changed?</AccordionTitle>`),
        accordionDemo,
        nestedComponentNote,
      ),
      createCatalogExample(
        'AccordionText',
        'mj-accordion-text',
        'Supplies the expanded content row inside an accordion element.',
        formatSnippet(`
<AccordionText>
  The plugin now exports the full copied runtime.
</AccordionText>`),
        accordionDemo,
        nestedComponentNote,
      ),
      createCatalogExample(
        'Carousel',
        'mj-carousel',
        'Creates a slide-based image carousel for richer editorial layouts.',
        formatSnippet(`
<Carousel>
  <CarouselImage src="https://dummyimage.com/600x240/16353f/fffaf2.png&text=Carousel+1" />
  <CarouselImage src="https://dummyimage.com/600x240/db7636/fffaf2.png&text=Carousel+2" />
</Carousel>`),
        carouselDemo,
      ),
      createCatalogExample(
        'CarouselImage',
        'mj-carousel-image',
        'Provides an image slide inside a Carousel.',
        formatSnippet(`
<CarouselImage
  src="https://dummyimage.com/600x240/16353f/fffaf2.png&text=Carousel+1"
  alt="Carousel slide"
/>`),
        carouselDemo,
        nestedComponentNote,
      ),
      createCatalogExample(
        'Navbar',
        'mj-navbar',
        'Creates an email-safe navigation block with linked items.',
        formatSnippet(`
<Navbar>
  <NavbarLink href="https://example.com/overview">Overview</NavbarLink>
  <NavbarLink href="https://example.com/billing">Billing</NavbarLink>
</Navbar>`),
        navbarDemo,
      ),
      createCatalogExample(
        'NavbarLink',
        'mj-navbar-link',
        'Adds one linked item inside a Navbar.',
        formatSnippet(`
<NavbarLink href="https://example.com/overview">
  Overview
</NavbarLink>`),
        navbarDemo,
        nestedComponentNote,
      ),
      createCatalogExample(
        'Social',
        'mj-social',
        'Renders a social follow/share block with icons and labels.',
        formatSnippet(`
<Social mode="horizontal">
  <SocialElement name="github" href="https://github.com">GitHub</SocialElement>
  <SocialElement name="linkedin" href="https://linkedin.com">LinkedIn</SocialElement>
</Social>`),
        socialDemo,
      ),
      createCatalogExample(
        'SocialElement',
        'mj-social-element',
        'Adds one social link item inside a Social block.',
        formatSnippet(`
<SocialElement name="github" href="https://github.com">
  GitHub
</SocialElement>`),
        socialDemo,
        nestedComponentNote,
      ),
    ],
  },
]
</script>

<template>
  <main class="shell">
    <section class="hero panel">
      <div class="hero-copy">
        <p class="eyebrow">Developer Catalog</p>
        <h1>Every copied VJML component, with a usage snippet and a live preview.</h1>
        <p class="lede">
          This page imports every runtime component directly in <code>App.vue</code> so a developer
          running the demo can inspect the API surface, see the expected parent structure, and
          preview the resulting markup side by side.
        </p>
      </div>

      <div class="pill-row">
        <span class="pill">{{ componentCount }} copied components</span>
        <span class="pill">{{ config.prefix }} global prefix</span>
        <span class="pill">{{ config.render.validation }} validation</span>
      </div>
    </section>

    <section class="panel setup-grid">
      <article class="setup-card">
        <p class="panel-label">Import Catalog</p>
        <h2>Everything exported by the main entry</h2>
        <pre><code>{{ importSnippet }}</code></pre>
      </article>

      <article class="setup-card">
        <p class="panel-label">Plugin Install</p>
        <h2>Register prefixed globals</h2>
        <pre><code>{{ installSnippet }}</code></pre>
      </article>

      <article class="setup-card">
        <p class="panel-label">Renderer Usage</p>
        <h2>Render a Vue email component to HTML</h2>
        <pre><code>{{ renderSnippet }}</code></pre>
      </article>
    </section>

    <nav class="section-nav panel" aria-label="Component sections">
      <a
        v-for="section in catalogSections"
        :key="section.id"
        class="section-link"
        :href="`#${section.id}`"
      >
        <span>{{ section.title }}</span>
        <strong>{{ section.examples.length }}</strong>
      </a>
    </nav>

    <section
      v-for="section in catalogSections"
      :id="section.id"
      :key="section.id"
      class="panel catalog-section"
    >
      <div class="section-copy">
        <p class="panel-label">{{ section.title }}</p>
        <h2>{{ section.title }}</h2>
        <p class="section-description">{{ section.description }}</p>
      </div>

      <div class="catalog-grid">
        <article v-for="example in section.examples" :key="example.id" class="catalog-card">
          <div class="card-top">
            <div>
              <p class="component-tag">{{ example.tag }}</p>
              <h3>{{ example.name }}</h3>
            </div>
            <span class="component-global">&lt;{{ example.globalName }}&gt;</span>
          </div>

          <p class="component-summary">{{ example.summary }}</p>

          <div class="example-preview">
            <VjmlCatalogPreview>
              <component :is="example.demo" />
            </VjmlCatalogPreview>
          </div>

          <p v-if="example.previewNote" class="preview-note">
            {{ example.previewNote }}
          </p>

          <pre><code>{{ example.snippet }}</code></pre>
        </article>
      </div>
    </section>
  </main>
</template>
