import { CategoryValueTypes } from '@/constants/categories'
import { ColorTypes } from '@/theme'

export interface IPot {
  spent: number
  total: number
  target: number
  category: CategoryValueTypes
  date: string
  theme: ColorTypes
}
