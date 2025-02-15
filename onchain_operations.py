import os
import json
from web3 import Web3
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Retrieve environment variables
RPC_URL = os.getenv("RPC_URL")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
REBALANCER_ADDRESS = os.getenv("REBALANCER_ADDRESS")

# Convert the contract address to checksum format
REBALANCER_ADDRESS = Web3.to_checksum_address(REBALANCER_ADDRESS)

# Connect to the network
web3 = Web3(Web3.HTTPProvider(RPC_URL))
if web3.is_connected():
    print("Connected to network")
else:
    print("Connection failed")
    exit(1)

# Load the ABI for the Rebalancer contract from the artifacts file
with open("artifacts/contracts/Rebalancer.sol/Rebalancer.json", "r") as f:
    contract_json = json.load(f)
    rebalancer_abi = contract_json["abi"]

# Create the contract instance
rebalancer = web3.eth.contract(address=REBALANCER_ADDRESS, abi=rebalancer_abi)

def trigger_rebalance():
    # Create an account object from your private key
    account = web3.eth.account.from_key(PRIVATE_KEY)
    
    # Get the nonce for the account
    nonce = web3.eth.get_transaction_count(account.address)
    
    # Build the transaction to call the 'rebalance' function
    txn = rebalancer.functions.rebalance().build_transaction({
        'chainId': web3.eth.chain_id,
        'gas': 300000,
        'gasPrice': web3.to_wei('2', 'gwei'),
        'nonce': nonce,
    })
    
    # Sign the transaction with your private key
    signed_txn = web3.eth.account.sign_transaction(txn, PRIVATE_KEY)
    
    # Send the transaction
    tx_hash = web3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print("Rebalance transaction sent, tx hash:", tx_hash.hex())

if __name__ == "__main__":
    trigger_rebalance()
