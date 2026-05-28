using Paranext.DataProvider.Projects;
using Paratext.Data;
using SIL.Scripture;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: PT9 read the backup-eligible project list inline inside `BackupForm` from
//   `ScrTextCollection`; PT10 owns it as a standalone service so the
//   `BackupRestoreDataProvider` can expose it as a subscribable data type
//   (`BackupableProjects` per data-contracts.md §5.1).
// Maps to: data-contracts.md §3.10 (element type) + §5.1 (subscription)
// Source:  c-sharp/BackupRestore/BackupableProject.cs (record)
//          c-sharp/BackupRestore/SubscribableSnapshotService.cs (base — common machinery)
//          .context/features/project-backup-and-restore/implementation/strategic-plan-backend.md §CAP-021
//          .context/features/project-backup-and-restore/implementation/backend-alignment.md (line 105)
// Behaviors: BHV-650 (Main-menu Backup entry — consumes this list)
// Invariants: INV-B01 (resource projects filtered from backupable list)

/// <summary>
/// Internal collaborator of the future <c>BackupRestoreDataProvider</c>. Maintains a snapshot of
/// backup-eligible projects (i.e., projects with <c>scrText.IsProtectedText == false</c>) and an
/// in-process subscriber set so callers can react to changes. The lock + subscriber-set + wire-
/// event machinery lives in <see cref="SubscribableSnapshotService{TItem}"/>; this class supplies
/// only the per-record projection (<see cref="BuildSnapshot"/>) and per-record equality
/// (<see cref="AreEquivalent"/>).
/// </summary>
/// <remarks>
/// <para>
/// <b>Test seam</b>: <see cref="SubscribableSnapshotService{TItem}.NotifyProjectsChanged"/> is the
/// entry point the future <c>BackupRestoreDataProvider</c> calls when the underlying
/// <see cref="LocalParatextProjects"/> produces a project lifecycle event.
/// <see cref="LocalParatextProjects"/> has no built-in event hooks today, so the test seam is the
/// same as the production seam.
/// </para>
///
/// <para>
/// <b>Invariant INV-B01</b>: Resource projects (<c>scrText.IsProtectedText == true</c>) MUST be
/// filtered out of the snapshot. PT9 enforces this in <c>BackupForm.ValidateData</c>
/// (<c>BackupForm.cs:225-230</c>) at the dialog-OK level; PT10 enforces it earlier, at the
/// list-source level, so resource projects never appear in the UI dropdown to begin with.
/// </para>
///
/// <para>
/// <b>Event emission shape</b> (per <c>data-contracts.md §5.1</c> + <c>DataProvider.cs:19-20</c>):
/// the service emits <c>PapiClient.SendEventAsync(updateEventType, [dataTypeName])</c> where
/// <c>updateEventType</c> defaults to
/// <see cref="SubscribableSnapshotService{TItem}.DefaultUpdateEventType"/> and
/// <c>dataTypeName</c> is <see cref="DataTypeName"/> (<c>"BackupableProjects"</c>). The
/// constructor accepts both as parameters so tests (and future configurations) can override.
/// </para>
/// </remarks>
internal sealed class BackupableProjectsService : SubscribableSnapshotService<BackupableProject>
{
    /// <summary>
    /// The data-type name announced on the wire event payload. Public so callers (and tests)
    /// can reference the literal string symbolically rather than by repeating the string
    /// constant.
    /// </summary>
    public const string DataTypeName = "BackupableProjects";

    public BackupableProjectsService(
        PapiClient papiClient,
        LocalParatextProjects paratextProjects,
        string updateEventType = DefaultUpdateEventType
    )
        : base(papiClient, paratextProjects, updateEventType) { }

    protected override string WireDataTypeName => DataTypeName;

    // EXPLANATION:
    // Rescans LocalParatextProjects.GetAllProjectDetails(), resolves each id to its ScrText,
    // and projects it to the BackupableProject record. Resource projects (IsProtectedText) are
    // filtered out per INV-B01. Field sources match shared-types.md §3.10:
    //   * Id              -- ProjectDetails.Metadata.Id (the PT10 HexId-form id)
    //   * ShortName       -- scrText.Name (PT9 ScrText.cs:257)
    //   * FullName        -- scrText.FullName (PT9 ScrText.cs:287)
    //   * HasFiguresFolder-- Directory.Exists(<scrText.Directory>/figures)
    //   * IsNoteType      -- Settings.TranslationInfo.Type.IsNoteType() (PT9 CommentThread.cs:261)
    //   * DefaultBookIds  -- scrText.BooksPresentSet.SelectedBookNumbers -> Canon.BookNumberToId
    // Defensive nulls because DummyScrText may have an unpopulated Settings.TranslationInfo.
    protected override List<BackupableProject> BuildSnapshot()
    {
        var result = new List<BackupableProject>();
        foreach (ProjectDetails details in _paratextProjects.GetAllProjectDetails())
        {
            ScrText scrText;
            try
            {
                scrText = LocalParatextProjects.GetParatextProject(details.Metadata.Id);
            }
            catch
            {
                // Defensive: if a project went away between enumeration and resolution, skip it.
                continue;
            }

            // INV-B01: filter resource projects out of the backupable list.
            if (scrText.IsProtectedText)
                continue;

            result.Add(
                new BackupableProject
                {
                    Id = details.Metadata.Id,
                    ShortName = scrText.Name,
                    FullName = SafeFullName(scrText),
                    HasFiguresFolder = HasFiguresFolder(scrText),
                    IsNoteType = IsNoteType(scrText),
                    DefaultBookIds = ComputeDefaultBookIds(scrText),
                }
            );
        }
        return result;
    }

    // EXPLANATION:
    // Custom equality helper. C# record value-equality compares scalar fields by value but
    // compares collection fields (here `DefaultBookIds`, an IReadOnlyList<string>) by REFERENCE.
    // Each BuildSnapshot call builds a fresh list, so reference equality would always report
    // "changed" and the no-change short-circuit would never fire. We compare scalar fields by
    // value and the DefaultBookIds list element-wise with SequenceEqual.
    protected override bool AreEquivalent(
        IReadOnlyList<BackupableProject> a,
        IReadOnlyList<BackupableProject> b
    )
    {
        if (a.Count != b.Count)
            return false;
        for (int i = 0; i < a.Count; i++)
        {
            BackupableProject x = a[i];
            BackupableProject y = b[i];
            if (
                x.Id != y.Id
                || x.ShortName != y.ShortName
                || x.FullName != y.FullName
                || x.HasFiguresFolder != y.HasFiguresFolder
                || x.IsNoteType != y.IsNoteType
                || !x.DefaultBookIds.SequenceEqual(y.DefaultBookIds)
            )
                return false;
        }
        return true;
    }

    private static bool HasFiguresFolder(ScrText scrText)
    {
        try
        {
            string? dir = scrText.Directory;
            return !string.IsNullOrEmpty(dir) && Directory.Exists(Path.Combine(dir, "figures"));
        }
        catch
        {
            return false;
        }
    }

    private static bool IsNoteType(ScrText scrText)
    {
        try
        {
            return scrText.Settings?.TranslationInfo?.Type.IsNoteType() ?? false;
        }
        catch
        {
            return false;
        }
    }

    private static IReadOnlyList<string> ComputeDefaultBookIds(ScrText scrText)
    {
        try
        {
            BookSet? books = scrText.BooksPresentSet;
            if (books == null)
                return Array.Empty<string>();
            var ids = new List<string>();
            foreach (int bookNum in books.SelectedBookNumbers)
            {
                string id = Canon.BookNumberToId(bookNum);
                if (!string.IsNullOrEmpty(id))
                    ids.Add(id);
            }
            return ids;
        }
        catch
        {
            return Array.Empty<string>();
        }
    }
}
