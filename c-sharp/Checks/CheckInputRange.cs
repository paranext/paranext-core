using SIL.Scripture;

namespace Paranext.DataProvider.Checks;

public sealed class CheckInputRange(string projectId, VerseRef start, VerseRef? end)
{
    public string ProjectId { get; } = projectId;
    public VerseRef Start { get; } = start;
    public VerseRef? End { get; } = end;

    public bool IsWithinRange(string projectId, int bookNum, int chapterNum)
    {
        if (projectId != ProjectId)
            return false;
        if (End == null)
            return bookNum == Start.BookNum && chapterNum >= Start.ChapterNum;
        if (bookNum < Start.BookNum || bookNum > End.Value.BookNum)
            return false;
        if (bookNum == Start.BookNum)
            return chapterNum >= Start.ChapterNum;
        if (bookNum == End.Value.BookNum)
            return chapterNum <= End.Value.ChapterNum;
        return true;
    }
}
