using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Captured-behavior pins for how this ParatextData (9.5) carries the USFM <c>\usfm</c> version
    /// header through the editor's read and save paths (<see cref="ParatextProjectDataProvider.GetChapterUsx"/>
    /// / <see cref="ParatextProjectDataProvider.GetBookUsx"/> and
    /// <see cref="ParatextProjectDataProvider.SetChapterUsx"/> / <see cref="ParatextProjectDataProvider.SetBookUsx"/>).
    ///
    /// Ground truth: the stylesheet defines <c>\usfm</c> as an ordinary paragraph marker
    /// (<c>\StyleType Paragraph</c>, <c>\OccursUnder id</c>), so <c>UsfmToUsx</c> writes it as
    /// <c>&lt;para style="usfm"&gt;3.0&lt;/para&gt;</c> — never as USX's <c>&lt;usfm&gt;</c> element,
    /// which is why <c>UsxFragmenter</c>'s no-op <c>case "usfm"</c> never sees it. The paragraph
    /// round-trips back to the same <c>\usfm</c> line byte for byte.
    ///
    /// The root <c>&lt;usx version&gt;</c> is NOT derived from the header: it is always
    /// <c>UsfmToUsx.UsxVersionNumber</c> ("3.0"), whatever the header says or whether there is one —
    /// on the verse read path (<see cref="ParatextProjectDataProvider.GetVerseUsx"/>) too.
    /// The header is document data and the stamp is converter metadata; the two are independent
    /// here, and Platform.Bible's TypeScript pipeline preserves each one as it was served.
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class UsfmVersionMarkerRoundTripCaptureTests : PapiTestBase
    {
        private const string PdpName = "usfm-version-marker";
        private const int BookNum = 1; // GEN, per existing fixture convention

        private DummyScrText _scrText = null!;
        private ProjectDetails _projectDetails = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();
            _scrText = CreateDummyProject();
            // The real usfm.sty, which defines \usfm. The dummy stylesheet does not, so under it the
            // header degrades to an unknown marker (`<para style="usfm" status="unknown">`).
            _scrText.UseStandardStylesheet();
            _projectDetails = CreateProjectDetails(_scrText);
            ParatextProjects.FakeAddProject(_projectDetails, _scrText);
        }

        [TearDown]
        public void TearDown()
        {
            _scrText?.Dispose();
        }

        private DummyParatextProjectDataProvider CreateProvider() =>
            new(PdpName, Client, _projectDetails, ParatextProjects);

        [TestCase("3.0", TestName = "UsfmHeader_3_0")]
        [TestCase("3.1", TestName = "UsfmHeader_3_1")]
        [TestCase("2.4", TestName = "UsfmHeader_2_4")]
        public void UsfmHeader_IsAParagraph_AndDoesNotSetTheUsxVersion(string headerVersion)
        {
            _scrText.PutText(
                BookNum,
                0,
                false,
                $"\\id GEN\r\n\\usfm {headerVersion}\r\n\\c 1\r\n\\p\r\n\\v 1 In the beginning.\r\n",
                null
            );
            DummyParatextProjectDataProvider provider = CreateProvider();
            var verseRef = new VerseRef(BookNum, 1, 0);

            string chapterUsx = provider.GetChapterUsx(verseRef);
            Assert.That(
                chapterUsx,
                Does.Contain($"<para style=\"usfm\">{headerVersion}</para>"),
                "\\usfm is a paragraph-type marker, so ParatextData writes it as a <para>."
            );
            Assert.That(
                chapterUsx,
                Does.Not.Contain("<usfm"),
                "ParatextData never writes USX's <usfm> element, the one UsxFragmenter ignores."
            );
            Assert.That(
                chapterUsx,
                Does.StartWith("<usx version=\"3.0\">"),
                "The USX version is UsfmToUsx.UsxVersionNumber, not the \\usfm header's version."
            );
            Assert.That(provider.GetBookUsx(verseRef), Does.StartWith("<usx version=\"3.0\">"));
            Assert.That(
                provider.GetVerseUsx(new VerseRef(BookNum, 1, 1)),
                Does.StartWith("<usx version=\"3.0\">"),
                "A verse's USX is stamped with the same version as its chapter's and book's."
            );
        }

        [Test]
        public void UsfmHeader_SurvivesTheChapterSavePath()
        {
            const string usfm =
                "\\id GEN\r\n\\usfm 3.0\r\n\\c 1\r\n\\p\r\n\\v 1 In the beginning.\r\n";
            _scrText.PutText(BookNum, 0, false, usfm, null);
            DummyParatextProjectDataProvider provider = CreateProvider();
            var verseRef = new VerseRef(BookNum, 1, 0);

            string usx = provider.GetChapterUsx(verseRef);
            // `SetChapterUsx` returns false when the USX converts to exactly the chapter's current
            // USFM and so writes nothing — the strongest form of "the header survived".
            Assert.That(
                provider.SetChapterUsx(verseRef, usx),
                Is.False,
                "the chapter's own USX must convert back to its USFM byte for byte"
            );
            Assert.That(provider.GetBookUsfm(verseRef), Is.EqualTo(usfm));
            Assert.That(provider.GetChapterUsx(verseRef), Is.EqualTo(usx));
        }

        [Test]
        public void UsfmHeader_SurvivesTheBookSavePath()
        {
            const string usfm =
                "\\id GEN\r\n\\usfm 3.0\r\n\\c 1\r\n\\p\r\n\\v 1 In the beginning.\r\n";
            _scrText.PutText(BookNum, 0, false, usfm, null);
            DummyParatextProjectDataProvider provider = CreateProvider();
            var verseRef = new VerseRef(BookNum, 1, 0);

            string usx = provider.GetBookUsx(verseRef);
            Assert.That(provider.SetBookUsx(verseRef, usx), Is.True);
            Assert.That(provider.GetBookUsfm(verseRef), Is.EqualTo(usfm));
        }

        [Test]
        public void RootUsxVersion_IsNotReadOnTheSavePath()
        {
            // The save path keys on content only: a USX labelled 3.1 writes the same USFM as the 3.0
            // USX it was relabelled from. Pins that the version Platform.Bible hands back is inert
            // here: whatever version reaches this path, it cannot change a saved byte.
            const string usfm =
                "\\id GEN\r\n\\usfm 3.0\r\n\\c 1\r\n\\p\r\n\\v 1 In the beginning.\r\n";
            _scrText.PutText(BookNum, 0, false, usfm, null);
            DummyParatextProjectDataProvider provider = CreateProvider();
            var verseRef = new VerseRef(BookNum, 1, 0);

            string usx = provider.GetChapterUsx(verseRef);
            string relabelled = usx.Replace("<usx version=\"3.0\">", "<usx version=\"3.1\">");
            Assert.That(
                relabelled,
                Is.Not.EqualTo(usx),
                "the relabel must actually change the USX"
            );
            Assert.That(
                provider.SetChapterUsx(verseRef, relabelled),
                Is.False,
                "a relabelled USX must convert to the chapter's current USFM, so nothing is written"
            );
            Assert.That(provider.GetBookUsfm(verseRef), Is.EqualTo(usfm));
        }
    }
}
