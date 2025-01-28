import React from "react";
import "./index.css";

interface LoaderProps {
  size?: number;
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 50, color = "#1A4E63" }) => {
  return (
    <div style={{ flex: 1, height: "90vh", flexDirection: "column", justifyContent: "center", alignItems: "center", display: "flex" }}>
      <div
        className="loader"
        style={{
          width: size,
          height: size,
          border: `${size / 8}px solid ${color}`,
          marginBottom: "1rem",
          borderTop: `${size / 8}px solid transparent`,
        }}
      ></div>
      <div>Analyzing your ads matrix...</div>
    </div>
  );
};

export default Loader;
