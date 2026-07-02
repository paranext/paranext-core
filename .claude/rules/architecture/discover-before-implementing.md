---
paths:
  - "c-sharp/**"
  - "extensions/src/**"
  - "src/**"
---

# Discover Before Implementing

Before writing new code, find where the behavior already lives. The codebase aggregates related classes into per-feature directories ([Paranext-Core-Patterns.md#directory-structure](../../../.context/standards/Paranext-Core-Patterns.md#directory-structure)) — new work usually belongs inside one of those, not beside it.

## Search Recipe

Run all four; a name-based grep alone misses code that does the same thing under a different name.

1. **`ls` the feature folders** to learn the existing taxonomy — `c-sharp/` (e.g. `Projects/`, `Services/`, `Checks/`, `Scripture/`, `Users/`) and `extensions/src/` (one folder per extension). Name your work against this taxonomy, not against a folder you invent.
2. **Concept grep** on what the feature *does* — the verbs and data nouns (`grep -ri "inventory\|checklist\|versification"`), not just a guessed class name. A subscriber may call it something you wouldn't.
3. **File-name search** — `find . -iname "*resource*"` / `*check*` — folders and files are named after the capability.
4. **Read the 2–3 likeliest candidates IN FULL.** Open the files, don't skim grep snippets — the integration point (an existing service to register against, a base class, a paired `Get*`/`Set*`) is usually off-screen from the matched line.

## New-Top-Level-Structure Justification Gate

Prefer extending an existing folder/service over standing up a parallel one. Before introducing any new top-level directory, service, or data provider, write down — in the PR or design doc — both of:

- **Why no existing folder fits.** Name the candidates the recipe surfaced and state what each cannot absorb.
- **What you will call, not duplicate.** The existing service/base class/utility the new code reuses.

If neither can be stated, the new structure is premature — extend instead.

## Validate a Reference Pattern Has Production Consumers

Before you cite a file as the model to copy, confirm it is actually used in production — file existence is not evidence the pattern works. Grep for real callers of its exported types or hooks and count them:

- **Zero callers = aspirational scaffolding.** A pattern nobody reads is a guess about a future use case, not a proven approach. Copying it propagates an untested idea. (Example: `greek-esther-template-picker.component.tsx`'s `useWebViewState('pickerResult')` round-trip had no consumers reading `pickerResult` — the working production pattern for committing a dialog result was the manage-books direct-commit, which is structurally different.)
- **N callers = production.** A pattern with live consumers has been exercised against real data flows; that is the model to follow.

When two candidate patterns disagree, prefer the one with consumers. Report the caller count alongside the citation so the choice is auditable, not asserted.
