# CTFd-bloodwatch

Includes custom bloodwatch script + livescoreboard w/ popup animation and announcement

# Setup

1. Fix URL endpoints in `blood.py`
2. Run server at `/livescoreboard-server` with `npm run start`
3. Run client at `/livescoreboard-client` with `npm run serve`
4. Run polling script `blood.py` with admin session token `SESSION=1234 python3 blood.py`
5. Open live scoreboard at `localhost:4173`
