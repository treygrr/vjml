export interface VjmlParsedWidth {
  parsedWidth: number
  unit: '%' | 'px'
}

export interface VjmlWidthParserOptions {
  parseFloatToInt?: boolean
}

const WIDTH_PATTERN = /^([\d.]+)(px|%)$/i

function normalizeNumericValue(value: number): string {
  return Number.isInteger(value) ? String(value) : `${value}`
}

export function widthParser(
  width: string,
  options: VjmlWidthParserOptions = {},
): VjmlParsedWidth {
  const normalizedWidth = width.trim()
  const match = normalizedWidth.match(WIDTH_PATTERN)

  if (!match) {
    throw new Error(
      `Invalid width value '${width}'. Expected a numeric value followed by px or %.`,
    )
  }

  const rawWidth = match[1]
  const rawUnit = match[2]

  if (!rawWidth || !rawUnit) {
    throw new Error(`Unable to parse width value '${width}'.`)
  }

  const unit = rawUnit.toLowerCase() as VjmlParsedWidth['unit']
  const parsedWidth
    = options.parseFloatToInt === false || unit === '%'
      ? Number.parseFloat(rawWidth)
      : Number.parseInt(rawWidth, 10)

  if (Number.isNaN(parsedWidth)) {
    throw new TypeError(`Unable to parse width value '${width}'.`)
  }

  return {
    parsedWidth,
    unit,
  }
}

export function parseVjmlWidth(
  width: string,
  options: VjmlWidthParserOptions = {},
): VjmlParsedWidth {
  return widthParser(width, options)
}

export function makeLowerBreakpoint(breakpoint: string): string {
  const { parsedWidth, unit } = widthParser(breakpoint, {
    parseFloatToInt: false,
  })

  return `${normalizeNumericValue(Math.max(0, parsedWidth - 1))}${unit}`
}
