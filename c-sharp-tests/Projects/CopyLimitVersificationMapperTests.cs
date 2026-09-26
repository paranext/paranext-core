using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.Projects;
using SIL.Scripture;

namespace TestParanextDataProvider.Projects;

/// <summary>
/// Unit tests for <see cref="CopyLimitVersificationMapper.MapToVersification"/>. The limits are
/// arbitrary values; the expectations depend on the English and Original versification tables,
/// where Malachi has 4 chapters in English and 3 in Original (English 4 is Original 3:19-24), and
/// Joel has 3 chapters in English and 4 in Original (English 2:28-32 is Original 3, and English 3
/// is Original 4). English Baruch 6 maps into another book (Original's Letter of Jeremiah 1).
/// Between Original and Septuagint, Jeremiah's mapping is not symmetric: Original 33:14 maps to
/// Septuagint 33:14, but no Septuagint 33 verse maps back into Original 33. Vulgate Daniel 3:24 onward
/// maps into another book (RussianProtestant S3Y 1), while RussianProtestant S3Y 1 maps to Vulgate's
/// own S3Y 1.
/// </summary>
[ExcludeFromCodeCoverage]
[TestFixture]
internal class CopyLimitVersificationMapperTests
{
    private static readonly int MalachiBookNum = Canon.BookIdToNumber("MAL");
    private static readonly int JoelBookNum = Canon.BookIdToNumber("JOL");
    private static readonly int BaruchBookNum = Canon.BookIdToNumber("BAR");
    private static readonly int LetterOfJeremiahBookNum = Canon.BookIdToNumber("LJE");
    private static readonly int JeremiahBookNum = Canon.BookIdToNumber("JER");
    private static readonly int DanielBookNum = Canon.BookIdToNumber("DAN");
    private static readonly int SongOfThreeYoungMenBookNum = Canon.BookIdToNumber("S3Y");

    /// <summary>A per-book lookup that has <paramref name="limits"/> for one book only.</summary>
    private static Func<int, int?[]?> OnlyBook(int bookNum, int?[]? limits) =>
        book => book == bookNum ? limits : null;

    [Test]
    public void MapToVersification_NoBookHasLimits_ReturnsNull()
    {
        Assert.That(
            CopyLimitVersificationMapper.MapToVersification(
                _ => null,
                MalachiBookNum,
                ScrVers.Original,
                ScrVers.English
            ),
            Is.Null
        );
    }

    [Test]
    public void MapToVersification_SameVersification_ReturnsLimitsUnchanged()
    {
        int?[] projectLimits = [null, 11, 22, 33];

        var result = CopyLimitVersificationMapper.MapToVersification(
            OnlyBook(MalachiBookNum, projectLimits),
            MalachiBookNum,
            ScrVers.Original,
            new ScrVers("Original")
        );

        Assert.That(result, Is.SameAs(projectLimits));
    }

    [Test]
    public void MapToVersification_RequestHasMoreChapters_ExtraChapterTakesItsMappedChapterLimit()
    {
        int?[] originalLimits = [null, 11, 22, 33];

        var result = CopyLimitVersificationMapper.MapToVersification(
            OnlyBook(MalachiBookNum, originalLimits),
            MalachiBookNum,
            ScrVers.Original,
            ScrVers.English
        );

        Assert.That(result, Is.EqualTo(new int?[] { null, 11, 22, 33, 33 }));
    }

    [Test]
    public void MapToVersification_RequestChapterSpansTwoProjectChapters_TakesTheSmallerLimit()
    {
        int?[] originalLimits = [null, 10, 40, 20, 30];

        var result = CopyLimitVersificationMapper.MapToVersification(
            OnlyBook(JoelBookNum, originalLimits),
            JoelBookNum,
            ScrVers.Original,
            ScrVers.English
        );

        Assert.That(result, Is.EqualTo(new int?[] { null, 10, 20, 30 }));
    }

    [Test]
    public void MapToVersification_OneSpannedChapterHasNoLimit_TakesTheOtherLimit()
    {
        int?[] originalLimits = [null, 10, null, 25, 30];

        var result = CopyLimitVersificationMapper.MapToVersification(
            OnlyBook(JoelBookNum, originalLimits),
            JoelBookNum,
            ScrVers.Original,
            ScrVers.English
        );

        Assert.That(result, Is.EqualTo(new int?[] { null, 10, 25, 30 }));
    }

    [Test]
    public void MapToVersification_MappedChaptersBeyondTheLimits_HaveNoLimit()
    {
        int?[] originalLimits = [null, 10];

        var result = CopyLimitVersificationMapper.MapToVersification(
            OnlyBook(JoelBookNum, originalLimits),
            JoelBookNum,
            ScrVers.Original,
            ScrVers.English
        );

        Assert.That(result, Is.EqualTo(new int?[] { null, 10, null, null }));
    }

    [Test]
    public void MapToVersification_RequestChapterInsideOneProjectChapter_TakesThatChapterLimit()
    {
        int?[] englishLimits = [null, 11, 22, 33];

        var result = CopyLimitVersificationMapper.MapToVersification(
            OnlyBook(JoelBookNum, englishLimits),
            JoelBookNum,
            ScrVers.English,
            ScrVers.Original
        );

        Assert.That(result, Is.EqualTo(new int?[] { null, 11, 22, 22, 33 }));
    }

    [Test]
    public void MapToVersification_RequestChapterMapsIntoAnotherBook_TakesThatBookChapterLimit()
    {
        int?[] baruchLimits = [null, 10, 20, 30, 40, 50];
        int?[] letterOfJeremiahLimits = [null, 7];
        Func<int, int?[]?> getProjectLimits = book =>
            book == BaruchBookNum ? baruchLimits
            : book == LetterOfJeremiahBookNum ? letterOfJeremiahLimits
            : null;

        var result = CopyLimitVersificationMapper.MapToVersification(
            getProjectLimits,
            BaruchBookNum,
            ScrVers.Original,
            ScrVers.English
        );

        Assert.That(result, Is.EqualTo(new int?[] { null, 10, 20, 30, 40, 50, 7 }));
    }

    [Test]
    public void MapToVersification_OnlyTheOtherBookHasLimits_MappedChapterTakesItsLimit()
    {
        var result = CopyLimitVersificationMapper.MapToVersification(
            OnlyBook(LetterOfJeremiahBookNum, [null, 7]),
            BaruchBookNum,
            ScrVers.Original,
            ScrVers.English
        );

        Assert.That(result, Is.EqualTo(new int?[] { null, null, null, null, null, null, 7 }));
    }

    [Test]
    public void MapToVersification_OtherBookHasNoLimits_MappedChapterHasNoLimit()
    {
        var result = CopyLimitVersificationMapper.MapToVersification(
            OnlyBook(BaruchBookNum, [null, 10, 20, 30, 40, 50]),
            BaruchBookNum,
            ScrVers.Original,
            ScrVers.English
        );

        Assert.That(result, Is.EqualTo(new int?[] { null, 10, 20, 30, 40, 50, null }));
    }

    [Test]
    public void MapToVersification_ProjectChapterMapsIntoARequestChapterThatDoesNotMapBack_TakesItsLimit()
    {
        var originalLimits = new int?[ScrVers.Original.GetLastChapter(JeremiahBookNum) + 1];
        originalLimits[33] = 5;

        var result = CopyLimitVersificationMapper.MapToVersification(
            OnlyBook(JeremiahBookNum, originalLimits),
            JeremiahBookNum,
            ScrVers.Original,
            new ScrVers("Septuagint")
        );

        Assert.That(result?[33], Is.EqualTo(5));
    }

    [Test]
    public void MapToVersification_AnotherBookOfTheProjectMapsIntoTheRequestedBook_TakesItsLimit()
    {
        var vulgate = new ScrVers("Vulgate");
        var danielLimits = new int?[vulgate.GetLastChapter(DanielBookNum) + 1];
        danielLimits[3] = 5;

        var result = CopyLimitVersificationMapper.MapToVersification(
            OnlyBook(DanielBookNum, danielLimits),
            SongOfThreeYoungMenBookNum,
            vulgate,
            new ScrVers("RussianProtestant")
        );

        Assert.That(result?[1], Is.EqualTo(5));
    }

    [Test]
    public void MapToVersification_LooksUpEachBookOnce()
    {
        var lookups = new List<int>();

        CopyLimitVersificationMapper.MapToVersification(
            book =>
            {
                lookups.Add(book);
                return [null, 1];
            },
            BaruchBookNum,
            ScrVers.Original,
            ScrVers.English
        );

        Assert.That(lookups, Is.EquivalentTo(new[] { BaruchBookNum, LetterOfJeremiahBookNum }));
    }
}
