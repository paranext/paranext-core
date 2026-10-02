using Paranext.DataProvider.NetworkObjects.Documentation;
using static Paranext.DataProvider.NetworkObjects.Documentation.ExperimentalMethodDocumentation;

namespace Paranext.DataProvider.Projects.SendReceive;

/// <summary>
/// Bridges <see cref="UnsyncedChangesTracker.Changed"/> and <see cref="RemoteChangesPoller.Changed"/>
/// to the PAPI so the renderer can show, per project, which direction Send/Receive has work in:
/// local changes not yet sent (<c>toSend</c>) and server changes not yet received (<c>toReceive</c>).
/// <para>
/// Two surfaces, both carrying the same wire shape <c>{ toSend, toReceive }</c> (an
/// <see cref="UnsyncedChangesState"/> serialized via the shared camelCase PAPI JSON options):
/// <list type="bullet">
/// <item><description>
/// A <c>paratextBibleSendReceive.onUnsyncedChangesChanged</c> event, pushed whenever either set
/// changes; every push carries the live merged state of both.
/// </description></item>
/// <item><description>
/// A <c>command:paratextBibleSendReceive.getUnsyncedChanges</c> request handler returning the
/// current merged snapshot, so a renderer can seed its state on demand without waiting for the next
/// transition.
/// </description></item>
/// </list>
/// The registration, baseline-emit, and forwarding mechanics all live in
/// <see cref="SendReceiveSnapshotNotifierService{TSnapshot}"/>, which this shares with
/// <see cref="SyncActivityNotifierService"/>.
/// </para>
/// </summary>
internal class UnsyncedChangesNotifierService(
    PapiClient papiClient,
    UnsyncedChangesTracker tracker,
    RemoteChangesPoller poller
)
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
                    "Announces, per sync direction, the projects with changes waiting "
                    + "({ toSend, toReceive }), whenever either set changes. toSend is local "
                    + "repository truth: the projects whose local repository holds changes not yet "
                    + "sent by Send/Receive. toReceive is the result of the last server lookup, "
                    + "refreshed every few minutes and after each sync; it is always empty in "
                    + "public Platform.Bible, and only a build that supplies server information "
                    + "reports it.",
                Params =
                [
                    new()
                    {
                        Name = "state",
                        Summary = "The current unsynced-changes snapshot ({ toSend, toReceive })",
                        Required = true,
                        Schema = new() { Type = "object" },
                    },
                ],
            },
        };

    private static UnsyncedChangesState ReadMerged(
        UnsyncedChangesTracker tracker,
        RemoteChangesPoller poller
    ) => new(tracker.GetState().ToSend, poller.GetState());

    private readonly SendReceiveSnapshotNotifierService<UnsyncedChangesState> _notifier =
        new(
            papiClient,
            UnsyncedChangesChangedEvent,
            GetUnsyncedChangesCommand,
            () => ReadMerged(tracker, poller),
            handler =>
            {
                // Either side's change forwards the merged live read, so an event always carries both
                // sets rather than only the side that moved.
                tracker.Changed += _ => handler(ReadMerged(tracker, poller));
                poller.Changed += () => handler(ReadMerged(tracker, poller));
            },
            s_unsyncedChangesEventDocumentation,
            Create(
                "Returns, per sync direction, the projects with changes waiting ({ toSend, "
                    + "toReceive }) so a renderer can seed its indicator on demand instead of "
                    + "waiting for the next onUnsyncedChangesChanged transition. toSend is local "
                    + "repository truth. toReceive is the result of the last server lookup, "
                    + "refreshed every few minutes and after each sync; it is always empty in "
                    + "public Platform.Bible, and only a build that supplies server information "
                    + "reports it.",
                result: ResultOf(
                    "object",
                    "The current unsynced-changes snapshot ({ toSend, toReceive })"
                )
            )
        );

    /// <summary>
    /// Registers both wire surfaces and emits the current snapshot. See
    /// <see cref="SendReceiveSnapshotNotifierService{TSnapshot}.InitializeAsync"/> for the ordering
    /// guarantees this does and does not provide.
    /// </summary>
    public Task InitializeAsync() => _notifier.InitializeAsync();
}
