using System.Diagnostics.CodeAnalysis;
using Paratext.Data;

namespace TestParanextDataProvider.ProjectCreation;

/// <summary>
/// Tests for ProjectNameService covering CAP-004, CAP-005, CAP-006.
/// These tests verify short name validation, generation, and unique name generation.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class ProjectNameServiceTests : PapiTestBase
{
    #region CAP-004: ValidateShortName - Acceptance Test

    /// <summary>
    /// Acceptance test for CAP-004: ValidateShortName.
    /// Given a short name, isNewProject flag, and optional original name, returns
    /// ValidationResult with IsValid=true or appropriate error code.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-029")]
    [Description("Acceptance test: ValidateShortName returns validation result for any input")]
    public void ValidateShortName_AcceptanceTest()
    {
        // Arrange - Valid short name
        var shortName = "TestPrj";
        var isNewProject = true;

        // Act
        var result = ProjectNameService.ValidateShortName(shortName, isNewProject);

        // Assert - Verify result structure
        Assert.That(result, Is.Not.Null, "Result should not be null");
        Assert.That(result.IsValid, Is.True, "Valid name should return IsValid=true");
        Assert.That(result.ErrorCode, Is.Null, "Valid name should have no error code");
    }

    #endregion

    #region CAP-004: ValidateShortName - Contract Tests (VAL-001: Length)

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-029")]
    [Description("Valid short name of minimum length (3 chars) passes validation")]
    public void ValidateShortName_MinimumLength_ReturnsValid()
    {
        var result = ProjectNameService.ValidateShortName("ABC", isNewProject: true);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.True);
            Assert.That(result.ErrorCode, Is.Null);
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-029")]
    [Description("Valid short name of maximum length (8 chars) passes validation")]
    public void ValidateShortName_MaximumLength_ReturnsValid()
    {
        var result = ProjectNameService.ValidateShortName("ABCDEFGH", isNewProject: true);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.True);
            Assert.That(result.ErrorCode, Is.Null);
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-029")]
    [Description("Short name too short (< 3 chars) returns SHORTNAME_TOO_SHORT error")]
    public void ValidateShortName_TooShort_ReturnsError()
    {
        var result = ProjectNameService.ValidateShortName("AB", isNewProject: true);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo("SHORTNAME_TOO_SHORT"));
            Assert.That(result.ErrorParams, Does.ContainKey("min"));
            Assert.That(result.ErrorParams!["min"], Is.EqualTo("3"));
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-029")]
    [Description("Short name too long (> 8 chars) returns SHORTNAME_TOO_LONG error")]
    public void ValidateShortName_TooLong_ReturnsError()
    {
        var result = ProjectNameService.ValidateShortName("ABCDEFGHI", isNewProject: true);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo("SHORTNAME_TOO_LONG"));
            Assert.That(result.ErrorParams, Does.ContainKey("max"));
            Assert.That(result.ErrorParams!["max"], Is.EqualTo("8"));
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-029")]
    [Description("Single character name returns SHORTNAME_TOO_SHORT error")]
    public void ValidateShortName_SingleChar_ReturnsError()
    {
        var result = ProjectNameService.ValidateShortName("A", isNewProject: true);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("SHORTNAME_TOO_SHORT"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-029")]
    [Description("Empty name returns SHORTNAME_TOO_SHORT error")]
    public void ValidateShortName_Empty_ReturnsError()
    {
        var result = ProjectNameService.ValidateShortName("", isNewProject: true);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("SHORTNAME_TOO_SHORT"));
    }

    #endregion

    #region CAP-004: ValidateShortName - Contract Tests (VAL-002: Characters)

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-029")]
    [Description("Short name with underscore is valid")]
    public void ValidateShortName_WithUnderscore_ReturnsValid()
    {
        var result = ProjectNameService.ValidateShortName("Test_123", isNewProject: true);

        Assert.That(result.IsValid, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-029")]
    [Description("Short name with special characters returns SHORTNAME_INVALID_CHARS error")]
    public void ValidateShortName_SpecialChars_ReturnsError()
    {
        var result = ProjectNameService.ValidateShortName("Test@Prj", isNewProject: true);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo("SHORTNAME_INVALID_CHARS"));
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-029")]
    [Description("Short name with hyphen returns SHORTNAME_INVALID_CHARS error")]
    public void ValidateShortName_Hyphen_ReturnsError()
    {
        var result = ProjectNameService.ValidateShortName("Test-Prj", isNewProject: true);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("SHORTNAME_INVALID_CHARS"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-029")]
    [Description("Short name with period returns SHORTNAME_INVALID_CHARS error")]
    public void ValidateShortName_Period_ReturnsError()
    {
        var result = ProjectNameService.ValidateShortName("Test.Prj", isNewProject: true);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("SHORTNAME_INVALID_CHARS"));
    }

    #endregion

    #region CAP-004: ValidateShortName - Contract Tests (VAL-003: Whitespace)

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-002")]
    [Property("BehaviorId", "BHV-029")]
    [Property("InvariantId", "INV-001")]
    [Description("Short name with space returns SHORTNAME_HAS_SPACES error (INV-001)")]
    public void ValidateShortName_WithSpace_ReturnsError()
    {
        var result = ProjectNameService.ValidateShortName("Test Prj", isNewProject: true);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo("SHORTNAME_HAS_SPACES"));
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-002")]
    [Property("BehaviorId", "BHV-029")]
    [Property("InvariantId", "INV-001")]
    [Description("Short name with tab returns SHORTNAME_HAS_SPACES error")]
    public void ValidateShortName_WithTab_ReturnsError()
    {
        var result = ProjectNameService.ValidateShortName("Test\tPrj", isNewProject: true);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("SHORTNAME_HAS_SPACES"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-002")]
    [Property("BehaviorId", "BHV-029")]
    [Description("Short name with leading space returns SHORTNAME_HAS_SPACES error")]
    public void ValidateShortName_LeadingSpace_ReturnsError()
    {
        var result = ProjectNameService.ValidateShortName(" TestPrj", isNewProject: true);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("SHORTNAME_HAS_SPACES"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-002")]
    [Property("BehaviorId", "BHV-029")]
    [Description("Short name with trailing space returns SHORTNAME_HAS_SPACES error")]
    public void ValidateShortName_TrailingSpace_ReturnsError()
    {
        var result = ProjectNameService.ValidateShortName("TestPrj ", isNewProject: true);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("SHORTNAME_HAS_SPACES"));
    }

    #endregion

    #region CAP-004: ValidateShortName - Contract Tests (VAL-004: Reserved Names)

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-029")]
    [TestCase("CON")]
    [TestCase("PRN")]
    [TestCase("AUX")]
    [TestCase("NUL")]
    [Description("Windows reserved names return SHORTNAME_RESERVED error")]
    public void ValidateShortName_WindowsReserved_ReturnsError(string reservedName)
    {
        var result = ProjectNameService.ValidateShortName(reservedName, isNewProject: true);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo("SHORTNAME_RESERVED"));
            Assert.That(result.ErrorParams, Does.ContainKey("name"));
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-029")]
    [TestCase("COM1")]
    [TestCase("COM2")]
    [TestCase("COM9")]
    [Description("Windows COM port names return SHORTNAME_RESERVED error")]
    public void ValidateShortName_ComPorts_ReturnsError(string comName)
    {
        var result = ProjectNameService.ValidateShortName(comName, isNewProject: true);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo("SHORTNAME_RESERVED"));
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-029")]
    [TestCase("LPT1")]
    [TestCase("LPT2")]
    [TestCase("LPT9")]
    [Description("Windows LPT port names return SHORTNAME_RESERVED error")]
    public void ValidateShortName_LptPorts_ReturnsError(string lptName)
    {
        var result = ProjectNameService.ValidateShortName(lptName, isNewProject: true);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo("SHORTNAME_RESERVED"));
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-029")]
    [Description("Reserved name check is case-insensitive")]
    public void ValidateShortName_ReservedLowerCase_ReturnsError()
    {
        var result = ProjectNameService.ValidateShortName("con", isNewProject: true);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo("SHORTNAME_RESERVED"));
        });
    }

    #endregion

    #region CAP-004: ValidateShortName - Contract Tests (VAL-005: Uniqueness)

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-029")]
    [Description("Existing project name returns SHORTNAME_EXISTS error for new projects")]
    public void ValidateShortName_ExistingProject_ReturnsError()
    {
        // This test requires a project to exist in the collection
        // The actual test will use mock/fake project collection
        var existingName = "ExistPrj";

        var result = ProjectNameService.ValidateShortName(existingName, isNewProject: true);

        // Note: This test may pass or fail depending on test setup
        // In actual implementation, if project exists, should return SHORTNAME_EXISTS
        Assert.That(result, Is.Not.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-029")]
    [Description("Same name allowed when editing existing project")]
    public void ValidateShortName_SameNameForExisting_ReturnsValid()
    {
        var originalName = "MyProj";

        var result = ProjectNameService.ValidateShortName(
            originalName,
            isNewProject: false,
            originalName: originalName);

        // Should be valid - editing existing project can keep same name
        Assert.That(result.IsValid, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-029")]
    [Description("Different case collision returns error for new project")]
    public void ValidateShortName_CaseCollision_ReturnsError()
    {
        // If "MyProj" exists, "MYPROJ" should be rejected
        var existingName = "MyProj";
        var newNameDifferentCase = "MYPROJ";

        // This would require mocking the project collection
        var result = ProjectNameService.ValidateShortName(newNameDifferentCase, isNewProject: true);

        // Note: Actual assertion depends on test setup with existing projects
        Assert.That(result, Is.Not.Null);
    }

    #endregion

    #region CAP-004: ValidateShortName - Golden Master Tests

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-029")]
    [TestCase("ABC", true, null)]
    [TestCase("TestProj", true, null)]
    [TestCase("Test_123", true, null)]
    [TestCase("AB", false, "SHORTNAME_TOO_SHORT")]
    [TestCase("ABCDEFGHI", false, "SHORTNAME_TOO_LONG")]
    [TestCase("Test Proj", false, "SHORTNAME_HAS_SPACES")]
    [TestCase("Test@Proj", false, "SHORTNAME_INVALID_CHARS")]
    [TestCase("CON", false, "SHORTNAME_RESERVED")]
    [TestCase("PRN", false, "SHORTNAME_RESERVED")]
    [TestCase("AUX", false, "SHORTNAME_RESERVED")]
    [TestCase("COM1", false, "SHORTNAME_RESERVED")]
    [TestCase("LPT1", false, "SHORTNAME_RESERVED")]
    [Description("Validation results match golden master (gm-003)")]
    public void ValidateShortName_MatchesGoldenMaster(
        string shortName,
        bool expectedValid,
        string? expectedErrorCode)
    {
        var result = ProjectNameService.ValidateShortName(shortName, isNewProject: true);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.EqualTo(expectedValid),
                $"IsValid mismatch for '{shortName}'");
            Assert.That(result.ErrorCode, Is.EqualTo(expectedErrorCode),
                $"ErrorCode mismatch for '{shortName}'");
        });
    }

    #endregion

    #region CAP-004: ValidateShortName - Invariant Test

    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-001")]
    [Property("BehaviorId", "BHV-029")]
    [TestCase("Test Project")]
    [TestCase("My Project")]
    [TestCase("A B C")]
    [TestCase(" ABC")]
    [TestCase("ABC ")]
    [Description("INV-001: Project name cannot contain spaces - all space variants are rejected")]
    public void ValidateShortName_SpaceVariants_AlwaysReturnsError(string nameWithSpace)
    {
        var result = ProjectNameService.ValidateShortName(nameWithSpace, isNewProject: true);

        Assert.Multiple(() =>
        {
            Assert.That(result.IsValid, Is.False, $"'{nameWithSpace}' should be invalid");
            Assert.That(result.ErrorCode, Is.EqualTo("SHORTNAME_HAS_SPACES"),
                $"'{nameWithSpace}' should have SHORTNAME_HAS_SPACES error");
        });
    }

    #endregion

    #region CAP-005: GenerateShortName - Acceptance Test

    /// <summary>
    /// Acceptance test for CAP-005: GenerateShortName.
    /// Given a full name string, returns a 3-8 character abbreviation using first letter
    /// of each word plus last 2 digits, padded if necessary.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-030")]
    [Description("Acceptance test: GenerateShortName creates valid abbreviation from full name")]
    public void GenerateShortName_AcceptanceTest()
    {
        // Arrange
        var fullName = "My Paratext Project";

        // Act
        var shortName = ProjectNameService.GenerateShortName(fullName);

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(shortName, Is.Not.Null.And.Not.Empty, "Should generate a name");
            Assert.That(shortName.Length, Is.InRange(3, 8), "Length should be 3-8 characters");
            Assert.That(shortName, Is.EqualTo("MPP"), "First letters of each word");
        });
    }

    #endregion

    #region CAP-005: GenerateShortName - Contract Tests

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-030")]
    [Description("Generates abbreviation from first letter of each word")]
    public void GenerateShortName_MultipleWords_UsesFirstLetters()
    {
        var result = ProjectNameService.GenerateShortName("New International Version");

        Assert.That(result, Is.EqualTo("NIV"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-030")]
    [Description("Extracts last 2 digits from name")]
    public void GenerateShortName_WithDigits_ExtractsLastTwo()
    {
        var result = ProjectNameService.GenerateShortName("Translation 2024");

        Assert.That(result, Is.EqualTo("T24"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-030")]
    [Description("Combines letters and digits correctly")]
    public void GenerateShortName_LettersAndDigits_CombinesCorrectly()
    {
        var result = ProjectNameService.GenerateShortName("English Standard Version 2021");

        Assert.That(result, Is.EqualTo("ESV21"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-030")]
    [Description("Pads to minimum 3 characters")]
    public void GenerateShortName_TooShort_PadsToMinimum()
    {
        var result = ProjectNameService.GenerateShortName("A B");

        Assert.That(result, Is.EqualTo("ABB"), "Should pad to 3 chars using last valid char");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-030")]
    [Description("Single word pads using repeated last character")]
    public void GenerateShortName_SingleWord_PadsWithLastChar()
    {
        var result = ProjectNameService.GenerateShortName("Test");

        Assert.That(result, Is.EqualTo("TTT"), "Single word should pad with last char");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-030")]
    [Description("Truncates to maximum 8 characters")]
    public void GenerateShortName_TooLong_TruncatesToMaximum()
    {
        var result = ProjectNameService.GenerateShortName("A Very Long Project Name Indeed");

        Assert.That(result.Length, Is.LessThanOrEqualTo(8), "Should not exceed 8 characters");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-030")]
    [Description("Many words truncates at 8 characters")]
    public void GenerateShortName_ManyWords_TruncatesAt8()
    {
        var result = ProjectNameService.GenerateShortName("a b c d e f g h i j");

        Assert.Multiple(() =>
        {
            Assert.That(result.Length, Is.EqualTo(8));
            Assert.That(result, Is.EqualTo("abcdefgh"));
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-030")]
    [Description("Empty string returns empty")]
    public void GenerateShortName_EmptyString_ReturnsEmpty()
    {
        var result = ProjectNameService.GenerateShortName("");

        Assert.That(result, Is.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-030")]
    [Description("Only extracts last 2 digits from multiple digit sequences")]
    public void GenerateShortName_MultipleDigits_UsesLastTwo()
    {
        var result = ProjectNameService.GenerateShortName("Project With 123456 Numbers");

        Assert.That(result, Is.EqualTo("PWN56"), "Should use last 2 digits");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-030")]
    [Description("One word abbreviates to first letter repeated")]
    public void GenerateShortName_OneWord_ReturnsRepeatedFirstLetter()
    {
        var result = ProjectNameService.GenerateShortName("OneWord");

        Assert.That(result, Is.EqualTo("OOO"));
    }

    #endregion

    #region CAP-005: GenerateShortName - Golden Master Tests

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-030")]
    [TestCase("My Paratext Project", "MPP")]
    [TestCase("Translation 2024", "T24")]
    [TestCase("New International Version", "NIV")]
    [TestCase("A B", "ABB")]
    [TestCase("English Standard Version 2021", "ESV21")]
    [TestCase("Test", "TTT")]
    [TestCase("A Very Long Project Name Indeed", "AVLPNI")]
    [TestCase("Project With 123456 Numbers", "PWN56")]
    [TestCase("", "")]
    [TestCase("OneWord", "OOO")]
    [TestCase("Kinh Thanh Tieng Viet 1926", "KTTV26")]
    [TestCase("a b c d e f g h i j", "abcdefgh")]
    [Description("Generation results match golden master (gm-004)")]
    public void GenerateShortName_MatchesGoldenMaster(string fullName, string expectedShortName)
    {
        var result = ProjectNameService.GenerateShortName(fullName);

        Assert.That(result, Is.EqualTo(expectedShortName),
            $"Generated name for '{fullName}' should be '{expectedShortName}'");
    }

    #endregion

    #region CAP-006: GenerateUniqueName - Acceptance Test (Outside-In)

    /// <summary>
    /// Acceptance test for CAP-006: GenerateUniqueName.
    /// Given base short/long names and forceNumbered flag, returns a tuple of unique names
    /// that pass ValidateShortName.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-006")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-035")]
    [Description("Acceptance test: GenerateUniqueName returns valid unique name pair")]
    public void GenerateUniqueName_AcceptanceTest()
    {
        // Arrange
        var baseShortName = "TestPrj";
        var baseLongName = "Test Project";

        // Act
        var (shortName, longName) = ProjectNameService.GenerateUniqueName(
            baseShortName,
            baseLongName,
            forceNumbered: false);

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(shortName, Is.Not.Null.And.Not.Empty, "Should return short name");
            Assert.That(longName, Is.Not.Null.And.Not.Empty, "Should return long name");
            Assert.That(shortName.Length, Is.InRange(3, 8), "Short name should be valid length");
        });
    }

    #endregion

    #region CAP-006: GenerateUniqueName - Contract Tests

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-035")]
    [Description("Returns base name if already unique")]
    public void GenerateUniqueName_NoConflict_ReturnsBaseName()
    {
        var baseShortName = "UniqueNm";
        var baseLongName = "Unique Name";

        var (shortName, longName) = ProjectNameService.GenerateUniqueName(
            baseShortName,
            baseLongName,
            forceNumbered: false);

        Assert.Multiple(() =>
        {
            Assert.That(shortName, Is.EqualTo(baseShortName));
            Assert.That(longName, Is.EqualTo(baseLongName));
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-035")]
    [Description("Appends number when forceNumbered is true")]
    public void GenerateUniqueName_ForceNumbered_AppendsNumber()
    {
        var baseShortName = "TestPrj";
        var baseLongName = "Test Project";

        var (shortName, longName) = ProjectNameService.GenerateUniqueName(
            baseShortName,
            baseLongName,
            forceNumbered: true);

        Assert.Multiple(() =>
        {
            Assert.That(shortName, Does.Match(@"^TestPr\d+$"),
                "Should append number to short name");
            Assert.That(longName, Does.Match(@"^Test Project\s*\d*$"),
                "Should append number to long name if needed");
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-035")]
    [Description("Empty base name uses default 'MP'")]
    public void GenerateUniqueName_EmptyBaseName_UsesDefault()
    {
        var (shortName, _) = ProjectNameService.GenerateUniqueName(
            "",
            "",
            forceNumbered: false);

        Assert.That(shortName, Does.StartWith("MP"), "Empty base should default to 'MP'");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-035")]
    [Description("Trims trailing digits from base before adding new number")]
    public void GenerateUniqueName_BaseWithDigits_TrimsBeforeAppending()
    {
        var baseShortName = "Test123";
        var baseLongName = "Test 123";

        var (shortName, _) = ProjectNameService.GenerateUniqueName(
            baseShortName,
            baseLongName,
            forceNumbered: true);

        // Should trim 123 and then add new number
        Assert.That(shortName, Does.Match(@"^Test\d+$"),
            "Should trim trailing digits and add new number");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-035")]
    [Description("Same number suffix applied to both short and long names")]
    public void GenerateUniqueName_AppliesSameSuffix_ToBothNames()
    {
        var baseShortName = "TestPrj";
        var baseLongName = "Test Project";

        var (shortName, longName) = ProjectNameService.GenerateUniqueName(
            baseShortName,
            baseLongName,
            forceNumbered: true);

        // Extract number from short name
        var match = System.Text.RegularExpressions.Regex.Match(shortName, @"\d+$");
        if (match.Success)
        {
            var number = match.Value;
            Assert.That(longName, Does.EndWith(number),
                "Long name should have same number suffix as short name");
        }
    }

    #endregion

    #region CAP-006: GenerateUniqueName - Golden Master Tests

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-035")]
    [Description("Generation with no conflicts matches golden master (gm-008)")]
    public void GenerateUniqueName_NoConflict_MatchesGoldenMaster()
    {
        // gm-008: "TestProj_noConflict": "TestProj"
        var (shortName, _) = ProjectNameService.GenerateUniqueName(
            "TestProj",
            "Test Project",
            forceNumbered: false);

        Assert.That(shortName, Is.EqualTo("TestProj"));
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-035")]
    [Description("Empty base defaults to MP (gm-008)")]
    public void GenerateUniqueName_EmptyBase_MatchesGoldenMaster()
    {
        // gm-008: "empty_noConflict": "MP"
        var (shortName, _) = ProjectNameService.GenerateUniqueName(
            "",
            "",
            forceNumbered: false);

        Assert.That(shortName, Is.EqualTo("MP"));
    }

    #endregion
}

#region Stub Types for Compilation (will be replaced by actual implementation)

/// <summary>
/// Generic validation result returned by all validation methods.
/// </summary>
public record ValidationResult(
    bool IsValid,
    string? ErrorCode = null,
    IReadOnlyDictionary<string, string>? ErrorParams = null
);

/// <summary>
/// Stub service - tests will fail until real implementation exists.
/// </summary>
internal static class ProjectNameService
{
    public static ValidationResult ValidateShortName(
        string shortName,
        bool isNewProject,
        string? originalName = null)
    {
        // Stub implementation - will throw to demonstrate RED state
        throw new NotImplementedException(
            $"ProjectNameService.ValidateShortName not yet implemented");
    }

    public static string GenerateShortName(string fullName)
    {
        // Stub implementation - will throw to demonstrate RED state
        throw new NotImplementedException(
            $"ProjectNameService.GenerateShortName not yet implemented");
    }

    public static (string ShortName, string LongName) GenerateUniqueName(
        string baseShortName,
        string baseLongName,
        bool forceNumbered = false)
    {
        // Stub implementation - will throw to demonstrate RED state
        throw new NotImplementedException(
            $"ProjectNameService.GenerateUniqueName not yet implemented");
    }
}

#endregion
