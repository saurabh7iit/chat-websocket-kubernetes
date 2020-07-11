//because we are loading socket.io first in index.html
var socket = io({ transports: ['websocket'] });
// socket.on('countUpdated', (count) => {
//     console.log("The count has been updated!", count);
// })

// document.querySelector('#increment').addEventListener('click',
// () => {
//     console.log('Clicked');
//     socket.emit('increment');
// })

socket.on('message', (message) => {
    console.log(message);
})