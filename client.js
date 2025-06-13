const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container"); // updated selector
var audio = new Audio('good_sound.wav');

// Append function to add messages to the container
const append = (message, position) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message', position);
  messageContainer.append(messageElement);
  if(position == 'left'){
      audio.play(); 
  }
};

// Ask user for their name
const userName = prompt("Enter your name to join");
socket.emit('new-user-joined', userName);

// When a new user joins
socket.on('user-joined', name => {
  append(`${name} joined the chat`, 'left');
});

// When a message is received
socket.on('receive', data => {
  append(`${data.name}: ${data.message}`, 'left');
});

socket.on('left', name => {
  append(`${name} left the chat`, 'left');
});


// 🛠️ FIX: Submit handler to send message
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, 'right');
  socket.emit('send', message);
  messageInput.value = '';
});
