using SIL.Scripture;

namespace Paranext.DataProvider.Projects;

public class CommentSelector
{
    public string? CommentText { get; set; } = null;
    public string BookId { get; set; } = "";
    public int ChapterNum { get; set; } = 0;
    public int? VerseNum { get; set; } = null;
    public int? Offset { get; set; } = null;
    public string? BookIdEnd { get; set; } = "";
    public int? ChapterNumEnd { get; set; } = null;
    public int? VerseNumEnd { get; set; } = null;
    public int? OffsetEnd { get; set; } = null;
    public string? CommentId { get; set; } = null;
    public string? ThreadId { get; set; } = null;
}

public class CommentThreadSelector
{
    public string? Status { get; set; }
    public string? Type { get; set; }
    public string? ThreadId { get; set; }
    public DateFilter? DateFilter { get; set; }
    public string? Author { get; set; }
    public string? AssignedTo { get; set; }
    public List<ScriptureRange>? ScriptureRanges { get; set; }

    public bool IsEmpty =>
        string.IsNullOrEmpty(ThreadId)
        && string.IsNullOrEmpty(Status)
        && string.IsNullOrEmpty(Type)
        && string.IsNullOrEmpty(Author)
        && string.IsNullOrEmpty(AssignedTo)
        && DateFilter == null
        && (ScriptureRanges == null || ScriptureRanges.Count == 0);
}

public class DateFilter
{
    public string? Exact { get; set; }
    public string? Before { get; set; }
    public string? After { get; set; }
    public string? Start { get; set; }
    public string? End { get; set; }
}

public class ScriptureRange
{
    public required VerseRef Start { get; set; }
    public required VerseRef End { get; set; }
    public string? Granularity { get; set; }
}
