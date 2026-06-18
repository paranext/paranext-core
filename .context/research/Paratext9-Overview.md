# Paratext 9 — Repository Navigation Primer

Orientation for reading the PT9 source (`~/git/Paratext`). For detailed architecture,
code patterns, and gotchas, **always consult the repo's own `AGENTS.md` files first** —
this primer is only for orientation, search exclusions, and reuse triage.

## Consult AGENTS.md first

- Root `AGENTS.md` — build commands, solution files, architecture, key components, test
  projects, code style. (`CLAUDE.md` just points to `AGENTS.md`.)
- Per-directory `AGENTS.md` carry the depth: `ParatextData/` (core abstractions, USFM
  parsing, write-lock system, patterns, gotchas), `ParatextBase/` (window system, edit
  handlers, plugin system, themes, MegaMenu), `ParatextChecks/` (checking engine),
  `Paratext/` (main app), `PtxUtils/` (utilities), `BiblicalTerms/`, `FormattedEditor/`,
  `HtmlEditor/`, `HelpSystem/`.
- **Division of labor:** use *this* file for search exclusions / reuse triage / high-level
  orientation; use `AGENTS.md` files for architecture / code patterns / gotchas.

## Search exclusions (cut the noise)

Exclude `**/.git/**`, `/DataAccessServer/`, `/DataAccessServer.Tests/`, `/PA/` (none are
relevant to PT10 work).

Ripgrep form (`--glob '!…'`):

    rg "SearchTerm" ~/git/Paratext -t cs \
      --glob '!**/.git/**' --glob '!**/DataAccessServer/**' \
      --glob '!**/DataAccessServer.Tests/**' --glob '!**/PA/**'

grep form — `grep` has no `--glob`; use `--exclude-dir` (add these flags to any `grep -r`):

    grep -rn "SearchTerm" ~/git/Paratext --include='*.cs' \
      --exclude-dir=DataAccessServer --exclude-dir=DataAccessServer.Tests --exclude-dir=PA

## Layer reuse triage (portable backend vs rewrite-UI)

- **Portable C# backend (reusable):** `ParatextData/` (.NET Standard 2.0, cross-platform),
  `ParatextChecks/` (portable business logic), `PtxUtils/` (utilities), the Repository layer
  (Mercurial/Chorus integration).
- **Windows-only, rewritten in PT10's web frontend:** all WinForms UI (`Paratext/`,
  `ParatextBase/`, editors), the MAF Plugin Framework, WCF services.
- The load-bearing split when reading a feature: logic in **ParatextData** = the backend the
  feature talks to (potentially reusable); logic in **Paratext** = UI (rewritten).
