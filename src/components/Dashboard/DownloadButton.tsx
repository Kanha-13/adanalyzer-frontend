import React from "react";

const styles = {
  button: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#1A4E63",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    marginTop: "1rem",
    fontSize: "1.2rem",
  },
};

const DownloadButton = ({ onClick }) => (
  <button style={styles.button} onClick={onClick}>
    Download Updated Data as CSV
  </button>
);

export default DownloadButton;
