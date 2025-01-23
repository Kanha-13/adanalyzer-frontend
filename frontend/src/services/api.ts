import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.29.90:5000",
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
