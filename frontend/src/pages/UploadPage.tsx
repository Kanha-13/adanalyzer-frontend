import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "../components/FileUpload.tsx";

const UploadPage: React.FC = () => {
  const [filePath, setFilePath] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleUploadSuccess = (path: string) => {
    setFilePath(path);
    navigate("/analyze", { state: { filePath: path } });
  };

  return (
    <div>
      <h2>Upload Your Ad Data</h2>
      <FileUpload onUploadSuccess={handleUploadSuccess} />
      {filePath && <p>File uploaded successfully. Proceeding to analysis...</p>}
    </div>
  );
};

export default UploadPage;
