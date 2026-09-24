using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Captured-behavior pins for how ParatextData round-trips a CLOSED character span
    /// (<c>\nd come togedda\nd*</c>) through the same provider methods the editor's PDP sync exercises
    /// (<see cref="ParatextProjectDataProvider.GetChapterUsx"/>,
    /// <see cref="ParatextProjectDataProvider.SetChapterUsx"/>,
    /// <see cref="ParatextProjectDataProvider.GetChapterUsfm"/>).
    ///
    /// Motivation: the editor's editor↔PDP lossy-round-trip telemetry flagged a <c>\nd</c> span as a
    /// beyond-whitespace sent-vs-received divergence (WEB Luke 4 investigation, content[16]). These
    /// pins capture ParatextData's ACTUAL representation of the span so the divergence can be
    /// attributed to a specific side (the editor's USJ vs the PDP's USX) rather than guessed at.
    ///
    /// Finding: ParatextData is EXONERATED as a source of loss for this span. A closed
    /// <c>\nd X\nd*</c> round-trips as a byte-faithful fixed point (USFM -> USX -> USFM -> USX with no
    /// drift), and an authored inner trailing space before the closer (<c>\nd come togedda \nd*</c>)
    /// is preserved as significant content (<c>come togedda </c>), not trimmed. The
    /// scripture-editors editor adaptor likewise round-trips the same span — inner trailing space and
    /// all — with no change (verified separately). Both STATIC round trips are therefore clean, so the
    /// content[16] warning was not a static structural round-trip defect on either side; it points at
    /// a LIVE-editing divergence in the inner trailing space (which the whitespace-insensitive
    /// equality treats as significant when it is not at the end of a block), reproducible only against
    /// the running editor. See the w5d follow-up notes for the named investigation.
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class NdSpanRoundTripCaptureTests : PapiTestBase
    {
        private const string PdpName = "nd-span-soup";
        private const int BookNum = 1; // GEN, per existing fixture convention

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

        // Each case pins one authored form of the span with its EXACT expected USX <para> inner
        // content and its EXACT saved-USFM paragraph content — capturing whether ParatextData keeps a
        // trailing space inside the span, adds a closed attribute, or otherwise reshapes the span.
        [TestCase(
            @"\id GEN \c 1 \p a \nd come togedda\nd* b",
            "a <char style=\"nd\">come togedda</char> b",
            "a \\nd come togedda\\nd* b",
            TestName = "NoInnerTrailingSpace"
        )]
        [TestCase(
            @"\id GEN \c 1 \p a \nd come togedda \nd* b",
            "a <char style=\"nd\">come togedda </char> b",
            "a \\nd come togedda \\nd* b",
            TestName = "InnerTrailingSpaceBeforeCloser"
        )]
        public void ClosedNdSpan_RoundTripsThroughParatextData(
            string usfm,
            string expectedParaInner,
            string expectedUsfmParagraphContent
        )
        {
            _scrText.PutText(BookNum, 0, false, usfm, null);

            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);

            var verseRef = new VerseRef(BookNum, 1, 0);

            // (a) USFM -> USX: capture how ParatextData represents the closed \nd span.
            string usxFromTypedUsfm = provider.GetChapterUsx(verseRef);
            TestContext.Out.WriteLine("USX: " + usxFromTypedUsfm);
            Assert.That(
                usxFromTypedUsfm,
                Does.Contain($"<para style=\"p\">{expectedParaInner}</para>"),
                "USFM -> USX representation of the closed \\nd span (captured pin)."
            );

            // (b) USX -> USFM: capture the saved-USFM byte form after a full provider round trip.
            // The write result is asserted so this pin is falsifiable: a write the provider
            // REJECTS would otherwise still pass, because the seeded and expected content
            // coincide.
            Assert.That(
                provider.SetChapterUsx(verseRef, usxFromTypedUsfm),
                Is.True,
                "SetChapterUsx must accept the captured USX (a rejected write leaves the seeded content in place, and the pins below would pass vacuously)."
            );
            string usfmAfterUsxRoundTrip = provider.GetChapterUsfm(verseRef);
            TestContext.Out.WriteLine("USFM: " + usfmAfterUsxRoundTrip);
            Assert.That(
                usfmAfterUsxRoundTrip,
                Does.Contain($"\\p {expectedUsfmParagraphContent}"),
                "USX -> USFM saved byte form of the closed \\nd span (captured pin)."
            );

            // (c) USX -> USFM -> USX is a fixed point (no drift on re-read).
            string usxAfterFullRoundTrip = provider.GetChapterUsx(verseRef);
            Assert.That(
                usxAfterFullRoundTrip,
                Is.EqualTo(usxFromTypedUsfm),
                "ParatextData's USX -> USFM -> USX round trip for the closed \\nd span is a fixed point."
            );
        }
    }
}
