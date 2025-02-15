// dashboard/app/api/mint/route.js
import { NextResponse } from "next/server";
import { ethers } from "ethers";
// Adjust the import path for your config
import { DOMAIN_NFT_ADDRESS } from "@/config";
const domainNftAbi = [ /* Insert your DomainNFT contract ABI here */ ];

export async function POST(request) {
  try {
    const { domainName, registrar } = await request.json();

    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contract = new ethers.Contract(DOMAIN_NFT_ADDRESS, domainNftAbi, wallet);

    // Calculate the mint cost (example: $100 converted to appropriate token value)
    const mintCost = ethers.utils.parseUnits("100", 18);

    const tx = await contract.mintDomain(domainName, registrar, mintCost);
    await tx.wait();

    return NextResponse.json({ success: true, txHash: tx.hash });
  } catch (error) {
    console.error("Mint API error:", error);
    return NextResponse.error();
  }
}
