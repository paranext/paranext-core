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

    public PlatformCommentThreadWrapper(CommentThread thread)
    {
        _thread = thread;
    }

    public string Id => _thread.Id;
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

    internal bool IsCommentRead(Comment comment) => ThreadStatus.IsCommentRead(_thread, comment);

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
            }
        }
    }

    /// <summary>
    /// Returns true if any comment (including merged ones) is not deleted.
    /// </summary>
    internal bool HasNonDeletedComments => AllComments.Any(c => !c.Deleted);
}
