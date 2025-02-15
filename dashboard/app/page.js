// app/page.js
// (Note: no "use client"; so this is a server component)

import stakekit from '@api/stakekit';

export default async function Home() {
  // Call the StakeKit API directly on the server.
  let yieldData = null;
  try {
    const { data } = await stakekit.yieldv2Controller_yields();
    yieldData = data;
  } catch (err) {
    console.error("Error fetching yield data:", err);
  }

  // (Optional) Fetch internal status data here—
  // you could call your own helper functions or another API route.
  // For demonstration purposes, we'll use dummy status data.
  const status = {
    txHistory: [], // replace with real transaction history
    decision: {}   // replace with real decision engine status
  };

  return (
    <div className="p-6 font-sans">
      <h1 className="text-3xl font-bold mb-4">Immortal Domains Dashboard</h1>
      
      {/* StakeKit Yield Data Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">StakeKit Yield Data</h2>
        {yieldData ? (
          <pre className="bg-gray-100 p-2 rounded">
            {JSON.stringify(yieldData, null, 2)}
          </pre>
        ) : (
          <p>Error fetching yield data.</p>
        )}
      </div>

      {/* Additional Status Data Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Status Data</h2>
        <div>
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          <pre className="bg-gray-100 p-2 rounded">
            {JSON.stringify(status.txHistory, null, 2)}
          </pre>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Decision Engine Status</h3>
          <pre className="bg-gray-100 p-2 rounded">
            {JSON.stringify(status.decision, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
