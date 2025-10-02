import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

function Login() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>
      <a href="http://localhost:5000/auth/google">
        <button>Login with Google</button>
      </a>
    </div>
  );
}

function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [room, setRoom] = useState("general");
  const [user, setUser] = useState(null);

  useEffect(() => {

    axios.get("http://localhost:5000/auth/user", { withCredentials: true })
      .then(res => setUser(res.data));

    socket.emit("joinRoom", room);


    axios.get("http://localhost:5000/messages").then((res) => {
      setMessages(res.data.filter(m => m.room === room));
    });


    socket.on("receiveMessage", (msg) => {
      if (msg.room === room) setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, [room]);

  const sendMessage = () => {
    if (text && user) {
      const msg = { sender: user.displayName, text, room };
      socket.emit("sendMessage", msg);
      setText("");
    }
  };

  if (!user) return <Login />;

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Chat – Room: {room}</h2>

   
      <select value={room} onChange={(e) => setRoom(e.target.value)}>
        <option value="general">General</option>
        <option value="sports">Sports</option>
        <option value="coding">Coding</option>
      </select>


      <div style={{ border: "1px solid #ccc", height: "300px", overflowY: "auto", margin: "10px 0" }}>
        {messages.map((m, i) => (
          <div key={i}><b>{m.sender}:</b> {m.text}</div>
        ))}
      </div>

    
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message"
        style={{ width: "100%", marginBottom: "5px" }}
      />
      <button onClick={sendMessage} style={{ width: "100%" }}>Send</button>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
