import React, { useEffect, useState } from "react";
import MessageBubble from "./MessageBubble.tsx";

interface ChatWindowProps {
  messages: { type: "user" | "ai"; content: string }[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages = [{ type: "ai", content: "How may I help you?" }] }) => {
  return (
    <div style={{ padding: "10px", background: "#1f1f1f", height: "100%" }}>
      {messages.map((message, index) => (
        <MessageBubble key={index} type={message.type} content={message.content} />
      ))}
    </div>
  );
};

export default ChatWindow;
