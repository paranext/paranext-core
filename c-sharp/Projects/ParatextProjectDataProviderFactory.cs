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

    protected override List<ProjectMetadata>? GetAvailableProjects(JsonElement options)
    {
        var includeSettings = TryReadIncludeSettings(options);
        return _paratextProjects
            .GetAllProjectDetails(includeSettings)
            .Select(pd => pd.Metadata)
            .ToList();
    }

    /// <summary>
    /// Reads the optional, EXPERIMENTAL <c>includeSettings</c> string array out of the
    /// <c>getAvailableProjects</c> options argument. Returns null when the argument is absent or
    /// malformed so the default (no settings snapshot) path runs.
    /// </summary>
    private static List<string>? TryReadIncludeSettings(JsonElement options)
    {
        if (
            options.ValueKind != JsonValueKind.Object
            || !options.TryGetProperty("includeSettings", out var includeSettingsElement)
            || includeSettingsElement.ValueKind != JsonValueKind.Array
        )
            return null;

        var settings = new List<string>();
        foreach (var element in includeSettingsElement.EnumerateArray())
        {
            if (element.ValueKind != JsonValueKind.String)
                continue;
            var value = element.GetString();
            if (!string.IsNullOrEmpty(value))
                settings.Add(value);
        }
        return settings.Count > 0 ? settings : null;
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
