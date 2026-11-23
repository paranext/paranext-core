namespace Paranext.DataProvider.Projects.SendReceive;

/// <summary>
/// An immutable snapshot of <see cref="SendReceiveWriteLock"/>'s block state, carried by
/// <see cref="SendReceiveWriteLock.BlockStateChanged"/> and returned by
/// <see cref="SendReceiveWriteLock.GetBlockState"/>.
/// </summary>
/// <param name="IsBlocking">Whether an automatic Send/Receive is currently armed (rejecting writes
/// to the listed projects). <c>false</c> whenever the gate is idle — always so in public core.</param>
/// <param name="ProjectIds">The project ids whose writes are being rejected while
/// <paramref name="IsBlocking"/> is <c>true</c>; empty when not blocking. Serialized to the PAPI as
/// a JSON array under the camelCase key <c>projectIds</c> (see below).</param>
/// <remarks>
/// Serializes to the exact wire shape the renderer consumes — <c>{ isBlocking, projectIds }</c> —
/// via the shared PAPI JSON options (<c>PropertyNamingPolicy = CamelCase</c>, configured on the
/// JSON-RPC formatter in <c>SerializationOptions</c>), so no per-property attributes are needed. The
/// notifier (<c>SendReceiveBlockNotifierService</c>) sends this record straight over the wire as both
/// the <c>onSyncWriteLockChanged</c> event payload and the <c>getAutoSyncBlocking</c> command return.
/// </remarks>
public readonly record struct SendReceiveBlockState(
    bool IsBlocking,
    IReadOnlyCollection<string> ProjectIds
);
