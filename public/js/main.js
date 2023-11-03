console.log(document.querySelector('title').textContent)

// Creando un cliente

const socket = io.connect()

socket.on('nombre', data => {
    console.log(data)
})

socket.on('pescar', data => {
    console.log(data)
})

socket.on('array-objetos', data => {
    console.log(data)
})

// -----------------------------

socket.on('mensajes', data => {
    console.log(data)
    render(data)
})

// -----------------------------

// Renderizado de los mensajes recibidos

function render(data) {
    let html = data.map(msj => {
        return ( `
            <div>
                <strong>${msj.usuario}</strong>:
                <em>${msj.mensaje}</em>
            </div>
        `)
    }).join(' ')
    document.querySelector('.mensajes').innerHTML = html
}


// -----------------------------
// Gestion de carga de textos de los chats

function agregarMensaje(e) {
    e.preventDefault()

    const usuario = document.querySelector('#lbl-usuario')
    const mensaje = document.querySelector('#lbl-mensaje')

    const obj = {
        usuario: usuario.value, // 'Maxi'
        mensaje: mensaje.value // 'Hola que tal...'
    }

    socket.emit('nuevo-comentario', obj)

    usuario.value = ''
    mensaje.value = ''
}

const btn = document.querySelector('#btn')
btn.addEventListener('click', agregarMensaje)