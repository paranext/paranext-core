using System;
using System.Collections.Generic;
using System.Linq;
using Paranext.DataProvider.Checklists;
using SIL.Scripture;

namespace TestParanextDataProvider.Checklists;

/// <summary>
/// RED-phase contract and scenario tests for CAP-005 (Row Alignment Builder —
/// <c>ChecklistRowBuilder.BuildRowsMergingCells</c>).
///
/// <para>
/// These tests will NOT compile until the implementer creates the static class
/// <c>Paranext.DataProvider.Checklists.ChecklistRowBuilder</c> with a public
/// <c>BuildRowsMergingCells(List&lt;List&lt;ChecklistCell&gt;&gt;)</c> method.
/// That is intentional: the test file IS the specification — the compile error
/// is the first layer of the RED signal; the test assertion failures are the
/// second (matches the CAP-001 / CAP-003 / CAP-004 precedent). Per
/// strategic-plan-backend.md §CAP-005, this capability uses Classic TDD:
/// tests build up incrementally from empty inputs through exact-match
/// alignment, missing-verse placeholders, verse-bridge merging, MAX_CELLS_TO_GRAB
/// boundary, and duplicate-verse rows. The per-group assertions drive discovery
/// of the internal helpers (<c>BuildReferenceMappings</c>,
/// <c>ExpandGrabCountToAlignCells</c>, <c>AddRowOfGrabbedCells</c>) through the
/// public surface.
/// </para>
///
/// <para>
/// <b>Signature note (versification source).</b> PT9's <c>CLRowsBuilder</c> reads
/// versification off each cell's live <c>VerseRef</c> to call
/// <c>ChangeVersification</c> for INV-007. The PT10 <c>ChecklistCell</c> (see
/// data-contracts §3.3) carries only a serialized <c>Reference</c> string —
/// versification information lives one layer up in the <c>ScrText</c> of the
/// column. Strategic-plan-backend.md §CAP-005 fixes the public signature as
/// <c>BuildRowsMergingCells(List&lt;List&lt;ChecklistCell&gt;&gt;) -&gt;
/// List&lt;ChecklistRow&gt;</c>, so these tests use <i>pre-normalized</i>
/// reference strings in every column. If the implementer decides during GREEN
/// that a versification companion parameter is required (e.g. to match PT9's
/// runtime <c>AllVerses().ChangeVersification(...)</c> behavior), the tests
/// will be touched up then — the RED signal here is the missing class, not a
/// parameter mismatch.
/// </para>
///
/// Traceability:
///   - Capability: CAP-005
///   - Behaviors: BHV-109 (single behavior for this capability)
///   - Extractions: EXT-009 (CLRowsBuilder → ChecklistRowBuilder)
///   - Invariants: INV-001 (N cells per row), INV-006 (MAX_CELLS_TO_GRAB=3),
///     INV-007 (common versification — orchestrator-pre-normalized here),
///     INV-011 (Markers checklist uses merging mode — implicit: we only call
///     BuildRowsMergingCells)
///   - Scenarios: TS-025, TS-026, TS-027, TS-028, TS-064, TS-068, TS-069
///   - Golden Masters: gm-011, gm-012, gm-013 (shape-level replay; end-to-end
///     coverage lives in CAP-006 integration tests per strategic-plan-backend.md)
///   - Contract: data-contracts.md §4.1 (BHV-109 inside BuildChecklistData),
///     §3.2 (ChecklistRow shape), §3.3 (ChecklistCell shape)
///   - PT9 source: Paratext/Checklists/CLRowsBuilder.cs:1-371
/// </summary>
[TestFixture]
internal class ChecklistRowBuilderTests
{
    // ---------------------------------------------------------------------
    // Shared helpers — keep test-body shape close to the captured gm data
    // ---------------------------------------------------------------------

    /// <summary>
    /// Build a single-paragraph <see cref="ChecklistCell"/> with one
    /// <see cref="VerseItem"/> + <see cref="TextItem"/> pair. <c>Reference</c> is a
    /// single-verse <see cref="ScriptureRange"/> (no verse-bridge merging on this cell).
    /// </summary>
    private static ChecklistCell Cell(string reference, string text)
    {
        var items = new List<ChecklistContentItem>
        {
            new VerseItem(ExtractVerseNumber(reference)),
            new TextItem(text, null),
        };
        var paragraph = new ChecklistParagraph("p", items);
        return new ChecklistCell(
            Paragraphs: new List<ChecklistParagraph> { paragraph },
            Reference: SingleRange(reference),
            Language: "dmy",
            Error: null
        );
    }

    /// <summary>
    /// Build a bridge <see cref="ChecklistCell"/> — the cell represents a verse
    /// bridge like <c>EXO 20:2-3</c>. Its <c>Reference</c> is a
    /// <see cref="ScriptureRange"/> spanning <paramref name="firstVerseRef"/> through the
    /// last verse of <paramref name="bridgeDisplayRef"/> ({Start, End}).
    /// </summary>
    private static ChecklistCell BridgeCell(
        string firstVerseRef,
        string bridgeDisplayRef,
        string bridgeVerseNumber,
        string text
    )
    {
        var items = new List<ChecklistContentItem>
        {
            new VerseItem(bridgeVerseNumber),
            new TextItem(text, null),
        };
        var paragraph = new ChecklistParagraph("p", items);
        return new ChecklistCell(
            Paragraphs: new List<ChecklistParagraph> { paragraph },
            Reference: BridgeRange(firstVerseRef, bridgeDisplayRef),
            Language: "dmy",
            Error: null
        );
    }

    /// <summary>Build a single-verse <see cref="ScriptureRange"/> from a string like "GEN 1:1".</summary>
    private static ScriptureRange SingleRange(string reference) =>
        new ScriptureRange(new VerseRef(reference), null);

    /// <summary>
    /// Build a bridge <see cref="ScriptureRange"/> spanning <paramref name="firstVerseRef"/>
    /// (e.g. "EXO 20:2") through the last verse of <paramref name="bridgeRef"/> (e.g.
    /// "EXO 20:2-5") — i.e. {Start = EXO 20:2, End = EXO 20:5}.
    /// </summary>
    private static ScriptureRange BridgeRange(string firstVerseRef, string bridgeRef)
    {
        var start = new VerseRef(firstVerseRef);
        int dash = bridgeRef.LastIndexOf('-');
        string endVerse = dash >= 0 ? bridgeRef[(dash + 1)..] : start.VerseNum.ToString();
        var end = new VerseRef(
            start.Book,
            start.ChapterNum.ToString(),
            endVerse,
            start.Versification
        );
        return new ScriptureRange(start, end);
    }

    /// <summary>
    /// Render a <see cref="ScriptureRange"/> back to a canonical assertion string —
    /// "GEN 1:1" for a single verse, "GEN 1:1-3" for a bridge, "" for null.
    /// </summary>
    private static string RefString(ScriptureRange? range)
    {
        if (range is null)
            return string.Empty;
        return range.End is { } end ? $"{range.Start}-{end.VerseNum}" : range.Start.ToString();
    }

    /// <summary>Extracts the verse-number portion of a reference like "EXO 20:3".</summary>
    private static string ExtractVerseNumber(string reference)
    {
        int colonIdx = reference.IndexOf(':');
        return colonIdx < 0 ? reference : reference.Substring(colonIdx + 1);
    }

    /// <summary>
    /// Counts <see cref="ChecklistParagraph"/> instances inside a cell.
    /// Merged bridge cells carry multiple paragraphs (one per grabbed cell).
    /// </summary>
    private static int ParagraphCount(ChecklistCell cell) => cell.Paragraphs.Count;

    /// <summary>
    /// True when the cell is an "empty placeholder" emitted for a column that
    /// has no matching verse at this row (INV-001).
    /// </summary>
    private static bool IsEmptyPlaceholder(ChecklistCell cell) => cell.Paragraphs.Count == 0;

    // =====================================================================
    // GROUP A — degenerate / empty inputs (Classic TDD steps 1-3)
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-109")]
    [Description("Group A.1: empty columns list produces empty rows list.")]
    public void BuildRowsMergingCells_EmptyColumnList_ReturnsEmpty()
    {
        var columns = new List<List<ChecklistCell>>();

        var rows = ChecklistRowBuilder.BuildRowsMergingCells(columns);

        Assert.That(rows, Is.Not.Null);
        Assert.That(rows, Is.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-109")]
    [Property("Invariant", "INV-001")]
    [Description("Group A.2: single column, single cell → one row with one cell.")]
    public void BuildRowsMergingCells_SingleColumnSingleCell_ReturnsOneRowWithOneCell()
    {
        var columns = new List<List<ChecklistCell>>
        {
            new() { Cell("GEN 1:1", "in the beginning ") },
        };

        var rows = ChecklistRowBuilder.BuildRowsMergingCells(columns);

        Assert.That(rows.Count, Is.EqualTo(1));
        Assert.That(rows[0].Cells.Count, Is.EqualTo(1), "INV-001: cells.Count == columns.Count");
        Assert.That(RefString(rows[0].Cells[0].Reference), Is.EqualTo("GEN 1:1"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-109")]
    [Description("Group A.3: single column, multiple cells → one row per cell, order preserved.")]
    public void BuildRowsMergingCells_SingleColumnMultipleCells_PreservesOrder()
    {
        var columns = new List<List<ChecklistCell>>
        {
            new() { Cell("GEN 1:1", "v1 "), Cell("GEN 1:2", "v2 "), Cell("GEN 1:3", "v3 ") },
        };

        var rows = ChecklistRowBuilder.BuildRowsMergingCells(columns);

        Assert.That(rows.Count, Is.EqualTo(3));
        Assert.That(RefString(rows[0].Cells[0].Reference), Is.EqualTo("GEN 1:1"));
        Assert.That(RefString(rows[1].Cells[0].Reference), Is.EqualTo("GEN 1:2"));
        Assert.That(RefString(rows[2].Cells[0].Reference), Is.EqualTo("GEN 1:3"));
    }

    // =====================================================================
    // GROUP B — exact-match alignment (TS-025, TS-064)
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-109")]
    [Property("ScenarioId", "TS-025")]
    [Property("Invariant", "INV-001")]
    [Description(
        "Group B.4 (TS-025): two columns with identical verse references align "
            + "into one row per reference, 2 cells each."
    )]
    public void BuildRowsMergingCells_TwoColumnsSameRefs_AlignsOneRowPerRef()
    {
        var columns = new List<List<ChecklistCell>>
        {
            new() { Cell("GEN 1:1", "en-1 "), Cell("GEN 1:2", "en-2 "), Cell("GEN 1:3", "en-3 ") },
            new() { Cell("GEN 1:1", "es-1 "), Cell("GEN 1:2", "es-2 "), Cell("GEN 1:3", "es-3 ") },
        };

        var rows = ChecklistRowBuilder.BuildRowsMergingCells(columns);

        Assert.That(rows.Count, Is.EqualTo(3), "one row per shared reference");
        foreach (var row in rows)
            Assert.That(row.Cells.Count, Is.EqualTo(2), "INV-001: 2 columns → 2 cells");
        Assert.That(RefString(rows[0].Cells[0].Reference), Is.EqualTo("GEN 1:1"));
        Assert.That(RefString(rows[0].Cells[1].Reference), Is.EqualTo("GEN 1:1"));
        Assert.That(RefString(rows[2].Cells[0].Reference), Is.EqualTo("GEN 1:3"));
        Assert.That(RefString(rows[2].Cells[1].Reference), Is.EqualTo("GEN 1:3"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-109")]
    [Property("ScenarioId", "TS-025")]
    [Property("Invariant", "INV-001")]
    [Description("Group B.5: three columns with identical refs → one row per ref, 3 cells each.")]
    public void BuildRowsMergingCells_ThreeColumnsSameRefs_AlignsAcrossAll()
    {
        var columns = new List<List<ChecklistCell>>
        {
            new() { Cell("GEN 1:1", "a1 "), Cell("GEN 1:2", "a2 ") },
            new() { Cell("GEN 1:1", "b1 "), Cell("GEN 1:2", "b2 ") },
            new() { Cell("GEN 1:1", "c1 "), Cell("GEN 1:2", "c2 ") },
        };

        var rows = ChecklistRowBuilder.BuildRowsMergingCells(columns);

        Assert.That(rows.Count, Is.EqualTo(2));
        foreach (var row in rows)
            Assert.That(row.Cells.Count, Is.EqualTo(3), "INV-001");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-109")]
    [Property("Invariant", "INV-001")]
    [Description(
        "Group B.6: INV-001 explicit assertion — every row has cells.Count == columns.Count."
    )]
    public void BuildRowsMergingCells_EveryRow_HasNCellsWhereNIsColumnCount()
    {
        // Mixed alignment: not every ref is shared. INV-001 must hold regardless.
        var columns = new List<List<ChecklistCell>>
        {
            new() { Cell("EXO 20:1", "one "), Cell("EXO 20:3", "three ") },
            new() { Cell("EXO 20:1", "uno "), Cell("EXO 20:2", "dos ") },
            new() { Cell("EXO 20:2", "deux "), Cell("EXO 20:3", "trois ") },
        };

        var rows = ChecklistRowBuilder.BuildRowsMergingCells(columns);

        Assert.That(rows, Is.Not.Empty);
        foreach (var row in rows)
            Assert.That(
                row.Cells.Count,
                Is.EqualTo(3),
                $"INV-001: row at FirstRef={row.FirstRef} must have 3 cells (3 columns)"
            );
    }

    // =====================================================================
    // GROUP C — missing verses, empty placeholders (TS-026, INV-001, gm-012)
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-109")]
    [Property("ScenarioId", "TS-026")]
    [Property("Invariant", "INV-001")]
    [Description(
        "Group C.7 (TS-026): missing middle verse in col 1 → row for v2 has "
            + "empty cell placeholder at col 1."
    )]
    public void BuildRowsMergingCells_MissingMiddleVerse_ProducesEmptyPlaceholderForColumn()
    {
        var columns = new List<List<ChecklistCell>>
        {
            new() { Cell("GEN 1:1", "v1 "), Cell("GEN 1:2", "v2 "), Cell("GEN 1:3", "v3 ") },
            new() { Cell("GEN 1:1", "uno "), Cell("GEN 1:3", "tres ") },
        };

        var rows = ChecklistRowBuilder.BuildRowsMergingCells(columns);

        Assert.That(rows.Count, Is.EqualTo(3));
        foreach (var row in rows)
            Assert.That(row.Cells.Count, Is.EqualTo(2), "INV-001");

        // Row for GEN 1:2 has empty placeholder in col 1.
        var rowV2 = rows.Single(r => RefString(r.Cells[0].Reference) == "GEN 1:2");
        Assert.That(IsEmptyPlaceholder(rowV2.Cells[1]), Is.True, "col 1 missing v2 → empty cell");
        Assert.That(IsEmptyPlaceholder(rowV2.Cells[0]), Is.False, "col 0 populated for v2");
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-109")]
    [Property("ScenarioId", "TS-026")]
    [Property("GoldenMaster", "gm-012")]
    [Property("Invariant", "INV-001")]
    [Description(
        "Group C.8 (gm-012 replay): 5 rows × 2 cells. Rows 0/1/3/4 have empty "
            + "col 0 (text1 only has v5-6). See golden-masters/gm-012/expected-output.json."
    )]
    public void BuildRowsMergingCells_MissingAtStartAndEnd_Gm012Shape()
    {
        // gm-012 shape:
        // text1 (col 0): only v5, v6
        // text2 (col 1): v1-2 bridge, v3-4 bridge, v5-6 bridge, v7, v8
        var col0 = new List<ChecklistCell> { Cell("EXO 20:5", "five "), Cell("EXO 20:6", "six ") };
        var col1 = new List<ChecklistCell>
        {
            BridgeCell("EXO 20:1", "EXO 20:1-2", "1-2", "uno a dos "),
            BridgeCell("EXO 20:3", "EXO 20:3-4", "3-4", "tres a cuatro "),
            BridgeCell("EXO 20:5", "EXO 20:5-6", "5-6", "cinco a seis "),
            Cell("EXO 20:7", "siete "),
            Cell("EXO 20:8", "ocho "),
        };
        var columns = new List<List<ChecklistCell>> { col0, col1 };

        var rows = ChecklistRowBuilder.BuildRowsMergingCells(columns);

        Assert.That(rows.Count, Is.EqualTo(5), "gm-012 expected 5 rows");
        foreach (var row in rows)
            Assert.That(row.Cells.Count, Is.EqualTo(2), "INV-001");

        // Rows 0, 1, 3, 4 have empty col 0 (text1 has no matching verses there).
        Assert.That(IsEmptyPlaceholder(rows[0].Cells[0]), Is.True, "row 0 col 0 empty");
        Assert.That(IsEmptyPlaceholder(rows[1].Cells[0]), Is.True, "row 1 col 0 empty");
        Assert.That(IsEmptyPlaceholder(rows[3].Cells[0]), Is.True, "row 3 col 0 empty");
        Assert.That(IsEmptyPlaceholder(rows[4].Cells[0]), Is.True, "row 4 col 0 empty");

        // Row 2 (middle) has both columns populated — merge happened.
        Assert.That(IsEmptyPlaceholder(rows[2].Cells[0]), Is.False, "row 2 col 0 populated");
        Assert.That(IsEmptyPlaceholder(rows[2].Cells[1]), Is.False, "row 2 col 1 populated");
    }

    // =====================================================================
    // GROUP D — verse bridges with merging (TS-027, gm-011, gm-013, INV-006)
    // =====================================================================

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-109")]
    [Property("ScenarioId", "TS-027")]
    [Property("GoldenMaster", "gm-013")]
    [Property("Invariant", "INV-006")]
    [Description(
        "Group D.9 (gm-013 replay): text1 [v1, v2-5, v6, v7-8] × text2 [v1, v4-7, v8-9] "
            + "→ 2 rows. Row 1 merges 3 cells in col 0 (MAX_CELLS_TO_GRAB). See "
            + "golden-masters/gm-013/expected-output.json."
    )]
    public void BuildRowsMergingCells_BridgeInColOneIndividualInColTwo_MergesUpToMaxCells()
    {
        var col0 = new List<ChecklistCell>
        {
            Cell("EXO 20:1", "one "),
            BridgeCell("EXO 20:2", "EXO 20:2-5", "2-5", "two to five "),
            Cell("EXO 20:6", "six "),
            BridgeCell("EXO 20:7", "EXO 20:7-8", "7-8", "seven to eight "),
        };
        var col1 = new List<ChecklistCell>
        {
            Cell("EXO 20:1", "uno "),
            BridgeCell("EXO 20:4", "EXO 20:4-7", "4-7", "cuatro a siete "),
            BridgeCell("EXO 20:8", "EXO 20:8-9", "8-9", "ocho a nueve "),
        };
        var columns = new List<List<ChecklistCell>> { col0, col1 };

        var rows = ChecklistRowBuilder.BuildRowsMergingCells(columns);

        Assert.That(rows.Count, Is.EqualTo(2), "gm-013 expected 2 rows");
        foreach (var row in rows)
            Assert.That(row.Cells.Count, Is.EqualTo(2), "INV-001");

        // Row 1 col 0 merges 3 cells (2-5, 6, 7-8) — exactly MAX_CELLS_TO_GRAB.
        Assert.That(
            ParagraphCount(rows[1].Cells[0]),
            Is.EqualTo(3),
            "INV-006: col 0 row 1 merges exactly 3 cells (MAX_CELLS_TO_GRAB)"
        );
        Assert.That(
            ParagraphCount(rows[1].Cells[1]),
            Is.EqualTo(2),
            "col 1 row 1 merges 2 cells (4-7, 8-9)"
        );
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-109")]
    [Property("ScenarioId", "TS-025")]
    [Property("GoldenMaster", "gm-011")]
    [Description(
        "Group D.10 (gm-011 replay): 4 rows with overlapping bridges merged. text1 "
            + "[v1, v2, v3, v4-6, v7, v8] × text2 [v1, v2-3, v4, v5, v6-7, v8]. "
            + "See golden-masters/gm-011/expected-output.json."
    )]
    public void BuildRowsMergingCells_OverlappingBridges_Gm011Shape()
    {
        var col0 = new List<ChecklistCell>
        {
            Cell("EXO 20:1", "one "),
            Cell("EXO 20:2", "two "),
            Cell("EXO 20:3", "three "),
            BridgeCell("EXO 20:4", "EXO 20:4-6", "4-6", "four to six "),
            Cell("EXO 20:7", "seven "),
            Cell("EXO 20:8", "eight "),
        };
        var col1 = new List<ChecklistCell>
        {
            Cell("EXO 20:1", "uno "),
            BridgeCell("EXO 20:2", "EXO 20:2-3", "2-3", "dos a tres "),
            Cell("EXO 20:4", "cuatro "),
            Cell("EXO 20:5", "cinco "),
            BridgeCell("EXO 20:6", "EXO 20:6-7", "6-7", "seis a siete "),
            Cell("EXO 20:8", "ocho "),
        };
        var columns = new List<List<ChecklistCell>> { col0, col1 };

        var rows = ChecklistRowBuilder.BuildRowsMergingCells(columns);

        Assert.That(rows.Count, Is.EqualTo(4), "gm-011 expected 4 rows");
        foreach (var row in rows)
            Assert.That(row.Cells.Count, Is.EqualTo(2), "INV-001");

        // Row 0: v1 — unmerged.
        Assert.That(ParagraphCount(rows[0].Cells[0]), Is.EqualTo(1));
        Assert.That(ParagraphCount(rows[0].Cells[1]), Is.EqualTo(1));

        // Row 1: col 0 has v2, v3 (2 cells); col 1 has v2-3 bridge (1 cell).
        Assert.That(
            ParagraphCount(rows[1].Cells[0]),
            Is.EqualTo(2),
            "col 0 row 1 merges v2 and v3 to align with col 1's v2-3 bridge"
        );
        Assert.That(ParagraphCount(rows[1].Cells[1]), Is.EqualTo(1));

        // Row 2: col 0 has v4-6 bridge, v7 (2 cells); col 1 has v4, v5, v6-7 (3 cells).
        Assert.That(ParagraphCount(rows[2].Cells[0]), Is.EqualTo(2));
        Assert.That(
            ParagraphCount(rows[2].Cells[1]),
            Is.EqualTo(3),
            "col 1 row 2 merges v4, v5, v6-7 — at MAX_CELLS_TO_GRAB"
        );

        // Row 3: v8 — unmerged.
        Assert.That(ParagraphCount(rows[3].Cells[0]), Is.EqualTo(1));
        Assert.That(ParagraphCount(rows[3].Cells[1]), Is.EqualTo(1));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-109")]
    [Property("Invariant", "INV-006")]
    [Description(
        "Group D.11: MAX_CELLS_TO_GRAB hard limit — no cell ever merges more than 3 "
            + "paragraphs regardless of how many adjacent cells in the other column "
            + "could participate."
    )]
    public void BuildRowsMergingCells_ExactlyThreeCellsMerged_DoesNotExceedMax()
    {
        // col 0 has 6 consecutive individual cells v1..v6
        // col 1 has a single giant bridge v1-6
        // PT9 caps the grab at 3 even though 6 cells would match.
        var col0 = new List<ChecklistCell>
        {
            Cell("GEN 1:1", "v1 "),
            Cell("GEN 1:2", "v2 "),
            Cell("GEN 1:3", "v3 "),
            Cell("GEN 1:4", "v4 "),
            Cell("GEN 1:5", "v5 "),
            Cell("GEN 1:6", "v6 "),
        };
        var col1 = new List<ChecklistCell>
        {
            BridgeCell("GEN 1:1", "GEN 1:1-6", "1-6", "one through six "),
        };
        var columns = new List<List<ChecklistCell>> { col0, col1 };

        var rows = ChecklistRowBuilder.BuildRowsMergingCells(columns);

        // Every row cell's paragraph count must be <= MAX_CELLS_TO_GRAB (3).
        foreach (var row in rows)
        {
            foreach (var cell in row.Cells)
            {
                Assert.That(
                    ParagraphCount(cell),
                    Is.LessThanOrEqualTo(3),
                    $"INV-006: no cell merges more than MAX_CELLS_TO_GRAB (3); "
                        + $"got {ParagraphCount(cell)} at FirstRef={row.FirstRef}"
                );
            }
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-109")]
    [Property("GoldenMaster", "gm-013")]
    [Description(
        "Group D.12 (gm-013 FirstRef check): the merged row's FirstRef equals "
            + "the earliest verse reference among grabbed cells."
    )]
    public void BuildRowsMergingCells_Gm013MergedRowReference_IsExpectedFirstRef()
    {
        var col0 = new List<ChecklistCell>
        {
            Cell("EXO 20:1", "one "),
            BridgeCell("EXO 20:2", "EXO 20:2-5", "2-5", "two to five "),
            Cell("EXO 20:6", "six "),
            BridgeCell("EXO 20:7", "EXO 20:7-8", "7-8", "seven to eight "),
        };
        var col1 = new List<ChecklistCell>
        {
            Cell("EXO 20:1", "uno "),
            BridgeCell("EXO 20:4", "EXO 20:4-7", "4-7", "cuatro a siete "),
            BridgeCell("EXO 20:8", "EXO 20:8-9", "8-9", "ocho a nueve "),
        };
        var columns = new List<List<ChecklistCell>> { col0, col1 };

        var rows = ChecklistRowBuilder.BuildRowsMergingCells(columns);

        Assert.That(rows.Count, Is.EqualTo(2));
        Assert.That(RefString(rows[0].FirstRef), Is.EqualTo("EXO 20:1"));
        // Row 1's FirstRef is the earliest verse in the merged block; col 0 starts
        // with v2 (via v2-5 bridge) which is earlier than col 1's v4-7.
        Assert.That(
            RefString(rows[1].FirstRef),
            Is.EqualTo("EXO 20:2"),
            "FirstRef reflects earliest verse across all grabbed cells"
        );
    }

    // =====================================================================
    // GROUP E — versification normalization pre-requisite (TS-028, TS-069)
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-109")]
    [Property("ScenarioId", "TS-028")]
    [Property("Invariant", "INV-007")]
    [Description(
        "Group E.13 (TS-028): when the orchestrator (CAP-006) pre-normalizes both "
            + "columns to the common versification, cells with originally different "
            + "refs (GEN 32:1 in Original vs GEN 31:55 in English) land in the same "
            + "row. The row builder aligns on the normalized Reference string. "
            + "Note: if the implementer chooses to add a versification companion "
            + "parameter to do the normalization itself, this test will adapt "
            + "during GREEN — the behavior under test (same-row alignment) stays."
    )]
    public void BuildRowsMergingCells_CellsWithPreNormalizedReferences_AlignByNormalizedRef()
    {
        // Both columns already carry the normalized "GEN 31:55" reference —
        // the orchestrator called ChangeVersification on col 1 before handing to
        // the row builder. CAP-005 has no versification responsibility in this
        // test; only alignment by Reference string.
        var columns = new List<List<ChecklistCell>>
        {
            // col 0 was always English → "GEN 31:55" natively.
            new() { Cell("GEN 31:55", "so Jacob said ") },
            // col 1 was Original → "GEN 32:1" natively; orchestrator converted to
            // "GEN 31:55" before passing to the row builder.
            new() { Cell("GEN 31:55", "y Jacob dijo ") },
        };

        var rows = ChecklistRowBuilder.BuildRowsMergingCells(columns);

        Assert.That(rows.Count, Is.EqualTo(1), "pre-normalized refs align into one row");
        Assert.That(rows[0].Cells.Count, Is.EqualTo(2), "INV-001");
        Assert.That(RefString(rows[0].Cells[0].Reference), Is.EqualTo("GEN 31:55"));
        Assert.That(RefString(rows[0].Cells[1].Reference), Is.EqualTo("GEN 31:55"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-109")]
    [Property("ScenarioId", "TS-069")]
    [Property("Invariant", "INV-007")]
    [Description(
        "Group E.14 (TS-069, chapter break difference): same pattern as E.13 — "
            + "GEN 32:1 in Hebrew == GEN 31:55 in English. Both cells carry the "
            + "normalized reference at this layer; alignment succeeds."
    )]
    public void BuildRowsMergingCells_ChapterBreakDifference_AlignsViaPreNormalizedRefs()
    {
        // Two-cell setup. The chapter-boundary-different verse aligns with the
        // immediately adjacent verse on the other side.
        var columns = new List<List<ChecklistCell>>
        {
            new() { Cell("GEN 31:54", "v54 "), Cell("GEN 31:55", "v55 ") },
            new() { Cell("GEN 31:54", "v54-es "), Cell("GEN 31:55", "v55-es ") },
        };

        var rows = ChecklistRowBuilder.BuildRowsMergingCells(columns);

        Assert.That(rows.Count, Is.EqualTo(2));
        Assert.That(RefString(rows[0].Cells[0].Reference), Is.EqualTo("GEN 31:54"));
        Assert.That(RefString(rows[1].Cells[0].Reference), Is.EqualTo("GEN 31:55"));
        foreach (var row in rows)
            Assert.That(row.Cells.Count, Is.EqualTo(2), "INV-001");
    }

    // =====================================================================
    // GROUP F — duplicate verses (TS-068, MRK 16)
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-109")]
    [Property("ScenarioId", "TS-068")]
    [Description(
        "Group F.15 (TS-068): duplicate verse refs in the same column (e.g. MRK "
            + "16:1 appearing twice due to shorter/longer ending traditions) produce "
            + "separate rows rather than collapsing. PT9's handledCells HashSet "
            + "prevents re-grabbing an already-processed cell, so the second "
            + "occurrence gets its own row."
    )]
    public void BuildRowsMergingCells_DuplicateVerseReferences_GetSeparateRows()
    {
        var columns = new List<List<ChecklistCell>>
        {
            new()
            {
                Cell("MRK 16:1", "first-ending v1 "),
                Cell("MRK 16:2", "first-ending v2 "),
                Cell("MRK 16:1", "second-ending v1 "), // duplicate ref
                Cell("MRK 16:2", "second-ending v2 "), // duplicate ref
            },
            new() { Cell("MRK 16:1", "es v1 "), Cell("MRK 16:2", "es v2 ") },
        };

        var rows = ChecklistRowBuilder.BuildRowsMergingCells(columns);

        // Exactly 4 rows — each of the 4 cells in col 0 (MRK 16:1, 16:2, 16:1-dup,
        // 16:2-dup) gets its own row because the handledCells HashSet prevents
        // re-grabbing an already-processed cell (see AddIfUnhandled).
        Assert.That(
            rows.Count,
            Is.EqualTo(4),
            "duplicate verse refs must each produce their own row (TS-068)"
        );

        // Count rows whose col 0 reference is "MRK 16:1" — should be 2 (duplicates).
        int mrk16v1Rows = rows.Count(r =>
            r.Cells.Count > 0
            && !IsEmptyPlaceholder(r.Cells[0])
            && RefString(r.Cells[0].Reference) == "MRK 16:1"
        );
        Assert.That(mrk16v1Rows, Is.EqualTo(2), "both occurrences of MRK 16:1 get their own row");
    }

    // =====================================================================
    // GROUP G — INV-001 / FirstRef postconditions
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-109")]
    [Property("Invariant", "INV-001")]
    [Description(
        "Group G.16 (INV-001 property-style): over a gm-011-like setup, every row "
            + "produced must have cells.Count == columns.Count. Exhaustive over the result."
    )]
    public void BuildRowsMergingCells_AllRows_HaveCellsCountEqualToColumnCount()
    {
        var col0 = new List<ChecklistCell>
        {
            Cell("EXO 20:1", "one "),
            Cell("EXO 20:2", "two "),
            BridgeCell("EXO 20:4", "EXO 20:4-6", "4-6", "four to six "),
        };
        var col1 = new List<ChecklistCell>
        {
            BridgeCell("EXO 20:2", "EXO 20:2-3", "2-3", "dos a tres "),
            Cell("EXO 20:5", "cinco "),
        };
        var col2 = new List<ChecklistCell>
        {
            Cell("EXO 20:1", "uno-fr "),
            Cell("EXO 20:6", "six-fr "),
        };
        var columns = new List<List<ChecklistCell>> { col0, col1, col2 };

        var rows = ChecklistRowBuilder.BuildRowsMergingCells(columns);

        Assert.That(rows, Is.Not.Empty);
        foreach (var row in rows)
            Assert.That(
                row.Cells.Count,
                Is.EqualTo(3),
                $"INV-001: row at FirstRef={row.FirstRef} must have exactly 3 cells (3 columns)"
            );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-109")]
    [Description(
        "Group G.17 (FirstRef postcondition, BHV-111 carry-through): every row's "
            + "FirstRef is non-null (no row is produced without any cells) and equals "
            + "the reference of the earliest populated cell."
    )]
    public void BuildRowsMergingCells_FirstRefOfEachRow_ReflectsEarliestVerse()
    {
        var columns = new List<List<ChecklistCell>>
        {
            new() { Cell("EXO 20:1", "one "), Cell("EXO 20:3", "three ") },
            new() { Cell("EXO 20:2", "dos "), Cell("EXO 20:3", "tres ") },
        };

        var rows = ChecklistRowBuilder.BuildRowsMergingCells(columns);

        foreach (var row in rows)
        {
            Assert.That(row.FirstRef, Is.Not.Null, "every row has a FirstRef (BHV-111)");
        }

        // Rows should be ordered by FirstRef ascending (binary-search insertion).
        // Assert each row's FirstRef sorts canonically via VerseRef.CompareTo
        // (the structured ScriptureRange carries the start VerseRef directly).
        for (int i = 1; i < rows.Count; i++)
        {
            VerseRef prevRef = rows[i - 1].FirstRef!.Start;
            VerseRef currRef = rows[i].FirstRef!.Start;
            Assert.That(
                prevRef.CompareTo(currRef),
                Is.LessThanOrEqualTo(0),
                $"rows must be ordered by canonical VerseRef compare: "
                    + $"row {i - 1}={rows[i - 1].FirstRef}, row {i}={rows[i].FirstRef}"
            );
        }
    }

    // =====================================================================
    // GROUP H — Golden-master row count / cell count replay
    // (Groups C, D already cover the detailed shape; these three tests
    // collapse the top-line counts for quick-failure visibility.)
    // =====================================================================

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-109")]
    [Property("GoldenMaster", "gm-011")]
    [Description(
        "Group H.18 (gm-011 counts): top-line rowCount=4, all rows 2 cells. "
            + "Complements Group D.10 which asserts per-row merged paragraph counts."
    )]
    public void BuildRowsMergingCells_Gm011_Replay_Matches_RowCountAndCellCountPerRow()
    {
        var col0 = new List<ChecklistCell>
        {
            Cell("EXO 20:1", "one "),
            Cell("EXO 20:2", "two "),
            Cell("EXO 20:3", "three "),
            BridgeCell("EXO 20:4", "EXO 20:4-6", "4-6", "four to six "),
            Cell("EXO 20:7", "seven "),
            Cell("EXO 20:8", "eight "),
        };
        var col1 = new List<ChecklistCell>
        {
            Cell("EXO 20:1", "uno "),
            BridgeCell("EXO 20:2", "EXO 20:2-3", "2-3", "dos a tres "),
            Cell("EXO 20:4", "cuatro "),
            Cell("EXO 20:5", "cinco "),
            BridgeCell("EXO 20:6", "EXO 20:6-7", "6-7", "seis a siete "),
            Cell("EXO 20:8", "ocho "),
        };

        var rows = ChecklistRowBuilder.BuildRowsMergingCells(new() { col0, col1 });

        Assert.That(rows.Count, Is.EqualTo(4));
        Assert.That(rows.All(r => r.Cells.Count == 2), Is.True);
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-109")]
    [Property("GoldenMaster", "gm-012")]
    [Description(
        "Group H.19 (gm-012 counts): top-line rowCount=5, all rows 2 cells. "
            + "Rows 0/1/3/4 have empty col 0 placeholders."
    )]
    public void BuildRowsMergingCells_Gm012_Replay_Matches_RowCountAndEmptyCellPattern()
    {
        var col0 = new List<ChecklistCell> { Cell("EXO 20:5", "five "), Cell("EXO 20:6", "six ") };
        var col1 = new List<ChecklistCell>
        {
            BridgeCell("EXO 20:1", "EXO 20:1-2", "1-2", "uno a dos "),
            BridgeCell("EXO 20:3", "EXO 20:3-4", "3-4", "tres a cuatro "),
            BridgeCell("EXO 20:5", "EXO 20:5-6", "5-6", "cinco a seis "),
            Cell("EXO 20:7", "siete "),
            Cell("EXO 20:8", "ocho "),
        };

        var rows = ChecklistRowBuilder.BuildRowsMergingCells(new() { col0, col1 });

        Assert.That(rows.Count, Is.EqualTo(5));
        Assert.That(rows.All(r => r.Cells.Count == 2), Is.True);

        int emptyCol0Count = rows.Count(r => IsEmptyPlaceholder(r.Cells[0]));
        Assert.That(emptyCol0Count, Is.EqualTo(4), "gm-012 has 4 rows with empty col 0");
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-109")]
    [Property("GoldenMaster", "gm-013")]
    [Property("Invariant", "INV-006")]
    [Description(
        "Group H.20 (gm-013 counts): top-line rowCount=2, all rows 2 cells. "
            + "Row 1 col 0 merges exactly 3 paragraphs (MAX_CELLS_TO_GRAB)."
    )]
    public void BuildRowsMergingCells_Gm013_Replay_Matches_RowCountAndMergedCellCount()
    {
        var col0 = new List<ChecklistCell>
        {
            Cell("EXO 20:1", "one "),
            BridgeCell("EXO 20:2", "EXO 20:2-5", "2-5", "two to five "),
            Cell("EXO 20:6", "six "),
            BridgeCell("EXO 20:7", "EXO 20:7-8", "7-8", "seven to eight "),
        };
        var col1 = new List<ChecklistCell>
        {
            Cell("EXO 20:1", "uno "),
            BridgeCell("EXO 20:4", "EXO 20:4-7", "4-7", "cuatro a siete "),
            BridgeCell("EXO 20:8", "EXO 20:8-9", "8-9", "ocho a nueve "),
        };

        var rows = ChecklistRowBuilder.BuildRowsMergingCells(new() { col0, col1 });

        Assert.That(rows.Count, Is.EqualTo(2));
        Assert.That(rows.All(r => r.Cells.Count == 2), Is.True);
        Assert.That(
            ParagraphCount(rows[1].Cells[0]),
            Is.EqualTo(3),
            "INV-006: gm-013 row 1 col 0 merges exactly 3 cells"
        );
    }
}
