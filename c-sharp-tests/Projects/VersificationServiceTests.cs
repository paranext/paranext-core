using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paratext.Data;

namespace TestParanextDataProvider.Projects
{
    /// <summary>
    /// Unit tests for <see cref="VersificationService"/>.
    ///
    /// <para>
    /// The service exposes three RPC functions that delegate to libpalaso's
    /// <c>ScrVers</c> via <c>ScrText.Settings.Versification</c>:
    /// </para>
    /// <list type="bullet">
    ///   <item><c>LookupFinalVerseNumber</c> — passthrough.</item>
    ///   <item><c>LookupFinalChapter</c> — passthrough.</item>
    ///   <item><c>LookupFinalVerseNumbersInBook</c> — passthrough plus
    ///     bookkeeping: returns <c>int[lastChapter + 1]</c> with index 0 unused
    ///     and indices <c>1..lastChapter</c> populated. The off-by-one boundary
    ///     is the most worth testing.</item>
    /// </list>
    ///
    /// <para>
    /// Setup follows the existing <see cref="PapiTestBase"/> pattern: a
    /// <see cref="DummyScrText"/> is created and registered via
    /// <c>ParatextProjects.FakeAddProject</c>, then resolved through the
    /// production <c>LocalParatextProjects.GetParatextProject</c> static
    /// lookup that <see cref="VersificationService"/> uses internally. Each
    /// test compares the service result against the underlying versification
    /// lookups directly so the assertions remain valid regardless of whether
    /// the project's default versification is English, Original, etc.
    /// </para>
    /// </summary>
    [ExcludeFromCodeCoverage]
    [TestFixture]
    internal class VersificationServiceTests : PapiTestBase
    {
        private const int GenesisBookNum = 1;
        private const int PhilemonBookNum = 57;

        private ScrText _scrText = null!;
        private ProjectDetails _projectDetails = null!;
        private VersificationService _service = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();

            _scrText = CreateDummyProject();
            _projectDetails = CreateProjectDetails(_scrText);
            ParatextProjects.FakeAddProject(_projectDetails, _scrText);

            _service = new VersificationService(Client);
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
                + "must be lastChapter + 1 — index 0 reserved as 'unused'."
        )]
        public void LookupFinalVerseNumbersInBook_Genesis_ReturnsArrayOfLengthLastChapterPlusOne()
        {
            int expectedLastChapter = _scrText.Settings.Versification.GetLastChapter(
                GenesisBookNum
            );

            var result = _service.LookupFinalVerseNumbersInBook(
                _projectDetails.Metadata.Id,
                GenesisBookNum
            );

            Assert.That(result, Is.Not.Null);
            Assert.That(
                result.Length,
                Is.EqualTo(expectedLastChapter + 1),
                "array length must be lastChapter + 1 (index 0 reserved as unused)"
            );
        }

        [Test]
        [Description(
            "Index 0 of the returned array is unused — it must be the default int value (0)."
        )]
        public void LookupFinalVerseNumbersInBook_Genesis_IndexZeroIsUnusedAndDefaults()
        {
            var result = _service.LookupFinalVerseNumbersInBook(
                _projectDetails.Metadata.Id,
                GenesisBookNum
            );

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

            var result = _service.LookupFinalVerseNumbersInBook(
                _projectDetails.Metadata.Id,
                GenesisBookNum
            );

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

            var result = _service.LookupFinalVerseNumbersInBook(
                _projectDetails.Metadata.Id,
                GenesisBookNum
            );

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

            var result = _service.LookupFinalVerseNumbersInBook(
                _projectDetails.Metadata.Id,
                GenesisBookNum
            );

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
                + "(index 0 unused, index 1 = last verse of chapter 1)."
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

            var result = _service.LookupFinalVerseNumbersInBook(
                _projectDetails.Metadata.Id,
                PhilemonBookNum
            );

            Assert.That(result.Length, Is.EqualTo(2), "single-chapter book -> length 2");
            Assert.That(result[0], Is.EqualTo(0), "index 0 is unused");
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
        // sanity checks confirming the wiring (project lookup -> versification
        // -> result) is intact, not re-tests of libpalaso.
        // =====================================================================

        [Test]
        [Description(
            "LookupFinalVerseNumber returns the same value as the underlying "
                + "versification.GetLastVerse — confirming the project lookup wiring."
        )]
        public void LookupFinalVerseNumber_Genesis1_MatchesUnderlyingVersification()
        {
            int expected = _scrText.Settings.Versification.GetLastVerse(GenesisBookNum, 1);

            int actual = _service.LookupFinalVerseNumber(
                _projectDetails.Metadata.Id,
                GenesisBookNum,
                1
            );

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

            int actual = _service.LookupFinalChapter(_projectDetails.Metadata.Id, GenesisBookNum);

            Assert.That(actual, Is.EqualTo(expected));
        }

        // =====================================================================
        // Unknown projectId — error propagation.
        //
        // LocalParatextProjects.GetParatextProject delegates to
        // ScrTextCollection.GetById which throws ProjectNotFoundException for
        // an id with no matching project. The service does not catch it, so it
        // must propagate to the caller. (See ParatextProjectDataProviderFactoryTests
        // for the same pattern at the factory layer.)
        // =====================================================================

        [Test]
        [Description(
            "An unknown projectId propagates ProjectNotFoundException from "
                + "LocalParatextProjects.GetParatextProject."
        )]
        public void LookupFinalVerseNumbersInBook_UnknownProjectId_ThrowsProjectNotFoundException()
        {
            // "00" is the canonical 'no such project' id used in the existing
            // ParatextProjectDataProviderFactoryTests fixture.
            const string unknownProjectId = "00";

            Assert.Throws<ProjectNotFoundException>(
                () => _service.LookupFinalVerseNumbersInBook(unknownProjectId, GenesisBookNum)
            );
        }
    }
}
