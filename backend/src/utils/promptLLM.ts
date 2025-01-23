import { ChatOpenAI } from "@langchain/openai";

const promptLLM = async (adData: any[]) => {
  try {
    const model = new ChatOpenAI({
      temperature: 0.7,
      openAIApiKey: process.env.OPENAI_API_KEY,
      configuration: {
        baseURL: "https://openrouter.ai/api/v1",
      },
    });
    console.log(process.env.OPENAI_API_KEY);
    const prompt = `
    Analyze the ad performance for the following data:
    ${JSON.stringify(adData)}

    Please consider the following metrics for analysis:
    - Keyword performance:
      - High ROAS (over 5) and low ACOS (under 10) are good indicators of performance.
      - CTR greater than 5% is also considered high.
    - Summarize which keywords are performing well (i.e., high ROAS, low ACOS, high CTR) and which keywords are underperforming (i.e., low ROAS, high ACOS, low CTR).
    - For each underperforming keyword, suggest whether it should be removed or updated.
    - Provide general suggestions for improving ad performance based on this analysis.

    Please return the result in the following JSON format:
    {
      "performance_summary": "Your summary here...",
      "high_performing_keywords": ["keyword1", "keyword2"],
      "underperforming_keywords": [
        {
          "keyword": "keywordA",
          "reason": "High ACOS and low CTR",
          "action": "remove" // or "update"
        }
      ],
      "general_suggestions": ["suggestion1", "suggestion2"]
    }
    `;

    const { content } = await model.invoke(prompt);

    const result = JSON.parse(content.toString());

    const updatedAdData = adData.filter((keywordData: any) => {
      const underperforming = result.underperforming_keywords.find(
        (k: any) => k.keyword === keywordData.keyword
      );

      if (!underperforming) return true;

      if (underperforming.action === "remove") {
        return false;
      }

      if (underperforming.action === "update") {
        keywordData.updated = true; 
      }

      return true;
    });

    return {
      analysis: {
        performanceSummary: result.performance_summary,
        highPerformingKeywords: result.high_performing_keywords,
        underPerformingKeywords: result.underperforming_keywords,
        generalSuggestions: result.general_suggestions,
      },
      updatedAdData,
    };
  } catch (error) {
    console.error("Error during prompt execution:", error);
    throw new Error("Failed to analyze ad performance.");
  }
};

export { promptLLM };
