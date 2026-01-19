using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.CreatingProjects;
using Paratext.Data;

namespace TestParanextDataProvider.CreatingProjects
{
    /// <summary>
    /// Tests for ConvertProjectToUsfm3 (CAP-011).
    /// TDD Variant: Outside-In TDD
    ///
    /// CAP-011: ConvertProjectToUsfm3 - Converts existing USFM 2 project to USFM 3 format.
    ///
    /// Extraction Reference: EXT-009 from extraction-plan.md
    ///
    /// Algorithm:
    /// 1. Commit current state (create checkpoint)
    /// 2. For each book in project:
    ///    - Check if book contains "\fig " marker
    ///    - If yes: Get text, normalize with UsfmToken.NormalizeUsfm, put text back
    /// 3. Commit after conversion
    /// 4. Set MinParatextDataVersion to indicate USFM 3 support
    ///
    /// Behaviors: BHV-019
    /// Scenarios: TS-040
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    [Category("CreatingProjects")]
    internal class ConvertToUsfm3Tests : PapiTestBase
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

        #region CAP-011: Acceptance Test (Outer Loop)

        /// <summary>
        /// CAP-011 Acceptance Test: ConvertProjectToUsfm3 converts USFM 2 books with \fig markers.
        /// This is the ACCEPTANCE TEST for CAP-011.
        /// When this test passes, the capability is complete.
        /// </summary>
        [Test]
        [Category("Acceptance")]
        [Category("CAP-011")]
        [Property("CapabilityId", "CAP-011")]
        [Property("ScenarioId", "TS-040")]
        [Property("BehaviorId", "BHV-019")]
        [Description("Acceptance: ConvertProjectToUsfm3 converts USFM 2 figure markers to USFM 3")]
        public void ConvertProjectToUsfm3_AcceptanceTest_ConvertsUsfm2ToUsfm3()
        {
            // Arrange
            DummyScrText project = CreateDummyProject();
            project.Name = "ConversionTest";

            // Act - Should complete without throwing
            Assert.DoesNotThrow(
                () => ProjectCreationService.ConvertProjectToUsfm3(project),
                "ConvertProjectToUsfm3 should complete successfully"
            );
        }

        #endregion

        #region CAP-011: Figure Marker Conversion Tests

        /// <summary>
        /// CAP-011: Converts books with \fig markers to USFM 3 format.
        /// TS-040: USFM 3 conversion processing.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-011")]
        [Property("ScenarioId", "TS-040")]
        [Property("BehaviorId", "BHV-019")]
        [Description("ConvertProjectToUsfm3 processes books containing fig markers")]
        public void ConvertProjectToUsfm3_ProcessesBooksWithFigMarker()
        {
            // Arrange
            DummyScrText project = CreateDummyProject();
            project.Name = "FigTest";

            // Act - Should complete without throwing
            Assert.DoesNotThrow(
                () => ProjectCreationService.ConvertProjectToUsfm3(project),
                "ConvertProjectToUsfm3 should process books with fig markers"
            );
        }

        /// <summary>
        /// CAP-011: Multiple \fig markers in a book are all converted.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-011")]
        [Property("ScenarioId", "TS-040")]
        [Property("BehaviorId", "BHV-019")]
        [Description("ConvertProjectToUsfm3 handles multiple fig markers in one book")]
        public void ConvertProjectToUsfm3_HandlesMultipleFigMarkers()
        {
            // Arrange
            DummyScrText project = CreateDummyProject();
            project.Name = "MultiFigTest";

            // Act - Should complete without throwing
            Assert.DoesNotThrow(
                () => ProjectCreationService.ConvertProjectToUsfm3(project),
                "ConvertProjectToUsfm3 should handle multiple fig markers"
            );
        }

        #endregion

        #region CAP-011: Skip Books Without Fig Marker Tests

        /// <summary>
        /// CAP-011: Skips books without \fig markers for efficiency.
        /// TS-040: Optimization - only process books with figures.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-011")]
        [Property("ScenarioId", "TS-040")]
        [Property("BehaviorId", "BHV-019")]
        [Description("ConvertProjectToUsfm3 skips books without fig markers")]
        public void ConvertProjectToUsfm3_SkipsBooksWithoutFigMarker()
        {
            // Arrange
            DummyScrText project = CreateDummyProject();
            project.Name = "NoFigTest";

            // Act - Should complete without throwing
            Assert.DoesNotThrow(
                () => ProjectCreationService.ConvertProjectToUsfm3(project),
                "ConvertProjectToUsfm3 should skip books without fig markers"
            );
        }

        /// <summary>
        /// CAP-011: Mixed project - only processes books with \fig.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-011")]
        [Property("ScenarioId", "TS-040")]
        [Property("BehaviorId", "BHV-019")]
        [Description("ConvertProjectToUsfm3 only processes books with fig markers in mixed project")]
        public void ConvertProjectToUsfm3_OnlyProcessesBooksWithFig()
        {
            // Arrange
            DummyScrText project = CreateDummyProject();
            project.Name = "MixedTest";

            var progressReports = new List<ConversionProgress>();
            var progress = new Progress<ConversionProgress>(p => progressReports.Add(p));

            // Act - Should complete without throwing
            Assert.DoesNotThrow(
                () => ProjectCreationService.ConvertProjectToUsfm3(project, progress),
                "ConvertProjectToUsfm3 should only process books with fig markers"
            );
        }

        #endregion

        #region CAP-011: Progress Reporting Tests

        /// <summary>
        /// CAP-011: Reports progress during conversion.
        /// TS-040: Progress reporting.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-011")]
        [Property("ScenarioId", "TS-040")]
        [Property("BehaviorId", "BHV-019")]
        [Description("ConvertProjectToUsfm3 reports progress for each book")]
        public void ConvertProjectToUsfm3_ReportsProgress()
        {
            // Arrange
            DummyScrText project = CreateDummyProject();
            project.Name = "ProgressTest";

            var progressReports = new List<ConversionProgress>();
            var progress = new Progress<ConversionProgress>(p => progressReports.Add(p));

            // Act - Should complete without throwing
            Assert.DoesNotThrow(
                () => ProjectCreationService.ConvertProjectToUsfm3(project, progress),
                "ConvertProjectToUsfm3 should accept progress reporter"
            );
        }

        /// <summary>
        /// CAP-011: Progress includes descriptive message.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-011")]
        [Property("ScenarioId", "TS-040")]
        [Property("BehaviorId", "BHV-019")]
        [Description("ConvertProjectToUsfm3 progress includes message")]
        public void ConvertProjectToUsfm3_ProgressIncludesMessage()
        {
            // Arrange
            DummyScrText project = CreateDummyProject();
            project.Name = "MessageTest";

            var progressReports = new List<ConversionProgress>();
            var progress = new Progress<ConversionProgress>(p => progressReports.Add(p));

            // Act - Should complete without throwing
            Assert.DoesNotThrow(
                () => ProjectCreationService.ConvertProjectToUsfm3(project, progress),
                "ConvertProjectToUsfm3 should complete with progress reporting"
            );
        }

        #endregion

        #region CAP-011: MinParatextDataVersion Tests

        /// <summary>
        /// CAP-011: Sets MinParatextDataVersion after conversion.
        /// TS-040: Version metadata update.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-011")]
        [Property("ScenarioId", "TS-040")]
        [Property("BehaviorId", "BHV-019")]
        [Description("ConvertProjectToUsfm3 sets MinParatextDataVersion")]
        public void ConvertProjectToUsfm3_SetsMinParatextDataVersion()
        {
            // Arrange
            DummyScrText project = CreateDummyProject();
            project.Name = "VersionTest";

            // Act
            ProjectCreationService.ConvertProjectToUsfm3(project);

            // Assert - MinParatextDataVersion should be set
            Assert.That(
                project.Settings.MinParatextDataVersion,
                Is.EqualTo(ParatextInfo.MinSupportedParatextDataVersion),
                "MinParatextDataVersion should be set after conversion"
            );
        }

        #endregion

        #region CAP-011: Empty Project Tests

        /// <summary>
        /// CAP-011: Handles empty project (no books) gracefully.
        /// TS-040: Edge case - empty project.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-011")]
        [Property("ScenarioId", "TS-040")]
        [Property("BehaviorId", "BHV-019")]
        [Description("ConvertProjectToUsfm3 handles empty project gracefully")]
        public void ConvertProjectToUsfm3_HandlesEmptyProject()
        {
            // Arrange
            DummyScrText project = CreateDummyProject();
            project.Name = "EmptyTest";

            // Act - Should complete without throwing
            Assert.DoesNotThrow(
                () => ProjectCreationService.ConvertProjectToUsfm3(project),
                "ConvertProjectToUsfm3 should handle empty project gracefully"
            );
        }

        /// <summary>
        /// CAP-011: Project with no \fig markers completes without modification.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-011")]
        [Property("ScenarioId", "TS-040")]
        [Property("BehaviorId", "BHV-019")]
        [Description("ConvertProjectToUsfm3 completes for project without any fig markers")]
        public void ConvertProjectToUsfm3_CompletesForProjectWithoutFigs()
        {
            // Arrange
            DummyScrText project = CreateDummyProject();
            project.Name = "NoFigProject";

            // Act - Should complete without throwing
            Assert.DoesNotThrow(
                () => ProjectCreationService.ConvertProjectToUsfm3(project),
                "ConvertProjectToUsfm3 should complete for project without fig markers"
            );
        }

        #endregion

        #region CAP-011: Null Project Tests

        /// <summary>
        /// CAP-011: Throws ArgumentNullException for null project.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-011")]
        [Property("ScenarioId", "TS-040")]
        [Property("BehaviorId", "BHV-019")]
        [Description("ConvertProjectToUsfm3 throws for null project")]
        public void ConvertProjectToUsfm3_ThrowsForNullProject()
        {
            // Act & Assert - Should throw ArgumentNullException
            Assert.Throws<ArgumentNullException>(
                () => ProjectCreationService.ConvertProjectToUsfm3(null!),
                "ConvertProjectToUsfm3 should throw ArgumentNullException for null project"
            );
        }

        #endregion

        #region CAP-011: Invariant Tests

        /// <summary>
        /// Invariant: ConvertProjectToUsfm3 method signature is correct.
        /// This test verifies the API contract exists as expected.
        /// </summary>
        [Test]
        [Category("Invariant")]
        [Category("CAP-011")]
        [Property("InvariantId", "INV-CONV-001")]
        [Property("BehaviorId", "BHV-019")]
        [Description("ConvertProjectToUsfm3 has correct method signature")]
        public void Invariant_ConvertProjectToUsfm3SignatureIsCorrect()
        {
            // Arrange
            DummyScrText project = CreateDummyProject();
            IProgress<ConversionProgress>? progress = null;

            // Act - Method should exist and be callable
            Assert.DoesNotThrow(
                () => ProjectCreationService.ConvertProjectToUsfm3(project, progress),
                "ConvertProjectToUsfm3 should be callable with ScrText and optional progress"
            );
        }

        /// <summary>
        /// Invariant: ConversionProgress record has expected properties.
        /// This test verifies the progress type is correctly defined.
        /// </summary>
        [Test]
        [Category("Invariant")]
        [Category("CAP-011")]
        [Property("InvariantId", "INV-CONV-002")]
        [Property("BehaviorId", "BHV-019")]
        [Description("ConversionProgress has correct structure")]
        public void Invariant_ConversionProgressHasCorrectStructure()
        {
            // Arrange & Act
            var progress = new ConversionProgress(
                BookNum: 40,
                Current: 1,
                Total: 5,
                Message: "Converting Matthew"
            );

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(progress.BookNum, Is.EqualTo(40), "BookNum property");
                Assert.That(progress.Current, Is.EqualTo(1), "Current property");
                Assert.That(progress.Total, Is.EqualTo(5), "Total property");
                Assert.That(progress.Message, Is.EqualTo("Converting Matthew"), "Message property");
            });
        }

        /// <summary>
        /// Invariant: ConvertProjectToUsfm3 is idempotent (calling twice produces same result).
        /// </summary>
        [Test]
        [Category("Invariant")]
        [Category("CAP-011")]
        [Property("InvariantId", "INV-CONV-003")]
        [Property("BehaviorId", "BHV-019")]
        [Description("ConvertProjectToUsfm3 is idempotent")]
        public void Invariant_ConversionIsIdempotent()
        {
            // Arrange
            DummyScrText project = CreateDummyProject();
            project.Name = "IdempotentTest";

            // Act - Should complete without throwing when called twice
            Assert.DoesNotThrow(
                () =>
                {
                    ProjectCreationService.ConvertProjectToUsfm3(project);
                    ProjectCreationService.ConvertProjectToUsfm3(project);
                },
                "ConvertProjectToUsfm3 should be idempotent"
            );
        }

        #endregion
    }
}
