const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express()

const server = http.createServer(app);
//socket io requires reference to server, 
//if we leave express to create implicit server then we will not have 
//reference to the server.
//hence we first need to create an explicit server
//and pass it to socketio
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));
let totalClients = 0;

//we need client side changes as well to make connection.
io.on('connection', (socket) => {
    console.log("New websocket connection");
    socket.emit('message', 'Welcome');
    totalClients++;
    socket.emit('message', `Welcome client# ${totalClients}`);
    let count = 1;
    setInterval(() => socket.emit("message", `Message #${count++}`), 10000);
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('sendMessage', (message) => {
        io.emit('message', message);//to send message to all connected sockets.
    })
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})
