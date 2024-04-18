using System.Text;
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

internal class ParatextProjectStorageInterpreter : ProjectStorageInterpreter
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

    #region Constructor
    public ParatextProjectStorageInterpreter(
        PapiClient papiClient,
        LocalParatextProjects paratextProjects
    )
        : base(ProjectStorageType.ParatextFolders, new[] { ProjectType.Paratext }, papiClient)
    {
        _paratextProjects = paratextProjects;
    }
    #endregion

    #region Implementation of ProjectStorageInterpreter
    protected override Task StartDataProvider()
    {
        _paratextProjects.Initialize();
        return Task.CompletedTask;
    }

    public override ResponseToRequest GetAllProjects()
    {
        return ResponseToRequest.Succeeded(
            JsonConvert.SerializeObject(
                _paratextProjects
                    .GetAllProjectDetails()
                    .Select(details => details.Metadata)
                    .ToList()
            )
        );
    }

    public override ResponseToRequest CreateProject(ProjectDataScope scope)
    {
        if (string.IsNullOrEmpty(scope.ProjectID))
            return ResponseToRequest.Failed("Must provide a project ID");
        if (string.IsNullOrEmpty(scope.ProjectName))
            return ResponseToRequest.Failed("Must provide a project name");

        ProjectMetadata metadata =
            new(
                scope.ProjectID,
                scope.ProjectName,
                ProjectStorageType.ParatextFolders,
                ProjectType.Paratext
            );

        try
        {
            _paratextProjects.SaveProjectMetadata(metadata);
        }
        catch (Exception ex)
        {
            return ResponseToRequest.Failed(ex.ToString());
        }

        // TODO: Do something to actually create the Paratext part of the project
        // See ParatextPluginHost.CreateNewProject in the Paratext repository for a reference.

        return ResponseToRequest.Succeeded();
    }

    public override ResponseToRequest GetProjectSettings(ProjectDataScope scope)
    {
        if (string.IsNullOrEmpty(scope.ProjectID))
            return ResponseToRequest.Failed("Must provide a project ID");

        ScrText scrText;
        try
        {
            scrText = LocalParatextProjects.GetParatextProject(scope.ProjectID);
        }
        catch (Exception e) when (e is ArgumentException or ProjectNotFoundException)
        {
            return ResponseToRequest.Failed($"Project with ID '{scope.ProjectID}' was not found");
        }

        // TODO: Determine how we really want to handle project settings
        JObject settingsObj = new();
        foreach (KeyValuePair<string, string> setting in scrText.Settings.ParametersDictionary)
            settingsObj[setting.Key] = setting.Value;

        return ResponseToRequest.Succeeded(settingsObj.ToString());
    }

    public override ResponseToRequest GetProjectData(ProjectDataScope scope)
    {
        if (string.IsNullOrEmpty(scope.ProjectID))
            return ResponseToRequest.Failed("Must provide a project ID");
        if (string.IsNullOrEmpty(scope.DataType))
            return ResponseToRequest.Failed("Must provide a data type");
        if (string.IsNullOrEmpty(scope.DataQualifier))
            return ResponseToRequest.Failed("Must provide a data qualifier");

        // Not making it mandatory that all calls provide a VerseRef since there might be some types that don't use it
        VerseRefConverter.TryCreateVerseRef(scope.DataQualifier, out var verseRef, out var error);

        ScrText scrText;
        try
        {
            scrText = LocalParatextProjects.GetParatextProject(scope.ProjectID);
        }
        catch (Exception e) when (e is ArgumentException or ProjectNotFoundException)
        {
            return ResponseToRequest.Failed($"Project with ID '{scope.ProjectID}' was not found");
        }

        return scope.DataType switch
        {
            ProjectDataType.BOOK_USFM
                => string.IsNullOrEmpty(error)
                    ? ResponseToRequest.Succeeded(scrText.GetText(verseRef, false, true))
                    : ResponseToRequest.Failed(error),
            ProjectDataType.CHAPTER_USFM
                => string.IsNullOrEmpty(error)
                    ? ResponseToRequest.Succeeded(scrText.GetText(verseRef, true, true))
                    : ResponseToRequest.Failed(error),
            ProjectDataType.VERSE_USFM
                => string.IsNullOrEmpty(error)
                    ? ResponseToRequest.Succeeded(scrText.Parser.GetVerseUsfmText(verseRef))
                    : ResponseToRequest.Failed(error),
            ProjectDataType.CHAPTER_USX
                => string.IsNullOrEmpty(error)
                    ? ResponseToRequest.Succeeded(GetChapterUsx(scrText, verseRef))
                    : ResponseToRequest.Failed(error),
            ProjectDataType.SETTINGS
                => ResponseToRequest.Succeeded(scrText.Settings.ParametersDictionary[
                    ProjectSettings.GetParatextSettingNameFromPlatformBibleSettingName(scope.DataQualifier) ?? scope.DataQualifier]),
            _ => ResponseToRequest.Failed($"Unknown data type: {scope.DataType}")
        };
    }

    public override ResponseToRequest SetProjectData(ProjectDataScope scope, string data)
    {
        if (string.IsNullOrEmpty(scope.ProjectID))
            return ResponseToRequest.Failed("Must provide a project ID");
        if (string.IsNullOrEmpty(scope.DataType))
            return ResponseToRequest.Failed("Must provide a data type");
        if (string.IsNullOrEmpty(scope.DataQualifier))
            return ResponseToRequest.Failed("Must provide a data qualifier");

        // Not making it mandatory that all calls provide a VerseRef since there might be some types that don't use it
        VerseRefConverter.TryCreateVerseRef(scope.DataQualifier, out var verseRef, out var error);

        ScrText scrText;
        try
        {
            scrText = LocalParatextProjects.GetParatextProject(scope.ProjectID);
        }
        catch (Exception e) when (e is ArgumentException or ProjectNotFoundException)
        {
            return ResponseToRequest.Failed($"Project with ID '{scope.ProjectID}' was not found");
        }

        switch (scope.DataType)
        {
            case ProjectDataType.CHAPTER_USFM:
                if (!string.IsNullOrEmpty(error))
                    return ResponseToRequest.Failed(error);
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
                // The value of returned strings are case-sensitive and cannot change unless data provider subscriptions change
                return ResponseToRequest.Succeeded(AllScriptureDataTypes);
            case ProjectDataType.CHAPTER_USX:
                if (!string.IsNullOrEmpty(error))
                    return ResponseToRequest.Failed(error);
                ResponseToRequest? response = null;
                RunWithinLock(
                    WriteScope.ProjectText(scrText, verseRef.BookNum, verseRef.ChapterNum),
                    writeLock => response = SetChapterUsx(scrText, verseRef, data, writeLock)
                );
                return response ?? ResponseToRequest.Failed("Unknown error occurred");
            case ProjectDataType.SETTINGS:
                // If there is no Paratext setting for the name given, we'll create one lower down
                ResponseToRequest? currentValueResponse = ResponseToRequest.Failed("");
                try
                {
                    currentValueResponse = GetProjectData(scope);
                }
                catch (KeyNotFoundException) {}

                // Make sure the value we're planning to set is valid
                var currentValueJson = currentValueResponse.Success
                    ? JsonConvert.SerializeObject(currentValueResponse.Contents)
                    : "";
                if (!ProjectSettingsService.IsValid(
                        PapiClient,
                        data,
                        currentValueJson,
                        scope.DataQualifier,
                        "",
                        ProjectType.Paratext))
                    return ResponseToRequest.Failed($"Validation failed for {scope.DataQualifier}");

                // Figure out which setting name to use
                var paratextSettingName =
                    ProjectSettings.GetParatextSettingNameFromPlatformBibleSettingName(
                        scope.DataQualifier) ?? scope.DataQualifier;

                // Now actually write the setting
                string? errorMessage = null;
                RunWithinLock(
                    WriteScope.AllSettingsFiles(),
                    _ => {
                            try
                            {
                                var dataString = JToken.Parse(data).ToString();
                                scrText.Settings.SetSetting(paratextSettingName, dataString);
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
            default:
                return ResponseToRequest.Failed($"Unknown data type: {scope.DataType}");
        }
    }

    public override ResponseToRequest GetExtensionData(ProjectDataScope scope)
    {
        if (string.IsNullOrEmpty(scope.ProjectID))
            return ResponseToRequest.Failed("Must provide a project ID");
        if (string.IsNullOrEmpty(scope.ExtensionName))
            return ResponseToRequest.Failed("Must provide an extension name");
        if (string.IsNullOrEmpty(scope.DataQualifier))
            return ResponseToRequest.Failed("Must provide a data qualifier");

        Stream? dataStream;
        try
        {
            dataStream = GetExtensionStream(scope, false);
        }
        catch (KeyNotFoundException)
        {
            return ResponseToRequest.Failed("Unknown project ID: " + scope.ProjectID);
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
        if (string.IsNullOrEmpty(scope.ProjectID))
            return ResponseToRequest.Failed("Must provide a project ID");
        if (string.IsNullOrEmpty(scope.ExtensionName))
            return ResponseToRequest.Failed("Must provide an extension name");
        if (string.IsNullOrEmpty(scope.DataQualifier))
            return ResponseToRequest.Failed("Must provide a data qualifier");

        Stream? dataStream;
        try
        {
            dataStream = GetExtensionStream(scope, true);
        }
        catch (KeyNotFoundException)
        {
            return ResponseToRequest.Failed("Unknown project ID: " + scope.ProjectID);
        }
        catch (ArgumentException ex)
        {
            return ResponseToRequest.Failed(ex.Message);
        }

        if (dataStream == null)
            return ResponseToRequest.Failed("Unable to create extension data");

        ScrText scrText;
        try
        {
            scrText = LocalParatextProjects.GetParatextProject(scope.ProjectID);
        }
        catch (Exception e) when (e is ArgumentException or ProjectNotFoundException)
        {
            return ResponseToRequest.Failed($"Project with ID '{scope.ProjectID}' was not found");
        }

        try
        {
            RunWithinLock(
                WriteScope.ProjectData(scrText),
                writeLock =>
                {
                    // ReSharper disable AccessToDisposedClosure
                    if (!writeLock.Active)
                        throw new Exception("Write lock is not active");
                    dataStream.SetLength(0);
                    using TextWriter textWriter = new StreamWriter(dataStream, Encoding.UTF8);
                    textWriter.Write(data);
                    textWriter.Flush();
                    // ReSharper restore AccessToDisposedClosure
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
    #endregion

    #region Protected methods
    protected virtual IProjectStreamManager CreateStreamManager(ProjectDetails projectDetails)
    {
        return new RawDirectoryProjectStreamManager(projectDetails);
    }
    #endregion

    #region Private helper methods
    private Stream? GetExtensionStream(ProjectDataScope scope, bool createIfNotExists)
    {
        ProjectDetails projectDetails = _paratextProjects.GetProjectDetails(scope.ProjectID!);

        IProjectStreamManager extensionStreamManager = CreateStreamManager(projectDetails);
        return extensionStreamManager.GetDataStream(
            $"extensions/{scope.ExtensionName}/{scope.DataQualifier}",
            createIfNotExists
        );
    }

    private static string GetChapterUsx(ScrText scrText, VerseRef vref)
    {
        XmlDocument usx = ConvertUsfmToUsx(
            scrText,
            scrText.GetText(vref, true, true),
            vref.BookNum
        );
        return usx.OuterXml ?? string.Empty;
    }

    private static ResponseToRequest SetChapterUsx(
        ScrText scrText,
        VerseRef vref,
        string newUsx,
        WriteLock writeLock
    )
    {
        try
        {
            XDocument doc;
            using (TextReader reader = new StringReader(newUsx))
                doc = XDocument.Load(reader, LoadOptions.PreserveWhitespace);

            if (doc.Root?.Name != "usx")
                return ResponseToRequest.Failed("Invalid USX");

            UsxFragmenter.FindFragments(
                scrText.ScrStylesheet(vref.BookNum),
                doc.CreateNavigator(),
                XPathExpression.Compile("*[false()]"),
                out string usfm
            );

            usfm = UsfmToken.NormalizeUsfm(scrText, vref.BookNum, usfm);
            scrText.PutText(vref.BookNum, vref.ChapterNum, true, usfm, writeLock);
        }
        catch (Exception e)
        {
            return ResponseToRequest.Failed(e.ToString());
        }

        return ResponseToRequest.Succeeded(AllScriptureDataTypes);
    }

    private static XmlDocument ConvertUsfmToUsx(ScrText scrText, string usfm, int bookNum)
    {
        ScrStylesheet scrStylesheet = scrText.ScrStylesheet(bookNum);
        // Tokenize usfm
        List<UsfmToken> tokens = UsfmToken.Tokenize(scrStylesheet, usfm ?? string.Empty, false);

        XmlDocument doc = new XmlDocument();
        using (XmlWriter xmlw = doc.CreateNavigator()!.AppendChild())
        {
            // Convert to XML
            UsfmToUsx.ConvertToXmlWriter(scrStylesheet, tokens, xmlw, false);
            xmlw.Flush();
        }
        return doc;
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
