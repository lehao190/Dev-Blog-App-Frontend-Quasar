import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

// const api = axios.create({ baseURL: 'http://172.28.103.241:3030', withCredentials: true })
const api = axios.create({ baseURL: 'http://localhost:3030', withCredentials: true })
Vue.prototype.$api = api

export { axios, api }
