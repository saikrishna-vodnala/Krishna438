const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {Users} = require('./utils/users');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('New user connected');

	// Task
	// var cad;
	// const axios = require('axios');

	// var url = `http://api.fixer.io/latest?base=USD`;
	// axios.get(url).then((response) => {
	// 	cad = response.data.rates.CAD;
	// 	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app' + cad));
	// }).catch((e) => {
	// 	if (e.code === 'ENOTFOUND') {
	// 		console.log('Unable to connect to API servers.');
	// 	} else {
	// 		console.log(e.message);
	// 	}
	// });

	

	socket.on('join', (params, callback) => {
	  if (!isRealString(params.name) || !isRealString(params.room)) {
	    return callback('Name and room name are required.');
	  }

	socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    callback();
  });
     
     // Task(conversion)

	// socket.on('createMessage', (message, callback) => {
	// 	io.emit('newMessage', generateMessage(message.from, message.text));
	// 	io.emit('newMessage', generateMessage('Admin', message.text * cad));
	// 	callback();
	// });

	socket.on('createMessage', (message, callback) => {
		var user = users.getUser(socket.id);
		//console.log(user);

		if(user && isRealString(message.text)) {
			 io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
		}
	   
	    callback();
	  });
	socket.on('createLocationMessage', (coords) => {
		var user = users.getUser(socket.id);
       
       if(user){
		io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
	   }
	});

	socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});

server.listen(port, () => {
	console.log(`Server is up on ${port}`);
});