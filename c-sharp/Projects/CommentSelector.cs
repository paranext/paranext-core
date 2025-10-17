using SIL.Scripture;

namespace Paranext.DataProvider.Projects;

public class CommentSelector
{
    public string BookId { get; set; } = "";

    public int ChapterNum { get; set; } = 0;

    public int VerseNum { get; set; } = 0;

    public string? CommentId { get; set; } = null;
    public string? ThreadId { get; set; } = null;
}

public class CommentThreadSelector
{
    public string? Status { get; set; }
    public string? Type { get; set; }
    public string? ThreadId { get; set; }
    public DateFilter? DateFilter { get; set; }
    public string? User { get; set; }
    public string? AssignedTo { get; set; }
    public List<ScriptureRange>? ScriptureRanges { get; set; }
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
