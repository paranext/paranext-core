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
);
