import React from "react";
import ChatWindow from "./ChatWindow.tsx";
import InputArea from "./InputArea.tsx";

const Chat: React.FC = ({ messages, onSend }) => {

  const styles = {
    card: {
      backgroundColor: "#1b1b1b",
      color: "#fff",
      overflow: "hidden",
      borderRadius: "12px",
      padding: "0.1rem",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column",
      margin: "0.5rem",
      height: "60vh",
    },
  }

  return (
    <div style={styles.card}>
      <div style={{ flex: 1, overflow: "auto" }}>
        <ChatWindow messages={messages} />
      </div>
      <div style={{ flexShrink: 0, padding: "10px" }}>
        <InputArea onSend={onSend} />
      </div>
    </div>
  );
};

export default Chat;
