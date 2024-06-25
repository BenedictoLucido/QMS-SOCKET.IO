const socket = io('http://192.168.137.1:8080');

// Load the notification sound
const notificationSound = new Audio('./notification.wav');


socket.on('client_called', text => {
    console.log('Received message:', text); // Debug log
    // Create and append the new message to the list
    const el = document.createElement('li');
    el.innerHTML = text;
    document.querySelector('ul').appendChild(el);

    // Play the notification sound
    notificationSound.play().then(() => {
        console.log('Notification sound played successfully'); // Debug log
    }).catch(error => {
        console.error('Error playing notification sound:', error); // Debug log
    });
});

document.querySelector('button').onclick = () => {
    console.log("test")
    const text = document.querySelector('input').value;
    socket.emit('client_called', text);
};

// Regular Websockets

// const socket = new WebSocket('ws://localhost:8080');

// // Listen for messages
// socket.onmessage = ({ data }) => {
//     console.log('Message from server ', data);
// };

// document.querySelector('button').onclick = () => {
//     socket.send('hello');
// };
