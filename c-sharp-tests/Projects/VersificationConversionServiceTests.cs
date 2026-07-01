using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Unit tests for <see cref="VersificationConversionService.MapVerseRefBetweenProjects"/>.
    /// Two dummy projects with different versifications are registered; the tests verify the
    /// command resolves each project's versification, grounds the SOURCE frame in the source
    /// project (ignoring any versification carried on the input ref), and delegates to libpalaso's
    /// ChangeVersification / ChangeVersificationWithRanges. Assertions compare against a direct
    /// libpalaso conversion so they verify our wiring, not libpalaso's mapping tables.
    /// Unmapped-verse behavior (a verse returned unchanged rather than zeroed) is libpalaso's
    /// <c>ChangeVersification</c> behavior; it is not unit-tested here because a robust assertion
    /// requires .vrs table specifics — it is covered by integration/manual testing. The command is
    /// best-effort: an unknown source frame (null) or an unresolvable project returns the reference
    /// unchanged rather than throwing (see the *ReturnsUnchanged tests).
    /// </summary>
    [ExcludeFromCodeCoverage]
    [TestFixture]
    internal class VersificationConversionServiceTests : PapiTestBase
    {
        private ScrText _englishScrText = null!;
        private ScrText _orthodoxScrText = null!;
        private string _englishId = null!;
        private string _orthodoxId = null!;
        private VersificationConversionService _service = null!;

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

            _service = new VersificationConversionService(Client);
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

            var result = _service.MapVerseRefBetweenProjects(input, _englishId, _englishId);

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

            var result = _service.MapVerseRefBetweenProjects(input, _englishId, _orthodoxId);

            Assert.That(result.Versification, Is.EqualTo(orthodoxVers));
            Assert.That(result.BBBCCCVVV, Is.EqualTo(expected.BBBCCCVVV));
        }

        [Test]
        [Description(
            "Null sourceProjectId means the source frame is unknown, so the reference is returned "
                + "unchanged rather than assumed English and converted."
        )]
        public void NullSource_ReturnsUnchanged()
        {
            var englishVers = new ScrVers(ScrVersType.English);

            var input = new VerseRef("PSA 147:1", englishVers);

            var result = _service.MapVerseRefBetweenProjects(input, null, _orthodoxId);

            // Not converted: versification and numbers are exactly the input's.
            Assert.That(result.Versification, Is.EqualTo(englishVers));
            Assert.That(result.BBBCCCVVV, Is.EqualTo(input.BBBCCCVVV));
        }

        [Test]
        [Description(
            "Unresolvable target project (not registered / not a Scripture project) → the reference "
                + "is returned unchanged rather than throwing."
        )]
        public void UnresolvableTarget_ReturnsUnchanged()
        {
            var englishVers = _englishScrText.Settings.Versification;
            var input = new VerseRef("PSA 147:1", englishVers);

            var result = _service.MapVerseRefBetweenProjects(
                input,
                _englishId,
                "not-a-real-project"
            );

            Assert.That(result.Versification, Is.EqualTo(englishVers));
            Assert.That(result.BBBCCCVVV, Is.EqualTo(input.BBBCCCVVV));
        }

        [Test]
        [Description(
            "Unresolvable source project → the reference is returned unchanged rather than throwing."
        )]
        public void UnresolvableSource_ReturnsUnchanged()
        {
            var orthodoxVers = _orthodoxScrText.Settings.Versification;
            var input = new VerseRef("PSA 147:1", orthodoxVers);

            var result = _service.MapVerseRefBetweenProjects(
                input,
                "not-a-real-project",
                _orthodoxId
            );

            Assert.That(result.Versification, Is.EqualTo(orthodoxVers));
            Assert.That(result.BBBCCCVVV, Is.EqualTo(input.BBBCCCVVV));
        }

        [Test]
        [Description(
            "HasMultiple/bridge ref: ChangeVersificationWithRanges branch is exercised. "
                + "Must not throw; result versification must equal the target."
        )]
        public void HasMultiple_BridgeRef_ConvertedWithRanges()
        {
            var englishVers = _englishScrText.Settings.Versification;
            var orthodoxVers = _orthodoxScrText.Settings.Versification;

            var input = new VerseRef("PSA", "14", "1-3", englishVers);
            Assert.That(input.HasMultiple, Is.True, "Premise: input must be a bridge ref");

            var result = _service.MapVerseRefBetweenProjects(input, _englishId, _orthodoxId);

            Assert.That(result.Versification, Is.EqualTo(orthodoxVers));
        }

        [Test]
        [Description(
            "Segmented ref ('1a'): segment letter is preserved after same-versification round-trip."
        )]
        public void Segment_Preserved_AfterConversion()
        {
            var englishVers = _englishScrText.Settings.Versification;

            var input = new VerseRef("PSA", "23", "1a", englishVers);
            Assert.That(input.Segment(), Is.EqualTo("a"), "Premise: segment must be 'a'");

            var result = _service.MapVerseRefBetweenProjects(input, _englishId, _englishId);

            Assert.That(result.Segment(), Is.EqualTo("a"));
        }
    }
}
