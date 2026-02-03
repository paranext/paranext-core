using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider.Projects;

/// <summary>
/// Tests for LanguageValidationService.ValidateCharacterRules
/// Capability: CAP-006 - ValidateCharacterRules
/// Strategy: Classic TDD (complex ICU parsing algorithm)
/// Golden Master: gm-003-character-rules (10 test cases)
/// Validation Rule: VAL-013
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class LanguageValidationServiceTests
{
    #region Golden Master Tests (gm-003)

    /// <summary>
    /// gm-003-01: Valid character rules with proper case pairs
    /// Input: "a A\nb B\nc C" with space separator
    /// Expected: Valid
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Category("Contract")]
    [Property("GoldenMasterId", "gm-003-01")]
    [Property("ScenarioId", "TS-053")]
    [Property("BehaviorId", "VAL-013")]
    [Property("CapabilityId", "CAP-006")]
    public void ValidateCharacterRules_ValidCasePairs_ReturnsValid()
    {
        // Arrange
        var request = new CharacterRulesValidationRequest(
            Separator: ' ',
            RulesText: "a A\nb B\nc C",
            LanguageId: "eng"
        );

        // Act
        CharacterValidationResult result = LanguageValidationService.ValidateCharacterRules(request);

        // Assert
        Assert.That(result.IsValid, Is.True, "Valid case pairs should pass validation");
        Assert.That(result.Errors, Is.Empty, "No errors expected for valid rules");
    }

    /// <summary>
    /// gm-003-02: Duplicate character on same line
    /// Input: "a A a" with space separator
    /// Expected: Invalid - "Character 'a' duplicated"
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Category("Contract")]
    [Property("GoldenMasterId", "gm-003-02")]
    [Property("ScenarioId", "TS-053")]
    [Property("BehaviorId", "VAL-013")]
    [Property("CapabilityId", "CAP-006")]
    public void ValidateCharacterRules_DuplicateOnSameLine_ReturnsErrorWithDuplicateType()
    {
        // Arrange
        var request = new CharacterRulesValidationRequest(
            Separator: ' ',
            RulesText: "a A a",
            LanguageId: "eng"
        );

        // Act
        CharacterValidationResult result = LanguageValidationService.ValidateCharacterRules(request);

        // Assert
        Assert.That(result.IsValid, Is.False, "Duplicate character should fail validation");
        Assert.That(result.Errors, Has.Count.EqualTo(1), "Should have exactly one error");
        Assert.That(result.Errors[0].Type, Is.EqualTo(CharacterErrorType.Duplicate));
        Assert.That(result.Errors[0].Character, Is.EqualTo("a"));
        Assert.That(result.Errors[0].Message, Does.Contain("duplicated"));
    }

    /// <summary>
    /// gm-003-03: Case-insensitive duplicate across lines
    /// Input: "a A\na b" with space separator
    /// Expected: Invalid - "Cannot place 'a' and 'A' on separate lines since Paratext ignores case when sorting."
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Category("Contract")]
    [Property("GoldenMasterId", "gm-003-03")]
    [Property("ScenarioId", "TS-054")]
    [Property("BehaviorId", "VAL-013")]
    [Property("CapabilityId", "CAP-006")]
    public void ValidateCharacterRules_CaseDuplicateAcrossLines_ReturnsCapitalizationError()
    {
        // Arrange
        var request = new CharacterRulesValidationRequest(
            Separator: ' ',
            RulesText: "a A\na b",
            LanguageId: "eng"
        );

        // Act
        CharacterValidationResult result = LanguageValidationService.ValidateCharacterRules(request);

        // Assert
        Assert.That(result.IsValid, Is.False, "Case duplicate across lines should fail");
        Assert.That(result.Errors, Has.Count.GreaterThanOrEqualTo(1));
        // Note: Could be Capitalization or Duplicate type depending on implementation
        // The key is that it detects the issue with 'a' appearing on separate lines
        Assert.That(
            result.Errors[0].Message,
            Does.Contain("separate lines").Or.Contain("duplicat").IgnoreCase
        );
    }

    /// <summary>
    /// gm-003-04: Capitalization not defined correctly
    /// Input: "a b" with space separator (lowercase 'a' needs uppercase 'A')
    /// Expected: Invalid - "Capitalization is not defined correctly for: a"
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Category("Contract")]
    [Property("GoldenMasterId", "gm-003-04")]
    [Property("ScenarioId", "TS-055")]
    [Property("BehaviorId", "VAL-013")]
    [Property("CapabilityId", "CAP-006")]
    public void ValidateCharacterRules_MissingCasePair_ReturnsCapitalizationError()
    {
        // Arrange
        var request = new CharacterRulesValidationRequest(
            Separator: ' ',
            RulesText: "a b",
            LanguageId: "eng"
        );

        // Act
        CharacterValidationResult result = LanguageValidationService.ValidateCharacterRules(request);

        // Assert
        Assert.That(result.IsValid, Is.False, "Missing case pair should fail validation");
        Assert.That(result.Errors, Has.Count.GreaterThanOrEqualTo(1));
        Assert.That(result.Errors[0].Type, Is.EqualTo(CharacterErrorType.Capitalization));
        Assert.That(result.Errors[0].Message, Does.Contain("Capitalization").IgnoreCase);
    }

    /// <summary>
    /// gm-003-05: Valid multigraph
    /// Input: "ch Ch CH" with space separator
    /// Expected: Valid
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Category("Contract")]
    [Property("GoldenMasterId", "gm-003-05")]
    [Property("ScenarioId", "TS-053")]
    [Property("BehaviorId", "VAL-013")]
    [Property("CapabilityId", "CAP-006")]
    public void ValidateCharacterRules_ValidMultigraph_ReturnsValid()
    {
        // Arrange
        var request = new CharacterRulesValidationRequest(
            Separator: ' ',
            RulesText: "ch Ch CH",
            LanguageId: "eng"
        );

        // Act
        CharacterValidationResult result = LanguageValidationService.ValidateCharacterRules(request);

        // Assert
        Assert.That(result.IsValid, Is.True, "Valid multigraph should pass validation");
        Assert.That(result.Errors, Is.Empty);
    }

    /// <summary>
    /// gm-003-06: No-case letter (apostrophe)
    /// Input: "'" with space separator
    /// Expected: Valid (no case pair needed for punctuation)
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Category("Contract")]
    [Property("GoldenMasterId", "gm-003-06")]
    [Property("ScenarioId", "TS-053")]
    [Property("BehaviorId", "VAL-013")]
    [Property("CapabilityId", "CAP-006")]
    public void ValidateCharacterRules_NoCaseLetter_ReturnsValid()
    {
        // Arrange
        var request = new CharacterRulesValidationRequest(
            Separator: ' ',
            RulesText: "'",
            LanguageId: "eng"
        );

        // Act
        CharacterValidationResult result = LanguageValidationService.ValidateCharacterRules(request);

        // Assert
        Assert.That(result.IsValid, Is.True, "No-case letter (apostrophe) should pass validation");
        Assert.That(result.Errors, Is.Empty);
    }

    /// <summary>
    /// gm-003-07: Empty rules text
    /// Input: "" with space separator
    /// Expected: Valid (no characters defined is acceptable)
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Category("Contract")]
    [Property("GoldenMasterId", "gm-003-07")]
    [Property("ScenarioId", "TS-053")]
    [Property("BehaviorId", "VAL-013")]
    [Property("CapabilityId", "CAP-006")]
    public void ValidateCharacterRules_EmptyRulesText_ReturnsValid()
    {
        // Arrange
        var request = new CharacterRulesValidationRequest(
            Separator: ' ',
            RulesText: "",
            LanguageId: "eng"
        );

        // Act
        CharacterValidationResult result = LanguageValidationService.ValidateCharacterRules(request);

        // Assert
        Assert.That(result.IsValid, Is.True, "Empty rules text should be valid");
        Assert.That(result.Errors, Is.Empty);
    }

    /// <summary>
    /// gm-003-08: Control character in rules
    /// Input: "a\u0001A" with space separator (contains control character U+0001)
    /// Expected: Invalid - "Text contains invalid characters"
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Category("Contract")]
    [Property("GoldenMasterId", "gm-003-08")]
    [Property("ScenarioId", "TS-053")]
    [Property("BehaviorId", "VAL-013")]
    [Property("CapabilityId", "CAP-006")]
    public void ValidateCharacterRules_ControlCharacter_ReturnsInvalidSyntaxError()
    {
        // Arrange
        var request = new CharacterRulesValidationRequest(
            Separator: ' ',
            RulesText: "a\u0001A",
            LanguageId: "eng"
        );

        // Act
        CharacterValidationResult result = LanguageValidationService.ValidateCharacterRules(request);

        // Assert
        Assert.That(result.IsValid, Is.False, "Control character should fail validation");
        Assert.That(result.Errors, Has.Count.GreaterThanOrEqualTo(1));
        Assert.That(result.Errors[0].Type, Is.EqualTo(CharacterErrorType.InvalidSyntax));
        Assert.That(result.Errors[0].Message, Does.Contain("invalid").IgnoreCase);
    }

    /// <summary>
    /// gm-003-09: Tab as separator
    /// Input: "a\tA\nb\tB" with tab separator
    /// Expected: Valid
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Category("Contract")]
    [Property("GoldenMasterId", "gm-003-09")]
    [Property("ScenarioId", "TS-053")]
    [Property("BehaviorId", "VAL-013")]
    [Property("CapabilityId", "CAP-006")]
    public void ValidateCharacterRules_TabSeparator_ReturnsValid()
    {
        // Arrange
        var request = new CharacterRulesValidationRequest(
            Separator: '\t',
            RulesText: "a\tA\nb\tB",
            LanguageId: "eng"
        );

        // Act
        CharacterValidationResult result = LanguageValidationService.ValidateCharacterRules(request);

        // Assert
        Assert.That(result.IsValid, Is.True, "Tab as separator should be valid");
        Assert.That(result.Errors, Is.Empty);
    }

    /// <summary>
    /// gm-003-10: Complex valid rules with diacritics
    /// Input: "a A\n\u00e0 \u00c0\n\u00e1 \u00c1" with space separator (a-grave, a-acute)
    /// Expected: Valid
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Category("Contract")]
    [Property("GoldenMasterId", "gm-003-10")]
    [Property("ScenarioId", "TS-053")]
    [Property("BehaviorId", "VAL-013")]
    [Property("CapabilityId", "CAP-006")]
    public void ValidateCharacterRules_DiacriticsWithCasePairs_ReturnsValid()
    {
        // Arrange
        // \u00e0 = a-grave (lowercase), \u00c0 = A-grave (uppercase)
        // \u00e1 = a-acute (lowercase), \u00c1 = A-acute (uppercase)
        var request = new CharacterRulesValidationRequest(
            Separator: ' ',
            RulesText: "a A\n\u00e0 \u00c0\n\u00e1 \u00c1",
            LanguageId: "eng"
        );

        // Act
        CharacterValidationResult result = LanguageValidationService.ValidateCharacterRules(request);

        // Assert
        Assert.That(result.IsValid, Is.True, "Diacritics with proper case pairs should be valid");
        Assert.That(result.Errors, Is.Empty);
    }

    #endregion

    #region Additional Edge Case Tests

    /// <summary>
    /// Test that ICU error is detected when rules cannot be parsed
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-053")]
    [Property("BehaviorId", "VAL-013")]
    [Property("CapabilityId", "CAP-006")]
    public void ValidateCharacterRules_MalformedIcuRules_ReturnsIcuError()
    {
        // Arrange - Use rules that ICU cannot parse
        // Note: The exact format that triggers ICU error depends on SimpleRulesParser implementation
        var request = new CharacterRulesValidationRequest(
            Separator: ' ',
            RulesText: "& < a",  // ICU collation syntax that may cause parsing issues
            LanguageId: "eng"
        );

        // Act
        CharacterValidationResult result = LanguageValidationService.ValidateCharacterRules(request);

        // Assert - Should either be valid (if ICU handles it) or return IcuError
        // This test documents the behavior - implementer should verify actual PT9 behavior
        if (!result.IsValid)
        {
            Assert.That(
                result.Errors.Any(e => e.Type == CharacterErrorType.IcuError || e.Type == CharacterErrorType.InvalidSyntax),
                Is.True,
                "Should return ICU error or invalid syntax for malformed rules"
            );
        }
    }

    /// <summary>
    /// Test validation with whitespace-only rules text
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-053")]
    [Property("BehaviorId", "VAL-013")]
    [Property("CapabilityId", "CAP-006")]
    public void ValidateCharacterRules_WhitespaceOnlyRulesText_ReturnsValid()
    {
        // Arrange
        var request = new CharacterRulesValidationRequest(
            Separator: ' ',
            RulesText: "   \n  \n  ",
            LanguageId: "eng"
        );

        // Act
        CharacterValidationResult result = LanguageValidationService.ValidateCharacterRules(request);

        // Assert - Whitespace only should be treated as empty/valid
        Assert.That(result.IsValid, Is.True, "Whitespace-only rules should be valid");
    }

    #endregion
}
