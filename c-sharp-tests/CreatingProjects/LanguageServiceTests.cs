using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.CreatingProjects;

namespace TestParanextDataProvider.CreatingProjects;

/// <summary>
/// Tests for LanguageService.ValidateLanguageSelection implementing CAP-EXT-006 (LanguageIDValidator).
///
/// These tests verify that the language validation logic correctly enforces
/// validation rules VAL-010 through VAL-013.
/// </summary>
/// <remarks>
/// Golden master: gm-006-language-validation
///
/// Validation rules:
/// - VAL-010: Language name cannot be blank
/// - VAL-011: Language name must be unique across projects
/// - VAL-012: Variant characters must be a-z or 0-9
/// - VAL-013: Final language ID cannot be Windows reserved filename
/// </remarks>
[TestFixture]
[ExcludeFromCodeCoverage]
[Category("Extraction")]
internal class LanguageServiceTests
{
    #region Test Data

    private static readonly IReadOnlyList<string> EmptyExistingNames = Array.Empty<string>();
    private static readonly IReadOnlyList<string> ExistingLanguageNames = new[] { "English", "Spanish", "Existing" };

    #endregion

    #region CAP-EXT-006: Valid Language Selection

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-006")]
    [Property("GoldenMaster", "gm-006")]
    [Property("BehaviorId", "BHV-032")]
    [Property("ScenarioId", "TS-LANG-001")]
    [Description("Valid language ID and name returns success")]
    public void ValidateLanguageSelection_ValidInput_ReturnsValid()
    {
        // Arrange
        var languageId = "eng";
        var languageName = "English";

        // Act
        var result = LanguageService.ValidateLanguageSelection(
            languageId,
            languageName,
            EmptyExistingNames
        );

        // Assert
        Assert.That(result.IsValid, Is.True);
        Assert.That(result.ErrorCode, Is.Null);
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-006")]
    [Property("GoldenMaster", "gm-006")]
    [Property("BehaviorId", "BHV-032")]
    [Property("ScenarioId", "TS-LANG-002")]
    [Description("Spanish language selection returns success")]
    public void ValidateLanguageSelection_Spanish_ReturnsValid()
    {
        // Arrange
        var languageId = "spa";
        var languageName = "Spanish";

        // Act
        var result = LanguageService.ValidateLanguageSelection(
            languageId,
            languageName,
            EmptyExistingNames
        );

        // Assert
        Assert.That(result.IsValid, Is.True);
    }

    #endregion

    #region CAP-EXT-006: VAL-010 - Blank Language Name

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-006")]
    [Property("GoldenMaster", "gm-006")]
    [Property("BehaviorId", "BHV-032")]
    [Property("ValidationRule", "VAL-010")]
    [Property("ScenarioId", "TS-LANG-003")]
    [Description("Empty language name returns blank error")]
    public void ValidateLanguageSelection_EmptyName_ReturnsBlankError()
    {
        // Arrange
        var languageId = "eng";
        var languageName = "";

        // Act
        var result = LanguageService.ValidateLanguageSelection(
            languageId,
            languageName,
            EmptyExistingNames
        );

        // Assert
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("Language_NameBlank"));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-006")]
    [Property("GoldenMaster", "gm-006")]
    [Property("BehaviorId", "BHV-032")]
    [Property("ValidationRule", "VAL-010")]
    [Property("ScenarioId", "TS-LANG-004")]
    [Description("Whitespace-only language name returns blank error")]
    public void ValidateLanguageSelection_WhitespaceName_ReturnsBlankError()
    {
        // Arrange
        var languageId = "eng";
        var languageName = "   ";

        // Act
        var result = LanguageService.ValidateLanguageSelection(
            languageId,
            languageName,
            EmptyExistingNames
        );

        // Assert
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("Language_NameBlank"));
    }

    #endregion

    #region CAP-EXT-006: VAL-011 - Language Name Uniqueness

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-006")]
    [Property("GoldenMaster", "gm-006")]
    [Property("BehaviorId", "BHV-032")]
    [Property("ValidationRule", "VAL-011")]
    [Property("ScenarioId", "TS-LANG-005")]
    [Description("Existing language name returns exists error")]
    public void ValidateLanguageSelection_ExistingName_ReturnsExistsError()
    {
        // Arrange
        var languageId = "eng";
        var languageName = "Existing";

        // Act
        var result = LanguageService.ValidateLanguageSelection(
            languageId,
            languageName,
            ExistingLanguageNames
        );

        // Assert
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("Language_NameExists"));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-006")]
    [Property("GoldenMaster", "gm-006")]
    [Property("BehaviorId", "BHV-032")]
    [Property("ValidationRule", "VAL-011")]
    [Property("ScenarioId", "TS-LANG-006")]
    [Description("Same name as initial name in edit mode is valid")]
    public void ValidateLanguageSelection_EditModeSameName_ReturnsValid()
    {
        // Arrange
        var languageId = "eng";
        var languageName = "English";
        var initialLanguageName = "English";

        // Act
        var result = LanguageService.ValidateLanguageSelection(
            languageId,
            languageName,
            ExistingLanguageNames,
            initialLanguageName
        );

        // Assert - Same as initial name should be valid (we're editing, not creating)
        Assert.That(result.IsValid, Is.True);
    }

    #endregion

    #region CAP-EXT-006: VAL-012 - Variant Characters

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-006")]
    [Property("GoldenMaster", "gm-006")]
    [Property("BehaviorId", "BHV-032")]
    [Property("ValidationRule", "VAL-012")]
    [Property("ScenarioId", "TS-LANG-007")]
    [Description("Invalid variant characters in language ID returns error")]
    public void ValidateLanguageSelection_InvalidVariant_ReturnsError()
    {
        // Arrange
        var languageId = "eng-x-invalid"; // Invalid characters in variant
        var languageName = "English Custom";

        // Act
        var result = LanguageService.ValidateLanguageSelection(
            languageId,
            languageName,
            EmptyExistingNames
        );

        // Assert
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("Language_InvalidVariant"));
    }

    #endregion

    #region CAP-EXT-006: VAL-013 - Windows Reserved Names

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-006")]
    [Property("GoldenMaster", "gm-006")]
    [Property("BehaviorId", "BHV-032")]
    [Property("ValidationRule", "VAL-013")]
    [Property("ScenarioId", "TS-LANG-008")]
    [Description("Reserved Windows filename as language ID returns error")]
    public void ValidateLanguageSelection_ReservedLanguageId_ReturnsError()
    {
        // Arrange
        var languageId = "CON"; // Windows reserved name
        var languageName = "Test";

        // Act
        var result = LanguageService.ValidateLanguageSelection(
            languageId,
            languageName,
            EmptyExistingNames
        );

        // Assert
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("Language_ReservedName"));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-006")]
    [Property("GoldenMaster", "gm-006")]
    [Property("BehaviorId", "BHV-032")]
    [Property("ValidationRule", "VAL-013")]
    [Property("ScenarioId", "TS-LANG-009")]
    [Description("Reserved filename check is case-insensitive")]
    public void ValidateLanguageSelection_ReservedNameLowercase_ReturnsError()
    {
        // Arrange
        var languageId = "aux"; // Windows reserved name (lowercase)
        var languageName = "Test";

        // Act
        var result = LanguageService.ValidateLanguageSelection(
            languageId,
            languageName,
            EmptyExistingNames
        );

        // Assert
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("Language_ReservedName"));
    }

    #endregion

    #region CAP-011: GetAvailableLanguages Tests

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("BehaviorId", "BHV-009")]
    [Property("ScenarioId", "TS-011-001")]
    [Description("GetAvailableLanguages returns list of languages")]
    public void GetAvailableLanguages_NoSearchQuery_ReturnsLanguageList()
    {
        // Act
        var languages = LanguageService.GetAvailableLanguages();

        // Assert - Should return a non-null list
        Assert.That(languages, Is.Not.Null);
        Assert.That(languages, Is.InstanceOf<IReadOnlyList<LanguageSelection>>());
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("BehaviorId", "BHV-009")]
    [Property("ScenarioId", "TS-011-002")]
    [Description("GetAvailableLanguages includes common languages like English")]
    public void GetAvailableLanguages_ContainsCommonLanguages()
    {
        // Act
        var languages = LanguageService.GetAvailableLanguages();

        // Assert - Should include common languages
        // Note: The actual implementation should return languages from ParatextData
        Assert.That(languages, Is.Not.Null);
        Assert.That(
            languages,
            Has.Some.Matches<LanguageSelection>(lang =>
                lang.LanguageId.StartsWith("eng", StringComparison.OrdinalIgnoreCase)
                || lang.LanguageName.Contains("English", StringComparison.OrdinalIgnoreCase)
            ),
            "Should include English language"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("BehaviorId", "BHV-009")]
    [Property("ScenarioId", "TS-011-003")]
    [Description("GetAvailableLanguages filters by search query")]
    public void GetAvailableLanguages_WithSearchQuery_ReturnsFilteredList()
    {
        // Arrange
        var searchQuery = "eng";

        // Act
        var filteredLanguages = LanguageService.GetAvailableLanguages(searchQuery);
        var allLanguages = LanguageService.GetAvailableLanguages();

        // Assert - Filtered list should be subset or equal to full list
        Assert.That(filteredLanguages, Is.Not.Null);
        Assert.That(filteredLanguages.Count, Is.LessThanOrEqualTo(allLanguages.Count));

        // All returned languages should match the search query
        Assert.That(
            filteredLanguages,
            Has.All.Matches<LanguageSelection>(lang =>
                lang.LanguageId.Contains(searchQuery, StringComparison.OrdinalIgnoreCase)
                || lang.LanguageName.Contains(searchQuery, StringComparison.OrdinalIgnoreCase)
                || lang.BaseCode.Contains(searchQuery, StringComparison.OrdinalIgnoreCase)
            ),
            "All returned languages should match the search query"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("BehaviorId", "BHV-009")]
    [Property("ScenarioId", "TS-011-004")]
    [Description("GetAvailableLanguages returns empty list for non-matching query")]
    public void GetAvailableLanguages_WithNonMatchingQuery_ReturnsEmptyOrFilteredList()
    {
        // Arrange - Use a very unlikely search term
        var searchQuery = "xyznonexistentlanguage123";

        // Act
        var languages = LanguageService.GetAvailableLanguages(searchQuery);

        // Assert - Should return empty list for non-matching query
        Assert.That(languages, Is.Not.Null);
        Assert.That(languages, Is.Empty, "Non-matching query should return empty list");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("BehaviorId", "BHV-009")]
    [Property("ScenarioId", "TS-011-005")]
    [Description("LanguageSelection contains required BCP-47 components")]
    public void GetAvailableLanguages_ReturnsLanguageSelectionWithRequiredFields()
    {
        // Act
        var languages = LanguageService.GetAvailableLanguages();

        // Assert - Each language should have required fields
        Assert.That(languages, Is.Not.Null);
        foreach (var language in languages)
        {
            Assert.That(
                language.LanguageId,
                Is.Not.Null.And.Not.Empty,
                "LanguageId is required"
            );
            Assert.That(
                language.LanguageName,
                Is.Not.Null.And.Not.Empty,
                "LanguageName is required"
            );
            Assert.That(language.BaseCode, Is.Not.Null.And.Not.Empty, "BaseCode is required");
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("BehaviorId", "BHV-009")]
    [Property("ScenarioId", "TS-011-006")]
    [Description("GetAvailableLanguages with null query returns all languages")]
    public void GetAvailableLanguages_WithNullQuery_ReturnsAllLanguages()
    {
        // Act
        var languagesWithNull = LanguageService.GetAvailableLanguages(null);
        var languagesWithNoArg = LanguageService.GetAvailableLanguages();

        // Assert - Both calls should return equivalent results
        Assert.That(languagesWithNull, Is.Not.Null);
        Assert.That(languagesWithNull.Count, Is.EqualTo(languagesWithNoArg.Count));
    }

    #endregion
}
