using System.Runtime.CompilerServices;
using System.Text;
using System.Text.Json;
using System.Xml;
using System.Xml.Linq;
using System.Xml.XPath;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.NetworkObjects.Documentation;
using Paranext.DataProvider.Services;
using Paratext.Data;
using Paratext.Data.ProjectComments;
using Paratext.Data.ProjectSettingsAccess;
using PtxUtils;
using SIL.Scripture;

namespace Paranext.DataProvider.Projects;

internal class ParatextProjectDataProvider : ProjectDataProvider
{
    #region Constants / Member variables

    // All data types related to Scripture editing. Changes to any portion of Scripture should send
    // out updates to all these data types
    public static readonly List<string> AllScriptureDataTypes =
    [
        ProjectDataType.BOOK_USFM,
        ProjectDataType.CHAPTER_USFM,
        ProjectDataType.VERSE_USFM,
        ProjectDataType.BOOK_USX,
        ProjectDataType.CHAPTER_USX,
        ProjectDataType.VERSE_USX,
        ProjectDataType.VERSE_PLAIN_TEXT,
    ];

    // All data types related to Scripture editing plus project settings. This is useful when an edit
    // changes Scripture and also causes a project setting to change (e.g., adding a new book updates
    // the BooksPresent setting)
    public static readonly List<string> AllScriptureDataTypesPlusSettings =
    [
        .. AllScriptureDataTypes,
        ProjectDataType.SETTING,
    ];

    public static readonly List<string> AllCommentDataTypes =
    [
        ProjectDataType.COMMENTS,
        ProjectDataType.COMMENT_THREADS,
    ];

    // All data types exposed by the platformScripture.Versification projectInterface. Used to fan
    // out a single "versification changed" notification across every consumer-visible data type
    // when the underlying `platformScripture.versification` project setting is written.
    public static readonly List<string> AllVersificationDataTypes =
    [
        ProjectDataType.FINAL_VERSE_NUMBER,
        ProjectDataType.FINAL_CHAPTER,
        ProjectDataType.FINAL_VERSE_NUMBERS_IN_BOOK,
    ];

    private readonly LocalParatextProjects _paratextProjects;

    // Lazy because published PDPs do not register the comment wire methods (see GetFunctions),
    // so for those PDPs the comment manager is never accessed - and CommentManager.Get loads
    // comment XML on first access for unpublished projects, work we don't want to pay for on
    // every published PDP creation.
    private readonly Lazy<CommentManager> _commentManager;

    // Serializes all comment mutations (ResolveConflict, AddCommentToThread, CreateComment,
    // UpdateComment, DeleteComment) so their read-modify-write of the shared CommentManager (and the
    // Comments_*.xml files it saves) is atomic. The PDP is a per-project singleton whose PAPI methods
    // can be invoked concurrently, and PT9's CommentManager is not thread-safe - it was only ever
    // driven by Paratext's single UI thread, so this concurrency is new in PT10. One lock per PDP
    // instance, i.e. per project. Reads (GetCommentThreads) are intentionally not serialized: they
    // can observe a transient in-progress view but cannot corrupt data.
    private readonly object _commentMutationLock = new();

    private UserProjectSettings? _userProjectSettings;
    private string? _cachedUserId;

    #endregion

    #region Constructors

    public ParatextProjectDataProvider(
        string name,
        PapiClient papiClient,
        ProjectDetails projectDetails,
        LocalParatextProjects paratextProjects
    )
        : base(name, papiClient, projectDetails)
    {
        _paratextProjects = paratextProjects;
        _commentManager = new Lazy<CommentManager>(
            () =>
                CommentManager.Get(
                    LocalParatextProjects.GetParatextProject(projectDetails.Metadata.Id)
                )
        );
    }

    #endregion

    #region Data Provider methods

    protected override List<(string functionName, Delegate function)> GetFunctions()
    {
        var retVal = base.GetFunctions();

        retVal.Add(("getBookUSFM", GetBookUsfm));
        retVal.Add(("setBookUSFM", SetBookUsfm));
        retVal.Add(("getChapterUSFM", GetChapterUsfm));
        retVal.Add(("setChapterUSFM", SetChapterUsfm));
        retVal.Add(("getVerseUSFM", GetVerseUsfm));

        retVal.Add(("getBookUSX", GetBookUsx));
        retVal.Add(("setBookUSX", SetBookUsx));
        retVal.Add(("getChapterUSX", GetChapterUsx));
        retVal.Add(("setChapterUSX", SetChapterUsx));
        retVal.Add(("getVerseUSX", GetVerseUsx));

        retVal.Add(("getVersePlainText", GetVersePlainText));

        // Comment methods are only registered when this PDP advertises legacyCommentManager.comments.
        // Published PDPs do not advertise that interface (published projects are read-only and PT9
        // throws AttemptedResourceWritingException on any write to a published project), so they
        // skip registration entirely instead of relying solely on per-method runtime guards.
        if (ProjectDetails.Metadata.ProjectInterfaces.Contains(ProjectInterfaces.LEGACY_COMMENT))
        {
            foreach (var commentFunction in GetCommentFunctions())
                retVal.Add((commentFunction.Key, commentFunction.Value));
        }

        retVal.Add(("getSetting", GetProjectSetting));
        retVal.Add(("setSetting", SetProjectSetting));

        retVal.Add(("resetSetting", ResetProjectSetting));

        retVal.Add(("getUserModelTexts", GetUserModelTexts));
        retVal.Add(("setUserModelTexts", SetUserModelTexts));
        retVal.Add(("resetUserModelTexts", ResetUserModelTexts));
        retVal.Add(("getUserStructureProtected", GetUserStructureProtected));
        retVal.Add(("setUserStructureProtected", SetUserStructureProtected));
        retVal.Add(("resetUserStructureProtected", ResetUserStructureProtected));
        retVal.Add(
            ("getUserReferencedProjectsAndResources", GetUserReferencedProjectsAndResources)
        );
        retVal.Add(
            ("setUserReferencedProjectsAndResources", SetUserReferencedProjectsAndResources)
        );
        retVal.Add(
            ("resetUserReferencedProjectsAndResources", ResetUserReferencedProjectsAndResources)
        );
        retVal.Add(
            ("canUserWriteProjectTextConnectionSettings", CanUserWriteProjectTextConnectionSettings)
        );
        retVal.Add(("canUserEditScripture", CanUserEditScripture));

        retVal.Add(("getMarkerNames", GetMarkerNames));

        retVal.Add(("getFinalVerseNumber", GetFinalVerseNumber));
        retVal.Add(("setFinalVerseNumber", SetFinalVerseNumber));
        retVal.Add(("getFinalChapter", GetFinalChapter));
        retVal.Add(("setFinalChapter", SetFinalChapter));
        retVal.Add(("getFinalVerseNumbersInBook", GetFinalVerseNumbersInBook));
        retVal.Add(("setFinalVerseNumbersInBook", SetFinalVerseNumbersInBook));

        return retVal;
    }

    /// <summary>
    /// Documentation marking ONLY the versification projectInterface's methods experimental
    /// (<c>x-experimental: true</c>). This PDP exposes many projectInterfaces (USFM, USJ, comments,
    /// settings, versification, …) on a single network object, so only the versification functions
    /// are listed in <c>Methods</c> and the object-level <c>Experimental</c> flag is left unset — the
    /// stable interfaces and the <c>object:{name}</c> existence method stay unmarked. Mirrors the
    /// <c>@experimental</c> tag on <c>platformScripture.Versification</c> /
    /// <c>IVersificationProjectDataProvider</c> in <c>platform-scripture.d.ts</c>.
    /// </summary>
    protected override NetworkObjectDocumentation GetNetworkObjectDocumentation() =>
        new()
        {
            Methods = new Dictionary<string, OpenRpcSingleMethodDocumentation>
            {
                ["getFinalVerseNumber"] = ExperimentalMethodDocumentation.Create(
                    "Get the final verse number in a book + chapter, per the project's versification.",
                    [
                        ExperimentalMethodDocumentation.Param(
                            "bookNum",
                            "1-based book number.",
                            "number"
                        ),
                        ExperimentalMethodDocumentation.Param(
                            "chapterNum",
                            "1-based chapter number.",
                            "number"
                        ),
                    ],
                    ExperimentalMethodDocumentation.ResultOf("number", "Final verse number")
                ),
                ["setFinalVerseNumber"] = ExperimentalMethodDocumentation.Create(
                    "Read-only — throws. Versification is owned by the platformScripture.versification project setting.",
                    [
                        ExperimentalMethodDocumentation.Param(
                            "bookNum",
                            "1-based book number.",
                            "number"
                        ),
                        ExperimentalMethodDocumentation.Param(
                            "chapterNum",
                            "1-based chapter number.",
                            "number"
                        ),
                        ExperimentalMethodDocumentation.Param("value", "Ignored.", "number"),
                    ],
                    ExperimentalMethodDocumentation.ResultOf(
                        "boolean",
                        "Never returns; always throws"
                    )
                ),
                ["getFinalChapter"] = ExperimentalMethodDocumentation.Create(
                    "Get the final chapter number in a book, per the project's versification.",
                    [
                        ExperimentalMethodDocumentation.Param(
                            "bookNum",
                            "1-based book number.",
                            "number"
                        ),
                    ],
                    ExperimentalMethodDocumentation.ResultOf("number", "Final chapter number")
                ),
                ["setFinalChapter"] = ExperimentalMethodDocumentation.Create(
                    "Read-only — throws. Versification is owned by the platformScripture.versification project setting.",
                    [
                        ExperimentalMethodDocumentation.Param(
                            "bookNum",
                            "1-based book number.",
                            "number"
                        ),
                        ExperimentalMethodDocumentation.Param("value", "Ignored.", "number"),
                    ],
                    ExperimentalMethodDocumentation.ResultOf(
                        "boolean",
                        "Never returns; always throws"
                    )
                ),
                ["getFinalVerseNumbersInBook"] = ExperimentalMethodDocumentation.Create(
                    "Get the final verse number for every chapter in a book as a 1-based-indexable array.",
                    [
                        ExperimentalMethodDocumentation.Param(
                            "bookNum",
                            "1-based book number.",
                            "number"
                        ),
                    ],
                    ExperimentalMethodDocumentation.ResultOf(
                        "array",
                        "Final verse numbers, indexed by chapter (index 0 is a filler 0)"
                    )
                ),
                ["setFinalVerseNumbersInBook"] = ExperimentalMethodDocumentation.Create(
                    "Read-only — throws. Versification is owned by the platformScripture.versification project setting.",
                    [
                        ExperimentalMethodDocumentation.Param(
                            "bookNum",
                            "1-based book number.",
                            "number"
                        ),
                        ExperimentalMethodDocumentation.Param("value", "Ignored.", "array"),
                    ],
                    ExperimentalMethodDocumentation.ResultOf(
                        "boolean",
                        "Never returns; always throws"
                    )
                ),
            },
        };

    /// <summary>
    /// The comment wire methods (name -> handler) a PDP exposes, but only when its project advertises
    /// <see cref="ProjectInterfaces.LEGACY_COMMENT"/> (see <see cref="GetFunctions"/>).
    /// </summary>
    internal Dictionary<string, Delegate> GetCommentFunctions() =>
        new()
        {
            { "getCommentThreads", GetCommentThreads },
            { "createComment", CreateComment },
            { "addCommentToThread", AddCommentToThread },
            { "resolveConflict", ResolveConflict },
            { "deleteComment", DeleteComment },
            { "updateComment", UpdateComment },
            { "setIsCommentThreadRead", SetIsCommentThreadRead },
            { "findAssignableUsers", FindAssignableUsers },
            { "canUserCreateComments", CanUserCreateComments },
            { "canUserAddCommentToThread", CanUserAddCommentToThread },
            { "canUserAssignThread", CanUserAssignThread },
            { "canUserResolveThread", CanUserResolveThread },
            { "getConflictResolutionOptions", GetConflictResolutionOptions },
            { "canUserEditOrDeleteComment", CanUserEditOrDeleteComment },
        };

    protected override Task StartDataProviderAsync()
    {
        _paratextProjects.Initialize();
        return Task.CompletedTask;
    }

    #endregion

    #region Extension Data

    public override object? GetExtensionData(ProjectDataScope scope)
    {
        if (string.IsNullOrEmpty(scope.ExtensionName))
            throw new InvalidDataException("Must provide an extension name");
        if (string.IsNullOrEmpty(scope.DataQualifier))
            throw new InvalidDataException("Must provide a data qualifier");

        scope.ProjectID = ProjectDetails.Metadata.Id;

        Stream? dataStream =
            GetExtensionStream(scope, true)
            ?? throw new InvalidDataException("Extension data not found");
        using (dataStream)
        {
            return new StreamReader(dataStream, Encoding.UTF8).ReadToEnd();
        }
    }

    public override bool SetExtensionData(ProjectDataScope scope, string data)
    {
        if (string.IsNullOrEmpty(scope.ExtensionName))
            throw new InvalidDataException("Must provide an extension name");
        if (string.IsNullOrEmpty(scope.DataQualifier))
            throw new InvalidDataException("Must provide a data qualifier");

        scope.ProjectID = ProjectDetails.Metadata.Id;

        Stream? dataStream =
            GetExtensionStream(scope, true)
            ?? throw new InvalidDataException("Unable to create extension data");

        ScrText scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);
        RunWithinLock(
            WriteScope.EntireProject(scrText),
            writeLock =>
            {
                if (!writeLock.Active)
                    throw new InvalidOperationException("Write lock is not active");
                dataStream.SetLength(0);
                using TextWriter textWriter = new StreamWriter(dataStream, Encoding.UTF8);
                textWriter.Write(data);
                textWriter.Flush();
            }
        );
        SendDataUpdateEvent(ProjectDataType.EXTENSION_DATA, "extension data update event");
        return true;
    }

    private Stream? GetExtensionStream(ProjectDataScope scope, bool createIfNotExists)
    {
        ProjectDetails projectDetails = _paratextProjects.GetProjectDetails(scope.ProjectID!);

        IProjectStreamManager extensionStreamManager = CreateStreamManager(projectDetails);
        return extensionStreamManager.GetDataStream(
            $"{LocalParatextProjects.EXTENSION_DATA_SUBDIRECTORY}/{scope.ExtensionName}/{scope.DataQualifier}",
            createIfNotExists
        );
    }

    protected virtual IProjectStreamManager CreateStreamManager(ProjectDetails projectDetails)
    {
        return new RawDirectoryProjectStreamManager(projectDetails);
    }

    #endregion

    #region Comments
    public List<PlatformCommentThreadWrapper> GetCommentThreads(CommentThreadSelector selector)
    {
        // Get all threads (activeOnly=false to include threads with deleted comments)
        List<CommentThread> allThreads = _commentManager.Value.FindThreads(activeOnly: false);

        // If no selector provided, apply defaults (exclude BT/spelling, deduplicate)
        selector ??= new CommentThreadSelector();

        IEnumerable<CommentThread> filteredThreads = allThreads;

        // Note-category filtering is applied BEFORE deduplication so that flags from excluded
        // threads cannot bleed into the merged metadata of a surviving thread with the same ID.
        filteredThreads = selector.NoteCategory switch
        {
            NoteCategory.BtNotes => filteredThreads.Where(t => t.IsBTNote),
            NoteCategory.SpellingNotes => filteredThreads.Where(t => t.IsSpellingNote),
            _ => filteredThreads.Where(t => !t.IsBTNote && !t.IsSpellingNote), // NoteCategory.General (default)
        };

        // Filter by thread ID (exact match)
        if (!string.IsNullOrEmpty(selector.ThreadId))
            filteredThreads = filteredThreads.Where(t => string.Equals(t.Id, selector.ThreadId));

        // Status and IsResolved both constrain the thread's status (IsResolved is the negatable
        // "== Resolved" form), so setting both can silently AND to zero results. Reject the
        // ambiguous combination instead of returning a confusing empty set.
        if (selector.Status != Enum<NoteStatus>.Null && selector.IsResolved is not null)
            throw new ArgumentException(
                "CommentThreadSelector.Status and IsResolved both filter thread status; set only one."
            );

        // Filter by status
        if (selector.Status != Enum<NoteStatus>.Null)
        {
            filteredThreads = filteredThreads.Where(t => t.Status == selector.Status);
        }

        // Filter by type
        if (selector.Type != null)
        {
            filteredThreads = filteredThreads.Where(t => t.Type == selector.Type);
        }

        // Filter by user (who created comments in the thread)
        if (!string.IsNullOrEmpty(selector.Author))
            filteredThreads = filteredThreads.Where(t =>
                t.Comments.Any(c => c.User == selector.Author)
            );

        // Filter by assigned user. null (absent) means "any assignee"; an empty string is the real
        // "unassigned" value (CommentThread.unassignedUser), so it must still filter rather than be
        // treated as "no filter".
        if (selector.AssignedTo != null)
            filteredThreads = filteredThreads.Where(t => t.AssignedUser == selector.AssignedTo);

        // Filter by date
        if (selector.DateFilter != null)
            filteredThreads = FilterByDate(filteredThreads, selector.DateFilter);

        // Filter by scripture ranges
        if (selector.ScriptureRanges != null && selector.ScriptureRanges.Count > 0)
            filteredThreads = FilterByScriptureRanges(filteredThreads, selector.ScriptureRanges);

        // Filter by read status
        if (selector.IsRead is bool isRead)
            filteredThreads = filteredThreads.Where(t => ThreadStatus.IsThreadRead(t) == isRead);

        // Filter by resolved status (THREAD status == Resolved or not; PT9 StatusFilter semantics)
        if (selector.IsResolved is bool isResolved)
            filteredThreads = filteredThreads.Where(t =>
                (t.Status == NoteStatus.Resolved) == isResolved
            );

        List<PlatformCommentThreadWrapper> results = filteredThreads
            .Select(t => new PlatformCommentThreadWrapper(t))
            .ToList();

        // Deduplicate threads with the same ID: combine unique comments and use the thread
        // with the latest ModifiedDate as the metadata base.
        // Done after wrapping to avoid mutating ParatextData's internal CommentThread objects.
        if (selector.DeduplicateThreads)
            results = DeduplicateCommentThreads(results);

        // Always drop threads where all comments are deleted, even when deduplication is off.
        // External API consumers should not receive all-deleted threads regardless of DeduplicateThreads.
        results = results.Where(t => t.HasNonDeletedComments).ToList();

        return results;
    }

    public bool DeleteComment(string commentId)
    {
        lock (_commentMutationLock)
        {
            // Find the comment by ID and its parent thread
            var (commentToDelete, parentThread) = FindCommentByIdWithThread(commentId);
            if (commentToDelete == null || parentThread == null)
                return false;

            VerifyUserCanEditOrDeleteComment(commentId);

            // Remove the comment using CommentManager
            _commentManager.Value.RemoveComment(commentToDelete);

            _commentManager.Value.SaveUser(commentToDelete.User, false);

            SendDataUpdateEvent(AllCommentDataTypes, "comment deleted event");
            return true;
        }
    }

    /// <summary>
    /// Replace newlines in the text with spaces. We need to do this to the USFM text in comments
    /// before saving them to file because they come from the PAPI with newlines but should be saved
    /// to file with spaces.
    /// </summary>
    private static string ReplaceNewlinesWithSpaces(string text)
    {
        text = text.Replace("\r", "").Replace("\n", " ");
        return text;
    }

    /// <summary>
    /// Creates a new comment and a new thread. Any thread id, user, or date provided in the
    /// comment parameter will be ignored - these are auto-generated by the Comment constructor.
    /// </summary>
    /// <param name="comment">Comment data. Thread, User, and Date will be ignored/auto-generated.</param>
    /// <returns>The auto-generated comment ID (format: "threadId/userName/date")</returns>
    /// <exception cref="InvalidOperationException">If the selected text is invalid or the comment's
    /// assigned (<see cref="PlatformCommentWrapper.AssignedUser"/>) cannot be assigned to threads
    /// in this project.
    public string CreateComment(PlatformCommentWrapper comment)
    {
        VerifyUserCanCreateComments();

        // Never let the "content could not be displayed" placeholder become a note's real content.
        // A degraded note is served with PlatformCommentConverter.ContentsUnavailablePlaceholder;
        // planting that text here would create a note that UpdateComment then permanently refuses to
        // edit (it rejects the same placeholder). Mirrors the guard in UpdateComment.
        if (PlatformCommentConverter.IsContentsUnavailablePlaceholder(comment.Contents?.OuterXml))
            throw new InvalidOperationException(
                "Cannot create a comment whose content is the unavailable-content placeholder."
            );

        if (comment.SelectedText != null && comment.SelectedText.Contains('\\'))
        {
            throw new InvalidOperationException(
                "Invalid selection. Selected text must be a simple word or phrase. "
                    + "Selected text cannot contain USFM markers (backslash characters)."
            );
        }

        var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);

        if (comment.AssignedUser != null)
        {
            var assignableUsers = CommentThread
                .GetAssignToUsers(scrText, includeCurrentUserInUnsharedProject: true)
                .ToList();
            if (!assignableUsers.Contains(comment.AssignedUser))
                throw new InvalidOperationException(
                    $"User '{comment.AssignedUser}' cannot be assigned to threads in this project."
                );
        }

        Comment newComment = new(scrText.User);

        CopyCommentProperties(comment, newComment);

        // Reformat USFM text in the comment by replacing newlines with spaces
        if (comment.SelectedText != null)
            newComment.SelectedText = ReplaceNewlinesWithSpaces(comment.SelectedText);

        if (
            string.IsNullOrEmpty(newComment.Verse)
            && string.IsNullOrEmpty(newComment.ContextBefore)
            && string.IsNullOrEmpty(newComment.ContextAfter)
        )
        {
            // Check *incoming* values that do not necessarily get copied to newComment.
            if (
                string.IsNullOrEmpty(comment.VerseRefStr) // This condition will throw exception below.
                || comment.StartPosition < 0
                || comment.SelectedText == null
            )
            {
                Console.Error.WriteLine(
                    "VerseRef, StartPosition, and SelectedText are required when Verse, ContextBefore, and ContextAfter are not provided"
                );
            }
            else
            {
                // Get the values of Verse, ContextBefore, and ContextAfter from the scrText since that's
                // the data that is supposed to be saved (already has spaces instead of newlines)
                // From CommentManager.CreateThread
                newComment.Verse = scrText.Parser.GetVerseUsfmText(newComment.VerseRef);

                if (newComment.Verse == null)
                {
                    Console.Error.WriteLine(
                        $"Unable to retrieve verse text for VerseRef {newComment.VerseRef}"
                    );
                }
                else
                {
                    newComment.ContextBefore = newComment.Verse[..newComment.StartPosition];
                    newComment.ContextAfter = newComment.Verse[
                        (newComment.StartPosition + newComment.SelectedText.Length)..
                    ];
                }
            }
        }

        // Create a ScriptureSelection to put the USFM snippets through the same processing as they
        // go through in P9
        ScriptureSelection selection;
        try
        {
            selection = new ScriptureSelection(
                newComment.VerseRef,
                newComment.SelectedText,
                newComment.StartPosition,
                newComment.ContextBefore,
                newComment.ContextAfter
            );
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException($"Invalid Scripture selection: {ex.Message}", ex);
        }

        // From CommentManager.CreateThread
        CommentUtils.AdjustNoteSelection(scrText, selection);
        newComment.StartPosition = selection.StartPosition;
        newComment.SelectedText = selection.SelectedText;
        newComment.ContextBefore = selection.ContextBefore;
        newComment.ContextAfter = selection.ContextAfter;

        if (string.IsNullOrEmpty(newComment.Language))
            newComment.Language = scrText.Language.Id;

        // Only the CommentManager mutation needs serializing (see _commentMutationLock); the
        // selection processing above builds the new comment without touching shared state.
        lock (_commentMutationLock)
        {
            _commentManager.Value.AddComment(newComment);
            _commentManager.Value.SaveUser(newComment.User, false);
            ThreadStatus.MarkThreadRead(_commentManager.Value.FindThread(newComment.Thread));

            SendDataUpdateEvent(AllCommentDataTypes, "comment created event");
        }

        return newComment.Id;
    }

    /// <summary>
    /// Adds a comment to an existing thread. The thread must already exist.
    /// Can also be used to modify thread-level properties (status, assignedUser) without
    /// adding comment content.
    /// </summary>
    /// <param name="comment">Comment data. Must have a valid Thread ID that exists.</param>
    /// <returns>The auto-generated comment ID (format: "threadId/userName/date")</returns>
    /// <exception cref="InvalidDataException">If the thread ID is missing or doesn't exist</exception>
    public string AddCommentToThread(PlatformCommentWrapper comment)
    {
        lock (_commentMutationLock)
        {
            if (string.IsNullOrEmpty(comment.Thread))
                throw new InvalidDataException("Thread ID is required for AddCommentToThread");

            bool hasContents =
                comment.Contents != null && !string.IsNullOrEmpty(comment.Contents.InnerText);
            bool hasStatus = comment.Status != NoteStatus.Unspecified;
            bool hasAssignedUser = comment.AssignedUser != null;

            if (!hasContents && !hasStatus && !hasAssignedUser)
                throw new InvalidDataException(
                    "At least one of Contents, Status, or AssignedUser must be provided for AddCommentToThread"
                );

            CommentThread? existingThread = _commentManager.Value.FindThread(comment.Thread);
            if (existingThread == null)
                throw new InvalidDataException($"Thread with id {comment.Thread} does not exist.");

            var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);

            VerifyUserCanAddCommentToThread();

            // Adding a content comment to a resolved thread implicitly re-opens it (applied further below).
            bool willReopenResolvedThread =
                comment.Status == NoteStatus.Unspecified
                && existingThread.Status == NoteStatus.Resolved
                && hasContents;

            // Validate permissions for status changes (resolve/re-open). An implicit re-open - adding a
            // comment to a resolved thread - must clear the same gate as an explicit status change;
            // otherwise a user who cannot resolve/re-open could bypass it by replying.
            if (
                comment.Status == NoteStatus.Resolved
                || comment.Status == NoteStatus.Todo
                || willReopenResolvedThread
            )
            {
                VerifyUserCanResolveThread(comment.Thread);

                // A verseText conflict must be resolved through ResolveConflict (accept/reject/merge),
                // which applies the chosen text and enforces the admin-or-assignee gate. This generic
                // path would mark it resolved without applying anything, and the already-resolved guard
                // would then lock out the real flow. Other conflict types (invalidVerses, readError,
                // verseBridge, ...) have no ResolveConflict path, so they must stay resolvable here;
                // gating on Type == Conflict alone left them permanently unresolvable. Reopening (Todo)
                // stays allowed.
                if (
                    comment.Status == NoteStatus.Resolved
                    && existingThread.Type == NoteType.Conflict
                    && existingThread.Comments is { Count: > 0 }
                    && existingThread.Comments[0].ConflictType == NoteConflictType.VerseTextConflict
                )
                    throw new InvalidOperationException(
                        $"Thread '{comment.Thread}' is a verseText merge conflict; use resolveConflict to accept or reject it instead of setting its status directly."
                    );
            }

            // Validate assigned user has permission to be assigned and is in the assignable users list
            if (comment.AssignedUser != null)
            {
                VerifyUserCanAssignThread(comment.Thread);
                var assignableUsers = CommentThread
                    .GetAssignToUsers(scrText, includeCurrentUserInUnsharedProject: true)
                    .ToList();
                if (!assignableUsers.Contains(comment.AssignedUser))
                    throw new InvalidOperationException(
                        $"User '{comment.AssignedUser}' cannot be assigned to threads in this project."
                    );
            }

            Comment newComment = existingThread.AddNewComment();

            CopyCommentProperties(comment, newComment);

            if (willReopenResolvedThread)
            {
                Console.WriteLine(
                    $"Reopening resolved thread {existingThread.Id} because a new comment is being added to it."
                );
                newComment.Status = NoteStatus.Todo;
            }

            _commentManager.Value.AddComment(newComment);
            _commentManager.Value.SaveUser(newComment.User, false);
            ThreadStatus.MarkThreadRead(existingThread);

            SendDataUpdateEvent(AllCommentDataTypes, "comment added to thread event");

            return newComment.Id;
        }
    }

    /// <summary>
    /// Applies a user's resolution to a verseText merge-conflict note and marks it resolved.
    /// <c>"accept"</c> keeps the auto-merged (winning) verse text and resolves the note (no verse
    /// write). <c>"reject"</c> writes the losing side's USFM into the verse, and <c>"merge"</c>
    /// writes PT9's auto-merged (both-sides) USFM into the verse, both via PT9's
    /// <see cref="CommentEditHelper.SaveEdits"/>, then resolves the note.
    /// </summary>
    /// <remarks>
    /// The reject/merge verse write happens inside PT9's <see cref="CommentEditHelper.SaveEdits"/>
    /// orchestration, where PT9's <c>ReplaceAcceptedText</c>/<c>MergeAcceptedText</c> silently no-op
    /// (they trace an error and leave the thread still resolved) if they cannot find the verse marker
    /// in the chapter. Reject and merge are therefore pre-gated by <see cref="IsConflictVerseStale"/>,
    /// which refuses the resolution when the verse is missing or has changed since the merge, so that
    /// no-op path is not reached.
    /// </remarks>
    /// <exception cref="InvalidDataException">Unknown resolution, or the thread doesn't exist.</exception>
    /// <exception cref="InvalidOperationException">Not a verseText conflict, the thread is already resolved, the user lacks permission, the resolve was canceled, or resolution is 'reject' or 'merge' and the verse text has changed since the conflict was recorded (stale).</exception>
    public void ResolveConflict(string threadId, string resolution)
    {
        if (resolution != "accept" && resolution != "reject" && resolution != "merge")
            throw new InvalidDataException(
                $"Invalid resolution '{resolution}' for ResolveConflict; expected 'accept', 'reject', or 'merge'."
            );

        // reject writes the loser text and merge the auto-merged text; both mutate the verse, while
        // accept writes nothing. Computed once so the staleness gate and the Scripture-update event
        // below cannot drift apart if a future resolution is added.
        bool writesVerse = resolution is "reject" or "merge";

        // Take the shared comment-mutation lock so the already-resolved guard (in
        // VerifyUserCanResolveConflict) is atomic with the SaveEdits that applies the resolution, and
        // so a concurrent AddCommentToThread reopen (or any other comment mutation) can't interleave
        // with it. Without this, two callers could both pass the guard and both write the verse,
        // corrupting an already-settled conflict.
        lock (_commentMutationLock)
        {
            // Verify proves the thread exists (throws otherwise) and returns it, so no re-find here.
            CommentThread thread = VerifyUserCanResolveConflict(threadId);

            // Reject writes the loser text, and merge writes the auto-merged (both-sides) text, over
            // the current verse; refuse both when the verse was edited after the merge (stale) so
            // post-merge edits can't be clobbered. Accept stays available as the exit path (it writes
            // nothing).
            if (writesVerse && IsConflictVerseStale(thread))
                throw new InvalidOperationException(
                    $"Conflict thread '{threadId}' cannot be resolved with '{resolution}': the verse text has changed since the conflict was recorded. Only 'accept' (keep the current text) is available."
                );

            // Merge only works when PT9 can auto-merge the two sides (independent edits). For
            // overlapping edits GetMergedUsfm returns null, and PT9's MergeAcceptedText would then
            // splice that null into the chapter USFM (C# concatenates null as ""), silently erasing
            // the whole verse. GetConflictResolutionOptions already withholds merge in this case;
            // enforce the same invariant here so a caller that skips the capability query can't
            // trigger the data loss.
            if (resolution == "merge" && CommentEditHelper.GetMergedUsfm(thread) == null)
                throw new InvalidOperationException(
                    $"Conflict thread '{threadId}' cannot be resolved with 'merge': the two sides have overlapping edits that cannot be auto-merged. Use 'accept' or 'reject'."
                );

            // Reuse PT9's orchestration (grant edit -> splice loser USFM -> resolve -> restore) via SaveEdits.
            var state = new ThreadEditState
            {
                Status = NoteStatus.Resolved,
                ConflictResolution = resolution switch
                {
                    "reject" => NoteConflictResolutions.Replaced,
                    "merge" => NoteConflictResolutions.Merged,
                    _ => NoteConflictResolutions.None,
                },
            };
            // SaveEdits returns false when the user cancels resolving (the creator-resolve path).
            // Surface that so we don't fire "resolved" events and report success for a thread that
            // is still open.
            bool resolved = CommentEditHelper.SaveEdits(
                null,
                _commentManager.Value,
                thread,
                state,
                true,
                out _,
                out _
            );
            if (!resolved)
                throw new InvalidOperationException(
                    $"Resolving conflict thread '{threadId}' was canceled; the thread was not resolved."
                );
        }

        // Refresh the comment list; on reject/merge the verse text changed via a raw PutText that
        // bypasses the Set* methods, so also refresh Scripture-text subscribers (the open editor).
        SendDataUpdateEvent(AllCommentDataTypes, "conflict resolved event");
        if (writesVerse)
            SendDataUpdateEvent(AllScriptureDataTypes, "conflict resolve wrote verse text event");
    }

    /// <summary>
    /// Verifies the current user may resolve the given verseText conflict thread right now:
    /// the thread exists, is an unresolved verseText conflict, passes the base resolve check, and
    /// the user is a project administrator or the assigned resolver. Throws with a specific
    /// message otherwise. Shared by <see cref="ResolveConflict"/> (enforcement) and
    /// <see cref="GetConflictResolutionOptions"/> (capability query).
    /// </summary>
    /// <returns>The verified conflict thread (never null); callers reuse it instead of re-finding.</returns>
    /// <exception cref="InvalidDataException">The thread doesn't exist or has no comments.</exception>
    /// <exception cref="InvalidOperationException">Not an unresolved verseText conflict, or the
    /// user lacks permission.</exception>
    private CommentThread VerifyUserCanResolveConflict(string threadId)
    {
        CommentThread? thread = _commentManager.Value.FindThread(threadId);
        if (thread == null)
            throw new InvalidDataException($"Thread with id {threadId} does not exist.");

        // v1 resolves verseText conflicts only. Guard the first-comment access: PT9's
        // CommentThread.FirstComment is private, so index defensively - an empty thread would
        // otherwise throw IndexOutOfRangeException (masked to "none" by GetConflictResolutionOptions).
        if (thread.Comments is not { Count: > 0 })
            throw new InvalidDataException($"Thread with id {threadId} has no comments.");
        Comment firstComment = thread.Comments[0];
        if (
            thread.Type != NoteType.Conflict
            || firstComment.ConflictType != NoteConflictType.VerseTextConflict
        )
            throw new InvalidOperationException(
                $"Thread '{threadId}' is not a verseText conflict and cannot be resolved here."
            );

        // A resolved conflict has already had its resolution applied. Re-resolving would rewrite the
        // verse of an already-settled thread (e.g. reject-after-accept) - a transition PT9's UI never
        // allows structurally. Reject it here so a stale/duplicate call can't clobber the verse text.
        if (thread.Status == NoteStatus.Resolved)
            throw new InvalidOperationException(
                $"Conflict thread '{threadId}' is already resolved and cannot be resolved again."
            );

        var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);

        // Permission: run the base resolve check, then restrict resolving to a project administrator
        // or the user (or team) the conflict is assigned to.
        VerifyUserCanResolveThread(threadId);
        if (!IsUserProjectAdministrator())
        {
            if (!IsThreadAssignedToUser(thread, scrText.User.Name))
                throw new InvalidOperationException(
                    $"User '{scrText.User.Name}' cannot resolve conflict thread '{threadId}' - only a project administrator or the assigned user may resolve it."
                );

            // A non-admin resolver must also have edit rights on the conflict verse's chapter.
            // Resolving (reject/merge) writes the verse; PT9's CommentHtmlBuilder.GetResolutionOptions
            // gates the resolve controls on CanEdit(book, chapter) for the same reason. Without this,
            // SaveEdits' EnsureCanEditChapter would temporarily grant the edit and let a user write to
            // a chapter they are not permitted to edit.
            VerseRef vref = thread.VerseRef;
            if (!scrText.Permissions.CanEdit(vref.BookNum, vref.ChapterNum))
                throw new InvalidOperationException(
                    $"User '{scrText.User.Name}' cannot resolve conflict thread '{threadId}' - they do not have permission to edit {vref.Book} {vref.ChapterNum}."
                );
        }

        return thread;
    }

    /// <summary>
    /// True when the conflict's verse can no longer be safely rewritten: the current verse text no
    /// longer matches the merge-winner text recorded on the conflict comment (the verse was edited
    /// after the merge), or the verse reference is invalid/unreadable. Mirrors the staleness guard
    /// in PT9's CommentHtmlBuilder.GetResolutionOptions.
    /// </summary>
    private bool IsConflictVerseStale(CommentThread thread)
    {
        try
        {
            var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);
            VerseRef vref = thread.VerseRef;
            if (!vref.Valid || vref.IsDefault)
                return true;
            // PT9 reads verse-only USFM via Parser.GetVerseUsfmText (CommentHtmlBuilder
            // .GetResolutionOptions); ScrText.GetText returns the whole chapter, which never
            // matches the verse-only text recorded on Comment.Verse. A missing verse -> stale.
            string? currentRaw = scrText.Parser.GetVerseUsfmText(vref, true, true);
            if (currentRaw == null)
                return true;
            // Regularize (PT9 does this to the recorded side) AND trim both sides: the parser emits a
            // trailing space the recorded Comment.Verse may lack, and a pure leading/trailing
            // whitespace difference is not a meaningful verse edit, so it must not count as stale.
            string currentVerseUsfm = UsfmToken.RegularizeSpaces(currentRaw).Trim();
            string conflictUsfm = UsfmToken.RegularizeSpaces(thread.Comments[0].Verse).Trim();
            return currentVerseUsfm != conflictUsfm;
        }
        catch (Exception e)
        {
            // Unreadable text -> treat as stale: reject/merge become unavailable, accept remains.
            // This runs only after the thread is validated, so an exception here is a genuine read
            // failure (parser/NRE) - log it so it isn't silently masked as a benign "stale".
            Console.WriteLine(
                $"IsConflictVerseStale: treating conflict thread '{thread.Id}' as stale due to an error: {e}"
            );
            return true;
        }
    }

    /// <summary>
    /// The resolution actions the current user may take on the given conflict thread.
    /// "none" - not an unresolved verseText conflict, or the user lacks permission (see
    /// <see cref="VerifyUserCanResolveConflict"/>). "accept" - permitted, but the verse was edited
    /// after the merge (stale), so only accept (keep current text) is available. "acceptOrReject" -
    /// permitted and the verse still matches the recorded merge winner. Never throws; this is the
    /// capability query for <see cref="ResolveConflict"/>.
    /// </summary>
    /// <remarks>
    /// This resolvability policy mirrors a slice of PT9's <c>CommentHtmlBuilder.GetResolutionOptions</c>
    /// (the canonical version lives in ParatextInternalShared and is not referenceable here).
    /// Intentional divergences to keep in mind if that upstream method changes: (1) a Team-assigned
    /// conflict is resolvable by any team member (see <see cref="IsThreadAssignedToUser"/>); (2) there
    /// is no study-bible-additions gate; (3) staleness regularizes and trims whitespace before
    /// comparing (see <see cref="IsConflictVerseStale"/>), so a pure leading/trailing whitespace
    /// change is not treated as stale.
    /// </remarks>
    public string GetConflictResolutionOptions(string threadId)
    {
        try
        {
            // Verify proves the thread exists (throws otherwise) and returns it, so no re-find here.
            CommentThread thread = VerifyUserCanResolveConflict(threadId);
            if (IsConflictVerseStale(thread))
                return "accept";
            // Merge is offered only when PT9 can actually merge the two sides (independent changes);
            // GetMergedUsfm returns null for overlapping edits. Same gate PT9's GetResolutionOptions uses.
            return CommentEditHelper.GetMergedUsfm(thread) != null
                ? "acceptRejectOrMerge"
                : "acceptOrReject";
        }
        catch (Exception e) when (e is InvalidOperationException or InvalidDataException)
        {
            // Expected domain outcomes (not an unresolved verseText conflict, no permission, no
            // comments) mean "no resolve options" - return quietly, this is a capability query.
            return "none";
        }
        catch (Exception e)
        {
            // Unexpected failure (parser, NRE, ...). Still degrade to "none" so the query never
            // throws, but log so the root cause isn't invisible to logs/telemetry.
            Console.WriteLine(
                $"GetConflictResolutionOptions: unexpected error for thread '{threadId}', returning 'none': {e}"
            );
            return "none";
        }
    }

    /// <summary>
    /// True when the thread's most-recent assignment lets <paramref name="userName"/> resolve it:
    /// either the thread is assigned to that user, or it is assigned to the whole team
    /// (<see cref="CommentThread.teamUser"/>), which counts every team member as an assignee.
    /// </summary>
    private static bool IsThreadAssignedToUser(CommentThread thread, string userName)
    {
        // Scan comments newest-first for the effective assignment, inspecting the raw per-comment
        // AssignedUser. We deliberately do NOT reuse CommentThread.AssignedUser: that property
        // collapses "no assignment" (null) into its unassigned sentinel (unassignedUser = ""), which
        // is then indistinguishable from an explicit assignment to an empty-named user - so an
        // unassigned thread could spuriously read as assigned (the non-admin permission tests exercise
        // exactly this via an empty-named dummy user). The raw per-comment value preserves the null vs
        // "" distinction; a thread with no assignment must be "not assigned to this user" (false).
        for (int i = thread.Comments.Count - 1; i >= 0; i--)
        {
            string? assigned = thread.Comments[i].AssignedUser;
            if (assigned != null)
                // "Team" assigns to everyone, so any team member counts as the assignee; otherwise
                // the assignment must name this user exactly.
                return assigned == CommentThread.teamUser
                    || string.Equals(assigned, userName, StringComparison.Ordinal);
        }
        return false;
    }

    /// <summary>
    /// Copies properties from the source comment to the target comment, excluding
    /// auto-generated fields (Thread, User, Date).
    /// </summary>
    private static void CopyCommentProperties(PlatformCommentWrapper source, Comment target)
    {
        if (!string.IsNullOrEmpty(source.ContextAfter))
            target.ContextAfter = source.ContextAfter;
        if (!string.IsNullOrEmpty(source.ContextBefore))
            target.ContextBefore = source.ContextBefore;
        if (!string.IsNullOrEmpty(source.SelectedText))
            target.SelectedText = source.SelectedText;
        if (source.StartPosition >= 0)
            target.StartPosition = source.StartPosition;
        // AssignedUser allows empty string (means "unassigned"), so only check for null
        if (source.AssignedUser != null)
            target.AssignedUser = source.AssignedUser;
        if (!string.IsNullOrEmpty(source.BiblicalTermId))
            target.BiblicalTermId = source.BiblicalTermId;
        // ConflictType is deliberately NOT copied: it is merger-authored, root-comment-only
        // metadata (PT9 BookFileMerger.RecordConflict). No papi client can legitimately author it,
        // and copying it here let replies carry a client-supplied ConflictType, which the wrapper
        // then decoded into phantom conflict fields. It is also omitted from the NewLegacyComment
        // and LegacyCommentReply write contracts. Note the FirstComment.Type inheritance done by
        // ParatextData's AddNewComment is separate and intentionally left intact.
        if (source.Deleted)
            target.Deleted = source.Deleted;
        if (source.HideInTextWindow)
            target.HideInTextWindow = source.HideInTextWindow;
        if (!string.IsNullOrEmpty(source.Language))
            target.Language = source.Language;
        if (!string.IsNullOrEmpty(source.ReplyToUser))
            target.ReplyToUser = source.ReplyToUser;
        if (!string.IsNullOrEmpty(source.Shared))
            target.Shared = source.Shared;
        if (source.Status != NoteStatus.Unspecified)
            target.Status = source.Status;
        if (source.Type != NoteType.Unspecified)
            target.Type = source.Type;
        if (!string.IsNullOrEmpty(source.Verse))
            target.Verse = source.Verse;
        if (!string.IsNullOrEmpty(source.VerseRefStr))
            target.VerseRefStr = source.VerseRefStr;
        if (source.Contents != null)
            target.Contents = source.Contents;
        if (source.TagsAdded != null && source.TagsAdded.Length > 0)
            target.TagsAdded = source.TagsAdded;
        if (source.TagsRemoved != null && source.TagsRemoved.Length > 0)
            target.TagsRemoved = source.TagsRemoved;
        if (!string.IsNullOrEmpty(source.ExtraHeadingInfoInternal))
            target.ExtraHeadingInfoInternal = source.ExtraHeadingInfoInternal;
    }

    public bool UpdateComment(string commentId, string updatedContentHtml)
    {
        lock (_commentMutationLock)
        {
            if (string.IsNullOrEmpty(commentId))
                return false;

            // Never persist the "content could not be displayed" placeholder back over a note's
            // real stored content. A note whose content can't be rendered is served to the client as
            // PlatformCommentConverter.ContentsUnavailablePlaceholder; if the user opens that degraded
            // note and saves, the frontend sends the placeholder here, which would silently overwrite
            // the (unrenderable but present) original. Matched on normalized text rather than exact
            // HTML because the editor may re-serialize the placeholder markup on save. Reject that.
            if (PlatformCommentConverter.IsContentsUnavailablePlaceholder(updatedContentHtml))
                return false;

            // Find the comment by ID and its parent thread
            var (commentToUpdate, parentThread) = FindCommentByIdWithThread(commentId);
            if (commentToUpdate == null || parentThread == null)
                return false;

            VerifyUserCanEditOrDeleteComment(commentId);

            // Update the comment contents from HTML
            var commentWrapper = new PlatformCommentWrapper(
                commentToUpdate,
                new PlatformCommentThreadWrapper(parentThread)
            );
            commentWrapper.ContentsHtml = updatedContentHtml;

            // Reset the status field to Unspecified when a comment is edited
            commentToUpdate.Status = NoteStatus.Unspecified;

            _commentManager.Value.SaveUser(commentToUpdate.User, false);

            SendDataUpdateEvent(AllCommentDataTypes, "comment updated");

            return true;
        }
    }

    public void SetIsCommentThreadRead(string threadId, bool markRead)
    {
        CommentThread? thread = _commentManager.Value.FindThread(threadId);
        if (thread == null)
            throw new ArgumentException($"Thread with ID '{threadId}' not found", nameof(threadId));

        if (markRead)
            ThreadStatus.MarkThreadRead(thread);
        else
            ThreadStatus.MarkThreadUnread(thread);

        SendDataUpdateEvent(AllCommentDataTypes, "comment thread read status updated");
    }

    /// <summary>
    /// Finds the list of users that can be assigned to comment threads in this project.
    /// </summary>
    /// <returns>List of usernames that can be assigned to threads. Includes special values:
    /// "Team" for team assignment, and "" (empty string) for unassigned.</returns>
    public List<string> FindAssignableUsers()
    {
        var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);
        return
        [
            .. CommentThread.GetAssignToUsers(scrText, includeCurrentUserInUnsharedProject: true),
        ];
    }

    #region Permission Checks

    /// <summary>
    /// Verifies that the current user can create new comment threads in this project.
    /// Throws an <see cref="InvalidOperationException"/> with a specific message if not allowed.
    /// </summary>
    /// <param name="allowInSba">Allow creating comments in Study Bible Additions projects (default: false)</param>
    private void VerifyUserCanCreateComments(bool allowInSba = false)
    {
        var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);

        // Cannot create comments in resource projects
        if (scrText.IsResourceProject)
            throw new InvalidOperationException("Cannot create comments in resource projects.");

        // Must have a role other than Observer or None
        if (!scrText.Permissions.HaveRoleNotObserver)
            throw new InvalidOperationException(
                "You do not have permission to create comments in this project."
            );

        // Cannot create comments in Study Bible Additions (unless explicitly allowed)
        if (!allowInSba && scrText.Settings.IsStudyBibleAdditions)
            throw new InvalidOperationException(
                "Cannot create comments in Study Bible Additions projects."
            );

        // Cannot create comments in Transliteration with Encoder projects
        if (scrText.Settings.TranslationInfo.Type == ProjectType.TransliterationWithEncoder)
            throw new InvalidOperationException(
                "Cannot create comments in Transliteration with Encoder projects."
            );
    }

    /// <summary>
    /// Determines if the current user can create new comment threads in this project.
    /// </summary>
    /// <param name="allowInSba">Allow creating comments in Study Bible Additions projects (default: false)</param>
    /// <returns>True if the user can create comments, false otherwise</returns>
    public bool CanUserCreateComments(bool allowInSba = false)
    {
        try
        {
            VerifyUserCanCreateComments(allowInSba);
            return true;
        }
        catch
        {
            return false;
        }
    }

    /// <summary>
    /// Verifies that the current user can add comments to existing threads in this project.
    /// Throws an <see cref="InvalidOperationException"/> with a specific message if not allowed.
    /// </summary>
    private void VerifyUserCanAddCommentToThread()
    {
        var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);

        // Must have a role other than Observer or None
        if (!scrText.Permissions.HaveRoleNotObserver)
            throw new InvalidOperationException(
                $"User '{scrText.User.Name}' does not have permission to add comments to threads in this project."
            );

        // Resource projects with global note types are read-only
        if (scrText.IsResourceProject && scrText.Settings.TranslationInfo.Type.IsGlobalNoteType())
            throw new InvalidOperationException(
                "Resource projects with global note types are read-only."
            );
    }

    /// <summary>
    /// Determines if the current user can add comments to existing threads in this project.
    /// This is slightly different from CanUserAddNotes - it allows adding to threads
    /// in resource projects that aren't global note types.
    /// </summary>
    /// <returns>True if the user can add comments to threads, false otherwise</returns>
    public bool CanUserAddCommentToThread()
    {
        try
        {
            VerifyUserCanAddCommentToThread();
            return true;
        }
        catch
        {
            return false;
        }
    }

    /// <summary>
    /// Verifies that the current user can change the assigned user on a specific thread.
    /// Throws an <see cref="InvalidOperationException"/> with a specific message if not allowed.
    /// </summary>
    /// <param name="threadId">The ID of the thread to check</param>
    private void VerifyUserCanAssignThread(string threadId)
    {
        var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);

        // Must have a role other than Observer or None
        if (!scrText.Permissions.HaveRoleNotObserver)
            throw new InvalidOperationException(
                $"User '{scrText.User.Name}' does not have permission to assign this thread."
            );

        CommentThread? thread = _commentManager.Value.FindThread(threadId);
        if (thread == null)
            throw new InvalidOperationException($"Thread with id {threadId} does not exist.");

        // Biblical Term notes cannot have assignments
        if (thread.IsBTNote)
            throw new InvalidOperationException("Biblical Term notes cannot have assignments.");

        // Spelling notes cannot have assignments
        if (thread.IsSpellingNote)
            throw new InvalidOperationException("Spelling notes cannot have assignments.");
    }

    /// <summary>
    /// Determines if the current user can change the assigned user on a specific thread.
    /// </summary>
    /// <param name="threadId">The ID of the thread to check</param>
    /// <returns>True if the user can assign the thread, false otherwise</returns>
    public bool CanUserAssignThread(string threadId)
    {
        try
        {
            VerifyUserCanAssignThread(threadId);
            return true;
        }
        catch
        {
            return false;
        }
    }

    /// <summary>
    /// Verifies that the current user can resolve or re-open a specific thread.
    /// Throws an <see cref="InvalidOperationException"/> with a specific message if not allowed.
    /// </summary>
    /// <param name="threadId">The ID of the thread to check</param>
    private void VerifyUserCanResolveThread(string threadId)
    {
        var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);

        // Must have a role other than Observer or None
        if (!scrText.Permissions.HaveRoleNotObserver)
            throw new InvalidOperationException(
                $"User '{scrText.User.Name}' does not have permission to resolve or re-open threads in this project."
            );

        // Resource projects with global note types are read-only
        if (scrText.IsResourceProject && scrText.Settings.TranslationInfo.Type.IsGlobalNoteType())
            throw new InvalidOperationException(
                "Resource projects with global note types are read-only."
            );

        CommentThread? thread = _commentManager.Value.FindThread(threadId);
        if (thread == null)
            throw new InvalidOperationException($"Thread with id {threadId} does not exist.");

        CommentTags tags = CommentTags.Get(scrText);

        // Check if user can resolve based on all tags on the thread
        if (!thread.TagIds.All(tagId => thread.CanCurrentUserResolve(tags.Get(tagId))))
            throw new InvalidOperationException(
                $"User '{scrText.User.Name}' cannot resolve or re-open thread '{threadId}' - insufficient permissions."
            );
    }

    /// <summary>
    /// Determines if the current user can resolve or re-open a specific thread.
    /// </summary>
    /// <param name="threadId">The ID of the thread to check</param>
    /// <returns>True if the user can resolve the thread, false otherwise</returns>
    public bool CanUserResolveThread(string threadId)
    {
        try
        {
            VerifyUserCanResolveThread(threadId);
            return true;
        }
        catch
        {
            return false;
        }
    }

    /// <summary>
    /// Verifies that the current user can edit or delete a specific comment.
    /// Throws an <see cref="InvalidOperationException"/> with a specific message if not allowed.
    /// Checks are ordered from most fundamental (role/project level) to most specific (comment level),
    /// so the most actionable error is always reported first.
    /// </summary>
    /// <param name="commentId">The ID of the comment to check</param>
    private void VerifyUserCanEditOrDeleteComment(string commentId)
    {
        var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);

        // Must have general edit permission on the project (checked first - most fundamental)
        if (!scrText.Permissions.HaveRoleNotObserver)
            throw new InvalidOperationException(
                $"User does not have permission to edit or delete comment {commentId}."
            );

        // Resource projects with global note types are read-only
        if (scrText.IsResourceProject && scrText.Settings.TranslationInfo.Type.IsGlobalNoteType())
            throw new InvalidOperationException(
                $"User does not have permission to edit or delete comment {commentId}."
            );

        var (comment, thread) = FindCommentByIdWithThread(commentId);
        if (comment == null || thread == null)
            throw new InvalidOperationException($"Comment with ID {commentId} does not exist.");

        // Must be the last comment in the thread
        var lastComment = thread.LastComment;
        if (lastComment == null || comment.Id != lastComment.Id)
            throw new InvalidOperationException(
                $"Cannot edit or delete comment {commentId} in thread {thread.Id} - only the last comment can be edited or deleted (last comment ID: {lastComment?.Id})"
            );

        // Must be the author of the comment
        if (comment.User != scrText.User.Name)
            throw new InvalidOperationException(
                $"Cannot edit or delete comment {commentId} in thread {comment.Thread} - not created by current user {scrText.User.Name} (created by {comment.User})"
            );

        // Cannot edit/delete if it's a conflict resolution action
        if (comment.ConflictResolutionAction != NoteConflictResolutions.None)
            throw new InvalidOperationException(
                $"Cannot edit or delete comment {commentId} in thread {thread.Id} - comment is a conflict resolution action."
            );

        // Cannot edit/delete the first comment of a conflict note. Root identified by date via the
        // shared helper, not by list position (see PlatformCommentThreadWrapper.RootCommentId).
        if (
            thread.Type == NoteType.Conflict
            && PlatformCommentThreadWrapper.GetRootCommentId(thread.Comments) == comment.Id
        )
            throw new InvalidOperationException(
                $"Cannot edit or delete comment {commentId} in thread {thread.Id} - cannot edit or delete the first comment of a conflict note."
            );
    }

    /// <summary>
    /// Determines if the current user can edit or delete a specific comment.
    /// In Paratext 9, edit and delete have identical permission requirements.
    /// </summary>
    /// <param name="commentId">The ID of the comment to check</param>
    /// <returns>True if the user can edit or delete the comment, false otherwise</returns>
    public bool CanUserEditOrDeleteComment(string commentId)
    {
        try
        {
            VerifyUserCanEditOrDeleteComment(commentId);
            return true;
        }
        catch
        {
            return false;
        }
    }

    #endregion

    private (Comment?, CommentThread?) FindCommentByIdWithThread(string commentId)
    {
        // Get all threads (activeOnly=false to include deleted comments)
        List<CommentThread> allThreads = _commentManager.Value.FindThreads(activeOnly: false);

        // Search through all threads to find the comment with matching ID
        foreach (var thread in allThreads)
        {
            var comment = thread.Comments.FirstOrDefault(c => c.Id == commentId);
            if (comment != null)
                return (comment, thread);
        }

        return (null, null);
    }

    /// <summary>
    /// Merges threads with duplicate IDs: combines unique comments and uses the thread with the
    /// latest <see cref="PlatformCommentThreadWrapper.ModifiedDate"/> as the metadata base.
    /// Works on wrappers to avoid mutating ParatextData's internal CommentThread objects.
    /// </summary>
    internal static List<PlatformCommentThreadWrapper> DeduplicateCommentThreads(
        List<PlatformCommentThreadWrapper> wrappers
    )
    {
        var threadMap = new Dictionary<string, PlatformCommentThreadWrapper>();

        foreach (PlatformCommentThreadWrapper wrapper in wrappers)
        {
            if (!threadMap.TryGetValue(wrapper.Id, out PlatformCommentThreadWrapper? existing))
            {
                threadMap[wrapper.Id] = wrapper;
                continue;
            }

            // Use the thread with the later ModifiedDate as the metadata base
            if (wrapper.ModifiedDate > existing.ModifiedDate)
            {
                // New thread is newer — it becomes the base, merge existing's comments into it
                wrapper.MergeCommentsFrom(existing);
                threadMap[wrapper.Id] = wrapper;
            }
            else
            {
                // Existing thread is newer or same — merge the new thread's comments into it
                existing.MergeCommentsFrom(wrapper);
            }
        }

        return threadMap.Values.ToList();
    }

    private static IEnumerable<CommentThread> FilterByDate(
        IEnumerable<CommentThread> threads,
        DateFilter dateFilter
    )
    {
        if (!string.IsNullOrEmpty(dateFilter.Exact))
        {
            var targetDate = DateTimeOffset.Parse(dateFilter.Exact);
            // For exact date matching, compare only the date portion (ignore time)
            return threads.Where(t => t.ModifiedDate.Date == targetDate.Date);
        }

        if (!string.IsNullOrEmpty(dateFilter.Before))
        {
            var beforeDate = DateTimeOffset.Parse(dateFilter.Before);
            return threads.Where(t => t.ModifiedDate <= beforeDate);
        }

        if (!string.IsNullOrEmpty(dateFilter.After))
        {
            var afterDate = DateTimeOffset.Parse(dateFilter.After);
            return threads.Where(t => t.ModifiedDate >= afterDate);
        }

        if (!string.IsNullOrEmpty(dateFilter.Start) && !string.IsNullOrEmpty(dateFilter.End))
        {
            var startDate = DateTimeOffset.Parse(dateFilter.Start);
            var endDate = DateTimeOffset.Parse(dateFilter.End);
            return threads.Where(t => t.ModifiedDate >= startDate && t.ModifiedDate <= endDate);
        }

        return threads;
    }

    private IEnumerable<CommentThread> FilterByScriptureRanges(
        IEnumerable<CommentThread> threads,
        List<CommentScriptureRange> scriptureRanges
    )
    {
        var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);

        return threads.Where(thread =>
        {
            VerseRef threadVerseRef = thread.VerseRef;
            return scriptureRanges.Any(range => MatchesScriptureRange(threadVerseRef, range));
        });
    }

    private static bool MatchesScriptureRange(VerseRef verseRef, CommentScriptureRange range)
    {
        // Match based on granularity
        string granularity = range.Granularity ?? "verse";

        // End is optional on the canonical ScriptureRange; a null End is a single-verse range,
        // so the start verse doubles as the end. (The converter always supplies a non-null End.)
        VerseRef end = range.End ?? range.Start;

        switch (granularity.ToLowerInvariant())
        {
            case "book":
                // Match if the comment is in any book within the range
                return verseRef.BookNum >= range.Start.BookNum && verseRef.BookNum <= end.BookNum;

            case "chapter":
                // Match if the comment is in the same book and within the chapter range
                if (verseRef.BookNum != range.Start.BookNum)
                    return false;
                return verseRef.ChapterNum >= range.Start.ChapterNum
                    && verseRef.ChapterNum <= end.ChapterNum;

            case "verse":
            default:
                // Match if the comment's verse is within the range
                return verseRef.CompareTo(range.Start) >= 0 && verseRef.CompareTo(end) <= 0;
        }
    }

    #endregion

    #region Settings

    public static string VisibilitySettingName => Setting.Visibility.ToString();

    internal static void RegisterSettingsValidators(PapiClient papiClient)
    {
        ProjectSettingsService.RegisterValidator(
            papiClient,
            VisibilitySettingName,
            VisibilityValidator
        );

        (bool result, string? error) VisibilityValidator(
            (string newValueJson, string currentValueJson, string allChangesJson) data
        )
        {
            try
            {
                var value = data.newValueJson.DeserializeFromJson<string>();
                var result = true;
                string? error = null;
                if (value == null)
                {
                    result = false;
                    error = $"New {VisibilitySettingName} value cannot be null.";
                }
                else if (!Enum.TryParse<ProjectVisibility>(value, out _))
                {
                    result = false;
                    error = $"New {VisibilitySettingName} value is not valid.";
                }
                return (result, error);
            }
            catch (Exception ex)
            {
                return (false, ex.Message);
            }
        }
    }

    public object? GetProjectSetting(string settingName)
    {
        var paratextSettingName =
            ProjectSettingsNames.GetParatextSettingNameFromPlatformBibleSettingName(settingName)
            ?? settingName;
        var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);

        // The data containing the language tag is found in the projects ldml file, not Settings.xml
        if (paratextSettingName == ProjectSettingsNames.PT_LANGUAGE_TAG)
        {
            // The Id property of LanguageId is the BCP 47 language tag for the writing system of this project
            return scrText.Language.LanguageId.Id;
        }
        // ScrText always prioritizes the folder name over the Name setting as the "name" even when
        // accessing scrText.Settings.Name. So we're copying Paratext's functionality here and using
        // the folder name instead of Settings.Name.
        // https://github.com/ubsicap/Paratext/blob/aaadecd828a9b02e6f55d18e4c5dda8703ce2429/ParatextData/ProjectSettingsAccess/ProjectSettings.cs#L1438
        if (paratextSettingName == ProjectSettingsNames.PT_NAME)
            return scrText.Name;

        // Some resource projects are marked as editable in their settings, but we want to treat
        // them as read-only projects
        if (scrText.IsResourceProject && paratextSettingName == ProjectSettingsNames.PT_IS_EDITABLE)
            return false;

        // platform.isPublished is computed from ScrText.IsResourceProject — there is no
        // matching Paratext Settings.xml key. A "published" project here is one that PT9 called
        // a "resource": packaged for reference use, fully read-only.
        if (settingName == ProjectSettingsNames.PB_IS_PUBLISHED)
            return scrText.IsResourceProject;

        // Text direction comes from the project's ldml file, not from Settings.xml
        if (paratextSettingName == ProjectSettingsNames.PT_TEXT_DIRECTION)
            return scrText.RightToLeft ? "rtl" : "ltr";

        // BooksPresent in Settings.xml isn't always 123 characters, but this way of getting it is always
        if (paratextSettingName == ProjectSettingsNames.PT_BOOKS_PRESENT)
            return scrText.BooksPresentSet.Books;

        // Character categorizer settings are computed from the project's CharacterCategorizer.
        if (
            paratextSettingName == ProjectSettingsNames.PT_BASE_CHARACTER_CLASS_REGEX
            || paratextSettingName == ProjectSettingsNames.PT_DIACRITIC_CHARACTER_CLASS_REGEX
            || paratextSettingName == ProjectSettingsNames.PT_WORD_MEDIAL_CHARACTER_REGEX
            || paratextSettingName == ProjectSettingsNames.PT_WORD_BREAK_REGEX
        )
        {
            var characterCategorizer = scrText.CharacterCategorizer;
            return paratextSettingName switch
            {
                // `\-` is accepted by .NET regex, but in ECMAScript `u` mode it is invalid
                // outside character classes. Use `\x2D` so the pattern is valid in JavaScript
                // with `u` regardless of where this fragment is inserted.
                ProjectSettingsNames.PT_BASE_CHARACTER_CLASS_REGEX =>
                    characterCategorizer.BaseCharacterRegex.Replace(@"\-", @"\x2D"),
                ProjectSettingsNames.PT_DIACRITIC_CHARACTER_CLASS_REGEX =>
                    characterCategorizer.DiacriticCharacterRegex.Replace(@"\-", @"\x2D"),
                ProjectSettingsNames.PT_WORD_MEDIAL_CHARACTER_REGEX =>
                    characterCategorizer.WordMedialRegex.Replace(@"\-", @"\x2D"),
                ProjectSettingsNames.PT_WORD_BREAK_REGEX =>
                    characterCategorizer.WordBreakRegex.Replace(@"\-", @"\x2D"),
                _ => throw new InvalidDataException(
                    $"Unexpected or unimplemented character categorizer setting name: {paratextSettingName}"
                ),
            };
        }

        if (
            paratextSettingName == ProjectSettingsNames.PT_MODEL_TEXTS
            || paratextSettingName == ProjectSettingsNames.PT_REFERENCED_PROJECTS_AND_RESOURCES
        )
        {
            if (
                scrText.Settings.ParametersDictionary.TryGetValue(
                    paratextSettingName,
                    out string? storedValue
                ) && !string.IsNullOrEmpty(storedValue)
            )
            {
                int spaceIndex = storedValue.IndexOf(' ');
                if (spaceIndex < 0)
                    throw new InvalidDataException(
                        $"Setting '{paratextSettingName}' is missing the version prefix."
                    );

                string versionStr = storedValue[..spaceIndex];
                string jsonBody = storedValue[(spaceIndex + 1)..];

                if (!System.Version.TryParse(versionStr, out var parsedVersion))
                    throw new InvalidDataException(
                        $"Setting '{paratextSettingName}' has an invalid version format: '{versionStr}'"
                    );
                if (parsedVersion.Major != ResourceReferenceList.CurrentMajorVersion)
                    throw new InvalidDataException(
                        $"Setting '{paratextSettingName}' has incompatible major version "
                            + $"{parsedVersion.Major}; expected {ResourceReferenceList.CurrentMajorVersion}"
                    );

                return jsonBody.DeserializeFromJson<ResourceReferenceList>();
            }
            return new ResourceReferenceList();
        }

        if (
            scrText.Settings.ParametersDictionary.TryGetValue(
                paratextSettingName,
                out string? settingValue
            )
        )
        {
            // Paratext project setting value found, so return the value with the appropriate type
            if (ProjectSettingsNames.IsParatextSettingABoolean(paratextSettingName))
            {
                return settingValue.ToUpperInvariant() switch
                {
                    "F" => false,
                    "FALSE" => false,
                    "T" => true,
                    "TRUE" => true,
                    _ => throw new InvalidDataException(
                        $"Failed to convert Paratext setting {settingName} to boolean. Value was not T or F"
                    ),
                };
            }
            return settingValue;
        }

        // Setting not found, so get the default value
        object? defaultValue =
            ProjectSettingsService.GetDefault(PapiClient, settingName)
            ?? throw new InvalidDataException($"Default value for {settingName} was null");
        return defaultValue;
    }

    public bool SetProjectSetting(string settingName, object? value)
    {
        var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);
        if (scrText.IsResourceProject)
            throw new Exception("Cannot change settings on resources");

        // platform.isPublished is read-only — it reflects ScrText.IsResourceProject and is not
        // backed by any writable Paratext setting.
        if (settingName == ProjectSettingsNames.PB_IS_PUBLISHED)
            throw new InvalidOperationException(
                $"{ProjectSettingsNames.PB_IS_PUBLISHED} is a read-only computed setting."
            );

        // If there is no Paratext setting for the name given, we'll create one lower down
        object? currentValue = null;
        try
        {
            currentValue = GetProjectSetting(settingName);
        }
        catch (Exception) { }

        // Make sure the value we're planning to set is valid
        if (!ProjectSettingsService.IsValid(PapiClient, value, currentValue, settingName, ""))
            throw new InvalidDataException($"Validation failed for {settingName}");

        // Figure out which setting name to use
        var paratextSettingName =
            ProjectSettingsNames.GetParatextSettingNameFromPlatformBibleSettingName(settingName)
            ?? settingName;

        // Text direction comes from the project's ldml file, not from Settings.xml
        // We may add an LDML projectInterface one day where you can edit the LDML in the UI
        if (paratextSettingName == ProjectSettingsNames.PT_TEXT_DIRECTION)
            throw new Exception(
                "Cannot set text direction this way. Must edit the language definition ldml file"
            );
        // The language tag comes from the project's ldml file, not from Settings.xml
        if (paratextSettingName == ProjectSettingsNames.PT_LANGUAGE_TAG)
            throw new Exception(
                "Cannot set the language tag this way. Must edit the language definition ldml file"
            );

        // BooksPresentSet is changed by adding and removing books, not setting the setting value
        if (paratextSettingName == ProjectSettingsNames.PT_BOOKS_PRESENT)
            throw new Exception(
                "Cannot set BooksPresent this way. Must add or delete books in the project"
            );

        // Character categorizer settings are computed from CharacterCategorizer, not stored
        if (
            paratextSettingName == ProjectSettingsNames.PT_BASE_CHARACTER_CLASS_REGEX
            || paratextSettingName == ProjectSettingsNames.PT_DIACRITIC_CHARACTER_CLASS_REGEX
            || paratextSettingName == ProjectSettingsNames.PT_WORD_MEDIAL_CHARACTER_REGEX
            || paratextSettingName == ProjectSettingsNames.PT_WORD_BREAK_REGEX
        )
            throw new Exception(
                "Cannot set character categorizer regex settings. They are computed read-only values."
            );

        // Now actually write the setting
        string? errorMessage = null;

        // ScrText always prioritizes the folder name over the Name setting as the "name" even when
        // accessing scrText.Settings.Name. So we're copying Paratext's functionality here and using
        // the folder name instead of Settings.Name.
        // https://github.com/ubsicap/Paratext/blob/aaadecd828a9b02e6f55d18e4c5dda8703ce2429/ParatextData/ScrText.cs#L259
        if (paratextSettingName == ProjectSettingsNames.PT_NAME)
        {
            // Lock the whole project because this is literally moving the whole folder (chances
            // this will actually succeed are very slim as the project must only have Settings.xml
            // and the ldml file for this not to instantly throw)
            // https://github.com/ubsicap/Paratext/blob/aaadecd828a9b02e6f55d18e4c5dda8703ce2429/ParatextData/ScrText.cs#L1793
            RunWithinLock(
                WriteScope.EntireProject(scrText),
                _ =>
                {
                    try
                    {
                        scrText.Name = value!.ToString();
                    }
                    catch (Exception ex)
                    {
                        errorMessage = ex.Message;
                    }
                }
            );
        }
        else
        {
            RunWithinLock(
                WriteScope.EntireProject(scrText),
                _ =>
                {
                    try
                    {
                        if (
                            paratextSettingName == ProjectSettingsNames.PT_MODEL_TEXTS
                            || paratextSettingName
                                == ProjectSettingsNames.PT_REFERENCED_PROJECTS_AND_RESOURCES
                        )
                        {
                            // Validator code should have ensured that value is not null and
                            // deserializes cleanly; these checks guard against unexpected states.
                            if (value is null)
                                throw new InvalidDataException(
                                    $"Value for {settingName} must not be null after validation"
                                );
                            var serialized =
                                value.ToString()
                                ?? throw new InvalidDataException(
                                    $"Value for {settingName} could not be converted to a string"
                                );
                            var list =
                                serialized.DeserializeFromJson<ResourceReferenceList>()
                                ?? throw new InvalidDataException(
                                    $"Value for {settingName} could not be deserialized as a ResourceReferenceList"
                                );
                            value =
                                $"{ResourceReferenceList.CurrentFormatVersion} {list.SerializeToJson()}";
                        }
                        else if (
                            ProjectSettingsNames.IsParatextSettingABoolean(paratextSettingName)
                        )
                        {
                            var stringValue = value?.ToString() ?? "";
                            value = stringValue.ToUpperInvariant() switch
                            {
                                "F" => "F",
                                "FALSE" => "F",
                                "T" => "T",
                                "TRUE" => "T",
                                _ => throw new InvalidDataException(
                                    $"Failed to convert Paratext setting {settingName} to boolean. Value was \"{stringValue}\""
                                ),
                            };
                        }
                        scrText.Settings.SetSetting(paratextSettingName, value!.ToString());
                        // We are notifying when we release our lock, so don't automatically
                        // notify in `Save`
                        scrText.Settings.Save(false);
                    }
                    catch (Exception ex)
                    {
                        errorMessage = ex.Message;
                    }
                }
            );
        }

        if (errorMessage != null)
            throw new Exception(errorMessage);

        SendDataUpdateEvent(ProjectDataType.SETTING, "project setting data update event");

        // When the versification setting changes, the platformScripture.Versification
        // projectInterface's derived values change too — notify subscribers on those data types so
        // they refetch.
        if (settingName == ProjectSettingsNames.PB_VERSIFICATION)
            SendDataUpdateEvent(
                AllVersificationDataTypes,
                "versification setting changed - re-derive final-chapter/final-verse data"
            );

        return true;
    }

    // Typically for "reset" we would want to erase the setting and then call "getDefault" if a
    // setting is not present when "get" is called. Since we're using PT settings as the backing
    // store here, though, we want to keep all properties filled in inside of Settings.xml files
    public bool ResetProjectSetting(string settingName)
    {
        object? defaultValue =
            ProjectSettingsService.GetDefault(PapiClient, settingName)
            ?? throw new InvalidDataException($"Default value for {settingName} was null");
        return SetProjectSetting(settingName, defaultValue);
    }

    /// <summary>
    /// Determines if the current user can write the project settings for "text connections"
    /// (model text and referenced resources).
    /// </summary>
    /// <returns>True if the user can write these settings, false otherwise</returns>
    /// <remarks>At this time, the only check for this is whether the user is an administrator on
    /// the project.</remarks>
    public bool CanUserWriteProjectTextConnectionSettings() => IsUserProjectAdministrator();

    /// <summary>
    /// Determines if the current user is a project administrator
    /// </summary>
    /// <returns>
    /// True if the user has an Administrator role on this project, false otherwise
    /// </returns>
    /// <remarks>All project-level settings *should* only be able to be set by administrators, but
    /// this is not currently enforced for most settings.</remarks>
    private bool IsUserProjectAdministrator()
    {
        try
        {
            ScrText scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);
            return scrText.Permissions.AmAdministrator;
        }
        catch
        {
            return false;
        }
    }

    /// <summary>
    /// Determines if the current user can edit Scripture content in this project
    /// (i.e., has a role other than Observer or None).
    /// </summary>
    /// <returns>
    /// True if the user has a non-Observer/non-None role, false otherwise or if permissions cannot
    /// be determined.
    /// </returns>
    public bool CanUserEditScripture()
    {
        try
        {
            ScrText scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);
            return scrText.Permissions.HaveRoleNotObserver;
        }
        catch
        {
            return false;
        }
    }

    public ResourceReferenceList GetUserModelTexts(object? param = null)
    {
        var (schemaVersion, content) = GetUserProjectSettings().GetSetting("ModelTexts");
        if (content == null)
            return new ResourceReferenceList();

        ValidateUserSettingVersion(schemaVersion, "ModelTexts");
        return ResourceReferenceList.FromXml(content, schemaVersion!);
    }

    public bool SetUserModelTexts(object? value)
    {
        var list = DeserializeResourceReferenceList(value, "ModelTexts");
        ValidateUserSettingVersion(list.DataVersion, "ModelTexts");
        var (currentVersion, _) = GetUserProjectSettings().GetSetting("ModelTexts");
        ValidateVersionNotDowngraded(list.DataVersion, currentVersion, "ModelTexts");
        var itemsElement = ResourceReferenceList.ToXml(list);
        GetUserProjectSettings().SetSetting("ModelTexts", list.DataVersion, itemsElement);
        SendDataUpdateEvent(ProjectDataType.USER_MODEL_TEXTS, "user model texts update event");
        return true;
    }

    public bool ResetUserModelTexts()
    {
        GetUserProjectSettings().RemoveSetting("ModelTexts");
        SendDataUpdateEvent(ProjectDataType.USER_MODEL_TEXTS, "user model texts reset event");
        return true;
    }

    public bool? GetUserStructureProtected(object? param = null)
    {
        // Schema version is intentionally ignored — a plain boolean has no versioned schema
        var (_, content) = GetUserProjectSettings().GetSetting("StructureProtected");
        if (content == null)
            return null; // not set - frontend applies mode-aware default
        return bool.TryParse(content.Value, out bool result) ? result : null;
    }

    public bool SetUserStructureProtected(object? value)
    {
        // Values crossing the JSON-RPC boundary arrive as JsonElement, not a native bool, so accept
        // both (matches the bool-handling pattern in Checks/InventoryOption.SerializeValue).
        bool boolValue = value switch
        {
            bool b => b,
            JsonElement { ValueKind: JsonValueKind.True } => true,
            JsonElement { ValueKind: JsonValueKind.False } => false,
            _ => throw new InvalidDataException(
                $"Expected boolean for UserStructureProtected, got: {value}"
            ),
        };
        var itemsElement = new XElement("Items", boolValue.ToString().ToLowerInvariant());
        // Version stored for consistency with other settings; ignored on read
        GetUserProjectSettings().SetSetting("StructureProtected", "1.0.0", itemsElement);
        SendDataUpdateEvent(
            ProjectDataType.USER_STRUCTURE_PROTECTED,
            "user structure protected update event"
        );
        return true;
    }

    public bool ResetUserStructureProtected()
    {
        GetUserProjectSettings().RemoveSetting("StructureProtected");
        SendDataUpdateEvent(
            ProjectDataType.USER_STRUCTURE_PROTECTED,
            "user structure protected reset event"
        );
        return true;
    }

    public ResourceReferenceList GetUserReferencedProjectsAndResources(object? param = null)
    {
        var (schemaVersion, content) = GetUserProjectSettings()
            .GetSetting("ReferencedProjectsAndResources");
        if (content == null)
            return new ResourceReferenceList();

        ValidateUserSettingVersion(schemaVersion, "ReferencedProjectsAndResources");
        return ResourceReferenceList.FromXml(content, schemaVersion!);
    }

    public bool SetUserReferencedProjectsAndResources(object? value)
    {
        var list = DeserializeResourceReferenceList(value, "ReferencedProjectsAndResources");
        ValidateUserSettingVersion(list.DataVersion, "ReferencedProjectsAndResources");
        var (currentVersion, _) = GetUserProjectSettings()
            .GetSetting("ReferencedProjectsAndResources");
        ValidateVersionNotDowngraded(
            list.DataVersion,
            currentVersion,
            "ReferencedProjectsAndResources"
        );
        var itemsElement = ResourceReferenceList.ToXml(list);
        GetUserProjectSettings()
            .SetSetting("ReferencedProjectsAndResources", list.DataVersion, itemsElement);
        SendDataUpdateEvent(
            ProjectDataType.USER_REFERENCED_PROJECTS_AND_RESOURCES,
            "user referenced projects update event"
        );
        return true;
    }

    public bool ResetUserReferencedProjectsAndResources()
    {
        GetUserProjectSettings().RemoveSetting("ReferencedProjectsAndResources");
        SendDataUpdateEvent(
            ProjectDataType.USER_REFERENCED_PROJECTS_AND_RESOURCES,
            "user referenced projects reset event"
        );
        return true;
    }

    private UserProjectSettings GetUserProjectSettings()
    {
        var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);
        var currentUserId = scrText.User.Name;
        if (_userProjectSettings == null || _cachedUserId != currentUserId)
        {
            _userProjectSettings = new UserProjectSettings(scrText.Directory, currentUserId);
            _cachedUserId = currentUserId;
        }
        return _userProjectSettings;
    }

    private static void ValidateUserSettingVersion(string? schemaVersion, string settingName)
    {
        if (!Version.TryParse(schemaVersion, out Version? parsed))
            throw new InvalidDataException(
                $"User setting '{settingName}' has invalid version format: '{schemaVersion}'"
            );
        if (parsed.Major != ResourceReferenceList.CurrentMajorVersion)
            throw new InvalidDataException(
                $"User setting '{settingName}' has incompatible major version {parsed.Major}; "
                    + $"expected {ResourceReferenceList.CurrentMajorVersion}"
            );
    }

    /// <summary>
    /// Rejects writes that would downgrade the major or minor component of <paramref name="newVersion"/>
    /// relative to <paramref name="currentVersion"/>. Patch downgrades are allowed.
    /// Mirrors the downgrade protection in the TypeScript <c>resourceReferenceListValidator</c>.
    /// </summary>
    private static void ValidateVersionNotDowngraded(
        string newVersion,
        string? currentVersion,
        string settingName
    )
    {
        if (currentVersion == null)
            return;
        if (
            !Version.TryParse(newVersion, out Version? newV)
            || !Version.TryParse(currentVersion, out Version? curV)
        )
            return; // malformed versions are caught by ValidateUserSettingVersion; skip here
        if (newV.Major < curV.Major || (newV.Major == curV.Major && newV.Minor < curV.Minor))
            throw new InvalidDataException(
                $"Refusing to downgrade user setting '{settingName}' "
                    + $"from version '{currentVersion}' to '{newVersion}'."
            );
    }

    private static ResourceReferenceList DeserializeResourceReferenceList(
        object? value,
        string settingName
    )
    {
        string? json = value?.ToString();
        if (string.IsNullOrEmpty(json))
            throw new InvalidDataException(
                $"Value for user setting '{settingName}' must not be null or empty"
            );
        ResourceReferenceList? list = json.DeserializeFromJson<ResourceReferenceList>();
        if (list is null)
            throw new InvalidDataException(
                $"Could not deserialize value for user setting '{settingName}'"
            );
        return list;
    }

    #endregion

    #region Scripture-related methods

    /// <summary>
    /// Send an event on the PAPI announcing that all the Scripture data has changed. This is used
    /// for reloading all the Scripture, settings, etc. after a project has been S/Red.
    /// </summary>
    public void SendFullProjectUpdateEvent()
    {
        SendDataUpdateEvent("*", "full project updated event");
    }

    #endregion

    #region USFM

    public string GetBookUsfm(VerseRef verseRef)
    {
        return GetFromScrText(
            verseRef,
            (ScrText scrText, VerseRef verseRef) => scrText.GetText(verseRef, false, true)
        );
    }

    public string GetChapterUsfm(VerseRef verseRef)
    {
        return GetFromScrText(
            verseRef,
            (ScrText scrText, VerseRef verseRef) => scrText.GetText(verseRef, true, true)
        );
    }

    public string GetVerseUsfm(VerseRef verseRef)
    {
        return GetFromScrText(
            verseRef,
            (ScrText scrText, VerseRef verseRef) =>
                scrText.Parser.GetVerseUsfmText(FindMatchingVerseRefInScrText(verseRef, scrText))
        );
    }

    public bool SetBookUsfm(VerseRef verseRef, string data)
    {
        verseRef.ChapterNum = 0;
        var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);

        var isNewBook = false;

        RunWithinLock(
            WriteScope.EntireProject(scrText),
            writeLock =>
            {
                BookSet localBooksPresentSet = scrText.Settings.LocalBooksPresentSet;
                isNewBook = !localBooksPresentSet.IsSelected(verseRef.BookNum);
                // Set with chapter 0 sets the whole book
                scrText.PutText(verseRef.BookNum, 0, false, data, writeLock);
            }
        );

        if (isNewBook)
            SendDataUpdateEvent(
                AllScriptureDataTypesPlusSettings,
                "USFM book data update event - new book added"
            );
        else
            SendDataUpdateEvent(AllScriptureDataTypes, "USFM book data update event");
        return true;
    }

    public bool SetChapterUsfm(VerseRef verseRef, string data)
    {
        try
        {
            var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);
            RunWithinLock(
                WriteScope.EntireProject(scrText),
                writeLock =>
                {
                    scrText.PutText(verseRef.BookNum, verseRef.ChapterNum, false, data, writeLock);
                }
            );
        }
        catch (Exception e) when (e is ArgumentException or ProjectNotFoundException)
        {
            throw new InvalidDataException(
                $"Project with ID '{ProjectDetails.Metadata.Id}' was not found"
            );
        }

        SendDataUpdateEvent(AllScriptureDataTypes, "USFM chapter data update event");
        return true;
    }

    public string[] GetMarkerNames(int bookNum)
    {
        var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);
        ScrStylesheet scrStylesheet =
            scrText.ScrStylesheet(bookNum)
            ?? throw new InvalidDataException($"ScrStylesheet for book number '{bookNum}' is null");
        return scrStylesheet.Tags.Where(tag => tag != null).Select(tag => tag.Name).ToArray();
    }

    #endregion

    #region Versification (platformScripture.Versification)

    // Read-only projectInterface. The three data types (FinalVerseNumber, FinalChapter,
    // FinalVerseNumbersInBook) all derive from the project's versification setting, which is the
    // authoritative writer. The Set* methods below exist to satisfy the canonical DataProvider
    // get/set contract; they always throw — callers must write the project setting instead. When
    // the underlying setting changes, `SetProjectSetting` fans out update events to all three
    // versification data types (see `AllVersificationDataTypes`) so subscribers re-fetch fresh
    // values.

    private const string VersificationReadOnlyMessage =
        "Versification data is read-only on the platformScripture.Versification projectInterface. "
        + "To change versification, set the 'platformScripture.versification' project setting on "
        + "the project's ParatextProjectDataProvider (e.g. via `setSetting`).";

    /// <summary>
    /// Returns the final verse number in the specified book and chapter using the project's
    /// versification. Each call reads <c>ScrText.Settings.Versification</c> fresh, so results
    /// reflect any in-session changes to the project's versification setting.
    /// </summary>
    public int GetFinalVerseNumber(int bookNum, int chapterNum)
    {
        var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);
        return scrText.Settings.Versification.GetLastVerse(bookNum, chapterNum);
    }

    /// <summary>
    /// Read-only — always throws. Versification is owned by the
    /// <c>platformScripture.versification</c> project setting; write that setting instead.
    /// </summary>
    public bool SetFinalVerseNumber(int bookNum, int chapterNum, int value) =>
        throw new NotSupportedException(VersificationReadOnlyMessage);

    /// <summary>
    /// Returns the final chapter number in the specified book using the project's versification.
    /// </summary>
    public int GetFinalChapter(int bookNum)
    {
        var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);
        return scrText.Settings.Versification.GetLastChapter(bookNum);
    }

    /// <summary>
    /// Read-only — always throws. See <see cref="SetFinalVerseNumber"/>.
    /// </summary>
    public bool SetFinalChapter(int bookNum, int value) =>
        throw new NotSupportedException(VersificationReadOnlyMessage);

    /// <summary>
    /// Returns the final verse number for each chapter in the specified book using the project's
    /// versification. Index <c>n</c> is the last verse number in chapter <c>n</c> (1-based);
    /// index 0 is a filler <c>0</c> so callers can use <c>result[chapterNum]</c> without
    /// off-by-one. The returned array has length <c>lastChapter + 1</c>. Useful for pre-fetching
    /// a whole book in one round trip.
    /// </summary>
    public int[] GetFinalVerseNumbersInBook(int bookNum)
    {
        var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);
        var versification = scrText.Settings.Versification;
        int lastChapter = versification.GetLastChapter(bookNum);
        int[] result = new int[lastChapter + 1];
        for (int chapter = 1; chapter <= lastChapter; chapter++)
            result[chapter] = versification.GetLastVerse(bookNum, chapter);
        return result;
    }

    /// <summary>
    /// Read-only — always throws. See <see cref="SetFinalVerseNumber"/>.
    /// </summary>
    public bool SetFinalVerseNumbersInBook(int bookNum, int[] value) =>
        throw new NotSupportedException(VersificationReadOnlyMessage);

    #endregion

    #region USX

    public string GetBookUsx(VerseRef verseRef)
    {
        return GetFromScrText(
            verseRef,
            (ScrText scrText, VerseRef verseRef) => ConvertUsfmToUsx(scrText, verseRef, false)
        );
    }

    public string GetChapterUsx(VerseRef verseRef)
    {
        return GetFromScrText(
            verseRef,
            (ScrText scrText, VerseRef verseRef) => ConvertUsfmToUsx(scrText, verseRef, true)
        );
    }

    public string GetVerseUsx(VerseRef verseRef)
    {
        return GetFromScrText(verseRef, ExtractVerseUsx);
    }

    public bool SetBookUsx(VerseRef verseRef, string data)
    {
        // Don't need to take a write lock in this function because SetBookUsfm will do it
        var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);
        string usfm = ConvertUsxToUsfm(scrText, verseRef, data);
        SetBookUsfm(verseRef, usfm);
        return true;
    }

    public bool SetChapterUsx(VerseRef verseRef, string data)
    {
        string? failedMessage = null;
        bool didChange = true;
        try
        {
            var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);
            RunWithinLock(
                WriteScope.EntireProject(scrText),
                writeLock =>
                {
                    var usfm = ConvertUsxToUsfm(scrText, verseRef, data);

                    // Compare the current USFM to the normalized input USFM to see if anything changed
                    // This may happen if someone makes a whitespace change that gets normalized
                    // back to the same USFM
                    var currentUsfm = GetChapterUsfm(verseRef);
                    if (currentUsfm == usfm)
                    {
                        didChange = false;
                        return;
                    }

                    scrText.PutText(verseRef.BookNum, verseRef.ChapterNum, true, usfm, writeLock);
                }
            );
        }
        catch (Exception e) when (e is ArgumentException or ProjectNotFoundException)
        {
            failedMessage = $"Project with ID '{ProjectDetails.Metadata.Id}' was not found";
        }
        catch (SafetyCheckException e)
        {
            throw new PermissionsException(ProjectDetails.Metadata.Id, e.Message);
        }

        if (failedMessage != null)
            throw new Exception(failedMessage);

        if (!didChange)
            return false;

        SendDataUpdateEvent(AllScriptureDataTypes, "USX chapter data update event");
        return true;
    }

    #endregion

    #region Plain Text

    public string GetVersePlainText(VerseRef verseRef)
    {
        return GetFromScrText(
            verseRef,
            (ScrText scrText, VerseRef verseRef) =>
                scrText.GetVerseText(FindMatchingVerseRefInScrText(verseRef, scrText))
        );
    }

    #endregion

    #region Private helper methods

    private string GetFromScrText(
        VerseRef verseRef,
        Func<ScrText, VerseRef, string> getTextFromScrText
    )
    {
        try
        {
            var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);
            if (verseRef.Versification == null)
                verseRef.Versification = scrText.Settings.Versification;
            if (!scrText.BookPresent(verseRef.BookNum))
                throw new MissingBookException(verseRef.BookNum, ProjectDetails.Metadata.Id);
            return getTextFromScrText(scrText, verseRef);
        }
        catch (Exception e) when (e is ArgumentException or ProjectNotFoundException)
        {
            throw new InvalidDataException(
                $"Project with ID '{ProjectDetails.Metadata.Id}' was not found"
            );
        }
    }

    /// <summary>
    /// In a given ScrText, find the VerseRef that best matches the provided VerseRef. If no
    /// good match is found, this returns the original VerseRef passed in since ScrText might still
    /// find data using it.
    /// <br>
    /// This is useful to find a VerseRef in a ScrText that has combined verses when we are asking
    /// for the text of a single verse within that combined verse.
    /// </summary>
    private static VerseRef FindMatchingVerseRefInScrText(VerseRef verseRef, ScrText scrText)
    {
        // Limit the search scope to the chapter of the provided VerseRef
        var allVerses = scrText.Parser.GetVersesInText(verseRef, true);
        foreach (var v in allVerses)
        {
            // Look for an exact match, excluding versification
            if (
                v.BookNum == verseRef.BookNum
                && v.ChapterNum == verseRef.ChapterNum
                && v.Verse == verseRef.Verse
            )
                return v;

            // Look for a range that overlaps with the provided verseRef
            if (v.HasMultiple && v.OverlapsAny(verseRef))
                return v;
        }

        // Didn't find a match, but ScrText has special rules that mean we should return the original
        // For example, verse 0 has special meaning that we won't see in all the verse tags
        return verseRef;
    }

    private static string ConvertUsfmToUsx(ScrText scrText, VerseRef verseRef, bool chapterOnly)
    {
        string usfmData = scrText.GetText(verseRef, chapterOnly, true) ?? string.Empty;
        XmlDocument xmlDoc = UsfmToUsx.ConvertToXmlDocument(
            scrText,
            scrText.ScrStylesheet(verseRef.BookNum),
            usfmData,
            // We should convert with "forExport" because of some of the following differences
            // between for and not for export:
            // - not for export
            //   - sid, eid, and vid derived metadata is absent
            //   - char marker with `link-href` attribute gets changed to `link` marker type, which
            //     is an internal Paratext marker used for detecting where to put link anchors
            //   - figure `src` attribute stays `src` instead of changing to `file` which is the
            //     name of this attribute in USX/USJ
            // - for export
            //   - sid, eid, and vid derived metadata is present (not really important for us, most
            //     likely)
            //   - char markers with `link-href` attribute stay normal and don't get changed
            //     (important for us because we don't want to pass around this non-standard `link`
            //     marker type)
            //   - figure `src` attribute appropriately changes to `file` (important)
            //
            // Note: it appears UsfmToUsx.ConvertToXmlDocument wasn't particularly written for
            // exporting one chapter at a time. When exporting any chapter after chapter 1, the sid,
            // eid, and vid attributes will be missing the book ID (for chapter markers) or be
            // completely empty (for verse and para markers). This happens because the parser state
            // verse ref doesn't get set up right because we're just getting the chapter; it doesn't
            // see the book ID because the id marker is not in chapters after chapter 1. We may need
            // to change ParatextData.dll if we ever actually need these to be right. Probably need
            // to pass a VerseRef with the right book ID into the third parameter of
            // `new UsfmParserState(...)` in `UsfmToUsx.RunConverter`.
            // TJ doesn't think this really matters for us, but we can fix it one day if we find we
            // need to.
            //
            // Note: `xt` markers get `ref`s wrapped around their contents in `JumpDecorater.cs`,
            // used in `ExportUsxForm.cs`. `JumpDecorater.cs` also makes independent `ref` markers
            // get properly translated to USX as `ref`-type markers as well. This seems nice for
            // accurately translating to USX; however, TJ thinks we should not do this right now
            // because Paratext 9.4 always removes `ref`-type markers when transforming to USFM. It
            // does not support adding the `gen` attribute to generated `ref`s or only removing
            // `ref`s with `gen` attribute, so there is no way to know which `ref`s to automatically
            // remove and which to preserve when transforming back to USFM. Hopefully, when Paratext
            // supports 3.1+, this whole situation will be fixed, and we won't need to worry about
            // accidentally deleting user data.
            // - Without `JumpDecorater.cs`, we can preserve USFM `ref`s because of the following:
            //   - unclosed `ref` markers get set to `para` type because they are unknown
            //   - closed `ref` markers get split into `para` type for opening and `unmatched` for
            //     closing because `ref` is unknown as they are not in USFM 3.0
            // - With `JumpDecorater.cs`, we cannot preserve USFM `ref`s because `ref`s are removed
            //   when importing USX into USFM because `ref` marker is not in USFM 3.0 and therefore
            //   Paratext always removes them regardless of `gen` attribute:
            //   - unclosed `ref` markers get set to `char` type because the `ref` marker gets added
            //     as a `char`-type marker in `JumpDecorater.cs` (these probably
            //     would round trip; just including this as a note about the differences)
            //   - closed `ref` markers get transformed into normal `ref` markers (this causes these
            //     markers to be removed when importing back into USFM)
            true
        );
        return xmlDoc.OuterXml;
    }

    private static string ConvertUsxToUsfm(ScrText scrText, VerseRef verseRef, string usxData)
    {
        XDocument doc;
        using (TextReader reader = new StringReader(usxData))
            doc = XDocument.Load(reader, LoadOptions.PreserveWhitespace);

        if (doc.Root?.Name != "usx")
            throw new InvalidDataException($"Invalid USX: {usxData}");

        UsxFragmenter.FindFragments(
            scrText.ScrStylesheet(verseRef.BookNum),
            doc.CreateNavigator(),
            XPathExpression.Compile("*[false()]"),
            out string usfm,
            scrText.Settings.AllowInvisibleChars
        );

        return UsfmToken.NormalizeUsfm(scrText, verseRef.BookNum, usfm);
    }

    // This does an imperfect job at extracting a verse's USX because the USX standard itself may
    // split the text so that portions are in a child or parent node while others are just in text
    // following the verse node. It's probably worth revisiting.
    private static string ExtractVerseUsx(ScrText scrText, VerseRef vRef)
    {
        // Here is an XPath expression that represents a different approach that was abandoned
        // $"//chapter[@number=\"{verseRef.ChapterNum}\"]/following::verse[@number=\"{verseRef.VerseNum}\"][1]/following::node()[preceding::chapter[1]/@number=\"{verseRef.ChapterNum}\"][preceding-sibling::verse[1]/@number=\"{verseRef.VerseNum}\"][not(self::verse)]";
        // It's more likely that a successful approach would require walking the XmlDocument DOM

        vRef = FindMatchingVerseRefInScrText(vRef, scrText);
        string usfmData = scrText.GetText(vRef, true, true) ?? string.Empty;
        XmlDocument usxData = UsfmToUsx.ConvertToXmlDocument(scrText, vRef.BookNum, usfmData);
        var chapterNode = usxData.SelectSingleNode(VerseXPath(vRef.ChapterNum, 1));
        if (chapterNode == null)
            return string.Empty;
        var verseNode = usxData.SelectSingleNode(VerseXPath(vRef.ChapterNum, vRef.VerseNum));
        if (verseNode == null)
            return string.Empty;
        var nextVerseNode =
            usxData.SelectSingleNode(VerseXPath(vRef.ChapterNum, vRef.VerseNum + 1))
            ?? usxData.SelectSingleNode(VerseXPath(vRef.ChapterNum + 1, 1));
        string allXmlData = usxData.OuterXml;
        int chapterIndex = allXmlData.IndexOf(
            chapterNode.OuterXml,
            StringComparison.InvariantCulture
        );
        int verseIndex = allXmlData.IndexOf(
            verseNode.OuterXml,
            chapterIndex,
            StringComparison.InvariantCulture
        );
        int nextVerseIndex =
            nextVerseNode == null
                ? allXmlData.Length
                : allXmlData.IndexOf(
                    nextVerseNode.OuterXml,
                    chapterIndex,
                    StringComparison.InvariantCulture
                );

        // Wrap the verse text in a usx element so it is a whole valid usx document
        return $"<usx version=\"{scrText.Settings.UsfmVersion}\">{allXmlData.Substring(verseIndex, nextVerseIndex - verseIndex)}</usx>";
    }

    private static string VerseXPath(int chapterNum, int verseNum)
    {
        return $"//chapter[@number=\"{chapterNum}\"]/following::verse[@number=\"{verseNum}\"][preceding::chapter[1]/@number=\"{chapterNum}\"]";
    }

    private static void RunWithinLock(WriteScope writeScope, Action<WriteLock> action)
    {
        var myLock =
            WriteLockManager.Default.ObtainLock(writeScope)
            ?? throw new InvalidOperationException("Unable to obtain write lock");
        try
        {
            action.Invoke(myLock);
        }
        finally
        {
            myLock.ReleaseAndNotify();
        }
    }

    #endregion
}
