# `.claude/` — Claude Code Configuration

This directory contains configuration for [Claude Code](https://claude.ai/code) (Anthropic's CLI for Claude) when working in paranext-core.

## What's Here

| Path | Purpose |
| --- | --- |
| `settings.json` | Permissions, statusline, and general Claude Code settings |
| `rules/architecture/` | Architecture decision rules (auto-loaded by Claude Code) |
| `skills/` | Reusable skill definitions for testing, UI verification, etc. |
| `scripts/statusline.sh` | Status bar script showing model, context usage, git branch |

## Skills

| Skill | Purpose | Prerequisites |
| --- | --- | --- |
| `test-runner` | Run TypeScript/C# tests with structured output | None |
| `visual-verification` | UI interaction and screenshots via Playwright/CDP | `xvfb` (Linux) |
| `app-runner` | Start/stop/restart Platform.Bible | `xvfb` (Linux) |
| `log-inspector` | Read and analyze application logs | None |
| `papi-client` | Send JSON-RPC requests to the PAPI WebSocket API | `websocat`, app running |

## System Dependencies

Some skills require system-level tools:

- **jq**: Required by `statusline.sh` — install via `apt install jq` or `brew install jq`
- **websocat**: Required by `papi-client` — install via `cargo install websocat` or from [releases](https://github.com/nickel-org/websocat)
- **xvfb** (Linux only): Required by `app-runner` and `visual-verification` for headless operation — install via `apt install xvfb`
- **Playwright**: Transitive dependency via `@playwright/test` in `package.json` — available after `npm install`. The `visual-verification` skill connects via CDP, so `npx playwright install` is NOT needed.

## For Non-AI Users

These files are harmless if you don't use Claude Code. They won't affect your development workflow. The `.gitignore` is configured to track shared configuration while auto-ignoring any local-only additions.
