using Paratext.Data.ProjectComments;
using PtxUtils;
using SIL.Scripture;

namespace Paranext.DataProvider.Projects;

public class CommentThreadSelector
{
    /// <summary>
    /// If this is <see cref="Enum{NoteStatus}.Null"/>, then no status filtering will be applied.
    /// </summary>
    public Enum<NoteStatus> Status { get; set; } = Enum<NoteStatus>.Null;

    /// <summary>
    /// If this is null (not set), then no type filtering will be applied. If it is set to any value
    /// (including <see cref="NoteType.Normal"/>, which is the default type and which P9 treats as
    /// indistinguishable from <see cref="NoteType.Unspecified"/>), then the selector will only
    /// match comments with that type.
    /// </summary>
    public Enum<NoteType>? Type { get; set; }
    public string? ThreadId { get; set; }
    public DateFilter? DateFilter { get; set; }
    public string? Author { get; set; }
    public string? AssignedTo { get; set; }
    public List<ScriptureRange>? ScriptureRanges { get; set; }

    public bool? IsRead { get; set; }
    public bool IsEmpty =>
        string.IsNullOrEmpty(ThreadId)
        && Status == Enum<NoteStatus>.Null
        && Type == null
        && string.IsNullOrEmpty(Author)
        && string.IsNullOrEmpty(AssignedTo)
        && DateFilter == null
        && (ScriptureRanges == null || ScriptureRanges.Count == 0)
        && IsRead == null;
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
