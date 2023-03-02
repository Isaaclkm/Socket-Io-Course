import './App.css';
import io from 'socket.io-client'
import { useState, useEffect } from 'react';

const socket = io('http://localhost:4000');

function App() {

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([{
    body: "message text",
    from: "Use-1"
 }]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message)

    socket.emit('message', message)
    setMessage('')
  }

  useEffect(()=> {
    const receiveMessage = message => {
    }
    socket.on('message' , message => receiveMessage)

    return ( ) => {
      socket.off('message', message => receiveMessage)
    }

  }, [])

  return (
    <div className="App">
      
      <form onSubmit={handleSubmit}>

        <input type="text" 
        onChange={ (e) => setMessage(e.target.value)} 
        value = {message}/>
        <button>Send</button>
      </form>

      {messages.map( message => (
        <div>
          <p>{message.body}:{message.from}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
