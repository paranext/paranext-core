namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: strategic-plan-backend.md §CAP-010 — the wire-stable request payload
//   for M-009 validateBackup. PT9 had no wire surface — `BackupForm.ValidateData`
//   was an in-process side-effect method on the WinForms dialog (writing
//   ErrorProvider state on the form's text controls). PT10's React UI lives in
//   a separate process, so the wire layer here exposes a pure, parameter-driven
//   validation call the renderer can invoke after every input edit (debounced)
//   to refresh the OK-gate state without round-tripping through any orchestrator.
//
// PT10 deltas vs PT9 call site:
//   * Wire boundary: ValidateBackupRequest is the JSON-RPC `params` envelope
//     for `dataProvider:platformBackupRestore.backupRestore.validateBackup`.
//   * Parameter set: the six fields are exactly the inputs CAP-014's
//     `BackupValidationService.ValidateData` + `IsOkGateOpen` consume, hoisted
//     to the wire surface. ProjectId is carried only for symmetry/auditing;
//     the wire-layer guard chain doesn't resolve it (CAP-014 takes
//     `isProtectedText` already-resolved).
//   * Pure call: no preconditions; no orchestrator delegation; no I/O. The
//     wire layer just translates the request into two pure-function calls
//     against CAP-014 and assembles the response shape.
//
// Maps to: strategic-plan-backend.md §CAP-010 (M-009 validateBackup wire);
//   data-contracts.md §2.9 (the pre-round-4 ValidateBackupRequest shape the
//   user's task spec carries forward — distinct from the post-round-4
//   IsDestinationPathWritableRequest that was added under DEC-334).
// Behaviors: BHV-308 (composite OK-gate).

/// <summary>
/// Request payload for <c>M-009 validateBackup</c>
/// (<see cref="BackupRestoreDataProvider.ValidateBackupAsync"/>). Carries the
/// six BackupForm input fields the validation rule chain (CAP-014) consumes:
/// project identity (<see cref="ProjectId"/> + <see cref="IsProtectedText"/>),
/// user identity (<see cref="UserName"/>), destination spec
/// (<see cref="DestinationPath"/>), book selection (<see cref="SelectedBookCount"/>),
/// and project kind (<see cref="IsNoteType"/>).
/// </summary>
/// <remarks>
/// Validation rules: <c>None</c> — the contract is a pure probe. Empty /
/// malformed values return a <see cref="ValidateBackupResponse"/> with
/// <c>canSubmit=false</c> and the appropriate <c>errors</c> entry rather
/// than throwing.
/// </remarks>
internal sealed record ValidateBackupRequest
{
    /// <summary>
    /// HexId of the project being validated. Carried for symmetry / future
    /// auditing — the current wire layer does NOT resolve it (CAP-014 takes
    /// the pre-resolved <see cref="IsProtectedText"/> bit).
    /// </summary>
    public string ProjectId { get; init; } = string.Empty;

    /// <summary>
    /// Whether the project is a resource (<c>ScrText.IsProtectedText</c>) —
    /// resource projects cannot be backed up (VAL-B01 / INV-B01).
    /// </summary>
    public bool IsProtectedText { get; init; }

    /// <summary>
    /// The "Your name" field. Any non-empty string passes (VAL-B02 / INV-B02
    /// / BHV-T003 — no format check, so <c>"."</c> is accepted per TS-059).
    /// </summary>
    public string UserName { get; init; } = string.Empty;

    /// <summary>
    /// The destination ZIP path. Must satisfy the file-spec character validator
    /// (VAL-B03 / INV-B04) AND be non-empty for the OK gate to open (VAL-B04 /
    /// TS-061 — the empty case is silent: gate-only, no error message).
    /// </summary>
    public string DestinationPath { get; init; } = string.Empty;

    /// <summary>
    /// Number of books selected in the BookChooser. Must be &gt; 0 unless
    /// <see cref="IsNoteType"/> is <see langword="true"/> (INV-B03 Notes-
    /// bypass).
    /// </summary>
    public int SelectedBookCount { get; init; }

    /// <summary>
    /// Whether the project is a CN-type / Notes-type
    /// (<c>scrText.Settings.TranslationInfo.Type.IsNoteType()</c>). Notes-type
    /// projects bypass the book-count rule per INV-B03 (TS-055 / gm-023).
    /// </summary>
    public bool IsNoteType { get; init; }
}
