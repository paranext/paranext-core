#!/bin/bash
# Playwright Interaction Helper — single-shot wrapper around pw-server.mjs
#
# Sends one command and returns one JSON response line.
# For multi-command sequences, pipe directly to pw-server.mjs instead.
#
# Usage:
#   pw-interact.sh '{"cmd":"screenshot","output":"/tmp/ss.png"}'
#   pw-interact.sh '{"cmd":"click","role":"menuitem","name":"Help"}'
#   pw-interact.sh '{"cmd":"fill","selector":"input","text":"Genesis"}'
#   pw-interact.sh '{"cmd":"visible","role":"button","name":"Save"}'
#
# For multi-command sequences (faster — single connection):
#   echo '{"cmd":"click","role":"menuitem","name":"Help"}
#   {"cmd":"screenshot","output":"/tmp/after-click.png"}
#   {"cmd":"quit"}' | node .claude/skills/visual-verification/scripts/pw-server.mjs 2>/dev/null
#
# Exit codes:
#   0 = success (response on stdout as JSON)
#   1 = error (error JSON on stdout)

set -uo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PW_SERVER="$SCRIPT_DIR/pw-server.mjs"

case "${1:-}" in
  ""|--help|-h)
    echo "Usage: pw-interact.sh '<json-command>'"
    echo ""
    echo "Examples:"
    echo "  pw-interact.sh '{\"cmd\":\"screenshot\",\"output\":\"/tmp/ss.png\"}'"
    echo "  pw-interact.sh '{\"cmd\":\"click\",\"role\":\"button\",\"name\":\"Save\"}'"
    echo "  pw-interact.sh '{\"cmd\":\"eval\",\"code\":\"document.title\"}'"
    exit 0
    ;;
esac

COMMAND="$1"

# Validate JSON
if ! echo "$COMMAND" | python3 -c "import sys,json; json.load(sys.stdin)" 2>/dev/null; then
  echo '{"error":"Invalid JSON command"}'
  exit 1
fi

# Check CDP
if ! curl -s -m 2 http://localhost:9223/json > /dev/null 2>&1; then
  echo '{"error":"CDP not available on port 9223. Start app with: MAIN_ARGS=\"--remote-debugging-port=9223\" npm start"}'
  exit 1
fi

# Single-shot: connect, run command, quit
# Output: line 1 = connected, line 2 = command result, line 3 = quit ack
RESPONSE=$(printf '%s\n{"cmd":"quit"}\n' "$COMMAND" | node "$PW_SERVER" 2>/dev/null)

# Normally line 1 is the connected banner and line 2 is the command result.
# But on a startup failure (e.g. CDP reachable but no renderer page), the
# server emits a SINGLE error line as line 1 and exits — leaving line 2 empty.
LINE1=$(echo "$RESPONSE" | sed -n '1p')
LINE2=$(echo "$RESPONSE" | sed -n '2p')

# If there is no result line, or line 1 carries an "error" field (no banner
# was printed), surface the error from line 1 and fail.
if [ -z "$LINE2" ] || echo "$LINE1" | grep -q '"error"'; then
  echo "$LINE1"
  exit 1
fi

# Return just the command result (line 2)
echo "$LINE2"
