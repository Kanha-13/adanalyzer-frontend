import fs from "fs";
import csv from "csv-parser";

interface KeywordPerformance {
  keyword: string;
  products_target: string;
  clicks: number;
  ctr: number;
  roas: number;
  spend: number;
  sales: number;
  acos: number;
}

export const parseCSV = (filePath: string): Promise<KeywordPerformance[]> => {
  return new Promise((resolve, reject) => {
    const results: KeywordPerformance[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        const keywordPerformance: KeywordPerformance = {
          keyword: data['﻿"Matched product "'] || "",
          products_target: data["Product targets"] || "",
          clicks: parseInt(data["Clicks"], 10) || 0,
          ctr: parseFloat(data["CTR"]) || 0,
          spend: parseFloat(data["Spend(USD)"]) || 0,
          sales: parseFloat(data["Sales(USD)"]) || 0,
          roas: parseFloat(data["ROAS"]) || 0,
          acos: parseFloat(data["ACOS"]) || Infinity,
        };
        results.push(keywordPerformance);
      })
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
};
