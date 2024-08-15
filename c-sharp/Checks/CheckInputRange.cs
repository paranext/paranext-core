using SIL.Scripture;

namespace Paranext.DataProvider.Checks;

public sealed class CheckInputRange
{
    public CheckInputRange(string projectId, VerseRef start, VerseRef? end)
    {
        ArgumentException.ThrowIfNullOrEmpty(projectId);

        if (start.ChapterNum <= 0)
            throw new ArgumentOutOfRangeException(nameof(start), "start.ChapterNum must be > 0");

        if (end.HasValue && end.Value.ChapterNum <= 0)
            throw new ArgumentOutOfRangeException(nameof(end), "end.ChapterNum must be > 0");

        if (end.HasValue && (start > end.Value))
            throw new ArgumentException("end must come after start");

        ProjectId = projectId;
        Start = start;
        End = end;
    }

    public string ProjectId { get; }
    public VerseRef Start { get; }
    public VerseRef? End { get; }

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
        if (End == null)
            return bookNum == Start.BookNum && (chapterNum == 0 || chapterNum >= Start.ChapterNum);
        if (bookNum < Start.BookNum || bookNum > End.Value.BookNum)
            return false;
        if (bookNum == Start.BookNum && chapterNum > 0 && chapterNum < Start.ChapterNum)
            return false;
        if (bookNum == End.Value.BookNum && chapterNum > End.Value.ChapterNum)
            return false;
        return true;
    }
}
