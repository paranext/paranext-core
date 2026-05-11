using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paratext.Data;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Unit tests for the <see cref="ParatextProjectDataProvider"/> versification methods
    /// — i.e. the methods registered under the <c>platformScripture.Versification</c>
    /// projectInterface:
    ///
    /// <list type="bullet">
    ///   <item><c>LookupFinalVerseNumber(bookNum, chapterNum)</c> — passthrough to
    ///     <c>ScrText.Settings.Versification.GetLastVerse</c>.</item>
    ///   <item><c>LookupFinalChapter(bookNum)</c> — passthrough to
    ///     <c>ScrText.Settings.Versification.GetLastChapter</c>.</item>
    ///   <item><c>LookupFinalVerseNumbersInBook(bookNum)</c> — passthrough plus bookkeeping:
    ///     returns <c>int[lastChapter + 1]</c> with index 0 a filler <c>0</c> and indices
    ///     <c>1..lastChapter</c> populated for ergonomic <c>result[chapterNum]</c> access.
    ///     The off-by-one boundary is the most worth testing.</item>
    /// </list>
    ///
    /// <para>
    /// Setup follows the same pattern used by <see cref="ParatextProjectDataProviderCommentTests"/>:
    /// a <see cref="DummyScrText"/> is created and registered via
    /// <c>ParatextProjects.FakeAddProject</c>, then we construct a
    /// <see cref="DummyParatextProjectDataProvider"/> that subclasses the real PDP and gives
    /// us direct in-process access to the registered methods. Each test compares the PDP
    /// result against the underlying versification lookups directly so the assertions stay
    /// valid regardless of which versification scheme the dummy project happens to default to.
    /// </para>
    /// </summary>
    [ExcludeFromCodeCoverage]
    [TestFixture]
    internal class ParatextProjectDataProviderVersificationTests : PapiTestBase
    {
        private const string PdpName = "versificationTestProject";
        private const int GenesisBookNum = 1;
        private const int PhilemonBookNum = 57;

        private ScrText _scrText = null!;
        private ProjectDetails _projectDetails = null!;
        private DummyParatextProjectDataProvider _provider = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();

            _scrText = CreateDummyProject();
            _projectDetails = CreateProjectDetails(_scrText);
            ParatextProjects.FakeAddProject(_projectDetails, _scrText);

            _provider = new DummyParatextProjectDataProvider(
                PdpName,
                Client,
                _projectDetails,
                ParatextProjects
            );
        }

        [TearDown]
        public void TearDown()
        {
            _scrText?.Dispose();
        }

        // =====================================================================
        // LookupFinalVerseNumbersInBook — bookkeeping logic (the part most
        // worth testing).
        // =====================================================================

        [Test]
        [Description(
            "For a multi-chapter book (Genesis, 50 chapters), the returned array length "
                + "must be lastChapter + 1 — index 0 reserved as a filler so consumers can "
                + "index by 1-based chapter number directly."
        )]
        public void LookupFinalVerseNumbersInBook_Genesis_ReturnsArrayOfLengthLastChapterPlusOne()
        {
            int expectedLastChapter = _scrText.Settings.Versification.GetLastChapter(
                GenesisBookNum
            );

            var result = _provider.LookupFinalVerseNumbersInBook(GenesisBookNum);

            Assert.That(result, Is.Not.Null);
            Assert.That(
                result.Length,
                Is.EqualTo(expectedLastChapter + 1),
                "array length must be lastChapter + 1 (index 0 reserved as filler)"
            );
        }

        [Test]
        [Description(
            "Index 0 of the returned array is unused — it must be the default int value (0)."
        )]
        public void LookupFinalVerseNumbersInBook_Genesis_IndexZeroIsUnusedAndDefaults()
        {
            var result = _provider.LookupFinalVerseNumbersInBook(GenesisBookNum);

            Assert.That(result[0], Is.EqualTo(0), "index 0 is unused — must be default(int)");
        }

        [Test]
        [Description(
            "Index 1 of the returned array is the last verse of chapter 1, matching the "
                + "underlying versification's GetLastVerse(book, 1) directly."
        )]
        public void LookupFinalVerseNumbersInBook_Genesis_IndexOneMatchesGetLastVerseOfChapterOne()
        {
            int expected = _scrText.Settings.Versification.GetLastVerse(GenesisBookNum, 1);

            var result = _provider.LookupFinalVerseNumbersInBook(GenesisBookNum);

            Assert.That(
                result[1],
                Is.EqualTo(expected),
                "result[1] must match versification.GetLastVerse(GEN, 1)"
            );
        }

        [Test]
        [Description(
            "The last valid index of the returned array is the last verse of the last "
                + "chapter, matching the underlying versification directly."
        )]
        public void LookupFinalVerseNumbersInBook_Genesis_LastIndexMatchesGetLastVerseOfLastChapter()
        {
            int lastChapter = _scrText.Settings.Versification.GetLastChapter(GenesisBookNum);
            int expected = _scrText.Settings.Versification.GetLastVerse(
                GenesisBookNum,
                lastChapter
            );

            var result = _provider.LookupFinalVerseNumbersInBook(GenesisBookNum);

            Assert.That(
                result[lastChapter],
                Is.EqualTo(expected),
                "result[lastChapter] must match versification.GetLastVerse(GEN, lastChapter)"
            );
        }

        [Test]
        [Description(
            "Every populated index (1..lastChapter) of the returned array must match the "
                + "underlying versification.GetLastVerse(book, n) — exhaustive parallel "
                + "comparison covers every chapter, not just the boundary cases."
        )]
        public void LookupFinalVerseNumbersInBook_Genesis_AllChaptersMatchVersificationLookup()
        {
            var versification = _scrText.Settings.Versification;
            int lastChapter = versification.GetLastChapter(GenesisBookNum);

            var result = _provider.LookupFinalVerseNumbersInBook(GenesisBookNum);

            for (int chapter = 1; chapter <= lastChapter; chapter++)
            {
                Assert.That(
                    result[chapter],
                    Is.EqualTo(versification.GetLastVerse(GenesisBookNum, chapter)),
                    $"result[{chapter}] must match GetLastVerse(GEN, {chapter})"
                );
            }
        }

        [Test]
        [Description(
            "For a single-chapter book (Philemon), the returned array length must be 2 "
                + "(index 0 filler, index 1 = last verse of chapter 1)."
        )]
        public void LookupFinalVerseNumbersInBook_Philemon_ReturnsArrayOfLengthTwo()
        {
            int lastChapter = _scrText.Settings.Versification.GetLastChapter(PhilemonBookNum);
            // Sanity check — the test's premise (Philemon has one chapter) must hold for
            // the project's versification. If a future change moves Philemon to a
            // multi-chapter versification, this assertion will surface that explicitly.
            Assert.That(lastChapter, Is.EqualTo(1), "Philemon is a single-chapter book");

            int expectedLastVerse = _scrText.Settings.Versification.GetLastVerse(
                PhilemonBookNum,
                1
            );

            var result = _provider.LookupFinalVerseNumbersInBook(PhilemonBookNum);

            Assert.That(result.Length, Is.EqualTo(2), "single-chapter book -> length 2");
            Assert.That(result[0], Is.EqualTo(0), "index 0 is filler");
            Assert.That(
                result[1],
                Is.EqualTo(expectedLastVerse),
                "result[1] must match GetLastVerse(PHM, 1)"
            );
        }

        // =====================================================================
        // LookupFinalVerseNumber & LookupFinalChapter — passthrough wiring.
        //
        // These methods delegate directly to libpalaso. The tests below are
        // sanity checks confirming the wiring (PDP -> project lookup ->
        // versification -> result) is intact, not re-tests of libpalaso.
        // =====================================================================

        [Test]
        [Description(
            "LookupFinalVerseNumber returns the same value as the underlying "
                + "versification.GetLastVerse — confirming the project lookup wiring."
        )]
        public void LookupFinalVerseNumber_Genesis1_MatchesUnderlyingVersification()
        {
            int expected = _scrText.Settings.Versification.GetLastVerse(GenesisBookNum, 1);

            int actual = _provider.LookupFinalVerseNumber(GenesisBookNum, 1);

            Assert.That(actual, Is.EqualTo(expected));
        }

        [Test]
        [Description(
            "LookupFinalChapter returns the same value as the underlying "
                + "versification.GetLastChapter — confirming the project lookup wiring."
        )]
        public void LookupFinalChapter_Genesis_MatchesUnderlyingVersification()
        {
            int expected = _scrText.Settings.Versification.GetLastChapter(GenesisBookNum);

            int actual = _provider.LookupFinalChapter(GenesisBookNum);

            Assert.That(actual, Is.EqualTo(expected));
        }
    }
}
