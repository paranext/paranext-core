using Paratext.Data.ProjectComments;
using PtxUtils;
using SIL.Scripture;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Specifies which category of note threads to include in results.
/// </summary>
public enum NoteCategory
{
    /// <summary>
    /// Regular user-created notes. Excludes Biblical Term notes and spelling notes, which are
    /// managed by dedicated tools.
    /// </summary>
    General,

    /// <summary>
    /// Biblical Term notes only (threads tagged with <see cref="CommentTag.biblicalTermTagId"/>).
    /// </summary>
    BtNotes,

    /// <summary>
    /// Spelling suggestion notes only (threads tagged with <see cref="CommentTag.spellingTagId"/>).
    /// </summary>
    SpellingNotes,
}

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

    /// <summary>
    /// Specifies which category of note threads to include in results.
    /// Defaults to <see cref="NoteCategory.General"/>, which returns only regular user-created
    /// notes and excludes Biblical Term notes and spelling notes. Use
    /// <see cref="NoteCategory.BtNotes"/> or <see cref="NoteCategory.SpellingNotes"/> to retrieve
    /// those specific note types individually.
    /// </summary>
    public NoteCategory NoteCategory { get; set; } = NoteCategory.General;

    /// <summary>
    /// When true, duplicate threads (same ID) are merged: unique comments are combined, and the
    /// thread with the latest <c>ModifiedDate</c> is used as the metadata base. Threads where all
    /// comments are deleted are dropped. Defaults to true.
    /// </summary>
    public bool DeduplicateThreads { get; set; } = true;
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
