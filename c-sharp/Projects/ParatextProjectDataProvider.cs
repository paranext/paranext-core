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
    }

    protected override Task StartDataProvider()
    {
        return Task.CompletedTask;
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
        return Get(ParatextProjectStorageInterpreter.BookUSFM, jsonString);
    }

    private ResponseToRequest GetChapterUSFM(string jsonString)
    {
        return Get(ParatextProjectStorageInterpreter.ChapterUSFM, jsonString);
    }

    private ResponseToRequest GetVerseUSFM(string jsonString)
    {
        return Get(ParatextProjectStorageInterpreter.VerseUSFM, jsonString);
    }

    private ResponseToRequest SetChapterUSFM(string dataQualifier, string data)
    {
        return Set(ParatextProjectStorageInterpreter.ChapterUSFM, dataQualifier, data);
    }
    #endregion

    #region USX handling methods
    private ResponseToRequest GetChapterUSX(string jsonString)
    {
        return Get(ParatextProjectStorageInterpreter.ChapterUSX, jsonString);
    }

    private ResponseToRequest SetChapterUSX(string dataQualifier, string data)
    {
        return Set(ParatextProjectStorageInterpreter.ChapterUSX, dataQualifier, data);
    }
    #endregion
}
