import React from "react";
const styles = {
  header: {
    marginBottom: "1rem",
    textAlign: "center",
    color: "#1A4E63",
  },
  mainTitle: {
    fontSize: "3rem",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  subHeader: {
    fontSize: "1.4rem",
    color: "#757575",
    fontWeight: "400",
    lineHeight: "1.7",
    marginTop: "0.5rem",
  },
};

const Header = ({ title, subtitle }) => (
  <header style={styles.header}>
    <h1 style={styles.mainTitle}>{title}</h1>
    <p style={styles.subHeader}>{subtitle}</p>
  </header>
);

export default Header;
