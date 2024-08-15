using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Xml;
using System.Xml.Linq;
using System.Xml.XPath;
using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.MessageTransports;
using Paranext.DataProvider.Services;
using Paratext.Data;
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
        ProjectDataType.VERSE_USX
    ];

    private readonly LocalParatextProjects _paratextProjects;

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
        Getters.Add("getBookUSFM", GetBookUsfm);
        Setters.Add("setBookUSFM", SetBookUsfm);
        Getters.Add("getChapterUSFM", GetChapterUsfm);
        Setters.Add("setChapterUSFM", SetChapterUsfm);
        Getters.Add("getVerseUSFM", GetVerseUsfm);

        Getters.Add("getBookUSX", GetBookUsx);
        Setters.Add("setBookUSX", SetBookUsx);
        Getters.Add("getChapterUSX", GetChapterUsx);
        Setters.Add("setChapterUSX", SetChapterUsx);
        Getters.Add("getVerseUSX", GetVerseUsx);

        Getters.Add("getSetting", GetProjectSetting);
        Setters.Add("setSetting", SetProjectSetting);

        RegisterSettingsValidators();
    }

    #endregion

    #region Data Provider methods

    protected override Task StartDataProvider()
    {
        bool? shouldIncludePT9ProjectsOnWindows = false;
        if (OperatingSystem.IsWindows())
        {
            shouldIncludePT9ProjectsOnWindows = SettingsService.GetSettingValue<bool>(PapiClient, Settings.INCLUDE_MY_PARATEXT_9_PROJECTS);
            if (!shouldIncludePT9ProjectsOnWindows.HasValue)
                throw new InvalidDataException($"Setting {Settings.INCLUDE_MY_PARATEXT_9_PROJECTS} was null!");
        }
        _paratextProjects.Initialize(shouldIncludePT9ProjectsOnWindows.Value);
        return Task.CompletedTask;
    }

    protected override ResponseToRequest HandleRequest(string functionName, JsonArray args)
    {
        try
        {
            return functionName switch
            {
                "resetSetting" => ResetProjectSetting(args[0]!.ToJsonString()),
                _ => base.HandleRequest(functionName, args)
            };
        }
        catch (Exception e)
        {
            Console.Error.WriteLine(e.ToString());
            return ResponseToRequest.Failed(e.ToString());
        }
    }

    #endregion

    #region Extension Data

    public override ResponseToRequest GetExtensionData(ProjectDataScope scope)
    {
        if (string.IsNullOrEmpty(scope.ExtensionName))
            return ResponseToRequest.Failed("Must provide an extension name");
        if (string.IsNullOrEmpty(scope.DataQualifier))
            return ResponseToRequest.Failed("Must provide a data qualifier");

        Stream? dataStream;
        try
        {
            dataStream = GetExtensionStream(scope, false);
        }
        catch (ArgumentException ex)
        {
            return ResponseToRequest.Failed(ex.Message);
        }

        if (dataStream == null)
            return ResponseToRequest.Failed("Extension data not found");

        using (dataStream)
        {
            using TextReader textReader = new StreamReader(dataStream, Encoding.UTF8);
            return ResponseToRequest.Succeeded(textReader.ReadToEnd());
        }
    }

    public override ResponseToRequest SetExtensionData(ProjectDataScope scope, string data)
    {
        if (string.IsNullOrEmpty(scope.ExtensionName))
            return ResponseToRequest.Failed("Must provide an extension name");
        if (string.IsNullOrEmpty(scope.DataQualifier))
            return ResponseToRequest.Failed("Must provide a data qualifier");

        Stream? dataStream;
        try
        {
            dataStream = GetExtensionStream(scope, true);
        }
        catch (ArgumentException ex)
        {
            return ResponseToRequest.Failed(ex.Message);
        }

        if (dataStream == null)
            return ResponseToRequest.Failed("Unable to create extension data");

        ScrText scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);
        try
        {
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
            // The value of returned string is case-sensitive and cannot change unless data provider subscriptions change
            return ResponseToRequest.Succeeded("ExtensionData");
        }
        catch (Exception e)
        {
            return ResponseToRequest.Failed(e.ToString());
        }
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

    #region Settings

    public static string VisibilitySettingName => Setting.Visibility.ToString();
    private void RegisterSettingsValidators()
    {
        ProjectSettingsService.RegisterValidator(PapiClient, VisibilitySettingName,
            VisibilityValidator);

        (bool result, string? error) VisibilityValidator((string newValueJson, string currentValueJson,
            string allChangesJson) data)
        {
            try
            {
                var value = JsonSerializer.Deserialize<string>(data.newValueJson, s_serializerOptions);
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

    public ResponseToRequest GetProjectSetting(string jsonKey)
    {
        var settingName = JsonSerializer.Deserialize<string>(jsonKey, s_serializerOptions)
            ?? throw new InvalidDataException($"No project setting provided: {jsonKey}");
        var paratextSettingName =
            ProjectSettingsNames.GetParatextSettingNameFromPlatformBibleSettingName(settingName) ??
            settingName;
        var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);

        // ScrText always prioritizes the folder name over the Name setting as the "name" even when
        // accessing scrText.Settings.Name. So we're copying Paratext's functionality here and using
        // the folder name instead of Settings.Name.
        // https://github.com/ubsicap/Paratext/blob/aaadecd828a9b02e6f55d18e4c5dda8703ce2429/ParatextData/ProjectSettingsAccess/ProjectSettings.cs#L1438
        if (paratextSettingName == ProjectSettingsNames.PT_NAME)
            return ResponseToRequest.Succeeded(scrText.Name);

        if (scrText.Settings.ParametersDictionary.TryGetValue(paratextSettingName, out string? settingValue)) {
            // Paratext project setting value found, so return the value with the appropriate type
            if (ProjectSettingsNames.IsParatextSettingABoolean(paratextSettingName))
            {
                return settingValue switch
                {
                    "T" => ResponseToRequest.Succeeded(true),
                    "F" => ResponseToRequest.Succeeded(false),
                    _ => ResponseToRequest.Failed($"Failed to convert Paratext setting {settingName} to boolean. Value was not T or F"),
                };
            }
            return ResponseToRequest.Succeeded(settingValue);
        }

        // Setting not found, so get the default value
        string? defaultValue = ProjectSettingsService.GetDefault(
            PapiClient,
            settingName
        );
        if (defaultValue == null)
            return ResponseToRequest.Failed($"Default value for {settingName} was null");

        return ResponseToRequest.Succeeded(defaultValue);
    }

    public ResponseToRequest SetProjectSetting(string jsonKey, string value)
    {
        var settingName = JsonSerializer.Deserialize<string>(jsonKey, s_serializerOptions)
            ?? throw new InvalidDataException($"No project setting provided: {jsonKey}");

        var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);

        // If there is no Paratext setting for the name given, we'll create one lower down
        var currentValueResponse = GetProjectSetting(jsonKey);

        // Make sure the value we're planning to set is valid
        var currentValueJson = currentValueResponse.Success
            ? JsonSerializer.Serialize(currentValueResponse.Contents, s_serializerOptions)
            : "";
        if (!ProjectSettingsService.IsValid(
                PapiClient,
                value,
                currentValueJson,
                settingName,
                ""))
            return ResponseToRequest.Failed($"Validation failed for {settingName}");

        // Figure out which setting name to use
        var paratextSettingName = ProjectSettingsNames.GetParatextSettingNameFromPlatformBibleSettingName(
                settingName) ?? settingName;

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
                _ => {
                        try
                        {
                            scrText.Name = value;
                        }
                        catch (Exception ex)
                        {
                            errorMessage = ex.Message;
                        }
                });
        }
        else
        {
            RunWithinLock(
                WriteScope.EntireProject(scrText),
                _ => {
                        try
                        {
                            scrText.Settings.SetSetting(paratextSettingName, value);
                            // We are notifying when we release our lock, so don't automatically
                            // notify in `Save`
                            scrText.Settings.Save(false);
                        }
                        catch (Exception ex)
                        {
                            errorMessage = ex.Message;
                        }
                });
        }

        return (errorMessage != null)
            ? ResponseToRequest.Failed(errorMessage)
            : ResponseToRequest.Succeeded(ProjectDataType.SETTING);
    }

    // Typically for "reset" we would want to erase the setting and then call "getDefault" if a
    // setting is not present when "get" is called. Since we're using PT settings as the backing
    // store here, though, we want to keep all properties filled in inside of Settings.xml files
    public ResponseToRequest ResetProjectSetting(string jsonKey)
    {
        string settingName = JsonSerializer.Deserialize<string>(jsonKey, s_serializerOptions)
            ?? throw new InvalidDataException($"No setting name provided: {jsonKey}");
        string? defaultValue = ProjectSettingsService.GetDefault(
            PapiClient,
            settingName
        );
        if (defaultValue == null)
            return ResponseToRequest.Failed($"Default value for {settingName} was null");
        var retVal = SetProjectSetting(jsonKey, defaultValue);
        SendDataUpdateEvent(retVal.Contents);
        return retVal;
    }

    #endregion

    #region Scripture-related methods

    /// <summary>
    /// Send an event on the PAPI announcing that all the Scripture data has changed. This is used
    /// for reloading all the Scripture, settings, etc. after a project has been S/Red.
    /// </summary>
    public void SendFullProjectUpdateEvent()
    {
        SendDataUpdateEvent("*");
    }

    #endregion

    #region USFM

    public ResponseToRequest GetBookUsfm(string jsonString)
    {
        return GetFromScrText(jsonString,
            (ScrText scrText, VerseRef verseRef) => scrText.GetText(verseRef, false, true));
    }

    public ResponseToRequest GetChapterUsfm(string jsonString)
    {
        return GetFromScrText(jsonString,
            (ScrText scrText, VerseRef verseRef) => scrText.GetText(verseRef, true, true));
    }

    public ResponseToRequest GetVerseUsfm(string jsonString)
    {
        return GetFromScrText(jsonString,
            (ScrText scrText, VerseRef verseRef) => scrText.Parser.GetVerseUsfmText(verseRef));
    }

    public ResponseToRequest SetBookUsfm(string jsonString, string data)
    {
        var verseRef = JsonSerializer.Deserialize<VerseRef>(jsonString, s_serializerOptions);
        verseRef.ChapterNum = 0;
        try
        {
            var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);
            RunWithinLock(
                WriteScope.EntireProject(scrText),
                _ =>
                {
                    BookSet localBooksPresentSet = scrText.Settings.LocalBooksPresentSet;
                    if (!localBooksPresentSet.IsSelected(verseRef.BookNum) && !scrText.Creatable(verseRef.BookNum))
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
        }
        catch (Exception e)
        {
            return ResponseToRequest.Failed(e.ToString());
        }

        // The value of returned strings are case-sensitive and cannot change unless data provider subscriptions change
        return ResponseToRequest.Succeeded(AllScriptureDataTypes);
    }

    public ResponseToRequest SetChapterUsfm(string jsonString, string data)
    {
        var verseRef = JsonSerializer.Deserialize<VerseRef>(jsonString, s_serializerOptions);
        try
        {
            var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);
            RunWithinLock(
                WriteScope.EntireProject(scrText),
                writeLock =>
                {
                    scrText.PutText(
                        verseRef.BookNum,
                        verseRef.ChapterNum,
                        false,
                        data,
                        writeLock
                    );
                }
            );
        }
        catch (Exception e) when (e is ArgumentException or ProjectNotFoundException)
        {
            return ResponseToRequest.Failed($"Project with ID '{ProjectDetails.Metadata.Id}' was not found");
        }

        // The value of returned strings are case-sensitive and cannot change unless data provider subscriptions change
        return ResponseToRequest.Succeeded(AllScriptureDataTypes);
    }

    #endregion

    #region USX

    public ResponseToRequest GetBookUsx(string jsonString)
    {
        return GetFromScrText(jsonString,
            (ScrText scrText, VerseRef verseRef) => ConvertUsfmToUsx(scrText, verseRef, false));
    }

    public ResponseToRequest GetChapterUsx(string jsonString)
    {
        return GetFromScrText(jsonString,
            (ScrText scrText, VerseRef verseRef) => ConvertUsfmToUsx(scrText, verseRef, true));
    }

    public ResponseToRequest GetVerseUsx(string jsonString)
    {
        return GetFromScrText(jsonString, ExtractVerseUsx);
    }

    public ResponseToRequest SetBookUsx(string jsonString, string data)
    {
        var verseRef = JsonSerializer.Deserialize<VerseRef>(jsonString, s_serializerOptions);
        try
        {
            // Don't need to take a write lock in this function because SetBookUsfm will do it
            var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);
            string usfm = ConvertUsxToUsfm(scrText, verseRef, data);
            return SetBookUsfm(jsonString, usfm);
        }
        catch (Exception e)
        {
            return ResponseToRequest.Failed(e.ToString());
        }
    }

    public ResponseToRequest SetChapterUsx(string jsonString, string data)
    {
        var verseRef = JsonSerializer.Deserialize<VerseRef>(jsonString, s_serializerOptions);
        string? failedMessage = null;
        try
        {
            var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);
            RunWithinLock(
                WriteScope.EntireProject(scrText),
                writeLock =>
                {
                    var usfm = ConvertUsxToUsfm(scrText, verseRef, data);
                    scrText.PutText(verseRef.BookNum, verseRef.ChapterNum, true, usfm, writeLock);
                });
        }
        catch (Exception e) when (e is ArgumentException or ProjectNotFoundException)
        {
            failedMessage = $"Project with ID '{ProjectDetails.Metadata.Id}' was not found";
        }

        return failedMessage != null
            ? ResponseToRequest.Failed(failedMessage)
            : ResponseToRequest.Succeeded(AllScriptureDataTypes);
    }

    #endregion

    #region Private helper methods

    private ResponseToRequest GetFromScrText(string verseRefJson, Func<ScrText, VerseRef, string> getTextFromScrText)
    {
        var verseRef = JsonSerializer.Deserialize<VerseRef>(verseRefJson, s_serializerOptions);
        try
        {
            var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.Id);
            return ResponseToRequest.Succeeded(getTextFromScrText(scrText, verseRef));
        }
        catch (Exception e) when (e is ArgumentException or ProjectNotFoundException)
        {
            return ResponseToRequest.Failed($"Project with ID '{ProjectDetails.Metadata.Id}' was not found");
        }
    }

    private static string ConvertUsfmToUsx(ScrText scrText, VerseRef verseRef, bool chapterOnly)
    {
        var scrStylesheet = scrText.ScrStylesheet(verseRef.BookNum);
        string usfmData = scrText.GetText(verseRef, chapterOnly, true) ?? string.Empty;
        XmlDocument xmlDoc = UsfmToUsx.ConvertToXmlDocument(scrStylesheet, usfmData, false);
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
            out string usfm
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

        var scrStylesheet = scrText.ScrStylesheet(vRef.BookNum);
        string usfmData = scrText.GetText(vRef, true, true) ?? string.Empty;
        XmlDocument usxData = UsfmToUsx.ConvertToXmlDocument(scrStylesheet, usfmData, false);
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
        int chapterIndex =
            allXmlData.IndexOf(chapterNode.OuterXml, StringComparison.InvariantCulture);
        int verseIndex = allXmlData.IndexOf(verseNode.OuterXml, chapterIndex,
            StringComparison.InvariantCulture);
        int nextVerseIndex = nextVerseNode == null
            ? allXmlData.Length
            : allXmlData.IndexOf(nextVerseNode.OuterXml, chapterIndex,
                StringComparison.InvariantCulture);
        return allXmlData.Substring(verseIndex, nextVerseIndex - verseIndex);
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
