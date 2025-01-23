import React from "react";
import { Line } from "react-chartjs-2";
const styles = {
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    padding: "2rem",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
    flex: "1 1 100%",
  },
  cardHeader: {
    fontSize: "1.8rem",
    fontWeight: "600",
    marginBottom: "1rem",
    color: "#1A4E63",
  },
};

const ChartSection = ({ rawData }) => {
  const chartData = {
    labels: rawData.map((data) => data.keyword),
    datasets: [
      {
        label: "ROAS",
        data: rawData.map((data) => data.roas),
        borderColor: "#2d6a4f",
        backgroundColor: "rgba(45, 106, 79, 0.2)",
        tension: 0.4,
      },
      {
        label: "ACOS",
        data: rawData.map((data) => data.acos),
        borderColor: "#e74c3c",
        backgroundColor: "rgba(231, 76, 60, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.cardHeader}>Ad Performance Metrics</h3>
      <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
    </div>
  );
};

export default ChartSection;
