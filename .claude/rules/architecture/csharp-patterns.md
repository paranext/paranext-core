---
paths:
  - "c-sharp/**/*.cs"
---

# C# Architecture Decisions

Design decisions for the C# data-provider backend (not enforceable by linting). See [Paranext-Core-Patterns.md](../../../.context/standards/Paranext-Core-Patterns.md) for the full patterns and code examples.

## Data Provider Contract: `get`/`set`/`subscribe` Are Magic Prefixes

`get`, `set`, and `subscribe` are **reserved** for methods that are part of a data provider's contract — the prefix opts the method into the TS data-provider service:

- `Get*` / `Set*` are implemented in **C#**; `subscribe*` is **auto-generated** TS-side from the events `Set*` emits (declare it in the `.d.ts`, never write a body).
- Every `Set*` MUST call `SendDataUpdateEvent(...)` for each affected data type — that is how subscribers get notified.
- Each data type needs its own paired `Get*` / `Set*` / `subscribe*`; they cannot be shared across methods.
- A provider helper that is **not** part of the contract MUST NOT start with `get`/`set`/`subscribe` — use another verb (`lookup*`, `compute*`, `list*`).
- When a **NetworkObject** (not the DataProvider itself) mutates project data that DataProvider subscribers observe, it must fire `GetExistingProjectDataProvider(projectId)?.SendFullProjectUpdateEvent()` for the changed project — see the mutation-notify pattern in [Paranext-Core-Patterns.md](../../../.context/standards/Paranext-Core-Patterns.md).

## Logic Placement: C# Process Is Reserved for ParatextData

The C# data-provider process is for **ParatextData-backed** services. OS-state / UI-adjacent services (focus, `WebViewDefinition` reads, settings — anything not backed by `ParatextData.dll`) belong in a TypeScript service host, not C#. See "Logic Placement" in [Paranext-Core-Patterns.md](../../../.context/standards/Paranext-Core-Patterns.md).

## Visibility

| Component | Visibility | Why |
| --- | --- | --- |
| Static services | `internal static class` | Used only within the C# backend |
| DataProviders / Workers | `internal sealed class` | Single implementation, not inherited |
| Exceptions | `public class` | May cross process boundaries (serialized) |
| Result / Options records | `public record` | Returned/passed via PAPI |

## Returns & Errors

- **Return records, not tuples**, from `DataProvider`/`NetworkObject` methods — tuples serialize as `{}` over JSON-RPC and silently lose data (this is what PNX007 catches).
- Throw **custom exception types** with structured properties for domain errors that cross process boundaries (e.g. `MissingBookException`); keep shared ones at the `c-sharp/` root.
- **Multi-item operations return a partial-success record** (`{ Success, Errors[], Warnings[] }`) and accumulate per-item failures *inside* the loop rather than throwing on the first one (e.g. `CopyBooksResult` / `ImportBooksResult`). See "Partial-success Result contract" in [Paranext-Core-Patterns.md](../../../.context/standards/Paranext-Core-Patterns.md).
- **Preserve PT9 persisted/wire identifiers verbatim — including typos.** A PT9 on-the-wire identifier is the persisted value that round-trips through PT9-touched project data, so the PT10 config must match it exactly. Example: `CheckType.InternalValue` is `"MixexCapitalization"` (typo in PT9 `ParatextData/Checking/CheckType.cs`), so the PT10 check config uses that exact misspelled string. See "Preserve PT9 persisted/wire identifiers verbatim" in [Paranext-Core-Patterns.md](../../../.context/standards/Paranext-Core-Patterns.md).

### Cross-process parameter alignment

When a PAPI command spans the TS↔C# boundary, StreamJsonRpc matches the handler by method name **and argument count** (`AddLocalRpcMethod` in `PapiClient.cs`). An **arity** mismatch between the TS call site and the C# handler lambda therefore fails **silently** with JSON-RPC `-32602` (Invalid params) — a distinct failure from the tuple/serialization-shape issue PNX007 catches. When adding or editing such a command:

- **TS optional params change the actual arg count.** A `b?: T` parameter is only sent when the call site passes it, so an arity that looks correct against the type declaration can still be wrong. Check every call site, not just the signature.
- **Object-param vs positional must match exactly.** `sendCommand` spreads positional args (`networkService.request(..., ...args)` in `command.service.ts`): `sendCommand("cmd", obj)` maps to a C# handler taking one `(RequestType request)`, whereas `sendCommand("cmd", a, b)` maps to `(Type1 a, Type2 b)` — never a single object's separate properties as positional args.

See [Paranext-Core-Patterns.md](../../../.context/standards/Paranext-Core-Patterns.md).

## Concurrency

- Assume registered PAPI methods are called **concurrently**. If a method isn't thread-safe, `lock` it.
- `ConcurrentDictionary` for simple key/value access; `Interlocked` for atomic counters/flags.
- If updating shared state takes **more than one operation**, you MUST `lock` for atomicity — a concurrent collection alone is not enough.
- Bridge sync↔async with `ThreadingUtils.RunTask(...)`, not `.Result` / `.Wait()`.

## What's Enforced by Linting (Don't Duplicate)

Roslyn analyzers in `c-sharp/Paranext.Analyzers` (`DiagnosticIds.cs`) — don't re-document these:

- **PNX001** — ban `System.Diagnostics.Trace` (use `Console.WriteLine`)
- **PNX004** — one type per file
- **PNX005** — namespace must match directory
- **PNX007** — no tuple returns from `DataProvider`/`NetworkObject` (use records)
- **PNX008** — ban the `dynamic` keyword
