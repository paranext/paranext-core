using Paranext.DataProvider.CreatingProjects;
using Paratext.Data;

namespace TestParanextDataProvider.CreatingProjects;

/// <summary>
/// Tests for LanguageService: ValidateLanguageSelection (CAP-010) and
/// GetAvailableLanguages (CAP-011).
/// RED phase -- these tests will fail until the service is implemented.
/// </summary>
[TestFixture]
public class LanguageServiceTests
{
    [SetUp]
    public void SetUp()
    {
        var details = new Paranext.DataProvider.Projects.ProjectDetails(
            "LangTestProject",
            new Paranext.DataProvider.Projects.ProjectMetadata(
                HexId.CreateNew().ToString(),
                new List<string>()
            ),
            FixtureSetup.TestFolderPath
        );
        var dummyProjects = new DummyLocalParatextProjects();
        var scrText = new DummyScrText(details);
        scrText.Settings.LanguageName = "Existing Language";
        ScrTextCollection.Add(scrText, true);
    }

    [TearDown]
    public void TearDown()
    {
        foreach (
            ScrText project in ScrTextCollection
                .ScrTexts(IncludeProjects.Everything)
                .ToList()
        )
            ScrTextCollection.Remove(project, false);
    }
    // =========================================================================
    // CAP-010: ValidateLanguageSelection - Acceptance Test
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "gm-006")]
    [Property("BehaviorId", "BHV-032")]
    [Description("Acceptance test: Language validation rules produce correct results")]
    public void ValidateLanguageSelection_AllGoldenMasterCases_MatchExpected()
    {
        // Valid selections
        Assert.That(LanguageService.ValidateLanguageSelection("eng", "English").IsValid, Is.True);
        Assert.That(LanguageService.ValidateLanguageSelection("spa", "Spanish").IsValid, Is.True);

        // Blank name
        var blank = LanguageService.ValidateLanguageSelection("eng", "");
        Assert.That(blank.IsValid, Is.False);
        Assert.That(blank.ErrorCode, Is.EqualTo("LANGUAGE_NAME_BLANK"));

        // Invalid variant
        var variant = LanguageService.ValidateLanguageSelection("eng-x-ABC!", "English");
        Assert.That(variant.IsValid, Is.False);
        Assert.That(variant.ErrorCode, Is.EqualTo("LANGUAGE_VARIANT_INVALID"));

        // Reserved name
        var reserved = LanguageService.ValidateLanguageSelection("CON", "Test");
        Assert.That(reserved.IsValid, Is.False);
        Assert.That(reserved.ErrorCode, Is.EqualTo("LANGUAGE_ID_RESERVED"));
    }

    // =========================================================================
    // CAP-010: ValidateLanguageSelection - Contract Tests
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-010-01")]
    [Property("BehaviorId", "BHV-032")]
    [Description("Valid language ID and name passes validation")]
    public void ValidateLanguageSelection_ValidInput_IsValid()
    {
        var result = LanguageService.ValidateLanguageSelection("eng", "English");
        Assert.That(result.IsValid, Is.True);
        Assert.That(result.ErrorCode, Is.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-010-02")]
    [Property("BehaviorId", "BHV-032")]
    [Description("Blank language name returns LANGUAGE_NAME_BLANK")]
    public void ValidateLanguageSelection_BlankName_ReturnsError()
    {
        var result = LanguageService.ValidateLanguageSelection("eng", "");
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("LANGUAGE_NAME_BLANK"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-010-03")]
    [Property("BehaviorId", "BHV-032")]
    [Description("Duplicate language name returns LANGUAGE_NAME_EXISTS")]
    public void ValidateLanguageSelection_DuplicateName_ReturnsError()
    {
        // Precondition: a project with language name "Existing Language" exists
        var result = LanguageService.ValidateLanguageSelection("eng", "Existing Language");
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("LANGUAGE_NAME_EXISTS"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-010-04")]
    [Property("BehaviorId", "BHV-032")]
    [Description("Invalid variant characters return LANGUAGE_VARIANT_INVALID")]
    public void ValidateLanguageSelection_InvalidVariantChars_ReturnsError()
    {
        var result = LanguageService.ValidateLanguageSelection("eng-x-ABC!", "English");
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("LANGUAGE_VARIANT_INVALID"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-010-05")]
    [Property("BehaviorId", "BHV-032")]
    [Description("Reserved Windows filename as language ID returns LANGUAGE_ID_RESERVED")]
    public void ValidateLanguageSelection_ReservedFilename_ReturnsError()
    {
        var result = LanguageService.ValidateLanguageSelection("CON", "Test");
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("LANGUAGE_ID_RESERVED"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-010-06")]
    [Property("BehaviorId", "BHV-032")]
    [Description("Same name as initial during edit is allowed")]
    public void ValidateLanguageSelection_SameAsInitial_IsValid()
    {
        var result = LanguageService.ValidateLanguageSelection("eng", "English", "English");
        Assert.That(result.IsValid, Is.True);
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "gm-006")]
    [Property("BehaviorId", "BHV-032")]
    [Description("Golden master: valid language selections")]
    [TestCase("eng", "English", true)]
    [TestCase("spa", "Spanish", true)]
    public void ValidateLanguageSelection_GoldenMaster_ValidCases(
        string languageId,
        string languageName,
        bool expectedValid
    )
    {
        var result = LanguageService.ValidateLanguageSelection(languageId, languageName);
        Assert.That(result.IsValid, Is.EqualTo(expectedValid));
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "gm-006")]
    [Property("BehaviorId", "BHV-032")]
    [Description("Golden master: invalid language selections")]
    [TestCase("eng", "", "LANGUAGE_NAME_BLANK")]
    [TestCase("eng-x-ABC!", "English", "LANGUAGE_VARIANT_INVALID")]
    [TestCase("CON", "Test", "LANGUAGE_ID_RESERVED")]
    public void ValidateLanguageSelection_GoldenMaster_InvalidCases(
        string languageId,
        string languageName,
        string expectedErrorCode
    )
    {
        var result = LanguageService.ValidateLanguageSelection(languageId, languageName);
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo(expectedErrorCode));
    }

    // =========================================================================
    // CAP-011: GetAvailableLanguages - Acceptance Test
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-011-acceptance")]
    [Property("BehaviorId", "BHV-009")]
    [Description("Acceptance test: GetAvailableLanguages returns BCP-47 formatted language list")]
    public void GetAvailableLanguages_NoFilter_ReturnsLanguageList()
    {
        var result = LanguageService.GetAvailableLanguages();

        Assert.That(result, Is.Not.Null);
        Assert.That(result, Is.InstanceOf<LanguageSearchResult>());
        Assert.That(result.Languages, Is.Not.Empty);
        Assert.That(result.TotalCount, Is.GreaterThan(0));
    }

    // =========================================================================
    // CAP-011: GetAvailableLanguages - Contract Tests
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-011-01")]
    [Property("BehaviorId", "BHV-009")]
    [Description("Returns non-empty list with well-formed LanguageSelection records")]
    public void GetAvailableLanguages_ReturnsWellFormedRecords()
    {
        var result = LanguageService.GetAvailableLanguages();

        Assert.That(result.Languages, Is.Not.Empty);
        var first = result.Languages[0];
        Assert.That(first.LanguageId, Is.Not.Null.And.Not.Empty);
        Assert.That(first.LanguageName, Is.Not.Null.And.Not.Empty);
        Assert.That(first.BaseCode, Is.Not.Null.And.Not.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-011-02")]
    [Property("BehaviorId", "BHV-009")]
    [Description("Search filter narrows results")]
    public void GetAvailableLanguages_WithSearchFilter_ReturnsFilteredResults()
    {
        var all = LanguageService.GetAvailableLanguages();
        var filtered = LanguageService.GetAvailableLanguages("eng");

        Assert.That(filtered, Is.Not.Null);
        // Filtered should be a subset (or equal if all match)
        Assert.That(filtered.TotalCount, Is.LessThanOrEqualTo(all.TotalCount));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-011-03")]
    [Property("BehaviorId", "BHV-009")]
    [Description("Null search returns same as no filter")]
    public void GetAvailableLanguages_NullSearch_ReturnsSameAsNoFilter()
    {
        var noFilter = LanguageService.GetAvailableLanguages();
        var nullFilter = LanguageService.GetAvailableLanguages(null);

        Assert.That(nullFilter.TotalCount, Is.EqualTo(noFilter.TotalCount));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-011-04")]
    [Property("BehaviorId", "BHV-009")]
    [Description("MaxResults limits returned languages and sets HasMore")]
    public void GetAvailableLanguages_WithMaxResults_LimitsResults()
    {
        var limited = LanguageService.GetAvailableLanguages(null, 5);

        Assert.That(limited.Languages.Count, Is.LessThanOrEqualTo(5));
        if (limited.TotalCount > 5)
        {
            Assert.That(limited.HasMore, Is.True);
            Assert.That(limited.Languages.Count, Is.EqualTo(5));
        }
    }
}
