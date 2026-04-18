using Paratext.Data.ProjectComments;
using SIL.Scripture;

namespace Paranext.DataProvider.JsonUtils;

/// <summary>
/// Represents a series of related comments. This class adapts <see cref="CommentThread"/> by adding
/// read-status information and making it suitable for JSON serialization.
/// </summary>
public class PlatformCommentThreadWrapper
{
    private readonly CommentThread _thread;
    private List<Comment>? _additionalComments;

    /// <summary>
    /// Maps comment IDs of merged comments to their original <see cref="CommentThread"/> so that
    /// <see cref="IsCommentRead"/> evaluates read status against the correct object. Without this,
    /// <see cref="ThreadStatus.IsCommentRead"/> would be called with the primary thread's object
    /// for comments that originated from a duplicate thread, potentially returning incorrect results.
    /// </summary>
    private Dictionary<string, CommentThread>? _mergedCommentSourceThreads;

    public PlatformCommentThreadWrapper(CommentThread thread)
    {
        _thread = thread;
    }

    public string Id => _thread.Id;

    /// <summary>
    /// Gets all comments in this thread, including any comments merged from duplicate threads
    /// during deduplication. Use this instead of accessing the underlying thread's comments directly.
    /// </summary>
    public IEnumerable<PlatformCommentWrapper> Comments =>
        AllComments.Select(c => new PlatformCommentWrapper(c, this));
    public PtxUtils.Enum<NoteStatus> Status => _thread.Status;
    public PtxUtils.Enum<NoteType> Type => _thread.Type;
    public string? AssignedUser => _thread.AssignedUser;
    public string? ReplyToUser => _thread.ReplyToUser;
    public DateTimeOffset ModifiedDate => _thread.ModifiedDate;
    public VerseRef VerseRef => _thread.VerseRef;
    public string? ContextScrTextName => _thread.ContextScrTextName;
    public bool IsSpellingNote => _thread.IsSpellingNote;
    public bool IsBTNote => _thread.IsBTNote;
    public bool IsConsultantNote => _thread.IsConsultantNote;
    public string? BiblicalTermId => _thread.BiblicalTermId;

    public bool IsRead => ThreadStatus.IsThreadRead(_thread);

    internal bool IsCommentRead(Comment comment)
    {
        // Use the comment's original source thread so that read status is evaluated in the
        // correct context. Merged comments came from a different CommentThread object; using the
        // primary thread's _thread for them would produce incorrect results.
        var sourceThread = _mergedCommentSourceThreads?.GetValueOrDefault(comment.Id) ?? _thread;
        return ThreadStatus.IsCommentRead(sourceThread, comment);
    }

    /// <summary>
    /// Gets the underlying CommentThread object.
    /// </summary>
    internal CommentThread ThreadInternal => _thread;

    /// <summary>
    /// Gets all comments: the thread's own comments plus any additional comments merged from
    /// duplicate threads during deduplication.
    /// </summary>
    internal IEnumerable<Comment> AllComments =>
        _additionalComments == null
            ? _thread.Comments
            : _thread.Comments.Concat(_additionalComments);

    /// <summary>
    /// Adds comments from another wrapper that are not already present in this thread.
    /// Used during deduplication to combine unique comments without mutating the underlying
    /// ParatextData <see cref="CommentThread"/> objects.
    /// </summary>
    internal void MergeCommentsFrom(PlatformCommentThreadWrapper other)
    {
        var existingIds = new HashSet<string>(AllComments.Select(c => c.Id));

        foreach (Comment comment in other.AllComments)
        {
            if (existingIds.Add(comment.Id))
            {
                _additionalComments ??= new List<Comment>();
                _additionalComments.Add(comment);
                // Track the source thread for each merged comment so IsCommentRead can use the
                // correct CommentThread object when evaluating read status.
                _mergedCommentSourceThreads ??= new Dictionary<string, CommentThread>();
                _mergedCommentSourceThreads[comment.Id] = other._thread;
            }
        }
    }

    /// <summary>
    /// Returns true if any comment (including merged ones) is not deleted.
    /// </summary>
    internal bool HasNonDeletedComments => AllComments.Any(c => !c.Deleted);
}
