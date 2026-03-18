---
title: Testing Infrastructure Guide
description: Vitest, NUnit, TDD discipline, testing trophy model, AI agent test quality guardrails, mocking, and CI.
version: 1.1.1
status: active
created: 2026-03-04
last_updated: 2026-03-16
toc: true
---

# Testing Infrastructure Guide for Paranext-Core

This document provides a comprehensive overview of the testing infrastructure in the paranext-core codebase.

---

<!-- TOC:BEGIN -->
<!-- | Line | Section | -->
<!-- | --- | --- | -->
<!-- | 45 | Overview | -->
<!-- | 58 | TDD Discipline | -->
<!-- | 180 | Test Strategy: The Testing Trophy | -->
<!-- | 232 | AI Agent Test Quality Guardrails | -->
<!-- | 314 | Quality Gate G4.5 | -->
<!-- | 344 | General Style Guidelines | -->
<!-- | 372 | TypeScript/JavaScript Testing | -->
<!-- | 459 | C# Testing | -->
<!-- | 604 | Component Testing with Storybook | -->
<!-- | 691 | CI/CD Pipeline | -->
<!-- | 716 | Test Patterns and Examples | -->
<!-- | 910 | Invariant Testing | -->
<!-- | 998 | Mocking Strategies | -->
<!-- | 1065 | Test Categorization | -->
<!-- | 1112 | Traceability Requirements | -->
<!-- | 1159 | Testing Recommendations for New Features | -->
<!-- | 1661 | Quick Reference | -->
<!-- | 1753 | Future Improvements | -->
<!-- TOC:END -->

---

## Overview

Paranext-core uses a **layered testing approach** rather than comprehensive end-to-end testing:

| Layer                 | Framework                | Location            | Purpose                      |
| --------------------- | ------------------------ | ------------------- | ---------------------------- |
| TypeScript Unit Tests | Vitest                   | `src/**/*.test.ts`  | Services, utilities, hooks   |
| React Component Tests | Vitest + Testing Library | `lib/**/*.test.tsx` | UI components                |
| C# Unit Tests         | NUnit                    | `c-sharp-tests/`    | Data providers, services     |
| Component Stories     | Storybook + Playwright   | `**/*.stories.tsx`  | Visual testing, interactions |

---

## TDD Discipline

**Test-Driven Development is mandatory** for backend logic, not optional.

### The RED-GREEN-REFACTOR Cycle

| Phase        | Action                          | Commit Convention                 |
| ------------ | ------------------------------- | --------------------------------- |
| **RED**      | Write ONE failing test          | `[RED] feature: test description` |
| **GREEN**    | Write MINIMUM code to pass      | `[GREEN] feature: implementation` |
| **REFACTOR** | Clean up while tests stay green | `[REFACTOR] feature: cleanup`     |

### Verifying Tests Can Fail

Every test must be capable of failing when the implementation is broken. How you verify this depends on context:

| Context | Verification Method |
| ------- | ------------------- |
| **TDD (test-first)** | RED phase proves it - test fails before implementation exists |
| **Adding tests to existing code** | Revert Test required (see below) |
| **Bug fix verification** | Revert Test required - prove test catches the bug |

#### The Revert Test (for non-TDD contexts)

When adding tests to code that already exists:

```bash
# 1. Comment out or revert the implementation
git stash  # or comment out the code

# 2. Run the test - it MUST fail
npm test -- path/to/test.ts  # or: dotnet test --filter "TestName"

# 3. Verify it failed for the RIGHT reason (assertion, not compilation)

# 4. Restore implementation
git stash pop

# 5. Run test again - it MUST pass
```

**If a test passes without implementation, it proves nothing and must be rewritten.**

> **Note:** In Phase 3 TDD workflow, the Test Writer agent's RED phase evidence (`test-evidence-red.log`) serves as proof that all tests fail before implementation. The explicit Revert Test is unnecessary when practicing strict TDD.

### Continuous Testing Frequency

| Trigger               | Scope                   | Time Budget |
| --------------------- | ----------------------- | ----------- |
| After every file save | Current test            | < 5s        |
| Every 3-5 edits       | Feature tests           | < 30s       |
| Before any commit     | Full suite              | < 5 min     |
| Before push           | Full + lint + typecheck | < 10 min    |

### Outside-In TDD (Double Loop)

We use [Outside-In TDD](https://outsidein.dev/concepts/outside-in-tdd/) to constrain implementations:

```
┌─────────────────────────────────────────────────────────────┐
│  OUTER LOOP (Acceptance Test)                               │
│                                                             │
│  Write acceptance test from Phase 2 spec FIRST              │
│  This test defines WHAT the capability must do              │
│  It constrains the implementation scope                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  INNER LOOP (Unit Tests)                             │   │
│  │                                                      │   │
│  │  Write unit tests that drive HOW to implement        │   │
│  │  These guide the internal structure                  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Key Principle**: The **outer acceptance test** is the done signal. When it passes, the capability is complete.

**Outer Test Sources:**
- **When test-specifications/ exists**: Test specification JSON (spec-XXX)
- **When golden-masters/ exists**: Golden master comparison (gm-XXX)

#### Acceptance Test Characteristics

An acceptance test should:
1. Call the **public API** defined in data-contracts.md
2. Verify the **complete outcome** of a capability
3. Be marked with `[Category("Acceptance")]` and `[Property("CapabilityId", "CAP-XXX")]`
4. Include **side-effect verification** for methods with effects (create, update, delete)

```csharp
[Test]
[Category("Acceptance")]
[Property("CapabilityId", "CAP-001")]
[Property("ScenarioId", "TS-001")]
[Description("Acceptance test: {capability description}")]
public async Task {Capability}_AcceptanceTest()
{
    // This test passes when the capability is COMPLETE
    // It calls the public API and verifies the expected outcome
}
```

#### Side-Effect Verification

For methods with side effects, verify the **observable effect** — not just the return value:

| Method Type | Verification |
|-------------|--------------|
| Create | Verify created item is findable via `ScrTextCollection` or exists on disk |
| Update | Verify changed property is reflected when re-queried |
| Delete | Verify item is no longer findable |

**Anti-stub guidance**: A stub that returns `{ Success = true, Guid = NewGuid() }` passes return-value-only tests. Always include at least one test that verifies persistence.

#### TDD Variant Selection

| TDD Variant | When to Use |
|-------------|-------------|
| **Outside-In** (default) | Clear contracts, well-characterized behavior, ParatextData-heavy features |
| **Classic** | Exploratory implementation, complex algorithms, interface emerges from extraction |

---

## Test Strategy: The Testing Trophy

We adopt the **Testing Trophy** model instead of the traditional Test Pyramid.

### Why Not the Traditional Pyramid?

The Test Pyramid (many unit tests, fewer integration, few E2E) fails for AI-assisted development:

- AI generates many unit tests that assert implementation details
- These tests break on every refactor (opposite of fearless refactoring)
- Over-mocking hides integration issues, giving false confidence

### The Testing Trophy Model

```
        ▲ E2E (few, high-value critical journeys)
       ╱ ╲
      ╱   ╲
     ╱     ╲ Integration tests (MOST VALUABLE)
    ╱       ╲ Test at service boundaries
   ╱─────────╲
  ╱           ╲ Unit tests (complex algorithms, pure functions only)
 ╱─────────────╲
╱               ╲ Static analysis (TypeScript, linting)
```

| Test Type       | When to Use                        | Coverage Focus               |
| --------------- | ---------------------------------- | ---------------------------- |
| **Integration** | Service boundaries, API contracts  | Behavior, not implementation |
| **Unit**        | Complex algorithms, pure functions | Edge cases, calculations     |
| **E2E**         | Critical user journeys             | Smoke tests only             |

### Key Principle: Test Behavior, Not Implementation

> "If a refactor breaks the test but not the behavior, the test is wrong."

**Good test:** Calls public API, verifies output matches expected value
**Bad test:** Verifies internal method was called with specific arguments

### Prefer Real Dependencies

| Approach           | Use When                                             |
| ------------------ | ---------------------------------------------------- |
| Real ParatextData  | Always for features with LB-PD logic (it's the shared oracle) |
| In-memory database | Integration tests needing data persistence           |
| Real services      | When feasible and fast enough                        |
| Mocks              | Only for external APIs, network, slow dependencies   |

This enables **fearless refactoring**: change internals without updating tests.

---

## AI Agent Test Quality Guardrails

These guardrails prevent common anti-patterns when AI agents generate tests.

### What NOT to Test

| Category                | Examples                                 | Why Prohibited                 |
| ----------------------- | ---------------------------------------- | ------------------------------ |
| Trivial accessors       | Getter/setter, `getName()` returns name  | Zero defect-detection value    |
| Implementation details  | Internal variables, private method calls | Couples test to implementation |
| Framework behavior      | `Array.push()` adds items                | Testing someone else's code    |
| Constructor assignments | `new User(name).name === name`           | Tautological                   |

### Prohibited Test Patterns

#### 1. Implementation-Mirroring Tests

```typescript
// BAD: Mirrors implementation logic
test('calculateTotal sums items', () => {
  const items = [{ price: 10 }, { price: 20 }];
  const expected = items.reduce((sum, i) => sum + i.price, 0); // This IS the implementation
  expect(calculateTotal(items)).toBe(expected);
});

// GOOD: Tests behavior with known values
test('calculateTotal returns sum of item prices', () => {
  expect(calculateTotal([{ price: 10 }, { price: 20 }, { price: 5 }])).toBe(35);
});
```

#### 2. Over-Mocking

If you need >3 mocks for a test, reconsider:

- Is the unit too large? Split it.
- Is this actually an integration test? Use real dependencies.
- Are mocks hiding real issues?

#### 3. Non-Deterministic Tests

| Source        | Required Mitigation                      |
| ------------- | ---------------------------------------- |
| System time   | Use `vi.useFakeTimers()` or inject clock |
| Random values | Seed RNG or mock `Math.random()`         |
| Network calls | Mock all HTTP/WebSocket calls            |
| GUIDs         | Inject generator or use fixed values     |

### Mocking Decision Matrix

| Dependency       | Unit Tests    | Integration Tests |
| ---------------- | ------------- | ----------------- |
| ParatextData.dll | **Keep real** | **Keep real**     |
| Network services | Mock          | Mock or real      |
| File system      | Mock          | Temp files        |
| External APIs    | Mock          | Mock              |
| System time      | Mock          | Mock              |

**ParatextData Exception:** For features with LB-PD logic, NEVER mock ParatextData. It's the shared oracle between PT9 and PT10.

### Test Quality Curation Checklist

Before accepting AI-generated tests, verify:

- [ ] **Falsifiable:** Test fails when implementation is broken (Revert Test)
- [ ] **Independent:** Passes/fails independently of other tests
- [ ] **Behavior-focused:** Tests WHAT, not HOW
- [ ] **Meaningful assertions:** Checks business value, not artifacts
- [ ] **Deterministic:** Same result on every run
- [ ] **Traceable:** References specification (BHV-XXX, TS-XXX)

### Stop and Ask Triggers

AI agents must pause and ask humans when:

1. **Ambiguous behavior** - Specification is unclear or contradictory
2. **Domain-specific rules** - Bible versification, USFM semantics, Paratext conventions
3. **Architecture decisions** - Creating new utilities, modifying test infrastructure
4. **Multiple interpretations** - Edge case handling is undefined

---

## Quality Gate G4.5

Quality Gate G4.5 is a **blocking gate** between test writing and implementation that verifies test quality before any implementation begins.

### Purpose

Prevent low-quality AI-generated tests from proceeding to implementation. Tests that mirror implementation or fail to catch defects waste development time and provide false confidence.

### Verification Criteria

Before implementation can begin, verify all tests meet these criteria:

| Criterion | Verification |
|-----------|--------------|
| **Revert Test passes** | All tests fail when implementation is removed |
| **No implementation-mirroring** | Expected values are literals, not computed |
| **Mock count ≤ 3** | Or exception documented with justification |
| **Deterministic** | Time, random, network are all controlled |
| **No trivial tests** | No simple accessor or constructor tests |
| **Quality Report present** | Documented in test-writer-plan.md |

### Enforcement

- **Who verifies:** Human reviewer
- **When:** After test writing completes, before implementation starts
- **Blocking:** Implementation CANNOT begin until G4.5 passes
- **Evidence:** Quality checklist in `test-writer-plan.md`

---

## General Style Guidelines

### Making Tests Readable

- **DO** make it obvious what the SUT (Software Under Test) is.
  - If the test is not too complicated, the 3 sections of setup (arrange), SUT (act), and checks (assert) can be separated by new lines.
  - Another option is to comment above the line where the SUT is called with `// SUT`.

### Best Practices

- **DO** follow [Unit testing best practices](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices).
  - Although written for C#, the principles apply to any language.

### Naming Conventions

- **C# unit tests**: Use the [naming conventions](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices#naming-your-tests) from the best practices link above.
- **TypeScript unit tests**: Use Jest/Vitest `test` blocks for simple tests and `describe` and `it/test` blocks for tests that need more organizational structure. See [when to use each](https://webtips.dev/webtips/jest/describe-vs-test-vs-it) and [naming conventions](https://prowe214.medium.com/unit-tests-more-readable-describe-it-statements-in-protractor-jasmine-3810b07a6ac5).

### Test Verification

Every test must be capable of failing. See [Verifying Tests Can Fail](#verifying-tests-can-fail) for when to use TDD's RED phase vs. the explicit Revert Test.

### When to Add Tests

- **DO** add unit tests if it speeds up your development or makes a critical part of the code more robust.

---

## TypeScript/JavaScript Testing

### Framework: Vitest (v3.2.4)

Vitest is a Jest-compatible test runner optimized for Vite projects.

### Configuration Files

| File                                        | Purpose                  |
| ------------------------------------------- | ------------------------ |
| `vitest.config.ts`                          | Root configuration       |
| `lib/platform-bible-react/vitest.config.ts` | Component library config |

**Root Configuration:**

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig(async () => {
  const tsconfigPaths = (await import('vite-tsconfig-paths')).default;
  return {
    plugins: [tsconfigPaths()],
    test: {
      globals: true,
      environment: 'jsdom',
      include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    },
  };
});
```

### Key Dependencies

```json
{
  "vitest": "^3.2.4",
  "@testing-library/react": "^16.2.0",
  "@testing-library/jest-dom": "^6.6.3",
  "@testing-library/dom": "^10.4.0",
  "jsdom": "^26.0.0"
}
```

### Test File Locations

```
src/
├── shared/
│   ├── utils/papi-util.test.ts
│   └── services/shared-store.service.test.ts
├── node/
│   └── services/*.test.ts
├── extension-host/
│   └── services/extension-storage.service.test.ts
└── renderer/
    └── components/*.test.tsx

lib/
├── platform-bible-utils/
│   └── src/*.test.ts
└── platform-bible-react/
    └── src/components/**/*.test.ts

extensions/
└── src/platform-scripture/
    └── src/*.test.ts
```

### Running TypeScript Tests

```bash
# Run all tests (non-watch mode)
npm test

# Run core tests in watch mode
npm run test:core

# Run tests for specific workspace
npm run test --workspace=lib/platform-bible-react

# Run tests with coverage
npm run test:core -- --coverage
```

---

## C# Testing

### Framework: NUnit 4.0.1

### Project Configuration

**File:** `c-sharp-tests/c-sharp-tests.csproj`

```xml
<ItemGroup>
  <PackageReference Include="Microsoft.NET.Test.Sdk" Version="17.9.0" />
  <PackageReference Include="NUnit" Version="4.0.1" />
  <PackageReference Include="NUnit3TestAdapter" Version="4.5.0" />
  <PackageReference Include="coverlet.collector" Version="6.0.0" />
  <PackageReference Include="ParatextData" Version="9.5.0.18" />
</ItemGroup>
```

### Test Directory Structure

```
c-sharp-tests/
├── Checks/
│   ├── CheckRunResultTests.cs
│   ├── CheckRunnerCheckDetailsTests.cs
│   ├── InputRangeTests.cs
│   ├── InputRangesFilterTests.cs
│   └── UsfmLocationTests.cs
├── JsonUtils/
│   ├── CommentConverterTests.cs
│   └── InventoryOptionValueConverterTests.cs
├── Projects/
│   ├── FixtureSetup.cs              # Assembly-level setup
│   ├── LocalParatextProjectsTests.cs
│   ├── ParatextDataProviderTests.cs
│   ├── ParatextDataProviderCommentTests.cs
│   └── ParatextProjectDataProviderFactoryTests.cs
├── Services/
│   └── SettingsServiceTests.cs
├── NetworkObjects/
│   └── DummySettingsService.cs
├── PapiTestBase.cs                  # Base class for tests
├── DummyPapiClient.cs               # Mock PAPI client
├── DummyParatextProjectDataProvider.cs
├── DummyScrText.cs
└── DummyLocalParatextProjects.cs
```

### Running C# Tests

```bash
# Run all C# tests
dotnet test c-sharp-tests/c-sharp-tests.csproj

# Run with verbose output
dotnet test c-sharp-tests/c-sharp-tests.csproj --verbosity=detailed

# Run specific test class
dotnet test c-sharp-tests/c-sharp-tests.csproj --filter "FullyQualifiedName~ParatextDataProviderTests"

# Run with code coverage
dotnet test c-sharp-tests/c-sharp-tests.csproj /p:CollectCoverage=true
```

### Base Test Class

**File:** `c-sharp-tests/PapiTestBase.cs`

```csharp
[TestFixture]
[ExcludeFromCodeCoverage]
internal abstract class PapiTestBase
{
    private DummyPapiClient? _client;
    private DummyLocalParatextProjects? _projects;

    [SetUp]
    public virtual Task TestSetupAsync()
    {
        _projects = new DummyLocalParatextProjects();
        _client = new DummyPapiClient();
        return Task.CompletedTask;
    }

    [TearDown]
    public virtual void TestTearDown()
    {
        // Clean up ScrTextCollection — pass `true` to trigger full index cleanup.
        // Using `false` leaves stale entries in the internal project index, which
        // causes "Sequence contains more than one matching element" errors when
        // tests create many DummyScrText instances with unique HexIds.
        List<ScrText> projects = ScrTextCollection
            .ScrTexts(IncludeProjects.Everything)
            .ToList();
        foreach (ScrText project in projects)
            ScrTextCollection.Remove(project, true);

        _client?.Dispose();
    }

    protected DummyPapiClient Client => _client!;
    protected DummyLocalParatextProjects ParatextProjects => _projects!;

    // Helper methods for test data creation
    protected static JsonNode CreateVerseRefNode(int bookNum, int chapterNum, int verseNum);
    protected static JsonElement CreateRequestMessage(string function, params object[] parameters);
    protected static void VerifyUsfmSame(string usfm1, string usfm2, ScrText scrText, int bookNum);
}
```

### Assembly-Level Setup

**File:** `c-sharp-tests/Projects/FixtureSetup.cs`

```csharp
[SetUpFixture]
[ExcludeFromCodeCoverage]
public class FixtureSetup
{
    private static readonly string s_testFolder = Path.Combine(
        Path.GetTempPath(),
        "Platform.Bible.Tests"
    );

    public static string TestFolderPath => s_testFolder;

    [OneTimeSetUp]
    public void RunBeforeAnyTests()
    {
        if (!Directory.Exists(s_testFolder))
            Directory.CreateDirectory(s_testFolder);
        ParatextGlobals.Initialize(s_testFolder);
    }

    [OneTimeTearDown]
    public void RunAfterAnyTests()
    {
        if (Directory.Exists(s_testFolder))
            Directory.Delete(s_testFolder, true);
    }
}
```

---

## Component Testing with Storybook

### Configuration

**Location:** `lib/platform-bible-react/.storybook/`

### Features

- **70+ component stories** with visual documentation
- **Interactive play functions** for automated interaction testing
- **Accessibility testing** via axe-playwright
- **Vitest browser integration** with Playwright
- **Visual evidence capture** for proof of work artifacts

### Vitest + Storybook Integration

**File:** `lib/platform-bible-react/vitest.config.ts`

```typescript
projects: [
  {
    // Unit tests
    test: {
      name: 'unit',
      include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
      globals: true,
      environment: 'jsdom',
    },
  },
  {
    // Storybook browser tests
    plugins: [storybookTest()],
    test: {
      name: 'storybook',
      setupFiles: ['.storybook/vitest.setup.ts'],
      browser: {
        enabled: true,
        provider: 'playwright',
        instances: [{ browser: 'chromium', headless: true }],
      },
    },
  },
];
```

### Story with Play Function Example

```typescript
// book-chapter-control.stories.tsx
import { expect, fn, userEvent, within } from 'storybook/test';

export const Default: Story = {
  args: {
    scrRef: { book: 'GEN', chapterNum: 1, verseNum: 1 },
    handleSubmit: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Click the control to open popover
    await userEvent.click(canvas.getByRole('button'));

    // Verify popover opened
    await expect(canvas.getByRole('dialog')).toBeInTheDocument();

    // Select a book
    await userEvent.click(canvas.getByText('Exodus'));

    // Verify callback was called
    await expect(args.handleSubmit).toHaveBeenCalled();
  },
};
```

### Visual Evidence

Use Storybook and Playwright to capture visual evidence of features:

```bash
# Capture screenshots
npx playwright screenshot http://localhost:6006/iframe.html?id=component--story proofs/visual-evidence/component.png
```

---

## CI/CD Pipeline

### GitHub Actions Workflow

**File:** `.github/workflows/test.yml`

```yaml
jobs:
  test:
    steps:
      # C# Tests
      - name: dotnet unit tests
        run: dotnet test c-sharp-tests/c-sharp-tests.csproj

      # Install Playwright for Storybook tests
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps

      # TypeScript/JavaScript Tests
      - name: npm unit tests
        run: npm test
```

---

## Test Patterns and Examples

### TypeScript: Service Testing with Mocks

```typescript
// shared-store.service.test.ts
import { vi, describe, it, expect, beforeEach } from 'vitest';
import * as networkService from '@shared/services/network.service';

vi.mock('@shared/services/network.service', () => ({
  createNetworkEventEmitter: vi.fn(),
  getNetworkEvent: vi.fn(),
  request: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

describe('sharedStoreService', () => {
  const mockEmitter = {
    emit: vi.fn(),
    subscribe: vi.fn(),
    dispose: vi.fn(),
  };

  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(networkService.createNetworkEventEmitter).mockReturnValue(mockEmitter);
  });

  it('should initialize with network event emitter', async () => {
    await initializeSharedStore(networkService);
    expect(networkService.createNetworkEventEmitter).toHaveBeenCalledWith('shared-store:change');
  });
});
```

### TypeScript: React Hook Testing

```typescript
// book-chapter-control.navigation.test.ts
import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useQuickNavButtons } from './book-chapter-control.navigation';

vi.mock('./book-chapter-control.utils', () => ({
  fetchEndChapter: vi.fn(),
}));

describe('useQuickNavButtons', () => {
  const mockHandleSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Returns correct number of navigation buttons', () => {
    const { result } = renderHook(() =>
      useQuickNavButtons(
        { book: 'GEN', chapterNum: 1, verseNum: 1 },
        availableBooks,
        'ltr',
        mockHandleSubmit,
      ),
    );

    expect(result.current).toHaveLength(4);
  });

  test('Navigates to previous chapter', () => {
    const { result } = renderHook(() =>
      useQuickNavButtons(
        { book: 'GEN', chapterNum: 2, verseNum: 1 },
        availableBooks,
        'ltr',
        mockHandleSubmit,
      ),
    );

    act(() => {
      result.current[0].onClick(); // Previous chapter button
    });

    expect(mockHandleSubmit).toHaveBeenCalledWith({
      book: 'GEN',
      chapterNum: 1,
      verseNum: 1,
    });
  });
});
```

### C#: Parameterized Data Provider Tests

```csharp
// ParatextDataProviderTests.cs
internal class ParatextDataProviderTests : PapiTestBase
{
    private ScrText _scrText = null!;

    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();
        _scrText = CreateDummyProject();
        ParatextProjects.FakeAddProject(CreateProjectDetails(_scrText), _scrText);
    }

    [TearDown]
    public override void TestTearDown()
    {
        // Remove project-specific ScrText before base cleanup
        if (_scrText != null)
        {
            ScrTextCollection.Remove(_scrText, true);
            _scrText.Dispose();
            _scrText = null!;
        }
        base.TestTearDown();
    }

    [TestCase(1, 1, 0, @"\id GEN \ip intro \c 1 ")]
    [TestCase(1, 2, 1, @"\v 1 verse one ")]
    [TestCase(1, 2, 6, @"\v 6 verse six ")]
    [TestCase(1, 2, 10, "")]  // Missing verse
    [TestCase(1, 6, 1, "")]   // Missing chapter
    public void GetVerseUsfm_ValidResults(int bookNum, int chapterNum, int verseNum, string expected)
    {
        _scrText.PutText(1, 0, false, TestUsfmContent, null);

        var provider = new DummyParatextProjectDataProvider(
            "test", Client, CreateProjectDetails(_scrText), ParatextProjects
        );

        var verseRef = new VerseRef(bookNum, chapterNum, verseNum);
        var result = provider.GetVerseUsfm(verseRef);

        VerifyUsfmSame(result, expected, _scrText, bookNum);
    }
}
```

### C#: JSON Serialization Tests

```csharp
// CommentConverterTests.cs
[TestFixture]
public class CommentConverterTests
{
    private JsonSerializerOptions _options = null!;

    [SetUp]
    public void Setup()
    {
        _options = SerializationOptions.CreateSerializationOptions();
    }

    [Test]
    public void Deserialize_NullContents_ProducesEmptyContentsElement()
    {
        var json = "{\"contents\": null, \"user\": \"tester\", \"thread\": \"t1\"}";

        var result = JsonSerializer.Deserialize<Comment>(json, _options);

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.Contents, Is.Not.Null);
        Assert.That(result.Contents!.InnerXml, Is.EqualTo(string.Empty));
    }

    [Test]
    public void Deserialize_InvalidContents_ThrowsInvalidDataException()
    {
        var json = "{\"contents\": \"<p>unclosed\", \"user\": \"tester\"}";

        Assert.Throws<InvalidDataException>(
            () => JsonSerializer.Deserialize<Comment>(json, _options)
        );
    }

    [Test]
    public void Deserialize_ValidContents_PreservesInnerXml()
    {
        var json = "{\"contents\": \"<p>content</p>\", \"user\": \"tester\"}";

        var result = JsonSerializer.Deserialize<Comment>(json, _options);

        Assert.That(result!.Contents!.InnerXml, Is.EqualTo("<p>content</p>"));
    }
}
```

---

## Invariant Testing

Invariant testing verifies that **business rules and properties always hold** for specific test inputs. Invariants are documented in `business-rules.md` with INV-XXX IDs.

### When to Use Invariant Tests

| Scenario                | Example Invariant                      |
| ----------------------- | -------------------------------------- |
| Data transformations    | `Deserialize(Serialize(x)) == x`       |
| Business rules          | "Project GUID is always unique"        |
| Mathematical operations | "Result is always within valid range"  |
| Parsing/formatting      | "Round-trip preserves content"         |

### C# Invariant Tests

Use regular NUnit tests with the `[Category("Invariant")]` attribute and `[Property("InvariantId", "INV-XXX")]` for traceability.

```csharp
[TestFixture]
public class VerseRefInvariantTests
{
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-001")]
    [TestCase(1, 1, 1)]
    [TestCase(66, 150, 176)]
    [TestCase(40, 28, 20)]  // Matthew 28:20
    public void VerseRef_ComponentsAlwaysValid(int bookNum, int chapterNum, int verseNum)
    {
        var verseRef = new VerseRef(bookNum, chapterNum, verseNum);

        Assert.That(verseRef.BookNum, Is.InRange(1, 66));
        Assert.That(verseRef.ChapterNum, Is.GreaterThanOrEqualTo(0));
        Assert.That(verseRef.VerseNum, Is.GreaterThanOrEqualTo(0));
    }

    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-002")]
    [TestCase("Project1", "Project2")]
    [TestCase("Test", "AnotherTest")]
    [TestCase("A", "B")]
    public void ProjectGuid_IsAlwaysUnique(string name1, string name2)
    {
        var project1 = CreateProject(name1);
        var project2 = CreateProject(name2);

        Assert.That(project1.Guid, Is.Not.EqualTo(Guid.Empty));
        Assert.That(project2.Guid, Is.Not.EqualTo(Guid.Empty));
        Assert.That(project1.Guid, Is.Not.EqualTo(project2.Guid));
    }
}
```

### TypeScript Invariant Tests

Use JSDoc comments for traceability.

```typescript
describe('VerseRef Invariants', () => {
  /**
   * @invariant INV-001
   */
  test.each([
    [1, 1, 1],
    [66, 150, 176],
    [40, 28, 20],
  ])('verse reference components are always valid (%i, %i, %i)', (book, chapter, verse) => {
    const ref = createVerseRef(book, chapter, verse);
    expect(ref.bookNum).toBeGreaterThanOrEqual(1);
    expect(ref.bookNum).toBeLessThanOrEqual(66);
    expect(ref.chapterNum).toBeGreaterThanOrEqual(0);
    expect(ref.verseNum).toBeGreaterThanOrEqual(0);
  });
});
```

### Best Practices for Invariant Tests

1. **Choose representative inputs** - Include typical values, boundary values, and edge cases
2. **Document the invariant** - Reference INV-XXX from `business-rules.md`
3. **Test multiple scenarios** - Use `[TestCase]` or `test.each` for multiple inputs
4. **Keep tests focused** - One invariant per test method

**Note**: For more thorough invariant verification with random input generation, see [Property-Based Testing (Future)](#property-based-testing-future).

---

## Mocking Strategies

### TypeScript (Vitest)

| Method               | Use Case                  |
| -------------------- | ------------------------- |
| `vi.mock()`          | Module-level mocking      |
| `vi.fn()`            | Individual function mocks |
| `vi.mocked()`        | Type-safe mock access     |
| `vi.spyOn()`         | Spy on existing methods   |
| `vi.useFakeTimers()` | Control time in tests     |

**Example:**

```typescript
// Module mock
vi.mock('@shared/services/network.service', () => ({
  request: vi.fn(),
}));

// Function mock with implementation
const mockFn = vi.fn().mockImplementation((x) => x * 2);

// Spy on method
vi.spyOn(console, 'log');

// Fake timers
vi.useFakeTimers();
vi.advanceTimersByTime(1000);
vi.useRealTimers();
```

### C# (Custom Test Doubles)

The project uses **hand-crafted test doubles** instead of mocking frameworks like Moq:

| Test Double                        | Purpose                             |
| ---------------------------------- | ----------------------------------- |
| `DummyPapiClient`                  | Simulates JSON-RPC WebSocket client |
| `DummyParatextProjectDataProvider` | In-memory project data              |
| `DummyScrText`                     | Mock scripture text                 |
| `DummySettingsService`             | Mock settings service               |
| `DummyLocalParatextProjects`       | Mock project collection             |

**DummyPapiClient Example:**

```csharp
internal class DummyPapiClient : PapiClient
{
    private readonly Queue<(string eventType, object? eventParameters)> _sentEvents = [];

    public override Task<bool> ConnectAsync() => Task.FromResult(true);
    public override Task DisconnectAsync() => Task.CompletedTask;

    public override Task SendEventAsync(string eventType, object? eventParameters)
    {
        _sentEvents.Enqueue((eventType, eventParameters));
        return Task.CompletedTask;
    }

    public int SentEventCount => _sentEvents.Count;
    public (string eventType, object? eventParameters) NextSentEvent => _sentEvents.Dequeue();
}
```

---

## Test Categorization

Test categorization enables fast feedback during development by running subsets of tests based on speed requirements.

### Categories

| Category | Time Budget | When to Run | Scope |
|----------|-------------|-------------|-------|
| **Smoke** | < 10s | After each edit | Core functionality |
| **Critical** | < 60s | Every 3-5 edits | Feature tests |
| **Full** | < 5 min | Before commit | Complete suite |
| **Integration** | No limit | CI only | Cross-process tests |

### Tagging Tests

**C# (NUnit):**
```csharp
[Test]
[Category("Smoke")]
public void BasicOperation_Works() { }

[Test]
[Category("Critical")]
public void ImportantFeature_HandlesEdgeCase() { }
```

**TypeScript (Vitest):**
```typescript
describe.concurrent('Smoke tests', () => {
  test('basic operation works', () => { });
});

// Or use file naming: feature.smoke.test.ts, feature.critical.test.ts
```

### Running by Category

```bash
# C# - run only smoke tests
dotnet test --filter "Category=Smoke"

# TypeScript - run specific test file pattern
npm test -- --testNamePattern="Smoke"
```

---

## Traceability Requirements

Every test must trace back to a specification to ensure complete coverage and enable impact analysis.

### ID Types

| ID | Format | Source | Purpose |
|----|--------|--------|---------|
| BHV-XXX | Behavior ID | behavior-catalog.md | What the system does |
| TS-XXX | Test Scenario ID | test-scenarios.json | How to test a behavior |
| INV-XXX | Invariant ID | business-rules.md | Property that must hold (tested with regular tests) |

### Adding Traceability to Tests

**C# (NUnit):**
```csharp
[Test]
[Category("Contract")]
[Property("ScenarioId", "TS-001")]
[Property("BehaviorId", "BHV-001")]
public void CreateProject_WithValidSettings_ReturnsSuccess() { }
```

**TypeScript (Vitest):**
```typescript
/**
 * @scenario TS-001
 * @behavior BHV-001
 */
test('CreateProject with valid settings returns success', () => { });
```

### Validation Rules

- Every BHV-XXX must have at least one TS-XXX
- Every TS-XXX must have at least one test
- Every test must reference a valid scenario ID
- Orphan tests (except Infrastructure category) are flagged

These rules should be verified during code review.

---

<!-- Porting-specific sections (Golden Master Testing, Characterization Testing, -->
<!-- Proof of Work Artifacts, UI Test-First Pattern) are maintained separately.  -->

## Testing Recommendations for New Features

### 1. Write Tests First (TDD Approach)

When implementing new features:

1. Identify the expected behavior
2. Write failing tests that capture that behavior
3. Implement the feature to make tests pass

### 2. C# Backend Testing

For new data providers:

- Extend `PapiTestBase` for common infrastructure
- Use `DummyPapiClient` to test without real WebSocket connection
- Create parameterized tests with `[TestCase]` for edge cases
- Add JSON serialization tests for new Paratext types

```csharp
// Template for new data provider test
internal class NewFeatureDataProviderTests : PapiTestBase
{
    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();
        // Setup test data
    }

    [TestCase("input1", "expected1")]
    [TestCase("input2", "expected2")]
    public void NewFunction_ReturnsExpectedResult(string input, string expected)
    {
        // Arrange
        var provider = CreateProvider();

        // Act
        var result = provider.NewFunction(input);

        // Assert
        Assert.That(result, Is.EqualTo(expected));
    }
}
```

### 3. React Component Testing

For new UI components:

- Use Testing Library's `render` and `screen` utilities
- Test user interactions with `userEvent`
- Create Storybook stories for visual testing

```typescript
// Template for new component test
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

describe('NewComponent', () => {
  it('renders correctly', () => {
    render(<NewComponent />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    const onAction = vi.fn();
    render(<NewComponent onAction={onAction} />);

    await userEvent.click(screen.getByRole('button'));

    expect(onAction).toHaveBeenCalled();
  });
});
```

### 4. JSON Serialization Testing

For new Paratext types that need JSON conversion:

```csharp
[TestFixture]
public class NewTypeConverterTests
{
    private JsonSerializerOptions _options = null!;

    [SetUp]
    public void Setup()
    {
        _options = SerializationOptions.CreateSerializationOptions();
    }

    [Test]
    public void RoundTrip_PreservesData()
    {
        var original = new NewType { /* properties */ };

        var json = JsonSerializer.Serialize(original, _options);
        var result = JsonSerializer.Deserialize<NewType>(json, _options);

        Assert.That(result, Is.EqualTo(original));
    }
}
```

### 5. Testing Gaps to Address

| Gap                                | Opportunity                                      |
| ---------------------------------- | ------------------------------------------------ |
| No E2E tests                       | Add Playwright tests for critical user workflows |
| No cross-process integration tests | Test Electron + Extension Host + .NET together   |
| No contract tests                  | Add tests for JSON-RPC API contracts             |
| Limited visual regression          | Expand Storybook coverage                        |

### 6. Key Test Files to Reference

| Purpose                     | File                                                                                                            |
| --------------------------- | --------------------------------------------------------------------------------------------------------------- |
| C# test base class          | `c-sharp-tests/PapiTestBase.cs`                                                                                 |
| Mock PAPI client            | `c-sharp-tests/DummyPapiClient.cs`                                                                              |
| Data provider test example  | `c-sharp-tests/Projects/ParatextDataProviderTests.cs`                                                           |
| JSON converter test example | `c-sharp-tests/JsonUtils/CommentConverterTests.cs`                                                              |
| TS service test example     | `src/shared/services/shared-store.service.test.ts`                                                              |
| React hook test example     | `lib/platform-bible-react/src/components/advanced/book-chapter-control/book-chapter-control.navigation.test.ts` |
| Storybook story example     | `lib/platform-bible-react/src/stories/advanced/book-chapter-control.stories.tsx`                                |

---

## Quick Reference

### Run All Tests

```bash
# TypeScript
npm test

# C#
dotnet test c-sharp-tests/c-sharp-tests.csproj
```

### Run Specific Tests

```bash
# TypeScript - specific file
npm run test:core -- src/shared/services/shared-store.service.test.ts

# C# - specific class
dotnet test c-sharp-tests/c-sharp-tests.csproj --filter "FullyQualifiedName~ParatextDataProviderTests"
```

### Watch Mode

```bash
# TypeScript
npm run test:core

# C# (requires dotnet-watch)
dotnet watch test --project c-sharp-tests/c-sharp-tests.csproj
```

### Coverage Reports

```bash
# TypeScript
npm run test:core -- --coverage

# C#
dotnet test c-sharp-tests/c-sharp-tests.csproj /p:CollectCoverage=true
```

---

## Known Platform Constraints

These constraints affect test authoring and should be accounted for when writing E2E and integration tests.

### PAPI Async Timing

PAPI command responses are asynchronous and may not be immediately reflected in the UI. When writing E2E tests that verify data changes:

- **Always use Playwright `expect(...).toBeVisible({ timeout: ... })` or `expect.poll()`** rather than asserting immediately after an action
- **Default timeout of 5s is often insufficient** for PAPI round-trips. Use 10-15s for data operations, 5s for UI-only interactions
- **Command execution order is not guaranteed** across processes. If Test A sends a command and Test B reads the result, add explicit waits
- **Sequential E2E tests sharing state** (e.g., test 1 creates data, test 2 reads it) must use `test.describe.serial()` and include polling for the expected state

This was observed during the matched-pairs-inventory feature where PAPI commands completed but UI updates lagged behind, causing test flakiness.

### CDP Connection Exhaustion

When running multiple sequential Playwright tests against the same CDP endpoint:

- **Always call `browser.close()` in test teardown** — the CDP fixture handles this, but custom fixtures must include it
- **Without explicit close**, each test leaks a browser connection, eventually exhausting the CDP endpoint's connection limit
- **Symptom**: First N tests pass, then tests fail with connection/timeout errors
- See the `cdp.fixture.ts` implementation for the correct cleanup pattern

### Persisted Dock Layout

Platform.Bible persists the dock/tab layout across sessions. When running E2E tests:

- **Stale tabs from previous test runs** may be open when your test starts
- **Always include `beforeEach` cleanup** to close any pre-existing tabs for your feature
- **Pattern**: Loop to close matching tabs before each test, with a brief wait for UI settle
- **Without cleanup**, tests may interact with stale content or fail to open the expected view

This was observed during matched-pairs-inventory where inventory tabs persisted across test runs, causing navigation and assertion failures.

### ScrTextCollection Index Accumulation

When C# tests create many `DummyScrText` instances with unique HexIds:

- **Always use `ScrTextCollection.Remove(scrText, true)`** in test teardown — the second parameter triggers full internal index cleanup
- **With `false`**, stale index entries accumulate across tests. After ~50 tests, `ScrTextCollection.RefreshScrTextsInternal` throws `"Sequence contains more than one matching element"`
- **Symptom**: First N tests pass, then tests fail with LINQ duplicate-key errors — identical pattern to CDP connection exhaustion
- **The `PapiTestBase` class handles this correctly** (see the teardown pattern above), but any custom test fixtures must also use `true`

This was discovered during matched-pairs-inventory when 50+ capability tests each created DummyScrText instances with unique project HexIds.

---

## Future Improvements

These testing techniques are documented for future implementation. They can be added once the basic testing workflow is proven and baseline coverage is established.

### Property-Based Testing (Future)

Property-based testing verifies that **invariants hold for all possible inputs**, not just cases you imagined. This is high-leverage for AI-assisted development: humans define invariants, tools generate inputs.

**Status**: Future improvement. Currently, invariants are tested with regular unit tests using specific inputs (see [Invariant Testing](#invariant-testing)).

**When to Add**: After 3-5 features are successfully ported with regular invariant tests.

#### When to Use Property Tests

| Scenario                | Example Property                      |
| ----------------------- | ------------------------------------- |
| Data transformations    | `Deserialize(Serialize(x)) == x`      |
| Business rules          | "Project GUID is always unique"       |
| Mathematical operations | "Result is always within valid range" |
| Parsing/formatting      | "Round-trip preserves content"        |

#### C# with FsCheck

FsCheck would be configured in `c-sharp-tests/c-sharp-tests.csproj`.

```csharp
using FsCheck;
using FsCheck.NUnit;

[TestFixture]
public class VerseRefPropertyTests
{
    [Property(MaxTest = 500)]
    [Category("Property")]
    public Property VerseRef_ComponentsAlwaysValid()
    {
        return Prop.ForAll(
            Gen.Choose(1, 66),   // bookNum
            Gen.Choose(1, 150),  // chapterNum
            Gen.Choose(0, 176),  // verseNum
            (book, chapter, verse) =>
            {
                var verseRef = new VerseRef(book, chapter, verse);
                return verseRef.BookNum >= 1 && verseRef.BookNum <= 66
                    && verseRef.ChapterNum >= 0
                    && verseRef.VerseNum >= 0;
            });
    }
}
```

#### TypeScript with fast-check

```typescript
import fc from 'fast-check';

describe('VerseRef Properties', () => {
  test.prop([fc.nat({ max: 65 }), fc.nat({ max: 149 }), fc.nat({ max: 175 })])(
    'verse reference components are always non-negative',
    (book, chapter, verse) => {
      const ref = createVerseRef(book + 1, chapter + 1, verse);
      expect(ref.bookNum).toBeGreaterThanOrEqual(1);
      expect(ref.chapterNum).toBeGreaterThanOrEqual(0);
      expect(ref.verseNum).toBeGreaterThanOrEqual(0);
    },
  );
});
```

#### Iteration Requirements (when implemented)

| Invariant Criticality      | Minimum Iterations |
| -------------------------- | ------------------ |
| Critical (data integrity)  | 1000               |
| Important (business logic) | 500                |
| Standard                   | 100                |

---

### Mutation Testing (Future)

Mutation testing verifies **test quality** by checking if tests detect small code changes (mutations). A high mutation score means tests catch real defects.

**Status**: Future improvement. Can be added after baseline test coverage is established for ported features.

**When to Add**: After baseline test coverage is established for 2-3 ported features.

#### When to Use

- **Critical business logic** - Merge algorithms, conflict resolution, data persistence
- **Threshold:** ≥70% mutation score for critical paths

#### Tools

| Language | Tool | Config File |
|----------|------|-------------|
| TypeScript | Stryker | `stryker.config.json` |
| C# | Stryker.NET | `c-sharp-tests/stryker-config.json` |

#### Running Mutation Tests (when implemented)

```bash
# TypeScript mutation tests
npm run test:mutation

# C# mutation tests
npm run test:mutation:csharp
```

#### Score Thresholds

| Threshold | Score | Meaning |
|-----------|-------|---------|
| High | 80% | Excellent test quality |
| Low | 70% | Minimum acceptable |
| Break | 0% | Build failure threshold |

#### Interpreting Results

- **Survived mutants** - Code changes not caught by tests (bad)
- **Killed mutants** - Code changes caught by tests (good)
- **Timeout/Error** - Mutant caused infinite loop or crash

---

### E2E Testing

End-to-end testing verifies complete user workflows across all processes (Electron main, renderer, extension host, and .NET data provider).

#### Tools

- **Playwright** - Browser automation for Electron apps

#### Intended Use

- **Critical user journeys** - Project creation, editing, synchronization
- **Cross-process integration** - Verify all processes communicate correctly
- **Smoke tests** - Quick verification that the app starts and basic features work

#### UI-Only Interaction Rule

E2E tests that verify user flows MUST interact through visible UI only:
- Use `cdp.fixture` for all per-feature E2E tests (connects to running app via CDP)
- Click menu items, buttons, fill forms through the UI
- NEVER use `papi.fixture` or `app.fixture` for per-feature tests
- NEVER send JSON-RPC commands to set up UI state
- NEVER import `sendPapiCommand` from helpers in per-feature tests

Note: `app.fixture` is retained for CI smoke tests only (launches standalone Electron).

E2E tests are written by the UI phase command (via the `e2e-test-writer` agent) after all UI work packages complete.

#### Test Location

Create E2E tests in: `e2e-tests/tests/{feature}/`

```
e2e-tests/
├── fixtures/
│   ├── cdp.fixture.ts           # Connects to running app via CDP (DEFAULT for features)
│   ├── app.fixture.ts           # Launches fresh Electron (CI smoke tests only)
│   ├── papi.fixture.ts          # @deprecated — CI smoke tests only
│   └── helpers.ts               # waitForAppReady(), sendPapiCommand()
├── playwright-cdp.config.ts     # Config for CDP mode (no setup/teardown)
├── playwright.config.ts         # Config for standalone mode (with setup/teardown)
└── tests/
    └── {feature}/
        └── {feature}.spec.ts
```

#### Fixture Selection

| Fixture | Mode | When to Use | Provides |
|---------|------|-------------|----------|
| `cdp.fixture` | Connects to running app (CDP 9223) | **Default for all per-feature E2E tests** | `mainPage` |
| `app.fixture` | Launches fresh Electron | CI smoke tests, standalone testing | `electronApp`, `mainPage` |
| `papi.fixture` | Extends app.fixture + WebSocket | **Deprecated** — CI smoke tests only | `papiClient` + app.fixture |

#### E2E Test Templates

**UI Interaction Tests (cdp.fixture — default for per-feature tests):**

```typescript
import { test, expect } from '../../fixtures/cdp.fixture';
import { waitForAppReady } from '../../fixtures/helpers';

test.describe('{Feature} E2E Tests', () => {
  test('should {action} - happy path', async ({ mainPage }) => {
    await waitForAppReady(mainPage);
    // Navigate via visible UI — click menu, then click feature entry
    const menuTrigger = mainPage.getByRole('menuitem', { name: /Menu Name/i });
    await menuTrigger.click();
    const featureItem = mainPage.getByRole('menuitem', { name: /Feature Name/i });
    await featureItem.click();
    // Verify
    await expect(mainPage.locator('.dock-tab', { hasText: /Feature Name/i })).toBeVisible({ timeout: 15_000 });
  });
});
```

**Render Smoke Test (cdp.fixture):**

```typescript
import { test, expect } from '../../fixtures/cdp.fixture';
import { waitForAppReady } from '../../fixtures/helpers';

test.describe('{Feature} Render Smoke Tests', () => {
  test('component renders without errors', async ({ mainPage }) => {
    await waitForAppReady(mainPage);
    const consoleErrors: string[] = [];
    mainPage.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    const menuTrigger = mainPage.getByRole('menuitem', { name: /Menu Name/i });
    await menuTrigger.click();
    const featureItem = mainPage.getByRole('menuitem', { name: /Feature Name/i });
    await featureItem.click();
    await expect(mainPage.locator('.dock-tab', { hasText: /Feature Name/i })).toBeVisible({ timeout: 15_000 });

    // Standard noise filter — keep in sync with e2e-tests/tests/_example/
    const criticalErrors = consoleErrors.filter(
      (e) =>
        !e.includes('DevTools') &&
        !e.includes('favicon') &&
        !e.includes('source map') &&
        !e.includes('net::ERR_'),
    );
    expect(criticalErrors).toHaveLength(0);
  });
});
```

#### E2E Test Best Practices

| DO | DON'T |
|----|-------|
| Click buttons, fill forms, navigate via UI | Call PAPI commands directly to change state |
| Use Playwright locators for real DOM elements | Mock PAPI responses (that's for unit tests) |
| Verify user-visible state changes | Skip UI interactions by manipulating state |
| Use `data-testid` for stable selectors | Use brittle selectors (class names, tag names) |
| Handle timing with explicit waits | Use `sleep()` without assertions |

#### Scenario-Driven Test Selection

Derive E2E tests from Phase 2 test scenarios:

1. Load `characterization/test-scenarios.json`
2. Filter by `logicLayer`: Keep `"UI"` or `"Mixed"` (pure `"ParatextData"` scenarios are covered by unit tests)
3. Filter by `priority`: Keep `"critical"` or `"high"` (E2E tests are expensive)
4. Write one E2E test per selected scenario

#### Running E2E Tests

**IMPORTANT**: Always use the `--config` flag when running Playwright from the repo root. Without `--config`, Playwright uses defaults — the `--project` flag won't work, no dev server is started, and bare `npx playwright test` (without a test path) will discover vitest `.test.ts` files and fail.

```bash
# CDP mode (default — app already running via ./refresh.sh)
npx playwright test e2e-tests/tests/{feature}/ --config=e2e-tests/playwright-cdp.config.ts --reporter=list

# CDP mode with HTML report
npx playwright test e2e-tests/tests/{feature}/ --config=e2e-tests/playwright-cdp.config.ts --reporter=html
npx playwright show-report e2e-tests/playwright-report

# CDP mode debug
npx playwright test e2e-tests/tests/{feature}/ --config=e2e-tests/playwright-cdp.config.ts --reporter=list --debug

# Standalone mode (CI — launches own Electron, port 8876 must be free)
npx playwright test e2e-tests/tests/{feature}/ --config=e2e-tests/playwright.config.ts --project=development --reporter=list
```

**Note**: Playwright and all required browser binaries are pre-installed in the development environment. Do NOT assume Playwright cannot run — always attempt execution before marking tests as skipped.

#### Failure Analysis

| Failure Type | Diagnosis | Fix |
|--------------|-----------|-----|
| Selector not found | Check actual DOM structure | Update selector, add `data-testid` |
| Command not registered | Check `main.ts` registration | Add command registration |
| Data shape mismatch | Compare response to contracts | Fix types |
| Timeout | Operation takes too long | Increase timeout or add waits |
| Fixture issue | Wrong fixture for test type | Switch to correct fixture |

## Version Log

| Version | Date       | Change                                                |
| ------- | ---------- | ----------------------------------------------------- |
| 1.0.0   | 2026-03-04 | Initial version                                       |
| 1.1.0   | 2026-03-04 | Strip human-readable TOC, keep machine-readable only  |
| 1.1.1   | 2026-03-16 | Decouple golden master strategy from classification level; reference logic layers instead |
