const express = require('express')
const { createServer } = require('node:http')
const path = require('node:path')
const { join } = require('node:path')
const { Server } = require('socket.io')


const app = express()
const server = createServer(app)
const io = new Server(server)

const users = {}

app.use(express.static(path.join(__dirname, 'bin')))


io.on('connection', (socket) =>{
    console.log('User connected')

    // socket.on('new-user', name => {
    //     users[socket.id] = name
    //     console.log('info: ' + name + ' connected')
    //     socket.broadcast.emit('user-connected', name)
    // })

    // socket.on('chat message', (msg) => {
    //     console.log('message: ' + msg)
        
    //     io.emit('chat message', msg)
    // })

    socket.on('new-user', (userData, msg) =>{
        const message = {
            user: userData,
            text: msg
        }
        io.emit('chat message', message)
    })


})

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});