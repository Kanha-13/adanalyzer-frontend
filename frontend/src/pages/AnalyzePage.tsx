import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { analyzeFile } from "../services/api.ts";
import AnalysisResult from "../components/AnalysisResult.tsx";

const AnalyzePage: React.FC = () => {
  const location = useLocation();
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [rawData, setRawData] = useState<string[]>(null);
  const [updatedAdData, setUpdatedAdData] = useState<string[]>(null);
  const [loading, setLoading] = useState(true);

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
    <div>
      {loading ?
        <>
          <h2>Analyzing Your Ad Data</h2>
          <p>Loading...</p>
        </> :
        <AnalysisResult rawData={rawData || []} updatedAdData={updatedAdData || []} analysis={analysis || "No data"} />}
    </div>
  );
};

export default AnalyzePage;
