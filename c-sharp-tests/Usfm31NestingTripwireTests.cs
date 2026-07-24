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
    /// scripture-editors repo: docs/superpowers/specs/2026-07-24-nesting-alignment-design.md.
    /// What must become version-switched (Paratext 9 reference sites in parentheses):
    /// </para>
    ///
    /// <para>
    /// 1. Close-on-bare vs nest-by-default: in &lt;= 3.0 a char marker WITHOUT "+" closes ALL open
    ///    char styles before opening; in 3.1 a bare char marker NESTS by default and closes only
    ///    when both the open marker and the new marker are note-content ("notesub") markers, with
    ///    ft -&gt; xt exempted (UsfmParser.CharacterStyleShouldAutomaticallyClose). Affects the
    ///    scripture-editors tokenizer's charOpen auto-close (usfmFragmentToUsj) and every
    ///    marker-edit path that relies on it (Tier-2 rebuilds re-tokenize visible glyph text).
    /// 2. "+" emission: in &lt;= 3.0 the writer emits "+" on the opener AND closer of any char
    ///    whose parent is a char (UsxFragmenter, "usePlusOnNestedStyles"); in 3.1 it never emits
    ///    "+" at all. Affects the editable marker glyph text (which mirrors the writer so Tier-2
    ///    round-trips are lossless) and the TS USJ-&gt;USFM serializer's nestedPrefix.
    /// 3. End-marker matching: &lt;= 3.0 expects "\+marker*" for nested closers; 3.1 matches bare
    ///    "\marker*" and reports a leftover "\+marker*" as unmatched (UsfmParser End-token case).
    /// 4. Verse boundaries: &lt;= 3.0 keeps char styles OPEN across \v (the verse milestone nests
    ///    inside the char); 3.1 closes all open char styles at a verse (UsfmParser Verse case).
    /// 5. The is-closed lookahead: 3.1 uses a different algorithm for deciding closed="false"
    ///    (bounded by paragraph/verse; same-marker reopen counts as unclosed; note-section marker
    ///    sets close each other — UsfmParser.LookaheadForClosingMarkerUsfm31).
    /// 6. Save hygiene: Paratext 9's 3.1 editor actively strips stray typed "\+" prefixes on save
    ///    (UsfmUtils.RemoveMarkerPlusIfNotNeeded) because "+" is deprecated in 3.1; a finer-grained
    ///    save path needs an equivalent at its save boundary.
    /// 7. Ancillary: 3.1 projects default to the usfm3_1.sty stylesheet, carry a "\usfm 3.1"
    ///    header after \id, and emit USX version="3.1" — all of which flow into the style-info
    ///    wire data and any USX handling.
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
                    + "nesting semantics are hard-coded to USFM <= 3.0 (close-on-bare, '+' "
                    + "emission, '+'-prefixed closers, chars surviving verse boundaries). Honor "
                    + "the project's <UsfmVersion> setting per the checklist in this test class's "
                    + "doc comment, then update this test to assert the version-switched "
                    + "behavior instead of failing."
            );
        }
    }
}
