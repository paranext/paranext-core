# Paratext 10 / Platform.Bible — "Where to look" index

A first-grep map for `pt10-reuse-scout`. Covers **paranext-core only**; the other three
constellation repos (paratext-10-studio, paratext-bible-extensions,
paratext-bible-internal-extensions) are not mapped here and need their own sweep.

## Directory map (paranext-core)

    src/main/            Electron main process        src/renderer/    React UI (components, hooks, services)
    src/extension-host/  Extension runtime & PAPI     src/shared/      Code shared across all processes
    src/node/            Node-specific utilities
    lib/papi-dts/        PAPI type defs (papi.d.ts — the wire-contract source of truth)
    lib/platform-bible-react/   React component library
    lib/platform-bible-utils/   utilities & types  ← reuse-sweep target
    extensions/src/      core bundled extensions (one dir per extension)
    c-sharp/Services/    data services    c-sharp/Projects/  project mgmt    c-sharp/Checks/  data validation

## Core services (check before building cross-cutting logic)

- `src/main/services/`: extension-host, dotnet-data-provider, app, data-protection (encryption)
- `src/shared/services/`: network (JSON-RPC), command (registration/dispatch), settings, project-data-provider
- `src/extension-host/services/`: extension, menu-data, theme-data, localization (i18n)

## Core extensions (first targets for "is this already done?")

platform-scripture (reading), platform-scripture-editor (editing),
platform-lexical-tools (language/grammar), platform-get-resources (resources),
legacy-comment-manager (comments).

## Extension anatomy (what to read inside a hit)

`manifest.json` (metadata + contributions) · `src/main.ts` (entry) · `src/types/*.d.ts`
(typed surface, incl. `CommandHandlers`) · `contributions/` (menus, settings,
localizedStrings.json) · `assets/`.

## Architecture facts the scout needs

4 processes (main / renderer / extension-host / .NET data provider) talk **JSON-RPC 2.0 over
WebSocket, port 8876**. PAPI (`lib/papi-dts/papi.d.ts`) is the central extension API.
Webpack enforces import boundaries (main ≠ renderer ≠ extension-host; `shared` is safe
everywhere). Wire naming: `command:{ext}.{cmd}`, data-provider `object:{name}-data.{method}`,
updates `{objectId}:onDidUpdate`.

## Verified PT10 platform facts (for porting scoping)

- **Project identity / Guid lookup.** A project's stable identity Guid is read from its
  `Settings.xml` (`/ScriptureText/Guid`) by ParatextData and surfaced as `ScrText.Guid`
  (e.g. `c-sharp/Projects/ScrTextExtensions.cs`). PT10 does not use Mercurial for projects,
  so PT9's Mercurial-backed Guid **creation/repair** (`VersioningManager.EnsureHasGuid`) has
  no PT10 equivalent — but Guid **lookup** of an existing on-disk project already works today.
  Any feature that needs duplicate-detection by Guid equality can rely on the lookup path; a
  feature that needs to _mint_ a Guid for a brand-new project is blocked until PT10 gains a
  create-project primitive.
- **`DifferencesToolForm` has no PT10 port.** PT9's verse-level USFM diff dialog
  (`DifferencesToolForm`, configured via `DiffToolConfigurationInfo.ForGetPutTexts(...)`) is a
  broadly shared surface in PT9 — invoked from Backup/Restore, Copy/Import Books, the text
  editor, and Parallel Passages (5+ callers). No equivalent has been ported to paranext-core
  (grep of `c-sharp/` + `extensions/src/` finds nothing). Treat it as net-new when scoping any
  feature that compares two text sources verse-by-verse; design the diff renderer as a
  standalone primitive (text-source-A vs text-source-B) so later callers can wrap it.
  See also `paratext-9-features/09_Advanced_Checking_Tools.md` §9.3.
