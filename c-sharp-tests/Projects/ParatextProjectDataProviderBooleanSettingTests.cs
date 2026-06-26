using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider.Projects;

/// <summary>
/// Integration tests for the GetProjectSetting / SetProjectSetting logic that handles extension
/// project settings registered with a boolean default.
///
/// The write path stores a <c>bool</c> as the string <c>"T"</c> / <c>"F"</c>. The read path looks
/// up the registered default via <c>ProjectSettingsService.GetDefault</c>; when that default is a
/// JSON boolean, a stored <c>"T"/"F"</c> token is converted back to a real <c>bool</c>. A stored
/// value that is not one of those tokens is returned as the raw string on purpose (a setting with a
/// boolean default may legitimately hold a non-boolean value — a union/mixed type), and a setting
/// with no registered default falls back to returning the raw string.
/// </summary>
[ExcludeFromCodeCoverage]
[TestFixture]
internal class ParatextProjectDataProviderBooleanSettingTests : PapiTestBase
{
    private const string PdpName = "booleanSettingTestProject";

    // An extension setting name that is NOT a known Paratext setting, so it is treated as an
    // extension setting (its Paratext name equals the Platform.Bible name and it is not in the
    // known-boolean list).
    private const string BoolSettingName = "myExtension.someBooleanSetting";

    private DummyScrText _scrText = null!;
    private ProjectDetails _projectDetails = null!;
    private DummyParatextProjectDataProvider _provider = null!;

    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();

        // Register a stub for ProjectSettingsService.isValid that always approves changes.
        // SetProjectSetting calls this before writing any value.
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

    // ------------------------------------------------------------------
    // Helpers
    // ------------------------------------------------------------------

    /// <summary>
    /// Registers a stub for ProjectSettingsService.getDefault that returns the given boolean as a
    /// JSON boolean default (mirroring how an extension registers a boolean-typed default).
    /// </summary>
    private void RegisterBooleanDefault(string settingName, bool defaultValue)
    {
        Client.RegisterRequestHandlerAsync(
            "object:ProjectSettingsService.getDefault",
            new Func<string, object?>(key =>
                key == settingName ? JsonSerializer.SerializeToElement(defaultValue) : null
            ),
            null
        );
    }

    /// <summary>
    /// Directly writes a raw string value into the project's ParametersDictionary so that
    /// GetProjectSetting reads whatever we put there, without going through SetProjectSetting.
    /// </summary>
    private void SetRawSetting(string settingName, string rawValue)
    {
        _scrText.Settings.ParametersDictionary[settingName] = rawValue;
    }

    // ------------------------------------------------------------------
    // Tests
    // ------------------------------------------------------------------

    [Test]
    public void SetThenGetProjectSetting_True_StoresTAndReturnsBoolTrue()
    {
        RegisterBooleanDefault(BoolSettingName, false);

        bool result = _provider.SetProjectSetting(BoolSettingName, true);
        Assert.That(result, Is.True);

        // The value is stored as the string "T".
        Assert.That(_scrText.Settings.ParametersDictionary[BoolSettingName], Is.EqualTo("T"));

        // Reading it back yields a real boolean true.
        object? readBack = _provider.GetProjectSetting(BoolSettingName);
        Assert.That(readBack, Is.TypeOf<bool>());
        Assert.That(readBack, Is.True);
    }

    [Test]
    public void SetThenGetProjectSetting_False_StoresFAndReturnsBoolFalse()
    {
        RegisterBooleanDefault(BoolSettingName, true);

        bool result = _provider.SetProjectSetting(BoolSettingName, false);
        Assert.That(result, Is.True);

        // The value is stored as the string "F".
        Assert.That(_scrText.Settings.ParametersDictionary[BoolSettingName], Is.EqualTo("F"));

        // Reading it back yields a real boolean false.
        object? readBack = _provider.GetProjectSetting(BoolSettingName);
        Assert.That(readBack, Is.TypeOf<bool>());
        Assert.That(readBack, Is.False);
    }

    [Test]
    public void GetProjectSetting_BooleanDefaultButNonBooleanStoredValue_ReturnsRawString()
    {
        // The setting has a registered boolean default, but the stored value is not a T/F token.
        // This pins the intentional union-type permissiveness: the raw string is returned, not an
        // exception.
        RegisterBooleanDefault(BoolSettingName, false);
        SetRawSetting(BoolSettingName, "hello");

        object? result = _provider.GetProjectSetting(BoolSettingName);

        Assert.That(result, Is.TypeOf<string>());
        Assert.That(result, Is.EqualTo("hello"));
    }

    [Test]
    public void GetProjectSetting_NoRegisteredDefault_ReturnsStoredValueAsString()
    {
        // No getDefault handler is registered, so ProjectSettingsService.GetDefault throws and the
        // legacy behavior of returning the raw stored string is preserved.
        SetRawSetting(BoolSettingName, "T");

        object? result = _provider.GetProjectSetting(BoolSettingName);

        Assert.That(result, Is.TypeOf<string>());
        Assert.That(result, Is.EqualTo("T"));
    }
}
