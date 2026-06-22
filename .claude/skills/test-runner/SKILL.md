---
name: test-runner
description: "[paranext-core ONLY] Run TypeScript and C# tests with structured output, filtering, and coverage. Use when running unit tests, integration tests, or checking test coverage for Platform.Bible."
allowed-tools: Bash, Read
---

# Test Runner Skill

Run and analyze tests for Platform.Bible (paranext-core) with structured output.

## Quick Reference

| Action | Command |
|--------|---------|
| All TypeScript tests | `npm test` |
| All C# tests | `dotnet test c-sharp-tests/` |
| Specific TS test | `npm test -- path/to/test.ts` |
| C# by category | `dotnet test --filter "Category=Contract"` |
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

### Verbose Output

```bash
npm test -- --reporter=verbose
```

## C# Tests (NUnit)

### Run All Tests

```bash
dotnet test c-sharp-tests/
```

### Filter by Category

See `categories.md` for the full set. The most common are:

| Category | Purpose |
|----------|---------|
| `Contract` | API/behavior contract tests (most of the suite) |
| `Integration` | Integration tests |
| `Acceptance` | Feature-level acceptance tests |
| `GoldenMaster` | Golden-master comparison tests |

```bash
# Run only contract tests
dotnet test --filter "Category=Contract"

# Run multiple categories
dotnet test --filter "Category=Contract|Category=Integration"
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
dotnet test --collect:"XPlat Code Coverage"
```

## Playwright E2E Tests

### Two Execution Modes

| Mode | Config | When to Use |
|------|--------|-------------|
| **CDP (connect to running app)** | `e2e-tests/playwright-cdp.config.ts` | During development, app already running |
| **Standalone (launches own Electron)** | `e2e-tests/playwright.config.ts` | CI, standalone testing |

### CDP Mode (Recommended during development)

```bash
# Run all E2E tests against running app
npx playwright test --config=e2e-tests/playwright-cdp.config.ts

# Run specific test file
npx playwright test e2e-tests/tests/{feature}/{feature}.spec.ts --config=e2e-tests/playwright-cdp.config.ts
```

Prerequisite: App running with `--remote-debugging-port=9223` (the `app-runner` skill enables this).

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

The C# tests are a single project: `c-sharp-tests/c-sharp-tests.csproj` (there is no
per-feature `.csproj`).

```bash
# Run from the c-sharp-tests directory (it has one test project)
cd c-sharp-tests && dotnet stryker

# Run with HTML report
cd c-sharp-tests && dotnet stryker --reporters "['html', 'progress']"
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
2. **Check output after each edit** - don't wait to batch up changes
3. **If test fails unexpectedly** - stop, investigate, fix before continuing

## Coverage Thresholds

For features with backend logic, verify coverage meets thresholds.

### TypeScript Coverage

```bash
npm test -- --coverage
```

Check output for:
- Line coverage: >= 90%
- Branch coverage: >= 80%

### C# Coverage

```bash
dotnet test --collect:"XPlat Code Coverage"
```

### Coverage Report Locations

| Platform | Report Location |
|----------|-----------------|
| TypeScript | `coverage/` directory (HTML) |
| C# | `coverage.*` files written under `c-sharp-tests/` |

## Pre-Commit Validation

```bash
npm run typecheck && npm run lint && npm test && dotnet test c-sharp-tests/
```

## Test File Locations

### TypeScript Tests

```
paranext-core/
├── src/
│   ├── main/__tests__/           # Main process tests
│   ├── renderer/__tests__/       # Renderer tests
│   ├── shared/__tests__/         # Shared code tests
│   └── extension-host/__tests__/ # Extension host tests
├── extensions/
│   └── src/{ext}/
│       └── __tests__/            # Extension tests
└── lib/
    └── {package}/
        └── __tests__/            # Library tests
```

### C# Tests

Feature tests live in feature-named subdirectories (no `Tests` suffix on the dir
name). Shared helpers and test doubles live at the `c-sharp-tests/` root — there is
no `TestHelpers/` directory.

```
paranext-core/
└── c-sharp-tests/
    ├── PapiTestBase.cs      # shared abstract test base (at root)
    ├── FixtureSetup.cs      # shared fixture setup (at root)
    ├── Dummy*.cs            # test doubles, e.g. DummyScrText.cs (at root)
    ├── Checks/
    ├── Projects/
    ├── Services/
    ├── ParatextUtils/
    ├── JsonUtils/
    ├── NetworkObjects/
    ├── ManageBooks/
    └── Checklists/
```
