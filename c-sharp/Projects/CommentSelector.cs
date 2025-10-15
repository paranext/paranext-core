namespace Paranext.DataProvider.Projects;

public class CommentSelector
{
    public string BookId { get; set; } = "";

    public int ChapterNum { get; set; } = 0;

    public int VerseNum { get; set; } = 0;

    public string? CommentId { get; set; } = null;
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
    public long? Exact { get; set; }
    public long? Before { get; set; }
    public long? After { get; set; }
    public long? Start { get; set; }
    public long? End { get; set; }
}

public class ScriptureRange
{
    public required ScriptureReference Start { get; set; }
    public required ScriptureReference End { get; set; }
    public string? Granularity { get; set; }
}

public class ScriptureReference
{
    public int BookNum { get; set; }
    public int ChapterNum { get; set; }
    public int VerseNum { get; set; }
}
