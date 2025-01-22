import express, { Application } from "express";
import bodyParser from "body-parser";
import uploadRoutes from "./routes/upload";
import analyzeRoutes from "./routes/analyze";

const app: Application = express();
app.use(bodyParser.json());

app.use("/upload", uploadRoutes);
app.use("/analyze", analyzeRoutes);

export default app;
