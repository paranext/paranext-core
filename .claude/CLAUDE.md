# AI Attribution

The human developer working in this session is the author of all commits and pull requests. Claude is a tool, not an author.

## Rules for Claude

- Attribute commits and PRs to the human developer, not to yourself.
- Use `git config user.name` and `git config user.email` to identify the author. If both are unset or look like placeholders (e.g. `noreply@`), ask the developer their name before making any commit.
- Always append a `Co-Authored-By: Claude <noreply@anthropic.com>` trailer to commits where Claude generated or substantially rewrote code.
- PR bodies may include an "AI-assisted" label or a session link, but the PR *author* field must name the human.

## Why this file exists

Claude Code on the web runs in ephemeral containers — a fresh git clone starts every session, so personal `~/.claude/CLAUDE.md` files do not persist automatically. Without an explicit instruction file, Claude has no context about who the human author is and may default to attributing work to itself.

This project-level file ensures the attribution rule applies to everyone on the team, regardless of whether they have set up personal Claude Code configuration.

## For developers

If you work in Claude Code on the web and want your full name (rather than your email) to appear in session-generated content, add a personal `~/.claude/CLAUDE.md` to your home directory. The `SessionStart` hook in this repo writes a baseline version automatically using your authenticated email; you can overwrite it with richer content by creating the file before the hook runs.
