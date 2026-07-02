using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Services;

namespace TestParanextDataProvider.Projects;

/// <summary>
/// Integration tests for the GetProjectSetting / SetProjectSetting logic that handles the
/// <c>platformScripture.sharedLayoutActiveTab</c> setting — a plain string stored directly
/// in Settings.xml under <c>SharedLayoutActiveTab</c>.
/// </summary>
[ExcludeFromCodeCoverage]
[TestFixture]
internal class SharedLayoutActiveTabSettingTests : PapiTestBase
{
    private const string PdpName = "sharedLayoutActiveTabTestProject";
    private const string PbSettingName = ProjectSettingsNames.PB_SHARED_LAYOUT_ACTIVE_TAB;
    private const string PtSettingName = ProjectSettingsNames.PT_SHARED_LAYOUT_ACTIVE_TAB;

    private DummyScrText _scrText = null!;
    private ProjectDetails _projectDetails = null!;
    private DummyParatextProjectDataProvider _provider = null!;

    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();

        await Client.RegisterRequestHandlerAsync(
            "object:ProjectSettingsService.isValid",
            new Func<string, object?, object?, object?, bool>(
                (key, newValue, currentValue, allChanges) => true
            ),
            null
        );

        // Return the declared default ("") for this setting when it is absent.
        await Client.RegisterRequestHandlerAsync(
            "object:ProjectSettingsService.getDefault",
            new Func<string, object?>(key => (object?)""),
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
    // GetProjectSetting tests
    // ------------------------------------------------------------------

    [Test]
    public void GetProjectSetting_SettingAbsent_ReturnsEmptyString()
    {
        var result = _provider.GetProjectSetting(PbSettingName);

        Assert.That(result, Is.EqualTo(""));
    }

    [Test]
    public void GetProjectSetting_SettingPresent_ReturnsStoredValue()
    {
        _scrText.Settings.ParametersDictionary[PtSettingName] = "ScriptureResource";

        var result = _provider.GetProjectSetting(PbSettingName);

        Assert.That(result, Is.EqualTo("ScriptureResource"));
    }

    // ------------------------------------------------------------------
    // SetProjectSetting tests
    // ------------------------------------------------------------------

    [Test]
    public void SetThenGetProjectSetting_RoundTripsValue()
    {
        _provider.SetProjectSetting(PbSettingName, "CommentaryResource");
        var result = _provider.GetProjectSetting(PbSettingName);

        Assert.That(result, Is.EqualTo("CommentaryResource"));
    }

    [Test]
    public void SetProjectSetting_StoresValueUnderParatextKey()
    {
        _provider.SetProjectSetting(PbSettingName, "ScriptureResource");

        Assert.That(
            _scrText.Settings.ParametersDictionary.TryGetValue(PtSettingName, out var stored)
                && stored == "ScriptureResource",
            Is.True
        );
    }
}
