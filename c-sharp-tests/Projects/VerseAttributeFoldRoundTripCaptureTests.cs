using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Captured-behavior pins for WHEN ParatextData folds a verse's <c>\va</c>/<c>\vp</c> (and a
    /// chapter's <c>\ca</c>/<c>\cp</c>) into an attribute on its target, versus leaving it a
    /// first-class element — captured through the same provider methods the editor's PDP sync
    /// exercises (<see cref="ParatextProjectDataProvider.GetChapterUsx"/> and
    /// <see cref="ParatextProjectDataProvider.SetChapterUsx"/>).
    ///
    /// Motivation: emptying an alternate verse number's text in the Standard-view editor silently
    /// REORDERED the verse's markers on disk — <c>\v 11 \va 11 va\va*\vp 11 vp\vp*</c> settled to
    /// <c>\v 11 \vp 11 vp\vp*\va \va*</c>, moving the published number in front of the alternate one.
    /// The editor's USFM tokenizer left the verse "receptive" after an EMPTY <c>\va</c> materialized
    /// as its own char element, so the following <c>\vp</c> folded onto the verse ACROSS it, and USJ
    /// serializes a verse attribute ahead of every sibling. These pins are the ground truth that
    /// decided the fix (scripture-editors `usfmFragmentToUsj.ts`): the editor now matches row
    /// <c>EmptyVaThenFilledVp</c> below instead of folding.
    ///
    /// Finding: an attribute marker folds ONLY when its own span has content, and an EMPTY span
    /// BLOCKS the next attribute marker from folding too — both stay first-class elements, in
    /// document order. The <c>FilledVaThenEmptyVp</c> row shows the asymmetry that made the live bug
    /// one-directional: emptying the SECOND marker leaves the first one's fold (and therefore the
    /// document order) intact.
    ///
    /// Stylesheet note: <see cref="DummyScrStylesheet"/> already carries <c>cp</c> in its usfm.sty
    /// shape, but has no <c>va</c>/<c>vp</c>/<c>ca</c> tags — and without those, ParatextData degrades
    /// their spans to unknown PARAGRAPHS, which would make the capture an artifact of the fixture
    /// rather than of ParatextData. <see cref="RegisterVerseAttributeTags"/> therefore registers just
    /// those three, with the fields usfm.sty actually gives them, on THIS test's own project only,
    /// via the stylesheet's public <c>AddTag(ScrTag)</c> hook. The shared fixture is left untouched.
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class VerseAttributeFoldRoundTripCaptureTests : PapiTestBase
    {
        private const string PdpName = "verse-attribute-fold-soup";
        private const int BookNum = 1; // GEN, per existing fixture convention

        private ScrText _scrText = null!;
        private ProjectDetails _projectDetails = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();
            _scrText = CreateDummyProject();
            RegisterVerseAttributeTags(_scrText);
            _projectDetails = CreateProjectDetails(_scrText);
            ParatextProjects.FakeAddProject(_projectDetails, _scrText);
        }

        [TearDown]
        public void TearDown()
        {
            _scrText?.Dispose();
        }

        // The `\OccursUnder` lists `va` and `vp` carry in usfm.sty, verbatim. They are PARAGRAPH
        // markers (`\va` occurs under `\p`, not under `\v`) — the detail that makes these tags real
        // rather than plausible, since `\p` is the enclosing paragraph in every case below.
        private const string VaOccursUnder =
            "lh li li1 li2 li3 li4 lf lim lim1 lim2 lim3 lim4 m mi nb p pc ph phi pi pi1 pi2 pi3 pr "
            + "pmo pm pmc pmr po q q1 q2 q3 q4 qc qr qd qm qm1 qm2 qm3 tr tc1 tc2 tc3 tc4 tcr1 tcr2 "
            + "tcr3 tcr4 s3 d sp";
        private const string VpOccursUnder = "cd " + VaOccursUnder;

        /// <summary>
        /// Register <c>va</c>/<c>vp</c>/<c>ca</c> on this project's own stylesheet with the fields
        /// usfm.sty actually gives them: all three are CHARACTER styles with end markers and
        /// <c>\TextType Other</c>, and none of them declares <c>\TextProperties</c> at all.
        /// <c>va</c>/<c>vp</c> occur under the PARAGRAPH markers (see <see cref="VaOccursUnder"/>),
        /// NOT under <c>v</c>; <c>ca</c> occurs under <c>c</c>. Presentation-only fields
        /// (<c>\Superscript</c>, <c>\Color</c>, <c>\FontSize</c>, <c>\Italic</c>) are omitted — they
        /// cannot affect parsing or folding.
        ///
        /// <c>cp</c> is deliberately NOT registered here: <see cref="DummyScrStylesheet"/> already
        /// carries it (paragraph-shaped, <c>\TextType Other</c>, <c>scParagraph</c>, under <c>c</c>)
        /// as a faithful match for usfm.sty, so the shared tag is used as-is.
        ///
        /// Without these three, ParatextData degrades their spans to unknown PARAGRAPHS, and the
        /// assertions below would capture that degradation instead of the folding rule.
        /// </summary>
        private static void RegisterVerseAttributeTags(ScrText scrText)
        {
            var stylesheet = (DummyScrStylesheet)scrText.DefaultStylesheet;
            stylesheet.AddTag(
                new ScrTag("va")
                {
                    TextType = ScrTextType.scOther,
                    StyleType = ScrStyleType.scCharacterStyle,
                    OccursUnder = VaOccursUnder,
                    Endmarker = "va*",
                }
            );
            stylesheet.AddTag(
                new ScrTag("vp")
                {
                    TextType = ScrTextType.scOther,
                    StyleType = ScrStyleType.scCharacterStyle,
                    OccursUnder = VpOccursUnder,
                    Endmarker = "vp*",
                }
            );
            stylesheet.AddTag(
                new ScrTag("ca")
                {
                    TextType = ScrTextType.scOther,
                    StyleType = ScrStyleType.scCharacterStyle,
                    OccursUnder = "c",
                    Endmarker = "ca*",
                }
            );
        }

        // Each case pins one authored \va/\vp shape with the EXACT USX <para> inner content
        // ParatextData produces for it — i.e. exactly which of the two markers folded onto the verse
        // and where the survivors sit relative to each other — plus the EXACT verse line ParatextData
        // saves back, which is the byte form the editor's own settle has to agree with.
        [TestCase(
            @"\id GEN \c 1 \p \v 11 \va 11 va\va*\vp 11 vp\vp* This verse.",
            "<verse number=\"11\" style=\"v\" altnumber=\"11 va\" pubnumber=\"11 vp\" sid=\"GEN 1:11\" />"
                + " This verse.<verse eid=\"GEN 1:11\" />",
            @"\v 11 \va 11 va\va*\vp 11 vp\vp* This verse.",
            TestName = "FilledVaThenFilledVp_BothFold"
        )]
        [TestCase(
            @"\id GEN \c 1 \p \v 11 \va\va*\vp 11 vp\vp* This verse.",
            "<verse number=\"11\" style=\"v\" sid=\"GEN 1:11\" />"
                + "<char style=\"va\" /><char style=\"vp\">11 vp</char>"
                + " This verse.<verse eid=\"GEN 1:11\" />",
            // Document order preserved on disk: \va still precedes \vp. This exact line is what the
            // scripture-editors settle must produce; the bug it replaced produced
            // `\v 11 \vp 11 vp\vp*\va \va* This verse.` — the two markers swapped.
            @"\v 11 \va \va*\vp 11 vp\vp* This verse.",
            TestName = "EmptyVaThenFilledVp_NeitherFolds"
        )]
        [TestCase(
            @"\id GEN \c 1 \p \v 11 \va \va*\vp 11 vp\vp* This verse.",
            "<verse number=\"11\" style=\"v\" sid=\"GEN 1:11\" />"
                + "<char style=\"va\" /><char style=\"vp\">11 vp</char>"
                + " This verse.<verse eid=\"GEN 1:11\" />",
            @"\v 11 \va \va*\vp 11 vp\vp* This verse.",
            TestName = "SpacedEmptyVaThenFilledVp_NeitherFolds"
        )]
        [TestCase(
            @"\id GEN \c 1 \p \v 11 \va 11 va\va*\vp\vp* This verse.",
            "<verse number=\"11\" style=\"v\" altnumber=\"11 va\" sid=\"GEN 1:11\" />"
                + "<char style=\"vp\" />"
                + " This verse.<verse eid=\"GEN 1:11\" />",
            @"\v 11 \va 11 va\va*\vp \vp* This verse.",
            TestName = "FilledVaThenEmptyVp_FirstStillFolds"
        )]
        [TestCase(
            @"\id GEN \c 1 \p \v 11 \va \va* This verse.",
            "<verse number=\"11\" style=\"v\" sid=\"GEN 1:11\" />"
                + "<char style=\"va\" />"
                + " This verse.<verse eid=\"GEN 1:11\" />",
            @"\v 11 \va \va* This verse.",
            TestName = "EmptyVaAlone_StaysFirstClass"
        )]
        public void VerseAttributeSpans_FoldOnlyWhenNonEmpty_ThroughParatextData(
            string usfm,
            string expectedParaInner,
            string expectedSavedVerseLine
        )
        {
            _scrText.PutText(BookNum, 0, false, usfm, null);

            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);

            var verseRef = new VerseRef(BookNum, 1, 0);

            // (a) USFM -> USX: capture which markers folded onto the verse and which stayed elements.
            string usxFromTypedUsfm = provider.GetChapterUsx(verseRef);
            TestContext.Out.WriteLine("USX: " + usxFromTypedUsfm);
            Assert.That(
                usxFromTypedUsfm,
                Does.Contain($"<para style=\"p\">{expectedParaInner}</para>"),
                "USFM -> USX fold decision for the \\va/\\vp pair (captured pin)."
            );

            // (b) USX -> USFM: feed ParatextData's own USX back through the provider's real save path
            // and capture the byte form it writes. `SetChapterUsx` returns whether it actually WROTE:
            // it short-circuits (returning false, never calling PutText) when the converted USFM
            // equals what is already stored, so asserting `true` here is what distinguishes a real
            // write from a skipped one — without it, every assertion below could be passing on an
            // untouched store. It is true because the authored one-line USFM normalizes to a
            // multi-line form, which is a genuine change.
            Assert.That(
                provider.SetChapterUsx(verseRef, usxFromTypedUsfm),
                Is.True,
                "SetChapterUsx must actually write (normalization changes the stored USFM)."
            );
            string usfmAfterUsxRoundTrip = provider.GetChapterUsfm(verseRef);
            TestContext.Out.WriteLine("USFM: " + usfmAfterUsxRoundTrip);
            Assert.That(
                usfmAfterUsxRoundTrip,
                Does.Contain(expectedSavedVerseLine),
                "USX -> USFM saved byte form of the \\va/\\vp pair (captured pin). ParatextData writes "
                    + "one marker per line, so this pins the verse's own line, not a \\p-prefixed run."
            );

            // (c) USX -> USFM -> USX is a fixed point, and a SECOND save of the re-read USX is a
            // genuine no-op (`false` — nothing left to change). Together with the `true` above, that
            // separates "the shape survives the round trip" from "the write was skipped": the first
            // save wrote, the second had nothing to write, and the USX is unchanged either way.
            string usxAfterFullRoundTrip = provider.GetChapterUsx(verseRef);
            Assert.That(
                usxAfterFullRoundTrip,
                Is.EqualTo(usxFromTypedUsfm),
                "ParatextData's USX -> USFM -> USX round trip for the \\va/\\vp pair is a fixed point."
            );
            Assert.That(
                provider.SetChapterUsx(verseRef, usxAfterFullRoundTrip),
                Is.False,
                "Re-saving the round-tripped USX must change nothing — a true fixed point."
            );
        }

        // The chapter's own attribute pair. \ca is char-shaped and \cp paragraph-shaped, so their
        // survivors are shaped differently from \va/\vp's — but the FOLD RULE is the same one, which
        // is why the editor's fix covers both with a single statement.
        // `folded` drives the survivor check: when BOTH values fold onto the chapter, no `\ca` char
        // and no `\cp` para may survive ANYWHERE in the document. Asserting only that the chapter
        // carries altnumber/pubnumber would pass just as well if a duplicate span were also left
        // behind — the chapter fragment pinned here is a fragment, not the whole document, unlike the
        // verse cases above which pin their entire `<para style="p">` inner content.
        [TestCase(
            @"\id GEN \c 1 \ca 2\ca* \cp A \p \v 1 text.",
            "<chapter number=\"1\" style=\"c\" altnumber=\"2\" pubnumber=\"A\" sid=\"GEN 1\" />",
            true,
            TestName = "FilledCaThenCp_BothFold"
        )]
        [TestCase(
            @"\id GEN \c 1 \ca\ca* \cp A \p \v 1 text.",
            "<chapter number=\"1\" style=\"c\" sid=\"GEN 1\" />"
                + "<char style=\"ca\" /><para style=\"cp\">A</para>",
            false,
            TestName = "EmptyCaThenCp_NeitherFolds"
        )]
        public void ChapterAttributeSpans_FoldOnlyWhenNonEmpty_ThroughParatextData(
            string usfm,
            string expectedChapterFragment,
            bool folded
        )
        {
            _scrText.PutText(BookNum, 0, false, usfm, null);

            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);

            var verseRef = new VerseRef(BookNum, 1, 0);

            string usxFromTypedUsfm = provider.GetChapterUsx(verseRef);
            TestContext.Out.WriteLine("USX: " + usxFromTypedUsfm);
            Assert.That(
                usxFromTypedUsfm,
                Does.Contain(expectedChapterFragment),
                "USFM -> USX fold decision for the \\ca/\\cp pair (captured pin)."
            );
            if (folded)
            {
                Assert.That(
                    usxFromTypedUsfm,
                    Does.Not.Contain("<char style=\"ca\""),
                    "A folded \\ca must leave no surviving char element anywhere in the document."
                );
                Assert.That(
                    usxFromTypedUsfm,
                    Does.Not.Contain("<para style=\"cp\""),
                    "A folded \\cp must leave no surviving para element anywhere in the document."
                );
            }

            // Same write/fixed-point pairing as the verse cases: the first save must actually WRITE
            // (`true`), and re-saving the round-tripped USX must be a genuine no-op (`false`), so a
            // skipped write can never masquerade as a fixed point.
            Assert.That(
                provider.SetChapterUsx(verseRef, usxFromTypedUsfm),
                Is.True,
                "SetChapterUsx must actually write (normalization changes the stored USFM)."
            );
            TestContext.Out.WriteLine("USFM: " + provider.GetChapterUsfm(verseRef));
            string usxAfterFullRoundTrip = provider.GetChapterUsx(verseRef);
            Assert.That(
                usxAfterFullRoundTrip,
                Is.EqualTo(usxFromTypedUsfm),
                "ParatextData's USX -> USFM -> USX round trip for the \\ca/\\cp pair is a fixed point."
            );
            Assert.That(
                provider.SetChapterUsx(verseRef, usxAfterFullRoundTrip),
                Is.False,
                "Re-saving the round-tripped USX must change nothing — a true fixed point."
            );
        }
    }
}
