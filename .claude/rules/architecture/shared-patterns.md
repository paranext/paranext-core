---
paths:
  - "src/shared/**"
  - "src/node/**"
---

# Cross-Process Code Decisions

Rules for code shared across processes (main, renderer, extension-host).

## Process Boundary Rules

| Can Cross Boundary    | Cannot Cross Boundary |
| --------------------- | --------------------- |
| Plain objects         | Functions             |
| Primitive types       | Class instances       |
| Serializable data     | Closures              |
| JSON-compatible types | DOM references        |

## Serialization Safety

- All cross-process data must be JSON-serializable
- Use `structuredClone()` for deep copies
- Never pass callbacks over process boundaries

## src/shared/ vs src/node/

| Location       | Purpose                                            |
| -------------- | -------------------------------------------------- |
| `src/shared/`  | Code for ALL processes (including renderer)        |
| `src/node/`    | Code for Node.js processes only (main, extension-host) |

## Network Service Patterns

- Services in `src/shared/services/` define interfaces
- Implementation lives in process-specific code
- Use request/response patterns over IPC/WebSocket

See [Architecture.md](/.context/standards/Architecture.md) for process architecture.
