const socket = io('http://localhost:3000')
const messageContainer = document.querySelector('.message-container')
const messageForm = document.querySelector('.send-container')
const messageInput = document.querySelector('.message-input')
const chat = document.querySelector('.chat')

// Change username for the chat.
document.querySelector(".userBtn").addEventListener("click", setName);
document.querySelector(".displayUser").innerHTML = "username: " + name;
function setName() {
  name = prompt('Choose your username: ');
  location.reload();
}

// Userr connect/disconnect.
socket.emit('new-user', name)
socket.on('chat-message', data => {
  appendMessageTwo(`${data.name}: ${data.message}`)
})
socket.on('user-connected', name => {
  appendMessageBot(`${name} connected`)
})
socket.on('user-disconnected', name => {
  appendMessageBot(`${name} disconnected`)
})

// Messages.
messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

// The users message, (adds class .messageMe).
function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.className = 'messageMe';
  messageElement.innerText = message;
  messageContainer.append(messageElement)
  chat.scrollTop = chat.scrollHeight;
}

// The "others" message, (adds class .messageYou).
function appendMessageTwo(message) {
  const messageElement = document.createElement('div')
  messageElement.className = 'messageYou';
  messageElement.innerText = message;
  messageContainer.append(messageElement)
  chat.scrollTop = chat.scrollHeight;
}

// Shows message from "bot" if someone disc/connect.
function appendMessageBot(message) {
  const messageElement = document.createElement('div')
  messageElement.className = 'bot';
  messageElement.innerText = message;
  messageContainer.append(messageElement)
  chat.scrollTop = chat.scrollHeight;
}

