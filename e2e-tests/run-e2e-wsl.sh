#!/bin/bash
# Run Playwright E2E tests with virtual display for WSL2/headless Linux.
#
# Rendering through WSLg pops Electron windows onto the Windows desktop for the whole run;
# the virtual display keeps them off-screen with identical results.
#
# Usage:
#   ./run-e2e-wsl.sh                                # Run the smoke tests (default)
#   ./run-e2e-wsl.sh --grep "smoke"                 # Args are passed to the smoke run
#   ./run-e2e-wsl.sh --debug                        # Run the smoke tests in debug mode
#   ./run-e2e-wsl.sh npx playwright test ...        # Wrap ANY e2e command in the virtual
#   ./run-e2e-wsl.sh npm run test:e2e -- ...        #   display instead of the smoke default

set -e

# Check if xvfb-run is available
if ! command -v xvfb-run &> /dev/null; then
    echo "Error: xvfb-run not found."
    echo ""
    echo "Install Xvfb and required dependencies:"
    echo "  sudo apt update"
    echo "  sudo apt install -y xvfb libxss1 libnss3 libatk1.0-0 libatk-bridge2.0-0 \\"
    echo "    libcups2 libdrm2 libgbm1 libgtk-3-0 libasound2t64"
    echo ""
    echo "Then run: npx playwright install --with-deps chromium"
    exit 1
fi

# Change to repo root
cd "$(dirname "$0")/.."

echo "Running E2E tests with virtual display (Xvfb)..."
# A first argument that is a command name means "wrap this command"; anything else keeps the
# original behavior of forwarding the arguments to the smoke run
if [ $# -gt 0 ] && command -v "$1" &> /dev/null; then
    xvfb-run --auto-servernum --server-args="-screen 0 1920x1080x24" "$@"
else
    xvfb-run --auto-servernum --server-args="-screen 0 1920x1080x24" \
        npm run test:e2e:smoke -- "$@"
fi
