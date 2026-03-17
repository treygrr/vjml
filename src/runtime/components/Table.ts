import { h } from 'vue'

import { requireVjmlComponentMetadata } from '../internal/componentMetadata'
import { renderVjmlContentNodes } from '../internal/content'
import { createVjmlComponent } from '../internal/factory'
import { widthParser } from '../internal/helpers/measurements'

const metadata = requireVjmlComponentMetadata('mj-table')

function hasCellspacing(value: string | undefined): boolean {
  if (!value) {
    return false
  }

  const numericValue = Number.parseFloat(value.replace(/[^\d.]/g, ''))

  return !Number.isNaN(numericValue) && numericValue > 0
}

function getTableWidth(width: string): number | string {
  if (width === 'auto') {
    return width
  }

  const parsedWidth = widthParser(width)

  return parsedWidth.unit === '%' ? width : parsedWidth.parsedWidth
}

export default createVjmlComponent(metadata, {
  name: 'VjmlTable',
  render({ attrs, content }) {
    return h('table', {
      border: '0',
      cellpadding: attrs.cellpadding,
      cellspacing: attrs.cellspacing,
      role: attrs.role,
      style: {
        'border': attrs.border,
        'border-collapse': hasCellspacing(attrs.cellspacing)
          ? 'separate'
          : undefined,
        'color': attrs.color,
        'font-family': attrs['font-family'],
        'font-size': attrs['font-size'],
        'line-height': attrs['line-height'],
        'table-layout': attrs['table-layout'],
        'width': attrs.width,
      },
      width: getTableWidth(attrs.width ?? '100%'),
    }, renderVjmlContentNodes(content))
  },
})
