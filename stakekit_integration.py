import os
import requests
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Retrieve the API key and base URL from environment variables
STAKEKIT_API_KEY = os.getenv("STAKEKIT_API_KEY")
BASE_URL = os.getenv("STAKEKIT_BASE_URL", "https://api.stakek.it/v2")

# Define the endpoint
YIELDS_ENDPOINT = f"{BASE_URL}/yields"

# Set up headers with the API key
headers = {
    "Authorization": f"Bearer {STAKEKIT_API_KEY}",
    "Accept": "application/json"
}

# Make the GET request to the yields endpoint
response = requests.get(YIELDS_ENDPOINT, headers=headers)

# Check if the request was successful
if response.status_code == 200:
    # Parse the JSON response
    yields_data = response.json()
    print("Yields Data:")
    print(yields_data)
else:
    print(f"Error fetching yields: {response.status_code}")
    print(response.text)
