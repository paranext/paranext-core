namespace Paranext.DataProvider.Projects.SendReceive;

/// <summary>
/// How the most recently completed Send/Receive run turned out, as carried by
/// <see cref="SyncActivityState.Outcome"/>.
/// <para>
/// Deliberately coarse. The per-project detail — which projects did not succeed, conflicts, failure
/// messages — already has a home in the Send/Receive extension's <c>SyncState.lastResults</c> and
/// the sync status web view. This signal's job is to cover every sync path, not to repeat that
/// detail. See <c>adr-sync-activity-outcome-is-coarse</c> in
/// <c>.context/standards/Architecture-Decisions.md</c>.
/// </para>
/// </summary>
/// <remarks>
/// Serializes as <c>"succeeded"</c> / <c>"failed"</c> through the camelCase
/// <c>JsonStringEnumConverter</c> that <c>SerializationOptions</c> registers for every enum, so no
/// per-type converter is needed. The TS counterpart is <c>SyncOutcome</c> in
/// <c>src/@types/paratext-bible-send-receive/index.d.ts</c>.
/// </remarks>
public enum SyncOutcome
{
    /// <summary>The run completed and succeeded for every project it covered.</summary>
    Succeeded,

    /// <summary>
    /// The run did not succeed for at least one project it covered.
    /// <para>
    /// A run the user CANCELLED reports this too. The Send/Receive extension's claim path already
    /// reports a cancelled sync as a non-success <c>resultStatus</c> rather than as an outcome of its
    /// own, so a distinct <c>Cancelled</c> value here would have the two signals describe the same
    /// run differently.
    /// </para>
    /// </summary>
    Failed,
}
