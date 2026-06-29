using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Unit tests for <see cref="ParatextProjectDataProvider.MapVerseRefBetweenProjects"/>.
    /// Two dummy projects with different versifications are registered; the test verifies the
    /// command resolves each project's versification, grounds the SOURCE frame in the source
    /// project (ignoring any versification carried on the input ref), and delegates to libpalaso's
    /// ChangeVersification. Assertions compare against a direct libpalaso conversion so they verify
    /// our wiring, not libpalaso's mapping tables.
    /// </summary>
    [ExcludeFromCodeCoverage]
    [TestFixture]
    internal class ParatextProjectDataProviderMapVerseRefBetweenProjectsTests : PapiTestBase
    {
        private ScrText _englishScrText = null!;
        private ScrText _orthodoxScrText = null!;
        private string _englishId = null!;
        private string _orthodoxId = null!;
        private DummyParatextProjectDataProvider _provider = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();

            _englishScrText = CreateDummyProject();
            _englishScrText.Settings.Versification = new ScrVers(ScrVersType.English);
            var englishDetails = CreateProjectDetails(_englishScrText);
            ParatextProjects.FakeAddProject(englishDetails, _englishScrText);
            _englishId = englishDetails.Metadata.Id;

            _orthodoxScrText = CreateDummyProject();
            _orthodoxScrText.Settings.Versification = new ScrVers(ScrVersType.RussianOrthodox);
            var orthodoxDetails = CreateProjectDetails(_orthodoxScrText);
            ParatextProjects.FakeAddProject(orthodoxDetails, _orthodoxScrText);
            _orthodoxId = orthodoxDetails.Metadata.Id;

            _provider = new DummyParatextProjectDataProvider(
                "mapVerseRefTestProject",
                Client,
                englishDetails,
                ParatextProjects
            );
        }

        [TearDown]
        public void TearDown()
        {
            _englishScrText?.Dispose();
            _orthodoxScrText?.Dispose();
        }

        [Test]
        [Description("Same source and target project → reference is returned unchanged.")]
        public void SameProject_ReturnsUnchanged()
        {
            var input = new VerseRef("PSA 23:1", new ScrVers(ScrVersType.English));

            var result = _provider.MapVerseRefBetweenProjects(input, _englishId, _englishId);

            Assert.That(result.BookNum, Is.EqualTo(input.BookNum));
            Assert.That(result.ChapterNum, Is.EqualTo(input.ChapterNum));
            Assert.That(result.VerseNum, Is.EqualTo(input.VerseNum));
            Assert.That(result.Versification, Is.EqualTo(_englishScrText.Settings.Versification));
        }

        [Test]
        [Description(
            "Source versification is grounded in the SOURCE PROJECT, not the input ref's own "
                + "versification. Input is tagged Orthodox but sourceProjectId is the English "
                + "project, so the result must equal an English→Orthodox conversion."
        )]
        public void GroundsSourceInProject_NotInRefVersification()
        {
            var englishVers = _englishScrText.Settings.Versification;
            var orthodoxVers = _orthodoxScrText.Settings.Versification;

            // Tag the input with the WRONG (target) versification on purpose.
            var input = new VerseRef("PSA 147:1", orthodoxVers);

            var expected = new VerseRef("PSA 147:1", englishVers);
            expected.ChangeVersification(orthodoxVers);

            var result = _provider.MapVerseRefBetweenProjects(input, _englishId, _orthodoxId);

            Assert.That(result.Versification, Is.EqualTo(orthodoxVers));
            Assert.That(result.BBBCCCVVV, Is.EqualTo(expected.BBBCCCVVV));
        }

        [Test]
        [Description("Null sourceProjectId → source is treated as canonical English.")]
        public void NullSource_TreatedAsEnglish()
        {
            var englishVers = new ScrVers(ScrVersType.English);
            var orthodoxVers = _orthodoxScrText.Settings.Versification;

            var input = new VerseRef("PSA 147:1", englishVers);

            var expected = new VerseRef("PSA 147:1", englishVers);
            expected.ChangeVersification(orthodoxVers);

            var result = _provider.MapVerseRefBetweenProjects(input, null, _orthodoxId);

            Assert.That(result.Versification, Is.EqualTo(orthodoxVers));
            Assert.That(result.BBBCCCVVV, Is.EqualTo(expected.BBBCCCVVV));
        }
    }
}
