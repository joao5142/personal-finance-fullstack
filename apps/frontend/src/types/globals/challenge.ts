import { ColorTypes } from '@/theme'

export interface IChallenge {
  id: string
  spent: number
  total: number
  target: number
  endsAt: string
  createdAt: string
  maxMoneyToAdd: number
  type: 'weekly' | 'monthly'
  theme: ColorTypes
}
