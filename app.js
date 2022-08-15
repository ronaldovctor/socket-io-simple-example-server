const express = require('express')
const { cwd } = require('process')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http,{cors: {
    origin: 'http://localhost:4200'
}})

io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} has connected!`)

    socket.on('message', (msg) => {
        console.log(msg)
        io.emit('message', msg)
    })

    let sub = setInterval(() => {
        io.to(socket.id).emit('message', { from: 'Server', message: 'This is a message from Server!'})
    }, 2000)

    socket.on('disconnect', () => {
        clearInterval(sub);
        console.log(`Socket ${socket.id} has just disconnected!`)
    })
})

http.listen(4444, () => {
    console.log('Listening on port 4444!')
})