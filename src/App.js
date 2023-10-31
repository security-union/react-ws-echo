import { useState, useEffect } from 'react';

function App() {
  return (
    <div className="App">
        <WebSocketComponent />
    </div>
  );
}

const WebSocketComponent = () => {
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('wss://ws.postman-echo.com/raw');

    ws.onopen = () => {
      console.log('WebSocket connection opened.');
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const receivedMessage = event.data;
      setMessage(receivedMessage);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    return () => {
      if (socket) {
        socket.close();
      }
    };
  });

  const sendRandomString = () => {
    if (socket) {
      const randomString = Math.random().toString(36).substring(7);
      socket.send(randomString);
    }
  };

  return (
    <div>
      <h2>WebSocket Echo Client</h2>
      <button onClick={sendRandomString}>Send Random String</button>
      <p>Received: {message}</p>
    </div>
  );
};

export default App;
