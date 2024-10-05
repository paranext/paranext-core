using SIL.Scripture;

namespace Paranext.DataProvider.ParatextUtils;

public class UsfmBookIndexer
{
    #region Member variables

    private readonly string _usfm;

    // Created lazily or else this could be readonly
    private Dictionary<int, Dictionary<int, int>>? _indexes = null;

    #endregion

    #region Constructor

    public UsfmBookIndexer(string usfm)
    {
        _usfm = usfm;
    }

    #endregion

    #region Properties

    public string Usfm { get { return _usfm;} }

    #endregion

    #region Public methods

    /// <summary>
    /// Returns the index into the USFM string that corresponds to the start of the chapter and
    /// verse in this VerseRef. If the verse number is 0, returns the index that corresponds to the
    /// start of the chapter. If the chapter and verse can't be found, returns null.
    /// <br/>
    /// A returned index points to the backslash of the "\v" or "\c" marker.
    /// </summary>
    public int? GetIndex(VerseRef verseRef)
    {
        return GetIndex(verseRef.ChapterNum, verseRef.VerseNum);
    }

    /// <summary>
    /// Returns the index into the USFM string that corresponds to the start of the chapter and
    /// verse in this VerseRef. If the verse number is 0, returns the index that corresponds to the
    /// start of the chapter. If the chapter and verse can't be found, returns null.
    /// <br/>
    /// A returned index points to the backslash of the "\v" or "\c" marker.
    /// </summary>
    public int? GetIndex(int chapterNum, int verseNum)
    {
        ArgumentOutOfRangeException.ThrowIfLessThan(chapterNum, 1);
        ArgumentOutOfRangeException.ThrowIfNegative(verseNum);

        _indexes ??= BuildIndexes();

        if (!_indexes.TryGetValue(chapterNum, out Dictionary<int, int>? verses) || verses == null)
            return null;

        return verses.TryGetValue(verseNum, out int retVal) ? retVal : null;
    }

    /// <summary>
    /// Returns the index into the USFM string that corresponds to the start of the verse
    /// immediately after the given chapter and verse. If a new chapter is found immediately after
    /// the given chapter and verse, then the start of the new chapter is returned instead. If the
    /// given chapter and verse can't be found, returns null. If no chapter or verse is found after
    /// the given chapter and verse, returns null.
    /// <br/>
    /// Note that the given chapter and verse may not exist in the USFM string. This just looks up
    /// whatever would immediately proceed that chapter and verse.
    /// <br/>
    /// A returned index points to the backslash of the "\v" or "\c" marker.
    /// </summary>
    public int? GetIndexFollowing(int chapterNum, int verseNum)
    {
        ArgumentOutOfRangeException.ThrowIfLessThan(chapterNum, 1);
        ArgumentOutOfRangeException.ThrowIfNegative(verseNum);

        _indexes ??= BuildIndexes();

        if (_indexes.TryGetValue(chapterNum, out Dictionary<int, int>? chapter) && chapter != null)
        {
            var verseNums = new SortedSet<int>(chapter.Keys);
            var nextVerseNum = verseNums.GetViewBetween(verseNum + 1, 10000).FirstOrDefault();
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

    #endregion

    #region Private methods

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
        // Increment past the whitespace preceding the number
        while (index < text.Length && char.IsWhiteSpace(text[index]))
        {
            index++;
        }

        // Find all the consecutive digits
        int start = index;
        while (index < text.Length && char.IsDigit(text[index]))
        {
            index++;
        }

        // See if we found any digits
        int length = index - start;
        if (length == 0)
            return null;

        // Convert the number from a string to an integer
        int number = 0;
        for (int i = start; i < index; i++)
        {
            number = (number * 10) + (int)char.GetNumericValue(text[i]);
        }
        return number;
    }

    #endregion
}
