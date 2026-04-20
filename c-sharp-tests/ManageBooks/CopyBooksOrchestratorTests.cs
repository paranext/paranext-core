using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ManageBooks;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.ManageBooks
{
    /// <summary>
    /// Tests for <see cref="CopyBooksOrchestrator"/> CAP-006 methods
    /// (<c>SetDefaultEligibility</c>, <c>LoadBooks</c>).
    ///
    /// Capability: CAP-006 BookComparison (Outside-In TDD)
    /// Contract:
    /// - Section 2.6 <c>BookComparisonInput</c>
    /// - Section 3.5 <c>BookComparisonResult</c> / <c>BookComparisonEntry</c> /
    ///   <c>ComparisonState</c>
    /// - Section 4.7 <c>GetBookComparison</c>
    ///
    /// Extractions: EXT-007 (LoadBooks), EXT-008 (SetDefaultEligibility).
    ///
    /// Tests derive expected behavior from:
    /// - PT9 source: <c>Paratext/ToolsMenu/CopyBooksForm.cs:279-363</c>
    /// - Golden master: gm-006 (with the documented PT9 FB 29809 exception)
    /// - Test scenarios: TS-023, TS-024, TS-025, TS-026, TS-027, TS-090, TS-059,
    ///   TS-060, TS-061
    /// - Behavior catalog: BHV-313, BHV-109, BHV-103
    /// - Invariants: INV-011, INV-012, INV-C06, INV-C07
    ///
    /// gm-006 RECONCILIATION (see CopyBooksOrchestrator.cs header):
    /// gm-006/expected-output.json preserves PT9's FB 29809 bug
    /// (IncludeThisFile=false for every state). PT10 follows data-contracts.md
    /// Section 3.5 "Business Logic" and TS-090's corrected expectedOutput,
    /// which aligns the Copy rules with the parallel Import rules
    /// (TS-023..027 / INV-011 / INV-012 / INV-C06 / INV-C07). The
    /// <c>SetDefaultEligibility_SixStates_MatchContractRulesNotPt9Bug</c> test
    /// asserts the corrected matrix explicitly.
    ///
    /// SCOPE BOUNDARIES (CAP-006 only):
    /// - CAP-007 (copy orchestration) and CAP-008 (To-project filtering) land
    ///   later in BE-3; this file exercises ONLY the comparison methods.
    /// - TS-059 (OK-button disabled state) is UI-layer; backend reflects the
    ///   precondition via Section 4.7 INVALID_PROJECT error in the wire tests.
    /// - TS-060 / TS-061 (Auxiliary/Daughter pre-selection) are UI-layer dialog
    ///   state; backend is source-agnostic — LoadBooks returns entries for
    ///   whichever two projects the caller supplies, and the UI decides the
    ///   initial From/To selections. Covered transitively by the wire tests.
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    internal class CopyBooksOrchestratorTests : PapiTestBase
    {
        private DummyScrText _fromScrText = null!;
        private DummyScrText _toScrText = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();

            _fromScrText = (DummyScrText)CreateDummyProject();
            _toScrText = (DummyScrText)CreateDummyProject();

            var fromDetails = CreateProjectDetails(_fromScrText);
            var toDetails = CreateProjectDetails(_toScrText);
            ParatextProjects.FakeAddProject(fromDetails, _fromScrText);
            ParatextProjects.FakeAddProject(toDetails, _toScrText);
        }

        [TearDown]
        public void TestTearDownScrText()
        {
            _fromScrText?.Dispose();
            _toScrText?.Dispose();
        }

        // =====================================================================
        // SetDefaultEligibility — six comparison states
        //
        // TS-023..027 / TS-090 / INV-011 / INV-012 / INV-C06 / INV-C07
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-006")]
        [Property("ScenarioId", "TS-024")]
        [Property("BehaviorId", "BHV-109")]
        [Property("InvariantId", "INV-011")]
        [Property("InvariantId", "INV-C06")]
        [Description(
            "TS-024 / INV-011: identical source and dest text → FilesAreSame, "
                + "DefaultIncluded=false, Selectable=true, tooltip = "
                + "'\"From\" and \"To\" books are identical'."
        )]
        public void SetDefaultEligibility_FilesAreSame_ExcludesAndSetsTooltip()
        {
            const string text = "\\id GEN content\r\n";
            DateTime modified = new DateTime(2026, 3, 5, 12, 0, 0);

            BookComparisonEntry entry = CopyBooksOrchestrator.SetDefaultEligibility(
                bookNum: 1,
                bookName: "Genesis",
                sourceText: text,
                destText: text,
                sourceModified: modified,
                destModified: modified
            );

            Assert.That(entry.ComparisonState, Is.EqualTo(ComparisonState.FilesAreSame));
            Assert.That(
                entry.DefaultIncluded,
                Is.False,
                "INV-011 / INV-C06: identical files excluded"
            );
            Assert.That(entry.Selectable, Is.True);
            Assert.That(entry.TooltipInfo, Is.EqualTo(CopyBooksOrchestrator.FilesAreSameTooltip));
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-006")]
        [Property("ScenarioId", "TS-023")]
        [Property("BehaviorId", "BHV-109")]
        [Property("InvariantId", "INV-012")]
        [Property("InvariantId", "INV-C07")]
        [Description(
            "TS-023 / INV-012: destination book does not exist → DestDoesNotExist, "
                + "DefaultIncluded=true, Selectable=true. Note: this corrects PT9 FB 29809."
        )]
        public void SetDefaultEligibility_DestDoesNotExist_IncludesAndSetsTooltip()
        {
            BookComparisonEntry entry = CopyBooksOrchestrator.SetDefaultEligibility(
                bookNum: 3,
                bookName: "Leviticus",
                sourceText: "\\id LEV content\r\n",
                destText: "",
                sourceModified: new DateTime(2026, 3, 10, 12, 0, 0),
                destModified: DateTime.MinValue
            );

            Assert.That(entry.ComparisonState, Is.EqualTo(ComparisonState.DestDoesNotExist));
            Assert.That(
                entry.DefaultIncluded,
                Is.True,
                "INV-012 / INV-C07: new books always included by default"
            );
            Assert.That(entry.Selectable, Is.True);
            Assert.That(
                entry.TooltipInfo,
                Is.EqualTo(CopyBooksOrchestrator.DestDoesNotExistTooltip)
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-006")]
        [Property("ScenarioId", "TS-025")]
        [Property("BehaviorId", "BHV-109")]
        [Description(
            "TS-025: source file is newer than destination → SourceIsNewer, "
                + "DefaultIncluded=true (per Section 3.5 Business Logic)."
        )]
        public void SetDefaultEligibility_SourceIsNewer_Includes()
        {
            BookComparisonEntry entry = CopyBooksOrchestrator.SetDefaultEligibility(
                bookNum: 40,
                bookName: "Matthew",
                sourceText: "\\id MAT newer\r\n",
                destText: "\\id MAT older\r\n",
                sourceModified: new DateTime(2026, 3, 10, 12, 0, 0),
                destModified: new DateTime(2026, 3, 1, 12, 0, 0)
            );

            Assert.That(entry.ComparisonState, Is.EqualTo(ComparisonState.SourceIsNewer));
            Assert.That(entry.DefaultIncluded, Is.True);
            Assert.That(entry.Selectable, Is.True);
            Assert.That(entry.TooltipInfo, Is.EqualTo(CopyBooksOrchestrator.SourceIsNewerTooltip));
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-006")]
        [Property("ScenarioId", "TS-026")]
        [Property("BehaviorId", "BHV-109")]
        [Description(
            "TS-026: source file is older than destination → SourceIsOlder, "
                + "DefaultIncluded=false."
        )]
        public void SetDefaultEligibility_SourceIsOlder_Excludes()
        {
            BookComparisonEntry entry = CopyBooksOrchestrator.SetDefaultEligibility(
                bookNum: 41,
                bookName: "Mark",
                sourceText: "\\id MRK older\r\n",
                destText: "\\id MRK newer\r\n",
                sourceModified: new DateTime(2026, 3, 1, 12, 0, 0),
                destModified: new DateTime(2026, 3, 10, 12, 0, 0)
            );

            Assert.That(entry.ComparisonState, Is.EqualTo(ComparisonState.SourceIsOlder));
            Assert.That(entry.DefaultIncluded, Is.False);
            Assert.That(entry.Selectable, Is.True);
            Assert.That(entry.TooltipInfo, Is.EqualTo(CopyBooksOrchestrator.SourceIsOlderTooltip));
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-006")]
        [Property("ScenarioId", "TS-027")]
        [Property("BehaviorId", "BHV-109")]
        [Description(
            "TS-027: same modification timestamp but different text → Undetermined; "
                + "DefaultIncluded=false (conservative default), tooltip is empty."
        )]
        public void SetDefaultEligibility_Undetermined_ExcludesWithEmptyTooltip()
        {
            DateTime modified = new DateTime(2026, 3, 5, 12, 0, 0);

            BookComparisonEntry entry = CopyBooksOrchestrator.SetDefaultEligibility(
                bookNum: 42,
                bookName: "Luke",
                sourceText: "\\id LUK A\r\n",
                destText: "\\id LUK B\r\n",
                sourceModified: modified,
                destModified: modified
            );

            Assert.That(entry.ComparisonState, Is.EqualTo(ComparisonState.Undetermined));
            Assert.That(
                entry.DefaultIncluded,
                Is.False,
                "Undetermined defaults to exclude (conservative default)"
            );
            Assert.That(entry.Selectable, Is.True);
            Assert.That(entry.TooltipInfo, Is.EqualTo(CopyBooksOrchestrator.UndeterminedTooltip));
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-006")]
        [Property("ScenarioId", "TS-090")]
        [Property("BehaviorId", "BHV-109")]
        [Description(
            "TS-090 (6th state unique to copy): source does not exist → "
                + "SourceDoesNotExist, DefaultIncluded=false AND Selectable=false "
                + "(Section 3.5: checkbox disabled — user cannot include a book "
                + "that has no source text)."
        )]
        public void SetDefaultEligibility_SourceDoesNotExist_ExcludesAndUnselectable()
        {
            BookComparisonEntry entry = CopyBooksOrchestrator.SetDefaultEligibility(
                bookNum: 2,
                bookName: "Exodus",
                sourceText: "",
                destText: "\\id EXO content\r\n",
                sourceModified: DateTime.MinValue,
                destModified: new DateTime(2026, 3, 5, 12, 0, 0)
            );

            Assert.That(entry.ComparisonState, Is.EqualTo(ComparisonState.SourceDoesNotExist));
            Assert.That(entry.DefaultIncluded, Is.False);
            Assert.That(
                entry.Selectable,
                Is.False,
                "SourceDoesNotExist must be unselectable per Section 3.5"
            );
            Assert.That(
                entry.TooltipInfo,
                Is.EqualTo(CopyBooksOrchestrator.SourceDoesNotExistTooltip)
            );
        }

        // =====================================================================
        // gm-006 ACCEPTANCE: all 6 states match Section 3.5 "Business Logic"
        //
        // Single consolidated assertion over the canonical decision table. This
        // is the CAP-006 acceptance-level test; the per-state tests above fix
        // each row in isolation.
        // =====================================================================

        [Test]
        [Category("Acceptance")]
        [Category("GoldenMaster")]
        [Property("CapabilityId", "CAP-006")]
        [Property("ScenarioId", "TS-090")]
        [Property("BehaviorId", "BHV-313")]
        [Property("BehaviorId", "BHV-109")]
        [Property("GoldenMaster", "gm-006")]
        [Property("InvariantId", "INV-011")]
        [Property("InvariantId", "INV-012")]
        [Property("InvariantId", "INV-C06")]
        [Property("InvariantId", "INV-C07")]
        [Description(
            "gm-006 acceptance (with documented exception): the six comparison "
                + "states return the Section 3.5 default-include matrix. gm-006's "
                + "captured PT9 output records FB 29809 (IncludeThisFile=false for "
                + "all states); PT10 restores the parallel-to-import rules per "
                + "TS-090 / INV-011 / INV-012 / INV-C06 / INV-C07."
        )]
        public void SetDefaultEligibility_SixStates_MatchContractRulesNotPt9Bug()
        {
            // Arrange — the canonical decision table from Section 3.5
            var expected = new[]
            {
                (
                    State: ComparisonState.FilesAreSame,
                    Source: "\\id GEN text\r\n",
                    Dest: "\\id GEN text\r\n",
                    SourceMod: new DateTime(2026, 3, 5, 12, 0, 0),
                    DestMod: new DateTime(2026, 3, 5, 12, 0, 0),
                    Include: false,
                    Selectable: true
                ),
                (
                    State: ComparisonState.SourceDoesNotExist,
                    Source: "",
                    Dest: "\\id EXO text\r\n",
                    SourceMod: DateTime.MinValue,
                    DestMod: new DateTime(2026, 3, 5, 12, 0, 0),
                    Include: false,
                    Selectable: false
                ),
                (
                    State: ComparisonState.DestDoesNotExist,
                    Source: "\\id LEV text\r\n",
                    Dest: "",
                    SourceMod: new DateTime(2026, 3, 5, 12, 0, 0),
                    DestMod: DateTime.MinValue,
                    Include: true, // <-- corrected vs gm-006 (PT9 had false here)
                    Selectable: true
                ),
                (
                    State: ComparisonState.SourceIsNewer,
                    Source: "\\id MAT newer\r\n",
                    Dest: "\\id MAT older\r\n",
                    SourceMod: new DateTime(2026, 3, 10, 12, 0, 0),
                    DestMod: new DateTime(2026, 3, 1, 12, 0, 0),
                    Include: true, // <-- corrected vs gm-006 (PT9 had false here)
                    Selectable: true
                ),
                (
                    State: ComparisonState.SourceIsOlder,
                    Source: "\\id MRK older\r\n",
                    Dest: "\\id MRK newer\r\n",
                    SourceMod: new DateTime(2026, 3, 1, 12, 0, 0),
                    DestMod: new DateTime(2026, 3, 10, 12, 0, 0),
                    Include: false,
                    Selectable: true
                ),
                (
                    State: ComparisonState.Undetermined,
                    Source: "\\id LUK A\r\n",
                    Dest: "\\id LUK B\r\n",
                    SourceMod: new DateTime(2026, 3, 5, 12, 0, 0),
                    DestMod: new DateTime(2026, 3, 5, 12, 0, 0),
                    Include: false,
                    Selectable: true
                ),
            };

            // Act + Assert
            int bookNum = 1;
            foreach (var row in expected)
            {
                BookComparisonEntry entry = CopyBooksOrchestrator.SetDefaultEligibility(
                    bookNum: bookNum++,
                    bookName: "TestBook",
                    sourceText: row.Source,
                    destText: row.Dest,
                    sourceModified: row.SourceMod,
                    destModified: row.DestMod
                );

                Assert.That(
                    entry.ComparisonState,
                    Is.EqualTo(row.State),
                    $"Row for {row.State}: state must match"
                );
                Assert.That(
                    entry.DefaultIncluded,
                    Is.EqualTo(row.Include),
                    $"Row for {row.State}: DefaultIncluded must match Section 3.5"
                );
                Assert.That(
                    entry.Selectable,
                    Is.EqualTo(row.Selectable),
                    $"Row for {row.State}: Selectable must match Section 3.5"
                );
            }
        }

        // =====================================================================
        // LoadBooks — comparison pair construction (EXT-007)
        //
        // BHV-313: enumerates Canon.AllBooks, filters by destination-project
        // permission, creates a BookComparisonEntry per eligible book.
        // =====================================================================

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-006")]
        [Property("BehaviorId", "BHV-313")]
        [Property("BehaviorId", "BHV-103")]
        [Description(
            "Both projects empty: LoadBooks enumerates Canon.AllBooks and returns "
                + "one entry per eligible book (SourceDoesNotExist AND DestDoesNotExist "
                + "→ SourceDoesNotExist per Section 3.5 decision order). Result list "
                + "is non-empty because the administrator has create permission."
        )]
        public void LoadBooks_BothProjectsEmpty_ReturnsEntriesInCanonicalOrder()
        {
            List<BookComparisonEntry> entries = CopyBooksOrchestrator.LoadBooks(
                _fromScrText,
                _toScrText
            );

            Assert.That(entries, Is.Not.Null);
            // Per BHV-313, even an empty project produces entries for books the
            // dest-project admin could create. The exact count depends on
            // permission logic; asserting > 0 is the minimal enforceable claim.
            Assert.That(entries, Is.Not.Empty);
            // Ordering invariant: canonical book numbers are ascending.
            int previousBookNum = 0;
            foreach (var entry in entries)
            {
                Assert.That(
                    entry.BookNum,
                    Is.GreaterThan(previousBookNum),
                    "LoadBooks must return entries in canonical (ascending bookNum) order"
                );
                previousBookNum = entry.BookNum;
            }
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-006")]
        [Property("ScenarioId", "TS-090")]
        [Property("BehaviorId", "BHV-313")]
        [Description(
            "Source has GEN, dest has nothing → GEN entry is DestDoesNotExist "
                + "with DefaultIncluded=true (INV-C07)."
        )]
        public void LoadBooks_SourceHasBookDestDoesNot_ProducesDestDoesNotExistEntry()
        {
            _fromScrText.PutText(1, 0, false, "\\id GEN source content\r\n", null);

            List<BookComparisonEntry> entries = CopyBooksOrchestrator.LoadBooks(
                _fromScrText,
                _toScrText
            );

            BookComparisonEntry? gen = entries.FirstOrDefault(e => e.BookNum == 1);
            Assert.That(gen, Is.Not.Null, "LoadBooks must include GEN (1) in the entries");
            Assert.That(gen!.ComparisonState, Is.EqualTo(ComparisonState.DestDoesNotExist));
            Assert.That(
                gen.DefaultIncluded,
                Is.True,
                "INV-C07: DestDoesNotExist → DefaultIncluded=true"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-006")]
        [Property("ScenarioId", "TS-090")]
        [Property("BehaviorId", "BHV-313")]
        [Description(
            "Dest has EXO, source does not → EXO entry is SourceDoesNotExist "
                + "with Selectable=false (user cannot include a book with no source)."
        )]
        public void LoadBooks_DestHasBookSourceDoesNot_ProducesSourceDoesNotExistEntry()
        {
            _toScrText.PutText(2, 0, false, "\\id EXO dest content\r\n", null);

            List<BookComparisonEntry> entries = CopyBooksOrchestrator.LoadBooks(
                _fromScrText,
                _toScrText
            );

            BookComparisonEntry? exo = entries.FirstOrDefault(e => e.BookNum == 2);
            Assert.That(exo, Is.Not.Null, "LoadBooks must include EXO (2) in the entries");
            Assert.That(exo!.ComparisonState, Is.EqualTo(ComparisonState.SourceDoesNotExist));
            Assert.That(exo.DefaultIncluded, Is.False);
            Assert.That(exo.Selectable, Is.False);
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-006")]
        [Property("ScenarioId", "TS-024")]
        [Property("BehaviorId", "BHV-313")]
        [Property("InvariantId", "INV-C06")]
        [Description(
            "Source and dest both have the same GEN text → GEN entry is "
                + "FilesAreSame with DefaultIncluded=false (INV-C06)."
        )]
        public void LoadBooks_BothHaveIdenticalText_ProducesFilesAreSameEntry()
        {
            const string text = "\\id GEN shared content\r\n";
            _fromScrText.PutText(1, 0, false, text, null);
            _toScrText.PutText(1, 0, false, text, null);

            List<BookComparisonEntry> entries = CopyBooksOrchestrator.LoadBooks(
                _fromScrText,
                _toScrText
            );

            BookComparisonEntry? gen = entries.FirstOrDefault(e => e.BookNum == 1);
            Assert.That(gen, Is.Not.Null);
            Assert.That(gen!.ComparisonState, Is.EqualTo(ComparisonState.FilesAreSame));
            Assert.That(
                gen.DefaultIncluded,
                Is.False,
                "INV-C06: FilesAreSame → DefaultIncluded=false"
            );
        }

        [Test]
        [Category("Contract")]
        [Property("CapabilityId", "CAP-006")]
        [Property("BehaviorId", "BHV-313")]
        [Description(
            "Every entry has a non-empty BookName so the UI can render it. "
                + "The exact localization is not pinned (English id is acceptable)."
        )]
        public void LoadBooks_EveryEntryHasNonEmptyBookName()
        {
            _fromScrText.PutText(1, 0, false, "\\id GEN content\r\n", null);

            List<BookComparisonEntry> entries = CopyBooksOrchestrator.LoadBooks(
                _fromScrText,
                _toScrText
            );

            Assert.That(entries, Is.Not.Empty);
            foreach (var entry in entries)
            {
                Assert.That(
                    entry.BookName,
                    Is.Not.Null.And.Not.Empty,
                    $"Entry for book {entry.BookNum} must have a non-empty BookName"
                );
            }
        }
    }
}
