---
paths:
  - .claude/rules/**
  - .context/standards/**
  - lib/platform-bible-react/src/stories/guidelines/**
  - CLAUDE.md
---

# Where to Add Rules and Guidance

| Location | Ownership | Review required |
|---|---|---|
| `.claude/rules/ux/` | UX team | UX team internally |
| `lib/platform-bible-react/src/stories/guidelines/` | UX team | UX team internally |
| `.claude/rules/` (other) | Dev team | Dev team |
| `.context/standards/` | Any team | Broader dev review |
| `CLAUDE.md` | Dev team | Broader dev review |

Prefer `.claude/rules/` for focused, path-scoped guidance; use `.context/standards/` for universal policies that apply everywhere. When in doubt, use a narrower scope — broader adoption can always be promoted later with team consensus.
