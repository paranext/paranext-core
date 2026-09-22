using System.Text.Json.Serialization;

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
/// Serializes to <c>{ isSyncing, projectIds }</c>, plus <c>outcome</c> and <c>completedAt</c> once a
/// run has completed (see <see cref="Outcome"/>), via the shared PAPI camelCase JSON options
/// (<c>PropertyNamingPolicy = CamelCase</c>, configured on the JSON-RPC formatter in
/// <c>SerializationOptions</c>), so no per-property naming attributes are needed. Sent unchanged as
/// both the <c>onSyncActivityChanged</c> event payload and the <c>getSyncActivity</c> command return;
/// the TS counterpart is <c>SyncActivitySnapshot</c> in
/// <c>src/@types/paratext-bible-send-receive/index.d.ts</c>.
/// </remarks>
public readonly record struct SyncActivityState(
    bool IsSyncing,
    IReadOnlyCollection<string> ProjectIds
)
{
    /// <summary>
    /// How the most recently completed run in this backend process turned out, or
    /// <see langword="null"/> when this snapshot cannot say.
    /// <para>
    /// Null while <see cref="IsSyncing"/> is true: the run in progress has no outcome yet, and the
    /// previous run's would be read as describing it. Set on the snapshot that closes a run and kept
    /// on every later snapshot until the next run opens, so a consumer that seeds after a run ended
    /// still learns how it went:
    /// </para>
    /// <code>
    /// idle at startup   { isSyncing: false, projectIds: [],    outcome: absent      }
    /// run opens         { isSyncing: true,  projectIds: [],    outcome: absent      }
    /// set resolved      { isSyncing: true,  projectIds: ["P"], outcome: absent      }
    /// run closes        { isSyncing: false, projectIds: [],    outcome: "succeeded" }
    /// read after close  { isSyncing: false, projectIds: [],    outcome: "succeeded" }
    /// next run opens    { isSyncing: true,  projectIds: [],    outcome: absent      }
    /// </code>
    /// <para>
    /// Null means "cannot say" and is never a verdict. A consumer sees the same absence when no run
    /// has completed in this process yet, when a run is in progress, and when the build predates this
    /// property, and handles all three identically.
    /// </para>
    /// <para>
    /// Omitted from the JSON when null rather than written as <c>"outcome":null</c>. The attribute is
    /// on the property rather than in <c>SerializationOptions</c> because the JSON-RPC formatter copies
    /// only some of those options onto its own, and an ignore condition is not among them.
    /// </para>
    /// <para>
    /// An <c>init</c> property rather than a third positional parameter, so the constructor and the
    /// generated <c>Deconstruct</c> keep their two-value shape for the Paratext 10 Studio patch, which
    /// constructs these from outside this repository.
    /// </para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public SyncOutcome? Outcome { get; init; }

    /// <summary>
    /// When the run <see cref="Outcome"/> describes finished. Set and cleared with it, so the two are
    /// both present or both absent.
    /// <para>
    /// This is what lets a consumer holding two verdicts decide which one is newer. The Send/Receive
    /// extension's own results carry the time of the sync they describe, and a consumer reading both
    /// signals has no other way to tell an outcome from this run apart from a verdict left over from
    /// an earlier one — so without this it can only guess, and a guess here shows a verdict for a run
    /// it does not describe.
    /// </para>
    /// </summary>
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public DateTimeOffset? CompletedAt { get; init; }

    /// <summary>
    /// Compares by VALUE, including the contents of <see cref="ProjectIds"/> and the
    /// <see cref="Outcome"/>.
    /// <para>
    /// The synthesized equality a record struct would give this compares
    /// <see cref="IReadOnlyCollection{T}"/> with the default comparer, i.e. by REFERENCE — so two
    /// snapshots naming exactly the same projects would compare unequal whenever they were built as
    /// separate collections, which is every time. The natural dedupe at a publisher
    /// (<c>if (snapshot == _last) return;</c>) would then silently never dedupe, and every publisher
    /// would have to know that. Order is ignored because the ids are a normalized set, not a
    /// sequence.
    /// </para>
    /// <para>
    /// Being hand-written, this does not pick up new properties the way the synthesized equality
    /// would: every property added to this type must be added here and to
    /// <see cref="GetHashCode"/>, or a publisher's dedupe silently swallows a snapshot that differs
    /// only in it.
    /// </para>
    /// </summary>
    public bool Equals(SyncActivityState other)
    {
        if (IsSyncing != other.IsSyncing)
            return false;
        if (Outcome != other.Outcome)
            return false;
        if (CompletedAt != other.CompletedAt)
            return false;
        // A `default` instance has a null ProjectIds, and a publisher's dedupe field starts there:
        // `if (snapshot == _last) return;` against an unassigned `_last` would throw on the very
        // first snapshot it compared.
        IReadOnlyCollection<string> ids = ProjectIds ?? [];
        IReadOnlyCollection<string> otherIds = other.ProjectIds ?? [];
        if (ids.Count != otherIds.Count)
            return false;
        return ids.ToHashSet(StringComparer.OrdinalIgnoreCase).SetEquals(otherIds);
    }

    /// <summary>
    /// Hashes the same values <see cref="Equals(SyncActivityState)"/> compares, order-insensitively
    /// so two equal snapshots cannot hash differently.
    /// </summary>
    public override int GetHashCode()
    {
        // Null-tolerant for the same reason as Equals: a `default` instance has no ProjectIds.
        IReadOnlyCollection<string> ids = ProjectIds ?? [];
        int idsHash = 0;
        foreach (string projectId in ids)
            // XOR: commutative, so the hash does not depend on enumeration order.
            idsHash ^= StringComparer.OrdinalIgnoreCase.GetHashCode(projectId);
        return HashCode.Combine(IsSyncing, ids.Count, idsHash, Outcome, CompletedAt);
    }
}
