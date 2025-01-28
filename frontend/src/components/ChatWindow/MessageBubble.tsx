import React from "react";

interface MessageBubbleProps {
  type: "user" | "ai";
  content: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ type, content }) => {
  const isUser = type === "user";
  return (
    <div
      style={{
        margin: "10px 0",
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
      }}
    >
      <div
        style={{
          maxWidth: "70%",
          padding: "10px",
          borderRadius: "10px",
          background: isUser ? "#1A4E63" : "#f1f1f1",
          color: isUser ? "white" : "black",
        }}
      >
        {content}
      </div>
    </div>
  );
};

export default MessageBubble;
