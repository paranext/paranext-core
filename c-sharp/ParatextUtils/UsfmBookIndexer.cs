using SIL.Scripture;

namespace Paranext.DataProvider.ParatextUtils;

public class UsfmBookIndexer
{
    private readonly string _usfm;
    private Dictionary<int, Dictionary<int, int>>? _indexes = null;

    public UsfmBookIndexer(string usfm)
    {
        _usfm = usfm;
    }

    private Dictionary<int, Dictionary<int, int>> BuildIndexes()
    {
        var retVal = new Dictionary<int, Dictionary<int, int>>();

        if (string.IsNullOrEmpty(_usfm))
            return retVal;

        int onChapter = 1;
        retVal.Add(1, []);
        retVal[1].Add(0, 0);

        for (int i = 0; i < _usfm.Length - 1; i++)
        {
            if (_usfm[i] != '\\')
                continue;

            if (_usfm[i+1] == 'c')
            {
                var chapterNumber = ExtractNumber(_usfm, i+2);
                if (chapterNumber.HasValue && chapterNumber.Value > 1)
                {
                    onChapter = chapterNumber.Value;
                    retVal.Add(onChapter, []);
                    retVal[onChapter].Add(0, i);
                }
            }
            else if (_usfm[i+1] == 'v')
            {
                var verseNumber = ExtractNumber(_usfm, i+2);
                if (verseNumber.HasValue)
                    retVal[onChapter].Add(verseNumber.Value, i);
            }
        }

        return retVal;
    }

    private static int? ExtractNumber(string text, int index)
    {
        while (index < text.Length && char.IsWhiteSpace(text[index]))
        {
            index++;
        }

        int start = index;
        while (index < text.Length && char.IsDigit(text[index]))
        {
            index++;
        }

        int length = index - start;
        if (length == 0)
            return null;

        int number = 0;
        for (int i = start; i < index; i++)
        {
            number = number * 10 + (text[i] - '0');
        }
        return number;
    }

    public string Usfm { get { return _usfm;} }

    public int? GetIndex(VerseRef verseRef)
    {
        return GetIndex(verseRef.ChapterNum, verseRef.VerseNum);
    }

    public int? GetIndex(int chapterNum, int verseNum)
    {
        _indexes ??= BuildIndexes();

        if (!_indexes.TryGetValue(chapterNum, out Dictionary<int, int>? verses) || verses == null)
            return null;

        return verses.TryGetValue(verseNum, out int retVal) ? retVal : null;
    }

    public int? GetIndexFollowing(int chapterNum, int verseNum)
    {
        ArgumentOutOfRangeException.ThrowIfLessThan(1, chapterNum);
        ArgumentOutOfRangeException.ThrowIfNegative(verseNum);

        _indexes ??= BuildIndexes();

        if (_indexes.TryGetValue(chapterNum, out Dictionary<int, int>? chapter) && chapter != null)
        {
            var verseNums = new SortedSet<int>(chapter.Keys);
            var nextVerseNum = verseNums.GetViewBetween(verseNum + 1, 1000).FirstOrDefault();
            if (nextVerseNum != 0)
                return chapter[nextVerseNum];
        }

        if (_indexes.TryGetValue(chapterNum + 1, out chapter) && chapter != null)
        {
            if (chapter.TryGetValue(0, out int retVal))
                return retVal;
            Console.WriteLine("Unexpected missing verse 0 from chapter");
        }

        return null;
    }
}
