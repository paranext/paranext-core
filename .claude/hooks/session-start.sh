#!/bin/bash
set -euo pipefail

# Only relevant in remote (cloud) containers. Local devs' ~/.claude/CLAUDE.md
# persists naturally across sessions and should not be overwritten.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Don't overwrite a personal ~/.claude/CLAUDE.md a developer already has.
if [ -f "$HOME/.claude/CLAUDE.md" ]; then
  exit 0
fi

# CLAUDE_CODE_USER_EMAIL is injected by the Claude Code on the web platform and
# identifies the authenticated session owner. It is more reliable than
# `git config user.name/email`, which may be unset or set to a bot identity
# in a fresh container.
AUTHOR="${CLAUDE_CODE_USER_EMAIL:-the human developer}"

mkdir -p "$HOME/.claude"
cat > "$HOME/.claude/CLAUDE.md" << EOF
# Session Attribution
Commits and PRs in this session are authored by ${AUTHOR}, not Claude.
Claude may be credited as a generator (e.g., Co-Authored-By: Claude <noreply@anthropic.com>
trailer, "AI-assisted" tag, or a session link in the PR body), but the commit author,
PR author, and any prose about who did the work should attribute ${AUTHOR}.
EOF
