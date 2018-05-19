import Server from 'socket.io'

export default function startServer () {
  const io = new Server().attach(3002)
}