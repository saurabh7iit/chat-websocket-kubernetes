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

let count = 0;
//we need client side changes as well to make connection.
io.on('connection', (socket) => {
    console.log("New websocket connection");
    socket.emit('countUpdated', count); 
    //emit(eventName, object)
    //listen to event here
    socket.on('increment', () => {
        count++;
        //socket.emit('countUpdated', count);
        //this is sending event to only one connection

        io.emit('countUpdated', count);//this will be a global event
    })
})
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})
