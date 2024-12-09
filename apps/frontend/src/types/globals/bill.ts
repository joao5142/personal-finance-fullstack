import { AvatarTypes } from '@/constants/avatars'

export interface IBill {
  company: {
    name: string
    avatar: AvatarTypes
  }
  dueDate: string
  amount: number
  status: 'paid' | 'pending'
}
