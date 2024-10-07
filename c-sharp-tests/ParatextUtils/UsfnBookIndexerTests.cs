using Paranext.DataProvider.ParatextUtils;

namespace ParatextUtils.Tests;

[TestFixture]
public class UsfmBookIndexerTests
{
    private static readonly string BOOK_CONTENT = """
\id PHM Philemon
\h Philemon
\toc1 Paul's Letter to Philemon
\c 1
\p
\v 1 Verse 1
\p
\v 2 Verse 2
\v 3 Verse 3
\c 2
\v 1 Another verse 1
\v 2 Another verse 2
""";

    private UsfmBookIndexer _indexer;

    [SetUp]
    public void Setup()
    {
        _indexer = new UsfmBookIndexer(BOOK_CONTENT);
    }

    [TestCase(1, 0, 0)]
    [TestCase(1, 1, 69)]
    [TestCase(1, 2, 85)]
    [TestCase(1, 3, 98)]
    [TestCase(2, 0, 111)]
    [TestCase(2, 1, 116)]
    [TestCase(2, 2, 137)]
    public void GetIndex_NormalInput_ReturnsNormalValues(
        int chapterNum,
        int verseNum,
        int? expectedIndex
    )
    {
        var result = _indexer.GetIndex(chapterNum, verseNum);
        Assert.That(result, Is.Not.Null);
        Assert.That(result, Is.EqualTo(expectedIndex));
    }

    [TestCase(1, 4)]
    [TestCase(2, 3)]
    [TestCase(3, 1)]
    [TestCase(999999, 1)]
    public void GetIndex_NormalInput_ReturnsNullValues(int chapterNum, int verseNum)
    {
        var result = _indexer.GetIndex(chapterNum, verseNum);
        Assert.That(result, Is.Null);
    }

    [TestCase(0, 1)]
    [TestCase(1, -1)]
    [TestCase(-1, 1)]
    [TestCase(-1, -1)]
    public void GetIndex_InvalidInput_Throws(int chapterNum, int verseNum)
    {
        Assert.Throws<ArgumentOutOfRangeException>(() => _indexer.GetIndex(chapterNum, verseNum));
    }

    [TestCase(1, 0, 69)]
    [TestCase(1, 1, 85)]
    [TestCase(1, 2, 98)]
    [TestCase(1, 3, 111)]
    [TestCase(1, 999, 111)]
    [TestCase(2, 0, 116)]
    [TestCase(2, 1, 137)]
    public void GetIndexFollowing_NormalInput_ReturnsNormalValues(
        int chapterNum,
        int verseNum,
        int? expectedIndex
    )
    {
        var result = _indexer.GetIndexFollowing(chapterNum, verseNum);
        Assert.That(result, Is.Not.Null);
        Assert.That(result, Is.EqualTo(expectedIndex));
    }

    [TestCase(2, 2)]
    public void GetIndexFollowing_NormalInput_ReturnsNullValues(int chapterNum, int verseNum)
    {
        var result = _indexer.GetIndexFollowing(chapterNum, verseNum);
        Assert.That(result, Is.Null);
    }

    [TestCase(0, 1)]
    [TestCase(1, -1)]
    [TestCase(-1, 1)]
    [TestCase(-1, -1)]
    public void GetIndexFollowing_InvalidInput_Throws(int chapterNum, int verseNum)
    {
        Assert.Throws<ArgumentOutOfRangeException>(
            () => _indexer.GetIndexFollowing(chapterNum, verseNum)
        );
    }
}
