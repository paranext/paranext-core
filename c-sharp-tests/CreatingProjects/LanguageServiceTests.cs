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
}
