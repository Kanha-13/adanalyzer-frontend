import express, { Application } from "express";
import uploadRoutes from "./routes/upload";
import analyzeRoutes from "./routes/analyze";
import cors from "cors";
import dotenv from "dotenv";

const app: Application = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

//middlewares
app.use(cors(corsOptions));
app.use(express.json());
dotenv.config();

//endpoints
app.use("/upload", uploadRoutes);
app.use("/analyze", analyzeRoutes);

export default app;
