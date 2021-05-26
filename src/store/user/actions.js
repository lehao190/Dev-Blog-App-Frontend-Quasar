import { api } from 'boot/axios'
import { LocalStorage } from 'quasar'
import {
  USER_CREDENTIALS_REQUEST,
  USER_CREDENTIALS_SUCCESS,
  USER_CREDENTIALS_FAILURE
} from '../mutation-types/userContants'

// Get authenticated user on refresh page
export async function me ({ commit }) {
  try {
    const hashURL = window.location.hash.split('#/#access_token=')

    // Save access token to LocalStorage only for Oauth Authentication
    if (hashURL[1]) {
      const accessToken = hashURL[1]

      LocalStorage.set('accessToken', accessToken)
    }
    
    commit({
      type: USER_CREDENTIALS_REQUEST
    })

    let user = LocalStorage.getItem('user')

    if (!user || user === null || user === undefined) {
      const { data } = await api.get('/me')

      LocalStorage.set('user', data)

      user = data
    }

    commit({
      type: USER_CREDENTIALS_SUCCESS,
      user
    })
  } catch (error) {
    commit({
      type: USER_CREDENTIALS_FAILURE,
      error: error.response
    })
  }
}

// Log user in
export async function login ({ commit }, payload) {
  try {
    const { email, password } = payload

    commit({
      type: USER_CREDENTIALS_REQUEST
    })

    const { data } = await api.post('/authentication', {
      strategy: 'local',
      email,
      password
    })

    const { user } = data
    
    LocalStorage.set('user', user)
    LocalStorage.set('accessToken', data.accessToken)

    commit({
      type: USER_CREDENTIALS_SUCCESS,
      user
    })
  } catch (error) {
    commit({
      type: USER_CREDENTIALS_FAILURE,
      error: error.response
    })
  }
}

// Register user
export async function register ({ commit }, payload) {
  try {
    const { email, password } = payload

    commit({
      type: USER_CREDENTIALS_REQUEST
    })

    const { data } = await api.post('/users', {
      email,
      password
    })

    const { user } = data

    LocalStorage.set('user', user)
    LocalStorage.set('accessToken', data.accessToken)

    commit({
      type: USER_CREDENTIALS_SUCCESS,
      user
    })
  } catch (error) {
    commit({
      type: USER_CREDENTIALS_FAILURE,
      error: error.response
    })
  }
}
