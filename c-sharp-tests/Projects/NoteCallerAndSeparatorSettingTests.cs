using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Services;

namespace TestParanextDataProvider.Projects;

/// <summary>
/// Integration tests for the <c>GetProjectSetting</c> logic that handles these four Paratext
/// note-caller/separator settings:
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
/// "Registered default" above means the Platform.Bible default registered via the
/// platform-scripture extension's projectSettings.json. For the two separators those values do
/// match ParatextData's own source-level fallbacks (ProjectSettings.ChapterVerseSeparator "." and
/// VerseRangeSeparator "-"). For the two callers, however, ParatextData's own GetSetting fallback
/// is the empty string — the registered "+"/"-" defaults were chosen to match conventional
/// Paratext usage and the editor's prior hard-coded fallbacks, not taken from ParatextData source.
///
/// All four are plain strings read through the generic <c>ParametersDictionary</c> fall-through in
/// <c>ParatextProjectDataProvider.GetProjectSetting</c> — no dedicated per-setting branch was added
/// for them, so these tests exercise the shared fall-through/registered-default plumbing rather than
/// any new production code path.
///
/// Also covers the two LANGUAGE-backed caller-SEQUENCE settings
/// (<c>platformScripture.footnoteCallers</c> / <c>platformScripture.crossRefCallers</c>), which
/// unlike the four above are NOT Settings.xml tags: they resolve from the project language's
/// writing-system character sets (<c>ScrLanguage.FootnoteCallers</c> /
/// <c>CrossReferenceCallers</c>) through a dedicated branch in <c>GetProjectSetting</c>, returned
/// verbatim (possibly "") without consulting <c>ProjectSettingsService.GetDefault</c>.
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

        // Register a stub for ProjectSettingsService.getDefault that returns the platform's
        // registered default (from projectSettings.json) for each of the four settings under
        // test, keyed by Platform.Bible setting name (GetProjectSetting's fall-through calls
        // ProjectSettingsService.GetDefault(PapiClient, settingName) using the PB name, not the
        // Paratext name). Note the "+"/"-" caller defaults are the platform's choice (conventional
        // Paratext usage / prior editor fallbacks) — ParatextData's own fallback for them is "".
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

    // The Settings.xml tag is HARD-CODED per case, never derived through
    // GetParatextSettingNameFromPlatformBibleSettingName: deriving it from the very mapping under
    // test made the four cases unfalsifiable — mapping PT_VERSE_RANGE_SEPARATOR to the wrong tag
    // (the exact PT9-name confusion the constant's own doc comment warns about, RangeIndicator
    // vs a plausible "VerseRangeSeparator") kept everything green. These literals are the wire
    // contract with Paratext 9's Settings.xml.
    [TestCase(ProjectSettingsNames.PB_CHAPTER_VERSE_SEPARATOR, "ChapterVerseSeparator", "!")]
    [TestCase(ProjectSettingsNames.PB_VERSE_RANGE_SEPARATOR, "RangeIndicator", "–")]
    [TestCase(ProjectSettingsNames.PB_DEFAULT_FOOTNOTE_CALLER, "DefaultFootnoteCaller", "*")]
    [TestCase(ProjectSettingsNames.PB_DEFAULT_CROSS_REF_CALLER, "DefaultCrossRefCaller", "#")]
    public void GetProjectSetting_ValuePresentInSettingsXml_ReturnsStoredValue(
        string pbSettingName,
        string ptSettingsXmlTag,
        string storedValue
    )
    {
        Assert.That(
            ProjectSettingsNames.GetParatextSettingNameFromPlatformBibleSettingName(pbSettingName),
            Is.EqualTo(ptSettingsXmlTag),
            "The PB->PT setting-name mapping must resolve to the hard-coded Settings.xml tag."
        );
        SetRawSetting(ptSettingsXmlTag, storedValue);

        var result = _provider.GetProjectSetting(pbSettingName);

        Assert.That(result, Is.EqualTo(storedValue));
    }

    #endregion

    #region GetProjectSetting — setting absent, falls through to ProjectSettingsService.GetDefault

    [TestCase(ProjectSettingsNames.PB_CHAPTER_VERSE_SEPARATOR, ".")]
    [TestCase(ProjectSettingsNames.PB_VERSE_RANGE_SEPARATOR, "-")]
    [TestCase(ProjectSettingsNames.PB_DEFAULT_FOOTNOTE_CALLER, "+")]
    [TestCase(ProjectSettingsNames.PB_DEFAULT_CROSS_REF_CALLER, "-")]
    public void GetProjectSetting_SettingAbsentFromSettingsXml_FallsThroughToGetDefaultStub(
        string pbSettingName,
        string stubbedDefault
    )
    {
        // Nothing written into ParametersDictionary for this setting, so GetProjectSetting must
        // fall through to ProjectSettingsService.GetDefault (stubbed in setup). This verifies the
        // fall-through wiring only — the expected values are the stub's return values, so this
        // says nothing about what defaults are actually registered. The contribution test below
        // pins the stubbed values to the real projectSettings.json registration.
        var result = _provider.GetProjectSetting(pbSettingName);

        Assert.That(result, Is.EqualTo(stubbedDefault));
    }

    #endregion

    #region Registered defaults in the platform-scripture contribution

    /// <summary>
    /// Path of the platform-scripture projectSettings.json contribution — the file the real
    /// (non-stubbed) ProjectSettingsService.GetDefault serves defaults from — resolved by
    /// walking up from the test assembly's directory (tests always run from a bin folder
    /// inside the repo, so some ancestor is the repo root).
    /// </summary>
    private static string GetPlatformScriptureProjectSettingsPath()
    {
        string relativePath = Path.Combine(
            "extensions",
            "src",
            "platform-scripture",
            "contributions",
            "projectSettings.json"
        );
        for (DirectoryInfo? dir = new(AppContext.BaseDirectory); dir != null; dir = dir.Parent)
        {
            string candidate = Path.Combine(dir.FullName, relativePath);
            if (File.Exists(candidate))
                return candidate;
        }
        throw new FileNotFoundException(
            $"Could not find {relativePath} in any ancestor of {AppContext.BaseDirectory}"
        );
    }

    [TestCase(ProjectSettingsNames.PB_CHAPTER_VERSE_SEPARATOR, ".")]
    [TestCase(ProjectSettingsNames.PB_VERSE_RANGE_SEPARATOR, "-")]
    [TestCase(ProjectSettingsNames.PB_DEFAULT_FOOTNOTE_CALLER, "+")]
    [TestCase(ProjectSettingsNames.PB_DEFAULT_CROSS_REF_CALLER, "-")]
    // The caller-sequence defaults are "" — "no sequence defined in the language" — so consumers
    // apply PT9's own fallbacks (a-z for footnotes, "†" for cross-references) rather than a
    // registered literal.
    [TestCase(ProjectSettingsNames.PB_FOOTNOTE_CALLERS, "")]
    [TestCase(ProjectSettingsNames.PB_CROSS_REF_CALLERS, "")]
    public void PlatformScriptureContribution_RegisteredDefault_IsExpectedLiteral(
        string pbSettingName,
        string expectedDefault
    )
    {
        using var json = JsonDocument.Parse(
            File.ReadAllText(GetPlatformScriptureProjectSettingsPath())
        );

        string? registeredDefault = json
            .RootElement.EnumerateArray()
            .Select(group =>
                group.TryGetProperty("properties", out var properties)
                && properties.TryGetProperty(pbSettingName, out var setting)
                    ? setting.GetProperty("default").GetString()
                    : null
            )
            .SingleOrDefault(value => value != null);

        Assert.That(registeredDefault, Is.EqualTo(expectedDefault));
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

    #region Language-backed caller sequences

    [Test]
    [Description(
        "The caller-sequence settings resolve from the project LANGUAGE's writing-system"
            + " character sets (ScrLanguage.FootnoteCallers / CrossReferenceCallers), the same"
            + " accessors PT9's Standard view reads (ViewUsfmXhtmlConverter passes them to its"
            + " renderer), returned verbatim as space-separated strings."
    )]
    public void GetProjectSetting_CallerSequences_ResolveFromScrLanguageCharacterSets()
    {
        _scrText.Language.FootnoteCallers = "๑ ๒ ๓";
        _scrText.Language.CrossReferenceCallers = "* † ‡";

        Assert.Multiple(() =>
        {
            Assert.That(
                _provider.GetProjectSetting(ProjectSettingsNames.PB_FOOTNOTE_CALLERS),
                Is.EqualTo("๑ ๒ ๓")
            );
            Assert.That(
                _provider.GetProjectSetting(ProjectSettingsNames.PB_CROSS_REF_CALLERS),
                Is.EqualTo("* † ‡")
            );
        });
    }

    [Test]
    [Description(
        "A language that defines no caller sequence yields \"\" VERBATIM — the value is served"
            + " from ScrLanguage, never falling through to ProjectSettingsService.GetDefault (the"
            + " getDefault stub registered in setup throws for these names, so an accidental"
            + " fall-through fails loudly, not silently)."
    )]
    public void GetProjectSetting_CallerSequencesUnset_ReturnEmptyStringVerbatim()
    {
        Assert.Multiple(() =>
        {
            Assert.That(
                _provider.GetProjectSetting(ProjectSettingsNames.PB_FOOTNOTE_CALLERS),
                Is.EqualTo("")
            );
            Assert.That(
                _provider.GetProjectSetting(ProjectSettingsNames.PB_CROSS_REF_CALLERS),
                Is.EqualTo("")
            );
        });
    }

    [Test]
    [Description(
        "Unlike the four Settings.xml-backed settings above, the caller sequences are"
            + " LANGUAGE-backed and intentionally have NO Paratext Settings.xml tag mapping."
    )]
    public void GetParatextSettingNameFromPlatformBibleSettingName_CallerSequences_HaveNoMapping()
    {
        Assert.Multiple(() =>
        {
            Assert.That(
                ProjectSettingsNames.GetParatextSettingNameFromPlatformBibleSettingName(
                    ProjectSettingsNames.PB_FOOTNOTE_CALLERS
                ),
                Is.Null
            );
            Assert.That(
                ProjectSettingsNames.GetParatextSettingNameFromPlatformBibleSettingName(
                    ProjectSettingsNames.PB_CROSS_REF_CALLERS
                ),
                Is.Null
            );
        });
    }

    #endregion
}
