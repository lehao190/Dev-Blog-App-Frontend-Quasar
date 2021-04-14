import { api } from 'boot/axios'

export async function login ({ commit }, payload) {
  const { email, password } = payload

  const { data } = await api.post(
    '/login',
    {
      email,
      password
    },
    {
      withCredentials: true
    }
  )

  commit({
    type: 'login',
    data
  })
}
