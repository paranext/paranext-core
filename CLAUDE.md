# Project Instructions

This file provides guidance to Claude Code when working with code in the paranext-core repository.

## Project Overview

Platform.Bible is extensible Bible translation software built on Electron with a TypeScript/React frontend and .NET 8 backend data provider. The core platform provides a minimal framework with functionality delivered primarily through extensions, giving developers flexibility to create and share their desired Bible translation experience.

## Reference Documentation

Read these when you need depth on a topic. Keep them in mind when writing or reviewing code.

| Topic                   | File                                                                      | Key Content                                                  |
| ----------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Architecture            | [Architecture.md](.context/standards/Architecture.md)                     | Multi-process architecture, core services, IPC, key patterns |
| Code Style              | [Code-Style-Guide.md](.context/standards/Code-Style-Guide.md)             | TypeScript/C# conventions, API-surface TSDoc, localization, components, shadcn/ui |
| Implementation Patterns | [Paranext-Core-Patterns.md](.context/standards/Paranext-Core-Patterns.md) | C# service/DataProvider/NetworkObject patterns, PAPI event registration, concurrency, extension structure, command naming |
| Testing                 | [Testing-Guide.md](.context/standards/Testing-Guide.md)                   | Vitest/NUnit, TDD (outside-in), testing trophy, mutation/coverage, E2E, mocking, CI, platform gotchas |
| Extensions              | [Extension-Development-Guide.md](.context/standards/Extension-Development-Guide.md) | Extension anatomy, PAPI, data providers, WebViews, contributions, type declarations |
| Entry Points            | [Entry-Point-Guide.md](.context/standards/Entry-Point-Guide.md)           | Menus, commands, command handlers, WebView layout options    |
| UI Components           | [Component-Selection-Quick-Reference.md](.context/standards/Component-Selection-Quick-Reference.md) · [Component-Builder-Patterns.md](.context/standards/Component-Builder-Patterns.md) | platform-bible-react component selection, styling, forms; web-view/provider/PAPI/styling patterns |
| Localization            | [Localization-Guide.md](.context/standards/Localization-Guide.md)         | i18n store/APIs, fallback chain, RTL, immutable strings, C# localization |
| Git and GitHub          | [Git-Guide.md](.context/standards/Git-Guide.md)                           | Branch structure, squash-merge, template merges              |
| Code Review             | [Code-Review-Guide.md](.context/standards/Code-Review-Guide.md)           | Reviewable, code-steward, review workflow, auto-merge        |
| Current Epic            | [Current-Epic.md](.context/standards/Current-Epic.md)                     | What the current epic is, where it is articulated (roadmap, JIRA sprint board, Discord), is work item in epic? |
| Security                | [Security-Guide.md](.context/standards/Security-Guide.md)                 | CSP, module import restrictions, extension sandboxing        |
| Startup performance     | [README.md](README.md#startup-performance-timing)                         | Enable `PT_STARTUP_MARKS`, capture marks, render the waterfall (`npm run startup-waterfall`), packaged-vs-dev caveat |

## Terminology

- **Platform.Bible**: The open-source, extensible Bible translation platform (paranext-core repository)
- **paranext-core**: The GitHub repository containing Platform.Bible source code
- **PAPI**: The Platform API — the service layer connecting frontend, extensions, and backend
- **Data Provider**: A backend service (typically C#/.NET) that provides data to the frontend via PAPI
- **WebView**: An extension-provided React UI that runs in an iframe within the renderer process

## Architecture

The app runs as four processes — Electron main, renderer (React UI), extension host, and the
.NET data provider — communicating over JSON-RPC via WebSocket (port 8876). Diagram and details:
[Architecture.md](.context/standards/Architecture.md).

### Key Codebase Locations

| Path                        | Purpose                                         |
| --------------------------- | ----------------------------------------------- |
| `src/main/`                 | Main process (app lifecycle, window management)  |
| `src/renderer/`             | Renderer (React UI, PAPI hooks)                  |
| `src/extension-host/`       | Extension host (runs extensions, PAPI backend)   |
| `c-sharp/`                  | .NET data provider (Paratext data, Bible text)   |
| `src/shared/`               | Code shared across all processes                 |
| `src/node/`                 | Code shared between Node.js processes            |
| `extensions/src/`           | Core extensions                                  |
| `lib/papi-dts/papi.d.ts`    | **Auto-generated** PAPI type declarations — NEVER edit by hand; run `npm run build:types` to regenerate |
| `lib/platform-bible-react/` | React components and hooks for extensions        |
| `lib/platform-bible-utils/` | Utility functions and classes                    |
| `.erb/configs/`             | Webpack configurations                           |
| `e2e-tests/`                | End-to-end Playwright tests (CDP-based)          |

### Path Aliases (`tsconfig.json`)

`@main/*` → `src/main/`, `@node/*` → `src/node/`, `@extension-host/*` → `src/extension-host/`, `@renderer/*` → `src/renderer/`, `@shared/*` → `src/shared/`

## Commands

All scripts are defined in `package.json` — read it (or run `npm run`) for the full list (`npm start`, `npm test`, `npm run build` / `lint` / `format` / `typecheck`; C# tests via `dotnet test` in `c-sharp-tests/`). Two that are easy to miss:

```bash
# Start development headless with CDP enabled (for agent-driven and E2E runs)
./.erb/scripts/refresh.sh

# Format C# — csharpier is a local dotnet tool and needs a restore first
cd c-sharp && dotnet tool restore && dotnet csharpier .
```

## Development Workflow

1. Changes to renderer or main TypeScript code hot-reload automatically
2. Extension changes are watched and rebuilt automatically
3. .NET changes require manual rebuild or running `npm run start:data` in a separate terminal
4. Use VS Code "Debug Platform" compound configuration to debug both frontend and backend

## Coding Discipline

- Avoid indecipherable [initialisms and abbreviations](.context/standards/Code-Style-Guide.md#initialisms-and-abbreviations).

## Send/Receive Write Gate

Any new C# code path that **mutates project data** (`ScrText` writes — `PutText`,
`Settings.Save`/`SetSetting`/`RemoveSetting`, `FileManager` operations, comment/note mutations,
extension data) MUST wrap the mutation in `using var _ = SendReceiveWriteLock.EnterWrite(projectId);`
as the first statement of its entry-point method (see
`c-sharp/Projects/SendReceive/SendReceiveWriteLock.cs`). The gate works in both directions: an
armed automatic Send/Receive rejects the write fail-fast (the `(SR_EDIT_BLOCKED)` sentinel),
while a starting sync waits, bounded, for open write scopes to drain before it replaces files on
disk.

The full gate semantics — thread affinity, the `SetSyncing`/`Clear(token)` protocol,
nested-scope hazards, and the `SendReceiveWriteLockCoverageTests` exemption markers — live in
[send-receive-write-gate.md](.claude/rules/send-receive-write-gate.md), which auto-loads when you
work in `c-sharp/`.

## Git & PR Conventions

- **Authorship**: The human developer is the author. Attribute AI assistance as a generator, not an author:
  ```
  Co-authored-by: <AI Tool> <noreply@example.com>
  Session-URL: <session URL>
  ```
  PR body: `AI-assisted — [session 1](<url>), [session 2](<url>)`
- Use squash-merge for PRs.
- Keep PR titles short (under 70 characters) with a descriptive body.
- Run `npm run typecheck && npm run lint && npm test && dotnet test c-sharp-tests/` before committing.
- When committing, include ALL related files (plans, docs, configs) — never exclude supporting files unless they are gitignored or you are explicitly told to.
- When git reports warnings about untracked or uncommitted files, investigate what they are before dismissing them. Never claim a file is unrelated without reading it first.
- After completing file changes, push all relevant branches before reporting completion.
- For rebases with many conflicts, prefer incremental conflict resolution over a single direct rebase. If a direct rebase produces massive conflicts, pause and discuss strategy with the user before attempting fixes.

## WebView Special Imports

- `import file from './path?inline'` — Imports as string (transformed by Webpack)
- `import file from './path?raw'` — Imports as raw string (no transformation)

## Platform-Specific Notes

**Linux**: May need `--no-sandbox` flag for Electron on Ubuntu 24.04 with AppArmor.

**macOS**: Requires MacPorts with icu4c libraries. The .NET build automatically copies dylibs to output directory.

**Windows**: Use WSL2 for cross-platform testing.
