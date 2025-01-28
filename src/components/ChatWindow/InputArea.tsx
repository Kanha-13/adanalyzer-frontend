import React, { useState } from "react";

interface InputAreaProps {
  onSend: (input: string) => void;
}

const InputArea: React.FC<InputAreaProps> = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your ad content..."
        style={{
          flex: 1,
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
      <button
        onClick={handleSend}
        style={{
          padding: "10px 20px",
          background: "#1A4E63",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </div>
  );
};

export default InputArea;
