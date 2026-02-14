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

        #region CAP-030: ExtractTemplate Tests

        // ===================================================================
        // CAP-030: ModelTextTemplateExtraction
        // Strategy: Classic TDD - Algorithmic complexity requiring incremental discovery
        //
        // This capability extracts template structure from a model project's book
        // while stripping the actual text content.
        //
        // Golden Masters: gm-012-create-model, gm-022-from-model-project
        // Extraction: EXT-016 (ScriptureTemplate.ExtractTemplate from PT9/ParatextBase/ScriptureTemplate.cs:129-216)
        // Behaviors: BHV-T003
        // Scenarios: TS-062, TS-075
        // ===================================================================

        #region CAP-030 Test Data

        // Sample USFM from a model project with various markers and content
        private const string ModelUsfmWithContent =
            @"\id MRK Mark - Model Project
\h Mark
\toc1 The Gospel According to Mark
\toc2 Mark
\toc3 Mrk
\mt1 Mark
\c 1
\s Section Heading
\p
\v 1 The beginning of the gospel of Jesus Christ, the Son of God.
\v 2 As it is written in Isaiah the prophet, ""Behold, I send my messenger before your face.""
\p
\v 3 A voice crying in the wilderness, ""Prepare the way of the Lord.""
\c 2
\s Another Section
\p
\v 1 And again he entered Capernaum after some days.
\q1 Poetry line one
\q2 Poetry line two
\v 2 And many were gathered together.";

        // Simple single-chapter book (like Jude)
        private const string ModelUsfmSingleChapter =
            @"\id JUD Jude - Model Project
\h Jude
\mt1 Jude
\c 1
\p
\v 1 Jude, a servant of Jesus Christ.
\v 2 Mercy to you and peace and love.
\p
\v 3 Beloved, while I was making every effort to write.";

        // USFM with complex formatting markers
        private const string ModelUsfmComplexFormatting =
            @"\id GEN Genesis - Model Project
\c 1
\p
\v 1 In the \nd Lord\nd* beginning.
\v 2 And the earth was \add without form\add*.
\f + \fr 1:2 \ft Some footnote text.\f*
\p
\v 3 Then God said.";

        #endregion

        #region CAP-030 Acceptance Test

        /// <summary>
        /// Acceptance test for CAP-030: Model text template extraction.
        /// This test verifies the complete behavior of ExtractTemplate.
        /// </summary>
        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-030")]
        [Property("ScenarioId", "TS-075")]
        [Property("BehaviorId", "BHV-T003")]
        [Property("ExtractionId", "EXT-016")]
        [Description("Acceptance test: ExtractTemplate preserves structural markers while stripping text content")]
        public void ExtractTemplate_FromModelProject_PreservesMarkersStripsContent()
        {
            // Arrange: Create a model ScrText with book content
            var modelScrText = CreateModelScrTextWithBook(41, ModelUsfmWithContent); // Mark = book 41

            // Act
            string template = ScriptureTemplateService.ExtractTemplate(modelScrText, 41);

            // Assert: Template should contain all structural markers
            Assert.That(template, Does.Contain(@"\id MRK"), "Template should preserve book ID marker");
            Assert.That(template, Does.Contain(@"\c 1"), "Template should preserve chapter markers");
            Assert.That(template, Does.Contain(@"\c 2"), "Template should preserve all chapter markers");
            Assert.That(template, Does.Contain(@"\v 1"), "Template should preserve verse markers");
            Assert.That(template, Does.Contain(@"\p"), "Template should preserve paragraph markers");
            Assert.That(template, Does.Contain(@"\s"), "Template should preserve section heading markers");

            // Template should NOT contain actual text content
            Assert.That(
                template,
                Does.Not.Contain("beginning of the gospel"),
                "Template should strip verse text"
            );
            Assert.That(
                template,
                Does.Not.Contain("Section Heading"),
                "Template should strip section heading text"
            );
            Assert.That(
                template,
                Does.Not.Contain("Model Project"),
                "Template should strip ID line description"
            );
            Assert.That(template, Does.Not.Contain("Isaiah"), "Template should strip all content text");
        }

        #endregion

        #region CAP-030 Marker Preservation Tests

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-062")]
        [Property("BehaviorId", "BHV-T003")]
        [Description("ExtractTemplate preserves chapter marker numbers")]
        public void ExtractTemplate_WithMultipleChapters_PreservesChapterNumbers()
        {
            // Arrange
            var modelScrText = CreateModelScrTextWithBook(41, ModelUsfmWithContent);

            // Act
            string template = ScriptureTemplateService.ExtractTemplate(modelScrText, 41);

            // Assert
            Assert.That(template, Does.Contain(@"\c 1"));
            Assert.That(template, Does.Contain(@"\c 2"));
            // Verify the chapter numbers are preserved with their values
            Assert.That(template, Does.Match(@"\\c 1\s"));
            Assert.That(template, Does.Match(@"\\c 2\s"));
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-062")]
        [Property("BehaviorId", "BHV-T003")]
        [Description("ExtractTemplate preserves verse marker numbers")]
        public void ExtractTemplate_WithVerses_PreservesVerseNumbers()
        {
            // Arrange
            var modelScrText = CreateModelScrTextWithBook(41, ModelUsfmWithContent);

            // Act
            string template = ScriptureTemplateService.ExtractTemplate(modelScrText, 41);

            // Assert
            Assert.That(template, Does.Contain(@"\v 1"));
            Assert.That(template, Does.Contain(@"\v 2"));
            Assert.That(template, Does.Contain(@"\v 3"));
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-075")]
        [Property("BehaviorId", "BHV-T003")]
        [Description("ExtractTemplate preserves paragraph markers")]
        public void ExtractTemplate_WithParagraphs_PreservesParagraphMarkers()
        {
            // Arrange
            var modelScrText = CreateModelScrTextWithBook(41, ModelUsfmWithContent);

            // Act
            string template = ScriptureTemplateService.ExtractTemplate(modelScrText, 41);

            // Assert: Count paragraph markers - there should be multiple
            int paragraphCount = CountOccurrences(template, @"\p");
            Assert.That(
                paragraphCount,
                Is.GreaterThan(1),
                "Template should preserve multiple paragraph markers"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-075")]
        [Property("BehaviorId", "BHV-T003")]
        [Description("ExtractTemplate preserves section heading markers")]
        public void ExtractTemplate_WithSectionHeadings_PreservesSectionMarkers()
        {
            // Arrange
            var modelScrText = CreateModelScrTextWithBook(41, ModelUsfmWithContent);

            // Act
            string template = ScriptureTemplateService.ExtractTemplate(modelScrText, 41);

            // Assert
            Assert.That(template, Does.Contain(@"\s"), "Template should preserve section markers");
            // But the heading text should be stripped
            Assert.That(template, Does.Not.Contain("Section Heading"));
            Assert.That(template, Does.Not.Contain("Another Section"));
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-075")]
        [Property("BehaviorId", "BHV-T003")]
        [Description("ExtractTemplate preserves poetry markers")]
        public void ExtractTemplate_WithPoetryMarkers_PreservesPoetryMarkers()
        {
            // Arrange
            var modelScrText = CreateModelScrTextWithBook(41, ModelUsfmWithContent);

            // Act
            string template = ScriptureTemplateService.ExtractTemplate(modelScrText, 41);

            // Assert
            Assert.That(template, Does.Contain(@"\q1"), @"Template should preserve \q1 marker");
            Assert.That(template, Does.Contain(@"\q2"), @"Template should preserve \q2 marker");
            // But poetry content should be stripped
            Assert.That(template, Does.Not.Contain("Poetry line"));
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-075")]
        [Property("BehaviorId", "BHV-T003")]
        [Description("ExtractTemplate preserves title markers")]
        public void ExtractTemplate_WithTitles_PreservesTitleMarkers()
        {
            // Arrange
            var modelScrText = CreateModelScrTextWithBook(41, ModelUsfmWithContent);

            // Act
            string template = ScriptureTemplateService.ExtractTemplate(modelScrText, 41);

            // Assert
            Assert.That(template, Does.Contain(@"\mt1"), "Template should preserve main title marker");
            Assert.That(template, Does.Contain(@"\h"), "Template should preserve header marker");
            Assert.That(template, Does.Contain(@"\toc1"), "Template should preserve TOC markers");
        }

        #endregion

        #region CAP-030 Content Stripping Tests

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-075")]
        [Property("BehaviorId", "BHV-T003")]
        [Description("ExtractTemplate strips verse text content")]
        public void ExtractTemplate_WithVerseContent_StripsVerseText()
        {
            // Arrange
            var modelScrText = CreateModelScrTextWithBook(41, ModelUsfmWithContent);

            // Act
            string template = ScriptureTemplateService.ExtractTemplate(modelScrText, 41);

            // Assert
            Assert.That(template, Does.Not.Contain("beginning of the gospel"));
            Assert.That(template, Does.Not.Contain("Jesus Christ"));
            Assert.That(template, Does.Not.Contain("Isaiah the prophet"));
            Assert.That(template, Does.Not.Contain("Capernaum"));
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-075")]
        [Property("BehaviorId", "BHV-T003")]
        [Description("ExtractTemplate strips section heading text")]
        public void ExtractTemplate_WithSectionHeadingText_StripsSectionText()
        {
            // Arrange
            var modelScrText = CreateModelScrTextWithBook(41, ModelUsfmWithContent);

            // Act
            string template = ScriptureTemplateService.ExtractTemplate(modelScrText, 41);

            // Assert
            Assert.That(template, Does.Not.Contain("Section Heading"));
            Assert.That(template, Does.Not.Contain("Another Section"));
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-075")]
        [Property("BehaviorId", "BHV-T003")]
        [Description("ExtractTemplate strips ID line description text")]
        public void ExtractTemplate_WithIdLineDescription_StripsDescriptionButKeepsBookCode()
        {
            // Arrange
            var modelScrText = CreateModelScrTextWithBook(41, ModelUsfmWithContent);

            // Act
            string template = ScriptureTemplateService.ExtractTemplate(modelScrText, 41);

            // Assert
            Assert.That(template, Does.Contain(@"\id MRK"), "Template should keep book code");
            Assert.That(
                template,
                Does.Not.Contain("Model Project"),
                "Template should strip project name from ID line"
            );
            Assert.That(
                template,
                Does.Not.Contain("Mark -"),
                "Template should strip book name from ID line"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-075")]
        [Property("BehaviorId", "BHV-T003")]
        [Description("ExtractTemplate strips inline character styles but preserves paragraph structure")]
        public void ExtractTemplate_WithCharacterStyles_StripsCharacterStyleContent()
        {
            // Arrange
            var modelScrText = CreateModelScrTextWithBook(1, ModelUsfmComplexFormatting); // Genesis = book 1

            // Act
            string template = ScriptureTemplateService.ExtractTemplate(modelScrText, 1);

            // Assert: Character style content should be stripped
            Assert.That(template, Does.Not.Contain(@"\nd"));
            Assert.That(template, Does.Not.Contain("Lord"));
            Assert.That(template, Does.Not.Contain(@"\add"));
            Assert.That(template, Does.Not.Contain("without form"));
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-075")]
        [Property("BehaviorId", "BHV-T003")]
        [Description("ExtractTemplate strips footnotes completely")]
        public void ExtractTemplate_WithFootnotes_StripsFootnoteContent()
        {
            // Arrange
            var modelScrText = CreateModelScrTextWithBook(1, ModelUsfmComplexFormatting);

            // Act
            string template = ScriptureTemplateService.ExtractTemplate(modelScrText, 1);

            // Assert
            Assert.That(template, Does.Not.Contain(@"\f"));
            Assert.That(template, Does.Not.Contain(@"\fr"));
            Assert.That(template, Does.Not.Contain(@"\ft"));
            Assert.That(template, Does.Not.Contain("footnote"));
        }

        #endregion

        #region CAP-030 Edge Case Tests

        [Test]
        [Category("EdgeCase")]
        [Property("ScenarioId", "TS-062")]
        [Property("BehaviorId", "BHV-T003")]
        [Description("ExtractTemplate works with single-chapter books like Jude")]
        public void ExtractTemplate_SingleChapterBook_PreservesStructure()
        {
            // Arrange
            var modelScrText = CreateModelScrTextWithBook(65, ModelUsfmSingleChapter); // Jude = book 65

            // Act
            string template = ScriptureTemplateService.ExtractTemplate(modelScrText, 65);

            // Assert
            Assert.That(template, Does.Contain(@"\id JUD"));
            Assert.That(template, Does.Contain(@"\c 1"));
            Assert.That(template, Does.Contain(@"\v 1"));
            Assert.That(template, Does.Contain(@"\v 2"));
            Assert.That(template, Does.Contain(@"\v 3"));
            Assert.That(template, Does.Contain(@"\p"));

            // Only chapter 1 should exist
            Assert.That(template, Does.Not.Contain(@"\c 2"));

            // Content should be stripped
            Assert.That(template, Does.Not.Contain("servant of Jesus Christ"));
            Assert.That(template, Does.Not.Contain("Mercy to you"));
        }

        [Test]
        [Category("EdgeCase")]
        [Property("ScenarioId", "TS-062")]
        [Property("BehaviorId", "BHV-T003")]
        [Description("ExtractTemplate handles empty book gracefully")]
        public void ExtractTemplate_EmptyBook_ReturnsMinimalTemplate()
        {
            // Arrange
            const string emptyUsfm = @"\id MRK";
            var modelScrText = CreateModelScrTextWithBook(41, emptyUsfm);

            // Act
            string template = ScriptureTemplateService.ExtractTemplate(modelScrText, 41);

            // Assert
            Assert.That(
                template,
                Does.Contain(@"\id MRK"),
                "Should at minimum contain the ID marker"
            );
            // Should not throw and should return something usable
            Assert.That(template, Is.Not.Null);
            Assert.That(template, Is.Not.Empty);
        }

        [Test]
        [Category("EdgeCase")]
        [Property("ScenarioId", "TS-062")]
        [Property("BehaviorId", "BHV-T003")]
        [Description("ExtractTemplate handles book with only ID and chapter markers")]
        public void ExtractTemplate_IdAndChaptersOnly_PreservesStructure()
        {
            // Arrange
            const string minimalUsfm =
                @"\id PHM
\c 1";
            var modelScrText = CreateModelScrTextWithBook(57, minimalUsfm); // Philemon = book 57

            // Act
            string template = ScriptureTemplateService.ExtractTemplate(modelScrText, 57);

            // Assert
            Assert.That(template, Does.Contain(@"\id PHM"));
            Assert.That(template, Does.Contain(@"\c 1"));
        }

        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-075")]
        [Property("BehaviorId", "BHV-T003")]
        [Description("ExtractTemplate preserves correct book ID code")]
        public void ExtractTemplate_BookIdPreserved_MatchesCanonicalCode()
        {
            // Arrange
            var modelScrText = CreateModelScrTextWithBook(41, ModelUsfmWithContent);

            // Act
            string template = ScriptureTemplateService.ExtractTemplate(modelScrText, 41);

            // Assert: The first non-whitespace content after \id should be MRK
            Assert.That(template, Does.StartWith(@"\id MRK"));
        }

        #endregion

        #region CAP-030 Helper Methods

        /// <summary>
        /// Creates a model ScrText with the specified book content.
        /// Uses DummyScrText to provide in-memory USFM content.
        /// </summary>
        private ScrText CreateModelScrTextWithBook(int bookNum, string usfmContent)
        {
            // Create a dummy model project
            var modelScrText = CreateDummyProject();

            // Put the USFM content into the book
            // DummyScrText.PutText stores content in the in-memory file manager
            modelScrText.PutText(bookNum, 0, false, usfmContent, null);

            return modelScrText;
        }

        #endregion

        #endregion

        #region CAP-028: CreateOneBook Tests

        // ===================================================================
        // CAP-028: ScriptureTemplateBookCreation
        // Strategy: Classic TDD - Algorithm extraction requiring incremental discovery
        //
        // This capability orchestrates book creation based on the selected mode:
        // - Empty: Just the \id line with book code and project name
        // - CV: \id line + chapter/verse markers (delegates to CreateCV - CAP-029)
        // - Model: Extracts template from model project (delegates to ExtractTemplate - CAP-030)
        //
        // PT9 Source: ParatextBase/ScriptureTemplate.cs:45-103
        // Golden Masters: gm-020-scripture-template-empty, gm-021-scripture-template-cv, gm-022-from-model-project
        // Extraction: EXT-014 (ScriptureTemplate.CreateOneBook)
        // Behaviors: BHV-T001, BHV-T002, BHV-T003
        // Scenarios: TS-060, TS-061, TS-062, TS-073
        // ===================================================================

        #region CAP-028 Acceptance Tests

        /// <summary>
        /// Acceptance test for CAP-028: ScriptureTemplateBookCreation (Empty mode).
        /// This test verifies CreateOneBook produces correct output for empty book creation.
        /// </summary>
        /// <remarks>
        /// Golden master: gm-020-scripture-template-empty
        /// - Book: Jude (65)
        /// - Mode: Empty (createCV: false, modelScrText: null)
        /// - Expected: Only \id line with book code
        /// </remarks>
        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-028")]
        [Property("ScenarioId", "TS-060")]
        [Property("BehaviorId", "BHV-T001")]
        [Property("ExtractionId", "EXT-014")]
        [Property("GoldenMaster", "gm-020-scripture-template-empty")]
        [Description("Acceptance test: CreateOneBook in empty mode produces minimal USFM with \\id line only")]
        public void CreateOneBook_AcceptanceTest_EmptyMode_ProducesMinimalUSFM()
        {
            // Arrange: Use the test project, Jude book number
            // Empty mode: createCV = false, modelScrText = null

            // Act
            bool result = ScriptureTemplateService.CreateOneBook(_scrText, JUDE, createCV: false, modelScrText: null);

            // Assert: Should succeed
            Assert.That(result, Is.True, "CreateOneBook should return true on success");

            // Verify book content was created
            string bookContent = _scrText.GetText(new VerseRef(JUDE, 0, 0), false, false);
            Assert.That(bookContent, Is.Not.Null.And.Not.Empty, "Book content should be created");

            // Should contain \id line with correct book code (JUD for Jude)
            Assert.That(bookContent, Does.Contain(@"\id JUD"), "Book should have \\id JUD marker");

            // Empty mode should NOT have chapter or verse markers
            Assert.That(bookContent, Does.Not.Contain(@"\c "), "Empty mode should not have chapter markers");
            Assert.That(bookContent, Does.Not.Contain(@"\v "), "Empty mode should not have verse markers");
        }

        /// <summary>
        /// Acceptance test for CAP-028: ScriptureTemplateBookCreation (CV mode).
        /// This test verifies CreateOneBook produces correct output when creating with CV markers.
        /// </summary>
        /// <remarks>
        /// Golden master: gm-021-scripture-template-cv
        /// - Book: Jude (65)
        /// - Mode: CV (createCV: true, modelScrText: null)
        /// - Expected: \id line + chapter/verse markers from versification
        /// </remarks>
        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-028")]
        [Property("ScenarioId", "TS-061")]
        [Property("BehaviorId", "BHV-T002")]
        [Property("ExtractionId", "EXT-014")]
        [Property("GoldenMaster", "gm-021-scripture-template-cv")]
        [Description("Acceptance test: CreateOneBook in CV mode produces USFM with chapter/verse markers")]
        public void CreateOneBook_AcceptanceTest_CVMode_ProducesUSFMWithMarkers()
        {
            // Arrange: CV mode - createCV = true, modelScrText = null

            // Act
            bool result = ScriptureTemplateService.CreateOneBook(_scrText, JUDE, createCV: true, modelScrText: null);

            // Assert: Should succeed
            Assert.That(result, Is.True, "CreateOneBook should return true on success");

            // Verify book content was created
            string bookContent = _scrText.GetText(new VerseRef(JUDE, 0, 0), false, false);
            Assert.That(bookContent, Is.Not.Null.And.Not.Empty, "Book content should be created");

            // Should contain \id line
            Assert.That(bookContent, Does.Contain(@"\id JUD"), "Book should have \\id JUD marker");

            // CV mode should have chapter markers (Jude has 1 chapter)
            Assert.That(bookContent, Does.Contain(@"\c 1"), "CV mode should have chapter 1 marker");

            // Should have verse markers (Jude has 25 verses)
            Assert.That(bookContent, Does.Contain(@"\v 1"), "CV mode should have verse markers");
            Assert.That(bookContent, Does.Contain(@"\v 25"), "CV mode should have verse 25 (last verse in Jude)");
        }

        /// <summary>
        /// Acceptance test for CAP-028: ScriptureTemplateBookCreation (Model mode).
        /// This test verifies CreateOneBook produces correct output when based on a model project.
        /// </summary>
        /// <remarks>
        /// Golden master: gm-022-from-model-project
        /// - Book: Mark (41)
        /// - Mode: Model (createCV: false, modelScrText: model project with Mark)
        /// - Expected: Template structure from model, text content stripped
        /// </remarks>
        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-028")]
        [Property("ScenarioId", "TS-062")]
        [Property("BehaviorId", "BHV-T003")]
        [Property("ExtractionId", "EXT-014")]
        [Property("GoldenMaster", "gm-022-from-model-project")]
        [Description("Acceptance test: CreateOneBook in model mode produces USFM template from model project")]
        public void CreateOneBook_AcceptanceTest_ModelMode_ProducesTemplateFromModel()
        {
            // Arrange: Create a model project with Mark content
            var modelScrText = CreateModelScrTextWithBook(41, ModelUsfmWithContent);

            // Act: Create book based on model (createCV = false, modelScrText = model project)
            bool result = ScriptureTemplateService.CreateOneBook(_scrText, 41, createCV: false, modelScrText: modelScrText);

            // Assert: Should succeed
            Assert.That(result, Is.True, "CreateOneBook should return true on success");

            // Verify book content was created
            string bookContent = _scrText.GetText(new VerseRef(41, 0, 0), false, false);
            Assert.That(bookContent, Is.Not.Null.And.Not.Empty, "Book content should be created");

            // Should contain structural markers from model
            Assert.That(bookContent, Does.Contain(@"\id MRK"), "Should have book ID marker");
            Assert.That(bookContent, Does.Contain(@"\c 1"), "Should have chapter markers from model");
            Assert.That(bookContent, Does.Contain(@"\v 1"), "Should have verse markers from model");
            Assert.That(bookContent, Does.Contain(@"\p"), "Should have paragraph markers from model");
            Assert.That(bookContent, Does.Contain(@"\s"), "Should have section markers from model");

            // Should NOT contain actual text content from model
            Assert.That(bookContent, Does.Not.Contain("beginning of the gospel"), "Should not have verse text");
            Assert.That(bookContent, Does.Not.Contain("Section Heading"), "Should not have section heading text");
        }

        #endregion

        #region CAP-028 Golden Master Tests

        /// <summary>
        /// TS-073: ScriptureTemplate creates empty book.
        /// Tests empty book creation matches golden master expectations.
        /// </summary>
        /// <remarks>
        /// Golden master: gm-020-scripture-template-empty
        /// Input: bookNum 65 (Jude), createCV: false, modelScrText: null
        /// Expected: bookCreated: true, hasIdLine: true, hasChapterMarkers: false
        /// </remarks>
        [Test]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-028")]
        [Property("ScenarioId", "TS-073")]
        [Property("BehaviorId", "BHV-T001")]
        [Property("ExtractionId", "EXT-014")]
        [Property("GoldenMaster", "gm-020-scripture-template-empty")]
        [Description("TS-073: ScriptureTemplate creates empty book with ID line only")]
        public void CreateOneBook_EmptyMode_MatchesGoldenMasterStructure()
        {
            // Arrange

            // Act
            bool result = ScriptureTemplateService.CreateOneBook(_scrText, JUDE, createCV: false, modelScrText: null);

            // Assert: Per gm-020 expectations
            Assert.That(result, Is.True, "bookCreated should be true");

            string bookContent = _scrText.GetText(new VerseRef(JUDE, 0, 0), false, false);

            // hasIdLine: true
            Assert.That(bookContent, Does.Contain(@"\id"), "hasIdLine should be true");

            // hasChapterMarkers: false
            Assert.That(bookContent, Does.Not.Contain(@"\c"), "hasChapterMarkers should be false for empty mode");

            // hasVerseMarkers: false
            Assert.That(bookContent, Does.Not.Contain(@"\v"), "hasVerseMarkers should be false for empty mode");
        }

        /// <summary>
        /// TS-060: Create empty book produces minimal USFM.
        /// </summary>
        [Test]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-028")]
        [Property("ScenarioId", "TS-060")]
        [Property("BehaviorId", "BHV-T001")]
        [Property("ExtractionId", "EXT-014")]
        [Description("TS-060: Create empty book produces minimal USFM with \\id line only")]
        public void CreateOneBook_EmptyMode_ProducesMinimalUSFM()
        {
            // Arrange

            // Act
            ScriptureTemplateService.CreateOneBook(_scrText, JUDE, createCV: false, modelScrText: null);

            // Assert
            string bookContent = _scrText.GetText(new VerseRef(JUDE, 0, 0), false, false);

            // Should be minimal - just the \id line
            // Format per PT9: "\id {BOOK} {BookEnglishName} - {ProjectName}" or just "\id {BOOK}"
            Assert.That(bookContent, Does.StartWith(@"\id JUD"), "Should start with \\id JUD");

            // Verify it's minimal by checking there are no other major markers
            int markerCount = CountOccurrences(bookContent, @"\");
            // Allow for \id and possibly project name, but not chapter/verse/paragraph markers
            Assert.That(markerCount, Is.LessThanOrEqualTo(3), "Empty mode should have minimal markers (just \\id line)");
        }

        #endregion

        #region CAP-028 Happy Path Tests

        /// <summary>
        /// Tests CreateOneBook returns true on successful empty book creation.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-028")]
        [Property("ScenarioId", "TS-060")]
        [Property("BehaviorId", "BHV-T001")]
        [Description("CreateOneBook returns true on successful empty book creation")]
        public void CreateOneBook_EmptyMode_ReturnsTrue()
        {
            // Arrange

            // Act
            bool result = ScriptureTemplateService.CreateOneBook(_scrText, GENESIS, createCV: false, modelScrText: null);

            // Assert
            Assert.That(result, Is.True, "Should return true on successful creation");
        }

        /// <summary>
        /// Tests CreateOneBook returns true on successful CV book creation.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-028")]
        [Property("ScenarioId", "TS-061")]
        [Property("BehaviorId", "BHV-T002")]
        [Description("CreateOneBook returns true on successful CV book creation")]
        public void CreateOneBook_CVMode_ReturnsTrue()
        {
            // Arrange

            // Act
            bool result = ScriptureTemplateService.CreateOneBook(_scrText, GENESIS, createCV: true, modelScrText: null);

            // Assert
            Assert.That(result, Is.True, "Should return true on successful creation");
        }

        /// <summary>
        /// Tests CreateOneBook returns true on successful model-based book creation.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-028")]
        [Property("ScenarioId", "TS-062")]
        [Property("BehaviorId", "BHV-T003")]
        [Description("CreateOneBook returns true on successful model-based book creation")]
        public void CreateOneBook_ModelMode_ReturnsTrue()
        {
            // Arrange
            var modelScrText = CreateModelScrTextWithBook(41, ModelUsfmWithContent);

            // Act
            bool result = ScriptureTemplateService.CreateOneBook(_scrText, 41, createCV: false, modelScrText: modelScrText);

            // Assert
            Assert.That(result, Is.True, "Should return true on successful creation");
        }

        /// <summary>
        /// Tests that CV mode delegates to CreateCV (CAP-029) correctly.
        /// Verified by checking output structure matches what CreateCV would produce.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-028")]
        [Property("ScenarioId", "TS-061")]
        [Property("BehaviorId", "BHV-T002")]
        [Description("CreateOneBook CV mode delegates to CreateCV correctly")]
        public void CreateOneBook_CVMode_DelegatesToCreateCV()
        {
            // Arrange: Get expected CV output directly
            string expectedCV = ScriptureTemplateService.CreateCV(_scrText, GENESIS);

            // Act: Create book with CV mode
            ScriptureTemplateService.CreateOneBook(_scrText, GENESIS, createCV: true, modelScrText: null);

            // Assert: Book content should include CV output
            string bookContent = _scrText.GetText(new VerseRef(GENESIS, 0, 0), false, false);

            // Should have same chapter/verse structure as CreateCV
            int expectedChapters = CountOccurrences(expectedCV, @"\c ");
            int actualChapters = CountOccurrences(bookContent, @"\c ");
            Assert.That(actualChapters, Is.EqualTo(expectedChapters), "Should have same chapter count as CreateCV");

            int expectedVerses = CountOccurrences(expectedCV, @"\v ");
            int actualVerses = CountOccurrences(bookContent, @"\v ");
            Assert.That(actualVerses, Is.EqualTo(expectedVerses), "Should have same verse count as CreateCV");
        }

        /// <summary>
        /// Tests that model mode delegates to ExtractTemplate (CAP-030) correctly.
        /// Verified by checking output structure matches what ExtractTemplate would produce.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-028")]
        [Property("ScenarioId", "TS-062")]
        [Property("BehaviorId", "BHV-T003")]
        [Description("CreateOneBook model mode delegates to ExtractTemplate correctly")]
        public void CreateOneBook_ModelMode_DelegatesToExtractTemplate()
        {
            // Arrange: Create model and get expected template directly
            var modelScrText = CreateModelScrTextWithBook(41, ModelUsfmWithContent);
            string expectedTemplate = ScriptureTemplateService.ExtractTemplate(modelScrText, 41);

            // Act: Create book with model mode
            ScriptureTemplateService.CreateOneBook(_scrText, 41, createCV: false, modelScrText: modelScrText);

            // Assert: Book content should include template output
            string bookContent = _scrText.GetText(new VerseRef(41, 0, 0), false, false);

            // Should have structural markers from template
            Assert.That(bookContent, Does.Contain(@"\c 1"), "Should have chapter markers from template");
            Assert.That(bookContent, Does.Contain(@"\c 2"), "Should have all chapter markers from template");
            Assert.That(bookContent, Does.Contain(@"\s"), "Should have section markers from template");

            // Content should be stripped (same as ExtractTemplate)
            Assert.That(bookContent, Does.Not.Contain("beginning of the gospel"), "Should not have verse text");
        }

        /// <summary>
        /// Tests CreateOneBook for multi-chapter book (Genesis) in empty mode.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-028")]
        [Property("ScenarioId", "TS-060")]
        [Property("BehaviorId", "BHV-T001")]
        [Description("CreateOneBook creates empty book for multi-chapter book")]
        public void CreateOneBook_EmptyMode_ForGenesis_CreatesEmptyBook()
        {
            // Arrange

            // Act
            ScriptureTemplateService.CreateOneBook(_scrText, GENESIS, createCV: false, modelScrText: null);

            // Assert
            string bookContent = _scrText.GetText(new VerseRef(GENESIS, 0, 0), false, false);
            Assert.That(bookContent, Does.Contain(@"\id GEN"), "Should have Genesis ID marker");
            Assert.That(bookContent, Does.Not.Contain(@"\c"), "Empty mode should not have chapter markers");
        }

        /// <summary>
        /// Tests CreateOneBook for multi-chapter book (Genesis) in CV mode.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-028")]
        [Property("ScenarioId", "TS-061")]
        [Property("BehaviorId", "BHV-T002")]
        [Description("CreateOneBook CV mode creates all chapters for multi-chapter book")]
        public void CreateOneBook_CVMode_ForGenesis_Creates50Chapters()
        {
            // Arrange

            // Act
            ScriptureTemplateService.CreateOneBook(_scrText, GENESIS, createCV: true, modelScrText: null);

            // Assert
            string bookContent = _scrText.GetText(new VerseRef(GENESIS, 0, 0), false, false);
            int chapterCount = CountOccurrences(bookContent, @"\c ");
            Assert.That(chapterCount, Is.EqualTo(50), "Genesis should have 50 chapters");
        }

        #endregion

        #region CAP-028 ID Line Format Tests

        /// <summary>
        /// Tests that the \id line contains the correct 3-letter book code.
        /// Per PT9 ScriptureTemplate.cs:67-68, format is "\id {BOOK}"
        /// </summary>
        [TestCase(GENESIS, "GEN", TestName = "Genesis has code GEN")]
        [TestCase(EXODUS, "EXO", TestName = "Exodus has code EXO")]
        [TestCase(PSALMS, "PSA", TestName = "Psalms has code PSA")]
        [TestCase(MATTHEW, "MAT", TestName = "Matthew has code MAT")]
        [TestCase(JUDE, "JUD", TestName = "Jude has code JUD")]
        [TestCase(REVELATION, "REV", TestName = "Revelation has code REV")]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-028")]
        [Property("ScenarioId", "TS-060")]
        [Property("BehaviorId", "BHV-T001")]
        [Description("CreateOneBook uses correct 3-letter book code in \\id line")]
        public void CreateOneBook_EmptyMode_UsesCorrectBookCode(int bookNum, string expectedCode)
        {
            // Arrange

            // Act
            ScriptureTemplateService.CreateOneBook(_scrText, bookNum, createCV: false, modelScrText: null);

            // Assert
            string bookContent = _scrText.GetText(new VerseRef(bookNum, 0, 0), false, false);
            Assert.That(bookContent, Does.Contain($@"\id {expectedCode}"), $"Should contain \\id {expectedCode}");
        }

        /// <summary>
        /// Tests that the \id line starts the book content.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-028")]
        [Property("ScenarioId", "TS-060")]
        [Property("BehaviorId", "BHV-T001")]
        [Description("CreateOneBook starts content with \\id line")]
        public void CreateOneBook_EmptyMode_StartsWithIdLine()
        {
            // Arrange

            // Act
            ScriptureTemplateService.CreateOneBook(_scrText, JUDE, createCV: false, modelScrText: null);

            // Assert
            string bookContent = _scrText.GetText(new VerseRef(JUDE, 0, 0), false, false);
            string trimmed = bookContent.TrimStart();
            Assert.That(trimmed, Does.StartWith(@"\id"), "Book content should start with \\id marker");
        }

        #endregion

        #region CAP-028 Error Cases

        /// <summary>
        /// Tests CreateOneBook throws ArgumentNullException for null ScrText.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-028")]
        [Property("ScenarioId", "TS-073")]
        [Property("BehaviorId", "BHV-T001")]
        [Description("CreateOneBook throws ArgumentNullException for null ScrText")]
        public void CreateOneBook_WithNullScrText_ThrowsArgumentNullException()
        {
            // Arrange
            ScrText? nullScrText = null;

            // Act & Assert
            Assert.That(
                () => ScriptureTemplateService.CreateOneBook(nullScrText!, JUDE, createCV: false, modelScrText: null),
                Throws.TypeOf<ArgumentNullException>()
            );
        }

        /// <summary>
        /// Tests CreateOneBook handles invalid book number (0).
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-028")]
        [Property("ScenarioId", "TS-073")]
        [Property("BehaviorId", "BHV-T001")]
        [Description("CreateOneBook throws for invalid book number 0")]
        public void CreateOneBook_WithBookNumberZero_Throws()
        {
            // Arrange
            const int invalidBookNum = 0;

            // Act & Assert
            Assert.That(
                () => ScriptureTemplateService.CreateOneBook(_scrText, invalidBookNum, createCV: false, modelScrText: null),
                Throws.TypeOf<ArgumentException>()
                    .Or.TypeOf<ArgumentOutOfRangeException>()
            );
        }

        /// <summary>
        /// Tests CreateOneBook handles negative book number.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-028")]
        [Property("ScenarioId", "TS-073")]
        [Property("BehaviorId", "BHV-T001")]
        [Description("CreateOneBook throws for negative book number")]
        public void CreateOneBook_WithNegativeBookNumber_Throws()
        {
            // Arrange
            const int negativeBookNum = -1;

            // Act & Assert
            Assert.That(
                () => ScriptureTemplateService.CreateOneBook(_scrText, negativeBookNum, createCV: false, modelScrText: null),
                Throws.TypeOf<ArgumentException>()
                    .Or.TypeOf<ArgumentOutOfRangeException>()
            );
        }

        /// <summary>
        /// Tests CreateOneBook handles book number beyond valid range.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-028")]
        [Property("ScenarioId", "TS-073")]
        [Property("BehaviorId", "BHV-T001")]
        [Description("CreateOneBook throws for book number beyond valid range")]
        public void CreateOneBook_WithBookNumberBeyondRange_Throws()
        {
            // Arrange
            const int invalidBookNum = 999;

            // Act & Assert
            Assert.That(
                () => ScriptureTemplateService.CreateOneBook(_scrText, invalidBookNum, createCV: false, modelScrText: null),
                Throws.TypeOf<ArgumentException>()
                    .Or.TypeOf<ArgumentOutOfRangeException>()
            );
        }

        /// <summary>
        /// Tests CreateOneBook in model mode throws when model ScrText is null but mode expects it.
        /// Note: The method signature allows null modelScrText for empty/CV modes, but if we expect
        /// model mode behavior and pass null, we should get empty mode behavior (not an exception).
        /// This test documents the expected behavior.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-028")]
        [Property("ScenarioId", "TS-062")]
        [Property("BehaviorId", "BHV-T003")]
        [Description("CreateOneBook with null modelScrText falls back to empty mode (not model mode)")]
        public void CreateOneBook_WithNullModelScrText_FallsBackToEmptyMode()
        {
            // Arrange: createCV = false, modelScrText = null -> should be empty mode
            // Not an error, just falls back to empty mode behavior

            // Act
            bool result = ScriptureTemplateService.CreateOneBook(_scrText, JUDE, createCV: false, modelScrText: null);

            // Assert: Should succeed with empty mode behavior
            Assert.That(result, Is.True, "Should return true for empty mode");

            string bookContent = _scrText.GetText(new VerseRef(JUDE, 0, 0), false, false);
            Assert.That(bookContent, Does.Contain(@"\id JUD"), "Should have ID line");
            Assert.That(bookContent, Does.Not.Contain(@"\c"), "Empty mode should not have chapters");
        }

        #endregion

        #region CAP-028 Edge Cases

        /// <summary>
        /// Tests CreateOneBook works for single-chapter book (Jude).
        /// </summary>
        [Test]
        [Category("EdgeCase")]
        [Property("CapabilityId", "CAP-028")]
        [Property("ScenarioId", "TS-061")]
        [Property("BehaviorId", "BHV-T002")]
        [Description("CreateOneBook CV mode works for single-chapter book")]
        public void CreateOneBook_CVMode_ForSingleChapterBook_Works()
        {
            // Arrange: Jude has 1 chapter

            // Act
            ScriptureTemplateService.CreateOneBook(_scrText, JUDE, createCV: true, modelScrText: null);

            // Assert
            string bookContent = _scrText.GetText(new VerseRef(JUDE, 0, 0), false, false);
            int chapterCount = CountOccurrences(bookContent, @"\c ");
            Assert.That(chapterCount, Is.EqualTo(1), "Jude should have exactly 1 chapter");
            Assert.That(bookContent, Does.Not.Contain(@"\c 2"), "Should not have chapter 2");
        }

        /// <summary>
        /// Tests CreateOneBook works for Psalms (150 chapters).
        /// </summary>
        [Test]
        [Category("EdgeCase")]
        [Property("CapabilityId", "CAP-028")]
        [Property("ScenarioId", "TS-061")]
        [Property("BehaviorId", "BHV-T002")]
        [Description("CreateOneBook CV mode works for large chapter count (Psalms)")]
        public void CreateOneBook_CVMode_ForPsalms_Creates150Chapters()
        {
            // Arrange: Psalms has 150 chapters

            // Act
            ScriptureTemplateService.CreateOneBook(_scrText, PSALMS, createCV: true, modelScrText: null);

            // Assert
            string bookContent = _scrText.GetText(new VerseRef(PSALMS, 0, 0), false, false);
            int chapterCount = CountOccurrences(bookContent, @"\c ");
            Assert.That(chapterCount, Is.EqualTo(150), "Psalms should have 150 chapters");
        }

        /// <summary>
        /// Tests CreateOneBook model mode with single-chapter model book.
        /// </summary>
        [Test]
        [Category("EdgeCase")]
        [Property("CapabilityId", "CAP-028")]
        [Property("ScenarioId", "TS-062")]
        [Property("BehaviorId", "BHV-T003")]
        [Description("CreateOneBook model mode works with single-chapter model")]
        public void CreateOneBook_ModelMode_WithSingleChapterModel_Works()
        {
            // Arrange: Create model with Jude (single chapter)
            var modelScrText = CreateModelScrTextWithBook(JUDE, ModelUsfmSingleChapter);

            // Act
            ScriptureTemplateService.CreateOneBook(_scrText, JUDE, createCV: false, modelScrText: modelScrText);

            // Assert
            string bookContent = _scrText.GetText(new VerseRef(JUDE, 0, 0), false, false);
            Assert.That(bookContent, Does.Contain(@"\id JUD"), "Should have ID marker");
            Assert.That(bookContent, Does.Contain(@"\c 1"), "Should have chapter 1 from model");
            Assert.That(bookContent, Does.Not.Contain("servant of Jesus Christ"), "Should not have verse text");
        }

        /// <summary>
        /// Tests CreateOneBook model mode when model book has complex formatting.
        /// </summary>
        [Test]
        [Category("EdgeCase")]
        [Property("CapabilityId", "CAP-028")]
        [Property("ScenarioId", "TS-062")]
        [Property("BehaviorId", "BHV-T003")]
        [Description("CreateOneBook model mode handles complex formatting in model")]
        public void CreateOneBook_ModelMode_WithComplexModel_StripsFormatting()
        {
            // Arrange: Create model with complex formatting (character styles, footnotes)
            var modelScrText = CreateModelScrTextWithBook(GENESIS, ModelUsfmComplexFormatting);

            // Act
            ScriptureTemplateService.CreateOneBook(_scrText, GENESIS, createCV: false, modelScrText: modelScrText);

            // Assert
            string bookContent = _scrText.GetText(new VerseRef(GENESIS, 0, 0), false, false);

            // Character styles and footnotes should be stripped (per ExtractTemplate behavior)
            Assert.That(bookContent, Does.Not.Contain(@"\nd"), "Should strip character styles");
            Assert.That(bookContent, Does.Not.Contain(@"\f"), "Should strip footnotes");
            Assert.That(bookContent, Does.Not.Contain("Lord"), "Should strip character style content");
        }

        /// <summary>
        /// Tests that createCV flag takes precedence over modelScrText presence.
        /// When createCV is true, it should use CV mode even if modelScrText is provided.
        /// </summary>
        [Test]
        [Category("EdgeCase")]
        [Property("CapabilityId", "CAP-028")]
        [Property("ScenarioId", "TS-061")]
        [Property("BehaviorId", "BHV-T002")]
        [Description("CreateOneBook: createCV=true takes precedence over model mode")]
        public void CreateOneBook_CreateCVTrueWithModel_UsesCVMode()
        {
            // Arrange: Both createCV=true and modelScrText provided
            // Per PT9 logic, createCV should take precedence
            var modelScrText = CreateModelScrTextWithBook(41, ModelUsfmWithContent);

            // Act
            ScriptureTemplateService.CreateOneBook(_scrText, JUDE, createCV: true, modelScrText: modelScrText);

            // Assert: Should use CV mode, not model mode
            string bookContent = _scrText.GetText(new VerseRef(JUDE, 0, 0), false, false);

            // CV mode for Jude: 1 chapter, 25 verses
            int chapterCount = CountOccurrences(bookContent, @"\c ");
            Assert.That(chapterCount, Is.EqualTo(1), "Should use CV mode (1 chapter for Jude)");

            // Should NOT have model-specific markers (like \s from the model Mark content)
            // Note: CV mode generates clean markers, not model-derived structure
            int verseCount = CountOccurrences(bookContent, @"\v ");
            Assert.That(verseCount, Is.EqualTo(25), "Should have 25 verses from versification (CV mode)");
        }

        #endregion

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
