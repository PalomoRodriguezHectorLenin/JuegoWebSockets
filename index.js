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

app.get('/', function(req, res){
    res.sendFile(__dirname + 'index.htlm');
})

io.on('connection', (socket)=>{
    console.log('Nueva conexión:', socket.id);

    socket.on('chat:message', (data)=>{
        io.sockets.emit('chat:message', data);
    });
    socket.on('chat:typing', (data)=>{
        socket.broadcast.emit('chat:typing', data);
    });

    socket.on('disconnect', function(){
        console.log("Se desconecto: %s", socket.id);
    })
});
