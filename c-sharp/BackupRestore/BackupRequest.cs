using System.Collections.Generic;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: data-contracts.md §2.1 — the wire-stable request payload for M-001 createBackup
//   (Section 4.1). Replaces PT9's UI-direct call into `Backup.BackupScrText(scrText,
//   destFileSpec, destFolder, books, flags, description, includeEncodingInfo)` from inside
//   the WinForms `BackupForm.cmdOK_Click` — there is no PT9 wire equivalent because PT9 was
//   an in-process call. PT10 surfaces the request as a JSON-RPC payload from the React
//   extension so the backend (CAP-002 wire method) can validate + delegate to
//   `BackupOrchestrator.ExecuteBackup` (CAP-022) without any UI coupling.
//
// PT10 deltas vs PT9 call site:
//   * Wire boundary: BackupRequest is the JSON-RPC `params` envelope for the
//     `dataProvider:platformBackupRestore.backupRestore.createBackup` method (per
//     backend-alignment.md §JSON-RPC Wire Contract M-001).
//   * Project identity: PT9 passed an already-resolved `ScrText`; PT10 passes a
//     `projectId` (HexId form) which the wire layer resolves via
//     `LocalParatextProjects.GetParatextProject`.
//   * Books-as-string-ids: PT9 passed a `BookSet` directly; PT10 passes
//     `selectedBookIds: string[]` (canonical book ids like "GEN", "EXO") which the wire
//     layer converts to a `BookSet` via `Canon.BookIdToNumber`.
//   * destFolder removed: PT9 took both destFileSpec AND destFolder; PT10 derives the
//     folder from `Path.GetDirectoryName(destinationPath)` in the orchestrator.
//   * userName added: PT9 read from `BackupForm.txtUserName` (BHV-T003); PT10 carries it
//     in the request so non-UI callers (e.g., Problem Report per BHV-655) supply it
//     explicitly.
//   * confirmOverwrite added: PT9 prompted the user inline via Alert.Show; PT10 routes
//     the prompt through the UI by returning `BackupResult.OverwriteRequired` and lets
//     the caller re-invoke with `confirmOverwrite=true`.
//
// Maps to: data-contracts.md §2.1 (C# block) + §4.1 (M-001 createBackup parameter type)

/// <summary>
/// Request payload for <c>M-001 createBackup</c> (<see cref="BackupRestoreDataProvider"/>'s
/// <c>CreateBackupAsync</c>). Encapsulates the user's selections from the React BackupForm
/// dialog: project, books, destination, figures-folder inclusion, description, and the
/// overwrite-confirmation flag.
/// </summary>
/// <remarks>
/// Validation rules (per data-contracts.md §2.1):
/// <list type="bullet">
///   <item><see cref="ProjectId"/> (VAL-B01) — must reference an editable, non-resource
///     project (<c>IsProtectedText == false</c>). On failure the wire layer returns
///     <c>Error(ResourceNotBackupable, %backup_resourceProjectNotBackupable%)</c>.</item>
///   <item><see cref="UserName"/> (VAL-B02) — non-empty. Failure returns
///     <c>Error(UserNameRequired, %backup_userNameRequired%)</c>.</item>
///   <item><see cref="DestinationPath"/> (VAL-A01 / VAL-B03) — must satisfy the
///     file-spec character validator (delegated to
///     <see cref="BackupValidationService.ValidateData"/> inside the orchestrator).</item>
///   <item><see cref="SelectedBookIds"/> (VAL-B04 / INV-A05) — when non-null, length must
///     be greater than zero unless the project is Notes-type (INV-B03 bypass). When null,
///     the wire layer substitutes the project's full
///     <see cref="Paratext.Data.ProjectSettings.BooksPresentSet"/>.</item>
/// </list>
/// </remarks>
/// <remarks>
/// VISIBILITY NOTE: declared <c>internal</c> (not <c>public</c>) because the property type
/// <see cref="IncludeFiguresFlags"/> (CAP-016) is itself <c>internal</c>. Mirrors the
/// <see cref="BackupOrchestrator"/> visibility decision (CAP-022). The wire facade
/// <see cref="BackupRestoreDataProvider"/> lives in the same assembly so it can name this
/// type in its <c>CreateBackupAsync</c> signature; tests are granted access via
/// <c>[InternalsVisibleTo("c-sharp-tests")]</c> in <c>c-sharp/AssemblyInfo.cs</c>.
/// </remarks>
internal sealed record BackupRequest
{
    /// <summary>
    /// Project to back up (PT10 HexId-form project metadata id). Resolved at the wire
    /// boundary via <see cref="Paranext.DataProvider.Projects.LocalParatextProjects.GetParatextProject"/>.
    /// </summary>
    public string ProjectId { get; init; } = string.Empty;

    /// <summary>
    /// Absolute destination path (including filename). The orchestrator auto-appends
    /// <c>.zip</c> if missing (INV-A01).
    /// </summary>
    public string DestinationPath { get; init; } = string.Empty;

    /// <summary>
    /// Optional book selection. <c>null</c>/omitted → full <c>BookSet</c> (all books
    /// present in the project) is used. An EMPTY list (length 0) is interpreted as "user
    /// explicitly selected zero books" and triggers the
    /// <see cref="BackupErrorCode.NoBooksSelected"/> error unless the project is Notes-type.
    /// </summary>
    public IReadOnlyList<string>? SelectedBookIds { get; init; }

    /// <summary>
    /// Figures-folder inclusion flags. Default: <see cref="IncludeFiguresFlags.Figures"/>
    /// (PT9 default per BHV-309 / EXT-106).
    /// </summary>
    public IncludeFiguresFlags IncludeFiguresFlags { get; init; } = IncludeFiguresFlags.Figures;

    /// <summary>
    /// Free-form description written into the ZIP archive comment (BHV-604) and the backup
    /// log entry (BHV-103). Caller is responsible for formatting (see
    /// <see cref="BackupDescriptionFormatter.ComputeDescription"/>); the wire layer does
    /// NOT synthesize this value.
    /// </summary>
    public string Description { get; init; } = string.Empty;

    /// <summary>
    /// Whether to confirm overwrite if the destination already exists. <c>true</c> means
    /// the caller has already confirmed and the orchestrator should delete + overwrite;
    /// <c>false</c> means the orchestrator returns
    /// <see cref="BackupResult.OverwriteRequired"/> so the UI can prompt the user and
    /// re-invoke (INV-A02 — no silent overwrite).
    /// </summary>
    public bool ConfirmOverwrite { get; init; }

    /// <summary>
    /// "Your name" field from the BackupForm (BHV-T003, VAL-B02). Must be non-empty;
    /// persisted across sessions in the UI per BHV-600 / EXT-104.
    /// </summary>
    public string UserName { get; init; } = string.Empty;
}
