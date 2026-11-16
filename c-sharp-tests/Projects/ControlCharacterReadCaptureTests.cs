using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using SIL.Scripture;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Captured-behavior pins for a C0 control character other than tab, line feed and carriage
    /// return in book text: ParatextData reads each one as a space
    /// (<c>ScrText.ProcessBookOrChapterText</c>), so no text the editor loads holds one. The editor
    /// relies on that to use U+000B and U+001A as display-only stand-ins that no loaded text can
    /// collide with. Catalog rows T-19 and EV-6.
    /// </summary>
    [ExcludeFromCodeCoverage]
    internal class ControlCharacterReadCaptureTests : PapiTestBase
    {
        private const string PdpName = "control-character-read";
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

        [TestCase(0x01)]
        [TestCase(0x0B)]
        [TestCase(0x0C)]
        [TestCase(0x1A)]
        [TestCase(0x1F)]
        public void ControlCharacter_InBookText_IsReadAsASpace(int codePoint)
        {
            char control = (char)codePoint;
            _scrText.PutText(
                BookNum,
                0,
                false,
                $"\\id GEN\r\n\\c 1\r\n\\p\r\n\\v 1 one{control}two\r\n",
                null
            );

            Assert.That(_scrText.GetText(BookNum), Does.Contain("\\v 1 one two\r\n"));
        }

        [TestCase(0x0B)]
        [TestCase(0x1A)]
        public void ControlCharacter_InChapterUsx_IsASpace(int codePoint)
        {
            char control = (char)codePoint;
            _scrText.PutText(
                BookNum,
                0,
                false,
                $"\\id GEN\r\n\\c 1\r\n\\p\r\n\\v 1 one{control}two\r\n",
                null
            );
            DummyParatextProjectDataProvider provider =
                new(PdpName, Client, _projectDetails, ParatextProjects);

            string usx = provider.GetChapterUsx(new VerseRef(BookNum, 1, 0));

            Assert.That(usx, Does.Contain("one two"));
            Assert.That(usx.Contains(control, StringComparison.Ordinal), Is.False);
        }
    }
}
