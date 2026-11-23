#!/bin/bash
# Quick visual verification for a component
# Usage: quick-verify.sh <selector> <output-dir> [filename]
#
# Arguments:
#   selector   - CSS selector for the component (e.g., '[data-testid="my-component"]')
#   output-dir - Directory for screenshot output (REQUIRED)
#   filename   - Screenshot filename (optional, defaults to verify-YYYYMMDD-HHMMSS.png)
#                Pass a custom output filename here, e.g. render-verification.png

if [ -z "$1" ] || [ -z "$2" ]; then
  echo "Usage: quick-verify.sh <selector> <output-dir> [filename]"
  echo ""
  echo "Arguments:"
  echo "  selector   - CSS selector (e.g., '[data-testid=\"component\"]')"
  echo "  output-dir - Evidence directory (REQUIRED)"
  echo "  filename   - Screenshot filename (optional)"
  echo ""
  echo "Examples:"
  echo "  # Default filename (verify-YYYYMMDD-HHMMSS.png):"
  echo "  quick-verify.sh '[data-testid=\"my-component\"]' ./evidence/"
  echo ""
  echo "  # Custom output filename:"
  echo "  quick-verify.sh '[data-testid=\"my-component\"]' ./evidence/ render-verification.png"
  exit 1
fi

SELECTOR="$1"
OUTPUT_DIR="$2"
FILENAME="${3:-verify-$(date +%Y%m%d-%H%M%S).png}"
SCRIPT_DIR="$(dirname "$0")"

# Ensure output directory exists
mkdir -p "$OUTPUT_DIR"

echo "=== Visual Verification: $SELECTOR ==="
echo ""

# 1. Check CDP
echo "1. CDP Status:"
if curl -s -m 2 http://localhost:9223/json > /dev/null 2>&1; then
  echo "   ✓ CDP available on port 9223"
  CDP_OK=true
else
  echo "   ✗ CDP not available - run ./.erb/scripts/refresh.sh"
  CDP_OK=false
fi
echo ""

if [ "$CDP_OK" = false ]; then
  echo "RESULT: FAIL (CDP not available)"
  exit 1
fi

# 2. Check component exists in DOM + capture screenshot via pw-server.mjs
echo "2. DOM Check + Screenshot:"
SCREENSHOT="$OUTPUT_DIR/$FILENAME"
# Build command JSON via node (not jq) for cross-platform parity with the rest of
# the project — jq is not reliably installed on Windows, but node is a hard
# dependency here (pw-server.mjs). Pass values via argv so they are JSON-escaped
# safely (no shell injection into the JSON).
CMD1=$(node -e 'process.stdout.write(JSON.stringify({cmd:"visible",selector:process.argv[1]}))' "$SELECTOR")
CMD2=$(node -e 'process.stdout.write(JSON.stringify({cmd:"screenshot",output:process.argv[1]}))' "$SCREENSHOT")
PW_RESPONSE=$(printf '%s\n%s\n{"cmd":"quit"}\n' "$CMD1" "$CMD2" \
  | node "$SCRIPT_DIR/pw-server.mjs")

# Parse responses (line 1 = connected, line 2 = visible result, line 3 = screenshot result)
VISIBLE_LINE=$(echo "$PW_RESPONSE" | sed -n '2p')
SCREENSHOT_LINE=$(echo "$PW_RESPONSE" | sed -n '3p')

# Check DOM visibility (parse with node, not python3, for cross-platform parity)
if node -e 'process.exit(JSON.parse(process.argv[1] || "{}").visible ? 0 : 1)' "$VISIBLE_LINE"; then
  echo "   ✓ Component found: $SELECTOR"
  DOM_OK=true
else
  echo "   ✗ Component NOT found: $SELECTOR"
  DOM_OK=false
fi

# Check screenshot capture (parse with node, not python3, for cross-platform parity)
if node -e 'process.exit(JSON.parse(process.argv[1] || "{}").path ? 0 : 1)' "$SCREENSHOT_LINE"; then
  echo "   ✓ Screenshot saved: $SCREENSHOT"
  SCREENSHOT_OK=true
else
  echo "   ✗ Failed to capture screenshot"
  SCREENSHOT_OK=false
fi
echo ""

# 3. Check console errors
# The renderer never writes its own log file. electron-log routes renderer console
# output into the single main log via spyRendererConsole (logger.service.ts), where
# renderer-originated lines carry a [rend] tag and error-level lines carry [error].
# Dev runs use the "Electron" app name; packaged runs use "platform-bible"
# (release/app/package.json name) — check both.
echo "3. Console Errors:"
MAIN_LOG=~/.config/Electron/logs/main.log
[ -f "$MAIN_LOG" ] || MAIN_LOG=~/.config/platform-bible/logs/main.log
if [ ! -f "$MAIN_LOG" ]; then
  # No log file means we cannot determine console health — report a distinct
  # "unknown" state rather than falsely claiming the log is clean.
  echo "   ? Main log not found (checked ~/.config/Electron and ~/.config/platform-bible) - console state unknown"
  CONSOLE_OK=unknown
else
  ERRORS=$(grep -F "[error]" "$MAIN_LOG" | tail -5)
  if [ -z "$ERRORS" ]; then
    echo "   ✓ No errors in main log ($MAIN_LOG)"
    CONSOLE_OK=true
  else
    echo "   ⚠ Found errors (renderer lines tagged [rend]):"
    echo "$ERRORS" | sed 's/^/   /'
    CONSOLE_OK=false
  fi
fi
echo ""

# Summary
echo "=== Summary ==="
echo "CDP:        $([ "$CDP_OK" = true ] && echo "✓ PASS" || echo "✗ FAIL")"
echo "DOM:        $([ "$DOM_OK" = true ] && echo "✓ PASS" || echo "✗ FAIL")"
case "$CONSOLE_OK" in
  true)    CONSOLE_SUMMARY="✓ PASS" ;;
  unknown) CONSOLE_SUMMARY="? UNKNOWN (log not found)" ;;
  *)       CONSOLE_SUMMARY="⚠ WARN" ;;
esac
echo "Console:    $CONSOLE_SUMMARY"
echo "Screenshot: $([ "$SCREENSHOT_OK" = true ] && echo "✓ PASS" || echo "✗ FAIL")"
echo ""

if [ "$CDP_OK" = true ] && [ "$DOM_OK" = true ] && [ "$SCREENSHOT_OK" = true ]; then
  echo "RESULT: PASS"
  exit 0
else
  echo "RESULT: FAIL"
  exit 1
fi
