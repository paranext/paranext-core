#!/bin/bash
# Platform.Bible Environment Pre-Flight Check
#
# Use this script to verify the development environment is ready for
# AI agents that need visual verification or PAPI access.
#
# Usage:
#   .claude/scripts/preflight-check.sh
#
# Exit codes:
#   0 - All checks passed
#   1 - One or more checks failed

set -e

echo "=== Platform.Bible Pre-Flight Check ==="
echo ""

ERRORS=0
WARNINGS=0

# Colors for output (if terminal supports it)
if [ -t 1 ]; then
  RED='\033[0;31m'
  GREEN='\033[0;32m'
  YELLOW='\033[0;33m'
  NC='\033[0m' # No Color
else
  RED=''
  GREEN=''
  YELLOW=''
  NC=''
fi

# Check 1: Renderer (Webpack Dev Server) on port 1212
echo -n "Checking localhost:1212 (Renderer)... "
if curl -s -m 2 http://localhost:1212 > /dev/null 2>&1; then
  echo -e "${GREEN}OK${NC}"
else
  echo -e "${RED}FAIL${NC}"
  ERRORS=$((ERRORS+1))
fi

# Check 2: WebSocket Server (PAPI) on port 8876
echo -n "Checking localhost:8876 (WebSocket)... "
if curl -s -m 2 http://localhost:8876 > /dev/null 2>&1; then
  echo -e "${GREEN}OK${NC}"
else
  echo -e "${RED}FAIL${NC}"
  ERRORS=$((ERRORS+1))
fi

# Check 3: Electron process
echo -n "Checking Electron process... "
if pgrep -f "electron.*paranext" > /dev/null 2>&1; then
  echo -e "${GREEN}RUNNING${NC}"
else
  echo -e "${YELLOW}NOT FOUND${NC}"
  WARNINGS=$((WARNINGS+1))
fi

# Check 4: websocat for PAPI client
echo -n "Checking websocat... "
if which websocat > /dev/null 2>&1; then
  echo -e "${GREEN}OK${NC} ($(which websocat))"
else
  echo -e "${YELLOW}NOT INSTALLED${NC} (papi-client skill limited)"
  WARNINGS=$((WARNINGS+1))
fi

# Check 5: .NET Data Provider process (optional)
echo -n "Checking .NET Data Provider... "
if pgrep -f "ParanextDataProvider" > /dev/null 2>&1; then
  echo -e "${GREEN}RUNNING${NC}"
else
  echo -e "${YELLOW}NOT FOUND${NC} (may be bundled with main app)"
fi

echo ""
echo "=== Summary ==="

if [ $ERRORS -eq 0 ]; then
  echo -e "${GREEN}All critical checks PASSED${NC}"
  if [ $WARNINGS -gt 0 ]; then
    echo -e "${YELLOW}$WARNINGS warning(s)${NC}"
  fi
  echo ""
  echo "Environment is ready for:"
  echo "  - visual-verification skill"
  echo "  - papi-client skill (API queries)"
  echo "  - Visual evidence capture"
  exit 0
else
  echo -e "${RED}$ERRORS check(s) FAILED${NC}"
  echo ""
  echo "To fix, start Platform.Bible:"
  echo ""
  echo "    ./.erb/scripts/refresh.sh"
  echo ""
  echo "Wait for the script to complete (shows 'Platform.Bible is ready')."
  echo ""
  echo "Then re-run this check."
  exit 1
fi
