//because we are loading socket.io first in index.html
var socket = io({ transports: ['websocket'] });


socket.on('message', (message) => {
    console.log(message);
})
document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()

    const message = e.target.elements.message.value
    socket.emit('sendMessage', message);
})