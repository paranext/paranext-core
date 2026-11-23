using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using SIL.Scripture;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Captured-behavior pins for a lone carriage return (one not followed by a line feed), which
    /// Platform.Bible leaves to ParatextData as Paratext 9 does: on disk it is deleted, joining the
    /// text on either side (<c>ScrText.StandardizeCrLfsIfNecessary</c> on write,
    /// <c>ScrText.ProcessBookOrChapterText</c> on read), and through the USX save path it becomes a
    /// space (<c>UsfmToken.RegularizeSpaces</c>). Catalog row E-2.
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class LoneCarriageReturnCaptureTests : PapiTestBase
    {
        private const string PdpName = "lone-carriage-return";
        private const int BookNum = 1; // GEN, per existing fixture convention

        private DummyScrText _scrText = null!;
        private ProjectDetails _projectDetails = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();
            _scrText = CreateDummyProject();
            _scrText.UseStandardStylesheet();
            _projectDetails = CreateProjectDetails(_scrText);
            ParatextProjects.FakeAddProject(_projectDetails, _scrText);
        }

        [TearDown]
        public void TearDown()
        {
            _scrText?.Dispose();
        }

        [Test]
        public void LoneCr_InBookText_IsDeleted()
        {
            _scrText.PutText(
                BookNum,
                0,
                false,
                "\\id GEN\r\n\\c 1\r\n\\p\r\n\\v 1 one\rtwo\r\n",
                null
            );

            Assert.That(_scrText.GetText(BookNum), Does.Contain("\\v 1 onetwo\r\n"));
        }

        [Test]
        public void LoneCr_InSavedUsx_BecomesASpace()
        {
            _scrText.PutText(BookNum, 0, false, "\\id GEN\r\n\\c 1\r\n\\p\r\n\\v 1 old\r\n", null);
            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);
            var verseRef = new VerseRef(BookNum, 1, 0);
            string usx = provider
                .GetChapterUsx(verseRef)
                .Replace("old", "one\rtwo", StringComparison.Ordinal);

            provider.SetChapterUsx(verseRef, usx);

            Assert.That(_scrText.GetText(BookNum), Does.Contain("\\v 1 one two\r\n"));
        }
    }
}
