using System.Collections.Concurrent;
using System.Text.Json;
using Paranext.DataProvider.Services;
using Paratext.Data;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Shared base for Paratext-backed PDP factories. Concrete subclasses provide:
/// <list type="number">
///   <item>the project interface list and PDPF name (constructor),</item>
///   <item>which projects this factory advertises
///     (<see cref="ProjectDataProviderFactory.GetAvailableProjects"/>) and which projects this
///     factory will actually serve (<see cref="ShouldServeProject"/>), and</item>
///   <item>the per-factory rejection and registration log strings
///     (<see cref="GetCrossFactoryRejectionMessage"/>,
///     <see cref="GetRegistrationTaskDescription"/>).</item>
/// </list>
/// All other plumbing - the per-factory PDP cache, per-project lazy creation, and existing-PDP
/// lookup - lives here so fixes and improvements apply to every Paratext PDP factory automatically.
/// </summary>
internal abstract class ParatextProjectDataProviderFactoryBase : ProjectDataProviderFactory
{
    protected readonly LocalParatextProjects _paratextProjects;
    private readonly ConcurrentDictionary<string, Lazy<ParatextProjectDataProvider>> _pdpMap =
        new();

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
        // GetOrAdd with Lazy => the engine is constructed at most once per project even under
        // concurrency, and distinct projects never contend on a shared lock.
        var lazy = _pdpMap.GetOrAdd(
            projectID,
            id => new Lazy<ParatextProjectDataProvider>(
                () =>
                {
                    ScrText scrText;
                    try
                    {
                        scrText = LocalParatextProjects.GetParatextProject(id);
                    }
                    catch (KeyNotFoundException)
                    {
                        throw new KeyNotFoundException("Unknown project ID: " + id);
                    }

                    if (!ShouldServeProject(scrText))
                        throw new KeyNotFoundException(GetCrossFactoryRejectionMessage(id));

                    var details = scrText.GetProjectDetails();

                    // Create a random 30 character string containing letters A-Z. Random.Shared
                    // (not an instance Random) because concurrent Lazy factories for distinct
                    // projects can run this at the same time, and Random is not thread-safe.
                    var name = new string(
                        Enumerable
                            .Range(0, 30)
                            .Select(_ => (char)Random.Shared.Next(65, 90))
                            .ToArray()
                    );
                    var pdp = new ParatextProjectDataProvider(
                        name,
                        PapiClient,
                        details,
                        _paratextProjects
                    );
                    // Register in the background; the name is already known so callers don't
                    // wait on the ~40-53 network round-trips (previously blocked under the
                    // global lock).
                    ThreadingUtils.RunTask(
                        pdp.RegisterDataProviderAsync(),
                        GetRegistrationTaskDescription(pdp, details)
                    );
                    return pdp;
                },
                LazyThreadSafetyMode.ExecutionAndPublication
            )
        );
        return lazy.Value.DataProviderName;
    }

    /// <summary>
    /// Get an existing PDP if it exists for a project id
    /// </summary>
    public ParatextProjectDataProvider? GetExistingProjectDataProvider(string projectID)
    {
        projectID = projectID.ToUpperInvariant();

        // IsValueCreated guards against forcing creation (or re-throwing a cached creation
        // failure) from what is meant to be a "does one exist yet?" query.
        return _pdpMap.TryGetValue(projectID, out var lazy) && lazy.IsValueCreated
            ? lazy.Value
            : null;
    }
}
