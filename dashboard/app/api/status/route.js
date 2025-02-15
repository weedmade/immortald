// dashboard/app/api/mint/route.js
import { NextResponse } from "next/server";
import { ethers } from "ethers";
import domainNftAbi from "@/abi/domainNftAbi.json"; // adjust the path if needed

const DOMAIN_NFT_ADDRESS = process.env.DOMAIN_NFT_ADDRESS; 

export async function POST(request) {
  try {
    // If your contract function does not accept parameters,
    // you can remove domainName and registrar from the call.
    // const { domainName, registrar } = await request.json();

    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contract = new ethers.Contract(DOMAIN_NFT_ADDRESS, domainNftAbi, wallet);

    // If your mint function is named "mintDomainNFT" and takes no parameters:
    const tx = await contract.mintDomainNFT();
    await tx.wait();

    return NextResponse.json({ success: true, txHash: tx.hash });
  } catch (error) {
    console.error("Mint API error:", error);
    return NextResponse.error();
  }
}
