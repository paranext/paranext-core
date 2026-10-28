using Paranext.DataProvider.Services;

namespace Paranext.DataProvider.Projects.SendReceive;

/// <summary>
/// Records that the first Send/Receive has succeeded: when a sync run ends with
/// <see cref="SyncOutcome.Succeeded"/> and the <see cref="Settings.FIRST_SYNC_STATE"/> setting is not
/// already <c>synced</c>, writes <c>synced</c> to it. The first-run wizard reads the setting to stop
/// reopening its Sync step.
/// <para>
/// This writes a user setting, not project data, so it does not take the Send/Receive write gate.
/// </para>
/// <para>
/// The write runs on a background task. The sync activity event is raised from the sync worker's
/// <c>finally</c> block, and <see cref="SettingsService.SetSetting"/> blocks on a PAPI round trip,
/// which would stall the end of the sync. The background action re-reads the state before writing and
/// logs a failed write instead of throwing; the next successful sync tries again.
/// </para>
/// </summary>
internal sealed class FirstSyncRecorder
{
    private const string SYNCED = "synced";

    private readonly Func<string?> _readState;
    private readonly Action<string> _writeState;
    private readonly Func<Action, Task> _runInBackground;
    private readonly ParatextProjectSendReceiveService? _service;
    private readonly object _lock = new();
    private bool _started;

    public FirstSyncRecorder(PapiClient papiClient, ParatextProjectSendReceiveService service)
        : this(
            () => SettingsService.GetSetting<string>(papiClient, Settings.FIRST_SYNC_STATE),
            value => SettingsService.SetSetting(papiClient, Settings.FIRST_SYNC_STATE, value),
            work => Task.Run(work)
        )
    {
        _service = service;
    }

    /// <param name="readState">The current value of the first-sync state setting.</param>
    /// <param name="writeState">Writes a new value to the first-sync state setting.</param>
    /// <param name="runInBackground">Runs the given work off the calling thread.</param>
    internal FirstSyncRecorder(
        Func<string?> readState,
        Action<string> writeState,
        Func<Action, Task> runInBackground
    )
    {
        _readState = readState;
        _writeState = writeState;
        _runInBackground = runInBackground;
    }

    /// <summary>Starts listening for sync activity. Calling it again has no effect.</summary>
    public void Start()
    {
        lock (_lock)
        {
            if (_started || _service == null)
                return;
            _started = true;
            _service.SyncActivityChanged += OnSyncActivityChanged;
        }
    }

    /// <summary>
    /// When a run has just ended successfully, hands the recording off to a background task.
    /// </summary>
    internal void OnSyncActivityChanged(SyncActivityState state)
    {
        if (state.IsSyncing || state.Outcome != SyncOutcome.Succeeded)
            return;

        _ = _runInBackground(RecordIfNeeded);
    }

    private void RecordIfNeeded()
    {
        try
        {
            if (_readState() == SYNCED)
                return;
            _writeState(SYNCED);
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine($"Could not record the first successful sync: {ex}");
        }
    }
}
