import express, { Request, Response } from "express";
import { parseCSV } from "../utils/csvParser";
import { promptLLM } from "../utils/promptLLM";

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
    const parsedAdData = await parseCSV(filePath);
    const { analysis, updatedAdData } = await promptLLM(parsedAdData);
    res.status(200).json({
      message: "Analysis complete",
      analysis,
      rawData:parsedAdData,
      updatedAdData
    });
  } catch (error: any) {
    if (error && error.response)
      console.error('Error communicating with Anthropic API:', error.response?.data || error?.message);
    res.status(500).json({
      message: "Error analyzing the file",
      analysis: null,
      updatedAdData: null,
      err_details: error instanceof Error ? error?.message : error,
    });
  }
});

export default router;
