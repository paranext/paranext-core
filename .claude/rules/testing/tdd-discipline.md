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

## Test Quality (Not Enforceable by Lint)

- Test behavior (WHAT), not implementation (HOW)
- Favor integration tests over excessive unit tests (Testing Trophy)
- Mock only at external boundaries, not internal collaborators

### Integration Test Definition

**Integration test**: Verifies cross-capability call chains where the output of one capability feeds into another. These tests exercise the wiring between components without mocking internal collaborators. Only external boundaries (file system, network, PAPI) should be mocked.

## What's Enforced by Linting (Don't Duplicate)

- File naming, structure → ESLint/Roslyn

See [Testing-Guide.md](../../../.context/standards/Testing-Guide.md) for detailed patterns.
