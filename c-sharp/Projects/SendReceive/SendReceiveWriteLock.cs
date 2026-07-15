using System.Collections.Immutable;

namespace Paranext.DataProvider.Projects.SendReceive;

/// <summary>
/// Process-wide registry of the projects currently being synced by an automatic (scheduled)
/// Send/Receive. The project data provider consults it before every project write and rejects the
/// write when the project is syncing, so an editor change can never race the sync's on-disk file
/// replacement (Mercurial merge) and corrupt the project.
/// </summary>
/// <remarks>
/// <para>
/// <b>Inert in open-source Platform.Bible.</b> Nothing in public core ever calls
/// <see cref="SetSyncing"/>, so <see cref="IsBlocked"/> always returns <c>false</c> and no write is
/// ever rejected — public behavior is unchanged by this class. The Paratext 10 Studio closed-source
/// patch brackets each automatic sync with <see cref="SetSyncing"/> / <see cref="Clear"/>, which is
/// what activates the gate. This class is the public seam; the activation lives in the patch.
/// </para>
/// <para>
/// Thread-safe with no locks: the blocked set is an immutable set held behind a <c>volatile</c>
/// reference and swapped atomically, so the many PAPI threads that call <see cref="IsBlocked"/>
/// never observe a torn value. Project IDs are normalized to lower-case invariant so a write's
/// project ID and the sync's project ID compare regardless of casing.
/// </para>
/// </remarks>
internal static class SendReceiveWriteLock
{
    // The exact suffix on every rejection message. The Paratext 10 Studio Scripture editor matches
    // this sentinel to show an "editing paused during Send/Receive" notification (rather than the
    // generic permissions message) and revert the un-saved change.
    public const string EditBlockedSentinel = "(SR_EDIT_BLOCKED)";

    // volatile so a SetSyncing/Clear on one thread is immediately visible to IsBlocked on another.
    private static volatile IImmutableSet<string> _blockedProjectIds =
        ImmutableHashSet<string>.Empty;

    private static string Normalize(string projectId) => projectId.ToLowerInvariant();

    /// <summary>
    /// Marks the given projects as being synced, so writes to them are rejected until
    /// <see cref="Clear"/> (or a later <see cref="SetSyncing"/>) runs. Replaces any previously set
    /// list — call this once per sync batch with the full set of projects in the batch.
    /// </summary>
    public static void SetSyncing(IEnumerable<string> projectIds)
    {
        ArgumentNullException.ThrowIfNull(projectIds);
        _blockedProjectIds = projectIds.Select(Normalize).ToImmutableHashSet();
    }

    /// <summary>Clears all blocked projects; no project is edit-blocked afterward.</summary>
    public static void Clear()
    {
        _blockedProjectIds = ImmutableHashSet<string>.Empty;
    }

    /// <summary>
    /// Whether writes to <paramref name="projectId"/> are currently blocked by an in-progress
    /// automatic Send/Receive. Always <c>false</c> in public core (see the class remarks).
    /// </summary>
    public static bool IsBlocked(string? projectId)
    {
        return !string.IsNullOrEmpty(projectId)
            && _blockedProjectIds.Contains(Normalize(projectId));
    }

    /// <summary>
    /// Throws if <paramref name="projectId"/> is currently sync-blocked. The message ends with
    /// <see cref="EditBlockedSentinel"/> so the editor can recognize the rejection. A no-op in
    /// public core.
    /// </summary>
    public static void ThrowIfBlocked(string? projectId)
    {
        if (IsBlocked(projectId))
            throw new InvalidOperationException(
                $"Cannot write to project '{projectId}' while an automatic Send/Receive is in "
                    + $"progress. {EditBlockedSentinel}"
            );
    }
}
