using System.Text.Json.Nodes;
using Newtonsoft.Json.Linq;
using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.MessageTransports;

namespace Paranext.DataProvider.Projects;

internal class ParatextProjectDataProvider : ProjectDataProvider
{
    private readonly ParatextProjectStorageInterpreter _paratextPsi;

    public ParatextProjectDataProvider(
        ParatextProjectStorageInterpreter paratextPsi,
        string name,
        PapiClient papiClient,
        ProjectDetails projectDetails
    )
        : base(name, papiClient, projectDetails)
    {
        _paratextPsi = paratextPsi;
        Getters.Add("getBookUSFM", GetBookUSFM);
        Getters.Add("getChapterUSFM", GetChapterUSFM);
        Setters.Add("setChapterUSFM", SetChapterUSFM);
        Getters.Add("getVerseUSFM", GetVerseUSFM);

        Getters.Add("getChapterUSX", GetChapterUSX);
        Setters.Add("setChapterUSX", SetChapterUSX);

        Getters.Add("getSetting", GetProjectSetting);
        Setters.Add("setSetting", SetProjectSetting);
    }

    protected override Task StartDataProvider()
    {
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

    protected override string GetProjectStorageInterpreterId()
    {
        return _paratextPsi.DataProviderName;
    }

    protected override ResponseToRequest GetExtensionData(ProjectDataScope dataScope)
    {
        return _paratextPsi.GetExtensionData(dataScope);
    }

    protected override ResponseToRequest SetExtensionData(ProjectDataScope dataScope, string data)
    {
        return _paratextPsi.SetExtensionData(dataScope, data);
    }

    private ResponseToRequest GetProjectSetting(string key)
    {
        return Get(ProjectDataType.SETTINGS, JToken.Parse(key).ToString());
    }

    private ResponseToRequest SetProjectSetting(string key, string value)
    {
        return Set(ProjectDataType.SETTINGS, JToken.Parse(key).ToString(), value);
    }

    // Typically for "reset" we would want to erase the setting and then call "getDefault" if a
    // setting is not present when "get" is called. Since we're using PT settings as the backing
    // store here, though, we want to keep all properties filled in inside of Settings.xml files
    private ResponseToRequest ResetProjectSetting(string key)
    {
        string settingName = JToken.Parse(key).ToString();
        string? defaultValue = ProjectSettingsService.GetDefault(
            PapiClient,
            settingName,
            ProjectType.Paratext
        );
        if (defaultValue == null)
            return ResponseToRequest.Failed($"Default value for {settingName} was null");
        ResponseToRequest retVal = Set(ProjectDataType.SETTINGS, settingName, defaultValue);
        SendDataUpdateEvent(retVal.Contents);
        return retVal;
    }

    private ResponseToRequest Get(string dataType, string dataQualifier)
    {
        ProjectDataScope scope =
            new()
            {
                ProjectID = ProjectDetails.Metadata.ID,
                DataType = dataType,
                DataQualifier = dataQualifier
            };
        return _paratextPsi.GetProjectData(scope);
    }

    private ResponseToRequest Set(string dataType, string dataQualifier, string data)
    {
        ProjectDataScope scope =
            new()
            {
                ProjectID = ProjectDetails.Metadata.ID,
                DataType = dataType,
                DataQualifier = dataQualifier,
            };
        return _paratextPsi.SetProjectData(scope, data);
    }

    #region USFM handling methods
    private ResponseToRequest GetBookUSFM(string jsonString)
    {
        return Get(ProjectDataType.BOOK_USFM, jsonString);
    }

    private ResponseToRequest GetChapterUSFM(string jsonString)
    {
        return Get(ProjectDataType.CHAPTER_USFM, jsonString);
    }

    private ResponseToRequest GetVerseUSFM(string jsonString)
    {
        return Get(ProjectDataType.VERSE_USFM, jsonString);
    }

    private ResponseToRequest SetChapterUSFM(string dataQualifier, string data)
    {
        return Set(ProjectDataType.CHAPTER_USFM, dataQualifier, data);
    }
    #endregion

    #region USX handling methods
    private ResponseToRequest GetChapterUSX(string jsonString)
    {
        return Get(ProjectDataType.CHAPTER_USX, jsonString);
    }

    private ResponseToRequest SetChapterUSX(string dataQualifier, string data)
    {
        return Set(ProjectDataType.CHAPTER_USX, dataQualifier, data);
    }
    #endregion
}
