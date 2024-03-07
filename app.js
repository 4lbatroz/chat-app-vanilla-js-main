// @ts-nocheck
// lage en funksjon som kjører når send knappen blir trykket og kjører et krypterings verktøy basert på teksten som ble skrevet inn

function encryptDecrypt(text) {
  // Replace this with your encryption/decryption logic
  // For example, a simple Caesar cipher implementation
  const shift = 3; // You can change the shift value
  let result = '';

  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i);

    if (charCode >= 65 && charCode <= 90) {
      // Uppercase letters
      result += String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
    } else if (charCode >= 97 && charCode <= 122) {
      // Lowercase letters
      result += String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
    } else {
      // Non-alphabetic characters remain unchanged
      result += text.charAt(i);
    }
  }

  return result;

  console.log(`Original Message: ${inputText}`);
  console.log(`Encrypted Message: ${encryptedText}`);

}

const sendMessage = (e) => {
  e.preventDefault();

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  const message = {
    sender: messageSender,
    text: encryptDecrypt(chatInput.value), // Encrypt the chat input text
    timestamp,
  };

  /* Save message to local storage */
  messages.push(message);
  localStorage.setItem('messages', JSON.stringify(messages));

  /* Add message to DOM */
  chatMessages.innerHTML += createChatMessageElement(message);

  /* Clear input field */
  chatInputForm.reset();

  /* Scroll to the bottom of chat messages */
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

chatInputForm.addEventListener('submit', sendMessage);

const johnSelectorBtn = document.querySelector('#john-selector')
const janeSelectorBtn = document.querySelector('#jane-selector')
const chatHeader = document.querySelector('.chat-header')
const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button')

const messages = JSON.parse(localStorage.getItem('messages')) || []

const createChatMessageElement = (message) => `
  <div class="message ${message.sender === 'John' ? 'blue-bg' : 'gray-bg'}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`

window.onload = () => {
  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message)
  })
}

let messageSender = 'John'

const updateMessageSender = (name) => {
  messageSender = name
  chatHeader.innerText = `${messageSender} chatting...`
  chatInput.placeholder = `Type here, ${messageSender}...`

  if (name === 'John') {
    johnSelectorBtn.classList.add('active-person')
    janeSelectorBtn.classList.remove('active-person')
  }
  if (name === 'Jane') {
    janeSelectorBtn.classList.add('active-person')
    johnSelectorBtn.classList.remove('active-person')
  }

  /* auto-focus the input field */
  chatInput.focus()
}

johnSelectorBtn.onclick = () => updateMessageSender('John')
janeSelectorBtn.onclick = () => updateMessageSender('Jane')

const sendMessage = (e) => {
  e.preventDefault()

  const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  const message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp,
  }

  /* Save message to local storage */
  messages.push(message)
  localStorage.setItem('messages', JSON.stringify(messages))

  /* Add message to DOM */
  chatMessages.innerHTML += createChatMessageElement(message)

  /* Clear input field */
  chatInputForm.reset()

  /*  Scroll to bottom of chat messages */
  chatMessages.scrollTop = chatMessages.scrollHeight
}

chatInputForm.addEventListener('submit', sendMessage)

clearChatBtn.addEventListener('click', () => {
  localStorage.clear()
  chatMessages.innerHTML = ''
})
