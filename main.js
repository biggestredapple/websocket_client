import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter'))

function createSocket() {
  const socket_url = `ws://localhost:3000/cable`;
  const socket = new WebSocket(socket_url);

  socket.onopen = function(event) {
    console.log("Connected to the Rails server.");
    const msg = {
      command: "subscribe",
      identifier: JSON.stringify({
        id: 1,
        channel: 'AlertsChannel'
      })
    };
    socket.send(JSON.stringify(msg));
  }

  socket.onmessage = function(event) {
    const data = JSON.parse(event.data);

    if(data.type === 'ping') {
      return ;
    }
    if(data.message) {
      console.log(data.message);
    }
    console.log("Received data from server", event.data);
  }

  socket.onclose =  function(event) {
    console.log("Disconnected from the server.");
  };

  socket.onerror = function(error) {
    console.log('Websocket error observed:', error)
  }
}

createSocket();