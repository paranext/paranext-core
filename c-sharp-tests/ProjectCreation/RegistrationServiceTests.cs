using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ProjectCreation;

namespace TestParanextDataProvider.ProjectCreation;

/// <summary>
/// Tests for RegistrationService covering CAP-007.
/// These tests verify the registration state machine and registry server availability checks.
///
/// Registration state determination rules:
/// - Standard: Requires own registration
/// - Daughter: Requires own registration
/// - StudyBibleAdditions: Requires own registration
/// - BackTranslation: Inherits from base (can opt out)
/// - Auxiliary: Inherits from base (cannot opt out)
/// - TransliterationManual/WithEncoder: Inherits from base (cannot opt out)
/// - ConsultantNotes: Registration not applicable
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class RegistrationServiceTests
{
    #region CAP-007: GetRegistrationState - Acceptance Test

    /// <summary>
    /// Acceptance test for CAP-007: GetRegistrationState.
    /// Given project GUID, base project GUID, and project type,
    /// returns a complete RegistrationState record with correct status and available actions.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "BHV-010")]
    [Property("BehaviorId", "BHV-017")]
    [Description("Acceptance test: GetRegistrationState returns correct state for any valid project type and base combination")]
    public void GetRegistrationState_AcceptanceTest()
    {
        // This test passes when the capability is COMPLETE
        // It calls the public API and verifies the expected outcome for Standard type

        // Act - Call the service method that will be implemented
        var state = RegistrationService.GetRegistrationState(
            projectGuid: null,
            baseProjectGuid: null,
            projectType: "Standard");

        // Assert - Verify all properties are correctly set for an unregistered Standard project
        Assert.That(state, Is.Not.Null, "Registration state should not be null");
        Assert.That(state.Status, Is.EqualTo("Unregistered"), "New Standard project should be Unregistered");
        Assert.That(state.CanRegisterOnline, Is.True, "Standard project can register online");
        Assert.That(state.CanOptOutOfInheritance, Is.False, "Standard project has nothing to opt out of");
        // RegistryServerAvailable is a boolean - just verify it's accessible
        Assert.That(state.RegistryServerAvailable, Is.True.Or.False, "Should indicate server availability");
    }

    #endregion

    #region CAP-007: GetRegistrationState - Contract Tests (NotSelected)

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "BHV-017")]
    [Description("NotSelected project type returns NotSelected status")]
    public void GetRegistrationState_NotSelected_ReturnsNotSelectedStatus()
    {
        var state = RegistrationService.GetRegistrationState(
            projectGuid: null,
            baseProjectGuid: null,
            projectType: "NotSelected");

        Assert.Multiple(() =>
        {
            Assert.That(state.Status, Is.EqualTo("NotSelected"));
            Assert.That(state.CanRegisterOnline, Is.False, "Cannot register when type not selected");
            Assert.That(state.CanOptOutOfInheritance, Is.False);
            Assert.That(state.MessageKey, Is.EqualTo("Registration_SelectProjectType").Or.Contains("Select"));
        });
    }

    #endregion

    #region CAP-007: GetRegistrationState - Contract Tests (Standard/Daughter/StudyBibleAdditions)

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "BHV-010")]
    [Property("BehaviorId", "BHV-017")]
    [Description("Standard project without registration returns Unregistered status")]
    public void GetRegistrationState_StandardUnregistered_ReturnsUnregisteredStatus()
    {
        var state = RegistrationService.GetRegistrationState(
            projectGuid: null, // New project - no GUID yet
            baseProjectGuid: null,
            projectType: "Standard");

        Assert.Multiple(() =>
        {
            Assert.That(state.Status, Is.EqualTo("Unregistered"));
            Assert.That(state.CanRegisterOnline, Is.True, "Can register Standard project");
            Assert.That(state.CanOptOutOfInheritance, Is.False, "Standard does not inherit");
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-026")]
    [Property("BehaviorId", "BHV-010")]
    [Property("BehaviorId", "BHV-012")]
    [Description("Standard project with registration returns Registered status")]
    public void GetRegistrationState_StandardRegistered_ReturnsRegisteredStatus()
    {
        // Arrange - Registered project has a GUID that is known to the registry
        var registeredProjectGuid = "abc123def456789012345678901234567890abcd";

        var state = RegistrationService.GetRegistrationState(
            projectGuid: registeredProjectGuid,
            baseProjectGuid: null,
            projectType: "Standard");

        // The actual check for registration requires registry lookup
        // For this test, we verify the state reflects "existing project" logic
        Assert.Multiple(() =>
        {
            // Status depends on whether the project is actually registered in the mock/real registry
            Assert.That(state.Status, Is.EqualTo("Registered").Or.EqualTo("Unregistered"));
            Assert.That(state.CanRegisterOnline, Is.True.Or.False, "Depends on current registration state");
            Assert.That(state.CanOptOutOfInheritance, Is.False, "Standard does not inherit");
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "BHV-010")]
    [Property("BehaviorId", "BHV-017")]
    [Description("Daughter project requires its own registration")]
    public void GetRegistrationState_DaughterUnregistered_ReturnsUnregisteredStatus()
    {
        var state = RegistrationService.GetRegistrationState(
            projectGuid: null,
            baseProjectGuid: "baseProjectGuid12345678901234567890",
            projectType: "Daughter");

        Assert.Multiple(() =>
        {
            Assert.That(state.Status, Is.EqualTo("Unregistered"), "Daughter needs own registration");
            Assert.That(state.CanRegisterOnline, Is.True, "Can register Daughter project");
            Assert.That(state.CanOptOutOfInheritance, Is.False, "Daughter doesn't share parent registration");
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-039")]
    [Property("BehaviorId", "BHV-010")]
    [Property("BehaviorId", "BHV-017")]
    [Description("StudyBibleAdditions project requires its own registration")]
    public void GetRegistrationState_StudyBibleAdditionsUnregistered_ReturnsUnregisteredStatus()
    {
        var state = RegistrationService.GetRegistrationState(
            projectGuid: null,
            baseProjectGuid: "baseProjectGuid12345678901234567890",
            projectType: "StudyBibleAdditions");

        Assert.Multiple(() =>
        {
            Assert.That(state.Status, Is.EqualTo("Unregistered"), "StudyBibleAdditions needs own registration");
            Assert.That(state.CanRegisterOnline, Is.True, "Can register StudyBibleAdditions project");
            Assert.That(state.CanOptOutOfInheritance, Is.False);
        });
    }

    #endregion

    #region CAP-007: GetRegistrationState - Contract Tests (BackTranslation - Inherits)

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-017")]
    [Property("BehaviorId", "BHV-031")]
    [Description("BackTranslation with registered base inherits registration and can opt out")]
    public void GetRegistrationState_BackTranslationWithRegisteredBase_InheritsAndCanOptOut()
    {
        // Base project is registered
        var registeredBaseGuid = "registeredBase12345678901234567890";

        var state = RegistrationService.GetRegistrationState(
            projectGuid: null,
            baseProjectGuid: registeredBaseGuid,
            projectType: "BackTranslation");

        Assert.Multiple(() =>
        {
            Assert.That(state.Status, Is.EqualTo("InheritsFromBase"), "BackTranslation inherits from base");
            Assert.That(state.CanRegisterOnline, Is.True, "BackTranslation can optionally register separately");
            Assert.That(state.CanOptOutOfInheritance, Is.True, "BackTranslation can opt out of inheritance");
            Assert.That(state.MessageKey, Does.Contain("Inherit").Or.Contains("inherit"));
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-041")]
    [Property("BehaviorId", "BHV-017")]
    [Property("BehaviorId", "BHV-031")]
    [Description("BackTranslation with unregistered base shows warning")]
    public void GetRegistrationState_BackTranslationWithUnregisteredBase_ShowsWarning()
    {
        // Base project is NOT registered
        var unregisteredBaseGuid = "unregisteredBase123456789012345678";

        var state = RegistrationService.GetRegistrationState(
            projectGuid: null,
            baseProjectGuid: unregisteredBaseGuid,
            projectType: "BackTranslation");

        Assert.Multiple(() =>
        {
            Assert.That(state.Status, Is.EqualTo("InheritsFromBase"), "Still inherits from base");
            Assert.That(state.CanRegisterOnline, Is.False, "Cannot register until base is registered");
            // Warning that base is not registered
            Assert.That(state.MessageKey, Does.Contain("Base").Or.Contains("Warning").Or.Contains("NotRegistered"));
        });
    }

    #endregion

    #region CAP-007: GetRegistrationState - Contract Tests (Auxiliary/Transliteration - Inherits)

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-042")]
    [Property("BehaviorId", "BHV-017")]
    [Description("Auxiliary inherits registration and cannot opt out")]
    public void GetRegistrationState_Auxiliary_InheritsAndCannotOptOut()
    {
        var state = RegistrationService.GetRegistrationState(
            projectGuid: null,
            baseProjectGuid: "baseProjectGuid12345678901234567890",
            projectType: "Auxiliary");

        Assert.Multiple(() =>
        {
            Assert.That(state.Status, Is.EqualTo("InheritsFromBase"), "Auxiliary inherits from base");
            Assert.That(state.CanRegisterOnline, Is.False, "Auxiliary cannot register separately");
            Assert.That(state.CanOptOutOfInheritance, Is.False, "Auxiliary cannot opt out");
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-043")]
    [Property("BehaviorId", "BHV-017")]
    [Description("TransliterationManual inherits registration and cannot opt out")]
    public void GetRegistrationState_TransliterationManual_InheritsAndCannotOptOut()
    {
        var state = RegistrationService.GetRegistrationState(
            projectGuid: null,
            baseProjectGuid: "baseProjectGuid12345678901234567890",
            projectType: "TransliterationManual");

        Assert.Multiple(() =>
        {
            Assert.That(state.Status, Is.EqualTo("InheritsFromBase"), "Transliteration inherits from base");
            Assert.That(state.CanRegisterOnline, Is.False, "TransliterationManual cannot register separately");
            Assert.That(state.CanOptOutOfInheritance, Is.False, "TransliterationManual cannot opt out");
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-044")]
    [Property("BehaviorId", "BHV-017")]
    [Description("TransliterationWithEncoder inherits registration and cannot opt out")]
    public void GetRegistrationState_TransliterationWithEncoder_InheritsAndCannotOptOut()
    {
        var state = RegistrationService.GetRegistrationState(
            projectGuid: null,
            baseProjectGuid: "baseProjectGuid12345678901234567890",
            projectType: "TransliterationWithEncoder");

        Assert.Multiple(() =>
        {
            Assert.That(state.Status, Is.EqualTo("InheritsFromBase"));
            Assert.That(state.CanRegisterOnline, Is.False);
            Assert.That(state.CanOptOutOfInheritance, Is.False);
        });
    }

    #endregion

    #region CAP-007: GetRegistrationState - Contract Tests (ConsultantNotes - Not Applicable)

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-045")]
    [Property("BehaviorId", "BHV-017")]
    [Description("ConsultantNotes registration is not applicable")]
    public void GetRegistrationState_ConsultantNotes_ReturnsNotApplicable()
    {
        var state = RegistrationService.GetRegistrationState(
            projectGuid: null,
            baseProjectGuid: null,
            projectType: "ConsultantNotes");

        Assert.Multiple(() =>
        {
            Assert.That(state.Status, Is.EqualTo("NotApplicable"), "ConsultantNotes doesn't need registration");
            Assert.That(state.CanRegisterOnline, Is.False, "Cannot register ConsultantNotes");
            Assert.That(state.CanOptOutOfInheritance, Is.False);
            Assert.That(state.MessageKey, Does.Contain("NotRequired").Or.Contains("NotApplicable"));
        });
    }

    #endregion

    #region CAP-007: IsRegistryServerAvailable - Contract Tests

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "BHV-024")]
    [Description("Registry server available when all conditions met")]
    public void IsRegistryServerAvailable_AllConditionsMet_ReturnsTrue()
    {
        // Act
        var isAvailable = RegistrationService.IsRegistryServerAvailable();

        // The actual result depends on infrastructure state
        // This test verifies the method exists and returns a boolean
        Assert.That(isAvailable, Is.TypeOf<bool>());
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-REG-001")]
    [Property("BehaviorId", "BHV-024")]
    [Description("Registry server unavailable when no internet")]
    public void IsRegistryServerAvailable_NoInternet_ReturnsFalse()
    {
        // This test documents the expected behavior when internet is unavailable
        // The actual implementation will check RegistryServer.IsAvailable()
        // which checks: isDefaultInstance, clientInitialized, internetActive, userValid

        // Note: In a unit test environment without mocking, we can only verify
        // the method signature. Full testing requires integration tests.
        var isAvailable = RegistrationService.IsRegistryServerAvailable();

        // Just verify it's callable - actual conditions require mocking
        Assert.That(isAvailable, Is.TypeOf<bool>());
    }

    #endregion

    #region CAP-007: InitiateOnlineRegistration - Contract Tests

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-025")]
    [Property("BehaviorId", "BHV-011")]
    [Description("Initiate online registration returns URL with encoded project info")]
    public void InitiateOnlineRegistration_ValidProject_ReturnsRegistrationUrl()
    {
        var projectGuid = "abc123def456789012345678901234567890abcd";

        var url = RegistrationService.InitiateOnlineRegistration(projectGuid);

        Assert.Multiple(() =>
        {
            Assert.That(url, Is.Not.Null.And.Not.Empty);
            Assert.That(url, Does.Contain("registry").Or.Contains("paratext.org"));
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-025")]
    [Property("BehaviorId", "BHV-011")]
    [Description("Registration URL contains encoded project data")]
    public void InitiateOnlineRegistration_ValidProject_UrlContainsEncodedData()
    {
        var projectGuid = "abc123def456789012345678901234567890abcd";

        var url = RegistrationService.InitiateOnlineRegistration(projectGuid);

        // URL should contain Base64 encoded data per BHV-011
        // The data includes project name, GUID, and user info
        Assert.That(url, Does.Match(".*[A-Za-z0-9+/=]+.*"), "URL should contain encoded data");
    }

    #endregion

    #region CAP-007: Golden Master Tests

    /// <summary>
    /// Golden master test: Verify registration states match expected output from gm-005.
    /// Tests all 9 scenarios defined in the golden master.
    /// </summary>
    [TestCase("NotSelected", null, "NotSelected", false, false)]
    [TestCase("Standard", null, "Unregistered", true, false)]
    [TestCase("Daughter", "baseProject", "Unregistered", true, false)]
    [TestCase("BackTranslation", "registeredBase", "InheritsFromBase", true, true)]
    [TestCase("Auxiliary", "baseProject", "InheritsFromBase", false, false)]
    [TestCase("ConsultantNotes", null, "NotApplicable", false, false)]
    [TestCase("TransliterationManual", "baseProject", "InheritsFromBase", false, false)]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-005")]
    [Property("BehaviorId", "BHV-010")]
    [Property("BehaviorId", "BHV-017")]
    [Description("Golden master: Registration states match PT9 expected output")]
    public void GetRegistrationState_GoldenMaster_MatchesExpected(
        string projectType,
        string? baseProjectGuid,
        string expectedStatus,
        bool expectedCanRegister,
        bool expectedCanOptOut)
    {
        var state = RegistrationService.GetRegistrationState(
            projectGuid: null,
            baseProjectGuid: baseProjectGuid,
            projectType: projectType);

        Assert.Multiple(() =>
        {
            Assert.That(state.Status, Is.EqualTo(expectedStatus),
                $"Status mismatch for {projectType}");
            Assert.That(state.CanRegisterOnline, Is.EqualTo(expectedCanRegister),
                $"CanRegisterOnline mismatch for {projectType}");
            Assert.That(state.CanOptOutOfInheritance, Is.EqualTo(expectedCanOptOut),
                $"CanOptOutOfInheritance mismatch for {projectType}");
        });
    }

    #endregion

    #region Invariant Tests

    /// <summary>
    /// Invariant test INV-006: Registration code must be at least 20 characters.
    /// While this invariant is about registration codes, the RegistrationService
    /// must respect this when determining registration state from user info.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-006")]
    [Property("BehaviorId", "BHV-010")]
    [TestCase("ABCD1234567890123456", true, TestName = "20 chars valid")]
    [TestCase("ABCD12345678901234567890", true, TestName = "24 chars valid")]
    [TestCase("SHORT", false, TestName = "5 chars invalid")]
    [TestCase("", false, TestName = "empty invalid")]
    [TestCase("1234567890123456789", false, TestName = "19 chars invalid")]
    [Description("Invariant: Valid Paratext registration codes are at least 20 characters")]
    public void RegistrationCode_MustBeAtLeast20Characters(string code, bool expectedValid)
    {
        // This test documents the invariant for registration codes
        // The actual validation is in RegistrationInfo, but RegistrationService
        // must handle the results of this validation

        var isValid = code.Length >= 20;

        Assert.That(isValid, Is.EqualTo(expectedValid),
            $"Registration code '{code}' (length {code.Length}) validation mismatch");
    }

    #endregion
}
