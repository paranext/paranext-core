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
/// RED-phase focused unit tests for CAP-012 (Inline Edit-Link Permission Gating).
///
/// <para>
/// CAP-012 installs a small internal emission gate INSIDE
/// <see cref="ChecklistService.BuildChecklistData"/>: when the project-level
/// condition <c>scrText.Settings.Editable == true</c> holds, every cell's
/// paragraph items receive an <see cref="EditLinkItem"/> carrying the cell's
/// <c>BookNum</c>/<c>ChapterNum</c>/<c>VerseNum</c>. When <c>Editable == false</c>,
/// no <see cref="EditLinkItem"/> is emitted anywhere in the result.
/// </para>
///
/// <para>
/// <b>Why these tests FAIL before GREEN.</b> The current orchestrator (see
/// <c>ChecklistService.cs</c> inline comment near line 88:
/// <c>"EditLinkItem is NOT emitted here — CAP-012 owns inline edit-link gating"</c>)
/// produces zero <see cref="EditLinkItem"/>s. Tests 1 and 3 — which assert
/// presence when <c>Editable=true</c> — therefore fail on the RED cycle.
/// Test 2 (absence when <c>Editable=false</c>) is expected to PASS trivially
/// before GREEN, but becomes a meaningful regression guard once the gate is
/// wired: it keeps the implementer honest that the gate is a GATE, not an
/// unconditional emission. We keep it in the suite deliberately.
/// </para>
///
/// <para>
/// <b>Scope: project-level only.</b> TS-052 (chapter-level
/// <c>ScrText.Permissions.CanEdit(bookNum, chapterNum)</c>) is
/// <b>deferred per DEF-BE-001</b> and is kept here as an <c>[Ignore]</c>
/// placeholder so the traceability matrix still records VAL-007 cond 5.
/// </para>
///
/// <para>
/// <b>TDD variant: Classic.</b> Small internal emission decision — unit tests
/// drive out the minimal gate. Golden-master coverage for <see cref="EditLinkItem"/>
/// shape lives in gm-015 / gm-019 under CAP-006's existing orchestration tests;
/// no separate golden-master replay is added here.
/// </para>
///
/// Traceability:
///   - Capability: CAP-012
///   - Behaviors: BHV-114 (emission sub-behavior of cell construction)
///   - Extractions: EXT-016 (project-level portion only; chapter-level DEFERRED)
///   - Invariants: VAL-007 (project-level subset — conds 1-4)
///   - Scenarios: TS-050 (emission when conditions met), TS-051 (no emission
///     when Editable=false), TS-052 (DEFERRED — DEF-BE-001 placeholder)
///   - Deferred: DEF-BE-001 (chapter-level CanEdit)
///   - Contract: data-contracts.md §3.3 (ChecklistCell no longer carries a
///     separate edit-link field — presence is signalled by EditLinkItem in
///     paragraph items), §3.5 (EditLinkItem shape), §4.1 (inline gate
///     embedded in BuildChecklistData)
///   - PT9 source: Paratext/Checklists/ChecklistsTool.cs SetCellEditability
///     (project-level portion only — chapter-level CanEdit deferred)
/// </summary>
[TestFixture]
internal class ChecklistServiceEditLinkGatingTests : PapiTestBase
{
    // ---------------------------------------------------------------------
    // Shared helpers — mirror the CAP-006 test file's RegisterDummyProject /
    // BuildRequest / stylesheet-upgrade pattern so the two suites stay in
    // sync on DummyScrText wiring.
    // ---------------------------------------------------------------------

    /// <summary>
    /// Canonical EXO USFM from gm-001 — single project, two verses, three
    /// paragraph markers (\p, \q, \q2). Matches the
    /// <c>ChecklistServiceBuildChecklistDataTests.Gm001ExoUsfm</c> constant;
    /// duplicated here (rather than lifted to a shared helper) so the CAP-012
    /// tests stand alone when run in isolation.
    /// </summary>
    private const string Gm001ExoUsfm =
        @"\id EXO \c 20 \p \v 1 one. \v 2 two, \q poetry \q2 indented poetry";

    private DummyScrText RegisterDummyProject(string usfmPerBook, int bookNum = 2)
    {
        var scrText = new DummyScrText();
        UpgradePoetryMarkersToParagraphStyle(scrText);
        scrText.PutText(bookNum, 0, false, usfmPerBook, null);
        ParatextProjects.FakeAddProject(CreateProjectDetails(scrText), scrText);
        return scrText;
    }

    private static void UpgradePoetryMarkersToParagraphStyle(DummyScrText scrText)
    {
        var stylesheet = scrText.DefaultStylesheet;
        foreach (var marker in new[] { "q", "q1", "q2", "b" })
            AddPoetryTag(stylesheet, marker);
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

    private static ChecklistRequest BuildRequest(string activeProjectId)
    {
        var verseRange = new ScriptureRange(
            new VerseRef("EXO", "20", "1", ScrVers.English),
            new VerseRef("EXO", "20", "20", ScrVers.English)
        );

        return new ChecklistRequest(
            ProjectId: activeProjectId,
            ComparativeTextIds: Array.Empty<string>(),
            MarkerSettings: new MarkerSettings(string.Empty, string.Empty),
            VerseRange: verseRange,
            HideMatches: false,
            ShowVerseText: false
        );
    }

    /// <summary>
    /// Flattens every <see cref="ChecklistContentItem"/> across every row /
    /// cell / paragraph of the result so tests can scan for presence / absence
    /// of an <see cref="EditLinkItem"/>.
    /// </summary>
    private static IReadOnlyList<ChecklistContentItem> AllContentItems(ChecklistResult result) =>
        result
            .Rows.SelectMany(r => r.Cells)
            .SelectMany(c => c.Paragraphs)
            .SelectMany(p => p.Items)
            .ToList();

    // =====================================================================
    // Group A — Happy path (TS-050): Editable=true emits EditLinkItem(s)
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("Contract", "BuildChecklistData")]
    [Property("ScenarioId", "TS-050")]
    [Property("BehaviorId", "BHV-114")]
    [Property("ValidationRule", "VAL-007")]
    public void BuildChecklistData_ProjectEditable_EmitsEditLinkItem()
    {
        // TS-050 / VAL-007 (project-level subset): when scrText.Settings.Editable
        // is true and the cell-shape predicates hold (row has cells, first cell
        // has non-default VerseRef), BuildChecklistData must emit an
        // EditLinkItem inside the cell's paragraph items.
        //
        // DummyScrText defaults Settings.Editable=true but we set it explicitly
        // so the intent of the test is self-documenting.
        var scrText = RegisterDummyProject(Gm001ExoUsfm);
        scrText.Settings.Editable = true;

        var request = BuildRequest(activeProjectId: scrText.Guid.ToString());

        ChecklistResult result = ChecklistService.BuildChecklistData(
            request,
            ParatextProjects,
            CancellationToken.None
        );

        Assume.That(result.Rows, Is.Not.Empty, "precondition — Gm001ExoUsfm produces rows");

        var editLinks = AllContentItems(result).OfType<EditLinkItem>().ToList();
        Assert.That(
            editLinks,
            Is.Not.Empty,
            "TS-050 / VAL-007 — project editable=true MUST emit at least one EditLinkItem"
        );
    }

    // =====================================================================
    // Group B — Error path (TS-051): Editable=false suppresses EditLinkItem
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("Contract", "BuildChecklistData")]
    [Property("ScenarioId", "TS-051")]
    [Property("BehaviorId", "BHV-114")]
    [Property("ValidationRule", "VAL-007")]
    public void BuildChecklistData_ProjectNotEditable_EmitsNoEditLinkItems()
    {
        // TS-051: when scrText.Settings.Editable is false, no EditLinkItem
        // anywhere in the result — regardless of how many rows / cells /
        // paragraphs are produced. This is the gate's suppression branch.
        var scrText = RegisterDummyProject(Gm001ExoUsfm);
        scrText.Settings.Editable = false;

        var request = BuildRequest(activeProjectId: scrText.Guid.ToString());

        ChecklistResult result = ChecklistService.BuildChecklistData(
            request,
            ParatextProjects,
            CancellationToken.None
        );

        Assume.That(
            result.Rows,
            Is.Not.Empty,
            "precondition — Gm001ExoUsfm still produces rows even when non-editable"
        );

        var editLinks = AllContentItems(result).OfType<EditLinkItem>().ToList();
        Assert.That(
            editLinks,
            Is.Empty,
            "TS-051 / VAL-007 — project editable=false MUST suppress every EditLinkItem"
        );
    }

    // =====================================================================
    // Group C — Shape verification: EditLinkItem carries the cell's BBB/CCC/VVV
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("Contract", "BuildChecklistData")]
    [Property("ScenarioId", "TS-050")]
    [Property("BehaviorId", "BHV-114")]
    [Property("ValidationRule", "VAL-007")]
    public void BuildChecklistData_ProjectEditable_EditLinkItemsCarryCellVerseRef()
    {
        // Shape verification for TS-050: every EditLinkItem emitted must
        // target the same book/chapter/verse as the cell it lives in. We
        // compute the expected BookNum/ChapterNum/VerseNum by parsing the
        // cell's Reference string back into a VerseRef — the orchestrator
        // produced Reference via `vref.ToString()` (see ChecklistService.cs
        // BuildCLCell), so VerseRef(reference, versification) round-trips
        // cleanly.
        //
        // This is a behavior-not-implementation check: we don't pin HOW the
        // gate derives the numbers (it could read the cell's VerseRef, its
        // Reference string, or the paragraph's VerseRefStart); we only pin
        // that whatever it derives agrees with the cell's own Reference.
        var scrText = RegisterDummyProject(Gm001ExoUsfm);
        scrText.Settings.Editable = true;

        var request = BuildRequest(activeProjectId: scrText.Guid.ToString());

        ChecklistResult result = ChecklistService.BuildChecklistData(
            request,
            ParatextProjects,
            CancellationToken.None
        );

        Assume.That(result.Rows, Is.Not.Empty, "precondition — result has rows");

        int cellsChecked = 0;
        foreach (var row in result.Rows)
        foreach (var cell in row.Cells)
        {
            // Extract the expected BookNum/ChapterNum/VerseNum from the cell's
            // Reference. Empty reference = default verse -> skip (VAL-007
            // cell-shape predicate would itself block emission for a default
            // verse, so there's nothing to assert on such a cell).
            if (string.IsNullOrEmpty(cell.Reference))
                continue;

            var expected = new VerseRef(cell.Reference, scrText.Settings.Versification);

            var cellEditLinks = cell
                .Paragraphs.SelectMany(p => p.Items)
                .OfType<EditLinkItem>()
                .ToList();

            // If the gate emitted any EditLinkItems for this cell (it should,
            // because Editable=true and the cell has a non-default VerseRef
            // per VAL-007 cond 1-4), each one must target this cell's ref.
            foreach (var link in cellEditLinks)
            {
                Assert.That(
                    link.BookNum,
                    Is.EqualTo(expected.BookNum),
                    $"EditLinkItem.BookNum must match cell reference {cell.Reference}"
                );
                Assert.That(
                    link.ChapterNum,
                    Is.EqualTo(expected.ChapterNum),
                    $"EditLinkItem.ChapterNum must match cell reference {cell.Reference}"
                );
                Assert.That(
                    link.VerseNum,
                    Is.EqualTo(expected.VerseNum),
                    $"EditLinkItem.VerseNum must match cell reference {cell.Reference}"
                );
                cellsChecked++;
            }
        }

        Assert.That(
            cellsChecked,
            Is.GreaterThan(0),
            "shape test precondition — Editable=true should produce at least one EditLinkItem to shape-check. "
                + "If this assertion fails, either TS-050 isn't wired yet (RED state) or the gate emitted no links on a qualifying cell."
        );
    }

    // =====================================================================
    // Group D — DEFERRED per DEF-BE-001 (TS-052): chapter-level CanEdit
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("Contract", "BuildChecklistData")]
    [Property("ScenarioId", "TS-052")]
    [Property("BehaviorId", "BHV-114")]
    [Property("ValidationRule", "VAL-007")]
    [Property("Deferred", "DEF-BE-001")]
    [Ignore(
        "DEF-BE-001: Chapter-level ScrText.Permissions.CanEdit(bookNum, chapterNum) "
            + "is DEFERRED for PT10 MVP. paranext-core does not yet expose a platform-wide "
            + "CanEdit(bookNum, chapterNum) API; the inline gate therefore only honours the "
            + "project-level scrText.Settings.Editable check. See "
            + "implementation/deferred-functionality.md §DEF-BE-001 for the revisit trigger. "
            + "This placeholder preserves TS-052 traceability so the matrix records "
            + "VAL-007 cond 5 even though it's not implemented."
    )]
    public void BuildChecklistData_PerChapterPermissionDenied_SuppressesEditLinkItem_DEFERRED()
    {
        // DEFERRED per DEF-BE-001. When the trigger API (platform-wide
        // CanEdit(bookNum, chapterNum) equivalent) lands, remove the [Ignore]
        // and implement the scenario: a project where Settings.Editable=true
        // but the user lacks CanEdit on a specific chapter should produce NO
        // EditLinkItem for rows in that chapter (and EditLinkItems as normal
        // for other chapters).
        Assert.Pass("placeholder — see [Ignore] rationale (DEF-BE-001)");
    }
}
