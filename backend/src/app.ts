import express, { Application } from "express";
import uploadRoutes from "./routes/upload";
import analyzeRoutes from "./routes/analyze";
import cors from "cors";

const app: Application = express();

const corsOptions = {
  origin: "*",
  // origin: "http://192.168.29.109:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// parse JSON
app.use(express.json());

app.use("/upload", uploadRoutes);
app.use("/analyze", analyzeRoutes);

export default app;
