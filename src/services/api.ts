import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const uploadFile = async (file: FormData) => {
  try {
    const response = await api.post("/upload", file, { headers: { "Content-Type": "multipart/form-data" } });
    return response.data
  } catch (error) {
    throw error
  }
}

export const analyzeFile = (filePath: string) =>
  api.post("/analyze", { filePath });

export const getQueryResponse = (query: string, filePath) =>
  api.post("/query", { query, filePath });