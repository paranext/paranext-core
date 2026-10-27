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

    /// <summary>
    /// A provider over a project whose <see cref="ChapterNum"/> carries its alternate number on the
    /// chapter marker's line.
    /// </summary>
    private DummyParatextProjectDataProvider CreateProviderWithAlternateChapterNumber()
    {
        _scrText.PutText(
            BookNum,
            0,
            false,
            @"\id GEN \c 1 \p \v 1 one \c 2 \ca 3\ca* \p \v 1 two",
            null
        );
        return CreateProvider();
    }

    /// <summary>Returns what <paramref name="action"/> writes to the console.</summary>
    private static string CaptureConsole(Action action)
    {
        using var output = new StringWriter();
        var previousOut = Console.Out;
        Console.SetOut(output);
        try
        {
            action();
        }
        finally
        {
            Console.SetOut(previousOut);
        }
        return output.ToString();
    }

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
    public void SetChapterUsx_AlternateNumber_IsStoredAsParatext9LaysItOutWithoutLogging()
    {
        var provider = CreateProviderWithAlternateChapterNumber();
        var editedUsx = provider.GetChapterUsx(ChapterToWrite).Replace(">two", ">edited");

        var log = CaptureConsole(
            () => Assert.That(provider.SetChapterUsx(ChapterToWrite, editedUsx), Is.True)
        );

        Assert.Multiple(() =>
        {
            Assert.That(
                provider.GetChapterUsfm(ChapterToWrite),
                Does.StartWith("\\c 2\r\n \\ca 3\\ca*\r\n").And.Contains("\\v 1 edited")
            );
            Assert.That(log, Does.Not.Contain("Chapter markers in"));
        });
    }

    [Test]
    public void SetChapterUsx_AlternateNumber_ReadsBackAsWrittenAndResavesAsANoOp()
    {
        var provider = CreateProviderWithAlternateChapterNumber();
        var editedUsx = provider.GetChapterUsx(ChapterToWrite).Replace(">two", ">edited");
        provider.SetChapterUsx(ChapterToWrite, editedUsx);

        // What the editor is sent back after its save is what it saved, so it has nothing to
        // reload, and saving that again leaves the file alone.
        var usxReadBack = provider.GetChapterUsx(ChapterToWrite);
        Assert.Multiple(() =>
        {
            Assert.That(usxReadBack, Is.EqualTo(editedUsx));
            Assert.That(provider.SetChapterUsx(ChapterToWrite, usxReadBack), Is.False);
        });
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

        // The log is also the positive control for the "not logged" test above: a correction that
        // is made has to show up in what CaptureConsole returns.
        var log = CaptureConsole(
            () => Assert.That(provider.SetChapterUsx(ChapterToWrite, wrongChapterUsx), Is.True)
        );
        Assert.Multiple(() =>
        {
            Assert.That(
                provider.GetChapterUsfm(ChapterToWrite),
                Does.StartWith("\\c 2\r\n").And.Contains("\\v 1 edited")
            );
            Assert.That(log, Does.Contain("Chapter markers in GEN 2"));
        });
    }
}
