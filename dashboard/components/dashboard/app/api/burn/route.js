// dashboard/app/api/burn/route.js
import { NextResponse } from "next/server";
import { ethers } from "ethers";
import { DOMAIN_NFT_ADDRESS } from "@/config";
const domainNftAbi = [ /* Insert your DomainNFT contract ABI here */ ];

export async function POST(request) {
  try {
    // You might need to pass additional data like NFT ID for burning.
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contract = new ethers.Contract(DOMAIN_NFT_ADDRESS, domainNftAbi, wallet);

    const tx = await contract.burnDomain(); // Adjust with necessary parameters.
    await tx.wait();

    return NextResponse.json({ success: true, txHash: tx.hash });
  } catch (error) {
    console.error("Burn API error:", error);
    return NextResponse.error();
  }
}
