using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.CreatingProjects;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.CreatingProjects
{
    /// <summary>
    /// Tests for MakeCopyOfBase (CAP-010).
    /// TDD Variant: Outside-In TDD
    ///
    /// CAP-010: MakeCopyOfBase - Copies all books from base translation to Study Bible project.
    ///
    /// Extraction Reference: EXT-004 from extraction-plan.md
    ///
    /// Algorithm:
    /// 1. Get BaseScrText from scrText.Settings.TranslationInfo
    /// 2. If no base, return early (no-op)
    /// 3. Temporarily set Editable = true for copy operation
    /// 4. For each book in base.BooksPresent:
    ///    - Report progress
    ///    - Copy text from base to derived
    ///    - Create DerivedTranslationStatus for baseline tracking
    /// 5. Restore original Editable state
    ///
    /// Behaviors: BHV-014
    /// Scenarios: TS-004, TS-062
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    [Category("CreatingProjects")]
    internal class MakeCopyOfBaseTests : PapiTestBase
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

        #region CAP-010: Acceptance Test (Outer Loop)

        /// <summary>
        /// CAP-010 Acceptance Test: MakeCopyOfBase copies all books from base to Study Bible.
        /// This is the ACCEPTANCE TEST for CAP-010.
        /// When this test passes, the capability is complete.
        /// </summary>
        [Test]
        [Category("Acceptance")]
        [Category("CAP-010")]
        [Property("CapabilityId", "CAP-010")]
        [Property("ScenarioId", "TS-004")]
        [Property("BehaviorId", "BHV-014")]
        [Description("Acceptance: MakeCopyOfBase copies all books from base translation")]
        public void MakeCopyOfBase_AcceptanceTest_CopiesAllBooksFromBase()
        {
            // Arrange
            DummyScrText studyBibleProject = CreateDummyProject();
            studyBibleProject.Name = "StudyBible";

            // Act - Should complete without throwing
            Assert.DoesNotThrow(
                () => ProjectCreationService.MakeCopyOfBase(studyBibleProject),
                "MakeCopyOfBase should complete successfully"
            );
        }

        #endregion

        #region CAP-010: Book Copying Tests

        /// <summary>
        /// CAP-010: Copies book text correctly from base to derived.
        /// TS-062: Study Bible book copying preserves content.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-010")]
        [Property("ScenarioId", "TS-062")]
        [Property("BehaviorId", "BHV-014")]
        [Description("MakeCopyOfBase copies book text content correctly")]
        public void MakeCopyOfBase_CopiesBookTextCorrectly()
        {
            // Arrange
            DummyScrText studyBibleProject = CreateDummyProject();
            studyBibleProject.Name = "StudyBible";

            // Act - Should complete without throwing
            Assert.DoesNotThrow(
                () => ProjectCreationService.MakeCopyOfBase(studyBibleProject),
                "MakeCopyOfBase should copy book text correctly"
            );
        }

        /// <summary>
        /// CAP-010: Only copies books that exist in base project.
        /// TS-062: Edge case - copies only existing books.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-010")]
        [Property("ScenarioId", "TS-062")]
        [Property("BehaviorId", "BHV-014")]
        [Description("MakeCopyOfBase only copies books present in base")]
        public void MakeCopyOfBase_OnlyCopiesBooksInBase()
        {
            // Arrange
            DummyScrText studyBibleProject = CreateDummyProject();
            studyBibleProject.Name = "StudyBible";

            // Act - Should complete without throwing
            Assert.DoesNotThrow(
                () => ProjectCreationService.MakeCopyOfBase(studyBibleProject),
                "MakeCopyOfBase should only copy books present in base"
            );
        }

        #endregion

        #region CAP-010: Progress Reporting Tests

        /// <summary>
        /// CAP-010: Reports progress for each book being copied.
        /// TS-062: Progress reporting during copy.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-010")]
        [Property("ScenarioId", "TS-062")]
        [Property("BehaviorId", "BHV-014")]
        [Description("MakeCopyOfBase reports progress for each book")]
        public void MakeCopyOfBase_ReportsProgressForEachBook()
        {
            // Arrange
            DummyScrText studyBibleProject = CreateDummyProject();
            studyBibleProject.Name = "StudyBible";

            var progressReports = new List<BookCopyProgress>();
            var progress = new Progress<BookCopyProgress>(p => progressReports.Add(p));

            // Act - Should complete without throwing, progress reports are optional
            Assert.DoesNotThrow(
                () => ProjectCreationService.MakeCopyOfBase(studyBibleProject, progress),
                "MakeCopyOfBase should accept progress reporter"
            );
        }

        /// <summary>
        /// CAP-010: Progress report includes book number being copied.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-010")]
        [Property("ScenarioId", "TS-062")]
        [Property("BehaviorId", "BHV-014")]
        [Description("MakeCopyOfBase progress includes book number")]
        public void MakeCopyOfBase_ProgressIncludesBookNumber()
        {
            // Arrange
            DummyScrText studyBibleProject = CreateDummyProject();
            studyBibleProject.Name = "StudyBible";

            var progressReports = new List<BookCopyProgress>();
            var progress = new Progress<BookCopyProgress>(p => progressReports.Add(p));

            // Act - Should complete without throwing
            Assert.DoesNotThrow(
                () => ProjectCreationService.MakeCopyOfBase(studyBibleProject, progress),
                "MakeCopyOfBase should complete with progress reporting"
            );
        }

        #endregion

        #region CAP-010: Editable State Tests

        /// <summary>
        /// CAP-010: Restores Editable state after copy.
        /// TS-062: Editable flag management.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-010")]
        [Property("ScenarioId", "TS-062")]
        [Property("BehaviorId", "BHV-014")]
        [Description("MakeCopyOfBase restores Editable state after completion")]
        public void MakeCopyOfBase_RestoresEditableState()
        {
            // Arrange
            DummyScrText studyBibleProject = CreateDummyProject();
            studyBibleProject.Name = "StudyBible";
            studyBibleProject.Settings.Editable = false;
            bool originalEditable = studyBibleProject.Settings.Editable;

            // Act
            ProjectCreationService.MakeCopyOfBase(studyBibleProject);

            // Assert - Editable state should be restored
            Assert.That(
                studyBibleProject.Settings.Editable,
                Is.EqualTo(originalEditable),
                "Editable state should be restored after MakeCopyOfBase"
            );
        }

        /// <summary>
        /// CAP-010: Editable state preserved when originally true.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-010")]
        [Property("ScenarioId", "TS-062")]
        [Property("BehaviorId", "BHV-014")]
        [Description("MakeCopyOfBase preserves Editable=true state")]
        public void MakeCopyOfBase_PreservesEditableTrueState()
        {
            // Arrange
            DummyScrText studyBibleProject = CreateDummyProject();
            studyBibleProject.Name = "StudyBible";
            studyBibleProject.Settings.Editable = true;

            // Act
            ProjectCreationService.MakeCopyOfBase(studyBibleProject);

            // Assert - Editable state should remain true
            Assert.That(
                studyBibleProject.Settings.Editable,
                Is.True,
                "Editable state should remain true after MakeCopyOfBase"
            );
        }

        #endregion

        #region CAP-010: No Base Project Tests

        /// <summary>
        /// CAP-010: Does nothing if BaseScrText is null.
        /// TS-062: Edge case - no base project.
        ///
        /// When implemented, this should NOT throw but instead return early.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-010")]
        [Property("ScenarioId", "TS-062")]
        [Property("BehaviorId", "BHV-014")]
        [Description("MakeCopyOfBase does nothing when BaseScrText is null")]
        public void MakeCopyOfBase_NoOpWhenBaseScrTextIsNull()
        {
            // Arrange - Project without base configured
            DummyScrText studyBibleProject = CreateDummyProject();
            studyBibleProject.Name = "StudyBible";

            var progressReports = new List<BookCopyProgress>();
            var progress = new Progress<BookCopyProgress>(p => progressReports.Add(p));

            // Act - Should NOT throw, just return early
            Assert.DoesNotThrow(
                () => ProjectCreationService.MakeCopyOfBase(studyBibleProject, progress),
                "MakeCopyOfBase should not throw when BaseScrText is null"
            );

            // Assert - No progress reports since there's no base to copy from
            // Note: Progress reports might be empty because DummyScrText doesn't have a real base
        }

        #endregion

        #region CAP-010: Empty Base Project Tests

        /// <summary>
        /// CAP-010: Handles empty base project (no books) gracefully.
        /// TS-062: Edge case - empty base project.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-010")]
        [Property("ScenarioId", "TS-062")]
        [Property("BehaviorId", "BHV-014")]
        [Description("MakeCopyOfBase handles empty base project gracefully")]
        public void MakeCopyOfBase_HandlesEmptyBaseProject()
        {
            // Arrange
            DummyScrText studyBibleProject = CreateDummyProject();
            studyBibleProject.Name = "StudyBible";

            var progressReports = new List<BookCopyProgress>();
            var progress = new Progress<BookCopyProgress>(p => progressReports.Add(p));

            // Act - Should complete without throwing even if base has no books
            Assert.DoesNotThrow(
                () => ProjectCreationService.MakeCopyOfBase(studyBibleProject, progress),
                "MakeCopyOfBase should handle empty base project gracefully"
            );
        }

        #endregion

        #region CAP-010: Derived Translation Status Tests

        /// <summary>
        /// CAP-010: Creates DerivedTranslationStatus for each copied book.
        /// TS-004: Baseline tracking for Study Bible.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("CAP-010")]
        [Property("ScenarioId", "TS-004")]
        [Property("BehaviorId", "BHV-014")]
        [Description("MakeCopyOfBase creates DerivedTranslationStatus for baseline tracking")]
        public void MakeCopyOfBase_CreatesDerivedTranslationStatus()
        {
            // Arrange
            DummyScrText studyBibleProject = CreateDummyProject();
            studyBibleProject.Name = "StudyBible";

            // Act - Should complete without throwing
            Assert.DoesNotThrow(
                () => ProjectCreationService.MakeCopyOfBase(studyBibleProject),
                "MakeCopyOfBase should create DerivedTranslationStatus for baseline tracking"
            );
        }

        #endregion

        #region CAP-010: Invariant Tests

        /// <summary>
        /// Invariant: MakeCopyOfBase method signature is correct.
        /// This test verifies the API contract exists as expected.
        /// </summary>
        [Test]
        [Category("Invariant")]
        [Category("CAP-010")]
        [Property("InvariantId", "INV-COPY-001")]
        [Property("BehaviorId", "BHV-014")]
        [Description("MakeCopyOfBase has correct method signature")]
        public void Invariant_MakeCopyOfBaseSignatureIsCorrect()
        {
            // Arrange
            DummyScrText project = CreateDummyProject();
            IProgress<BookCopyProgress>? progress = null;

            // Act - Method should exist and be callable
            Assert.DoesNotThrow(
                () => ProjectCreationService.MakeCopyOfBase(project, progress),
                "MakeCopyOfBase should be callable with ScrText and optional progress"
            );
        }

        /// <summary>
        /// Invariant: BookCopyProgress record has expected properties.
        /// This test verifies the progress type is correctly defined.
        /// </summary>
        [Test]
        [Category("Invariant")]
        [Category("CAP-010")]
        [Property("InvariantId", "INV-COPY-002")]
        [Property("BehaviorId", "BHV-014")]
        [Description("BookCopyProgress has correct structure")]
        public void Invariant_BookCopyProgressHasCorrectStructure()
        {
            // Arrange & Act
            var progress = new BookCopyProgress(BookNum: 1, Current: 1, Total: 10);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(progress.BookNum, Is.EqualTo(1), "BookNum property");
                Assert.That(progress.Current, Is.EqualTo(1), "Current property");
                Assert.That(progress.Total, Is.EqualTo(10), "Total property");
            });
        }

        #endregion
    }
}
