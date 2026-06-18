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

## TypeScript Service Authoring

Pick the service shape by whether it holds state and whether its implementation differs per process. (This is orthogonal to the network/proxy axis above — it's about how you *write* the module.)

| Shape | Use | When | Why |
| ----- | --- | ---- | --- |
| **Stateless** | Function exports — no class | Pure utilities, logging, formatting, stateless helpers | Simpler, tree-shakeable, no `this`-binding issues |
| **Stateful** | Module-level state plus `initialize()` / `shutdown()` functions | Services with a lifecycle (network, data providers) | Explicit lifecycle; mutex-protected initialization (e.g. `network.service.ts`) |
| **Process-specific** | Factory function with dynamic `import()` | Different implementation per process (main / renderer / extension-host) | Lazy loading; process detection at runtime (e.g. `rpc-handler.factory.ts` does `(await import('@main/...')).default`) |

- **Choice:** default to stateless function exports; reach for module-level state + `initialize()`/`shutdown()` only when there's a real lifecycle to manage; use a factory + dynamic import only when the implementation genuinely diverges per process.
- **Avoid:** wrapping stateless helpers in a class instance, and eager top-level `import` of a process-specific implementation (it pulls that process's code into every bundle).

## DataProvider Engine Hosting

Host a DataProvider engine in the process where its **dominant data source** lives, so subscribers don't fan out cross-process. The renderer hosts focus/window state, browser-only APIs (`localStorage`), `WebViewDefinition` reads, and theme/system-preference observers — engines reading those belong in the renderer (`src/renderer/services/*.service-host.ts`). The extension host hosts engines whose data is genuinely extension-host-local (extension lifecycle, cross-extension coordination).

- **Choice:** put the engine in the process that owns its primary data source. e.g. `theme.service-host.ts` (reads OS color-scheme preference + `localStorage`) and `window.service-host.ts` (emits `Focus` / `AppFocus` from renderer-local events) both live in the renderer.
- **Avoid:** hosting an engine in the extension host when ALL its data sources are renderer-local — every event would then JSON-RPC across the boundary for each subscriber.
- **Rationale:** the decision is per-engine; a cross-process subscription chain is fine as the exception, not the rule for every event.
- **C# vs TypeScript host:** OS-state / UI-adjacent services (focus, `WebViewDefinition`, settings) belong in a TypeScript service host; the C# data-provider process is reserved for ParatextData-backed services. See "Logic Placement" in [Paranext-Core-Patterns.md](../../../.context/standards/Paranext-Core-Patterns.md).

## Service-Internal Key-Value State

For service-internal key-value state that must survive restart, is scoped to a single renderer, and must NOT be mutable by callers, use renderer `window.localStorage` under a namespaced key (`<feature>.<store-name>`).

- **Choice:** namespaced renderer `localStorage`; mutate only through the service's own internal methods (no public setter). Synchronous API, so no write-queue; on corrupted JSON, fall back to fresh state rather than throw.
- **Avoid:**
  - `papi.settings.get/set` for internal-only state — `papi.settings.set` is a PUBLIC PAPI surface (`ISettingsService.set`), so any extension could mutate it.
  - Custom IndexedDB / SQLite for small key-value state — `localStorage` is synchronous, small, and sufficient.
- **Rationale:** `papi.settings` is for state that genuinely IS user-configurable across processes / via settings UI; this pattern is specifically for state only the service should write.

## Scripture-Reference Contracts

Any cross-process contract carrying a scripture reference (book + chapter + verse + versification) — PAPI event payload, web-view state, or cross-process message — uses `SerializedVerseRef` from `@sillsdev/scripture`, including the matching C# DTO shape.

- **Choice:** `SerializedVerseRef` everywhere; a display string (e.g. `"GEN 1:1"`) MAY accompany the structured form but never replaces it. This is the canonical shape already used across `platform-bible-utils` (`scripture-util.ts`, `scripture.model.ts`) and `platform-bible-react` (book-chapter-control, scope-selector).
- **Avoid:**
  - Generic `VerseRef` placeholder types in data contracts.
  - Display-string-only fields like `{ ref: string }` when the consumer needs to route to an editor / verse picker.
  - Per-feature parallel types (`ScriptureReferenceDto`, ad-hoc `{ book, chapter, verse }` interfaces).
- **Rationale:** one canonical shape keeps producers and consumers aligned across PAPI boundaries without ad-hoc string-parsing.

See [Architecture.md](../../../.context/standards/Architecture.md) for process architecture.
