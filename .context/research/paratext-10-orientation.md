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
