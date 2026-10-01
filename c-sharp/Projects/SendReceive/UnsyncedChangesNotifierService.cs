using Paranext.DataProvider.NetworkObjects.Documentation;
using static Paranext.DataProvider.NetworkObjects.Documentation.ExperimentalMethodDocumentation;

namespace Paranext.DataProvider.Projects.SendReceive;

/// <summary>
/// Bridges <see cref="UnsyncedChangesTracker.Changed"/> to the PAPI so the renderer can show which
/// projects hold local changes that Send/Receive has not yet sent.
/// <para>
/// Two surfaces, both carrying the same wire shape <c>{ projectIds }</c> (an
/// <see cref="UnsyncedChangesState"/> serialized via the shared camelCase PAPI JSON options):
/// <list type="bullet">
/// <item><description>
/// A <c>paratextBibleSendReceive.onUnsyncedChangesChanged</c> event, pushed whenever the set of
/// projects with unsynced changes changes.
/// </description></item>
/// <item><description>
/// A <c>command:paratextBibleSendReceive.getUnsyncedChanges</c> request handler returning the
/// current snapshot, so a renderer can seed its state on demand without waiting for the next
/// transition.
/// </description></item>
/// </list>
/// The registration, baseline-emit, and forwarding mechanics all live in
/// <see cref="SendReceiveSnapshotNotifierService{TSnapshot}"/>, which this shares with
/// <see cref="SyncActivityNotifierService"/>.
/// </para>
/// </summary>
internal class UnsyncedChangesNotifierService(PapiClient papiClient, UnsyncedChangesTracker tracker)
{
    /// <summary>
    /// Wire name of the unsynced-changes-changed event. camelCase to match the PAPI event-name
    /// convention; the renderer subscribes to this exact string.
    /// </summary>
    private const string UnsyncedChangesChangedEvent =
        "paratextBibleSendReceive.onUnsyncedChangesChanged";

    /// <summary>
    /// Wire name of the "which projects have unsynced changes?" pull command.
    /// </summary>
    private const string GetUnsyncedChangesCommand =
        "command:paratextBibleSendReceive.getUnsyncedChanges";

    /// <summary>
    /// OpenRPC documentation sent along with the <see cref="UnsyncedChangesChangedEvent"/>
    /// registration. The event is experimental, so this carries the <c>x-experimental</c> wire
    /// marker.
    /// </summary>
    private static readonly OpenRpcSingleNotificationDocumentation s_unsyncedChangesEventDocumentation =
        new()
        {
            Notification = new()
            {
                Experimental = true,
                Summary =
                    "Announces the projects whose local repository holds changes not yet sent by "
                    + "Send/Receive ({ projectIds }), whenever that set changes. Local-repository "
                    + "truth only: it says nothing about changes waiting on the server.",
                Params =
                [
                    new()
                    {
                        Name = "state",
                        Summary = "The current unsynced-changes snapshot",
                        Required = true,
                        Schema = new() { Type = "object" },
                    },
                ],
            },
        };

    private readonly SendReceiveSnapshotNotifierService<UnsyncedChangesState> _notifier =
        new(
            papiClient,
            UnsyncedChangesChangedEvent,
            GetUnsyncedChangesCommand,
            tracker.GetState,
            handler => tracker.Changed += handler,
            s_unsyncedChangesEventDocumentation,
            Create(
                "Returns the projects whose local repository holds changes not yet sent by "
                    + "Send/Receive ({ projectIds }) so a renderer can seed its indicator on demand "
                    + "instead of waiting for the next onUnsyncedChangesChanged transition.",
                result: ResultOf("object", "The current unsynced-changes snapshot")
            )
        );

    /// <summary>
    /// Registers both wire surfaces and emits the current snapshot. See
    /// <see cref="SendReceiveSnapshotNotifierService{TSnapshot}.InitializeAsync"/> for the ordering
    /// guarantees this does and does not provide.
    /// </summary>
    public Task InitializeAsync() => _notifier.InitializeAsync();
}
