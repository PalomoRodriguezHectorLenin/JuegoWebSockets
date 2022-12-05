const path = require('path');
const express = require('express');
const app = express();
var server = require('http').createServer(app);

//settings
app.set('port', process.env.PORT || 3000);

//static files

app.use(express.static(path.join(__dirname, 'public')));

//Empezar el servidor
server.listen(app.get('port'), ()=>{
    console.log('server on port', app.get('port'));
})

//Se inicia la comunicación

const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection', (socket)=>{
    console.log('new connection', socket.id);

    var channel = 'canalA';

    socket.join(channel);

    socket.on('change channel', function(newChannel){
        socket.leave(channel);
        socket.join(newChannel);
        channel = newChannel;
        socket.emit('change channel', newChannel)
    })
    
    socket.on('chat:message', (data)=>{
        //io.sockets.emit('chat:message', data);
        io.sockets.in(channel).emit('chat:message', data);
    });
    socket.on('chat:typing', (data)=>{
        socket.broadcast.emit('chat:typing', data);
    });
});