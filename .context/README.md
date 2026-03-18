# `.context/` — AI-Readable Project Documentation

This directory contains structured documentation that Claude Code and other AI tools use to understand Platform.Bible's architecture, patterns, and conventions.

## What's Here

| Path | Purpose |
| --- | --- |
| `standards/` | Coding standards, architecture patterns, testing guides |
| `architecture/` | Decision registry (ADRs) and schema |
| `Paratext10-Overview.md` | High-level overview of PT10/Platform.Bible concepts |

## Standards

These documents capture patterns and conventions that are too detailed for `CLAUDE.md` but important for consistent development:

- **Architecture.md** — Process communication, data providers, PAPI
- **Code-Style-Guide.md** — TypeScript/C# naming, localization, shadcn/ui
- **Code-Review-Guide.md** — Reviewable workflow, code stewards
- **Component-Builder-Patterns.md** — React/WebView patterns
- **Component-Selection-Quick-Reference.md** — Choosing platform-bible-react components
- **Entry-Point-Guide.md** — Menu items, commands, keyboard shortcuts
- **Extension-Development-Guide.md** — Extension anatomy, PAPI, WebViews
- **Git-Guide.md** — Branch strategy, squash-merge, template merges
- **Localization-Guide.md** — Mandatory i18n patterns
- **Paranext-Core-Patterns.md** — C#/TypeScript implementation patterns
- **Security-Guide.md** — CSP, module restrictions, sandboxing
- **Testing-Guide.md** — Vitest/NUnit, TDD, mocking, CI

## For Non-AI Users

These files are documentation — they don't affect builds, tests, or runtime behavior. They're useful as a reference even without AI tools.
