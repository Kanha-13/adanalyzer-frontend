import React, { useState, useCallback } from "react";

interface FileUploadProps {
  onUpload: (filePath: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleFileUpload = (file: File) => {
    if (file && (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.type === "text/csv")) {
      setError(null);
      setFileName(file.name);
      onUpload(file);
    } else {
      setError("Invalid file type. Please upload a CSV or Excel file.");
    }
  };

  return (
    <div
      style={{
        ...styles.dropZone,
        borderColor: dragging ? "#2d6a4f" : "#ccc",
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept=".csv, .xlsx"
        style={{ display: "none" }}
        onChange={handleFileSelect}
        id="file-input"
      />
      <label htmlFor="file-input" style={styles.uploadButton}>
        {dragging ? "Release to Upload" : fileName ? fileName : "Drag and Drop your file here or click to select"}
      </label>
      {error && <p style={styles.errorMessage}>{error}</p>}
    </div>
  );
};

const styles = {
  dropZone: {
    border: "2px dashed #ccc",
    padding: "3rem",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "border-color 0.3s",
    backgroundColor: "#f9f9f9",
  },
  uploadButton: {
    fontSize: "1.2rem",
    color: "#2d6a4f",
    fontWeight: "600",
    cursor: "pointer",
    whiteSpace: "normal",
    wordWrap: "break-word",
    textAlign: "center",
  },
  errorMessage: {
    color: "#e74c3c",
    marginTop: "1rem",
    fontWeight: "500",
  },
};

export default FileUpload;