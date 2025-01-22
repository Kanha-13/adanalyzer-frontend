import React from "react";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Ad Performance Analyzer</h1>
      <p>Analyze your ad data and get insights on keyword performance.</p>
      <Link to="/upload">Start Uploading Your File</Link>
    </div>
  );
};

export default LandingPage;
