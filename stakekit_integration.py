import os
import requests

# Load API Key from environment or replace with your key
STAKEKIT_API_KEY = "f8ba6223-ac90-47a5-9ffc-d563de0a37c8"
BASE_URL = "https://api.stakek.it/v2"

# Define headers
headers = {
    "accept": "application/json",
    "X-API-KEY": STAKEKIT_API_KEY
}

# Fetch yields with sorting and filtering
def get_yields():
    url = f"{BASE_URL}/yields"
    params = {
        "network": "polygon",      # Filtering by Ethereum network
        "limit": 5                  # Limiting the results to 5 items
    }
    response = requests.get(url, headers=headers, params=params)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}, {response.text}")
        return None

# Example usage
if __name__ == "__main__":
    yields = get_yields()
    if yields:
        print("Yields:", yields)
