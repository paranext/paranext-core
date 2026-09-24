#!/bin/bash
# Cross-platform status line. Uses Node (universally available; required by
# the project via Volta) for JSON parsing instead of jq, which is not
# reliably installed on Windows. Bash is still the executor — Git Bash on
# Windows handles that too.
input=$(cat)

# Parse JSON via Node, emitting one field per line so spaces inside values
# (e.g. model display names like "Opus 4.7 (1M context)") survive.
node_output=$(node -e '
let buf = "";
process.stdin.on("data", c => (buf += c));
process.stdin.on("end", () => {
  let j; try { j = JSON.parse(buf); } catch { j = {}; }
  const model = j?.model?.display_name ?? "unknown";
  const pct = Math.round(j?.context_window?.used_percentage ?? 0);
  const total = j?.context_window?.context_window_size ?? 200000;
  const used = Math.floor(total * pct / 100);
  const cwd = j?.cwd ?? "~";
  console.log(model);
  console.log(pct);
  console.log(total);
  console.log(used);
  console.log(cwd);
});
' <<< "$input")

{
  IFS= read -r MODEL
  IFS= read -r PCT
  IFS= read -r TOTAL
  IFS= read -r USED
  IFS= read -r CWD
} <<< "$node_output"

# Default values for robustness when node output is empty (node absent)
PCT=${PCT:-0}
TOTAL=${TOTAL:-200000}
USED=${USED:-0}

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
  n=${n:-0}
  if [ "$n" -ge 1000 ]; then
    echo "$((n / 1000))k"
  else
    echo "$n"
  fi
}

printf "%s | %s%% ctx | %s/%s tokens | %s%s" "$MODEL" "$PCT" "$(fmt_tokens "$USED")" "$(fmt_tokens "$TOTAL")" "$DIR" "$GIT"
