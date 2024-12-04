import { AxiosError } from 'axios'
import { USER_COLLECTION } from '@/storage'

import { IUser } from '@/types/globals/user'

import api from '@/lib/api'

export const useUserStore = defineStore('user', () => {
  const token = ref()

  const user = ref<IUser | null>(null)

  if (typeof window !== 'undefined') {
    try {
      const storedUser: null | IUser = JSON.parse(localStorage.getItem(USER_COLLECTION)!)

      if (storedUser) {
        user.value = storedUser
      }
    } catch (err) {
      console.error(err)
    }
  }

  function setToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
    token.value = tokenValue
  }

  function setUser(userValue: any) {
    localStorage.setItem(USER_COLLECTION, JSON.stringify(userValue))
    user.value = userValue
  }

  async function checkToken() {
    try {
      const tokenBearer = 'Bearer ' + token.value
      const response = await api.get('/verify-token', {
        headers: {
          Authorization: tokenBearer,
        },
      })

      if (response.status === 200 && response.data.status) {
        setUser(response.data.decode)

        return true
      }
    } catch (error) {
      const err = error as AxiosError

      console.error(err)

      return false
    }
  }

  function logoutApp() {
    localStorage.removeItem('token')
    localStorage.removeItem(USER_COLLECTION)

    token.value = ''

    window.location.replace('/')
  }

  return {
    token,
    user,
    setToken,
    setUser,
    checkToken,
    logoutApp,
  }
})
