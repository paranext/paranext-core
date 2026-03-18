#!/bin/bash
# Quick visual verification for a component
# Usage: quick-verify.sh <selector> <output-dir> [filename]
#
# Arguments:
#   selector   - CSS selector for the component (e.g., '[data-testid="my-component"]')
#   output-dir - Directory for screenshot output (REQUIRED)
#   filename   - Screenshot filename (optional, defaults to verify-YYYYMMDD-HHMMSS.png)
#                For iteration-planner compatibility, use: {WP}-render-verification.png

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
  echo "  # Custom filename for iteration-planner compatibility:"
  echo "  quick-verify.sh '[data-testid=\"my-component\"]' ./evidence/ UI-PKG-001-render-verification.png"
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
  echo "   ✗ CDP not available - run ./refresh.sh"
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
CMD1=$(jq -cn --arg sel "$SELECTOR" '{"cmd":"visible","selector":$sel}')
CMD2=$(jq -cn --arg out "$SCREENSHOT" '{"cmd":"screenshot","output":$out}')
PW_RESPONSE=$(printf '%s\n%s\n{"cmd":"quit"}\n' "$CMD1" "$CMD2" \
  | node "$SCRIPT_DIR/pw-server.mjs" 2>/dev/null)

# Parse responses (line 1 = connected, line 2 = visible result, line 3 = screenshot result)
VISIBLE_LINE=$(echo "$PW_RESPONSE" | sed -n '2p')
SCREENSHOT_LINE=$(echo "$PW_RESPONSE" | sed -n '3p')

# Check DOM visibility
if echo "$VISIBLE_LINE" | python3 -c "import sys,json; r=json.load(sys.stdin); exit(0 if r.get('visible') else 1)" 2>/dev/null; then
  echo "   ✓ Component found: $SELECTOR"
  DOM_OK=true
else
  echo "   ✗ Component NOT found: $SELECTOR"
  DOM_OK=false
fi

# Check screenshot capture
if echo "$SCREENSHOT_LINE" | python3 -c "import sys,json; r=json.load(sys.stdin); exit(0 if r.get('path') else 1)" 2>/dev/null; then
  echo "   ✓ Screenshot saved: $SCREENSHOT"
  SCREENSHOT_OK=true
else
  echo "   ✗ Failed to capture screenshot"
  SCREENSHOT_OK=false
fi
echo ""

# 3. Check console errors
echo "3. Console Errors:"
ERRORS=$(grep -i "error\|exception" ~/.config/platform.bible/logs/renderer.log 2>/dev/null | tail -5)
if [ -z "$ERRORS" ]; then
  echo "   ✓ No errors in renderer log"
  CONSOLE_OK=true
else
  echo "   ⚠ Found errors:"
  echo "$ERRORS" | sed 's/^/   /'
  CONSOLE_OK=false
fi
echo ""

# Summary
echo "=== Summary ==="
echo "CDP:        $([ "$CDP_OK" = true ] && echo "✓ PASS" || echo "✗ FAIL")"
echo "DOM:        $([ "$DOM_OK" = true ] && echo "✓ PASS" || echo "✗ FAIL")"
echo "Console:    $([ "$CONSOLE_OK" = true ] && echo "✓ PASS" || echo "⚠ WARN")"
echo "Screenshot: $([ "$SCREENSHOT_OK" = true ] && echo "✓ PASS" || echo "✗ FAIL")"
echo ""

if [ "$CDP_OK" = true ] && [ "$DOM_OK" = true ] && [ "$SCREENSHOT_OK" = true ]; then
  echo "RESULT: PASS"
  exit 0
else
  echo "RESULT: FAIL"
  exit 1
fi
