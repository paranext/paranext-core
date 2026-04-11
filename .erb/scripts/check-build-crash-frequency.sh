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

echo "Scanning last $LIMIT runs of $WORKFLOW in $REPO..."
echo "Path filter:  \"$PATH_FILTER\""
echo "Looking for:  \"$PATTERN\""
echo ""

# Fetch run list — include headSha so we can query changed files per commit
RUNS=$(gh run list \
  --workflow="$WORKFLOW" \
  --repo="$REPO" \
  --limit="$LIMIT" \
  --json databaseId,conclusion,createdAt,displayTitle,headSha \
  2>/dev/null)

TOTAL=$(echo "$RUNS" | jq 'length')
echo "Runs fetched: $TOTAL"

# Isolate failed runs
FAILED_JSON=$(echo "$RUNS" | jq '[.[] | select(.conclusion == "failure")]')
FAILED_COUNT=$(echo "$FAILED_JSON" | jq 'length')
echo "Failed runs:  $FAILED_COUNT"

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

MATCHING_RUNS_JSON="[]"
CHECKED_COMMITS=0
declare -A COMMIT_CACHE   # cache SHA → "yes"/"no" to skip duplicate SHAs

while IFS= read -r ROW; do
  RUN_ID=$(echo "$ROW"  | jq -r '.databaseId')
  HEAD_SHA=$(echo "$ROW" | jq -r '.headSha')
  CHECKED_COMMITS=$((CHECKED_COMMITS + 1))
  printf "\r  Checking commit %d/%d  (%s)..." \
    "$CHECKED_COMMITS" "$FAILED_COUNT" "${HEAD_SHA:0:7}"

  # Use cache to avoid re-querying the same SHA (multiple jobs per run share one SHA)
  if [[ -v COMMIT_CACHE["$HEAD_SHA"] ]]; then
    TOUCHES="${COMMIT_CACHE[$HEAD_SHA]}"
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
    COMMIT_CACHE["$HEAD_SHA"]="$TOUCHES"
  fi

  if [[ "$TOUCHES" == "yes" ]]; then
    MATCHING_RUNS_JSON=$(echo "$MATCHING_RUNS_JSON $ROW" | jq -s '.[0] + [.[1]]')
  fi
done < <(echo "$FAILED_JSON" | jq -c '.[]')

echo ""

MATCHING_COUNT=$(echo "$MATCHING_RUNS_JSON" | jq 'length')
echo "Runs touching $PATH_FILTER: $MATCHING_COUNT / $FAILED_COUNT failed"

if [[ "$MATCHING_COUNT" -eq 0 ]]; then
  echo ""
  echo "No failed runs touched $PATH_FILTER — nothing to scan for crash pattern."
  exit 0
fi

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
  printf "\r  Scanning logs %d/%d  (run %s)..." \
    "$SCANNED" "$MATCHING_COUNT" "$RUN_ID"

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
echo "Runs scanned total:              $TOTAL"
echo "Failed runs:                     $FAILED_COUNT"
echo "Failed + touched $PATH_FILTER:  $MATCHING_COUNT"
echo "Runs with crash pattern:         $CRASH_COUNT"

if [[ "$CRASH_COUNT" -gt 0 ]]; then
  PCT_OF_MATCHING=$(awk "BEGIN { printf \"%.1f\", ($CRASH_COUNT / $MATCHING_COUNT) * 100 }")
  PCT_OF_ALL=$(awk "BEGIN { printf \"%.1f\", ($CRASH_COUNT / $TOTAL) * 100 }")
  echo "As % of matching failed runs:    $PCT_OF_MATCHING%"
  echo "As % of all scanned runs:        $PCT_OF_ALL%"
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
