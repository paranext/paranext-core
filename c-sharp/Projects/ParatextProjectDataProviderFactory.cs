using System.Collections.Concurrent;
using System.Text.Json;
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

    protected override Task StartFactoryAsync()
    {
        _paratextProjects.Initialize();
        // Settings validators are global (not per-project), so register them exactly once here
        // rather than in each ParatextProjectDataProvider instance
        ParatextProjectDataProvider.RegisterSettingsValidators(PapiClient);
        return Task.CompletedTask;
    }

    protected override List<ProjectMetadata>? GetAvailableProjects(JsonElement _ignore)
    {
        return _paratextProjects
            .GetAvailableUnpublishedProjectDetails()
            .Select(pd => pd.Metadata)
            .ToList();
    }

    public override string GetProjectDataProviderID(string projectID)
    {
        projectID = projectID.ToUpperInvariant();

        // If we already have a PDP for this project, just return it
        if (_pdpMap.TryGetValue(projectID, out var existingPdp))
            return existingPdp.DataProviderName;

        // Prevent multiple threads from trying to create PDPs at the same time
        // This could probably be relaxed to be scoped per project ID, but this is more conservative
        lock (_creationLock)
        {
            // If the PDP was created while we were locked, use it
            if (_pdpMap.TryGetValue(projectID, out var existingPdpInLock))
                return existingPdpInLock.DataProviderName;

            ProjectDetails details;
            try
            {
                details = _paratextProjects.GetProjectDetails(projectID);
            }
            catch (KeyNotFoundException)
            {
                throw new KeyNotFoundException("Unknown project ID: " + projectID);
            }

            // Published projects belong to ParatextPublishedProjectDataProviderFactory. Reject them
            // here so callers don't end up with an unpublished PDP whose advertised interfaces lie
            // about what the project can actually do. The truthful discriminator is the presence of
            // legacyCommentManager.comments in the advertised interfaces - only unpublished
            // Paratext projects advertise it.
            if (!details.Metadata.ProjectInterfaces.Contains(ProjectInterfaces.LEGACY_COMMENT))
            {
                throw new KeyNotFoundException(
                    $"Project {projectID} is published and cannot be served by this factory"
                );
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
                throw new InvalidOperationException("Internal error adding project data provider");

            // Once the PDP has been registered, return the name of it so callers can get it
            ThreadingUtils.RunTask(
                newPdp.RegisterDataProviderAsync(),
                $"Register PDP {newPdp.DataProviderName} for project {details.Name}",
                ThreadingUtils.DefaultTimeout
            );
            return newPdp.DataProviderName;
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
