import express from 'express'
import 'dotenv/config'
import path from 'node:path'
import { Server } from "socket.io";
import { createServer } from 'node:http';

// ! Configuración
const PORT = process.env.PORT
const app = express()
const server = createServer(app);
const io = new Server(server);

// ! Middleware
app.use(express.static(path.join('public')))

let usuarioConectado = 0

const mensajes = [
    { usuario: 'Tadeo', mensaje: 'Hola! Qué tal!'},
    { usuario: 'Paula', mensaje: 'Muy bien! y vos?'},
    { usuario: 'Rodrigo', mensaje: 'Genial!'}
]

// Socket.io
// Escucho cuando un cliente se conecte
io.on('connection', (socket) => {
    //console.log(socket)
    console.log('Un cliente se ha conectado: ', socket.id)
    usuarioConectado++
    console.log(usuarioConectado)
    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id)
        usuarioConectado--
        console.log(usuarioConectado)
    })

    // Emitir un mensaje desde el server
    socket.emit('nombre', 'Maximiliano')
    socket.emit('pescar', 'viernes')
    socket.emit('array-objetos', [{id: 1}, {id: 2}, {id: 3}, {id: 4}])

    // Recibiendo la información del formulario
    socket.on('nuevo-comentario', data => {
        console.log(data)
        mensajes.push(data)
        io.sockets.emit('mensajes', mensajes)
    })

    // Emito los mensajes para llenar el chat
    socket.emit('mensajes', mensajes)
    

})

server.listen(PORT, () => {
    console.log(`Servidor corriendo http://localhost:${PORT}`)
})