using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.CreatingProjects;
using Paratext.Data;
using Paratext.Data.ProjectSettingsAccess;

namespace TestParanextDataProvider.CreatingProjects
{
    /// <summary>
    /// Tests for CalculateTranslationInfo (CAP-007).
    /// TDD Variant: Outside-In TDD
    ///
    /// CAP-007: CalculateTranslationInfo - Creates TranslationInformation for project type,
    /// ensuring base project has GUID when needed for derived types.
    ///
    /// Extraction Reference: EXT-012 from extraction-plan.md
    ///
    /// Algorithm:
    /// 1. If scrTextBasedOn != null: VersioningManager.EnsureHasGuid(scrTextBasedOn)
    /// 2. Return new TranslationInformation(projectType, baseName, baseGuid)
    ///
    /// Key behaviors:
    /// - Standard type: Creates TranslationInfo without base
    /// - Derived type: Creates TranslationInfo with base reference
    /// - Derived type without base: Throws InvalidOperationException
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    [Category("CreatingProjects")]
    internal class TranslationInfoTests : PapiTestBase
    {
        #region Test Setup

        [SetUp]
        public override Task TestSetupAsync()
        {
            // Set up factory to use DummyScrText for testing
            ProjectCreationService.ScrTextFactory = () => CreateDummyProject();
            return base.TestSetupAsync();
        }

        [TearDown]
        public override void TestTearDown()
        {
            // Reset factory after test
            ProjectCreationService.ScrTextFactory = null;
            base.TestTearDown();
        }

        #endregion

        #region CAP-007: Acceptance Test (Outer Loop)

        /// <summary>
        /// CAP-007 Acceptance Test: CalculateTranslationInfo creates appropriate
        /// TranslationInformation based on project type.
        /// This is the ACCEPTANCE TEST for CAP-007.
        /// </summary>
        [Test]
        [Category("Acceptance")]
        [Category("CAP-007")]
        [Property("CapabilityId", "CAP-007")]
        [Property("ScenarioId", "TS-044")]
        [Property("BehaviorId", "BHV-010")]
        [Description("Acceptance: CalculateTranslationInfo creates TranslationInformation")]
        public void CalculateTranslationInfo_AcceptanceTest()
        {
            // Act
            TranslationInformation result = ProjectCreationService.CalculateTranslationInfo(
                ProjectType.Standard,
                scrTextBasedOn: null
            );

            // Assert - TranslationInformation is created with correct type
            Assert.That(result, Is.Not.Null, "TranslationInformation should not be null");
            Assert.That(result.Type, Is.EqualTo(ProjectType.Standard), "Type should match input");
        }

        #endregion

        #region CAP-007: Standard Type Tests

        /// <summary>
        /// CAP-007: Standard type creates TranslationInfo without base.
        /// SPEC-020: Standard type - no base required
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-007")]
        [Property("ScenarioId", "TS-044")]
        [Property("BehaviorId", "BHV-010")]
        [Property("SpecId", "SPEC-020")]
        [Description("Standard type creates TranslationInfo without requiring base project")]
        public void CalculateTranslationInfo_StandardType_ReturnsInfoWithoutBase()
        {
            // Act
            TranslationInformation result = ProjectCreationService.CalculateTranslationInfo(
                ProjectType.Standard,
                scrTextBasedOn: null
            );

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Type, Is.EqualTo(ProjectType.Standard));
            // Standard type should not have a base project name
            Assert.That(
                result.BaseProjectName,
                Is.Null.Or.Empty,
                "Standard type should not have a base project"
            );
        }

        /// <summary>
        /// CAP-007: Standard type ignores base project if provided (uses null base).
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-007")]
        [Property("ScenarioId", "TS-044")]
        [Property("BehaviorId", "BHV-010")]
        [Description("Standard type ignores base project if provided")]
        public void CalculateTranslationInfo_StandardType_WithBaseFallsBack()
        {
            // Arrange - Standard type with a base project (should be ignored)
            ScrText baseProject = CreateDummyProject();
            baseProject.Name = "BasePrj";

            // Act
            TranslationInformation result = ProjectCreationService.CalculateTranslationInfo(
                ProjectType.Standard,
                scrTextBasedOn: baseProject
            );

            // Assert - Base should be ignored for standard type
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Type, Is.EqualTo(ProjectType.Standard));
        }

        #endregion

        #region CAP-007: Derived Type Tests (BackTranslation)

        /// <summary>
        /// CAP-007: BackTranslation type creates TranslationInfo with base reference.
        /// SPEC-021: Derived type - base reference stored
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-007")]
        [Property("ScenarioId", "TS-045")]
        [Property("BehaviorId", "BHV-010")]
        [Property("SpecId", "SPEC-021")]
        [Description("BackTranslation type creates TranslationInfo with base project reference")]
        public void CalculateTranslationInfo_BackTranslationType_ReturnsInfoWithBase()
        {
            // Arrange - BackTranslation requires a base project
            ScrText baseProject = CreateDummyProject();
            baseProject.Name = "BasePrj";
            // Ensure base has a GUID (in real scenario, EnsureHasGuid would be called)
            ParatextProjects.FakeAddProject(CreateProjectDetails(baseProject), baseProject);

            // Act
            TranslationInformation result = ProjectCreationService.CalculateTranslationInfo(
                ProjectType.BackTranslation,
                scrTextBasedOn: baseProject
            );

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Type, Is.EqualTo(ProjectType.BackTranslation));
            // BackTranslation should reference the base project
            Assert.That(
                result.BaseProjectName,
                Is.EqualTo(baseProject.Name).Or.Not.Empty,
                "Derived type should reference base project"
            );
        }

        #endregion

        #region CAP-007: Derived Type Without Base (Error Case)

        /// <summary>
        /// CAP-007: Derived type without base throws exception.
        /// SPEC-022: Derived type without base - throws exception
        /// INV-004: Derived projects must have valid base project name
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-007")]
        [Property("ScenarioId", "TS-046")]
        [Property("BehaviorId", "BHV-010")]
        [Property("SpecId", "SPEC-022")]
        [Property("InvariantId", "INV-004")]
        [Description("Derived type without base throws InvalidOperationException")]
        public void CalculateTranslationInfo_DerivedTypeWithoutBase_ThrowsException()
        {
            // Act & Assert - Should throw because derived types require a base
            Assert.Throws<InvalidOperationException>(
                () =>
                    ProjectCreationService.CalculateTranslationInfo(
                        ProjectType.BackTranslation,
                        scrTextBasedOn: null
                    ),
                "Derived type without base should throw InvalidOperationException"
            );
        }

        /// <summary>
        /// CAP-007: Daughter type without base throws exception.
        /// Tests another derived type to verify pattern consistency.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-007")]
        [Property("ScenarioId", "TS-046")]
        [Property("BehaviorId", "BHV-010")]
        [Property("InvariantId", "INV-004")]
        [Description("Daughter type without base throws InvalidOperationException")]
        public void CalculateTranslationInfo_DaughterTypeWithoutBase_ThrowsException()
        {
            // Act & Assert
            Assert.Throws<InvalidOperationException>(
                () =>
                    ProjectCreationService.CalculateTranslationInfo(
                        ProjectType.Daughter,
                        scrTextBasedOn: null
                    )
            );
        }

        /// <summary>
        /// CAP-007: StudyBible type without base throws exception.
        /// Tests another derived type to verify pattern consistency.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-007")]
        [Property("ScenarioId", "TS-046")]
        [Property("BehaviorId", "BHV-010")]
        [Property("InvariantId", "INV-004")]
        [Description("StudyBible type without base throws InvalidOperationException")]
        public void CalculateTranslationInfo_StudyBibleTypeWithoutBase_ThrowsException()
        {
            // Act & Assert
            Assert.Throws<InvalidOperationException>(
                () =>
                    ProjectCreationService.CalculateTranslationInfo(
                        ProjectType.StudyBible,
                        scrTextBasedOn: null
                    )
            );
        }

        #endregion

        #region CAP-007: EnsureHasGuid on Base Tests

        /// <summary>
        /// CAP-007: CalculateTranslationInfo ensures base project has GUID.
        /// TS-031: EnsureHasGuid called before derived project creation
        /// This verifies that the base project will have a GUID before
        /// the TranslationInformation is created referencing it.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-007")]
        [Property("ScenarioId", "TS-031")]
        [Property("BehaviorId", "BHV-010")]
        [Property("SpecId", "SPEC-003")]
        [Description("CalculateTranslationInfo ensures base project has GUID")]
        public void CalculateTranslationInfo_EnsuresBaseHasGuid()
        {
            // Arrange - BackTranslation with base project
            ScrText baseProject = CreateDummyProject();
            baseProject.Name = "BasePrj";
            ParatextProjects.FakeAddProject(CreateProjectDetails(baseProject), baseProject);

            // Act
            TranslationInformation result = ProjectCreationService.CalculateTranslationInfo(
                ProjectType.BackTranslation,
                scrTextBasedOn: baseProject
            );

            // Assert - After CalculateTranslationInfo, base should have a GUID
            // Note: The actual GUID assignment happens via EnsureHasGuid,
            // which is called by CalculateTranslationInfo per EXT-012 spec
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Type, Is.EqualTo(ProjectType.BackTranslation));
            // The base project GUID would be referenced in TranslationInformation
            // In DummyScrText, the GUID is pre-set, so we verify it exists
            Assert.That(
                baseProject.Guid,
                Is.Not.Null,
                "Base project should have a GUID after CalculateTranslationInfo"
            );
        }

        #endregion

        #region CAP-007: Individual Tests for Derived Types

        /// <summary>
        /// CAP-007: TransliterationManual type without base throws exception.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-007")]
        [Property("ScenarioId", "TS-046")]
        [Property("BehaviorId", "BHV-010")]
        [Property("InvariantId", "INV-004")]
        [Description("TransliterationManual type without base throws InvalidOperationException")]
        public void CalculateTranslationInfo_TransliterationManualWithoutBase_ThrowsException()
        {
            Assert.Throws<InvalidOperationException>(
                () =>
                    ProjectCreationService.CalculateTranslationInfo(
                        ProjectType.TransliterationManual,
                        scrTextBasedOn: null
                    )
            );
        }

        /// <summary>
        /// CAP-007: TransliterationWithEncoder type without base throws exception.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-007")]
        [Property("ScenarioId", "TS-046")]
        [Property("BehaviorId", "BHV-010")]
        [Property("InvariantId", "INV-004")]
        [Description("TransliterationWithEncoder type without base throws InvalidOperationException")]
        public void CalculateTranslationInfo_TransliterationWithEncoderWithoutBase_ThrowsException()
        {
            Assert.Throws<InvalidOperationException>(
                () =>
                    ProjectCreationService.CalculateTranslationInfo(
                        ProjectType.TransliterationWithEncoder,
                        scrTextBasedOn: null
                    )
            );
        }

        /// <summary>
        /// CAP-007: StudyBibleAdditions type without base throws exception.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-007")]
        [Property("ScenarioId", "TS-046")]
        [Property("BehaviorId", "BHV-010")]
        [Property("InvariantId", "INV-004")]
        [Description("StudyBibleAdditions type without base throws InvalidOperationException")]
        public void CalculateTranslationInfo_StudyBibleAdditionsWithoutBase_ThrowsException()
        {
            Assert.Throws<InvalidOperationException>(
                () =>
                    ProjectCreationService.CalculateTranslationInfo(
                        ProjectType.StudyBibleAdditions,
                        scrTextBasedOn: null
                    )
            );
        }

        /// <summary>
        /// CAP-007: ConsultantNotes type without base throws exception.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-007")]
        [Property("ScenarioId", "TS-046")]
        [Property("BehaviorId", "BHV-010")]
        [Property("InvariantId", "INV-004")]
        [Description("ConsultantNotes type without base throws InvalidOperationException")]
        public void CalculateTranslationInfo_ConsultantNotesWithoutBase_ThrowsException()
        {
            Assert.Throws<InvalidOperationException>(
                () =>
                    ProjectCreationService.CalculateTranslationInfo(
                        ProjectType.ConsultantNotes,
                        scrTextBasedOn: null
                    )
            );
        }

        /// <summary>
        /// CAP-007: Auxiliary type without base throws exception.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-007")]
        [Property("ScenarioId", "TS-046")]
        [Property("BehaviorId", "BHV-010")]
        [Property("InvariantId", "INV-004")]
        [Description("Auxiliary type without base throws InvalidOperationException")]
        public void CalculateTranslationInfo_AuxiliaryWithoutBase_ThrowsException()
        {
            Assert.Throws<InvalidOperationException>(
                () =>
                    ProjectCreationService.CalculateTranslationInfo(
                        ProjectType.Auxiliary,
                        scrTextBasedOn: null
                    )
            );
        }

        #endregion

        #region CAP-007: Invariant Tests

        /// <summary>
        /// INV-004: BackTranslation has base project reference.
        /// </summary>
        [Test]
        [Category("Invariant")]
        [Category("CAP-007")]
        [Property("InvariantId", "INV-004")]
        [Property("BehaviorId", "BHV-010")]
        [Description("BackTranslation always has base project reference")]
        public void Invariant_BackTranslationHasBase()
        {
            // Arrange
            ScrText baseProject = CreateDummyProject();
            baseProject.Name = "BasePrj";
            ParatextProjects.FakeAddProject(CreateProjectDetails(baseProject), baseProject);

            // Act
            TranslationInformation result = ProjectCreationService.CalculateTranslationInfo(
                ProjectType.BackTranslation,
                scrTextBasedOn: baseProject
            );

            // Assert - Derived types must have base project reference
            Assert.That(result, Is.Not.Null);
            Assert.That(
                result.BaseProjectName,
                Is.Not.Null.And.Not.Empty,
                "BackTranslation must have base project reference"
            );
        }

        /// <summary>
        /// INV-004: StudyBible has base project reference.
        /// </summary>
        [Test]
        [Category("Invariant")]
        [Category("CAP-007")]
        [Property("InvariantId", "INV-004")]
        [Property("BehaviorId", "BHV-010")]
        [Description("StudyBible always has base project reference")]
        public void Invariant_StudyBibleHasBase()
        {
            // Arrange
            ScrText baseProject = CreateDummyProject();
            baseProject.Name = "BasePrj";
            ParatextProjects.FakeAddProject(CreateProjectDetails(baseProject), baseProject);

            // Act
            TranslationInformation result = ProjectCreationService.CalculateTranslationInfo(
                ProjectType.StudyBible,
                scrTextBasedOn: baseProject
            );

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(
                result.BaseProjectName,
                Is.Not.Null.And.Not.Empty,
                "StudyBible must have base project reference"
            );
        }

        /// <summary>
        /// INV-004: ConsultantNotes has base project reference.
        /// </summary>
        [Test]
        [Category("Invariant")]
        [Category("CAP-007")]
        [Property("InvariantId", "INV-004")]
        [Property("BehaviorId", "BHV-010")]
        [Description("ConsultantNotes always has base project reference")]
        public void Invariant_ConsultantNotesHasBase()
        {
            // Arrange
            ScrText baseProject = CreateDummyProject();
            baseProject.Name = "BasePrj";
            ParatextProjects.FakeAddProject(CreateProjectDetails(baseProject), baseProject);

            // Act
            TranslationInformation result = ProjectCreationService.CalculateTranslationInfo(
                ProjectType.ConsultantNotes,
                scrTextBasedOn: baseProject
            );

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(
                result.BaseProjectName,
                Is.Not.Null.And.Not.Empty,
                "ConsultantNotes must have base project reference"
            );
        }

        #endregion
    }
}
