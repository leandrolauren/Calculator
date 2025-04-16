'use server'

import Cookies from 'js-cookie'
import axios from 'axios'

const user = process.env.API_USERNAME || ''
const password = process.env.API_PASSWORD || ''

if (!user || !password) {
  throw new Error(
    'API_USERNAME or API_PASSWORD is not defined in the environment variables.',
  )
}

let refreshingToken = false
let subscribers: ((token: string) => void)[] = []

const onTokenRefreshed = (newToken: string) => {
  subscribers.forEach((callback) => callback(newToken))
  subscribers = []
}

const addSubscriber = (callback: (token: string) => void) => {
  subscribers.push(callback)
}

const refreshToken = async () => {
  try {
    const res = await axios.post(
      'https://cotacao.onrender.com/refresh-token',
      {},
      {
        withCredentials: true,
      },
    )
    const { access_token } = res.data
    Cookies.set('authToken', access_token, { expires: 0.25 }) // 15 minutes
    onTokenRefreshed(access_token)
    return access_token
  } catch (error) {
    console.error('Error refreshing token:', error)
    throw new Error('Unable to refresh token')
  }
}

const getToken = async () => {
  const token = Cookies.get('authToken')

  if (!token) {
    throw new Error('User is not authenticated')
  }

  const tokenExpiration = Cookies.get('authTokenExpiration')
  const now = new Date().getTime()

  if (tokenExpiration && now > parseInt(tokenExpiration, 10)) {
    if (!refreshingToken) {
      refreshingToken = true
      try {
        const newToken = await refreshToken()
        refreshingToken = false
        return newToken
      } catch (error) {
        refreshingToken = false
        throw error
      }
    }

    return new Promise<string>((resolve, reject) => {
      addSubscriber((newToken) => resolve(newToken))
    })
  }

  return token
}

export default getToken
