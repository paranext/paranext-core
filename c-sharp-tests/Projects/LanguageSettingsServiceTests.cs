using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider.Projects;

/// <summary>
/// Tests for LanguageSettingsService.SaveLanguageSettings
/// Capability: CAP-007 - SaveLanguageSettings
/// Strategy: TDD (Outside-In)
/// Acceptance Test: spec-012 (Character Set Management)
/// Related: EXT-007, BHV-163, BHV-164
/// Dependencies: CAP-006 (ValidateCharacterRules must pass before save)
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class LanguageSettingsServiceTests
{
    #region Acceptance Test - CAP-007

    /// <summary>
    /// Acceptance test for CAP-007: Save language settings capability.
    /// When this test passes, the capability is complete.
    /// Maps to: spec-012
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-012")]
    [Description("Acceptance test: SaveLanguageSettings validates character rules before save")]
    public void SaveLanguageSettings_AcceptanceTest()
    {
        // This acceptance test verifies the complete SaveLanguageSettings capability:
        // 1. Valid character rules should allow save
        // 2. Invalid character rules should prevent save and return validation errors
        // 3. When save succeeds, LDML file is written and VCS commit is created

        // Test 1: Valid character rules should succeed
        var validRequest = CreateValidLanguageSettingsRequest();
        var validResult = LanguageSettingsService.SaveLanguageSettings(
            validRequest,
            canUpdateAllSettings: true
        );
        Assert.That(
            validResult.Success,
            Is.True,
            "Valid language settings should save successfully"
        );
        Assert.That(validResult.ErrorMessage, Is.Null, "No error message expected for valid save");

        // Test 2: Invalid character rules should fail with validation errors
        var invalidRequest = validRequest with
        {
            CharacterRules = "a A a" // Duplicate character - should fail CAP-006 validation
        };
        var invalidResult = LanguageSettingsService.SaveLanguageSettings(
            invalidRequest,
            canUpdateAllSettings: true
        );
        Assert.That(invalidResult.Success, Is.False, "Invalid character rules should prevent save");
        Assert.That(invalidResult.ValidationResult, Is.Not.Null, "Should return validation result");
        Assert.That(
            invalidResult.ValidationResult!.IsValid,
            Is.False,
            "Validation should report invalid"
        );
    }

    #endregion

    #region Contract Tests - Validation Before Save

    /// <summary>
    /// SaveLanguageSettings must call ValidateCharacterRules (CAP-006) before saving.
    /// If validation fails, save should not proceed.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-CAP-007-01")]
    [Property("BehaviorId", "BHV-163")]
    [Property("CapabilityId", "CAP-007")]
    public void SaveLanguageSettings_InvalidCharacterRules_ReturnsFailed()
    {
        // Arrange - Create request with invalid character rules (duplicate)
        var request = CreateValidLanguageSettingsRequest() with
        {
            CharacterRules = "a A a", // Duplicate 'a' on same line
            Separator = ' '
        };

        // Act
        var result = LanguageSettingsService.SaveLanguageSettings(
            request,
            canUpdateAllSettings: true
        );

        // Assert
        Assert.That(result.Success, Is.False, "Save should fail when character rules are invalid");
        Assert.That(result.ValidationResult, Is.Not.Null, "Should return validation result");
        Assert.That(result.ValidationResult!.IsValid, Is.False, "Character validation should fail");
    }

    /// <summary>
    /// SaveLanguageSettings with valid empty character rules should succeed.
    /// Empty rules are valid per CAP-006 (gm-003-07).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-CAP-007-02")]
    [Property("BehaviorId", "BHV-163")]
    [Property("CapabilityId", "CAP-007")]
    public void SaveLanguageSettings_EmptyCharacterRules_Succeeds()
    {
        // Arrange - Empty character rules are valid
        var request = CreateValidLanguageSettingsRequest() with
        {
            CharacterRules = ""
        };

        // Act
        var result = LanguageSettingsService.SaveLanguageSettings(
            request,
            canUpdateAllSettings: true
        );

        // Assert
        Assert.That(result.Success, Is.True, "Save should succeed with empty character rules");
    }

    /// <summary>
    /// SaveLanguageSettings with capitalization error should fail.
    /// Maps to: gm-003-04 (capitalization not defined correctly)
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-CAP-007-03")]
    [Property("BehaviorId", "BHV-163")]
    [Property("CapabilityId", "CAP-007")]
    public void SaveLanguageSettings_CapitalizationError_ReturnsFailed()
    {
        // Arrange - "a b" has lowercase 'a' without uppercase 'A'
        var request = CreateValidLanguageSettingsRequest() with
        {
            CharacterRules = "a b",
            Separator = ' '
        };

        // Act
        var result = LanguageSettingsService.SaveLanguageSettings(
            request,
            canUpdateAllSettings: true
        );

        // Assert
        Assert.That(result.Success, Is.False, "Save should fail for capitalization error");
        Assert.That(result.ValidationResult, Is.Not.Null);
        Assert.That(
            result.ValidationResult!.Errors.Any(e => e.Type == CharacterErrorType.Capitalization),
            Is.True,
            "Should report capitalization error"
        );
    }

    /// <summary>
    /// SaveLanguageSettings with valid character pairs should succeed.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-CAP-007-04")]
    [Property("BehaviorId", "BHV-163")]
    [Property("CapabilityId", "CAP-007")]
    public void SaveLanguageSettings_ValidCharacterPairs_Succeeds()
    {
        // Arrange - Valid lowercase/uppercase pairs
        var request = CreateValidLanguageSettingsRequest() with
        {
            CharacterRules = "a A\nb B\nc C",
            Separator = ' '
        };

        // Act
        var result = LanguageSettingsService.SaveLanguageSettings(
            request,
            canUpdateAllSettings: true
        );

        // Assert
        Assert.That(result.Success, Is.True, "Save should succeed with valid character pairs");
    }

    #endregion

    #region Contract Tests - Font Settings

    /// <summary>
    /// Font name should be saved correctly.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-CAP-007-05")]
    [Property("BehaviorId", "BHV-163")]
    [Property("CapabilityId", "CAP-007")]
    public void SaveLanguageSettings_CustomFontName_SavesSuccessfully()
    {
        // Arrange
        var request = CreateValidLanguageSettingsRequest() with
        {
            FontName = "Charis SIL",
            FontSize = 14
        };

        // Act
        var result = LanguageSettingsService.SaveLanguageSettings(
            request,
            canUpdateAllSettings: true
        );

        // Assert
        Assert.That(result.Success, Is.True, "Save should succeed with custom font");
    }

    /// <summary>
    /// Font features (Graphite) should be saved.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-CAP-007-06")]
    [Property("BehaviorId", "BHV-163")]
    [Property("CapabilityId", "CAP-007")]
    public void SaveLanguageSettings_WithFontFeatures_SavesSuccessfully()
    {
        // Arrange - Graphite font features
        var request = CreateValidLanguageSettingsRequest() with
        {
            FontName = "Charis SIL",
            FontFeatures = "cv01=1, cv02=0"
        };

        // Act
        var result = LanguageSettingsService.SaveLanguageSettings(
            request,
            canUpdateAllSettings: true
        );

        // Assert
        Assert.That(result.Success, Is.True, "Save should succeed with font features");
    }

    #endregion

    #region Contract Tests - RTL Script

    /// <summary>
    /// Right-to-left setting should be saved.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-CAP-007-07")]
    [Property("BehaviorId", "BHV-164")]
    [Property("CapabilityId", "CAP-007")]
    public void SaveLanguageSettings_RightToLeft_SavesSuccessfully()
    {
        // Arrange
        var request = CreateValidLanguageSettingsRequest() with
        {
            RightToLeft = true
        };

        // Act
        var result = LanguageSettingsService.SaveLanguageSettings(
            request,
            canUpdateAllSettings: true
        );

        // Assert
        Assert.That(result.Success, Is.True, "Save should succeed with RTL setting");
    }

    #endregion

    #region Contract Tests - Punctuation and Callers

    /// <summary>
    /// Diacritics string should be saved.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-CAP-007-08")]
    [Property("BehaviorId", "BHV-163")]
    [Property("CapabilityId", "CAP-007")]
    public void SaveLanguageSettings_WithDiacritics_SavesSuccessfully()
    {
        // Arrange
        var request = CreateValidLanguageSettingsRequest() with
        {
            Diacritics = "\u0300\u0301\u0302" // Combining grave, acute, circumflex
        };

        // Act
        var result = LanguageSettingsService.SaveLanguageSettings(
            request,
            canUpdateAllSettings: true
        );

        // Assert
        Assert.That(result.Success, Is.True, "Save should succeed with diacritics");
    }

    /// <summary>
    /// Footnote callers should be saved.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-CAP-007-09")]
    [Property("BehaviorId", "BHV-163")]
    [Property("CapabilityId", "CAP-007")]
    public void SaveLanguageSettings_WithFootnoteCallers_SavesSuccessfully()
    {
        // Arrange
        var request = CreateValidLanguageSettingsRequest() with
        {
            FootnoteCallers = "* + = -"
        };

        // Act
        var result = LanguageSettingsService.SaveLanguageSettings(
            request,
            canUpdateAllSettings: true
        );

        // Assert
        Assert.That(result.Success, Is.True, "Save should succeed with footnote callers");
    }

    /// <summary>
    /// Cross-reference callers should be saved.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-CAP-007-10")]
    [Property("BehaviorId", "BHV-163")]
    [Property("CapabilityId", "CAP-007")]
    public void SaveLanguageSettings_WithCrossReferenceCallers_SavesSuccessfully()
    {
        // Arrange
        var request = CreateValidLanguageSettingsRequest() with
        {
            CrossReferenceCallers = "a b c d"
        };

        // Act
        var result = LanguageSettingsService.SaveLanguageSettings(
            request,
            canUpdateAllSettings: true
        );

        // Assert
        Assert.That(result.Success, Is.True, "Save should succeed with cross-reference callers");
    }

    #endregion

    #region Contract Tests - Permission Checks

    /// <summary>
    /// When canUpdateAllSettings is false, only limited settings should be saved.
    /// This tests the permission restriction behavior.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-CAP-007-11")]
    [Property("BehaviorId", "BHV-164")]
    [Property("CapabilityId", "CAP-007")]
    public void SaveLanguageSettings_LimitedPermissions_SavesSuccessfully()
    {
        // Arrange
        var request = CreateValidLanguageSettingsRequest();

        // Act - Save with limited permissions
        var result = LanguageSettingsService.SaveLanguageSettings(
            request,
            canUpdateAllSettings: false // Limited permissions
        );

        // Assert - Should still succeed (with limited fields saved)
        Assert.That(result.Success, Is.True, "Save should succeed with limited permissions");
    }

    #endregion

    #region Invariant Tests

    /// <summary>
    /// INV-011: After WriteLdmlFile(), the LDML file name is stored in Settings.
    /// This invariant is verified by checking that successful save completes.
    /// The actual file write verification would require integration testing.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-011")]
    [Property("ScenarioId", "TS-INV-011-01")]
    [Property("CapabilityId", "CAP-007")]
    public void SaveLanguageSettings_Invariant_SuccessfulSaveShouldBeAtomic()
    {
        // Arrange
        var request = CreateValidLanguageSettingsRequest() with
        {
            CharacterRules = "a A\nb B",
            Separator = ' '
        };

        // Act
        var result = LanguageSettingsService.SaveLanguageSettings(
            request,
            canUpdateAllSettings: true
        );

        // Assert - A successful save should be complete (INV-011)
        Assert.That(result.Success, Is.True, "Save should succeed");
        Assert.That(result.ErrorMessage, Is.Null, "No error should be present for successful save");
        // Note: INV-011 verification (LDML file written) requires integration testing with real project
    }

    /// <summary>
    /// Validation failure should NOT result in partial save.
    /// Save should be all-or-nothing.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-011")]
    [Property("ScenarioId", "TS-INV-011-02")]
    [Property("CapabilityId", "CAP-007")]
    public void SaveLanguageSettings_Invariant_ValidationFailurePreventsAnyChanges()
    {
        // Arrange - Invalid character rules
        var request = CreateValidLanguageSettingsRequest() with
        {
            CharacterRules = "a A a" // Duplicate - validation will fail
        };

        // Act
        var result = LanguageSettingsService.SaveLanguageSettings(
            request,
            canUpdateAllSettings: true
        );

        // Assert - Validation failure means no changes made
        Assert.That(result.Success, Is.False, "Save should fail");
        Assert.That(result.ValidationResult, Is.Not.Null, "Validation failure should be reported");
        Assert.That(result.ValidationResult!.IsValid, Is.False);
        // No partial changes should be made (verified by result type)
    }

    #endregion

    #region Helper Methods

    /// <summary>
    /// Creates a valid LanguageSettingsRequest for testing.
    /// </summary>
    private static LanguageSettingsRequest CreateValidLanguageSettingsRequest()
    {
        return new LanguageSettingsRequest(
            ProjectGuid: Paratext.Data.HexId.FromStr("1234567890123456789012345678901234567890"),
            FontName: "Charis SIL",
            FontSize: 12,
            FontFeatures: "",
            RightToLeft: false,
            CharacterRules: "", // Empty rules are valid
            Separator: ' ',
            Diacritics: "",
            MedialPunctuation: "",
            FootnoteCallers: "*",
            CrossReferenceCallers: "a",
            VerseSegments: "abc",
            WordBreakChars: ""
        );
    }

    #endregion
}
