using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.CreatingProjects;

namespace TestParanextDataProvider.CreatingProjects;

/// <summary>
/// Tests for ProjectNameService.GenerateShortName implementing CAP-EXT-004 (ShortNameGenerator).
///
/// These tests verify that the short name generation algorithm correctly creates
/// abbreviations from full project names following the documented algorithm.
/// </summary>
/// <remarks>
/// Golden master: gm-004-name-generation
///
/// Algorithm:
/// 1. Extract first letter of each word (valid chars only)
/// 2. Extract digits separately (last 2 only)
/// 3. Combine: letters + digits
/// 4. Truncate to max 8 chars
/// 5. Pad to min 3 chars using last valid char
/// </remarks>
[TestFixture]
[ExcludeFromCodeCoverage]
[Category("Extraction")]
internal class ShortNameGeneratorTests
{
    #region CAP-EXT-004: Basic Generation

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-004")]
    [Property("GoldenMaster", "gm-004")]
    [Property("BehaviorId", "BHV-030")]
    [Property("ScenarioId", "TS-GEN-001")]
    [Description("Multiple words generates acronym from first letters")]
    public void GenerateShortName_MultipleWords_CreatesAcronym()
    {
        // Arrange
        var fullName = "My Paratext Project";

        // Act
        var shortName = ProjectNameService.GenerateShortName(fullName);

        // Assert - Expected: MPP (first letter of each word)
        Assert.That(shortName, Is.EqualTo("MPP"));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-004")]
    [Property("GoldenMaster", "gm-004")]
    [Property("BehaviorId", "BHV-030")]
    [Property("ScenarioId", "TS-GEN-002")]
    [Description("Words with digits extracts last 2 digits")]
    public void GenerateShortName_WithDigits_ExtractsLastTwoDigits()
    {
        // Arrange
        var fullName = "Translation 2024";

        // Act
        var shortName = ProjectNameService.GenerateShortName(fullName);

        // Assert - Expected: T24 (first letter + last 2 digits)
        Assert.That(shortName, Is.EqualTo("T24"));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-004")]
    [Property("GoldenMaster", "gm-004")]
    [Property("BehaviorId", "BHV-030")]
    [Property("ScenarioId", "TS-GEN-003")]
    [Description("Common translation name generates correct abbreviation")]
    public void GenerateShortName_NewInternationalVersion_CreatesNIV()
    {
        // Arrange
        var fullName = "New International Version";

        // Act
        var shortName = ProjectNameService.GenerateShortName(fullName);

        // Assert - Expected: NIV
        Assert.That(shortName, Is.EqualTo("NIV"));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-004")]
    [Property("GoldenMaster", "gm-004")]
    [Property("BehaviorId", "BHV-030")]
    [Property("ScenarioId", "TS-GEN-004")]
    [Description("Version with year in name includes digits")]
    public void GenerateShortName_EnglishStandardVersion2021_IncludesDigits()
    {
        // Arrange
        var fullName = "English Standard Version 2021";

        // Act
        var shortName = ProjectNameService.GenerateShortName(fullName);

        // Assert - Expected: ESV21 (first letters + last 2 digits)
        Assert.That(shortName, Is.EqualTo("ESV21"));
    }

    #endregion

    #region CAP-EXT-004: Padding to Minimum Length

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-004")]
    [Property("GoldenMaster", "gm-004")]
    [Property("BehaviorId", "BHV-030")]
    [Property("ScenarioId", "TS-GEN-005")]
    [Description("Two letter result is padded to 3 characters")]
    public void GenerateShortName_TwoWords_PadsToMinimum()
    {
        // Arrange
        var fullName = "A B";

        // Act
        var shortName = ProjectNameService.GenerateShortName(fullName);

        // Assert - Expected: ABB (padded with last valid char)
        Assert.That(shortName, Is.EqualTo("ABB"));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-004")]
    [Property("GoldenMaster", "gm-004")]
    [Property("BehaviorId", "BHV-030")]
    [Property("ScenarioId", "TS-GEN-006")]
    [Description("Single word pads to 3 characters")]
    public void GenerateShortName_SingleWord_PadsToMinimum()
    {
        // Arrange
        var fullName = "Test";

        // Act
        var shortName = ProjectNameService.GenerateShortName(fullName);

        // Assert - Expected: TTT (single letter padded to 3)
        Assert.That(shortName, Is.EqualTo("TTT"));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-004")]
    [Property("GoldenMaster", "gm-004")]
    [Property("BehaviorId", "BHV-030")]
    [Property("ScenarioId", "TS-GEN-007")]
    [Description("OneWord input pads first letter")]
    public void GenerateShortName_OneWordNoSpaces_PadsToMinimum()
    {
        // Arrange
        var fullName = "OneWord";

        // Act
        var shortName = ProjectNameService.GenerateShortName(fullName);

        // Assert - Expected: OOO (single letter O padded to 3)
        Assert.That(shortName, Is.EqualTo("OOO"));
    }

    #endregion

    #region CAP-EXT-004: Truncation to Maximum Length

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-004")]
    [Property("GoldenMaster", "gm-004")]
    [Property("BehaviorId", "BHV-030")]
    [Property("ScenarioId", "TS-GEN-008")]
    [Description("Long name is truncated to 8 characters")]
    public void GenerateShortName_VeryLongName_TruncatesToMaximum()
    {
        // Arrange
        var fullName = "A Very Long Project Name Indeed";

        // Act
        var shortName = ProjectNameService.GenerateShortName(fullName);

        // Assert - Expected: AVLPNI (6 letters, truncated at max 8)
        Assert.That(shortName, Is.EqualTo("AVLPNI"));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-004")]
    [Property("GoldenMaster", "gm-004")]
    [Property("BehaviorId", "BHV-030")]
    [Property("ScenarioId", "TS-GEN-009")]
    [Description("Many words truncate first letters to 8 max")]
    public void GenerateShortName_ManyWords_TruncatesToEight()
    {
        // Arrange
        var fullName = "a b c d e f g h i j";

        // Act
        var shortName = ProjectNameService.GenerateShortName(fullName);

        // Assert - Should be truncated to 8 characters
        Assert.That(shortName, Is.EqualTo("abcdefgh"));
        Assert.That(shortName.Length, Is.LessThanOrEqualTo(8));
    }

    #endregion

    #region CAP-EXT-004: Digit Handling

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-004")]
    [Property("GoldenMaster", "gm-004")]
    [Property("BehaviorId", "BHV-030")]
    [Property("ScenarioId", "TS-GEN-010")]
    [Description("Multiple numbers extracts only last 2 digits")]
    public void GenerateShortName_ManyNumbers_ExtractsLastTwo()
    {
        // Arrange
        var fullName = "Project With 123456 Numbers";

        // Act
        var shortName = ProjectNameService.GenerateShortName(fullName);

        // Assert - Expected: PWN56 (letters + last 2 digits)
        Assert.That(shortName, Is.EqualTo("PWN56"));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-004")]
    [Property("GoldenMaster", "gm-004")]
    [Property("BehaviorId", "BHV-030")]
    [Property("ScenarioId", "TS-GEN-011")]
    [Description("Vietnamese translation with year")]
    public void GenerateShortName_KinhThanhTiengViet1926_IncludesDigits()
    {
        // Arrange
        var fullName = "Kinh Thanh Tieng Viet 1926";

        // Act
        var shortName = ProjectNameService.GenerateShortName(fullName);

        // Assert - Expected: KTTV26 (first letters + last 2 digits)
        Assert.That(shortName, Is.EqualTo("KTTV26"));
    }

    #endregion

    #region CAP-EXT-004: Edge Cases

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-004")]
    [Property("GoldenMaster", "gm-004")]
    [Property("BehaviorId", "BHV-030")]
    [Property("ScenarioId", "TS-GEN-012")]
    [Description("Empty input returns empty string")]
    public void GenerateShortName_EmptyInput_ReturnsEmpty()
    {
        // Arrange
        var fullName = "";

        // Act
        var shortName = ProjectNameService.GenerateShortName(fullName);

        // Assert - Empty input should return empty
        Assert.That(shortName, Is.EqualTo(""));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-004")]
    [Property("GoldenMaster", "gm-004")]
    [Property("BehaviorId", "BHV-030")]
    [Property("ScenarioId", "TS-GEN-013")]
    [Description("Whitespace only returns empty string")]
    public void GenerateShortName_WhitespaceOnly_ReturnsEmpty()
    {
        // Arrange
        var fullName = "   ";

        // Act
        var shortName = ProjectNameService.GenerateShortName(fullName);

        // Assert - Whitespace-only should return empty
        Assert.That(shortName, Is.EqualTo(""));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-004")]
    [Property("GoldenMaster", "gm-004")]
    [Property("BehaviorId", "BHV-030")]
    [Property("ScenarioId", "TS-GEN-014")]
    [Description("Only valid characters are used")]
    public void GenerateShortName_WithInvalidCharacters_UsesOnlyValid()
    {
        // Arrange - Contains special characters that should be ignored
        var fullName = "Test@Project#Name";

        // Act
        var shortName = ProjectNameService.GenerateShortName(fullName);

        // Assert - Only valid characters (letters, digits, underscore) should be used
        Assert.That(shortName, Does.Not.Contain("@"));
        Assert.That(shortName, Does.Not.Contain("#"));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-004")]
    [Property("GoldenMaster", "gm-004")]
    [Property("BehaviorId", "BHV-030")]
    [Property("ScenarioId", "TS-GEN-015")]
    [Description("Null input throws ArgumentNullException")]
    public void GenerateShortName_NullInput_ThrowsArgumentNullException()
    {
        // Arrange
        string? fullName = null;

        // Act & Assert
        Assert.That(
            () => ProjectNameService.GenerateShortName(fullName!),
            Throws.ArgumentNullException
        );
    }

    #endregion
}
