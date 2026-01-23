using System.Diagnostics;
using Paratext.Data;
using Paratext.Data.Plugins;
using Paratext.Data.ProjectComments;
using Paratext.Data.Users;

namespace Paranext.DataProvider.JsonUtils;

/// <summary>
/// Wrapper class for Comment that includes read status for JSON serialization
/// </summary>
public class PlatformCommentWrapper
{
    private readonly Comment _comment;
    private readonly PlatformCommentThreadWrapper? _thread;

    public PlatformCommentWrapper(Comment comment, PlatformCommentThreadWrapper? thread = null)
    {
        if (comment == null)
        {
            throw new ArgumentNullException(nameof(comment));
        }
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
    public System.Xml.XmlElement? Contents => _comment.Contents;
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
    /// Requests the comment manager to add the comment. This will either add it to an existing
    /// thread or result in the creation of a new thread.
    /// </summary>
    /// <param name="commentManager">The manager used to identify the ScrText user and thread for
    /// this comment</param>
    /// <param name="userName">Optional user name to override the comment's user</param>
    /// <exception cref="InvalidOperationException">Thread (ID) not set</exception>
    public void Add(ICommentManager commentManager, string? userName = null)
    {
        // REVIEW: Technically, a valid thread id is a hashed GUID, so we could validate that here,
        // but that is logic that probably belongs in Paratext itself.
        if (string.IsNullOrEmpty(Thread))
            throw new InvalidOperationException("Cannot add a comment unless thread has been set.");

        // Override the user name with the given/current user.
        _comment.User = userName ?? RegistrationInfo.DefaultUser.Name;
        commentManager.AddComment(_comment);
    }
}
