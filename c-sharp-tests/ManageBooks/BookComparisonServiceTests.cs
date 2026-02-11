using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ManageBooks;

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
    }
}
