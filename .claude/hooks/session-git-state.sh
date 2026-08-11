#!/usr/bin/env bash
# SessionStart hook: report where this checkout actually is.
#
# Agents share these checkouts, and a session can be resumed hours after its
# context was written. Both mean the branch state recorded in the conversation
# may no longer match the branch state on disk -- which is how a commit once
# ended up parented onto 70 unrelated commits.
#
# Reports; never blocks.

set -uo pipefail

REPO="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null)}"
[ -n "$REPO" ] && cd "$REPO" 2>/dev/null || exit 0
git rev-parse --git-dir >/dev/null 2>&1 || exit 0

BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
UPSTREAM=$(git rev-parse --abbrev-ref "@{upstream}" 2>/dev/null || echo "")
DIRTY=$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')

LINE="Branch \`$BRANCH\`"
if [ -n "$UPSTREAM" ]; then
  COUNTS=$(git rev-list --left-right --count "$UPSTREAM"...HEAD 2>/dev/null || echo "0	0")
  BEHIND=$(printf '%s' "$COUNTS" | cut -f1)
  AHEAD=$(printf '%s' "$COUNTS" | cut -f2)
  LINE="$LINE — $AHEAD ahead / $BEHIND behind $UPSTREAM"
else
  LINE="$LINE — no upstream"
fi

# Distance from the integration branch matters even when a branch tracks
# something else; a branch far behind main is a stale-base risk.
for BASE in origin/main origin/ai/main; do
  if git rev-parse --verify "$BASE" >/dev/null 2>&1 && [ "$UPSTREAM" != "$BASE" ]; then
    B=$(git rev-list --count "HEAD..$BASE" 2>/dev/null || echo 0)
    [ "$B" -gt 0 ] && LINE="$LINE; $B commits on $BASE not in HEAD"
    break
  fi
done

LINE="$LINE. Working tree: $DIRTY uncommitted change(s)."

# additionalContext reaches the model; it is not printed to the user.
jq -n --arg c "$LINE" \
  '{hookSpecificOutput: {hookEventName: "SessionStart", additionalContext: $c}}'
