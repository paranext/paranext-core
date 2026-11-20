using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Services;

namespace TestParanextDataProvider.Projects;

/// <summary>
/// Tests for GetProjectSetting / SetProjectSetting storage of settings with no Paratext mapping:
/// they are stored as JSON text so a value comes back with the type it was written with, a stored
/// value that is not JSON comes back as the raw string, and mapped settings keep Paratext's format.
/// </summary>
[ExcludeFromCodeCoverage]
[TestFixture]
internal class ParatextProjectDataProviderJsonSettingTests : PapiTestBase
{
    private const string PdpName = "jsonSettingTestProject";

    // An extension setting name that is NOT a known Paratext setting.
    private const string ExtensionSettingName = "myExtension.someSetting";

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

    /// <summary>Writes a raw string straight into the project so GetProjectSetting reads it back.</summary>
    private void SetRawSetting(string settingName, string rawValue) =>
        _scrText.Settings.ParametersDictionary[settingName] = rawValue;

    private string GetRawSetting(string settingName) =>
        _scrText.Settings.ParametersDictionary[settingName];

    /// <summary>Asserts a value read back is a JsonElement holding exactly <paramref name="expectedJson"/>.</summary>
    private static void AssertJson(object? actual, JsonValueKind expectedKind, string expectedJson)
    {
        Assert.That(actual, Is.TypeOf<JsonElement>());
        var element = (JsonElement)actual!;
        Assert.That(element.ValueKind, Is.EqualTo(expectedKind));
        Assert.That(element.GetRawText(), Is.EqualTo(expectedJson));
    }

    // PAPI deserializes wire values as JsonElement, so writes go through the production path.
    [TestCase("true", JsonValueKind.True)]
    [TestCase("false", JsonValueKind.False)]
    [TestCase("15", JsonValueKind.Number)]
    [TestCase("1.5", JsonValueKind.Number)]
    [TestCase("\"Black\"", JsonValueKind.String)]
    [TestCase("""{"approach":"","count":2}""", JsonValueKind.Object)]
    [TestCase("[1,\"two\"]", JsonValueKind.Array)]
    public void SetThenGet_ExtensionSetting_StoresJsonAndRoundTripsType(
        string json,
        JsonValueKind expectedKind
    )
    {
        var value = JsonSerializer.Deserialize<JsonElement>(json);

        Assert.That(_provider.SetProjectSetting(ExtensionSettingName, value), Is.True);
        Assert.That(GetRawSetting(ExtensionSettingName), Is.EqualTo(json));

        AssertJson(_provider.GetProjectSetting(ExtensionSettingName), expectedKind, json);
    }

    [Test]
    public void SetThenGet_ExtensionSettingNativeBool_StoresJsonBoolean()
    {
        Assert.That(_provider.SetProjectSetting(ExtensionSettingName, true), Is.True);
        Assert.That(GetRawSetting(ExtensionSettingName), Is.EqualTo("true"));

        AssertJson(_provider.GetProjectSetting(ExtensionSettingName), JsonValueKind.True, "true");
    }

    // A string that looks like a Paratext boolean must not turn into a bool.
    [TestCase("T")]
    [TestCase("true")]
    [TestCase("123")]
    public void SetThenGet_ExtensionSettingStringResemblingOtherType_ComesBackAsString(
        string stringValue
    )
    {
        var value = JsonSerializer.SerializeToElement(stringValue);

        Assert.That(_provider.SetProjectSetting(ExtensionSettingName, value), Is.True);
        Assert.That(GetRawSetting(ExtensionSettingName), Is.EqualTo($"\"{stringValue}\""));

        var result = _provider.GetProjectSetting(ExtensionSettingName);
        AssertJson(result, JsonValueKind.String, $"\"{stringValue}\"");
        Assert.That(((JsonElement)result!).GetString(), Is.EqualTo(stringValue));
    }

    // Values stored before unmapped settings were written as JSON: ones that parse as JSON take
    // that type, and anything else comes back as the raw string.
    [TestCase("Black")]
    [TestCase("True")]
    [TestCase("F")]
    [TestCase("")]
    public void GetProjectSetting_LegacyValueNotJson_ReturnsRawString(string storedValue)
    {
        SetRawSetting(ExtensionSettingName, storedValue);

        var result = _provider.GetProjectSetting(ExtensionSettingName);

        Assert.That(result, Is.TypeOf<string>());
        Assert.That(result, Is.EqualTo(storedValue));
    }

    [TestCase("15", JsonValueKind.Number)]
    [TestCase("""{"approach":""}""", JsonValueKind.Object)]
    public void GetProjectSetting_LegacyValueThatIsJson_ReturnsParsedValue(
        string storedValue,
        JsonValueKind expectedKind
    )
    {
        SetRawSetting(ExtensionSettingName, storedValue);

        AssertJson(_provider.GetProjectSetting(ExtensionSettingName), expectedKind, storedValue);
    }

    [Test]
    public void SetProjectSetting_LegacyValue_IsRewrittenAsJson()
    {
        SetRawSetting(ExtensionSettingName, "Black");

        Assert.That(
            _provider.SetProjectSetting(
                ExtensionSettingName,
                JsonSerializer.SerializeToElement("White")
            ),
            Is.True
        );

        Assert.That(GetRawSetting(ExtensionSettingName), Is.EqualTo("\"White\""));
    }

    // The platform-scripture inventories store space-separated items in these unmapped settings,
    // and existing projects hold them in the raw-string format.
    [TestCase("platformScripture.validMarkers", "c v p q1 s")]
    [TestCase("platformScripture.invalidMarkers", "zz xyz")]
    [TestCase("platformScripture.validPunctuation", ". , ; : ! ? « »")]
    [TestCase("platformScripture.invalidPunctuation", "\" ' |")]
    public void GetProjectSetting_LegacyInventoryString_ReturnsUnchanged(
        string settingName,
        string storedValue
    )
    {
        SetRawSetting(settingName, storedValue);

        var result = _provider.GetProjectSetting(settingName);

        Assert.That(result, Is.TypeOf<string>());
        Assert.That(result, Is.EqualTo(storedValue));
    }

    [TestCase("platformScripture.validMarkers", "c v p q1 s")]
    [TestCase("platformScripture.validPunctuation", ". , ; : ! ? « » \"")]
    public void SetThenGet_InventoryString_RoundTripsUnchanged(string settingName, string items)
    {
        Assert.That(
            _provider.SetProjectSetting(settingName, JsonSerializer.SerializeToElement(items)),
            Is.True
        );

        var result = _provider.GetProjectSetting(settingName);

        Assert.That(result, Is.TypeOf<JsonElement>());
        Assert.That(((JsonElement)result!).GetString(), Is.EqualTo(items));
    }

    // Mapped settings are read by ParatextData and Paratext 9, so they keep Paratext's format.
    [TestCase(true, "T")]
    [TestCase(false, "F")]
    public void SetThenGet_MappedParatextBoolean_StoresTOrFAndReadsBackAsBool(
        bool value,
        string expectedStored
    )
    {
        var element = JsonSerializer.SerializeToElement(value);

        Assert.That(
            _provider.SetProjectSetting(
                ProjectSettingsNames.PB_ALLOW_INVISIBLE_CHARACTERS,
                element
            ),
            Is.True
        );
        Assert.That(
            GetRawSetting(ProjectSettingsNames.PT_ALLOW_INVISIBLE_CHARACTERS),
            Is.EqualTo(expectedStored)
        );

        var result = _provider.GetProjectSetting(
            ProjectSettingsNames.PB_ALLOW_INVISIBLE_CHARACTERS
        );
        Assert.That(result, Is.TypeOf<bool>());
        Assert.That(result, Is.EqualTo(value));
    }

    [Test]
    public void SetThenGet_MappedStringSetting_StoresRawString()
    {
        Assert.That(
            _provider.SetProjectSetting(
                ProjectSettingsNames.PB_VALID_CHARACTERS,
                JsonSerializer.SerializeToElement("a b c")
            ),
            Is.True
        );
        Assert.That(GetRawSetting(ProjectSettingsNames.PT_VALID_CHARACTERS), Is.EqualTo("a b c"));

        var result = _provider.GetProjectSetting(ProjectSettingsNames.PB_VALID_CHARACTERS);
        Assert.That(result, Is.TypeOf<string>());
        Assert.That(result, Is.EqualTo("a b c"));
    }

    // ResetProjectSetting feeds GetDefault's JsonElement straight back into SetProjectSetting.
    [Test]
    public async Task ResetThenGet_ExtensionSetting_ReturnsDefaultWithItsType()
    {
        await Client.RegisterRequestHandlerAsync(
            "object:ProjectSettingsService.getDefault",
            new Func<string, object?>(key =>
                key == ExtensionSettingName ? JsonSerializer.SerializeToElement(true) : null
            ),
            null
        );
        SetRawSetting(ExtensionSettingName, "false");

        Assert.That(_provider.ResetProjectSetting(ExtensionSettingName), Is.True);
        Assert.That(GetRawSetting(ExtensionSettingName), Is.EqualTo("true"));

        AssertJson(_provider.GetProjectSetting(ExtensionSettingName), JsonValueKind.True, "true");
    }
}
