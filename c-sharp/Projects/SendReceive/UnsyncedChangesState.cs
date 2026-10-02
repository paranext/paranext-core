namespace Paranext.DataProvider.Projects.SendReceive;

/// <summary>
/// An immutable snapshot of sync direction per project: the projects whose local repository holds
/// changes not yet sent (<see cref="ToSend"/>) and the projects for which the Send/Receive server
/// holds changes not yet received here (<see cref="ToReceive"/>). A project may be in both.
/// </summary>
/// <param name="ToSend">The projects with unsent local changes. Normalized (upper-cased) by
/// whoever publishes it.</param>
/// <param name="ToReceive">The projects with server changes not yet received. Normalized
/// (upper-cased) by whoever publishes it; always empty where the server cannot be queried. Only a
/// build that fills <c>ParatextProjectSendReceiveService.GetServerTipIds</c> (Paratext 10 Studio)
/// can populate it; public Platform.Bible never reports a project here.</param>
/// <remarks>
/// Serializes to <c>{ toSend, toReceive }</c> via the shared PAPI camelCase JSON options
/// (<c>PropertyNamingPolicy = CamelCase</c>, configured on the JSON-RPC formatter in
/// <c>SerializationOptions</c>), so no per-property attributes are needed. Carried identically by the
/// <c>onUnsyncedChangesChanged</c> event and the <c>getUnsyncedChanges</c> command; the TS
/// counterpart is <c>UnsyncedChangesSnapshot</c> in
/// <c>src/@types/paratext-bible-send-receive/index.d.ts</c>.
/// </remarks>
public readonly record struct UnsyncedChangesState(
    IReadOnlyCollection<string> ToSend,
    IReadOnlyCollection<string> ToReceive
)
{
    /// <summary>The snapshot with no unsynced projects in either direction.</summary>
    public static readonly UnsyncedChangesState Empty =
        new(Array.Empty<string>(), Array.Empty<string>());

    /// <summary>
    /// Compares by VALUE, including the contents of <see cref="ToSend"/> and
    /// <see cref="ToReceive"/>.
    /// <para>
    /// The synthesized equality a record struct would give this compares
    /// <see cref="IReadOnlyCollection{T}"/> with the default comparer, i.e. by REFERENCE — so two
    /// snapshots naming exactly the same projects would compare unequal whenever they were built as
    /// separate collections, and the natural dedupe at a publisher
    /// (<c>if (snapshot == _last) return;</c>) would silently never dedupe. Order and case are
    /// ignored because the ids are normalized sets, not sequences.
    /// </para>
    /// </summary>
    public bool Equals(UnsyncedChangesState other) =>
        SetEquals(ToSend, other.ToSend) && SetEquals(ToReceive, other.ToReceive);

    /// <summary>
    /// Hashes the same values <see cref="Equals(UnsyncedChangesState)"/> compares,
    /// order-insensitively so two equal snapshots cannot hash differently.
    /// </summary>
    public override int GetHashCode() => HashCode.Combine(SetHash(ToSend), SetHash(ToReceive));

    private static bool SetEquals(IReadOnlyCollection<string> a, IReadOnlyCollection<string> b) =>
        a.Count == b.Count && a.ToHashSet(StringComparer.OrdinalIgnoreCase).SetEquals(b);

    private static int SetHash(IReadOnlyCollection<string> ids)
    {
        int idsHash = 0;
        foreach (string id in ids)
            // XOR: commutative, so the hash does not depend on enumeration order.
            idsHash ^= StringComparer.OrdinalIgnoreCase.GetHashCode(id);
        return HashCode.Combine(ids.Count, idsHash);
    }
}
