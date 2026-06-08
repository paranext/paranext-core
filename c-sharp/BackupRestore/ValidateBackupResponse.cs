using System.Collections.Generic;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: strategic-plan-backend.md §CAP-010 — the wire-stable return envelope
//   for M-009 validateBackup. Distinct from CAP-014's internal
//   `BackupValidationResult(IsValid, ErrorKey, ErrorField)` record which is
//   the 3-field result of the inner `BackupValidationService.ValidateData`
//   call. The wire layer needs a richer shape (`{canSubmit, errors:{…}}`) that
//   layers the composite OK-gate boolean on top of the field-keyed error
//   dictionary the React form's per-field validation hints consume.
//
// PT10 deltas vs PT9 call site:
//   * PT9 used `ErrorProvider.SetError(control, message)` side-effects to
//     surface errors on three WinForms controls (cmbProject / txtUserName /
//     txtTo). PT10's React UI consumes the field-keyed dictionary instead
//     (keys: `projectId`, `userName`, `destinationPath`, `selectedBooks`) —
//     the same keys data-contracts.md §3.13 (pre-round-4) used for the
//     nested-error wire shape.
//   * Errors-dictionary contract: contains a key/value entry ONLY for fields
//     that FAILED their rule. Passing fields are NOT present (no empty-string
//     placeholders). Empty-dest is the explicit exception: TS-061 pins
//     `canSubmit=false` AND NO `destinationPath` key (gate-only, no message).
//   * Errors-dictionary values are `%backup_*%` localize-key placeholders
//     resolved at the TS-side boundary (Localization-Guide.md backend pattern).
//
// Maps to: strategic-plan-backend.md §CAP-010 (M-009 validateBackup wire);
//   data-contracts.md §3.13 (the pre-round-4 wire-level BackupValidationResult
//   nested-errors shape the user's task spec carries forward — distinct from
//   the post-round-4 IsDestinationPathWritableResult that replaced it under
//   DEC-334).
// Behaviors: BHV-308 (composite OK-gate).

/// <summary>
/// Return envelope for <c>M-009 validateBackup</c>
/// (<see cref="BackupRestoreDataProvider.ValidateBackupAsync"/>). Carries the
/// composite OK-gate boolean (<see cref="CanSubmit"/>) and a field-keyed
/// dictionary of localize-key error placeholders (<see cref="Errors"/>).
/// </summary>
/// <remarks>
/// <para>
/// Wire shape (per strategic-plan-backend.md §CAP-010):
/// </para>
/// <code>
/// {
///   canSubmit: bool,
///   errors: {
///     projectId?: "%backup_resourceProjectNotBackupable%",
///     userName?: "%backup_userNameRequired%",
///     destinationPath?: "%backup_invalidDestPath%",
///     selectedBooks?: "%backup_atLeastOneBookRequired%"
///   }
/// }
/// </code>
/// <para>
/// <see cref="CanSubmit"/> is <see langword="true"/> iff:
/// </para>
/// <list type="bullet">
///   <item>CAP-014's <see cref="BackupValidationService.ValidateData"/> returned
///     <c>IsValid=true</c> (all three rules passed); AND</item>
///   <item>CAP-014's <see cref="BackupValidationService.IsOkGateOpen"/> returned
///     <see langword="true"/> (composite gate: book-count rule with Notes-
///     bypass + non-empty destination).</item>
/// </list>
/// <para>
/// <see cref="Errors"/> contains a key/value entry ONLY for failing fields. A
/// passing field is absent from the dictionary — empty strings are NEVER
/// surfaced. The empty-destinationPath edge case (TS-061 / VAL-B04) is the
/// explicit "gate-only" path: <see cref="CanSubmit"/> is <see langword="false"/>
/// AND the dictionary does NOT contain a <c>destinationPath</c> key.
/// </para>
/// </remarks>
internal sealed record ValidateBackupResponse
{
    /// <summary>
    /// Whether the BackupForm OK button should be enabled. <see langword="true"/>
    /// iff every gate in the composite chain (CAP-014's <c>ValidateData</c> +
    /// <c>IsOkGateOpen</c>) opens.
    /// </summary>
    public bool CanSubmit { get; init; }

    /// <summary>
    /// Field-keyed dictionary of localize-key error placeholders for FAILING
    /// fields only. Keys are wire-stable: <c>projectId</c>, <c>userName</c>,
    /// <c>destinationPath</c>, <c>selectedBooks</c>. Values are
    /// <c>%backup_*%</c> placeholders the TS-side <c>localize</c> helper
    /// resolves. Empty dictionary on full pass; never contains empty-string
    /// values.
    /// </summary>
    public IReadOnlyDictionary<string, string> Errors { get; init; } =
        new Dictionary<string, string>();
}
