using System.Collections.Concurrent;
using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.MessageTransports;

namespace Paranext.DataProvider.Projects;

internal class ParatextProjectDataProviderFactory : ProjectDataProviderFactory
{
    private readonly ParatextProjectStorageInterpreter _paratextPsi;
    private readonly LocalParatextProjects _paratextProjects;
    private readonly ConcurrentDictionary<string, ParatextProjectDataProvider> _pdpMap = new();
    private readonly object _creationLock = new object();
    private readonly Random _random = new((int)DateTime.Now.Ticks);

    public ParatextProjectDataProviderFactory(
        PapiClient papiClient,
        ParatextProjectStorageInterpreter paratextPsi,
        LocalParatextProjects paratextProjects
    )
        : base(ProjectType.Paratext, papiClient)
    {
        _paratextPsi = paratextPsi;
        _paratextProjects = paratextProjects;
    }

    protected override ResponseToRequest GetProjectDataProviderID(
        string projectID,
        string projectStorageInterpreterId
    )
    {
        if (_paratextPsi.StorageType != projectStorageInterpreterId)
            return ResponseToRequest.Failed(
                $"Unexpected project storage interpreter requested: {projectStorageInterpreterId}"
            );

        // If we already have a PDP for this project, just return it
        if (_pdpMap.TryGetValue(projectID, out var existingPdp))
            return ResponseToRequest.Succeeded(existingPdp.DataProviderName);

        // Prevent multiple threads from trying to create PDPs at the same time
        // This could probably be relaxed to be scoped per project ID, but this is more conservative
        lock (_creationLock)
        {
            // If the PDP was created while we were locked, use it
            if (_pdpMap.TryGetValue(projectID, out var existingPdpInLock))
                return ResponseToRequest.Succeeded(existingPdpInLock.DataProviderName);

            ProjectDetails details;
            try
            {
                details = _paratextProjects.GetProjectDetails(projectID);
            }
            catch (KeyNotFoundException)
            {
                return ResponseToRequest.Failed("Unknown project ID: " + projectID);
            }

            // Create a random 30 character string containing letters A-Z
            var name = new string(
                Enumerable.Range(0, 30).Select(_ => (char)(_random.Next(65, 90))).ToArray()
            );

            // Create and store the PDP in the map for future lookups
            var newPdp = new ParatextProjectDataProvider(_paratextPsi, name, PapiClient, details);
            if (!_pdpMap.TryAdd(projectID, newPdp))
                return ResponseToRequest.Failed("Internal error adding project data provider");

            // Once the PDP has been registered, return the name of it so callers can get it
            newPdp.RegisterDataProvider().Wait();
            return ResponseToRequest.Succeeded(newPdp.DataProviderName);
        }
    }
}
