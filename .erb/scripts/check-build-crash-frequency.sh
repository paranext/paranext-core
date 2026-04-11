#!/usr/bin/env bash
# check-build-crash-frequency.sh
# Scans GitHub Actions history for the V8 "unreachable code" bytecode cache crash
# in the test.yml workflow, optionally filtered to runs whose triggering commit
# touched files under a given path prefix.
#
# Usage: bash .erb/scripts/check-build-crash-frequency.sh [--limit N] [--path-filter PATH]
#   --limit N          Number of workflow runs to scan (default: 100)
#   --path-filter PATH Only consider runs whose head commit modifies files under PATH
#                      (default: lib/platform-bible-react)

set -euo pipefail

REPO="paranext/paranext-core"
WORKFLOW="test.yml"
LIMIT=100
PATTERN="unreachable code"
PATH_FILTER="lib/platform-bible-react"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --limit)       LIMIT="$2";       shift 2 ;;
    --path-filter) PATH_FILTER="$2"; shift 2 ;;
    *) echo "Unknown argument: $1"; exit 1 ;;
  esac
done

progress() {
  printf "\r  %s %d/%d  (%s)..." "$1" "$2" "$3" "$4"
}

echo "Scanning last $LIMIT runs of $WORKFLOW in $REPO..."
echo "Path filter:  \"$PATH_FILTER\""
echo "Looking for:  \"$PATTERN\""
echo ""

RUNS=$(gh run list \
  --workflow="$WORKFLOW" \
  --repo="$REPO" \
  --limit="$LIMIT" \
  --json databaseId,conclusion,createdAt,displayTitle,headSha \
  2>/dev/null)

TOTAL=$(echo "$RUNS" | jq 'length')
echo "Runs fetched: $TOTAL"

# Include cancelled runs: GitHub replaces job conclusions in-place on re-run,
# so a previously-failing run becomes cancelled once the re-run succeeds.
FAILED_JSON=$(echo "$RUNS" | jq '[.[] | select(.conclusion == "failure" or .conclusion == "cancelled")]')
FAILED_COUNT=$(echo "$FAILED_JSON" | jq 'length')
echo "Failed/cancelled runs: $FAILED_COUNT"

if [[ "$FAILED_COUNT" -eq 0 ]]; then
  echo ""
  echo "No failed runs found in the last $TOTAL runs."
  exit 0
fi

# ------------------------------------------------------------------
# Phase 1: filter failed runs whose head commit touches PATH_FILTER
# ------------------------------------------------------------------
echo ""
echo "Phase 1 — filtering by commit path ($PATH_FILTER)..."

# Collect matching rows as individual JSON strings; build the array once after the loop
# rather than re-parsing the accumulator on every iteration (avoids O(n²) jq calls).
MATCHING_ROWS=()
CHECKED_COMMITS=0
# SHA cache as a temp file: each line is "<sha> <yes|no>"
# Works on bash 3.2 (macOS default) which lacks associative arrays.
COMMIT_CACHE_FILE=$(mktemp)
trap 'rm -f "$COMMIT_CACHE_FILE"' EXIT

while IFS= read -r ROW; do
  HEAD_SHA=$(echo "$ROW" | jq -r '.headSha')
  CHECKED_COMMITS=$((CHECKED_COMMITS + 1))
  progress "Checking commit" "$CHECKED_COMMITS" "$FAILED_COUNT" "${HEAD_SHA:0:7}"

  CACHED=$(grep "^$HEAD_SHA " "$COMMIT_CACHE_FILE" 2>/dev/null || true)
  if [[ -n "$CACHED" ]]; then
    TOUCHES=$(echo "$CACHED" | awk '{print $2}')
  else
    CHANGED=$(gh api "repos/$REPO/commits/$HEAD_SHA" \
      --jq '[.files // [] | .[].filename]' \
      2>/dev/null || echo "[]")
    if echo "$CHANGED" | jq -e --arg p "$PATH_FILTER" \
        '[.[] | select(startswith($p))] | length > 0' >/dev/null 2>&1; then
      TOUCHES="yes"
    else
      TOUCHES="no"
    fi
    echo "$HEAD_SHA $TOUCHES" >> "$COMMIT_CACHE_FILE"
  fi

  [[ "$TOUCHES" == "yes" ]] && MATCHING_ROWS+=("$ROW")
done < <(echo "$FAILED_JSON" | jq -c '.[]')

echo ""

MATCHING_COUNT=${#MATCHING_ROWS[@]}
echo "Runs touching $PATH_FILTER: $MATCHING_COUNT / $FAILED_COUNT failed"

if [[ "$MATCHING_COUNT" -eq 0 ]]; then
  echo ""
  echo "No failed runs touched $PATH_FILTER — nothing to scan for crash pattern."
  exit 0
fi

# Build the JSON array once from the collected rows.
MATCHING_RUNS_JSON=$(printf '%s\n' "${MATCHING_ROWS[@]}" | jq -s '.')

# ------------------------------------------------------------------
# Phase 2: scan logs of matching runs for the crash pattern
# ------------------------------------------------------------------
echo ""
echo "Phase 2 — scanning logs for \"$PATTERN\"..."

CRASH_RUNS=()
SCANNED=0

while IFS= read -r ROW; do
  RUN_ID=$(echo "$ROW" | jq -r '.databaseId')
  SCANNED=$((SCANNED + 1))
  progress "Scanning logs" "$SCANNED" "$MATCHING_COUNT" "$RUN_ID"

  LOGS=$(gh run view "$RUN_ID" \
    --repo="$REPO" \
    --log-failed \
    2>/dev/null || true)

  if echo "$LOGS" | grep -q "$PATTERN"; then
    CRASH_RUNS+=("$RUN_ID")
  fi
done < <(echo "$MATCHING_RUNS_JSON" | jq -c '.[]')

echo ""
echo ""

CRASH_COUNT=${#CRASH_RUNS[@]}

echo "========================================"
echo "Results"
echo "========================================"
echo "Runs scanned total:                      $TOTAL"
echo "Failed/cancelled runs:                   $FAILED_COUNT"
echo "Failed/cancelled + touched $PATH_FILTER: $MATCHING_COUNT"
echo "Runs with crash pattern:                 $CRASH_COUNT"

if [[ "$CRASH_COUNT" -gt 0 ]]; then
  PCT_OF_MATCHING=$(awk "BEGIN { printf \"%.1f\", ($CRASH_COUNT / $MATCHING_COUNT) * 100 }")
  PCT_OF_ALL=$(awk "BEGIN { printf \"%.1f\", ($CRASH_COUNT / $TOTAL) * 100 }")
  echo "As % of matching failed runs:            $PCT_OF_MATCHING%"
  echo "As % of all scanned runs:                $PCT_OF_ALL%"
  echo ""
  echo "Affected runs:"
  for RUN_ID in "${CRASH_RUNS[@]}"; do
    META=$(echo "$MATCHING_RUNS_JSON" | jq -r \
      --arg id "$RUN_ID" \
      '.[] | select(.databaseId == ($id | tonumber)) | "\(.createdAt | split("T")[0])  \(.headSha[:7])  \(.displayTitle)"')
    echo "  https://github.com/$REPO/actions/runs/$RUN_ID  —  $META"
  done
else
  echo ""
  echo "The crash was not found in any of the $MATCHING_COUNT matching failed runs."
fi
echo ""
