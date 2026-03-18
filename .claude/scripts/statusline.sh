#!/bin/bash
input=$(cat)

MODEL=$(echo "$input" | jq -r '.model.display_name // "unknown"')
PCT=$(echo "$input" | jq -r '.context_window.used_percentage // 0')

# Share context % with audit hooks via temp file (used by porting workflow hooks)
if [ -d /tmp/claude-audit-state ] || [ -n "$CLAUDE_AUDIT_HOOKS" ]; then
  mkdir -p /tmp/claude-audit-state
  echo "$PCT" > /tmp/claude-audit-state/context_pct
fi

TOTAL=$(echo "$input" | jq -r '.context_window.context_window_size // 200000')
# Derive used tokens from percentage so they always align
USED=$(echo "$input" | jq -r '
  (.context_window.context_window_size // 200000) as $size |
  (.context_window.used_percentage // 0) as $pct |
  ($size * $pct / 100) | floor
')
CWD=$(echo "$input" | jq -r '.cwd // "~"')
DIR=$(basename "$CWD")

BRANCH=$(git -C "$CWD" rev-parse --abbrev-ref HEAD 2>/dev/null)
if [ -n "$BRANCH" ]; then
  GIT=" | $BRANCH"
else
  GIT=""
fi

# Format token counts with k suffix
fmt_tokens() {
  local n=$1
  if [ "$n" -ge 1000 ]; then
    echo "$((n / 1000))k"
  else
    echo "$n"
  fi
}

printf "%s | %s%% ctx | %s/%s tokens | %s%s" "$MODEL" "$PCT" "$(fmt_tokens "$USED")" "$(fmt_tokens "$TOTAL")" "$DIR" "$GIT"
