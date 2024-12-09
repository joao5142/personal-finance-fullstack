export const colors = {
  beige: {
    500: '#98908b',
    100: '#f8f4f0',
  },
  grey: {
    900: '#201f24',
    500: '#696868',
    300: '#b3b3b3',
    100: '#f2f2f2',
  },
  green: '#277c78',
  yellow: '#f2cdac',
  cyan: '#82c9d7',
  navy: '#626070',
  red: '#c94736',
  purple: '#826cb0',
  'purple-2': '#af81ba',
  turquoise: '#597c7c',
  brown: '#93674f',
  magenta: '#934f6f',
  blue: '#3f82b2',
  'navy-grey': '#97a0ac',
  'army-green': '#7f9161',
  gold: '#cab361',
  orange: '#be6c49',
  white: '#ffffff',
} as const

const toTitleCase = (text: string): string => {
  return text
    .split(/[\s-]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

interface IColorValues {
  key: string
  value: string
  label: string
}

export const COLORS_VALUES = Object.entries(colors).flatMap((item: any) => {
  const [key, value] = item

  if (typeof value === 'object') {
    return Object.entries(value).map(([subKey, subValue]) => ({
      key: `${key}-${subKey}`,
      value: subValue,
      label: `${toTitleCase(key)} ${subKey}`,
    }))
  }
  return [{ key, value, label: toTitleCase(key) }]
}) as IColorValues[]

type BeigeVariants = `${'beige'}-${keyof (typeof colors)['beige']}`
type GreyVariants = `${'grey'}-${keyof (typeof colors)['grey']}`

export type ColorTypes = keyof typeof colors | BeigeVariants | GreyVariants
