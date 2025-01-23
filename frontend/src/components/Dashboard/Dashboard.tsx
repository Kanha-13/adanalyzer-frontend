import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import Header from "./Header.tsx";
import DataTable from "./DataTable.tsx";
import ChartSection from "./ChartSection.tsx";
import SectionCard from "./SectionCard.tsx";
import DownloadButton from "./DownloadButton.tsx";
import { convertToCSV, downloadCSV } from "../../utils/csvHandler.ts";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = ({ analysis = "", rawData = [], updatedAdData = [] }) => {

  const parseAnalysis = (data) => {
    if (!data) return [];

    const { performanceSummary, highPerformingKeywords, underPerformingKeywords, suggestionsForUnderperforming, generalSuggestions } = data;

    const structuredData: any[] = [];

    if (performanceSummary) {
      structuredData.push({ type: "text", heading: "Performance Summary", content: performanceSummary });
    }

    if (highPerformingKeywords && highPerformingKeywords.length > 0) {
      structuredData.push({
        type: "list",
        heading: "High Performing Keywords",
        items: highPerformingKeywords,
      });
    }

    if (underPerformingKeywords && underPerformingKeywords.length > 0) {
      structuredData.push({
        type: "list",
        heading: "Underperforming Keywords",
        items: underPerformingKeywords,
      });
    }

    if (suggestionsForUnderperforming && suggestionsForUnderperforming.length > 0) {
      structuredData.push({
        type: "list",
        heading: "Suggestions for Underperforming Keywords",
        items: suggestionsForUnderperforming,
      });
    }

    if (generalSuggestions && generalSuggestions.length > 0) {
      structuredData.push({
        type: "list",
        heading: "General Suggestions for Improving Ad Performance",
        items: generalSuggestions,
      });
    }

    return structuredData;
  };

  const structuredData = parseAnalysis(analysis);

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

  return (
    <div style={styles.dashboard}>
      <Header title={"Ad Performance Dashboard"} subtitle={"Dive into your ad campaign insights, visualize key metrics, and optimize your strategy with clear, actionable data."} />
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
        {structuredData.map((section) => {
          return <SectionCard section={section} />
        })}
      </div>

      {/* Chart of raw data */}
      <ChartSection rawData={rawData} />

      {/* Raw data table */}
      <DataTable headers={["Keyword", "ROAS", "ACOS", "CTR", "Sales"]} title={"Raw Data Table"} data={rawData} />

      {/* Updated Ad Data Table */}
      <DataTable headers={["Keyword", "ROAS", "ACOS", "CTR", "Sales"]} title={"Updated Ad Data"} data={updatedAdData} >
        <DownloadButton onClick={() => downloadCSV(convertToCSV(updatedAdData))} />
      </DataTable>
    </div>
  );
};

export default Dashboard;
