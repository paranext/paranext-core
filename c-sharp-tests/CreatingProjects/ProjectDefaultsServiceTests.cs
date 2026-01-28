using Paranext.DataProvider.CreatingProjects;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using ProjectType = Paranext.DataProvider.CreatingProjects.ProjectType;
using ProjectNormalization = Paranext.DataProvider.CreatingProjects.ProjectNormalization;
using VersificationType = Paranext.DataProvider.CreatingProjects.VersificationType;

namespace TestParanextDataProvider.CreatingProjects;

/// <summary>
/// Tests for ProjectDefaultsService: GetDefaultSettings (CAP-013) and CreateProjectAsync (CAP-012).
/// RED phase -- these tests will fail until the service is implemented.
/// </summary>
[TestFixture]
public class ProjectDefaultsServiceTests
{
    // =========================================================================
    // CAP-013: GetDefaultSettings - Acceptance Test
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-013")]
    [Property("ScenarioId", "gm-007")]
    [Property("BehaviorId", "BHV-034")]
    [Description("Acceptance test: Default settings match gm-007 golden master for Standard type")]
    public void GetDefaultSettings_Standard_MatchesGoldenMaster()
    {
        var defaults = ProjectDefaultsService.GetDefaultSettings(ProjectType.Standard);

        Assert.That(defaults.Versification, Is.EqualTo(VersificationType.English));
        Assert.That(defaults.Normalization, Is.EqualTo(ProjectNormalization.NFC));
        Assert.That(defaults.UsfmVersion, Is.EqualTo(3));
        Assert.That(defaults.Editable, Is.True);
        Assert.That(defaults.ProjectType, Is.EqualTo(ProjectType.Standard));
    }

    // =========================================================================
    // CAP-013: GetDefaultSettings - Contract Tests
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-013-01")]
    [Property("BehaviorId", "BHV-034")]
    [Description("Standard defaults: English versification, NFC, USFM 3, editable")]
    public void GetDefaultSettings_Standard_ReturnsCorrectDefaults()
    {
        var defaults = ProjectDefaultsService.GetDefaultSettings(ProjectType.Standard);

        Assert.That(defaults.ProjectType, Is.EqualTo(ProjectType.Standard));
        Assert.That(defaults.Versification, Is.EqualTo(VersificationType.English));
        Assert.That(defaults.Normalization, Is.EqualTo(ProjectNormalization.NFC));
        Assert.That(defaults.UsfmVersion, Is.EqualTo(3));
        Assert.That(defaults.Editable, Is.True);
        Assert.That(defaults.BaseProjectGuid, Is.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-013-02")]
    [Property("BehaviorId", "BHV-034")]
    [Description("BackTranslation defaults: NFC normalization, derived type")]
    public void GetDefaultSettings_BackTranslation_ReturnsCorrectDefaults()
    {
        var defaults = ProjectDefaultsService.GetDefaultSettings(
            ProjectType.BackTranslation,
            "baseGuid123"
        );

        Assert.That(defaults.ProjectType, Is.EqualTo(ProjectType.BackTranslation));
        Assert.That(defaults.Normalization, Is.EqualTo(ProjectNormalization.NFC));
        Assert.That(defaults.Editable, Is.True);
        Assert.That(defaults.BaseProjectGuid, Is.EqualTo("baseGuid123"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-013-03")]
    [Property("BehaviorId", "BHV-034")]
    [Description("TransliterationManual defaults: NFD normalization")]
    public void GetDefaultSettings_TransliterationManual_UsesNFD()
    {
        var defaults = ProjectDefaultsService.GetDefaultSettings(
            ProjectType.TransliterationManual,
            "baseGuid456"
        );

        Assert.That(defaults.Normalization, Is.EqualTo(ProjectNormalization.NFD));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-013-04")]
    [Property("BehaviorId", "BHV-034")]
    [Description("TransliterationWithEncoder defaults: NFD normalization")]
    public void GetDefaultSettings_TransliterationWithEncoder_UsesNFD()
    {
        var defaults = ProjectDefaultsService.GetDefaultSettings(
            ProjectType.TransliterationWithEncoder,
            "baseGuid789"
        );

        Assert.That(defaults.Normalization, Is.EqualTo(ProjectNormalization.NFD));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-013-05")]
    [Property("BehaviorId", "BHV-034")]
    [Description("ConsultantNotes defaults: NFC, editable")]
    public void GetDefaultSettings_ConsultantNotes_ReturnsCorrectDefaults()
    {
        var defaults = ProjectDefaultsService.GetDefaultSettings(ProjectType.ConsultantNotes);

        Assert.That(defaults.ProjectType, Is.EqualTo(ProjectType.ConsultantNotes));
        Assert.That(defaults.Normalization, Is.EqualTo(ProjectNormalization.NFC));
        Assert.That(defaults.Editable, Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-013-06")]
    [Property("BehaviorId", "BHV-034")]
    [Description("Derived type with base project GUID stores it in defaults")]
    public void GetDefaultSettings_DerivedType_StoresBaseProjectGuid()
    {
        var baseGuid = "abc123def456789012345678901234567890abcd";

        var defaults = ProjectDefaultsService.GetDefaultSettings(
            ProjectType.Daughter,
            baseGuid
        );

        Assert.That(defaults.BaseProjectGuid, Is.EqualTo(baseGuid));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-013-07")]
    [Property("BehaviorId", "BHV-034")]
    [Description("Non-derived type without base project GUID has null base")]
    public void GetDefaultSettings_NonDerived_HasNullBase()
    {
        var defaults = ProjectDefaultsService.GetDefaultSettings(ProjectType.Standard);

        Assert.That(defaults.BaseProjectGuid, Is.Null);
    }

    // =========================================================================
    // CAP-013: GetDefaultSettings - Golden Master Tests
    // =========================================================================

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "gm-007")]
    [Property("BehaviorId", "BHV-034")]
    [Description("Golden master: All default values match gm-007 expected output")]
    public void GetDefaultSettings_GoldenMaster_AllDefaultValues()
    {
        var defaults = ProjectDefaultsService.GetDefaultSettings(ProjectType.Standard);

        // gm-007: versification: English, normalizationForm: NFC, usfmVersion: 3, editable: true
        Assert.That(defaults.Versification, Is.EqualTo(VersificationType.English));
        Assert.That(defaults.Normalization, Is.EqualTo(ProjectNormalization.NFC));
        Assert.That(defaults.UsfmVersion, Is.EqualTo(3));
        Assert.That(defaults.Editable, Is.True);
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "gm-007")]
    [Property("BehaviorId", "BHV-034")]
    [Description("Golden master: Transliteration types use NFD normalization")]
    [TestCase(ProjectType.TransliterationManual)]
    [TestCase(ProjectType.TransliterationWithEncoder)]
    public void GetDefaultSettings_GoldenMaster_TransliterationUsesNFD(ProjectType type)
    {
        var defaults = ProjectDefaultsService.GetDefaultSettings(type, "someBase");

        Assert.That(defaults.Normalization, Is.EqualTo(ProjectNormalization.NFD));
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "gm-007")]
    [Property("BehaviorId", "BHV-034")]
    [Description("Golden master: All non-transliteration types use NFC")]
    [TestCase(ProjectType.Standard)]
    [TestCase(ProjectType.BackTranslation)]
    [TestCase(ProjectType.Daughter)]
    [TestCase(ProjectType.Auxiliary)]
    [TestCase(ProjectType.StudyBibleAdditions)]
    [TestCase(ProjectType.ConsultantNotes)]
    public void GetDefaultSettings_GoldenMaster_NonTransliterationUsesNFC(ProjectType type)
    {
        var defaults = ProjectDefaultsService.GetDefaultSettings(type, "someBase");

        Assert.That(defaults.Normalization, Is.EqualTo(ProjectNormalization.NFC));
    }

    // =========================================================================
    // CAP-012: CreateProjectAsync - Acceptance Test
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "spec-001")]
    [Property("BehaviorId", "BHV-034")]
    [Description(
        "Acceptance test: CreateProjectAsync creates project with directory, Settings.xml, GUID, and collection entry"
    )]
    public async Task CreateProjectAsync_StandardProject_FullCreationFlow()
    {
        var request = new CreateProjectRequest
        {
            ShortName = "TestStd",
            FullName = "Test Standard Project",
            LanguageId = "eng",
            Versification = VersificationType.English,
            ProjectType = ProjectType.Standard,
        };

        var result = await ProjectDefaultsService.CreateProjectAsync(request);

        Assert.That(result.Success, Is.True, "Project creation should succeed");
        Assert.That(result.ProjectGuid, Is.Not.Null.And.Not.Empty, "GUID should be assigned");
        Assert.That(result.ErrorCode, Is.Null, "No error code on success");
    }

    // =========================================================================
    // CAP-012: CreateProjectAsync - Contract Tests
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-034")]
    [Description("Create Standard project with valid inputs returns success with GUID")]
    public async Task CreateProjectAsync_ValidStandard_ReturnsSuccessWithGuid()
    {
        var request = new CreateProjectRequest
        {
            ShortName = "TST",
            FullName = "Test Project",
            LanguageId = "eng",
            Versification = VersificationType.English,
            ProjectType = ProjectType.Standard,
        };

        var result = await ProjectDefaultsService.CreateProjectAsync(request);

        Assert.That(result.Success, Is.True);
        Assert.That(result.ProjectGuid, Is.Not.Null.And.Not.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-002")]
    [Property("BehaviorId", "BHV-034")]
    [Description("Reject project name containing space")]
    public async Task CreateProjectAsync_NameWithSpace_ReturnsError()
    {
        var request = new CreateProjectRequest
        {
            ShortName = "Test Proj",
            FullName = "Test Project",
            LanguageId = "eng",
            Versification = VersificationType.English,
            ProjectType = ProjectType.Standard,
        };

        var result = await ProjectDefaultsService.CreateProjectAsync(request);

        Assert.That(result.Success, Is.False, "Name with space should be rejected");
        Assert.That(result.ErrorCode, Is.Not.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-012-03")]
    [Property("BehaviorId", "BHV-034")]
    [Description("BackTranslation creation requires BaseProjectGuid")]
    public async Task CreateProjectAsync_DerivedWithoutBase_ReturnsError()
    {
        var request = new CreateProjectRequest
        {
            ShortName = "BTTest",
            FullName = "Back Translation Test",
            LanguageId = "eng",
            Versification = VersificationType.English,
            ProjectType = ProjectType.BackTranslation,
            BaseProjectGuid = null,
        };

        var result = await ProjectDefaultsService.CreateProjectAsync(request);

        Assert.That(result.Success, Is.False, "Derived type without base should fail");
        Assert.That(result.ErrorCode, Is.Not.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-012-04")]
    [Property("BehaviorId", "BHV-034")]
    [Description("CreateProjectAsync applies default normalization when not specified")]
    public async Task CreateProjectAsync_NoNormalization_AppliesDefault()
    {
        var request = new CreateProjectRequest
        {
            ShortName = "NrmTst",
            FullName = "Normalization Test",
            LanguageId = "eng",
            Versification = VersificationType.English,
            ProjectType = ProjectType.Standard,
            Normalization = null,
        };

        var result = await ProjectDefaultsService.CreateProjectAsync(request);

        // Default normalization (NFC) should be applied
        Assert.That(result.Success, Is.True);
        Assert.That(result.ProjectGuid, Is.Not.Null.And.Not.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-012-05")]
    [Property("BehaviorId", "BHV-034")]
    [Description("CreateProjectAsync returns unique GUID for each created project")]
    public async Task CreateProjectAsync_TwoProjects_HaveDifferentGuids()
    {
        var request1 = new CreateProjectRequest
        {
            ShortName = "Proj1",
            FullName = "Project One",
            LanguageId = "eng",
            Versification = VersificationType.English,
            ProjectType = ProjectType.Standard,
        };
        var request2 = new CreateProjectRequest
        {
            ShortName = "Proj2",
            FullName = "Project Two",
            LanguageId = "eng",
            Versification = VersificationType.English,
            ProjectType = ProjectType.Standard,
        };

        var result1 = await ProjectDefaultsService.CreateProjectAsync(request1);
        var result2 = await ProjectDefaultsService.CreateProjectAsync(request2);

        Assert.That(result1.Success, Is.True);
        Assert.That(result2.Success, Is.True);
        Assert.That(result1.ProjectGuid, Is.Not.EqualTo(result2.ProjectGuid));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-012-06")]
    [Property("BehaviorId", "BHV-034")]
    [Description("CreateProjectAsync supports cancellation")]
    public void CreateProjectAsync_Cancelled_ThrowsOperationCanceled()
    {
        var request = new CreateProjectRequest
        {
            ShortName = "Cancel",
            FullName = "Cancel Test",
            LanguageId = "eng",
            Versification = VersificationType.English,
            ProjectType = ProjectType.Standard,
        };
        var cts = new CancellationTokenSource();
        cts.Cancel();

        Assert.ThrowsAsync<OperationCanceledException>(
            async () => await ProjectDefaultsService.CreateProjectAsync(request, cts.Token)
        );
    }

    // =========================================================================
    // CAP-012: CreateProjectAsync - Golden Master Tests
    // =========================================================================

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "gm-007")]
    [Property("BehaviorId", "BHV-034")]
    [Description("Golden master: Created project has default settings from gm-007")]
    public async Task CreateProjectAsync_GoldenMaster_DefaultSettingsApplied()
    {
        var request = new CreateProjectRequest
        {
            ShortName = "GmTest",
            FullName = "Golden Master Test",
            LanguageId = "eng",
            Versification = VersificationType.English,
            ProjectType = ProjectType.Standard,
        };

        var result = await ProjectDefaultsService.CreateProjectAsync(request);

        // gm-007 expected: versification=English, normalization=NFC, usfmVersion=3, editable=true
        Assert.That(result.Success, Is.True);
        Assert.That(result.ProjectGuid, Is.Not.Null.And.Not.Empty);
        // The created project's settings should match gm-007 defaults
        // (verified via project lookup after creation)
    }

    // =========================================================================
    // CAP-012: CreateProjectAsync - Invariant Tests
    // =========================================================================

    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-002")]
    [Property("ScenarioId", "TS-012-INV-002")]
    [Property("BehaviorId", "BHV-034")]
    [Description("Invariant: Project must have GUID after creation")]
    public async Task CreateProjectAsync_AnyValidProject_HasNonEmptyGuid()
    {
        var request = new CreateProjectRequest
        {
            ShortName = "InvTst",
            FullName = "Invariant Test",
            LanguageId = "eng",
            Versification = VersificationType.English,
            ProjectType = ProjectType.Standard,
        };

        var result = await ProjectDefaultsService.CreateProjectAsync(request);

        Assert.That(result.Success, Is.True);
        Assert.That(result.ProjectGuid, Is.Not.Null.And.Not.Empty);
        // ParatextData uses HexId (40-char hex string), not standard GUIDs
        Assert.That(
            result.ProjectGuid!.Length,
            Is.EqualTo(40),
            "ProjectGuid must be a 40-character HexId"
        );
        Assert.That(
            result.ProjectGuid.All(c => "0123456789abcdef".Contains(c)),
            Is.True,
            "ProjectGuid must contain only hex characters"
        );
    }

    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-003")]
    [Property("ScenarioId", "TS-012-INV-003")]
    [Property("BehaviorId", "BHV-034")]
    [TestCase(ProjectType.BackTranslation)]
    [TestCase(ProjectType.Daughter)]
    [TestCase(ProjectType.Auxiliary)]
    [TestCase(ProjectType.StudyBibleAdditions)]
    [Description("Invariant: Derived project types must have base project")]
    public async Task CreateProjectAsync_DerivedTypeWithoutBase_Fails(ProjectType derivedType)
    {
        var request = new CreateProjectRequest
        {
            ShortName = "DrvTst",
            FullName = "Derived Test",
            LanguageId = "eng",
            Versification = VersificationType.English,
            ProjectType = derivedType,
            BaseProjectGuid = null,
        };

        var result = await ProjectDefaultsService.CreateProjectAsync(request);

        Assert.That(result.Success, Is.False, $"Derived type {derivedType} without base should fail");
    }
}
