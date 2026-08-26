#!/bin/bash
# Run Playwright E2E tests with a virtual display for WSL2/headless Linux.
#
# Rendering through WSLg pops every Electron window the suite launches onto the Windows desktop
# for the whole run; the virtual display keeps them off-screen. Note this is not the same
# environment as WSLg: a bare Xvfb has no window manager and a different default window size
# (fixtures/isolated.fixture.ts force-resizes for exactly that reason), so suites that depend on
# compositor behavior can legitimately differ.
#
# Usage:
#   ./run-e2e-wsl.sh                            # Smoke tests (default)
#   ./run-e2e-wsl.sh --grep "smoke"             # Arguments are forwarded to the smoke run
#   ./run-e2e-wsl.sh --wrap <command> [args…]   # Run ANY command inside the virtual display
#
# --wrap is an explicit opt-in, and it is deliberately not inferred from the first argument:
# guessing (e.g. probing PATH) silently turns `run-e2e-wsl.sh find` into a run of GNU find that
# exits 0 having run no tests, which is the false green run-isolated.mjs also guards against.
#
#   ./run-e2e-wsl.sh --wrap npm run test:e2e:isolated multi-window
#   ./run-e2e-wsl.sh --wrap npx playwright test --config e2e-tests/playwright.config.ts \
#       --project=isolated
#
# Two things to know about wrapped commands:
#   * npm eats flags, so an npm script needs its own `--` before Playwright flags:
#     `--wrap npm run test:e2e:smoke -- --grep foo`. The default form (no `--wrap`) inserts
#     that `--` for you.
#   * Playwright needs `--config`; this script cd's to the repo root, where there is no config.
#
# The wrap only helps when the Electron app is launched INSIDE it. Suites built on
# fixtures/cdp.fixture.ts attach over port 9223 to an app you started separately
# (all of tests/enhanced-resources/, plus isolated/title-bar/),
# so wrapping the Playwright process alone changes nothing for them. On Linux
# .erb/scripts/refresh.sh already starts that app under its own Xvfb, so those runs are off the
# desktop without this script.

set -e

if ! command -v xvfb-run >/dev/null 2>&1; then
    echo "Error: xvfb-run not found. Install it, or run the tests directly on a visible" >&2
    echo "display with 'npm run test:e2e:smoke'." >&2
    echo "" >&2
    echo "Install Xvfb and required dependencies:" >&2
    echo "  sudo apt update" >&2
    echo "  sudo apt install -y xvfb libxss1 libnss3 libatk1.0-0 libatk-bridge2.0-0 \\" >&2
    echo "    libcups2 libdrm2 libgbm1 libgtk-3-0 libasound2t64" >&2
    echo "" >&2
    echo "Then run: npx playwright install --with-deps chromium" >&2
    exit 1
fi

# Change to repo root. Relative paths in a wrapped command resolve from here, not from where you
# invoked the script.
cd "$(dirname "$0")/.."

if [ "${1-}" = "--wrap" ]; then
    shift
    if [ $# -eq 0 ]; then
        echo "Error: --wrap needs a command to run." >&2
        exit 2
    fi
else
    set -- npm run test:e2e:smoke -- "$@"
fi

# Report what actually runs, after the mode is decided, on stderr so a wrapped command's stdout
# stays consumable (e.g. --reporter=json redirected to a file).
echo "Running with virtual display (Xvfb): $*" >&2

# Xvfb's 1280x1024 default would do for the suites this script launches itself (isolated.fixture
# sizes its window to 1280x800). Full HD is here to match .erb/scripts/refresh.sh, so that a
# wrapped command which starts the app AND Playwright together still satisfies
# fixtures/cdp.fixture.ts, which fails a screenshot below Full HD.
# exec so that Ctrl-C reaches xvfb-run directly instead of orphaning it behind this shell.
# If Xvfb itself fails to start, xvfb-run only says so; add --error-file=/dev/stderr for the
# detail. It is not on by default because it also prints Xvfb's normal startup chatter.
exec xvfb-run --auto-servernum --server-args="-screen 0 1920x1080x24" "$@"
