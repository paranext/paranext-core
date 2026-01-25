using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.CreatingProjects;

namespace TestParanextDataProvider.CreatingProjects;

/// <summary>
/// Tests for ProjectNameService.ValidateShortName implementing CAP-EXT-003 (ShortNameValidator).
///
/// These tests verify that the extracted validation logic correctly enforces
/// short name rules VAL-001 through VAL-005.
/// </summary>
/// <remarks>
/// Golden master: gm-003-short-name-validation
/// </remarks>
[TestFixture]
[ExcludeFromCodeCoverage]
[Category("Extraction")]
internal class ProjectNameValidatorTests
{
    #region CAP-EXT-003: Valid Names

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-003")]
    [Property("GoldenMaster", "gm-003")]
    [Property("BehaviorId", "BHV-029")]
    [Property("ScenarioId", "TS-VAL-001")]
    [Description("Valid short name (3 characters) returns success")]
    public void ValidateShortName_ThreeCharacters_ReturnsValid()
    {
        // Arrange
        var shortName = "ABC";

        // Act
        var result = ProjectNameService.ValidateShortName(shortName, isNewProject: true);

        // Assert
        Assert.That(result.IsValid, Is.True);
        Assert.That(result.ErrorCode, Is.Null);
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-003")]
    [Property("GoldenMaster", "gm-003")]
    [Property("BehaviorId", "BHV-029")]
    [Property("ScenarioId", "TS-VAL-002")]
    [Description("Valid short name (8 characters) returns success")]
    public void ValidateShortName_EightCharacters_ReturnsValid()
    {
        // Arrange
        var shortName = "TestProj";

        // Act
        var result = ProjectNameService.ValidateShortName(shortName, isNewProject: true);

        // Assert
        Assert.That(result.IsValid, Is.True);
        Assert.That(result.ErrorCode, Is.Null);
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-003")]
    [Property("GoldenMaster", "gm-003")]
    [Property("BehaviorId", "BHV-029")]
    [Property("ScenarioId", "TS-VAL-003")]
    [Description("Valid short name with underscore and digits returns success")]
    public void ValidateShortName_WithUnderscoreAndDigits_ReturnsValid()
    {
        // Arrange
        var shortName = "Test_123";

        // Act
        var result = ProjectNameService.ValidateShortName(shortName, isNewProject: true);

        // Assert
        Assert.That(result.IsValid, Is.True);
        Assert.That(result.ErrorCode, Is.Null);
    }

    #endregion

    #region CAP-EXT-003: VAL-001 - Length Validation

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-003")]
    [Property("GoldenMaster", "gm-003")]
    [Property("BehaviorId", "BHV-029")]
    [Property("ValidationRule", "VAL-001")]
    [Property("ScenarioId", "TS-VAL-004")]
    [Description("Short name less than 3 characters returns too short error")]
    public void ValidateShortName_TooShort_ReturnsError()
    {
        // Arrange
        var shortName = "AB";

        // Act
        var result = ProjectNameService.ValidateShortName(shortName, isNewProject: true);

        // Assert
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("ShortName_TooShort"));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-003")]
    [Property("GoldenMaster", "gm-003")]
    [Property("BehaviorId", "BHV-029")]
    [Property("ValidationRule", "VAL-001")]
    [Property("ScenarioId", "TS-VAL-005")]
    [Description("Short name more than 8 characters returns too long error")]
    public void ValidateShortName_TooLong_ReturnsError()
    {
        // Arrange
        var shortName = "ABCDEFGHI";

        // Act
        var result = ProjectNameService.ValidateShortName(shortName, isNewProject: true);

        // Assert
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("ShortName_TooLong"));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-003")]
    [Property("GoldenMaster", "gm-003")]
    [Property("BehaviorId", "BHV-029")]
    [Property("ValidationRule", "VAL-001")]
    [Property("ScenarioId", "TS-VAL-006")]
    [Description("Single character name returns too short error")]
    public void ValidateShortName_SingleCharacter_ReturnsError()
    {
        // Arrange
        var shortName = "A";

        // Act
        var result = ProjectNameService.ValidateShortName(shortName, isNewProject: true);

        // Assert
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("ShortName_TooShort"));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-003")]
    [Property("GoldenMaster", "gm-003")]
    [Property("BehaviorId", "BHV-029")]
    [Property("ValidationRule", "VAL-001")]
    [Property("ScenarioId", "TS-VAL-007")]
    [Description("Empty name returns too short error")]
    public void ValidateShortName_Empty_ReturnsError()
    {
        // Arrange
        var shortName = "";

        // Act
        var result = ProjectNameService.ValidateShortName(shortName, isNewProject: true);

        // Assert
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("ShortName_TooShort"));
    }

    #endregion

    #region CAP-EXT-003: VAL-002 - Invalid Characters

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-003")]
    [Property("GoldenMaster", "gm-003")]
    [Property("BehaviorId", "BHV-029")]
    [Property("ValidationRule", "VAL-002")]
    [Property("ScenarioId", "TS-VAL-008")]
    [Description("Short name with special characters returns invalid char error")]
    public void ValidateShortName_WithSpecialCharacter_ReturnsError()
    {
        // Arrange
        var shortName = "Test@Proj";

        // Act
        var result = ProjectNameService.ValidateShortName(shortName, isNewProject: true);

        // Assert
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("ShortName_InvalidChar"));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-003")]
    [Property("GoldenMaster", "gm-003")]
    [Property("BehaviorId", "BHV-029")]
    [Property("ValidationRule", "VAL-002")]
    [Property("ScenarioId", "TS-VAL-009")]
    [Description("Short name with hyphen returns invalid char error")]
    public void ValidateShortName_WithHyphen_ReturnsError()
    {
        // Arrange
        var shortName = "Test-Proj";

        // Act
        var result = ProjectNameService.ValidateShortName(shortName, isNewProject: true);

        // Assert
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("ShortName_InvalidChar"));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-003")]
    [Property("GoldenMaster", "gm-003")]
    [Property("BehaviorId", "BHV-029")]
    [Property("ValidationRule", "VAL-002")]
    [Property("ScenarioId", "TS-VAL-010")]
    [Description("Short name with period returns invalid char error")]
    public void ValidateShortName_WithPeriod_ReturnsError()
    {
        // Arrange
        var shortName = "Test.Proj";

        // Act
        var result = ProjectNameService.ValidateShortName(shortName, isNewProject: true);

        // Assert
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("ShortName_InvalidChar"));
    }

    #endregion

    #region CAP-EXT-003: VAL-003 - Whitespace

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-003")]
    [Property("GoldenMaster", "gm-003")]
    [Property("BehaviorId", "BHV-029")]
    [Property("ValidationRule", "VAL-003")]
    [Property("ScenarioId", "TS-VAL-011")]
    [Description("Short name with space returns has space error")]
    public void ValidateShortName_WithSpace_ReturnsError()
    {
        // Arrange
        var shortName = "Test Proj";

        // Act
        var result = ProjectNameService.ValidateShortName(shortName, isNewProject: true);

        // Assert
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("ShortName_HasSpace"));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-003")]
    [Property("GoldenMaster", "gm-003")]
    [Property("BehaviorId", "BHV-029")]
    [Property("ValidationRule", "VAL-003")]
    [Property("ScenarioId", "TS-VAL-012")]
    [Description("Short name with tab returns has space error")]
    public void ValidateShortName_WithTab_ReturnsError()
    {
        // Arrange
        var shortName = "Test\tProj";

        // Act
        var result = ProjectNameService.ValidateShortName(shortName, isNewProject: true);

        // Assert
        Assert.That(result.IsValid, Is.False);
        // Tab is whitespace, should return space error (or invalid char)
        Assert.That(
            result.ErrorCode,
            Is.EqualTo("ShortName_HasSpace").Or.EqualTo("ShortName_InvalidChar")
        );
    }

    #endregion

    #region CAP-EXT-003: VAL-004 - Windows Reserved Names

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-003")]
    [Property("GoldenMaster", "gm-003")]
    [Property("BehaviorId", "BHV-029")]
    [Property("ValidationRule", "VAL-004")]
    [Property("ScenarioId", "TS-VAL-013")]
    [Description("Reserved name CON returns reserved error")]
    public void ValidateShortName_CON_ReturnsReservedError()
    {
        // Arrange
        var shortName = "CON";

        // Act
        var result = ProjectNameService.ValidateShortName(shortName, isNewProject: true);

        // Assert
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("ShortName_Reserved"));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-003")]
    [Property("GoldenMaster", "gm-003")]
    [Property("BehaviorId", "BHV-029")]
    [Property("ValidationRule", "VAL-004")]
    [Property("ScenarioId", "TS-VAL-014")]
    [Description("Reserved name PRN returns reserved error")]
    public void ValidateShortName_PRN_ReturnsReservedError()
    {
        // Arrange
        var shortName = "PRN";

        // Act
        var result = ProjectNameService.ValidateShortName(shortName, isNewProject: true);

        // Assert
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("ShortName_Reserved"));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-003")]
    [Property("GoldenMaster", "gm-003")]
    [Property("BehaviorId", "BHV-029")]
    [Property("ValidationRule", "VAL-004")]
    [Property("ScenarioId", "TS-VAL-015")]
    [Description("Reserved name AUX returns reserved error")]
    public void ValidateShortName_AUX_ReturnsReservedError()
    {
        // Arrange
        var shortName = "AUX";

        // Act
        var result = ProjectNameService.ValidateShortName(shortName, isNewProject: true);

        // Assert
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("ShortName_Reserved"));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-003")]
    [Property("GoldenMaster", "gm-003")]
    [Property("BehaviorId", "BHV-029")]
    [Property("ValidationRule", "VAL-004")]
    [Property("ScenarioId", "TS-VAL-016")]
    [Description("Reserved name COM1 returns reserved error")]
    public void ValidateShortName_COM1_ReturnsReservedError()
    {
        // Arrange
        var shortName = "COM1";

        // Act
        var result = ProjectNameService.ValidateShortName(shortName, isNewProject: true);

        // Assert
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("ShortName_Reserved"));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-003")]
    [Property("GoldenMaster", "gm-003")]
    [Property("BehaviorId", "BHV-029")]
    [Property("ValidationRule", "VAL-004")]
    [Property("ScenarioId", "TS-VAL-017")]
    [Description("Reserved name LPT1 returns reserved error")]
    public void ValidateShortName_LPT1_ReturnsReservedError()
    {
        // Arrange
        var shortName = "LPT1";

        // Act
        var result = ProjectNameService.ValidateShortName(shortName, isNewProject: true);

        // Assert
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("ShortName_Reserved"));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-003")]
    [Property("GoldenMaster", "gm-003")]
    [Property("BehaviorId", "BHV-029")]
    [Property("ValidationRule", "VAL-004")]
    [Property("ScenarioId", "TS-VAL-018")]
    [Description("Reserved name NUL returns reserved error")]
    public void ValidateShortName_NUL_ReturnsReservedError()
    {
        // Arrange
        var shortName = "NUL";

        // Act
        var result = ProjectNameService.ValidateShortName(shortName, isNewProject: true);

        // Assert
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("ShortName_Reserved"));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-003")]
    [Property("GoldenMaster", "gm-003")]
    [Property("BehaviorId", "BHV-029")]
    [Property("ValidationRule", "VAL-004")]
    [Property("ScenarioId", "TS-VAL-019")]
    [Description("Reserved name is case-insensitive")]
    public void ValidateShortName_ReservedNameLowercase_ReturnsReservedError()
    {
        // Arrange
        var shortName = "con";

        // Act
        var result = ProjectNameService.ValidateShortName(shortName, isNewProject: true);

        // Assert
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("ShortName_Reserved"));
    }

    #endregion

    #region CAP-EXT-003: Edit Mode (originalName)

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-003")]
    [Property("GoldenMaster", "gm-003")]
    [Property("BehaviorId", "BHV-029")]
    [Property("ScenarioId", "TS-VAL-020")]
    [Description("Editing existing project with same name is valid")]
    public void ValidateShortName_EditModeSameName_ReturnsValid()
    {
        // Arrange
        var shortName = "TestProj";
        var originalName = "TestProj";

        // Act
        var result = ProjectNameService.ValidateShortName(
            shortName,
            isNewProject: false,
            originalName: originalName
        );

        // Assert
        Assert.That(result.IsValid, Is.True);
    }

    #endregion
}
