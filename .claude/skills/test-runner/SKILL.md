---
name: test-runner
description: "[paranext-core ONLY] Run TypeScript and C# tests with structured output, filtering, and coverage. Use when running unit tests, golden master tests, property tests, or checking test coverage for Platform.Bible. NOT for use in PT9/legacy Paratext codebases."
allowed-tools: Bash, Read
---

# Test Runner Skill

Run and analyze tests for Platform.Bible (paranext-core) with structured output.

For testing patterns, best practices, and infrastructure details, see [Testing-Guide.md](../../.context/standards/Testing-Guide.md).

## Quick Reference

| Action | Command |
|--------|---------|
| All TypeScript tests | `npm test` |
| All C# tests | `dotnet test c-sharp-tests/` |
| Specific TS test | `npm test -- path/to/test.ts` |
| C# by category | `dotnet test --filter "Category=GoldenMaster"` |
| Watch mode | `npm test -- --watch` |
| E2E (CDP, running app) | `npx playwright test --config=e2e-tests/playwright-cdp.config.ts` |
| E2E (standalone) | `npx playwright test --config=e2e-tests/playwright.config.ts --project=development` |

## TypeScript Tests (Vitest)

### Run All Tests

```bash
npm test
```

### Run Specific Test File

```bash
npm test -- path/to/test.test.ts
```

### Run Tests Matching Pattern

```bash
# By file name pattern
npm test -- --testNamePattern="ComponentName"

# By file path pattern
npm test -- src/renderer/components/
```

### Watch Mode

Automatically re-run tests on file changes:

```bash
npm test -- --watch
```

### With Coverage

```bash
npm test -- --coverage
```

Coverage report locations:
- Console summary
- `coverage/` directory for detailed HTML report

### Verbose Output

```bash
npm test -- --reporter=verbose
```

## C# Tests (NUnit/xUnit)

### Run All Tests

```bash
cd c-sharp-tests
dotnet test
```

Or from project root:

```bash
dotnet test c-sharp-tests/
```

### Run Specific Test Project

```bash
dotnet test c-sharp-tests/SpecificTests.csproj
```

### Filter by Category

Platform.Bible uses test categories:

| Category | Purpose |
|----------|---------|
| `Contract` | API contract tests |
| `GoldenMaster` | PT9 behavior comparison |
| `Property` | Property-based tests |
| `Integration` | Integration tests |
| `Unit` | Unit tests |

```bash
# Run only golden master tests
dotnet test --filter "Category=GoldenMaster"

# Run only property tests
dotnet test --filter "Category=Property"

# Run multiple categories
dotnet test --filter "Category=Contract|Category=Unit"
```

### Filter by Test Name

```bash
# By test method name
dotnet test --filter "FullyQualifiedName~CreateProject"

# By class name
dotnet test --filter "ClassName~ProjectDataProviderTests"
```

### Verbose Output

```bash
dotnet test --logger:"console;verbosity=detailed"
```

### With Coverage

```bash
dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=lcov
```

## Test Output Interpretation

### Vitest Output

```
 ✓ src/component.test.ts (5 tests) 45ms
   ✓ ComponentName
     ✓ renders correctly
     ✓ handles click
     ✓ shows loading state
     ✓ handles error
     ✓ updates on prop change

 Test Files  1 passed (1)
      Tests  5 passed (5)
   Duration  1.23s
```

### NUnit/xUnit Output

```
Passed!  - Failed:     0, Passed:    15, Skipped:     0, Total:    15
         Duration: 2.5 s
```

## TDD Workflow

### RED Phase (Test Writer)

1. Write failing tests:
   ```bash
   # Verify tests fail (expected)
   npm test -- path/to/new.test.ts
   # Should see failures
   ```

### GREEN Phase (Implementer)

1. Implement minimum code
2. Run tests:
   ```bash
   npm test -- path/to/new.test.ts
   # Should pass
   ```

### REFACTOR Phase

1. Make small change
2. Verify tests still pass:
   ```bash
   npm test
   dotnet test c-sharp-tests/
   ```
3. Repeat

## Running Tests for Specific Features

### By Feature Directory

```bash
# TypeScript tests for a feature
npm test -- extensions/src/platform-scripture/

# C# tests for a feature
dotnet test --filter "FullyQualifiedName~Scripture"
```

### Golden Master Tests Only

```bash
# C# golden masters
dotnet test --filter "Category=GoldenMaster"

# Look for snapshot tests in TypeScript
npm test -- --testNamePattern="snapshot"
```

## Playwright E2E Tests

### Two Execution Modes

| Mode | Config | When to Use |
|------|--------|-------------|
| **CDP (connect to running app)** | `e2e-tests/playwright-cdp.config.ts` | During UI phase, component building, judging |
| **Standalone (launches own Electron)** | `e2e-tests/playwright.config.ts` | CI, standalone testing |

**CDP mode** connects to the already-running app via port 9223. No app restart needed.
**Standalone mode** launches its own Electron instance. Requires port 8876 to be free (`npm stop` first).

### CDP Mode (Recommended during development)

```bash
# Run all E2E tests against running app
npx playwright test --config=e2e-tests/playwright-cdp.config.ts

# Run tests for a specific feature
npx playwright test e2e-tests/tests/{feature}/ --config=e2e-tests/playwright-cdp.config.ts

# Run specific test file
npx playwright test e2e-tests/tests/{feature}/{feature}-render.spec.ts --config=e2e-tests/playwright-cdp.config.ts
```

Prerequisite: App running with `--remote-debugging-port=9223` (the `app-runner` skill enables this automatically).

### Standalone Mode (CI)

```bash
npm stop  # Port 8876 must be free
npx playwright test --config=e2e-tests/playwright.config.ts --project=development
```

### Debug Failing E2E Tests

```bash
# View HTML report
npx playwright show-report e2e-tests/playwright-report

# Check failure artifacts
ls e2e-tests/test-results/
```

## Debugging Failed Tests

### Get More Context

```bash
# TypeScript - show full diff
npm test -- --reporter=verbose

# C# - detailed output
dotnet test --logger:"console;verbosity=detailed" -v n
```

### Run Single Failing Test

```bash
# TypeScript
npm test -- --testNamePattern="exact test name"

# C#
dotnet test --filter "FullyQualifiedName=Namespace.Class.MethodName"
```

### Check for Flaky Tests

Run tests multiple times:

```bash
# TypeScript
for i in {1..5}; do npm test; done

# C#
for i in {1..5}; do dotnet test; done
```

## Mutation Testing

Mutation testing verifies test quality by introducing small changes (mutations) to code and checking if tests catch them.

### Prerequisites

Mutation testing requires Stryker to be installed:

```bash
# TypeScript - check if configured
ls stryker.config.json

# C# - check if tool installed
dotnet tool list | grep stryker
```

### Running Mutation Tests

**TypeScript (Stryker-JS):**

```bash
# Run for entire project
npx stryker run

# Run for specific feature
npx stryker run --mutate "src/**/{feature}*.ts"
```

**C# (Stryker.NET):**

```bash
# Run for specific test project
dotnet stryker --project c-sharp-tests/{Feature}Tests.csproj

# Run with HTML report
dotnet stryker --project c-sharp-tests/{Feature}Tests.csproj --reporters "['html', 'progress']"
```

### Interpreting Mutation Results

| Status | Meaning | Action |
|--------|---------|--------|
| **Killed** | Test caught the mutation | Good - test is effective |
| **Survived** | Mutation wasn't detected | Weak test - add better assertion |
| **No Coverage** | Code not exercised by tests | Add test coverage |
| **Timeout** | Infinite loop suspected | Investigate the mutation |
| **Runtime Error** | Mutation caused crash | Usually okay, mutation is lethal |

### Mutation Score

```
Mutation Score = (Killed + Timeout) / Total Mutants × 100

Target: >= 70% for critical logic
```

### Common Surviving Mutants

| Mutation Type | Example | How to Kill |
|---------------|---------|-------------|
| Boundary | `<` → `<=` | Test boundary values |
| Arithmetic | `+` → `-` | Assert on calculation results |
| Boolean | `true` → `false` | Assert on conditionals |
| Return value | `return x` → `return null` | Assert return values aren't null |

---

## Continuous Testing (Background Monitoring)

For TDD workflows, run tests continuously in the background.

### Watch Mode

**TypeScript:**
```bash
# Watch all tests
npm test -- --watch

# Watch specific directory
npm test -- --watch extensions/src/{feature}/
```

**C# (dotnet watch):**
```bash
# Watch tests for changes
dotnet watch test --project c-sharp-tests/

# Watch specific test filter
dotnet watch test --project c-sharp-tests/ -- --filter "{Feature}"
```

### Monitoring Tips

1. **Keep watch running in separate terminal** during implementation
2. **Check output after each edit** - don't wait for phase checkpoints
3. **If test fails unexpectedly** - stop, investigate, fix before continuing

---

## Coverage Thresholds

For features with backend logic (test-specifications/ exist), verify coverage meets thresholds.

### TypeScript Coverage

```bash
npm test -- --coverage
```

Check output for:
- Line coverage: >= 90%
- Branch coverage: >= 80%

### C# Coverage

```bash
dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=lcov /p:Threshold=90 /p:ThresholdType=line
```

### Coverage Report Locations

| Platform | Report Location |
|----------|-----------------|
| TypeScript | `coverage/` directory (HTML) |
| C# | `c-sharp-tests/coverage/` |

---

## See Also

- [Testing-Guide.md](../../.context/standards/Testing-Guide.md) - Comprehensive testing standards (source of truth)
- [reference.md](reference.md) - Quick reference for test patterns
- [log-inspector skill](../log-inspector/SKILL.md) - Debug test failures via logs
