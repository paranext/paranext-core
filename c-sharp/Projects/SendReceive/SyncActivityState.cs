namespace Paranext.DataProvider.Projects.SendReceive;

/// <summary>
/// An immutable snapshot of Send/Receive run activity, carried by
/// <see cref="ParatextProjectSendReceiveService.SyncActivityChanged"/> and returned by
/// <see cref="ParatextProjectSendReceiveService.GetSyncActivity"/>.
/// <para>
/// Distinct from <see cref="SendReceiveBlockState"/> on purpose. The block state answers "are edits
/// being rejected right now", which is armed only while the write gate holds; this answers "is a
/// sync run in progress", which brackets the whole run — including the resolution phase before the
/// gate arms and the unwinding after it clears. The renderer needs the second question answered to
/// show a sync indicator for the run's full duration.
/// </para>
/// </summary>
/// <param name="IsSyncing">Whether a sync run currently owns the exclusive-sync state — i.e.
/// the run bracket has opened and not yet closed. True for EVERY sync path, including callers that
/// reach the dotnet commands directly without raising an extension-side claim.</param>
/// <param name="ProjectIds">The projects this run covers, once known. Empty while
/// <paramref name="IsSyncing"/> is true on the scheduled path before the merge set is resolved — a
/// sync IS running but its set is genuinely not yet determined — and always empty when not syncing.
/// Normalized with <see cref="SendReceiveWriteLock.NormalizeProjectIds"/> by whoever publishes it,
/// so these are exactly the ids the write gate blocks rather than a caller's raw list.</param>
/// <remarks>
/// Serializes to <c>{ isSyncing, projectIds }</c> via the shared PAPI camelCase JSON options
/// (<c>PropertyNamingPolicy = CamelCase</c>, configured on the JSON-RPC formatter in
/// <c>SerializationOptions</c>), so no per-property attributes are needed. Sent unchanged as both the
/// <c>onSyncActivityChanged</c> event payload and the <c>getSyncActivity</c> command return; the TS
/// counterpart is <c>SyncActivitySnapshot</c> in
/// <c>src/@types/paratext-bible-send-receive/index.d.ts</c>.
/// </remarks>
public readonly record struct SyncActivityState(
    bool IsSyncing,
    IReadOnlyCollection<string> ProjectIds
)
{
    /// <summary>
    /// Compares by VALUE, including the contents of <see cref="ProjectIds"/>.
    /// <para>
    /// The synthesized equality a record struct would give this compares
    /// <see cref="IReadOnlyCollection{T}"/> with the default comparer, i.e. by REFERENCE — so two
    /// snapshots naming exactly the same projects would compare unequal whenever they were built as
    /// separate collections, which is every time. The natural dedupe at a publisher
    /// (<c>if (snapshot == _last) return;</c>) would then silently never dedupe, and every publisher
    /// would have to know that. Order is ignored because the ids are a normalized set, not a
    /// sequence.
    /// </para>
    /// </summary>
    public bool Equals(SyncActivityState other)
    {
        if (IsSyncing != other.IsSyncing)
            return false;
        if (ProjectIds.Count != other.ProjectIds.Count)
            return false;
        return ProjectIds.ToHashSet(StringComparer.OrdinalIgnoreCase).SetEquals(other.ProjectIds);
    }

    /// <summary>
    /// Hashes the same values <see cref="Equals(SyncActivityState)"/> compares, order-insensitively
    /// so two equal snapshots cannot hash differently.
    /// </summary>
    public override int GetHashCode()
    {
        int idsHash = 0;
        foreach (string projectId in ProjectIds)
            // XOR: commutative, so the hash does not depend on enumeration order.
            idsHash ^= StringComparer.OrdinalIgnoreCase.GetHashCode(projectId);
        return HashCode.Combine(IsSyncing, ProjectIds.Count, idsHash);
    }
}
