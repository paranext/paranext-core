# Test Runner Reference

This is a quick reference for common test patterns. For comprehensive testing standards, see [Testing-Guide.md](../../.context/standards/Testing-Guide.md).

## Testing Stack

### TypeScript

| Tool | Purpose |
|------|---------|
| Vitest | Test runner |
| React Testing Library | Component testing |
| jsdom | DOM environment |
| @testing-library/user-event | User interaction simulation |

### C#

| Tool | Purpose |
|------|---------|
| NUnit / xUnit | Test framework |
| Moq | Mocking |
| FluentAssertions | Assertion library |
| FsCheck | Property-based testing |

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

```
paranext-core/
└── c-sharp-tests/
    ├── {Feature}Tests/
    │   ├── {Feature}DataProviderTests.cs
    │   ├── {Feature}GoldenMasterTests.cs
    │   └── {Feature}PropertyTests.cs
    └── TestHelpers/
        └── *.cs
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

### Golden Master Test Pattern

```csharp
[TestFixture]
public class FeatureGoldenMasterTests
{
    [Test]
    [Category("GoldenMaster")]
    [TestCaseSource(nameof(GetGoldenMasterScenarios))]
    public void Feature_MatchesPT9Behavior(GoldenMasterScenario scenario)
    {
        // Arrange
        var input = LoadInput(scenario.InputPath);
        var expected = LoadExpected(scenario.ExpectedPath);

        // Act
        var actual = SystemUnderTest.Process(input);

        // Assert
        Assert.That(actual, Is.EqualTo(expected));
    }

    private static IEnumerable<GoldenMasterScenario> GetGoldenMasterScenarios()
    {
        // Load from .context/features/{feature}/golden-masters/
    }
}
```

### Property-Based Test Pattern

```csharp
[TestFixture]
public class FeaturePropertyTests
{
    [FsCheck.NUnit.Property]
    [Category("Property")]
    public Property RoundTrip_PreservesData()
    {
        return Prop.ForAll<string>(input =>
        {
            var encoded = Encode(input);
            var decoded = Decode(encoded);
            return decoded == input;
        });
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

### NUnit/xUnit Config

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

### C# (Moq)

```csharp
var mockDataProvider = new Mock<IDataProvider>();
mockDataProvider
    .Setup(x => x.GetData(It.IsAny<string>()))
    .Returns(expectedData);

var sut = new Service(mockDataProvider.Object);
```

## Test Base Classes

### C# Test Base

```csharp
// From ParatextData.Tests
public class PapiTestBase : IDisposable
{
    protected IServiceProvider ServiceProvider { get; }

    public PapiTestBase()
    {
        // Setup common services
    }

    public void Dispose()
    {
        // Cleanup
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
