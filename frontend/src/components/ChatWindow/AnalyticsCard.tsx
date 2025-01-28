import React from "react";

interface AnalyticsCardProps {
  title: string;
  value: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, value }) => {
  return (
    <div
      style={{
        margin: "5px 0",
        padding: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        background: "#fff",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <h4 style={{ margin: 0 }}>{title}</h4>
      <p style={{ margin: 0, fontWeight: "bold" }}>{value}</p>
    </div>
  );
};

export default AnalyticsCard;
