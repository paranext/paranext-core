using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ProjectCreation;

namespace TestParanextDataProvider.ProjectCreation;

/// <summary>
/// Tests for ProjectNamingService (CAP-004, CAP-005, CAP-006, CAP-007).
/// These are unit tests for project name generation, validation, and sanitization.
/// The service is stateless, so no base class or fixtures are required.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class ProjectNamingServiceTests
{
    #region CAP-004: GenerateShortName Tests (GM-UI-001)

    /// <summary>
    /// Acceptance test for CAP-004: GenerateShortName must produce valid abbreviations
    /// from full project names following the algorithm in GM-UI-001.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "BHV-200")]
    [Description("Acceptance test: Short name generation produces valid abbreviations")]
    public void GenerateShortName_AcceptanceTest()
    {
        // This test passes when CAP-004 is complete
        var request = new ShortNameGenerationRequest { FullName = "New Testament Greek 2024" };

        var result = ProjectNamingService.GenerateShortName(request);

        // Per GM-UI-001: First letters of words + last 2 digits
        Assert.That(result.Abbreviation, Is.EqualTo("NTG24"));
    }

    /// <summary>
    /// Golden Master GM-UI-001: First letter of each word.
    /// Input: "Test Project" -> "TP"
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "GM-UI-001")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "BHV-200")]
    public void GenerateShortName_FirstLetterOfEachWord_ReturnsAbbreviation()
    {
        var request = new ShortNameGenerationRequest { FullName = "Test Project" };

        var result = ProjectNamingService.GenerateShortName(request);

        Assert.That(result.Abbreviation, Is.EqualTo("TP"));
    }

    /// <summary>
    /// Golden Master GM-UI-001: First letters + last 2 digits.
    /// Input: "New English Translation 2024" -> "NET24"
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "GM-UI-001")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "BHV-200")]
    public void GenerateShortName_WithYearDigits_IncludesLastTwoDigits()
    {
        var request = new ShortNameGenerationRequest { FullName = "New English Translation 2024" };

        var result = ProjectNamingService.GenerateShortName(request);

        Assert.That(result.Abbreviation, Is.EqualTo("NET24"));
    }

    /// <summary>
    /// Golden Master GM-UI-001: Truncated to 8 characters max.
    /// Input: "A Very Long Project Name Here" -> "AVLPNH" (truncated)
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "GM-UI-001")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "BHV-200")]
    public void GenerateShortName_LongName_TruncatedToMaxLength()
    {
        var request = new ShortNameGenerationRequest { FullName = "A Very Long Project Name Here" };

        var result = ProjectNamingService.GenerateShortName(request);

        // Max 8 characters per validation rules
        Assert.That(result.Abbreviation.Length, Is.LessThanOrEqualTo(8));
        Assert.That(result.Abbreviation, Is.EqualTo("AVLPNH"));
    }

    /// <summary>
    /// Golden Master GM-UI-001: Padded to minimum 3 characters.
    /// Input: "X" -> "X__" (padded)
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "GM-UI-001")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "BHV-200")]
    public void GenerateShortName_SingleLetter_PaddedToMinimum()
    {
        var request = new ShortNameGenerationRequest { FullName = "X" };

        var result = ProjectNamingService.GenerateShortName(request);

        // Min 3 characters per validation rules, padded with underscores
        Assert.That(result.Abbreviation.Length, Is.GreaterThanOrEqualTo(3));
        Assert.That(result.Abbreviation, Is.EqualTo("X__"));
    }

    /// <summary>
    /// Golden Master GM-UI-001: Last 2 digits from anywhere in name.
    /// Input: "project 123 test 456" -> "PT56"
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "GM-UI-001")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "BHV-200")]
    public void GenerateShortName_MultipleNumbers_UsesLastTwoDigits()
    {
        var request = new ShortNameGenerationRequest { FullName = "project 123 test 456" };

        var result = ProjectNamingService.GenerateShortName(request);

        // Last 2 digits (56) from the end
        Assert.That(result.Abbreviation, Is.EqualTo("PT56"));
    }

    /// <summary>
    /// Golden Master GM-UI-001: Slashes treated as word separators.
    /// Input: "My/Project\\Name" -> "MPN"
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "GM-UI-001")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "BHV-200")]
    public void GenerateShortName_SlashesAsWordSeparators_SplitsCorrectly()
    {
        var request = new ShortNameGenerationRequest { FullName = "My/Project\\Name" };

        var result = ProjectNamingService.GenerateShortName(request);

        // Slashes act as word separators
        Assert.That(result.Abbreviation, Is.EqualTo("MPN"));
    }

    /// <summary>
    /// Verifies WasModified is true when abbreviation differs from full name.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "BHV-200")]
    public void GenerateShortName_WhenAbbreviated_WasModifiedIsTrue()
    {
        var request = new ShortNameGenerationRequest { FullName = "Test Project" };

        var result = ProjectNamingService.GenerateShortName(request);

        Assert.That(result.WasModified, Is.True);
    }

    /// <summary>
    /// Verifies empty input produces empty abbreviation.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "BHV-200")]
    public void GenerateShortName_EmptyInput_ReturnsEmptyAbbreviation()
    {
        var request = new ShortNameGenerationRequest { FullName = "" };

        var result = ProjectNamingService.GenerateShortName(request);

        Assert.That(result.Abbreviation, Is.Empty.Or.EqualTo("___"));
    }

    /// <summary>
    /// Verifies custom valid characters are respected when provided.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "BHV-200")]
    public void GenerateShortName_CustomValidChars_FilteredCorrectly()
    {
        var request = new ShortNameGenerationRequest
        {
            FullName = "Test123Project",
            ValidChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"  // Letters only, no digits
        };

        var result = ProjectNamingService.GenerateShortName(request);

        // Should only contain letters (digits filtered out)
        Assert.That(result.Abbreviation, Does.Not.Contain("1"));
        Assert.That(result.Abbreviation, Does.Not.Contain("2"));
        Assert.That(result.Abbreviation, Does.Not.Contain("3"));
    }

    #endregion

    #region CAP-005: ValidateProjectNames Tests (GM-UI-002, SPEC-003)

    /// <summary>
    /// Acceptance test for CAP-005: ValidateProjectNames must validate both full and short names
    /// and return field-level errors per GM-UI-002.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-029")]
    [Property("BehaviorId", "BHV-201")]
    [Description("Acceptance test: Name validation returns correct field-level errors")]
    public void ValidateProjectNames_AcceptanceTest()
    {
        var request = new ProjectNameValidationRequest
        {
            FullName = "Valid Full Name",
            ShortName = "VAL",
            Mode = "create"
        };

        var result = ProjectNamingService.ValidateProjectNames(request);

        // Valid inputs should pass
        Assert.That(result.IsValid, Is.True);
        Assert.That(result.FullNameError, Is.Null);
        Assert.That(result.ShortNameError, Is.Null);
    }

    /// <summary>
    /// Golden Master GM-UI-002: Short name too short (< 3 chars).
    /// Input: "AB" -> "Short name must be at least 3 characters"
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "GM-UI-002")]
    [Property("ScenarioId", "TS-029")]
    [Property("BehaviorId", "BHV-201")]
    public void ValidateProjectNames_ShortNameTooShort_ReturnsError()
    {
        var request = new ProjectNameValidationRequest
        {
            FullName = "Test",
            ShortName = "AB",  // Too short (< 3)
            Mode = "create"
        };

        var result = ProjectNamingService.ValidateProjectNames(request);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ShortNameError, Does.Contain("3").Or.Contain("least"));
    }

    /// <summary>
    /// Golden Master GM-UI-002: Short name too long (> 8 chars).
    /// Input: "VERYLONGNAME" -> "Short name must be at most 8 characters"
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "GM-UI-002")]
    [Property("ScenarioId", "TS-030")]
    [Property("BehaviorId", "BHV-201")]
    public void ValidateProjectNames_ShortNameTooLong_ReturnsError()
    {
        var request = new ProjectNameValidationRequest
        {
            FullName = "Test",
            ShortName = "VERYLONGNAME",  // Too long (> 8)
            Mode = "create"
        };

        var result = ProjectNamingService.ValidateProjectNames(request);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ShortNameError, Does.Contain("8").Or.Contain("most"));
    }

    /// <summary>
    /// Golden Master GM-UI-002: Windows reserved name.
    /// Input: "CON" -> "Short name cannot be a Windows reserved name"
    /// VAL-003: CON, PRN, AUX, NUL, COM1-9, LPT1-9
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "GM-UI-002")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-201")]
    [TestCase("CON")]
    [TestCase("PRN")]
    [TestCase("AUX")]
    [TestCase("NUL")]
    [TestCase("COM1")]
    [TestCase("COM9")]
    [TestCase("LPT1")]
    [TestCase("LPT9")]
    public void ValidateProjectNames_WindowsReservedName_ReturnsError(string reservedName)
    {
        var request = new ProjectNameValidationRequest
        {
            FullName = "Test",
            ShortName = reservedName,
            Mode = "create"
        };

        var result = ProjectNamingService.ValidateProjectNames(request);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ShortNameError, Does.Contain("reserved").IgnoreCase);
    }

    /// <summary>
    /// Golden Master GM-UI-002: Short name contains spaces.
    /// Input: "MY PROJECT" -> "Short name cannot contain spaces"
    /// VAL-002
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "GM-UI-002")]
    [Property("ScenarioId", "TS-032")]
    [Property("BehaviorId", "BHV-201")]
    public void ValidateProjectNames_ShortNameWithSpaces_ReturnsError()
    {
        var request = new ProjectNameValidationRequest
        {
            FullName = "Test",
            ShortName = "MY PROJECT",  // Contains space
            Mode = "create"
        };

        var result = ProjectNamingService.ValidateProjectNames(request);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ShortNameError, Does.Contain("space").IgnoreCase);
    }

    /// <summary>
    /// Golden Master GM-UI-002: Short name contains invalid characters.
    /// Input: "test!@#" -> "Short name can only contain letters and digits"
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "GM-UI-002")]
    [Property("ScenarioId", "TS-033")]
    [Property("BehaviorId", "BHV-201")]
    [TestCase("test!@#")]
    [TestCase("test.name")]
    [TestCase("test-name")]
    [TestCase("test_name")]
    public void ValidateProjectNames_ShortNameInvalidChars_ReturnsError(string invalidShortName)
    {
        var request = new ProjectNameValidationRequest
        {
            FullName = "Test",
            ShortName = invalidShortName,
            Mode = "create"
        };

        var result = ProjectNamingService.ValidateProjectNames(request);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ShortNameError, Is.Not.Null.And.Not.Empty);
    }

    /// <summary>
    /// Golden Master GM-UI-002: Empty full name.
    /// Input: "" -> "Full name is required"
    /// VAL-007
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "GM-UI-002")]
    [Property("ScenarioId", "TS-033")]
    [Property("BehaviorId", "BHV-201")]
    [TestCase("")]
    [TestCase("   ")]
    public void ValidateProjectNames_EmptyFullName_ReturnsError(string emptyFullName)
    {
        var request = new ProjectNameValidationRequest
        {
            FullName = emptyFullName,
            ShortName = "VAL",
            Mode = "create"
        };

        var result = ProjectNamingService.ValidateProjectNames(request);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.FullNameError, Does.Contain("required").Or.Contain("empty").IgnoreCase);
    }

    /// <summary>
    /// Valid names should pass validation.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-029")]
    [Property("BehaviorId", "BHV-201")]
    [TestCase("ABC")]  // Minimum length
    [TestCase("ABCDEFGH")]  // Maximum length
    [TestCase("Test1")]  // Mixed letters and digits
    public void ValidateProjectNames_ValidShortName_Passes(string validShortName)
    {
        var request = new ProjectNameValidationRequest
        {
            FullName = "Valid Full Name",
            ShortName = validShortName,
            Mode = "create"
        };

        var result = ProjectNamingService.ValidateProjectNames(request);

        Assert.That(result.IsValid, Is.True);
        Assert.That(result.ShortNameError, Is.Null);
    }

    /// <summary>
    /// Edit mode should allow same name as original.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-029")]
    [Property("BehaviorId", "BHV-201")]
    public void ValidateProjectNames_EditModeWithSameName_Passes()
    {
        var request = new ProjectNameValidationRequest
        {
            FullName = "Test Project",
            ShortName = "OLD",
            Mode = "edit",
            OriginalShortName = "OLD"
        };

        var result = ProjectNamingService.ValidateProjectNames(request);

        // Same as original should be valid in edit mode
        Assert.That(result.IsValid, Is.True);
    }

    /// <summary>
    /// Case-insensitive reserved name check.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-201")]
    [TestCase("con")]  // lowercase
    [TestCase("Con")]  // mixed case
    public void ValidateProjectNames_ReservedNameCaseInsensitive_ReturnsError(string reservedName)
    {
        var request = new ProjectNameValidationRequest
        {
            FullName = "Test",
            ShortName = reservedName,
            Mode = "create"
        };

        var result = ProjectNamingService.ValidateProjectNames(request);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ShortNameError, Does.Contain("reserved").IgnoreCase);
    }

    /// <summary>
    /// Suggestions provided when short name is invalid.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-029")]
    [Property("BehaviorId", "BHV-201")]
    public void ValidateProjectNames_InvalidShortName_ProvidesSuggestions()
    {
        var request = new ProjectNameValidationRequest
        {
            FullName = "Test Project",
            ShortName = "AB",  // Too short
            Mode = "create"
        };

        var result = ProjectNamingService.ValidateProjectNames(request);

        // Should provide alternative suggestions
        Assert.That(result.ShortNameSuggestions, Is.Not.Null);
        Assert.That(result.ShortNameSuggestions, Is.Not.Empty);
    }

    #endregion

    #region CAP-006: GetNextUnusedProjectName Tests (SPEC-007)

    /// <summary>
    /// Acceptance test for CAP-006: GetNextUnusedProjectName must find unique names
    /// by appending incrementing numbers until a unique name is found.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-006")]
    [Property("ScenarioId", "TS-017")]
    [Property("BehaviorId", "BHV-355")]
    [Description("Acceptance test: Unique name generation appends numbers when needed")]
    public void GetNextUnusedProjectName_AcceptanceTest()
    {
        // Mock: Project "TEST" already exists
        Func<string, bool> projectExists = name =>
            name.Equals("TEST", StringComparison.OrdinalIgnoreCase);

        var (shortName, longName) = ProjectNamingService.GetNextUnusedProjectName(
            "TEST",
            "Test Project",
            projectExists,
            forceNumbered: false);

        // Should append number since TEST exists
        Assert.That(shortName, Is.EqualTo("TEST1"));
        Assert.That(longName, Is.EqualTo("Test Project 1"));
    }

    /// <summary>
    /// SPEC-007 TC-007-01: Base name available - no suffix needed.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecificationId", "SPEC-007")]
    [Property("ScenarioId", "TS-017")]
    [Property("BehaviorId", "BHV-355")]
    public void GetNextUnusedProjectName_BaseNameAvailable_NoSuffix()
    {
        // Mock: No projects exist
        Func<string, bool> projectExists = name => false;

        var (shortName, longName) = ProjectNamingService.GetNextUnusedProjectName(
            "NEW",
            "New Project",
            projectExists,
            forceNumbered: false);

        // Base name is available, use it directly
        Assert.That(shortName, Is.EqualTo("NEW"));
        Assert.That(longName, Is.EqualTo("New Project"));
    }

    /// <summary>
    /// SPEC-007 TC-007-02: Base name taken, append incrementing number.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecificationId", "SPEC-007")]
    [Property("ScenarioId", "TS-059")]
    [Property("BehaviorId", "BHV-355")]
    public void GetNextUnusedProjectName_BaseNameTaken_AppendsNumber()
    {
        // Mock: TEST exists, TEST1 available
        Func<string, bool> projectExists = name =>
            name.Equals("TEST", StringComparison.OrdinalIgnoreCase);

        var (shortName, longName) = ProjectNamingService.GetNextUnusedProjectName(
            "TEST",
            "Test Project",
            projectExists,
            forceNumbered: false);

        Assert.That(shortName, Is.EqualTo("TEST1"));
        Assert.That(longName, Is.EqualTo("Test Project 1"));
    }

    /// <summary>
    /// SPEC-007 TC-007-03: Multiple names taken, finds first available.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecificationId", "SPEC-007")]
    [Property("ScenarioId", "TS-059")]
    [Property("BehaviorId", "BHV-355")]
    public void GetNextUnusedProjectName_MultipleNamesTaken_FindsFirstAvailable()
    {
        // Mock: TEST, TEST1, TEST2 exist; TEST3 available
        var existingProjects = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
        {
            "TEST", "TEST1", "TEST2"
        };
        Func<string, bool> projectExists = name => existingProjects.Contains(name);

        var (shortName, longName) = ProjectNamingService.GetNextUnusedProjectName(
            "TEST",
            "Test Project",
            projectExists,
            forceNumbered: false);

        Assert.That(shortName, Is.EqualTo("TEST3"));
        Assert.That(longName, Is.EqualTo("Test Project 3"));
    }

    /// <summary>
    /// SPEC-007 TC-007-04: Force numbered even when base available.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecificationId", "SPEC-007")]
    [Property("ScenarioId", "TS-060")]
    [Property("BehaviorId", "BHV-355")]
    public void GetNextUnusedProjectName_ForceNumbered_AlwaysAppends()
    {
        // Mock: No projects exist, but forceNumbered=true
        Func<string, bool> projectExists = name => false;

        var (shortName, longName) = ProjectNamingService.GetNextUnusedProjectName(
            "NEW",
            "New Project",
            projectExists,
            forceNumbered: true);

        // Should append 1 even though base is available
        Assert.That(shortName, Is.EqualTo("NEW1"));
        Assert.That(longName, Is.EqualTo("New Project 1"));
    }

    /// <summary>
    /// SPEC-007 TC-007-05: Case-insensitive name matching.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecificationId", "SPEC-007")]
    [Property("ScenarioId", "TS-059")]
    [Property("BehaviorId", "BHV-355")]
    public void GetNextUnusedProjectName_CaseInsensitive_MatchesExisting()
    {
        // Mock: "test" exists (lowercase), checking "TEST" (uppercase)
        Func<string, bool> projectExists = name =>
            name.Equals("test", StringComparison.OrdinalIgnoreCase) ||
            name.Equals("TEST", StringComparison.OrdinalIgnoreCase);

        var (shortName, _) = ProjectNamingService.GetNextUnusedProjectName(
            "TEST",
            "Test Project",
            projectExists,
            forceNumbered: false);

        // Should detect case-insensitive collision
        Assert.That(shortName, Is.Not.EqualTo("TEST"));
    }

    /// <summary>
    /// SPEC-007 TC-007-06: Short name at max length, number replaces end.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecificationId", "SPEC-007")]
    [Property("ScenarioId", "TS-059")]
    [Property("BehaviorId", "BHV-355")]
    public void GetNextUnusedProjectName_MaxLengthName_TruncatesForNumber()
    {
        // Mock: ABCDEFGH (8 chars) exists
        Func<string, bool> projectExists = name =>
            name.Equals("ABCDEFGH", StringComparison.OrdinalIgnoreCase);

        var (shortName, _) = ProjectNamingService.GetNextUnusedProjectName(
            "ABCDEFGH",  // 8 chars (max length)
            "Full Name",
            projectExists,
            forceNumbered: false);

        // Should truncate and append number, staying <= 8 chars
        Assert.That(shortName.Length, Is.LessThanOrEqualTo(8));
        Assert.That(shortName, Does.EndWith("1"));
    }

    #endregion

    #region CAP-007: SanitizeFullName Tests (FB 15254)

    /// <summary>
    /// Acceptance test for CAP-007: SanitizeFullName must replace backslash with forward slash
    /// per FB 15254 bug fix.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-007")]
    [Property("BehaviorId", "BHV-202")]
    [Description("Acceptance test: Full name sanitization replaces backslash with forward slash")]
    public void SanitizeFullName_AcceptanceTest()
    {
        var result = ProjectNamingService.SanitizeFullName("My\\Project\\Name");

        Assert.That(result, Is.EqualTo("My/Project/Name"));
    }

    /// <summary>
    /// FB 15254: Backslash replaced with forward slash.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-202")]
    public void SanitizeFullName_Backslash_ReplacedWithForwardSlash()
    {
        var result = ProjectNamingService.SanitizeFullName("Test\\Name");

        Assert.That(result, Is.EqualTo("Test/Name"));
    }

    /// <summary>
    /// Multiple backslashes all replaced.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-202")]
    public void SanitizeFullName_MultipleBackslashes_AllReplaced()
    {
        var result = ProjectNamingService.SanitizeFullName("A\\B\\C\\D");

        Assert.That(result, Is.EqualTo("A/B/C/D"));
    }

    /// <summary>
    /// No backslashes - returns unchanged.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-202")]
    public void SanitizeFullName_NoBackslashes_ReturnsUnchanged()
    {
        var result = ProjectNamingService.SanitizeFullName("Test Project Name");

        Assert.That(result, Is.EqualTo("Test Project Name"));
    }

    /// <summary>
    /// Forward slashes preserved.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-202")]
    public void SanitizeFullName_ForwardSlashes_Preserved()
    {
        var result = ProjectNamingService.SanitizeFullName("Test/Name");

        Assert.That(result, Is.EqualTo("Test/Name"));
    }

    /// <summary>
    /// Empty string handled gracefully.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-202")]
    public void SanitizeFullName_EmptyString_ReturnsEmpty()
    {
        var result = ProjectNamingService.SanitizeFullName("");

        Assert.That(result, Is.Empty);
    }

    /// <summary>
    /// Null input handled gracefully.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-202")]
    public void SanitizeFullName_NullInput_ReturnsEmptyOrNull()
    {
        // Implementation may return null or empty
        var result = ProjectNamingService.SanitizeFullName(null!);

        Assert.That(result, Is.Null.Or.Empty);
    }

    /// <summary>
    /// Mixed slashes - only backslashes replaced.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-202")]
    public void SanitizeFullName_MixedSlashes_OnlyBackslashReplaced()
    {
        var result = ProjectNamingService.SanitizeFullName("A/B\\C/D\\E");

        Assert.That(result, Is.EqualTo("A/B/C/D/E"));
    }

    #endregion

    #region Invariant Tests

    /// <summary>
    /// INV-004: Short name length must be 3-8 characters (VAL-001).
    /// Validated through ValidateProjectNames.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-004")]
    [Property("BehaviorId", "BHV-201")]
    [TestCase("AB", false)]     // 2 chars - too short
    [TestCase("ABC", true)]     // 3 chars - minimum valid
    [TestCase("ABCD", true)]    // 4 chars - valid
    [TestCase("ABCDEFGH", true)] // 8 chars - maximum valid
    [TestCase("ABCDEFGHI", false)] // 9 chars - too long
    public void Invariant_ShortNameLength_EnforcedByValidation(string shortName, bool expectedValid)
    {
        var request = new ProjectNameValidationRequest
        {
            FullName = "Valid Full Name",
            ShortName = shortName,
            Mode = "create"
        };

        var result = ProjectNamingService.ValidateProjectNames(request);

        if (expectedValid)
        {
            Assert.That(result.IsValid, Is.True, $"Short name '{shortName}' should be valid");
        }
        else
        {
            Assert.That(result.IsValid, Is.False, $"Short name '{shortName}' should be invalid");
            Assert.That(result.ShortNameError, Is.Not.Null.And.Not.Empty);
        }
    }

    /// <summary>
    /// GenerateShortName output is always within valid length range.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-004")]
    [Property("BehaviorId", "BHV-200")]
    [TestCase("A")]
    [TestCase("Test")]
    [TestCase("A Very Long Project Name That Exceeds Normal Limits")]
    public void Invariant_GeneratedShortName_AlwaysValidLength(string fullName)
    {
        var request = new ShortNameGenerationRequest { FullName = fullName };

        var result = ProjectNamingService.GenerateShortName(request);

        if (!string.IsNullOrWhiteSpace(fullName))
        {
            Assert.That(result.Abbreviation.Length, Is.GreaterThanOrEqualTo(3),
                "Generated short name should be at least 3 characters");
            Assert.That(result.Abbreviation.Length, Is.LessThanOrEqualTo(8),
                "Generated short name should be at most 8 characters");
        }
    }

    #endregion
}
