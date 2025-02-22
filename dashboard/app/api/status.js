// pages/api/status.js

export default function handler(req, res) {
  const status = {
    yieldData: {
      pools: [
        { id: 1, name: "Pool A", APY: 0.35 },
        { id: 2, name: "Pool B", APY: 0.28 }
      ]
    },
    txHistory: [
      { txHash: "0x942a6bbf...", status: "Success", timestamp: "2025-02-14T04:23:00Z" }
    ],
    decision: "Rebalance triggered"
  };

  res.status(200).json(status);
}
