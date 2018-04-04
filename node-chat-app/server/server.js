const path = require('path'); //built-in module used for path joining
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
var app = express();

var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New User Connected');

	socket.emit('newMessage', {
		from: 'krishna@gmail.com',
		text: 'Hii sai',
		createdAt: 43234
	});

	socket.on('createMessage', (msg) => {
		console.log('Create Message', msg);
	});

	socket.on('disconnect', () => {
		console.log('User was disconnected');
	});
});

server.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});