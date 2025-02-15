import os
import json
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# For demonstration, we'll load yield data from a local JSON file
YIELD_DATA_FILE = "yield_data.json"

# Define a threshold APY for rebalancing decisions
# For example, if the APY is below 30%, we decide to exit that pool.
APY_THRESHOLD = 0.30

def load_yield_data(filename=YIELD_DATA_FILE):
    """Load yield data from a JSON file."""
    try:
        with open(filename, "r") as f:
            data = json.load(f)
            return data
    except Exception as e:
        print(f"Error loading yield data: {e}")
        return None

def analyze_yield(data):
    """
    Analyze the yield data and decide which pools to rebalance.
    
    For each pool, if the APY is below the threshold, mark it for exit.
    Otherwise, mark it as acceptable.
    """
    if not data or "pools" not in data:
        print("No valid pool data found.")
        return None

    decisions = {}
    for pool in data["pools"]:
        pool_id = pool.get("id")
        pool_name = pool.get("name", f"Pool {pool_id}")
        apy = pool.get("APY", 0)
        if apy < APY_THRESHOLD:
            decision = "exit"
        else:
            decision = "hold/enter"
        decisions[pool_id] = {
            "pool_name": pool_name,
            "APY": apy,
            "decision": decision
        }
    return decisions

def main():
    # Load yield data from the JSON file (previously stored by stakekit_integration.py)
    yield_data = load_yield_data()
    if yield_data is None:
        print("Using fallback simulated yield data.")
        yield_data = {
            "pools": [
                {"id": 1, "name": "Pool A", "APY": 0.35},
                {"id": 2, "name": "Pool B", "APY": 0.28}
            ]
        }
    
    # Analyze the yield data
    decisions = analyze_yield(yield_data)
    if decisions:
        print("Rebalancing Decisions:")
        for pool_id, info in decisions.items():
            print(f"{info['pool_name']} (ID: {pool_id}) - APY: {info['APY']*100:.2f}% => Decision: {info['decision']}")
    else:
        print("No decisions could be made.")

if __name__ == "__main__":
    main()
