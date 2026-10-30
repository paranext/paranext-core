using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Captured-behavior pins for a paragraph's LEADING space through the data provider's save path
    /// (<see cref="ParatextProjectDataProvider.SetChapterUsx"/>, then the saved USFM and
    /// <see cref="ParatextProjectDataProvider.GetChapterUsx"/>), plus the USFM-in direction and an
    /// NBSP control. Each pin records exactly what ParatextData produced.
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class ParagraphLeadingSpaceRoundTripCaptureTests : PapiTestBase
    {
        private const string PdpName = "paragraph-leading-space-soup";
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

        private static string WrapUsx(string paraXml) =>
            "<usx version=\"3.0\"><book code=\"GEN\" style=\"id\">- test</book>"
            + "<chapter number=\"1\" style=\"c\" sid=\"GEN 1\" />"
            + paraXml
            + "<chapter eid=\"GEN 1\" /></usx>";

        // Marks spaces as '.' and NBSP as '~' so the pins show the bytes.
        private static string Visible(string s) =>
            s.Replace(' ', '.').Replace('\u00a0', '~').Replace("\r", "\\r").Replace("\n", "\\n");

        private (string Usfm, string Usx) SaveUsxAndReadBack(string paraXml)
        {
            _scrText.PutText(BookNum, 0, false, "\\id GEN\r\n\\c 1\r\n\\p seed\r\n", null);
            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);
            var verseRef = new VerseRef(BookNum, 1, 0);
            Assert.That(provider.SetChapterUsx(verseRef, WrapUsx(paraXml)), Is.True);
            string usfm = provider.GetChapterUsfm(verseRef);
            string usx = provider.GetChapterUsx(verseRef);
            TestContext.Out.WriteLine("USFM: " + Visible(usfm));
            TestContext.Out.WriteLine("USX: " + Visible(usx));
            return (usfm, usx);
        }

        private const string UsxPrefix =
            "<usx version=\"3.0\"><book code=\"GEN\" style=\"id\">- test</book>"
            + "<chapter number=\"1\" style=\"c\" sid=\"GEN 1\" />";
        private const string UsxSuffix = "<chapter eid=\"GEN 1\" /></usx>";

        // Each case pins what ParatextData produced: the USFM saved from the authored USX, and the
        // USX read back afterwards. A plain leading space does not survive; an NBSP survives (saved as USFM `~`, read back as U+00A0).
        [TestCase(
            "<para style=\"p\"> leading text</para>",
            "\\id GEN - test\r\n\\c 1\r\n\\p leading text\r\n",
            "<para style=\"p\">leading text</para>",
            TestName = "OneLeadingSpace_IsDroppedOnSave"
        )]
        [TestCase(
            "<para style=\"p\">  leading text</para>",
            "\\id GEN - test\r\n\\c 1\r\n\\p leading text\r\n",
            "<para style=\"p\">leading text</para>",
            TestName = "TwoLeadingSpaces_AreDroppedOnSave"
        )]
        [TestCase(
            "<para style=\"p\"> <verse number=\"1\" style=\"v\" sid=\"GEN 1:1\" />text<verse eid=\"GEN 1:1\" /></para>",
            "\\id GEN - test\r\n\\c 1\r\n\\p\r\n\\v 1 text\r\n",
            "<para style=\"p\"><verse number=\"1\" style=\"v\" sid=\"GEN 1:1\" />text<verse eid=\"GEN 1:1\" /></para>",
            TestName = "SpaceBeforeVerse_IsDroppedOnSave"
        )]
        [TestCase(
            "<para style=\"p\">&#160;leading</para>",
            "\\id GEN - test\r\n\\c 1\r\n\\p ~leading\r\n",
            "<para style=\"p\">\u00a0leading</para>",
            TestName = "LeadingNbsp_SurvivesSave"
        )]
        public void ParagraphLeadingSpace_SetChapterUsx(
            string paraXml,
            string expectedUsfm,
            string expectedParaXml
        )
        {
            var (usfm, usx) = SaveUsxAndReadBack(paraXml);
            Assert.That(usfm, Is.EqualTo(expectedUsfm));
            Assert.That(usx, Is.EqualTo(UsxPrefix + expectedParaXml + UsxSuffix));
        }

        // USFM in: the disk bytes keep both spaces after the marker, but GetChapterUsx omits them.
        [Test]
        public void ParagraphTwoSpacesAfterMarker_UsfmSurvivesOnDiskButNotInUsx()
        {
            _scrText.PutText(BookNum, 0, false, "\\id GEN\r\n\\c 1\r\n\\p  leading text", null);
            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);
            var verseRef = new VerseRef(BookNum, 1, 0);
            Assert.That(
                provider.GetChapterUsfm(verseRef),
                Is.EqualTo("\\id GEN\r\n\\c 1\r\n\\p  leading text\r\n")
            );
            Assert.That(
                provider.GetChapterUsx(verseRef),
                Is.EqualTo(
                    "<usx version=\"3.0\"><book code=\"GEN\" style=\"id\" />"
                        + "<chapter number=\"1\" style=\"c\" sid=\"GEN 1\" />"
                        + "<para style=\"p\">leading text</para>"
                        + UsxSuffix
                )
            );
        }
    }
}
