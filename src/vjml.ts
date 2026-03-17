export type VjmlFontMap = Record<string, string>

export type VjmlRenderMode = 'poc' | 'strict'

export type VjmlValidationMode = 'off' | 'warn' | 'strict'

export type VjmlValidationSeverity = 'warning' | 'error'

export interface VjmlValidationIssue {
  code: string
  message: string
  severity: VjmlValidationSeverity
  path?: string
  tagName?: string
}

export interface VjmlDebugElementNode {
  type: 'element'
  tagName: string
  attributes: Record<string, string>
  children: VjmlDebugNode[]
}

export interface VjmlDebugTextNode {
  type: 'text'
  value: string
}

export interface VjmlDebugCommentNode {
  type: 'comment'
  value: string
}

export type VjmlDebugNode = VjmlDebugCommentNode | VjmlDebugElementNode | VjmlDebugTextNode

export interface VjmlDebugDocumentState {
  backgroundColor: string
  beforeDoctype: string[]
  breakpoint: string
  classes: Record<string, Record<string, string>>
  classesDefault: Record<string, Record<string, string>>
  componentsHeadStyle: string[]
  defaultAttributes: Record<string, Record<string, string>>
  dir: string
  fonts: VjmlFontMap
  forceOWADesktop: boolean
  headRaw: string[]
  headStyle: Record<string, string>
  htmlAttributes: Record<string, Record<string, string>>
  inlineStyle: string[]
  lang: string
  mediaQueries: Record<string, string>
  preview: string
  printerSupport: boolean
  style: string[]
  title: string
  wrapWithDocument: boolean
}

export interface VjmlRenderOptions {
  breakpoint: string
  fonts: VjmlFontMap
  minify: boolean
  mode: VjmlRenderMode
  validation: VjmlValidationMode
}

export interface VjmlRuntimeConfigInput {
  prefix?: string
  render?: Partial<VjmlRenderOptions>
}

export interface VjmlRuntimeConfig {
  prefix: string
  render: VjmlRenderOptions
}

export interface RenderVjmlToHtmlOptions {
  props?: Record<string, unknown>
  runtime?: VjmlRuntimeConfigInput
}

export interface VjmlRenderResult {
  html: string
  warnings: string[]
  issues: VjmlValidationIssue[]
  config: VjmlRuntimeConfig
}

export interface VjmlDebugRenderResult extends VjmlRenderResult {
  document: VjmlDebugDocumentState
  tree: VjmlDebugNode[]
}

export const DEFAULT_VJML_PREFIX = 'VJ'

export const DEFAULT_VJML_FONTS: VjmlFontMap = {
  'Open Sans': 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700',
  'Droid Sans': 'https://fonts.googleapis.com/css?family=Droid+Sans:300,400,500,700',
  'Lato': 'https://fonts.googleapis.com/css?family=Lato:300,400,500,700',
  'Roboto': 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700',
  'Ubuntu': 'https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700',
}

export const DEFAULT_VJML_RENDER_OPTIONS: VjmlRenderOptions = {
  breakpoint: '480px',
  fonts: { ...DEFAULT_VJML_FONTS },
  minify: false,
  mode: 'poc',
  validation: 'warn',
}

export const VJML_COMPONENT_NAME_EXAMPLES = {
  mjml: toVjmlComponentName('mjml'),
  'mj-body': toVjmlComponentName('mj-body'),
  'mj-section': toVjmlComponentName('mj-section'),
  'mj-text': toVjmlComponentName('mj-text'),
  'mj-html-attribute': toVjmlComponentName('mj-html-attribute'),
}

function capitalizeSegment(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export function toVjmlComponentBaseName(tagName: string): string {
  const normalizedTagName = tagName.trim().toLowerCase()

  if (!normalizedTagName) {
    return ''
  }

  if (normalizedTagName === 'mjml') {
    return 'Mjml'
  }

  const strippedNamespace = normalizedTagName.startsWith('mj-')
    ? normalizedTagName.slice(3)
    : normalizedTagName

  return strippedNamespace
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .map(capitalizeSegment)
    .join('')
}

export function toVjmlComponentName(
  tagName: string,
  prefix = DEFAULT_VJML_PREFIX,
): string {
  return `${prefix}${toVjmlComponentBaseName(tagName)}`
}

export function resolveVjmlRenderOptions(
  options: Partial<VjmlRenderOptions> = {},
): VjmlRenderOptions {
  return {
    breakpoint: options.breakpoint ?? DEFAULT_VJML_RENDER_OPTIONS.breakpoint,
    fonts: {
      ...DEFAULT_VJML_FONTS,
      ...(options.fonts ?? {}),
    },
    minify: options.minify ?? DEFAULT_VJML_RENDER_OPTIONS.minify,
    mode: options.mode ?? DEFAULT_VJML_RENDER_OPTIONS.mode,
    validation: options.validation ?? DEFAULT_VJML_RENDER_OPTIONS.validation,
  }
}

export function mergeVjmlRuntimeConfig(
  base: VjmlRuntimeConfigInput | Partial<VjmlRuntimeConfig> = {},
  overrides: VjmlRuntimeConfigInput = {},
): VjmlRuntimeConfig {
  return {
    prefix: overrides.prefix ?? base.prefix ?? DEFAULT_VJML_PREFIX,
    render: resolveVjmlRenderOptions({
      ...(base.render ?? {}),
      ...(overrides.render ?? {}),
      fonts: {
        ...(base.render?.fonts ?? {}),
        ...(overrides.render?.fonts ?? {}),
      },
    }),
  }
}

export function resolveVjmlRuntimeConfig(
  options: VjmlRuntimeConfigInput = {},
): VjmlRuntimeConfig {
  return mergeVjmlRuntimeConfig({}, options)
}