using System.Diagnostics.CodeAnalysis;
using Paratext.Data;
using Paratext.Data.ProjectSettingsAccess;
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
            Is.EqualTo("Project Short Name is a reserved file name on Windows and cannot be used.")
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
            Is.EqualTo("Project Short Name is a reserved file name on Windows and cannot be used.")
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
            Is.EqualTo("Project Short Name is a reserved file name on Windows and cannot be used.")
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
            Is.EqualTo("Project Short Name is a reserved file name on Windows and cannot be used.")
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
            Is.EqualTo("Project Short Name is a reserved file name on Windows and cannot be used.")
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
            Is.EqualTo("Project Short Name is a reserved file name on Windows and cannot be used.")
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
            Is.EqualTo("Project Short Name is a reserved file name on Windows and cannot be used.")
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

        Assert.That(
            result.IsValid,
            Is.False,
            $"Short name '{shortName}' with spaces should be invalid"
        );
    }

    #endregion

    #region CAP-003: ValidateProjectSettings - Acceptance Test

    /// <summary>
    /// Acceptance test for CAP-003: Project settings validation capability.
    /// When this test passes, the capability is complete.
    /// Maps to: spec-005
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-005")]
    [Description("Acceptance test: ValidateProjectSettings validates all fields from VAL-002 to VAL-011")]
    public void ValidateProjectSettings_AcceptanceTest()
    {
        // This acceptance test verifies the complete ValidateProjectSettings capability
        // by testing that a valid request passes and invalid requests fail with correct field errors

        // Valid Standard project should pass
        var validRequest = CreateValidProjectRequest();
        var validResult = ProjectValidationService.ValidateProjectSettings(validRequest, isNewProject: true);
        Assert.That(validResult.IsValid, Is.True, "Valid project request should pass validation");
        Assert.That(validResult.FieldErrors, Is.Empty, "No field errors expected for valid request");

        // Missing full name should fail with FullName error (VAL-002)
        var noFullNameRequest = validRequest with { FullName = "" };
        var noFullNameResult = ProjectValidationService.ValidateProjectSettings(noFullNameRequest, isNewProject: true);
        Assert.That(noFullNameResult.IsValid, Is.False, "Missing full name should fail");
        Assert.That(noFullNameResult.FieldErrors.ContainsKey("FullName"), Is.True, "Should have FullName error");

        // Derived type without base project should fail (VAL-007)
        var noBaseRequest = CreateValidProjectRequestByName("BackTranslation") with
        {
            BaseProjectGuid = null
        };
        var noBaseResult = ProjectValidationService.ValidateProjectSettings(noBaseRequest, isNewProject: true);
        Assert.That(noBaseResult.IsValid, Is.False, "Derived type without base should fail");
        Assert.That(noBaseResult.FieldErrors.ContainsKey("BaseProject"), Is.True, "Should have BaseProject error");
    }

    #endregion

    #region CAP-003: ValidateProjectSettings - Contract Tests (VAL-002 to VAL-011)

    /// <summary>
    /// VAL-002: Full name is required
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-VAL-002-01")]
    [Property("BehaviorId", "VAL-002")]
    [Property("CapabilityId", "CAP-003")]
    public void ValidateProjectSettings_EmptyFullName_ReturnsFullNameError()
    {
        var request = CreateValidProjectRequest() with { FullName = "" };

        var result = ProjectValidationService.ValidateProjectSettings(request, isNewProject: true);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.FieldErrors.ContainsKey("FullName"), Is.True);
        Assert.That(result.FieldErrors["FullName"].Message, Does.Contain("must be specified"));
        Assert.That(result.FieldErrors["FullName"].Severity, Is.EqualTo(ValidationSeverity.Error));
    }

    /// <summary>
    /// VAL-002: Full name with whitespace only should fail
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-VAL-002-02")]
    [Property("BehaviorId", "VAL-002")]
    [Property("CapabilityId", "CAP-003")]
    public void ValidateProjectSettings_WhitespaceFullName_ReturnsFullNameError()
    {
        var request = CreateValidProjectRequest() with { FullName = "   " };

        var result = ProjectValidationService.ValidateProjectSettings(request, isNewProject: true);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.FieldErrors.ContainsKey("FullName"), Is.True);
    }

    /// <summary>
    /// VAL-003: Project type must be selected (not NotSelected)
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-VAL-003-01")]
    [Property("BehaviorId", "VAL-003")]
    [Property("CapabilityId", "CAP-003")]
    public void ValidateProjectSettings_NotSelectedType_ReturnsProjectTypeError()
    {
        var request = CreateValidProjectRequest() with
        {
            ProjectType = new PtxUtils.Enum<ProjectType>("NotSelected")
        };

        var result = ProjectValidationService.ValidateProjectSettings(request, isNewProject: true);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.FieldErrors.ContainsKey("ProjectType"), Is.True);
        Assert.That(result.FieldErrors["ProjectType"].Message, Does.Contain("must be selected"));
    }

    /// <summary>
    /// VAL-004: Versification must be selected
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-VAL-004-01")]
    [Property("BehaviorId", "VAL-004")]
    [Property("CapabilityId", "CAP-003")]
    public void ValidateProjectSettings_UndefinedVersification_ReturnsVersificationError()
    {
        var request = CreateValidProjectRequest() with
        {
            Versification = SIL.Scripture.ScrVersType.Unknown
        };

        var result = ProjectValidationService.ValidateProjectSettings(request, isNewProject: true);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.FieldErrors.ContainsKey("Versification"), Is.True);
        Assert.That(result.FieldErrors["Versification"].Message, Does.Contain("must be selected"));
    }

    /// <summary>
    /// VAL-005: Language is required except for StudyBibleAdditions
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-VAL-005-01")]
    [Property("BehaviorId", "VAL-005")]
    [Property("CapabilityId", "CAP-003")]
    public void ValidateProjectSettings_NoLanguageForStandardProject_ReturnsLanguageError()
    {
        var request = CreateValidProjectRequest() with { LanguageId = null };

        var result = ProjectValidationService.ValidateProjectSettings(request, isNewProject: true);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.FieldErrors.ContainsKey("Language"), Is.True);
        Assert.That(result.FieldErrors["Language"].Message, Does.Contain("must be selected"));
    }

    /// <summary>
    /// VAL-005: Language is NOT required for StudyBibleAdditions (inherits from base)
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-VAL-005-02")]
    [Property("BehaviorId", "VAL-005")]
    [Property("CapabilityId", "CAP-003")]
    public void ValidateProjectSettings_NoLanguageForStudyBibleAdditions_IsValid()
    {
        var request = CreateValidProjectRequestByName("StudyBibleAdditions") with
        {
            LanguageId = null,
            BaseProjectGuid = Paratext.Data.HexId.FromStr("1234567890123456789012345678901234567890")
        };

        var result = ProjectValidationService.ValidateProjectSettings(request, isNewProject: true);

        // StudyBibleAdditions inherits language from base, so null LanguageId is valid
        Assert.That(result.FieldErrors.ContainsKey("Language"), Is.False,
            "StudyBibleAdditions should not require Language (inherits from base)");
    }

    /// <summary>
    /// VAL-006: Book filename template is required
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-VAL-006-01")]
    [Property("BehaviorId", "VAL-006")]
    [Property("CapabilityId", "CAP-003")]
    public void ValidateProjectSettings_EmptyFileNameForm_ReturnsFileNameFormError()
    {
        var request = CreateValidProjectRequest() with { FileNameForm = "" };

        var result = ProjectValidationService.ValidateProjectSettings(request, isNewProject: true);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.FieldErrors.ContainsKey("FileNameForm"), Is.True);
        Assert.That(result.FieldErrors["FileNameForm"].Message, Does.Contain("must be specified"));
    }

    /// <summary>
    /// VAL-006: PTX extension is not allowed for new projects
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-VAL-006-02")]
    [Property("BehaviorId", "VAL-006")]
    [Property("CapabilityId", "CAP-003")]
    public void ValidateProjectSettings_PtxExtensionNewProject_ReturnsFileNameFormError()
    {
        var request = CreateValidProjectRequest() with { FileNameForm = "41MAT.ptx" };

        var result = ProjectValidationService.ValidateProjectSettings(request, isNewProject: true);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.FieldErrors.ContainsKey("FileNameForm"), Is.True);
        Assert.That(result.FieldErrors["FileNameForm"].Message, Does.Contain("PTX"));
    }

    /// <summary>
    /// VAL-007: Base project is required for derived types
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-VAL-007-01")]
    [Property("BehaviorId", "VAL-007")]
    [Property("CapabilityId", "CAP-003")]
    [TestCaseSource(nameof(DerivedProjectTypes))]
    public void ValidateProjectSettings_DerivedTypeNoBaseProject_ReturnsBaseProjectError(
        string projectTypeName)
    {
        var request = CreateValidProjectRequestByName(projectTypeName) with { BaseProjectGuid = null };

        var result = ProjectValidationService.ValidateProjectSettings(request, isNewProject: true);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.FieldErrors.ContainsKey("BaseProject"), Is.True);
        Assert.That(result.FieldErrors["BaseProject"].Message, Does.Contain("No base project"));
    }

    /// <summary>
    /// Test data source: Derived project types that require a base project.
    /// </summary>
    private static IEnumerable<string> DerivedProjectTypes
    {
        get
        {
            yield return "BackTranslation";
            yield return "Daughter";
            yield return "Auxiliary";
            yield return "StudyBible";
            yield return "TransliterationManual";
            yield return "TransliterationWithEncoder";
        }
    }

    /// <summary>
    /// VAL-007: Base project is NOT required for Standard type
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-VAL-007-02")]
    [Property("BehaviorId", "VAL-007")]
    [Property("CapabilityId", "CAP-003")]
    public void ValidateProjectSettings_StandardTypeNoBaseProject_NoBaseProjectError()
    {
        var request = CreateValidProjectRequestByName("Standard") with
        {
            BaseProjectGuid = null
        };

        var result = ProjectValidationService.ValidateProjectSettings(request, isNewProject: true);

        // Standard type doesn't require base project
        Assert.That(result.FieldErrors.ContainsKey("BaseProject"), Is.False,
            "Standard project should not require base project");
    }

    /// <summary>
    /// VAL-008: Encoder is required for TransliterationWithEncoder
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-VAL-008-01")]
    [Property("BehaviorId", "VAL-008")]
    [Property("CapabilityId", "CAP-003")]
    public void ValidateProjectSettings_TranslitWithEncoderNoEncoder_ReturnsEncoderError()
    {
        var request = CreateValidProjectRequestByName("TransliterationWithEncoder") with
        {
            EncoderName = null,
            BaseProjectGuid = Paratext.Data.HexId.FromStr("1234567890123456789012345678901234567890")
        };

        var result = ProjectValidationService.ValidateProjectSettings(request, isNewProject: true);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.FieldErrors.ContainsKey("Encoder"), Is.True);
        Assert.That(result.FieldErrors["Encoder"].Message, Does.Contain("encoding converter"));
    }

    /// <summary>
    /// VAL-008: Encoder is not required for other types
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-VAL-008-02")]
    [Property("BehaviorId", "VAL-008")]
    [Property("CapabilityId", "CAP-003")]
    public void ValidateProjectSettings_StandardTypeNoEncoder_NoEncoderError()
    {
        var request = CreateValidProjectRequest() with { EncoderName = null };

        var result = ProjectValidationService.ValidateProjectSettings(request, isNewProject: true);

        Assert.That(result.FieldErrors.ContainsKey("Encoder"), Is.False,
            "Standard project should not require encoder");
    }

    /// <summary>
    /// VAL-010: Note tag names must be non-empty
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-VAL-010-01")]
    [Property("BehaviorId", "VAL-010")]
    [Property("CapabilityId", "CAP-003")]
    public void ValidateProjectSettings_EmptyNoteTagName_ReturnsNoteTagsError()
    {
        var request = CreateValidProjectRequest() with
        {
            NoteTags = new List<NoteTagConfig>
            {
                new("Tag1", "icon1", "open"),
                new("", "icon2", "open"), // Empty name
                new("Tag3", "icon3", "open")
            }
        };

        var result = ProjectValidationService.ValidateProjectSettings(request, isNewProject: true);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.FieldErrors.ContainsKey("NoteTags"), Is.True);
        Assert.That(result.FieldErrors["NoteTags"].Message, Does.Contain("must have a name"));
    }

    /// <summary>
    /// VAL-010: Note tag names must be unique
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-VAL-010-02")]
    [Property("BehaviorId", "VAL-010")]
    [Property("CapabilityId", "CAP-003")]
    public void ValidateProjectSettings_DuplicateNoteTagNames_ReturnsNoteTagsError()
    {
        var request = CreateValidProjectRequest() with
        {
            NoteTags = new List<NoteTagConfig>
            {
                new("MyTag", "icon1", "open"),
                new("MyTag", "icon2", "open"), // Duplicate name
                new("Tag3", "icon3", "open")
            }
        };

        var result = ProjectValidationService.ValidateProjectSettings(request, isNewProject: true);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.FieldErrors.ContainsKey("NoteTags"), Is.True);
        Assert.That(result.FieldErrors["NoteTags"].Message, Does.Contain("unique name"));
    }

    /// <summary>
    /// VAL-011: Study Bible category names must be non-empty
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-VAL-011-01")]
    [Property("BehaviorId", "VAL-011")]
    [Property("CapabilityId", "CAP-003")]
    public void ValidateProjectSettings_EmptyCategoryName_ReturnsCategoriesError()
    {
        var request = CreateValidProjectRequestByName("StudyBibleAdditions") with
        {
            BaseProjectGuid = Paratext.Data.HexId.FromStr("1234567890123456789012345678901234567890"),
            StudyBibleCategories = new List<StudyBibleCategory>
            {
                new("Category1", "desc1"),
                new("", "desc2"), // Empty name
                new("Category3", "desc3")
            }
        };

        var result = ProjectValidationService.ValidateProjectSettings(request, isNewProject: true);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.FieldErrors.ContainsKey("StudyBibleCategories"), Is.True);
        Assert.That(result.FieldErrors["StudyBibleCategories"].Message, Does.Contain("cannot be blank"));
    }

    /// <summary>
    /// VAL-011: Study Bible category names cannot contain spaces
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-VAL-011-02")]
    [Property("BehaviorId", "VAL-011")]
    [Property("CapabilityId", "CAP-003")]
    public void ValidateProjectSettings_CategoryNameWithSpaces_ReturnsCategoriesError()
    {
        var request = CreateValidProjectRequestByName("StudyBibleAdditions") with
        {
            BaseProjectGuid = Paratext.Data.HexId.FromStr("1234567890123456789012345678901234567890"),
            StudyBibleCategories = new List<StudyBibleCategory>
            {
                new("My Category", "desc") // Contains space
            }
        };

        var result = ProjectValidationService.ValidateProjectSettings(request, isNewProject: true);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.FieldErrors.ContainsKey("StudyBibleCategories"), Is.True);
        Assert.That(result.FieldErrors["StudyBibleCategories"].Message, Does.Contain("cannot contain spaces"));
    }

    /// <summary>
    /// VAL-011: Study Bible category names cannot contain backslash
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-VAL-011-03")]
    [Property("BehaviorId", "VAL-011")]
    [Property("CapabilityId", "CAP-003")]
    public void ValidateProjectSettings_CategoryNameWithBackslash_ReturnsCategoriesError()
    {
        var request = CreateValidProjectRequestByName("StudyBibleAdditions") with
        {
            BaseProjectGuid = Paratext.Data.HexId.FromStr("1234567890123456789012345678901234567890"),
            StudyBibleCategories = new List<StudyBibleCategory>
            {
                new(@"My\Category", "desc") // Contains backslash
            }
        };

        var result = ProjectValidationService.ValidateProjectSettings(request, isNewProject: true);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.FieldErrors.ContainsKey("StudyBibleCategories"), Is.True);
        Assert.That(result.FieldErrors["StudyBibleCategories"].Message, Does.Contain("\\"));
    }

    /// <summary>
    /// VAL-011: Study Bible category names must be unique
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-VAL-011-04")]
    [Property("BehaviorId", "VAL-011")]
    [Property("CapabilityId", "CAP-003")]
    public void ValidateProjectSettings_DuplicateCategoryNames_ReturnsCategoriesError()
    {
        var request = CreateValidProjectRequestByName("StudyBibleAdditions") with
        {
            BaseProjectGuid = Paratext.Data.HexId.FromStr("1234567890123456789012345678901234567890"),
            StudyBibleCategories = new List<StudyBibleCategory>
            {
                new("MyCategory", "desc1"),
                new("MyCategory", "desc2") // Duplicate name
            }
        };

        var result = ProjectValidationService.ValidateProjectSettings(request, isNewProject: true);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.FieldErrors.ContainsKey("StudyBibleCategories"), Is.True);
        Assert.That(result.FieldErrors["StudyBibleCategories"].Message, Does.Contain("unique"));
    }

    #endregion

    #region CAP-003: ValidateProjectSettings - Invariant Tests

    /// <summary>
    /// INV-005: Derived types must have base project name
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-005")]
    [Property("ScenarioId", "TS-INV-005-01")]
    [Property("CapabilityId", "CAP-003")]
    [TestCaseSource(nameof(AllDerivedProjectTypesIncludingSBA))]
    public void ValidateProjectSettings_Invariant_DerivedTypesMustHaveBaseProject(
        string derivedTypeName)
    {
        var request = CreateValidProjectRequestByName(derivedTypeName) with { BaseProjectGuid = null };

        var result = ProjectValidationService.ValidateProjectSettings(request, isNewProject: true);

        Assert.That(
            result.FieldErrors.ContainsKey("BaseProject"),
            Is.True,
            $"Derived type {derivedTypeName} must require base project (INV-005)"
        );
    }

    /// <summary>
    /// Test data source: All derived project types including StudyBibleAdditions.
    /// </summary>
    private static IEnumerable<string> AllDerivedProjectTypesIncludingSBA
    {
        get
        {
            yield return "BackTranslation";
            yield return "Daughter";
            yield return "Auxiliary";
            yield return "StudyBible";
            yield return "StudyBibleAdditions";
            yield return "TransliterationManual";
            yield return "TransliterationWithEncoder";
        }
    }

    /// <summary>
    /// Valid Standard project should pass all validations
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-005-VALID")]
    [Property("CapabilityId", "CAP-003")]
    public void ValidateProjectSettings_ValidStandardProject_ReturnsValid()
    {
        var request = CreateValidProjectRequest();

        var result = ProjectValidationService.ValidateProjectSettings(request, isNewProject: true);

        Assert.That(result.IsValid, Is.True, "Valid Standard project should pass validation");
        Assert.That(result.FieldErrors, Is.Empty, "No field errors expected");
        Assert.That(result.HasMajorErrors, Is.False);
        Assert.That(result.HasMinorErrors, Is.False);
    }

    #endregion

    #region CAP-003: Helper Methods

    /// <summary>
    /// Creates a valid ProjectCreateRequest for testing with Standard project type.
    /// </summary>
    private static ProjectCreateRequest CreateValidProjectRequest()
    {
        return CreateValidProjectRequestByName("Standard");
    }

    /// <summary>
    /// Creates a valid ProjectCreateRequest for testing with specified project type name.
    /// </summary>
    private static ProjectCreateRequest CreateValidProjectRequestByName(string projectTypeName)
    {
        var baseGuid = projectTypeName != "Standard" && projectTypeName != "ConsultantNotes"
            ? HexId.FromStr("1234567890123456789012345678901234567890")
            : (HexId?)null;

        var encoderName = projectTypeName == "TransliterationWithEncoder" ? "SIL Converters" : null;

        return new ProjectCreateRequest(
            ShortName: "MYPROJ",
            FullName: "My Test Project",
            ProjectType: new PtxUtils.Enum<ProjectType>(projectTypeName),
            LanguageId: "eng",
            Versification: SIL.Scripture.ScrVersType.English,
            BaseProjectGuid: baseGuid,
            Editable: true,
            EncoderName: encoderName,
            EncoderReverseDirection: false,
            BooksPresent: new List<string> { "GEN", "EXO", "LEV" },
            FileNameForm: "41MAT",
            Normalization: ProjectNormalization.NFC,
            UsfmVersion: UsfmVersionOption.Version3,
            NoteTags: new List<NoteTagConfig>(),
            BiblicalTermsListId: null,
            AssociatedLexicalProjectGuid: null,
            StudyBibleCategories: null
        );
    }

    #endregion
}
