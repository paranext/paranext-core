---
title: Paratext 10 Overview
description: Overview of PT10 and Platform.Bible — key concepts, architecture, and migration context.
version: 1.0.0
status: active
created: 2026-03-04
last_updated: 2026-03-04
---

# Paratext 10 Overview

## Paratext 10 and Platform.Bible

**Paratext 10 (PT10)** is the next generation of Paratext, the industry-standard Bible translation software used by translators worldwide. It is being built on **Platform.Bible**, an open-source, extensible platform.

### The Relationship

| Term | What It Is |
|------|------------|
| **Platform.Bible** | The open-source platform (paranext-core repo) - a general-purpose foundation for Bible software |
| **Paratext 10** | The flagship product being built on Platform.Bible, porting features from Paratext 9 |
| **paranext-core** | The GitHub repository containing Platform.Bible's source code |

Platform.Bible provides the technical foundation (Electron, React, .NET backend, extension system), while Paratext 10 delivers the Bible translation functionality that users need.

---

## Platform.Bible Technical Overview

**Platform.Bible** (paranext-core) is an open-source, extensible Bible translation platform built by SIL Global and United Bible Societies. It's designed to provide powerful, flexible functionality for Bible translation work through an extension-based architecture.

**Repository:** https://github.com/paranext/paranext-core
**License:** MIT
**Status:** Active development (not yet ready for general release)

---

## Tech Stack

| Layer              | Technology                                 |
| ------------------ | ------------------------------------------ |
| Desktop Framework  | Electron 36.5                              |
| Frontend           | React 18.3, TypeScript, SCSS, Tailwind CSS |
| Backend (Node)     | TypeScript, WebSocket (JSON-RPC 2.0)       |
| Backend (Data)     | .NET 8 / C#                                |
| Build System       | Webpack 5                                  |
| Testing            | Vitest, Storybook 9                        |
| Package Management | npm workspaces (monorepo)                  |

---

## Architecture Overview

Platform.Bible uses a **multi-process architecture** with four main processes:

```
┌─────────────────────────────────────────────────────────┐
│                    Main Process (Electron)               │
│  • Window management & app lifecycle                     │
│  • Spawns and manages child processes                    │
│  • IPC coordination                                      │
└────────────────┬────────────────────────────────────────┘
                 │ JSON-RPC over WebSocket (port 8876)
    ┌────────────┼────────────┬───────────────────┐
    │            │            │                   │
┌───▼────────┐ ┌─▼──────────┐ ┌▼────────────────┐
│ Renderer   │ │ Extension  │ │ .NET Data       │
│ (React UI) │ │ Host       │ │ Provider        │
│            │ │            │ │                 │
│ • Web UI   │ │ • Loads    │ │ • Project data  │
│ • Dialogs  │ │   extensions│ │ • Paratext     │
│ • Themes   │ │ • PAPI     │ │   integration   │
│ • WebViews │ │ • Services │ │ • C# services   │
└────────────┘ └────────────┘ └─────────────────┘
```

### Key Concepts

1. **PAPI (Platform API)** - The central API that extensions use to interact with the platform. Type definitions are in [lib/papi-dts/papi.d.ts](lib/papi-dts/papi.d.ts).

2. **Extensions** - Most functionality is provided through extensions rather than core code. Extensions can provide:

   - Commands
   - Data providers
   - Web views (UI panels)
   - Menu items
   - Settings

3. **Data Providers** - Abstraction for accessing data (projects, settings, etc.) with subscription-based updates.

4. **Network Objects** - Objects exposed across processes via the network service.

---

## Directory Structure

```
paranext-core/
├── src/                      # Main application source
│   ├── main/                 # Electron main process
│   ├── renderer/             # React UI (components, hooks, services)
│   ├── extension-host/       # Extension runtime & PAPI
│   ├── shared/               # Code shared across all processes
│   └── node/                 # Node.js-specific utilities
│
├── lib/                      # Published libraries (npm workspaces)
│   ├── papi-dts/            # PAPI type definitions for extensions
│   ├── platform-bible-react/ # React component library
│   └── platform-bible-utils/ # Utility functions & types
│
├── extensions/               # Core bundled extensions
│   └── src/
│       ├── platform-scripture/        # Scripture reading
│       ├── platform-scripture-editor/ # Scripture editing
│       ├── platform-lexical-tools/    # Language tools
│       └── ...                        # Other extensions
│
├── c-sharp/                  # .NET data provider backend
│   ├── Services/             # Data services
│   ├── Projects/             # Project management
│   └── Checks/               # Data validation
│
├── .erb/                     # Build configuration
│   ├── configs/              # Webpack configs (8 total)
│   └── scripts/              # Build helper scripts
│
└── .github/workflows/        # CI/CD pipelines
```

---

## Key Files to Know

| File                                                                         | Purpose                             |
| ---------------------------------------------------------------------------- | ----------------------------------- |
| [src/main/main.ts](src/main/main.ts)                                         | Main process entry point            |
| [src/renderer/index.tsx](src/renderer/index.tsx)                             | React app entry point               |
| [src/extension-host/extension-host.ts](src/extension-host/extension-host.ts) | Extension host entry                |
| [src/shared/services/](src/shared/services/)                                 | Cross-process services              |
| [lib/papi-dts/papi.d.ts](lib/papi-dts/papi.d.ts)                             | PAPI type definitions (457KB!)      |
| [package.json](package.json)                                                 | Scripts, dependencies, workspaces   |
| [tsconfig.json](tsconfig.json)                                               | TypeScript config with path aliases |
| [electron-builder.json5](electron-builder.json5)                             | App packaging config                |

---

## Development Workflow

### Setup

```bash
# Prerequisites: Node.js 22.16.0 (use Volta), .NET 8 SDK
npm install
```

### Common Commands

```bash
npm start              # Run dev environment (all processes)
npm run build          # Production build
npm test               # Run all tests
npm run lint           # Check code quality
npm run format         # Auto-format code
npm run package        # Create distributable
npm run storybook      # Component documentation
```

### Path Aliases

TypeScript path aliases for clean imports:

- `@main/*` → src/main/
- `@renderer/*` → src/renderer/
- `@extension-host/*` → src/extension-host/
- `@shared/*` → src/shared/
- `@node/*` → src/node/

---

## Core Services

### Main Process Services ([src/main/services/](src/main/services/))

- **extension-host.service** - Manages extension host process
- **dotnet-data-provider.service** - Manages .NET process
- **app.service** - App metadata and lifecycle
- **data-protection.service** - Encryption/decryption

### Shared Services ([src/shared/services/](src/shared/services/))

- **network.service** - JSON-RPC communication
- **command.service** - Command registration & dispatch
- **settings.service** - Persistent configuration
- **project-data-provider.service** - Project data access

### Extension Host Services ([src/extension-host/services/](src/extension-host/services/))

- **extension.service** - Extension loading & lifecycle
- **menu-data.service** - Menu management
- **theme-data.service** - Theme management
- **localization.service** - i18n support

---

## Extension System

Extensions are the heart of Platform.Bible. Each extension has:

```
extension-name/
├── manifest.json       # Metadata & contributions
├── src/
│   ├── main.ts        # Extension entry point
│   └── types/         # Type definitions
├── contributions/      # Menu items, settings, etc.
└── assets/            # Icons, images
```

### Core Extensions

- **platform-scripture** - Scripture reading functionality
- **platform-scripture-editor** - Scripture text editing
- **platform-lexical-tools** - Lexical/grammar tools
- **platform-get-resources** - Resource management
- **legacy-comment-manager** - Comments system

---

## Testing

- **Unit tests:** Vitest with jsdom ([vitest.config.ts](vitest.config.ts))
- **C# tests:** dotnet test in [c-sharp-tests/](c-sharp-tests/)
- **Component docs:** Storybook for React components
- **CI:** GitHub Actions runs tests on Windows, macOS, Linux

---

## CI/CD

GitHub Actions workflows in [.github/workflows/](.github/workflows/):

- **test.yml** - Run on every PR (build, test, lint, package)
- **publish.yml** - Manual release workflow with code signing
- **package-main.yml** - Build packages on main branch commits

---

## Quick Reference

### Inter-Process Communication

All processes communicate via **JSON-RPC 2.0 over WebSocket** (port 8876).

### Key Patterns

1. **Service pattern** - Singleton services for specific functionality
2. **Data provider pattern** - Abstraction for data access with subscriptions
3. **Command pattern** - Registered handlers for type-safe dispatch
4. **Factory pattern** - Create project data providers on demand

### Process Separation

- Main process cannot import renderer code
- Renderer cannot import main/extension-host code
- Shared code is safe for all processes
- Webpack enforces these boundaries

## Version Log

| Version | Date       | Change          |
| ------- | ---------- | --------------- |
| 1.0.0   | 2026-03-04 | Initial version |
