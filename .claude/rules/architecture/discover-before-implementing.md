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
