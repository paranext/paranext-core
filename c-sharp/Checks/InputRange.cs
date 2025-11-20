using SIL.Scripture;

namespace Paranext.DataProvider.Checks;

/// <summary>
/// Represents a range of text within a project that checks can target. This class must
/// serialize/deserialize to the CheckInputRange type defined in TypeScript.
/// <br />
/// An <see cref="InputRange"/> represents a selection of scripture text. If <see cref="End"/> is
/// null, then only the verse indicated by <see cref="Start"/> is included.
/// <br />
/// Special values for verse and chapter numbers:
/// - Verse 0: Includes all parts of the chapter, including content before the first verse.
///   Chapter 1 verse 0 includes all front matter for the book.
/// - Verse 999: Maximum value that fits in BBBCCCVVV format. Use when the end of a chapter is
///   desired and the exact number of verses is unknown.
/// - Chapter 999: Maximum value that fits in BBBCCCVVV format. Use when the end of a book is
///   desired and the exact number of chapters is unknown.
/// <br />
/// Note that Paratext checks cannot be run on less than an entire book because of the definition of
/// <see cref="ScriptureCheckBase.Run"/>. The <see cref="InputRange"/> class allows defining a
/// range that is more granular than an entire book because that is how Platform.Bible's interfaces
/// work, and we need to serialize and deserialize these structures when communicating with the
/// platform. Whenever a Paratext check is given a range, though, it can only target entire books.
/// <br />
/// See the TypeScript check data types for more details.
/// </summary>
internal sealed class InputRange
{
    private string _projectId;
    private VerseRef _start;
    private VerseRef? _end;

    // Maximum verse/chapter number that can be represented in BBBCCCVVV format
    public const int MAX_CHAPTER_OR_VERSE_NUM = 999;

    public InputRange(string projectId, VerseRef start, VerseRef? end)
    {
        ArgumentException.ThrowIfNullOrEmpty(projectId);

        // Clamp verse and chapter numbers to MAX values
        if (start.VerseNum > MAX_CHAPTER_OR_VERSE_NUM)
            start.VerseNum = MAX_CHAPTER_OR_VERSE_NUM;
        if (start.ChapterNum > MAX_CHAPTER_OR_VERSE_NUM)
            start.ChapterNum = MAX_CHAPTER_OR_VERSE_NUM;
        if (end.HasValue && end.Value.VerseNum > MAX_CHAPTER_OR_VERSE_NUM)
            end = new VerseRef(end.Value) { VerseNum = MAX_CHAPTER_OR_VERSE_NUM };
        if (end.HasValue && end.Value.ChapterNum > MAX_CHAPTER_OR_VERSE_NUM)
            end = new VerseRef(end.Value) { ChapterNum = MAX_CHAPTER_OR_VERSE_NUM };

        VerifyRange(start, end);

        _projectId = projectId;
        _start = start;
        _end = end;
    }

    private static void VerifyRange(VerseRef start, VerseRef? end)
    {
        if (start.ChapterNum <= 0)
            throw new ArgumentOutOfRangeException(nameof(start), "start.ChapterNum must be > 0");

        if (start.VerseNum < 0)
            throw new ArgumentOutOfRangeException(nameof(start), "start.VerseNum must be >= 0");

        if (end.HasValue && end.Value.ChapterNum <= 0)
            throw new ArgumentOutOfRangeException(nameof(end), "end.ChapterNum must be > 0");

        if (end.HasValue && end.Value.VerseNum < 0)
            throw new ArgumentOutOfRangeException(nameof(end), "end.VerseNum must be >= 0");

        if (end.HasValue && (start > end.Value))
            throw new ArgumentException("end must come after start");
    }

    public string ProjectId
    {
        get { return _projectId; }
        set
        {
            ArgumentException.ThrowIfNullOrEmpty(value, "ProjectId");
            _projectId = value;
        }
    }
    public VerseRef Start
    {
        get { return _start; }
        set
        {
            VerifyRange(value, _end);
            _start = value;
        }
    }
    public VerseRef? End
    {
        get { return _end; }
        set
        {
            VerifyRange(_start, value);
            _end = value;
        }
    }

    /// <summary>
    /// Determines if a given location in scripture is within the range of this object. Note that
    /// an integer book number is used instead of a book name/ID because ScrText's TextChanged event
    /// provides the book number and chapter number of what scripture just changed in the project.
    /// The purpose of this function is to determine if a scripture update event indicates that text
    /// changed within the range of this object. Since the event uses book numbers, this method uses
    /// book numbers, too.
    /// </summary>
    /// <param name="projectId">ID of the project being tested</param>
    /// <param name="bookNum">Book number being tested. 0 is a special value that is always
    /// considered to be within range.</param>
    /// <param name="chapterNum">Chapter number being tested. 0 is a special value that is always
    /// considered to be within range.</param>
    /// <returns>true if the inputs are considered within range, false otherwise</returns>
    public bool IsWithinRange(string projectId, int bookNum, int chapterNum)
    {
        if (projectId != ProjectId)
            return false;
        if (bookNum == 0)
            return true;
        // If no end is specified, this is a single verse range
        if (End == null)
            return bookNum == Start.BookNum && (chapterNum == 0 || chapterNum == Start.ChapterNum);
        if (bookNum < Start.BookNum || bookNum > End.Value.BookNum)
            return false;
        if (bookNum == Start.BookNum && chapterNum > 0 && chapterNum < Start.ChapterNum)
            return false;
        if (bookNum == End.Value.BookNum && chapterNum > End.Value.ChapterNum)
            return false;
        return true;
    }

    public override bool Equals(object? obj)
    {
        if (obj is not InputRange other)
            return false;
        return _projectId == other._projectId
            && _start.Equals(other._start)
            && Nullable.Equals(_end, other._end);
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(_projectId, _start, _end);
    }
}
