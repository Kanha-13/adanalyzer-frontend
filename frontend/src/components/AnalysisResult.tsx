import React from "react";
import Dashboard from "./Dashboard/Dashboard.tsx";

interface AnalysisResultProps {
  analysis: string;
  rawData: string[],
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ analysis = "", rawData = [], updatedAdData = [] }) => {
  return (
    <div>
      {Array.isArray(analysis) ? analysis.map(analys => <p>{JSON.stringify(analys)}</p>) : <Dashboard analysis={analysis} updatedAdData={updatedAdData} rawData={rawData} />}
    </div>
  );
};

export default AnalysisResult;
