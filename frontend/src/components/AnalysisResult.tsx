import React from "react";

interface AnalysisResultProps {
  analysis: string;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ analysis }) => {
  return (
    <div>
      <h2>Analysis Summary</h2>
      <p>{JSON.stringify(analysis)}</p>
    </div>
  );
};

export default AnalysisResult;
