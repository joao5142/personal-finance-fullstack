import { AvatarTypes } from '@/constants/avatars'
import {
  TRANSACTION_CATEGORIES_VALUES,
  TransactionCategoryValueTypes,
} from '@/constants/transactions'

export interface ITransaction {
  recipientOrSender: {
    name: string
    avatar: AvatarTypes
  }
  category: TransactionCategoryValueTypes
  date: string
  value: number
  type: 'withdraw' | 'deposit'
}
