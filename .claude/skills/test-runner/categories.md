# Test Categories Reference

## C# Test Categories

The C# tests in `c-sharp-tests/` annotate tests with `[Category("...")]`. Use these
categories with `dotnet test --filter "Category=..."`.

These are the categories that actually exist in the codebase (grep
`\[Category("...")\]` in `c-sharp-tests/` to confirm). The most heavily used by far is
`Contract`.

| Category | Purpose |
|----------|---------|
| `Contract` | API/behavior contract verification — the bulk of the suite |
| `Acceptance` | End-to-end acceptance of a feature's behavior |
| `GoldenMaster` | Golden-master comparisons against recorded expected output |
| `Integration` | Tests exercising multiple components together |
| `Critical` | Critical-path tests that must not regress |
| `Invariant` | Properties/invariants that must always hold |
| `Regression` | Tests pinned to specific past bugs |
| `EdgeCase` | Boundary and edge-case behavior |
| `Infrastructure` | Test/infrastructure plumbing |
| `ErrorPath` | Error-handling and failure paths |
| `DiskVerification` | Verifies on-disk results (e.g. files written) |

There is no `Unit`, `Fast`, `Slow`, `VeryLong`, `PAPI`, `Network`, `Scripture`,
`Project`, or `Extension` category — do not filter on those.

## Category Usage Examples

### Single Category

```bash
# Run only contract tests
dotnet test --filter "Category=Contract"

# Run only golden-master tests
dotnet test --filter "Category=GoldenMaster"
```

### Multiple Categories (OR)

```bash
# Run contract OR integration tests
dotnet test --filter "Category=Contract|Category=Integration"
```

### Multiple Categories (AND)

```bash
# Run tests that are both Acceptance AND Critical
dotnet test --filter "Category=Acceptance&Category=Critical"
```

### Exclude Category

```bash
# Run all except golden-master tests
dotnet test --filter "Category!=GoldenMaster"

# Run all except integration tests
dotnet test --filter "Category!=Integration"
```

### Combine with Name Filter

```bash
# Contract tests for the Projects feature
dotnet test --filter "Category=Contract&FullyQualifiedName~Project"
```

## TypeScript Test Organization

TypeScript tests use describe blocks for organization:

```typescript
describe('FeatureName', () => {
  describe('Unit', () => {
    it('tests isolated behavior', () => {});
  });

  describe('Integration', () => {
    it('tests component interaction', () => {});
  });

  describe('Snapshot', () => {
    it('matches visual snapshot', () => {});
  });
});
```

### Filtering TypeScript Tests

```bash
# By describe block name
npm test -- --testNamePattern="Unit"

# By test name
npm test -- --testNamePattern="tests isolated behavior"

# By file pattern
npm test -- src/**/*.unit.test.ts
```

## TDD Phase Categories

### RED Phase (Test Writer)

Write tests with the categories that match what they verify. For most new behavior,
that is `Contract`:

```csharp
[Test]
[Category("Contract")]
public void Method_Condition_ExpectedBehavior() { }
```

### GREEN Phase (Implementer)

Run in this order:

```bash
# 1. Contract tests (the bulk of the suite — verify API/behavior compliance)
dotnet test --filter "Category=Contract"

# 2. Integration tests (component interactions)
dotnet test --filter "Category=Integration"

# 3. Acceptance tests (feature-level behavior)
dotnet test --filter "Category=Acceptance"

# 4. All tests
dotnet test c-sharp-tests/c-sharp-tests.csproj
```

### REFACTOR Phase

Run all tests frequently:

```bash
# Quick check during refactor
dotnet test --filter "Category=Contract|Category=Integration"

# Full validation before commit
dotnet test c-sharp-tests/c-sharp-tests.csproj
```

## CI Pipeline Order

CI does not filter by category. The `Test` workflow
(`.github/workflows/test.yml`) runs the entire C# suite in a single step:

```bash
dotnet test c-sharp-tests/c-sharp-tests.csproj
```

There is no per-category ordering in CI — every category runs together as one
`dotnet test` invocation.
