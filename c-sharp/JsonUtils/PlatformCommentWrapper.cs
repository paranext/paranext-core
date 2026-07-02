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

    /// <summary>
    /// The note's conflict type. Gated to the thread's FIRST comment (see
    /// <see cref="IsFirstCommentInThread"/>): conflict metadata is merger-authored and
    /// root-comment-only, so a reply that carries a stale <c>ConflictType</c> — e.g. persisted by an
    /// older build or hand-edited XML — reports <c>None</c> here and the converter therefore never
    /// serializes <c>conflictType</c> for it. This keeps the wire contract ("never present on
    /// replies") true while the converter stays a dumb field-writer, and mirrors how the four decode
    /// fields gate on <see cref="IsFirstCommentInThread"/>.
    /// </summary>
    public PtxUtils.Enum<NoteConflictType> ConflictType =>
        IsFirstCommentInThread ? _comment.ConflictType : NoteConflictType.None;
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
                    // TODO (PT-4104): this comparison is never true (comment ID vs thread ID); replace with IsFirstCommentInThread — behavior-neutral, see ticket.
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
    /// True when this comment is the FIRST comment of its thread. Conflict metadata — the
    /// rejected/accepted/result decode fields and <c>conflictType</c> itself — is authored by the
    /// merger only on the root comment of a conflict thread (see PT9 <c>BookFileMerger.RecordConflict</c>),
    /// and PT9 only ever reads it from the root comment. So it must be surfaced there and never on a
    /// reply, which may carry a stale <c>conflictType</c> and would otherwise decode phantom fields
    /// from its own body and current-verse text. Uses the same first-comment test the provider uses
    /// (<c>thread.Comments[0].Id == comment.Id</c>). Requires thread context; without a thread this is
    /// false — and such a wrapper cannot be serialized anyway.
    /// </summary>
    private bool IsFirstCommentInThread =>
        _thread != null && _thread.AllComments.FirstOrDefault()?.Id == _comment.Id;

    /// <summary>
    /// True when this is a verse-text merge-conflict note — the only conflict type for which we surface
    /// discrete rejected/accepted/result text in v1 — AND this is the thread's first comment (conflict
    /// metadata is root-comment-only; see <see cref="IsFirstCommentInThread"/>).
    /// </summary>
    private bool IsVerseTextConflict =>
        _comment.Type == NoteType.Conflict
        && _comment.ConflictType == NoteConflictType.VerseTextConflict
        && IsFirstCommentInThread;

    // Per-instance lazy caches for the decode fields. Each involves a full HTML render (and, for
    // RejectedResultText, an XmlDocument parse + USFM decode), so caching avoids repeating that work
    // when a getter is read more than once (tests read them repeatedly; the emit logic may consult a
    // property twice). PlatformCommentWrapper instances are short-lived and single-consumer — a fresh
    // wrapper is built per comment per serialization and discarded after one Write — so no locking is
    // needed. Caches are populated lazily on first GET, never in the constructor: converter Read and
    // UpdateComment mutate _comment.Contents through the ContentsHtml setter AFTER construction, so an
    // eager cache could capture stale content — and those wrappers are never serialized anyway
    // (serialization requires thread context, which they lack). ResultText stays a plain passthrough
    // (no work worth caching).
    private bool _rejectedTextComputed;
    private string? _rejectedTextValue;
    private bool _acceptedTextComputed;
    private string? _acceptedTextValue;
    private bool _rejectedResultTextComputed;
    private string? _rejectedResultTextValue;

    /// <summary>
    /// For a verseText conflict note, the HTML diff of the rejected (losing) side, using PT9's
    /// <c>&lt;u&gt;</c> (inserted) / <c>&lt;s&gt;</c> (deleted) markup. The leading conflict-message
    /// paragraph is skipped so only the verse diff remains. Null for any other note, and null when the
    /// rejected-side diff renders empty.
    /// </summary>
    public string? RejectedText
    {
        get
        {
            if (!_rejectedTextComputed)
            {
                _rejectedTextValue = IsVerseTextConflict
                    ? RenderConflictSideHtml(_comment.Contents, skipLeadingMessage: true)
                    : null;
                _rejectedTextComputed = true;
            }
            return _rejectedTextValue;
        }
    }

    /// <summary>
    /// For a verseText conflict note, the HTML diff of the accepted (winning) side. Null for any
    /// other note, and also null for a verseText conflict with no common ancestor (when
    /// <c>AcceptedChangeXmlStr</c> was never set because <c>parent == null</c> in the merger) or when
    /// the accepted-side diff renders empty. Consumers must treat this as optional even on verseText
    /// conflict notes.
    /// </summary>
    public string? AcceptedText
    {
        get
        {
            if (!_acceptedTextComputed)
            {
                _acceptedTextValue = IsVerseTextConflict
                    ? RenderConflictSideHtml(_comment.AcceptedChangeXml, skipLeadingMessage: false)
                    : null;
                _acceptedTextComputed = true;
            }
            return _acceptedTextValue;
        }
    }

    /// <summary>
    /// For a verseText conflict note, the resulting verse USFM already written into the text at merge time
    /// (equals the accepted side in v1). Plain USFM, no diff markup. Null for any other note, and null
    /// when the merged result verse is empty. (The wire drops empty strings regardless; the explicit
    /// collapse keeps this C# property's contract matching what serialization emits.)
    /// </summary>
    public string? ResultText =>
        IsVerseTextConflict && !string.IsNullOrEmpty(_comment.Verse) ? _comment.Verse : null;

    /// <summary>
    /// For a verseText conflict note, the resulting verse USFM if the change is REJECTED — the losing
    /// side's plain USFM, decoded by ParatextData's public <c>GetDiffVerseUsfm</c> (the exact value
    /// PT-4029's reject-write splices into the verse). Pairs with <see cref="ResultText"/> (the accept
    /// outcome) so the card's Result preview can track the Accept/Reject choice. Null for any other note.
    /// </summary>
    public string? RejectedResultText
    {
        get
        {
            if (!_rejectedResultTextComputed)
            {
                if (IsVerseTextConflict)
                {
                    var usfm = CommentEditHelper.GetDiffVerseUsfm(
                        _comment.Contents,
                        getChangedVersion: true
                    );
                    _rejectedResultTextValue = string.IsNullOrEmpty(usfm) ? null : usfm;
                }
                else
                {
                    _rejectedResultTextValue = null;
                }
                _rejectedResultTextComputed = true;
            }
            return _rejectedResultTextValue;
        }
    }

    /// <summary>
    /// Renders one side of a conflict (its diff XML) to HTML by reusing ParatextData's public
    /// <c>GetContentsAsHtml</c> renderer via its <c>contentOverride</c> parameter. When
    /// <paramref name="skipLeadingMessage"/> is true, the first (non-<c>&lt;p&gt;</c>) child — PT9's
    /// conflict-message text node — is skipped so only the verse diff is rendered. Returns null when
    /// there is no side, no thread context, or the RENDERED diff has no visible content.
    /// </summary>
    /// <remarks>
    /// Emptiness is tested on the RENDERED output, not on <paramref name="sideRoot"/>'s pre-render
    /// <c>InnerText</c>: the Contents side always carries a leading conflict-message text node (that
    /// rendering skips), so its <c>InnerText</c> is never empty; and a side can render to an empty
    /// <c>&lt;blockquote&gt;</c> — including the U+FEFF sentinel that <c>GetContentsAsHtml</c> treats
    /// as empty but <c>char.IsWhiteSpace</c> does not. The check mirrors PT9's own emptiness test,
    /// <c>Comment.IsBlank</c> (<c>Trim().Trim('\ufeff')</c>).
    /// </remarks>
    private string? RenderConflictSideHtml(System.Xml.XmlNode? sideRoot, bool skipLeadingMessage)
    {
        if (sideRoot == null || _thread?.ThreadInternal == null)
            return null;

        var html = _comment.GetContentsAsHtml(
            _thread.ThreadInternal,
            isFirstComment: skipLeadingMessage,
            skipFirstChildNode: skipLeadingMessage,
            ignoreScriptureLinks: true,
            contentOverride: sideRoot
        );

        return IsRenderedHtmlBlank(html) ? null : html;
    }

    /// <summary>
    /// True when rendered conflict-side HTML has no visible content. Strips tags with ParatextData's
    /// <c>PasteUtils.RemoveHtmlTags</c>, then applies PT9's <c>Comment.IsBlank</c> idiom
    /// (<c>.Trim().Trim('\ufeff')</c>). U+FEFF is a sentinel PT9 uses for empty verse content and is
    /// not treated as whitespace by <c>char.IsWhiteSpace</c>.
    /// </summary>
    private static bool IsRenderedHtmlBlank(string? html)
    {
        if (string.IsNullOrEmpty(html))
            return true;
        var text = PasteUtils.RemoveHtmlTags(html);
        return text.Trim().Trim('\ufeff').Length == 0;
    }

    /// <summary>
    /// Gets the underlying Comment object.
    /// </summary>
    internal Comment CommentInternal => _comment;
}
