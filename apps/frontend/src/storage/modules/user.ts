import { USER_COLLECTION, USER_THEME_COLLECTION } from '@/storage'

const collectionStoredName = `${USER_COLLECTION}`

export async function createNewUser(user: any) {
  try {
    await localStorage.setItem(collectionStoredName, user)
  } catch (error) {
    throw error
  }
}

export function getStoredUser() {
  try {
    const user = localStorage.getItem(collectionStoredName) || []

    return user
  } catch (error) {
    throw error
  }
}
