import { useState, useEffect } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import * as signalR from "@microsoft/signalr";
import pictureService from "../services/pictureService";
import { BASE_URL } from "../api/axiosInstance";

export default function ChatWindow({ pictureId }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connection, setConnection] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const savedUsername = localStorage.getItem("chatUsername");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const historyResponse = await pictureService.getMessages(pictureId);
        setMessages(historyResponse.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [pictureId]);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${BASE_URL}/chathub`)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.invoke("JoinPictureChat", pictureId);

          connection.on("ReceiveMessage", (user, text) => {
            setMessages((prev) => [...prev, { user, text }]);
          });
        })
        .catch((error) => console.error("Connection failed: ", error));

      return () => {
        connection.stop();
      };
    }
  }, [connection, pictureId]);

  const handleSend = async () => {
    if (message.trim() && connection) {
      let user = username;

      if (!user) {
        user = prompt("Please enter your name:");
        if (!user) return;
        localStorage.setItem("chatUsername", user);
        setUsername(user);
      }

      try {
        await connection.invoke("SendMessage", pictureId, user, message);
        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div
      className="chat-window border rounded h-100"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="bg-light p-3 border-bottom">
        <h6 className="mb-0">Chat</h6>
      </div>

      <div className="flex-grow-1 overflow-auto p-3 border-bottom">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div className="p-3">
        <InputGroup>
          <Form.Control
            placeholder="Type your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button variant="primary" onClick={handleSend} disabled={!connection}>
            Send
          </Button>
        </InputGroup>
      </div>
    </div>
  );
}
