import type {
  VjmlBreakpointAwareValue,
  VjmlDocumentState,
} from '../context'

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function indentBlock(content: string, spaces = 4): string {
  const indent = ' '.repeat(spaces)

  return content
    .split('\n')
    .map(line => line.length > 0 ? `${indent}${line}` : line)
    .join('\n')
}

function renderBreakpointAwareValue(
  value: VjmlBreakpointAwareValue,
  breakpoint: string,
): string {
  return typeof value === 'function' ? value(breakpoint) : value
}

function filterDefinedStrings(values: Array<string | null | undefined>): string[] {
  return values.filter((value): value is string => typeof value === 'string' && value.length > 0)
}

function escapeHtmlText(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export function buildPreview(content: string): string {
  if (content === '') {
    return ''
  }

  return `<div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${escapeHtmlText(content)}</div>`
}

export function buildFontsTags(
  content: string,
  inlineStyle: readonly string[],
  fonts: Readonly<Record<string, string>> = {},
): string {
  const urlsToImport: string[] = []

  for (const [fontName, url] of Object.entries(fonts)) {
    const fontPattern = escapeRegExp(fontName)
    const htmlRegex = new RegExp(`"[^"]*font-family:[^"]*${fontPattern}[^"]*"`, 'im')
    const inlineRegex = new RegExp(`font-family:[^;}]*${fontPattern}`, 'im')

    if (
      htmlRegex.test(content)
      || inlineStyle.some(styleValue => inlineRegex.test(styleValue))
    ) {
      urlsToImport.push(url)
    }
  }

  if (urlsToImport.length === 0) {
    return ''
  }

  const linkTags = urlsToImport
    .map(url => `<link href="${url}" rel="stylesheet" type="text/css">`)
    .join('\n')
  const importRules = urlsToImport
    .map(url => `@import url(${url});`)
    .join('\n')

  return [
    '<!--[if !mso]><!-->',
    linkTags,
    '<style type="text/css">',
    importRules,
    '</style>',
    '<!--<![endif]-->',
  ].join('\n')
}

export function buildMediaQueriesTags(
  breakpoint: string,
  mediaQueries: Readonly<Record<string, string>> = {},
  options: {
    forceOWADesktop?: boolean
    printerSupport?: boolean
  } = {},
): string {
  const mediaQueryEntries = Object.entries(mediaQueries)

  if (mediaQueryEntries.length === 0) {
    return ''
  }

  const { forceOWADesktop = false, printerSupport = false } = options
  const baseMediaQueries = mediaQueryEntries.map(
    ([className, mediaQuery]) => `.${className} ${mediaQuery}`,
  )
  const thunderbirdMediaQueries = mediaQueryEntries.map(
    ([className, mediaQuery]) => `.moz-text-html .${className} ${mediaQuery}`,
  )
  const owaQueries = baseMediaQueries.map(mediaQuery => `[owa] ${mediaQuery}`)

  return filterDefinedStrings([
    [
      '<style type="text/css">',
      `@media only screen and (min-width:${breakpoint}) {`,
      ...baseMediaQueries,
      '}',
      '</style>',
    ].join('\n'),
    [
      `<style media="screen and (min-width:${breakpoint})">`,
      ...thunderbirdMediaQueries,
      '</style>',
    ].join('\n'),
    printerSupport
      ? [
          '<style type="text/css">',
          '@media only print {',
          ...baseMediaQueries,
          '}',
          '</style>',
        ].join('\n')
      : null,
    forceOWADesktop
      ? ['<style type="text/css">', ...owaQueries, '</style>'].join('\n')
      : null,
  ]).join('\n')
}

export function buildStyleFromComponents(
  breakpoint: string,
  componentsHeadStyles: readonly VjmlBreakpointAwareValue[],
  headStyles: Readonly<Record<string, VjmlBreakpointAwareValue>>,
): string {
  const collectedStyles = [
    ...componentsHeadStyles,
    ...Object.values(headStyles),
  ]

  if (collectedStyles.length === 0) {
    return ''
  }

  return [
    '<style type="text/css">',
    ...collectedStyles.map(styleValue => renderBreakpointAwareValue(styleValue, breakpoint)),
    '</style>',
  ].join('\n')
}

export function buildStyleFromTags(
  breakpoint: string,
  styles: readonly VjmlBreakpointAwareValue[],
): string {
  if (styles.length === 0) {
    return ''
  }

  return [
    '<style type="text/css">',
    ...styles.map(styleValue => renderBreakpointAwareValue(styleValue, breakpoint)),
    '</style>',
  ].join('\n')
}

export function buildVjmlDocumentHtml(
  content: string,
  documentState: VjmlDocumentState,
): string {
  const beforeDoctype = documentState.beforeDoctype.join('\n')
  const bodyStyle = `word-spacing:normal;${documentState.backgroundColor ? `background-color:${documentState.backgroundColor};` : ''}`
  const headBlocks = filterDefinedStrings([
    `<title>${documentState.title}</title>`,
    [
      '<!--[if !mso]><!-->',
      '<meta http-equiv="X-UA-Compatible" content="IE=edge">',
      '<!--<![endif]-->',
    ].join('\n'),
    '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    [
      '<style type="text/css">',
      '#outlook a { padding:0; }',
      'body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }',
      'table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }',
      'img { border:0;height:auto;line-height:100%;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }',
      'p { display:block;margin:13px 0; }',
      '</style>',
    ].join('\n'),
    [
      '<!--[if mso]>',
      '<noscript>',
      '<xml>',
      '<o:OfficeDocumentSettings>',
      '<o:AllowPNG/>',
      '<o:PixelsPerInch>96</o:PixelsPerInch>',
      '</o:OfficeDocumentSettings>',
      '</xml>',
      '</noscript>',
      '<![endif]-->',
    ].join('\n'),
    [
      '<!--[if lte mso 11]>',
      '<style type="text/css">',
      '.mj-outlook-group-fix { width:100% !important; }',
      '</style>',
      '<![endif]-->',
    ].join('\n'),
    buildFontsTags(content, documentState.inlineStyle, documentState.fonts),
    buildMediaQueriesTags(documentState.breakpoint, documentState.mediaQueries, {
      forceOWADesktop: documentState.forceOWADesktop,
      printerSupport: documentState.printerSupport,
    }),
    buildStyleFromComponents(
      documentState.breakpoint,
      documentState.componentsHeadStyle,
      documentState.headStyle,
    ),
    buildStyleFromTags(documentState.breakpoint, documentState.style),
    ...documentState.headRaw,
  ])
  const bodyBlocks = filterDefinedStrings([
    buildPreview(documentState.preview),
    content,
  ])

  return `${beforeDoctype ? `${beforeDoctype}\n` : ''}<!doctype html>
<html lang="${documentState.lang}" dir="${documentState.dir}" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
${headBlocks.map(block => indentBlock(block)).join('\n')}
  </head>
  <body style="${bodyStyle}">
${bodyBlocks.map(block => indentBlock(block)).join('\n')}
  </body>
</html>`
}
