using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Paranext.DataProvider.Checklists;
using Paratext.Data;
using PtxUtils;
using SIL.Scripture;

namespace TestParanextDataProvider.Checklists;

/// <summary>
/// RED-phase contract tests for CAP-004 (Cell Construction —
/// <c>GetCellsForBook</c> + internal <c>BuildCLCell</c>).
///
/// <para>
/// These tests will NOT compile until the implementer adds
/// <c>Paranext.DataProvider.Checklists.ChecklistService.GetCellsForBook</c>
/// (see CAP-003's precedent — the compile error is the first layer of the RED
/// signal; <see cref="NotImplementedException"/> from a stub body is the
/// second). Matches the CAP-001 / CAP-002 / CAP-003 / CAP-007 RED pattern.
/// </para>
///
/// <para>
/// Scope: the single public cell-construction method. Downstream orchestration
/// (row alignment via CAP-005, end-to-end BuildChecklistData via CAP-006,
/// inline edit-link emission via CAP-012) is covered by those capabilities'
/// own tests. Per strategic-plan-backend.md §CAP-004 (revised 2026-04-13),
/// orchestration-level verification of gm-015 / gm-019 is delegated to
/// CAP-006's integration tests; this file asserts the cell-level
/// postconditions directly on the <c>List&lt;ChecklistCell&gt;</c> returned
/// by <see cref="ChecklistService.GetCellsForBook"/>.
/// </para>
///
/// Traceability:
///   - Capability: CAP-004
///   - Behaviors: BHV-114 (primary)
///   - Extractions: EXT-011 (GetCellsForBook + BuildCLCell)
///   - Invariants: VAL-007 (edit link — actual emission gate is CAP-012; CAP-004
///     tests assert only the cell structure supports it)
///   - Scenarios: TS-029, TS-030, TS-050, TS-051, TS-052 (deferred per
///     DEF-BE-001), TS-058
///   - Contract: data-contracts.md §4.1 (BHV-114 inside BuildChecklistData),
///     §3.3 (ChecklistCell), §3.4 (ChecklistParagraph), §3.5 (content items)
///   - PT9 source: Paratext/Checklists/CLDataSource.cs:191-433
/// </summary>
[TestFixture]
internal class ChecklistServiceCellConstructionTests
{
    // ---------------------------------------------------------------------
    // Shared helpers
    // ---------------------------------------------------------------------

    /// <summary>Seeds USFM content for a single book on the given ScrText.</summary>
    private static void LoadUsfm(DummyScrText scrText, int bookNum, string usfm)
    {
        scrText.PutText(bookNum, 0, false, usfm, null);
    }

    /// <summary>
    /// Default heading marker set — mirrors what BHV-120 would return for the
    /// shared <see cref="DummyScrStylesheet"/> (which defines <c>s</c> as the
    /// only scSection+scParagraphStyle tag).
    /// </summary>
    private static HashSet<string> BuildHeadingMarkers() => new() { "s", "s1", "s2", "s3", "mt" };

    /// <summary>
    /// Default non-heading paragraph marker set for the shared
    /// <see cref="DummyScrStylesheet"/> (tags where TextType==scVerseText AND
    /// StyleType==scParagraphStyle).
    /// </summary>
    private static HashSet<string> BuildNonHeadingParagraphMarkers() => new() { "p", "nb" };

    /// <summary>
    /// Builds a paragraph-token list for a book by running the (already-green)
    /// CAP-003 <see cref="ChecklistService.GetTokensForBook"/> — this pre-filter
    /// is what CAP-004 consumes in production. Tests that need to probe CAP-004
    /// in isolation can still construct <see cref="ChecklistParagraphTokens"/>
    /// directly (see the range-filter tests below).
    /// </summary>
    private static List<ChecklistParagraphTokens> TokensFor(
        DummyScrText scrText,
        int bookNum,
        HashSet<string>? filter = null
    )
    {
        return ChecklistService.GetTokensForBook(
            scrText,
            bookNum,
            filter ?? new HashSet<string> { "p", "s", "nb" },
            BuildHeadingMarkers(),
            BuildNonHeadingParagraphMarkers()
        );
    }

    /// <summary>
    /// Counts TextItem content items nested inside all paragraphs across all
    /// cells. Used by shape assertions that care about text-token coverage
    /// without pinning exact wording (which is sensitive to post-processing
    /// decisions owned elsewhere).
    /// </summary>
    private static int CountTextItems(IEnumerable<ChecklistCell> cells) =>
        cells.SelectMany(c => c.Paragraphs).SelectMany(p => p.Items).OfType<TextItem>().Count();

    private static int CountVerseItems(IEnumerable<ChecklistCell> cells) =>
        cells.SelectMany(c => c.Paragraphs).SelectMany(p => p.Items).OfType<VerseItem>().Count();

    private static int CountEditLinkItems(IEnumerable<ChecklistCell> cells) =>
        cells.SelectMany(c => c.Paragraphs).SelectMany(p => p.Items).OfType<EditLinkItem>().Count();

    /// <summary>
    /// Flips the RTL flag on a live <see cref="DummyScrText"/> by setting
    /// <c>scrText.Language.RightToLeft</c> (which writes through to the
    /// underlying WritingSystemDefinition — <see cref="ScrLanguage.RightToLeft"/>
    /// setter at <c>ParatextData/Languages/ScrLanguage.cs:327-330</c>).
    /// </summary>
    /// <remarks>
    /// Falls back to reflection on <c>wsDef.RightToLeftScript</c> if the
    /// public setter is unavailable in the linked ParatextData version.
    /// </remarks>
    private static void ForceRightToLeft(DummyScrText scrText)
    {
        try
        {
            scrText.Language.RightToLeft = true;
            return;
        }
        catch (Exception)
        {
            // fall through to reflection
        }

        var langObj = scrText.Language;
        var wsDefField =
            langObj
                .GetType()
                .GetField(
                    "wsDef",
                    BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public
                )
            ?? langObj
                .GetType()
                .BaseType?.GetField(
                    "wsDef",
                    BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public
                );
        if (wsDefField == null)
        {
            throw new InvalidOperationException(
                "ScrLanguage.wsDef not found via reflection; RTL test helper must be updated."
            );
        }
        var wsDef = wsDefField.GetValue(langObj);
        var rtlProp = wsDef!.GetType().GetProperty("RightToLeftScript");
        if (rtlProp == null || !rtlProp.CanWrite)
        {
            throw new InvalidOperationException(
                "WritingSystemDefinition.RightToLeftScript not writable; RTL test helper must be updated."
            );
        }
        rtlProp.SetValue(wsDef, true);
    }

    // =====================================================================
    // BHV-114 — Happy-path cell construction (TS-029 / gm-015 shape)
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("Contract", "GetCellsForBook")]
    [Property("ScenarioId", "TS-029")]
    [Property("BehaviorId", "BHV-114")]
    public void GetCellsForBook_Happy_EmitsCellsWithParagraphsAndItems()
    {
        // TS-029 / gm-015 shape: a single \p paragraph with \v 1 ... \v 2 ...
        // should produce at least one cell with a paragraph containing verse
        // and text content items. We deliberately assert the TOKEN-level shape
        // (verse + text items present, paragraph marker set) and not the
        // PostProcessParagraph artifact ("\\p" backslash-prefixed TextItem at
        // index 0) because PostProcessParagraph placement is a CAP-006
        // orchestration decision per the plan file.
        var scrText = new DummyScrText();
        const int BookNum = 2; // EXO
        LoadUsfm(scrText, BookNum, @"\id EXO \c 20 \p \v 1 one. \v 2 two. \v 3 three.");

        var paragraphs = TokensFor(scrText, BookNum);
        var startRef = new VerseRef("EXO", "20", "1", scrText.Settings.Versification);
        var endRef = new VerseRef("EXO", "20", "20", scrText.Settings.Versification);

        List<ChecklistCell> cells = ChecklistService.GetCellsForBook(
            scrText,
            BookNum,
            startRef,
            endRef,
            paragraphs
        );

        Assert.That(cells, Is.Not.Null);
        Assert.That(cells, Is.Not.Empty, "at least one cell expected for the \\p paragraph");
        var firstCell = cells[0];
        Assert.That(firstCell.Paragraphs, Is.Not.Null);
        Assert.That(firstCell.Paragraphs, Is.Not.Empty, "cell must contain at least one paragraph");
        Assert.That(
            firstCell.Paragraphs[0].Marker,
            Is.EqualTo("p"),
            "paragraph marker recorded from UsfmTokenType.Paragraph token"
        );
        Assert.That(
            CountVerseItems(cells),
            Is.GreaterThanOrEqualTo(3),
            "three \\v tokens -> three VerseItems"
        );
        Assert.That(
            CountTextItems(cells),
            Is.GreaterThanOrEqualTo(3),
            "three verse-text tokens -> three TextItems (ignoring post-processing)"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("Contract", "GetCellsForBook")]
    [Property("ScenarioId", "TS-029")]
    [Property("BehaviorId", "BHV-114")]
    public void GetCellsForBook_TextTokens_ProduceTextItems()
    {
        // TS-029 slice: each UsfmTokenType.Text token becomes a TextItem
        // carrying the token's text. We assert on a distinctive string so the
        // test survives whitespace-trimming decisions (PT9 includes trailing
        // spaces; PT10 may or may not preserve them).
        var scrText = new DummyScrText();
        const int BookNum = 2;
        LoadUsfm(
            scrText,
            BookNum,
            @"\id EXO \c 20 \p \v 1 distinctive-text-one \v 2 distinctive-text-two"
        );

        var paragraphs = TokensFor(scrText, BookNum);
        var result = ChecklistService.GetCellsForBook(
            scrText,
            BookNum,
            new VerseRef(),
            new VerseRef(),
            paragraphs
        );

        var allText = string.Concat(
            result
                .SelectMany(c => c.Paragraphs)
                .SelectMany(p => p.Items)
                .OfType<TextItem>()
                .Select(t => t.Text)
        );
        Assert.That(
            allText,
            Does.Contain("distinctive-text-one"),
            "first verse's text content must appear in a TextItem"
        );
        Assert.That(
            allText,
            Does.Contain("distinctive-text-two"),
            "second verse's text content must appear in a TextItem"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("Contract", "GetCellsForBook")]
    [Property("ScenarioId", "TS-029")]
    [Property("BehaviorId", "BHV-114")]
    public void GetCellsForBook_VerseTokens_ProduceVerseItems()
    {
        // TS-029 slice: each UsfmTokenType.Verse token becomes a VerseItem
        // whose VerseNumber is the verse number data (handles bridges like "4-6").
        var scrText = new DummyScrText();
        const int BookNum = 2;
        LoadUsfm(scrText, BookNum, @"\id EXO \c 20 \p \v 1 one. \v 4-6 bridged.");

        var paragraphs = TokensFor(scrText, BookNum);
        var result = ChecklistService.GetCellsForBook(
            scrText,
            BookNum,
            new VerseRef(),
            new VerseRef(),
            paragraphs
        );

        var verseNumbers = result
            .SelectMany(c => c.Paragraphs)
            .SelectMany(p => p.Items)
            .OfType<VerseItem>()
            .Select(v => v.VerseNumber)
            .ToList();
        Assert.That(verseNumbers, Does.Contain("1"));
        Assert.That(verseNumbers, Does.Contain("4-6"), "verse bridge must be preserved verbatim");
    }

    // =====================================================================
    // BHV-114 — Character style preservation (gm-016 token-level slice)
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("Contract", "GetCellsForBook")]
    [Property("BehaviorId", "BHV-114")]
    public void GetCellsForBook_TextInsideCharacterStyle_CarriesCharacterStyleMarker()
    {
        // BHV-114 PT9 line 307-309: text tokens record their active CharTag via
        // `state.CharTag != null ? state.CharTag.Marker : ""`. The resulting
        // TextItem's CharacterStyle must carry the character-style marker (e.g.,
        // "em") for downstream parenthesized-display formatting (BHV-604).
        var scrText = new DummyScrText();
        const int BookNum = 2;
        // Note: stick to markers present in DummyScrStylesheet (p, em) so the
        // tokenizer recognises them. gm-016 uses \q2 which requires poetry styles
        // — that's a CAP-006 orchestration concern, not a CAP-004 shape concern.
        LoadUsfm(scrText, BookNum, @"\id EXO \c 20 \p \v 1 plain \em styled\em* after");

        var paragraphs = TokensFor(scrText, BookNum);
        var result = ChecklistService.GetCellsForBook(
            scrText,
            BookNum,
            new VerseRef(),
            new VerseRef(),
            paragraphs
        );

        var styled = result
            .SelectMany(c => c.Paragraphs)
            .SelectMany(p => p.Items)
            .OfType<TextItem>()
            .FirstOrDefault(t => (t.Text ?? string.Empty).Contains("styled"));
        Assert.That(styled, Is.Not.Null, "text inside \\em span must appear as a TextItem");
        Assert.That(
            styled!.CharacterStyle,
            Is.EqualTo("em"),
            "TextItem.CharacterStyle must match the active CharTag.Marker (PT9 line 307-309)"
        );
    }

    // =====================================================================
    // BHV-114 — Range filtering (TS-030)
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("Contract", "GetCellsForBook")]
    [Property("ScenarioId", "TS-030")]
    [Property("BehaviorId", "BHV-114")]
    public void GetCellsForBook_ParagraphsOutsideRange_Excluded()
    {
        // TS-030: paragraphs whose VerseRefStart is outside [startRef, endRef]
        // are filtered out. We hand-construct two ChecklistParagraphTokens —
        // one at EXO 20:1 (in range) and one at EXO 21:1 (out of range) — so
        // the assertion targets GetCellsForBook's range check directly without
        // depending on GetTokensForBook's own behavior.
        var scrText = new DummyScrText();
        const int BookNum = 2;
        LoadUsfm(scrText, BookNum, @"\id EXO \c 20 \p \v 1 in-range \c 21 \p \v 1 out-of-range");

        var paragraphs = TokensFor(scrText, BookNum);
        Assume.That(
            paragraphs.Count,
            Is.GreaterThanOrEqualTo(2),
            "test precondition — two \\p paragraphs must be emitted"
        );

        var startRef = new VerseRef("EXO", "20", "1", scrText.Settings.Versification);
        var endRef = new VerseRef("EXO", "20", "10", scrText.Settings.Versification);
        var result = ChecklistService.GetCellsForBook(
            scrText,
            BookNum,
            startRef,
            endRef,
            paragraphs
        );

        // None of the produced cells should carry text from chapter 21.
        var allText = string.Concat(
            result
                .SelectMany(c => c.Paragraphs)
                .SelectMany(p => p.Items)
                .OfType<TextItem>()
                .Select(t => t.Text ?? string.Empty)
        );
        Assert.That(
            allText,
            Does.Not.Contain("out-of-range"),
            "paragraph at EXO 21:1 must be filtered out by the range check"
        );
        Assert.That(allText, Does.Contain("in-range"), "paragraph at EXO 20:1 must remain");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("Contract", "GetCellsForBook")]
    [Property("ScenarioId", "TS-030")]
    [Property("BehaviorId", "BHV-114")]
    public void GetCellsForBook_DefaultRangeBounds_IncludesAllParagraphs()
    {
        // TS-030 inverse: when both startRef/endRef are default (IsDefault==true),
        // ChecklistParagraphTokens.ReferenceInRange returns true for every
        // paragraph (short-circuit on IsDefault — BHV-119). All tokens must
        // participate in cell output.
        var scrText = new DummyScrText();
        const int BookNum = 2;
        LoadUsfm(
            scrText,
            BookNum,
            @"\id EXO \c 20 \p \v 1 first-para-text \c 21 \p \v 1 second-para-text"
        );

        var paragraphs = TokensFor(scrText, BookNum);
        var result = ChecklistService.GetCellsForBook(
            scrText,
            BookNum,
            new VerseRef(), // IsDefault
            new VerseRef(),
            paragraphs
        );

        var allText = string.Concat(
            result
                .SelectMany(c => c.Paragraphs)
                .SelectMany(p => p.Items)
                .OfType<TextItem>()
                .Select(t => t.Text ?? string.Empty)
        );
        Assert.That(allText, Does.Contain("first-para-text"));
        Assert.That(allText, Does.Contain("second-para-text"));
    }

    // =====================================================================
    // BHV-114 — Same-reference paragraph merge (PT9 AddContentToCurrentCell)
    // gm-019-shaped behavior without the Verses-checklist post-processing.
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("Contract", "GetCellsForBook")]
    [Property("BehaviorId", "BHV-114")]
    public void GetCellsForBook_DifferentReferences_ProduceDistinctCells()
    {
        // Different VerseRefs (\v 1 vs \v 2) at different paragraph starts ->
        // two distinct cells (gm-015 shape: cells walk verse by verse).
        var scrText = new DummyScrText();
        const int BookNum = 2;
        LoadUsfm(scrText, BookNum, @"\id EXO \c 20 \p \v 1 first \p \v 2 second");

        var paragraphs = TokensFor(scrText, BookNum);
        var result = ChecklistService.GetCellsForBook(
            scrText,
            BookNum,
            new VerseRef(),
            new VerseRef(),
            paragraphs
        );

        Assert.That(
            result.Count,
            Is.GreaterThanOrEqualTo(2),
            "two paragraphs with different VerseRefs must yield at least two cells"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("Contract", "GetCellsForBook")]
    [Property("BehaviorId", "BHV-114")]
    public void GetCellsForBook_SameReferenceParagraphs_MergedIntoOneCell()
    {
        // PT9 AddContentToCurrentCell (line 205-211): when the new cell's
        // VerseRef equals the previous cell's VerseRef (CompareTo == 0), the
        // new paragraphs are appended to the previous cell instead of creating
        // a new one. This is BHV-114's merge behavior for duplicate-ref paragraphs.
        //
        // We construct the same-reference scenario by hand-crafting two
        // ChecklistParagraphTokens with equal VerseRefStart values. (The USFM
        // path can't easily produce two paragraphs at an identical VerseRef
        // without relying on the Verses checklist's duplicate-verse shape.)
        var scrText = new DummyScrText();
        const int BookNum = 2;
        LoadUsfm(scrText, BookNum, @"\id EXO \c 20 \p \v 1 shared.");

        var realParagraphs = TokensFor(scrText, BookNum);
        Assume.That(
            realParagraphs,
            Is.Not.Empty,
            "test precondition — at least one paragraph token for \\p"
        );
        var real = realParagraphs[0];

        // Two synthetic paragraphs sharing VerseRefStart.
        var duplicate = new ChecklistParagraphTokens(
            VerseRefStart: real.VerseRefStart,
            Marker: real.Marker,
            IsHeading: real.IsHeading,
            Tokens: real.Tokens
        );
        var paragraphs = new List<ChecklistParagraphTokens> { real, duplicate };

        var result = ChecklistService.GetCellsForBook(
            scrText,
            BookNum,
            new VerseRef(),
            new VerseRef(),
            paragraphs
        );

        Assert.That(
            result.Count,
            Is.EqualTo(1),
            "two paragraphs sharing the same VerseRef must merge into one cell"
        );
        Assert.That(
            result[0].Paragraphs.Count,
            Is.GreaterThanOrEqualTo(2),
            "merged cell must contain both paragraphs"
        );
    }

    // =====================================================================
    // BHV-114 — RTL marker prefix (TS-058)
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("Contract", "GetCellsForBook")]
    [Property("ScenarioId", "TS-058")]
    [Property("BehaviorId", "BHV-114")]
    public void GetCellsForBook_RtlScrText_PrefixesTextWithRtlMarker()
    {
        // TS-058 / PT9 line 307: `scrText.RightToLeft ? StringUtils.rtlMarker + token.Text : token.Text`.
        // For an RTL-flagged ScrText, every TextItem's Text must begin with
        // PtxUtils.StringUtils.rtlMarker (U+200F, the Unicode RTL mark).
        var scrText = new DummyScrText();
        ForceRightToLeft(scrText);
        Assume.That(
            scrText.RightToLeft,
            Is.True,
            "precondition — ScrText.RightToLeft must be true after ForceRightToLeft"
        );

        const int BookNum = 2;
        LoadUsfm(scrText, BookNum, @"\id EXO \c 20 \p \v 1 rtl-content.");

        var paragraphs = TokensFor(scrText, BookNum);
        var result = ChecklistService.GetCellsForBook(
            scrText,
            BookNum,
            new VerseRef(),
            new VerseRef(),
            paragraphs
        );

        var textItems = result
            .SelectMany(c => c.Paragraphs)
            .SelectMany(p => p.Items)
            .OfType<TextItem>()
            .Where(t => !string.IsNullOrEmpty(t.Text))
            .ToList();
        Assert.That(
            textItems,
            Is.Not.Empty,
            "at least one TextItem must be produced for the verse text"
        );
        foreach (var item in textItems)
        {
            Assert.That(
                item.Text.StartsWith(StringUtils.rtlMarker.ToString()),
                Is.True,
                $"TextItem.Text must begin with StringUtils.rtlMarker when RTL; got: \"{item.Text}\""
            );
        }
    }

    // =====================================================================
    // VAL-007 — Edit link NOT emitted at CAP-004 boundary
    // (CAP-012 owns inline emission; TS-052 chapter-level is DEF-BE-001)
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("Contract", "GetCellsForBook")]
    [Property("ScenarioId", "TS-050")]
    [Property("BehaviorId", "BHV-114")]
    [Property("ValidationRule", "VAL-007")]
    public void GetCellsForBook_ProjectEditable_DoesNotEmitEditLinkItem()
    {
        // TS-050 at CAP-004's boundary: the strategic plan explicitly states
        // "actual permission check is CAP-012 inline; CAP-004 just emits the
        // cell structure". Therefore GetCellsForBook MUST NOT emit any
        // EditLinkItem, even when the ScrText is editable. The cell structure
        // it returns must simply be READY for CAP-012 to extend (Items list is
        // a concrete List<ChecklistContentItem>).
        var scrText = new DummyScrText();
        scrText.Settings.Editable = true;
        const int BookNum = 2;
        LoadUsfm(scrText, BookNum, @"\id EXO \c 20 \p \v 1 one.");

        var paragraphs = TokensFor(scrText, BookNum);
        var result = ChecklistService.GetCellsForBook(
            scrText,
            BookNum,
            new VerseRef(),
            new VerseRef(),
            paragraphs
        );

        Assert.That(
            CountEditLinkItems(result),
            Is.EqualTo(0),
            "CAP-004 must not emit EditLinkItem; CAP-012 owns inline emission"
        );
        // Sanity — the cell structure must be ready for CAP-012 to append:
        Assume.That(result, Is.Not.Empty, "precondition — at least one cell produced");
        Assert.That(
            result[0].Paragraphs,
            Is.Not.Empty,
            "cell must carry paragraphs so CAP-012 can append an EditLinkItem"
        );
        Assert.That(
            result[0].Paragraphs[0].Items,
            Is.Not.Null,
            "paragraph Items must be a non-null list (CAP-012 appends to it)"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("Contract", "GetCellsForBook")]
    [Property("ScenarioId", "TS-051")]
    [Property("BehaviorId", "BHV-114")]
    [Property("ValidationRule", "VAL-007")]
    public void GetCellsForBook_ProjectNotEditable_DoesNotEmitEditLinkItem()
    {
        // TS-051 at CAP-004's boundary: regardless of Editable=false, CAP-004
        // must not emit an EditLinkItem. This pins the separation of concerns
        // between CAP-004 (structure) and CAP-012 (gate).
        //
        // NOTE: PutText enforces Editable at write time (PtxUtils.SafetyCheckException
        // "The project you are viewing is not editable"), so we must seed
        // content BEFORE flipping Editable to false. The flag is read by
        // GetCellsForBook (via scrText.Settings.Editable), not PutText.
        var scrText = new DummyScrText();
        const int BookNum = 2;
        LoadUsfm(scrText, BookNum, @"\id EXO \c 20 \p \v 1 one.");
        scrText.Settings.Editable = false;

        var paragraphs = TokensFor(scrText, BookNum);
        var result = ChecklistService.GetCellsForBook(
            scrText,
            BookNum,
            new VerseRef(),
            new VerseRef(),
            paragraphs
        );

        Assert.That(
            CountEditLinkItems(result),
            Is.EqualTo(0),
            "CAP-004 must not emit EditLinkItem under any Editable setting"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("Contract", "GetCellsForBook")]
    [Property("ScenarioId", "TS-052")]
    [Property("BehaviorId", "BHV-114")]
    [Property("ValidationRule", "VAL-007")]
    [Property("DeferredUnder", "DEF-BE-001")]
    public void GetCellsForBook_ChapterLevelCanEditDeferred_NoEditLinkEmitted()
    {
        // TS-052 is deferred under DEF-BE-001 (no platform CanEdit(bookNum,
        // chapterNum) API). At CAP-004's boundary the observable contract is
        // unchanged from TS-050/TS-051: no EditLinkItem is emitted here
        // regardless of any hypothetical chapter-level predicate. This test
        // pins the invariant so a future re-introduction of chapter-level
        // CanEdit still lands in CAP-012, not CAP-004.
        var scrText = new DummyScrText();
        scrText.Settings.Editable = true; // project-level editable — chapter-level is the deferred bit
        const int BookNum = 2;
        LoadUsfm(scrText, BookNum, @"\id EXO \c 20 \p \v 1 one.");

        var paragraphs = TokensFor(scrText, BookNum);
        var result = ChecklistService.GetCellsForBook(
            scrText,
            BookNum,
            new VerseRef(),
            new VerseRef(),
            paragraphs
        );

        Assert.That(
            CountEditLinkItems(result),
            Is.EqualTo(0),
            "CAP-004 must not implement chapter-level CanEdit (deferred under DEF-BE-001)"
        );
    }

    // =====================================================================
    // Defensive — empty paragraph list
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("Contract", "GetCellsForBook")]
    [Property("BehaviorId", "BHV-114")]
    public void GetCellsForBook_EmptyParagraphList_ReturnsEmptyCellList()
    {
        // Defensive contract: an empty input produces an empty output without
        // throwing. Callers may legitimately pass the empty list when no
        // paragraphs pass the filter stage upstream (CAP-003).
        var scrText = new DummyScrText();
        const int BookNum = 2;

        var result = ChecklistService.GetCellsForBook(
            scrText,
            BookNum,
            new VerseRef(),
            new VerseRef(),
            new List<ChecklistParagraphTokens>()
        );

        Assert.That(result, Is.Not.Null);
        Assert.That(result, Is.Empty);
    }
}
