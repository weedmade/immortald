# Immortal Domains

Immortal Domains is a decentralized, DAO-governed system built on the Base Sepolia blockchain. It transforms traditional domain renewals into a self-sustaining, yield-generating process.

## What's Done

- **Smart Contracts:**
  - *DomainNFT.sol*: Smart contract for minting Domain NFTs.
  - *Rebalancer.sol*: Contract for on-chain rebalancing operations.
  
- **Backend API Routes (Next.js):**
  - **Mint API:** Uses ethers.js to interact with the DomainNFT contract and mint a Domain NFT.
  - **Burn API:** Allows users to burn their NFT to receive an 80% refund.
  - **Yield API:** Fetches yield data from StakeKit.
  - **Sentiment API:** Uses Duck AI for market sentiment analysis.

- **User Interface:**
  - A simple Next.js dashboard that allows users to:
    - Connect/disconnect their wallet.
    - Enter a domain name.
    - Choose a registrar (placeholder list: GoDaddy, Namecheap, etc.).
    - Mint a Domain NFT (for ~$100) to cover domain renewal costs.
    - Burn the NFT at any time for an 80% refund.

## What's Missing

- **Full Integration of Data:**
  - Connecting StakeKit yield data with a decision engine.
  - Integrating Duck AI market sentiment analysis to determine optimal asset allocation.
- **Automated On-Chain Operations:**
  - An agent to trigger domain renewal payments on-chain when an NFT is about to expire (3 days before expiration).
- **Registrar API Integration:**
  - Actual integration with registrar APIs that accept crypto payments.
- **Enhanced UI/UX & Error Handling:**
  - Final UI polishing and comprehensive error handling/logging.

## Setup Instructions

### Prerequisites

- **Node.js** (v14 or later)
- **Python 3.x**
- **Git** installed

### Environment Variables

Create a `.env` file in the project root with the following variables (adjust values as needed):

STAKEKIT_API_KEY=your_stakekit_api_key RPC_URL=https://base-sepolia.gateway.tenderly.co/your_project_id PRIVATE_KEY=your_private_key DOMAIN_NFT_ADDRESS=your_domain_nft_contract_address REBALANCER_ADDRESS=your_rebalancer_contract_address STAKEKIT_BASE_URL=https://api.stakek.it/v1 NEXT_PUBLIC_STAKEKIT_API_KEY=your_stakekit_api_key NEXT_PUBLIC_STAKEKIT_BASE_URL=https://api.stakek.it/v1 NEXT_PUBLIC_RPC_URL=https://base-sepolia.gateway.tenderly.co/your_project_id DUCKAI_API_KEY=your_duckai_api_key
ruby
Копировать

> **Note:** Ensure that `.env` is added to `.gitignore` so that sensitive data is not committed to the repository.

### Backend Setup

1. **Activate the Python Virtual Environment and Install Dependencies:**
   ```bash
   source immortal/bin/activate
   pip install -r requirements.txt --break-system-packages
Dashboard Setup
Navigate to the Dashboard Folder and Install Dependencies:
bash
Копировать
cd dashboard
npm install
Run the Dashboard:
bash
Копировать
npm run dev
Testing API Endpoints
Mint NFT:
Send a POST request to http://localhost:3000/api/mint with a JSON body like:
json
Копировать
{
  "domainName": "example.com",
  "registrar": "godaddy"
}
Burn NFT:
Send a POST request to http://localhost:3000/api/burn.
Fetch Yield Data:
Send a GET request to http://localhost:3000/api/yields.
Market Sentiment:
Send a POST request to http://localhost:3000/api/sentiment with:
json
Копировать
{
  "query": "Analyze market sentiment for Polygon staking yields"
}
Future Work
Integrate Full Data Flow:
Fully integrate StakeKit yield data and Duck AI sentiment into a decision engine to determine asset allocation.
Automated Domain Renewal:
Implement an on-chain agent to monitor NFT expiration and automatically trigger renewal payments.
Registrar API Integration:
Connect with registrar APIs that support crypto payments.
UI/UX Improvements:
Enhance the dashboard's appearance and improve error handling/logging.