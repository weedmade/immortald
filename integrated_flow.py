import os
import json
from web3 import Web3
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

RPC_URL = os.getenv("RPC_URL")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
REBALANCER_ADDRESS = Web3.to_checksum_address(os.getenv("REBALANCER_ADDRESS"))
YIELD_DATA_FILE = "yield_data.json"
APY_THRESHOLD = 0.30  # example threshold

# Connect to the network
web3 = Web3(Web3.HTTPProvider(RPC_URL))
if web3.is_connected():
    print("Connected to network")
else:
    print("Connection failed")
    exit(1)

# Load the ABI for the Rebalancer contract
with open("artifacts/contracts/Rebalancer.sol/Rebalancer.json", "r") as f:
    contract_json = json.load(f)
    rebalancer_abi = contract_json["abi"]

# Create contract instance
rebalancer = web3.eth.contract(address=REBALANCER_ADDRESS, abi=rebalancer_abi)

def load_yield_data(filename=YIELD_DATA_FILE):
    try:
        with open(filename, "r") as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading yield data: {e}")
        return None

def should_rebalance(yield_data):
    # Simple decision logic: if any pool's APY is below the threshold, we decide to rebalance.
    pools = yield_data.get("pools", [])
    for pool in pools:
        if pool.get("APY", 1) < APY_THRESHOLD:
            return True
    return False

def trigger_rebalance():
    account = web3.eth.account.from_key(PRIVATE_KEY)
    nonce = web3.eth.get_transaction_count(account.address)
    txn = rebalancer.functions.rebalance().build_transaction({
        'chainId': web3.eth.chain_id,
        'gas': 300000,
        'gasPrice': web3.to_wei('2', 'gwei'),
        'nonce': nonce,
    })
    signed_txn = web3.eth.account.sign_transaction(txn, PRIVATE_KEY)
    tx_hash = web3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print("Rebalance transaction sent, tx hash:", tx_hash.hex())

def main():
    yield_data = load_yield_data()
    if not yield_data:
        print("No yield data available. Exiting.")
        return
    print("Yield data:", yield_data)
    if should_rebalance(yield_data):
        print("Decision: Rebalance triggered.")
        trigger_rebalance()
    else:
        print("Decision: No rebalance needed.")

if __name__ == "__main__":
    main()
