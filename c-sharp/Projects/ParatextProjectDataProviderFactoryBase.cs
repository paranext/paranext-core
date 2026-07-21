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
                            .Select(_ => (char)Random.Shared.Next(65, 91))
                            .ToArray()
                    );
                    var pdp = new ParatextProjectDataProvider(
                        name,
                        PapiClient,
                        details,
                        _paratextProjects
                    );
                    // Wait for registration to finish before returning this PDP, so the name we
                    // hand back is immediately usable - never a window where a caller has the name
                    // but the PDP's methods aren't registered yet (which would burn their bounded
                    // MethodNotFound retry budget and spuriously fail a valid project). RunTask
                    // blocks up to DefaultTimeout and rethrows a registration fault, so a failed
                    // registration propagates out of this Lazy factory and is evicted by the catch
                    // below (self-healing on the next call) instead of caching a permanently-
                    // unusable PDP. This does NOT re-serialize distinct projects: each project has
                    // its own per-project Lazy, so concurrent creations for different projects still
                    // register concurrently - only same-project callers share (and await) this one.
                    ThreadingUtils.RunTask(
                        pdp.RegisterDataProviderAsync(),
                        $"{GetRegistrationTaskDescription(pdp, details)} for project {id}",
                        ThreadingUtils.DefaultTimeout
                    );
                    return pdp;
                },
                LazyThreadSafetyMode.ExecutionAndPublication
            )
        );
        try
        {
            return lazy.Value.DataProviderName;
        }
        catch
        {
            // A faulted Lazy caches its exception forever. Evict it so a later call retries
            // (e.g. a resource requested before Paratext registration completes, a project
            // requested mid-clone, or a PDP whose RegisterDataProviderAsync faulted - now surfaced
            // here because registration is awaited above rather than fire-and-forget) instead of
            // staying broken until process restart. Caching nothing on failure keeps failed
            // lookups self-healing. Compare-and-remove by the
            // exact Lazy so we never clobber a different,
            // successful entry created for this project in the meantime. Eviction runs only on
            // throw, so the success path still creates exactly one PDP per project.
            //
            // Eviction alone keeps the map consistent: it never stays poisoned, so the next call
            // for this project (from any caller) retries fresh and self-heals. In the rare race
            // where a concurrent caller already replaced this faulted Lazy with a newer, successful
            // entry, that entry survives (compare-and-remove leaves it untouched) - only THIS
            // caller rethrows the stale exception, and its own next call then observes the newer
            // entry. That one accepted spurious error is why we don't add a bounded in-line retry
            // here.
            _pdpMap.TryRemove(
                new KeyValuePair<string, Lazy<ParatextProjectDataProvider>>(projectID, lazy)
            );
            throw;
        }
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
