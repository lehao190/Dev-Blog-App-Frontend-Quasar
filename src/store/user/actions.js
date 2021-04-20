import { api } from 'boot/axios'
import { LocalStorage } from 'quasar'
import { USER_CREDENTIALS_REQUEST, USER_CREDENTIALS_SUCCESS, USER_CREDENTIALS_FAILURE } from '../mutation-types/userContants'

// Get authenticated user on refresh page
export async function me ({ commit }) {
  try {
    const hashURL = window.location.hash.split('#/#access_token=')

    if (hashURL[1]) {
      const accessToken = hashURL[1]

      LocalStorage.set('accessToken', accessToken)
    }

    // Make Request
    commit({
      type: 'userRequest'
    })

    const { data: user } = await api.get('/me')

    // Request Success
    commit({
      type: 'me',
      user
    })
  } catch (error) {
    // Error if any
    commit({
      type: 'userError',
      error: error.response
    })
  }
}

// Log user in
export async function login ({ commit }, payload) {
  const { email, password } = payload

  const { data } = await api.post('/authentication', {
    strategy: 'local',
    email,
    password
  })

  commit({
    type: 'login',
    data
  })
}
