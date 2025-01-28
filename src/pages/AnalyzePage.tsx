import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { analyzeFile, getQueryResponse } from "../services/api.ts";
import Header from "../components/Dashboard/Header.tsx";
import SectionCard from "../components/Dashboard/SectionCard.tsx";
import ChartSection from "../components/Dashboard/ChartSection.tsx";
import DataTable from "../components/Dashboard/DataTable.tsx";
import DownloadButton from "../components/Dashboard/DownloadButton.tsx";
import { convertToCSV, downloadCSV } from "../utils/csvHandler.ts";
import Chat from "../components/ChatWindow/index.tsx";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import Loader from "../components/Loader/index.tsx";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const styles = {
  container: {
    fontFamily: "'Poppins', sans-serif",
    padding: "0.1rem 2rem",
    backgroundColor: "#F9F5EB",
    minHeight: "100vh",
    color: "#444",
  },
  tabBtn: {
    padding: "0.5rem 1rem",
    backgroundColor: "#1A4E63",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    textAlign: "center",
    fontSize: "1.2rem",
    letterSpacing: "0.5px",
    transition: "background-color 0.3s, transform 0.3s",
    marginRight: "1rem",
  }
};

interface Analysis {
  performanceSummary: string;
  highPerformingKeywords: string[];
  lowPerformingKeywords: string[];
  generalSuggestions: string[];
}

const AnalyzePage: React.FC = () => {
  const location = useLocation();
  const [analysis, setAnalysis] = useState<Analysis>(null);
  const [rawData, setRawData] = useState<string[]>(null);
  const [updatedAdData, setUpdatedAdData] = useState<string[]>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<{ type: "user" | "ai"; content: string }[]>([{ type: "ai", content: "How may I help you?" }]);
  const [currentTab, setCurrentTab] = useState("performanceSummary");

  const renderCurrentTab = (key, analysis) => {
    switch (key) {
      case "performanceSummary":
        return <SectionCard section={{ type: "text", content: analysis.performanceSummary, heading: "Performance Summary" }} />

      case "highPerformingKeywords":
        return <SectionCard section={{ type: "list", items: analysis.highPerformingKeywords || [], heading: "High performing Keywords" }} />

      case "underPerformingKeywords":
        return <SectionCard section={{ type: "list", items: analysis.underPerformingKeywords || [], heading: "Underperforming Keywords" }} />

      case "generalSuggestions":
        return <SectionCard section={{ type: "list", items: analysis.generalSuggestions, heading: "General Suggestions for Improving Ad Performance" }} />

      case "adMatrix":
        return <ChartSection rawData={rawData || []} />

      case "rawData":
        return <DataTable headers={["Keyword", "ROAS", "ACOS", "CTR"]} title={"Raw Data Table"} data={rawData || []} />

      case "updatedAdData":
        return <DataTable headers={["Keyword", "ROAS", "ACOS", "CTR"]} title={"Updated Ad Data"} data={updatedAdData || []} >
          <DownloadButton onClick={() => downloadCSV(convertToCSV(updatedAdData))} />
        </DataTable>

      case "chat":
        return <Chat messages={messages} onSend={handleUserInput} />

      default:
        break;
    }
  }

  const handleUserInput = async (input: string) => {
    let chats_his = messages;
    chats_his.push({ type: "user", content: input });
    chats_his.push({ type: "ai", content: "please wait, I am analyzing your query!" });
    setMessages([...chats_his]);
    try {
      const filePath = location.state?.filePath;
      const res = await getQueryResponse(input, filePath);
      chats_his.pop();
      setMessages([...chats_his, { type: "ai", content: res.data.data }]);
    } catch (error) {
      alert("Unable to resolve your query. Please try again later.");
    }
  };

  const getBg = (tab) => {
    return currentTab === tab ? "#16A085" : "#1A4E63";
  }

  useEffect(() => {
    const filePath = location.state?.filePath;

    if (filePath) {
      const fetchAnalysis = async () => {
        try {
          const response = await analyzeFile(filePath);
          setAnalysis(response.data.analysis);
          setRawData(response.data.rawData)
          setUpdatedAdData(response.data.updatedAdData)
        } catch (err) {
          setAnalysis("Error analyzing the file.");
        } finally {
          setLoading(false);
        }
      };
      fetchAnalysis();
    }
  }, [location]);

  return (
    <div style={styles.container}>
      {
        loading ? <Loader /> : <>
          <Header title={"Ad Performance Dashboard"} subtitle={"Dive into your ad campaign insights, visualize key metrics, and optimize your strategy with clear, actionable data."} />
          <button style={{ ...styles.tabBtn, backgroundColor: getBg("performanceSummary") }} onClick={() => setCurrentTab("performanceSummary")}>Summary</button>
          <button style={{ ...styles.tabBtn, backgroundColor: getBg("highPerformingKeywords") }} onClick={() => setCurrentTab("highPerformingKeywords")}>High performing</button>
          <button style={{ ...styles.tabBtn, backgroundColor: getBg("underPerformingKeywords") }} onClick={() => setCurrentTab("underPerformingKeywords")}>Under performing</button>
          <button style={{ ...styles.tabBtn, backgroundColor: getBg("generalSuggestions") }} onClick={() => setCurrentTab("generalSuggestions")}>Suggestions</button>
          <button style={{ ...styles.tabBtn, backgroundColor: getBg("adMatrix") }} onClick={() => setCurrentTab("adMatrix")}>Ad Matrix</button>
          <button style={{ ...styles.tabBtn, backgroundColor: getBg("rawData") }} onClick={() => setCurrentTab("rawData")}>Raw data</button>
          <button style={{ ...styles.tabBtn, backgroundColor: getBg("updatedAdData") }} onClick={() => setCurrentTab("updatedAdData")}>Updated data</button>
          <button style={{ ...styles.tabBtn, backgroundColor: getBg("chat") }} onClick={() => setCurrentTab("chat")}>Chat</button>
          {renderCurrentTab(currentTab, analysis)}
        </>
      }
    </div>
  );
};

export default AnalyzePage;
