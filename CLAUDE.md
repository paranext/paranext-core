# Project Instructions

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Platform.Bible is extensible Bible translation software built on Electron with a TypeScript/React frontend and .NET 8 backend data provider. The core platform provides a minimal framework with functionality delivered primarily through extensions, giving developers flexibility to create and share their desired Bible translation experience.

## Terminology

- **Platform.Bible**: The open-source, extensible Bible translation platform (paranext-core repository). A general-purpose platform that can host multiple applications.
- **Paratext 10 (PT10)**: The primary Bible translation application being built on Platform.Bible. Use "PT10" when referring specifically to Paratext 10 features.
- **paranext-core**: The GitHub repository containing Platform.Bible source code.

Use "Platform.Bible" when referring to the platform's architecture, patterns, or capabilities that aren't Paratext-specific. Use "paranext-core" when referring to the repository or codebase.

## Extended Documentation

For detailed guidance, see the `.context/` and `.context/standards/` folders. Read these when you need depth on a topic.

**Reading large files**: Check the file's YAML frontmatter for `toc: true` — if present, the file has a machine-readable `<!-- TOC:BEGIN -->` block with section line numbers. Read the TOC first (~50 lines) to find the relevant section, then use offset/limit to read only that section — do not read the entire file.

**When editing any standards doc**: bump the `version` and `last_updated` fields in the YAML frontmatter, and add a row to the `## Version Log` table at the bottom describing what changed. Use semver: patch for fixes/clarifications, minor for new sections or significant content changes, major for breaking restructures.

### Project Context (`.context/`)

| Topic | File | Key Content |
| --- | --- | --- |
| Paratext 10 Overview | [Paratext10-Overview.md](.context/Paratext10-Overview.md) | PT10/Platform.Bible key concepts |

### Standards & Guides (`.context/standards/`)

| Topic | File | Key Content |
| --- | --- | --- |
| Architecture | [Architecture.md](.context/standards/Architecture.md) | Process communication, data providers, network, security |
| Code Style | [Code-Style-Guide.md](.context/standards/Code-Style-Guide.md) | TypeScript/C# conventions, localization, shadcn/ui |
| Code Review | [Code-Review-Guide.md](.context/standards/Code-Review-Guide.md) | Reviewable workflow, code stewards, PR approval |
| Component Patterns | [Component-Builder-Patterns.md](.context/standards/Component-Builder-Patterns.md) | React UI patterns, file naming, shadcn/ui conventions |
| Component Selection | [Component-Selection-Quick-Reference.md](.context/standards/Component-Selection-Quick-Reference.md) | Choosing the right platform-bible-react component |
| Entry Points | [Entry-Point-Guide.md](.context/standards/Entry-Point-Guide.md) | Menu items, commands, keyboard shortcuts registration |
| Extension Development | [Extension-Development-Guide.md](.context/standards/Extension-Development-Guide.md) | Extension anatomy, PAPI, WebViews, contributions |
| Git & GitHub | [Git-Guide.md](.context/standards/Git-Guide.md) | Branch strategy, squash-merge, template merges |
| Localization | [Localization-Guide.md](.context/standards/Localization-Guide.md) | Mandatory patterns for user-facing text in web views |
| Implementation Patterns | [Paranext-Core-Patterns.md](.context/standards/Paranext-Core-Patterns.md) | C#/TypeScript patterns, naming, test infrastructure |
| Security | [Security-Guide.md](.context/standards/Security-Guide.md) | CSP design, module restrictions, extension sandboxing |
| Testing | [Testing-Guide.md](.context/standards/Testing-Guide.md) | Vitest/NUnit, TDD, mocking, Storybook, CI pipeline |

## Coding Discipline

- If multiple interpretations exist, present them — do not pick silently.
- For architectural decisions, check the [decision registry](.claude/rules/architecture/adr-protocol.md) first.
- Frame tasks as verifiable goals: "Fix the bug" → "Write a test that reproduces it, then make it pass."
- For multi-step tasks, state a brief plan with checks for each step.

## Git & Commits

- When committing changes, always include ALL related files (plans, docs, audit logs) — never exclude supporting files from commits unless they're in `.gitignore`.
- When git tools report warnings about untracked or uncommitted files, always investigate what they are before dismissing them. Never claim a file is unrelated without reading it first.

## PR & Code Review

- Never resolve PR review threads/comments unless you're explicitly told to — only the reviewer should resolve threads. You may reply to threads but must leave them open.
- When working with PRs, carefully distinguish between the user's own comments and reviewer comments. Check comment authors before making claims about who wrote what.

## Tools & CLI

- When posting PR comments via `gh` CLI, use JSON file input (`--input`) rather than `--field` flags for comment bodies to avoid escaping issues.

## PT10 Tech Stack

| Layer | Technology |
| --- | --- |
| Desktop Framework | Electron |
| Frontend | React, TypeScript, SCSS, Tailwind CSS |
| Backend (Node) | TypeScript, WebSocket (JSON-RPC 2.0) |
| Backend (Data) | .NET 8 / C# |
| Build System | Webpack |
| Testing | Vitest, Storybook |
| Package Management | npm workspaces (monorepo) |

## Common Commands

### Development

```bash
# Start development (headless with CDP enabled for AI workflows)
./refresh.sh

# Start development (visible window - for manual development)
# npm start

# Build the entire project (TypeScript, extensions, .NET, types)
npm run build
```

### Testing

```bash
# Run all TypeScript tests
npm test

# Run single TypeScript test with watch mode
npm test -- path/to/test-file.test.ts --watch

# Run C# unit tests
cd c-sharp-tests
dotnet test

# Run C# tests with watch mode
cd c-sharp-tests
dotnet watch test
```

### Code Quality

```bash
# Format code (happens automatically on commit)
npm run format

# Lint TypeScript
npm run lint

# Fix linting issues automatically
npm run lint-fix

# Format C# code
cd c-sharp
dotnet tool restore
dotnet csharpier .

# Type checking
npm run typecheck
```

## Architecture

### Multi-Process Architecture

The application runs as four separate processes that communicate via JSON-RPC over WebSocket:

```
┌─────────────────────────────────────────────────────────┐
│                    Main Process (Electron)               │
│  • Window management & app lifecycle                     │
│  • Spawns and manages child processes                    │
└────────────────┬────────────────────────────────────────┘
                 │ JSON-RPC over WebSocket (port 8876)
    ┌────────────┼────────────┬───────────────────┐
    │            │            │                   │
┌───▼────────┐ ┌─▼──────────┐ ┌▼────────────────┐
│ Renderer   │ │ Extension  │ │ .NET Data       │
│ (React UI) │ │ Host       │ │ Provider        │
│            │ │            │ │                 │
│ • Web UI   │ │ • Loads    │ │ • Project data  │
│ • Dialogs  │ │  extensions│ │ • Paratext     │
│ • WebViews │ │ • PAPI     │ │   integration   │
└────────────┘ └────────────┘ └─────────────────┘
```

For process details, data providers, PAPI, and network objects, see [Architecture.md](.context/standards/Architecture.md).

## Key Codebase Locations

| Path | Purpose |
| --- | --- |
| `src/main/` | Main process (app lifecycle, window management) |
| `src/renderer/` | Renderer (React UI, PAPI hooks) |
| `src/extension-host/` | Extension host (runs extensions, PAPI backend) |
| `c-sharp/` | .NET data provider (Paratext data, Bible text) |
| `src/shared/` | Code shared across all processes |
| `src/node/` | Code shared between Node.js processes |
| `extensions/src/` | Core extensions — see [Extension-Development-Guide.md](.context/standards/Extension-Development-Guide.md) |
| `lib/papi-dts/` | TypeScript type declarations for PAPI |
| `lib/platform-bible-react/` | React components and hooks for extensions |
| `lib/platform-bible-utils/` | Utility functions and classes |
| `papi.d.ts` | Generated PAPI types (see JSDOC SOURCE/DESTINATION in README) |
| `.erb/configs/` | Webpack configurations |
| `e2e-tests/` | End-to-end Playwright tests (CDP-based) |
| `.vscode/launch.json` | Debug configurations |

### Path Aliases (`tsconfig.json`)

`@main/*` → `src/main/`, `@node/*` → `src/node/`, `@extension-host/*` → `src/extension-host/`, `@renderer/*` → `src/renderer/`, `@shared/*` → `src/shared/`

### WebView Special Imports

- `import file from './path?inline'` — Imports as string (transformed by Webpack)
- `import file from './path?raw'` — Imports as raw string (no transformation)

## Development Workflow

1. Changes to renderer or main TypeScript code hot-reload automatically when running `./refresh.sh` (or `npm start` for manual development)
2. Extension changes are watched and rebuilt automatically
3. .NET changes require manual rebuild or running `npm run start:data` in separate terminal
4. Use VS Code "Debug Platform" compound configuration to debug both frontend and backend

## Platform-Specific Notes

**Linux**: May need `--no-sandbox` flag for Electron on Ubuntu 24.04 with AppArmor. See README for setup.

**macOS**: Requires MacPorts with icu4c libraries. The .NET build automatically copies dylibs to output directory during development.

**Windows**: Use WSL2 for cross-platform testing. Follow WSL setup in README.

## Version Management

- Use Node.js version specified in `package.json` → `volta.node` (recommend using Volta)
- Requires .NET 8 SDK
- Extensions and core must match version numbers for compatibility

## Links

- [PAPI Documentation](https://paranext.github.io/paranext-core/papi-dts)
- [React Components Docs](https://paranext.github.io/paranext-core/platform-bible-react)
- [Utilities Docs](https://paranext.github.io/paranext-core/platform-bible-utils)
- [Extension Template](https://github.com/paranext/paranext-extension-template/wiki)
