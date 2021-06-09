import { api } from 'boot/axios'
import { LocalStorage } from 'quasar'
import {
  USER_CREDENTIALS_REQUEST,
  USER_CREDENTIALS_SUCCESS,
  USER_CREDENTIALS_FAILURE
} from '../mutation-types/userContants'
import { handle } from '../../utils/handle_promise'

// Get authenticated user on refresh page
export async function me ({ commit }) {
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
    const [userData, userError] = await handle(api.get('/me'))

    if (userError) {
      return commit({
        type: USER_CREDENTIALS_FAILURE,
        error: userError.response
      })
    }

    const { data } = userData
    
    LocalStorage.set('user', data)
    
    user = data
  }

  commit({
    type: USER_CREDENTIALS_SUCCESS,
    user
  })
}

// Log user in
export async function login ({ commit }, payload) {
  const { email, password } = payload

  commit({
    type: USER_CREDENTIALS_REQUEST
  })

  const [userData, userError] = await handle(
    api.post('/authentication', {
      strategy: 'local',
      email,
      password
    })
  )

  if (userError) {
    return commit({
      type: USER_CREDENTIALS_FAILURE,
      error: userError.response
    })
  }

  const { user, accessToken } = userData.data

  LocalStorage.set('user', user)
  LocalStorage.set('accessToken', accessToken)

  commit({
    type: USER_CREDENTIALS_SUCCESS,
    user
  })
}

// Register user
export async function register ({ commit }, payload) {
  const { username, email, password, rePassword, user_avatar } = payload

  const formData = new FormData()
  formData.append('username', username)
  formData.append('email', email)
  formData.append('password', password)
  formData.append('rePassword', rePassword)
  formData.append('user_avatar', user_avatar)

  commit({
    type: USER_CREDENTIALS_REQUEST
  })

  // Register
  const [userDataRegister, userErrorRegister] = await handle(
    api.post('/users', formData)
  )

  if (userErrorRegister) {
    return commit({
      type: USER_CREDENTIALS_FAILURE,
      error: userErrorRegister.response
    })
  }

  // Login
  const [userData, userError] = await handle(
    api.post('/authentication', {
      strategy: 'local',
      email,
      password
    })
  )

  if (userError) {
    return commit({
      type: USER_CREDENTIALS_FAILURE,
      error: userError.response
    })
  }

  const { user, accessToken } = userData.data

  LocalStorage.set('user', user)
  LocalStorage.set('accessToken', accessToken)

  commit({
    type: USER_CREDENTIALS_SUCCESS,
    user
  })
}
