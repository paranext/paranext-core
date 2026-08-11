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
    /// Stylesheet note: <see cref="DummyScrStylesheet"/> carries no <c>va</c>/<c>vp</c>/<c>ca</c>/
    /// <c>cp</c> tags, and without them ParatextData degrades every one of these spans to an unknown
    /// PARAGRAPH — which would make the capture an artifact of the fixture rather than of
    /// ParatextData. <see cref="RegisterVerseAttributeTags"/> therefore registers the four markers
    /// with their real usfm.sty shapes (character styles with end markers, except paragraph-shaped
    /// <c>\cp</c>) on THIS test's own project only, via the stylesheet's public
    /// <c>AddTag(ScrTag)</c> hook. The shared fixture is left untouched.
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

        /// <summary>
        /// Register <c>va</c>/<c>vp</c>/<c>ca</c>/<c>cp</c> on this project's own stylesheet, matching
        /// their usfm.sty shapes: <c>va</c>/<c>vp</c> are character styles under <c>v</c> with
        /// <c>va*</c>/<c>vp*</c> end markers, <c>ca</c> is a character style under <c>c</c> with a
        /// <c>ca*</c> end marker, and <c>cp</c> is PARAGRAPH-shaped under <c>c</c> with no end marker.
        /// Without these the markers are unknown and ParatextData's degradation — not its folding
        /// rule — is what the assertions below would be capturing.
        /// </summary>
        private static void RegisterVerseAttributeTags(ScrText scrText)
        {
            var stylesheet = (DummyScrStylesheet)scrText.DefaultStylesheet;
            stylesheet.AddTag(
                new ScrTag("va")
                {
                    TextProperties = TextProperties.scPublishable | TextProperties.scVernacular,
                    TextType = ScrTextType.scVerseText,
                    StyleType = ScrStyleType.scCharacterStyle,
                    OccursUnder = "v",
                    Endmarker = "va*",
                }
            );
            stylesheet.AddTag(
                new ScrTag("vp")
                {
                    TextProperties = TextProperties.scPublishable | TextProperties.scVernacular,
                    TextType = ScrTextType.scVerseText,
                    StyleType = ScrStyleType.scCharacterStyle,
                    OccursUnder = "v",
                    Endmarker = "vp*",
                }
            );
            stylesheet.AddTag(
                new ScrTag("ca")
                {
                    TextProperties = TextProperties.scPublishable | TextProperties.scVernacular,
                    TextType = ScrTextType.scOther,
                    StyleType = ScrStyleType.scCharacterStyle,
                    OccursUnder = "c",
                    Endmarker = "ca*",
                }
            );
            stylesheet.AddTag(
                new ScrTag("cp")
                {
                    TextProperties =
                        TextProperties.scParagraph
                        | TextProperties.scPublishable
                        | TextProperties.scVernacular,
                    TextType = ScrTextType.scOther,
                    StyleType = ScrStyleType.scParagraphStyle,
                    OccursUnder = "c",
                }
            );
        }

        // Each case pins one authored \va/\vp shape with the EXACT USX <para> inner content
        // ParatextData produces for it — i.e. exactly which of the two markers folded onto the verse
        // and where the survivors sit relative to each other.
        [TestCase(
            @"\id GEN \c 1 \p \v 11 \va 11 va\va*\vp 11 vp\vp* This verse.",
            "<verse number=\"11\" style=\"v\" altnumber=\"11 va\" pubnumber=\"11 vp\" sid=\"GEN 1:11\" />"
                + " This verse.<verse eid=\"GEN 1:11\" />",
            TestName = "FilledVaThenFilledVp_BothFold"
        )]
        [TestCase(
            @"\id GEN \c 1 \p \v 11 \va\va*\vp 11 vp\vp* This verse.",
            "<verse number=\"11\" style=\"v\" sid=\"GEN 1:11\" />"
                + "<char style=\"va\" /><char style=\"vp\">11 vp</char>"
                + " This verse.<verse eid=\"GEN 1:11\" />",
            TestName = "EmptyVaThenFilledVp_NeitherFolds"
        )]
        [TestCase(
            @"\id GEN \c 1 \p \v 11 \va \va*\vp 11 vp\vp* This verse.",
            "<verse number=\"11\" style=\"v\" sid=\"GEN 1:11\" />"
                + "<char style=\"va\" /><char style=\"vp\">11 vp</char>"
                + " This verse.<verse eid=\"GEN 1:11\" />",
            TestName = "SpacedEmptyVaThenFilledVp_NeitherFolds"
        )]
        [TestCase(
            @"\id GEN \c 1 \p \v 11 \va 11 va\va*\vp\vp* This verse.",
            "<verse number=\"11\" style=\"v\" altnumber=\"11 va\" sid=\"GEN 1:11\" />"
                + "<char style=\"vp\" />"
                + " This verse.<verse eid=\"GEN 1:11\" />",
            TestName = "FilledVaThenEmptyVp_FirstStillFolds"
        )]
        [TestCase(
            @"\id GEN \c 1 \p \v 11 \va \va* This verse.",
            "<verse number=\"11\" style=\"v\" sid=\"GEN 1:11\" />"
                + "<char style=\"va\" />"
                + " This verse.<verse eid=\"GEN 1:11\" />",
            TestName = "EmptyVaAlone_StaysFirstClass"
        )]
        public void VerseAttributeSpans_FoldOnlyWhenNonEmpty_ThroughParatextData(
            string usfm,
            string expectedParaInner
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

            // (b) USX -> USFM -> USX is a fixed point: ParatextData's own USX, fed back through the
            // provider's real save path, re-reads identically. This is what makes the ORDER in (a)
            // authoritative rather than incidental — the editor's own settle must land on a shape that
            // survives the same round trip.
            //
            // This assertion is genuinely falsifiable, not a no-op on an unchanged store: feeding
            // SetChapterUsx a deliberately EDITED copy of this USX makes the re-read below come back
            // edited, so the write really does go through the USFM writer and the re-read really does
            // re-parse. (GetChapterUsfm is deliberately not asserted on here — in this in-memory
            // fixture it returns only the `\id` line after a save, for reasons unrelated to folding.)
            provider.SetChapterUsx(verseRef, usxFromTypedUsfm);
            string usxAfterFullRoundTrip = provider.GetChapterUsx(verseRef);
            Assert.That(
                usxAfterFullRoundTrip,
                Is.EqualTo(usxFromTypedUsfm),
                "ParatextData's USX -> USFM -> USX round trip for the \\va/\\vp pair is a fixed point."
            );
        }

        // The chapter's own attribute pair. \ca is char-shaped and \cp paragraph-shaped, so their
        // survivors are shaped differently from \va/\vp's — but the FOLD RULE is the same one, which
        // is why the editor's fix covers both with a single statement.
        [TestCase(
            @"\id GEN \c 1 \ca 2\ca* \cp A \p \v 1 text.",
            "<chapter number=\"1\" style=\"c\" altnumber=\"2\" pubnumber=\"A\" sid=\"GEN 1\" />",
            TestName = "FilledCaThenCp_BothFold"
        )]
        [TestCase(
            @"\id GEN \c 1 \ca\ca* \cp A \p \v 1 text.",
            "<chapter number=\"1\" style=\"c\" sid=\"GEN 1\" />"
                + "<char style=\"ca\" /><para style=\"cp\">A</para>",
            TestName = "EmptyCaThenCp_NeitherFolds"
        )]
        public void ChapterAttributeSpans_FoldOnlyWhenNonEmpty_ThroughParatextData(
            string usfm,
            string expectedChapterFragment
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

            provider.SetChapterUsx(verseRef, usxFromTypedUsfm);
            string usxAfterFullRoundTrip = provider.GetChapterUsx(verseRef);
            Assert.That(
                usxAfterFullRoundTrip,
                Is.EqualTo(usxFromTypedUsfm),
                "ParatextData's USX -> USFM -> USX round trip for the \\ca/\\cp pair is a fixed point."
            );
        }
    }
}
