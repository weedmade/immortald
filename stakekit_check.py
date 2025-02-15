import os
import requests
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Retrieve the API key from environment variables
STAKEKIT_API_KEY = os.getenv("STAKEKIT_API_KEY")

# Define the endpoint
url = "https://api.stakek.it/v1/yields/balances"

# Set up headers with the API key
headers = {
    "Authorization": f"Bearer {STAKEKIT_API_KEY}",
    "Accept": "application/json",
    "Content-Type": "application/json"
}

# Construct the payload with addresses and integration IDs
payload = {
    "addresses": ["address1", "address2"],  # Replace with actual addresses
    "integrationIds": ["integrationId1", "integrationId2"]  # Replace with actual integration IDs
}

# Make the POST request to the yields balances endpoint
response = requests.post(url, headers=headers, json=payload)

# Check if the request was successful
if response.status_code == 200:
    # Parse the JSON response
    balances_data = response.json()
    print("Yield Balances Data:")
    print(balances_data)
else:
    print(f"Error fetching yield balances: {response.status_code}")
    print(response.text)

