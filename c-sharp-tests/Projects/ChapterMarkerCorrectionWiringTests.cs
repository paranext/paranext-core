using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.Projects;

/// <summary>
/// Pins that the chapter setters put what they write through
/// <see cref="ChapterMarkerCorrection"/>. Paratext refuses a chapter whose <c>\c</c> marker
/// disagrees with the chapter being written — the <see cref="ChapterizationException"/> pinned
/// first — and it is that refusal, repeated on every later save, this correction exists to keep
/// from happening, so these go through the real save path rather than the correction alone.
/// </summary>
[ExcludeFromCodeCoverage]
internal class ChapterMarkerCorrectionWiringTests : PapiTestBase
{
    private const string PdpName = "chapter-marker-correction";
    private const int BookNum = 1; // GEN, per existing fixture convention
    private const int ChapterNum = 2;

    /// <summary>
    /// USFM for <see cref="ChapterNum"/> whose chapter marker names another chapter.
    /// </summary>
    private const string WrongChapterUsfm = "\\c 7\r\n\\p\r\n\\v 1 edited\r\n";

    private ScrText _scrText = null!;
    private ProjectDetails _projectDetails = null!;

    [SetUp]
    public override async Task TestSetupAsync()
    {
        await base.TestSetupAsync();
        _scrText = CreateDummyProject();
        _projectDetails = CreateProjectDetails(_scrText);
        ParatextProjects.FakeAddProject(_projectDetails, _scrText);
        _scrText.PutText(BookNum, 0, false, @"\id GEN \c 1 \p \v 1 one \c 2 \p \v 1 two", null);
    }

    [TearDown]
    public void TearDown()
    {
        _scrText?.Dispose();
    }

    private static VerseRef ChapterToWrite => new(BookNum, ChapterNum, 0);

    private DummyParatextProjectDataProvider CreateProvider() =>
        new(PdpName, Client, _projectDetails, ParatextProjects);

    [Test]
    public void PutText_MarkerNamesAnotherChapter_ParatextRefusesTheWrite()
    {
        Assert.That(
            () => _scrText.PutText(BookNum, ChapterNum, false, WrongChapterUsfm, null),
            Throws.TypeOf<ChapterizationException>(),
            "The premise of the correction: Paratext itself rejects this USFM."
        );
    }

    [Test]
    public void SetChapterUsfm_MarkerNamesAnotherChapter_CorrectsAndWrites()
    {
        var provider = CreateProvider();

        Assert.That(provider.SetChapterUsfm(ChapterToWrite, WrongChapterUsfm), Is.True);
        Assert.That(
            provider.GetChapterUsfm(ChapterToWrite),
            Does.StartWith("\\c 2\r\n").And.Contains("\\v 1 edited")
        );
    }

    [Test]
    public void SetChapterUsx_MarkerNamesAnotherChapter_CorrectsAndWrites()
    {
        var provider = CreateProvider();
        // Edit the verse as well as the chapter number, so what is stored afterward can only have
        // come from this write — the seeded chapter already reads "two".
        var wrongChapterUsx = provider
            .GetChapterUsx(ChapterToWrite)
            .Replace("<chapter number=\"2\"", "<chapter number=\"7\"")
            .Replace(">two", ">edited");

        Assert.That(provider.SetChapterUsx(ChapterToWrite, wrongChapterUsx), Is.True);
        Assert.That(
            provider.GetChapterUsfm(ChapterToWrite),
            Does.StartWith("\\c 2\r\n").And.Contains("\\v 1 edited")
        );
    }
}
