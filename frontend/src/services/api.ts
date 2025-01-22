import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.29.109:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const uploadFile = (file: FormData) =>
  api.post("/upload", file, { headers: {"Content-Type": "multipart/form-data"}});

export const analyzeFile = (filePath: string) =>
  api.post("/analyze", { filePath });
