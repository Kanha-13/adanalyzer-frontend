import React from "react";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.header}>Welcome to the Ad Performance Analyzer</h1>
        <p style={styles.description}>
          Analyze your ad data and gain insights on keyword performance with ease.
        </p>
        <Link to="/upload" style={styles.buttonLink}>
          Start Uploading Your File
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#F9F5EB", 
    fontFamily: "'Poppins', sans-serif",
  },
  content: {
    textAlign: "center",
    backgroundColor: "#FFFFFF", 
    padding: "3rem 2rem",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    width: "100%",
  },
  header: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#1A4E63", 
    marginBottom: "1rem",
  },
  description: {
    fontSize: "1.2rem",
    color: "#333333", 
    marginBottom: "2rem",
  },
  buttonLink: {
    display: "inline-block",
    backgroundColor: "#1A4E63", 
    color: "#FFFFFF",
    padding: "1rem 2rem",
    borderRadius: "5px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "1.2rem",
    transition: "background-color 0.3s",
  },
};

export default LandingPage;
