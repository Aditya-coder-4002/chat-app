import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

function App() {
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    // Load previous messages
    axios.get("http://localhost:5000/messages").then((res) => {
      setMessages(res.data);
    });

    // Listen for new messages
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  const sendMessage = () => {
    if (sender && text) {
      const msg = { sender, text };
      socket.emit("sendMessage", msg);
      setText("");
    }
  };

  return (
    <div className="chat-container" style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>💬 Real-Time Chat</h2>

      <div style={{ border: "1px solid #ccc", height: "300px", overflowY: "auto", padding: "10px" }}>
        {messages.map((m, i) => (
          <div key={i}>
            <b>{m.sender}:</b> {m.text}
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Your name"
        value={sender}
        onChange={(e) => setSender(e.target.value)}
        style={{ width: "100%", margin: "5px 0" }}
      />

      <input
        type="text"
        placeholder="Type message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", margin: "5px 0" }}
      />

      <button onClick={sendMessage} style={{ width: "100%" }}>Send</button>
    </div>
  );
}

export default App;
