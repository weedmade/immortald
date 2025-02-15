// dashboard/utils/duckai_market_sentiment.js
import { MarketSentimentAgent } from '@duckai/agents-typescript/market-sentiment';

const agent = new MarketSentimentAgent({
  apiKey: process.env.DUCKAI_API_KEY,
});

/**
 * Retrieve market sentiment data.
 * @param {string} query - Query string to analyze.
 * @returns {Promise<Object>} - Sentiment data.
 */
export async function getMarketSentiment(query) {
  try {
    const sentiment = await agent.getSentiment(query);
    return sentiment;
  } catch (error) {
    console.error("Error fetching market sentiment:", error);
    return null;
  }
}
