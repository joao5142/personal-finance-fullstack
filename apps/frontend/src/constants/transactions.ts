export const TRANSACTIONS_CATEGORIES = {
  all: {
    label: 'All Transactions',
    value: 'all',
  },
  entertainment: {
    label: 'Entertainment',
    value: 'entertainment',
  },
  bills: {
    label: 'Bills',
    value: 'bills',
  },
  groceries: {
    label: 'Groceries',
    value: 'groceries',
  },
  dining_out: {
    label: 'Dining Out',
    value: 'dining_out',
  },
  transportation: {
    label: 'Transportation',
    value: 'transportation',
  },
  personal_care: {
    label: 'Personal Care',
    value: 'personal_care',
  },
  education: {
    label: 'Education',
    value: 'education',
  },
  lifestyle: {
    label: 'LifeStyle',
    value: 'lifestyle',
  },
  shopping: {
    label: 'Shopping',
    value: 'shopping',
  },
  general: {
    label: 'General',
    value: 'general',
  },
} as const

export type TransactionCategoryValueTypes = keyof typeof TRANSACTIONS_CATEGORIES

export const TRANSACTION_CATEGORIES_VALUES = Object.keys(TRANSACTIONS_CATEGORIES)
