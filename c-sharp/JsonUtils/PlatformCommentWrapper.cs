using System.Text.RegularExpressions;
using Paratext.Data.ProjectComments;
using Paratext.Data.UsfmDiff;
using PtxUtils;

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

    /// <summary>
    /// The conflict-resolution action recorded on this comment, if any: <c>null</c> (accept, or not
    /// a resolution comment at all), <c>"replaced"</c> (a reject wrote the losing side into the
    /// verse), or <c>"merged"</c> (a PT9 three-way merge — PT10 never produces this, but PT9-synced
    /// data may carry it). Comes straight from the underlying <see cref="Comment"/> field.
    ///
    /// UNGATED on purpose (unlike the four verseText decode fields below, which are gated on
    /// <see cref="IsVerseTextConflict"/>): PT9's SaveEdits stamps this on the resolution comment it
    /// appends, and that comment has <c>Type == Conflict</c> but its <c>ConflictType</c> is
    /// <see cref="NoteConflictType.None"/> (never copied from the original conflict note). A
    /// verseText gate would therefore NEVER fire for the resolution comment, so this must serialize
    /// whenever the underlying field is set — the converter null-skips it.
    /// </summary>
    public string? ConflictResolutionAction => _comment.ConflictResolutionAction;

    /// <summary>
    /// The verse USFM captured on this comment. Per-comment history data, deliberately NOT gated to
    /// the thread's first comment: PT9's <c>CommentThread.AddNewComment</c> stores the current verse
    /// text on any comment (reply included) written after the verse changed. Only on a conflict
    /// thread's ROOT comment does it hold the merged result — conflict-card consumers must read
    /// <see cref="ResultText"/> (root-only, conflict-only) instead of this field.
    /// </summary>
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
                    IsFirstCommentInThread,
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
    /// True when this comment is the ROOT (first) comment of its thread. Conflict metadata — the
    /// rejected/accepted/result decode fields and <c>conflictType</c> itself — is authored by the
    /// merger only on the root comment of a conflict thread (see PT9 <c>BookFileMerger.RecordConflict</c>),
    /// and PT9 only ever reads it from the root comment. So it must be surfaced there and never on a
    /// reply, which may carry a stale <c>conflictType</c> and would otherwise decode phantom fields
    /// from its own body and current-verse text. The root is identified by
    /// <see cref="PlatformCommentThreadWrapper.RootCommentId"/> (earliest date), NOT by list position
    /// — after thread-fragment deduplication the root may not be first (see that property's remarks).
    /// Requires thread context; without a thread this is false — and such a wrapper cannot be
    /// serialized anyway.
    /// </summary>
    private bool IsFirstCommentInThread => _thread != null && _thread.RootCommentId == _comment.Id;

    /// <summary>
    /// True when this is a verse-text merge-conflict note — the only conflict type for which we surface
    /// discrete rejected/accepted/result text in v1 — AND this is the thread's first comment (conflict
    /// metadata is root-comment-only; see <see cref="IsFirstCommentInThread"/>).
    /// </summary>
    private bool IsVerseTextConflict =>
        _comment.Type == NoteType.Conflict
        && _comment.ConflictType == NoteConflictType.VerseTextConflict
        && IsFirstCommentInThread;

    // No caching on the decode getters: the converter reads each exactly once per serialization
    // (which is also each wrapper's lifetime), so a cache would never be hit in production — only
    // tests re-read. Recomputing on read also keeps the getters correct if _comment.Contents is
    // mutated after construction (converter Read and UpdateComment do, via the ContentsHtml setter).

    /// <summary>
    /// For a verseText conflict note, the HTML diff of the rejected (losing) side, using PT9's
    /// <c>&lt;u&gt;</c> (inserted) / <c>&lt;s&gt;</c> (deleted) markup. The leading conflict-message
    /// paragraph is skipped so only the verse diff remains. Null for any other note, and null when the
    /// rejected-side diff renders empty.
    /// </summary>
    public string? RejectedText =>
        IsVerseTextConflict
            ? RenderConflictSideHtml(_comment.Contents, skipLeadingMessage: true)
            : null;

    /// <summary>
    /// For a verseText conflict note, the HTML diff of the accepted (winning) side. Null for any
    /// other note, and also null for a verseText conflict with no common ancestor (when
    /// <c>AcceptedChangeXmlStr</c> was never set because <c>parent == null</c> in the merger) or when
    /// the accepted-side diff renders empty. Consumers must treat this as optional even on verseText
    /// conflict notes.
    /// </summary>
    public string? AcceptedText =>
        IsVerseTextConflict
            ? RenderConflictSideHtml(_comment.AcceptedChangeXml, skipLeadingMessage: false)
            : null;

    /// <summary>
    /// For a verseText conflict note, the resulting verse USFM already written into the text at merge time
    /// (equals the accepted side in v1). Plain USFM, no diff markup. Null for any other note, and null
    /// when the merged result verse is empty. (The wire drops empty strings regardless; the explicit
    /// collapse keeps this C# property's contract matching what serialization emits.)
    /// </summary>
    public string? ResultText =>
        IsVerseTextConflict && !IsBlankText(_comment.Verse) ? _comment.Verse : null;

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
            if (!IsVerseTextConflict)
                return null;
            var usfm = CommentEditHelper.GetDiffVerseUsfm(
                _comment.Contents,
                getChangedVersion: true
            );
            return IsBlankText(usfm) ? null : usfm;
        }
    }

    /// <summary>
    /// For a verseText conflict whose two sides are independent, the PT9 "merge all changes" preview:
    /// the merged verse diffed against the base, rendered with the same &lt;u&gt;/&lt;s&gt; markup as the
    /// accepted/rejected sides. Null when merge is not available (overlapping edits - GetMergedUsfm null)
    /// or the render is empty. Computation is PT9's exact display path (CommentHtmlBuilderUI): GetMergedUsfm
    /// + GetDiffVerseUsfm(base) + DiffToken.GetDiffString.
    /// </summary>
    public string? MergedText
    {
        get
        {
            if (!IsVerseTextConflict || _thread?.ThreadInternal == null)
                return null;
            var thread = _thread.ThreadInternal;
            string? mergedUsfm = CommentEditHelper.GetMergedUsfm(thread);
            if (mergedUsfm == null)
                return null;
            // Base must come from the SAME comment GetMergedUsfm diffs against (thread.Comments[0]),
            // not _comment: the root is identified by earliest date (RootCommentId) and, after
            // thread-fragment dedup, may not be Comments[0] (see IsFirstCommentInThread). Diffing a
            // root-based base against a Comments[0]-based merge would garble the preview when they
            // differ; in the common case (root == Comments[0]) this is the same text.
            string baseUsfm = CommentEditHelper.GetDiffVerseUsfm(
                thread.Comments[0].Contents,
                getChangedVersion: false
            );
            string differences = DiffToken.GetDiffString(
                thread.ScrText,
                thread.VerseRef.BookNum,
                baseUsfm,
                mergedUsfm
            );
            var doc = new System.Xml.XmlDocument();
            doc.LoadXml("<contents>" + differences + "</contents>");
            return RenderConflictSideHtml(doc.DocumentElement, skipLeadingMessage: false);
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
    /// as empty but <c>char.IsWhiteSpace</c> does not. The blank rule is PT9's canonical
    /// <c>TrimOld</c> \u2014 the same rule the renderer's own emptiness check uses (see
    /// <see cref="IsBlankText"/>).
    /// </remarks>
    private string? RenderConflictSideHtml(System.Xml.XmlNode? sideRoot, bool skipLeadingMessage)
    {
        if (sideRoot == null || _thread?.ThreadInternal == null)
            return null;

        var html = _comment.GetContentsAsHtml(
            _thread.ThreadInternal,
            isFirstComment: skipLeadingMessage,
            skipFirstChildNode: skipLeadingMessage,
            // Deliberately true, unlike ContentsHtml (false): these renders feed the conflict
            // card's diff preview panes, where scripture references inside <s>/<u> diff markup
            // would serialize inert <a> noise. The full note contents, links included, is still
            // available via the contents field.
            ignoreScriptureLinks: true,
            contentOverride: sideRoot
        );

        return IsRenderedHtmlBlank(html) ? null : html;
    }

    /// <summary>
    /// True when rendered conflict-side HTML has no visible content: strips tags with ParatextData's
    /// <c>PasteUtils.RemoveHtmlTags</c>, then applies <see cref="IsBlankText"/>.
    /// </summary>
    private static bool IsRenderedHtmlBlank(string? html) =>
        string.IsNullOrEmpty(html) || IsBlankText(PasteUtils.RemoveHtmlTags(html));

    /// <summary>
    /// True when text has no visible content, by PT9's canonical blank rule <c>TrimOld</c> \u2014
    /// whitespace plus the U+FEFF empty-content sentinel and U+200B, neither of which
    /// <c>char.IsWhiteSpace</c> classifies as whitespace. This is the same rule the renderer's own
    /// emptiness check uses (<c>ConvertContentToHtml</c> tests <c>InnerText.TrimOld()</c>), so all
    /// four conflict fields share one presence semantic with the renderer: present iff there is
    /// something to show.
    /// </summary>
    private static bool IsBlankText(string? text) =>
        string.IsNullOrEmpty(text) || text.TrimOld().Length == 0;

    /// <summary>
    /// Gets the underlying Comment object.
    /// </summary>
    internal Comment CommentInternal => _comment;
}
