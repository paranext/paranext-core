#!/bin/bash
# Quick app refresh - stops, rebuilds, and restarts Platform.Bible with CDP enabled
# This is a FAST operation (~30s). Agents should run this freely without optimization concerns.
set -e
cd "$(dirname "$0")"

echo "Stopping app..."
npm stop 2>/dev/null || true

echo "Building..."
npm run build

# Safety net: Claude Code / VS Code set this, which makes Electron act as plain Node.js
unset ELECTRON_RUN_AS_NODE

# Start with CDP enabled. On Linux, use xvfb for headless operation.
# On macOS (and other platforms without xvfb), show the GUI window.
if command -v xvfb-run >/dev/null 2>&1; then
  echo "Starting with CDP enabled (headless via xvfb)..."
  xvfb-run --auto-servernum --server-args="-screen 0 1920x1080x24" \
      env MAIN_ARGS="--remote-debugging-port=9223 --maximize" npm start &
else
  echo "Starting with CDP enabled (visible window — xvfb not available)..."
  env MAIN_ARGS="--remote-debugging-port=9223 --maximize" npm start &
fi
APP_PID=$!

# Kill the background process on failure/exit
cleanup() {
  if kill -0 "$APP_PID" 2>/dev/null; then
    echo "Cleaning up background process $APP_PID..."
    kill "$APP_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT

# Wait for all ports (max 3 minutes)
echo "Waiting for app to be ready..."
for i in {1..36}; do
  RENDERER=$(curl -s -m 2 http://localhost:1212 > /dev/null 2>&1 && echo "UP" || echo "DOWN")
  WS=$(curl -s -m 2 http://localhost:8876 > /dev/null 2>&1 && echo "UP" || echo "DOWN")
  CDP=$(curl -s -m 2 http://localhost:9223/json > /dev/null 2>&1 && echo "UP" || echo "DOWN")
  if [ "$RENDERER" = "UP" ] && [ "$WS" = "UP" ] && [ "$CDP" = "UP" ]; then
    echo "✓ App ready (Renderer: $RENDERER, WebSocket: $WS, CDP: $CDP)"
    # Disable the trap — app should keep running after successful startup
    trap - EXIT
    exit 0
  fi
  echo "  Waiting... (Renderer: $RENDERER, WebSocket: $WS, CDP: $CDP)"
  sleep 5
done
echo "✗ Timeout waiting for app"
exit 1
