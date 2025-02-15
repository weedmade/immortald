"use client";

import { useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export default function DomainRegistration({ onMint, onBurn }) {
  const { isConnected, address } = useAccount();
  const { connect } = useConnect({ connector: new InjectedConnector() });
  
  const [domainName, setDomainName] = useState("");
  const [registrar, setRegistrar] = useState("godaddy"); // default

  return (
    <div className="p-4">
      {!isConnected ? (
        <button onClick={() => connect()} className="btn btn-primary">
          Connect Wallet
        </button>
      ) : (
        <>
          <p>Connected: {address}</p>
          <div className="mb-4">
            <label className="block mb-1">Domain Name</label>
            <input
              type="text"
              value={domainName}
              onChange={(e) => setDomainName(e.target.value)}
              className="border p-2 w-full"
              placeholder="Enter domain name"
            />
          </div>
          <div className="mb-4">
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
          <button
            onClick={() => onMint({ domainName, registrar })}
            className="btn btn-success"
          >
            Mint Domain NFT ($100)
          </button>
          <button
            onClick={() => onBurn()}
            className="btn btn-warning mt-2"
          >
            Burn NFT (Refund 80%)
          </button>
        </>
      )}
    </div>
  );
}
