import { io } from 'socket.io-client'

// "undefined" means the URL will be computed from the `window.location` object

const socket = io(`${UMI_API_URL}`, {
  autoConnect: true,
})

export default socket
