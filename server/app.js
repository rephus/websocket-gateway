var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var config = require('./config.json'); 

const port = config.port || 8000; 
const APP_TOKEN = config.token;

app.use(express.static('public'));

var slaves = [] ; 
var frontends = []; 

const notify = (sockets, message) => {
    sockets.forEach((s) => {
        s.emit('event', message); 
    });
}
const removeSocket = (sockets, socket) => {
    return sockets.filter(function(s) { 
        return s.id !== socket.id
    })
}
io.on('connection', function(socket) {
	console.log('Client connected', socket.handshake.query);
    if (socket.handshake.query.frontend) {
        frontends.push(socket);
        socket.emit('event', { 'status': 'connected', 'size': slaves.length}); 

        socket.on('disconnect', function () {
            frontends = removeSocket(frontends, socket)
        })
    } else {
        slaves.push(socket); 
        notify(frontends,  { 'status': 'connected', 'size': slaves.length}); 
        
        socket.on('disconnect', function () {
            console.log('slave disconnected');
            slaves = removeSocket(slaves, socket)
            notify(frontends,  { 'status': 'disconnected', 'size': slaves.length}); 
        });
    }
});

app.get('/send', function(req, res) {
    const token = req.query.token;
    console.log('Got request with token ' + token); 
    if (token != APP_TOKEN) {
        res.status(403).send({'error': 'invalid token'}); 
    } else {
        res.status(200).send({'success': true});
        notify(slaves, 'button !'); 
    }
   
});
  
server.listen(port, function() {
	console.log('Server running in http://localhost:'+port);
});
