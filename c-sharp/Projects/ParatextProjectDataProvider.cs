using System.Text;
using System.Xml;
using System.Xml.Linq;
using System.Xml.XPath;
using Paranext.DataProvider.JsonUtils;
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

    private readonly LocalParatextProjects _paratextProjects;

    private readonly CommentManager _commentManager;

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
        _commentManager = CommentManager.Get(
            LocalParatextProjects.GetParatextProject(projectDetails.Metadata.Id)
        );
        RegisterSettingsValidators();
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

        retVal.Add(("getComments", GetComments));
        retVal.Add(("setComments", SetComments));
        retVal.Add(("getCommentThreads", GetCommentThreads));
        retVal.Add(("createComment", CreateComment));
        retVal.Add(("deleteComment", DeleteComment));
        retVal.Add(("updateComment", UpdateComment));

        retVal.Add(("getSetting", GetProjectSetting));
        retVal.Add(("setSetting", SetProjectSetting));

        retVal.Add(("resetSetting", ResetProjectSetting));

        retVal.Add(("getMarkerNames", GetMarkerNames));

        return retVal;
    }

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

    public bool CommentsEnabled
    {
        get
        {
            return SettingsService.GetSetting<bool?>(PapiClient, Settings.COMMENTS_ENABLED)
                ?? false;
        }
    }

    public List<Comment> GetComments(CommentSelector selector)
    {
        if (!CommentsEnabled)
            return [];

        List<Comment> comments = _commentManager.AllComments.ToList();
        if (comments.Count == 0)
            return comments;

        string matchingVerseRef;
        if (selector.ChapterNum > 0 && selector.VerseNum > 0)
            matchingVerseRef = $"{selector.BookId} {selector.ChapterNum}:{selector.VerseNum}";
        else if (selector.ChapterNum > 0)
            matchingVerseRef = $"{selector.BookId} {selector.ChapterNum}:";
        else
            matchingVerseRef = selector.BookId;

        comments = comments.FindAll((c) => c.VerseRefStr.StartsWith(matchingVerseRef));
        if (!string.IsNullOrEmpty(selector.CommentId))
            comments = comments.FindAll((c) => selector.CommentId == c.Id);
        return comments;
    }

    // For now, only allow adding comments, not changing or removing existing PT 9 comments
    // Too much risk of data loss while there are other bugs related to comments floating around
    public bool SetComments(CommentSelector _ignore, Comment[] incomingComments)
    {
        if (!CommentsEnabled)
            return false;

        var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);
        bool madeChange = false;
        foreach (var ic in incomingComments)
        {
            if (string.IsNullOrWhiteSpace(ic.Thread))
                continue;
            var thread =
                _commentManager.FindThread(ic.Thread)
                ?? _commentManager.CreateThread(
                    _commentManager.ScrText,
                    new ScriptureSelection(ic.VerseRef, ic.SelectedText, ic.StartPosition),
                    NoteStatus.Todo
                );
            if (thread.Comments.Find((c) => c.Id == ic.Id) != null)
                continue;
            // Override the user name with the value from ParatextData
            ic.User = scrText.User.Name;
            _commentManager.AddComment(ic);
            _commentManager.SaveUser(ic.User, false);
            madeChange = true;
        }

        if (madeChange)
            SendDataUpdateEvent(ProjectDataType.COMMENTS, "comments data update event");

        return madeChange;
    }

    public List<CommentThread> GetCommentThreads(CommentThreadSelector? selector)
    {
        if (!CommentsEnabled)
            return [];

        // Get all threads (activeOnly=false to include threads with deleted comments)
        List<CommentThread> allThreads = _commentManager.FindThreads(activeOnly: false);

        // If no selector provided or all properties are null/default, return all thread IDs
        if (selector == null || IsEmptySelector(selector))
            return allThreads.ToList();

        // Apply filters
        IEnumerable<CommentThread> filteredThreads = allThreads;

        // Filter by thread ID (exact match)
        if (!string.IsNullOrEmpty(selector.ThreadId))
            filteredThreads = filteredThreads.Where(t => t.Id == selector.ThreadId);

        // Filter by status
        if (!string.IsNullOrEmpty(selector.Status))
        {
            var status = new Enum<NoteStatus>(selector.Status);
            filteredThreads = filteredThreads.Where(t => t.Status == status);
        }

        // Filter by type
        if (!string.IsNullOrEmpty(selector.Type))
        {
            var type = new Enum<NoteType>(selector.Type);
            filteredThreads = filteredThreads.Where(t => t.Type == type);
        }

        // Filter by user (who created comments in the thread)
        if (!string.IsNullOrEmpty(selector.User))
            filteredThreads = filteredThreads.Where(t =>
                t.Comments.Any(c => c.User == selector.User)
            );

        // Filter by assigned user
        if (!string.IsNullOrEmpty(selector.AssignedTo))
            filteredThreads = filteredThreads.Where(t => t.AssignedUser == selector.AssignedTo);

        // Filter by date
        if (selector.DateFilter != null)
            filteredThreads = FilterByDate(filteredThreads, selector.DateFilter);

        // Filter by scripture ranges
        if (selector.ScriptureRanges != null && selector.ScriptureRanges.Count > 0)
            filteredThreads = FilterByScriptureRanges(filteredThreads, selector.ScriptureRanges);

        return filteredThreads.ToList();
    }

    public bool DeleteComment(string commentId)
    {
        if (!CommentsEnabled)
            return false;

        // Find the comment by ID across all comments
        Comment? commentToDelete = _commentManager.AllComments.FirstOrDefault(c =>
            c.Id == commentId
        );

        if (commentToDelete == null)
            return false;

        // Remove the comment using CommentManager
        _commentManager.RemoveComment(commentToDelete);

        _commentManager.SaveUser(commentToDelete.User, false);

        SendDataUpdateEvent(ProjectDataType.COMMENTS, "comment deleted event");
        return true;
    }

    public string CreateComment(CommentSelector selector)
    {
        if (!CommentsEnabled)
            throw new InvalidOperationException("Comments are not enabled for this project");

        var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);

        Comment newComment = new(scrText.User);

        // Set the verse reference
        if (
            !string.IsNullOrWhiteSpace(selector.BookId)
            && selector.ChapterNum > 0
            && selector.VerseNum > 0
        )
        {
            VerseRef verseRef =
                new(
                    selector.BookId,
                    selector.ChapterNum.ToString(),
                    selector.VerseNum.ToString(),
                    scrText.Settings.Versification
                );
            newComment.VerseRefStr = verseRef.ToString();
        }
        else
        {
            throw new InvalidDataException(
                "Comment must have a valid verse reference (BookId, ChapterNum, VerseNum)"
            );
        }

        // Set the comment text content if provided
        if (!string.IsNullOrWhiteSpace(selector.CommentId))
        {
            // CommentId is used to pass the comment text content
            newComment.AddTextToContent(selector.CommentId, false);
        }

        // Create a new thread for this comment
        // The thread will use the auto-generated Thread ID from the comment
        CommentThread thread = _commentManager.CreateThread(
            _commentManager.ScrText,
            new ScriptureSelection(newComment.VerseRef),
            NoteStatus.Todo
        );

        // Set the comment's thread ID to match the created thread
        // (or the thread will use the comment's thread ID)
        newComment.Thread = thread.Id;

        // Add the comment to the thread
        _commentManager.AddComment(newComment);

        // Save the changes
        _commentManager.SaveUser(newComment.User, false);

        SendDataUpdateEvent(ProjectDataType.COMMENTS, "comment created event");

        // Return the generated comment ID
        return newComment.Id;
    }

    public bool UpdateComment(string commentId, string updatedContent)
    {
        if (!CommentsEnabled)
            return false;

        if (string.IsNullOrEmpty(commentId))
            return false;

        // Find the comment by ID
        var comment = FindCommentById(commentId);
        if (comment == null)
            return false;

        comment.AddTextToContent("", false); // Clear existing content
        comment.AddTextToContent(updatedContent, true); // Add new content

        _commentManager.SaveUser(comment.User, false);

        SendDataUpdateEvent(ProjectDataType.COMMENTS, "comment updated");

        return true;
    }

    private Paratext.Data.ProjectComments.Comment? FindCommentById(string commentId)
    {
        if (!CommentsEnabled)
            return null;

        // Get all threads (activeOnly=false to include deleted comments)
        List<CommentThread> allThreads = _commentManager.FindThreads(activeOnly: false);

        // Search through all threads to find the comment with matching ID
        foreach (var thread in allThreads)
        {
            var comment = thread.Comments.FirstOrDefault(c => c.Id == commentId);
            if (comment != null)
                return comment;
        }

        return null;
    }

    private static bool IsEmptySelector(CommentThreadSelector selector)
    {
        return string.IsNullOrEmpty(selector.ThreadId)
            && string.IsNullOrEmpty(selector.Status)
            && string.IsNullOrEmpty(selector.Type)
            && string.IsNullOrEmpty(selector.User)
            && string.IsNullOrEmpty(selector.AssignedTo)
            && selector.DateFilter == null
            && (selector.ScriptureRanges == null || selector.ScriptureRanges.Count == 0);
    }

    private static IEnumerable<CommentThread> FilterByDate(
        IEnumerable<CommentThread> threads,
        DateFilter dateFilter
    )
    {
        if (dateFilter.Exact.HasValue)
        {
            var targetDate = DateTimeOffset.FromUnixTimeMilliseconds(dateFilter.Exact.Value);
            return threads.Where(t => t.ModifiedDate.Date == targetDate.Date);
        }

        if (dateFilter.Before.HasValue)
        {
            var beforeDate = DateTimeOffset.FromUnixTimeMilliseconds(dateFilter.Before.Value);
            return threads.Where(t => t.ModifiedDate <= beforeDate);
        }

        if (dateFilter.After.HasValue)
        {
            var afterDate = DateTimeOffset.FromUnixTimeMilliseconds(dateFilter.After.Value);
            return threads.Where(t => t.ModifiedDate >= afterDate);
        }

        if (dateFilter.Start.HasValue && dateFilter.End.HasValue)
        {
            var startDate = DateTimeOffset.FromUnixTimeMilliseconds(dateFilter.Start.Value);
            var endDate = DateTimeOffset.FromUnixTimeMilliseconds(dateFilter.End.Value);
            return threads.Where(t => t.ModifiedDate >= startDate && t.ModifiedDate <= endDate);
        }

        return threads;
    }

    private IEnumerable<CommentThread> FilterByScriptureRanges(
        IEnumerable<CommentThread> threads,
        List<ScriptureRange> scriptureRanges
    )
    {
        var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);

        return threads.Where(thread =>
        {
            VerseRef threadVerseRef = thread.VerseRef;
            return scriptureRanges.Any(range =>
                MatchesScriptureRange(threadVerseRef, range, scrText)
            );
        });
    }

    private static bool MatchesScriptureRange(
        VerseRef verseRef,
        ScriptureRange range,
        ScrText scrText
    )
    {
        // Parse the range's start and end verse refs
        VerseRef rangeStart = new VerseRef(
            range.Start.BookNum,
            range.Start.ChapterNum,
            range.Start.VerseNum,
            scrText.Settings.Versification
        );
        VerseRef rangeEnd = new VerseRef(
            range.End.BookNum,
            range.End.ChapterNum,
            range.End.VerseNum,
            scrText.Settings.Versification
        );

        // Match based on granularity
        string granularity = range.Granularity ?? "verse";

        switch (granularity.ToLowerInvariant())
        {
            case "book":
                // Match if the comment is in any book within the range
                return verseRef.BookNum >= rangeStart.BookNum
                    && verseRef.BookNum <= rangeEnd.BookNum;

            case "chapter":
                // Match if the comment is in the same book and within the chapter range
                if (verseRef.BookNum != rangeStart.BookNum)
                    return false;
                return verseRef.ChapterNum >= rangeStart.ChapterNum
                    && verseRef.ChapterNum <= rangeEnd.ChapterNum;

            case "verse":
            default:
                // Match if the comment's verse is within the range
                return verseRef.CompareTo(rangeStart) >= 0 && verseRef.CompareTo(rangeEnd) <= 0;
        }
    }

    #endregion

    #region Settings

    public static string VisibilitySettingName => Setting.Visibility.ToString();

    private void RegisterSettingsValidators()
    {
        ProjectSettingsService.RegisterValidator(
            PapiClient,
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

        // Text direction comes from the project's ldml file, not from Settings.xml
        if (paratextSettingName == ProjectSettingsNames.PT_TEXT_DIRECTION)
            return scrText.RightToLeft ? "rtl" : "ltr";

        // BooksPresent in Settings.xml isn't always 123 characters, but this way of getting it is always
        if (paratextSettingName == ProjectSettingsNames.PT_BOOKS_PRESENT)
            return scrText.BooksPresentSet.Books;

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
                        if (ProjectSettingsNames.IsParatextSettingABoolean(paratextSettingName))
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
        RunWithinLock(
            WriteScope.EntireProject(scrText),
            _ =>
            {
                BookSet localBooksPresentSet = scrText.Settings.LocalBooksPresentSet;
                if (
                    !localBooksPresentSet.IsSelected(verseRef.BookNum)
                    && !scrText.Creatable(verseRef.BookNum)
                )
                    throw new InvalidOperationException($"{verseRef.Book} cannot be created");
                if (!scrText.Writable(verseRef.BookNum, 0))
                    throw new InvalidOperationException($"{verseRef.Book} is not writable");
                if (!scrText.Settings.Editable)
                    throw new InvalidOperationException($"{verseRef.Book} is not editable");
                byte[] rawData = scrText.Settings.Encoder.Convert(data, out string errorMessage);
                if (!string.IsNullOrEmpty(errorMessage))
                    throw new InvalidOperationException(errorMessage);
                string bookFilePath = scrText.Settings.BookFileName(verseRef.BookNum, true);
                File.WriteAllBytes(bookFilePath, rawData);
                scrText.Reload();
            }
        );

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
        XmlDocument xmlDoc = UsfmToUsx.ConvertToXmlDocument(scrText, verseRef.BookNum, usfmData);
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
