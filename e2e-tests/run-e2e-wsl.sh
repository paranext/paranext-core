#!/bin/bash
# Run Playwright E2E tests with virtual display for WSL2/headless Linux
#
# Usage:
#   ./run-e2e-wsl.sh              # Run all tests
#   ./run-e2e-wsl.sh --grep "smoke" # Run filtered tests
#   ./run-e2e-wsl.sh --debug      # Run in debug mode

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
xvfb-run --auto-servernum --server-args="-screen 0 1920x1080x24" \
    npx playwright test --config e2e-tests/playwright.config.ts --project=development "$@"
