import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "../components/FileUpload.tsx";
import { uploadFile } from "../services/api.ts";

const UploadPage: React.FC = () => {
  const [file, setFile] = useState<File>()
  const [filePath, setFilePath] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleUploadSuccess = (file: File) => {
    setFile(file);
  };

  const handleFileUpload = async () => {
    try {
      const fileData = new FormData()
      fileData.append("file",file)
      const { filePath } = await uploadFile(fileData)
      setFilePath(filePath);
    } catch (error) {
      console.error(error?.message || error.data)
      alert("Unable to upload file!")
    }
  }

  const toAnalyze = () =>
    navigate("/analyze", { state: { filePath: filePath } });

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.header}>Upload Your Ad Data</h2>
        <p style={styles.description}>
          Drag and drop your CSV or Excel file, or click below to select a file. Once uploaded, we'll help you analyze the data and generate insights.
        </p>

        <div style={styles.instructionsContainer}>
          <p style={styles.instructionsText}>
            Please ensure your file follows the exact format. The column names should match the required structure in the sample file.
          </p>
          <p style={styles.sampleFileText}>
            You can download the <a href="https://docs.google.com/spreadsheets/d/1ImYI6A3nCB2Gndn9que9kdKoTehqFpVZetkYGjq9KEM/edit?usp=sharing" target="_blank" rel="noopener noreferrer" style={styles.link}>
              sample file here
            </a> to update your data in the correct format.
          </p>
        </div>

        <FileUpload onUpload={handleUploadSuccess} />
        {filePath ?
          <>
            <p style={styles.successMessage}>File uploaded successfully!</p>
            <button onClick={toAnalyze} style={styles.actionBtn}>Analyze</button>
          </> :
          <button onClick={handleFileUpload} style={styles.actionBtn}>Upload</button>
        }
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#F9F5EB", 
    fontFamily: "'Poppins', sans-serif",
  },
  content: {
    textAlign: "center",
    backgroundColor: "#FFFFFF", 
    padding: "3rem 2rem",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    width: "100%",
  },
  header: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#1A4E63", 
    marginBottom: "1rem",
  },
  description: {
    fontSize: "1.2rem",
    color: "#333333", 
    marginBottom: "2rem",
  },
  instructionsContainer: {
    backgroundColor: "#F4F2E9", 
    padding: "1.5rem",
    borderRadius: "8px",
    marginBottom: "2rem",
  },
  instructionsText: {
    fontSize: "1.1rem",
    color: "#333333", 
    marginBottom: "1rem",
  },
  sampleFileText: {
    fontSize: "1.1rem",
    color: "#333333", 
  },
  link: {
    color: "#1A4E63", 
    textDecoration: "none",
    fontWeight: "600",
  },
  successMessage: {
    fontSize: "1.2rem",
    color: "#1A4E63", 
    marginTop: "1.5rem",
    fontWeight: "600",
  },
  actionBtn: {
    color: "#ffffff",
    backgroundColor: "#0d47a1",
    padding: "0.5rem",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    margin: "2%",
    outline: "none",
    border: "none"
  }
};

export default UploadPage;
