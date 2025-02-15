// dashboard/components/ClientWagmiProvider.js
"use client";

import { WagmiConfig, createClient, configureChains } from "wagmi";
import { sepolia } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const { chains, provider } = configureChains(
  [sepolia],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: process.env.NEXT_PUBLIC_RPC_URL || "https://base-sepolia.gateway.tenderly.co/68q3tySPlgTMbpWt5kZDYl",
      }),
    }),
  ]
);

const client = createClient({
  autoConnect: true,
  provider,
});

export default function ClientWagmiProvider({ children }) {
  return <WagmiConfig client={client}>{children}</WagmiConfig>;
}
