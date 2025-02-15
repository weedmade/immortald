// components/YieldData.js
import React from 'react';
import { useStakekit } from '@stakekit/api-hooks';

export default function YieldData() {
  // Use the useStakekit hook to fetch yield data.
  // The first parameter is the endpoint path from the StakeKit API.
  // The second parameter allows you to pass custom options, like headers.
  const { data, error, loading } = useStakekit("yieldv2Controller/yields", {
    baseUrl: process.env.NEXT_PUBLIC_STAKEKIT_BASE_URL,
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STAKEKIT_API_KEY}`,
      "Content-Type": "application/json"
    }
  });

  if (loading) return <div>Loading yield data...</div>;
  if (error) return <div>Error fetching yield data: {error.message}</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Yield Data</h2>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
