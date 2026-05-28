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
//          c-sharp/BackupRestore/SubscribableSnapshotService.cs (base — common machinery)
//          .context/features/project-backup-and-restore/implementation/strategic-plan-backend.md §CAP-021
//          .context/features/project-backup-and-restore/implementation/backend-alignment.md (line 105)
// Behaviors: BHV-651 (Main-menu Restore entry — consumes this list via RestoreForm)
// Invariants: INV-B05 (admin permission surfaced on destination list)

/// <summary>
/// Internal collaborator of the future <c>BackupRestoreDataProvider</c>. Maintains a snapshot of
/// projects eligible as a restore overlay destination and an in-process subscriber set so callers
/// can react to changes. The lock + subscriber-set + wire-event machinery lives in
/// <see cref="SubscribableSnapshotService{TItem}"/>; this class supplies only the per-record
/// projection (<see cref="BuildSnapshot"/>) and per-record equality (<see cref="AreEquivalent"/>).
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
/// <c>updateEventType</c> defaults to
/// <see cref="SubscribableSnapshotService{TItem}.DefaultUpdateEventType"/> and
/// <c>dataTypeName</c> is <see cref="DataTypeName"/> (<c>"RestoreDestinationProjects"</c>).
/// </para>
/// </remarks>
internal sealed class RestoreDestinationProjectsService
    : SubscribableSnapshotService<RestoreDestinationProject>
{
    /// <summary>
    /// The data-type name announced on the wire event payload. Public so callers (and tests)
    /// can reference the literal string symbolically rather than by repeating the string
    /// constant.
    /// </summary>
    public const string DataTypeName = "RestoreDestinationProjects";

    public RestoreDestinationProjectsService(
        PapiClient papiClient,
        LocalParatextProjects paratextProjects,
        string updateEventType = DefaultUpdateEventType
    )
        : base(papiClient, paratextProjects, updateEventType) { }

    protected override string WireDataTypeName => DataTypeName;

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
    protected override List<RestoreDestinationProject> BuildSnapshot()
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

    // EXPLANATION:
    // Snapshot-equality helper. RestoreDestinationProject has no collection fields, so default
    // record equality would actually work — but we keep the explicit per-field comparison for
    // parity with BackupableProjectsService.AreEquivalent and so future schema additions don't
    // silently change the no-change semantics.
    protected override bool AreEquivalent(
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
}
