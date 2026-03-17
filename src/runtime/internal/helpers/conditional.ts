export const startConditionalTag = '<!--[if mso | IE]>'
export const startMsoConditionalTag = '<!--[if mso]>'
export const endConditionalTag = '<![endif]-->'
export const startNegationConditionalTag = '<!--[if !mso | IE]><!-->'
export const startMsoNegationConditionalTag = '<!--[if !mso]><!-->'
export const endNegationConditionalTag = '<!--<![endif]-->'

export function conditionalTag(content: string, negation = false): string {
  return [
    negation ? startNegationConditionalTag : startConditionalTag,
    content,
    negation ? endNegationConditionalTag : endConditionalTag,
  ].join('\n')
}

export function msoConditionalTag(content: string, negation = false): string {
  return [
    negation ? startMsoNegationConditionalTag : startMsoConditionalTag,
    content,
    negation ? endNegationConditionalTag : endConditionalTag,
  ].join('\n')
}

export function mergeOutlookConditionals(content: string): string {
  return content.replace(/(<!\[endif\]-->\s*<!--\[if mso \| IE\]>)/g, '')
}

export function minifyOutlookConditionals(content: string): string {
  return content.replace(
    /(<!--\[if\s[^\]]+\]>)([\s\S]*?)(<!\[endif\]-->)/g,
    (_match, prefix: string, conditionalContent: string, suffix: string) => {
      const processedContent = conditionalContent
        .replace(/(^|>)(\s+)(<|$)/gm, (_innerMatch, start: string, _space: string, end: string) => `${start}${end}`)
        .replace(/\s{2,}/g, ' ')

      return `${prefix}${processedContent}${suffix}`
    },
  )
}
