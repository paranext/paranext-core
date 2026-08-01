---
paths:
  - c-sharp/**
  - c-sharp-tests/**
---

## Send/Receive Write Gate — Full Semantics

The invariant (root `CLAUDE.md` → "Send/Receive Write Gate"): any new C# code path that mutates
project data wraps the mutation in `using var _ = SendReceiveWriteLock.EnterWrite(projectId);` as
the first statement of its entry-point method
(`c-sharp/Projects/SendReceive/SendReceiveWriteLock.cs`). Details below.

The gate has **no thread affinity** (its state is a single atomic word — an armed flag, an
in-flight write count, and an arm generation — not an OS lock): a scope may be disposed on a
different thread, holding one across an `await` is safe, and `SetSyncing`/`Clear` may run on any
threads. `SetSyncing` returns a token; end the bracket with `Clear(token)` (a stale token is a
logged no-op, so a late Clear can never disarm a newer sync) and keep parameterless `Clear()` for
crash recovery — it force-disarms unconditionally and is idempotent. Nested `EnterWrite` calls do
not crash, but they are **not safe**: if a sync arms while the outer scope is open, the inner call
throws the sentinel mid-mutation — keep one scope per mutation (delegate to an un-gated core
inside a single scope, as `SetBookUsfmInScope` does). Keep scopes **tight** — the mutation and
nothing else — because every open scope delays a starting sync's bounded drain toward its timeout.

This is an **in-process** gate, distinct from the S/R server-side repository lock
(`lockrepo`/`unlockrepo` between clients) — do not conflate the two. `SendReceiveWriteLockCoverageTests`
(`c-sharp-tests/Projects/SendReceive/`) scans the source tree (excluding `bin`/`obj`) for direct
project-write call patterns (a general `.Save(` heuristic, `PutText`, comment `SaveUser`/`SaveEdits`,
and `File`/`FileManager` deletes) and fails on any hit that isn't covered per site by one of: gate
evidence (an `EnterWrite`/`EnterSyncWriteScope` call above it in the same method); an inline
`// SR-write-gate: exempt — <reason>` marker on/above the write (for writes reached only through an
already-gated caller — the un-gated `SetBookUsfmInScope` core and the ManageBooks orchestrators,
each citing its gated caller + `TODO(PT-4210)`); or a whole-file entry on the test's exempt list,
which is reserved for **not-project-data** files only. Per-site (not whole-file), so a new ungated
write added to an already-gated file is still caught.
