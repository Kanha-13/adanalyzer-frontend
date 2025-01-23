import React from "react";

const styles = {
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    padding: "2rem",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
    flex: "1 1 calc(50% - 1rem)",
    margin: "0.5rem",
  },
  cardHeader: {
    fontSize: "1.8rem",
    fontWeight: "600",
    marginBottom: "1rem",
    color: "#1A4E63",
  },
  listItem: {
    marginBottom: "1rem",
    lineHeight: "1.8",
    color: "#333",
    fontSize: "1.1rem",
  },
};
const SectionCard = ({ section }) => {
  const { type, heading, content, items } = section;
  return (
    <div style={styles.card}>
      <h3 style={styles.cardHeader}>{heading}</h3>
      {type === "text" && <p>{content}</p>}
      {type === "list" && (
        section.items.map((item, idx) => (
          item.keyword ? <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "column" }}>
            {idx == 0 ? <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>KeyWord</h3>
              <h3>Reason</h3>
              <h3>Action</h3>
            </div> : <></>}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>{item.keyword}</p>
              <p>{item.reason}</p>
              <p>{item.action}</p>
            </div>
          </div> :
            <ul>
              <li key={idx} style={styles.listItem}>{item}</li>
            </ul>
        ))
      )}
    </div>
  );
};

export default SectionCard;
