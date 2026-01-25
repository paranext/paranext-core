using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.CreatingProjects;

namespace TestParanextDataProvider.CreatingProjects;

/// <summary>
/// Tests for RegistrationService.GetRegistrationState implementing CAP-EXT-005 (RegistrationStateMachine).
///
/// These tests verify that the registration state machine correctly determines
/// registration status and available actions based on project type and base project.
/// </summary>
/// <remarks>
/// Golden master: gm-005-registration-state
///
/// State determination rules:
/// - NotSelected: Type not selected yet
/// - Standard/Daughter/StudyBibleAdditions: Own registration required
/// - BackTranslation: Inherits from base (optional override)
/// - Auxiliary/Transliteration: Inherits from base (no override)
/// - ConsultantNotes: Not applicable
/// </remarks>
[TestFixture]
[ExcludeFromCodeCoverage]
[Category("Extraction")]
internal class RegistrationServiceTests
{
    #region CAP-EXT-005: NotSelected State

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-005")]
    [Property("GoldenMaster", "gm-005")]
    [Property("BehaviorId", "BHV-010")]
    [Property("ScenarioId", "TS-REG-001")]
    [Description("NotSelected project type returns NotSelected status")]
    public void GetRegistrationState_NotSelected_ReturnsNotSelectedStatus()
    {
        // Arrange
        var projectType = ProjectCreationType.NotSelected;

        // Act
        var state = RegistrationService.GetRegistrationState(projectType);

        // Assert
        Assert.That(state.Status, Is.EqualTo(RegistrationStatus.NotSelected));
        Assert.That(state.CanRegisterOnline, Is.False);
        Assert.That(state.MessageKey, Is.EqualTo("Select project type"));
    }

    #endregion

    #region CAP-EXT-005: Standard Project Registration

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-005")]
    [Property("GoldenMaster", "gm-005")]
    [Property("BehaviorId", "BHV-011")]
    [Property("ScenarioId", "TS-REG-002")]
    [Description("Standard project (unregistered) returns Unregistered with can register")]
    public void GetRegistrationState_StandardUnregistered_CanRegisterOnline()
    {
        // Arrange
        var projectType = ProjectCreationType.Standard;

        // Act
        var state = RegistrationService.GetRegistrationState(projectType);

        // Assert
        Assert.That(state.Status, Is.EqualTo(RegistrationStatus.Unregistered));
        Assert.That(state.CanRegisterOnline, Is.True);
        Assert.That(state.MessageKey, Is.EqualTo("Not registered"));
    }

    #endregion

    #region CAP-EXT-005: Daughter Project Registration

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-005")]
    [Property("GoldenMaster", "gm-005")]
    [Property("BehaviorId", "BHV-011")]
    [Property("ScenarioId", "TS-REG-003")]
    [Description("Daughter project requires its own registration")]
    public void GetRegistrationState_Daughter_RequiresOwnRegistration()
    {
        // Arrange
        var projectType = ProjectCreationType.Daughter;
        var baseProjectGuid = "some-guid";

        // Act
        var state = RegistrationService.GetRegistrationState(
            projectType,
            baseProjectGuid,
            isBaseProjectRegistered: true
        );

        // Assert
        Assert.That(state.Status, Is.EqualTo(RegistrationStatus.Unregistered));
        Assert.That(state.CanRegisterOnline, Is.True);
        Assert.That(state.MessageKey, Is.EqualTo("Requires registration"));
    }

    #endregion

    #region CAP-EXT-005: BackTranslation Project Registration (Inherits)

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-005")]
    [Property("GoldenMaster", "gm-005")]
    [Property("BehaviorId", "BHV-012")]
    [Property("ScenarioId", "TS-REG-004")]
    [Description("BackTranslation with registered base inherits registration")]
    public void GetRegistrationState_BackTranslationRegisteredBase_InheritsFromBase()
    {
        // Arrange
        var projectType = ProjectCreationType.BackTranslation;
        var baseProjectGuid = "registered-base-guid";

        // Act
        var state = RegistrationService.GetRegistrationState(
            projectType,
            baseProjectGuid,
            isBaseProjectRegistered: true
        );

        // Assert
        Assert.That(state.Status, Is.EqualTo(RegistrationStatus.InheritsFromBase));
        Assert.That(state.CanRegisterOnline, Is.True); // Can opt out
        Assert.That(state.CanOptOutOfInheritance, Is.True);
        Assert.That(state.MessageKey, Is.EqualTo("Inherits from base"));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-005")]
    [Property("GoldenMaster", "gm-005")]
    [Property("BehaviorId", "BHV-012")]
    [Property("ScenarioId", "TS-REG-005")]
    [Description("BackTranslation with unregistered base shows warning")]
    public void GetRegistrationState_BackTranslationUnregisteredBase_ShowsWarning()
    {
        // Arrange
        var projectType = ProjectCreationType.BackTranslation;
        var baseProjectGuid = "unregistered-base-guid";

        // Act
        var state = RegistrationService.GetRegistrationState(
            projectType,
            baseProjectGuid,
            isBaseProjectRegistered: false
        );

        // Assert
        Assert.That(state.Status, Is.EqualTo(RegistrationStatus.InheritsFromBase));
        Assert.That(state.CanRegisterOnline, Is.False); // Can't register without base
        Assert.That(state.Warning, Is.EqualTo("Base not registered"));
    }

    #endregion

    #region CAP-EXT-005: Auxiliary Project Registration (Inherits, No Override)

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-005")]
    [Property("GoldenMaster", "gm-005")]
    [Property("BehaviorId", "BHV-012")]
    [Property("ScenarioId", "TS-REG-006")]
    [Description("Auxiliary inherits from base without option to opt out")]
    public void GetRegistrationState_Auxiliary_InheritsNoOptOut()
    {
        // Arrange
        var projectType = ProjectCreationType.Auxiliary;
        var baseProjectGuid = "standard-base-guid";

        // Act
        var state = RegistrationService.GetRegistrationState(
            projectType,
            baseProjectGuid,
            isBaseProjectRegistered: true
        );

        // Assert
        Assert.That(state.Status, Is.EqualTo(RegistrationStatus.InheritsFromBase));
        Assert.That(state.CanRegisterOnline, Is.False);
        Assert.That(state.CanOptOutOfInheritance, Is.False);
        Assert.That(state.MessageKey, Is.EqualTo("Inherits from base"));
    }

    #endregion

    #region CAP-EXT-005: ConsultantNotes Project Registration (Not Applicable)

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-005")]
    [Property("GoldenMaster", "gm-005")]
    [Property("BehaviorId", "BHV-010")]
    [Property("ScenarioId", "TS-REG-007")]
    [Description("ConsultantNotes does not require registration")]
    public void GetRegistrationState_ConsultantNotes_NotApplicable()
    {
        // Arrange
        var projectType = ProjectCreationType.ConsultantNotes;

        // Act
        var state = RegistrationService.GetRegistrationState(projectType);

        // Assert
        Assert.That(state.Status, Is.EqualTo(RegistrationStatus.NotApplicable));
        Assert.That(state.CanRegisterOnline, Is.False);
        Assert.That(state.MessageKey, Is.EqualTo("Not registered (not required)"));
    }

    #endregion

    #region CAP-EXT-005: Transliteration Project Registration (Inherits, No Override)

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-005")]
    [Property("GoldenMaster", "gm-005")]
    [Property("BehaviorId", "BHV-012")]
    [Property("ScenarioId", "TS-REG-008")]
    [Description("TransliterationManual inherits from base without option to opt out")]
    public void GetRegistrationState_TransliterationManual_InheritsNoOptOut()
    {
        // Arrange
        var projectType = ProjectCreationType.TransliterationManual;
        var baseProjectGuid = "scripture-base-guid";

        // Act
        var state = RegistrationService.GetRegistrationState(
            projectType,
            baseProjectGuid,
            isBaseProjectRegistered: true
        );

        // Assert
        Assert.That(state.Status, Is.EqualTo(RegistrationStatus.InheritsFromBase));
        Assert.That(state.CanRegisterOnline, Is.False);
        Assert.That(state.CanOptOutOfInheritance, Is.False);
        Assert.That(state.MessageKey, Is.EqualTo("Inherits from base"));
    }

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-005")]
    [Property("GoldenMaster", "gm-005")]
    [Property("BehaviorId", "BHV-012")]
    [Property("ScenarioId", "TS-REG-009")]
    [Description("TransliterationWithEncoder inherits from base without option to opt out")]
    public void GetRegistrationState_TransliterationWithEncoder_InheritsNoOptOut()
    {
        // Arrange
        var projectType = ProjectCreationType.TransliterationWithEncoder;
        var baseProjectGuid = "scripture-base-guid";

        // Act
        var state = RegistrationService.GetRegistrationState(
            projectType,
            baseProjectGuid,
            isBaseProjectRegistered: true
        );

        // Assert
        Assert.That(state.Status, Is.EqualTo(RegistrationStatus.InheritsFromBase));
        Assert.That(state.CanRegisterOnline, Is.False);
        Assert.That(state.CanOptOutOfInheritance, Is.False);
    }

    #endregion

    #region CAP-EXT-005: StudyBibleAdditions Project Registration

    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-EXT-005")]
    [Property("GoldenMaster", "gm-005")]
    [Property("BehaviorId", "BHV-011")]
    [Property("ScenarioId", "TS-REG-010")]
    [Description("StudyBibleAdditions requires its own registration")]
    public void GetRegistrationState_StudyBibleAdditions_RequiresOwnRegistration()
    {
        // Arrange
        var projectType = ProjectCreationType.StudyBibleAdditions;
        var baseProjectGuid = "scripture-base-guid";

        // Act
        var state = RegistrationService.GetRegistrationState(
            projectType,
            baseProjectGuid,
            isBaseProjectRegistered: true
        );

        // Assert
        Assert.That(state.Status, Is.EqualTo(RegistrationStatus.Unregistered));
        Assert.That(state.CanRegisterOnline, Is.True);
    }

    #endregion
}
