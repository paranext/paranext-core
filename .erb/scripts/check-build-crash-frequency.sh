#!/usr/bin/env bash
# check-build-crash-frequency.sh
# Scans GitHub Actions history for the V8 "unreachable code" bytecode cache crash
# in the test.yml workflow and reports how often it has occurred.
#
# Usage: bash .erb/scripts/check-build-crash-frequency.sh [--limit N]
#   --limit N   Number of workflow runs to scan (default: 100)

set -euo pipefail

REPO="paranext/paranext-core"
WORKFLOW="test.yml"
LIMIT=100
PATTERN="unreachable code"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --limit) LIMIT="$2"; shift 2 ;;
    *) echo "Unknown argument: $1"; exit 1 ;;
  esac
done

echo "Scanning last $LIMIT runs of $WORKFLOW in $REPO..."
echo "Looking for: \"$PATTERN\""
echo ""

# Fetch run list (all conclusions so we can see the ratio of failures too)
RUNS=$(gh run list \
  --workflow="$WORKFLOW" \
  --repo="$REPO" \
  --limit="$LIMIT" \
  --json databaseId,conclusion,createdAt,displayTitle \
  2>/dev/null)

TOTAL=$(echo "$RUNS" | jq 'length')
FAILED_IDS=$(echo "$RUNS" | jq -r '.[] | select(.conclusion == "failure") | .databaseId')
FAILED_COUNT=$(echo "$FAILED_IDS" | grep -c '[0-9]' || true)

echo "Runs fetched:    $TOTAL"
echo "Failed runs:     $FAILED_COUNT"
echo ""

if [[ "$FAILED_COUNT" -eq 0 ]]; then
  echo "No failed runs found in the last $TOTAL runs."
  exit 0
fi

CRASH_RUNS=()
CHECKED=0

for RUN_ID in $FAILED_IDS; do
  CHECKED=$((CHECKED + 1))
  printf "\rChecking failed run %d/%d (id: %s)..." "$CHECKED" "$FAILED_COUNT" "$RUN_ID"

  # Download only the logs from failed steps — much faster than full logs
  LOGS=$(gh run view "$RUN_ID" \
    --repo="$REPO" \
    --log-failed \
    2>/dev/null || true)

  if echo "$LOGS" | grep -q "$PATTERN"; then
    CRASH_RUNS+=("$RUN_ID")
  fi
done

echo ""
echo ""

CRASH_COUNT=${#CRASH_RUNS[@]}

echo "========================================"
echo "Results"
echo "========================================"
echo "Runs scanned:           $TOTAL"
echo "Failed runs checked:    $FAILED_COUNT"
echo "Runs with crash:        $CRASH_COUNT"

if [[ "$CRASH_COUNT" -gt 0 ]]; then
  PCT=$(awk "BEGIN { printf \"%.1f\", ($CRASH_COUNT / $TOTAL) * 100 }")
  PCT_OF_FAILED=$(awk "BEGIN { printf \"%.1f\", ($CRASH_COUNT / $FAILED_COUNT) * 100 }")
  echo "As % of all runs:       $PCT%"
  echo "As % of failed runs:    $PCT_OF_FAILED%"
  echo ""
  echo "Affected run IDs:"
  for RUN_ID in "${CRASH_RUNS[@]}"; do
    # Fetch title and date for context
    META=$(echo "$RUNS" | jq -r \
      --arg id "$RUN_ID" \
      '.[] | select(.databaseId == ($id | tonumber)) | "\(.createdAt | split("T")[0])  \(.displayTitle)"')
    echo "  https://github.com/$REPO/actions/runs/$RUN_ID  —  $META"
  done
else
  echo ""
  echo "The crash was not found in any of the $FAILED_COUNT failed runs."
fi
echo ""
