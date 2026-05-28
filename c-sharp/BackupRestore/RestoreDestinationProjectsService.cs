using Paranext.DataProvider.Projects;
using Paratext.Data;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: PT9 read the restore-destination project list inline inside `RestoreForm` from
//   `ScrTextCollection`; PT10 owns it as a standalone service so the
//   `BackupRestoreDataProvider` can expose it as a subscribable data type
//   (`RestoreDestinationProjects` per data-contracts.md §5.2).
// Maps to: data-contracts.md §3.11 (element type) + §5.2 (subscription)
// Source:  c-sharp/BackupRestore/RestoreDestinationProject.cs (record)
//          .context/features/project-backup-and-restore/implementation/strategic-plan-backend.md §CAP-021
//          .context/features/project-backup-and-restore/implementation/backend-alignment.md (line 105)
// Behaviors: BHV-651 (Main-menu Restore entry — consumes this list via RestoreForm)
// Invariants: INV-B05 (admin permission surfaced on destination list)

/// <summary>
/// Internal collaborator of the future <c>BackupRestoreDataProvider</c>. Maintains a snapshot of
/// projects eligible as a restore overlay destination and an in-process subscriber set so callers
/// can react to changes. Notifies subscribers — both the in-process delegates AND the network via
/// <see cref="PapiClient.SendEventAsync"/> — whenever <see cref="NotifyProjectsChanged"/> is called
/// and the recomputed snapshot differs from the previous one.
/// </summary>
/// <remarks>
/// <para>
/// <b>Invariant INV-B05</b>: Each <see cref="RestoreDestinationProject.CurrentUserIsAdmin"/> flag
/// is populated from <c>scrText.Permissions.AmAdministrator</c>. This is the CARRIER of the
/// admin-permission gate; the actual overlay-restore enforcement happens downstream in
/// <see cref="RestorePermissionGate.CheckAdminGate"/> (CAP-019) when M-003 commits the restore. A
/// destination project where <c>CurrentUserIsAdmin == false</c> will be rendered in the UI dropdown
/// (so the user knows it exists) but selecting it will lead to a <c>PERMISSION_DENIED</c> envelope
/// at restore time. See VAL-B05 / BHV-325 / EXT-203.
/// </para>
///
/// <para>
/// <b>Trigger conditions</b> (per <c>data-contracts.md §5.2</c>): a re-emission happens when a
/// project is created/deleted/renamed OR a user's admin permission on any project changes (so the
/// <c>CurrentUserIsAdmin</c> flag would flip).
/// </para>
///
/// <para>
/// <b>Event emission shape</b>: the service emits
/// <c>PapiClient.SendEventAsync(updateEventType, [dataTypeName])</c> where
/// <c>updateEventType</c> defaults to <c>"platformBackupRestore.backupRestore-data:onDidUpdate"</c>
/// and <c>dataTypeName</c> is <c>"RestoreDestinationProjects"</c>.
/// </para>
/// </remarks>
internal sealed class RestoreDestinationProjectsService
{
    public const string DefaultUpdateEventType =
        "platformBackupRestore.backupRestore-data:onDidUpdate";
    public const string DataTypeName = "RestoreDestinationProjects";

    private readonly PapiClient _papiClient;
    private readonly LocalParatextProjects _paratextProjects;
    private readonly string _updateEventType;

    private readonly object _lock = new();
    private List<RestoreDestinationProject> _cachedSnapshot = [];
    private readonly List<Action<IReadOnlyList<RestoreDestinationProject>>> _subscribers = [];

    public RestoreDestinationProjectsService(
        PapiClient papiClient,
        LocalParatextProjects paratextProjects,
        string updateEventType = DefaultUpdateEventType
    )
    {
        _papiClient = papiClient;
        _paratextProjects = paratextProjects;
        _updateEventType = updateEventType;
    }

    /// <summary>
    /// Returns the current snapshot of projects eligible as a restore overlay destination. Each
    /// entry's <see cref="RestoreDestinationProject.CurrentUserIsAdmin"/> reflects the current
    /// user's permission at the time of the last <see cref="NotifyProjectsChanged"/> call.
    /// </summary>
    public IReadOnlyList<RestoreDestinationProject> GetSnapshot()
    {
        lock (_lock)
        {
            return _cachedSnapshot.ToList().AsReadOnly();
        }
    }

    /// <summary>
    /// Subscribes <paramref name="handler"/> to receive the new snapshot whenever
    /// <see cref="NotifyProjectsChanged"/> detects a change. Same idempotence + disposal semantics
    /// as <see cref="BackupableProjectsService.Subscribe"/>.
    /// </summary>
    public IDisposable Subscribe(Action<IReadOnlyList<RestoreDestinationProject>> handler)
    {
        lock (_lock)
        {
            if (!_subscribers.Contains(handler))
                _subscribers.Add(handler);
        }
        return new Subscription(this, handler);
    }

    /// <summary>
    /// Rescans <see cref="LocalParatextProjects"/>, recomputes the projected snapshot (including
    /// <see cref="RestoreDestinationProject.CurrentUserIsAdmin"/>), and (only if the snapshot
    /// actually changed) updates the cache, fires <see cref="PapiClient.SendEventAsync"/>, and
    /// invokes every currently-subscribed handler.
    /// </summary>
    public void NotifyProjectsChanged()
    {
        List<RestoreDestinationProject> newSnapshot = BuildSnapshot();

        List<Action<IReadOnlyList<RestoreDestinationProject>>> handlersToNotify;
        IReadOnlyList<RestoreDestinationProject> snapshotForHandlers;
        lock (_lock)
        {
            // Snapshot-equality short-circuit per strategic-plan §CAP-021. Record default
            // equality is value-based for all scalar fields here (no collection fields on
            // RestoreDestinationProject), so the standard record `==` is sufficient — we still
            // wrap it in a per-element helper for parity with BackupableProjectsService and to
            // future-proof against schema additions.
            if (AreEquivalent(_cachedSnapshot, newSnapshot))
                return;

            _cachedSnapshot = newSnapshot;
            snapshotForHandlers = newSnapshot.AsReadOnly();
            handlersToNotify = [.. _subscribers];
        }

        _papiClient
            .SendEventAsync(_updateEventType, new List<string> { DataTypeName })
            .GetAwaiter()
            .GetResult();

        foreach (Action<IReadOnlyList<RestoreDestinationProject>> handler in handlersToNotify)
            handler(snapshotForHandlers);
    }

    // EXPLANATION:
    // Snapshot-equality helper. RestoreDestinationProject has no collection fields, so default
    // record equality would actually work — but we keep the explicit per-field comparison for
    // parity with BackupableProjectsService.AreEquivalent and so future schema additions don't
    // silently change the no-change semantics.
    private static bool AreEquivalent(
        IReadOnlyList<RestoreDestinationProject> a,
        IReadOnlyList<RestoreDestinationProject> b
    )
    {
        if (a.Count != b.Count)
            return false;
        for (int i = 0; i < a.Count; i++)
        {
            RestoreDestinationProject x = a[i];
            RestoreDestinationProject y = b[i];
            if (
                x.Id != y.Id
                || x.ShortName != y.ShortName
                || x.FullName != y.FullName
                || x.CurrentUserIsAdmin != y.CurrentUserIsAdmin
            )
                return false;
        }
        return true;
    }

    // EXPLANATION:
    // Rescans LocalParatextProjects.GetAllProjectDetails(), resolves each id to its ScrText,
    // and projects it to the RestoreDestinationProject record. No INV-B01 filter (resource
    // projects CAN be restore destinations — the destination filter is admin-permission, not
    // resource-protected). Field sources match shared-types.md §3.11:
    //   * Id                 -- ProjectDetails.Metadata.Id (PT10 HexId-form id)
    //   * ShortName          -- scrText.Name
    //   * FullName           -- scrText.FullName
    //   * CurrentUserIsAdmin -- scrText.Permissions?.AmAdministrator ?? false (INV-B05;
    //                           mirrors RestorePermissionGate's defensive null-permissions
    //                           handling -- CAP-019).
    private List<RestoreDestinationProject> BuildSnapshot()
    {
        var result = new List<RestoreDestinationProject>();
        foreach (ProjectDetails details in _paratextProjects.GetAllProjectDetails())
        {
            ScrText scrText;
            try
            {
                scrText = LocalParatextProjects.GetParatextProject(details.Metadata.Id);
            }
            catch
            {
                continue;
            }

            result.Add(
                new RestoreDestinationProject
                {
                    Id = details.Metadata.Id,
                    ShortName = scrText.Name,
                    FullName = SafeFullName(scrText),
                    CurrentUserIsAdmin = IsAdministrator(scrText),
                }
            );
        }
        return result;
    }

    private static string SafeFullName(ScrText scrText)
    {
        try
        {
            return scrText.FullName ?? string.Empty;
        }
        catch
        {
            return string.Empty;
        }
    }

    // INV-B05: defensive read of scrText.Permissions.AmAdministrator. Returns false when
    // Permissions is null (matching CAP-019 RestorePermissionGate's gate-closed-on-null
    // policy) so the UI never shows an admin-checked entry for a project without permissions.
    private static bool IsAdministrator(ScrText scrText)
    {
        try
        {
            return scrText.Permissions?.AmAdministrator ?? false;
        }
        catch
        {
            return false;
        }
    }

    private void Unsubscribe(Action<IReadOnlyList<RestoreDestinationProject>> handler)
    {
        lock (_lock)
        {
            _subscribers.Remove(handler);
        }
    }

    private sealed class Subscription : IDisposable
    {
        private readonly RestoreDestinationProjectsService _owner;
        private readonly Action<IReadOnlyList<RestoreDestinationProject>> _handler;
        private bool _disposed;

        public Subscription(
            RestoreDestinationProjectsService owner,
            Action<IReadOnlyList<RestoreDestinationProject>> handler
        )
        {
            _owner = owner;
            _handler = handler;
        }

        public void Dispose()
        {
            if (_disposed)
                return;
            _disposed = true;
            _owner.Unsubscribe(_handler);
        }
    }
}
