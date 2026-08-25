#!/bin/bash
# Quick app refresh - stops, rebuilds, and restarts Platform.Bible with CDP enabled
# This is a FAST operation (~30s). Agents should run this freely without optimization concerns.
#
# Environment passed through to the app:
#   DEV_NOISY=true    Load the test extensions (helloRock3 etc.) and their default layout. Off by
#                     default, which is what interactive development wants. It matters only for
#                     suites that ATTACH to the app this script starts — the CDP ones under
#                     e2e-tests/playwright-cdp.config.ts. Launch-mode suites spawn their own
#                     Electron via launchElectronApp, which sets its own DEV_NOISY default
#                     (helpers.ts), so this has no effect on them:
#                       DEV_NOISY=true ./.erb/scripts/refresh.sh
#   Any other variable the app reads is likewise inherited; this script does not sanitize the
#   environment.
set -e
cd "$(dirname "$0")/../.."

echo "Stopping app..."
npm stop 2>/dev/null || true

echo "Building..."
npm run build


# Safety net: Claude Code / VS Code set this, which makes Electron act as plain Node.js
unset ELECTRON_RUN_AS_NODE

# Start with CDP enabled. On Linux, use xvfb for headless operation.
# On macOS (and other platforms without xvfb), show the GUI window.
# PT_NO_DEVTOOLS keeps the docked DevTools panel closed. It takes roughly 555px of the window, so
# an app started for automation otherwise hands every CDP-based suite a renderer about half the
# width a user sees, with dock tabs ending up underneath web views. F12 still opens it on demand.
#
# --window-size rather than --maximize under xvfb: a bare Xvfb has no window manager, so there is
# nothing to honour a maximize request and the window stays at its default (~1024px). The value
# must be a separate argv token — `--window-size 1920x1080`, never `--window-size=1920x1080` —
# because the parser matches the flag by exact token (src/node/utils/command-line.util.ts:104).
if command -v xvfb-run >/dev/null 2>&1; then
  echo "Starting with CDP enabled (headless via xvfb, 1920x1080, DevTools closed)..."
  xvfb-run --auto-servernum --server-args="-screen 0 1920x1080x24" \
      env PT_NO_DEVTOOLS=true \
      MAIN_ARGS="--remote-debugging-port=9223 --window-size 1920x1080" npm start &
else
  # A real window manager honours --maximize, and a visible window is what a human wants here.
  echo "Starting with CDP enabled (visible window — xvfb not available)..."
  env PT_NO_DEVTOOLS=true MAIN_ARGS="--remote-debugging-port=9223 --maximize" npm start &
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
