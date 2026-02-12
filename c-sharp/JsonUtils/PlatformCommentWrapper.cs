using System.Text.RegularExpressions;
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
    /// Frontend constants for comment status values used in TypeScript code and passed in JSON.
    /// </summary>
    internal static class Json
    {
        internal static class Status
        {
            public const string RESOLVED = "Resolved";
            public const string TO_DO = "Todo";
            public const string DONE = "Done";
            public const string UNSPECIFIED = "Unspecified";
        }

        /// <summary>
        /// Frontend constants for comment type values used in TypeScript code and passed in JSON.
        /// </summary>
        internal static class Type
        {
            /// <summary>
            /// Default type (not a <see cref="CONFLICT"/> note)
            /// </summary>
            /// <remarks>
            /// We used to have another type, "Unspecified", but it got treated identically to this
            /// type during backend serialization. Originally in legacy Paratext,
            /// <see cref="NoteType.Unspecified"/> was created use in filtering (unfiltered) but it
            /// is no longer used for that. Similarly, in the frontend of Platform, if the list is
            /// not to be filtered by type, the type should simply not be specified in the selector.
            /// </remarks>
            public const string NORMAL = "Normal";
            public const string CONFLICT = "Conflict";
        }
    }

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

    /// <summary>
    /// WARNING: If the provided comment is an existing comment, it is strongly recommended to
    /// also provide the corresponding `PlatformCommentThreadWrapper` so that properties that
    /// depend on thread context (such as `ContentsHtml` and `IsRead`) can be correctly determined.
    /// Without providing a thread, this comment wrapper cannot be serialized to JSON.
    /// </summary>
    /// <param name="comment"></param>
    /// <param name="thread"></param>
    /// <exception cref="ArgumentException"></exception>
    public PlatformCommentWrapper(Comment comment, PlatformCommentThreadWrapper? thread = null)
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
        set
        {
            var html = value;

            // The frontend's HTML output can sometimes introduce an extra layer of
            // paragraph tags around content (e.g. "<p><p>text</p></p>"). `SetContentsFromHtml`
            // transforms that into an extra newline at the start of the comment, which is not ever
            // what we want. So might as well collapse repeated opening and closing <p> tags in here
            // any time we see them come in.
            if (!string.IsNullOrEmpty(html))
            {
                var previous = string.Empty;
                while (html != previous)
                {
                    previous = html;

                    // Perform two Regex replaces in a loop until the string stops
                    // changing so we handle arbitrarily deep consecutive wrappers and
                    // variants that include attributes on the <p> tag. The first replace
                    // collapses sequences like "<p ...><p ...>" into a single "<p>",
                    // and the second collapses consecutive closing tags "</p></p>" into
                    // a single "</p>". We intentionally only target <p> wrappers so other
                    // markup (e.g. <blockquote>, <span>, etc.) is preserved.
                    html = Regex.Replace(
                        html,
                        "<p\\b[^>]*>\\s*<p\\b[^>]*>",
                        "<p>",
                        RegexOptions.IgnoreCase
                    );
                    html = Regex.Replace(html, "</p>\\s*</p>", "</p>", RegexOptions.IgnoreCase);
                }
            }

            // After normalization, delegate to the Comment helper which converts
            // the provided HTML into the internal XML stored on the Comment.
            _comment.SetContentsFromHtml(html);
        }
    }

    /// <summary>
    /// Gets the underlying Comment object.
    /// </summary>
    internal Comment CommentInternal => _comment;
}
