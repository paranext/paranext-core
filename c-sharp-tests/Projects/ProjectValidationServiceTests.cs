using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider.Projects;

/// <summary>
/// Tests for ProjectValidationService.ValidateShortName() - CAP-002
/// Reference: gm-001-short-name-validation, VAL-001
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class ProjectValidationServiceTests
{
    #region Acceptance Test - CAP-002

    /// <summary>
    /// Acceptance test for CAP-002: Short name validation capability.
    /// When this test passes, the capability is complete.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-001")]
    [Description("Acceptance test: ValidateShortName correctly validates all rules from VAL-001")]
    public void ValidateShortName_AcceptanceTest()
    {
        // This acceptance test verifies the complete ValidateShortName capability
        // by testing valid names pass and invalid names fail with correct error messages

        // Valid name should pass
        var validResult = ProjectValidationService.ValidateShortName(
            new ShortNameValidationRequest("MYPROJ", true)
        );
        Assert.That(validResult.IsValid, Is.True, "Valid short name should pass validation");

        // Too short should fail with correct message
        var tooShortResult = ProjectValidationService.ValidateShortName(
            new ShortNameValidationRequest("AB", true)
        );
        Assert.That(tooShortResult.IsValid, Is.False, "Too short name should fail");
        Assert.That(
            tooShortResult.ErrorMessage,
            Does.Contain("less than 3 or more than 8"),
            "Error message should mention length constraint"
        );

        // Reserved name should fail with correct message
        var reservedResult = ProjectValidationService.ValidateShortName(
            new ShortNameValidationRequest("CON", true)
        );
        Assert.That(reservedResult.IsValid, Is.False, "Reserved name should fail");
        Assert.That(
            reservedResult.ErrorMessage,
            Does.Contain("reserved"),
            "Error message should mention reserved"
        );
    }

    #endregion

    #region Golden Master Tests - gm-001

    /// <summary>
    /// gm-001-01: Minimum length boundary (3 chars) - valid
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-001-01")]
    [Property("ScenarioId", "TS-VAL-001-01")]
    [Property("BehaviorId", "BHV-601")]
    public void ValidateShortName_MinimumLength3Chars_ReturnsValid()
    {
        var request = new ShortNameValidationRequest("ABC", true);

        var result = ProjectValidationService.ValidateShortName(request);

        Assert.That(result.IsValid, Is.True);
        Assert.That(result.ErrorMessage, Is.Null);
    }

    /// <summary>
    /// gm-001-02: Below minimum length (2 chars) - invalid
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-001-02")]
    [Property("ScenarioId", "TS-VAL-001-02")]
    [Property("BehaviorId", "BHV-601")]
    public void ValidateShortName_BelowMinimumLength2Chars_ReturnsInvalid()
    {
        var request = new ShortNameValidationRequest("AB", true);

        var result = ProjectValidationService.ValidateShortName(request);

        Assert.That(result.IsValid, Is.False);
        Assert.That(
            result.ErrorMessage,
            Is.EqualTo("Short name must not be less than 3 or more than 8 characters in length")
        );
        Assert.That(result.ErrorMessageKey, Is.EqualTo("Strings.ProjectNameFormTooShort"));
    }

    /// <summary>
    /// gm-001-03: Maximum length boundary (8 chars) - valid
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-001-03")]
    [Property("ScenarioId", "TS-VAL-001-03")]
    [Property("BehaviorId", "BHV-601")]
    public void ValidateShortName_MaximumLength8Chars_ReturnsValid()
    {
        var request = new ShortNameValidationRequest("ABCDEFGH", true);

        var result = ProjectValidationService.ValidateShortName(request);

        Assert.That(result.IsValid, Is.True);
        Assert.That(result.ErrorMessage, Is.Null);
    }

    /// <summary>
    /// gm-001-04: Above maximum length (9 chars) - invalid
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-001-04")]
    [Property("ScenarioId", "TS-VAL-001-04")]
    [Property("BehaviorId", "BHV-601")]
    public void ValidateShortName_AboveMaximumLength9Chars_ReturnsInvalid()
    {
        var request = new ShortNameValidationRequest("ABCDEFGHI", true);

        var result = ProjectValidationService.ValidateShortName(request);

        Assert.That(result.IsValid, Is.False);
        Assert.That(
            result.ErrorMessage,
            Is.EqualTo("Short name must not be less than 3 or more than 8 characters in length")
        );
    }

    /// <summary>
    /// gm-001-05: Valid with underscore - valid
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-001-05")]
    [Property("ScenarioId", "TS-VAL-001-05")]
    [Property("BehaviorId", "BHV-601")]
    public void ValidateShortName_WithUnderscore_ReturnsValid()
    {
        var request = new ShortNameValidationRequest("MY_PROJ", true);

        var result = ProjectValidationService.ValidateShortName(request);

        Assert.That(result.IsValid, Is.True);
        Assert.That(result.ErrorMessage, Is.Null);
    }

    /// <summary>
    /// gm-001-06: Invalid with space - invalid
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-001-06")]
    [Property("ScenarioId", "TS-VAL-001-06")]
    [Property("BehaviorId", "BHV-601")]
    public void ValidateShortName_WithSpace_ReturnsInvalid()
    {
        var request = new ShortNameValidationRequest("MY PROJ", true);

        var result = ProjectValidationService.ValidateShortName(request);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ErrorMessage, Is.EqualTo("Short name must not contain spaces"));
        Assert.That(result.ErrorMessageKey, Is.EqualTo("Strings.ProjectNameFormContainsSpaces"));
    }

    /// <summary>
    /// gm-001-07: Invalid with hyphen - invalid
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-001-07")]
    [Property("ScenarioId", "TS-VAL-001-07")]
    [Property("BehaviorId", "BHV-601")]
    public void ValidateShortName_WithHyphen_ReturnsInvalid()
    {
        var request = new ShortNameValidationRequest("MY-PROJ", true);

        var result = ProjectValidationService.ValidateShortName(request);

        Assert.That(result.IsValid, Is.False);
        Assert.That(
            result.ErrorMessage,
            Is.EqualTo("Short name can only contain letters A-Z, digits 0-9, and underscores.")
        );
        Assert.That(result.ErrorMessageKey, Is.EqualTo("Strings.ProjectNameFormMustBeValidChar"));
    }

    /// <summary>
    /// gm-001-08: Valid with digits - valid
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-001-08")]
    [Property("ScenarioId", "TS-VAL-001-08")]
    [Property("BehaviorId", "BHV-601")]
    public void ValidateShortName_WithDigits_ReturnsValid()
    {
        var request = new ShortNameValidationRequest("PROJ123", true);

        var result = ProjectValidationService.ValidateShortName(request);

        Assert.That(result.IsValid, Is.True);
        Assert.That(result.ErrorMessage, Is.Null);
    }

    /// <summary>
    /// gm-001-09: Windows reserved name CON - invalid
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-001-09")]
    [Property("ScenarioId", "TS-VAL-001-09")]
    [Property("BehaviorId", "BHV-601")]
    public void ValidateShortName_WindowsReservedNameCON_ReturnsInvalid()
    {
        var request = new ShortNameValidationRequest("CON", true);

        var result = ProjectValidationService.ValidateShortName(request);

        Assert.That(result.IsValid, Is.False);
        Assert.That(
            result.ErrorMessage,
            Is.EqualTo(
                "Project Short Name is a reserved file name on Windows and cannot be used."
            )
        );
        Assert.That(result.ErrorMessageKey, Is.EqualTo("Strings.ProjectNameFormReservedName"));
    }

    /// <summary>
    /// gm-001-10: Windows reserved name PRN - invalid
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-001-10")]
    [Property("ScenarioId", "TS-VAL-001-10")]
    [Property("BehaviorId", "BHV-601")]
    public void ValidateShortName_WindowsReservedNamePRN_ReturnsInvalid()
    {
        var request = new ShortNameValidationRequest("PRN", true);

        var result = ProjectValidationService.ValidateShortName(request);

        Assert.That(result.IsValid, Is.False);
        Assert.That(
            result.ErrorMessage,
            Is.EqualTo(
                "Project Short Name is a reserved file name on Windows and cannot be used."
            )
        );
    }

    /// <summary>
    /// gm-001-11: Windows reserved name AUX - invalid
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-001-11")]
    [Property("ScenarioId", "TS-VAL-001-11")]
    [Property("BehaviorId", "BHV-601")]
    public void ValidateShortName_WindowsReservedNameAUX_ReturnsInvalid()
    {
        var request = new ShortNameValidationRequest("AUX", true);

        var result = ProjectValidationService.ValidateShortName(request);

        Assert.That(result.IsValid, Is.False);
        Assert.That(
            result.ErrorMessage,
            Is.EqualTo(
                "Project Short Name is a reserved file name on Windows and cannot be used."
            )
        );
    }

    /// <summary>
    /// gm-001-12: Windows reserved name NUL - invalid
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-001-12")]
    [Property("ScenarioId", "TS-VAL-001-12")]
    [Property("BehaviorId", "BHV-601")]
    public void ValidateShortName_WindowsReservedNameNUL_ReturnsInvalid()
    {
        var request = new ShortNameValidationRequest("NUL", true);

        var result = ProjectValidationService.ValidateShortName(request);

        Assert.That(result.IsValid, Is.False);
        Assert.That(
            result.ErrorMessage,
            Is.EqualTo(
                "Project Short Name is a reserved file name on Windows and cannot be used."
            )
        );
    }

    /// <summary>
    /// gm-001-13: Windows reserved name COM1 - invalid
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-001-13")]
    [Property("ScenarioId", "TS-VAL-001-13")]
    [Property("BehaviorId", "BHV-601")]
    public void ValidateShortName_WindowsReservedNameCOM1_ReturnsInvalid()
    {
        var request = new ShortNameValidationRequest("COM1", true);

        var result = ProjectValidationService.ValidateShortName(request);

        Assert.That(result.IsValid, Is.False);
        Assert.That(
            result.ErrorMessage,
            Is.EqualTo(
                "Project Short Name is a reserved file name on Windows and cannot be used."
            )
        );
    }

    /// <summary>
    /// gm-001-14: Windows reserved name LPT1 - invalid
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-001-14")]
    [Property("ScenarioId", "TS-VAL-001-14")]
    [Property("BehaviorId", "BHV-601")]
    public void ValidateShortName_WindowsReservedNameLPT1_ReturnsInvalid()
    {
        var request = new ShortNameValidationRequest("LPT1", true);

        var result = ProjectValidationService.ValidateShortName(request);

        Assert.That(result.IsValid, Is.False);
        Assert.That(
            result.ErrorMessage,
            Is.EqualTo(
                "Project Short Name is a reserved file name on Windows and cannot be used."
            )
        );
    }

    #endregion

    #region Contract Tests - Additional VAL-001 Coverage

    /// <summary>
    /// Test empty short name - edge case
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-VAL-001-15")]
    [Property("BehaviorId", "BHV-601")]
    public void ValidateShortName_EmptyString_ReturnsInvalid()
    {
        var request = new ShortNameValidationRequest("", true);

        var result = ProjectValidationService.ValidateShortName(request);

        Assert.That(result.IsValid, Is.False);
        Assert.That(
            result.ErrorMessage,
            Is.EqualTo("Short name must not be less than 3 or more than 8 characters in length")
        );
    }

    /// <summary>
    /// Test null short name - edge case
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-VAL-001-16")]
    [Property("BehaviorId", "BHV-601")]
    public void ValidateShortName_NullString_ReturnsInvalid()
    {
        var request = new ShortNameValidationRequest(null!, true);

        var result = ProjectValidationService.ValidateShortName(request);

        Assert.That(result.IsValid, Is.False);
    }

    /// <summary>
    /// Test with special character @ - invalid
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-VAL-001-17")]
    [Property("BehaviorId", "BHV-601")]
    public void ValidateShortName_WithAtSign_ReturnsInvalid()
    {
        var request = new ShortNameValidationRequest("MY@PROJ", true);

        var result = ProjectValidationService.ValidateShortName(request);

        Assert.That(result.IsValid, Is.False);
        Assert.That(
            result.ErrorMessage,
            Is.EqualTo("Short name can only contain letters A-Z, digits 0-9, and underscores.")
        );
    }

    /// <summary>
    /// Test lowercase letters - valid (mixed case allowed per projectNameValidChars)
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-VAL-001-18")]
    [Property("BehaviorId", "BHV-601")]
    public void ValidateShortName_LowercaseLetters_ReturnsValid()
    {
        var request = new ShortNameValidationRequest("myproj", true);

        var result = ProjectValidationService.ValidateShortName(request);

        Assert.That(result.IsValid, Is.True);
    }

    /// <summary>
    /// Test mixed case letters - valid
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-VAL-001-19")]
    [Property("BehaviorId", "BHV-601")]
    public void ValidateShortName_MixedCaseLetters_ReturnsValid()
    {
        var request = new ShortNameValidationRequest("MyProj", true);

        var result = ProjectValidationService.ValidateShortName(request);

        Assert.That(result.IsValid, Is.True);
    }

    /// <summary>
    /// Test reserved names are case-insensitive
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-VAL-001-20")]
    [Property("BehaviorId", "BHV-601")]
    public void ValidateShortName_ReservedNameLowercase_ReturnsInvalid()
    {
        var request = new ShortNameValidationRequest("con", true);

        var result = ProjectValidationService.ValidateShortName(request);

        Assert.That(result.IsValid, Is.False);
        Assert.That(
            result.ErrorMessage,
            Is.EqualTo(
                "Project Short Name is a reserved file name on Windows and cannot be used."
            )
        );
    }

    #endregion

    #region Invariant Tests - INV-004

    /// <summary>
    /// INV-004: Project name cannot contain spaces
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-004")]
    [Property("ScenarioId", "TS-INV-004-01")]
    [TestCase("A BC")]
    [TestCase(" ABC")]
    [TestCase("ABC ")]
    [TestCase("A B C")]
    public void ValidateShortName_Invariant_NoSpacesAllowed(string shortName)
    {
        var request = new ShortNameValidationRequest(shortName, true);

        var result = ProjectValidationService.ValidateShortName(request);

        Assert.That(result.IsValid, Is.False, $"Short name '{shortName}' with spaces should be invalid");
    }

    #endregion
}
