# Test Runner Reference

This is a quick reference for common test patterns. For comprehensive testing standards, see [Testing-Guide.md](../../../.context/standards/Testing-Guide.md).

## Testing Stack

### TypeScript

| Tool | Purpose |
|------|---------|
| Vitest | Test runner |
| React Testing Library | Component testing |
| jsdom | DOM environment |
| @testing-library/user-event | User interaction simulation |

### C#

The C# test project (`c-sharp-tests/c-sharp-tests.csproj`) uses NUnit only. There is
no xUnit, Moq, FluentAssertions, or FsCheck. Test doubles are the project's own
`Dummy*` classes; assertions use NUnit's `Assert.That(...)`.

| Tool | Purpose |
|------|---------|
| NUnit 4.0.1 | Test framework (`Assert.That`, `[Test]`, `[TestFixture]`, `[Category]`) |
| NUnit3TestAdapter | Test runner integration for `dotnet test` |
| NUnit.Analyzers | NUnit-specific Roslyn analyzers |
| Microsoft.NET.Test.Sdk | Test host |
| SIL.TestUtilities | SIL test helpers |
| coverlet.collector | Code coverage |
| ParatextData | Production dependency under test |

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
│       └── tests/                # Alternative location
└── lib/
    └── {package}/
        └── __tests__/            # Library tests
```

### C# Tests

Feature tests live in feature-named subdirectories (no `Tests` suffix on the dir
name; the suffix is on the test file/class names). Shared helpers and test doubles
live at the `c-sharp-tests/` root — there is no `TestHelpers/` directory.

```
paranext-core/
└── c-sharp-tests/
    ├── PapiTestBase.cs            # shared abstract test base (at root)
    ├── FixtureSetup.cs           # shared fixture setup (at root)
    ├── DummyScrText.cs           # test doubles (Dummy*.cs, at root)
    ├── DummyPapiClient.cs
    ├── Checks/                   # feature-named dirs, e.g.
    │   └── {Feature}Tests.cs
    ├── Projects/
    ├── Services/
    ├── ParatextUtils/
    ├── JsonUtils/
    ├── NetworkObjects/
    ├── ManageBooks/
    └── Checklists/
```

## Test Patterns

### Unit Test Pattern

```typescript
// TypeScript
describe('ComponentName', () => {
  it('does something specific', () => {
    // Arrange
    const props = { value: 'test' };

    // Act
    render(<Component {...props} />);

    // Assert
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
```

```csharp
// C#
[TestFixture]
public class FeatureTests
{
    [Test]
    [Category("Unit")]
    public void Method_Condition_ExpectedResult()
    {
        // Arrange
        var sut = new Feature();

        // Act
        var result = sut.Method();

        // Assert
        Assert.That(result, Is.EqualTo(expected));
    }
}
```

### Invariant / Round-Trip Test Pattern

The C# suite has no property-based framework (no FsCheck). Invariants and round-trip
properties are expressed as ordinary NUnit tests, often over `[TestCase]` data and
tagged `[Category("Invariant")]`:

```csharp
[TestFixture]
public class FeatureInvariantTests
{
    [TestCase("")]
    [TestCase("plain text")]
    [TestCase("text with \"quotes\" and \\backslashes\\")]
    [Category("Invariant")]
    public void RoundTrip_PreservesData(string input)
    {
        var encoded = Encode(input);
        var decoded = Decode(encoded);

        Assert.That(decoded, Is.EqualTo(input));
    }
}
```

### Snapshot Test Pattern

```typescript
describe('Component Snapshots', () => {
  it('matches snapshot', () => {
    const { container } = render(<Component />);
    expect(container).toMatchSnapshot();
  });
});
```

## Test Configuration

### Vitest Config

Located in `vitest.config.ts` or `vite.config.ts`:

```typescript
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
});
```

### NUnit Config

Test settings in `.runsettings` or project file:

```xml
<PropertyGroup>
  <IsTestProject>true</IsTestProject>
  <GenerateProgramFile>false</GenerateProgramFile>
</PropertyGroup>
```

## Mocking Patterns

### TypeScript (Vitest)

```typescript
// Mock a module
vi.mock('@shared/services/logger.service', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock PAPI
vi.mock('papi-shared-types', () => ({
  papi: {
    commands: {
      sendCommand: vi.fn(),
    },
  },
}));
```

### C# (Dummy test doubles)

The C# tests do not use Moq. Instead they use hand-written `Dummy*` test doubles that
live at the `c-sharp-tests/` root (e.g. `DummyScrText`, `DummyPapiClient`,
`DummyLocalParatextProjects`, `DummyParatextProjectDataProvider`). Tests derived from
`PapiTestBase` get `Client` (a `DummyPapiClient`) and `ParatextProjects` (a
`DummyLocalParatextProjects`) for free.

```csharp
// A dummy project (created via the PapiTestBase helper)
DummyScrText scrText = CreateDummyProject();

// Register it so the rest of the system can find it
ProjectDetails details = CreateProjectDetails(scrText);
ParatextProjects.FakeAddProject(details, scrText);
```

> **Localization gotcha:** `DummyPapiClient.SendRequestAsync` returns `default(T)` for unregistered
> services, so `GetLocalizedString` falls back to its `defaultValue` — a wire integration test can
> still see English even when no localization service is registered. See
> [Localization-Guide.md](../../../.context/standards/Localization-Guide.md) § "Testing Localized C# Backends".

## Test Base Classes

### C# Test Base

Most C# tests derive from `PapiTestBase` (`c-sharp-tests/PapiTestBase.cs`, namespace
`TestParanextDataProvider`). It is an `internal abstract` `[TestFixture]` that wires up
encoding, sets up/tears down a `DummyPapiClient` (`Client`) and
`DummyLocalParatextProjects` (`ParatextProjects`), and exposes `protected static`
helpers for building and verifying test data.

```csharp
namespace TestParanextDataProvider
{
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal abstract class PapiTestBase
    {
        protected DummyPapiClient Client { get; }
        protected DummyLocalParatextProjects ParatextProjects { get; }

        // Helper methods to create test data
        protected static DummyScrText CreateDummyProject();
        protected static ProjectDetails CreateProjectDetails(ScrText scrText);

        // Helper methods to verify data
        protected static void VerifyUsfmSame(string usfm1, string usfm2, ScrText scrText, int bookNum);
        protected static void VerifyUsxSame(string usx1, string usx2);
    }
}
```

Example derived fixture:

```csharp
[TestFixture]
[Category("Contract")]
internal class FeatureTests : PapiTestBase
{
    [Test]
    public void Method_Condition_ExpectedResult()
    {
        DummyScrText scrText = CreateDummyProject();
        // ... exercise behavior, then verify ...
        Assert.That(result, Is.EqualTo(expected));
    }
}
```

## Common Test Commands

### Full Test Suite

```bash
# TypeScript
npm test

# C#
dotnet test c-sharp-tests/

# Both
npm test && dotnet test c-sharp-tests/
```

### Pre-Commit Validation

```bash
# Run before committing
npm run typecheck && npm run lint && npm test && dotnet test c-sharp-tests/
```

### CI-Style Run

```bash
# Simulate CI environment
CI=true npm test -- --coverage
dotnet test c-sharp-tests/ --configuration Release
```
