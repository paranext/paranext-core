using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading;
using Paranext.DataProvider.Checklists;
using Paranext.DataProvider.Checklists.Markers;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using SIL.Scripture;
using ScriptureRange = Paranext.DataProvider.Checklists.ScriptureRange;

namespace TestParanextDataProvider.Checklists;

/// <summary>
/// RED-phase contract and outer-acceptance tests for CAP-006
/// (<c>ChecklistService.BuildChecklistData</c> — end-to-end orchestration).
///
/// <para>
/// These tests will NOT compile until the implementer adds
/// <c>Paranext.DataProvider.Checklists.ChecklistService.BuildChecklistData(
/// ChecklistRequest, LocalParatextProjects, CancellationToken)</c>. The
/// compile error is the first layer of the RED signal; the test assertion
/// failures (after a stub body lands) are the second. Matches the
/// CAP-003 / CAP-004 / CAP-005 RED precedents.
/// </para>
///
/// <para>
/// Per strategic-plan-backend.md §CAP-006, this capability uses
/// <b>Outside-In TDD</b>: the outer golden-master replays (gm-001,
/// gm-004) drive pipeline composition; focused unit tests pin
/// the specific invariants (INV-002, INV-010, INV-012, VAL-003,
/// VAL-004, INV-C15) and the edge-case scenarios (TS-053, TS-054,
/// TS-062, TS-070).
/// </para>
///
/// <para>
/// <b>Scope note — gm-014 / gm-019 not replayed here.</b> Those golden
/// masters were captured with <c>checklistType=Verses</c> (see their
/// respective <c>input.json</c>), but per data-contracts.md §4.1
/// "Checklist type is implicitly 'Markers' for this feature" CAP-006 only
/// implements the Markers path. TS-068 (duplicate verses) stays covered
/// through CAP-005's row-alignment unit tests.
/// </para>
///
/// <para>
/// <b>Scope note — EditLinkItem.</b> CAP-012 owns the inline edit-link
/// gate. These CAP-006 tests therefore do NOT assert on the presence or
/// absence of <see cref="EditLinkItem"/> content items. They assert only
/// on the outer shape (<see cref="ChecklistResult.Rows"/>,
/// <see cref="ChecklistRow.Cells"/>, <see cref="ChecklistRow.IsMatch"/>,
/// <see cref="ChecklistResult.ExcludedCount"/>,
/// <see cref="ChecklistResult.Truncated"/>,
/// <see cref="ChecklistResult.ColumnHeaders"/>,
/// <see cref="ChecklistResult.ColumnProjectIds"/>,
/// <see cref="ChecklistResult.EmptyResultMessage"/>).
/// </para>
///
/// <para>
/// <b>Signature note.</b> data-contracts.md §4.1 and strategic-plan-backend.md
/// differ on the method signature: the former lists
/// <c>Task&lt;ChecklistResult&gt; BuildChecklistDataAsync(ChecklistRequest,
/// CancellationToken)</c>; the latter lists the more-specific
/// <c>ChecklistResult BuildChecklistData(ChecklistRequest,
/// LocalParatextProjects, CancellationToken)</c>. These tests follow the
/// strategic-plan signature; if GREEN adopts the async shape, the tests
/// will be touched up to <c>await</c> the result. The compile-fail RED
/// signal is robust to either choice.
/// </para>
///
/// Traceability:
///   - Capability: CAP-006
///   - Behaviors: BHV-100 (factory — transitive), BHV-101 (main),
///     BHV-118 (First/Last VerseRef — transitive), BHV-121
///     (HasSameParagraphStructure — transitive)
///   - Extractions: EXT-001 (CreateDataSource), EXT-002 (BuildChecklistData),
///     EXT-015 (GetChecklistData wrapper with maxRows)
///   - Invariants: INV-002 (single-column IsMatch=true), INV-010
///     (hideMatches tracking), INV-012 (max rows 5000),
///     VAL-003 (start 1:1 -> 1:0), VAL-004 (unknown ChecklistType),
///     INV-C15 (ColumnProjectIds parallel to ColumnHeaders)
///   - Scenarios: TS-001, TS-004, TS-005, TS-006, TS-049, TS-053, TS-054,
///     TS-062, TS-070, and (related / emergent) TS-002, TS-003, TS-032, TS-033
///   - Golden Masters: gm-001 (primary outer acceptance), gm-004 (secondary)
///   - Contract: data-contracts.md §4.1 (BuildChecklistData),
///     §3.1 (ChecklistResult), §3.2 (ChecklistRow), §3.3 (ChecklistCell)
///   - PT9 source: Paratext/Checklists/CLDataSource.cs:97-185 (BuildRows)
/// </summary>
[TestFixture]
internal class ChecklistServiceBuildChecklistDataTests : PapiTestBase
{
    // ---------------------------------------------------------------------
    // Shared helpers — reuse DummyScrText + LocalParatextProjects pattern
    // ---------------------------------------------------------------------

    /// <summary>
    /// The canonical EXO USFM captured in gm-001's <c>input-EXO.usfm</c>.
    /// Single project, two verses, three paragraph markers (\p, \q, \q2).
    /// </summary>
    private const string Gm001ExoUsfm =
        @"\id EXO \c 20 \p \v 1 one. \v 2 two, \q poetry \q2 indented poetry";

    /// <summary>gm-004's text1 EXO USFM (matches text1 captured input).</summary>
    private const string Gm004Text1ExoUsfm =
        @"\id EXO \c 20 \p \v 1 one. \v 2 two, \q poetry \q2 indented poetry \p \v 3 three";

    /// <summary>gm-004's text2 EXO USFM (matches text2 captured input).</summary>
    private const string Gm004Text2ExoUsfm =
        @"\id EXO \c 20 \p \v 1 uno. \v 2 dos, \p more text \q prose \q2 \v 3 indented prose";

    /// <summary>
    /// Registers a <see cref="DummyScrText"/> as a discoverable project so
    /// <see cref="LocalParatextProjects.GetParatextProject"/> resolves its
    /// HexId. Mirrors the pattern used across the existing Projects tests
    /// (see <c>c-sharp-tests/Projects/ParatextDataProviderTests.cs:24</c>).
    /// </summary>
    private DummyScrText RegisterDummyProject(string usfmPerBook, int bookNum = 2)
    {
        var scrText = new DummyScrText();
        // gm-001 / gm-004 use the poetry-style paragraph markers (\q, \q1, \q2)
        // which DummyScrStylesheet defines only as scCharacterStyle. We must
        // upgrade them to scParagraphStyle via reflection — same approach as
        // CAP-003's ChecklistServiceTokenExtractionTests.PoetryStylesheet.
        UpgradePoetryMarkersToParagraphStyle(scrText);

        scrText.PutText(bookNum, 0, false, usfmPerBook, null);
        ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);
        return scrText;
    }

    /// <summary>
    /// Replaces the existing character-style <c>q / q1 / q2 / b</c> tags on
    /// the DummyScrStylesheet with paragraph-style tags. gm-001 / gm-004 use
    /// these as paragraph markers. Mirrors the approach in CAP-003's test
    /// file; this helper additionally <i>replaces</i> the existing tag so the
    /// stylesheet's <c>scCharacterStyle</c> entry (from DummyScrStylesheet)
    /// is overridden.
    /// </summary>
    private static void UpgradePoetryMarkersToParagraphStyle(DummyScrText scrText)
    {
        // DummyScrStylesheet defines \v with a huge OccursUnder including
        // q/q1/q2 as allowable parents of \v — so we just need to ADD
        // paragraph-style tags for the Markers checklist's ParagraphMarkers
        // query (BHV-102: scParagraphStyle filter).
        var stylesheet = scrText.DefaultStylesheet;

        foreach (var marker in new[] { "q", "q1", "q2", "b" })
        {
            AddPoetryTag(stylesheet, marker);
        }
    }

    private static void AddPoetryTag(ScrStylesheet stylesheet, string marker)
    {
        var tag = new ScrTag
        {
            Marker = marker,
            TextProperties =
                TextProperties.scParagraph
                | TextProperties.scPublishable
                | TextProperties.scVernacular
                | TextProperties.scPoetic,
            TextType = ScrTextType.scVerseText,
            StyleType = ScrStyleType.scParagraphStyle,
            OccursUnder = "c",
        };

        var addTagInternal = typeof(ScrStylesheet).GetMethod(
            "AddTagInternal",
            BindingFlags.Instance | BindingFlags.NonPublic
        );
        if (addTagInternal == null)
        {
            throw new InvalidOperationException(
                "ScrStylesheet.AddTagInternal not found via reflection; "
                    + "API has changed and this test helper must be updated."
            );
        }
        addTagInternal.Invoke(stylesheet, new object[] { tag });
    }

    /// <summary>
    /// Builds a default request for a single-project Markers checklist over
    /// EXO 20:1..EXO 20:20. Callers override individual fields via
    /// <c>with</c>-expressions.
    /// </summary>
    private static ChecklistRequest BuildRequest(
        string activeProjectId,
        IReadOnlyList<string>? comparativeTextIds = null,
        ScriptureRange? verseRange = null,
        bool hideMatches = false,
        bool showVerseText = false,
        IReadOnlyList<int>? bookNumbers = null,
        string equivalentMarkers = "",
        string markerFilter = ""
    )
    {
        verseRange ??= new ScriptureRange(
            new VerseRef("EXO", "20", "1", ScrVers.English),
            new VerseRef("EXO", "20", "20", ScrVers.English)
        );

        return new ChecklistRequest(
            ProjectId: activeProjectId,
            ComparativeTextIds: comparativeTextIds ?? Array.Empty<string>(),
            MarkerSettings: new MarkerSettings(equivalentMarkers, markerFilter),
            VerseRange: verseRange,
            HideMatches: hideMatches,
            ShowVerseText: showVerseText,
            BookNumbers: bookNumbers
        );
    }

    // =====================================================================
    // Group A — Happy path & single column (TS-001, TS-005, INV-002)
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("Contract", "BuildChecklistData")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-101")]
    public void BuildChecklistData_SingleProjectMarkers_ReturnsRowsWithMarkerParagraphs()
    {
        // TS-001: Single ScrText with EXO containing \p, \q, \q2 produces rows
        // whose cells carry paragraphs with those markers.
        var scrText = RegisterDummyProject(Gm001ExoUsfm);
        var request = BuildRequest(
            activeProjectId: scrText.Guid.ToString(),
            bookNumbers: new[] { 2 }
        );

        ChecklistResult result = ChecklistService.BuildChecklistData(
            request,
            ParatextProjects,
            CancellationToken.None
        );

        Assert.That(result, Is.Not.Null);
        Assert.That(result.Rows, Is.Not.Null);
        Assert.That(result.Rows, Is.Not.Empty, "at least one row expected for \\p + \\q + \\q2");

        // Collect every paragraph marker across every cell of every row.
        var markers = result
            .Rows.SelectMany(r => r.Cells)
            .SelectMany(c => c.Paragraphs)
            .Select(p => p.Marker)
            .ToList();

        Assert.That(markers, Does.Contain("p"), "\\p paragraph marker must appear");
        Assert.That(markers, Does.Contain("q"), "\\q paragraph marker must appear");
        Assert.That(markers, Does.Contain("q2"), "\\q2 paragraph marker must appear");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("Contract", "BuildChecklistData")]
    [Property("ScenarioId", "TS-005")]
    [Property("BehaviorId", "BHV-101")]
    [Property("Invariant", "INV-002")]
    public void BuildChecklistData_SingleColumn_AllRowsIsMatch_True()
    {
        // TS-005 / INV-002: Single-column checklists mark every row IsMatch=true
        // (no difference highlighting is meaningful with only one column).
        var scrText = RegisterDummyProject(Gm001ExoUsfm);
        var request = BuildRequest(
            activeProjectId: scrText.Guid.ToString(),
            bookNumbers: new[] { 2 }
        );

        ChecklistResult result = ChecklistService.BuildChecklistData(
            request,
            ParatextProjects,
            CancellationToken.None
        );

        Assume.That(result.Rows, Is.Not.Empty, "precondition — rows produced");
        foreach (var row in result.Rows)
        {
            Assert.That(
                row.IsMatch,
                Is.True,
                $"INV-002 — single-column row must be IsMatch=true (row FirstRef={row.FirstRef})"
            );
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("Contract", "BuildChecklistData")]
    [Property("BehaviorId", "BHV-101")]
    [Property("Invariant", "INV-010")]
    public void BuildChecklistData_SingleColumn_ExcludedCountIsZero()
    {
        // INV-010 edge: single-column checklists never hide anything, so
        // ExcludedCount must be 0 regardless of the hideMatches flag.
        var scrText = RegisterDummyProject(Gm001ExoUsfm);
        var request = BuildRequest(
            activeProjectId: scrText.Guid.ToString(),
            hideMatches: true,
            bookNumbers: new[] { 2 }
        );

        ChecklistResult result = ChecklistService.BuildChecklistData(
            request,
            ParatextProjects,
            CancellationToken.None
        );

        Assert.That(
            result.ExcludedCount,
            Is.EqualTo(0),
            "single-column checklist has nothing to hide; ExcludedCount stays 0"
        );
    }

    // =====================================================================
    // Group B — HideMatches filter (TS-004, INV-010)
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("Contract", "BuildChecklistData")]
    [Property("ScenarioId", "TS-004")]
    [Property("BehaviorId", "BHV-101")]
    [Property("Invariant", "INV-010")]
    public void BuildChecklistData_TwoColumnsHideMatches_RemovesMatchingRows()
    {
        // TS-004 / INV-010: With one matching verse (v1 \p in both) and two
        // non-matching verses (v2 + v3 — per gm-004 capture), hideMatches=true
        // yields only the 2 non-matching rows with ExcludedCount=1.
        var active = RegisterDummyProject(Gm004Text1ExoUsfm);
        var compare = RegisterDummyProject(Gm004Text2ExoUsfm);
        var request = BuildRequest(
            activeProjectId: active.Guid.ToString(),
            comparativeTextIds: new[] { compare.Guid.ToString() },
            hideMatches: true,
            bookNumbers: new[] { 2 }
        );

        ChecklistResult result = ChecklistService.BuildChecklistData(
            request,
            ParatextProjects,
            CancellationToken.None
        );

        Assert.That(
            result.Rows.Count,
            Is.EqualTo(2),
            "two non-matching rows expected after hideMatches filtering"
        );
        Assert.That(
            result.ExcludedCount,
            Is.EqualTo(1),
            "one matching row removed -> ExcludedCount=1 (INV-010)"
        );
        foreach (var row in result.Rows)
        {
            Assert.That(
                row.IsMatch,
                Is.False,
                "every remaining row must be non-matching after hideMatches"
            );
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("Contract", "BuildChecklistData")]
    [Property("ScenarioId", "TS-004")]
    [Property("BehaviorId", "BHV-101")]
    [Property("Invariant", "INV-010")]
    public void BuildChecklistData_HideMatchesFalse_RetainsAllRows()
    {
        // TS-004 inverse: hideMatches=false keeps all rows (including matches)
        // and ExcludedCount stays 0.
        var active = RegisterDummyProject(Gm004Text1ExoUsfm);
        var compare = RegisterDummyProject(Gm004Text2ExoUsfm);
        var request = BuildRequest(
            activeProjectId: active.Guid.ToString(),
            comparativeTextIds: new[] { compare.Guid.ToString() },
            hideMatches: false,
            bookNumbers: new[] { 2 }
        );

        ChecklistResult result = ChecklistService.BuildChecklistData(
            request,
            ParatextProjects,
            CancellationToken.None
        );

        Assert.That(
            result.Rows.Count,
            Is.GreaterThanOrEqualTo(3),
            "all rows retained -> at least the 3 captured rows (1 match + 2 non-match)"
        );
        Assert.That(
            result.ExcludedCount,
            Is.EqualTo(0),
            "nothing hidden when hideMatches=false -> ExcludedCount=0"
        );
    }

    // =====================================================================
    // Group C — Verse-range start adjustment (TS-006, VAL-003)
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("Contract", "BuildChecklistData")]
    [Property("ScenarioId", "TS-006")]
    [Property("BehaviorId", "BHV-101")]
    [Property("ValidationRule", "VAL-003")]
    public void BuildChecklistData_VerseRangeStartAtChapter1Verse1_AdjustsToVerse0()
    {
        // VAL-003: When request.VerseRange.start == (GEN 1:1), it is silently
        // adjusted to (GEN 1:0) so introductory material (\ip at verse 0) is
        // included. We seed \ip at position before \v 1 and assert it comes
        // through in the result.
        const string usfm = @"\id GEN \c 1 \ip An introduction. \p \v 1 In the beginning.";
        var scrText = RegisterDummyProject(usfm, bookNum: 1);

        var request = BuildRequest(
            activeProjectId: scrText.Guid.ToString(),
            verseRange: new ScriptureRange(
                new VerseRef("GEN", "1", "1", ScrVers.English),
                new VerseRef("GEN", "1", "20", ScrVers.English)
            ),
            bookNumbers: new[] { 1 }
        );

        ChecklistResult result = ChecklistService.BuildChecklistData(
            request,
            ParatextProjects,
            CancellationToken.None
        );

        var markers = result
            .Rows.SelectMany(r => r.Cells)
            .SelectMany(c => c.Paragraphs)
            .Select(p => p.Marker)
            .ToList();
        Assert.That(
            markers,
            Does.Contain("ip"),
            "VAL-003 — start ref 1:1 must be adjusted to 1:0 so \\ip at verse 0 is included"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("Contract", "BuildChecklistData")]
    [Property("BehaviorId", "BHV-101")]
    [Property("ValidationRule", "VAL-003")]
    public void BuildChecklistData_VerseRangeStartAtChapter1Verse2_DoesNotAdjust()
    {
        // VAL-003 inverse boundary: starts other than 1:1 are NOT adjusted.
        // When start=1:2, any \ip at verse 0 must be excluded.
        const string usfm =
            @"\id GEN \c 1 \ip An introduction. \p \v 1 In the beginning. \v 2 continuing.";
        var scrText = RegisterDummyProject(usfm, bookNum: 1);

        var request = BuildRequest(
            activeProjectId: scrText.Guid.ToString(),
            verseRange: new ScriptureRange(
                new VerseRef("GEN", "1", "2", ScrVers.English),
                new VerseRef("GEN", "1", "20", ScrVers.English)
            ),
            bookNumbers: new[] { 1 }
        );

        ChecklistResult result = ChecklistService.BuildChecklistData(
            request,
            ParatextProjects,
            CancellationToken.None
        );

        var markers = result
            .Rows.SelectMany(r => r.Cells)
            .SelectMany(c => c.Paragraphs)
            .Select(p => p.Marker)
            .ToList();
        Assert.That(
            markers,
            Does.Not.Contain("ip"),
            "VAL-003 is 1:1-specific — start=1:2 must not pull in the \\ip at verse 0"
        );
    }

    // =====================================================================
    // Group D — Max rows truncation (TS-049, INV-012)
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("Contract", "BuildChecklistData")]
    [Property("BehaviorId", "BHV-101")]
    [Property("Invariant", "INV-012")]
    public void BuildChecklistData_ResultUnder5000Rows_TruncatedFalse()
    {
        // INV-012 negative direction: a small result (well under 5000) must
        // have Truncated=false.
        var scrText = RegisterDummyProject(Gm001ExoUsfm);
        var request = BuildRequest(
            activeProjectId: scrText.Guid.ToString(),
            bookNumbers: new[] { 2 }
        );

        ChecklistResult result = ChecklistService.BuildChecklistData(
            request,
            ParatextProjects,
            CancellationToken.None
        );

        Assert.That(
            result.Truncated,
            Is.False,
            "small result (<5000 rows) must not be marked Truncated"
        );
        Assert.That(
            result.Rows.Count,
            Is.LessThanOrEqualTo(5000),
            "INV-012 upper bound — row count must never exceed 5000"
        );
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-006")]
    [Property("Contract", "BuildChecklistData")]
    [Property("ScenarioId", "TS-049")]
    [Property("BehaviorId", "BHV-101")]
    [Property("Invariant", "INV-012")]
    public void BuildChecklistData_ResultExceeds5000Rows_TruncatedFlagSet()
    {
        // INV-012 positive direction: if the pipeline would produce >5000
        // rows, the result must be truncated at 5000 and Truncated=true.
        //
        // Seed the project with enough \p paragraphs to cross the threshold.
        // Strategy: many chapters, many verses-per-chapter with \p per verse.
        // We target ~5500 paragraphs in a single book across many chapters.
        var usfm = new System.Text.StringBuilder(@"\id GEN");
        // 110 chapters * 50 paragraphs/chapter = 5500 paragraphs
        for (int chapter = 1; chapter <= 110; chapter++)
        {
            usfm.Append($" \\c {chapter}");
            for (int verse = 1; verse <= 50; verse++)
            {
                usfm.Append($" \\p \\v {verse} content.");
            }
        }

        var scrText = RegisterDummyProject(usfm.ToString(), bookNum: 1);
        var request = BuildRequest(
            activeProjectId: scrText.Guid.ToString(),
            verseRange: new ScriptureRange(
                new VerseRef("GEN", "1", "1", ScrVers.English),
                new VerseRef("GEN", "110", "50", ScrVers.English)
            ),
            bookNumbers: new[] { 1 }
        );

        ChecklistResult result = ChecklistService.BuildChecklistData(
            request,
            ParatextProjects,
            CancellationToken.None
        );

        Assert.That(
            result.Truncated,
            Is.True,
            "INV-012 — producing >5000 rows must set Truncated=true"
        );
        Assert.That(
            result.Rows.Count,
            Is.EqualTo(5000),
            "INV-012 — truncated result must have exactly 5000 rows"
        );
    }

    // =====================================================================
    // Group E — CancellationToken (TS-062)
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("Contract", "BuildChecklistData")]
    [Property("ScenarioId", "TS-062")]
    [Property("BehaviorId", "BHV-101")]
    public void BuildChecklistData_CancellationRequested_Throws()
    {
        // TS-062: PT10 replaces PT9's Progress.Mgr.EndProgressIfCancelled with
        // CancellationToken. A cancelled token passed to BuildChecklistData
        // must surface via OperationCanceledException (standard .NET pattern
        // for ct.ThrowIfCancellationRequested / ct.IsCancellationRequested).
        //
        // NOTE: GREEN may instead choose to return a structured error result
        // (ChecklistResultError with code "CANCELLED" per data-contracts.md
        // §4.1 error table). In that case this test will be adjusted to
        // match the chosen contract — RED compile-fail is robust to either.
        var scrText = RegisterDummyProject(Gm001ExoUsfm);
        var request = BuildRequest(
            activeProjectId: scrText.Guid.ToString(),
            bookNumbers: new[] { 2 }
        );

        using var cts = new CancellationTokenSource();
        cts.Cancel();

        Assert.That(
            () => ChecklistService.BuildChecklistData(request, ParatextProjects, cts.Token),
            Throws.InstanceOf<OperationCanceledException>(),
            "TS-062 — cancelled token must surface as OperationCanceledException"
        );
    }

    // =====================================================================
    // Group F — Factory & unknown checklist type (TS-053, TS-054, BHV-100, VAL-004)
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("Contract", "BuildChecklistData")]
    [Property("ScenarioId", "TS-053")]
    [Property("BehaviorId", "BHV-100")]
    public void BuildChecklistData_ChecklistTypeMarkers_ComposesMarkersPipeline()
    {
        // TS-053: the Markers pipeline is composed under the hood. Indirect
        // observation via BHV-103 — MarkersDataSource.PostProcessParagraph
        // prepends a backslash-prefixed marker TextItem at position 0 of
        // every paragraph's Items (INV-004). If the service did NOT route
        // through MarkersDataSource, the first item of each paragraph would
        // not be a TextItem with text "\p" / "\q" / "\q2".
        var scrText = RegisterDummyProject(Gm001ExoUsfm);
        var request = BuildRequest(
            activeProjectId: scrText.Guid.ToString(),
            showVerseText: true,
            bookNumbers: new[] { 2 }
        );

        ChecklistResult result = ChecklistService.BuildChecklistData(
            request,
            ParatextProjects,
            CancellationToken.None
        );

        Assume.That(result.Rows, Is.Not.Empty, "precondition — rows produced");
        foreach (var row in result.Rows)
        foreach (var cell in row.Cells)
        foreach (var paragraph in cell.Paragraphs)
        {
            Assume.That(
                paragraph.Items,
                Is.Not.Empty,
                $"precondition — paragraph {paragraph.Marker} has items"
            );
            var first = paragraph.Items[0];
            Assert.That(
                first,
                Is.InstanceOf<TextItem>(),
                "BHV-103 / INV-004 — first item must be TextItem carrying backslash-prefixed marker"
            );
            var firstText = (TextItem)first;
            Assert.That(
                firstText.Text,
                Is.EqualTo("\\" + paragraph.Marker),
                $"BHV-103 / INV-004 — first TextItem.Text must equal \\{paragraph.Marker}"
            );
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("Contract", "BuildChecklistData")]
    [Property("ScenarioId", "TS-054")]
    [Property("BehaviorId", "BHV-100")]
    [Property("ValidationRule", "VAL-004")]
    [Ignore(
        "VAL-004 tracks invalid ChecklistType handling. ChecklistRequest (data-contracts §2.1) has no ChecklistType field — the current API is implicitly Markers-only. Kept as a placeholder so traceability matrix records VAL-004; remove Ignore if GREEN exposes a ChecklistType surface that can be stress-tested."
    )]
    public void BuildChecklistData_UnknownChecklistType_ThrowsInvalidOperationException()
    {
        // VAL-004 placeholder. See [Ignore] rationale above.
        Assert.Fail("placeholder — see [Ignore] rationale");
    }

    // =====================================================================
    // Group G — Empty / edge inputs (TS-070)
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("Contract", "BuildChecklistData")]
    [Property("ScenarioId", "TS-070")]
    [Property("BehaviorId", "BHV-101")]
    public void BuildChecklistData_ProjectIdNotRegistered_SurfacesResolutionError()
    {
        // TS-070 analog: unresolvable projectId. The strategic plan
        // documents PROJECT_NOT_FOUND as a structured error code, but the
        // PT10 resolver (ScrTextCollection.GetById) throws on unknown IDs.
        // Either the service catches and wraps (structured error) OR the
        // exception bubbles out. We assert that the thrown exception is
        // NOT a NotImplementedException (which would mean the implementation
        // hasn't landed yet — we reject that false-green path), AND is not
        // null (something must indicate the error).
        //
        // GREEN note: if the implementer wraps the resolver exception into a
        // structured result (ChecklistResultError with code "PROJECT_NOT_FOUND"),
        // this test will be adjusted to inspect the structured error instead
        // of asserting Throws.
        var request = BuildRequest(
            activeProjectId: "0123456789abcdef0123456789abcdef01234567", // not registered
            bookNumbers: new[] { 2 }
        );

        Exception? caught = null;
        try
        {
            ChecklistService.BuildChecklistData(request, ParatextProjects, CancellationToken.None);
        }
        catch (Exception ex)
        {
            caught = ex;
        }

        Assert.That(
            caught,
            Is.Not.Null,
            "TS-070 / PROJECT_NOT_FOUND — unresolvable projectId must surface as an error"
        );
        Assert.That(
            caught,
            Is.Not.InstanceOf<NotImplementedException>(),
            "TS-070 — NotImplementedException is a RED-stub artifact, not the expected resolution error. "
                + "GREEN implementer must actively reject unknown projectIds (either throw a PT9-style "
                + "resolver exception or return a structured PROJECT_NOT_FOUND error)."
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("Contract", "BuildChecklistData")]
    [Property("BehaviorId", "BHV-101")]
    [Property("Invariant", "INV-008")]
    public void BuildChecklistData_EmptyBookNumbersList_ProducesEmptyResultWithMessage()
    {
        // Edge: BookNumbers=[] — no books processed, so no rows. INV-008
        // requires an EmptyResultMessage in that case.
        var scrText = RegisterDummyProject(Gm001ExoUsfm);
        var request = BuildRequest(
            activeProjectId: scrText.Guid.ToString(),
            bookNumbers: Array.Empty<int>()
        );

        ChecklistResult result = ChecklistService.BuildChecklistData(
            request,
            ParatextProjects,
            CancellationToken.None
        );

        Assert.That(result.Rows, Is.Empty, "empty book list -> no rows");
        Assert.That(
            result.EmptyResultMessage,
            Is.Not.Null,
            "INV-008 — empty results must carry an EmptyResultMessage"
        );
    }

    // =====================================================================
    // Group H — INV-C15 ColumnProjectIds parallel to ColumnHeaders
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("Contract", "BuildChecklistData")]
    [Property("BehaviorId", "BHV-101")]
    [Property("Invariant", "INV-C15")]
    public void BuildChecklistData_SingleProject_ColumnProjectIdsContainsOnlyRequestProjectId()
    {
        // INV-C15: With one active project, ColumnHeaders and ColumnProjectIds
        // both have exactly one entry, and ColumnProjectIds[0] equals the
        // request's ProjectId.
        var scrText = RegisterDummyProject(Gm001ExoUsfm);
        var request = BuildRequest(
            activeProjectId: scrText.Guid.ToString(),
            bookNumbers: new[] { 2 }
        );

        ChecklistResult result = ChecklistService.BuildChecklistData(
            request,
            ParatextProjects,
            CancellationToken.None
        );

        Assert.That(
            result.ColumnHeaders.Count,
            Is.EqualTo(1),
            "single project -> one column header"
        );
        Assert.That(
            result.ColumnProjectIds.Count,
            Is.EqualTo(result.ColumnHeaders.Count),
            "INV-C15 — ColumnProjectIds.Count must equal ColumnHeaders.Count"
        );
        Assert.That(
            result.ColumnProjectIds[0],
            Is.EqualTo(request.ProjectId),
            "INV-C15 — ColumnProjectIds[0] must equal request.ProjectId"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-006")]
    [Property("Contract", "BuildChecklistData")]
    [Property("BehaviorId", "BHV-101")]
    [Property("Invariant", "INV-C15")]
    public void BuildChecklistData_ActiveProjectPlusComparative_ColumnProjectIdsOrderMatches()
    {
        // INV-C15 with 2 columns: active project at index 0, comparative at
        // index 1 in request order.
        var active = RegisterDummyProject(Gm004Text1ExoUsfm);
        var compare = RegisterDummyProject(Gm004Text2ExoUsfm);
        var request = BuildRequest(
            activeProjectId: active.Guid.ToString(),
            comparativeTextIds: new[] { compare.Guid.ToString() },
            bookNumbers: new[] { 2 }
        );

        ChecklistResult result = ChecklistService.BuildChecklistData(
            request,
            ParatextProjects,
            CancellationToken.None
        );

        Assert.That(
            result.ColumnHeaders.Count,
            Is.EqualTo(2),
            "active + 1 comparative -> 2 column headers"
        );
        Assert.That(
            result.ColumnProjectIds.Count,
            Is.EqualTo(result.ColumnHeaders.Count),
            "INV-C15 — ColumnProjectIds.Count must equal ColumnHeaders.Count"
        );
        Assert.That(
            result.ColumnProjectIds[0],
            Is.EqualTo(active.Guid.ToString()),
            "INV-C15 — active project must be at index 0"
        );
        Assert.That(
            result.ColumnProjectIds[1],
            Is.EqualTo(compare.Guid.ToString()),
            "INV-C15 — comparative must follow the active project in request order"
        );
    }

    // =====================================================================
    // Group I — Outer acceptance gm-001 replay (primary TDD signal)
    // =====================================================================

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-006")]
    [Property("Contract", "BuildChecklistData")]
    [Property("ScenarioId", "TS-001")]
    [Property("GoldenMaster", "gm-001")]
    [Property("BehaviorId", "BHV-101")]
    public void Gm001_SingleProjectMarkers_Replay_MatchesShape()
    {
        // gm-001 primary outer acceptance: single project, EXO 20:1..20:20,
        // showVerseText=true, hideMatches=true (but single column so no-op),
        // expected rowCount=2, excludedCount=0. Row 0 = EXO 20:1 cell with
        // one paragraph marker="p". Row 1 = EXO 20:2 cell with two paragraphs
        // marker="q" then marker="q2".
        var scrText = RegisterDummyProject(Gm001ExoUsfm);
        var request = BuildRequest(
            activeProjectId: scrText.Guid.ToString(),
            hideMatches: true,
            showVerseText: true,
            bookNumbers: new[] { 2 }
        );

        ChecklistResult result = ChecklistService.BuildChecklistData(
            request,
            ParatextProjects,
            CancellationToken.None
        );

        Assert.That(result.Rows.Count, Is.EqualTo(2), "gm-001 — exactly 2 rows");
        Assert.That(result.ExcludedCount, Is.EqualTo(0), "gm-001 — ExcludedCount=0");

        // Row 0: one cell, one paragraph marker "p".
        var row0 = result.Rows[0];
        Assert.That(row0.Cells.Count, Is.EqualTo(1), "gm-001 row 0 — single cell (one column)");
        Assert.That(
            row0.Cells[0].Paragraphs.Count,
            Is.EqualTo(1),
            "gm-001 row 0 cell 0 — one paragraph"
        );
        Assert.That(
            row0.Cells[0].Paragraphs[0].Marker,
            Is.EqualTo("p"),
            "gm-001 row 0 paragraph marker = \"p\""
        );

        // Row 1: one cell, two paragraphs — "q" then "q2".
        var row1 = result.Rows[1];
        Assert.That(row1.Cells.Count, Is.EqualTo(1), "gm-001 row 1 — single cell");
        Assert.That(
            row1.Cells[0].Paragraphs.Count,
            Is.EqualTo(2),
            "gm-001 row 1 cell 0 — two paragraphs (q + q2)"
        );
        Assert.That(
            row1.Cells[0].Paragraphs[0].Marker,
            Is.EqualTo("q"),
            "gm-001 row 1 paragraph 0 marker = \"q\""
        );
        Assert.That(
            row1.Cells[0].Paragraphs[1].Marker,
            Is.EqualTo("q2"),
            "gm-001 row 1 paragraph 1 marker = \"q2\""
        );

        // INV-002 — all rows IsMatch=true for single column.
        Assert.That(
            result.Rows.All(r => r.IsMatch),
            Is.True,
            "gm-001 — every row IsMatch=true (INV-002, single column)"
        );
    }

    // =====================================================================
    // Group J — Outer acceptance gm-004 replay (secondary)
    // =====================================================================

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-006")]
    [Property("Contract", "BuildChecklistData")]
    [Property("ScenarioId", "TS-004")]
    [Property("GoldenMaster", "gm-004")]
    [Property("BehaviorId", "BHV-101")]
    [Property("Invariant", "INV-010")]
    public void Gm004_HideMatchesFiltering_Replay_MatchesShape()
    {
        // gm-004 secondary outer acceptance: two projects, hideMatches=true,
        // showVerseText=false. Expected: rowCount=2, excludedCount=1, both
        // remaining rows IsMatch=false. Row 0 EXO 20:2 cells: [q,q2] and
        // [p,q]. Row 1 EXO 20:3 cells: [p] and [q2].
        var active = RegisterDummyProject(Gm004Text1ExoUsfm);
        var compare = RegisterDummyProject(Gm004Text2ExoUsfm);
        var request = BuildRequest(
            activeProjectId: active.Guid.ToString(),
            comparativeTextIds: new[] { compare.Guid.ToString() },
            hideMatches: true,
            showVerseText: false,
            bookNumbers: new[] { 2 }
        );

        ChecklistResult result = ChecklistService.BuildChecklistData(
            request,
            ParatextProjects,
            CancellationToken.None
        );

        Assert.That(result.Rows.Count, Is.EqualTo(2), "gm-004 — 2 non-matching rows retained");
        Assert.That(result.ExcludedCount, Is.EqualTo(1), "gm-004 — 1 matching row hidden");

        // Row 0 (EXO 20:2): [q,q2] | [p,q]
        var row0 = result.Rows[0];
        Assert.That(row0.IsMatch, Is.False, "gm-004 row 0 is non-match");
        Assert.That(row0.Cells.Count, Is.EqualTo(2), "gm-004 row 0 — 2 cells");
        var row0Col0Markers = row0.Cells[0].Paragraphs.Select(p => p.Marker).ToList();
        var row0Col1Markers = row0.Cells[1].Paragraphs.Select(p => p.Marker).ToList();
        Assert.That(
            row0Col0Markers,
            Is.EqualTo(new[] { "q", "q2" }),
            "gm-004 row 0 col 0 — paragraphs [q, q2]"
        );
        Assert.That(
            row0Col1Markers,
            Is.EqualTo(new[] { "p", "q" }),
            "gm-004 row 0 col 1 — paragraphs [p, q]"
        );

        // Row 1 (EXO 20:3): [p] | [q2]
        var row1 = result.Rows[1];
        Assert.That(row1.IsMatch, Is.False, "gm-004 row 1 is non-match");
        Assert.That(row1.Cells.Count, Is.EqualTo(2), "gm-004 row 1 — 2 cells");
        var row1Col0Markers = row1.Cells[0].Paragraphs.Select(p => p.Marker).ToList();
        var row1Col1Markers = row1.Cells[1].Paragraphs.Select(p => p.Marker).ToList();
        Assert.That(
            row1Col0Markers,
            Is.EqualTo(new[] { "p" }),
            "gm-004 row 1 col 0 — paragraph [p]"
        );
        Assert.That(
            row1Col1Markers,
            Is.EqualTo(new[] { "q2" }),
            "gm-004 row 1 col 1 — paragraph [q2]"
        );
    }
}
