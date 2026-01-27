using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ProjectCreation;

namespace TestParanextDataProvider.ProjectCreation;

/// <summary>
/// Tests for LanguageService covering CAP-008.
/// These tests verify language selection validation including name uniqueness,
/// variant character validation, and reserved filename checks.
///
/// Validation Rules (from data-contracts.md):
/// - VAL-010: Language name cannot be blank
/// - VAL-011: Language name must be unique across projects (except edit mode)
/// - VAL-012: Variant characters must be a-z or 0-9 only
/// - VAL-013: Final language ID cannot be Windows reserved filename
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class LanguageServiceTests
{
    #region CAP-008: ValidateLanguageSelection - Acceptance Test

    /// <summary>
    /// Acceptance test for CAP-008: ValidateLanguageSelection.
    /// Given a language ID, language name, and optional initial name,
    /// returns ValidationResult with IsValid=true or appropriate error code.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-021")]
    [Property("BehaviorId", "BHV-009")]
    [Property("BehaviorId", "BHV-032")]
    [Description("Acceptance test: ValidateLanguageSelection returns correct validation for any language input")]
    public void ValidateLanguageSelection_AcceptanceTest()
    {
        // This test passes when the capability is COMPLETE
        // It calls the public API and verifies the expected outcome for valid language

        // Act - Call the service method that will be implemented
        var result = LanguageService.ValidateLanguageSelection(
            languageId: "eng",
            languageName: "English",
            initialLanguageName: null);

        // Assert - Verify all properties are correctly set for valid input
        Assert.That(result, Is.Not.Null, "Validation result should not be null");
        Assert.That(result.IsValid, Is.True, "Valid language should pass validation");
        Assert.That(result.ErrorCode, Is.Null, "No error code for valid input");
        Assert.That(result.ErrorParams, Is.Null, "No error params for valid input");
    }

    #endregion

    #region CAP-008: ValidateLanguageSelection - Contract Tests (Valid Input)

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-021")]
    [Property("BehaviorId", "BHV-009")]
    [Description("Valid language ID and name returns IsValid=true")]
    public void ValidateLanguageSelection_ValidLanguage_ReturnsValid()
    {
        var result = LanguageService.ValidateLanguageSelection(
            languageId: "eng",
            languageName: "English",
            initialLanguageName: null);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.True);
            Assert.That(result.ErrorCode, Is.Null);
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-021")]
    [Property("BehaviorId", "BHV-009")]
    [Description("Spanish language selection is valid")]
    public void ValidateLanguageSelection_Spanish_ReturnsValid()
    {
        var result = LanguageService.ValidateLanguageSelection(
            languageId: "spa",
            languageName: "Spanish",
            initialLanguageName: null);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.True);
            Assert.That(result.ErrorCode, Is.Null);
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-021")]
    [Property("BehaviorId", "BHV-009")]
    [Description("Language with valid variant tag is valid")]
    public void ValidateLanguageSelection_ValidVariant_ReturnsValid()
    {
        var result = LanguageService.ValidateLanguageSelection(
            languageId: "eng-x-special1",
            languageName: "English Special",
            initialLanguageName: null);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.True);
            Assert.That(result.ErrorCode, Is.Null);
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-021")]
    [Property("BehaviorId", "BHV-009")]
    [Description("BCP-47 language tag with script is valid")]
    public void ValidateLanguageSelection_WithScript_ReturnsValid()
    {
        var result = LanguageService.ValidateLanguageSelection(
            languageId: "zh-Hans",
            languageName: "Chinese Simplified",
            initialLanguageName: null);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.True);
            Assert.That(result.ErrorCode, Is.Null);
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-021")]
    [Property("BehaviorId", "BHV-009")]
    [Description("BCP-47 language tag with region is valid")]
    public void ValidateLanguageSelection_WithRegion_ReturnsValid()
    {
        var result = LanguageService.ValidateLanguageSelection(
            languageId: "en-US",
            languageName: "English (US)",
            initialLanguageName: null);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.True);
            Assert.That(result.ErrorCode, Is.Null);
        });
    }

    #endregion

    #region CAP-008: ValidateLanguageSelection - Contract Tests (VAL-010: Blank Name)

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-022")]
    [Property("BehaviorId", "BHV-032")]
    [Description("VAL-010: Empty language name returns LANGUAGE_NAME_BLANK error")]
    public void ValidateLanguageSelection_EmptyName_ReturnsBlankError()
    {
        var result = LanguageService.ValidateLanguageSelection(
            languageId: "eng",
            languageName: "",
            initialLanguageName: null);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo("LANGUAGE_NAME_BLANK"));
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-022")]
    [Property("BehaviorId", "BHV-032")]
    [Description("VAL-010: Whitespace-only language name returns LANGUAGE_NAME_BLANK error")]
    public void ValidateLanguageSelection_WhitespaceName_ReturnsBlankError()
    {
        var result = LanguageService.ValidateLanguageSelection(
            languageId: "eng",
            languageName: "   ",
            initialLanguageName: null);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo("LANGUAGE_NAME_BLANK"));
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-022")]
    [Property("BehaviorId", "BHV-032")]
    [Description("VAL-010: Null language name returns LANGUAGE_NAME_BLANK error")]
    public void ValidateLanguageSelection_NullName_ReturnsBlankError()
    {
        var result = LanguageService.ValidateLanguageSelection(
            languageId: "eng",
            languageName: null!,
            initialLanguageName: null);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo("LANGUAGE_NAME_BLANK"));
        });
    }

    #endregion

    #region CAP-008: ValidateLanguageSelection - Contract Tests (VAL-011: Name Uniqueness)

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-046")]
    [Property("BehaviorId", "BHV-032")]
    [Description("VAL-011: Duplicate language name returns LANGUAGE_NAME_EXISTS error")]
    public void ValidateLanguageSelection_DuplicateName_ReturnsExistsError()
    {
        // "Existing Language" is documented in gm-006 as an existing project's language
        var result = LanguageService.ValidateLanguageSelection(
            languageId: "eng",
            languageName: "Existing Language",
            initialLanguageName: null);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo("LANGUAGE_NAME_EXISTS"));
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-046")]
    [Property("BehaviorId", "BHV-032")]
    [Description("VAL-011: In edit mode, same name as original is allowed")]
    public void ValidateLanguageSelection_EditModeSameName_ReturnsValid()
    {
        // When editing an existing project, keeping the same language name is valid
        var result = LanguageService.ValidateLanguageSelection(
            languageId: "eng",
            languageName: "My Language",
            initialLanguageName: "My Language"); // Same as new name

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.True, "Same name should be allowed in edit mode");
            Assert.That(result.ErrorCode, Is.Null);
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-046")]
    [Property("BehaviorId", "BHV-032")]
    [Description("VAL-011: In edit mode, changing to a new unique name is allowed")]
    public void ValidateLanguageSelection_EditModeNewUniqueName_ReturnsValid()
    {
        var result = LanguageService.ValidateLanguageSelection(
            languageId: "eng",
            languageName: "New Unique Language Name",
            initialLanguageName: "Old Language Name");

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.True, "New unique name should be valid");
            Assert.That(result.ErrorCode, Is.Null);
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-046")]
    [Property("BehaviorId", "BHV-032")]
    [Description("VAL-011: In edit mode, changing to existing name returns error")]
    public void ValidateLanguageSelection_EditModeToExistingName_ReturnsExistsError()
    {
        // Changing from one name to another existing name should fail
        var result = LanguageService.ValidateLanguageSelection(
            languageId: "eng",
            languageName: "Existing Language",
            initialLanguageName: "Different Language");

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo("LANGUAGE_NAME_EXISTS"));
        });
    }

    #endregion

    #region CAP-008: ValidateLanguageSelection - Contract Tests (VAL-012: Variant Characters)

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-047")]
    [Property("BehaviorId", "BHV-032")]
    [Description("VAL-012: Invalid variant characters return LANGUAGE_VARIANT_INVALID error")]
    public void ValidateLanguageSelection_InvalidVariantChars_ReturnsVariantError()
    {
        // Variant with special character (!) is invalid per VAL-012
        var result = LanguageService.ValidateLanguageSelection(
            languageId: "eng-x-ABC!",
            languageName: "English",
            initialLanguageName: null);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo("LANGUAGE_VARIANT_INVALID"));
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-047")]
    [Property("BehaviorId", "BHV-032")]
    [Description("VAL-012: Variant with uppercase is valid (will be normalized)")]
    public void ValidateLanguageSelection_UppercaseVariant_ReturnsValid()
    {
        // Uppercase in variant should be normalized to lowercase
        var result = LanguageService.ValidateLanguageSelection(
            languageId: "eng-x-SPECIAL",
            languageName: "English Special",
            initialLanguageName: null);

        Assert.Multiple(() =>
        {
            // Uppercase letters are valid (a-z range includes normalized uppercase)
            Assert.That(result.IsValid, Is.True);
            Assert.That(result.ErrorCode, Is.Null);
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-047")]
    [Property("BehaviorId", "BHV-032")]
    [Description("VAL-012: Variant with numbers is valid")]
    public void ValidateLanguageSelection_VariantWithNumbers_ReturnsValid()
    {
        var result = LanguageService.ValidateLanguageSelection(
            languageId: "eng-x-variant123",
            languageName: "English Variant 123",
            initialLanguageName: null);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.True);
            Assert.That(result.ErrorCode, Is.Null);
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-047")]
    [Property("BehaviorId", "BHV-032")]
    [Description("VAL-012: Variant with spaces is invalid")]
    public void ValidateLanguageSelection_VariantWithSpaces_ReturnsVariantError()
    {
        var result = LanguageService.ValidateLanguageSelection(
            languageId: "eng-x-invalid variant",
            languageName: "English",
            initialLanguageName: null);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo("LANGUAGE_VARIANT_INVALID"));
        });
    }

    #endregion

    #region CAP-008: ValidateLanguageSelection - Contract Tests (VAL-013: Reserved Filenames)

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-048")]
    [Property("BehaviorId", "BHV-032")]
    [Description("VAL-013: CON as language ID returns LANGUAGE_ID_RESERVED error")]
    public void ValidateLanguageSelection_ReservedCON_ReturnsReservedError()
    {
        var result = LanguageService.ValidateLanguageSelection(
            languageId: "CON",
            languageName: "Test Language",
            initialLanguageName: null);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo("LANGUAGE_ID_RESERVED"));
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-048")]
    [Property("BehaviorId", "BHV-032")]
    [Description("VAL-013: PRN as language ID returns LANGUAGE_ID_RESERVED error")]
    public void ValidateLanguageSelection_ReservedPRN_ReturnsReservedError()
    {
        var result = LanguageService.ValidateLanguageSelection(
            languageId: "PRN",
            languageName: "Test Language",
            initialLanguageName: null);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo("LANGUAGE_ID_RESERVED"));
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-048")]
    [Property("BehaviorId", "BHV-032")]
    [Description("VAL-013: AUX as language ID returns LANGUAGE_ID_RESERVED error")]
    public void ValidateLanguageSelection_ReservedAUX_ReturnsReservedError()
    {
        var result = LanguageService.ValidateLanguageSelection(
            languageId: "AUX",
            languageName: "Test Language",
            initialLanguageName: null);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo("LANGUAGE_ID_RESERVED"));
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-048")]
    [Property("BehaviorId", "BHV-032")]
    [Description("VAL-013: NUL as language ID returns LANGUAGE_ID_RESERVED error")]
    public void ValidateLanguageSelection_ReservedNUL_ReturnsReservedError()
    {
        var result = LanguageService.ValidateLanguageSelection(
            languageId: "NUL",
            languageName: "Test Language",
            initialLanguageName: null);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo("LANGUAGE_ID_RESERVED"));
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-048")]
    [Property("BehaviorId", "BHV-032")]
    [Description("VAL-013: COM1 through COM9 are reserved")]
    [TestCase("COM1")]
    [TestCase("COM5")]
    [TestCase("COM9")]
    public void ValidateLanguageSelection_ReservedCOM_ReturnsReservedError(string languageId)
    {
        var result = LanguageService.ValidateLanguageSelection(
            languageId: languageId,
            languageName: "Test Language",
            initialLanguageName: null);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo("LANGUAGE_ID_RESERVED"));
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-048")]
    [Property("BehaviorId", "BHV-032")]
    [Description("VAL-013: LPT1 through LPT9 are reserved")]
    [TestCase("LPT1")]
    [TestCase("LPT5")]
    [TestCase("LPT9")]
    public void ValidateLanguageSelection_ReservedLPT_ReturnsReservedError(string languageId)
    {
        var result = LanguageService.ValidateLanguageSelection(
            languageId: languageId,
            languageName: "Test Language",
            initialLanguageName: null);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo("LANGUAGE_ID_RESERVED"));
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-048")]
    [Property("BehaviorId", "BHV-032")]
    [Description("VAL-013: Reserved names are case-insensitive")]
    [TestCase("con")]
    [TestCase("Con")]
    [TestCase("prn")]
    [TestCase("Prn")]
    public void ValidateLanguageSelection_ReservedCaseInsensitive_ReturnsReservedError(string languageId)
    {
        var result = LanguageService.ValidateLanguageSelection(
            languageId: languageId,
            languageName: "Test Language",
            initialLanguageName: null);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo("LANGUAGE_ID_RESERVED"));
        });
    }

    #endregion

    #region CAP-008: Golden Master Tests

    /// <summary>
    /// Golden master test: Verify language validation matches expected output from gm-006.
    /// Tests all 6 scenarios defined in the golden master.
    /// </summary>
    [TestCase("eng", "English", null, true, null)]
    [TestCase("eng", "", null, false, "LANGUAGE_NAME_BLANK")]
    [TestCase("eng", "Existing Language", null, false, "LANGUAGE_NAME_EXISTS")]
    [TestCase("eng-x-ABC!", "English", null, false, "LANGUAGE_VARIANT_INVALID")]
    [TestCase("CON", "Test", null, false, "LANGUAGE_ID_RESERVED")]
    [TestCase("spa", "Spanish", null, true, null)]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-006")]
    [Property("BehaviorId", "BHV-009")]
    [Property("BehaviorId", "BHV-032")]
    [Description("Golden master: Language validation matches PT9 expected output")]
    public void ValidateLanguageSelection_GoldenMaster_MatchesExpected(
        string languageId,
        string languageName,
        string? initialLanguageName,
        bool expectedIsValid,
        string? expectedErrorCode)
    {
        var result = LanguageService.ValidateLanguageSelection(
            languageId: languageId,
            languageName: languageName,
            initialLanguageName: initialLanguageName);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.EqualTo(expectedIsValid),
                $"IsValid mismatch for {languageId}/{languageName}");
            Assert.That(result.ErrorCode, Is.EqualTo(expectedErrorCode),
                $"ErrorCode mismatch for {languageId}/{languageName}");
        });
    }

    #endregion

    #region CAP-008: GetAvailableLanguages Tests

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-049")]
    [Property("BehaviorId", "BHV-009")]
    [Description("GetAvailableLanguages returns non-empty list")]
    public void GetAvailableLanguages_NoFilter_ReturnsLanguages()
    {
        var languages = LanguageService.GetAvailableLanguages(searchQuery: null);

        Assert.That(languages, Is.Not.Null);
        Assert.That(languages, Is.Not.Empty, "Should return at least some languages");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-049")]
    [Property("BehaviorId", "BHV-009")]
    [Description("GetAvailableLanguages filters by search query")]
    public void GetAvailableLanguages_WithSearchQuery_ReturnsFilteredList()
    {
        var languages = LanguageService.GetAvailableLanguages(searchQuery: "eng");

        Assert.That(languages, Is.Not.Null);
        // Results should contain languages matching "eng" (e.g., English)
        Assert.That(languages.All(l =>
            l.LanguageId.Contains("eng", StringComparison.OrdinalIgnoreCase) ||
            l.LanguageName.Contains("eng", StringComparison.OrdinalIgnoreCase) ||
            l.BaseCode.Contains("eng", StringComparison.OrdinalIgnoreCase)),
            Is.True, "All results should match search query");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-049")]
    [Property("BehaviorId", "BHV-009")]
    [Description("GetAvailableLanguages returns correct language structure")]
    public void GetAvailableLanguages_ValidLanguage_HasCorrectStructure()
    {
        var languages = LanguageService.GetAvailableLanguages(searchQuery: "eng");

        Assert.That(languages, Is.Not.Null);
        // Skip if no results (might be issue with language database)
        if (languages.Count == 0)
        {
            Assert.Inconclusive("No languages found matching 'eng' - language database may not be loaded");
        }

        var language = languages.First();
        Assert.Multiple(() =>
        {
            Assert.That(language.LanguageId, Is.Not.Null.And.Not.Empty, "LanguageId should be set");
            Assert.That(language.LanguageName, Is.Not.Null.And.Not.Empty, "LanguageName should be set");
            Assert.That(language.BaseCode, Is.Not.Null.And.Not.Empty, "BaseCode should be set");
        });
    }

    #endregion

    #region Edge Cases

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-022")]
    [Property("BehaviorId", "BHV-009")]
    [Description("Language ID with only script component is valid")]
    public void ValidateLanguageSelection_OnlyScript_ReturnsValid()
    {
        var result = LanguageService.ValidateLanguageSelection(
            languageId: "Latn",
            languageName: "Latin Script",
            initialLanguageName: null);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.True);
            Assert.That(result.ErrorCode, Is.Null);
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-022")]
    [Property("BehaviorId", "BHV-009")]
    [Description("Very long language name is valid")]
    public void ValidateLanguageSelection_LongName_ReturnsValid()
    {
        var longName = new string('A', 100) + " Language";

        var result = LanguageService.ValidateLanguageSelection(
            languageId: "eng",
            languageName: longName,
            initialLanguageName: null);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.True, "Long language names should be valid");
            Assert.That(result.ErrorCode, Is.Null);
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-022")]
    [Property("BehaviorId", "BHV-009")]
    [Description("Language name with special characters is valid")]
    public void ValidateLanguageSelection_SpecialCharsInName_ReturnsValid()
    {
        var result = LanguageService.ValidateLanguageSelection(
            languageId: "eng",
            languageName: "English (British) - Modern",
            initialLanguageName: null);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.True);
            Assert.That(result.ErrorCode, Is.Null);
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-022")]
    [Property("BehaviorId", "BHV-009")]
    [Description("Language name with Unicode characters is valid")]
    public void ValidateLanguageSelection_UnicodeInName_ReturnsValid()
    {
        var result = LanguageService.ValidateLanguageSelection(
            languageId: "tha",
            languageName: "Thai (ภาษาไทย)",
            initialLanguageName: null);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.True);
            Assert.That(result.ErrorCode, Is.Null);
        });
    }

    #endregion
}
