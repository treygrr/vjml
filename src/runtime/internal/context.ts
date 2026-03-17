import { inject, type InjectionKey } from 'vue'

import type {
  VjmlFontMap,
  VjmlRuntimeConfig,
  VjmlValidationIssue,
} from '../../vjml'

import type { VjmlParsedWidth } from './helpers/measurements'

export interface VjmlValidationReporter {
  issues: readonly VjmlValidationIssue[]
  report: (issue: VjmlValidationIssue) => void
  reportInvalidChild: (
    parentTagName: string,
    childTagName: string,
    allowedChildTagNames: string[],
  ) => void
  reportInvalidParent: (
    childTagName: string,
    actualParentTagName: string | null | undefined,
    allowedParentTagNames: string[],
  ) => void
}

export type VjmlBreakpointAwareValue = string | ((breakpoint: string) => string)

export type VjmlHeadCollectionTarget
  = | 'breakpoint'
    | 'classes'
    | 'classesDefault'
    | 'componentsHeadStyle'
    | 'defaultAttributes'
    | 'fonts'
    | 'headRaw'
    | 'htmlAttributes'
    | 'inlineStyle'
    | 'preview'
    | 'style'
    | 'title'

export interface VjmlDocumentState {
  backgroundColor: string
  beforeDoctype: string[]
  breakpoint: string
  classes: Record<string, Record<string, string>>
  classesDefault: Record<string, Record<string, string>>
  componentsHeadStyle: VjmlBreakpointAwareValue[]
  defaultAttributes: Record<string, Record<string, string>>
  dir: string
  fonts: VjmlFontMap
  forceOWADesktop: boolean
  headRaw: string[]
  headStyle: Record<string, VjmlBreakpointAwareValue>
  htmlAttributes: Record<string, Record<string, string>>
  inlineStyle: string[]
  lang: string
  mediaQueries: Record<string, string>
  preview: string
  printerSupport: boolean
  style: VjmlBreakpointAwareValue[]
  title: string
  wrapWithDocument: boolean
}

export interface VjmlDocumentContext {
  readonly state: VjmlDocumentState
  addBeforeDoctype: (content: string) => void
  addComponentHeadStyle: (style: VjmlBreakpointAwareValue) => void
  addFont: (name: string, href: string) => void
  addHeadRaw: (content: string) => void
  addHeadStyle: (identifier: string, style: VjmlBreakpointAwareValue) => void
  addHtmlAttribute: (
    selector: string,
    attributeName: string,
    value: string,
  ) => void
  addInlineStyle: (style: string) => void
  addMediaQuery: (className: string, width: VjmlParsedWidth) => void
  addStyle: (style: VjmlBreakpointAwareValue) => void
  beginDocument: (
    options?: Partial<
      Pick<
        VjmlDocumentState,
        'dir' | 'forceOWADesktop' | 'lang' | 'printerSupport'
      >
    >,
  ) => void
  getState: () => VjmlDocumentState
  mergeClassAttributes: (
    className: string,
    attributes: Record<string, string>,
  ) => void
  mergeClassDefaultAttributes: (
    className: string,
    attributes: Record<string, string>,
  ) => void
  mergeDefaultAttributes: (
    tagName: string,
    attributes: Record<string, string>,
  ) => void
  setBackgroundColor: (color: string) => void
  setBreakpoint: (breakpoint: string) => void
  setDir: (dir: string) => void
  setForceOWADesktop: (value: boolean) => void
  setLang: (lang: string) => void
  setPreview: (preview: string) => void
  setPrinterSupport: (value: boolean) => void
  setTitle: (title: string) => void
}

export interface VjmlBodyRenderContext {
  readonly document: VjmlDocumentContext
  addComponentHeadStyle: (style: VjmlBreakpointAwareValue) => void
  addHeadStyle: (identifier: string, style: VjmlBreakpointAwareValue) => void
  addMediaQuery: (className: string, width: VjmlParsedWidth) => void
  setBackgroundColor: (color: string) => void
}

export interface VjmlHeadCollectionContext {
  readonly document: VjmlDocumentContext
  add: (target: VjmlHeadCollectionTarget, ...params: unknown[]) => void
}

function normalizeRecord(
  attributes: Record<string, string>,
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(attributes)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([name, value]) => [name, `${value}`]),
  )
}

function cloneNestedRecord(
  record: Record<string, Record<string, string>>,
): Record<string, Record<string, string>> {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [key, { ...value }]),
  )
}

function createInitialDocumentState(
  runtimeConfig: Readonly<VjmlRuntimeConfig>,
): VjmlDocumentState {
  return {
    backgroundColor: '',
    beforeDoctype: [],
    breakpoint: runtimeConfig.render.breakpoint,
    classes: {},
    classesDefault: {},
    componentsHeadStyle: [],
    defaultAttributes: {},
    dir: 'auto',
    fonts: { ...runtimeConfig.render.fonts },
    forceOWADesktop: false,
    headRaw: [],
    headStyle: {},
    htmlAttributes: {},
    inlineStyle: [],
    lang: 'und',
    mediaQueries: {},
    preview: '',
    printerSupport: false,
    style: [],
    title: '',
    wrapWithDocument: false,
  }
}

function pushIfDefined(target: string[], value: string) {
  if (value.length > 0) {
    target.push(value)
  }
}

function mergeAttributesIntoBucket(
  bucket: Record<string, Record<string, string>>,
  key: string,
  attributes: Record<string, string>,
) {
  const normalizedAttributes = normalizeRecord(attributes)

  if (!key || Object.keys(normalizedAttributes).length === 0) {
    return
  }

  bucket[key] = {
    ...(bucket[key] ?? {}),
    ...normalizedAttributes,
  }
}

function toBreakpointAwareValue(
  value: unknown,
): VjmlBreakpointAwareValue | null {
  if (typeof value === 'string') {
    return value
  }

  if (typeof value === 'function') {
    return value as (breakpoint: string) => string
  }

  return null
}

export function createVjmlDocumentContext(
  runtimeConfig: Readonly<VjmlRuntimeConfig>,
): VjmlDocumentContext {
  const state = createInitialDocumentState(runtimeConfig)

  const beginDocument: VjmlDocumentContext['beginDocument'] = (options = {}) => {
    state.wrapWithDocument = true

    if (options.lang !== undefined) {
      state.lang = options.lang
    }

    if (options.dir !== undefined) {
      state.dir = options.dir
    }

    if (options.forceOWADesktop !== undefined) {
      state.forceOWADesktop = options.forceOWADesktop
    }

    if (options.printerSupport !== undefined) {
      state.printerSupport = options.printerSupport
    }
  }

  return {
    state,
    beginDocument,
    addBeforeDoctype(content) {
      pushIfDefined(state.beforeDoctype, content)
    },
    addComponentHeadStyle(style) {
      const normalizedStyle = toBreakpointAwareValue(style)

      if (normalizedStyle) {
        state.componentsHeadStyle.push(normalizedStyle)
      }
    },
    addFont(name, href) {
      if (!name || !href) {
        return
      }

      state.fonts[name] = href
    },
    addHeadRaw(content) {
      pushIfDefined(state.headRaw, content)
    },
    addHeadStyle(identifier, style) {
      const normalizedStyle = toBreakpointAwareValue(style)

      if (!identifier || !normalizedStyle) {
        return
      }

      state.headStyle[identifier] = normalizedStyle
    },
    addHtmlAttribute(selector, attributeName, value) {
      if (!selector || !attributeName) {
        return
      }

      state.htmlAttributes[selector] = {
        ...(state.htmlAttributes[selector] ?? {}),
        [attributeName]: value,
      }
    },
    addInlineStyle(style) {
      pushIfDefined(state.inlineStyle, style)
    },
    addMediaQuery(className, { parsedWidth, unit }) {
      if (!className) {
        return
      }

      state.mediaQueries[className] = `{ width:${parsedWidth}${unit} !important; max-width: ${parsedWidth}${unit}; }`
    },
    addStyle(style) {
      const normalizedStyle = toBreakpointAwareValue(style)

      if (normalizedStyle) {
        state.style.push(normalizedStyle)
      }
    },
    getState() {
      return {
        ...state,
        beforeDoctype: [...state.beforeDoctype],
        classes: cloneNestedRecord(state.classes),
        classesDefault: cloneNestedRecord(state.classesDefault),
        componentsHeadStyle: [...state.componentsHeadStyle],
        defaultAttributes: cloneNestedRecord(state.defaultAttributes),
        fonts: { ...state.fonts },
        headRaw: [...state.headRaw],
        headStyle: { ...state.headStyle },
        htmlAttributes: cloneNestedRecord(state.htmlAttributes),
        inlineStyle: [...state.inlineStyle],
        mediaQueries: { ...state.mediaQueries },
        style: [...state.style],
      }
    },
    mergeClassAttributes(className, attributes) {
      mergeAttributesIntoBucket(state.classes, className, attributes)
    },
    mergeClassDefaultAttributes(className, attributes) {
      mergeAttributesIntoBucket(state.classesDefault, className, attributes)
    },
    mergeDefaultAttributes(tagName, attributes) {
      mergeAttributesIntoBucket(state.defaultAttributes, tagName, attributes)
    },
    setBackgroundColor(color) {
      state.backgroundColor = color
    },
    setBreakpoint(breakpoint) {
      if (breakpoint) {
        state.breakpoint = breakpoint
      }
    },
    setDir(dir) {
      if (dir) {
        state.dir = dir
      }
    },
    setForceOWADesktop(value) {
      state.forceOWADesktop = value
    },
    setLang(lang) {
      if (lang) {
        state.lang = lang
      }
    },
    setPreview(preview) {
      state.preview = preview
    },
    setPrinterSupport(value) {
      state.printerSupport = value
    },
    setTitle(title) {
      state.title = title
    },
  }
}

export function createVjmlBodyRenderContext(
  document: VjmlDocumentContext,
): VjmlBodyRenderContext {
  return {
    document,
    addComponentHeadStyle: document.addComponentHeadStyle,
    addHeadStyle: document.addHeadStyle,
    addMediaQuery: document.addMediaQuery,
    setBackgroundColor: document.setBackgroundColor,
  }
}

export function createVjmlHeadCollectionContext(
  document: VjmlDocumentContext,
): VjmlHeadCollectionContext {
  return {
    document,
    add(target, ...params) {
      switch (target) {
        case 'breakpoint':
          if (typeof params[0] === 'string') {
            document.setBreakpoint(params[0])
          }
          return
        case 'classes':
          if (typeof params[0] === 'string' && typeof params[1] === 'object' && params[1] !== null) {
            document.mergeClassAttributes(
              params[0],
              params[1] as Record<string, string>,
            )
          }
          return
        case 'classesDefault':
          if (typeof params[0] === 'string' && typeof params[1] === 'object' && params[1] !== null) {
            document.mergeClassDefaultAttributes(
              params[0],
              params[1] as Record<string, string>,
            )
          }
          return
        case 'componentsHeadStyle': {
          const styleValue = toBreakpointAwareValue(params[0])

          if (styleValue) {
            document.addComponentHeadStyle(styleValue)
          }
          return
        }
        case 'defaultAttributes':
          if (typeof params[0] === 'string' && typeof params[1] === 'object' && params[1] !== null) {
            document.mergeDefaultAttributes(
              params[0],
              params[1] as Record<string, string>,
            )
          }
          return
        case 'fonts':
          if (typeof params[0] === 'string' && typeof params[1] === 'string') {
            document.addFont(params[0], params[1])
          }
          return
        case 'headRaw':
          if (typeof params[0] === 'string') {
            document.addHeadRaw(params[0])
          }
          return
        case 'htmlAttributes':
          if (
            typeof params[0] === 'string'
            && typeof params[1] === 'string'
            && typeof params[2] === 'string'
          ) {
            document.addHtmlAttribute(params[0], params[1], params[2])
          }
          return
        case 'inlineStyle':
          if (typeof params[0] === 'string') {
            document.addInlineStyle(params[0])
          }
          return
        case 'preview':
          if (typeof params[0] === 'string') {
            document.setPreview(params[0])
          }
          return
        case 'style': {
          const styleValue = toBreakpointAwareValue(params[0])

          if (styleValue) {
            document.addStyle(styleValue)
          }
          return
        }
        case 'title':
          if (typeof params[0] === 'string') {
            document.setTitle(params[0])
          }
          return
      }
    },
  }
}

export const VJML_RUNTIME_CONFIG_KEY = Symbol(
  'vue-mjml-runtime-config',
) as InjectionKey<Readonly<VjmlRuntimeConfig>>

export const VJML_DOCUMENT_CONTEXT_KEY = Symbol(
  'vue-mjml-document-context',
) as InjectionKey<VjmlDocumentContext>

export const VJML_BODY_RENDER_CONTEXT_KEY = Symbol(
  'vue-mjml-body-render-context',
) as InjectionKey<VjmlBodyRenderContext>

export const VJML_HEAD_COLLECTION_CONTEXT_KEY = Symbol(
  'vue-mjml-head-collection-context',
) as InjectionKey<VjmlHeadCollectionContext>

export const VJML_VALIDATION_REPORTER_KEY = Symbol(
  'vue-mjml-validation-reporter',
) as InjectionKey<VjmlValidationReporter>

export function useVjmlDocumentContext(): VjmlDocumentContext | null {
  return inject(VJML_DOCUMENT_CONTEXT_KEY, null)
}

export function useVjmlBodyRenderContext(): VjmlBodyRenderContext | null {
  return inject(VJML_BODY_RENDER_CONTEXT_KEY, null)
}

export function useVjmlHeadCollectionContext(): VjmlHeadCollectionContext | null {
  return inject(VJML_HEAD_COLLECTION_CONTEXT_KEY, null)
}

export function useVjmlValidationReporter(): VjmlValidationReporter | null {
  return inject(VJML_VALIDATION_REPORTER_KEY, null)
}
