using System.Diagnostics.CodeAnalysis;
using System.Text.RegularExpressions;
using Paranext.DataProvider.ManageBooks;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.ManageBooks
{
    /// <summary>
    /// Tests for <see cref="ScriptureTemplateService"/> (CAP-003, EXT-001).
    ///
    /// Capability: CAP-003 ScriptureTemplate (Classic TDD — the only Classic-TDD
    /// capability in this feature).
    ///
    /// Contract: <c>implementation/extraction-plan.md</c> EXT-001 and
    /// <c>data-contracts.md</c> Section 4.4 CreateBooks.
    ///
    /// <code>
    /// public static bool CreateOneBook(
    ///     ScrText scrText,
    ///     int bookNum,
    ///     bool createCV,
    ///     bool createUsingModelTextAsTemplate,
    ///     ScrText? modelScrText = null);
    /// </code>
    ///
    /// CAP-003 is NOT exposed on the wire — <see cref="CreateBooksOrchestrator"/>
    /// (CAP-004) wraps it. Hence there is no corresponding
    /// <c>ScriptureTemplateServiceTests</c> at the service layer; the wire-level
    /// acceptance tests live with CAP-004.
    ///
    /// Tests derive expected behavior from:
    /// - PT9 source: <c>ParatextBase/ScriptureTemplate.cs:24-349</c>
    /// - Golden masters: gm-001 (empty), gm-002 (CV), gm-003 (from model), gm-004 (initial lines)
    /// - Test scenarios: TS-077, TS-078, TS-079, TS-080, TS-081
    /// - Behavior catalog: BHV-407 (ScriptureTemplate decision tree)
    /// - Invariants: INV-002 (WriteLock), INV-C01 (lock released after success)
    ///
    /// Greek Esther (bookNum = Canon.BookIdToNumber("ESG")) triggers the
    /// CreateESGForm sub-dialog in PT9; in PT10 this is deferred to CAP-UI-007
    /// (per strategic-plan-backend.md §CAP-003). The backend service must
    /// dispatch (not show a WinForms dialog); this is not asserted at this
    /// layer because CAP-UI-007 owns the dispatch contract.
    ///
    /// NON-CANONICAL + createCV (BHV-305) — PT9 falls through to
    /// <c>CreateIdLineOnly</c> for non-canonical books even when createCV is
    /// true (see <c>ScriptureTemplate.cs:83</c>: <c>if (createCV &amp;&amp;
    /// Canon.IsCanonical(bookNum))</c>).
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class ScriptureTemplateServiceTests : PapiTestBase
    {
        private DummyScrText _scrText = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();

            _scrText = (DummyScrText)CreateDummyProject();
            var details = CreateProjectDetails(_scrText);
            ParatextProjects.FakeAddProject(details, _scrText);
        }

        [TearDown]
        public void TestTearDownScrText()
        {
            _scrText?.Dispose();
        }

        /// <summary>
        /// Normalize line endings so tests on Linux (WSL) compare equal to
        /// golden masters captured on Windows with \r\n.
        /// Matches the gm metadata normalization: "normalize-line-endings" +
        /// "trim-trailing-whitespace".
        /// </summary>
        private static string NormalizeForCompare(string s) => s.Replace("\r\n", "\n").TrimEnd();

        // =====================================================================
        // gm-001 / TS-077: CreateOneBook — empty book (\id line only)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-003")]
        [Property("ScenarioId", "TS-077")]
        [Property("BehaviorId", "BHV-407")]
        [Property("GoldenMaster", "gm-001")]
        [Description(
            "TS-077: CreateOneBook with createCV=false and createUsingModelTextAsTemplate=false "
                + "writes a book containing only the \\id line (plus headers when BookNames "
                + "are populated). DummyScrText has empty BookNames so only the \\id line appears."
        )]
        public void CreateOneBook_EmptyBook_WritesIdLineOnly()
        {
            // Arrange — book 65 (JUD) not present
            Assert.That(
                _scrText.BookPresent(65),
                Is.False,
                "precondition: JUD must not be present"
            );

            // Act
            bool result = ScriptureTemplateService.CreateOneBook(
                _scrText,
                bookNum: 65,
                createCV: false,
                createUsingModelTextAsTemplate: false
            );

            // Assert: book written with \id JUD line, no chapter/verse markers
            Assert.That(result, Is.True, "CreateOneBook should return true on success");
            string written = _scrText.GetText(65);
            Assert.That(written, Does.StartWith("\\id JUD"), "first line must be \\id JUD");
            Assert.That(
                written,
                Does.Not.Contain("\\c "),
                "empty book must not contain chapter markers"
            );
            Assert.That(
                written,
                Does.Not.Contain("\\v "),
                "empty book must not contain verse markers"
            );
        }

        [Test]
        [Category("GoldenMaster")]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-003")]
        [Property("ScenarioId", "TS-077")]
        [Property("BehaviorId", "BHV-407")]
        [Property("GoldenMaster", "gm-001")]
        [Description(
            "gm-001 SHAPE check (semantic, not byte-level): the \\id line "
                + "matches '\\id JUD - <project>' with line-ending normalization. "
                + "Theme 7 (2026-04-30) renamed from MatchesGoldenMaster_gm001 "
                + "to ShapeMatchesGoldenMaster_gm001 to reflect that this test "
                + "verifies the canonical \\id structure only, not byte-for-byte "
                + "fidelity — byte-level GM disk verification is deferred to "
                + "Phase 3 UI per FN-006. Strengthening the assertion to verify "
                + "additional structural elements (no chapter/verse markers, "
                + "trailing blank line, byte-identical write) would also "
                + "satisfy this theme; rename was chosen as the lighter-touch "
                + "fix consistent with the agreed deferral."
        )]
        public void CreateOneBook_EmptyBook_ShapeMatchesGoldenMaster_gm001()
        {
            // Act
            bool result = ScriptureTemplateService.CreateOneBook(
                _scrText,
                bookNum: 65,
                createCV: false,
                createUsingModelTextAsTemplate: false
            );

            // Assert
            Assert.That(result, Is.True);

            // Golden master shape: "\\id JUD - <FullName>\r\n\r\n"
            // The <FullName> string is environment-dependent ("Test ScrText" in
            // DummyScrText). We compare the stable prefix and structure.
            string written = NormalizeForCompare(_scrText.GetText(65));
            Assert.That(written, Does.Match(@"^\\id JUD( - .+)?$"));
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-003")]
        [Property("ScenarioId", "TS-077")]
        [Property("BehaviorId", "BHV-407")]
        [Description(
            "TS-077 postcondition: successful CreateOneBook adds the book to BooksPresentSet."
        )]
        public void CreateOneBook_EmptyBook_UpdatesBooksPresentSet()
        {
            // Arrange
            Assert.That(_scrText.BooksPresentSet.IsSelected(65), Is.False);

            // Act
            ScriptureTemplateService.CreateOneBook(_scrText, 65, false, false);

            // Assert
            Assert.That(
                _scrText.BooksPresentSet.IsSelected(65),
                Is.True,
                "BooksPresentSet must include the newly created book"
            );
        }

        // =====================================================================
        // gm-002 / TS-078: CreateOneBook — chapter/verse from versification
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-003")]
        [Property("ScenarioId", "TS-078")]
        [Property("BehaviorId", "BHV-407")]
        [Property("GoldenMaster", "gm-002")]
        [Description(
            "TS-078: CreateOneBook with createCV=true emits \\c and \\v markers for each "
                + "chapter/verse in the project's versification."
        )]
        public void CreateOneBook_ChapterVerse_WritesChapterAndVerseMarkers()
        {
            // Arrange — Nahum (34) in English versification
            Assert.That(_scrText.BookPresent(34), Is.False);

            // Act
            bool result = ScriptureTemplateService.CreateOneBook(
                _scrText,
                bookNum: 34,
                createCV: true,
                createUsingModelTextAsTemplate: false
            );

            // Assert
            Assert.That(result, Is.True);
            string written = _scrText.GetText(34);
            Assert.That(written, Does.StartWith("\\id NAM"));
            Assert.That(written, Does.Contain("\\c 1"));
            Assert.That(written, Does.Contain("\\c 2"));
            Assert.That(written, Does.Contain("\\c 3"));
            Assert.That(written, Does.Contain("\\v 1"));
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-003")]
        [Property("ScenarioId", "TS-078")]
        [Property("BehaviorId", "BHV-407")]
        [Property("GoldenMaster", "gm-002")]
        [Description(
            "TS-078: Nahum in English versification has 3 chapters with verse counts "
                + "15 / 13 / 19. Verify verse-count accuracy per versification."
        )]
        public void CreateOneBook_ChapterVerse_NahumHasCorrectChapterAndVerseCounts()
        {
            // Act
            ScriptureTemplateService.CreateOneBook(_scrText, 34, true, false);

            // Assert: marker counts
            string written = _scrText.GetText(34);
            int chapterCount = Regex.Matches(written, @"\\c \d+").Count;
            Assert.That(
                chapterCount,
                Is.EqualTo(3),
                "Nahum has 3 chapters in English versification"
            );

            int verseCount = Regex.Matches(written, @"\\v \d+").Count;
            Assert.That(
                verseCount,
                Is.EqualTo(15 + 13 + 19),
                "Nahum English versification: ch1:15v + ch2:13v + ch3:19v = 47 verses"
            );
        }

        [Test]
        [Category("GoldenMaster")]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-003")]
        [Property("ScenarioId", "TS-078")]
        [Property("BehaviorId", "BHV-407")]
        [Property("GoldenMaster", "gm-002")]
        [Description(
            "gm-002 acceptance: CV output structure matches captured PT9 golden master. "
                + "Expected sequence: \\id NAM ... \\c 1, \\v 1..\\v 15, \\c 2, \\v 1..\\v 13, "
                + "\\c 3, \\v 1..\\v 19."
        )]
        public void CreateOneBook_ChapterVerse_MatchesGoldenMaster_gm002()
        {
            // Act
            ScriptureTemplateService.CreateOneBook(_scrText, 34, true, false);

            // Assert: verse numbers appear in strictly ascending order within each chapter
            string written = NormalizeForCompare(_scrText.GetText(34));
            string[] lines = written.Split('\n');

            int? currentChapter = null;
            int lastVerse = 0;
            var chapterVerseCounts = new Dictionary<int, int>();

            foreach (var line in lines)
            {
                var chapterMatch = Regex.Match(line, @"^\\c (\d+)");
                if (chapterMatch.Success)
                {
                    currentChapter = int.Parse(chapterMatch.Groups[1].Value);
                    chapterVerseCounts[currentChapter.Value] = 0;
                    lastVerse = 0;
                    continue;
                }

                var verseMatch = Regex.Match(line, @"^\\v (\d+)");
                if (verseMatch.Success && currentChapter.HasValue)
                {
                    int v = int.Parse(verseMatch.Groups[1].Value);
                    Assert.That(
                        v,
                        Is.GreaterThan(lastVerse),
                        $"Verse {v} in chapter {currentChapter} must be > last verse {lastVerse}"
                    );
                    lastVerse = v;
                    chapterVerseCounts[currentChapter.Value]++;
                }
            }

            Assert.That(chapterVerseCounts.Keys, Is.EquivalentTo(new[] { 1, 2, 3 }));
            Assert.That(chapterVerseCounts[1], Is.EqualTo(15));
            Assert.That(chapterVerseCounts[2], Is.EqualTo(13));
            Assert.That(chapterVerseCounts[3], Is.EqualTo(19));
        }

        // =====================================================================
        // gm-003 / TS-079: CreateOneBook — from model project template
        // =====================================================================

        /// <summary>
        /// Seeds the model project with a minimal MRK book that uses only
        /// paragraph markers defined by <see cref="DummyScrStylesheet"/>:
        /// <c>\p</c>, <c>\s</c>, <c>\mt</c>. (The full gm-003 model
        /// <c>input-model-MRK.usfm</c> also contains <c>\q1</c>, <c>\q2</c>,
        /// <c>\li1</c> which are not paragraph markers in the dummy
        /// stylesheet; those would be silently dropped by
        /// <c>ExtractTemplate</c>. For RED-phase Classic-TDD unit tests we
        /// use the reduced marker set so every marker in the model can round
        /// trip through the template extraction.)
        /// </summary>
        private static DummyScrText CreateModelProjectWithMRK()
        {
            var model = new DummyScrText();
            // Minimal MRK using markers DummyScrStylesheet knows as
            // paragraph markers: \p, \s, \mt (plus \v and \c which are
            // always recognized).
            const string mrkUsfm =
                "\\id MRK Model\r\n"
                + "\\mt The Gospel of Mark\r\n"
                + "\\c 1\r\n"
                + "\\s First Section\r\n"
                + "\\p\r\n"
                + "\\v 1 The beginning of the good news.\r\n"
                + "\\v 2 As it is written.\r\n"
                + "\\p\r\n"
                + "\\v 3 A voice cries.\r\n"
                + "\\c 2\r\n"
                + "\\s Second Section\r\n"
                + "\\p\r\n"
                + "\\v 1 Jesus entered Capernaum.\r\n";
            model.PutText(41, 0, false, mrkUsfm, null);
            return model;
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-003")]
        [Property("ScenarioId", "TS-079")]
        [Property("BehaviorId", "BHV-407")]
        [Property("GoldenMaster", "gm-003")]
        [Description(
            "TS-079: CreateOneBook with createUsingModelTextAsTemplate=true preserves "
                + "paragraph markers (\\p, \\s, \\mt) and chapter/verse markers from the model."
        )]
        public void CreateOneBook_FromTemplate_PreservesParagraphAndVerseMarkers()
        {
            // Arrange
            using var model = CreateModelProjectWithMRK();

            // Act
            bool result = ScriptureTemplateService.CreateOneBook(
                _scrText,
                bookNum: 41,
                createCV: false,
                createUsingModelTextAsTemplate: true,
                modelScrText: model
            );

            // Assert
            Assert.That(result, Is.True);
            string written = _scrText.GetText(41);
            Assert.That(written, Does.StartWith("\\id MRK"));
            Assert.That(written, Does.Contain("\\c 1"), "chapter marker preserved");
            Assert.That(written, Does.Contain("\\c 2"), "chapter marker preserved");
            Assert.That(written, Does.Contain("\\v 1"), "verse marker preserved");
            Assert.That(written, Does.Contain("\\v 3"), "verse marker preserved");
            Assert.That(written, Does.Contain("\\p"), "paragraph marker preserved");
            Assert.That(written, Does.Contain("\\s"), "section marker preserved");
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-003")]
        [Property("ScenarioId", "TS-079")]
        [Property("BehaviorId", "BHV-407")]
        [Property("GoldenMaster", "gm-003")]
        [Description(
            "TS-079: CreateFromTemplate strips text content — only markers remain. "
                + "Model content phrases like 'The beginning of the good news' must not appear."
        )]
        public void CreateOneBook_FromTemplate_StripsTextContent()
        {
            // Arrange
            using var model = CreateModelProjectWithMRK();

            // Act
            ScriptureTemplateService.CreateOneBook(_scrText, 41, false, true, model);

            // Assert: content strings are gone
            string written = _scrText.GetText(41);
            Assert.That(
                written,
                Does.Not.Contain("beginning of the good news"),
                "content text must be stripped"
            );
            Assert.That(written, Does.Not.Contain("Capernaum"), "content text must be stripped");
            Assert.That(
                written,
                Does.Not.Contain("A voice cries"),
                "content text must be stripped"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-003")]
        [Property("ScenarioId", "TS-079")]
        [Property("BehaviorId", "BHV-407")]
        [Description(
            "Argument validation: createUsingModelTextAsTemplate=true with modelScrText=null "
                + "must throw — matches PT9 ScriptureTemplate.cs:47-48 (throws ArgumentException)."
        )]
        public void CreateOneBook_FromTemplate_NullModel_Throws()
        {
            // Act & Assert
            Assert.That(
                () =>
                    ScriptureTemplateService.CreateOneBook(
                        _scrText,
                        bookNum: 41,
                        createCV: false,
                        createUsingModelTextAsTemplate: true,
                        modelScrText: null
                    ),
                Throws.ArgumentException.Or.InstanceOf<ArgumentNullException>(),
                "must throw when template mode is requested without a model"
            );
        }

        // =====================================================================
        // gm-004 / TS-081: CreateInitialLines — \id + (when BookNames) toc/h/mt
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-003")]
        [Property("ScenarioId", "TS-081")]
        [Property("BehaviorId", "BHV-407")]
        [Property("GoldenMaster", "gm-004")]
        [Description(
            "TS-081: CreateInitialLines emits the \\id line as the first line of the file. "
                + "With empty BookNames (DummyScrText default), only the \\id line is written "
                + "— \\toc/\\h/\\mt are appended only when the corresponding BookNames field "
                + "is non-empty (PT9 ScriptureTemplate.cs:115-125)."
        )]
        public void CreateOneBook_InitialLines_IncludesIdLine()
        {
            // Act — Genesis (1)
            ScriptureTemplateService.CreateOneBook(_scrText, 1, false, false);

            // Assert
            string written = _scrText.GetText(1);
            Assert.That(written, Does.StartWith("\\id GEN"), "first line must be \\id GEN");
        }

        [Test]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-003")]
        [Property("ScenarioId", "TS-081")]
        [Property("BehaviorId", "BHV-407")]
        [Property("GoldenMaster", "gm-004")]
        [Description(
            "gm-004 acceptance: header slice matches the captured PT9 golden master. "
                + "Captured headerContent: '\\id GEN - <project>\\r\\n\\r\\n' (when BookNames empty)."
        )]
        public void CreateOneBook_InitialLines_MatchesGoldenMaster_gm004()
        {
            // Act
            ScriptureTemplateService.CreateOneBook(_scrText, 1, false, false);

            // Assert — the captured golden master shows ONLY the \id line, which
            // matches the PT9 behavior when BookNames are empty (DummyScrText).
            string written = NormalizeForCompare(_scrText.GetText(1));

            // The "header slice" is every line before \c 1 (or whole file when no \c).
            // gm-004 input has createCV=false, so there is no \c — the full file IS the header.
            Assert.That(written, Does.Match(@"^\\id GEN( - .+)?$"));
            Assert.That(written, Does.Not.Contain("\\c"), "no chapter marker expected");
            Assert.That(written, Does.Not.Contain("\\v"), "no verse marker expected");
        }

        // =====================================================================
        // TS-080: book already present — PT9 returns true with no-op
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-003")]
        [Property("ScenarioId", "TS-080")]
        [Property("BehaviorId", "BHV-407")]
        [Description(
            "TS-080 (amended to PT9 behavior): when the book already exists, CreateOneBook "
                + "returns true without overwriting. PT9 ScriptureTemplate.cs:50-51: "
                + "`if (scrText.BookPresent(bookNum, true)) return true;`. Existing content "
                + "must be preserved."
        )]
        public void CreateOneBook_BookAlreadyPresent_IsNoOp()
        {
            // Arrange — write GEN with real content first
            const string existingContent =
                "\\id GEN Existing\r\n\\c 1\r\n\\v 1 In the beginning.\r\n";
            _scrText.PutText(1, 0, false, existingContent, null);
            Assert.That(_scrText.BookPresent(1), Is.True, "precondition: GEN present");

            // Act
            bool result = ScriptureTemplateService.CreateOneBook(
                _scrText,
                bookNum: 1,
                createCV: true,
                createUsingModelTextAsTemplate: false
            );

            // Assert: result is true, content unchanged
            Assert.That(result, Is.True, "PT9 returns true when book already present");
            string after = _scrText.GetText(1);
            Assert.That(
                after,
                Does.Contain("In the beginning."),
                "existing content must be preserved (no-op on already-present book)"
            );
        }

        // =====================================================================
        // INV-002 / INV-C01: lock released after success
        // =====================================================================

        [Test]
        [Category("Invariant")]
        [Property("CapabilityId", "CAP-003")]
        [Property("BehaviorId", "BHV-407")]
        [Property("InvariantId", "INV-002")]
        [Description(
            "INV-002 / INV-C01: After a successful CreateOneBook, the WriteLock is released "
                + "so subsequent mutations on the same ScrText can succeed."
        )]
        public void CreateOneBook_AfterSuccess_WriteLockReleased()
        {
            // Act — create GEN
            bool result = ScriptureTemplateService.CreateOneBook(_scrText, 1, false, false);
            Assert.That(result, Is.True, "first create should succeed");

            // Assert: subsequent mutation (write a second book) must not deadlock
            Assert.DoesNotThrow(
                () => _scrText.PutText(2, 0, false, "\\id EXO Test\r\n", null),
                "WriteLock should be released after CreateOneBook; follow-up PutText must succeed"
            );
            Assert.That(
                _scrText.BooksPresentSet.IsSelected(2),
                Is.True,
                "EXO should have been added after lock released"
            );
        }

        // =====================================================================
        // BHV-305: non-canonical + createCV gate
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-003")]
        [Property("BehaviorId", "BHV-407")]
        [Description(
            "BHV-305 / PT9 line 83: for non-canonical books, createCV is ignored and the "
                + "method falls through to CreateIdLineOnly — so no \\c or \\v markers appear."
        )]
        public void CreateOneBook_NonCanonicalBook_WithCreateCV_DoesNotGenerateChapterVerse()
        {
            // Arrange — FRT (100) is non-canonical (front matter)
            int frontMatterBookNum = Canon.BookIdToNumber("FRT");
            Assert.That(
                Canon.IsCanonical(frontMatterBookNum),
                Is.False,
                "sanity: FRT must be non-canonical"
            );

            // Act — request createCV but book is non-canonical
            bool result = ScriptureTemplateService.CreateOneBook(
                _scrText,
                frontMatterBookNum,
                createCV: true,
                createUsingModelTextAsTemplate: false
            );

            // Assert — result success, but no \c or \v markers (fell through to CreateIdLineOnly)
            Assert.That(result, Is.True);
            string written = _scrText.GetText(frontMatterBookNum);
            Assert.That(written, Does.StartWith("\\id FRT"));
            Assert.That(
                written,
                Does.Not.Contain("\\c "),
                "non-canonical book must not have chapter markers even when createCV=true"
            );
            Assert.That(
                written,
                Does.Not.Contain("\\v "),
                "non-canonical book must not have verse markers even when createCV=true"
            );
        }
    }
}
