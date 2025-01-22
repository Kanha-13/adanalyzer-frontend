import express, { Request, Response } from "express";
import { parseCSV } from "../utils/csvParser";

const router = express.Router();

interface FilePathRequest extends Request {
  body: {
    filePath?: string;
  };
}

router.post("/", async (req: FilePathRequest, res: Response): Promise<void> => {
  const { filePath } = req.body;

  if (!filePath) {
    res.status(400).json({ error: "File path is required" });
    return;
  }

  try {
    const analysis = await parseCSV(filePath);

    res.status(200).json({
      message: "Analysis complete",
      analysis,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error analyzing the file",
      details: error instanceof Error ? error.message : error,
    });
  }
});

export default router;
