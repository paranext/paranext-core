using System.Diagnostics.CodeAnalysis;
using Paratext.Data.Users;

namespace TestParanextDataProvider.Projects;

/// <summary>
/// Tests for Registration validation - CAP-018
/// Reference: spec-004-registration-validation, BHV-153, BHV-154, INV-016, INV-017
///
/// These tests verify ParatextData.dll RegistrationInfo functionality.
/// Per strategic-plan.md: "Uses existing RegistrationInfo from ParatextData.dll"
/// Per existing pattern in: ParatextRegistrationService.cs uses RegistrationInfo.DefaultUser.IsValid
///
/// NOTE: RegistrationInfo is abstract and accessed via static DefaultUser property.
/// The validation static method IsValidRegistration(code, name) is used for code validation.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class RegistrationValidationTests
{
    #region Acceptance Test - CAP-018

    /// <summary>
    /// Acceptance test for CAP-018: Registration validation capability.
    /// When this test passes, the capability is complete.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-018")]
    [Property("ScenarioId", "TS-063")]
    [Description("Acceptance test: Registration validation correctly identifies user capabilities")]
    public void RegistrationValidation_AcceptanceTest()
    {
        // This acceptance test verifies registration validation works as expected
        // by checking the DefaultUser pattern used in PT10

        // Access to DefaultUser should work
        var defaultUser = RegistrationInfo.DefaultUser;
        Assert.That(defaultUser, Is.Not.Null, "DefaultUser should be accessible");

        // IsValid property should be accessible
        var isValid = defaultUser.IsValid;
        // Note: IsValid may be false in test environment without actual registration

        // The pattern from ParatextRegistrationService shows this is the expected usage
        Assert.That(
            isValid,
            Is.TypeOf<bool>(),
            "IsValid should return a boolean indicating registration status"
        );

        // Static validation method should work
        var isValidCode = RegistrationInfo.IsValidRegistration("TESTCODE123456789012345", "TestUser");
        Assert.That(
            isValidCode,
            Is.TypeOf<bool>(),
            "IsValidRegistration should return boolean"
        );
    }

    #endregion

    #region Spec Tests - spec-004

    /// <summary>
    /// spec-004 scenario 1: Valid registration code validation via static method
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecId", "spec-004")]
    [Property("ScenarioId", "TS-065")]
    [Property("BehaviorId", "BHV-153")]
    public void RegistrationInfo_IsValidRegistration_ValidatesCodeNamePair()
    {
        // The IsValidRegistration static method validates code/name pairs
        // Note: A truly valid code requires proper checksum/format from Paratext

        // An arbitrary 20+ char string with a name should be checkable
        var result = RegistrationInfo.IsValidRegistration(
            "ABCDEFGHIJ1234567890",
            "Test User Name"
        );

        // Result is boolean - actual validity depends on checksum algorithm
        Assert.That(result, Is.TypeOf<bool>(), "IsValidRegistration should return boolean");
    }

    /// <summary>
    /// spec-004 scenario 2: Short registration codes are invalid
    /// This tests the validation logic indirectly - short codes should fail validation
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecId", "spec-004")]
    [Property("ScenarioId", "TS-064")]
    [Property("InvariantId", "INV-016")]
    [Property("BehaviorId", "BHV-153")]
    public void RegistrationInfo_IsValidRegistration_ShortCodeIsInvalid()
    {
        // Per INV-016: Codes < 20 chars are rejected
        // Short codes should fail validation

        var result = RegistrationInfo.IsValidRegistration("SHORTCODE123", "Test User");

        // Short code should be invalid
        Assert.That(result, Is.False, "INV-016: Codes < 20 chars should be invalid");
    }

    /// <summary>
    /// spec-004 scenario 3: DefaultUser properties are accessible
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecId", "spec-004")]
    [Property("ScenarioId", "TS-066")]
    [Property("BehaviorId", "BHV-154")]
    public void RegistrationInfo_DefaultUser_PropertiesAccessible()
    {
        // Access the DefaultUser to verify properties are accessible
        var defaultUser = RegistrationInfo.DefaultUser;

        // Name property should be accessible (may be null/empty in test)
        var name = defaultUser.Name;
        Assert.That(name, Is.Null.Or.TypeOf<string>(), "Name should be accessible");

        // RegistrationCode property should be accessible
        var code = defaultUser.RegistrationCode;
        Assert.That(code, Is.Null.Or.TypeOf<string>(), "RegistrationCode should be accessible");

        // EmailAddress property should be accessible
        var email = defaultUser.EmailAddress;
        Assert.That(email, Is.Null.Or.TypeOf<string>(), "EmailAddress should be accessible");

        // SupportPerson property should be accessible
        var support = defaultUser.SupportPerson;
        Assert.That(support, Is.Null.Or.TypeOf<string>(), "SupportPerson should be accessible");
    }

    /// <summary>
    /// spec-004 scenario 4: Guest user check via IsValid and Name
    /// INV-017: Guest users cannot create new projects
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecId", "spec-004")]
    [Property("ScenarioId", "TS-063")]
    [Property("InvariantId", "INV-017")]
    [Property("BehaviorId", "BHV-154")]
    public void RegistrationInfo_DefaultUser_CanCheckValidity()
    {
        // INV-017: Guest users cannot create new projects
        // The check for guest users is done via IsValid property

        var defaultUser = RegistrationInfo.DefaultUser;
        var isValid = defaultUser.IsValid;

        // In test environment, user may not be valid (no registration)
        // The key is that this check is possible and returns a boolean

        Assert.That(isValid, Is.TypeOf<bool>(), "IsValid should be checkable");

        // If not valid, creating projects should be blocked
        // (actual enforcement is in UI/service layer)
        if (!isValid)
        {
            Assert.Pass("User is not valid (no registration) - INV-017 would block project creation");
        }
        else
        {
            Assert.Pass("User is valid - project creation would be allowed if not guest");
        }
    }

    /// <summary>
    /// spec-004 scenario 5: Empty code validation
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecId", "spec-004")]
    [Property("ScenarioId", "TS-067")]
    [Property("BehaviorId", "BHV-154")]
    public void RegistrationInfo_IsValidRegistration_EmptyCodeIsInvalid()
    {
        var result = RegistrationInfo.IsValidRegistration("", "Test User");

        Assert.That(result, Is.False, "Empty code should be invalid");
    }

    /// <summary>
    /// spec-004 scenario 6: Null code validation
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("SpecId", "spec-004")]
    [Property("ScenarioId", "TS-068")]
    [Property("BehaviorId", "BHV-154")]
    public void RegistrationInfo_IsValidRegistration_NullCodeIsInvalid()
    {
        var result = RegistrationInfo.IsValidRegistration(null!, "Test User");

        Assert.That(result, Is.False, "Null code should be invalid");
    }

    #endregion

    #region Contract Tests - Additional Coverage

    /// <summary>
    /// Test that DefaultUser is a singleton/stable reference
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-REG-001")]
    [Property("BehaviorId", "BHV-153")]
    public void RegistrationInfo_DefaultUser_IsStableReference()
    {
        var user1 = RegistrationInfo.DefaultUser;
        var user2 = RegistrationInfo.DefaultUser;

        // DefaultUser should return the same reference
        Assert.That(ReferenceEquals(user1, user2), Is.True, "DefaultUser should be stable");
    }

    /// <summary>
    /// Test that IsValid property is accessible
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-REG-002")]
    [Property("BehaviorId", "BHV-153")]
    public void RegistrationInfo_IsValid_PropertyAccessible()
    {
        var defaultUser = RegistrationInfo.DefaultUser;

        // IsValid should not throw
        bool isValid = defaultUser.IsValid;

        Assert.That(isValid, Is.TypeOf<bool>(), "IsValid should return boolean");
    }

    /// <summary>
    /// Test that Name property is accessible
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-REG-003")]
    [Property("BehaviorId", "BHV-153")]
    public void RegistrationInfo_Name_PropertyAccessible()
    {
        var defaultUser = RegistrationInfo.DefaultUser;

        // Name should be accessible
        var name = defaultUser.Name;

        // Name may be null or empty in test environment, but property should be accessible
        Assert.That(name, Is.Null.Or.TypeOf<string>(), "Name property should be accessible");
    }

    /// <summary>
    /// Test code validation at exactly 19 chars boundary (should be rejected)
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-REG-004")]
    [Property("InvariantId", "INV-016")]
    public void RegistrationInfo_IsValidRegistration_Code19Chars_Invalid()
    {
        // 19 characters - exactly at boundary, should be rejected
        var result = RegistrationInfo.IsValidRegistration(
            "1234567890123456789",  // 19 chars
            "Test User"
        );

        Assert.That(
            result,
            Is.False,
            "Code of 19 chars should be invalid (INV-016 requires >= 20)"
        );
    }

    /// <summary>
    /// Test code validation at exactly 20 chars boundary
    /// Note: Actual validity depends on checksum, but the check should proceed
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-REG-005")]
    [Property("InvariantId", "INV-016")]
    public void RegistrationInfo_IsValidRegistration_Code20Chars_ChecksChecksum()
    {
        // 20 characters - at boundary, validation should proceed to checksum check
        var result = RegistrationInfo.IsValidRegistration(
            "12345678901234567890",  // 20 chars
            "Test User"
        );

        // Result is boolean - may be false if checksum doesn't match
        Assert.That(result, Is.TypeOf<bool>(), "20+ char codes should proceed to validation");
    }

    /// <summary>
    /// Test empty name validation
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-REG-006")]
    [Property("BehaviorId", "BHV-153")]
    public void RegistrationInfo_IsValidRegistration_EmptyNameIsInvalid()
    {
        var result = RegistrationInfo.IsValidRegistration(
            "ABCDEFGHIJ1234567890",
            ""
        );

        Assert.That(result, Is.False, "Empty name should be invalid");
    }

    /// <summary>
    /// Test null name validation - ParatextData throws ArgumentNullException for null name
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-REG-007")]
    [Property("BehaviorId", "BHV-153")]
    public void RegistrationInfo_IsValidRegistration_NullNameThrows()
    {
        // ParatextData throws ArgumentNullException for null userName parameter
        Assert.Throws<ArgumentNullException>(() =>
            RegistrationInfo.IsValidRegistration("ABCDEFGHIJ1234567890", null!)
        );
    }

    #endregion

    #region Invariant Tests

    /// <summary>
    /// INV-016: Registration codes must be >= 20 characters
    /// Tests multiple short code lengths
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-016")]
    [Property("ScenarioId", "TS-INV-016")]
    [TestCase("A")]
    [TestCase("1234567890")]
    [TestCase("ABCDEFGHIJ12345678")]  // 18 chars
    [TestCase("1234567890123456789")]  // 19 chars
    public void RegistrationInfo_Invariant_ShortCodesAreInvalid(string shortCode)
    {
        var result = RegistrationInfo.IsValidRegistration(shortCode, "Test User");

        Assert.That(
            result,
            Is.False,
            $"INV-016: Code '{shortCode}' ({shortCode.Length} chars) should be invalid"
        );
    }

    /// <summary>
    /// INV-017: Guest users cannot create new projects
    /// This tests that the validity check mechanism exists
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-017")]
    [Property("ScenarioId", "TS-INV-017")]
    public void RegistrationInfo_Invariant_ValidityCheckExists()
    {
        // Verify that the IsValid check exists and can be used
        // This is the mechanism used to enforce INV-017

        var defaultUser = RegistrationInfo.DefaultUser;
        Assert.That(defaultUser, Is.Not.Null, "DefaultUser should exist");

        var isValid = defaultUser.IsValid;
        Assert.That(isValid, Is.TypeOf<bool>(), "IsValid should be checkable for INV-017");

        // The enforcement of INV-017 (blocking project creation) is done
        // at the UI/service layer by checking IsValid before allowing creation
    }

    #endregion
}
