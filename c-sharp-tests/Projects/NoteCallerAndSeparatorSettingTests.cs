using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Services;

namespace TestParanextDataProvider.Projects;

/// <summary>
/// Integration tests for the <c>GetProjectSetting</c> logic that handles the four Paratext
/// note-caller/separator settings added in Task 12:
///
/// <list type="bullet">
/// <item>
/// <c>platformScripture.chapterVerseSeparator</c> ↔ Settings.xml <c>ChapterVerseSeparator</c>
/// (registered default <c>.</c>)
/// </item>
/// <item>
/// <c>platformScripture.verseRangeSeparator</c> ↔ Settings.xml <c>RangeIndicator</c> (registered
/// default <c>-</c>)
/// </item>
/// <item>
/// <c>platformScripture.defaultFootnoteCaller</c> ↔ Settings.xml <c>DefaultFootnoteCaller</c>
/// (registered default <c>+</c>)
/// </item>
/// <item>
/// <c>platformScripture.defaultCrossRefCaller</c> ↔ Settings.xml <c>DefaultCrossRefCaller</c>
/// (registered default <c>-</c>)
/// </item>
/// </list>
///
/// All four are plain strings read through the generic <c>ParametersDictionary</c> fall-through in
/// <c>ParatextProjectDataProvider.GetProjectSetting</c> — no dedicated per-setting branch was added
/// for them, so these tests exercise the shared fall-through/registered-default plumbing rather than
/// any new production code path.
/// </summary>
[ExcludeFromCodeCoverage]
[TestFixture]
internal class NoteCallerAndSeparatorSettingTests : PapiTestBase
{
    private const string PdpName = "noteCallerAndSeparatorSettingTestProject";

    private DummyScrText _scrText = null!;
    private ProjectDetails _projectDetails = null!;
    private DummyParatextProjectDataProvider _provider = null!;

    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();

        // Register a stub for ProjectSettingsService.getDefault that returns the registered
        // default for each of the four settings under test, keyed by Platform.Bible setting name
        // (GetProjectSetting's fall-through calls ProjectSettingsService.GetDefault(PapiClient,
        // settingName) using the PB name, not the Paratext name).
        await Client.RegisterRequestHandlerAsync(
            "object:ProjectSettingsService.getDefault",
            new Func<string, object?>(
                (settingName) =>
                    settingName switch
                    {
                        ProjectSettingsNames.PB_CHAPTER_VERSE_SEPARATOR => ".",
                        ProjectSettingsNames.PB_VERSE_RANGE_SEPARATOR => "-",
                        ProjectSettingsNames.PB_DEFAULT_FOOTNOTE_CALLER => "+",
                        ProjectSettingsNames.PB_DEFAULT_CROSS_REF_CALLER => "-",
                        _ => throw new InvalidOperationException(
                            $"Unexpected getDefault request for '{settingName}' in this test"
                        ),
                    }
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

    /// <summary>
    /// Directly writes a raw string value into the project's ParametersDictionary so that
    /// GetProjectSetting reads whatever we put there, without going through SetProjectSetting.
    /// </summary>
    private void SetRawSetting(string ptSettingName, string rawValue)
    {
        _scrText.Settings.ParametersDictionary[ptSettingName] = rawValue;
    }

    #region GetProjectSetting — value present in Settings.xml

    [TestCase(ProjectSettingsNames.PB_CHAPTER_VERSE_SEPARATOR, "!")]
    [TestCase(ProjectSettingsNames.PB_VERSE_RANGE_SEPARATOR, "–")]
    [TestCase(ProjectSettingsNames.PB_DEFAULT_FOOTNOTE_CALLER, "*")]
    [TestCase(ProjectSettingsNames.PB_DEFAULT_CROSS_REF_CALLER, "#")]
    public void GetProjectSetting_ValuePresentInSettingsXml_ReturnsStoredValue(
        string pbSettingName,
        string storedValue
    )
    {
        string ptSettingName =
            ProjectSettingsNames.GetParatextSettingNameFromPlatformBibleSettingName(pbSettingName)!;
        SetRawSetting(ptSettingName, storedValue);

        var result = _provider.GetProjectSetting(pbSettingName);

        Assert.That(result, Is.EqualTo(storedValue));
    }

    #endregion

    #region GetProjectSetting — setting absent, falls back to registered default

    [TestCase(ProjectSettingsNames.PB_CHAPTER_VERSE_SEPARATOR, ".")]
    [TestCase(ProjectSettingsNames.PB_VERSE_RANGE_SEPARATOR, "-")]
    [TestCase(ProjectSettingsNames.PB_DEFAULT_FOOTNOTE_CALLER, "+")]
    [TestCase(ProjectSettingsNames.PB_DEFAULT_CROSS_REF_CALLER, "-")]
    public void GetProjectSetting_SettingAbsentFromSettingsXml_ReturnsRegisteredDefault(
        string pbSettingName,
        string registeredDefault
    )
    {
        // Nothing written into ParametersDictionary for this setting, so GetProjectSetting must
        // fall through to ProjectSettingsService.GetDefault (stubbed above).
        var result = _provider.GetProjectSetting(pbSettingName);

        Assert.That(result, Is.EqualTo(registeredDefault));
    }

    #endregion

    #region Name mapping sanity

    [TestCase(ProjectSettingsNames.PB_CHAPTER_VERSE_SEPARATOR, "ChapterVerseSeparator")]
    [TestCase(ProjectSettingsNames.PB_VERSE_RANGE_SEPARATOR, "RangeIndicator")]
    [TestCase(ProjectSettingsNames.PB_DEFAULT_FOOTNOTE_CALLER, "DefaultFootnoteCaller")]
    [TestCase(ProjectSettingsNames.PB_DEFAULT_CROSS_REF_CALLER, "DefaultCrossRefCaller")]
    public void GetParatextSettingNameFromPlatformBibleSettingName_MapsToExpectedParatextTag(
        string pbSettingName,
        string expectedParatextSettingName
    )
    {
        string? ptSettingName =
            ProjectSettingsNames.GetParatextSettingNameFromPlatformBibleSettingName(pbSettingName);

        Assert.That(ptSettingName, Is.EqualTo(expectedParatextSettingName));
    }

    #endregion
}
