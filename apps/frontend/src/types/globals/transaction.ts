import { AvatarTypes } from '@/constants/avatars'
import { CATEGORIES_VALUES, CategoryValueTypes } from '@/constants/categories'

export interface ITransaction {
  recipientOrSender: {
    name: string
    avatar: AvatarTypes
  }
  category: CategoryValueTypes
  date: string
  value: number
  type: 'withdraw' | 'deposit'
}
