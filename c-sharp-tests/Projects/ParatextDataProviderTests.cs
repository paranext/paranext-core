using System.Diagnostics.CodeAnalysis;
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
        public override async Task TestSetup()
        {
            await base.TestSetup();
            _scrText = CreateDummyProject();

            _projectDetails = CreateProjectDetails(_scrText);
            ParatextProjects.FakeAddProject(_projectDetails, _scrText);

            var settingsService = new DummySettingsService(Client);
            await settingsService.RegisterDataProviderAsync();
            settingsService.AddSettingValue(Settings.INCLUDE_MY_PARATEXT_9_PROJECTS, true);
        }

        [TearDown]
        public void TearDown()
        {
            _scrText?.Dispose();
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
