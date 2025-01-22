import fs from "fs";
import csv from "csv-parser";

interface KeywordPerformance {
  keyword: string;
  clicks: number;
  ctr: number;
  roas: number;
  acos: number;
}

export const parseCSV = (filePath: string): Promise<KeywordPerformance[]> => {
  return new Promise((resolve, reject) => {
    const results: KeywordPerformance[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        const keywordPerformance: KeywordPerformance = {
          keyword: data["Product targets"] || "",
          clicks: parseInt(data["Clicks"], 10) || 0,
          ctr: parseFloat(data["CTR"]) || 0,
          roas: parseFloat(data["ROAS"]) || 0,
          acos: parseFloat(data["ACOS"]) || 0,
        };
        results.push(keywordPerformance);
      })
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
};
