const socketServer = 'http://localhost:6333'

console.log('Connecting to socket '+ socketServer); 
var socket = require('socket.io-client')(socketServer, {'slave': true});

socket.on('connect', function(){
	console.log('Client connected');
});
socket.on('event', function(data){
	console.log('received event ', data); 
});
socket.on('disconnect', function(){
	console.log('Client disconnected');
});