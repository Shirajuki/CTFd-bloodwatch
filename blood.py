import os
import time
import requests
import sys
import json

# Constants
URL = "http://localhost:8000"
API_URL = "/api/v1"
# URL = "http://s2gctf.ncr.ntnu.no/play"
# API_URL = "/play/api/v1"
LIVESCOREBOARD_URL = "http://localhost:3000"
team_type = "user" # team | user

# Global data log
challenges = {}
# Retrieve initial challenges
cookies = {
    "session": os.environ['SESSION'],
}
def populate_challs():
    global challenges
    res = requests.get(f"{URL}{API_URL}/challenges", cookies=cookies)
    challs = res.json()
    for chall in challs["data"]:
        if chall["id"] not in challenges:
            challenges[chall["id"]] = {"name": chall["name"], "solves": [], "solves_num": chall["solves"]}
populate_challs()
print(json.dumps(challenges))

pages = 1
i = pages
# First loop populating user challenge solves
while i <= pages:
    res = requests.get(f"{URL}{API_URL}/submissions?type=correct&per_page=100&pages={i}", cookies=cookies)
    data = res.json()
    pages = data["meta"]["pagination"]["pages"] # Update max pages if found
    solves = data["data"]
    for solve in solves:
        cid = solve["challenge_id"]
        # Populate challs if new challs found during first search
        if cid not in challenges:
            populate_challs()
        team = solve[team_type]
        team["date"] = solve["date"]
        s = challenges[cid]["solves"]
        # If team hasn't solved before
        if team["id"] not in [x["id"] for x in s]:
            challenges[cid]["solves"].append(team)
        challenges[cid]["solves_num"] = len(challenges[cid]["solves"])
    i += 1
print(json.dumps(challenges))

def send_scoreboard():
    # Push data to scoreboard
    res = requests.get(f"{URL}{API_URL}/scoreboard", cookies=cookies)
    requests.post(f"{LIVESCOREBOARD_URL}/scoreboard", json={"scoreboard": res.json()["data"]})
send_scoreboard()

# Restart on crashes
while True:
    try:
        # While loop to check for challenge solve updates
        while True:
            print(".", end="", flush=True)
            time.sleep(5)
            
            send_scoreboard()

            # Check solves

            i = pages
            # First loop populating user challenge solves
            while i <= pages:
                res = requests.get(f"{URL}{API_URL}/submissions?type=correct&per_page=100&pages={i}", cookies=cookies)
                data = res.json()
                pages = data["meta"]["pagination"]["pages"] # Update max pages if found
                solves = data["data"]
                for solve in solves:
                    cid = solve["challenge_id"]
                    # Populate challs if new challs found during first search
                    if cid not in challenges:
                        populate_challs()
                    team = solve[team_type]
                    team["date"] = solve["date"]
                    s = challenges[cid]["solves"]
                    # If team hasn't solved before
                    if team["id"] not in [x["id"] for x in s]:
                        challenges[cid]["solves"].append(team)
                        if len(challenges[cid]["solves"]) == 1:
                            # First blood announce
                            print("\n[First blood]", solve["challenge"]["name"], team)
                            requests.post(f"{LIVESCOREBOARD_URL}/blood", json={"team": team, "challenge": solve["challenge"]["name"]})
                        else:
                            # Pwn announce
                            print("\n[PWN]", solve["challenge"]["name"], team)
                            requests.post(f"{LIVESCOREBOARD_URL}/pwn", json={"team": team, "challenge": solve["challenge"]["name"]})
                    challenges[cid]["solves_num"] = len(challenges[cid]["solves"])
                i += 1
    except KeyboardInterrupt:
        sys.exit(0)
    except Exception:
        print("---")
        print("Program crashed, restarting...")
        print("---")

