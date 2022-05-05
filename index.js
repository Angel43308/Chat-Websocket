const path = require('path');
const express = require('express');

const app = express();

//settings
app.set('port', process.env.PORT || 3000);

// static files
app.use(express.static(path.join(__dirname, 'public')));

//start the servert
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

//websockets
const SocketIO = require('socket.io');
const io = SocketIO(server);

//establece la conexion del nuevo usuario
io.on('connection', (socket) => {
    console.log('nuevo usuario:', socket.id);

    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data);
    })

    socket.on('chat:typing', (data) =>{
        socket.broadcast.emit('chat:typing', data);
    })
});

