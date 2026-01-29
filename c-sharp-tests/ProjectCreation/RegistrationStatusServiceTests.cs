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
}
