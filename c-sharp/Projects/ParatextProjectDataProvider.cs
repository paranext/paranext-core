using System.Text;
using System.Xml;
using System.Xml.Linq;
using System.Xml.XPath;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.Services;
using Paratext.Data;
using Paratext.Data.ProjectComments;
using Paratext.Data.ProjectSettingsAccess;
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

        retVal.Add(("getSetting", GetProjectSetting));
        retVal.Add(("setSetting", SetProjectSetting));

        retVal.Add(("resetSetting", ResetProjectSetting));

        retVal.Add(("getMarkerNames", GetMarkerNames));

        return retVal;
    }

    protected override Task StartDataProviderAsync()
    {
        bool? shouldIncludePT9ProjectsOnWindows = false;
        if (OperatingSystem.IsWindows())
        {
            shouldIncludePT9ProjectsOnWindows = SettingsService.GetSetting<bool>(
                PapiClient,
                Settings.INCLUDE_MY_PARATEXT_9_PROJECTS
            );
            if (!shouldIncludePT9ProjectsOnWindows.HasValue)
                throw new InvalidDataException(
                    $"Setting {Settings.INCLUDE_MY_PARATEXT_9_PROJECTS} was null!"
                );
        }
        _paratextProjects.Initialize(shouldIncludePT9ProjectsOnWindows.Value);
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

        Stream? dataStream =
            GetExtensionStream(scope, false)
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
            _commentManager.AddComment(ic);
            _commentManager.SaveUser(ic.User, false);
            madeChange = true;
        }

        if (madeChange)
            SendDataUpdateEvent(ProjectDataType.COMMENTS, "comments data update event");

        return madeChange;
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
                return settingValue switch
                {
                    "T" => true,
                    "F" => false,
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
            (ScrText scrText, VerseRef verseRef) => scrText.Parser.GetVerseUsfmText(verseRef)
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
            (ScrText scrText, VerseRef verseRef) => scrText.GetVerseText(verseRef)
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
            return getTextFromScrText(scrText, verseRef);
        }
        catch (Exception e) when (e is ArgumentException or ProjectNotFoundException)
        {
            throw new InvalidDataException(
                $"Project with ID '{ProjectDetails.Metadata.Id}' was not found"
            );
        }
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
