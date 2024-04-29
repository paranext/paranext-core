using System.Text;
using System.Text.Json.Nodes;
using System.Xml;
using System.Xml.Linq;
using System.Xml.XPath;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.MessageTransports;
using Paratext.Data;
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
        ProjectDataType.CHAPTER_USX
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
        Getters.Add("getChapterUSFM", GetChapterUsfm);
        Setters.Add("setChapterUSFM", SetChapterUsfm);
        Getters.Add("getVerseUSFM", GetVerseUsfm);

        Getters.Add("getChapterUSX", GetChapterUsx);
        Setters.Add("setChapterUSX", SetChapterUsx);

        Getters.Add("getSetting", GetProjectSetting);
        Setters.Add("setSetting", SetProjectSetting);
    }

    #endregion

    #region Data Provider methods

    protected override Task StartDataProvider()
    {
        _paratextProjects.Initialize();
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

        ScrText scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.ID);
        try
        {
            RunWithinLock(
                WriteScope.ProjectData(scrText),
                writeLock =>
                {
                    if (!writeLock.Active)
                        throw new Exception("Write lock is not active");
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
            $"extensions/{scope.ExtensionName}/{scope.DataQualifier}",
            createIfNotExists
        );
    }

    protected virtual IProjectStreamManager CreateStreamManager(ProjectDetails projectDetails)
    {
        return new RawDirectoryProjectStreamManager(projectDetails);
    }

    #endregion

    #region Settings

    public ResponseToRequest GetProjectSetting(string jsonKey)
    {
        var settingName = JToken.Parse(jsonKey).ToString();
        settingName =
            ProjectSettings.GetParatextSettingNameFromPlatformBibleSettingName(settingName) ??
            settingName;
        var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.ID);
        return ResponseToRequest.Succeeded(scrText.Settings.ParametersDictionary[settingName]);
    }

    public ResponseToRequest SetProjectSetting(string jsonKey, string value)
    {
        var settingName = JToken.Parse(jsonKey).ToString();
        var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.ID);

        // If there is no Paratext setting for the name given, we'll create one lower down
        var currentValueResponse = ResponseToRequest.Failed("");
        try
        {
            currentValueResponse = GetProjectSetting(jsonKey);
        }
        catch (KeyNotFoundException) { }

        // Make sure the value we're planning to set is valid
        var currentValueJson = currentValueResponse.Success
            ? JsonConvert.SerializeObject(currentValueResponse.Contents)
            : "";
        if (!ProjectSettingsService.IsValid(
                PapiClient,
                value,
                currentValueJson,
                settingName,
                "",
                ProjectType.Paratext))
            return ResponseToRequest.Failed($"Validation failed for {settingName}");

        // Figure out which setting name to use
        var paratextSettingName = ProjectSettings.GetParatextSettingNameFromPlatformBibleSettingName(
                settingName) ?? settingName;

        // Now actually write the setting
        string? errorMessage = null;
        RunWithinLock(
        WriteScope.AllSettingsFiles(),
        _ => {
                try
                {
                    scrText.Settings.SetSetting(paratextSettingName, value);
                    scrText.Settings.Save();
                }
                catch (Exception ex)
                {
                    errorMessage = ex.Message;
                }
        });
        return (errorMessage != null)
            ? ResponseToRequest.Failed(errorMessage)
            : ResponseToRequest.Succeeded(ProjectDataType.SETTINGS);
    }

    // Typically for "reset" we would want to erase the setting and then call "getDefault" if a
    // setting is not present when "get" is called. Since we're using PT settings as the backing
    // store here, though, we want to keep all properties filled in inside of Settings.xml files
    public ResponseToRequest ResetProjectSetting(string jsonKey)
    {
        string settingName = JToken.Parse(jsonKey).ToString();
        string? defaultValue = ProjectSettingsService.GetDefault(
            PapiClient,
            settingName,
            ProjectType.Paratext
        );
        if (defaultValue == null)
            return ResponseToRequest.Failed($"Default value for {settingName} was null");
        var retVal = SetProjectSetting(jsonKey, defaultValue);
        SendDataUpdateEvent(retVal.Contents);
        return retVal;
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

    public ResponseToRequest SetChapterUsfm(string jsonString, string data)
    {
        if (!VerseRefConverter.TryCreateVerseRef(jsonString, out var verseRef, out var error))
            return ResponseToRequest.Failed(error);

        try
        {
            var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.ID);
            RunWithinLock(
                WriteScope.ProjectText(scrText, verseRef.BookNum, verseRef.ChapterNum),
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
            return ResponseToRequest.Failed($"Project with ID '{ProjectDetails.Metadata.ID}' was not found");
        }

        // The value of returned strings are case-sensitive and cannot change unless data provider subscriptions change
        return ResponseToRequest.Succeeded(AllScriptureDataTypes);
    }

    #endregion

    #region USX

    public ResponseToRequest GetChapterUsx(string jsonString)
    {
        return GetFromScrText(jsonString,
            (ScrText scrText, VerseRef verseRef) =>
            {
                var scrStylesheet = scrText.ScrStylesheet(verseRef.BookNum);
                // Tokenize usfm
                List<UsfmToken> tokens = UsfmToken.Tokenize(scrStylesheet, scrText.GetText(verseRef, true, true) ?? string.Empty, false);

                XmlDocument doc = new();
                using (XmlWriter xmlWriter = doc.CreateNavigator()!.AppendChild())
                {
                    UsfmToUsx.ConvertToXmlWriter(scrStylesheet, tokens, xmlWriter, false);
                    xmlWriter.Flush();
                }
                return doc.OuterXml;
            });
    }

    public ResponseToRequest SetChapterUsx(string jsonString, string data)
    {
        if (!VerseRefConverter.TryCreateVerseRef(jsonString, out var verseRef, out var error))
            return ResponseToRequest.Failed(error);

        string? failedMessage = null;
        try
        {
            var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.ID);
            RunWithinLock(
                WriteScope.ProjectText(scrText, verseRef.BookNum, verseRef.ChapterNum),
                writeLock =>
                {
                    XDocument doc;
                    using (TextReader reader = new StringReader(data))
                        doc = XDocument.Load(reader, LoadOptions.PreserveWhitespace);

                    if (doc.Root?.Name != "usx")
                    {
                        failedMessage = "Invalid USX";
                        return;
                    }

                    UsxFragmenter.FindFragments(
                        scrText.ScrStylesheet(verseRef.BookNum),
                        doc.CreateNavigator(),
                        XPathExpression.Compile("*[false()]"),
                        out string usfm
                    );

                    usfm = UsfmToken.NormalizeUsfm(scrText, verseRef.BookNum, usfm);
                    scrText.PutText(verseRef.BookNum, verseRef.ChapterNum, true, usfm, writeLock);
                });
        }
        catch (Exception e) when (e is ArgumentException or ProjectNotFoundException)
        {
            failedMessage = $"Project with ID '{ProjectDetails.Metadata.ID}' was not found";
        }

        return failedMessage != null
            ? ResponseToRequest.Failed(failedMessage)
            : ResponseToRequest.Succeeded(AllScriptureDataTypes);
    }

    #endregion

    #region Private helper methods

    private ResponseToRequest GetFromScrText(string verseRefJson, Func<ScrText, VerseRef, string> getTextFromScrText)
    {
        if (!VerseRefConverter.TryCreateVerseRef(verseRefJson, out var verseRef, out var error))
            return ResponseToRequest.Failed(error);

        try
        {
            var scrText = LocalParatextProjects.GetParatextProject(ProjectDetails.Metadata.ID);
            return ResponseToRequest.Succeeded(getTextFromScrText(scrText, verseRef));
        }
        catch (Exception e) when (e is ArgumentException or ProjectNotFoundException)
        {
            return ResponseToRequest.Failed($"Project with ID '{ProjectDetails.Metadata.ID}' was not found");
        }
    }

    private static void RunWithinLock(WriteScope writeScope, Action<WriteLock> action)
    {
        var myLock =
            WriteLockManager.Default.ObtainLock(writeScope)
            ?? throw new Exception("Unable to obtain write lock");
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
