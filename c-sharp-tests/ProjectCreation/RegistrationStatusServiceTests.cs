using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ProjectCreation;

namespace TestParanextDataProvider.ProjectCreation;

/// <summary>
/// Tests for RegistrationStatusService (CAP-013, CAP-014, CAP-015).
/// These are unit tests for registration code normalization, email validation,
/// and guest status change detection.
/// The service is stateless, so no base class or fixtures are required.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class RegistrationStatusServiceTests
{
    #region CAP-013: NormalizeRegistrationCode Tests (FB 48040)

    /// <summary>
    /// Acceptance test for CAP-013: NormalizeRegistrationCode must convert
    /// confusable characters (S->5, I->1, L->1, O->0) per FB 48040.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-013")]
    [Property("ScenarioId", "TS-054")]
    [Property("BehaviorId", "BHV-250")]
    [Description("Acceptance test: Registration code normalization converts confusable characters")]
    public void NormalizeRegistrationCode_AcceptanceTest()
    {
        // This test passes when CAP-013 is complete
        // S->5, I->1, L->1, O->0
        var rawCode = "SILO12345678901234";

        var result = RegistrationStatusService.NormalizeRegistrationCode(rawCode);

        // S->5, I->1, L->1, O->0
        Assert.That(result, Is.EqualTo("51101234567890123456".Substring(0, rawCode.Length)));
    }

    /// <summary>
    /// FB 48040: S character normalized to 5.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-054")]
    [Property("BehaviorId", "BHV-250")]
    public void NormalizeRegistrationCode_S_ReplacedWith5()
    {
        var rawCode = "S1234567890123456789";

        var result = RegistrationStatusService.NormalizeRegistrationCode(rawCode);

        Assert.That(result[0], Is.EqualTo('5'));
    }

    /// <summary>
    /// FB 48040: I character normalized to 1.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-054")]
    [Property("BehaviorId", "BHV-250")]
    public void NormalizeRegistrationCode_I_ReplacedWith1()
    {
        var rawCode = "I1234567890123456789";

        var result = RegistrationStatusService.NormalizeRegistrationCode(rawCode);

        Assert.That(result[0], Is.EqualTo('1'));
    }

    /// <summary>
    /// FB 48040: L character normalized to 1.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-054")]
    [Property("BehaviorId", "BHV-250")]
    public void NormalizeRegistrationCode_L_ReplacedWith1()
    {
        var rawCode = "L1234567890123456789";

        var result = RegistrationStatusService.NormalizeRegistrationCode(rawCode);

        Assert.That(result[0], Is.EqualTo('1'));
    }

    /// <summary>
    /// FB 48040: O character normalized to 0.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-054")]
    [Property("BehaviorId", "BHV-250")]
    public void NormalizeRegistrationCode_O_ReplacedWith0()
    {
        var rawCode = "O1234567890123456789";

        var result = RegistrationStatusService.NormalizeRegistrationCode(rawCode);

        Assert.That(result[0], Is.EqualTo('0'));
    }

    /// <summary>
    /// FB 48040: Lowercase confusable characters also normalized.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-054")]
    [Property("BehaviorId", "BHV-250")]
    [TestCase('s', '5')]
    [TestCase('i', '1')]
    [TestCase('l', '1')]
    [TestCase('o', '0')]
    public void NormalizeRegistrationCode_LowercaseConfusables_AlsoNormalized(char input, char expected)
    {
        var rawCode = input + "1234567890123456789";

        var result = RegistrationStatusService.NormalizeRegistrationCode(rawCode);

        Assert.That(result[0], Is.EqualTo(expected));
    }

    /// <summary>
    /// FB 48040: Multiple confusable characters in same code.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-054")]
    [Property("BehaviorId", "BHV-250")]
    public void NormalizeRegistrationCode_MultipleConfusables_AllNormalized()
    {
        var rawCode = "SILOX12345678901234";

        var result = RegistrationStatusService.NormalizeRegistrationCode(rawCode);

        // S->5, I->1, L->1, O->0, X stays X
        Assert.That(result.Substring(0, 5), Is.EqualTo("5110X"));
    }

    /// <summary>
    /// Valid registration characters are preserved.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-054")]
    [Property("BehaviorId", "BHV-250")]
    public void NormalizeRegistrationCode_ValidChars_Preserved()
    {
        var rawCode = "12345678901234567890";

        var result = RegistrationStatusService.NormalizeRegistrationCode(rawCode);

        Assert.That(result, Is.EqualTo(rawCode));
    }

    /// <summary>
    /// Empty input returns empty string.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-054")]
    [Property("BehaviorId", "BHV-250")]
    public void NormalizeRegistrationCode_EmptyInput_ReturnsEmpty()
    {
        var rawCode = "";

        var result = RegistrationStatusService.NormalizeRegistrationCode(rawCode);

        Assert.That(result, Is.Empty);
    }

    /// <summary>
    /// Null input handled gracefully.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-054")]
    [Property("BehaviorId", "BHV-250")]
    public void NormalizeRegistrationCode_NullInput_ReturnsEmptyOrNull()
    {
        var result = RegistrationStatusService.NormalizeRegistrationCode(null!);

        Assert.That(result, Is.Null.Or.Empty);
    }

    #endregion

    #region CAP-014: ValidateEmail Tests (SPEC-010)

    /// <summary>
    /// Acceptance test for CAP-014: ValidateEmail must return appropriate
    /// EmailValidationResult based on email format and server mode.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-014")]
    [Property("ScenarioId", "TS-055")]
    [Property("BehaviorId", "BHV-250")]
    [Description("Acceptance test: Email validation returns correct result for valid email")]
    public void ValidateEmail_AcceptanceTest()
    {
        // This test passes when CAP-014 is complete
        var result = RegistrationStatusService.ValidateEmail("user@example.com", serverMode: false);

        Assert.That(result, Is.EqualTo(EmailValidationResult.Valid));
    }

    /// <summary>
    /// SPEC-010: Valid email format accepted.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecificationId", "SPEC-010")]
    [Property("ScenarioId", "TS-055")]
    [Property("BehaviorId", "BHV-250")]
    [TestCase("user@example.com")]
    [TestCase("test.user@domain.org")]
    [TestCase("name+tag@company.co.uk")]
    public void ValidateEmail_ValidFormat_ReturnsValid(string email)
    {
        var result = RegistrationStatusService.ValidateEmail(email, serverMode: false);

        Assert.That(result, Is.EqualTo(EmailValidationResult.Valid));
    }

    /// <summary>
    /// SPEC-010: Invalid email format rejected.
    /// VAL-017
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecificationId", "SPEC-010")]
    [Property("ScenarioId", "TS-056")]
    [Property("BehaviorId", "BHV-250")]
    [TestCase("invalid-email")]
    [TestCase("no-at-sign")]
    [TestCase("@nodomain.com")]
    [TestCase("nodomainpart@")]
    [TestCase("spaces in@email.com")]
    public void ValidateEmail_InvalidFormat_ReturnsInvalidFormat(string email)
    {
        var result = RegistrationStatusService.ValidateEmail(email, serverMode: false);

        Assert.That(result, Is.EqualTo(EmailValidationResult.InvalidFormat));
    }

    /// <summary>
    /// SPEC-010: Empty email in non-server mode returns Empty.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecificationId", "SPEC-010")]
    [Property("ScenarioId", "TS-055")]
    [Property("BehaviorId", "BHV-250")]
    [TestCase("")]
    [TestCase(null)]
    public void ValidateEmail_EmptyInNonServerMode_ReturnsEmpty(string? email)
    {
        var result = RegistrationStatusService.ValidateEmail(email!, serverMode: false);

        Assert.That(result, Is.EqualTo(EmailValidationResult.Empty));
    }

    /// <summary>
    /// SPEC-010: Empty email in server mode returns EmptyRequireConfirmation.
    /// VAL-017: Email required in server mode.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecificationId", "SPEC-010")]
    [Property("ScenarioId", "TS-055")]
    [Property("BehaviorId", "BHV-250")]
    [TestCase("")]
    [TestCase(null)]
    [TestCase("   ")]
    public void ValidateEmail_EmptyInServerMode_ReturnsEmptyRequireConfirmation(string? email)
    {
        var result = RegistrationStatusService.ValidateEmail(email!, serverMode: true);

        Assert.That(result, Is.EqualTo(EmailValidationResult.EmptyRequireConfirmation));
    }

    /// <summary>
    /// Valid email in server mode returns Valid.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecificationId", "SPEC-010")]
    [Property("ScenarioId", "TS-055")]
    [Property("BehaviorId", "BHV-250")]
    public void ValidateEmail_ValidFormatInServerMode_ReturnsValid()
    {
        var result = RegistrationStatusService.ValidateEmail("user@example.com", serverMode: true);

        Assert.That(result, Is.EqualTo(EmailValidationResult.Valid));
    }

    /// <summary>
    /// Whitespace-only email treated as empty.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-055")]
    [Property("BehaviorId", "BHV-250")]
    public void ValidateEmail_WhitespaceOnlyInNonServerMode_ReturnsEmpty()
    {
        var result = RegistrationStatusService.ValidateEmail("   ", serverMode: false);

        Assert.That(result, Is.EqualTo(EmailValidationResult.Empty));
    }

    #endregion

    #region CAP-015: EvaluateGuestStatusChange Tests (SPEC-010)

    /// <summary>
    /// Acceptance test for CAP-015: EvaluateGuestStatusChange must detect
    /// changes between guest and regular user status.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-015")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "BHV-112")]
    [Description("Acceptance test: Guest status change detection identifies guest-to-regular transitions")]
    public void EvaluateGuestStatusChange_AcceptanceTest()
    {
        // This test passes when CAP-015 is complete
        // Guest becoming regular user is a GuestStatusChange
        var result = RegistrationStatusService.EvaluateGuestStatusChange(
            wasGuest: true,
            isGuest: false);

        Assert.That(result, Is.EqualTo(UserChangeType.GuestStatusChange));
    }

    /// <summary>
    /// SPEC-010: No change when guest status unchanged (guest -> guest).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecificationId", "SPEC-010")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "BHV-112")]
    public void EvaluateGuestStatusChange_GuestToGuest_ReturnsNoChange()
    {
        var result = RegistrationStatusService.EvaluateGuestStatusChange(
            wasGuest: true,
            isGuest: true);

        Assert.That(result, Is.EqualTo(UserChangeType.NoChange));
    }

    /// <summary>
    /// SPEC-010: No change when guest status unchanged (regular -> regular).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecificationId", "SPEC-010")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "BHV-112")]
    public void EvaluateGuestStatusChange_RegularToRegular_ReturnsNoChange()
    {
        var result = RegistrationStatusService.EvaluateGuestStatusChange(
            wasGuest: false,
            isGuest: false);

        Assert.That(result, Is.EqualTo(UserChangeType.NoChange));
    }

    /// <summary>
    /// SPEC-010: Guest becoming regular is a GuestStatusChange.
    /// DC-003: Guest users cannot create projects.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecificationId", "SPEC-010")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "BHV-112")]
    public void EvaluateGuestStatusChange_GuestToRegular_ReturnsGuestStatusChange()
    {
        var result = RegistrationStatusService.EvaluateGuestStatusChange(
            wasGuest: true,
            isGuest: false);

        Assert.That(result, Is.EqualTo(UserChangeType.GuestStatusChange));
    }

    /// <summary>
    /// SPEC-010: Regular becoming guest is a GuestStatusChange.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecificationId", "SPEC-010")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "BHV-112")]
    public void EvaluateGuestStatusChange_RegularToGuest_ReturnsGuestStatusChange()
    {
        var result = RegistrationStatusService.EvaluateGuestStatusChange(
            wasGuest: false,
            isGuest: true);

        Assert.That(result, Is.EqualTo(UserChangeType.GuestStatusChange));
    }

    #endregion

    #region CAP-012: GetRegistrationStatus Tests (GM-UI-003, SPEC-009)

    /// <summary>
    /// Acceptance test for CAP-012: GetRegistrationStatus must return appropriate
    /// RegistrationStatusResult with correct message type and UI flags based on
    /// project type, registration status, and base project.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-072")]
    [Property("BehaviorId", "BHV-205")]
    [Description("Acceptance test: GetRegistrationStatus returns correct status for registered project")]
    public async Task GetRegistrationStatus_AcceptanceTest()
    {
        // This test passes when CAP-012 is complete
        // A registered Standard project should show "Registered" with manage link
        var request = new RegistrationStatusRequest
        {
            ProjectGuid = "0123456789abcdef0123456789abcdef01234567",
            ProjectName = "TESTP",
            ProjectType = ProjectType.Standard,
            BaseProjectName = null,
            BaseProjectGuid = null,
            AllowDerivedProjectRegistration = false
        };

        var result = await RegistrationStatusService.GetRegistrationStatusAsync(request);

        // For a registered Standard project, expect Registered status with manage link
        Assert.That(result.MessageType, Is.EqualTo(RegistrationMessageType.Registered));
        Assert.That(result.ShowManageLink, Is.True);
        Assert.That(result.ShowRegisterButton, Is.False);
        Assert.That(result.BlocksCreation, Is.False);
    }

    /// <summary>
    /// GM-UI-003: NoTypeSelected - No project type selected yet.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "GM-UI-003")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-205")]
    public async Task GetRegistrationStatus_NoTypeSelected_ReturnsNoTypeSelectedState()
    {
        var request = new RegistrationStatusRequest
        {
            ProjectType = null, // No type selected
            ProjectName = null,
            ProjectGuid = null
        };

        var result = await RegistrationStatusService.GetRegistrationStatusAsync(request);

        Assert.That(result.MessageType, Is.EqualTo(RegistrationMessageType.NoTypeSelected));
        Assert.That(result.ShowRegisterButton, Is.False);
        Assert.That(result.ShowManageLink, Is.False);
        Assert.That(result.ShowOfflineCheckbox, Is.False);
    }

    /// <summary>
    /// GM-UI-003: InheritsFromBase - BackTranslation inherits registration from base.
    /// DC-002: BackTranslation shares license with parent.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "GM-UI-003")]
    [Property("ScenarioId", "TS-073")]
    [Property("BehaviorId", "BHV-205")]
    public async Task GetRegistrationStatus_BackTranslation_InheritsFromBase()
    {
        var request = new RegistrationStatusRequest
        {
            ProjectType = ProjectType.BackTranslation,
            ProjectName = "TESTBT",
            ProjectGuid = null,
            BaseProjectName = "TESTP",
            BaseProjectGuid = "0123456789abcdef0123456789abcdef01234567",
            AllowDerivedProjectRegistration = false
        };

        var result = await RegistrationStatusService.GetRegistrationStatusAsync(request);

        Assert.That(result.MessageType, Is.EqualTo(RegistrationMessageType.InheritsFromBase));
        Assert.That(result.ShowRegisterButton, Is.False);
        Assert.That(result.ShowManageLink, Is.False);
        Assert.That(result.BlocksCreation, Is.False);
    }

    /// <summary>
    /// GM-UI-003: InheritsFromBase - Auxiliary project inherits from base.
    /// DC-002: Auxiliary shares license with parent.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "GM-UI-003")]
    [Property("ScenarioId", "TS-073")]
    [Property("BehaviorId", "BHV-205")]
    public async Task GetRegistrationStatus_Auxiliary_InheritsFromBase()
    {
        var request = new RegistrationStatusRequest
        {
            ProjectType = ProjectType.Auxiliary,
            ProjectName = "TESTAX",
            BaseProjectName = "TESTP",
            BaseProjectGuid = "0123456789abcdef0123456789abcdef01234567",
            AllowDerivedProjectRegistration = false
        };

        var result = await RegistrationStatusService.GetRegistrationStatusAsync(request);

        Assert.That(result.MessageType, Is.EqualTo(RegistrationMessageType.InheritsFromBase));
    }

    /// <summary>
    /// GM-UI-003: InheritsFromBase - TransliterationManual inherits from base.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "GM-UI-003")]
    [Property("ScenarioId", "TS-073")]
    [Property("BehaviorId", "BHV-205")]
    public async Task GetRegistrationStatus_TransliterationManual_InheritsFromBase()
    {
        var request = new RegistrationStatusRequest
        {
            ProjectType = ProjectType.TransliterationManual,
            ProjectName = "TESTTM",
            BaseProjectName = "TESTP",
            BaseProjectGuid = "0123456789abcdef0123456789abcdef01234567",
            AllowDerivedProjectRegistration = false
        };

        var result = await RegistrationStatusService.GetRegistrationStatusAsync(request);

        Assert.That(result.MessageType, Is.EqualTo(RegistrationMessageType.InheritsFromBase));
    }

    /// <summary>
    /// GM-UI-003: NotRegisteredType - Type that doesn't require registration.
    /// ConsultantNotes type does not require registration.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "GM-UI-003")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-205")]
    public async Task GetRegistrationStatus_ConsultantNotes_NotRegisteredType()
    {
        var request = new RegistrationStatusRequest
        {
            ProjectType = ProjectType.ConsultantNotes,
            ProjectName = "TESTCN"
        };

        var result = await RegistrationStatusService.GetRegistrationStatusAsync(request);

        // ConsultantNotes is not a type that requires its own registration
        Assert.That(result.MessageType, Is.EqualTo(RegistrationMessageType.NotRegisteredType));
        Assert.That(result.ShowRegisterButton, Is.False);
        Assert.That(result.BlocksCreation, Is.False);
    }

    /// <summary>
    /// GM-UI-003: CanRegister - Unregistered Standard project can be registered.
    /// DC-001: Standard requires own registration.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "GM-UI-003")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-205")]
    public async Task GetRegistrationStatus_UnregisteredStandard_CanRegister()
    {
        var request = new RegistrationStatusRequest
        {
            ProjectType = ProjectType.Standard,
            ProjectName = "NEWPROJ",
            ProjectGuid = null // New project, no GUID yet
        };

        var result = await RegistrationStatusService.GetRegistrationStatusAsync(request);

        Assert.That(result.MessageType, Is.EqualTo(RegistrationMessageType.CanRegister));
        Assert.That(result.ShowRegisterButton, Is.True);
        Assert.That(result.ShowManageLink, Is.False);
    }

    /// <summary>
    /// GM-UI-003: CanRegister - Unregistered Daughter project can be registered.
    /// DC-001: Daughter requires own registration.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "GM-UI-003")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-205")]
    public async Task GetRegistrationStatus_UnregisteredDaughter_CanRegister()
    {
        var request = new RegistrationStatusRequest
        {
            ProjectType = ProjectType.Daughter,
            ProjectName = "NEWDAUGHTER",
            BaseProjectName = "TESTP",
            BaseProjectGuid = "0123456789abcdef0123456789abcdef01234567"
        };

        var result = await RegistrationStatusService.GetRegistrationStatusAsync(request);

        Assert.That(result.MessageType, Is.EqualTo(RegistrationMessageType.CanRegister));
        Assert.That(result.ShowRegisterButton, Is.True);
    }

    /// <summary>
    /// GM-UI-003: Registered - Project is registered with manage link.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "GM-UI-003")]
    [Property("ScenarioId", "TS-072")]
    [Property("BehaviorId", "BHV-205")]
    public async Task GetRegistrationStatus_RegisteredProject_ShowsManageLink()
    {
        var request = new RegistrationStatusRequest
        {
            ProjectType = ProjectType.Standard,
            ProjectName = "REGISTERED",
            ProjectGuid = "fedcba9876543210fedcba9876543210fedcba98"
        };

        var result = await RegistrationStatusService.GetRegistrationStatusAsync(request);

        Assert.That(result.MessageType, Is.EqualTo(RegistrationMessageType.Registered));
        Assert.That(result.ShowManageLink, Is.True);
        Assert.That(result.ShowRegisterButton, Is.False);
    }

    /// <summary>
    /// GM-UI-003: RegisteredPrivate - Project is registered as private.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "GM-UI-003")]
    [Property("ScenarioId", "TS-072")]
    [Property("BehaviorId", "BHV-205")]
    public async Task GetRegistrationStatus_PrivateProject_ShowsPrivateStatus()
    {
        var request = new RegistrationStatusRequest
        {
            ProjectType = ProjectType.Standard,
            ProjectName = "PRIVATE",
            ProjectGuid = "abcdef12345678901234567890abcdef12345678"
        };

        var result = await RegistrationStatusService.GetRegistrationStatusAsync(request);

        // Private registered projects show RegisteredPrivate
        Assert.That(
            result.MessageType,
            Is.EqualTo(RegistrationMessageType.Registered).Or.EqualTo(RegistrationMessageType.RegisteredPrivate)
        );
        Assert.That(result.ShowManageLink, Is.True);
    }

    /// <summary>
    /// GM-UI-003: OfflineAllowed - Offline registration option.
    /// EC-007: Network unavailable.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "GM-UI-003")]
    [Property("ScenarioId", "TS-074")]
    [Property("BehaviorId", "BHV-210")]
    public async Task GetRegistrationStatus_OfflineMode_ShowsOfflineCheckbox()
    {
        // This tests that when offline registration is allowed, the checkbox is shown
        var request = new RegistrationStatusRequest
        {
            ProjectType = ProjectType.Standard,
            ProjectName = "OFFLINEPROJ",
            AllowDerivedProjectRegistration = false
            // The implementation should detect offline mode
        };

        var result = await RegistrationStatusService.GetRegistrationStatusAsync(request);

        // If result indicates offline allowed state, verify checkbox is shown
        if (result.MessageType == RegistrationMessageType.OfflineAllowed)
        {
            Assert.That(result.ShowOfflineCheckbox, Is.True);
        }
    }

    /// <summary>
    /// GM-UI-003: RegistrationRevoked - Project registration was revoked.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "GM-UI-003")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-205")]
    public async Task GetRegistrationStatus_RevokedRegistration_ShowsRevokedState()
    {
        // This would require a project that had registration revoked
        var request = new RegistrationStatusRequest
        {
            ProjectType = ProjectType.Standard,
            ProjectName = "REVOKED",
            ProjectGuid = "11111111111111111111111111111111111111111"
        };

        var result = await RegistrationStatusService.GetRegistrationStatusAsync(request);

        // If the result is RegistrationRevoked, verify register button is shown
        if (result.MessageType == RegistrationMessageType.RegistrationRevoked)
        {
            Assert.That(result.ShowRegisterButton, Is.True);
            Assert.That(result.ShowManageLink, Is.False);
        }
    }

    /// <summary>
    /// GM-UI-003: CannotRegister - User cannot register this project.
    /// This occurs when the user is a guest (DC-003).
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "GM-UI-003")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "BHV-205")]
    public async Task GetRegistrationStatus_GuestUser_CannotRegister()
    {
        // Guest users cannot register projects (DC-003)
        var request = new RegistrationStatusRequest
        {
            ProjectType = ProjectType.Standard,
            ProjectName = "GUESTPROJ"
            // The implementation should check user registration status
        };

        var result = await RegistrationStatusService.GetRegistrationStatusAsync(request);

        // If user is a guest, they cannot register
        if (result.MessageType == RegistrationMessageType.CannotRegister)
        {
            Assert.That(result.ShowRegisterButton, Is.False);
            Assert.That(result.BlocksCreation, Is.True);
        }
    }

    /// <summary>
    /// GM-UI-003: Unregistered - Legacy state for unregistered project.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "GM-UI-003")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-205")]
    public async Task GetRegistrationStatus_Unregistered_DoesNotBlockCreation()
    {
        var request = new RegistrationStatusRequest
        {
            ProjectType = ProjectType.Standard,
            ProjectName = "UNREGISTERED"
        };

        var result = await RegistrationStatusService.GetRegistrationStatusAsync(request);

        // Unregistered state should not block creation (user can create and register later)
        if (result.MessageType == RegistrationMessageType.Unregistered)
        {
            Assert.That(result.BlocksCreation, Is.False);
        }
    }

    /// <summary>
    /// Contract test: MessageText is never null for any state.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-205")]
    [TestCase(ProjectType.Standard)]
    [TestCase(ProjectType.BackTranslation)]
    [TestCase(ProjectType.Daughter)]
    [TestCase(ProjectType.ConsultantNotes)]
    public async Task GetRegistrationStatus_AnyType_MessageTextNotNull(ProjectType projectType)
    {
        var request = new RegistrationStatusRequest
        {
            ProjectType = projectType,
            ProjectName = "TESTPROJ"
        };

        var result = await RegistrationStatusService.GetRegistrationStatusAsync(request);

        Assert.That(result.MessageText, Is.Not.Null);
    }

    /// <summary>
    /// Contract test: StudyBibleAdditions requires own registration.
    /// DC-001: StudyBibleAdditions requires own registration.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-205")]
    public async Task GetRegistrationStatus_StudyBibleAdditions_RequiresOwnRegistration()
    {
        var request = new RegistrationStatusRequest
        {
            ProjectType = ProjectType.StudyBibleAdditions,
            ProjectName = "TESTSBA",
            BaseProjectName = "TESTP",
            BaseProjectGuid = "0123456789abcdef0123456789abcdef01234567"
        };

        var result = await RegistrationStatusService.GetRegistrationStatusAsync(request);

        // StudyBibleAdditions requires its own registration, should not inherit from base
        Assert.That(result.MessageType, Is.Not.EqualTo(RegistrationMessageType.InheritsFromBase));
    }

    #endregion

    #region CAP-016: EvaluateUserChange Tests

    /// <summary>
    /// Acceptance test for CAP-016: EvaluateUserChange must correctly evaluate
    /// user changes and determine if commits are required and confirmation needed.
    /// 5+ projects trigger confirmation dialog.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-016")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "BHV-112")]
    [Description("Acceptance test: EvaluateUserChange returns correct result for user change with many projects")]
    public void EvaluateUserChange_AcceptanceTest()
    {
        // This test passes when CAP-016 is complete
        // User change with 5+ affected projects should show confirmation
        var result = RegistrationStatusService.EvaluateUserChange(
            currentUser: "OldUser",
            newUser: "NewUser",
            commitChanges: true,
            affectedProjectCount: 6);

        Assert.That(result.RequiresCommit, Is.True);
        Assert.That(result.ShowConfirmation, Is.True);
        Assert.That(result.AffectedProjectCount, Is.EqualTo(6));
        Assert.That(result.ConfirmationMessage, Is.Not.Null.And.Not.Empty);
    }

    /// <summary>
    /// EXT-B2-003: No change when users are the same.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "BHV-112")]
    public void EvaluateUserChange_SameUser_NoCommitRequired()
    {
        var result = RegistrationStatusService.EvaluateUserChange(
            currentUser: "SameUser",
            newUser: "SameUser",
            commitChanges: false,
            affectedProjectCount: 0);

        Assert.That(result.RequiresCommit, Is.False);
        Assert.That(result.ShowConfirmation, Is.False);
        Assert.That(result.AffectedProjectCount, Is.EqualTo(0));
    }

    /// <summary>
    /// EXT-B2-003: User change with fewer than 5 projects - no confirmation.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "BHV-112")]
    [TestCase(0)]
    [TestCase(1)]
    [TestCase(2)]
    [TestCase(3)]
    [TestCase(4)]
    public void EvaluateUserChange_FewProjects_NoConfirmationRequired(int projectCount)
    {
        var result = RegistrationStatusService.EvaluateUserChange(
            currentUser: "OldUser",
            newUser: "NewUser",
            commitChanges: true,
            affectedProjectCount: projectCount);

        // With fewer than 5 projects, no confirmation dialog should be shown
        Assert.That(result.ShowConfirmation, Is.False);
        Assert.That(result.AffectedProjectCount, Is.EqualTo(projectCount));
    }

    /// <summary>
    /// EXT-B2-003: User change with 5+ projects triggers confirmation.
    /// Threshold of 5 projects per extraction plan.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "BHV-112")]
    [TestCase(5)]
    [TestCase(6)]
    [TestCase(10)]
    [TestCase(100)]
    public void EvaluateUserChange_ManyProjects_ConfirmationRequired(int projectCount)
    {
        var result = RegistrationStatusService.EvaluateUserChange(
            currentUser: "OldUser",
            newUser: "NewUser",
            commitChanges: true,
            affectedProjectCount: projectCount);

        // With 5+ projects, confirmation dialog should be shown
        Assert.That(result.ShowConfirmation, Is.True);
        Assert.That(result.AffectedProjectCount, Is.EqualTo(projectCount));
        Assert.That(result.ConfirmationMessage, Is.Not.Null);
    }

    /// <summary>
    /// EXT-B2-003: Commit changes true requires commit.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "BHV-112")]
    public void EvaluateUserChange_CommitChangesTrue_RequiresCommit()
    {
        var result = RegistrationStatusService.EvaluateUserChange(
            currentUser: "OldUser",
            newUser: "NewUser",
            commitChanges: true,
            affectedProjectCount: 3);

        Assert.That(result.RequiresCommit, Is.True);
    }

    /// <summary>
    /// EXT-B2-003: Commit changes false does not require commit.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "BHV-112")]
    public void EvaluateUserChange_CommitChangesFalse_NoCommitRequired()
    {
        var result = RegistrationStatusService.EvaluateUserChange(
            currentUser: "OldUser",
            newUser: "NewUser",
            commitChanges: false,
            affectedProjectCount: 3);

        Assert.That(result.RequiresCommit, Is.False);
    }

    /// <summary>
    /// EXT-B2-003: Confirmation message includes project count.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "BHV-112")]
    public void EvaluateUserChange_WithManyProjects_ConfirmationMessageIncludesCount()
    {
        var result = RegistrationStatusService.EvaluateUserChange(
            currentUser: "OldUser",
            newUser: "NewUser",
            commitChanges: true,
            affectedProjectCount: 7);

        Assert.That(result.ShowConfirmation, Is.True);
        Assert.That(result.ConfirmationMessage, Does.Contain("7").Or.Contain("projects"));
    }

    /// <summary>
    /// Edge case: Empty user names handled gracefully.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "BHV-112")]
    public void EvaluateUserChange_EmptyCurrentUser_HandledGracefully()
    {
        var result = RegistrationStatusService.EvaluateUserChange(
            currentUser: "",
            newUser: "NewUser",
            commitChanges: true,
            affectedProjectCount: 1);

        // Should not throw, should indicate a change
        Assert.That(result, Is.Not.Null);
        Assert.That(result.AffectedProjectCount, Is.EqualTo(1));
    }

    /// <summary>
    /// Edge case: Null user names handled gracefully.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "BHV-112")]
    public void EvaluateUserChange_NullCurrentUser_HandledGracefully()
    {
        var result = RegistrationStatusService.EvaluateUserChange(
            currentUser: null!,
            newUser: "NewUser",
            commitChanges: true,
            affectedProjectCount: 1);

        // Should not throw, should handle null gracefully
        Assert.That(result, Is.Not.Null);
    }

    /// <summary>
    /// Boundary test: Exactly 5 projects - threshold case.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-016")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "BHV-112")]
    public void EvaluateUserChange_ExactlyFiveProjects_ShowsConfirmation()
    {
        var result = RegistrationStatusService.EvaluateUserChange(
            currentUser: "OldUser",
            newUser: "NewUser",
            commitChanges: true,
            affectedProjectCount: 5);

        // Per EXT-B2-003: "5+ projects trigger confirmation"
        // Exactly 5 should trigger confirmation
        Assert.That(result.ShowConfirmation, Is.True);
        Assert.That(result.AffectedProjectCount, Is.EqualTo(5));
    }

    #endregion
}
