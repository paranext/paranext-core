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
            RegisterCategoryTags(_scrText);
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

        /// <summary>
        /// Register the note/sidebar category family — <c>cat</c> plus the smallest realistic
        /// hosts (<c>f</c>/<c>fr</c>/<c>ft</c> for a footnote, <c>esb</c>/<c>esbe</c> for a
        /// sidebar) — with the fields the real stylesheets give them: <c>f</c> is a NOTE style;
        /// <c>fr</c>/<c>ft</c>/<c>cat</c> are character styles with end markers; <c>esb</c>/
        /// <c>esbe</c> are paragraph styles with no end marker; all carry
        /// <c>\TextType NoteText</c> except the sidebar pair's <c>\TextType Other</c>, and all
        /// declare <c>\TextProperties publishable vernacular note</c>. <c>cat</c> notably has NO
        /// <c>\OccursUnder</c> line at all in its stylesheet (usfm_sb.sty, where the study-Bible
        /// family lives — base usfm.sty does not define <c>cat</c>/<c>esb</c>/<c>esbe</c>).
        /// Presentation-only fields are omitted as in <see cref="RegisterVerseAttributeTags"/>.
        ///
        /// Without these, ParatextData degrades the spans to unknown markers and the category
        /// assertions below would capture that degradation instead of the folding rule.
        /// </summary>
        private static void RegisterCategoryTags(ScrText scrText)
        {
            var stylesheet = (DummyScrStylesheet)scrText.DefaultStylesheet;
            const TextProperties noteProps =
                TextProperties.scPublishable | TextProperties.scVernacular | TextProperties.scNote;
            stylesheet.AddTag(
                new ScrTag("f")
                {
                    TextType = ScrTextType.scNoteText,
                    StyleType = ScrStyleType.scNoteStyle,
                    TextProperties = noteProps,
                    OccursUnder =
                        "c cp lh li li1 li2 li3 li4 lf lim lim1 lim2 lim3 lim4 m mi nb p pc ph phi "
                        + "pi pi1 pi2 pi3 pr pmo pm pmc pmr po q q1 q2 q3 q4 qc qr qd qm qm1 qm2 "
                        + "qm3 qs sp tc1 tc2 tc3 tc4 mt mt1 mt2 mt3 ms ms1 ms2 ms3 s s1 s2 s3 d ip",
                    Endmarker = "f*",
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
            stylesheet.AddTag(
                new ScrTag("esb")
                {
                    TextType = ScrTextType.scOther,
                    StyleType = ScrStyleType.scParagraphStyle,
                    TextProperties = noteProps,
                    OccursUnder = "id c",
                }
            );
            stylesheet.AddTag(
                new ScrTag("esbe")
                {
                    TextType = ScrTextType.scOther,
                    StyleType = ScrStyleType.scParagraphStyle,
                    TextProperties = noteProps,
                    OccursUnder = "id c esb",
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
        // The whitespace matrix around the closers, one character apart per row. The first row's
        // space sits AFTER `\vp*` and is leading text content (the existing FilledVaThenFilledVp
        // row); this row removes it, so the folds are identical and the text starts flush.
        [TestCase(
            @"\id GEN \c 1 \p \v 11 \va 11 va\va*\vp 11 vp\vp*This verse.",
            "<verse number=\"11\" style=\"v\" altnumber=\"11 va\" pubnumber=\"11 vp\" sid=\"GEN 1:11\" />"
                + "This verse.<verse eid=\"GEN 1:11\" />",
            @"\v 11 \va 11 va\va*\vp 11 vp\vp*This verse.",
            TestName = "NoSpaceBetweenOrAfter_BothFold_TextStartsFlush"
        )]
        // A same-line space BETWEEN `\va*` and `\vp` BLOCKS the `\vp` fold: the parser's `\vp`
        // lookup requires the marker token DIRECTLY after the consumed `\va` triplet, and the
        // space is an intervening text token. It survives as genuine content — the saved line
        // keeps the byte — while `\va` still folds. The editor's tokenizer pins the same rule
        // (a same-line space before an attribute marker blocks its fold; only LINE-BREAK
        // whitespace there is structural). NOTE: newer ParatextData generalizes this lookup to
        // skip one whitespace-only token when the first marker folded (the chapter-side rule
        // below), so a package upgrade flips this row — which is exactly what a capture pin is
        // for. Decide the editor's behavior deliberately when that happens.
        [TestCase(
            @"\id GEN \c 1 \p \v 11 \va 11 va\va* \vp 11 vp\vp*This verse.",
            "<verse number=\"11\" style=\"v\" altnumber=\"11 va\" sid=\"GEN 1:11\" />"
                + " <char style=\"vp\">11 vp</char>This verse.<verse eid=\"GEN 1:11\" />",
            @"\v 11 \va 11 va\va* \vp 11 vp\vp*This verse.",
            TestName = "SpaceBetweenVaCloserAndVp_BlocksVpFold_SpaceIsContent"
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
        // \cp needs no \ca in front of it: the parser looks the two markers up independently, so
        // a chapter whose only attribute marker is \cp still folds. (The FilledCaThenCp row's \cp
        // folds ACROSS the space after \ca* — the chapter path deliberately skips one
        // whitespace-only token after a folded \ca, a grace the verse-side \vp lookup does not
        // have in this ParatextData.)
        [TestCase(
            @"\id GEN \c 1 \cp A \p \v 1 text.",
            "<chapter number=\"1\" style=\"c\" pubnumber=\"A\" sid=\"GEN 1\" />",
            true,
            TestName = "CpAloneAfterChapter_Folds"
        )]
        // An UNCLOSED \ca never folds — the fold requires the explicit `\ca*` token — and the
        // span degrades to a first-class char element with closed="false", exactly the shape an
        // unclosed \va/\vp takes inside a paragraph. The editor USX (non-export) path keeps the
        // closed="false" attribute.
        [TestCase(
            @"\id GEN \c 1 \ca 2 \p \v 1 text.",
            "<chapter number=\"1\" style=\"c\" sid=\"GEN 1\" />"
                + "<char style=\"ca\" closed=\"false\">2</char>",
            false,
            TestName = "UnclosedCa_StaysFirstClassOpenChar"
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

        /// <summary>
        /// The acknowledged ParatextData bug with a <c>\cp</c> whose content carries markup: the
        /// <c>\cp</c> fold reads ONLY the first text token after the marker, so the pre-markup
        /// text folds into <c>pubnumber</c> and the markup is left in the token stream — where it
        /// lands as a first-class char element at CHAPTER level, outside any paragraph.
        ///
        /// This is a DELIBERATE-DIVERGENCE pin: the scripture-editors tokenizer intentionally
        /// produces the corrected shape instead (no fold — the whole span stays a real <c>cp</c>
        /// paragraph, because markup in the content aborts the fold). This capture must never
        /// become a reason to change that tokenizer; it records what ParatextData writes so the
        /// difference stays measured rather than assumed.
        /// </summary>
        [Test]
        public void CpWithMarkup_PartialFoldStrandsMarkupAtChapterLevel_ThroughParatextData()
        {
            _scrText.PutText(
                BookNum,
                0,
                false,
                @"\id GEN \c 1 \cp 1 cp \nd nd marker \nd* \p \v 1 text.",
                null
            );

            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);

            var verseRef = new VerseRef(BookNum, 1, 0);

            string usxFromTypedUsfm = provider.GetChapterUsx(verseRef);
            TestContext.Out.WriteLine("USX: " + usxFromTypedUsfm);
            Assert.That(
                usxFromTypedUsfm,
                Does.Contain("<chapter number=\"1\" style=\"c\" pubnumber=\"1 cp\" sid=\"GEN 1\" />"),
                "The text before the markup folds into pubnumber (trimmed), markup notwithstanding."
            );
            Assert.That(
                usxFromTypedUsfm,
                Does.Contain("<char style=\"nd\">nd marker </char>"),
                "The markup is stranded as a chapter-level char element (the space before \\nd* "
                    + "stays inside its content; the space before \\p is stripped as final space)."
            );
            Assert.That(
                usxFromTypedUsfm,
                Does.Not.Contain("<para style=\"cp\""),
                "No first-class cp paragraph survives — the fold consumed the pre-markup text."
            );

            // Same write/fixed-point pairing as the fold cases above.
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
                "ParatextData's USX -> USFM -> USX round trip for the partial cp fold is a fixed "
                    + "point — the strand re-parses to the same strand."
            );
            Assert.That(
                provider.SetChapterUsx(verseRef, usxAfterFullRoundTrip),
                Is.False,
                "Re-saving the round-tripped USX must change nothing — a true fixed point."
            );
        }

        // \cat on a footnote. The fold window is the token DIRECTLY after the note's own token
        // (marker + caller): [note][cat][text][cat*] folds to category; anything else leaves \cat
        // a first-class char inside the note. The same non-empty rule as \va/\vp/\ca/\cp applies:
        // an empty span never becomes an empty attribute.
        //
        // The fr/ft spans carry closed="false" throughout: they are closed IMPLICITLY (fr by the
        // next char style, ft by \f*), and the editor (non-export) USX marks implicit closure —
        // the conventional footnote authoring style, captured as-is. The \cat spans, explicitly
        // closed by \cat*, never carry it.
        [TestCase(
            @"\id GEN \c 1 \p \v 1 Text \f + \cat People\cat*\fr 1:1 \ft A footnote.\f* more.",
            "<note caller=\"+\" style=\"f\" category=\"People\">"
                + "<char style=\"fr\" closed=\"false\">1:1 </char>"
                + "<char style=\"ft\" closed=\"false\">A footnote.</char></note>",
            TestName = "NoteCat_DirectlyAfterCaller_FoldsToCategory"
        )]
        [TestCase(
            @"\id GEN \c 1 \p \v 1 Text \f + \cat\cat*\fr 1:1 \ft A footnote.\f* more.",
            "<note caller=\"+\" style=\"f\">"
                + "<char style=\"cat\" />"
                + "<char style=\"fr\" closed=\"false\">1:1 </char>"
                + "<char style=\"ft\" closed=\"false\">A footnote.</char></note>",
            TestName = "NoteCat_EmptySpan_StaysFirstClass"
        )]
        [TestCase(
            @"\id GEN \c 1 \p \v 1 Text \f + \fr 1:1 \ft A footnote. \cat People\cat*\f* more.",
            "<note caller=\"+\" style=\"f\">"
                + "<char style=\"fr\" closed=\"false\">1:1 </char>"
                + "<char style=\"ft\" closed=\"false\">A footnote. </char>"
                + "<char style=\"cat\">People</char></note>",
            TestName = "NoteCat_AtNoteEnd_DoesNotFold"
        )]
        public void NoteCategorySpans_FoldOnlyDirectlyAfterCaller_ThroughParatextData(
            string usfm,
            string expectedNoteElement
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
                Does.Contain(expectedNoteElement),
                "USFM -> USX fold decision for the note's \\cat (captured pin)."
            );

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
                "ParatextData's USX -> USFM -> USX round trip for the note \\cat is a fixed point."
            );
            Assert.That(
                provider.SetChapterUsx(verseRef, usxAfterFullRoundTrip),
                Is.False,
                "Re-saving the round-tripped USX must change nothing — a true fixed point."
            );
        }

        // \cat on a study-Bible sidebar: [esb][cat][text][cat*] folds to the sidebar's category
        // attribute, the same window shape as the note fold above.
        [TestCase(
            @"\id GEN \c 1 \esb \cat History\cat* \p Sidebar content. \esbe \p \v 1 text.",
            "<sidebar style=\"esb\" category=\"History\">",
            TestName = "SidebarCat_DirectlyAfterEsb_FoldsToCategory"
        )]
        [TestCase(
            @"\id GEN \c 1 \esb \cat\cat* \p Sidebar content. \esbe \p \v 1 text.",
            "<sidebar style=\"esb\">",
            TestName = "SidebarCat_EmptySpan_StaysFirstClass"
        )]
        public void SidebarCategorySpans_FoldOnlyWhenNonEmpty_ThroughParatextData(
            string usfm,
            string expectedSidebarStart
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
                Does.Contain(expectedSidebarStart),
                "USFM -> USX fold decision for the sidebar's \\cat (captured pin)."
            );

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
                "ParatextData's USX -> USFM -> USX round trip for the sidebar \\cat is a fixed "
                    + "point."
            );
            Assert.That(
                provider.SetChapterUsx(verseRef, usxAfterFullRoundTrip),
                Is.False,
                "Re-saving the round-tripped USX must change nothing — a true fixed point."
            );
        }
    }
}
