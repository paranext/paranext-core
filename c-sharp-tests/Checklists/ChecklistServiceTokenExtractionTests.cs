using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Paranext.DataProvider.Checklists;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.Checklists;

/// <summary>
/// RED-phase contract tests for CAP-003 (USFM Token Extraction).
///
/// <para>
/// These tests will NOT compile until the implementer creates
/// <c>Paranext.DataProvider.Checklists.ChecklistService.GetTokensForBook</c> and the
/// <c>ChecklistParagraphTokens</c> helper record. That is intentional: the test file
/// IS the specification — the compile error is the first layer of the RED signal; the
/// test assertion failures are the second. (Matches the CAP-001/CAP-002/CAP-007
/// precedents — see <c>ChecklistDataModelTests.cs:10-17</c> and
/// <c>MarkersDataSourceTests.cs:9-20</c>.)
/// </para>
///
/// <para>
/// Scope: the single public extraction method and its helper record. Downstream
/// orchestration (cell construction, row alignment, the full pipeline shape tested by
/// gm-009 / gm-010 / gm-016) lives under CAP-004 and CAP-006. The revised CAP-003
/// success criteria (strategic-plan-backend.md §CAP-003, 2026-04-13) explicitly
/// delegate orchestration-level verification to CAP-006; this file asserts the
/// token-level postconditions directly on <c>List&lt;ChecklistParagraphTokens&gt;</c>.
/// </para>
///
/// Traceability:
///   - Capability: CAP-003
///   - Behaviors: BHV-108 (primary), BHV-119 (transitive), BHV-120 (transitive)
///   - Extractions: EXT-008 (method), EXT-012 (helper record)
///   - Invariants: INV-009 (heading verse reference assignment)
///   - Contract: data-contracts.md §4.1 (within BuildChecklistData)
///   - PT9 source: Paratext/Checklists/CLParagraphCellsDataSource.cs:50-135
/// </summary>
[TestFixture]
internal class ChecklistServiceTokenExtractionTests
{
    // ---------------------------------------------------------------------
    // Shared helpers
    // ---------------------------------------------------------------------

    /// <summary>
    /// A <see cref="DummyScrStylesheet"/> subclass that adds \q, \q1, \q2, \b as
    /// paragraph markers with <c>scVerseText + scParagraphStyle</c>. Required by
    /// test USFM taken from gm-009 / gm-016 which use poetry styles.
    /// </summary>
    /// <remarks>
    /// Uses reflection on the protected <c>AddTagInternal</c> method because the
    /// PT9 <see cref="ScrStylesheet"/> API does not expose a public single-tag
    /// additive entry point and the paranext-core <see cref="DummyScrStylesheet"/>
    /// does not include <c>AddPoetryStyles</c>. Keeping this inside the test file
    /// avoids a cross-capability change to shared infrastructure.
    /// </remarks>
    private sealed class PoetryStylesheet : DummyScrStylesheet
    {
        public PoetryStylesheet()
        {
            AddPoetryTag("q");
            AddPoetryTag("q1");
            AddPoetryTag("q2");
            AddPoetryTag("b");
        }

        private void AddPoetryTag(string marker)
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
            addTagInternal.Invoke(this, new object[] { tag });
        }
    }

    /// <summary>
    /// Builds a <see cref="DummyScrText"/> whose default stylesheet includes poetry
    /// paragraph markers. Required for tests whose USFM contains \q / \q2.
    /// </summary>
    private static DummyScrText CreatePoetryProject()
    {
        var scrText = new DummyScrText();
        // Replace the cached default stylesheet with our poetry-aware variant.
        // DummyScrText sets this in its constructor via cachedDefaultStylesheet.Set(...),
        // but uses private reflection on protected internals of ScrText. We rely on
        // the fact that DummyScrText's construction path already populates a
        // stylesheet, and we need a different one for poetry. The public
        // ScrStylesheet(...) override path is used via reflection.
        var cachedFieldDefault = typeof(ScrText).GetField(
            "cachedDefaultStylesheet",
            BindingFlags.Instance | BindingFlags.NonPublic
        );
        var cachedFieldFrontBack = typeof(ScrText).GetField(
            "cachedFrontBackStylesheet",
            BindingFlags.Instance | BindingFlags.NonPublic
        );
        if (cachedFieldDefault == null || cachedFieldFrontBack == null)
        {
            throw new InvalidOperationException(
                "ScrText.cachedDefaultStylesheet / cachedFrontBackStylesheet fields "
                    + "not found via reflection; API has changed."
            );
        }

        var cachedDefault = cachedFieldDefault.GetValue(scrText);
        var cachedFrontBack = cachedFieldFrontBack.GetValue(scrText);
        var setMethod = cachedDefault!
            .GetType()
            .GetMethod("Set", BindingFlags.Instance | BindingFlags.Public);
        if (setMethod == null)
        {
            throw new InvalidOperationException(
                "Cached<T>.Set not found via reflection; API has changed."
            );
        }

        var poetry = new PoetryStylesheet();
        setMethod.Invoke(cachedDefault, new object[] { poetry });
        setMethod.Invoke(cachedFrontBack, new object[] { poetry });
        return scrText;
    }

    /// <summary>Seeds USFM content for a single book on the given ScrText.</summary>
    private static void LoadUsfm(DummyScrText scrText, int bookNum, string usfm)
    {
        scrText.PutText(bookNum, 0, false, usfm, null);
    }

    /// <summary>
    /// Default heading markers set derived from a stylesheet's
    /// scSection+scParagraphStyle tags. We compute this locally rather than going
    /// through BHV-120's <c>HeadingMarkers()</c> to keep token-extraction tests
    /// independent of CAP-002's leaf logic — the capability under test consumes
    /// the set passed in by its caller.
    /// </summary>
    private static HashSet<string> BuildHeadingMarkers()
    {
        // DummyScrStylesheet defines 's' as the only scSection+scParagraphStyle tag.
        return new HashSet<string> { "s", "s1", "s2", "s3", "mt" };
    }

    private static HashSet<string> BuildNonHeadingParagraphMarkers()
    {
        // Verse-text paragraph styles from DummyScrStylesheet + PoetryStylesheet.
        return new HashSet<string> { "p", "nb", "q", "q1", "q2", "b", "m" };
    }

    // =====================================================================
    // BHV-108 — GetTokensForBook (primary happy-path + filter)
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("Contract", "GetTokensForBook")]
    [Property("ScenarioId", "TS-023")]
    [Property("BehaviorId", "BHV-108")]
    public void GetTokensForBook_Happy_CollectsParagraphTokensAndSkipsNotes()
    {
        // TS-023 (first half): a \p paragraph containing a \f...\f* footnote is
        // emitted as a single CLParagraphTokens entry whose Tokens do NOT include
        // any note content. The footnote body ("A footnote.") must be absent.
        var scrText = CreatePoetryProject();
        const int BookNum = 2; // EXO
        LoadUsfm(
            scrText,
            BookNum,
            @"\id EXO \c 20 \p \v 1 one.\f + \fr 20:1 \ft A footnote.\f* More text. \v 2 two,"
        );

        var filter = new HashSet<string> { "p", "q", "q2" };
        var result = ChecklistService.GetTokensForBook(
            scrText,
            BookNum,
            filter,
            BuildHeadingMarkers(),
            BuildNonHeadingParagraphMarkers()
        );

        Assert.That(result, Is.Not.Null);
        Assert.That(
            result.Count,
            Is.EqualTo(1),
            "exactly one paragraph entry expected for the single \\p marker"
        );
        var para = result[0];
        Assert.That(para.Marker, Is.EqualTo("p"));
        Assert.That(para.IsHeading, Is.False);

        // The footnote content must not appear in any of the collected tokens.
        foreach (var tok in para.Tokens)
        {
            Assert.That(
                tok.Text ?? string.Empty,
                Does.Not.Contain("A footnote"),
                "note body must be skipped (state.NoteTag != null branch)"
            );
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("Contract", "GetTokensForBook")]
    [Property("ScenarioId", "TS-023")]
    [Property("BehaviorId", "BHV-108")]
    public void GetTokensForBook_Happy_CollectsParagraphTokensAndSkipsFigures()
    {
        // TS-023 (second half): a \fig ... \fig* figure inside a paragraph is
        // stripped from the collected tokens. Same USFM shape as gm-009 so the
        // test also serves as a token-level gm-009 slice.
        var scrText = CreatePoetryProject();
        const int BookNum = 2;
        LoadUsfm(
            scrText,
            BookNum,
            @"\id EXO \c 20 \p \v 1 one. More text. \v 2 two, \q poetry \fig desc|file.jpg\fig* more"
        );

        var filter = new HashSet<string> { "p", "q" };
        var result = ChecklistService.GetTokensForBook(
            scrText,
            BookNum,
            filter,
            BuildHeadingMarkers(),
            BuildNonHeadingParagraphMarkers()
        );

        // The \fig and its closing \fig* are character tokens with CharTag.Marker == "fig"
        // and are skipped entirely, so the figure description and filename must
        // not appear in any collected token's text.
        var allText = string.Concat(
            result.SelectMany(p => p.Tokens.Select(t => t.Text ?? string.Empty))
        );
        Assert.That(allText, Does.Not.Contain("file.jpg"), "figure metadata must be skipped");
        Assert.That(allText, Does.Not.Contain("desc"), "figure description must be skipped");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("Contract", "GetTokensForBook")]
    [Property("ScenarioId", "TS-024")]
    [Property("BehaviorId", "BHV-108")]
    [Property("InvariantId", "INV-009")]
    public void GetTokensForBook_HeadingMarker_TakesVerseRefOfNextNonHeadingParagraph()
    {
        // TS-024 / INV-009 / gm-010 slice: a \s heading followed by a \p paragraph
        // at \v 1 — the heading's VerseRefStart must resolve to the verse ref of
        // the following \p's first verse (v1), not to chapter:0.
        var scrText = CreatePoetryProject();
        const int BookNum = 2; // EXO (gm-010 uses EXO)
        LoadUsfm(scrText, BookNum, @"\id EXO \c 20 \s Section \p \v 1 one. \v 2 two,");

        var filter = new HashSet<string> { "s", "p" };
        var result = ChecklistService.GetTokensForBook(
            scrText,
            BookNum,
            filter,
            BuildHeadingMarkers(),
            BuildNonHeadingParagraphMarkers()
        );

        var heading = result.FirstOrDefault(p => p.Marker == "s");
        Assert.That(heading, Is.Not.Null, "section head paragraph must be emitted");
        Assert.That(heading!.IsHeading, Is.True);
        Assert.That(
            heading.VerseRefStart.ChapterNum,
            Is.EqualTo(20),
            "heading chapter must match the chapter that contains it"
        );
        Assert.That(
            heading.VerseRefStart.VerseNum,
            Is.EqualTo(1),
            "INV-009: heading VerseRefStart must be the next non-heading paragraph's verse (v1)"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("Contract", "GetTokensForBook")]
    [Property("BehaviorId", "BHV-108")]
    [Property("InvariantId", "INV-009")]
    public void GetTokensForBook_HeadingBeforeChapter_StopsForwardScanAtChapter()
    {
        // FB-35863 regression guard (baked into PT9 FindVerseRefForParagraph):
        // when a section head mistakenly appears before a \c chapter marker, the
        // forward scan must STOP at the chapter and keep the heading's current
        // reference — it must not leak into the next chapter.
        var scrText = CreatePoetryProject();
        const int BookNum = 2;
        LoadUsfm(
            scrText,
            BookNum,
            @"\id EXO \c 19 \p \v 1 last. \s OutOfPlaceHeading \c 20 \p \v 1 first of 20."
        );

        var filter = new HashSet<string> { "s", "p" };
        var result = ChecklistService.GetTokensForBook(
            scrText,
            BookNum,
            filter,
            BuildHeadingMarkers(),
            BuildNonHeadingParagraphMarkers()
        );

        var heading = result.FirstOrDefault(p => p.Marker == "s");
        Assert.That(heading, Is.Not.Null);
        Assert.That(
            heading!.VerseRefStart.ChapterNum,
            Is.EqualTo(19),
            "heading must keep chapter 19 — forward scan stops at the \\c marker per FB-35863"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("Contract", "GetTokensForBook")]
    [Property("ScenarioId", "TS-071")]
    [Property("BehaviorId", "BHV-108")]
    public void GetTokensForBook_MarkerNotInFilter_ExcludedFromResult()
    {
        // Filter mechanics (happy path variant of TS-071): a \q paragraph is
        // present in the USFM but not in the filter; it must be absent from the
        // result. This is the normal gating behaviour — "only desired paragraph
        // markers create new CLParagraphTokens entries".
        var scrText = CreatePoetryProject();
        const int BookNum = 2;
        LoadUsfm(scrText, BookNum, @"\id EXO \c 20 \p \v 1 one. \q \v 2 poetic");

        var filter = new HashSet<string> { "p" }; // deliberately omit "q"
        var result = ChecklistService.GetTokensForBook(
            scrText,
            BookNum,
            filter,
            BuildHeadingMarkers(),
            BuildNonHeadingParagraphMarkers()
        );

        Assert.That(
            result.Any(p => p.Marker == "q"),
            Is.False,
            "q is outside the filter and must not produce a paragraph entry"
        );
        Assert.That(
            result.Any(p => p.Marker == "p"),
            Is.True,
            "p is inside the filter and must produce a paragraph entry"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("Contract", "GetTokensForBook")]
    [Property("BehaviorId", "BHV-108")]
    public void GetTokensForBook_EmptyFilter_ProducesEmptyList()
    {
        // Defensive contract: the PT9 code path "if (desiredMarkers != null &&
        // !desiredMarkers.Contains(...)) continue" means an EMPTY filter accepts
        // NOTHING — the caller (orchestration) is responsible for passing the
        // full set of paragraph markers when no user filter is active. This test
        // pins that behavior so callers can rely on it.
        var scrText = CreatePoetryProject();
        const int BookNum = 2;
        LoadUsfm(scrText, BookNum, @"\id EXO \c 20 \p \v 1 one. \q \v 2 poetic");

        var result = ChecklistService.GetTokensForBook(
            scrText,
            BookNum,
            new HashSet<string>(), // empty
            BuildHeadingMarkers(),
            BuildNonHeadingParagraphMarkers()
        );

        Assert.That(
            result,
            Is.Empty,
            "empty filter means no paragraphs accepted; caller supplies full marker set"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("Contract", "GetTokensForBook")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-108")]
    public void GetTokensForBook_CharacterStyleTokens_PreservedNotSkipped()
    {
        // gm-016 / TS-031 token-level slice: \em ... \em* character-style tokens
        // are NOT in the skip predicate (only "fig" is). They must appear in the
        // collected Tokens list so downstream cell construction can render them
        // in parentheses per BHV-604. The display pipeline itself lives in CAP-006.
        var scrText = CreatePoetryProject();
        const int BookNum = 2;
        LoadUsfm(
            scrText,
            BookNum,
            @"\id EXO \c 20 \p \v 1 one. \v 2 two, \q poetry \q2 indented \em poetry\em*"
        );

        var filter = new HashSet<string> { "p", "q", "q2" };
        var result = ChecklistService.GetTokensForBook(
            scrText,
            BookNum,
            filter,
            BuildHeadingMarkers(),
            BuildNonHeadingParagraphMarkers()
        );

        // The q2 paragraph should include the \em tokens — we look for a token
        // whose Marker is "em" (the character-style tag) in any paragraph.
        var sawEm = result.SelectMany(p => p.Tokens).Any(t => t.Marker == "em");
        Assert.That(
            sawEm,
            Is.True,
            "character-style tokens (\\em) must be preserved — only fig tokens are skipped"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("Contract", "GetTokensForBook")]
    [Property("BehaviorId", "BHV-108")]
    public void GetTokensForBook_MultiplePoetryParagraphs_ProducesOneEntryPerParaStart()
    {
        // gm-009 token-level slice: the USFM "\p ... \q ... \q2 ..." produces
        // three distinct paragraph entries, one per ParaStart. This pins that
        // a new ChecklistParagraphTokens is created at every qualifying ParaStart,
        // matching PT9's line "if (state.ParaStart) paragraphTokens = null;"
        // followed by the new-paragraph creation.
        var scrText = CreatePoetryProject();
        const int BookNum = 2;
        LoadUsfm(
            scrText,
            BookNum,
            @"\id EXO \c 20 \p \v 1 one. \v 2 two, \q poetry more \q2 indented poetry"
        );

        var filter = new HashSet<string> { "p", "q", "q2" };
        var result = ChecklistService.GetTokensForBook(
            scrText,
            BookNum,
            filter,
            BuildHeadingMarkers(),
            BuildNonHeadingParagraphMarkers()
        );

        Assert.That(result.Count, Is.EqualTo(3), "one paragraph entry per ParaStart");
        Assert.That(result[0].Marker, Is.EqualTo("p"));
        Assert.That(result[1].Marker, Is.EqualTo("q"));
        Assert.That(result[2].Marker, Is.EqualTo("q2"));
        // Non-heading paragraphs should be flagged as such.
        Assert.That(result.All(p => !p.IsHeading), Is.True);
    }

    // =====================================================================
    // EXT-012 / BHV-119 — ChecklistParagraphTokens record
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("Contract", "ChecklistParagraphTokens")]
    [Property("BehaviorId", "BHV-108")]
    public void ChecklistParagraphTokens_Record_StoresVerseRefMarkerIsHeadingTokens()
    {
        // Helper-record shape: VerseRefStart, Marker, IsHeading, Tokens must all
        // be settable via construction and exposed via property reads. No other
        // public surface is asserted — a positional record suffices.
        var vref = new VerseRef("GEN", "1", "1", ScrVers.English);
        var tokens = new List<UsfmToken>();

        var paraTokens = new ChecklistParagraphTokens(
            VerseRefStart: vref,
            Marker: "p",
            IsHeading: false,
            Tokens: tokens
        );

        Assert.That(paraTokens.VerseRefStart, Is.EqualTo(vref));
        Assert.That(paraTokens.Marker, Is.EqualTo("p"));
        Assert.That(paraTokens.IsHeading, Is.False);
        Assert.That(paraTokens.Tokens, Is.SameAs(tokens));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("Contract", "ChecklistParagraphTokens")]
    [Property("BehaviorId", "BHV-108")]
    public void ChecklistParagraphTokens_IsHeadingTrue_ForHeadingMarker()
    {
        // IsHeading is PT10-only and must be populated correctly at construction
        // (and consistent with what GetTokensForBook would produce for an \s
        // paragraph emitted through headingMarkers).
        var vref = new VerseRef("GEN", "1", "1", ScrVers.English);
        var paraTokens = new ChecklistParagraphTokens(
            VerseRefStart: vref,
            Marker: "s",
            IsHeading: true,
            Tokens: new List<UsfmToken>()
        );

        Assert.That(paraTokens.IsHeading, Is.True);
        Assert.That(paraTokens.Marker, Is.EqualTo("s"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("Contract", "ChecklistParagraphTokens.ReferenceInRange")]
    [Property("ScenarioId", "TS-056")]
    [Property("BehaviorId", "BHV-119")]
    public void ChecklistParagraphTokens_ReferenceInRange_VerseBridgeOverlapsRange_ReturnsTrue()
    {
        // TS-056 / BHV-119: a paragraph with VerseRefStart "LUK 3:24-38" (a verse
        // bridge) against range [LUK 3:1, LUK 3:38]. AllVerses() must expand the
        // bridge to the individual verses and at least one must fall inside the
        // range → returns true.
        var bridge = new VerseRef("LUK", "3", "24-38", ScrVers.English);
        var startRef = new VerseRef("LUK", "3", "1", ScrVers.English);
        var endRef = new VerseRef("LUK", "3", "38", ScrVers.English);

        var paraTokens = new ChecklistParagraphTokens(
            VerseRefStart: bridge,
            Marker: "p",
            IsHeading: false,
            Tokens: new List<UsfmToken>()
        );

        Assert.That(paraTokens.ReferenceInRange(startRef, endRef), Is.True);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("Contract", "ChecklistParagraphTokens.ReferenceInRange")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "BHV-119")]
    public void ChecklistParagraphTokens_ReferenceInRange_FullyOutsideRange_ReturnsFalse()
    {
        // TS-057: paragraph at LUK 4:1 against range [LUK 1:1, LUK 3:38].
        // No overlap → returns false.
        var para = new VerseRef("LUK", "4", "1", ScrVers.English);
        var startRef = new VerseRef("LUK", "1", "1", ScrVers.English);
        var endRef = new VerseRef("LUK", "3", "38", ScrVers.English);

        var paraTokens = new ChecklistParagraphTokens(
            VerseRefStart: para,
            Marker: "p",
            IsHeading: false,
            Tokens: new List<UsfmToken>()
        );

        Assert.That(paraTokens.ReferenceInRange(startRef, endRef), Is.False);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("Contract", "ChecklistParagraphTokens.ReferenceInRange")]
    [Property("BehaviorId", "BHV-119")]
    public void ChecklistParagraphTokens_ReferenceInRange_DefaultStartRef_MatchesAnyVerse()
    {
        // PT9 short-circuit: when startRef.IsDefault is true, the "vref >= startRef"
        // side of the predicate is treated as satisfied. A paragraph at LUK 1:1
        // against [default, LUK 3:38] must therefore be considered in range.
        var para = new VerseRef("LUK", "1", "1", ScrVers.English);
        var defaultStart = new VerseRef(); // IsDefault
        var endRef = new VerseRef("LUK", "3", "38", ScrVers.English);

        var paraTokens = new ChecklistParagraphTokens(
            VerseRefStart: para,
            Marker: "p",
            IsHeading: false,
            Tokens: new List<UsfmToken>()
        );

        Assert.That(defaultStart.IsDefault, Is.True, "pre-check: default VerseRef sentinel");
        Assert.That(paraTokens.ReferenceInRange(defaultStart, endRef), Is.True);
    }
}
