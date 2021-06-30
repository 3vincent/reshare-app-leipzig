const io = require('socket.io')()

io.on('connect', socket => {
  socket.emit('hello world!')

  setInterval(() => {
    socket.emit('hello world!')
  }, 2000)

  socket.on('new message!', cb => {
    console.log('a new message was received!')
    cb('this is a response!')
  })
})

module.exports = io
