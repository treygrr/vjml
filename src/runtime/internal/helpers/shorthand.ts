export type VjmlBoxSide = 'bottom' | 'left' | 'right' | 'top'

function parseBoxValue(value: string | undefined): number {
  if (!value) {
    return 0
  }

  const parsedValue = Number.parseInt(value, 10)

  return Number.isNaN(parsedValue) ? 0 : parsedValue
}

export function shorthandParser(value: string, direction: VjmlBoxSide): number {
  const values = value.trim().split(/\s+/).filter(Boolean)

  switch (values.length) {
    case 1:
      return parseBoxValue(values[0])
    case 2:
      return parseBoxValue(
        direction === 'top' || direction === 'bottom' ? values[0] : values[1],
      )
    case 3:
      return parseBoxValue(
        direction === 'top'
          ? values[0]
          : direction === 'bottom'
            ? values[2]
            : values[1],
      )
    default:
      return parseBoxValue(
        direction === 'top'
          ? values[0]
          : direction === 'right'
            ? values[1]
            : direction === 'bottom'
              ? values[2]
              : values[3],
      )
  }
}

export function borderParser(border: string): number {
  const match = border.match(/(\d+)/)

  return match?.[1] ? Number.parseInt(match[1], 10) : 0
}
