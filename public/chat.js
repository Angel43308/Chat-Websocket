//npm run dev (en la terminal para correr el sv)
const socket = io()

//DOM elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

//desactiva la caja de texto donde se introducen los usuarios
function desactivarcaja(){
document.getElementById('username').disabled=true
}

//Este evento es de la funcion del boton que al detectar el click envia el mensaje
btn.addEventListener('click', function (){
    socket.emit('chat:message', {
        message: message.value,
        username: username.value
    });
    message.value=""; //Limpia el recuadro de texto al mandar el mensaje
});

//
message.addEventListener('keypress', function (){
    socket.emit('chat:typing', username.value);
})

//Esta funcion agrega los mensajes junto con el nombre de usuario
socket.on('chat:message', function (data) {
    actions.innerHTML = '';
    output.innerHTML += `<p>
    <strong>${data.username}</strong>: ${data.message}
    </p>`
});

//Este evento se realiza cuando detecta que un usuario esta escribiendo un mensaje
socket.on('chat:typing', function (data) {
    actions.innerHTML = `<p><em>${data} esta escribiendo... </em></p>`
})