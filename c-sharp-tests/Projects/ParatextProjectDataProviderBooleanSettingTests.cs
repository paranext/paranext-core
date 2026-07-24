using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider.Projects;

/// <summary>
/// Tests for GetProjectSetting / SetProjectSetting handling of extension settings registered with a
/// boolean default: the write path stores a bool as "T"/"F", and the read path converts a stored
/// "T"/"F" token back to a bool.
/// </summary>
[ExcludeFromCodeCoverage]
[TestFixture]
internal class ParatextProjectDataProviderBooleanSettingTests : PapiTestBase
{
    private const string PdpName = "booleanSettingTestProject";

    // An extension setting name that is NOT a known Paratext setting.
    private const string BoolSettingName = "myExtension.someBooleanSetting";

    private DummyScrText _scrText = null!;
    private ProjectDetails _projectDetails = null!;
    private DummyParatextProjectDataProvider _provider = null!;

    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();

        // SetProjectSetting calls isValid before writing; approve everything.
        await Client.RegisterRequestHandlerAsync(
            "object:ProjectSettingsService.isValid",
            new Func<string, object?, object?, object?, bool>(
                (key, newValue, currentValue, allChanges) => true
            ),
            null
        );

        _scrText = CreateDummyProject();
        _projectDetails = CreateProjectDetails(_scrText);
        ParatextProjects.FakeAddProject(_projectDetails, _scrText);

        _provider = new DummyParatextProjectDataProvider(
            PdpName,
            Client,
            _projectDetails,
            ParatextProjects
        );
    }

    [TearDown]
    public void TearDown()
    {
        _scrText?.Dispose();
    }

    /// <summary>Stubs getDefault to return the given bool as a JSON boolean default.</summary>
    private async Task RegisterBooleanDefault(string settingName, bool defaultValue) =>
        await Client.RegisterRequestHandlerAsync(
            "object:ProjectSettingsService.getDefault",
            new Func<string, object?>(key =>
                key == settingName ? JsonSerializer.SerializeToElement(defaultValue) : null
            ),
            null
        );

    /// <summary>Writes a raw string straight into the project so GetProjectSetting reads it back.</summary>
    private void SetRawSetting(string settingName, string rawValue) =>
        _scrText.Settings.ParametersDictionary[settingName] = rawValue;

    /// <summary>
    /// Sets <paramref name="setValue"/>, then asserts it stored as <paramref name="expectedStored"/>
    /// and reads back as the bool <paramref name="expectedRead"/>.
    /// </summary>
    private async Task AssertSetRoundTrips(
        object setValue,
        bool defaultValue,
        string expectedStored,
        bool expectedRead
    )
    {
        await RegisterBooleanDefault(BoolSettingName, defaultValue);

        Assert.That(_provider.SetProjectSetting(BoolSettingName, setValue), Is.True);
        Assert.That(
            _scrText.Settings.ParametersDictionary[BoolSettingName],
            Is.EqualTo(expectedStored)
        );

        object? readBack = _provider.GetProjectSetting(BoolSettingName);
        Assert.That(readBack, Is.TypeOf<bool>());
        Assert.That(readBack, Is.EqualTo(expectedRead));
    }

    [Test]
    public Task SetThenGet_NativeBoolTrue() => AssertSetRoundTrips(true, false, "T", true);

    [Test]
    public Task SetThenGet_NativeBoolFalse() => AssertSetRoundTrips(false, true, "F", false);

    // PAPI deserializes wire values as JsonElement, so these mirror the production path.
    [Test]
    public Task SetThenGet_JsonElementTrue() =>
        AssertSetRoundTrips(JsonSerializer.SerializeToElement(true), false, "T", true);

    [Test]
    public Task SetThenGet_JsonElementFalse() =>
        AssertSetRoundTrips(JsonSerializer.SerializeToElement(false), true, "F", false);

    // A boolean-default setting may legitimately hold a non-boolean value (union type).
    [Test]
    public async Task GetProjectSetting_BooleanDefaultButNonBooleanStoredValue_ReturnsRawString()
    {
        await RegisterBooleanDefault(BoolSettingName, false);
        SetRawSetting(BoolSettingName, "hello");

        object? result = _provider.GetProjectSetting(BoolSettingName);

        Assert.That(result, Is.TypeOf<string>());
        Assert.That(result, Is.EqualTo("hello"));
    }

    // With no registered default, GetDefault throws and the raw string is returned.
    [Test]
    public void GetProjectSetting_NoRegisteredDefault_ReturnsStoredValueAsString()
    {
        SetRawSetting(BoolSettingName, "T");

        object? result = _provider.GetProjectSetting(BoolSettingName);

        Assert.That(result, Is.TypeOf<string>());
        Assert.That(result, Is.EqualTo("T"));
    }
}
