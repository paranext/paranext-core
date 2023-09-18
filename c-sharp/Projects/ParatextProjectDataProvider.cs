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
        Getters.Add("getBook", GetBook);
        Getters.Add("getChapter", GetChapter);
        Setters.Add("setChapter", SetChapter);
        Getters.Add("getVerse", GetVerse);
    }

    protected override Task StartDataProvider()
    {
        return Task.CompletedTask;
    }

    protected override ResponseToRequest GetExtensionData(ProjectDataScope dataScope)
    {
        return _paratextPsi.GetExtensionData(dataScope);
    }

    protected override ResponseToRequest SetExtensionData(ProjectDataScope dataScope, string data)
    {
        return _paratextPsi.SetExtensionData(dataScope, data);
    }

    protected override ResponseToRequest SubscribeExtensionData(string jsonString)
    {
        return ResponseToRequest.Failed("Subscribing to extension data is not supported");
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

    private ResponseToRequest GetBook(string jsonString)
    {
        return Get(ParatextProjectStorageInterpreter.Book, jsonString);
    }

    private ResponseToRequest GetChapter(string jsonString)
    {
        return Get(ParatextProjectStorageInterpreter.Chapter, jsonString);
    }

    private ResponseToRequest GetVerse(string jsonString)
    {
        return Get(ParatextProjectStorageInterpreter.Verse, jsonString);
    }

    private ResponseToRequest SetChapter(string dataQualifier, string data)
    {
        return Set(ParatextProjectStorageInterpreter.Chapter, dataQualifier, data);
    }
}
