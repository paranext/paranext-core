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
                Is.EqualTo(CopyBooksOrchestrator.DestDoesNotExistTooltip),
                "tooltip should match CAP-006's canonical wording"
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
            Assert.That(
                result.Message,
                Is.EqualTo(ImportBooksOrchestrator.OverlappingFilesAlertMessage),
                "gm-012: message must match PT9 Localizer fallback verbatim"
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

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-009")]
        [Property("BehaviorId", "BHV-318")]
        [Property("GoldenMaster", "gm-012")]
        [Description(
            "gm-012: the overlapping-files alert message is exposed as a public "
                + "constant matching the PT9 Localizer fallback verbatim ('can "
                + "not' — not 'cannot')."
        )]
        public void OverlappingFilesAlertMessage_ExposesCanonicalWording()
        {
            Assert.That(
                ImportBooksOrchestrator.OverlappingFilesAlertMessage,
                Is.EqualTo(
                    "Two files contain information for the same book. "
                        + "They can not both be selected."
                )
            );
        }
    }
}
