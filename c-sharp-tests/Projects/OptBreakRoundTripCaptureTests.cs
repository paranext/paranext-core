using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Captured-behavior pins for how ParatextData actually round-trips the USFM optional line break
    /// token (<c>//</c>) through <c>UsfmToUsx.ConvertToXmlDocument</c> (forExport, chapter-scoped) and
    /// back through <c>UsxFragmenter.FindFragments</c> / <c>UsfmToken.NormalizeUsfm</c> — the same
    /// code paths used by <see cref="ParatextProjectDataProvider.GetChapterUsx"/>,
    /// <see cref="ParatextProjectDataProvider.SetChapterUsx"/>, and
    /// <see cref="ParatextProjectDataProvider.GetChapterUsfm"/>.
    ///
    /// Ground truth (verified empirically against these exact provider methods): ParatextData treats
    /// the spaces around <c>//</c> as SIGNIFICANT and preserves them byte-faithfully. The four spacing
    /// variants — <c>one//two</c>, <c>one // two</c>, <c>one //two</c>, <c>one// two</c> — each
    /// round-trip to a distinct byte form; none collapse to another.
    ///
    /// This corrects an earlier revision of these pins whose comments asserted that
    /// <c>one // two</c> collapses to <c>one//two</c>. That claim was never validated against the
    /// provider's actual output and is false: <c>UsfmParser</c> splits the text on <c>//</c> with a
    /// capturing regex (<c>optBreakSplitter = new Regex("(//)")</c>), so the surrounding text
    /// (<c>"one "</c> / <c>" two"</c>) is emitted as separate text around the <c>&lt;optbreak/&gt;</c>
    /// element; <c>UsxFragmenter</c> re-emits those text nodes verbatim; and <c>NormalizeUsfm</c>'s
    /// <c>RegularizeSpaces</c> only collapses CONSECUTIVE whitespace, so the single spaces adjacent to
    /// <c>//</c> survive. ParatextData is therefore exonerated as a source of optbreak whitespace loss.
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

        // Each case pins one spacing variant with its EXACT expected USX <para> inner content and its
        // EXACT expected saved-USFM paragraph content. The four expected forms are all distinct — that
        // is the point: spaces around `//` are significant and are never collapsed away or into each
        // other.
        [TestCase(
            @"\id GEN \c 1 \p one//two",
            "one<optbreak />two",
            "one//two",
            TestName = "TightNoSpaces"
        )]
        [TestCase(
            @"\id GEN \c 1 \p one // two",
            "one <optbreak /> two",
            "one // two",
            TestName = "SpacedAroundBreak"
        )]
        [TestCase(
            @"\id GEN \c 1 \p one //two",
            "one <optbreak />two",
            "one //two",
            TestName = "LeadingSpaceOnly"
        )]
        [TestCase(
            @"\id GEN \c 1 \p one// two",
            "one<optbreak /> two",
            "one// two",
            TestName = "TrailingSpaceOnly"
        )]
        public void TypedOptBreak_PreservesSurroundingSpaces_ThroughParatextData(
            string usfm,
            string expectedParaInner,
            string expectedUsfmParagraphContent
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

            // (a) USFM -> USX: a typed `//` becomes a real <optbreak /> element, and the spaces (or
            // their absence) on either side are preserved verbatim as text around that element.
            string usxFromTypedUsfm = provider.GetChapterUsx(verseRef);
            Assert.That(
                usxFromTypedUsfm,
                Does.Contain($"<para style=\"p\">{expectedParaInner}</para>"),
                "USFM -> USX must represent a typed `//` as an <optbreak/> element with the "
                    + "surrounding spaces preserved exactly as text nodes around it."
            );

            // (b) Feed ParatextData's own <optbreak/> USX back through the provider's real save path
            // (USX -> USFM via ConvertUsxToUsfm, which loads with LoadOptions.PreserveWhitespace) and
            // confirm the `//` AND its exact surrounding spaces survive in the saved USFM.
            provider.SetChapterUsx(verseRef, usxFromTypedUsfm);
            string usfmAfterUsxRoundTrip = provider.GetChapterUsfm(verseRef);
            Assert.That(
                usfmAfterUsxRoundTrip,
                Does.Contain($"\\p {expectedUsfmParagraphContent}"),
                "USFM saved from ParatextData's own <optbreak/> USX must preserve the `//` token with "
                    + "its surrounding spaces byte-for-byte (spaces around `//` are significant)."
            );

            // (c) USX -> USFM -> USX is a fixed point: converting the round-tripped USFM back to USX
            // reproduces the original USX byte-for-byte, with no whitespace drift.
            string usxAfterFullRoundTrip = provider.GetChapterUsx(verseRef);
            Assert.That(
                usxAfterFullRoundTrip,
                Is.EqualTo(usxFromTypedUsfm),
                "ParatextData's USX -> USFM -> USX round trip for <optbreak/> is a fixed point "
                    + "(byte-identical), including the surrounding whitespace."
            );
        }

        // Cross-variant guard: the four spacing forms must NOT converge. If any two produced the same
        // saved USFM, that would be exactly the whitespace-collapse defect this suite exists to rule
        // out at the ParatextData layer.
        [Test]
        public void TypedOptBreak_SpacingVariants_StayDistinctThroughParatextData()
        {
            string[] inputs =
            {
                @"\id GEN \c 1 \p one//two",
                @"\id GEN \c 1 \p one // two",
                @"\id GEN \c 1 \p one //two",
                @"\id GEN \c 1 \p one// two",
            };

            var savedUsfms = new List<string>();
            var verseRef = new VerseRef(BookNum, 1, 0);
            foreach (string usfm in inputs)
            {
                _scrText.PutText(BookNum, 0, false, usfm, null);
                DummyParatextProjectDataProvider provider = new(
                    PdpName,
                    Client,
                    _projectDetails,
                    ParatextProjects
                );
                string usx = provider.GetChapterUsx(verseRef);
                provider.SetChapterUsx(verseRef, usx);
                savedUsfms.Add(provider.GetChapterUsfm(verseRef));
            }

            Assert.That(
                savedUsfms.Distinct().Count(),
                Is.EqualTo(inputs.Length),
                "All four optbreak spacing variants must round-trip to distinct saved USFM; any "
                    + "collapse would mean ParatextData lost significant whitespace around `//`."
            );
        }
    }
}
