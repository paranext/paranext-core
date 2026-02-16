using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ManageBooks;
using Paranext.DataProvider.Projects;

namespace TestParanextDataProvider.ManageBooks
{
    /// <summary>
    /// Tests for BookComparisonService display styling (CAP-022).
    ///
    /// These tests verify the BookDisplayStyling capability which maps comparison
    /// states to visual styling information for the copy books dialog.
    ///
    /// Extraction: EXT-008 (PT9/Paratext/FileMenu/ImportBooksForm.cs:114-156)
    /// Behavior: BHV-T009 (Copy books newer version shown in bold)
    /// Scenario: TS-066 (Copy books newer version shown in bold)
    /// Golden Master: gm-016-copy-newer-bold
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class BookComparisonServiceTests : PapiTestBase
    {
        #region Acceptance Test (Outer Loop)

        /// <summary>
        /// Acceptance test for CAP-022: BookDisplayStyling capability.
        /// This test verifies the complete workflow - when it passes, the capability is complete.
        ///
        /// The test calls GetDisplayStyle with different ComparisonResult values and verifies
        /// that the correct BookDisplayStyle is returned for each case.
        ///
        /// Related to gm-016: Copy books newer version shown in bold.
        /// </summary>
        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-022")]
        [Property("ScenarioId", "TS-066")]
        [Property("ExtractionId", "EXT-008")]
        [Property("BehaviorId", "BHV-T009")]
        [Property("GoldenMasterId", "gm-016")]
        [Description("Acceptance test: GetDisplayStyle maps all comparison states to correct styling")]
        public void GetDisplayStyle_AcceptanceTest()
        {
            // Act & Assert: Test each ComparisonResult maps to correct styling

            // SourceNewer -> Source column should be bold (newer books shown in bold)
            var sourceNewerStyle = BookComparisonService.GetDisplayStyle(ComparisonResult.SourceNewer);
            Assert.That(sourceNewerStyle.SourceBold, Is.True, "Source should be bold when source is newer");
            Assert.That(sourceNewerStyle.DestBold, Is.False, "Dest should not be bold when source is newer");
            Assert.That(sourceNewerStyle.SourceGray, Is.False, "Source should not be gray when source is newer");
            Assert.That(sourceNewerStyle.DestGray, Is.False, "Dest should not be gray when source is newer");

            // DestNewer -> Destination column should be bold
            var destNewerStyle = BookComparisonService.GetDisplayStyle(ComparisonResult.DestNewer);
            Assert.That(destNewerStyle.SourceBold, Is.False, "Source should not be bold when dest is newer");
            Assert.That(destNewerStyle.DestBold, Is.True, "Dest should be bold when dest is newer");
            Assert.That(destNewerStyle.SourceGray, Is.False, "Source should not be gray when dest is newer");
            Assert.That(destNewerStyle.DestGray, Is.False, "Dest should not be gray when dest is newer");

            // Same -> Both columns regular (no special styling)
            var sameStyle = BookComparisonService.GetDisplayStyle(ComparisonResult.Same);
            Assert.That(sameStyle.SourceBold, Is.False, "Source should not be bold when same");
            Assert.That(sameStyle.DestBold, Is.False, "Dest should not be bold when same");
            Assert.That(sameStyle.SourceGray, Is.False, "Source should not be gray when same");
            Assert.That(sameStyle.DestGray, Is.False, "Dest should not be gray when same");

            // OnlyInSource -> Dest column should be gray (missing)
            var onlyInSourceStyle = BookComparisonService.GetDisplayStyle(ComparisonResult.OnlyInSource);
            Assert.That(onlyInSourceStyle.SourceBold, Is.False, "Source should not be bold when only in source");
            Assert.That(onlyInSourceStyle.DestGray, Is.True, "Dest should be gray when only in source");

            // OnlyInDest -> Source column should be gray (missing)
            var onlyInDestStyle = BookComparisonService.GetDisplayStyle(ComparisonResult.OnlyInDest);
            Assert.That(onlyInDestStyle.SourceGray, Is.True, "Source should be gray when only in dest");
            Assert.That(onlyInDestStyle.DestBold, Is.False, "Dest should not be bold when only in dest");
        }

        #endregion

        #region Contract Tests - SourceNewer (gm-016 / BHV-T009)

        /// <summary>
        /// TS-066: When source book is newer, it should be displayed in bold.
        /// This is the primary golden master scenario (gm-016-copy-newer-bold).
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("GoldenMaster")]
        [Property("ScenarioId", "TS-066")]
        [Property("ExtractionId", "EXT-008")]
        [Property("BehaviorId", "BHV-T009")]
        [Property("GoldenMasterId", "gm-016")]
        [Description("Source book newer than destination should be bold in source column")]
        public void GetDisplayStyle_SourceNewer_ReturnsSourceBold()
        {
            // Arrange
            var comparisonResult = ComparisonResult.SourceNewer;

            // Act
            var style = BookComparisonService.GetDisplayStyle(comparisonResult);

            // Assert: Source column should be bold, dest column regular
            Assert.That(style.SourceBold, Is.True, "Source column should be bold for newer book");
            Assert.That(style.DestBold, Is.False, "Dest column should not be bold");
            Assert.That(style.SourceGray, Is.False, "Source column should not be gray");
            Assert.That(style.DestGray, Is.False, "Dest column should not be gray");
        }

        #endregion

        #region Contract Tests - DestNewer

        /// <summary>
        /// TS-066 variant: When destination book is newer, it should be displayed in bold.
        /// The newer book is always shown in bold, regardless of which column.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-066")]
        [Property("ExtractionId", "EXT-008")]
        [Property("BehaviorId", "BHV-T009")]
        [Description("Destination book newer than source should be bold in dest column")]
        public void GetDisplayStyle_DestNewer_ReturnsDestBold()
        {
            // Arrange
            var comparisonResult = ComparisonResult.DestNewer;

            // Act
            var style = BookComparisonService.GetDisplayStyle(comparisonResult);

            // Assert: Dest column should be bold, source column regular
            Assert.That(style.SourceBold, Is.False, "Source column should not be bold");
            Assert.That(style.DestBold, Is.True, "Dest column should be bold for newer book");
            Assert.That(style.SourceGray, Is.False, "Source column should not be gray");
            Assert.That(style.DestGray, Is.False, "Dest column should not be gray");
        }

        #endregion

        #region Contract Tests - Same

        /// <summary>
        /// TS-066 variant: When books are the same version, neither should be bold.
        /// Both columns should have regular (default) styling.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-066")]
        [Property("ExtractionId", "EXT-008")]
        [Property("BehaviorId", "BHV-T009")]
        [Description("Books with same version should have regular styling in both columns")]
        public void GetDisplayStyle_Same_ReturnsBothRegular()
        {
            // Arrange
            var comparisonResult = ComparisonResult.Same;

            // Act
            var style = BookComparisonService.GetDisplayStyle(comparisonResult);

            // Assert: Both columns should be regular (no bold, no gray)
            Assert.That(style.SourceBold, Is.False, "Source column should not be bold for same version");
            Assert.That(style.DestBold, Is.False, "Dest column should not be bold for same version");
            Assert.That(style.SourceGray, Is.False, "Source column should not be gray for same version");
            Assert.That(style.DestGray, Is.False, "Dest column should not be gray for same version");
        }

        #endregion

        #region Contract Tests - OnlyInSource

        /// <summary>
        /// TS-066 variant: When book only exists in source, destination column should be gray.
        /// Gray indicates the book is missing from that project.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-066")]
        [Property("ExtractionId", "EXT-008")]
        [Property("BehaviorId", "BHV-T009")]
        [Description("Book only in source should have gray dest column (missing)")]
        public void GetDisplayStyle_OnlyInSource_ReturnsDestGray()
        {
            // Arrange
            var comparisonResult = ComparisonResult.OnlyInSource;

            // Act
            var style = BookComparisonService.GetDisplayStyle(comparisonResult);

            // Assert: Source regular, dest gray (book missing from dest)
            Assert.That(style.SourceBold, Is.False, "Source column should not be bold");
            Assert.That(style.DestBold, Is.False, "Dest column should not be bold");
            Assert.That(style.SourceGray, Is.False, "Source column should not be gray");
            Assert.That(style.DestGray, Is.True, "Dest column should be gray (book missing)");
        }

        #endregion

        #region Contract Tests - OnlyInDest

        /// <summary>
        /// TS-066 variant: When book only exists in destination, source column should be gray.
        /// Gray indicates the book is missing from that project.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-066")]
        [Property("ExtractionId", "EXT-008")]
        [Property("BehaviorId", "BHV-T009")]
        [Description("Book only in dest should have gray source column (missing)")]
        public void GetDisplayStyle_OnlyInDest_ReturnsSourceGray()
        {
            // Arrange
            var comparisonResult = ComparisonResult.OnlyInDest;

            // Act
            var style = BookComparisonService.GetDisplayStyle(comparisonResult);

            // Assert: Source gray (book missing from source), dest regular
            Assert.That(style.SourceBold, Is.False, "Source column should not be bold");
            Assert.That(style.DestBold, Is.False, "Dest column should not be bold");
            Assert.That(style.SourceGray, Is.True, "Source column should be gray (book missing)");
            Assert.That(style.DestGray, Is.False, "Dest column should not be gray");
        }

        #endregion

        #region Edge Case Tests

        /// <summary>
        /// Edge case: Verify all enum values are handled.
        /// This test ensures the implementation handles all ComparisonResult values
        /// without throwing exceptions.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-066")]
        [Property("ExtractionId", "EXT-008")]
        [Description("All ComparisonResult enum values should be handled without exception")]
        public void GetDisplayStyle_AllEnumValues_DoesNotThrow()
        {
            // Act & Assert: Verify each enum value is handled
            foreach (ComparisonResult result in Enum.GetValues(typeof(ComparisonResult)))
            {
                Assert.DoesNotThrow(
                    () => BookComparisonService.GetDisplayStyle(result),
                    $"GetDisplayStyle should handle {result} without throwing"
                );
            }
        }

        /// <summary>
        /// Edge case: Verify returned style object has consistent state.
        /// Bold and Gray should be mutually exclusive for the same column.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-066")]
        [Property("ExtractionId", "EXT-008")]
        [Description("Returned style should not have bold and gray both true for same column")]
        public void GetDisplayStyle_AllEnumValues_BoldAndGrayMutuallyExclusive()
        {
            // Act & Assert: Verify bold and gray are mutually exclusive
            foreach (ComparisonResult result in Enum.GetValues(typeof(ComparisonResult)))
            {
                var style = BookComparisonService.GetDisplayStyle(result);

                // A column should not be both bold AND gray
                Assert.That(
                    !(style.SourceBold && style.SourceGray),
                    Is.True,
                    $"Source column should not be both bold and gray for {result}"
                );
                Assert.That(
                    !(style.DestBold && style.DestGray),
                    Is.True,
                    $"Dest column should not be both bold and gray for {result}"
                );
            }
        }

        #endregion

        #region CAP-013: GetCompatibleCopyTargets - Acceptance Test (Outer Loop)

        /// <summary>
        /// Acceptance test for CAP-013: GetCompatibleCopyTargets capability.
        /// This test verifies the complete workflow - when it passes, the capability is complete.
        ///
        /// The test calls GetCompatibleCopyTargets with different source project types and verifies
        /// that only compatible target projects are returned based on INV-007 and INV-008.
        ///
        /// Related to gm-003 (Standard), gm-004 (StudyBible), gm-005 (SBA).
        /// </summary>
        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-013")]
        [Property("ScenarioId", "TS-037")]
        [Property("BehaviorId", "BHV-552")]
        [Property("GoldenMasterId", "gm-003")]
        [Description("Acceptance test: GetCompatibleCopyTargets filters projects based on source type compatibility")]
        public void GetCompatibleCopyTargets_AcceptanceTest()
        {
            // Arrange: Create projects of various types
            SetupProjectsOfVariousTypes();

            // Act: Get compatible targets for Standard project
            var targets = BookComparisonService.GetCompatibleCopyTargets(
                _standardProjectId,
                ParatextProjects
            );

            // Assert: Standard project should have multiple compatible target types
            Assert.That(targets, Is.Not.Null);
            Assert.That(targets.Length, Is.GreaterThan(0), "Standard project should have compatible targets");

            // Should include Standard, Auxiliary, BackTranslation, Daughter, StudyBible types
            // Should NOT be limited to only Standard
            var targetTypes = targets.Select(t => t.ProjectType).Distinct().ToList();
            Assert.That(targetTypes.Count, Is.GreaterThan(1), "Should have multiple compatible types");
        }

        #endregion

        #region CAP-013: GetCompatibleCopyTargets - Golden Master Tests

        /// <summary>
        /// gm-003: Standard project shows multiple compatible types in To dropdown.
        /// From BHV-552: Standard projects can copy to Auxiliary, BackTranslation, Daughter,
        /// Standard, StudyBible, StudyBibleAdditions, and TransliterationManual types.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-013")]
        [Property("ScenarioId", "TS-037")]
        [Property("BehaviorId", "BHV-552")]
        [Property("GoldenMasterId", "gm-003")]
        [Description("Standard project returns compatible project types (Auxiliary, BackTranslation, etc.)")]
        public void GetCompatibleCopyTargets_StandardProject_ReturnsCompatibleTypes()
        {
            // Arrange: Create Standard source project and various target projects
            SetupProjectsOfVariousTypes();

            // Act
            var targets = BookComparisonService.GetCompatibleCopyTargets(
                _standardProjectId,
                ParatextProjects
            );

            // Assert: Standard can copy to many types per gm-003
            Assert.That(targets, Is.Not.Null);
            Assert.That(targets.Length, Is.GreaterThan(0));

            // Verify structure of returned ProjectInfo
            foreach (var target in targets)
            {
                Assert.That(target.ProjectId, Is.Not.Null.And.Not.Empty);
                Assert.That(target.ProjectName, Is.Not.Null.And.Not.Empty);
                Assert.That(target.ProjectType, Is.Not.Null.And.Not.Empty);
            }
        }

        /// <summary>
        /// gm-004: StudyBible project shows only StudyBible in To dropdown.
        /// From INV-007: StudyBible projects can only copy to other StudyBible projects.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-013")]
        [Property("ScenarioId", "TS-038")]
        [Property("BehaviorId", "BHV-553")]
        [Property("InvariantId", "INV-007")]
        [Property("GoldenMasterId", "gm-004")]
        [Description("StudyBible project returns only StudyBible projects (INV-007)")]
        public void GetCompatibleCopyTargets_StudyBibleProject_ReturnsOnlyStudyBible()
        {
            // Arrange: Create StudyBible source project and various target projects
            SetupProjectsOfVariousTypes();

            // Act
            var targets = BookComparisonService.GetCompatibleCopyTargets(
                _studyBibleProjectId,
                ParatextProjects
            );

            // Assert: StudyBible can ONLY copy to other StudyBible projects (INV-007)
            Assert.That(targets, Is.Not.Null);
            foreach (var target in targets)
            {
                Assert.That(
                    target.ProjectType,
                    Is.EqualTo("StudyBible"),
                    $"StudyBible source should only return StudyBible targets, but got {target.ProjectType}"
                );
            }
        }

        /// <summary>
        /// gm-005: SBA project shows only SBA in To dropdown.
        /// From INV-008: SBA projects can only copy to other SBA projects.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-013")]
        [Property("ScenarioId", "TS-039")]
        [Property("BehaviorId", "BHV-554")]
        [Property("InvariantId", "INV-008")]
        [Property("GoldenMasterId", "gm-005")]
        [Description("SBA project returns only SBA projects (INV-008)")]
        public void GetCompatibleCopyTargets_SBAProject_ReturnsOnlySBA()
        {
            // Arrange: Create SBA source project and various target projects
            SetupProjectsOfVariousTypes();

            // Act
            var targets = BookComparisonService.GetCompatibleCopyTargets(
                _sbaProjectId,
                ParatextProjects
            );

            // Assert: SBA can ONLY copy to other SBA projects (INV-008)
            Assert.That(targets, Is.Not.Null);
            foreach (var target in targets)
            {
                Assert.That(
                    target.ProjectType,
                    Is.EqualTo("StudyBibleAdditions"),
                    $"SBA source should only return SBA targets, but got {target.ProjectType}"
                );
            }
        }

        #endregion

        #region CAP-013: GetCompatibleCopyTargets - Invariant Tests

        /// <summary>
        /// INV-007: StudyBible projects can only copy to other StudyBible projects.
        /// Verifies that no non-StudyBible projects appear in the target list.
        /// </summary>
        [Test]
        [Category("Invariant")]
        [Property("CapabilityId", "CAP-013")]
        [Property("InvariantId", "INV-007")]
        [Property("BehaviorId", "BHV-553")]
        [Description("INV-007: StudyBible project must not have non-StudyBible in targets")]
        public void GetCompatibleCopyTargets_StudyBibleToNonStudyBible_NotAllowed()
        {
            // Arrange: Create diverse project types
            SetupProjectsOfVariousTypes();

            // Act
            var targets = BookComparisonService.GetCompatibleCopyTargets(
                _studyBibleProjectId,
                ParatextProjects
            );

            // Assert: No non-StudyBible types should be in the list
            var nonStudyBibleTargets = targets.Where(
                t => t.ProjectType != "StudyBible"
            ).ToList();

            Assert.That(
                nonStudyBibleTargets,
                Is.Empty,
                $"StudyBible source should not allow non-StudyBible targets. Found: {string.Join(", ", nonStudyBibleTargets.Select(t => t.ProjectType))}"
            );
        }

        /// <summary>
        /// INV-008: SBA projects can only copy to other SBA projects.
        /// Verifies that no non-SBA projects appear in the target list.
        /// </summary>
        [Test]
        [Category("Invariant")]
        [Property("CapabilityId", "CAP-013")]
        [Property("InvariantId", "INV-008")]
        [Property("BehaviorId", "BHV-554")]
        [Description("INV-008: SBA project must not have non-SBA in targets")]
        public void GetCompatibleCopyTargets_SBAToNonSBA_NotAllowed()
        {
            // Arrange: Create diverse project types
            SetupProjectsOfVariousTypes();

            // Act
            var targets = BookComparisonService.GetCompatibleCopyTargets(
                _sbaProjectId,
                ParatextProjects
            );

            // Assert: No non-SBA types should be in the list
            var nonSBATargets = targets.Where(
                t => t.ProjectType != "StudyBibleAdditions"
            ).ToList();

            Assert.That(
                nonSBATargets,
                Is.Empty,
                $"SBA source should not allow non-SBA targets. Found: {string.Join(", ", nonSBATargets.Select(t => t.ProjectType))}"
            );
        }

        #endregion

        #region CAP-013: GetCompatibleCopyTargets - Edge Case Tests

        /// <summary>
        /// Edge case: Source project not found should return empty array.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-013")]
        [Property("ScenarioId", "TS-037")]
        [Description("Non-existent source project returns empty array")]
        public void GetCompatibleCopyTargets_SourceNotFound_ReturnsEmptyArray()
        {
            // Arrange: No projects added, use valid hex format but non-existent ID
            var nonExistentProjectId = "0000000000000000000000000000000000000000";

            // Act
            var targets = BookComparisonService.GetCompatibleCopyTargets(
                nonExistentProjectId,
                ParatextProjects
            );

            // Assert: Should return empty array, not null
            Assert.That(targets, Is.Not.Null);
            Assert.That(targets, Is.Empty);
        }

        /// <summary>
        /// Edge case: No compatible targets available should return empty array.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-013")]
        [Property("ScenarioId", "TS-038")]
        [Description("No compatible targets returns empty array")]
        public void GetCompatibleCopyTargets_NoCompatibleTargets_ReturnsEmptyArray()
        {
            // Arrange: Create only a StudyBible project with no other StudyBible projects
            // StudyBible requires a base project
            var baseProject = CreateDummyProject();
            var baseDetails = CreateProjectDetails(baseProject);
            ParatextProjects.FakeAddProject(baseDetails, baseProject);

            var studyBibleScrText = new DummyStudyBibleScrText(baseProject);
            var studyBibleDetails = CreateProjectDetails(studyBibleScrText);
            var studyBibleProjectId = studyBibleDetails.Metadata.Id;
            ParatextProjects.FakeAddProject(studyBibleDetails, studyBibleScrText);

            // Create Standard projects only (not compatible with StudyBible per INV-007)
            var standardScrText = CreateDummyProject();
            var standardDetails = CreateProjectDetails(standardScrText);
            ParatextProjects.FakeAddProject(standardDetails, standardScrText);

            // Act: GetCompatibleCopyTargets for StudyBible - no other StudyBible exists
            var targets = BookComparisonService.GetCompatibleCopyTargets(
                studyBibleProjectId,
                ParatextProjects
            );

            // Assert: Empty array since no compatible targets
            Assert.That(targets, Is.Not.Null);
            Assert.That(targets, Is.Empty);
        }

        /// <summary>
        /// Edge case: Source project should not appear in its own target list.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-013")]
        [Property("ScenarioId", "TS-037")]
        [Description("Source project should not be in its own target list")]
        public void GetCompatibleCopyTargets_SourceProject_ExcludesItself()
        {
            // Arrange: Create Standard projects
            SetupProjectsOfVariousTypes();

            // Act
            var targets = BookComparisonService.GetCompatibleCopyTargets(
                _standardProjectId,
                ParatextProjects
            );

            // Assert: Source should not be in targets
            var selfInTargets = targets.Any(t => t.ProjectId == _standardProjectId);
            Assert.That(
                selfInTargets,
                Is.False,
                "Source project should not appear in its own target list"
            );
        }

        #endregion

        #region CAP-013: Helper Methods

        // Store project IDs for test assertions
        private string _standardProjectId = string.Empty;
        private string _studyBibleProjectId = string.Empty;
        private string _sbaProjectId = string.Empty;

        /// <summary>
        /// Sets up projects of various types for testing GetCompatibleCopyTargets.
        /// Creates Standard, StudyBible, SBA, and additional projects.
        /// </summary>
        private void SetupProjectsOfVariousTypes()
        {
            // Standard project 1 - uses default DummyScrText (Standard type by default)
            var standardScrText = CreateDummyProject();
            var standardDetails = CreateProjectDetails(standardScrText);
            _standardProjectId = standardDetails.Metadata.Id;
            ParatextProjects.FakeAddProject(standardDetails, standardScrText);

            // StudyBible project 1 - uses DummyStudyBibleScrText with ProjectType.StudyBible
            // StudyBible requires a base project
            var studyBibleBaseScrText = CreateDummyProject();
            var studyBibleBaseDetails = CreateProjectDetails(studyBibleBaseScrText);
            ParatextProjects.FakeAddProject(studyBibleBaseDetails, studyBibleBaseScrText);
            var studyBibleScrText = new DummyStudyBibleScrText(studyBibleBaseScrText);
            var studyBibleDetails = CreateProjectDetails(studyBibleScrText);
            _studyBibleProjectId = studyBibleDetails.Metadata.Id;
            ParatextProjects.FakeAddProject(studyBibleDetails, studyBibleScrText);

            // SBA project 1 - uses DummySBAScrText with ProjectType.StudyBibleAdditions
            // Note: DummySBAScrText requires a base project
            var sbaBaseScrText = CreateDummyProject();
            var sbaBaseDetails = CreateProjectDetails(sbaBaseScrText);
            ParatextProjects.FakeAddProject(sbaBaseDetails, sbaBaseScrText);
            var sbaScrText = new DummySBAScrText(sbaBaseScrText);
            var sbaDetails = CreateProjectDetails(sbaScrText);
            _sbaProjectId = sbaDetails.Metadata.Id;
            ParatextProjects.FakeAddProject(sbaDetails, sbaScrText);

            // Additional StudyBible project 2 (for target testing)
            // StudyBible requires a base project
            var studyBible2BaseScrText = CreateDummyProject();
            var studyBible2BaseDetails = CreateProjectDetails(studyBible2BaseScrText);
            ParatextProjects.FakeAddProject(studyBible2BaseDetails, studyBible2BaseScrText);
            var studyBible2ScrText = new DummyStudyBibleScrText(studyBible2BaseScrText);
            var studyBible2Details = CreateProjectDetails(studyBible2ScrText);
            ParatextProjects.FakeAddProject(studyBible2Details, studyBible2ScrText);

            // Additional SBA project 2 (for target testing)
            var sba2BaseScrText = CreateDummyProject();
            var sba2BaseDetails = CreateProjectDetails(sba2BaseScrText);
            ParatextProjects.FakeAddProject(sba2BaseDetails, sba2BaseScrText);
            var sba2ScrText = new DummySBAScrText(sba2BaseScrText);
            var sba2Details = CreateProjectDetails(sba2ScrText);
            ParatextProjects.FakeAddProject(sba2Details, sba2ScrText);

            // Additional Standard project 2
            var standard2ScrText = CreateDummyProject();
            var standard2Details = CreateProjectDetails(standard2ScrText);
            ParatextProjects.FakeAddProject(standard2Details, standard2ScrText);
        }

        #endregion

        // ===================================================================
        // CAP-021: BookComparisonForCopyDialog Tests
        // ===================================================================

        #region CAP-021: CompareBooks - Acceptance Test (Outer Loop)

        /// <summary>
        /// Acceptance test for CAP-021: BookComparisonForCopyDialog
        /// Tests full comparison workflow matching gm-023 golden master.
        /// When this test passes, the capability is complete.
        /// </summary>
        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-021")]
        [Property("ScenarioId", "TS-076")]
        [Property("BehaviorId", "BHV-303,BHV-T009")]
        [Property("ExtractionId", "EXT-007")]
        [Property("GoldenMasterId", "gm-023")]
        [Description("Acceptance test: Compare books between source and destination projects")]
        public void CompareBooks_AcceptanceTest()
        {
            // Arrange: Create source and dest projects with books at different dates
            var sourceProject = CreateDummyProjectWithBook(1, new DateTime(2024, 1, 15, 10, 30, 0)); // GEN, newer
            var destProject = CreateDummyProjectWithBook(1, new DateTime(2024, 1, 14, 9, 0, 0)); // GEN, older

            // Act
            var result = BookComparisonService.CompareBooks(sourceProject, destProject);

            // Assert: Should return comparison with source newer
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Count, Is.EqualTo(1));
            Assert.That(result[0].BookNum, Is.EqualTo(1));
            Assert.That(result[0].Comparison, Is.EqualTo(ComparisonResult.SourceNewer));
            Assert.That(result[0].DefaultSelected, Is.True);
        }

        #endregion

        #region CAP-021: CompareBooks - Contract Tests (ComparisonResult States)

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-076")]
        [Property("BehaviorId", "BHV-T009")]
        [Property("ExtractionId", "EXT-007")]
        [Property("GoldenMasterId", "gm-023")]
        public void CompareBooks_BothHaveBook_SourceNewer_ReturnsSourceNewer()
        {
            // Arrange
            var sourceProject = CreateDummyProjectWithBook(1, new DateTime(2024, 1, 15, 10, 30, 0));
            var destProject = CreateDummyProjectWithBook(1, new DateTime(2024, 1, 14, 9, 0, 0));

            // Act
            var result = BookComparisonService.CompareBooks(sourceProject, destProject);

            // Assert
            Assert.That(result[0].Comparison, Is.EqualTo(ComparisonResult.SourceNewer));
            Assert.That(result[0].SourceModified, Is.EqualTo(new DateTime(2024, 1, 15, 10, 30, 0)));
            Assert.That(result[0].DestModified, Is.EqualTo(new DateTime(2024, 1, 14, 9, 0, 0)));
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-076")]
        [Property("BehaviorId", "BHV-T009")]
        [Property("ExtractionId", "EXT-007")]
        public void CompareBooks_BothHaveBook_DestNewer_ReturnsDestNewer()
        {
            // Arrange
            var sourceProject = CreateDummyProjectWithBook(1, new DateTime(2024, 1, 14, 9, 0, 0));
            var destProject = CreateDummyProjectWithBook(1, new DateTime(2024, 1, 15, 10, 30, 0));

            // Act
            var result = BookComparisonService.CompareBooks(sourceProject, destProject);

            // Assert
            Assert.That(result[0].Comparison, Is.EqualTo(ComparisonResult.DestNewer));
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-076")]
        [Property("BehaviorId", "BHV-T009")]
        [Property("ExtractionId", "EXT-007")]
        public void CompareBooks_BothHaveBook_SameDate_ReturnsSame()
        {
            // Arrange
            var sameDate = new DateTime(2024, 1, 15, 10, 30, 0);
            var sourceProject = CreateDummyProjectWithBook(1, sameDate);
            var destProject = CreateDummyProjectWithBook(1, sameDate);

            // Act
            var result = BookComparisonService.CompareBooks(sourceProject, destProject);

            // Assert
            Assert.That(result[0].Comparison, Is.EqualTo(ComparisonResult.Same));
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-076")]
        [Property("BehaviorId", "BHV-303")]
        [Property("ExtractionId", "EXT-007")]
        public void CompareBooks_OnlyInSource_ReturnsOnlyInSource()
        {
            // Arrange
            var sourceProject = CreateDummyProjectWithBook(1, new DateTime(2024, 1, 15));
            var destProject = CreateDummyProjectWithoutBooks();

            // Act
            var result = BookComparisonService.CompareBooks(sourceProject, destProject);

            // Assert
            Assert.That(result[0].Comparison, Is.EqualTo(ComparisonResult.OnlyInSource));
            Assert.That(result[0].SourceModified, Is.Not.Null);
            Assert.That(result[0].DestModified, Is.Null);
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-076")]
        [Property("BehaviorId", "BHV-303")]
        [Property("ExtractionId", "EXT-007")]
        public void CompareBooks_OnlyInDest_ReturnsOnlyInDest()
        {
            // Arrange
            var sourceProject = CreateDummyProjectWithoutBooks();
            var destProject = CreateDummyProjectWithBook(1, new DateTime(2024, 1, 15));

            // Act
            var result = BookComparisonService.CompareBooks(sourceProject, destProject);

            // Assert
            Assert.That(result[0].Comparison, Is.EqualTo(ComparisonResult.OnlyInDest));
            Assert.That(result[0].SourceModified, Is.Null);
            Assert.That(result[0].DestModified, Is.Not.Null);
        }

        #endregion

        #region CAP-021: CompareBooks - Default Selection Tests

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-076")]
        [Property("BehaviorId", "BHV-303")]
        [Property("ExtractionId", "EXT-007")]
        [Property("GoldenMasterId", "gm-023")]
        public void CompareBooks_SourceNewer_DefaultSelectedTrue()
        {
            // Arrange
            var sourceProject = CreateDummyProjectWithBook(1, new DateTime(2024, 1, 15));
            var destProject = CreateDummyProjectWithBook(1, new DateTime(2024, 1, 14));

            // Act
            var result = BookComparisonService.CompareBooks(sourceProject, destProject);

            // Assert: Source newer books should be selected by default
            Assert.That(result[0].DefaultSelected, Is.True);
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-076")]
        [Property("BehaviorId", "BHV-303")]
        [Property("ExtractionId", "EXT-007")]
        [Property("GoldenMasterId", "gm-023")]
        public void CompareBooks_OnlyInSource_DefaultSelectedTrue()
        {
            // Arrange
            var sourceProject = CreateDummyProjectWithBook(1, new DateTime(2024, 1, 15));
            var destProject = CreateDummyProjectWithoutBooks();

            // Act
            var result = BookComparisonService.CompareBooks(sourceProject, destProject);

            // Assert: OnlyInSource books should be selected by default
            Assert.That(result[0].DefaultSelected, Is.True);
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-076")]
        [Property("BehaviorId", "BHV-303")]
        [Property("ExtractionId", "EXT-007")]
        public void CompareBooks_DestNewer_DefaultSelectedFalse()
        {
            // Arrange
            var sourceProject = CreateDummyProjectWithBook(1, new DateTime(2024, 1, 14));
            var destProject = CreateDummyProjectWithBook(1, new DateTime(2024, 1, 15));

            // Act
            var result = BookComparisonService.CompareBooks(sourceProject, destProject);

            // Assert: Dest newer books should NOT be selected by default
            Assert.That(result[0].DefaultSelected, Is.False);
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-076")]
        [Property("BehaviorId", "BHV-303")]
        [Property("ExtractionId", "EXT-007")]
        public void CompareBooks_OnlyInDest_DefaultSelectedFalse()
        {
            // Arrange
            var sourceProject = CreateDummyProjectWithoutBooks();
            var destProject = CreateDummyProjectWithBook(1, new DateTime(2024, 1, 15));

            // Act
            var result = BookComparisonService.CompareBooks(sourceProject, destProject);

            // Assert: OnlyInDest books should NOT be selected by default
            Assert.That(result[0].DefaultSelected, Is.False);
        }

        #endregion

        #region CAP-021: CompareBooks - Edge Case Tests

        [Test]
        [Category("EdgeCase")]
        [Property("ScenarioId", "TS-076")]
        [Property("BehaviorId", "BHV-303")]
        [Property("ExtractionId", "EXT-007")]
        public void CompareBooks_EmptyProjects_ReturnsEmptyList()
        {
            // Arrange
            var sourceProject = CreateDummyProjectWithoutBooks();
            var destProject = CreateDummyProjectWithoutBooks();

            // Act
            var result = BookComparisonService.CompareBooks(sourceProject, destProject);

            // Assert: Empty projects should return empty list
            Assert.That(result, Is.Empty);
        }

        #endregion

        #region CAP-021: Test Helpers

        /// <summary>
        /// Creates a dummy project with a single book at a specified modification date.
        /// Used for testing CompareBooks functionality (CAP-021).
        /// </summary>
        private static DummyScrText CreateDummyProjectWithBook(int bookNum, DateTime modifiedDate)
        {
            var scrText = new DummyScrText();
            scrText.SetBookPresent(bookNum, true, modifiedDate);
            return scrText;
        }

        /// <summary>
        /// Creates a dummy project with no books.
        /// Used for testing CompareBooks functionality (CAP-021).
        /// </summary>
        private static DummyScrText CreateDummyProjectWithoutBooks()
        {
            return new DummyScrText();
        }

        #endregion

        // ===================================================================
        // CAP-007: CompareBooks Public API Tests
        // ===================================================================

        #region CAP-007: CompareBooks(BookComparisonRequest) - Acceptance Test (Outer Loop)

        /// <summary>
        /// Acceptance test: Standard project comparison returns all books with correct states.
        /// This is the "done signal" for CAP-007.
        ///
        /// Golden Master: gm-003-copy-filter-standard
        /// </summary>
        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-007")]
        [Property("ScenarioId", "TS-037")]
        [Property("BehaviorId", "BHV-552")]
        [Property("GoldenMasterId", "gm-003")]
        [Description("Acceptance test: Standard project comparison via public API")]
        public void CompareBooks_Request_StandardProjects_AcceptanceTest()
        {
            // Arrange
            var sourceProject = CreateStandardProjectWithBooks([1, 2, 3]); // GEN, EXO, LEV
            var destProject = CreateStandardProjectWithBooks([1, 2]); // GEN, EXO only

            // Set file modification dates for comparison
            SetBookModifiedDate(sourceProject, 1, new DateTime(2024, 1, 15)); // GEN newer in source
            SetBookModifiedDate(destProject, 1, new DateTime(2024, 1, 14));
            SetBookModifiedDate(sourceProject, 2, new DateTime(2024, 1, 10)); // EXO older in source
            SetBookModifiedDate(destProject, 2, new DateTime(2024, 1, 12));

            var request = new BookComparisonRequest(
                sourceProject.Guid.ToString(),
                destProject.Guid.ToString()
            );

            // Act
            var result = BookComparisonService.CompareBooks(request);

            // Assert - Full outcome verification
            Assert.That(result, Is.Not.Null, "Result should not be null");
            Assert.That(result.Books, Is.Not.Null, "Books list should not be null");
            Assert.That(result.SourceProject, Is.Not.Null, "Source project info should be present");
            Assert.That(result.DestProject, Is.Not.Null, "Dest project info should be present");

            // Verify project info
            Assert.That(
                result.SourceProject.IsStudyBible,
                Is.False,
                "Standard source project should not be marked as study bible"
            );
            Assert.That(
                result.DestProject.IsStudyBible,
                Is.False,
                "Standard dest project should not be marked as study bible"
            );

            // Verify book comparison states
            var genComparison = result.Books.FirstOrDefault(b => b.BookNum == 1);
            Assert.That(genComparison, Is.Not.Null, "GEN comparison should exist");
            Assert.That(
                genComparison!.Comparison,
                Is.EqualTo(ComparisonResult.SourceNewer),
                "GEN should be SourceNewer (source date > dest date)"
            );
            Assert.That(
                genComparison.DefaultSelected,
                Is.True,
                "SourceNewer books should be selected by default"
            );

            var exoComparison = result.Books.FirstOrDefault(b => b.BookNum == 2);
            Assert.That(exoComparison, Is.Not.Null, "EXO comparison should exist");
            Assert.That(
                exoComparison!.Comparison,
                Is.EqualTo(ComparisonResult.DestNewer),
                "EXO should be DestNewer (dest date > source date)"
            );

            var levComparison = result.Books.FirstOrDefault(b => b.BookNum == 3);
            Assert.That(levComparison, Is.Not.Null, "LEV comparison should exist");
            Assert.That(
                levComparison!.Comparison,
                Is.EqualTo(ComparisonResult.OnlyInSource),
                "LEV should be OnlyInSource"
            );
            Assert.That(
                levComparison.DefaultSelected,
                Is.True,
                "OnlyInSource books should be selected by default"
            );
        }

        /// <summary>
        /// Acceptance test: StudyBible project comparison respects INV-007 restriction.
        ///
        /// Golden Master: gm-004-copy-filter-studybible
        /// </summary>
        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-007")]
        [Property("ScenarioId", "TS-038")]
        [Property("BehaviorId", "BHV-553")]
        [Property("GoldenMasterId", "gm-004")]
        [Description(
            "Acceptance test: StudyBible projects comparison marks IsStudyBible correctly"
        )]
        public void CompareBooks_Request_StudyBibleProjects_AcceptanceTest()
        {
            // Arrange
            var sourceProject = CreateStudyBibleProjectWithBooks([1, 2]); // GEN, EXO
            var destProject = CreateStudyBibleProjectWithBooks([1]); // GEN only

            var request = new BookComparisonRequest(
                sourceProject.Guid.ToString(),
                destProject.Guid.ToString()
            );

            // Act
            var result = BookComparisonService.CompareBooks(request);

            // Assert
            Assert.That(result, Is.Not.Null, "Result should not be null");
            Assert.That(
                result.SourceProject.IsStudyBible,
                Is.True,
                "Source project should be marked as study bible"
            );
            Assert.That(
                result.DestProject.IsStudyBible,
                Is.True,
                "Dest project should be marked as study bible"
            );

            // Verify book comparison
            Assert.That(
                result.Books,
                Has.Length.GreaterThanOrEqualTo(2),
                "Should have at least 2 books in comparison"
            );
        }

        /// <summary>
        /// Acceptance test: SBA project comparison respects INV-008 restriction.
        ///
        /// Golden Master: gm-005-copy-filter-sba
        /// </summary>
        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-007")]
        [Property("ScenarioId", "TS-039")]
        [Property("BehaviorId", "BHV-554")]
        [Property("GoldenMasterId", "gm-005")]
        [Description("Acceptance test: SBA projects comparison marks IsStudyBible correctly")]
        public void CompareBooks_Request_SBAProjects_AcceptanceTest()
        {
            // Arrange - SBA projects with non-canonical books
            var sourceProject = CreateSBAProjectWithBooks([67, 68]); // XXA, XXB
            var destProject = CreateSBAProjectWithBooks([67]); // XXA only

            var request = new BookComparisonRequest(
                sourceProject.Guid.ToString(),
                destProject.Guid.ToString()
            );

            // Act
            var result = BookComparisonService.CompareBooks(request);

            // Assert
            Assert.That(result, Is.Not.Null, "Result should not be null");
            Assert.That(
                result.SourceProject.IsStudyBible,
                Is.True,
                "SBA source project should be marked as study bible"
            );
            Assert.That(
                result.DestProject.IsStudyBible,
                Is.True,
                "SBA dest project should be marked as study bible"
            );

            // Verify book comparison for non-canonical books
            var xxaComparison = result.Books.FirstOrDefault(b => b.BookNum == 67);
            Assert.That(xxaComparison, Is.Not.Null, "XXA (67) comparison should exist");

            var xxbComparison = result.Books.FirstOrDefault(b => b.BookNum == 68);
            Assert.That(xxbComparison, Is.Not.Null, "XXB (68) comparison should exist");
            Assert.That(
                xxbComparison!.Comparison,
                Is.EqualTo(ComparisonResult.OnlyInSource),
                "XXB should be OnlyInSource"
            );
        }

        /// <summary>
        /// Acceptance test: Book comparison determines newer/older/same status correctly.
        ///
        /// Golden Master: gm-023-book-comparison
        /// </summary>
        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-007")]
        [Property("ScenarioId", "TS-076")]
        [Property("BehaviorId", "BHV-303")]
        [Property("GoldenMasterId", "gm-023")]
        [Description("Acceptance test: All comparison states determined correctly via public API")]
        public void CompareBooks_Request_DeterminesComparisonStates_AcceptanceTest()
        {
            // Arrange - Create projects with various comparison scenarios
            var sourceProject = CreateStandardProjectWithBooks([1, 2, 3, 4]); // GEN, EXO, LEV, NUM
            var destProject = CreateStandardProjectWithBooks([1, 2, 5]); // GEN, EXO, DEU

            // GEN: Source newer
            SetBookModifiedDate(sourceProject, 1, new DateTime(2024, 1, 15, 10, 30, 0));
            SetBookModifiedDate(destProject, 1, new DateTime(2024, 1, 14, 8, 0, 0));

            // EXO: Dest newer
            SetBookModifiedDate(sourceProject, 2, new DateTime(2024, 1, 10, 0, 0, 0));
            SetBookModifiedDate(destProject, 2, new DateTime(2024, 1, 12, 0, 0, 0));

            // LEV: Only in source (book 3)
            // NUM: Only in source (book 4)
            // DEU: Only in dest (book 5)

            var request = new BookComparisonRequest(
                sourceProject.Guid.ToString(),
                destProject.Guid.ToString()
            );

            // Act
            var result = BookComparisonService.CompareBooks(request);

            // Assert - All five comparison states
            var genComparison = result.Books.First(b => b.BookNum == 1);
            Assert.That(
                genComparison.Comparison,
                Is.EqualTo(ComparisonResult.SourceNewer),
                "GEN: source date 2024-01-15 > dest date 2024-01-14 = SourceNewer"
            );
            Assert.That(genComparison.SourceModified, Is.Not.Null);
            Assert.That(genComparison.DestModified, Is.Not.Null);

            var exoComparison = result.Books.First(b => b.BookNum == 2);
            Assert.That(
                exoComparison.Comparison,
                Is.EqualTo(ComparisonResult.DestNewer),
                "EXO: dest date 2024-01-12 > source date 2024-01-10 = DestNewer"
            );
            Assert.That(
                exoComparison.DefaultSelected,
                Is.False,
                "DestNewer books should NOT be selected by default"
            );

            var levComparison = result.Books.First(b => b.BookNum == 3);
            Assert.That(
                levComparison.Comparison,
                Is.EqualTo(ComparisonResult.OnlyInSource),
                "LEV: only in source = OnlyInSource"
            );
            Assert.That(
                levComparison.DestModified,
                Is.Null,
                "OnlyInSource should have null DestModified"
            );

            var numComparison = result.Books.First(b => b.BookNum == 4);
            Assert.That(
                numComparison.Comparison,
                Is.EqualTo(ComparisonResult.OnlyInSource),
                "NUM: only in source = OnlyInSource"
            );

            var deuComparison = result.Books.First(b => b.BookNum == 5);
            Assert.That(
                deuComparison.Comparison,
                Is.EqualTo(ComparisonResult.OnlyInDest),
                "DEU: only in dest = OnlyInDest"
            );
            Assert.That(
                deuComparison.SourceModified,
                Is.Null,
                "OnlyInDest should have null SourceModified"
            );
            Assert.That(
                deuComparison.DefaultSelected,
                Is.False,
                "OnlyInDest books should NOT be selected by default"
            );
        }

        #endregion

        #region CAP-007: CompareBooks(BookComparisonRequest) - Contract Tests

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-007")]
        [Property("ScenarioId", "TS-066")]
        [Property("BehaviorId", "BHV-303")]
        [Description("Same modification dates returns Same comparison")]
        public void CompareBooks_Request_BothHaveSameDate_ReturnsSame()
        {
            // Arrange
            var sourceProject = CreateStandardProjectWithBooks([1]);
            var destProject = CreateStandardProjectWithBooks([1]);

            var sameDate = new DateTime(2024, 1, 15, 10, 30, 0);
            SetBookModifiedDate(sourceProject, 1, sameDate);
            SetBookModifiedDate(destProject, 1, sameDate);

            var request = new BookComparisonRequest(
                sourceProject.Guid.ToString(),
                destProject.Guid.ToString()
            );

            // Act
            var result = BookComparisonService.CompareBooks(request);

            // Assert
            var genComparison = result.Books.First(b => b.BookNum == 1);
            Assert.That(
                genComparison.Comparison,
                Is.EqualTo(ComparisonResult.Same),
                "Same modification dates should return Same comparison"
            );
            Assert.That(
                genComparison.DefaultSelected,
                Is.False,
                "Same books should NOT be selected by default (no need to copy)"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-007")]
        [Property("ScenarioId", "TS-076")]
        [Property("BehaviorId", "BHV-303")]
        [Description("Source newer has DefaultSelected = true")]
        public void CompareBooks_Request_SourceNewer_DefaultSelectedTrue()
        {
            // Arrange
            var sourceProject = CreateStandardProjectWithBooks([1]);
            var destProject = CreateStandardProjectWithBooks([1]);

            SetBookModifiedDate(sourceProject, 1, new DateTime(2024, 1, 20)); // Newer
            SetBookModifiedDate(destProject, 1, new DateTime(2024, 1, 10));

            var request = new BookComparisonRequest(
                sourceProject.Guid.ToString(),
                destProject.Guid.ToString()
            );

            // Act
            var result = BookComparisonService.CompareBooks(request);

            // Assert
            var genComparison = result.Books.First(b => b.BookNum == 1);
            Assert.That(genComparison.Comparison, Is.EqualTo(ComparisonResult.SourceNewer));
            Assert.That(
                genComparison.DefaultSelected,
                Is.True,
                "SourceNewer books should be selected by default for copying"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-007")]
        [Property("ScenarioId", "TS-076")]
        [Property("BehaviorId", "BHV-303")]
        [Description("OnlyInSource has DefaultSelected = true")]
        public void CompareBooks_Request_OnlyInSource_DefaultSelectedTrue()
        {
            // Arrange
            var sourceProject = CreateStandardProjectWithBooks([1, 2]); // GEN, EXO
            var destProject = CreateStandardProjectWithBooks([1]); // GEN only

            var request = new BookComparisonRequest(
                sourceProject.Guid.ToString(),
                destProject.Guid.ToString()
            );

            // Act
            var result = BookComparisonService.CompareBooks(request);

            // Assert
            var exoComparison = result.Books.First(b => b.BookNum == 2);
            Assert.That(exoComparison.Comparison, Is.EqualTo(ComparisonResult.OnlyInSource));
            Assert.That(
                exoComparison.DefaultSelected,
                Is.True,
                "OnlyInSource books should be selected by default for copying"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-007")]
        [Property("ScenarioId", "TS-076")]
        [Property("BehaviorId", "BHV-303")]
        [Description("DestNewer has DefaultSelected = false")]
        public void CompareBooks_Request_DestNewer_DefaultSelectedFalse()
        {
            // Arrange
            var sourceProject = CreateStandardProjectWithBooks([1]);
            var destProject = CreateStandardProjectWithBooks([1]);

            SetBookModifiedDate(sourceProject, 1, new DateTime(2024, 1, 10)); // Older
            SetBookModifiedDate(destProject, 1, new DateTime(2024, 1, 20)); // Newer

            var request = new BookComparisonRequest(
                sourceProject.Guid.ToString(),
                destProject.Guid.ToString()
            );

            // Act
            var result = BookComparisonService.CompareBooks(request);

            // Assert
            var genComparison = result.Books.First(b => b.BookNum == 1);
            Assert.That(genComparison.Comparison, Is.EqualTo(ComparisonResult.DestNewer));
            Assert.That(
                genComparison.DefaultSelected,
                Is.False,
                "DestNewer books should NOT be selected by default (would overwrite newer)"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-007")]
        [Property("ScenarioId", "TS-037")]
        [Property("BehaviorId", "BHV-303")]
        [Description("Result includes project info")]
        public void CompareBooks_Request_ReturnsProjectInfo()
        {
            // Arrange
            var sourceProject = CreateStandardProjectWithBooks([1]);
            var destProject = CreateStandardProjectWithBooks([1]);

            var request = new BookComparisonRequest(
                sourceProject.Guid.ToString(),
                destProject.Guid.ToString()
            );

            // Act
            var result = BookComparisonService.CompareBooks(request);

            // Assert
            Assert.That(
                result.SourceProject.ProjectId,
                Is.EqualTo(sourceProject.Guid.ToString())
            );
            Assert.That(result.SourceProject.ProjectName, Is.Not.Null.And.Not.Empty);
            Assert.That(result.SourceProject.ProjectType, Is.Not.Null.And.Not.Empty);

            Assert.That(result.DestProject.ProjectId, Is.EqualTo(destProject.Guid.ToString()));
            Assert.That(result.DestProject.ProjectName, Is.Not.Null.And.Not.Empty);
            Assert.That(result.DestProject.ProjectType, Is.Not.Null.And.Not.Empty);
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-007")]
        [Property("ScenarioId", "TS-037")]
        [Property("BehaviorId", "BHV-303")]
        [Description("Result includes book comparison info with all fields")]
        public void CompareBooks_Request_ReturnsBookComparisonInfo()
        {
            // Arrange
            var sourceProject = CreateStandardProjectWithBooks([1]);
            var destProject = CreateStandardProjectWithBooks([1]);

            var request = new BookComparisonRequest(
                sourceProject.Guid.ToString(),
                destProject.Guid.ToString()
            );

            // Act
            var result = BookComparisonService.CompareBooks(request);

            // Assert
            var genComparison = result.Books.First(b => b.BookNum == 1);
            Assert.That(genComparison.BookNum, Is.EqualTo(1));
            Assert.That(
                genComparison.BookName,
                Is.Not.Null.And.Not.Empty,
                "BookName should be populated"
            );
            Assert.That(
                genComparison.SourceModified,
                Is.Not.Null,
                "SourceModified should be set when book exists in source"
            );
            Assert.That(
                genComparison.DestModified,
                Is.Not.Null,
                "DestModified should be set when book exists in dest"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-007")]
        [Property("ScenarioId", "TS-076")]
        [Property("BehaviorId", "BHV-303")]
        [Description("Result includes union of books from both projects")]
        public void CompareBooks_Request_IncludesAllBooksFromBothProjects()
        {
            // Arrange - Disjoint book sets
            var sourceProject = CreateStandardProjectWithBooks([1, 3, 5]); // GEN, LEV, DEU
            var destProject = CreateStandardProjectWithBooks([2, 4, 5]); // EXO, NUM, DEU

            var request = new BookComparisonRequest(
                sourceProject.Guid.ToString(),
                destProject.Guid.ToString()
            );

            // Act
            var result = BookComparisonService.CompareBooks(request);

            // Assert - Union of both sets: 1, 2, 3, 4, 5
            var bookNums = result.Books.Select(b => b.BookNum).OrderBy(n => n).ToList();
            Assert.That(
                bookNums,
                Is.EquivalentTo(new[] { 1, 2, 3, 4, 5 }),
                "Should include all books from both projects"
            );
        }

        #endregion

        #region CAP-007: CompareBooks(BookComparisonRequest) - Invariant Tests

        /// <summary>
        /// INV-007: StudyBible project comparison marks IsStudyBible correctly.
        /// </summary>
        [Test]
        [Category("Invariant")]
        [Property("CapabilityId", "CAP-007")]
        [Property("InvariantId", "INV-007")]
        [Property("ScenarioId", "TS-038")]
        [Property("BehaviorId", "BHV-553")]
        [Description("INV-007: StudyBible project comparison marks IsStudyBible = true")]
        public void CompareBooks_Request_StudyBibleProject_MarksIsStudyBibleTrue()
        {
            // Arrange
            var studyBibleSource = CreateStudyBibleProjectWithBooks([1]);
            var studyBibleDest = CreateStudyBibleProjectWithBooks([1]);

            var request = new BookComparisonRequest(
                studyBibleSource.Guid.ToString(),
                studyBibleDest.Guid.ToString()
            );

            // Act
            var result = BookComparisonService.CompareBooks(request);

            // Assert - Both projects should be marked as study bible
            Assert.That(
                result.SourceProject.IsStudyBible,
                Is.True,
                "INV-007: StudyBible source should have IsStudyBible = true"
            );
            Assert.That(
                result.DestProject.IsStudyBible,
                Is.True,
                "INV-007: StudyBible dest should have IsStudyBible = true"
            );
        }

        /// <summary>
        /// INV-008: SBA project comparison marks IsStudyBible correctly.
        /// </summary>
        [Test]
        [Category("Invariant")]
        [Property("CapabilityId", "CAP-007")]
        [Property("InvariantId", "INV-008")]
        [Property("ScenarioId", "TS-039")]
        [Property("BehaviorId", "BHV-554")]
        [Description("INV-008: SBA project comparison marks IsStudyBible = true")]
        public void CompareBooks_Request_SBAProject_MarksIsStudyBibleTrue()
        {
            // Arrange
            var sbaSource = CreateSBAProjectWithBooks([67]); // XXA
            var sbaDest = CreateSBAProjectWithBooks([67]);

            var request = new BookComparisonRequest(
                sbaSource.Guid.ToString(),
                sbaDest.Guid.ToString()
            );

            // Act
            var result = BookComparisonService.CompareBooks(request);

            // Assert - Both projects should be marked as study bible (SBA is a type of study bible)
            Assert.That(
                result.SourceProject.IsStudyBible,
                Is.True,
                "INV-008: SBA source should have IsStudyBible = true"
            );
            Assert.That(
                result.DestProject.IsStudyBible,
                Is.True,
                "INV-008: SBA dest should have IsStudyBible = true"
            );
        }

        /// <summary>
        /// Verify Standard projects are correctly marked as not study bible.
        /// </summary>
        [Test]
        [Category("Invariant")]
        [Property("CapabilityId", "CAP-007")]
        [Property("InvariantId", "INV-007")]
        [Property("ScenarioId", "TS-037")]
        [Property("BehaviorId", "BHV-552")]
        [Description("Standard projects should have IsStudyBible = false")]
        public void CompareBooks_Request_StandardProject_MarksIsStudyBibleFalse()
        {
            // Arrange
            var standardSource = CreateStandardProjectWithBooks([1]);
            var standardDest = CreateStandardProjectWithBooks([1]);

            var request = new BookComparisonRequest(
                standardSource.Guid.ToString(),
                standardDest.Guid.ToString()
            );

            // Act
            var result = BookComparisonService.CompareBooks(request);

            // Assert
            Assert.That(
                result.SourceProject.IsStudyBible,
                Is.False,
                "Standard source should have IsStudyBible = false"
            );
            Assert.That(
                result.DestProject.IsStudyBible,
                Is.False,
                "Standard dest should have IsStudyBible = false"
            );
        }

        /// <summary>
        /// Comparison between mismatched project types should still work
        /// (validation happens at copy time, not comparison time).
        /// </summary>
        [Test]
        [Category("Invariant")]
        [Property("CapabilityId", "CAP-007")]
        [Property("InvariantId", "INV-007")]
        [Property("ScenarioId", "TS-037")]
        [Property("BehaviorId", "BHV-552")]
        [Description("Mixed project type comparison still works (filtering is UI responsibility)")]
        public void CompareBooks_Request_MixedProjectTypes_StillReturnsComparison()
        {
            // Arrange - Standard source, StudyBible dest (normally not allowed to copy)
            var standardSource = CreateStandardProjectWithBooks([1]);
            var studyBibleDest = CreateStudyBibleProjectWithBooks([1]);

            var request = new BookComparisonRequest(
                standardSource.Guid.ToString(),
                studyBibleDest.Guid.ToString()
            );

            // Act - Comparison should still work
            var result = BookComparisonService.CompareBooks(request);

            // Assert - Comparison succeeds, but IsStudyBible flags differ
            Assert.That(result, Is.Not.Null, "Comparison should succeed even for mixed types");
            Assert.That(result.SourceProject.IsStudyBible, Is.False);
            Assert.That(result.DestProject.IsStudyBible, Is.True);

            // UI will use these flags to prevent the actual copy operation
        }

        #endregion

        #region CAP-007: Helper Methods

        /// <summary>
        /// Creates a standard project with the specified books already present.
        /// Books are created with a default modification date.
        /// DummyScrText creates a Standard project type by default.
        /// </summary>
        private DummyScrText CreateStandardProjectWithBooks(int[] bookNumbers)
        {
            var scrText = CreateDummyProject();
            // Note: DummyScrText creates Standard type by default (TranslationInfo.Type is readonly)

            // Register project for lookup
            var details = CreateProjectDetails(scrText);
            ParatextProjects.FakeAddProject(details, scrText);

            // Add books with default dates
            var defaultDate = DateTime.Now;
            foreach (var bookNum in bookNumbers)
            {
                scrText.SetBookPresent(bookNum, true, defaultDate);
            }

            return scrText;
        }

        /// <summary>
        /// Creates a StudyBible project with the specified books.
        /// StudyBible is a derived type that requires a base project.
        /// </summary>
        private DummyScrText CreateStudyBibleProjectWithBooks(int[] bookNumbers)
        {
            // StudyBible requires a base project
            var baseProject = CreateDummyProject();
            var baseDetails = CreateProjectDetails(baseProject);
            ParatextProjects.FakeAddProject(baseDetails, baseProject);

            var scrText = new DummyStudyBibleScrText(baseProject);

            // Register project for lookup
            var details = CreateProjectDetails(scrText);
            ParatextProjects.FakeAddProject(details, scrText);

            // Add books with default dates
            var defaultDate = DateTime.Now;
            foreach (var bookNum in bookNumbers)
            {
                scrText.SetBookPresent(bookNum, true, defaultDate);
            }

            return scrText;
        }

        /// <summary>
        /// Creates an SBA (Study Bible Additions) project with the specified books.
        /// </summary>
        private DummyScrText CreateSBAProjectWithBooks(int[] bookNumbers)
        {
            // SBA requires a base project
            var baseProject = CreateDummyProject();
            var baseDetails = CreateProjectDetails(baseProject);
            ParatextProjects.FakeAddProject(baseDetails, baseProject);

            var scrText = new DummySBAScrText(baseProject);

            // Register project for lookup
            var details = CreateProjectDetails(scrText);
            ParatextProjects.FakeAddProject(details, scrText);

            // Add books with default dates
            var defaultDate = DateTime.Now;
            foreach (var bookNum in bookNumbers)
            {
                scrText.SetBookPresent(bookNum, true, defaultDate);
            }

            return scrText;
        }

        /// <summary>
        /// Sets the modification date for a book in a project.
        /// This is used to control comparison results in tests.
        /// </summary>
        private static void SetBookModifiedDate(DummyScrText scrText, int bookNum, DateTime modifiedDate)
        {
            // Use the existing SetBookPresent method which sets the modification date
            scrText.SetBookPresent(bookNum, true, modifiedDate);
        }

        #endregion
    }
}
