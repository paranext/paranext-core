using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.Projects;
using Paranext.DataProvider.Services;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.Projects
{
    [ExcludeFromCodeCoverage]
    internal class ParatextDataProviderTests : PapiTestBase
    {
        private const string PdpName = "soup";

        private ScrText _scrText = null!; // Will be non-null when the test runs
        private ProjectDetails _projectDetails = null!; // Will be non-null when the test runs

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

        [TestCase(1, 1, 0, @"\id GEN \ip intro \c 1 ")]
        [TestCase(1, 2, 1, @"\v 1 verse one ")]
        [TestCase(1, 2, 6, @"\v 6 verse six ")]
        [TestCase(1, 2, 10, "")] // Missing verse
        [TestCase(1, 6, 1, "")] // Missing chapter
        [TestCase(3, 5, 3, "")] // Missing book
        public void GetVerseUsfm_ValidResults(
            int bookNum,
            int chapterNum,
            int verseNum,
            string expectedResult
        )
        {
            _scrText.PutText(
                1,
                0,
                false,
                @"\id GEN \ip intro \c 1 \v 1 some text \c 2 \p \v 1 verse one \v 6 verse six \v 7 verse seven \c 3 \p \v 1 bla",
                null
            );

            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);
            ThreadingUtils.RunTask(
                provider.RegisterDataProviderAsync(),
                "",
                TimeSpan.FromSeconds(1)
            );

            var result = provider.GetVerseUsfm(new VerseRef(bookNum, chapterNum, verseNum));
            VerifyUsfmSame(result, expectedResult, _scrText, bookNum);
        }

        [TestCase(1, 1, 0, @"\id GEN \ip intro \c 1 \v 1 some text")]
        [TestCase(1, 2, 0, @"\c 2 \p \v 1 verse one \v 6 verse six \v 7 verse seven")]
        [TestCase(1, 3, 0, @"\c 3 \p \v 1 bla")]
        [TestCase(1, 5, 0, "")] // Missing chapter
        [TestCase(3, 5, 0, "")] // Missing book
        public void GetChapterUsfm_ValidResults(
            int bookNum,
            int chapterNum,
            int verseNum,
            string expectedResult
        )
        {
            _scrText.PutText(
                1,
                0,
                false,
                @"\id GEN \ip intro \c 1 \v 1 some text \c 2 \p \v 1 verse one \v 6 verse six \v 7 verse seven \c 3 \p \v 1 bla",
                null
            );

            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);
            ThreadingUtils.RunTask(
                provider.RegisterDataProviderAsync(),
                "",
                TimeSpan.FromSeconds(1)
            );

            var result = provider.GetChapterUsfm(new VerseRef(bookNum, chapterNum, verseNum));
            VerifyUsfmSame(result, expectedResult, _scrText, bookNum);
        }

        [TestCase(
            1,
            2,
            0,
            @"\id GEN \ip intro \c 1 \v 1 some text \c 2 \p \v 1 verse one \v 6 verse six \v 7 verse seven \c 3 \p \v 1 bla"
        )]
        [TestCase(3, 2, 0, "")] // Missing book
        public void GetBookUsfm_ValidResults(
            int bookNum,
            int chapterNum,
            int verseNum,
            string expectedResult
        )
        {
            _scrText.PutText(
                1,
                0,
                false,
                @"\id GEN \ip intro \c 1 \v 1 some text \c 2 \p \v 1 verse one \v 6 verse six \v 7 verse seven \c 3 \p \v 1 bla",
                null
            );

            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);
            ThreadingUtils.RunTask(
                provider.RegisterDataProviderAsync(),
                "",
                TimeSpan.FromSeconds(1)
            );

            var result = provider.GetBookUsfm(new VerseRef(bookNum, chapterNum, verseNum));
            VerifyUsfmSame(result, expectedResult, _scrText, bookNum);
        }

        [TestCase(
            1,
            4,
            0,
            @"<usx version=""3.0""><chapter number=""4"" style=""c"" />"
                + @"<para style=""p""><verse number=""3"" style=""v"" />a whole new chapter!</para></usx>",
            @"\id GEN \ip intro \c 2 \p \v 1 verse one \v 7 verse seven \c 3 \p \v 1 bla \c 4 \p \v 3 a whole new chapter!"
        )]
        [TestCase(
            1,
            2,
            0,
            @"<usx version=""3.0""><chapter number=""2"" style=""c"" />"
                + @"<para style=""p""><verse number=""2"" style=""v"" />New chapter text.</para></usx>",
            @"\id GEN \ip intro \c 2 \p \v 2 New chapter text. \c 3 \p \v 1 bla"
        )]
        public void SetChapterUsx_ValidResults(
            int bookNum,
            int chapterNum,
            int verseNum,
            string newValue,
            string expectedResult
        )
        {
            Random random = new();
            int requesterId = random.Next();

            _scrText.PutText(
                1,
                0,
                false,
                @"\id GEN \ip intro \c 2 \p \v 1 verse one \v 7 verse seven \c 3 \p \v 1 bla",
                null
            );

            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);

            var verseRef = new VerseRef(bookNum, chapterNum, verseNum);
            provider.SetChapterUsx(verseRef, newValue);

            // Verify the new text was saved to disk
            VerseRef reference =
                new(bookNum, chapterNum, verseNum, _scrText.Settings.Versification);
            VerifyUsfmSame(_scrText.GetText(reference, false, false), expectedResult, _scrText, 1);

            string receivedUsx = provider.GetChapterUsx(verseRef);
            VerifyUsxSame(receivedUsx, newValue);
        }

        [TestCase(
            1,
            4,
            0,
            @"\c 4 \p \v 3 a whole new chapter!",
            @"\id GEN \ip intro \c 2 \p \v 1 verse one \v 7 verse seven \c 3 \p \v 1 bla \c 4 \p \v 3 a whole new chapter!"
        )]
        [TestCase(
            1,
            2,
            0,
            @"\c 2 \p \v 2 New chapter text.",
            @"\id GEN \ip intro \c 2 \p \v 2 New chapter text. \c 3 \p \v 1 bla"
        )]
        public void SetChapterUsfm_ValidResults(
            int bookNum,
            int chapterNum,
            int verseNum,
            string newValue,
            string expectedResult
        )
        {
            _scrText.PutText(
                1,
                0,
                false,
                @"\id GEN \ip intro \c 2 \p \v 1 verse one \v 7 verse seven \c 3 \p \v 1 bla",
                null
            );

            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);

            var verseRef = new VerseRef(bookNum, chapterNum, verseNum);
            provider.SetChapterUsfm(verseRef, newValue);

            // Verify the new text was saved to disk
            VerseRef reference =
                new(bookNum, chapterNum, verseNum, _scrText.Settings.Versification);
            VerifyUsfmSame(_scrText.GetText(reference, false, false), expectedResult, _scrText, 1);

            string receivedUsfm = provider.GetChapterUsfm(verseRef);
            VerifyUsfmSame(receivedUsfm, newValue, _scrText, 1);
        }

        [Test]
        public void SetAndGetExtensionData_SavesAndGetsData()
        {
            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);

            var scope = new ProjectDataScope
            {
                ProjectID = _projectDetails.Metadata.Id,
                ExtensionName = "myExtension",
                DataQualifier = "myFile.txt",
            };
            provider.SetExtensionData(scope, "Random file contents");

            var retrievedScope = provider.GetExtensionData(scope);
            Assert.That(retrievedScope, Is.EqualTo("Random file contents"));
        }
    }
}
