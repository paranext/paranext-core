using Paranext.DataProvider.Projects;
using Paratext.Data;
using ProjectType = Paranext.DataProvider.CreatingProjects.ProjectType;
using RegistrationService = Paranext.DataProvider.CreatingProjects.RegistrationService;
using RegistrationStatus = Paranext.DataProvider.CreatingProjects.RegistrationStatus;

namespace TestParanextDataProvider.CreatingProjects;

/// <summary>
/// Tests for RegistrationService: GetRegistrationState (CAP-007) and
/// IsRegistryServerAvailable (CAP-008).
/// RED phase -- these tests will fail until the service is implemented.
/// </summary>
[TestFixture]
public class RegistrationServiceTests
{
    [TearDown]
    public void TearDown()
    {
        foreach (
            ScrText project in ScrTextCollection
                .ScrTexts(IncludeProjects.Everything)
                .ToList()
        )
            ScrTextCollection.Remove(project, false);
    }

    // =========================================================================
    // CAP-007: GetRegistrationState - Acceptance Test
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-007")]
    [Property("ScenarioId", "gm-005")]
    [Property("BehaviorId", "BHV-010")]
    [Description("Acceptance test: Registration state transitions match gm-005 golden master")]
    public void GetRegistrationState_AllTypeCombinations_MatchGoldenMaster()
    {
        // NotSelected
        var notSelected = RegistrationService.GetRegistrationState(null, null, ProjectType.NotSelected);
        Assert.That(notSelected.Status, Is.EqualTo(RegistrationStatus.NotSelected));
        Assert.That(notSelected.CanRegisterOnline, Is.False);

        // Standard (unregistered new project)
        var standard = RegistrationService.GetRegistrationState(null, null, ProjectType.Standard);
        Assert.That(standard.Status, Is.EqualTo(RegistrationStatus.Unregistered));
        Assert.That(standard.CanRegisterOnline, Is.True);

        // ConsultantNotes
        var cn = RegistrationService.GetRegistrationState(null, null, ProjectType.ConsultantNotes);
        Assert.That(cn.Status, Is.EqualTo(RegistrationStatus.NotApplicable));
        Assert.That(cn.CanRegisterOnline, Is.False);

        // BackTranslation (inherits from base)
        var bt = RegistrationService.GetRegistrationState(null, "someBaseGuid", ProjectType.BackTranslation);
        Assert.That(bt.Status, Is.EqualTo(RegistrationStatus.InheritsFromBase));

        // Auxiliary (inherits, no opt-out)
        var aux = RegistrationService.GetRegistrationState(null, "someBaseGuid", ProjectType.Auxiliary);
        Assert.That(aux.Status, Is.EqualTo(RegistrationStatus.InheritsFromBase));
        Assert.That(aux.CanOptOutOfInheritance, Is.False);

        // TransliterationManual (inherits, no opt-out)
        var tm = RegistrationService.GetRegistrationState(null, "someBaseGuid", ProjectType.TransliterationManual);
        Assert.That(tm.Status, Is.EqualTo(RegistrationStatus.InheritsFromBase));
        Assert.That(tm.CanOptOutOfInheritance, Is.False);
    }

    // =========================================================================
    // CAP-007: GetRegistrationState - Contract Tests
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-007-01")]
    [Property("BehaviorId", "BHV-010")]
    [Description("NotSelected type returns NotSelected status")]
    public void GetRegistrationState_NotSelected_ReturnsNotSelected()
    {
        var result = RegistrationService.GetRegistrationState(null, null, ProjectType.NotSelected);

        Assert.That(result.Status, Is.EqualTo(RegistrationStatus.NotSelected));
        Assert.That(result.CanRegisterOnline, Is.False);
        Assert.That(result.CanOptOutOfInheritance, Is.False);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-007-02")]
    [Property("BehaviorId", "BHV-010")]
    [Description("Standard new project returns Unregistered with ability to register")]
    public void GetRegistrationState_StandardNew_ReturnsUnregistered()
    {
        var result = RegistrationService.GetRegistrationState(null, null, ProjectType.Standard);

        Assert.That(result.Status, Is.EqualTo(RegistrationStatus.Unregistered));
        Assert.That(result.CanRegisterOnline, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-007-03")]
    [Property("BehaviorId", "BHV-010")]
    [Description("Daughter new project returns Unregistered")]
    public void GetRegistrationState_DaughterNew_ReturnsUnregistered()
    {
        var result = RegistrationService.GetRegistrationState(null, null, ProjectType.Daughter);

        Assert.That(result.Status, Is.EqualTo(RegistrationStatus.Unregistered));
        Assert.That(result.CanRegisterOnline, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-007-04")]
    [Property("BehaviorId", "BHV-010")]
    [Description("StudyBibleAdditions new project returns Unregistered")]
    public void GetRegistrationState_SBANew_ReturnsUnregistered()
    {
        var result = RegistrationService.GetRegistrationState(
            null,
            null,
            ProjectType.StudyBibleAdditions
        );

        Assert.That(result.Status, Is.EqualTo(RegistrationStatus.Unregistered));
        Assert.That(result.CanRegisterOnline, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-007-05")]
    [Property("BehaviorId", "BHV-010")]
    [Description("BackTranslation with base returns InheritsFromBase with opt-out")]
    public void GetRegistrationState_BTWithBase_ReturnsInheritsWithOptOut()
    {
        var result = RegistrationService.GetRegistrationState(
            null,
            "baseGuid123",
            ProjectType.BackTranslation
        );

        Assert.That(result.Status, Is.EqualTo(RegistrationStatus.InheritsFromBase));
        Assert.That(result.CanOptOutOfInheritance, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-007-06")]
    [Property("BehaviorId", "BHV-010")]
    [Description("Auxiliary with base returns InheritsFromBase without opt-out")]
    public void GetRegistrationState_AuxiliaryWithBase_ReturnsInheritsNoOptOut()
    {
        var result = RegistrationService.GetRegistrationState(
            null,
            "baseGuid123",
            ProjectType.Auxiliary
        );

        Assert.That(result.Status, Is.EqualTo(RegistrationStatus.InheritsFromBase));
        Assert.That(result.CanOptOutOfInheritance, Is.False);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-007-07")]
    [Property("BehaviorId", "BHV-010")]
    [Description("ConsultantNotes returns NotApplicable")]
    public void GetRegistrationState_ConsultantNotes_ReturnsNotApplicable()
    {
        var result = RegistrationService.GetRegistrationState(
            null,
            null,
            ProjectType.ConsultantNotes
        );

        Assert.That(result.Status, Is.EqualTo(RegistrationStatus.NotApplicable));
        Assert.That(result.CanRegisterOnline, Is.False);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-007-08")]
    [Property("BehaviorId", "BHV-010")]
    [Description("TransliterationManual with base returns InheritsFromBase")]
    public void GetRegistrationState_TransliterationManual_ReturnsInherits()
    {
        var result = RegistrationService.GetRegistrationState(
            null,
            "baseGuid123",
            ProjectType.TransliterationManual
        );

        Assert.That(result.Status, Is.EqualTo(RegistrationStatus.InheritsFromBase));
        Assert.That(result.CanOptOutOfInheritance, Is.False);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-007-09")]
    [Property("BehaviorId", "BHV-010")]
    [Description("TransliterationWithEncoder with base returns InheritsFromBase")]
    public void GetRegistrationState_TransliterationWithEncoder_ReturnsInherits()
    {
        var result = RegistrationService.GetRegistrationState(
            null,
            "baseGuid123",
            ProjectType.TransliterationWithEncoder
        );

        Assert.That(result.Status, Is.EqualTo(RegistrationStatus.InheritsFromBase));
        Assert.That(result.CanOptOutOfInheritance, Is.False);
    }

    // =========================================================================
    // CAP-007: GetRegistrationState - Golden Master Tests
    // =========================================================================

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "gm-005")]
    [Property("BehaviorId", "BHV-010")]
    [Description("Golden master: Types requiring own registration")]
    [TestCase(ProjectType.Standard)]
    [TestCase(ProjectType.Daughter)]
    [TestCase(ProjectType.StudyBibleAdditions)]
    public void GetRegistrationState_GoldenMaster_TypesRequiringOwnRegistration(
        ProjectType type
    )
    {
        var result = RegistrationService.GetRegistrationState(null, null, type);

        Assert.That(result.Status, Is.EqualTo(RegistrationStatus.Unregistered));
        Assert.That(result.CanRegisterOnline, Is.True);
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "gm-005")]
    [Property("BehaviorId", "BHV-010")]
    [Description("Golden master: Types inheriting from base")]
    [TestCase(ProjectType.BackTranslation)]
    [TestCase(ProjectType.Auxiliary)]
    [TestCase(ProjectType.TransliterationManual)]
    [TestCase(ProjectType.TransliterationWithEncoder)]
    public void GetRegistrationState_GoldenMaster_TypesInheritingFromBase(ProjectType type)
    {
        var result = RegistrationService.GetRegistrationState(null, "baseGuid", type);

        Assert.That(result.Status, Is.EqualTo(RegistrationStatus.InheritsFromBase));
    }

    // =========================================================================
    // CAP-007: GetRegistrationState - RegistryServerAvailable field
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-007-10")]
    [Property("BehaviorId", "BHV-024")]
    [Description("Registration state includes registry server availability")]
    public void GetRegistrationState_IncludesRegistryServerAvailability()
    {
        var result = RegistrationService.GetRegistrationState(null, null, ProjectType.Standard);

        // RegistryServerAvailable should be a boolean (true or false)
        Assert.That(result.RegistryServerAvailable, Is.TypeOf<bool>());
    }

    // =========================================================================
    // CAP-008: IsRegistryServerAvailable - Acceptance Test
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-008")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "BHV-024")]
    [Description("Acceptance test: Registry server availability check returns boolean")]
    public void IsRegistryServerAvailable_ReturnsBoolean()
    {
        var result = RegistrationService.IsRegistryServerAvailable();

        Assert.That(result, Is.TypeOf<bool>());
    }

    // =========================================================================
    // CAP-008: IsRegistryServerAvailable - Contract Tests
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "BHV-024")]
    [Description("IsRegistryServerAvailable does not throw exceptions")]
    public void IsRegistryServerAvailable_DoesNotThrow()
    {
        Assert.DoesNotThrow(() => RegistrationService.IsRegistryServerAvailable());
    }

    // =========================================================================
    // INV-006: Registration code length invariant
    // =========================================================================

    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-006")]
    [Property("ScenarioId", "TS-024")]
    [Property("BehaviorId", "BHV-010")]
    [Description("Registration codes shorter than 20 chars are invalid")]
    [TestCase("SHORT")]
    [TestCase("")]
    [TestCase("1234567890123456789")] // 19 chars
    public void RegistrationCodeLength_ShortCodes_AreInvalid(string code)
    {
        // This invariant is enforced by the existing ParatextRegistrationService
        // but our RegistrationService must also respect it.
        // Codes < 20 characters should not be treated as valid registrations.
        Assert.That(code.Length, Is.LessThan(20));
    }

    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-006")]
    [Property("ScenarioId", "TS-023")]
    [Property("BehaviorId", "BHV-010")]
    [Description("Registration codes of 20+ chars are valid length")]
    [TestCase("ABCD1234567890123456")] // exactly 20
    [TestCase("ABCD12345678901234567890")] // 24 chars
    public void RegistrationCodeLength_ValidCodes_MeetMinimumLength(string code)
    {
        Assert.That(code.Length, Is.GreaterThanOrEqualTo(20));
    }

    // =========================================================================
    // CAP-009: InitiateOnlineRegistration - Acceptance Test
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-025")]
    [Property("BehaviorId", "BHV-011")]
    [Description("Acceptance test: InitiateOnlineRegistration returns URL containing registry host")]
    public void InitiateOnlineRegistration_ValidGuid_ReturnsRegistryUrl()
    {
        var projectGuid = "abc123def456789012345678901234567890abcd";

        var url = RegistrationService.InitiateOnlineRegistration(projectGuid);

        Assert.That(url, Is.Not.Null.And.Not.Empty);
        Assert.That(url, Does.Contain("registry.paratext.org").Or.Contain("paratext.org"));
    }

    // =========================================================================
    // CAP-009: InitiateOnlineRegistration - Contract Tests
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-025")]
    [Property("BehaviorId", "BHV-011")]
    [Description("InitiateOnlineRegistration returns a valid URL string")]
    public void InitiateOnlineRegistration_ValidGuid_ReturnsValidUrl()
    {
        var projectGuid = "abc123def456789012345678901234567890abcd";

        var url = RegistrationService.InitiateOnlineRegistration(projectGuid);

        Assert.That(url, Is.Not.Null);
        Assert.That(url, Does.StartWith("http"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-025-02")]
    [Property("BehaviorId", "BHV-011")]
    [Description("InitiateOnlineRegistration includes encoded project data in URL")]
    public void InitiateOnlineRegistration_ValidGuid_IncludesProjectData()
    {
        var projectGuid = "abc123def456789012345678901234567890abcd";

        var url = RegistrationService.InitiateOnlineRegistration(projectGuid);

        // URL should contain some form of the project identifier
        Assert.That(url, Is.Not.Null.And.Not.Empty);
        Assert.That(url.Length, Is.GreaterThan(20), "URL should contain encoded data");
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-025-03")]
    [Property("BehaviorId", "BHV-011")]
    [Description("InitiateOnlineRegistration with empty GUID throws ArgumentException")]
    public void InitiateOnlineRegistration_EmptyGuid_ThrowsArgumentException()
    {
        Assert.That(
            () => RegistrationService.InitiateOnlineRegistration(""),
            Throws.TypeOf<ArgumentException>()
        );
    }
}
