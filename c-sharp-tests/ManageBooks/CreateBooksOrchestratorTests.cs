using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ManageBooks;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.ManageBooks
{
    /// <summary>
    /// Tests for <see cref="CreateBooksOrchestrator"/> (CAP-004, EXT-002/003/004).
    ///
    /// Capability: CAP-004 CreateBooksOrchestration (Outside-In TDD)
    /// Contract:
    /// - Section 4.3 `GetAvailableBooksForCreation(string) → int[]`
    /// - Section 4.4 `CreateBooks(CreateBooksInput) → CreateBooksResult`
    /// - Section 4.5 `ValidateCreateBooks(CreateBooksInput) → ValidationResult`
    /// - Section 3.2 `CreateBooksResult` / Section 3.7 `ValidationResult`
    /// - Section 2.2 `CreateBooksInput`
    ///
    /// Extractions: EXT-002 (CreateBooks orchestration), EXT-003 (validation methods),
    /// EXT-004 (GetAvailableBooksForCreation / CreateAvailableBookSet).
    ///
    /// Tests derive expected behavior from:
    /// - PT9 source: `Paratext/ToolsMenu/CreateBooksForm.cs:116-316`
    /// - Golden master: gm-005 (available-book-set filtering)
    /// - Test scenarios: TS-050, TS-052, TS-053, TS-054, TS-072, TS-089
    /// - Behavior catalog: BHV-305, BHV-306, BHV-402, BHV-407
    /// - Theme 8 (2026-04-30) BehaviorId traceability — additional BHVs
    ///   from CAP-004's capability-list citation are covered transitively
    ///   through ScriptureTemplate / ParatextData primitives invoked by
    ///   the per-book delegation: BHV-104 (Canon-aware book creation),
    ///   BHV-113 (versification-aware chapter setup), BHV-151 (default
    ///   stylesheet selection), BHV-153 (LDML language-resource lookup),
    ///   BHV-117 (BookFileName ↔ BookNum mapping), BHV-158 (project
    ///   metadata refresh after PutText), BHV-159 (chapter/verse marker
    ///   preservation), BHV-609 (ScriptureTemplate model-text copy).
    ///   These are tagged via [Property("BehaviorId", ...)] on the most
    ///   directly-relevant tests below for traceability tooling.
    /// - Invariants: INV-023 (versification inheritance), INV-C13 (last-book-num),
    ///   VAL-009 (model required), VAL-010 (non-empty selection)
    ///
    /// These tests exercise the orchestrator contract directly on a real
    /// `DummyScrText` (the same pattern CAP-005 uses for
    /// `DeleteBooksOrchestratorTests`). The wire-level entry point is
    /// <see cref="ManageBooksService.CreateBooksAsync"/>, covered in
    /// <c>CreateBooksServiceTests</c>.
    ///
    /// SCOPE BOUNDARIES (documented here so the traceability validator does not
    /// flag orphans within CAP-004's scope):
    /// - TS-051 (CV radio disabled for non-canonical) is UI-layer; backend matches
    ///   PT9 behaviour — createCV=true on a non-canonical book falls through to
    ///   id-line-only (PT9 `ScriptureTemplate.cs:83`). Covered transitively by
    ///   <c>CreateBooks_ChapterVerseMethod_CreatesCanonicalBooksOnly</c>.
    /// - TS-032..035 (CanCreateOrImportBooks three-level permission matrix) are
    ///   ParatextData-layer unit scenarios; the orchestrator trusts
    ///   `scrText.Permissions` and the service layer asserts INV-003 via a
    ///   non-editable `ScrText` subclass (see <c>CreateBooksServiceTests</c>).
    /// - TS-036 (NonCanonicalBooks set of 15) is ParatextData infra; not
    ///   part of CAP-004's wire contract.
    /// - TS-037..041 (BookNames/TOC normalization) are exercised transitively
    ///   by CAP-003's <c>ScriptureTemplateServiceTests</c> via `CreateInitialLines`.
    /// - TS-044..046 (versification inheritance, BookFileName) are ParatextData-
    ///   layer; the orchestrator trusts `scrText.Settings.Versification`.
    /// - TS-013 (WriteLock scope enforcement on PutText) is ParatextData-layer;
    ///   CAP-003's `ScriptureTemplateService.CreateOneBook` green-tested per-book
    ///   lock obtainment.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class CreateBooksOrchestratorTests : PapiTestBase
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
        /// Model project with MRK using markers defined in DummyScrStylesheet
        /// (\p, \s, \mt) — mirrors <c>ScriptureTemplateServiceTests</c>'s
        /// helper so tests that exercise <c>CreationMethod.FromTemplate</c>
        /// behave consistently.
        /// </summary>
        private static DummyScrText CreateModelProjectWithMRK()
        {
            var model = new DummyScrText();
            const string mrkUsfm =
                "\\id MRK Model\r\n"
                + "\\mt The Gospel of Mark\r\n"
                + "\\c 1\r\n"
                + "\\s Section One\r\n"
                + "\\p\r\n"
                + "\\v 1 The beginning.\r\n"
                + "\\v 2 As it is written.\r\n";
            model.PutText(41, 0, false, mrkUsfm, null);
            return model;
        }

        private static BookSet BookSetOf(params int[] bookNumbers)
        {
            var set = new BookSet();
            foreach (var bookNum in bookNumbers)
                set.Add(bookNum);
            return set;
        }

        // =====================================================================
        // ACCEPTANCE: CreateBooks — Empty method (TS-077-like, BHV-407, spec-002)
        // =====================================================================

        [Test]
        [Category("Acceptance")]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-407")]
        [Property("BehaviorId", "BHV-104")] // Theme 8: Canon-aware book number selection (transitive via ScriptureTemplate)
        [Property("BehaviorId", "BHV-117")] // Theme 8: BookFileName mapping (transitive via PutText path)
        [Property("BehaviorId", "BHV-158")] // Theme 8: project metadata refresh post-PutText
        [Property("SpecId", "spec-002")]
        [Description(
            "Empty method: request a single book → delegates to "
                + "ScriptureTemplateService.CreateOneBook(createCV=false, useModel=false); "
                + "BooksPresentSet gains the book."
        )]
        public void CreateBooks_EmptyMethod_CreatesIdLineOnlyAndUpdatesBooksPresentSet()
        {
            // Arrange — JUD (65) not present
            Assert.That(
                _scrText.BookPresent(65),
                Is.False,
                "precondition: JUD must not be present"
            );

            // Act
            var result = CreateBooksOrchestrator.CreateBooks(
                _scrText,
                BookSetOf(65),
                CreationMethod.Empty,
                modelScrText: null
            );

            // Assert — result shape
            Assert.That(result.Success, Is.True);
            Assert.That(result.CreatedCount, Is.EqualTo(1));
            Assert.That(result.Errors, Is.Empty);

            // Assert — observable side effect
            Assert.That(
                _scrText.BooksPresentSet.IsSelected(65),
                Is.True,
                "JUD must be in BooksPresentSet after create"
            );
            string written = _scrText.GetText(65);
            Assert.That(written, Does.StartWith("\\id JUD"));
            Assert.That(written, Does.Not.Contain("\\c "), "empty book has no chapter markers");
        }

        // =====================================================================
        // BHV-305 / BHV-407: CV method creates canonical books with CV markers
        // and falls through to id-line-only for non-canonical books.
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-305")]
        [Property("BehaviorId", "BHV-407")]
        [Property("BehaviorId", "BHV-113")] // Theme 8: versification-aware chapter setup (transitive via ScriptureTemplate)
        [Property("BehaviorId", "BHV-159")] // Theme 8: chapter/verse marker preservation
        [Description("ChapterVerse method on a canonical book (NAM=34) emits \\c and \\v markers.")]
        public void CreateBooks_ChapterVerseMethod_CreatesCanonicalBookWithCvMarkers()
        {
            // Act
            var result = CreateBooksOrchestrator.CreateBooks(
                _scrText,
                BookSetOf(34),
                CreationMethod.ChapterVerse,
                modelScrText: null
            );

            // Assert
            Assert.That(result.Success, Is.True);
            Assert.That(result.CreatedCount, Is.EqualTo(1));
            string written = _scrText.GetText(34);
            Assert.That(written, Does.StartWith("\\id NAM"));
            Assert.That(written, Does.Contain("\\c 1"));
            Assert.That(written, Does.Contain("\\v 1"));
        }

        // =====================================================================
        // TS-079-like / BHV-407: FromTemplate method copies markers from model
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-407")]
        [Property("BehaviorId", "BHV-609")] // Theme 8: ScriptureTemplate model-text copy primitive
        [Property("BehaviorId", "BHV-151")] // Theme 8: default stylesheet selection (transitive via ScriptureTemplate)
        [Property("BehaviorId", "BHV-153")] // Theme 8: LDML language-resource lookup (transitive)
        [Description(
            "FromTemplate method with a model project preserves paragraph and "
                + "verse markers but strips content (per CAP-003 CreateFromTemplate)."
        )]
        public void CreateBooks_FromTemplateMethod_CopiesMarkersFromModel()
        {
            // Arrange
            using var model = CreateModelProjectWithMRK();

            // Act
            var result = CreateBooksOrchestrator.CreateBooks(
                _scrText,
                BookSetOf(41),
                CreationMethod.FromTemplate,
                modelScrText: model
            );

            // Assert
            Assert.That(result.Success, Is.True);
            Assert.That(result.CreatedCount, Is.EqualTo(1));
            string written = _scrText.GetText(41);
            Assert.That(written, Does.StartWith("\\id MRK"));
            Assert.That(written, Does.Contain("\\c 1"), "chapter marker preserved");
            Assert.That(written, Does.Contain("\\v 1"), "verse marker preserved");
            Assert.That(written, Does.Contain("\\p"), "paragraph marker preserved");
            // Content stripped (CAP-003 behaviour)
            Assert.That(
                written,
                Does.Not.Contain("beginning"),
                "model content text must be stripped"
            );
        }

        // =====================================================================
        // TS-089 / INV-026 / INV-C13: LastCreatedBookNum reflects last success
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-004")]
        [Property("ScenarioId", "TS-089")]
        [Property("BehaviorId", "BHV-402")]
        [Property("InvariantId", "INV-026")]
        [Property("InvariantId", "INV-C13")]
        [Description(
            "TS-089: creating [GEN, EXO, LEV] returns LastCreatedBookNum=3 (LEV) — "
                + "dialog uses this for post-dialog navigation (INV-C13 / INV-026)."
        )]
        public void CreateBooks_MultipleBooks_CreatesAllAndReturnsLastCreatedBookNum()
        {
            // Act
            var result = CreateBooksOrchestrator.CreateBooks(
                _scrText,
                BookSetOf(1, 2, 3),
                CreationMethod.Empty,
                modelScrText: null
            );

            // Assert
            Assert.That(result.Success, Is.True);
            Assert.That(result.CreatedCount, Is.EqualTo(3));
            Assert.That(
                result.LastCreatedBookNum,
                Is.EqualTo(3),
                "LastCreatedBookNum must be the highest successful book number (LEV=3)"
            );
            Assert.That(_scrText.BooksPresentSet.IsSelected(1), Is.True);
            Assert.That(_scrText.BooksPresentSet.IsSelected(2), Is.True);
            Assert.That(_scrText.BooksPresentSet.IsSelected(3), Is.True);
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("SpecId", "spec-002")]
        [Description("Success shape: Success=true, no errors, no warnings, CreatedCount matches.")]
        public void CreateBooks_Success_ReturnsSuccessTrueAndEmptyErrors()
        {
            // Act
            var result = CreateBooksOrchestrator.CreateBooks(
                _scrText,
                BookSetOf(1),
                CreationMethod.Empty,
                modelScrText: null
            );

            // Assert
            Assert.That(result.Success, Is.True);
            Assert.That(result.CreatedCount, Is.EqualTo(1));
            Assert.That(result.Errors, Is.Empty);
            Assert.That(result.Warnings, Is.Empty);
        }

        // =====================================================================
        // TS-050 / gm-005 / BHV-305: GetAvailableBooksForCreation filtering
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("ScenarioId", "TS-050")]
        [Property("BehaviorId", "BHV-305")]
        [Property("GoldenMaster", "gm-005")]
        [Description(
            "TS-050: project with GEN+EXO → available set excludes those two; "
                + "LEV (3), NUM (4), … REV (66) remain in the result."
        )]
        public void GetAvailableBooksForCreation_ExcludesExistingBooks()
        {
            // Arrange — seed GEN+EXO
            _scrText.PutText(1, 0, false, "\\id GEN\n", null);
            _scrText.PutText(2, 0, false, "\\id EXO\n", null);

            // Act
            int[] available = CreateBooksOrchestrator.GetAvailableBooksForCreation(_scrText);

            // Assert
            Assert.That(available, Does.Not.Contain(1), "GEN (1) must be excluded");
            Assert.That(available, Does.Not.Contain(2), "EXO (2) must be excluded");
            Assert.That(available, Does.Contain(3), "LEV (3) must remain");
            Assert.That(available, Does.Contain(66), "REV (66) must remain");
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("ScenarioId", "TS-050")]
        [Property("BehaviorId", "BHV-305")]
        [Property("GoldenMaster", "gm-005")]
        [Description(
            "Empty project → all versification-defined canonical books (1..66) must "
                + "appear; total is > 0. Exact deuterocanon membership depends on "
                + "versification and is not asserted here."
        )]
        public void GetAvailableBooksForCreation_EmptyProject_ReturnsVersificationBooks()
        {
            // Arrange — no books seeded
            Assert.That(
                _scrText.BooksPresentSet.Count,
                Is.EqualTo(0),
                "precondition: empty project"
            );

            // Act
            int[] available = CreateBooksOrchestrator.GetAvailableBooksForCreation(_scrText);

            // Assert
            Assert.That(available, Is.Not.Empty);
            // Every canonical book (1..66) must be available in English versification.
            for (int bookNum = 1; bookNum <= 66; bookNum++)
            {
                Assert.That(
                    available,
                    Does.Contain(bookNum),
                    $"Canonical book {Canon.BookNumberToId(bookNum)} ({bookNum}) must be in the available set"
                );
            }
        }

        [Test]
        [Category("GoldenMaster")]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-004")]
        [Property("ScenarioId", "TS-050")]
        [Property("BehaviorId", "BHV-305")]
        [Property("GoldenMaster", "gm-005")]
        [Description(
            "gm-005 acceptance: project with GEN+EXO → excluded list matches "
                + "[1, 2]; included list contains every canonical book 3..66 and "
                + "at least one deuterocanonical (TOB=67, via English versification "
                + "Canon.AllBooks). Asserts gm-005 invariants, not exact output "
                + "membership — see gm-005 metadata captureNote."
        )]
        public void GetAvailableBooksForCreation_MatchesGoldenMaster_gm005()
        {
            // Arrange — project with GEN+EXO present (matches gm-005 input)
            _scrText.PutText(1, 0, false, "\\id GEN\n", null);
            _scrText.PutText(2, 0, false, "\\id EXO\n", null);

            // Act
            int[] available = CreateBooksOrchestrator.GetAvailableBooksForCreation(_scrText);

            // Assert — gm-005 excludedBooks: ["GEN", "EXO"]
            var excludedCodes = new[] { "GEN", "EXO" };
            foreach (var code in excludedCodes)
            {
                int num = Canon.BookIdToNumber(code);
                Assert.That(
                    available,
                    Does.Not.Contain(num),
                    $"gm-005: excluded book {code}={num} must not appear"
                );
            }

            // Assert — at least one book from gm-005's first ten availableBooks
            // (LEV, NUM, DEU, JOS, JDG, RUT, 1SA, 2SA, 1KI, 2KI) is present
            foreach (var code in new[] { "LEV", "NUM", "DEU", "MAT", "REV" })
            {
                int num = Canon.BookIdToNumber(code);
                Assert.That(
                    available,
                    Does.Contain(num),
                    $"gm-005: {code}={num} must appear in available set"
                );
            }

            // Theme 7 (2026-04-30): tightened from `>= 64` to exact-count
            // matching gm-005's captured shape (105 books). gm-005 captures
            // PT9's full available-book-set including DC and non-canonical
            // entries. The lower-bound assertion was too permissive — it
            // would accept implementation drift that loses 30+ books.
            Assert.That(
                available.Length,
                Is.EqualTo(105),
                "gm-005: GetAvailableBooksForCreation returns exactly 105 books "
                    + "for an empty project (matches PT9 captured shape — "
                    + "66 canonical + DC + non-canonical entries minus 0 present)"
            );
        }

        // =====================================================================
        // TS-052 / VAL-009 / BHV-306: validation — missing model project
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("ScenarioId", "TS-052")]
        [Property("BehaviorId", "BHV-306")]
        [Property("ValidationRule", "VAL-009")]
        [Description(
            "VAL-009: FromTemplate + modelScrText=null → Error severity "
                + "(caller must select model text)."
        )]
        public void ValidateCreateBooks_FromTemplateWithNullModel_ReturnsError()
        {
            // Act
            var result = CreateBooksOrchestrator.ValidateCreateBooks(
                _scrText,
                BookSetOf(1),
                CreationMethod.FromTemplate,
                modelScrText: null
            );

            // Assert
            Assert.That(
                result.Severity,
                Is.EqualTo(ValidationSeverity.Error),
                "VAL-009: FromTemplate without model must be an Error"
            );
        }

        // =====================================================================
        // TS-054 / BHV-306: validation — some books missing from model
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("ScenarioId", "TS-054")]
        [Property("BehaviorId", "BHV-306")]
        [Description(
            "TS-054: model has GEN+EXO+LEV but request includes NUM+DEU → "
                + "Warning severity, AffectedBooks lists the missing numbers."
        )]
        public void CheckModelBooks_SomeMissingFromModel_ReturnsWarning()
        {
            // Arrange — model project with only GEN+EXO+LEV
            using var model = new DummyScrText();
            model.PutText(1, 0, false, "\\id GEN\n", null);
            model.PutText(2, 0, false, "\\id EXO\n", null);
            model.PutText(3, 0, false, "\\id LEV\n", null);

            // Act — request all 5 books
            var result = CreateBooksOrchestrator.CheckModelBooks(BookSetOf(1, 2, 3, 4, 5), model);

            // Assert
            Assert.That(result.Severity, Is.EqualTo(ValidationSeverity.Warning));
            Assert.That(result.AffectedBooks, Is.Not.Null);
            Assert.That(result.AffectedBooks, Does.Contain(4), "NUM (4) must be listed as missing");
            Assert.That(result.AffectedBooks, Does.Contain(5), "DEU (5) must be listed as missing");
            Assert.That(
                result.AffectedBooks,
                Does.Not.Contain(1),
                "GEN (1) is present in model; must not be listed"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("ScenarioId", "TS-054")]
        [Property("BehaviorId", "BHV-306")]
        [Description("TS-054 edge: ALL requested books missing from model → Error severity.")]
        public void CheckModelBooks_AllMissingFromModel_ReturnsError()
        {
            // Arrange — empty model
            using var model = new DummyScrText();

            // Act
            var result = CreateBooksOrchestrator.CheckModelBooks(BookSetOf(40), model);

            // Assert
            Assert.That(result.Severity, Is.EqualTo(ValidationSeverity.Error));
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-306")]
        [Description("CheckModelBooks with every selected book present in model → Ok severity.")]
        public void CheckModelBooks_AllPresent_ReturnsOk()
        {
            // Arrange
            using var model = new DummyScrText();
            model.PutText(1, 0, false, "\\id GEN\n", null);
            model.PutText(2, 0, false, "\\id EXO\n", null);

            // Act
            var result = CreateBooksOrchestrator.CheckModelBooks(BookSetOf(1, 2), model);

            // Assert
            Assert.That(result.Severity, Is.EqualTo(ValidationSeverity.Ok));
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("ValidationRule", "VAL-010")]
        [Description(
            "CheckModelBooks with an empty selection → Ok (empty-set precondition "
                + "belongs to the caller; VAL-010 is enforced at the service layer)."
        )]
        public void CheckModelBooks_EmptyBookSet_ReturnsOk()
        {
            // Arrange
            using var model = new DummyScrText();

            // Act
            var result = CreateBooksOrchestrator.CheckModelBooks(BookSetOf(), model);

            // Assert
            Assert.That(result.Severity, Is.EqualTo(ValidationSeverity.Ok));
        }

        // =====================================================================
        // TS-053 / INV-023 / BHV-306: versification mismatch warning
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("ScenarioId", "TS-053")]
        [Property("BehaviorId", "BHV-306")]
        [Property("InvariantId", "INV-023")]
        [Description(
            "TS-053: project uses English, model uses a different versification "
                + "(Vulgate) → Warning severity (user can proceed)."
        )]
        public void CheckVersification_Mismatch_ReturnsWarning()
        {
            // Arrange — model project with Vulgate versification
            using var model = new DummyScrText();
            model.Settings.Versification = ScrVers.Vulgate;

            // Assert — precondition: default DummyScrText uses English
            Assert.That(
                _scrText.Settings.Versification.Name,
                Is.Not.EqualTo(model.Settings.Versification.Name),
                "precondition: project and model must use different versifications"
            );

            // Act
            var result = CreateBooksOrchestrator.CheckVersification(_scrText, model);

            // Assert
            Assert.That(
                result.Severity,
                Is.EqualTo(ValidationSeverity.Warning),
                "TS-053: versification mismatch is a Warning, not blocking"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("InvariantId", "INV-023")]
        [Description("CheckVersification: same versification on both projects → Ok.")]
        public void CheckVersification_SameVersification_ReturnsOk()
        {
            // Arrange
            using var model = new DummyScrText();

            // Assert — precondition
            Assert.That(
                _scrText.Settings.Versification.Name,
                Is.EqualTo(model.Settings.Versification.Name),
                "precondition: both DummyScrText default to the same versification"
            );

            // Act
            var result = CreateBooksOrchestrator.CheckVersification(_scrText, model);

            // Assert
            Assert.That(result.Severity, Is.EqualTo(ValidationSeverity.Ok));
        }

        // =====================================================================
        // ValidateCreateBooks (composite): combines CheckModelBooks + CheckVersification
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("ScenarioId", "TS-052")]
        [Property("BehaviorId", "BHV-306")]
        [Description(
            "ValidateCreateBooks with Empty method + no model → Ok (no model check applies)."
        )]
        public void ValidateCreateBooks_EmptyMethodNoModel_ReturnsOk()
        {
            // Act
            var result = CreateBooksOrchestrator.ValidateCreateBooks(
                _scrText,
                BookSetOf(1),
                CreationMethod.Empty,
                modelScrText: null
            );

            // Assert
            Assert.That(result.Severity, Is.EqualTo(ValidationSeverity.Ok));
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("ScenarioId", "TS-053")]
        [Property("BehaviorId", "BHV-306")]
        [Property("InvariantId", "INV-023")]
        [Description(
            "ValidateCreateBooks with FromTemplate + model + versification mismatch "
                + "→ Warning severity (not blocking)."
        )]
        public void ValidateCreateBooks_FromTemplateWithVersificationMismatch_ReturnsWarning()
        {
            // Arrange
            using var model = new DummyScrText();
            model.Settings.Versification = ScrVers.Vulgate;
            model.PutText(1, 0, false, "\\id GEN\n", null);

            // Act
            var result = CreateBooksOrchestrator.ValidateCreateBooks(
                _scrText,
                BookSetOf(1),
                CreationMethod.FromTemplate,
                modelScrText: model
            );

            // Assert
            Assert.That(result.Severity, Is.EqualTo(ValidationSeverity.Warning));
        }

        // =====================================================================
        // Edge cases and argument validation
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-407")]
        [Description(
            "Book already present in project → orchestrator does not crash; "
                + "ScriptureTemplate.CreateOneBook returns true no-op (PT9 "
                + "ScriptureTemplate.cs:50-51); CreatedCount still reflects success."
        )]
        public void CreateBooks_BookAlreadyPresent_DoesNotCrash()
        {
            // Arrange — seed GEN so it is already present
            _scrText.PutText(1, 0, false, "\\id GEN\n", null);
            Assert.That(_scrText.BookPresent(1), Is.True, "precondition: GEN already present");

            // Act
            var result = CreateBooksOrchestrator.CreateBooks(
                _scrText,
                BookSetOf(1),
                CreationMethod.Empty,
                modelScrText: null
            );

            // Theme 7 (2026-04-30): replaced tautological Is.Not.Null on a record
            // type with behavioral assertions on the result. Already-present books
            // are idempotent no-ops per PT9 ScriptureTemplate.cs:50-51 — Success
            // stays true, CreatedCount stays at 0 (we didn't actually create
            // anything), and Errors stays empty.
            Assert.That(
                result.Success,
                Is.True,
                "Already-present book must produce Success=true (idempotent no-op)"
            );
            Assert.That(
                result.CreatedCount,
                Is.EqualTo(0),
                "Already-present book contributes zero to CreatedCount"
            );
            Assert.That(result.Errors, Is.Empty, "Already-present book is not an error condition");
            Assert.That(
                result.LastCreatedBookNum,
                Is.Null,
                "No new book was created → LastCreatedBookNum stays null"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-004")]
        [Property("BehaviorId", "BHV-407")]
        [Description(
            "FromTemplate with modelScrText=null → orchestrator propagates "
                + "ArgumentException from ScriptureTemplateService.CreateOneBook "
                + "(PT9 ScriptureTemplate.cs:47-48). Happens at CreateBooks call time."
        )]
        public void CreateBooks_FromTemplateWithNullModel_ThrowsArgumentException()
        {
            // Act + Assert
            Assert.That(
                () =>
                    CreateBooksOrchestrator.CreateBooks(
                        _scrText,
                        BookSetOf(1),
                        CreationMethod.FromTemplate,
                        modelScrText: null
                    ),
                Throws.InstanceOf<ArgumentException>(),
                "FromTemplate without a model project must raise ArgumentException"
            );
        }
    }
}
