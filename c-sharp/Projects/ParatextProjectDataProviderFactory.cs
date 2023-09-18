using System.Collections.Concurrent;
using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.MessageTransports;

namespace Paranext.DataProvider.Projects;

internal class ParatextProjectDataProviderFactory : ProjectDataProviderFactory
{
    private readonly ParatextProjectStorageInterpreter _paratextPsi;
    private readonly ConcurrentDictionary<string, ParatextProjectDataProvider> _pdpMap = new();
    private readonly Random _random = new((int)DateTime.Now.Ticks);

    public ParatextProjectDataProviderFactory(
        PapiClient papiClient,
        ParatextProjectStorageInterpreter paratextPsi
    )
        : base(ProjectType.Paratext, papiClient)
    {
        _paratextPsi = paratextPsi;
    }

    protected override ResponseToRequest GetProjectDataProviderID(
        string projectID,
        string projectStorageInterpreterId
    )
    {
        if (_paratextPsi.StorageType.ToSerializedString() != projectStorageInterpreterId)
            return ResponseToRequest.Failed(
                $"Unexpected project storage interpreter requested: {projectStorageInterpreterId}"
            );

        if (_pdpMap.TryGetValue(projectID, out var existingPdp))
            return ResponseToRequest.Succeeded(existingPdp.DataProviderName);

        ProjectDetails details;
        try
        {
            details = LocalProjects.GetProjectDetails(Guid.Parse(projectID));
        }
        catch (Exception)
        {
            return ResponseToRequest.Failed($"Unknown project ID: {projectID}");
        }

        var name = new string(
            Enumerable.Range(0, 30).Select(_ => (char)(_random.Next(65, 90))).ToArray()
        );

        var newPdp = new ParatextProjectDataProvider(_paratextPsi, name, PapiClient, details);
        if (!_pdpMap.TryAdd(projectID, newPdp))
            return ResponseToRequest.Failed("Internal error adding project data provider");

        newPdp.RegisterDataProvider().Wait();
        return ResponseToRequest.Succeeded(newPdp.DataProviderName);
    }
}
