var socket = io('192.168.1.73:3000/');

let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let acitons = document.getElementById('actions');


btn.addEventListener('click', function(){
	socket.emit('chat:message', {
		message: message.value,
		username: username.value
	})
})

message.addEventListener('keypress', function(){
	socket.emit('chat:typing', username.value);
});

socket.on('chat:message', function(data){
	acitons.innerHTML = '';
	output.innerHTML += `<p> 
		<strong>${data.username}</strong>: ${data.message}
	</p>`
});

socket.on('chat:score', function(score){
	actions.innerHTML = '';
	output.innerHTML += `<p>
	<strong>${data.username}</strong>: ${score}`
});

socket.on('chat:typing', function (data){
	actions.innerHTML = `<p><en>${data} está escribiendo...</en></p>`
});