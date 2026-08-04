using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Captured-behavior pins (not wished-for behavior) for how ParatextData actually round-trips
    /// the USFM optional line break token (<c>//</c>) through
    /// <c>UsfmToUsx.ConvertToXmlDocument</c> (forExport, chapter-scoped) and back through
    /// <c>UsxFragmenter.FindFragments</c> / <c>UsfmToken.NormalizeUsfm</c> — the same code paths
    /// used by <see cref="ParatextProjectDataProvider.GetChapterUsx"/>,
    /// <see cref="ParatextProjectDataProvider.SetChapterUsx"/>, and
    /// <see cref="ParatextProjectDataProvider.GetChapterUsfm"/>.
    ///
    /// Context: the editor↔PDP sync hook observed an incoming USJ echo that differs (beyond
    /// whitespace) from what the editor sent for content containing a typed <c>//</c>. The
    /// TypeScript side of the pipeline (usjToUsxString/usxStringToUsj) is already proven
    /// idempotent for <c>{type:"optbreak"}</c>. These tests capture what happens on the
    /// ParatextData side of the round trip — the one leg that was previously uninspected — so the
    /// divergence can be classified as ParatextData-caused or as arising elsewhere in the
    /// pipeline. See
    /// scripture-editors/.superpowers/sdd/2026-07-30-attribute-display/w3b-optbreak-warn-report.md.
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class OptBreakRoundTripCaptureTests : PapiTestBase
    {
        private const string PdpName = "optbreak-soup";
        private const int BookNum = 1; // GEN, per existing fixture convention (see ParatextDataProviderTests)

        private ScrText _scrText = null!;
        private ProjectDetails _projectDetails = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();
            _scrText = CreateDummyProject();
            _projectDetails = CreateProjectDetails(_scrText);
            ParatextProjects.FakeAddProject(_projectDetails, _scrText);
        }

        [TearDown]
        public void TearDown()
        {
            _scrText?.Dispose();
        }

        [TestCase(@"\id GEN \c 1 \p one//two", TestName = "TightNoSpaces")]
        [TestCase(@"\id GEN \c 1 \p one // two", TestName = "SpacedAroundBreak")]
        public void CapturedBehavior_TypedOptBreak_RoundTripsCleanlyThroughParatextData(string usfm)
        {
            _scrText.PutText(BookNum, 0, false, usfm, null);

            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);

            var verseRef = new VerseRef(BookNum, 1, 0);

            // (a) USFM -> USX: capture what ParatextData actually emits for a typed `//`.
            //
            // CAPTURED (verbatim, TightNoSpaces case):
            //   <usx version="3.0"><book code="GEN" style="id" /><chapter number="1" style="c"
            //   sid="GEN 1" /><para style="p">one<optbreak />two</para><chapter eid="GEN 1" /></usx>
            // CAPTURED (verbatim, SpacedAroundBreak case):
            //   <usx version="3.0"><book code="GEN" style="id" /><chapter number="1" style="c"
            //   sid="GEN 1" /><para style="p">one <optbreak /> two</para><chapter eid="GEN 1" /></usx>
            //
            // Pin: ParatextData represents a typed `//` as a real <optbreak /> element, never as
            // literal `//` text, in both the tight and spaced forms. Surrounding whitespace (or
            // its absence) is preserved as separate text around the element.
            string usxFromTypedUsfm = provider.GetChapterUsx(verseRef);
            Assert.That(
                usxFromTypedUsfm,
                Does.Contain("<optbreak"),
                "Captured-behavior pin: ParatextData's forExport USX conversion must represent a "
                    + "typed `//` as an <optbreak/> element, not literal `//` text. If this fails, "
                    + "ParatextData's behavior changed and the divergence investigation's premise "
                    + "needs revisiting."
            );
            Assert.That(
                usxFromTypedUsfm,
                Does.Not.Contain("//"),
                "Captured-behavior pin: the literal `//` text should not survive alongside the "
                    + "<optbreak/> element (that would mean ParatextData emitted both, which would "
                    + "itself explain a visible doubling)."
            );

            // (b) Feed that USX (containing the real <optbreak/> ParatextData produced, not a
            // hand-guessed one) back through USX -> USFM via the provider's actual save path, and
            // confirm the optional line break survives as `//` in the saved USFM.
            //
            // CAPTURED (verbatim, both cases — NormalizeUsfm reformats onto separate lines):
            //   \id GEN
            //   \c 1
            //   \p one//two
            // (The spaced variant's surrounding spaces around `//` are collapsed by
            // NormalizeUsfm the same way the original typed-USFM save already collapsed them —
            // the saved USFM is identical either way.)
            provider.SetChapterUsx(verseRef, usxFromTypedUsfm);
            string usfmAfterUsxRoundTrip = provider.GetChapterUsfm(verseRef);
            Assert.That(
                usfmAfterUsxRoundTrip,
                Does.Contain("//"),
                "Captured-behavior pin: USFM saved from ParatextData's own <optbreak/> USX must "
                    + "still contain the `//` optional-line-break token."
            );

            // (c) Convert back to USX one more time (USX -> USFM -> USX, a full round trip of
            // ParatextData's own output) and check whether <optbreak/> survives unchanged or
            // degrades.
            //
            // CAPTURED: usxAfterFullRoundTrip is BYTE-IDENTICAL to usxFromTypedUsfm in both cases
            // — <optbreak/> survives the USX -> USFM -> USX round trip with no degradation to
            // text and no shape drift.
            string usxAfterFullRoundTrip = provider.GetChapterUsx(verseRef);
            Assert.That(
                usxAfterFullRoundTrip,
                Is.EqualTo(usxFromTypedUsfm),
                "Captured-behavior pin: ParatextData's USX -> USFM -> USX round trip for "
                    + "<optbreak/> is a fixed point (byte-identical output) in this harness. This "
                    + "is evidence the editor<->PDP USJ divergence for optbreak is NOT caused by "
                    + "ParatextData mangling the element — classify as clean-here, and look for the "
                    + "divergence elsewhere (e.g. capture a live USJ echo from the running app "
                    + "through the full editor<->PDP sync hook, not just this isolated USX/USFM leg)."
            );
        }
    }
}
