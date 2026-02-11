using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ManageBooks;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.ManageBooks
{
    /// <summary>
    /// Tests for ScriptureTemplateService.CreateCV (CAP-029).
    ///
    /// CAP-029: ChapterVerseTemplateGeneration
    /// Strategy: Classic TDD - Algorithmic complexity requiring incremental discovery
    ///
    /// This capability generates chapter and verse markers based on versification.
    /// Input: ScrText (for versification), bookNum
    /// Output: USFM string with \c and \v markers
    ///
    /// Golden Masters: gm-011-create-cv, gm-021-scripture-template-cv
    /// Extraction: EXT-015 (ScriptureTemplate.CreateCV from PT9/ParatextBase/ScriptureTemplate.cs:257-340)
    /// Behaviors: BHV-T002
    /// Scenarios: TS-061, TS-074, TS-080
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class ScriptureTemplateServiceTests : PapiTestBase
    {
        private ScrText _scrText = null!;
        private ProjectDetails _projectDetails = null!;

        // Book numbers used in tests
        private const int GENESIS = 1;
        private const int EXODUS = 2;
        private const int PSALMS = 19;
        private const int MATTHEW = 40;
        private const int JUDE = 65;
        private const int REVELATION = 66;
        private const int ESG = 84; // Esther Greek - special handling (SUBFLOW-004)

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();
            _scrText = CreateDummyProject();
            _projectDetails = CreateProjectDetails(_scrText);
            ParatextProjects.FakeAddProject(_projectDetails, _scrText);
        }

        [TearDown]
        public void TearDown()
        {
            _scrText?.Dispose();
        }

        #region Acceptance Test (Outer Loop)

        /// <summary>
        /// Acceptance test for CAP-029: ChapterVerseTemplateGeneration capability.
        /// This test verifies the complete workflow - when it passes, the capability is complete.
        ///
        /// Tests that CreateCV generates correct chapter and verse markers for Jude
        /// (a single-chapter book with 25 verses in English versification).
        /// </summary>
        /// <remarks>
        /// Golden master: gm-011-create-cv
        /// - Book: Jude (65), Versification: English
        /// - Expected: 1 chapter, 25 verses
        /// - Jude has only 1 chapter with 25 verses in English versification
        /// </remarks>
        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-029")]
        [Property("ScenarioId", "TS-061")]
        [Property("BehaviorId", "BHV-T002")]
        [Property("GoldenMaster", "gm-011-create-cv")]
        [Description("Acceptance test: CreateCV generates correct markers for Jude (1 chapter, 25 verses)")]
        public void CreateCV_AcceptanceTest_GeneratesCorrectMarkersForJude()
        {
            // Arrange: Use English versification (default in DummyScrText)
            // Jude has 1 chapter with 25 verses

            // Act
            string result = ScriptureTemplateService.CreateCV(_scrText, JUDE);

            // Assert: Verify structure matches gm-011 expected output
            Assert.That(result, Is.Not.Null.And.Not.Empty, "CreateCV should return non-empty USFM");

            // Should have exactly 1 chapter marker
            int chapterCount = CountOccurrences(result, "\\c ");
            Assert.That(chapterCount, Is.EqualTo(1), "Jude should have exactly 1 chapter");

            // Should have exactly 25 verse markers (Jude 1:1-25)
            int verseCount = CountOccurrences(result, "\\v ");
            Assert.That(verseCount, Is.EqualTo(25), "Jude should have exactly 25 verses");

            // Verify first chapter marker
            Assert.That(result, Does.Contain("\\c 1"), "Should contain chapter 1 marker");

            // Verify verse range 1-25
            Assert.That(result, Does.Contain("\\v 1"), "Should contain verse 1");
            Assert.That(result, Does.Contain("\\v 25"), "Should contain verse 25");

            // Verify verse 26 does NOT exist (versification limit)
            Assert.That(result, Does.Not.Contain("\\v 26"), "Should not contain verse 26 (beyond versification limit)");
        }

        #endregion

        #region Golden Master Tests (gm-011, gm-021)

        /// <summary>
        /// TS-061: Create book with CV generates all chapter/verse markers.
        /// Tests CV generation produces complete marker structure.
        /// </summary>
        /// <remarks>
        /// Golden master: gm-011-create-cv
        /// Input: bookNum 65 (Jude), createCV: true, versification: English
        /// Expected: hasChapterMarkers: true, hasVerseMarkers: true, verseCount: 25
        /// </remarks>
        [Test]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-029")]
        [Property("ScenarioId", "TS-061")]
        [Property("BehaviorId", "BHV-T002")]
        [Property("GoldenMaster", "gm-011-create-cv")]
        [Description("CreateCV generates all chapter and verse markers matching golden master")]
        public void CreateCV_ForJude_MatchesGoldenMasterStructure()
        {
            // Arrange: Jude (book 65), English versification

            // Act
            string result = ScriptureTemplateService.CreateCV(_scrText, JUDE);

            // Assert: Match gm-011 structure expectations
            // hasChapterMarkers: true
            Assert.That(result, Does.Contain("\\c"), "Should have chapter markers");

            // hasVerseMarkers: true
            Assert.That(result, Does.Contain("\\v"), "Should have verse markers");

            // verseCount: 25
            int verseCount = CountOccurrences(result, "\\v ");
            Assert.That(verseCount, Is.EqualTo(25), "Should have exactly 25 verses per golden master");
        }

        /// <summary>
        /// TS-074: ScriptureTemplate generates CV markers.
        /// Tests the string output contains proper USFM markers.
        /// </summary>
        /// <remarks>
        /// Golden master: gm-021-scripture-template-cv
        /// Related behavior: EXT-015
        /// Input: bookNum 65 (Jude), versification: English
        /// Expected: chapterCount: 1, verseCount: 25
        /// </remarks>
        [Test]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-029")]
        [Property("ScenarioId", "TS-074")]
        [Property("BehaviorId", "BHV-T002")]
        [Property("GoldenMaster", "gm-021-scripture-template-cv")]
        [Description("ScriptureTemplate.CreateCV generates correct CV string output")]
        public void CreateCV_OutputString_ContainsProperUSFMMarkers()
        {
            // Arrange

            // Act
            string result = ScriptureTemplateService.CreateCV(_scrText, JUDE);

            // Assert: Per gm-021, output should be a well-formed USFM string
            // Chapter markers should be formatted as "\c N"
            Assert.That(result, Does.Match(@"\\c \d+"), "Chapter marker should be in format '\\c N'");

            // Verse markers should be formatted as "\v N"
            Assert.That(result, Does.Match(@"\\v \d+"), "Verse marker should be in format '\\v N'");

            // Chapter 1 specifically
            Assert.That(result, Does.Contain("\\c 1"), "Should have chapter 1");
        }

        #endregion

        #region Happy Path Tests

        /// <summary>
        /// Tests CreateCV for Genesis (multi-chapter book).
        /// Genesis has 50 chapters in English versification.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-029")]
        [Property("ScenarioId", "TS-074")]
        [Property("BehaviorId", "BHV-T002")]
        [Description("CreateCV generates correct chapter count for multi-chapter book")]
        public void CreateCV_ForGenesis_GeneratesAllChapters()
        {
            // Arrange: Genesis has 50 chapters in English versification

            // Act
            string result = ScriptureTemplateService.CreateCV(_scrText, GENESIS);

            // Assert
            Assert.That(result, Is.Not.Null.And.Not.Empty);

            // Genesis has 50 chapters
            int chapterCount = CountOccurrences(result, "\\c ");
            Assert.That(chapterCount, Is.EqualTo(50), "Genesis should have 50 chapters");

            // Verify chapter markers are sequential
            Assert.That(result, Does.Contain("\\c 1"), "Should have chapter 1");
            Assert.That(result, Does.Contain("\\c 50"), "Should have chapter 50");
        }

        /// <summary>
        /// Tests CreateCV for Matthew (NT book).
        /// Matthew has 28 chapters in English versification.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-029")]
        [Property("ScenarioId", "TS-074")]
        [Property("BehaviorId", "BHV-T002")]
        [Description("CreateCV generates correct chapter count for NT book")]
        public void CreateCV_ForMatthew_Generates28Chapters()
        {
            // Arrange: Matthew has 28 chapters

            // Act
            string result = ScriptureTemplateService.CreateCV(_scrText, MATTHEW);

            // Assert
            int chapterCount = CountOccurrences(result, "\\c ");
            Assert.That(chapterCount, Is.EqualTo(28), "Matthew should have 28 chapters");
        }

        /// <summary>
        /// Tests CreateCV for Revelation (last canonical book).
        /// Revelation has 22 chapters in English versification.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-029")]
        [Property("ScenarioId", "TS-074")]
        [Property("BehaviorId", "BHV-T002")]
        [Description("CreateCV works for last canonical book")]
        public void CreateCV_ForRevelation_Generates22Chapters()
        {
            // Arrange: Revelation has 22 chapters

            // Act
            string result = ScriptureTemplateService.CreateCV(_scrText, REVELATION);

            // Assert
            int chapterCount = CountOccurrences(result, "\\c ");
            Assert.That(chapterCount, Is.EqualTo(22), "Revelation should have 22 chapters");
        }

        /// <summary>
        /// Tests that CreateCV includes paragraph marker after chapter marker.
        /// Per PT9 ScriptureTemplate.CreateCV, each chapter should have \p after \c.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-029")]
        [Property("ScenarioId", "TS-074")]
        [Property("BehaviorId", "BHV-T002")]
        [Description("CreateCV includes paragraph marker after chapter marker")]
        public void CreateCV_IncludesParagraphMarkerAfterChapter()
        {
            // Arrange

            // Act
            string result = ScriptureTemplateService.CreateCV(_scrText, JUDE);

            // Assert: Should have \p marker after \c marker
            // Pattern: \c 1 followed by \p (with possible newlines)
            Assert.That(result, Does.Contain("\\p"), "Should include paragraph marker");

            // Per PT9 code: sb.AppendLine("\\c " + chapter); sb.AppendLine("\\p");
            // So \p should follow \c within the output
            int chapterIndex = result.IndexOf("\\c ");
            int paragraphIndex = result.IndexOf("\\p");

            Assert.That(paragraphIndex, Is.GreaterThan(chapterIndex),
                "Paragraph marker should appear after chapter marker");
        }

        /// <summary>
        /// Tests CreateCV generates verses sequentially starting from 1.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-029")]
        [Property("ScenarioId", "TS-074")]
        [Property("BehaviorId", "BHV-T002")]
        [Description("CreateCV generates verses sequentially starting from 1")]
        public void CreateCV_GeneratesVersesSequentially()
        {
            // Arrange: Jude chapter 1 has 25 verses

            // Act
            string result = ScriptureTemplateService.CreateCV(_scrText, JUDE);

            // Assert: Verses should be sequential 1-25
            for (int verse = 1; verse <= 25; verse++)
            {
                Assert.That(result, Does.Contain($"\\v {verse}"),
                    $"Should contain verse {verse}");
            }
        }

        /// <summary>
        /// Tests CreateCV for a book with many chapters generates all verses correctly.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-029")]
        [Property("ScenarioId", "TS-074")]
        [Property("BehaviorId", "BHV-T002")]
        [Description("CreateCV generates all verses for multi-chapter book")]
        public void CreateCV_ForExodus_GeneratesVersesForAllChapters()
        {
            // Arrange: Exodus has 40 chapters

            // Act
            string result = ScriptureTemplateService.CreateCV(_scrText, EXODUS);

            // Assert
            int chapterCount = CountOccurrences(result, "\\c ");
            Assert.That(chapterCount, Is.EqualTo(40), "Exodus should have 40 chapters");

            // Should have verse markers
            Assert.That(result, Does.Contain("\\v 1"), "Should have verse 1");

            // Each chapter should have at least one verse
            int verseCount = CountOccurrences(result, "\\v ");
            Assert.That(verseCount, Is.GreaterThan(40),
                "Should have more verses than chapters (each chapter has multiple verses)");
        }

        #endregion

        #region Edge Cases

        /// <summary>
        /// TS-080: Verse limit respected during CV creation.
        /// Tests that verses beyond the versification limit are not created.
        /// </summary>
        /// <remarks>
        /// Scenario: Create Jude with CV (max 25 verses in English versification)
        /// Expected: maxVerse: 25, no verse 26
        /// </remarks>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-029")]
        [Property("ScenarioId", "TS-080")]
        [Property("BehaviorId", "BHV-T002")]
        [Description("TS-080: Verse limit from versification is respected")]
        public void CreateCV_RespectsVersificationVerseLimit()
        {
            // Arrange: Jude has max 25 verses in English versification

            // Act
            string result = ScriptureTemplateService.CreateCV(_scrText, JUDE);

            // Assert: Should NOT have verse 26 or beyond
            Assert.That(result, Does.Not.Contain("\\v 26"),
                "Should not contain verse 26 (beyond versification limit)");
            Assert.That(result, Does.Not.Contain("\\v 27"),
                "Should not contain verse 27");

            // Should have exactly 25 verses
            int verseCount = CountOccurrences(result, "\\v ");
            Assert.That(verseCount, Is.EqualTo(25), "Should have exactly 25 verses");
        }

        /// <summary>
        /// Tests CreateCV respects chapter limit from versification.
        /// Jude should have only 1 chapter, no chapter 2.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-029")]
        [Property("ScenarioId", "TS-080")]
        [Property("BehaviorId", "BHV-T002")]
        [Description("CreateCV respects versification chapter limit")]
        public void CreateCV_RespectsVersificationChapterLimit()
        {
            // Arrange: Jude has 1 chapter in English versification

            // Act
            string result = ScriptureTemplateService.CreateCV(_scrText, JUDE);

            // Assert: Should NOT have chapter 2
            Assert.That(result, Does.Not.Contain("\\c 2"),
                "Jude should not have chapter 2 (only 1 chapter in versification)");

            // Verify exactly 1 chapter
            int chapterCount = CountOccurrences(result, "\\c ");
            Assert.That(chapterCount, Is.EqualTo(1), "Jude should have exactly 1 chapter");
        }

        /// <summary>
        /// Tests CreateCV handles Psalms correctly (large chapter count).
        /// Psalms has 150 chapters (songs) in English versification.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-029")]
        [Property("ScenarioId", "TS-074")]
        [Property("BehaviorId", "BHV-T002")]
        [Description("CreateCV handles large chapter count (Psalms has 150)")]
        public void CreateCV_ForPsalms_Generates150Chapters()
        {
            // Arrange: Psalms has 150 chapters

            // Act
            string result = ScriptureTemplateService.CreateCV(_scrText, PSALMS);

            // Assert
            int chapterCount = CountOccurrences(result, "\\c ");
            Assert.That(chapterCount, Is.EqualTo(150), "Psalms should have 150 chapters");

            // Verify first and last chapters
            Assert.That(result, Does.Contain("\\c 1"), "Should have chapter 1");
            Assert.That(result, Does.Contain("\\c 150"), "Should have chapter 150");
        }

        /// <summary>
        /// Tests CreateCV output does not contain actual text content.
        /// CV mode creates structure only, no verse text.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-029")]
        [Property("ScenarioId", "TS-074")]
        [Property("BehaviorId", "BHV-T002")]
        [Description("CreateCV generates markers only, no text content")]
        public void CreateCV_DoesNotContainTextContent()
        {
            // Arrange

            // Act
            string result = ScriptureTemplateService.CreateCV(_scrText, JUDE);

            // Assert: Output should be markers only, no actual Bible text
            // It should contain markers but not prose content
            Assert.That(result, Does.Not.Contain("In the beginning"),
                "Should not contain Genesis text");
            Assert.That(result, Does.Not.Contain("the word"),
                "Should not contain any verse text");

            // Verse markers should be followed by newline or space, not text
            // Each \v N should not have substantial text after it
            var lines = result.Split(new[] { '\r', '\n' }, StringSplitOptions.RemoveEmptyEntries);
            foreach (var line in lines.Where(l => l.TrimStart().StartsWith("\\v ")))
            {
                // Line should be just the marker (e.g., "\v 1" or "\v 1 " with trailing space)
                // Per PT9: sb.AppendLine("\\v " + verse); - just marker and number
                var trimmed = line.Trim();
                Assert.That(trimmed, Does.Match(@"^\\v \d+\s*$"),
                    $"Verse line should be marker only, got: {line}");
            }
        }

        /// <summary>
        /// Tests CreateCV returns proper line endings.
        /// Output should use consistent line breaks.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-029")]
        [Property("ScenarioId", "TS-074")]
        [Property("BehaviorId", "BHV-T002")]
        [Description("CreateCV uses proper line endings")]
        public void CreateCV_UsesProperLineEndings()
        {
            // Arrange

            // Act
            string result = ScriptureTemplateService.CreateCV(_scrText, JUDE);

            // Assert: Should have line breaks (not all on one line)
            Assert.That(result, Does.Contain("\n").Or.Contain("\r"),
                "Output should have line breaks");

            // Multiple distinct lines expected (chapters, paragraphs, verses)
            var lines = result.Split(new[] { '\r', '\n' }, StringSplitOptions.RemoveEmptyEntries);
            Assert.That(lines.Length, Is.GreaterThan(1), "Should have multiple lines");
        }

        #endregion

        #region Error Cases

        /// <summary>
        /// Tests CreateCV throws ArgumentNullException for null ScrText.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-029")]
        [Property("ScenarioId", "TS-074")]
        [Property("BehaviorId", "BHV-T002")]
        [Description("CreateCV throws ArgumentNullException for null ScrText")]
        public void CreateCV_WithNullScrText_ThrowsArgumentNullException()
        {
            // Arrange
            ScrText? nullScrText = null;

            // Act & Assert
            Assert.That(
                () => ScriptureTemplateService.CreateCV(nullScrText!, JUDE),
                Throws.TypeOf<ArgumentNullException>()
            );
        }

        /// <summary>
        /// Tests CreateCV handles invalid book number gracefully.
        /// Book number 0 is invalid.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-029")]
        [Property("ScenarioId", "TS-074")]
        [Property("BehaviorId", "BHV-T002")]
        [Description("CreateCV handles book number 0 gracefully")]
        public void CreateCV_WithBookNumberZero_ThrowsOrReturnsEmpty()
        {
            // Arrange
            const int invalidBookNum = 0;

            // Act & Assert: Either throws ArgumentException or returns empty/minimal output
            Assert.That(
                () => ScriptureTemplateService.CreateCV(_scrText, invalidBookNum),
                Throws.TypeOf<ArgumentException>()
                    .Or.TypeOf<ArgumentOutOfRangeException>()
            );
        }

        /// <summary>
        /// Tests CreateCV handles negative book number.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-029")]
        [Property("ScenarioId", "TS-074")]
        [Property("BehaviorId", "BHV-T002")]
        [Description("CreateCV throws for negative book number")]
        public void CreateCV_WithNegativeBookNumber_Throws()
        {
            // Arrange
            const int negativeBookNum = -1;

            // Act & Assert
            Assert.That(
                () => ScriptureTemplateService.CreateCV(_scrText, negativeBookNum),
                Throws.TypeOf<ArgumentException>()
                    .Or.TypeOf<ArgumentOutOfRangeException>()
            );
        }

        /// <summary>
        /// Tests CreateCV handles book number beyond valid range.
        /// Book numbers only go up to 124 (or 150 depending on canon).
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-029")]
        [Property("ScenarioId", "TS-074")]
        [Property("BehaviorId", "BHV-T002")]
        [Description("CreateCV handles book number beyond valid range")]
        public void CreateCV_WithBookNumberBeyondRange_Throws()
        {
            // Arrange
            const int invalidBookNum = 999;

            // Act & Assert
            Assert.That(
                () => ScriptureTemplateService.CreateCV(_scrText, invalidBookNum),
                Throws.TypeOf<ArgumentException>()
                    .Or.TypeOf<ArgumentOutOfRangeException>()
            );
        }

        #endregion

        #region ESG Special Handling (Deferred - SUBFLOW-004)

        /// <summary>
        /// Documents that ESG (Esther Greek) requires special template handling.
        /// This is deferred per SUBFLOW-004 in extraction-plan.md.
        /// </summary>
        /// <remarks>
        /// PT9 Source: ScriptureTemplate.cs:257-280 has special handling for ESG
        /// that requires a template file. This is out of scope for initial implementation.
        /// </remarks>
        [Test]
        [Category("Contract")]
        [Ignore("SUBFLOW-004: ESG special template handling deferred")]
        [Property("CapabilityId", "CAP-029")]
        [Property("ScenarioId", "TS-074")]
        [Property("BehaviorId", "BHV-T002")]
        [Description("ESG requires special template - deferred per SUBFLOW-004")]
        public void CreateCV_ForESG_RequiresSpecialHandling()
        {
            // This test documents that ESG (Esther Greek, book 84) requires
            // special handling via GetESGTemplate() in PT9.
            // Deferred to SUBFLOW-004.
            Assert.Ignore("ESG special template handling deferred to SUBFLOW-004");
        }

        #endregion

        #region Parameterized Tests

        /// <summary>
        /// Tests CreateCV for various canonical books with known chapter counts.
        /// </summary>
        [TestCase(1, 50, TestName = "Genesis has 50 chapters")]
        [TestCase(2, 40, TestName = "Exodus has 40 chapters")]
        [TestCase(19, 150, TestName = "Psalms has 150 chapters")]
        [TestCase(40, 28, TestName = "Matthew has 28 chapters")]
        [TestCase(43, 21, TestName = "John has 21 chapters")]
        [TestCase(65, 1, TestName = "Jude has 1 chapter")]
        [TestCase(66, 22, TestName = "Revelation has 22 chapters")]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-029")]
        [Property("ScenarioId", "TS-074")]
        [Property("BehaviorId", "BHV-T002")]
        public void CreateCV_GeneratesCorrectChapterCount(int bookNum, int expectedChapters)
        {
            // Arrange

            // Act
            string result = ScriptureTemplateService.CreateCV(_scrText, bookNum);

            // Assert
            int actualChapterCount = CountOccurrences(result, "\\c ");
            Assert.That(actualChapterCount, Is.EqualTo(expectedChapters),
                $"Book {bookNum} should have {expectedChapters} chapters");
        }

        #endregion

        #region Helper Methods

        /// <summary>
        /// Counts occurrences of a substring in a string.
        /// </summary>
        private static int CountOccurrences(string text, string pattern)
        {
            if (string.IsNullOrEmpty(text) || string.IsNullOrEmpty(pattern))
                return 0;

            int count = 0;
            int index = 0;

            while ((index = text.IndexOf(pattern, index, StringComparison.Ordinal)) != -1)
            {
                count++;
                index += pattern.Length;
            }

            return count;
        }

        #endregion
    }
}
