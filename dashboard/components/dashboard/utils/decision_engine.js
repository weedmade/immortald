// dashboard/utils/decision_engine.js
import { getMarketSentiment } from "./duckai_market_sentiment";

/**
 * Determine asset allocation based on yield data and market sentiment.
 * @param {Object} yieldData - Yield data from StakeKit.
 * @returns {Promise<Object>} - Allocation decision.
 */
export async function determineAssetAllocation(yieldData) {
  const query = "Analyze market sentiment for Polygon staking yields";
  const sentiment = await getMarketSentiment(query);

  let stablecoinAllocation = 0.8;
  let variableAllocation = 0.2;

  if (sentiment && sentiment.overallScore > 0.7) {
    variableAllocation = 0.3;
    stablecoinAllocation = 0.7;
  }

  return {
    stablecoinAllocation,
    variableAllocation,
    sentiment,
    yieldData,
  };
}
