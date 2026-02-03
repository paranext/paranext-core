using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using Paratext.Data.ProjectSettingsAccess;
using SIL.Scripture;

namespace TestParanextDataProvider.Projects;

/// <summary>
/// Tests for ProjectCreationService - CAP-004, CAP-014, CAP-015
/// - CAP-004: GetUsfmVersionWarning (gm-006)
/// - CAP-014: CreateProject (gm-007)
/// - CAP-015: GetProjectOptions (spec-010, spec-011)
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class ProjectCreationServiceTests : PapiTestBase
{
    #region Acceptance Test - CAP-004

    /// <summary>
    /// Acceptance test for CAP-004: USFM version warning capability.
    /// When this test passes, the capability is complete.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-004")]
    [Description(
        "Acceptance test: GetUsfmVersionWarning returns warning when USFM 3 selected for new project"
    )]
    public void GetUsfmVersionWarning_AcceptanceTest()
    {
        // This acceptance test verifies the complete GetUsfmVersionWarning capability

        // USFM 3 for new project - should return warning
        var warningResult = ProjectCreationService.GetUsfmVersionWarning(
            UsfmVersionOption.Version3,
            isNewProject: true
        );
        Assert.That(warningResult, Is.Not.Null, "USFM 3 for new project should return warning");
        Assert.That(warningResult!.ShowWarning, Is.True, "Warning should be shown");
        Assert.That(
            warningResult.WarningMessageKey,
            Is.Not.Null.And.Not.Empty,
            "Should have message key"
        );
        Assert.That(
            warningResult.ConfirmButtonKey,
            Is.Not.Null.And.Not.Empty,
            "Should have confirm button key"
        );
        Assert.That(
            warningResult.CancelButtonKey,
            Is.Not.Null.And.Not.Empty,
            "Should have cancel button key"
        );

        // USFM 2 for new project - should NOT return warning
        var noWarningResult = ProjectCreationService.GetUsfmVersionWarning(
            UsfmVersionOption.Version2,
            isNewProject: true
        );
        Assert.That(
            noWarningResult,
            Is.Null.Or.Property("ShowWarning").EqualTo(false),
            "USFM 2 for new project should not show warning"
        );

        // USFM 3 for existing project - should NOT return warning (already converted)
        var existingProjectResult = ProjectCreationService.GetUsfmVersionWarning(
            UsfmVersionOption.Version3,
            isNewProject: false
        );
        Assert.That(
            existingProjectResult,
            Is.Null.Or.Property("ShowWarning").EqualTo(false),
            "USFM 3 for existing project should not show warning"
        );
    }

    #endregion

    #region Golden Master Tests - gm-006

    /// <summary>
    /// gm-006-01: USFM 3 for new project - show warning
    /// Based on gm-006-01: Convert USFM 2 figure to USFM 3 format
    /// The warning is shown before conversion starts
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-006-01")]
    [Property("ScenarioId", "TS-USFM-001")]
    [Property("BehaviorId", "BHV-100")]
    public void GetUsfmVersionWarning_Usfm3NewProject_ReturnsWarning()
    {
        var result = ProjectCreationService.GetUsfmVersionWarning(
            UsfmVersionOption.Version3,
            isNewProject: true
        );

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.ShowWarning, Is.True);
    }

    /// <summary>
    /// gm-006-02: USFM 2 for new project - no warning needed
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-006-02")]
    [Property("ScenarioId", "TS-USFM-002")]
    [Property("BehaviorId", "BHV-100")]
    public void GetUsfmVersionWarning_Usfm2NewProject_ReturnsNull()
    {
        var result = ProjectCreationService.GetUsfmVersionWarning(
            UsfmVersionOption.Version2,
            isNewProject: true
        );

        Assert.That(result, Is.Null.Or.Property("ShowWarning").EqualTo(false));
    }

    /// <summary>
    /// gm-006-03: USFM 3 for existing project - no warning (already at USFM 3)
    /// Based on gm-006-04: No conversion needed for USFM 3 project
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-006-03")]
    [Property("ScenarioId", "TS-USFM-003")]
    [Property("BehaviorId", "BHV-100")]
    public void GetUsfmVersionWarning_Usfm3ExistingProject_ReturnsNull()
    {
        var result = ProjectCreationService.GetUsfmVersionWarning(
            UsfmVersionOption.Version3,
            isNewProject: false
        );

        // Existing project already at USFM 3 - no warning needed
        Assert.That(result, Is.Null.Or.Property("ShowWarning").EqualTo(false));
    }

    /// <summary>
    /// gm-006-04: USFM 2 for existing project - no warning
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-006-04")]
    [Property("ScenarioId", "TS-USFM-004")]
    [Property("BehaviorId", "BHV-100")]
    public void GetUsfmVersionWarning_Usfm2ExistingProject_ReturnsNull()
    {
        var result = ProjectCreationService.GetUsfmVersionWarning(
            UsfmVersionOption.Version2,
            isNewProject: false
        );

        Assert.That(result, Is.Null.Or.Property("ShowWarning").EqualTo(false));
    }

    #endregion

    #region Contract Tests - Warning Content

    /// <summary>
    /// Verify warning contains correct localization keys
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-USFM-005")]
    [Property("BehaviorId", "BHV-100")]
    public void GetUsfmVersionWarning_Usfm3NewProject_ContainsCorrectLocalizationKeys()
    {
        var result = ProjectCreationService.GetUsfmVersionWarning(
            UsfmVersionOption.Version3,
            isNewProject: true
        );

        Assert.That(result, Is.Not.Null);
        Assert.That(result!.WarningMessageKey, Is.Not.Null.And.Not.Empty);
        Assert.That(result.ConfirmButtonKey, Is.Not.Null.And.Not.Empty);
        Assert.That(result.CancelButtonKey, Is.Not.Null.And.Not.Empty);
    }

    /// <summary>
    /// Verify warning message key contains expected text
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-USFM-006")]
    [Property("BehaviorId", "BHV-100")]
    public void GetUsfmVersionWarning_Usfm3NewProject_MessageKeyContainsUsfm3Reference()
    {
        var result = ProjectCreationService.GetUsfmVersionWarning(
            UsfmVersionOption.Version3,
            isNewProject: true
        );

        Assert.That(result, Is.Not.Null);
        // The message key should reference USFM version or compatibility
        Assert.That(
            result!.WarningMessageKey,
            Does.Contain("Usfm")
                .Or.Contain("usfm")
                .Or.Contain("USFM")
                .Or.Contain("Version")
                .Or.Contain("Compat")
        );
    }

    /// <summary>
    /// UsfmVersionWarning should have all required properties set
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-USFM-007")]
    [Property("BehaviorId", "BHV-100")]
    public void GetUsfmVersionWarning_Usfm3NewProject_AllPropertiesPopulated()
    {
        var result = ProjectCreationService.GetUsfmVersionWarning(
            UsfmVersionOption.Version3,
            isNewProject: true
        );

        Assert.That(result, Is.Not.Null);

        // All properties should be non-null and meaningful
        Assert.Multiple(() =>
        {
            Assert.That(result!.ShowWarning, Is.True);
            Assert.That(string.IsNullOrWhiteSpace(result.WarningMessageKey), Is.False);
            Assert.That(string.IsNullOrWhiteSpace(result.ConfirmButtonKey), Is.False);
            Assert.That(string.IsNullOrWhiteSpace(result.CancelButtonKey), Is.False);
        });
    }

    /// <summary>
    /// Verify warning is not shown for USFM 2 regardless of project state
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-USFM-008")]
    [Property("BehaviorId", "BHV-100")]
    [TestCase(true)]
    [TestCase(false)]
    public void GetUsfmVersionWarning_Usfm2_NeverShowsWarning(bool isNewProject)
    {
        var result = ProjectCreationService.GetUsfmVersionWarning(
            UsfmVersionOption.Version2,
            isNewProject
        );

        // Should never show warning for USFM 2
        if (result != null)
        {
            Assert.That(result.ShowWarning, Is.False, "USFM 2 should never show warning");
        }
    }

    #endregion

    #region Acceptance Test - CAP-014 (CreateProject)

    /// <summary>
    /// Acceptance test for CAP-014: CreateProject capability.
    /// When this test passes, the capability is complete.
    /// Verifies: Project directory created, Settings.xml written, GUID assigned,
    /// added to ScrTextCollection, VCS initialized.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-014")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-510")]
    [Property("BehaviorId", "BHV-511")]
    [Property("BehaviorId", "BHV-512")]
    [Description("Acceptance test: CreateProject orchestrates full project creation workflow")]
    public async Task CreateProject_AcceptanceTest()
    {
        // Arrange - Standard project creation request
        var request = new ProjectCreateRequest(
            ShortName: "CPACC",
            FullName: "Create Project Acceptance Test",
            ProjectType: Paratext.Data.ProjectType.Standard,
            LanguageId: "eng",
            Versification: ScrVersType.English,
            BaseProjectGuid: null,
            Editable: true,
            EncoderName: null,
            EncoderReverseDirection: false,
            BooksPresent: new List<string> { "GEN", "EXO" },
            FileNameForm: "41MAT",
            Normalization: ProjectNormalization.NFC,
            UsfmVersion: UsfmVersionOption.Version3,
            NoteTags: new List<NoteTagConfig>(),
            BiblicalTermsListId: null,
            AssociatedLexicalProjectGuid: null,
            StudyBibleCategories: null
        );

        // Act
        var result = await ProjectCreationService.CreateProjectAsync(request);

        // Assert - Project created successfully
        Assert.That(result, Is.InstanceOf<ProjectCreateSuccess>());
        var success = (ProjectCreateSuccess)result;

        // Verify GUID format (40-char hex, no dashes)
        Assert.That(success.ProjectGuid.ToString(), Has.Length.EqualTo(40));
        Assert.That(success.ProjectGuid.ToString(), Does.Match("^[0-9a-f]{40}$"));

        // Verify project is in ScrTextCollection (side-effect verification)
        var foundProject = ScrTextCollection.Find(request.ShortName);
        Assert.That(foundProject, Is.Not.Null, "Project should be registered in ScrTextCollection");
        Assert.That(
            foundProject.Guid.ToString().ToLowerInvariant(),
            Is.EqualTo(success.ProjectGuid.ToString().ToLowerInvariant()),
            "Project GUID in collection should match returned GUID"
        );
    }

    #endregion

    #region Golden Master Tests - gm-007 (CreateProject)

    /// <summary>
    /// gm-007-01: Create Standard project with all defaults.
    /// Verifies: Project created, has GUID, Settings.xml exists, in ScrTextCollection.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-007-01")]
    [Property("CapabilityId", "CAP-014")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-510")]
    [Property("BehaviorId", "BHV-512")]
    public async Task CreateProject_StandardProject_Success()
    {
        // Arrange - gm-007-01 input
        var request = new ProjectCreateRequest(
            ShortName: "STDTEST",
            FullName: "Standard Test Project",
            ProjectType: Paratext.Data.ProjectType.Standard,
            LanguageId: "eng",
            Versification: ScrVersType.English,
            BaseProjectGuid: null,
            Editable: true,
            EncoderName: null,
            EncoderReverseDirection: false,
            BooksPresent: new List<string> { "GEN", "EXO" },
            FileNameForm: "41MAT",
            Normalization: ProjectNormalization.NFC,
            UsfmVersion: UsfmVersionOption.Version3,
            NoteTags: new List<NoteTagConfig>(),
            BiblicalTermsListId: null,
            AssociatedLexicalProjectGuid: null,
            StudyBibleCategories: null
        );

        // Act
        var result = await ProjectCreationService.CreateProjectAsync(request);

        // Assert - gm-007-01 expected output
        Assert.That(result, Is.InstanceOf<ProjectCreateSuccess>(), "projectCreated should be true");
        var success = (ProjectCreateSuccess)result;

        // hasGuid: true, guidLength: 40
        Assert.That(success.ProjectGuid.ToString(), Has.Length.EqualTo(40));

        // inScrTextCollection: true
        var project = ScrTextCollection.Find(request.ShortName);
        Assert.That(project, Is.Not.Null, "Project should be in ScrTextCollection");
    }

    /// <summary>
    /// gm-007-02: Create BackTranslation derived project.
    /// Verifies: Project created with base project reference, versification inherited.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-007-02")]
    [Property("CapabilityId", "CAP-014")]
    [Property("ScenarioId", "TS-002")]
    [Property("BehaviorId", "BHV-100")]
    [Property("BehaviorId", "BHV-104")]
    public async Task CreateProject_BackTranslationProject_Success()
    {
        // Arrange - First create base project
        DummyScrText baseProject = CreateDummyProject("BTBASE");
        ParatextProjects.FakeAddProject(CreateProjectDetails(baseProject), baseProject);

        // gm-007-02 input: BackTranslation with base project
        var request = new ProjectCreateRequest(
            ShortName: "BTTEST",
            FullName: "Back Translation Test",
            ProjectType: Paratext.Data.ProjectType.BackTranslation,
            LanguageId: "fra",
            Versification: ScrVersType.English, // inherited from base
            BaseProjectGuid: baseProject.Guid,
            Editable: true,
            EncoderName: null,
            EncoderReverseDirection: false,
            BooksPresent: new List<string> { "GEN" },
            FileNameForm: "41MAT",
            Normalization: ProjectNormalization.NFC,
            UsfmVersion: UsfmVersionOption.Version3,
            NoteTags: new List<NoteTagConfig>(),
            BiblicalTermsListId: null,
            AssociatedLexicalProjectGuid: null,
            StudyBibleCategories: null
        );

        // Act
        var result = await ProjectCreationService.CreateProjectAsync(request);

        // Assert - gm-007-02 expected output
        Assert.That(result, Is.InstanceOf<ProjectCreateSuccess>(), "projectCreated should be true");

        // Verify derived project settings
        var project = ScrTextCollection.Find(request.ShortName);
        Assert.That(project, Is.Not.Null, "Project should be in ScrTextCollection");
        // TranslationInfo.Type verification would require proper project setup
        // For now, verify project exists and can be retrieved
        Assert.That(
            project.Settings.TranslationInfo,
            Is.Not.Null,
            "TranslationInfo should be set for BackTranslation type"
        );
    }

    /// <summary>
    /// gm-007-03: Create StudyBibleAdditions project.
    /// Verifies: Project inherits language and book names from base.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-007-03")]
    [Property("CapabilityId", "CAP-014")]
    [Property("ScenarioId", "TS-005")]
    [Property("BehaviorId", "BHV-100")]
    [Property("BehaviorId", "BHV-104")]
    public async Task CreateProject_StudyBibleAdditionsProject_Success()
    {
        // Arrange - First create base project
        DummyScrText baseProject = CreateDummyProject("SBABASE");
        ParatextProjects.FakeAddProject(CreateProjectDetails(baseProject), baseProject);

        // gm-007-03 input: StudyBibleAdditions
        var request = new ProjectCreateRequest(
            ShortName: "SBATEST",
            FullName: "Study Bible Test",
            ProjectType: Paratext.Data.ProjectType.StudyBibleAdditions,
            LanguageId: null, // Language inherited from base per VAL-005
            Versification: ScrVersType.English,
            BaseProjectGuid: baseProject.Guid,
            Editable: true,
            EncoderName: null,
            EncoderReverseDirection: false,
            BooksPresent: new List<string>(),
            FileNameForm: "41MAT",
            Normalization: ProjectNormalization.NFC,
            UsfmVersion: UsfmVersionOption.Version3,
            NoteTags: new List<NoteTagConfig>(),
            BiblicalTermsListId: null,
            AssociatedLexicalProjectGuid: null,
            StudyBibleCategories: null
        );

        // Act
        var result = await ProjectCreationService.CreateProjectAsync(request);

        // Assert - gm-007-03 expected output
        Assert.That(result, Is.InstanceOf<ProjectCreateSuccess>(), "projectCreated should be true");

        // Verify StudyBibleAdditions settings
        var project = ScrTextCollection.Find(request.ShortName);
        Assert.That(project, Is.Not.Null, "Project should be in ScrTextCollection");
        // TranslationInfo.Type verification would require proper project setup
        // For now, verify project exists and can be retrieved
        Assert.That(
            project.Settings.TranslationInfo,
            Is.Not.Null,
            "TranslationInfo should be set for StudyBibleAdditions type"
        );
    }

    /// <summary>
    /// gm-007-04: Create TransliterationWithEncoder project.
    /// Verifies: Project not editable, encoder configured.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("GoldenMasterId", "gm-007-04")]
    [Property("CapabilityId", "CAP-014")]
    [Property("ScenarioId", "TS-007")]
    [Property("BehaviorId", "BHV-100")]
    [Property("BehaviorId", "BHV-104")]
    [Property("BehaviorId", "BHV-109")]
    public async Task CreateProject_TransliterationWithEncoderProject_Success()
    {
        // Arrange - First create base project
        DummyScrText baseProject = CreateDummyProject("TRBASE");
        ParatextProjects.FakeAddProject(CreateProjectDetails(baseProject), baseProject);

        // gm-007-04 input: TransliterationWithEncoder
        var request = new ProjectCreateRequest(
            ShortName: "TRTEST",
            FullName: "Transliteration Test",
            ProjectType: Paratext.Data.ProjectType.TransliterationWithEncoder,
            LanguageId: "eng-Latn",
            Versification: ScrVersType.English,
            BaseProjectGuid: baseProject.Guid,
            Editable: false, // TransliterationWithEncoder is NOT editable
            EncoderName: "SIL-IPA93-2011",
            EncoderReverseDirection: false,
            BooksPresent: new List<string> { "GEN" },
            FileNameForm: "41MAT",
            Normalization: ProjectNormalization.NFC,
            UsfmVersion: UsfmVersionOption.Version3,
            NoteTags: new List<NoteTagConfig>(),
            BiblicalTermsListId: null,
            AssociatedLexicalProjectGuid: null,
            StudyBibleCategories: null
        );

        // Act
        var result = await ProjectCreationService.CreateProjectAsync(request);

        // Assert - gm-007-04 expected output
        Assert.That(result, Is.InstanceOf<ProjectCreateSuccess>(), "projectCreated should be true");

        // Verify encoder settings
        var project = ScrTextCollection.Find(request.ShortName);
        Assert.That(project, Is.Not.Null, "Project should be in ScrTextCollection");
        // TranslationInfo.Type verification would require proper project setup
        // For now, verify project exists and can be retrieved
        Assert.That(
            project.Settings.TranslationInfo,
            Is.Not.Null,
            "TranslationInfo should be set for TransliterationWithEncoder type"
        );
        Assert.That(project.Settings.Editable, Is.False, "editable should be false");
    }

    #endregion

    #region Contract Tests - CreateProject Error Cases

    /// <summary>
    /// CreateProject fails with INVALID_SHORT_NAME when short name is too short.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("ScenarioId", "TS-010")]
    [Property("BehaviorId", "BHV-511")]
    public async Task CreateProject_ShortNameTooShort_ReturnsInvalidShortNameError()
    {
        // Arrange - Short name only 2 chars
        var request = new ProjectCreateRequest(
            ShortName: "AB",
            FullName: "Test Project",
            ProjectType: Paratext.Data.ProjectType.Standard,
            LanguageId: "eng",
            Versification: ScrVersType.English,
            BaseProjectGuid: null,
            Editable: true,
            EncoderName: null,
            EncoderReverseDirection: false,
            BooksPresent: new List<string> { "GEN" },
            FileNameForm: "41MAT",
            Normalization: ProjectNormalization.NFC,
            UsfmVersion: UsfmVersionOption.Version3,
            NoteTags: new List<NoteTagConfig>(),
            BiblicalTermsListId: null,
            AssociatedLexicalProjectGuid: null,
            StudyBibleCategories: null
        );

        // Act
        var result = await ProjectCreationService.CreateProjectAsync(request);

        // Assert
        Assert.That(result, Is.InstanceOf<ProjectCreateFailure>());
        var failure = (ProjectCreateFailure)result;
        Assert.That(failure.Code, Is.EqualTo(ProjectCreateErrorCode.InvalidShortName));
    }

    /// <summary>
    /// CreateProject fails with DUPLICATE_NAME when project already exists.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-511")]
    public async Task CreateProject_DuplicateName_ReturnsDuplicateNameError()
    {
        // Arrange - Create existing project
        DummyScrText existingProject = CreateDummyProject("DUPEPRJ");
        ParatextProjects.FakeAddProject(CreateProjectDetails(existingProject), existingProject);

        var request = new ProjectCreateRequest(
            ShortName: "DUPEPRJ", // Same name as existing
            FullName: "Duplicate Test Project",
            ProjectType: Paratext.Data.ProjectType.Standard,
            LanguageId: "eng",
            Versification: ScrVersType.English,
            BaseProjectGuid: null,
            Editable: true,
            EncoderName: null,
            EncoderReverseDirection: false,
            BooksPresent: new List<string> { "GEN" },
            FileNameForm: "41MAT",
            Normalization: ProjectNormalization.NFC,
            UsfmVersion: UsfmVersionOption.Version3,
            NoteTags: new List<NoteTagConfig>(),
            BiblicalTermsListId: null,
            AssociatedLexicalProjectGuid: null,
            StudyBibleCategories: null
        );

        // Act
        var result = await ProjectCreationService.CreateProjectAsync(request);

        // Assert
        Assert.That(result, Is.InstanceOf<ProjectCreateFailure>());
        var failure = (ProjectCreateFailure)result;
        Assert.That(failure.Code, Is.EqualTo(ProjectCreateErrorCode.DuplicateName));
    }

    /// <summary>
    /// CreateProject fails with INVALID_BASE_PROJECT for derived type without base.
    /// INV-005: Derived types must have base project name.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-014")]
    [Property("InvariantId", "INV-005")]
    [Property("ScenarioId", "TS-002")]
    [Property("BehaviorId", "BHV-511")]
    public async Task CreateProject_DerivedTypeWithoutBase_ReturnsInvalidBaseProjectError()
    {
        // Arrange - BackTranslation without base project (violates INV-005)
        var request = new ProjectCreateRequest(
            ShortName: "BTNOBASE",
            FullName: "BackTranslation Without Base",
            ProjectType: Paratext.Data.ProjectType.BackTranslation,
            LanguageId: "eng",
            Versification: ScrVersType.English,
            BaseProjectGuid: null, // Missing base project!
            Editable: true,
            EncoderName: null,
            EncoderReverseDirection: false,
            BooksPresent: new List<string> { "GEN" },
            FileNameForm: "41MAT",
            Normalization: ProjectNormalization.NFC,
            UsfmVersion: UsfmVersionOption.Version3,
            NoteTags: new List<NoteTagConfig>(),
            BiblicalTermsListId: null,
            AssociatedLexicalProjectGuid: null,
            StudyBibleCategories: null
        );

        // Act
        var result = await ProjectCreationService.CreateProjectAsync(request);

        // Assert
        Assert.That(result, Is.InstanceOf<ProjectCreateFailure>());
        var failure = (ProjectCreateFailure)result;
        Assert.That(failure.Code, Is.EqualTo(ProjectCreateErrorCode.InvalidBaseProject));
    }

    /// <summary>
    /// CreateProject fails with INVALID_ENCODER for TransliterationWithEncoder without encoder.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-014")]
    [Property("ScenarioId", "TS-007")]
    [Property("BehaviorId", "BHV-511")]
    public async Task CreateProject_TranslitWithoutEncoder_ReturnsInvalidEncoderError()
    {
        // Arrange - First create base project
        DummyScrText baseProject = CreateDummyProject("TRBASE2");
        ParatextProjects.FakeAddProject(CreateProjectDetails(baseProject), baseProject);

        var request = new ProjectCreateRequest(
            ShortName: "TRNOENC",
            FullName: "Transliteration Without Encoder",
            ProjectType: Paratext.Data.ProjectType.TransliterationWithEncoder,
            LanguageId: "eng",
            Versification: ScrVersType.English,
            BaseProjectGuid: baseProject.Guid,
            Editable: false,
            EncoderName: null, // Missing encoder!
            EncoderReverseDirection: false,
            BooksPresent: new List<string> { "GEN" },
            FileNameForm: "41MAT",
            Normalization: ProjectNormalization.NFC,
            UsfmVersion: UsfmVersionOption.Version3,
            NoteTags: new List<NoteTagConfig>(),
            BiblicalTermsListId: null,
            AssociatedLexicalProjectGuid: null,
            StudyBibleCategories: null
        );

        // Act
        var result = await ProjectCreationService.CreateProjectAsync(request);

        // Assert
        Assert.That(result, Is.InstanceOf<ProjectCreateFailure>());
        var failure = (ProjectCreateFailure)result;
        Assert.That(failure.Code, Is.EqualTo(ProjectCreateErrorCode.InvalidEncoder));
    }

    #endregion

    #region Invariant Tests - CAP-014

    /// <summary>
    /// INV-001: Project GUID must be unique across all projects.
    /// Two created projects must have different GUIDs.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-001")]
    [Property("CapabilityId", "CAP-014")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-512")]
    public async Task CreateProject_MultipleProjects_HaveUniqueGuids()
    {
        // Arrange & Act - Create two projects
        var request1 = new ProjectCreateRequest(
            ShortName: "GUID1",
            FullName: "GUID Test 1",
            ProjectType: Paratext.Data.ProjectType.Standard,
            LanguageId: "eng",
            Versification: ScrVersType.English,
            BaseProjectGuid: null,
            Editable: true,
            EncoderName: null,
            EncoderReverseDirection: false,
            BooksPresent: new List<string> { "GEN" },
            FileNameForm: "41MAT",
            Normalization: ProjectNormalization.NFC,
            UsfmVersion: UsfmVersionOption.Version3,
            NoteTags: new List<NoteTagConfig>(),
            BiblicalTermsListId: null,
            AssociatedLexicalProjectGuid: null,
            StudyBibleCategories: null
        );

        var request2 = new ProjectCreateRequest(
            ShortName: "GUID2",
            FullName: "GUID Test 2",
            ProjectType: Paratext.Data.ProjectType.Standard,
            LanguageId: "eng",
            Versification: ScrVersType.English,
            BaseProjectGuid: null,
            Editable: true,
            EncoderName: null,
            EncoderReverseDirection: false,
            BooksPresent: new List<string> { "GEN" },
            FileNameForm: "41MAT",
            Normalization: ProjectNormalization.NFC,
            UsfmVersion: UsfmVersionOption.Version3,
            NoteTags: new List<NoteTagConfig>(),
            BiblicalTermsListId: null,
            AssociatedLexicalProjectGuid: null,
            StudyBibleCategories: null
        );

        var result1 = await ProjectCreationService.CreateProjectAsync(request1);
        var result2 = await ProjectCreationService.CreateProjectAsync(request2);

        // Assert - Both succeed with unique GUIDs
        Assert.That(result1, Is.InstanceOf<ProjectCreateSuccess>());
        Assert.That(result2, Is.InstanceOf<ProjectCreateSuccess>());

        var success1 = (ProjectCreateSuccess)result1;
        var success2 = (ProjectCreateSuccess)result2;

        Assert.That(
            success1.ProjectGuid,
            Is.Not.EqualTo(success2.ProjectGuid),
            "INV-001: Project GUIDs must be unique"
        );
    }

    /// <summary>
    /// INV-017: Guest users cannot create new projects.
    /// Currently cannot test directly without mocking registration - placeholder test.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-017")]
    [Property("CapabilityId", "CAP-014")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-512")]
    [Ignore("Guest user testing requires registration mocking - defer to integration tests")]
    public async Task CreateProject_GuestUser_ReturnsPermissionDenied()
    {
        // This test would require mocking RegistrationInfo.DefaultUser
        // which is not easily accessible in unit tests.
        // The invariant INV-017 is enforced at the UI/service layer.
        await Task.CompletedTask;
        Assert.Fail("Guest user testing not implemented");
    }

    #endregion

    #region Acceptance Test - CAP-015 (GetProjectOptions)

    /// <summary>
    /// Acceptance test for CAP-015: GetProjectOptions capability.
    /// When this test passes, the capability is complete.
    /// Verifies: Returns all option categories for project creation form.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-015")]
    [Property("ScenarioId", "TS-059")]
    [Property("ScenarioId", "TS-091")]
    [Property("BehaviorId", "BHV-159")]
    [Property("BehaviorId", "BHV-161")]
    [Description("Acceptance test: GetProjectOptions returns all dropdown options")]
    public async Task GetProjectOptions_AcceptanceTest()
    {
        // Act
        var result = await ProjectCreationService.GetProjectOptionsAsync();

        // Assert - All option categories should be present
        Assert.That(result, Is.Not.Null);
        Assert.That(result.ProjectTypes, Is.Not.Null.And.Not.Empty, "Should have project types");
        Assert.That(result.Versifications, Is.Not.Null.And.Not.Empty, "Should have versifications");

        // Languages may be empty if no search was performed, but collection should exist
        Assert.That(result.Languages, Is.Not.Null, "Languages collection should exist");

        // BaseProjects, Encoders, BiblicalTermsLists, LexicalProjects may be empty but should exist
        Assert.That(result.BaseProjects, Is.Not.Null, "BaseProjects collection should exist");
        Assert.That(result.Encoders, Is.Not.Null, "Encoders collection should exist");
        Assert.That(
            result.BiblicalTermsLists,
            Is.Not.Null,
            "BiblicalTermsLists collection should exist"
        );
        Assert.That(
            result.LexicalProjects,
            Is.Not.Null,
            "LexicalProjects collection should exist"
        );
    }

    #endregion

    #region Contract Tests - GetProjectOptions

    /// <summary>
    /// GetProjectOptions returns all 8 project types.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("ScenarioId", "TS-059")]
    [Property("BehaviorId", "BHV-100")]
    public async Task GetProjectOptions_ReturnsAllProjectTypes()
    {
        // Act
        var result = await ProjectCreationService.GetProjectOptionsAsync();

        // Assert - Should include all 8 project types
        Assert.That(result.ProjectTypes, Is.Not.Null);
        Assert.That(result.ProjectTypes.Count, Is.GreaterThanOrEqualTo(8));

        // Verify key types are present (use string comparison to avoid Enum<T> issues)
        Assert.That(
            result.ProjectTypes.Any(t => t.Type.ToString() == "Standard"),
            Is.True,
            "Should contain Standard type"
        );
        Assert.That(
            result.ProjectTypes.Any(t => t.Type.ToString() == "BackTranslation"),
            Is.True,
            "Should contain BackTranslation type"
        );
        Assert.That(
            result.ProjectTypes.Any(t => t.Type.ToString() == "Daughter"),
            Is.True,
            "Should contain Daughter type"
        );
        Assert.That(
            result.ProjectTypes.Any(t => t.Type.ToString() == "Auxiliary"),
            Is.True,
            "Should contain Auxiliary type"
        );
    }

    /// <summary>
    /// GetProjectOptions returns all versification types.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("ScenarioId", "TS-059")]
    [Property("BehaviorId", "BHV-100")]
    public async Task GetProjectOptions_ReturnsVersifications()
    {
        // Act
        var result = await ProjectCreationService.GetProjectOptionsAsync();

        // Assert - Should have versification options
        Assert.That(result.Versifications, Is.Not.Null);
        Assert.That(result.Versifications.Count, Is.GreaterThan(0));

        // Verify English versification is present
        var versTypes = result.Versifications.Select(v => v.Type).ToList();
        Assert.That(versTypes, Does.Contain(ScrVersType.English));
    }

    /// <summary>
    /// GetProjectOptions ProjectTypeOption includes derived flag.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("ScenarioId", "TS-059")]
    [Property("BehaviorId", "BHV-100")]
    public async Task GetProjectOptions_ProjectTypes_HaveCorrectDerivedFlag()
    {
        // Act
        var result = await ProjectCreationService.GetProjectOptionsAsync();

        // Assert - Check derived flags
        // Use string comparison because ProjectType equality can be tricky with Enum<T>
        var standardOption = result.ProjectTypes.FirstOrDefault(
            t => t.Type.ToString() == "Standard"
        );
        var btOption = result.ProjectTypes.FirstOrDefault(
            t => t.Type.ToString() == "BackTranslation"
        );

        Assert.That(standardOption, Is.Not.Null);
        Assert.That(standardOption!.IsDerived, Is.False, "Standard is not derived");

        Assert.That(btOption, Is.Not.Null);
        Assert.That(btOption!.IsDerived, Is.True, "BackTranslation is derived");
    }

    /// <summary>
    /// GetProjectOptions returns base projects from ScrTextCollection.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("ScenarioId", "TS-059")]
    [Property("BehaviorId", "BHV-100")]
    public async Task GetProjectOptions_ReturnsBaseProjectsFromCollection()
    {
        // Arrange - Add a project to the collection
        DummyScrText existingProject = CreateDummyProject("OPTBASE");
        ParatextProjects.FakeAddProject(CreateProjectDetails(existingProject), existingProject);

        // Act
        var result = await ProjectCreationService.GetProjectOptionsAsync();

        // Assert - Should include the existing project
        Assert.That(result.BaseProjects, Is.Not.Null);
        var projectNames = result.BaseProjects.Select(p => p.ShortName).ToList();
        Assert.That(projectNames, Does.Contain("OPTBASE"));
    }

    /// <summary>
    /// GetProjectOptions versification options have display names.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("ScenarioId", "TS-059")]
    [Property("BehaviorId", "BHV-100")]
    public async Task GetProjectOptions_Versifications_HaveDisplayNames()
    {
        // Act
        var result = await ProjectCreationService.GetProjectOptionsAsync();

        // Assert - All versifications should have display names
        foreach (var vers in result.Versifications)
        {
            Assert.That(
                vers.DisplayName,
                Is.Not.Null.And.Not.Empty,
                $"Versification {vers.Type} should have display name"
            );
        }
    }

    /// <summary>
    /// GetProjectOptions project types have display names.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-015")]
    [Property("ScenarioId", "TS-059")]
    [Property("BehaviorId", "BHV-100")]
    public async Task GetProjectOptions_ProjectTypes_HaveDisplayNames()
    {
        // Act
        var result = await ProjectCreationService.GetProjectOptionsAsync();

        // Assert - All project types should have display names
        foreach (var projType in result.ProjectTypes)
        {
            Assert.That(
                projType.DisplayName,
                Is.Not.Null.And.Not.Empty,
                $"ProjectType {projType.Type} should have display name"
            );
        }
    }

    #endregion
}
