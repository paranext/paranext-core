using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Services;

namespace TestParanextDataProvider.Projects;

/// <summary>
/// Tests for GetProjectSetting / SetProjectSetting handling of extension settings registered with a
/// boolean default: the write path stores a bool as "T"/"F", and the read path converts a stored
/// Paratext boolean token back to a bool. Settings that map to a Paratext setting name keep their
/// raw value, and a value that is not a boolean token passes through as a string.
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
    public Task SetThenGet_NativeBoolTrue_StoresTAndReadsBackAsBool() =>
        AssertSetRoundTrips(
            setValue: true,
            defaultValue: false,
            expectedStored: "T",
            expectedRead: true
        );

    [Test]
    public Task SetThenGet_NativeBoolFalse_StoresFAndReadsBackAsBool() =>
        AssertSetRoundTrips(
            setValue: false,
            defaultValue: true,
            expectedStored: "F",
            expectedRead: false
        );

    // PAPI deserializes wire values as JsonElement, so these mirror the production path.
    [Test]
    public Task SetThenGet_JsonElementTrue_StoresTAndReadsBackAsBool() =>
        AssertSetRoundTrips(
            setValue: JsonSerializer.SerializeToElement(true),
            defaultValue: false,
            expectedStored: "T",
            expectedRead: true
        );

    [Test]
    public Task SetThenGet_JsonElementFalse_StoresFAndReadsBackAsBool() =>
        AssertSetRoundTrips(
            setValue: JsonSerializer.SerializeToElement(false),
            defaultValue: true,
            expectedStored: "F",
            expectedRead: false
        );

    // Settings.xml written by other tools can hold the long and lowercase forms, which
    // SetProjectSetting never produces, so drive these through the raw stored value.
    [TestCase("T", true)]
    [TestCase("TRUE", true)]
    [TestCase("true", true)]
    [TestCase("F", false)]
    [TestCase("FALSE", false)]
    [TestCase("f", false)]
    public async Task GetProjectSetting_BooleanTokenVariant_ReturnsBool(
        string storedValue,
        bool expected
    )
    {
        // Register the opposite default so a pass can't come from the default value.
        await RegisterBooleanDefault(BoolSettingName, !expected);
        SetRawSetting(BoolSettingName, storedValue);

        object? result = _provider.GetProjectSetting(BoolSettingName);

        Assert.That(result, Is.TypeOf<bool>());
        Assert.That(result, Is.EqualTo(expected));
    }

    // Only settings with no Paratext mapping use the compact T/F encoding, so a mapped setting
    // keeps its raw value even when it looks like a boolean token.
    [Test]
    public async Task GetProjectSetting_MappedSettingStoringBooleanToken_ReturnsRawString()
    {
        await RegisterBooleanDefault(ProjectSettingsNames.PB_VALID_CHARACTERS, true);
        SetRawSetting(ProjectSettingsNames.PT_VALID_CHARACTERS, "T");

        object? result = _provider.GetProjectSetting(ProjectSettingsNames.PB_VALID_CHARACTERS);

        Assert.That(result, Is.TypeOf<string>());
        Assert.That(result, Is.EqualTo("T"));
    }

    // The write path only encodes actual booleans; anything else is stored as-is.
    [Test]
    public async Task SetProjectSetting_NonBooleanJsonElement_StoresVerbatim()
    {
        await RegisterBooleanDefault(BoolSettingName, false);

        Assert.That(
            _provider.SetProjectSetting(
                BoolSettingName,
                JsonSerializer.SerializeToElement("hello")
            ),
            Is.True
        );
        Assert.That(_scrText.Settings.ParametersDictionary[BoolSettingName], Is.EqualTo("hello"));
    }

    // ResetProjectSetting feeds GetDefault's JsonElement straight back into SetProjectSetting.
    [Test]
    public async Task ResetThenGet_BooleanDefault_ReturnsBool()
    {
        await RegisterBooleanDefault(BoolSettingName, true);
        SetRawSetting(BoolSettingName, "F");

        Assert.That(_provider.ResetProjectSetting(BoolSettingName), Is.True);
        Assert.That(_scrText.Settings.ParametersDictionary[BoolSettingName], Is.EqualTo("T"));

        object? readBack = _provider.GetProjectSetting(BoolSettingName);
        Assert.That(readBack, Is.TypeOf<bool>());
        Assert.That(readBack, Is.True);
    }

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
