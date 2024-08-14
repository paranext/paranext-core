using SIL.Scripture;

namespace Paranext.DataProvider.Checks;

public sealed class CheckInputRange
{
    public CheckInputRange(string projectId, VerseRef start, VerseRef? end)
    {
        ArgumentException.ThrowIfNullOrEmpty(projectId);

        if (start.ChapterNum <= 0)
            throw new ArgumentOutOfRangeException(nameof(start), "ChapterNum must be > 0");

        if (end.HasValue && end.Value.ChapterNum <= 0)
            throw new ArgumentOutOfRangeException(nameof(end), "ChapterNum must be > 0");

        if (end.HasValue && (start > end.Value))
            throw new ArgumentException("end must come after start");

        ProjectId = projectId;
        Start = start;
        End = end;
    }

    public string ProjectId { get; }
    public VerseRef Start { get; }
    public VerseRef? End { get; }

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
