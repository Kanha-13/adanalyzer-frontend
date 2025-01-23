import React from "react";

const styles = {
  dashboard: {
    fontFamily: "'Poppins', sans-serif",
    padding: "3rem 2rem",
    backgroundColor: "#F9F5EB", 
    minHeight: "100vh",
    color: "#444", 
  },
  header: {
    marginBottom: "2rem",
    textAlign: "center",
    color: "#1A4E63", 
  },
  mainTitle: {
    fontSize: "3rem", 
    fontWeight: "700",
    color: "#1A4E63", 
    letterSpacing: "1px",
    textTransform: "uppercase",
    marginBottom: "1rem",
  },
  subHeader: {
    fontSize: "1.4rem", 
    color: "#757575", 
    fontWeight: "400",
    lineHeight: "1.7",
    marginTop: "0.5rem",
  },
  card: {
    backgroundColor: "#FFFFFF", 
    borderRadius: "12px",
    margin: "1.5rem 0",
    padding: "2rem",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)", 
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer",
    height: "auto"
  },
  cardHeader: {
    fontSize: "1.8rem",
    fontWeight: "600",
    marginBottom: "1rem",
    color: "#1A4E63", 
    letterSpacing: "0.5px",
  },
  listItem: {
    marginBottom: "1rem", 
    lineHeight: "1.8",
    color: "#333", 
    fontSize: "1.1rem",
    fontWeight: "400",
    paddingLeft: "1rem",
    borderLeft: "4px solid #1A4E63", 
    transition: "all 0.3s ease-in-out",
  },
  actionableButton: {
    display: "block",
    marginTop: "1.5rem",
    padding: "0.75rem 1.5rem",
    backgroundColor: "#1A4E63", 
    color: "#FFFFFF",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    textAlign: "center",
    fontSize: "1.2rem", 
    letterSpacing: "0.5px",
    transition: "background-color 0.3s, transform 0.3s",
  },
  actionableButtonHover: {
    backgroundColor: "#16A085", 
    transform: "scale(1.05)",
  },
  sectionText: {
    fontSize: "1.2rem",
    fontWeight: "400",
    lineHeight: "1.8",
    color: "#757575", 
    marginBottom: "1.2rem",
  },
  table: {
    borderCollapse: "collapse",
    width: "100%",
    marginTop: "2rem",
  },
  tableHeader: {
    backgroundColor: "#1A4E63", 
    color: "#FFFFFF", 
    padding: "1rem",
    fontSize: "1.1rem",
    textAlign: "left",
    letterSpacing: "1px",
  },
  tableRow: {
    borderBottom: "1px solid #ddd", 
  },
  tableCell: {
    padding: "1.2rem",
    textAlign: "left",
    color: "#333", 
    fontSize: "1.1rem",
  },
  tableRowEven: {
    backgroundColor: "#f7f7f7", 
  },
  
  tableRowHover: {
    backgroundColor: "#f0f0f0",
    cursor: "pointer",
  },
};

interface DataTableProps {
  title: string; 
  data: any[]; 
  headers: string[]; 
  children?: React.ReactNode;
  columnWidths?: string[]; 
}

const DataTable: React.FC<DataTableProps> = ({
  title,
  data,
  headers,
  children,
  columnWidths = [], 
}) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.cardHeader}>{title}</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th
                key={idx}
                style={{
                  ...styles.tableHeader,
                  width: columnWidths[idx] || "auto", 
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              style={rowIndex % 2 === 0 ? styles.tableRowEven : styles.tableRow}
            >
              {Object.keys(row).map((header, colIndex) => (
                <td key={colIndex} style={styles.tableCell}>
                  {typeof row[header] === "number" && !Number.isInteger(row[header])
                    ? row[header].toFixed(2) 
                    : row[header] || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {children}
    </div>
  );
};

export default DataTable;
