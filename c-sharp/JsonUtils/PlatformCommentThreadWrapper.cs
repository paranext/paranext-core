using Paratext.Data.ProjectComments;
using SIL.Scripture;

namespace Paranext.DataProvider.JsonUtils;

/// <summary>
/// Wrapper class for CommentThread that includes read status for JSON serialization
/// </summary>
public class PlatformCommentThreadWrapper
{
    private readonly CommentThread _thread;

    public PlatformCommentThreadWrapper(CommentThread thread)
    {
        _thread = thread;
    }

    public string Id => _thread.Id;
    public IEnumerable<PlatformCommentWrapper> Comments =>
        _thread.Comments.Select(c => new PlatformCommentWrapper(c, this));
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
}
