#!/usr/bin/env bash
# Stop hook: run eslint over changed JS/TS files before the turn can end.
#
# The commit path does not cover this. .husky/pre-commit runs gitleaks and
# `npm run lint:staged`, and lint-staged is configured for prettier and
# stylelint only -- no eslint anywhere. Without this hook the first thing that
# sees an eslint error is CI.
#
# Uses `eslint --cache` on the changed files rather than `npm run lint`, which
# rebuilds types first and takes minutes.

set -uo pipefail

REPO="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null)}"
[ -n "$REPO" ] && cd "$REPO" || exit 0

PAYLOAD=$(cat)
SESSION=$(printf '%s' "$PAYLOAD" | jq -r '.session_id // "unknown"')

# A Stop hook that always blocks would trap the session. Claude Code sets
# stop_hook_active once a Stop hook has already fired this turn; fall back to a
# per-session attempt counter when that field is absent.
if [ "$(printf '%s' "$PAYLOAD" | jq -r '.stop_hook_active // false')" = "true" ]; then
  exit 0
fi
COUNTER="${TMPDIR:-/tmp}/claude-lint-attempts-$SESSION"
ATTEMPTS=$(cat "$COUNTER" 2>/dev/null || echo 0)

# Cheap exit: most turns touch no lintable file at all.
FILES=$(
  {
    git diff --name-only --diff-filter=ACMR HEAD
    git ls-files --others --exclude-standard
  } 2>/dev/null | grep -E '\.(cjs|mjs|js|jsx|cts|mts|ts|tsx)$' | sort -u
)
[ -z "$FILES" ] && { rm -f "$COUNTER"; exit 0; }

# shellcheck disable=SC2086 # word splitting is how the file list is passed
OUTPUT=$(npx eslint --cache --no-error-on-unmatched-pattern $FILES 2>&1)
STATUS=$?

if [ "$STATUS" -eq 0 ]; then
  rm -f "$COUNTER"
  exit 0
fi

if [ "$ATTEMPTS" -ge 2 ]; then
  rm -f "$COUNTER"
  echo "eslint still failing after $ATTEMPTS attempts -- letting the turn end. Unresolved:" >&2
  printf '%s\n' "$OUTPUT" | tail -30 >&2
  exit 0
fi

echo $((ATTEMPTS + 1)) > "$COUNTER"
{
  echo "eslint failed on files changed this turn. Fix these before finishing:"
  printf '%s\n' "$OUTPUT" | tail -60
} >&2
exit 2
