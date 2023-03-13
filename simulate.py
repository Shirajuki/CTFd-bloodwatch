import requests
import sys

# Constants
LIVESCOREBOARD_URL = "http://localhost:3000"

team = {"name": "Dummy", "id": 1}
challenge = "Dummy challenge"
if len(sys.argv) > 1:
    # First blood announce
    print("\n[First blood]", challenge, team)
    requests.post(f"{LIVESCOREBOARD_URL}/blood", json={"team": team, "challenge": challenge})
else:
    # Pwn announce
    print("\n[PWN]", challenge, team)
    requests.post(f"{LIVESCOREBOARD_URL}/pwn", json={"team": team, "challenge": challenge})
