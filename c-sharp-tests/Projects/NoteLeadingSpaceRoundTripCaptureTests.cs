using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Captured-behavior pins for the space AFTER a note category's closing marker — the byte in
    /// <c>\f + \cat People\cat* \fr …</c> between <c>\cat*</c> and <c>\fr</c>. When the category
    /// folds to the note's <c>category</c> attribute, that space has nothing left in front of it
    /// and becomes the note's whitespace-only FIRST child in USX. Paratext treats it as note text
    /// content, so every leg — <see cref="ParatextProjectDataProvider.GetChapterUsx"/>,
    /// <see cref="ParatextProjectDataProvider.SetChapterUsx"/>, and the saved USFM — must carry it
    /// byte-faithfully or the editor's round trip loses a document byte.
    ///
    /// These pins localize a reported user-visible loss (the space after <c>\cat*</c> vanishing
    /// from the editor) by settling the C# half: if ParatextData preserves the byte on every leg
    /// here, the loss belongs to the TypeScript USX parser's whitespace-only-node handling on the
    /// LOAD leg, which has its own direct pins in scripture-editors
    /// (<c>whitespace-only-text.test.ts</c>).
    ///
    /// The fold rules themselves (when <c>\cat</c> folds versus staying first-class) are pinned in
    /// <c>VerseAttributeFoldRoundTripCaptureTests</c>; this suite pins only the whitespace the fold
    /// leaves behind. The stylesheet registration below mirrors that suite's, for the same reason:
    /// without real tags ParatextData degrades the spans and the pin captures a fixture artifact.
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class NoteLeadingSpaceRoundTripCaptureTests : PapiTestBase
    {
        private const string PdpName = "note-leading-space-soup";
        private const int BookNum = 1; // GEN, per existing fixture convention

        private ScrText _scrText = null!;
        private ProjectDetails _projectDetails = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();
            _scrText = CreateDummyProject();
            RegisterNoteCategoryTags(_scrText);
            _projectDetails = CreateProjectDetails(_scrText);
            ParatextProjects.FakeAddProject(_projectDetails, _scrText);
        }

        [TearDown]
        public void TearDown()
        {
            _scrText?.Dispose();
        }

        /// <summary>
        /// Register the note category family — <c>cat</c> plus its footnote (<c>f</c>) and endnote
        /// (<c>fe</c>) hosts and the <c>fr</c>/<c>ft</c> content markers — with the fields the real
        /// stylesheets give them (usfm.sty for the notes, usfm_sb.sty for <c>cat</c>, which has no
        /// <c>\OccursUnder</c> line at all). Presentation-only fields are omitted; they cannot
        /// affect parsing or folding.
        /// </summary>
        private static void RegisterNoteCategoryTags(ScrText scrText)
        {
            var stylesheet = (DummyScrStylesheet)scrText.DefaultStylesheet;
            const TextProperties noteProps =
                TextProperties.scPublishable | TextProperties.scVernacular | TextProperties.scNote;
            const string noteOccursUnder =
                "c lh li li1 li2 li3 li4 lf lim lim1 lim2 lim3 lim4 m mi nb p pc ph phi pi pi1 pi2 "
                + "pi3 pr pmo pm pmc pmr po q q1 q2 q3 q4 qc qr qd qm qm1 qm2 qm3 sp tc1 tc2 tc3 "
                + "tc4 ms ms1 ms2 ms3 s s1 s2 s3 d ip";
            stylesheet.AddTag(
                new ScrTag("f")
                {
                    TextType = ScrTextType.scNoteText,
                    StyleType = ScrStyleType.scNoteStyle,
                    TextProperties = noteProps,
                    OccursUnder = "cp qs mt mt1 mt2 mt3 " + noteOccursUnder,
                    Endmarker = "f*",
                }
            );
            stylesheet.AddTag(
                new ScrTag("fe")
                {
                    TextType = ScrTextType.scNoteText,
                    StyleType = ScrStyleType.scNoteStyle,
                    TextProperties = noteProps,
                    OccursUnder = noteOccursUnder,
                    Endmarker = "fe*",
                }
            );
            stylesheet.AddTag(
                new ScrTag("fr")
                {
                    TextType = ScrTextType.scNoteText,
                    StyleType = ScrStyleType.scCharacterStyle,
                    TextProperties = noteProps,
                    OccursUnder = "f fe",
                    Endmarker = "fr*",
                }
            );
            stylesheet.AddTag(
                new ScrTag("ft")
                {
                    TextType = ScrTextType.scNoteText,
                    StyleType = ScrStyleType.scCharacterStyle,
                    TextProperties = noteProps,
                    OccursUnder = "f fe",
                    Endmarker = "ft*",
                }
            );
            stylesheet.AddTag(
                new ScrTag("cat")
                {
                    TextType = ScrTextType.scNoteText,
                    StyleType = ScrStyleType.scCharacterStyle,
                    TextProperties = noteProps,
                    Endmarker = "cat*",
                }
            );
        }

        // Each case pins one authored note shape: the EXACT note element GetChapterUsx produces
        // (including any whitespace-only first child the fold leaves), and the EXACT note span in
        // the USFM saved from that same USX. A footnote and an endnote row pin the same window on
        // both hosts — the reported repro used \fe, and \f is the common case.
        [TestCase(
            @"\id GEN \c 1 \p \v 1 Text \f + \cat People\cat* \fr 1:1 \ft A footnote.\f* more.",
            "<note caller=\"+\" style=\"f\" category=\"People\"> "
                + "<char style=\"fr\" closed=\"false\">1:1 </char>"
                + "<char style=\"ft\" closed=\"false\">A footnote.</char></note>",
            @"\f + \cat People\cat* \fr 1:1 \ft A footnote.\f*",
            TestName = "FootnoteCatCloserSpace_SurvivesAsNoteLeadingText"
        )]
        [TestCase(
            @"\id GEN \c 1 \p \v 1 Text \fe + \cat things\cat* \fr 1:1 \ft An endnote.\fe* more.",
            "<note caller=\"+\" style=\"fe\" category=\"things\"> "
                + "<char style=\"fr\" closed=\"false\">1:1 </char>"
                + "<char style=\"ft\" closed=\"false\">An endnote.</char></note>",
            @"\fe + \cat things\cat* \fr 1:1 \ft An endnote.\fe*",
            TestName = "EndnoteCatCloserSpace_SurvivesAsNoteLeadingText"
        )]
        public void NoteCatCloserSpace_RoundTripsThroughParatextData(
            string usfm,
            string expectedNoteElement,
            string expectedUsfmNoteSpan
        )
        {
            _scrText.PutText(BookNum, 0, false, usfm, null);

            DummyParatextProjectDataProvider provider = new(
                PdpName,
                Client,
                _projectDetails,
                ParatextProjects
            );

            var verseRef = new VerseRef(BookNum, 1, 0);

            // (a) USFM -> USX: the category folds to the note's attribute and the space after
            // \cat* survives as the note's whitespace-only first child.
            string usxFromTypedUsfm = provider.GetChapterUsx(verseRef);
            TestContext.Out.WriteLine("USX: " + usxFromTypedUsfm);
            Assert.That(
                usxFromTypedUsfm,
                Does.Contain(expectedNoteElement),
                "USFM -> USX must keep the space after \\cat* as note text (captured pin)."
            );

            // (b) USX -> USFM via the provider's real save path: the byte survives to disk. The
            // write result is asserted so the pins below are falsifiable — a rejected write would
            // leave the seeded content in place, which coincides with the expected bytes.
            Assert.That(
                provider.SetChapterUsx(verseRef, usxFromTypedUsfm),
                Is.True,
                "SetChapterUsx must accept the captured USX."
            );
            string usfmAfterUsxRoundTrip = provider.GetChapterUsfm(verseRef);
            TestContext.Out.WriteLine("USFM: " + usfmAfterUsxRoundTrip);
            Assert.That(
                usfmAfterUsxRoundTrip,
                Does.Contain(expectedUsfmNoteSpan),
                "USFM saved from ParatextData's own USX must keep the space after \\cat* "
                    + "byte-for-byte."
            );

            // (c) USX -> USFM -> USX is a fixed point, whitespace included.
            string usxAfterFullRoundTrip = provider.GetChapterUsx(verseRef);
            Assert.That(
                usxAfterFullRoundTrip,
                Is.EqualTo(usxFromTypedUsfm),
                "ParatextData's USX -> USFM -> USX round trip for a note-leading space is a "
                    + "fixed point (byte-identical)."
            );
        }
    }
}
