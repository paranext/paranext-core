---
name: test-runner
description: "[paranext-core ONLY] Run TypeScript and C# tests with structured output, filtering, and coverage. Use when running unit tests, integration tests, or checking test coverage for Platform.Bible."
allowed-tools: Bash, Read
---

# Test Runner Skill

> Verified against paranext-core origin/main `998ca09a087` — 2026-08-03.

Run and analyze tests for Platform.Bible (paranext-core) with structured output.

## Quick Reference

| Action | Command |
|--------|---------|
| All TypeScript tests | `npm test` |
| All C# tests | `dotnet test c-sharp-tests/` |
| Specific TS test | `npm run test:core -- --run path/to/test.test.ts` |
| C# by category | `dotnet test c-sharp-tests/ --filter "Category=Contract"` |
| Watch mode | `npm run test:core -- path/to/dir` (vitest watches by default) |
| E2E (CDP, running app) | `npx playwright test --config=e2e-tests/playwright-cdp.config.ts` |
| E2E (standalone) | `npm run test:e2e:smoke` (CI project) or `npm run test:e2e:isolated <subset>` |

## TypeScript Tests (Vitest)

### Run All Tests

```bash
npm test
```

### Run Specific Test File

```bash
# `npm test` is a compound script — extra args land on the workspaces half, NOT
# the core run. Use test:core directly for the root suite:
npm run test:core -- --run path/to/test.test.ts
```

### Run Tests Matching Pattern

```bash
# By file name pattern
npm run test:core -- -t "ComponentName"

# By file path pattern
npm run test:core -- src/renderer/components/
```

### Watch Mode

Automatically re-run tests on file changes:

```bash
npm run test:core -- path/to/dir   # vitest runs in watch mode by default; add --run for a single pass
```

### With Coverage

```bash
npm run test:core -- --run --coverage   # requires @vitest/coverage-v8 installed at the root first
```

### Verbose Output

```bash
npm run test:core -- --run --reporter=verbose
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
dotnet test c-sharp-tests/ --filter "Category=Contract"

# Run multiple categories
dotnet test c-sharp-tests/ --filter "Category=Contract|Category=Integration"
```

### Filter by Test Name

```bash
# By test method name
dotnet test c-sharp-tests/ --filter "FullyQualifiedName~CreateProject"

# By class name
dotnet test c-sharp-tests/ --filter "ClassName~ProjectDataProviderTests"
```

### Verbose Output

```bash
dotnet test c-sharp-tests/ --logger:"console;verbosity=detailed"
```

### With Coverage

```bash
dotnet test c-sharp-tests/ --collect:"XPlat Code Coverage"
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
npm run test:e2e:smoke                 # the CI smoke project
npm run test:e2e:isolated <subset>     # isolated Electron suite (per test or per worker). The
                                       # bare form and `all` do not run: the bare form lists the
                                       # subsets and exits 1, and `all` includes title-bar/ and
                                       # navigation-history/, which need an app this project's
                                       # global setup refuses to start alongside
# raw invocation, if needed: npx playwright test --config=e2e-tests/playwright.config.ts --project=smoke
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
npm run test:core -- --run --reporter=verbose

# C# - detailed output
dotnet test c-sharp-tests/ --logger:"console;verbosity=detailed" -v n
```

### Run Single Failing Test

```bash
# TypeScript
npm run test:core -- -t="exact test name"

# C#
dotnet test c-sharp-tests/ --filter "FullyQualifiedName=Namespace.Class.MethodName"
```

## TDD Workflow

### RED Phase (Test Writer)

1. Write failing tests:
   ```bash
   # Verify tests fail (expected)
   npm run test:core -- --run path/to/new.test.ts
   # Should see failures
   ```

### GREEN Phase (Implementer)

1. Implement minimum code
2. Run tests:
   ```bash
   npm run test:core -- --run path/to/new.test.ts
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

### Tooling status (verified 2026-08-03)

**Stryker is not set up in paranext-core** — no config files, no npm scripts, no
dotnet tool entry (`.config/dotnet-tools.json` contains only csharpier). The
prerequisite checks below will come up empty; stop there rather than improvising.

```bash
# TypeScript - check if configured (currently: no such file)
ls stryker.config.json

# C# - check if tool installed (currently: not installed)
dotnet tool list | grep -i stryker
```

If the team adopts mutation testing, this section should be rewritten around the
real configs (Stryker-JS via `npx --package @stryker-mutator/core stryker run`;
Stryker.NET against `c-sharp-tests/c-sharp-tests.csproj`).

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
npm run test:core -- path/to/dir

# Watch specific directory
npm run test:core -- path/to/dir extensions/src/{feature}/
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
npm run test:core -- --run --coverage   # requires @vitest/coverage-v8 installed at the root first
```

No coverage thresholds are configured in this repo (no `coverage` key in
vitest.config.ts, no CI gate) — read the numbers as information, not a gate.

### C# Coverage

```bash
dotnet test c-sharp-tests/ --collect:"XPlat Code Coverage"
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

Tests are **colocated**: `<name>.test.ts(x)` sits beside its source file — this is
the dominant convention across `src/`, `extensions/src/`, and `lib/`. A handful of
service-level suites use `__tests__/` subfolders (`src/main/services/__tests__/`,
`src/shared/models/__tests__/`, `src/shared/services/__tests__/`). Put new tests
next to the file under test.

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
