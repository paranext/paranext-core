using Paratext.Data.ProjectComments;

namespace Paranext.DataProvider.JsonUtils;

/// <summary>
/// <para>
/// Represents a project comment. This class adapts <see cref="Comment"/> — generally referred to as
/// a project note in the Paratext 9 UI — by adding read-status information and making it suitable
/// for JSON serialization.
/// </para>
/// <para>
/// Note that the `ContentsHtml` property provides the HTML representation of the comment's contents.
/// Changing `ContentHtml` DOES change the underlying `Comment.Contents` property
/// </para>
/// </summary>
public class PlatformCommentWrapper
{
    /// <summary>
    /// The underlying Comment object. Note it may have a `Contents` property that is NOT correct.
    /// The correct contents in HTML format is provided by the `ContentsHtml` property.
    ///
    /// We do not manually correct it because Comment objects are compared by reference all over the
    /// place rather than comparing IDs, so changing the Contents property would likely cause
    /// unexpected behavior elsewhere.
    ///
    /// In order to convert a `PlatformCommentWrapper` into a `Comment`, use the `ToComment` method.
    /// </summary>
    private readonly Comment _comment;
    private PlatformCommentThreadWrapper? _thread;

    /* public PlatformCommentWrapper(Comment comment, string contentsHtml)
        : this(comment, contentsHtml, null)
    {
        ArgumentNullException.ThrowIfNull(contentsHtml);
    }

    public PlatformCommentWrapper(Comment comment, PlatformCommentThreadWrapper thread)
        : this(comment, null, thread)
    {
        if (thread == null)
        {
            throw new ArgumentNullException(
                nameof(thread),
                "Thread wrapper must not be null when creating a comment wrapper for a comment that belongs to a thread."
            );
        }
    } */

    /// <summary>
    /// WARNING: If the provided comment is an existing comment, it is strongly recommended to
    /// also provide the corresponding `PlatformCommentThreadWrapper` so that properties that
    /// depend on thread context (such as `ContentsHtml` and `IsRead`) can be correctly determined.
    /// Without providing a thread, this comment wrapper cannot be serialized to JSON.
    /// </summary>
    /// <param name="comment"></param>
    /// <param name="thread"></param>
    /// <exception cref="ArgumentException"></exception>
    public PlatformCommentWrapper(
        Comment comment,
        /* string? contentsHtml, */
        PlatformCommentThreadWrapper? thread = null
    )
    {
        ArgumentNullException.ThrowIfNull(comment);

        if (string.IsNullOrEmpty(comment.Thread))
        {
            if (thread != null)
            {
                throw new ArgumentException(
                    "If a comment has not been added to a thread, a thread wrapper must not be provided.",
                    nameof(thread)
                );
            }
        }
        else
        {
            if (thread != null && thread.Id != comment.Thread)
            {
                throw new ArgumentException(
                    "If a comment has a Thread ID assigned, then thread wrapper, if provided, must match that thread ID.",
                    nameof(thread)
                );
            }
        }

        _comment = comment;
        _thread = thread;
    }

    public string Id => _comment.Id;
    public string Thread => _comment.Thread;
    public string User => _comment.User;
    public string VerseRefStr => _comment.VerseRefStr;
    public string Language => _comment.Language;
    public string Date => _comment.Date;
    public bool Deleted => _comment.Deleted;

    // Note: SelectedText defaults to empty string, but the JSON converter will set it to null if it is
    // not supplied in the JSON.
    public string? SelectedText => _comment.SelectedText;
    public int StartPosition => _comment.StartPosition;
    public string? ContextBefore => _comment.ContextBefore;
    public string? ContextAfter => _comment.ContextAfter;
    public PtxUtils.Enum<NoteStatus> Status => _comment.Status;
    public PtxUtils.Enum<NoteType> Type => _comment.Type;
    public PtxUtils.Enum<NoteConflictType> ConflictType => _comment.ConflictType;
    public string? Verse => _comment.Verse;
    public string? Shared => _comment.Shared;
    public string? AssignedUser => _comment.AssignedUser;
    public string? ReplyToUser => _comment.ReplyToUser;
    public TermNoteHeadingInfo ExtraHeadingInfo => _comment.ExtraHeadingInfo;
    public bool HideInTextWindow => _comment.HideInTextWindow;

    /// <summary>
    /// The XML contents of the comment. Comes directly from the underlying `Comment`
    /// </summary>
    public System.Xml.XmlElement? Contents
    {
        get => _comment.Contents;
        set => _comment.Contents = value;
    }
    public string? BiblicalTermId => _comment.BiblicalTermId;
    public string[]? TagsAdded => _comment.TagsAdded;
    public string[]? TagsRemoved => _comment.TagsRemoved;
    internal string? ExtraHeadingInfoInternal => _comment.ExtraHeadingInfoInternal;

    /// <summary>
    /// Indicates whether the comment has been read by the current user.
    /// </summary>
    /// <remarks>
    /// If no thread wrapper was provided, it is assumed that this is a newly created comment (not
    /// yet added to a thread) and therefore is considered "read". When it gets added to a thread,
    /// it will automatically be marked as read for the current user.
    /// </remarks>
    public bool IsRead => _thread?.IsCommentRead(_comment) ?? true;

    /// <summary>
    /// Gets or sets the contents of the comment in HTML format.
    ///
    /// Changing this property will change the underlying `Comment.Contents` property.
    ///
    /// Note that, to read this property, a valid `PlatformCommentThreadWrapper` must be
    /// provided when creating this `PlatformCommentWrapper` or by setting it with
    /// `AttachPlatformCommentThreadWrapper`. This is because the conversion
    /// from the underlying XML format to HTML format requires context about the thread.
    /// </summary>
    public string ContentsHtml
    {
        get =>
            _thread?.ThreadInternal == null
                ? throw new InvalidOperationException(
                    "Cannot get ContentsHtml without a valid thread."
                )
                : _comment.GetContentsAsHtml(
                    _thread.ThreadInternal,
                    _comment.Id == _thread?.Id,
                    false,
                    false
                );
        set => _comment.SetContentsFromHtml(value);
    }

    /// <summary>
    /// Gets the underlying Comment object.
    /// </summary>
    internal Comment CommentInternal => _comment;

    /// <summary>
    /// Attaches a `PlatformCommentThreadWrapper` to this comment wrapper, allowing access to
    /// properties that depend on thread context, such as `ContentsHtml` and `IsRead`.
    /// </summary>
    /// <param name="threadWrapper">The thread wrapper to attach.</param>
    /* public void AttachPlatformCommentThreadWrapper(PlatformCommentThreadWrapper threadWrapper)
    {
        if (_thread != null)
        {
            throw new InvalidOperationException(
                "A thread wrapper has already been attached to this comment wrapper."
            );
        }
        ArgumentNullException.ThrowIfNull(threadWrapper);
        if (string.IsNullOrEmpty(_comment.Thread))
        {
            throw new InvalidOperationException(
                "Cannot attach a thread wrapper to a comment that does not belong to a thread."
            );
        }
        if (threadWrapper.Id != _comment.Thread)
        {
            throw new ArgumentException(
                "The provided thread wrapper does not match the comment's thread ID.",
                nameof(threadWrapper)
            );
        }
        _thread = threadWrapper;
    } */
}
