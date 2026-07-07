---
title: Testing Guide
description: Vitest, NUnit, TDD, testing trophy model, AI agent test quality guardrails, mocking, and CI.
---

# Testing Guide for paranext-core

An overview of the testing infrastructure in paranext-core and guidelines for writing tests that catch real defects.

---

## Overview

paranext-core uses a **layered testing approach** rather than comprehensive end-to-end testing:

| Layer                 | Framework                | Location            | Purpose                      |
| --------------------- | ------------------------ | ------------------- | ---------------------------- |
| TypeScript Unit Tests | Vitest                   | `src/**/*.test.ts`  | Services, utilities, hooks   |
| React Component Tests | Vitest + Testing Library | `lib/**/*.test.tsx` | UI components                |
| C# Unit Tests         | NUnit                    | `c-sharp-tests/`    | Data providers, services     |
| Component Stories     | Storybook + Playwright   | `**/*.stories.tsx`  | Visual testing, interactions |

---

## TDD Discipline

Test-Driven Development is the recommended default for non-trivial backend logic. It's not mandatory everywhere, but when you write tests first, you end up with better-specified code, tests that can actually fail, and fewer regressions.

### The RED-GREEN-REFACTOR Cycle

| Phase        | Action                          |
| ------------ | ------------------------------- |
| **RED**      | Write ONE failing test          |
| **GREEN**    | Write MINIMUM code to pass      |
| **REFACTOR** | Clean up while tests stay green |

### Verifying Tests Can Fail

Every test must be capable of failing when the implementation breaks. How you verify depends on context:

| Context                         | Verification Method                                                |
| ------------------------------- | ------------------------------------------------------------------ |
| TDD (test-first)                | The RED phase proves it — test fails before implementation exists. |
| Adding tests to existing code   | Revert Test required (see below).                                  |
| Bug fix                         | Revert Test required — prove the test catches the bug.             |

#### The Revert Test (for non-TDD contexts)

```bash
# 1. Comment out or revert the implementation
git stash  # or comment out the code

# 2. Run the test — it MUST fail
npm test -- path/to/test.ts  # or: dotnet test --filter "TestName"

# 3. Verify it failed for the RIGHT reason (assertion, not compilation error)

# 4. Restore implementation
git stash pop

# 5. Run test again — it MUST pass
```

**If a test passes without the implementation, it proves nothing and must be rewritten.**

### Continuous Testing Frequency

| Trigger               | Scope                   | Time Budget |
| --------------------- | ----------------------- | ----------- |
| After every file save | Current test            | < 5s        |
| Every 3–5 edits       | Feature tests           | < 30s       |
| Before any commit     | Full suite              | < 5 min     |
| Before push           | Full + lint + typecheck | < 10 min    |

### Outside-In TDD (Double Loop)

For non-trivial features, [Outside-In TDD](https://outsidein.dev/concepts/outside-in-tdd/) constrains the implementation by starting from the behavior the feature must deliver:

```
┌─────────────────────────────────────────────────────────────┐
│  OUTER LOOP (Acceptance Test)                               │
│                                                             │
│  Write the acceptance test FIRST                           │
│  This test defines WHAT the feature must do                │
│  It constrains the implementation scope                     │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  INNER LOOP (Unit Tests)                             │   │
│  │                                                      │   │
│  │  Write unit tests that drive HOW to implement        │   │
│  │  These guide the internal structure                  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Key Principle**: The **outer acceptance test** is the done signal. When it passes, the feature is complete. The outer test source is your acceptance/E2E test for the feature.

#### Acceptance Test Characteristics

An acceptance test should:

1. Call the **public API** of the feature.
2. Verify the **complete outcome**, not an intermediate step.
3. Be marked so it can be selected and run as a group (e.g. `[Test]` + `[Category("Acceptance")]` in NUnit).
4. Include **side-effect verification** for methods with effects (create, update, delete).

```csharp
[Test]
[Category("Acceptance")]
[Description("Acceptance test: create project with valid settings succeeds and persists")]
public async Task CreateProject_WithValidSettings_AcceptanceTest()
{
    // This test passes when the feature is COMPLETE.
    // It calls the public API and verifies the expected outcome.
}
```

#### Side-Effect Verification

For methods with side effects, verify the **observable effect** — not just the return value:

| Method Type | Verification                                                       |
| ----------- | ------------------------------------------------------------------ |
| Create      | Verify created item is findable via `ScrTextCollection` or on disk |
| Update      | Verify changed property is reflected when re-queried               |
| Delete      | Verify item is no longer findable                                  |

**Anti-stub guidance**: A stub that returns `{ Success = true, Guid = NewGuid() }` passes return-value-only tests. Always include at least one test that verifies persistence.

#### TDD Variant Selection (Outside-In vs Classic)

| TDD Variant              | When to Use                                                       |
| ------------------------ | ---------------------------------------------------------------- |
| **Outside-In** (default) | Clear contracts, well-understood behavior, ParatextData-heavy features |
| **Classic**              | Exploratory implementation, complex algorithms, interface emerges from extraction |

---

## Test Strategy: The Testing Trophy

We adopt the **Testing Trophy** model rather than the traditional Test Pyramid.

### Why Not the Pyramid?

The Test Pyramid (many unit tests, fewer integration, few E2E) tends to produce:

- Unit tests that assert implementation details
- Tests that break on every refactor (opposite of fearless refactoring)
- Over-mocking that hides real integration issues, giving false confidence

This is especially problematic when AI is generating tests, because AI readily produces tests that mirror implementation.

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

**Good test:** Calls public API, verifies output matches the expected value.
**Bad test:** Verifies an internal method was called with specific arguments.

### Prefer Real Dependencies

| Approach           | Use When                                                      |
| ------------------ | ------------------------------------------------------------ |
| Real ParatextData  | Always for features with ParatextData logic — it's the oracle |
| In-memory database | Integration tests needing data persistence                   |
| Real services      | Whenever feasible and fast enough                            |
| Mocks              | Only for external APIs, network, slow dependencies           |

Real dependencies enable **fearless refactoring** — change internals without updating tests.

---

## AI Agent Test Quality Guardrails

Apply these when AI agents (or humans moving fast) generate tests. They target the most common anti-patterns.

### What NOT to Test

| Category                | Examples                                  | Why Prohibited                 |
| ----------------------- | ----------------------------------------- | ------------------------------ |
| Trivial accessors       | Getter/setter, `getName()` returns name   | Zero defect-detection value    |
| Implementation details  | Internal variables, private method calls  | Couples test to implementation |
| Framework behavior      | `Array.push()` adds items                 | Testing someone else's code    |
| Constructor assignments | `new User(name).name === name`            | Tautological                   |

### Prohibited Test Patterns

#### 1. Implementation-Mirroring Tests

```typescript
// BAD: expected value computed the same way as the implementation
test('calculateTotal sums items', () => {
  const items = [{ price: 10 }, { price: 20 }];
  const expected = items.reduce((sum, i) => sum + i.price, 0); // this IS the implementation
  expect(calculateTotal(items)).toBe(expected);
});

// GOOD: expected value is a literal
test('calculateTotal returns sum of item prices', () => {
  expect(calculateTotal([{ price: 10 }, { price: 20 }, { price: 5 }])).toBe(35);
});
```

#### 2. Over-Mocking

If you need more than 3 mocks for a test, reconsider:

- Is the unit too large? Split it.
- Is this actually an integration test? Use real dependencies.
- Are mocks hiding real issues?

#### 3. Non-Deterministic Tests

| Source        | Required Mitigation                      |
| ------------- | ---------------------------------------- |
| System time   | Use `vi.useFakeTimers()` or inject clock |
| Random values | Seed RNG or mock `Math.random()`         |
| Network calls | Mock all HTTP/WebSocket calls            |
| GUIDs         | Inject a generator or use fixed values   |

### Mocking Decision Matrix

| Dependency       | Unit Tests    | Integration Tests |
| ---------------- | ------------- | ----------------- |
| ParatextData.dll | **Keep real** | **Keep real**     |
| Network services | Mock          | Mock or real      |
| File system      | Mock          | Temp files        |
| External APIs    | Mock          | Mock              |
| System time      | Mock          | Mock              |

**ParatextData Exception:** For features with ParatextData logic, NEVER mock ParatextData — it is the shared oracle that defines correct behavior. Run tests against the real `ScrTextCollection`.

### Test Quality Checklist

Before accepting AI-generated tests, verify:

- [ ] **Falsifiable** — Test fails when the implementation is broken (Revert Test).
- [ ] **Independent** — Passes/fails independently of other tests.
- [ ] **Behavior-focused** — Tests WHAT, not HOW.
- [ ] **Meaningful assertions** — Checks business value, not artifacts.
- [ ] **Deterministic** — Same result on every run.

### Stop and Ask Triggers

AI agents should pause and ask when:

1. Specification is ambiguous or contradictory.
2. Domain-specific rules are involved (Bible versification, USFM semantics, Paratext conventions).
3. Architecture decisions are needed (creating new utilities, modifying test infrastructure).
4. Multiple interpretations of an edge case exist.

---

## General Style Guidelines

### Making Tests Readable

- Make it obvious what the SUT (Software Under Test) is.
  - For simple tests, separate the Arrange / Act / Assert sections with blank lines.
  - Alternatively, comment `// SUT` above the line where the SUT is invoked.

### Best Practices

- Follow [Unit testing best practices](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices). Though written for C#, the principles apply to any language.

### Naming

- **C#**: Use the [naming conventions](https://learn.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices#naming-your-tests) from the link above.
- **TypeScript**: Use Vitest `test` blocks for simple tests and `describe`/`it` for structured groups. See [describe vs it vs test](https://webtips.dev/webtips/jest/describe-vs-test-vs-it).

### When to Add Tests

Add tests when they speed up development or make a critical part of the code more robust. You do not need 100% coverage — you need tests that would actually catch regressions.

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
      // Warms the lazy one-time ICU init behind Intl.* so it never lands inside a test's
      // timeout window on a slow CI worker. See vitest.setup.ts for the rationale.
      setupFiles: ['./vitest.setup.ts'],
      include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    },
  };
});
```

> The workspace configs (`extensions/vitest.config.ts`, `lib/platform-bible-utils/vite.config.ts`,
> `lib/platform-bible-react/vitest.config.ts`) reference this same repo-root `vitest.setup.ts` via a
> relative `setupFiles` path, so every vitest worker warms Intl once before any timed test.

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

# Run tests for a specific workspace
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

# Verbose output
dotnet test c-sharp-tests/c-sharp-tests.csproj --verbosity=detailed

# Specific test class
dotnet test c-sharp-tests/c-sharp-tests.csproj --filter "FullyQualifiedName~ParatextDataProviderTests"

# With coverage
dotnet test c-sharp-tests/c-sharp-tests.csproj --collect:"XPlat Code Coverage"
```

### Base Test Class

`c-sharp-tests/PapiTestBase.cs` provides a shared base class for data-provider tests. It creates a `DummyPapiClient` and `DummyLocalParatextProjects`, and its `TestTearDown` cleans up `ScrTextCollection` with full index removal — see [ScrTextCollection Index Accumulation](#scrtextcollection-index-accumulation) below for why that matters.

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

### Test Doubles

paranext-core uses hand-crafted test doubles rather than mocking frameworks like Moq:

| Test Double                        | Purpose                             |
| ---------------------------------- | ----------------------------------- |
| `DummyPapiClient`                  | Simulates JSON-RPC WebSocket client |
| `DummyParatextProjectDataProvider` | In-memory project data              |
| `DummyScrText`                     | Mock scripture text                 |
| `DummySettingsService`             | Mock settings service               |
| `DummyLocalParatextProjects`       | Mock project collection             |

See `c-sharp-tests/DummyPapiClient.cs` and peers for examples.

---

## Component Testing with Storybook

### Location

`lib/platform-bible-react/.storybook/`

### Capabilities

- **70+ component stories** with visual documentation.
- **Interactive play functions** for automated interaction testing.
- **Accessibility testing** via axe-playwright.
- **Vitest browser integration** with Playwright.

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

    await userEvent.click(canvas.getByRole('button'));
    await expect(canvas.getByRole('dialog')).toBeInTheDocument();

    await userEvent.click(canvas.getByText('Exodus'));
    await expect(args.handleSubmit).toHaveBeenCalled();
  },
};
```

### Stateful Harnesses for Callback-Heavy Components

When a component's primary surface is callbacks — mutations, pickers, dialogs — `args`-only mock controls cannot exercise its real behavior. A reviewer opening such a story should be able to click through the full happy path and observe real state transitions, not just see a static screenshot.

For these components, write a `StatefulHarness` render component that owns in-memory state and wires every callback to a state-mutating handler. Give each scenario its own story that renders the harness:

```typescript
function StatefulHarness(props: Partial<ManageBooksDialogProps>) {
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  // ...holds the in-memory state the component would normally receive from PAPI
  return (
    <ManageBooksDialog
      {...props}
      selectedBooks={selectedBooks}
      onSelectBooks={setSelectedBooks} // every callback mutates harness state
    />
  );
}

export const Default: Story = { render: () => <StatefulHarness /> };
export const PreSelected: Story = {
  render: () => <StatefulHarness selectedBooks={['GEN', 'EXO']} />,
};
```

**Avoid:**

- Inline mock controls in `args:` for callback-heavy components — reviewers cannot observe state transitions.
- Render-only stories with no callback wiring — they give a misleading static screenshot of a component that never reacts.

Rationale: in-memory state plus callback-to-state wiring lets the story demonstrate the component's actual behavior. See `extensions/src/platform-scripture/src/manage-books-dialog/manage-books-dialog.stories.tsx` (`StatefulHarness`) and `extensions/src/platform-scripture/src/greek-esther-template-picker.stories.tsx` (`StatefulPickerHarness`).

### Avoid Animation-Sensitive Assertions in Story Interaction Tests

Story interaction tests can fire their next assertion before a CSS animation has finished playing. When that happens, assertions that read the **visual end-state of an animation** (`opacity: 1`, `toBeVisible()`, etc.) intermittently fail — even though the component is logically open and ready for interaction. Prefer semantic attributes that flip synchronously with the state change instead.

**Don't** assert on animation-driven properties:

```typescript
// Fragile — opacity is animated from 0 → 1 by tw:fade-in-0; the assertion can fire before
// the animation is done and `getComputedStyle().opacity` reaches 1.
const popoverContent = await screen.findByRole('dialog');
await waitFor(() => expect(popoverContent).toHaveStyle('opacity: 1'));
await expect(popoverContent).toBeVisible(); // also opacity-driven
```

**Do** assert on a semantic attribute that flips synchronously, or on the inner content the test actually needs:

```typescript
// Robust — Radix flips data-state synchronously when open changes
const popoverContent = await screen.findByRole('dialog');
await waitFor(() => expect(popoverContent).toHaveAttribute('data-state', 'open'));

// Even better — wait for the inner content the test will use next
await within(popoverContent).findByRole('combobox');
```

For non-Radix animated components, the same principle applies: assert on the **content the animation reveals** (`findByRole`, `findByText`) rather than on the animation's terminal style. Anywhere `tailwindcss-animate` utilities, Radix's `tw:data-[state=open]:animate-in`, or a custom CSS keyframe would otherwise gate visibility, switching to a content-presence assertion sidesteps the timing race.

### Chromatic Visual Review

The `storybook-review` GitHub label triggers a Chromatic CI workflow that publishes the Storybook build for visual regression review by UX.

- Triggers on PRs where the `storybook-review` label is applied.
- By default snapshots `extensions/src/**/*.stories.tsx`; `.chromatic-story-filter` can override.
- Uses TurboSnap (`onlyChanged`) to minimize snapshot count on subsequent pushes.
- **Cost awareness**: Chromatic charges per snapshot — only apply the label when visual review is genuinely needed.

---

## CI/CD Pipeline

`.github/workflows/test.yml` runs both test suites on every PR:

```yaml
jobs:
  test:
    steps:
      - name: dotnet unit tests
        run: dotnet test c-sharp-tests/c-sharp-tests.csproj

      - name: Install Playwright Browsers
        run: npx playwright install --with-deps

      - name: npm unit tests
        run: npm test
```

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

### C#

Use the hand-crafted test doubles listed under [C# Testing](#c-testing). Example `DummyPapiClient` implementation:

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

## Test Patterns and Examples

### TypeScript: Service Testing with Mocks

```typescript
import { vi, describe, it, expect, beforeEach } from 'vitest';
import * as networkService from '@shared/services/network.service';

vi.mock('@shared/services/network.service', () => ({
  createNetworkEventEmitter: vi.fn(),
  getNetworkEvent: vi.fn(),
  request: vi.fn(),
}));

describe('sharedStoreService', () => {
  const mockEmitter = { emit: vi.fn(), subscribe: vi.fn(), dispose: vi.fn() };

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

  test('returns correct number of navigation buttons', () => {
    const { result } = renderHook(() =>
      useQuickNavButtons({ book: 'GEN', chapterNum: 1, verseNum: 1 }, availableBooks, 'ltr', mockHandleSubmit),
    );
    expect(result.current).toHaveLength(4);
  });
});
```

### C#: Parameterized Tests

```csharp
[TestCase(1, 1, 0, @"\id GEN \ip intro \c 1 ")]
[TestCase(1, 2, 1, @"\v 1 verse one ")]
[TestCase(1, 2, 6, @"\v 6 verse six ")]
[TestCase(1, 2, 10, "")]  // Missing verse
[TestCase(1, 6, 1, "")]   // Missing chapter
public void GetVerseUsfm_ValidResults(int bookNum, int chapterNum, int verseNum, string expected)
{
    _scrText.PutText(1, 0, false, TestUsfmContent, null);
    var provider = new DummyParatextProjectDataProvider("test", Client, CreateProjectDetails(_scrText), ParatextProjects);

    var verseRef = new VerseRef(bookNum, chapterNum, verseNum);
    var result = provider.GetVerseUsfm(verseRef);

    VerifyUsfmSame(result, expected, _scrText, bookNum);
}
```

---

## Invariant Testing

Invariant testing verifies that **business rules and properties always hold** for specific test inputs.

### When to Use Invariant Tests

| Scenario                | Example Invariant                     |
| ----------------------- | ------------------------------------- |
| Data transformations    | `Deserialize(Serialize(x)) == x`      |
| Business rules          | "Project GUID is always unique"       |
| Mathematical operations | "Result is always within valid range" |
| Parsing/formatting      | "Round-trip preserves content"        |

### C# Invariant Tests

Use regular NUnit tests with the `[Category("Invariant")]` attribute.

```csharp
[TestFixture]
public class VerseRefInvariantTests
{
    [Test]
    [Category("Invariant")]
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

```typescript
describe('VerseRef Invariants', () => {
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

1. **Choose representative inputs** — include typical values, boundary values, and edge cases.
2. **Test multiple scenarios** — use `[TestCase]` or `test.each` for multiple inputs.
3. **Keep tests focused** — one invariant per test method.

For more thorough invariant verification with random input generation, see [Property-Based Testing](#property-based-testing) below.

---

## Test Categorization

Test categorization enables fast feedback during development by running subsets of tests based on speed requirements.

### Categories

| Category        | Time Budget | When to Run     | Scope               |
| --------------- | ----------- | --------------- | ------------------- |
| **Smoke**       | < 10s       | After each edit | Core functionality  |
| **Critical**    | < 60s       | Every 3–5 edits | Feature tests       |
| **Full**        | < 5 min     | Before commit   | Complete suite      |
| **Integration** | No limit    | CI only         | Cross-process tests |

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
  test('basic operation works', () => {});
});

// Or use file naming: feature.smoke.test.ts, feature.critical.test.ts
```

### Running by Category

```bash
# C# — run only smoke tests
dotnet test --filter "Category=Smoke"

# TypeScript — run a specific test name pattern
npm test -- --testNamePattern="Smoke"
```

---

## Property-Based Testing

Property-based testing verifies that **invariants hold for all possible inputs**, not just the cases you imagined. Humans define the invariant; the tool generates the inputs.

It complements [Invariant Testing](#invariant-testing): start with regular invariant tests using specific inputs, then promote high-value invariants to property tests when random input generation would catch more.

### When to Use Property Tests

| Scenario                | Example Property                      |
| ----------------------- | ------------------------------------- |
| Data transformations    | `Deserialize(Serialize(x)) == x`      |
| Business rules          | "Project GUID is always unique"       |
| Mathematical operations | "Result is always within valid range" |
| Parsing/formatting      | "Round-trip preserves content"        |

### C# (no property-based framework)

The C# test suite does **not** include a property-based testing framework — `c-sharp-tests/c-sharp-tests.csproj` references NUnit (with `NUnit3TestAdapter` and `coverlet.collector`) but no FsCheck or equivalent. Verify invariants in C# with ordinary NUnit `[Test]`/`[TestCase]` methods, supplying representative and boundary inputs by hand, and tag them with `[Category("Invariant")]`:

```csharp
[TestFixture]
public class VerseRefInvariantTests
{
    [TestCase(1, 1, 1)]
    [TestCase(66, 150, 176)]
    [TestCase(40, 28, 20)]
    [Category("Invariant")]
    public void VerseRef_ComponentsAlwaysValid(int book, int chapter, int verse)
    {
        var verseRef = new VerseRef(book, chapter, verse);

        Assert.That(verseRef.BookNum, Is.InRange(1, 66));
        Assert.That(verseRef.ChapterNum, Is.GreaterThanOrEqualTo(0));
        Assert.That(verseRef.VerseNum, Is.GreaterThanOrEqualTo(0));
    }
}
```

For random input generation, use TypeScript with `fast-check` (below).

### TypeScript with fast-check

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

### Iteration Requirements

| Invariant Criticality      | Minimum Iterations |
| -------------------------- | ------------------ |
| Critical (data integrity)  | 1000               |
| Important (business logic) | 500                |
| Standard                   | 100                |

---

## Mutation Testing

Mutation testing verifies **test quality** by checking whether tests detect small code changes (mutations). A high mutation score means the tests catch real defects rather than just exercising the code.

### When to Use

- **Critical business logic** — merge algorithms, conflict resolution, data persistence.
- **Threshold:** ≥70% mutation score for critical paths.

### Tools

| Language   | Tool        | Config File                         |
| ---------- | ----------- | ----------------------------------- |
| TypeScript | Stryker     | `stryker.config.json`               |
| C#         | Stryker.NET | `c-sharp-tests/stryker-config.json` |

### Running Mutation Tests

```bash
# TypeScript mutation tests
npm run test:mutation

# C# mutation tests
npm run test:mutation:csharp
```

### Score Thresholds

| Threshold | Score | Meaning                  |
| --------- | ----- | ------------------------ |
| High      | 80%   | Excellent test quality   |
| Low       | 70%   | Minimum acceptable       |
| Break     | 0%    | Build failure threshold  |

### Interpreting Results

- **Survived mutants** — code changes not caught by tests (bad).
- **Killed mutants** — code changes caught by tests (good).
- **Timeout/Error** — mutant caused an infinite loop or crash.

---

## E2E Testing

End-to-end testing verifies complete user workflows across all processes (Electron main, renderer, extension host, and .NET data provider).

### Tools

- **Playwright** — browser automation for Electron apps.

### Intended Use

- **Critical user journeys** — project creation, editing, synchronization.
- **Cross-process integration** — verify all processes communicate correctly.
- **Smoke tests** — quick verification that the app starts and basic features work.

### UI-Only Interaction Rule

E2E tests that verify user flows MUST interact through visible UI only:

- Use `cdp.fixture` for all per-feature E2E tests (connects to the running app via CDP).
- Click menu items, buttons, and fill forms through the UI.
- NEVER use `papi.fixture` or `app.fixture` for per-feature tests.
- NEVER send JSON-RPC commands to set up UI state.
- NEVER import `sendPapiCommand` from helpers in per-feature tests.

Note: `app.fixture` is retained for CI smoke tests only (launches standalone Electron).

### Opening a Project and Its Tool Menus (PT10 Navigation Pattern)

Tools that need a project context (Markers Checklist, Markers Inventory, Checks side panel, etc.) are **NOT** exposed via the main app menu — they live in the **scripture editor's hamburger menu**. The main app menu (`%product_shortName%` — labeled "Platform") only hosts project-agnostic items (Open…, Settings, Exit, Help).

The reason: when a command fires from a web-view's topMenu, the platform passes that web-view's `webViewId` to the command handler. The handler reads the active `projectId` from the web-view definition. Main-menu commands receive no web-view context, so they cannot resolve a project.

**Navigation pattern** (copy-paste for Playwright/CDP tests):

```typescript
import { expect } from '../../fixtures/cdp.fixture';
import type { Page } from '@playwright/test';

const PROJECT_NAME = 'wgPIDGIN'; // any existing project in the dev env

// 1. Open a project from Home (if not already open)
async function openProject(page: Page, projectName: string): Promise<void> {
  const existing = page.locator('.dock-tab', { hasText: new RegExp(projectName, 'i') });
  if ((await existing.count()) > 0) return;
  const homeFrame = page.frameLocator('iframe[title="Home"]');
  await homeFrame
    .locator('tr', { hasText: new RegExp(projectName, 'i') })
    .locator('button', { hasText: /Open/i })
    .click();
  await expect(page.locator('.dock-tab', { hasText: new RegExp(projectName, 'i') }))
    .toBeVisible({ timeout: 15_000 });
}

// 2. Click a menu item in the scripture editor's hamburger menu
async function clickEditorMenuItem(page: Page, projectName: string, itemLabel: RegExp): Promise<void> {
  // Scripture editor's iframe title follows: "{PROJECT_NAME} (Editable)" or "{PROJECT_NAME} (Read-only)"
  const editorFrame = page.frameLocator(
    `iframe[title*="${projectName}" i][title*="Editable" i]`,
  );
  // Hamburger button in top-left of the editor, aria-label="Project" INSIDE the iframe.
  // WARNING: an identically-named button (aria-label="Project") exists OUTSIDE the iframe —
  // that one opens a small dock-tab project menu with only 2 items, NOT the full topMenu.
  await editorFrame.locator("button[aria-label='Project']").first().click();
  // Radix portals the menu into the iframe's own document.body, so use editorFrame for
  // menuitem selectors, not the top-level page.
  await editorFrame.getByRole('menuitem', { name: itemLabel }).first().click();
}
```

**Gotchas**:

1. **Two buttons named "Project"** — one inside the editor iframe (the hamburger, opens the full topMenu with ~15 items), one outside in the dock tab bar (a dock-tab project menu with only "Open Project Settings..." and "Settings..."). They are indistinguishable via the CDP accessibility tree alone — always pick the one via `editorFrame.locator(...)`, not `page.locator(...)`.
2. **Menu items render inside the iframe**, not at the top-level page. Radix's `DropdownMenu` portals to `document.body`, which in an iframe context means the iframe's body. Use `editorFrame.getByRole('menuitem', ...)`, NOT `page.getByRole('menuitem', ...)`.
3. **Newly opened tool tabs are at the main-page level.** Dock tabs are rendered in the outer dock layout, not in any iframe. After clicking a menuitem that opens a new web view, `expect(page.locator('.dock-tab'))` is correct; `editorFrame.locator('.dock-tab')` is not.
4. **Resolve iframe titles pragmatically.** A project opened in Edit mode has iframe title `"{PROJECT_NAME} (Editable)"`; Read-only is `"{PROJECT_NAME} (Read-only)"`. Use a broad `title*="${projectName}" i` plus `title*="Editable" i` (or relax to just the project name if you don't care which mode).
5. **`openProject` must come BEFORE the editor-menu click** in each `beforeEach`. Without a project open, there's no scripture editor, so no hamburger menu, so no menu items.
6. **Pass a precise `itemLabel` regex** — the helper calls `.first()` after `getByRole('menuitem', { name: itemLabel })`, which silently masks Playwright's strict-mode multi-match error. A broad pattern like `/markers/i` would match both "Markers Checklist" and "Markers Inventory" and click whichever appears first in DOM order. Anchor the regex (`/^Markers Checklist$/i`) when the menu has similarly-named items.

**Related code pointers**:

- The scripture editor's menu JSON lives at `extensions/src/platform-scripture-editor/contributions/menus.json`. That extension OWNS the topMenu declarations. Other extensions (e.g., `platform-scripture`) add their tool entries by editing that file — NOT by contributing from their own `menus.json`. The inventory-group items (`openCharactersInventory`, `openMarkersInventory`, etc.) are declared there with commands from other extensions, confirming this cross-extension pattern.
- Main-menu contribution restrictions: extensions can only add items to existing extensible groups (`platform.projectProjects`, `platform.projectResources`, `platform.helpRegistration`). Base columns (`platform.app`, `platform.help`) are NOT extensible by default, so new top-level groups cannot be added from extensions.
- Menu schema (`lib/platform-bible-utils/src/extension-contributions/menus.model.ts`): column/group IDs must match `^[\w\-]+\.[\w\-]+$` (single period; no nested `ext.ns.name`). Column orders must not conflict with existing base menu entries (`defaultWebViewTopMenu.platform.app` has `order: 1`, so custom columns should use `order: 2+`).

### Test Location

Create E2E tests in: `e2e-tests/tests/{feature}/`

```
e2e-tests/
├── fixtures/
│   ├── cdp.fixture.ts           # Connects to running app via CDP (DEFAULT for features)
│   ├── app.fixture.ts           # Launches fresh Electron (CI smoke tests only)
│   ├── papi.fixture.ts          # @deprecated — CI smoke tests only
│   ├── papi-live.fixture.ts     # Connects to already-running app's WebSocket (command-surface verification)
│   └── helpers.ts               # waitForAppReady(), sendPapiCommand()
├── playwright-cdp.config.ts     # Config for CDP mode (no setup/teardown)
├── playwright.config.ts         # Config for standalone mode (with setup/teardown)
└── tests/
    └── {feature}/
        └── {feature}.spec.ts
```

### Fixture Selection

| Fixture       | Mode                               | When to Use                               | Provides                  |
| ------------- | ---------------------------------- | ----------------------------------------- | ------------------------- |
| `cdp.fixture`      | Connects to running app (CDP 9223)        | **Default for all per-feature E2E tests** | `mainPage`                |
| `app.fixture`      | Launches fresh Electron                   | CI smoke tests, standalone testing        | `electronApp`, `mainPage` |
| `papi.fixture`     | Extends app.fixture + WebSocket           | **Deprecated** — CI smoke tests only      | `papiClient` + app.fixture |
| `papi-live.fixture`| Connects to already-running app (WS 8876) | Command-surface verification only (see below) | `papiLive`                |

### Command-Surface Verification (papi-live.fixture)

This is a **separate test category** from the per-feature UI flows above — it verifies that a feature's PAPI command surface is registered, routed, and reachable on the wire, not that a user can drive the feature through the UI. The [UI-Only Interaction Rule](#ui-only-interaction-rule) ("never send JSON-RPC commands") applies to user-flow tests; it does **not** apply here, where sending JSON-RPC is the whole point.

`papi-live.fixture` connects to an already-running instance over the PAPI WebSocket (port 8876) and exposes a `papiLive` client with `request`/`requestRaw` (raw JSON-RPC methods, e.g. `object:*` NetworkObject calls) and `sendCommand`/`sendCommandRaw` (the `*Raw` variants return the full response so you can inspect the error code). Pattern:

1. **Skip guard** — gate the suite in `test.beforeAll` on `canConnectToPapi()` so it skips cleanly when the app is down or in CI:

   ```typescript
   import { test, expect, canConnectToPapi } from '../../fixtures/papi-live.fixture';

   test.beforeAll(async () => {
     test.skip(!(await canConnectToPapi()), 'PAPI server not running on ws://localhost:8876');
   });
   ```

2. **Discovery test** — call `rpc.discover` once and assert every documented method name is present (the NetworkObject root itself is also registered, so it makes a good sentinel):

   ```typescript
   const schema = await papiLive.request<{ methods: { name: string }[] }>('rpc.discover', []);
   const methodNames = new Set(schema.methods.map((m) => m.name));
   expect(methodNames).toContain('object:myFeature.someMethod');
   ```

3. **One test per method** — call each method with `requestRaw` (`object:*` NetworkObject methods) or `sendCommandRaw` (`command:*` methods) and inspect the error code instead of catching an exception.

**Reachability heuristic.** You can verify the whole command surface without real preconditions (an open project, a real project id, etc.) by distinguishing *where* an error originates:

- A JSON-RPC error code **inside** the reserved/protocol range (`-32700`, or `-32600`..`-32603`) means the handler was never reached — missing registration, wrong parameter shape, or a serialization crash. **FAIL.**
- A business error **outside** that range (e.g. `-32000` NOT_FOUND from a deliberately bogus id) proves the command is registered, routed, and executed before failing on the business precondition. **PASS.**

So each per-method test sends a well-formed payload with a bogus id and asserts only that the error code is *outside* the reserved/protocol range — no real project required. For the full code table, see [papi-client/reference.md](../../.claude/skills/papi-client/reference.md#error-codes).

```typescript
const RESERVED = new Set([-32700, -32600, -32601, -32602, -32603]);
const res = await papiLive.requestRaw('object:myFeature.someMethod', ['__bogus_id__']);
if (res.error) expect(RESERVED, res.error.message).not.toContain(res.error.code);
```

### E2E Test Templates

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

### E2E Test Best Practices

| DO                                            | DON'T                                          |
| --------------------------------------------- | ---------------------------------------------- |
| Click buttons, fill forms, navigate via UI    | Call PAPI commands directly to change state    |
| Use Playwright locators for real DOM elements | Mock PAPI responses (that's for unit tests)    |
| Verify user-visible state changes             | Skip UI interactions by manipulating state     |
| Use `data-testid` for stable selectors        | Use brittle selectors (class names, tag names) |
| Handle timing with explicit waits             | Use `sleep()` without assertions               |

### Running E2E Tests

**IMPORTANT**: Always use the `--config` flag when running Playwright from the repo root. Without `--config`, Playwright uses defaults — the `--project` flag won't work, no dev server is started, and bare `npx playwright test` (without a test path) will discover vitest `.test.ts` files and fail.

```bash
# CDP mode (default — app already running via ./.erb/scripts/refresh.sh)
npx playwright test e2e-tests/tests/{feature}/ --config=e2e-tests/playwright-cdp.config.ts --reporter=list

# CDP mode with HTML report
npx playwright test e2e-tests/tests/{feature}/ --config=e2e-tests/playwright-cdp.config.ts --reporter=html
npx playwright show-report e2e-tests/playwright-report

# Standalone mode (CI — launches own Electron, port 8876 must be free)
npx playwright test e2e-tests/tests/{feature}/ --config=e2e-tests/playwright.config.ts --project=development --reporter=list
```

### Failure Analysis

| Failure Type          | Diagnosis                       | Fix                                |
| --------------------- | ------------------------------- | ---------------------------------- |
| Selector not found    | Check actual DOM structure      | Update selector, add `data-testid` |
| Command not registered| Check `main.ts` registration    | Add command registration           |
| Data shape mismatch   | Compare response to contracts   | Fix types                           |
| Timeout               | Operation takes too long        | Increase timeout or add waits       |
| Fixture issue         | Wrong fixture for test type     | Switch to correct fixture           |

---

## Known Platform Constraints

These constraints affect test authoring and are easy to miss.

### PAPI Async Timing

PAPI command responses are asynchronous and may not be immediately reflected in the UI. When writing E2E tests that verify data changes:

- Always use Playwright `expect(...).toBeVisible({ timeout: ... })` or `expect.poll()` rather than asserting immediately after an action.
- The default 5s timeout is often insufficient for PAPI round-trips. Use 10–15s for data operations, 5s for UI-only interactions.
- Command execution order is not guaranteed across processes. If Test A sends a command and Test B reads the result, add explicit waits.
- Sequential E2E tests sharing state must use `test.describe.serial()` and include polling for the expected state.

### CDP Connection Exhaustion

When running multiple sequential Playwright tests against the same CDP endpoint:

- Always call `browser.close()` in test teardown. The CDP fixture handles this, but custom fixtures must include it.
- Without explicit close, each test leaks a browser connection, eventually exhausting the CDP endpoint's connection limit.
- Symptom: first N tests pass, then tests fail with connection/timeout errors.

### Persisted Dock Layout

Platform.Bible persists the dock/tab layout across sessions. When running E2E tests:

- Stale tabs from previous runs may be open when your test starts.
- Always include `beforeEach` cleanup to close any pre-existing tabs for the feature.
- Pattern: loop to close matching tabs before each test, with a brief wait for UI settle.

### ScrTextCollection Index Accumulation

When C# tests create many `DummyScrText` instances with unique HexIds:

- Always use `ScrTextCollection.Remove(scrText, true)` in test teardown — the second parameter triggers full internal index cleanup.
- With `false`, stale index entries accumulate. After ~50 tests, `ScrTextCollection.RefreshScrTextsInternal` throws `"Sequence contains more than one matching element"`.
- Symptom: first N tests pass, then tests fail with LINQ duplicate-key errors.
- `PapiTestBase` handles this correctly; any custom test fixtures must also use `true`.

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
# TypeScript — specific file
npm run test:core -- src/shared/services/shared-store.service.test.ts

# C# — specific class
dotnet test c-sharp-tests/c-sharp-tests.csproj --filter "FullyQualifiedName~ParatextDataProviderTests"
```

### Watch Mode

```bash
# TypeScript
npm run test:core

# C#
dotnet watch test --project c-sharp-tests/c-sharp-tests.csproj
```

### Coverage Reports

```bash
# TypeScript
npm run test:core -- --coverage

# C#
dotnet test c-sharp-tests/c-sharp-tests.csproj --collect:"XPlat Code Coverage"
```

---

## Related Documentation

- [Code-Style-Guide.md](Code-Style-Guide.md) — coding conventions
- [Git-Guide.md](Git-Guide.md) — branch and merge practices
- [Security-Guide.md](Security-Guide.md) — CSP and extension sandboxing
