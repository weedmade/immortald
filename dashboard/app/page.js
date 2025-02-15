"use client";

import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({ connector: new InjectedConnector() });
  const { disconnect } = useDisconnect();

  const [domainName, setDomainName] = useState("");
  const [registrar, setRegistrar] = useState("godaddy");

  const handleMint = async () => {
    // Placeholder: Replace with your actual minting API call or contract interaction.
    alert(`Minting NFT for domain "${domainName}" with registrar "${registrar}"`);
  };

  const handleBurn = async () => {
    // Placeholder: Replace with your actual burn API call or contract interaction.
    alert(`Burning NFT for domain "${domainName}" (Refund 80%)`);
  };

  return (
    <div className="p-6 font-sans">
      <h1 className="text-3xl font-bold mb-4">Immortal Domains</h1>
      {!isConnected ? (
        <button onClick={() => connect()} className="btn btn-primary">
          Connect Wallet
        </button>
      ) : (
        <div>
          <p>Connected: {address}</p>
          <button onClick={() => disconnect()} className="btn btn-secondary">
            Disconnect Wallet
          </button>
          <div className="mt-4">
            <label className="block mb-1">Domain Name</label>
            <input
              type="text"
              value={domainName}
              onChange={(e) => setDomainName(e.target.value)}
              placeholder="Enter domain name"
              className="border p-2 w-full"
            />
          </div>
          <div className="mt-4">
            <label className="block mb-1">Registrar</label>
            <select
              value={registrar}
              onChange={(e) => setRegistrar(e.target.value)}
              className="border p-2 w-full"
            >
              <option value="godaddy">GoDaddy</option>
              <option value="namecheap">Namecheap</option>
              <option value="placeholder">Placeholder Registrar</option>
            </select>
          </div>
          <div className="mt-4">
            <button onClick={handleMint} className="btn btn-success mr-2">
              Mint Domain NFT ($100)
            </button>
            <button onClick={handleBurn} className="btn btn-warning">
              Burn NFT (Refund 80%)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
