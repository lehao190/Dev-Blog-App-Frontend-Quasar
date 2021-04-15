import { api } from 'boot/axios'

export async function me ({ commit }) {
  const { data } = await api.get('/me')
  
  commit({
    type: 'me',
    data
  })
}

export async function login ({ commit }, payload) {
  const { email, password } = payload

  const { data } = await api.post(
    '/login',
    {
      email,
      password
    }
  )

  commit({
    type: 'login',
    data
  })
}
