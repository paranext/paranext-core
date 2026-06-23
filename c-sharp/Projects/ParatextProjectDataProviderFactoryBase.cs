using System.Collections.Concurrent;
using System.Text.Json;
using Paranext.DataProvider.Services;
using Paratext.Data;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Shared base for Paratext-backed PDP (Project Data Provider) factories. Concrete subclasses provide:
/// <list type="number">
///   <item>the project interface list and PDPF (Project Data Provider Factory) name (constructor),</item>
///   <item>which projects this factory advertises
///     (<see cref="ProjectDataProviderFactory.GetAvailableProjects"/>) and which projects this
///     factory will actually serve (<see cref="ShouldServeProject"/>), and</item>
///   <item>the per-factory rejection and registration log strings
///     (<see cref="GetCrossFactoryRejectionMessage"/>,
///     <see cref="GetRegistrationTaskDescription"/>).</item>
/// </list>
/// All other plumbing - the per-factory PDP cache, double-checked-locking creation, and existing-PDP
/// lookup - lives here so fixes and improvements apply to every Paratext PDP factory automatically.
/// </summary>
internal abstract class ParatextProjectDataProviderFactoryBase : ProjectDataProviderFactory
{
    protected readonly LocalParatextProjects _paratextProjects;
    private readonly ConcurrentDictionary<string, ParatextProjectDataProvider> _pdpMap = new();
    private readonly object _creationLock = new();
    private readonly Random _random = new((int)DateTime.Now.Ticks);

    protected ParatextProjectDataProviderFactoryBase(
        PapiClient papiClient,
        LocalParatextProjects paratextProjects,
        List<string> projectInterfaces,
        string pdpfName
    )
        : base(projectInterfaces, pdpfName, papiClient)
    {
        _paratextProjects = paratextProjects;
    }

    protected override Task StartFactoryAsync()
    {
        _paratextProjects.Initialize();
        return Task.CompletedTask;
    }

    /// <summary>
    /// Determines whether the project belongs to this factory. Used to reject projects that belong
    /// to a sibling factory so callers don't end up with a PDP whose advertised interfaces lie about
    /// what the project can actually do.
    /// </summary>
    /// <remarks>
    /// The discriminator is the underlying <see cref="ScrText"/> (not its advertised
    /// <see cref="ProjectMetadata.ProjectInterfaces"/> list) so that the partition stays correct
    /// even if the interface lists evolve. For example, a future restricted project type
    /// (<c>TransliterationWithEncoder</c>) that drops <c>legacyCommentManager.comments</c> from
    /// its advertised interfaces but is not <see cref="ScrText.IsResourceProject"/> would still
    /// route to the correct factory because the check is against the ScrText flag directly.
    /// </remarks>
    protected abstract bool ShouldServeProject(ScrText scrText);

    /// <summary>
    /// Exception message used when a project belongs to a sibling factory rather than this one.
    /// </summary>
    protected abstract string GetCrossFactoryRejectionMessage(string projectID);

    /// <summary>
    /// Short description of the PDP registration task, used for logging. Distinguishes between
    /// factories so the log shows which factory registered which PDP.
    /// </summary>
    protected abstract string GetRegistrationTaskDescription(
        ParatextProjectDataProvider pdp,
        ProjectDetails details
    );

    /// <summary>
    /// Returns the data provider name of the PDP that serves the given project, creating and
    /// registering one on first request and caching it for subsequent lookups. Throws
    /// <see cref="KeyNotFoundException"/> if the project ID is unknown or belongs to a sibling
    /// factory (see <see cref="ShouldServeProject"/>).
    /// </summary>
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

            ScrText scrText;
            try
            {
                scrText = LocalParatextProjects.GetParatextProject(projectID);
            }
            catch (KeyNotFoundException)
            {
                throw new KeyNotFoundException("Unknown project ID: " + projectID);
            }

            if (!ShouldServeProject(scrText))
            {
                throw new KeyNotFoundException(GetCrossFactoryRejectionMessage(projectID));
            }

            var details = scrText.GetProjectDetails();

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
                GetRegistrationTaskDescription(newPdp, details),
                ThreadingUtils.DefaultTimeout
            );
            return newPdp.DataProviderName;
        }
    }

    /// <summary>
    /// Get an existing PDP if it exists for a project id
    /// </summary>
    public ParatextProjectDataProvider? GetExistingProjectDataProvider(string projectID)
    {
        projectID = projectID.ToUpperInvariant();

        if (_pdpMap.TryGetValue(projectID, out var existingPdp))
            return existingPdp;
        return null;
    }
}
