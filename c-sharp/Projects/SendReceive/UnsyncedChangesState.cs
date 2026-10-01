namespace Paranext.DataProvider.Projects.SendReceive;

/// <summary>
/// An immutable snapshot of the projects whose local repository holds changes not yet sent by
/// Send/Receive.
/// </summary>
/// <param name="ProjectIds">The projects with unsent local changes. Normalized (upper-cased) by
/// whoever publishes it.</param>
/// <remarks>
/// Serializes to <c>{ projectIds }</c> via the shared PAPI camelCase JSON options
/// (<c>PropertyNamingPolicy = CamelCase</c>, configured on the JSON-RPC formatter in
/// <c>SerializationOptions</c>), so no per-property attributes are needed. Carried identically by the
/// <c>onUnsyncedChangesChanged</c> event and the <c>getUnsyncedChanges</c> command; the TS
/// counterpart is <c>UnsyncedChangesSnapshot</c> in
/// <c>src/@types/paratext-bible-send-receive/index.d.ts</c>.
/// </remarks>
public readonly record struct UnsyncedChangesState(IReadOnlyCollection<string> ProjectIds)
{
    /// <summary>The snapshot with no unsynced projects.</summary>
    public static readonly UnsyncedChangesState Empty = new(Array.Empty<string>());

    /// <summary>
    /// Compares by VALUE, including the contents of <see cref="ProjectIds"/>.
    /// <para>
    /// The synthesized equality a record struct would give this compares
    /// <see cref="IReadOnlyCollection{T}"/> with the default comparer, i.e. by REFERENCE — so two
    /// snapshots naming exactly the same projects would compare unequal whenever they were built as
    /// separate collections, and the natural dedupe at a publisher
    /// (<c>if (snapshot == _last) return;</c>) would silently never dedupe. Order and case are
    /// ignored because the ids are a normalized set, not a sequence.
    /// </para>
    /// </summary>
    public bool Equals(UnsyncedChangesState other)
    {
        if (ProjectIds.Count != other.ProjectIds.Count)
            return false;
        return ProjectIds.ToHashSet(StringComparer.OrdinalIgnoreCase).SetEquals(other.ProjectIds);
    }

    /// <summary>
    /// Hashes the same values <see cref="Equals(UnsyncedChangesState)"/> compares,
    /// order-insensitively so two equal snapshots cannot hash differently.
    /// </summary>
    public override int GetHashCode()
    {
        int idsHash = 0;
        foreach (string projectId in ProjectIds)
            // XOR: commutative, so the hash does not depend on enumeration order.
            idsHash ^= StringComparer.OrdinalIgnoreCase.GetHashCode(projectId);
        return HashCode.Combine(ProjectIds.Count, idsHash);
    }
}
