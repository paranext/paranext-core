# Test Categories Reference

## C# Test Categories

Use these categories with `dotnet test --filter "Category=..."`:

### Standard Categories

| Category | Purpose | When to Use |
|----------|---------|-------------|
| `Unit` | Isolated unit tests | Testing single methods/classes in isolation |
| `Integration` | Integration tests | Testing component interactions |
| `Contract` | API contract verification | Verifying API signatures and types match |
| `GoldenMaster` | PT9 behavior comparison | Verifying PT10 matches PT9 output |
| `Property` | Property-based tests | Testing invariants with random inputs |

### Feature-Specific Categories

| Category | Purpose |
|----------|---------|
| `Scripture` | Scripture handling tests |
| `Project` | Project management tests |
| `Extension` | Extension loading/lifecycle tests |
| `PAPI` | Data Provider, Network Object, and command tests |
| `Network` | Network/IPC tests |

### Execution Speed Categories

| Category | Purpose | Typical Duration |
|----------|---------|------------------|
| `Fast` | Quick tests | < 100ms |
| `Slow` | Long-running tests | > 1s |
| `VeryLong` | Very long tests | > 10s |

## Category Usage Examples

### Single Category

```bash
# Run only unit tests
dotnet test --filter "Category=Unit"

# Run only golden master tests
dotnet test --filter "Category=GoldenMaster"
```

### Multiple Categories (OR)

```bash
# Run unit OR integration tests
dotnet test --filter "Category=Unit|Category=Integration"
```

### Multiple Categories (AND)

```bash
# Run tests that are both Unit AND Fast
dotnet test --filter "Category=Unit&Category=Fast"
```

### Exclude Category

```bash
# Run all except slow tests
dotnet test --filter "Category!=Slow"

# Run all except property tests
dotnet test --filter "Category!=Property"
```

### Combine with Name Filter

```bash
# Unit tests for Project feature
dotnet test --filter "Category=Unit&FullyQualifiedName~Project"
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

Write tests with these categories:

```csharp
[Test]
[Category("Contract")]
[Category("Unit")]
public void Method_Condition_ExpectedBehavior() { }

[Test]
[Category("GoldenMaster")]
public void Feature_MatchesPT9Output() { }

[FsCheck.NUnit.Property]
[Category("Property")]
public Property Invariant_AlwaysHolds() { }
```

### GREEN Phase (Implementer)

Run in this order:

```bash
# 1. Contract tests (must pass for API compliance)
dotnet test --filter "Category=Contract"

# 2. Unit tests (core logic)
dotnet test --filter "Category=Unit"

# 3. Golden master tests (PT9 compatibility)
dotnet test --filter "Category=GoldenMaster"

# 4. Property tests (invariants)
dotnet test --filter "Category=Property"

# 5. All tests
dotnet test
```

### REFACTOR Phase

Run all tests frequently:

```bash
# Quick check during refactor
dotnet test --filter "Category=Unit|Category=Contract"

# Full validation before commit
dotnet test
```

## Recommended Test Distribution

For a typical feature:

| Category | Count | Purpose |
|----------|-------|---------|
| Unit | Many (10-50+) | Cover all code paths |
| Contract | Few (3-10) | Verify API surface |
| GoldenMaster | Several (5-20) | Key PT9 scenarios |
| Property | Few (2-5) | Core invariants |
| Integration | Few (3-10) | Component interactions |

## CI Pipeline Order

Tests run in CI in this order (fastest first):

1. `Category=Unit` - Fast feedback
2. `Category=Contract` - API verification
3. `Category=Integration` - Component tests
4. `Category=GoldenMaster` - Compatibility
5. `Category=Property` - Invariant checks (can be slow)
