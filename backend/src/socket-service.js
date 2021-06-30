const io = require('socket.io')()

io.on('connect', socket => {
  socket.emit('hello world!')
})

module.exports = io
