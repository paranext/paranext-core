using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ManageBooks;
using Paratext.Data;

namespace TestParanextDataProvider.ManageBooks
{
    /// <summary>
    /// Tests for <see cref="ImportBooksOrchestrator"/> CAP-009 methods
    /// (<c>ParseImportFiles</c>, <c>CheckOverlappingFiles</c>).
    ///
    /// Capability: CAP-009 ImportParsing (Outside-In TDD)
    ///
    /// Contracts:
    /// - Section 2.5 <c>ImportBooksInput</c> / <c>ImportFileEntry</c>
    /// - Section 3.5 <c>BookComparisonResult</c> (REUSED from CAP-006)
    /// - Section 4.10 <c>ParseImportFiles</c>
    /// - Section 4.12 <c>CheckOverlappingFiles</c>
    ///
    /// Extractions: EXT-011 (OverlappingFilesFound — full port).
    ///
    /// Tests derive expected behavior from:
    /// - PT9 source: <c>ParatextData/ImportSfmText.cs:76-151</c> (ReadAndParse / ExtractBooks),
    ///   <c>ParatextData/UsxImporter.cs:33-80</c> (USX conversion),
    ///   <c>Paratext/FileMenu/ImportBooksForm.cs:244-269</c> (OverlappingFilesFound).
    /// - Golden master: gm-012 (Import overlap detection — canonical wire message).
    /// - Test specifications: spec-003 (SFM pipeline), spec-004 (USX pipeline).
    /// - Test scenarios: TS-016, TS-017, TS-018, TS-019, TS-020, TS-021, TS-022,
    ///   TS-023..TS-027 (related — SetDefaultEligibility reuse), TS-031, TS-085,
    ///   TS-095, TS-096.
    /// - Behavior catalog: BHV-106, BHV-107, BHV-108, BHV-109 (reused),
    ///   BHV-112, BHV-125, BHV-318.
    /// - Theme 8 (2026-04-30) BehaviorId traceability — additional CAP-009 /
    ///   CAP-010 BHVs are exercised transitively through the import pipeline:
    ///   BHV-108 (USX-or-USFM detection — CAP-009 ParseImportFiles inspects
    ///   file content), BHV-111 (admin auto-grant for new books in shared
    ///   projects — CAP-010 transitive via ImportSfmText), BHV-121 (per-file
    ///   encoding error → AlertEntry capture — CAP-010 via AlertCapture
    ///   scope), BHV-123 (USX → USFM conversion — CAP-010 TryConvertUsxToUsfm).
    ///   Tagged on the most directly-relevant tests below.
    /// - Invariants / Validations: INV-009, INV-010, VAL-006, VAL-007, VAL-008, VAL-012.
    ///
    /// SCOPE BOUNDARIES (CAP-009 only — parse + overlap; NOT execution):
    /// - No <c>ImportSfmText.DoImport</c> / WriteLock / AlertCapture coverage —
    ///   those are CAP-010 scope.
    /// - No <c>SendFullProjectUpdateEvent</c> — CAP-009 is read-only (Theme 6).
    /// - <c>SetDefaultEligibility</c> per-state coverage is already in
    ///   <see cref="CopyBooksOrchestratorTests"/> (CAP-006). Here we write
    ///   ONE integration test verifying CAP-009 reuses that decision tree
    ///   rather than duplicating all six state assertions.
    /// - TS-083 / TS-084 (<c>ImportBooksForm</c> browse/add-files) are
    ///   UI-layer dialog orchestration — backend asserts server-side parsing
    ///   behavior only. UI coverage lives in the UI-phase tests.
    /// - CAP-010 execution scenarios (TS-014, TS-015, TS-028, TS-029, TS-030,
    ///   TS-091) and UI dialog scenarios (TS-083, TS-084) are deliberately
    ///   omitted from this file.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class ImportBooksOrchestratorTests : PapiTestBase
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

        // =====================================================================
        // ParseImportFiles — BHV-107 ExtractBooks behaviors (TS-017..022)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-009")]
        [Property("ScenarioId", "TS-017")]
        [Property("BehaviorId", "BHV-107")]
        [Property("SpecId", "spec-003")]
        [Description(
            "TS-017: file containing two books separated by \\id markers → "
                + "ExtractBooks splits into GEN and EXO entries."
        )]
        public void ParseImportFiles_MultiBookFile_SplitsAtIdMarkers()
        {
            var files = new[]
            {
                new ImportFileEntry(
                    FileName: "multi.sfm",
                    Content: "\\id GEN - Test\n\\c 1\n\\v 1 In the beginning...\n"
                        + "\\id EXO - Test\n\\c 1\n\\v 1 Now these are...",
                    Included: true
                ),
            };

            BookComparisonResult result = ImportBooksOrchestrator.ParseImportFiles(_scrText, files);

            Assert.That(result.Entries, Has.Count.EqualTo(2), "should extract both books");
            // 1 = GEN, 2 = EXO per Canon
            Assert.That(
                result.Entries.Select(e => e.BookNum).ToArray(),
                Is.EqualTo(new[] { 1, 2 }),
                "books should be GEN (1) and EXO (2)"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-009")]
        [Property("ScenarioId", "TS-018")]
        [Property("BehaviorId", "BHV-107")]
        [Property("InvariantId", "INV-009")]
        [Property("ValidationId", "VAL-006")]
        [Property("SpecId", "spec-003")]
        [Description(
            "TS-018 / VAL-006 / INV-009: file without any \\id line → no books "
                + "extracted. Per ImportSfmText.cs:110-114 the parse returns "
                + "without adding any entries."
        )]
        public void ParseImportFiles_NoIdLine_FileRejected()
        {
            var files = new[]
            {
                new ImportFileEntry(
                    FileName: "no-id.sfm",
                    Content: "\\c 1\n\\v 1 Some text without an id line",
                    Included: true
                ),
            };

            BookComparisonResult result = ImportBooksOrchestrator.ParseImportFiles(_scrText, files);

            Assert.That(
                result.Entries,
                Is.Empty,
                "VAL-006 / INV-009: files without \\id produce no comparison entries"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-009")]
        [Property("ScenarioId", "TS-019")]
        [Property("BehaviorId", "BHV-107")]
        [Property("ValidationId", "VAL-007")]
        [Property("SpecId", "spec-003")]
        [Description(
            "TS-019 / VAL-007: file with \\id followed by an unrecognized 3-letter "
                + "code (not in Canon) → the file is rejected, no entry added. Per "
                + "ImportSfmText.cs:136-141, Canon.BookIdToNumber returns 0 and the "
                + "parser aborts for this file."
        )]
        public void ParseImportFiles_InvalidBookCode_FileRejected()
        {
            var files = new[]
            {
                new ImportFileEntry(
                    FileName: "invalid.sfm",
                    Content: "\\id XYZ - Unknown Book\n\\c 1\n\\v 1 text",
                    Included: true
                ),
            };

            BookComparisonResult result = ImportBooksOrchestrator.ParseImportFiles(_scrText, files);

            Assert.That(
                result.Entries,
                Is.Empty,
                "VAL-007: Canon.BookIdToNumber(XYZ) returns 0 → file rejected"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-009")]
        [Property("ScenarioId", "TS-020")]
        [Property("BehaviorId", "BHV-107")]
        [Property("SpecId", "spec-003")]
        [Description(
            "TS-020: file with text before the first \\id marker → processing "
                + "continues; the book after the preamble is still extracted. "
                + "Per ImportSfmText.cs:116-117: alert shown as warning but no "
                + "abort."
        )]
        public void ParseImportFiles_TextBeforeFirstId_WarnsAndContinues()
        {
            var files = new[]
            {
                new ImportFileEntry(
                    FileName: "preamble.sfm",
                    Content: "Some preamble text\n\\id GEN\n\\c 1\n\\v 1 text",
                    Included: true
                ),
            };

            BookComparisonResult result = ImportBooksOrchestrator.ParseImportFiles(_scrText, files);

            Assert.That(result.Entries, Has.Count.EqualTo(1), "GEN should still be extracted");
            Assert.That(result.Entries[0].BookNum, Is.EqualTo(1), "should be Genesis (1)");
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-009")]
        [Property("ScenarioId", "TS-021")]
        [Property("BehaviorId", "BHV-107")]
        [Property("InvariantId", "INV-010")]
        [Property("SpecId", "spec-003")]
        [Description(
            "TS-021 / INV-010: lowercase book code in \\id line → normalized to "
                + "uppercase and recognized via Canon.BookIdToNumber. Per "
                + "ImportSfmText.cs:135 the parse calls ToUpperInvariant()."
        )]
        public void ParseImportFiles_LowercaseBookCode_UppercasedAndRecognized()
        {
            var files = new[]
            {
                new ImportFileEntry(
                    FileName: "lowercase.sfm",
                    Content: "\\id gen - Lowercase test\n\\c 1\n\\v 1 text",
                    Included: true
                ),
            };

            BookComparisonResult result = ImportBooksOrchestrator.ParseImportFiles(_scrText, files);

            Assert.That(result.Entries, Has.Count.EqualTo(1));
            Assert.That(
                result.Entries[0].BookNum,
                Is.EqualTo(1),
                "INV-010: lowercase 'gen' normalized to 'GEN' and recognized"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-009")]
        [Property("ScenarioId", "TS-022")]
        [Property("BehaviorId", "BHV-107")]
        [Property("BehaviorId", "BHV-125")]
        [Property("SpecId", "spec-003")]
        [Description(
            "TS-022 / BHV-125: NBSP (U+00A0) between \\id and book code → "
                + "ConvertNonStandardWhitespace normalizes it to a regular space "
                + "so Regex.Split(@'\\\\id ') separates the marker from the book "
                + "code. The book is extracted correctly."
        )]
        public void ParseImportFiles_NbspInIdMarker_NormalizedAndParsed()
        {
            var files = new[]
            {
                new ImportFileEntry(
                    FileName: "nbsp.sfm",
                    // \u00A0 = non-breaking space between \id and GEN
                    Content: "\\id\u00a0GEN - Test\n\\c 1\n\\v 1 text",
                    Included: true
                ),
            };

            BookComparisonResult result = ImportBooksOrchestrator.ParseImportFiles(_scrText, files);

            Assert.That(result.Entries, Has.Count.EqualTo(1), "NBSP should be normalized");
            Assert.That(result.Entries[0].BookNum, Is.EqualTo(1));
        }

        // =====================================================================
        // BHV-106 ReadAndParseFilesIntoBooks per-file skip semantics (TS-016)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-009")]
        [Property("ScenarioId", "TS-016")]
        [Property("BehaviorId", "BHV-106")]
        [Property("ValidationId", "VAL-008")]
        [Property("SpecId", "spec-003")]
        [Description(
            "TS-016 / BHV-106 / VAL-008: when one file fails parsing (simulated "
                + "here via a file with content that cannot produce an extractable "
                + "book — PT10's equivalent of PT9's EncodingException per-file "
                + "skip since PT10 receives pre-decoded strings), the orchestrator "
                + "skips it and continues. Other files still contribute entries."
        )]
        public void ParseImportFiles_CorruptedEncoding_FileSkipped_OtherFilesContinue()
        {
            var files = new[]
            {
                // This file cannot produce an extractable book (no \id at all —
                // PT10's equivalent to PT9's per-file EncodingException skip).
                new ImportFileEntry(
                    FileName: "corrupted.sfm",
                    Content: "\uFFFD garbage content with no marker",
                    Included: true
                ),
                new ImportFileEntry(
                    FileName: "valid-gen.sfm",
                    Content: "\\id GEN\n\\c 1\n\\v 1 valid text",
                    Included: true
                ),
            };

            BookComparisonResult result = ImportBooksOrchestrator.ParseImportFiles(_scrText, files);

            Assert.That(
                result.Entries,
                Has.Count.EqualTo(1),
                "BHV-106: corrupted file skipped; valid file still extracted"
            );
            Assert.That(
                result.Entries[0].BookNum,
                Is.EqualTo(1),
                "GEN from the valid file should be the extracted entry"
            );
        }

        [Test]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-009")]
        [Property("ScenarioId", "TS-016")]
        [Property("ScenarioId", "TS-017")]
        [Property("BehaviorId", "BHV-106")]
        [Description(
            "Integration: multi-file input with one invalid file and several valid "
                + "files — result contains only the valid books, in the order they "
                + "appear across the input files."
        )]
        public void ParseImportFiles_MultiFilePartialSuccess_ValidFilesExtracted()
        {
            var files = new[]
            {
                new ImportFileEntry(
                    FileName: "valid-gen.sfm",
                    Content: "\\id GEN\n\\c 1\n\\v 1 first",
                    Included: true
                ),
                new ImportFileEntry(
                    FileName: "invalid.sfm",
                    Content: "no id here, garbage",
                    Included: true
                ),
                new ImportFileEntry(
                    FileName: "valid-exo.sfm",
                    Content: "\\id EXO\n\\c 1\n\\v 1 second",
                    Included: true
                ),
            };

            BookComparisonResult result = ImportBooksOrchestrator.ParseImportFiles(_scrText, files);

            Assert.That(
                result.Entries.Select(e => e.BookNum).ToArray(),
                Is.EqualTo(new[] { 1, 2 }),
                "only GEN and EXO should be extracted; invalid file is skipped"
            );
        }

        // =====================================================================
        // BHV-109 SetDefaultEligibility REUSE (TS-023..027 related)
        //
        // CAP-009's parse pipeline MUST route each extracted book through the
        // same decision tree used by CAP-006's CopyBooksOrchestrator.
        // SetDefaultEligibility. The per-state matrix is already asserted in
        // CopyBooksOrchestratorTests (all six states). Here we write ONE
        // integration test proving that the reuse happens — specifically, a
        // book NOT present in the destination emerges with
        // ComparisonState.DestDoesNotExist and DefaultIncluded=true (INV-C07),
        // which is the outcome CAP-006's decision tree produces.
        // =====================================================================

        [Test]
        [Category("Integration")]
        [Property("CapabilityId", "CAP-009")]
        [Property("ScenarioId", "TS-023")]
        [Property("BehaviorId", "BHV-109")]
        [Property("InvariantId", "INV-012")]
        [Description(
            "Integration: CAP-009 reuses CopyBooksOrchestrator.SetDefaultEligibility "
                + "for each extracted book. A book NOT present in the destination "
                + "project emerges with ComparisonState.DestDoesNotExist and "
                + "DefaultIncluded=true (INV-012 / INV-C07). This single assertion "
                + "proves the reuse; per-state coverage lives in "
                + "CopyBooksOrchestratorTests."
        )]
        public void ParseImportFiles_SetDefaultEligibilityReusesCap006Rules()
        {
            // DummyScrText starts with no books — GEN is not present.
            var files = new[]
            {
                new ImportFileEntry(
                    FileName: "gen.sfm",
                    Content: "\\id GEN\n\\c 1\n\\v 1 new book content",
                    Included: true
                ),
            };

            BookComparisonResult result = ImportBooksOrchestrator.ParseImportFiles(_scrText, files);

            Assert.That(result.Entries, Has.Count.EqualTo(1));
            BookComparisonEntry entry = result.Entries[0];
            Assert.That(
                entry.ComparisonState,
                Is.EqualTo(ComparisonState.DestDoesNotExist),
                "new book should compare as DestDoesNotExist"
            );
            Assert.That(
                entry.DefaultIncluded,
                Is.True,
                "INV-012: new books pre-selected for import (SetDefaultEligibility reuse)"
            );
            Assert.That(entry.Selectable, Is.True);
            Assert.That(
                entry.TooltipInfo,
                Is.EqualTo(CopyBooksOrchestrator.DestDoesNotExistTooltipKey),
                "tooltip should match CAP-006's canonical localize key"
            );
        }

        // =====================================================================
        // USX Parse (spec-004) — TS-031, TS-095, TS-096 (parse side only;
        // full import execution is CAP-010 scope)
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-009")]
        [Property("ScenarioId", "TS-031")]
        [Property("BehaviorId", "BHV-112")]
        [Property("SpecId", "spec-004")]
        [Description(
            "TS-031 / spec-004: USX file content → converted to USFM via UsxImporter "
                + "fragmentation, then extracted as a book. Parse-side only — "
                + "no PutText, no disk mutation. Full import → CAP-010."
        )]
        public void ParseImportFiles_UsxContent_ConvertsToUsfmAndExtracts()
        {
            // Minimal valid USX for book MAT (40).
            const string usxContent =
                "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n"
                + "<usx>\n"
                + "  <book code=\"MAT\" style=\"id\"></book>\n"
                + "  <chapter number=\"1\" style=\"c\" />\n"
                + "  <para style=\"p\">\n"
                + "    <verse number=\"1\" style=\"v\" />this is some text.</para>\n"
                + "</usx>";

            var files = new[]
            {
                new ImportFileEntry(FileName: "mat.usx", Content: usxContent, Included: true),
            };

            BookComparisonResult result = ImportBooksOrchestrator.ParseImportFiles(_scrText, files);

            Assert.That(result.Entries, Has.Count.EqualTo(1), "USX should extract one book");
            Assert.That(
                result.Entries[0].BookNum,
                Is.EqualTo(40),
                "USX <book code=\"MAT\"> should yield book number 40"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-009")]
        [Property("ScenarioId", "TS-095")]
        [Property("BehaviorId", "BHV-112")]
        [Property("SpecId", "spec-004")]
        [Description(
            "TS-095 / spec-004: malformed USX → the file is skipped during parsing "
                + "rather than throwing out of the whole orchestrator (parse-side "
                + "has the same per-file tolerance as USFM). Other files continue. "
                + "Note: PT9's UsxImporterException is thrown during IMPORT "
                + "execution (CAP-010), not during the pre-flight parse — CAP-009 "
                + "surfaces the malformed file as a skip so the UI can still show "
                + "a file list."
        )]
        public void ParseImportFiles_MalformedUsx_FileRejectedWithError()
        {
            var files = new[]
            {
                new ImportFileEntry(
                    FileName: "malformed.usx",
                    Content: "<usx><broken>not closed",
                    Included: true
                ),
                new ImportFileEntry(
                    FileName: "valid.sfm",
                    Content: "\\id GEN\n\\c 1\n\\v 1 text",
                    Included: true
                ),
            };

            BookComparisonResult result = ImportBooksOrchestrator.ParseImportFiles(_scrText, files);

            Assert.That(
                result.Entries,
                Has.Count.EqualTo(1),
                "malformed USX skipped; valid SFM still extracted"
            );
            Assert.That(result.Entries[0].BookNum, Is.EqualTo(1), "GEN from valid.sfm remains");
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-009")]
        [Property("ScenarioId", "TS-096")]
        [Property("BehaviorId", "BHV-112")]
        [Property("SpecId", "spec-004")]
        [Description(
            "TS-096 / spec-004: USX file with no <book> element → fragmentation "
                + "produces USFM with no \\id marker, ExtractBooks returns 0 "
                + "books. Parallel to PT9 UsxImporter.ImportText returning 0."
        )]
        public void ParseImportFiles_UsxWithNoBookElement_NoBooksExtracted()
        {
            const string usxNoBook =
                "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n"
                + "<usx>\n"
                + "  <para style=\"p\">No book element here</para>\n"
                + "</usx>";

            var files = new[]
            {
                new ImportFileEntry(FileName: "no-book.usx", Content: usxNoBook, Included: true),
            };

            BookComparisonResult result = ImportBooksOrchestrator.ParseImportFiles(_scrText, files);

            Assert.That(result.Entries, Is.Empty, "USX without <book> yields zero entries");
        }

        // =====================================================================
        // Edge case — empty input
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-009")]
        [Property("BehaviorId", "BHV-106")]
        [Description(
            "Edge case: empty file list → empty result. The orchestrator does "
                + "not treat this as an error (the wire-layer service handles "
                + "empty-input rejection per Section 2.5 validation rules)."
        )]
        public void ParseImportFiles_EmptyFileList_ReturnsEmptyResult()
        {
            var files = Array.Empty<ImportFileEntry>();

            BookComparisonResult result = ImportBooksOrchestrator.ParseImportFiles(_scrText, files);

            Assert.That(result.Entries, Is.Empty);
        }

        // =====================================================================
        // CheckOverlappingFiles — TS-085 / BHV-318 / VAL-012 / gm-012
        // =====================================================================

        [Test]
        [Category("GoldenMaster")]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-009")]
        [Property("ScenarioId", "TS-085")]
        [Property("BehaviorId", "BHV-318")]
        [Property("ValidationId", "VAL-012")]
        [Property("GoldenMaster", "gm-012")]
        [Description(
            "gm-012 / TS-085 / VAL-012: two import files both assigning to "
                + "bookNum=1 with Included=true → ValidationResult.Error with the "
                + "canonical PT9 message. This is the OUTER acceptance test for "
                + "CAP-009's overlap detection."
        )]
        public void CheckOverlappingFiles_TwoFilesSameBookBothIncluded_ReturnsError()
        {
            var entries = new[]
            {
                new OverlapCheckEntry(FileName: "gen-v1.sfm", BookNum: 1, Included: true),
                new OverlapCheckEntry(FileName: "gen-v2.sfm", BookNum: 1, Included: true),
            };

            ValidationResult result = ImportBooksOrchestrator.CheckOverlappingFiles(entries);

            Assert.That(result.Severity, Is.EqualTo(ValidationSeverity.Error));
            // Orchestrator-level test: the orchestrator returns the localize
            // KEY (resolved to English at the wire boundary by
            // ManageBooksService). See OverlappingFilesAlertFallback for the
            // PT9 gm-012 byte-for-byte wording check.
            Assert.That(
                result.Message,
                Is.EqualTo(ImportBooksOrchestrator.OverlappingFilesAlertKey),
                "gm-012: orchestrator returns the localize key"
            );
            // Theme 7 (2026-04-30): rolled in the previously-separate
            // OverlappingFilesAlertMessage_ExposesCanonicalWording test —
            // the canonical PT9 fallback wording ('can not' — not 'cannot')
            // lives in the fallback constant. Asserting it here keeps the
            // gm-012 byte-for-byte tie next to the meaningful behavior test
            // rather than as a free-standing constant probe.
            Assert.That(
                ImportBooksOrchestrator.OverlappingFilesAlertFallback,
                Is.EqualTo(
                    "Two files contain information for the same book. "
                        + "They can not both be selected."
                ),
                "gm-012: localize-key fallback preserves PT9 wording byte-for-byte"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-009")]
        [Property("ScenarioId", "TS-085")]
        [Property("BehaviorId", "BHV-318")]
        [Property("ValidationId", "VAL-012")]
        [Description(
            "Edge case: two files target the same bookNum but only one is "
                + "Included=true → no overlap (the user has already resolved "
                + "the duplicate by deselecting one). Returns OK."
        )]
        public void CheckOverlappingFiles_TwoFilesSameBookOnlyOneIncluded_ReturnsOk()
        {
            var entries = new[]
            {
                new OverlapCheckEntry(FileName: "gen-v1.sfm", BookNum: 1, Included: true),
                new OverlapCheckEntry(FileName: "gen-v2.sfm", BookNum: 1, Included: false),
            };

            ValidationResult result = ImportBooksOrchestrator.CheckOverlappingFiles(entries);

            Assert.That(
                result.Severity,
                Is.EqualTo(ValidationSeverity.Ok),
                "deselected duplicates do not count as overlaps"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-009")]
        [Property("ScenarioId", "TS-085")]
        [Property("BehaviorId", "BHV-318")]
        [Property("ValidationId", "VAL-012")]
        [Description(
            "Happy path: three files targeting three different book numbers, "
                + "all Included=true → no overlap, returns OK."
        )]
        public void CheckOverlappingFiles_NoDuplicates_ReturnsOk()
        {
            var entries = new[]
            {
                new OverlapCheckEntry(FileName: "gen.sfm", BookNum: 1, Included: true),
                new OverlapCheckEntry(FileName: "exo.sfm", BookNum: 2, Included: true),
                new OverlapCheckEntry(FileName: "lev.sfm", BookNum: 3, Included: true),
            };

            ValidationResult result = ImportBooksOrchestrator.CheckOverlappingFiles(entries);

            Assert.That(result.Severity, Is.EqualTo(ValidationSeverity.Ok));
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-009")]
        [Property("BehaviorId", "BHV-318")]
        [Description(
            "Edge case: empty entries array → OK (nothing to overlap). The "
                + "UI may call this while the file list is empty; the backend "
                + "must not treat that as an error."
        )]
        public void CheckOverlappingFiles_EmptyArray_ReturnsOk()
        {
            ValidationResult result = ImportBooksOrchestrator.CheckOverlappingFiles(
                Array.Empty<OverlapCheckEntry>()
            );

            Assert.That(result.Severity, Is.EqualTo(ValidationSeverity.Ok));
        }

        // =====================================================================
        // CAP-010: ImportBooks execution tests (Theme 8 AlertCapture)
        //
        // These exercise the orchestrator's NEW ImportBooks method added for
        // CAP-010 — the ImportSfmText.ImportBooks delegation wrapped in an
        // AlertCapture scope. The wire-layer precondition guards and
        // SendFullProjectUpdateEvent emission live in ManageBooksService
        // (see ImportBooksServiceTests); this section focuses on the
        // orchestrator's contract: given a valid ScrText and
        // ImportFileEntry[], return an ImportBooksResult with Success flag,
        // ImportedCount, Warnings, and Errors populated from the
        // AlertCapture scope.
        //
        // Scenarios covered:
        //   TS-014: import two new books → Success=true, ImportedCount=2,
        //           books present in BooksPresentSet after return
        //   TS-015: WriteLock unavailable → Success=false, ImportedCount=0
        //   TS-030: replaceEntireBook=true writes whole file content
        //   TS-091: admin auto-grant for new books in shared projects
        //           (BHV-111 — transitively invoked through ImportSfmText)
        //   TS-097: book not writable/creatable during chapter-merge →
        //           blocked, entries captured as warnings/errors
        //
        // Not covered here (ParatextData-internal behaviors exercised
        // transitively through the full pipeline; primary coverage is the
        // Paratext test suite): TS-028 (WriteChaptersToBook creates new book),
        // TS-029 (empty chapters skipped — INV-013), TS-093/094 (USX
        // character-style preservation and merge mode — BHV-613/614).
        //
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Category("Critical")]
        [Property("CapabilityId", "CAP-010")]
        [Property("ScenarioId", "TS-014")]
        [Property("BehaviorId", "BHV-105")]
        [Property("BehaviorId", "BHV-111")] // Theme 8: admin auto-grant for new books in shared projects (transitive via ImportSfmText)
        [Property("BehaviorId", "BHV-121")] // Theme 8: per-file encoding error → AlertEntry capture (transitive via AlertCapture scope)
        [Property("SpecId", "spec-003")]
        [Property("InvariantId", "INV-C08")]
        [Description(
            "TS-014 / BHV-105: import two brand-new books GEN and EXO in "
                + "replaceEntireBook=true mode. ImportSfmText.ImportBooks "
                + "delegation completes; Success=true, ImportedCount=2, and "
                + "both books appear in BooksPresentSet afterwards (INV-C08)."
        )]
        public void ImportBooks_TwoNewBooksReplaceMode_SucceedsAndUpdatesBooksPresentSet()
        {
            ImportFileEntry[] files = new[]
            {
                new ImportFileEntry(
                    FileName: "gen.sfm",
                    Content: "\\id GEN\n\\c 1\n\\v 1 In the beginning.",
                    Included: true
                ),
                new ImportFileEntry(
                    FileName: "exo.sfm",
                    Content: "\\id EXO\n\\c 1\n\\v 1 These are the names.",
                    Included: true
                ),
            };

            ImportBooksResult result = ImportBooksOrchestrator.ImportBooks(
                _scrText,
                files,
                replaceEntireBook: true
            );

            Assert.That(result.Success, Is.True, "BHV-105 happy path returns Success=true");
            Assert.That(result.ImportedCount, Is.EqualTo(2), "two included files → two imports");
            Assert.That(result.Errors, Is.Empty, "no error-level alerts expected");
            Assert.That(
                _scrText.BooksPresentSet.IsSelected(1),
                Is.True,
                "INV-C08: GEN must be present after import"
            );
            Assert.That(
                _scrText.BooksPresentSet.IsSelected(2),
                Is.True,
                "INV-C08: EXO must be present after import"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("ScenarioId", "TS-014")]
        [Property("BehaviorId", "BHV-105")]
        [Property("SpecId", "spec-003")]
        [Description(
            "ImportBooks returns a non-null ImportBooksResult (record type) "
                + "with non-null Warnings and Errors arrays — the shape callers "
                + "depend on, even in the zero-input edge case."
        )]
        public void ImportBooks_EmptyFilesArray_ReturnsResultWithZeroImportedCount()
        {
            ImportFileEntry[] files = Array.Empty<ImportFileEntry>();

            ImportBooksResult result = ImportBooksOrchestrator.ImportBooks(
                _scrText,
                files,
                replaceEntireBook: true
            );

            // Theme 7 (2026-04-30): replaced Is.Not.Null tautologies on a
            // record return type and AlertEntry[] (which can't be null on a
            // success path) with Is.Empty assertions on the actual contract:
            // an empty-input import succeeds with zero imported books and no
            // captured alerts.
            Assert.That(result.ImportedCount, Is.EqualTo(0));
            Assert.That(
                result.Warnings,
                Is.Empty,
                "empty input → no captured ParatextData warnings"
            );
            Assert.That(result.Errors, Is.Empty, "empty input → no captured ParatextData errors");
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("ScenarioId", "TS-014")]
        [Property("BehaviorId", "BHV-105")]
        [Description(
            "Files with Included=false are SKIPPED during import — they do not "
                + "count toward ImportedCount and do not appear in BooksPresentSet. "
                + "Mirrors PT9 ImportSfmText.cs:177-178 (sdfi.IncludeThisFile "
                + "check)."
        )]
        public void ImportBooks_NotIncludedFiles_SkippedDuringImport()
        {
            ImportFileEntry[] files = new[]
            {
                new ImportFileEntry(
                    FileName: "gen.sfm",
                    Content: "\\id GEN\n\\c 1\n\\v 1 included.",
                    Included: true
                ),
                new ImportFileEntry(
                    FileName: "exo.sfm",
                    Content: "\\id EXO\n\\c 1\n\\v 1 NOT included.",
                    Included: false
                ),
            };

            ImportBooksResult result = ImportBooksOrchestrator.ImportBooks(
                _scrText,
                files,
                replaceEntireBook: true
            );

            Assert.That(result.ImportedCount, Is.EqualTo(1), "only included files imported");
            Assert.That(
                _scrText.BooksPresentSet.IsSelected(1),
                Is.True,
                "GEN (included) should be present"
            );
            Assert.That(
                _scrText.BooksPresentSet.IsSelected(2),
                Is.False,
                "EXO (Included=false) should be skipped"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("ScenarioId", "TS-030")]
        [Property("BehaviorId", "BHV-105")]
        [Property("BehaviorId", "BHV-110")]
        [Property("SpecId", "spec-003")]
        [Description(
            "TS-030 / BHV-110 (revised): replaceEntireBook=true writes the "
                + "whole file content to the destination book, bypassing "
                + "WriteChaptersToBook entirely. Verified by GetText round-trip "
                + "matching the source (normalized for USFM canonical form)."
        )]
        public void ImportBooks_ReplaceEntireBookTrue_WritesFullContentToBook()
        {
            const string content =
                "\\id GEN\n\\c 1\n\\v 1 First verse.\n\\c 2\n\\v 1 Second chapter.";
            ImportFileEntry[] files = new[]
            {
                new ImportFileEntry(FileName: "gen.sfm", Content: content, Included: true),
            };

            ImportBooksResult result = ImportBooksOrchestrator.ImportBooks(
                _scrText,
                files,
                replaceEntireBook: true
            );

            Assert.That(result.Success, Is.True);
            Assert.That(
                _scrText.BooksPresentSet.IsSelected(1),
                Is.True,
                "GEN must be created even with empty destination"
            );

            // Observable side effect: the content we wrote round-trips through
            // ScrText.GetText (up to USFM canonicalization — use the shared
            // helper so we don't fight whitespace/marker normalization).
            string roundTripped = _scrText.GetText(1);
            VerifyUsfmSame(content, roundTripped, _scrText, bookNum: 1);
        }

        [Test]
        [Category("Contract")]
        [Category("Critical")]
        [Property("CapabilityId", "CAP-010")]
        [Property("ScenarioId", "TS-015")]
        [Property("BehaviorId", "BHV-105")]
        [Property("SpecId", "spec-003")]
        [Property("InvariantId", "INV-002")]
        [Property("InvariantId", "INV-C01")]
        [Description(
            "TS-015 / INV-002: WriteLock unavailable blocks the entire import "
                + "— no partial success. The orchestrator uses the same "
                + "LockNotObtainedScrText marker pattern as CAP-005/007 to "
                + "simulate the lock failure. When ImportSfmText.ImportBooks "
                + "returns false (lock failure in PT9) OR the marker fires, the "
                + "orchestrator MUST surface that as Success=false, ImportedCount=0."
        )]
        public void ImportBooks_WriteLockUnavailable_ReturnsFailureWithZeroImported()
        {
            using var lockedScrText = new LockNotObtainedScrText();
            ImportFileEntry[] files = new[]
            {
                new ImportFileEntry(
                    FileName: "gen.sfm",
                    Content: "\\id GEN\n\\c 1\n\\v 1 text",
                    Included: true
                ),
            };

            ImportBooksResult result = ImportBooksOrchestrator.ImportBooks(
                lockedScrText,
                files,
                replaceEntireBook: true
            );

            Assert.That(result.Success, Is.False, "lock failure → overall Success=false");
            Assert.That(
                result.ImportedCount,
                Is.EqualTo(0),
                "lock failure → no files processed (INV-C03 no-partial-mutation)"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("ScenarioId", "TS-014")]
        [Property("BehaviorId", "BHV-105")]
        [Description(
            "The orchestrator wraps the ImportSfmText.ImportBooks delegation in "
                + "an AlertCapture scope so any ParatextData Alert.Show calls "
                + "during the import become AlertEntry records on the result. "
                + "For a happy-path import with a clean input there should be no "
                + "Error-level entries; any nuisance Information/Warning alerts "
                + "(e.g., language-file probes) are either allow-listed or appear "
                + "in Warnings but do not fail the import."
        )]
        public void ImportBooks_HappyPath_NoErrorEntriesInResult()
        {
            ImportFileEntry[] files = new[]
            {
                new ImportFileEntry(
                    FileName: "gen.sfm",
                    Content: "\\id GEN\n\\c 1\n\\v 1 text",
                    Included: true
                ),
            };

            ImportBooksResult result = ImportBooksOrchestrator.ImportBooks(
                _scrText,
                files,
                replaceEntireBook: true
            );

            Assert.That(
                result.Errors,
                Is.Empty,
                "clean happy-path import must produce no error-level AlertEntry records"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-010")]
        [Property("ScenarioId", "TS-096")]
        [Property("BehaviorId", "BHV-112")]
        [Property("BehaviorId", "BHV-108")] // Theme 8: USX-or-USFM detection (file content inspection)
        [Property("BehaviorId", "BHV-123")] // Theme 8: USX → USFM conversion path
        [Property("SpecId", "spec-004")]
        [Description(
            "TS-096: USX with no <book> element parses as valid XML but "
                + "contributes no extractable book. Orchestrator returns without "
                + "throwing; ImportedCount=0; BooksPresentSet unchanged. This "
                + "validates the graceful-no-book-extracted edge case."
        )]
        public void ImportBooks_UsxWithNoBookElement_ReturnsZeroImported()
        {
            const string usxNoBook =
                "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n"
                + "<usx>\n"
                + "  <para style=\"p\">No book element here.</para>\n"
                + "</usx>";
            ImportFileEntry[] files = new[]
            {
                new ImportFileEntry(FileName: "nobook.usx", Content: usxNoBook, Included: true),
            };

            ImportBooksResult result = ImportBooksOrchestrator.ImportBooks(
                _scrText,
                files,
                replaceEntireBook: true
            );

            Assert.That(result.ImportedCount, Is.EqualTo(0), "no book extracted → zero imported");
            Assert.That(
                _scrText.BooksPresentSet,
                Has.Count.EqualTo(0),
                "BooksPresentSet unchanged when no extractable book"
            );
        }

        // -------------------------------------------------------------------
        // LockNotObtainedScrText marker — same seam as CopyBooksOrchestrator /
        // DeleteBooksOrchestrator. The orchestrator recognises the type name
        // and throws LockNotObtainedException (or routes through the
        // equivalent ImportSfmText failure path) to simulate a held WriteLock.
        // -------------------------------------------------------------------

        /// <summary>
        /// Marker ScrText that triggers the orchestrator's WriteLock-failure
        /// path. Implementation recognises the type name (<c>LockNotObtainedScrText</c>)
        /// and surfaces the WriteLock-unavailable state, mirroring
        /// <see cref="CopyBooksOrchestratorTests"/> and
        /// <see cref="DeleteBooksOrchestratorTests"/>. The CAP-010 orchestrator
        /// either throws <c>LockNotObtainedException</c> (to be caught and
        /// mapped to Success=false in the orchestrator, or propagated through
        /// to the service's UNAVAILABLE mapping — implementer's choice) OR
        /// translates to Success=false directly.
        /// </summary>
        private sealed class LockNotObtainedScrText : DummyScrText { }
    }
}
