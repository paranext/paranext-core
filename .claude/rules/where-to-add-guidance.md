---
paths:
  - .claude/rules/**
  - .context/standards/**
  - lib/platform-bible-react/src/stories/guidelines/**
  - CLAUDE.md
  # docs/adr/** is intentional: catches agents that try to create ADR files here and
  # redirects them to the correct location via the table below. No ADRs live here yet.
  - docs/adr/**
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

## Adding or removing a rule: update `REVIEW.md` too

`REVIEW.md` at the repo root maps triggers to the rule files that own them, and it is the **only** way rules reach an automated reviewer. A rule with a `paths:` glob attaches solely inside an editing session, and a rule without one attaches solely for a reviewer that reads `.claude/rules/` at all — which a reviewer running under a different agent does not.

So when you add, rename, or delete a file under `.claude/rules/`, add, update, or remove its row in `REVIEW.md` in the same change. Otherwise the rule silently never gets enforced in review, and `REVIEW.md`'s claim to list every rule quietly becomes false.

Keep the row a pointer, never a summary: name the trigger and the file path, and let the rule file itself hold the content.
