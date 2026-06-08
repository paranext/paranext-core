namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: data-contracts.md §3.10 / shared-types.md §3.10 — element type for the
//   `BackupableProjects` subscribable data type (replaces the PT9 in-process
//   `BackupForm.cmbProject` model). PT9 read the project list directly from
//   `ScrTextCollection` inside the WinForms dialog; PT10 surfaces it as a
//   subscribable list on the `BackupRestoreDataProvider` so the React backup
//   dialog can render the dropdown via `useData(...).BackupableProjects(...)`.
//
//   This file is landed by CAP-021 (BackupableProjectsService) ahead of its
//   nominal owner CAP-008 (record-only). Both capabilities reference the same
//   shared-types.md §3.10 source-of-truth; landing the record here is purely a
//   sequencing convenience and does not change the shape.
// Maps to: shared-types.md §3.10 + data-contracts.md §3.10
// Source:  .context/features/project-backup-and-restore/implementation/shared-types.md
//          .context/features/project-backup-and-restore/data-contracts.md
// Behaviors: BHV-650 (Main-menu Backup entry — consumes this list via the dialog)
// Invariants: INV-B01 (resource projects filtered upstream — this record only carries
//             projects that survived the filter)

/// <summary>
/// One project eligible for backup (per <c>data-contracts.md §3.10</c>). Augments the generic
/// project identity with backup-relevant flags read from the underlying
/// <see cref="Paratext.Data.ScrText"/>.
/// </summary>
/// <remarks>
/// <para>
/// <b>Field semantics</b> (mirror <c>BackupForm.cmbProject</c> + <c>BackupForm.chkIncludeFigures</c>
/// inputs in PT9):
/// </para>
/// <list type="bullet">
///   <item><c>Id</c> — PT10 project metadata id (HexId form).</item>
///   <item><c>ShortName</c> — PT9 <c>scrText.Name</c>.</item>
///   <item><c>FullName</c> — PT9 <c>scrText.FullName</c>.</item>
///   <item><c>HasFiguresFolder</c> — <c>true</c> iff the project has a non-empty <c>figures/</c>
///     subfolder. Drives BHV-309 (visibility of the "Include full size figures" toggle).</item>
///   <item><c>IsNoteType</c> — <c>true</c> for Notes-type projects (CN, etc.). Bypasses the
///     book-count gate per INV-B03.</item>
///   <item><c>DefaultBookIds</c> — Default <see cref="Paratext.Data.BookSet"/> at backup time.
///     PT9 reads this from <c>scrText.Settings.BooksPresentSet</c> (all books present in project).</item>
/// </list>
/// </remarks>
public sealed record BackupableProject
{
    public string Id { get; init; } = string.Empty;
    public string ShortName { get; init; } = string.Empty;
    public string FullName { get; init; } = string.Empty;
    public bool HasFiguresFolder { get; init; }
    public bool IsNoteType { get; init; }
    public IReadOnlyList<string> DefaultBookIds { get; init; } = Array.Empty<string>();
}
