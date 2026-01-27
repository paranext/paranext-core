using Paranext.DataProvider.CreatingProjects;

namespace TestParanextDataProvider.CreatingProjects;

/// <summary>
/// Tests for ProjectNameService: ValidateShortName (CAP-004) and GenerateShortName (CAP-005).
/// RED phase -- these tests will fail until the service is implemented.
/// </summary>
[TestFixture]
public class ProjectNameServiceTests
{
    // =========================================================================
    // CAP-004: ValidateShortName - Acceptance Test
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "gm-003")]
    [Property("BehaviorId", "BHV-029")]
    [Description("Acceptance test: All short name validation rules produce correct results")]
    public void ValidateShortName_AllGoldenMasterCases_MatchExpectedResults()
    {
        // Valid names
        Assert.That(ProjectNameService.ValidateShortName("ABC", true).IsValid, Is.True);
        Assert.That(ProjectNameService.ValidateShortName("TestProj", true).IsValid, Is.True);
        Assert.That(ProjectNameService.ValidateShortName("Test_123", true).IsValid, Is.True);

        // Too short
        var tooShort = ProjectNameService.ValidateShortName("AB", true);
        Assert.That(tooShort.IsValid, Is.False);
        Assert.That(tooShort.ErrorCode, Is.EqualTo("SHORTNAME_TOO_SHORT"));

        // Too long
        var tooLong = ProjectNameService.ValidateShortName("ABCDEFGHI", true);
        Assert.That(tooLong.IsValid, Is.False);
        Assert.That(tooLong.ErrorCode, Is.EqualTo("SHORTNAME_TOO_LONG"));

        // Has space
        var hasSpace = ProjectNameService.ValidateShortName("Test Proj", true);
        Assert.That(hasSpace.IsValid, Is.False);
        Assert.That(hasSpace.ErrorCode, Is.EqualTo("SHORTNAME_HAS_SPACES"));

        // Invalid char
        var invalidChar = ProjectNameService.ValidateShortName("Test@Proj", true);
        Assert.That(invalidChar.IsValid, Is.False);
        Assert.That(invalidChar.ErrorCode, Is.EqualTo("SHORTNAME_INVALID_CHARS"));

        // Reserved names
        var reserved = ProjectNameService.ValidateShortName("CON", true);
        Assert.That(reserved.IsValid, Is.False);
        Assert.That(reserved.ErrorCode, Is.EqualTo("SHORTNAME_RESERVED"));
    }

    // =========================================================================
    // CAP-004: ValidateShortName - Contract Tests
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-004-01")]
    [Property("BehaviorId", "BHV-029")]
    [Description("Valid 3-character short name passes validation")]
    public void ValidateShortName_MinLength3_IsValid()
    {
        var result = ProjectNameService.ValidateShortName("ABC", true);
        Assert.That(result.IsValid, Is.True);
        Assert.That(result.ErrorCode, Is.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-004-02")]
    [Property("BehaviorId", "BHV-029")]
    [Description("Valid 8-character short name passes validation")]
    public void ValidateShortName_MaxLength8_IsValid()
    {
        var result = ProjectNameService.ValidateShortName("TestProj", true);
        Assert.That(result.IsValid, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-004-03")]
    [Property("BehaviorId", "BHV-029")]
    [Description("Underscore and digits are valid characters")]
    public void ValidateShortName_UnderscoreAndDigits_IsValid()
    {
        var result = ProjectNameService.ValidateShortName("Test_123", true);
        Assert.That(result.IsValid, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-004-04")]
    [Property("BehaviorId", "BHV-029")]
    [Description("Name shorter than 3 characters returns SHORTNAME_TOO_SHORT")]
    public void ValidateShortName_TooShort_ReturnsError()
    {
        var result = ProjectNameService.ValidateShortName("AB", true);
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("SHORTNAME_TOO_SHORT"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-004-05")]
    [Property("BehaviorId", "BHV-029")]
    [Description("Name longer than 8 characters returns SHORTNAME_TOO_LONG")]
    public void ValidateShortName_TooLong_ReturnsError()
    {
        var result = ProjectNameService.ValidateShortName("ABCDEFGHI", true);
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("SHORTNAME_TOO_LONG"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-004-06")]
    [Property("BehaviorId", "BHV-029")]
    [Description("Name with spaces returns SHORTNAME_HAS_SPACES")]
    public void ValidateShortName_HasSpace_ReturnsError()
    {
        var result = ProjectNameService.ValidateShortName("Test Proj", true);
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("SHORTNAME_HAS_SPACES"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-004-07")]
    [Property("BehaviorId", "BHV-029")]
    [Description("Name with special characters returns SHORTNAME_INVALID_CHARS")]
    public void ValidateShortName_InvalidChars_ReturnsError()
    {
        var result = ProjectNameService.ValidateShortName("Test@Proj", true);
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("SHORTNAME_INVALID_CHARS"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-004-08")]
    [Property("BehaviorId", "BHV-029")]
    [Description("Windows reserved names return SHORTNAME_RESERVED")]
    [TestCase("CON")]
    [TestCase("PRN")]
    [TestCase("AUX")]
    [TestCase("COM1")]
    [TestCase("LPT1")]
    public void ValidateShortName_ReservedName_ReturnsError(string reservedName)
    {
        var result = ProjectNameService.ValidateShortName(reservedName, true);
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("SHORTNAME_RESERVED"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-004-09")]
    [Property("BehaviorId", "BHV-029")]
    [Description("Existing project name for new project returns SHORTNAME_EXISTS")]
    public void ValidateShortName_ExistingName_NewProject_ReturnsError()
    {
        // This test requires a project named "existingProject" to exist in the collection.
        // The implementer should set up ScrTextCollection with a dummy project.
        var result = ProjectNameService.ValidateShortName("existingProject", true);
        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorCode, Is.EqualTo("SHORTNAME_EXISTS"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-004-10")]
    [Property("BehaviorId", "BHV-029")]
    [Description("Same name as original during edit is allowed")]
    public void ValidateShortName_SameAsOriginal_IsValid()
    {
        var result = ProjectNameService.ValidateShortName("TestProj", false, "TestProj");
        Assert.That(result.IsValid, Is.True);
    }

    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-001")]
    [Property("BehaviorId", "BHV-029")]
    [Description("Short name with spaces always fails validation (INV-001)")]
    [TestCase("A B")]
    [TestCase(" ABC")]
    [TestCase("ABC ")]
    public void ValidateShortName_AnySpaces_AlwaysFails(string name)
    {
        var result = ProjectNameService.ValidateShortName(name, true);
        Assert.That(result.IsValid, Is.False);
    }

    // =========================================================================
    // CAP-005: GenerateShortName - Acceptance Test
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "gm-004")]
    [Property("BehaviorId", "BHV-030")]
    [Description("Acceptance test: Short name generation matches all golden master examples")]
    public void GenerateShortName_AllGoldenMasterCases_MatchExpected()
    {
        Assert.That(ProjectNameService.GenerateShortName("My Paratext Project"), Is.EqualTo("MPP"));
        Assert.That(ProjectNameService.GenerateShortName("Translation 2024"), Is.EqualTo("T24"));
        Assert.That(ProjectNameService.GenerateShortName("New International Version"), Is.EqualTo("NIV"));
        Assert.That(ProjectNameService.GenerateShortName("A B"), Is.EqualTo("ABB"));
        Assert.That(ProjectNameService.GenerateShortName("English Standard Version 2021"), Is.EqualTo("ESV21"));
        Assert.That(ProjectNameService.GenerateShortName("Test"), Is.EqualTo("TTT"));
        Assert.That(ProjectNameService.GenerateShortName("A Very Long Project Name Indeed"), Is.EqualTo("AVLPNI"));
        Assert.That(ProjectNameService.GenerateShortName("Project With 123456 Numbers"), Is.EqualTo("PWN56"));
        Assert.That(ProjectNameService.GenerateShortName(""), Is.EqualTo(""));
        Assert.That(ProjectNameService.GenerateShortName("OneWord"), Is.EqualTo("OOO"));
        Assert.That(ProjectNameService.GenerateShortName("Kinh Thanh Tieng Viet 1926"), Is.EqualTo("KTTV26"));
        Assert.That(ProjectNameService.GenerateShortName("a b c d e f g h i j"), Is.EqualTo("abcdefgh"));
    }

    // =========================================================================
    // CAP-005: GenerateShortName - Contract Tests
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-005-01")]
    [Property("BehaviorId", "BHV-030")]
    [Description("Multi-word name takes first letter of each word")]
    public void GenerateShortName_MultiWord_TakesFirstLetters()
    {
        Assert.That(ProjectNameService.GenerateShortName("My Paratext Project"), Is.EqualTo("MPP"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-005-02")]
    [Property("BehaviorId", "BHV-030")]
    [Description("Digits are extracted separately (last 2 only)")]
    public void GenerateShortName_WithDigits_ExtractsLastTwo()
    {
        Assert.That(ProjectNameService.GenerateShortName("Translation 2024"), Is.EqualTo("T24"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-005-03")]
    [Property("BehaviorId", "BHV-030")]
    [Description("Result padded to minimum 3 characters")]
    public void GenerateShortName_ShortResult_PaddedTo3()
    {
        Assert.That(ProjectNameService.GenerateShortName("A B"), Is.EqualTo("ABB"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-005-04")]
    [Property("BehaviorId", "BHV-030")]
    [Description("Result truncated to maximum 8 characters")]
    public void GenerateShortName_LongResult_TruncatedTo8()
    {
        Assert.That(ProjectNameService.GenerateShortName("a b c d e f g h i j"), Is.EqualTo("abcdefgh"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-005-05")]
    [Property("BehaviorId", "BHV-030")]
    [Description("Single word pads with repeated last char")]
    public void GenerateShortName_SingleWord_PadsWithLastChar()
    {
        Assert.That(ProjectNameService.GenerateShortName("Test"), Is.EqualTo("TTT"));
        Assert.That(ProjectNameService.GenerateShortName("OneWord"), Is.EqualTo("OOO"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-005-06")]
    [Property("BehaviorId", "BHV-030")]
    [Description("Empty input returns empty string")]
    public void GenerateShortName_EmptyInput_ReturnsEmpty()
    {
        Assert.That(ProjectNameService.GenerateShortName(""), Is.EqualTo(""));
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "gm-004")]
    [Property("BehaviorId", "BHV-030")]
    [Description("Golden master: all generation test cases")]
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
    public void GenerateShortName_GoldenMaster(string fullName, string expected)
    {
        Assert.That(ProjectNameService.GenerateShortName(fullName), Is.EqualTo(expected));
    }
}
