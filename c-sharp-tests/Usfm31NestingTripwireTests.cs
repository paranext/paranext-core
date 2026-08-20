using Paratext.Data.ProjectSettingsAccess;

namespace TestParanextDataProvider
{
    /// <summary>
    /// Upgrade tripwire for USFM 3.1 inline-marker nesting semantics.
    ///
    /// <para>
    /// The referenced ParatextData (9.5.0.22) supports only USFM 2 and 3.0: its
    /// <c>UsfmVersionOption</c> enum ends at <c>Version3</c>, and a project migrated to USFM 3.1
    /// in Paratext 9.6+ sets <c>MinParatextDataVersion 9.6.1.1</c>, which locks it out of this
    /// ParatextData entirely. So today Platform.Bible only ever opens USFM &lt;= 3.0 text, and the
    /// Standard-view editor's nesting behavior deliberately targets the &lt;= 3.0 rules
    /// exclusively.
    /// </para>
    ///
    /// <para>
    /// USFM 3.1 INVERTS the core inline-marker nesting rules. When the ParatextData package is
    /// upgraded to a 9.6+ version (adding <c>UsfmVersionOption.Version3_1</c>), this test fails
    /// until Platform.Bible honors the project's <c>&lt;UsfmVersion&gt;</c> setting wherever the
    /// &lt;= 3.0 rules are currently hard-coded. The full design context lives in the
    /// scripture-editors repo: docs/superpowers/specs/2026-07-24-nesting-alignment-design.md and,
    /// for the closer/attribute deltas below, the 2026-07-30 attribute-display W2-D findings
    /// (.superpowers/sdd/2026-07-30-attribute-display/w2d-pt9-findings.md). What must become
    /// version-switched (Paratext 9 reference sites in parentheses, verified against
    /// ~/source/repos/Paratext):
    /// </para>
    ///
    /// <para>
    /// 0. THE DRIVER: <c>ProjectSettings.RequiresPlusOnNestedStyles()</c>
    ///    (ProjectSettings.cs:2398-2401) returns true for &lt;= 3.0 and false for 3.1, and every
    ///    delta below branches on it. It already exists in this ParatextData (it is the &lt;= 3.0
    ///    "true" side); the tripwire fires on <c>Version3_1</c> because that is the enum value that
    ///    lets a project reach the "false" side. MinParatextDataVersion gate for 3.1 projects is
    ///    9.6.1.1 (ParatextInfo.cs:130).
    /// 1. Close-on-bare vs nest-by-default: in &lt;= 3.0 a char marker WITHOUT "+" closes ALL open
    ///    char styles before opening; in 3.1 a bare char marker NESTS by default and auto-closes
    ///    ONLY notesub -&gt; notesub (note-section marker into note-section marker), with the
    ///    ft -&gt; xt pair explicitly EXEMPTED so it does NOT auto-close
    ///    (UsfmParser.cs:530-546, CharacterStyleShouldAutomaticallyClose). Affects the
    ///    scripture-editors tokenizer's charOpen auto-close (usfmFragmentToUsj) and every
    ///    marker-edit path that relies on it (Tier-2 rebuilds re-tokenize visible glyph text).
    /// 2. "+" emission: in &lt;= 3.0 the writer emits "+" on the opener AND closer of any char
    ///    whose parent is a char (UsxFragmenter, "usePlusOnNestedStyles"); in 3.1 it never emits
    ///    "+" at all. Affects the editable marker glyph text (which mirrors the writer so Tier-2
    ///    round-trips are lossless) and the TS USJ-&gt;USFM serializer's nestedPrefix.
    /// 3. End-marker matching: &lt;= 3.0 expects "\+marker*" for nested closers; 3.1 matches bare
    ///    "\marker*" and reports a leftover "\+marker*" as unmatched (UsfmParser End-token case).
    /// 4. Verse boundaries: &lt;= 3.0 keeps char styles OPEN across \v (the verse milestone nests
    ///    inside the char); in 3.1 <c>\v</c> CLOSES all open char styles (UsfmParser.cs:250-253,
    ///    Verse case).
    /// 5. The is-closed lookahead is a DIFFERENT IMPLEMENTATION, not just a different outcome:
    ///    &lt;= 3.0 uses <c>LookaheadForClosingMarker</c> (a stack-shape test), 3.1 uses
    ///    <c>LookaheadForClosingMarkerUsfm31</c> (a note-section-marker STRUCTURAL test, bounded by
    ///    paragraph/verse; same-marker reopen counts as unclosed) — UsfmParser.cs:85-88, 703-746.
    ///    The two agree for an explicit "\marker*" closer but diverge on the implicit cases that
    ///    decide closed="false".
    /// 6. Export omits closed="false" in 3.1: the sink writes the attribute only when
    ///    <c>forExport &amp;&amp; !RequiresPlusOnNestedStyles</c> is false — i.e. a 3.1 EXPORT drops
    ///    closed="false", while the editor USX (<c>forExport=false</c>) still includes it
    ///    (UsxUsfmParserSink.cs:82,241,287). The Standard-view editor keys closer DISPLAY and its
    ///    honesty rule on this closed="false" flag, so a 3.1 project must keep receiving it on the
    ///    editor (non-export) path even though a 3.1 file export would not carry it.
    /// 7. Stylesheet: the <c>notesub</c> TextProperty (<c>scNoteSubMarker</c>, ScrTag.cs:217,278)
    ///    that marks the whole footnote/cross-ref content-marker family exists ONLY in
    ///    usfm3_1.sty, and NEST / "\+" are removed from those markers' OccursUnder there. 3.1
    ///    projects also default to usfm3_1.sty, carry a "\usfm 3.1" header after \id, and emit USX
    ///    version="3.1" — all of which flow into the style-info wire data and any USX handling.
    /// 8. The 3.1 MIGRATION adds explicit end markers to nested char styles but DELIBERATELY SKIPS
    ///    note-section markers, which stay open (ProjectPropertiesUtils.cs:629-699, IsNoteSectionMarker
    ///    skip at :647). It also strips "\+" prefixes, converts link-* attribute names, and injects
    ///    the "\usfm 3.1" header. A finer-grained save path needs an equivalent that closes nested
    ///    body styles while leaving \fr/\ft/\xo/\xt open. (Paratext 9's 3.1 editor separately strips
    ///    stray typed "\+" prefixes on save via UsfmUtils.RemoveMarkerPlusIfNotNeeded.)
    /// 9. New 3.1 milestones become reachable: qt-s / qt1-s..qt5-s, ts-s, and ts.
    /// </para>
    ///
    /// <para>
    /// Non-goals on upgrade (NOT version-gated in Paratext 9 either): accepting "\+x" on parse
    /// (strip the "+" when a char is open; unknown marker when nothing is open) and the pure
    /// token-normalize path's verbatim "+" preservation.
    /// </para>
    /// </summary>
    [TestFixture]
    public class Usfm31NestingTripwireTests
    {
        [Test(
            Description = "Self-activating upgrade guard: passes vacuously while the referenced "
                + "ParatextData lacks UsfmVersionOption.Version3_1; when a package upgrade adds "
                + "it, this fails until USFM 3.1 nesting semantics are honored per the class "
                + "comment's checklist."
        )]
        public void UsfmVersionOption_Version31Available_NestingSemanticsMustBeVersionSwitched()
        {
            // Reflection (name-based parse) because the member doesn't exist at compile time in
            // the ParatextData version currently referenced.
            if (!Enum.TryParse("Version3_1", out UsfmVersionOption version31))
            {
                Assert.Pass(
                    "The referenced ParatextData's UsfmVersionOption enum does not define "
                        + "Version3_1 — USFM 3.1 projects cannot reach this ParatextData (their "
                        + "MinParatextDataVersion locks them out), so the <= 3.0 nesting rules "
                        + "are the only reachable semantics. This test self-activates when the "
                        + "ParatextData package is upgraded to a 9.6+ version that adds it."
                );
            }

            Assert.Fail(
                $"ParatextData now defines UsfmVersionOption.{version31}, so USFM 3.1 projects "
                    + "can reach Platform.Bible — but the Standard-view editor's inline-marker "
                    + "nesting AND closer/attribute semantics are hard-coded to USFM <= 3.0. In "
                    + "3.1 (driven by ProjectSettings.RequiresPlusOnNestedStyles() == false): a "
                    + "bare char marker NESTS by default and auto-closes only notesub -> notesub "
                    + "(ft -> xt exempted); '+' is never emitted and nested closers are bare "
                    + "'\\marker*'; '\\v' CLOSES open char styles; the is-closed decision uses a "
                    + "DIFFERENT lookahead (LookaheadForClosingMarkerUsfm31, a note-section-marker "
                    + "structural test); a 3.1 EXPORT omits closed=\"false\" while the editor "
                    + "(non-export) USX still emits it — the closer-display/honesty rule keys on "
                    + "that flag; and the 3.1 migration adds end markers to nested body styles but "
                    + "DELIBERATELY skips note-section markers (\\fr/\\ft/\\xo/\\xt stay open). "
                    + "Honor the project's <UsfmVersion> setting per the checklist in this test "
                    + "class's doc comment, then update this test to assert the version-switched "
                    + "behavior instead of failing."
            );
        }
    }
}
