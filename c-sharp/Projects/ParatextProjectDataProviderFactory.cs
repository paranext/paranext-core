using System.Collections.Concurrent;
using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.MessageTransports;
using Paranext.DataProvider.Services;

namespace Paranext.DataProvider.Projects;

internal class ParatextProjectDataProviderFactory : ProjectDataProviderFactory
{
    internal const string PDPF_NAME = "Paratext";
    private readonly LocalParatextProjects _paratextProjects;
    private readonly ConcurrentDictionary<string, ParatextProjectDataProvider> _pdpMap = new();
    private readonly object _creationLock = new();
    private readonly Random _random = new((int)DateTime.Now.Ticks);

    public ParatextProjectDataProviderFactory(
        PapiClient papiClient,
        LocalParatextProjects paratextProjects
    )
        : base(LocalParatextProjects.GetParatextProjectInterfaces(), PDPF_NAME, papiClient)
    {
        _paratextProjects = paratextProjects;
    }

    protected override Task StartFactory()
    {
        bool? shouldIncludePT9ProjectsOnWindows = false;
        if (OperatingSystem.IsWindows())
        {
            shouldIncludePT9ProjectsOnWindows = SettingsService.GetSettingValue<bool>(
                PapiClient,
                Settings.INCLUDE_MY_PARATEXT_9_PROJECTS
            );
            if (!shouldIncludePT9ProjectsOnWindows.HasValue)
                throw new Exception($"Setting {Settings.INCLUDE_MY_PARATEXT_9_PROJECTS} was null!");
        }
        _paratextProjects.Initialize(shouldIncludePT9ProjectsOnWindows.Value);
        return Task.CompletedTask;
    }

    protected override ResponseToRequest GetAvailableProjects()
    {
        var projectMetadata = _paratextProjects
            .GetAllProjectDetails()
            .Select(pd => pd.Metadata)
            .ToList();
        return ResponseToRequest.Succeeded(projectMetadata);
    }

    protected override ResponseToRequest GetProjectDataProviderID(string projectID)
    {
        projectID = projectID.ToUpperInvariant();

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
                Enumerable.Range(0, 30).Select(_ => (char)_random.Next(65, 90)).ToArray()
            );

            // Create and store the PDP in the map for future lookups
            var newPdp = new ParatextProjectDataProvider(
                name,
                PapiClient,
                details,
                _paratextProjects
            );
            if (!_pdpMap.TryAdd(projectID, newPdp))
                return ResponseToRequest.Failed("Internal error adding project data provider");

            // Once the PDP has been registered, return the name of it so callers can get it
            newPdp.RegisterDataProvider().Wait();
            return ResponseToRequest.Succeeded(newPdp.DataProviderName);
        }
    }

    /// <summary>
    /// Get an existing PDP if it exists for a project id
    /// </summary>
    /// <param name="projectID"></param>
    /// <returns></returns>
    public ParatextProjectDataProvider? GetExistingProjectDataProvider(string projectID)
    {
        projectID = projectID.ToUpperInvariant();

        if (_pdpMap.TryGetValue(projectID, out var existingPdp))
            return existingPdp;
        return null;
    }
}
