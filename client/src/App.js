import React, { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io('http://localhost:5000')

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      const newArray = messages.concat(msg)
      setMessages(newArray);
    })
  }, [messages])

  const handleSend = () => {
    socket.emit('chat message', message);
  }

  return (
    <div className="App">
      <input value={message} onChange={(e) => {setMessage(e.target.value)}}></input>
      <button onClick={handleSend}>Send</button>
      {messages.map((msg, i) => {
        return <p key={`${msg} ${i}`}>{msg}</p>
      })}
    </div>
  );
}

export default App;
