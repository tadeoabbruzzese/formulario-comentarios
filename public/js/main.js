console.log(document.querySelector('title').textContent)

const socket = io.connect()

socket.on('nombre', data => {
    console.log(data)
})

socket.on('array-objetos', data => {
    console.log(data)
})

socket.on('pescar', data => {
    console.log(data)
})


// ------------------------------------------

socket.on('mensajes', data => {
    console.log(data)
    render(data)
})

// ------------------------------------------
// Gestion de carga de texto de los chat

// ----------------------------------------------

// Renderizado de los mensajes recibidos

function render(data) {
    let html = data.map(msj => {
        return(`
            <div>
                <strong>${msj.usuario}</strong>
                <em>${msj.mensaje}</em>
            </div>

        `)
    }).join(' ')
    document.querySelector('.mensajes').innerHTML = html
}
// -----------------------------------------------

function agregarMensaje(e) {
    e.preventDefault()
    const usuario = document.querySelector('#lbl-usuario').value
    const mensaje = document.querySelector('#lbl-mensaje').value

    const obj = {
        usuario: usuario.value,
        mensaje: mensaje.value
    }

    socket.emit('nuevo-comentario', obj)

    usuario.value = ''
    mensaje.value = ''
}

const btn = document.querySelector('#btn')

btn.addEventListener('click', agregarMensaje)

