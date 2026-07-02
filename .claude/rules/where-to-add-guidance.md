# Where to Add Rules and Guidance

When adding new rules, guidelines, or decisions to the codebase, place them in the correct location based on ownership and scope.

## Quick Reference

| Location | Owner | Who reviews changes |
|---|---|---|
| `.claude/rules/ux/` | UX team | UX team internally |
| `lib/platform-bible-react/src/stories/guidelines/` | UX team | UX team internally |
| `.claude/rules/` (other subdirectories) | Dev team | Dev team |
| `.context/standards/` | Dev team | Requires broader dev review |
| `CLAUDE.md` | Dev team | Requires broader dev review |

## Rules

1. **UX-owned areas**: `.claude/rules/ux/` and `lib/platform-bible-react/src/stories/guidelines/` are where the UX team has autonomy to document conventions, vocabulary, and decisions. Changes there do not require cross-team review. Note: these guidelines _are_ picked up by LLMs doing work across the whole codebase, not just UX work.

2. **Common areas** (`.context/standards/`, `CLAUDE.md`): These apply to the whole team. Changes require broader dev team review — do not add to these unilaterally on behalf of one group.

3. **When in doubt**: Prefer a UX-owned location and note that broader adoption can be discussed separately. Do not promote a decision to a common area without consensus.
