---
paths:
  - "**/*.test.ts"
  - "**/*.test.tsx"
  - "c-sharp-tests/**/*.cs"
---

# TDD Discipline Rules

These are PROCESS rules that linting cannot enforce.

## When TDD is Required

TDD is required for logic/behavior changes; pure-UI work may use a component-first approach.

## RED-GREEN-REFACTOR Cycle

1. **RED**: Write ONE failing test first
2. **GREEN**: Write MINIMUM code to pass
3. **REFACTOR**: Clean up while tests stay green

### C# RED phase

A C# RED commit cannot be test-only. C# tests won't compile without the types they reference — the compile requirement itself is what forces skeleton stubs alongside failing tests. (On `ai/*` branches with C# changes staged, the pre-commit hook additionally runs `dotnet build c-sharp/ParanextDataProvider.sln`, which includes the test project, blocking uncompilable commits at commit time; on other branches the same failure surfaces in CI instead.)

Commit minimal skeleton type stubs alongside the failing tests so the build passes while the tests still fail at runtime. Keep the skeletons shape-only (no constructors, attributes, validation, or constant values) so the implementer fills in exactly the behavior the RED tests exercise. Do NOT use `--no-verify` to bypass the hook — fix the underlying compile issue with stubs instead.

## The Revert Test

Every test must be capable of failing. Verify by:

1. Comment out the implementation
2. Run the test - it MUST fail
3. If it passes without implementation, rewrite it

**One exception: a `test.fails` tripwire.** A `test.fails` case pins a known, reproduced defect that
has been deliberately deferred to a named ticket; it passes while the defect is present and turns red
when the defect is fixed, which is the intended alarm rather than a broken test. Do not rewrite or
delete one — see "Exception: `test.fails` tripwires" in
[Testing-Guide.md](../../../.context/standards/Testing-Guide.md#verifying-tests-can-fail) for the
conditions it has to meet.

**Reverting is not enough for two common shapes** (three instances found in one day, 2026-08-13,
across the multi-window stack):

- **A predicate the test never asks to reject.** Mutate the expression itself — `() => true`,
  invert a comparison, delete a sort — and confirm RED. Six tests stayed green when a web-view
  type predicate was replaced with `() => true`, because every test gave the non-matching windows
  nothing to reject. Reject-side coverage is where this hides.
- **A negative assertion with nothing to be a negative of.** `expect(log).not.toMatch(...)` passes
  just as happily against output that never arrived. Assert a positive control first — something
  proving the corpus could have matched.

  **The control must be something the corpus could have seen, not merely something certain to
  occur.** Certainty is the easy half and it is not the test. A line emitted before the capture
  attached — or, for a sweep over a slice, before that slice's mark — proves nothing, however
  reliably the app logs it. An app's startup logging is guaranteed to happen and is still invisible
  to a capture that attaches once the app is already running, so a control chosen for being
  unmissable can be absent from every run on every branch; whole-log sweeps are no safer than
  slice-scoped ones here, since a capture created in the test body starts empty either way. Anchor
  on something the test itself causes. The control may also need to differ per site: one taken
  after a quit cannot control a sweep that runs before it.

Both read as MORE rigorous than a weaker test would, which is why reading them never catches it.

## Test Quality (Not Enforceable by Lint)

- Test behavior (WHAT), not implementation (HOW)
- Favor integration tests over excessive unit tests (Testing Trophy)
- Mock only at external boundaries, not internal collaborators

### Integration Test Definition

**Integration test**: Verifies cross-capability call chains where the output of one capability feeds into another. These tests exercise the wiring between components without mocking internal collaborators. Only external boundaries (file system, network, PAPI) should be mocked.

## What's Enforced by Linting (Don't Duplicate)

- File naming, structure → ESLint/Roslyn

See [Testing-Guide.md](../../../.context/standards/Testing-Guide.md) for detailed patterns.
