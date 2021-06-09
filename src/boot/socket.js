import Vue from 'vue'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'

// const socket = io('http://172.28.104.221:3030')
const socket = io('http://localhost:3030')
const app = feathers()

// Set up Socket.io client with the socket
app.configure(socketio(socket))

socket.on('connect', () => {
  console.log('User Connected to server: ', socket.connected)
})

socket.on('disconnect', () => {
  console.log('User Disconnected to server: ', socket.connected)
})

Vue.prototype.$socket = socket
Vue.prototype.$socketApp = app

export { socket, app }
