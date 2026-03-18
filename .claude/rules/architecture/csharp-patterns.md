---
paths:
  - "c-sharp/**/*.cs"
---

# C# Architecture Decisions

For C# architectural decisions, query the [decision registry](/.context/architecture/decision-registry.json):

- `libraries.csharp.*` - Library choices (JSON, async, collections, concurrency, disposal)
- `patterns.csharp.*` - Pattern selection with `when` guidance (DataProvider, NetworkObject, Individual commands, Service, Worker, Factory)
- `constraints.*` with `enforcement: "roslyn"` - Lint-enforced rules (PNX001-008)

## What's Enforced by Linting (Don't Duplicate)

Roslyn PNX001-008 enforces: Trace/Debug ban, one type per file, namespace structure, tuple returns, concrete types.

See [Paranext-Core-Patterns.md](/.context/standards/Paranext-Core-Patterns.md) for detailed patterns.
