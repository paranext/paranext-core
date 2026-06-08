using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: CAP-010 partial-class fragment for M-009 validateBackup (per
//   strategic-plan-backend.md §CAP-010). This file SUPPLIES the
//   ValidateBackupAsync method onto the `BackupRestoreDataProvider`
//   partial-class declared in BackupRestoreDataProvider.cs (CAP-002).
//
// Mirrors the CAP-002 / CAP-003 / CAP-005 / CAP-007 / CAP-009 / CAP-011
// file-split convention: each capability owns its own partial-class fragment
// (one method per file) to avoid edit-collision with parallel agents.
//
// Wire-layer responsibilities (per strategic-plan-backend.md §CAP-010):
//   (1) Translate ValidateBackupRequest's six fields into two pure-function
//       calls against CAP-014:
//         a. BackupValidationService.ValidateData(isProtectedText, userName,
//            destinationPath) → first-failing-rule
//            (IsValid, ErrorKey, ErrorField).
//         b. BackupValidationService.IsOkGateOpen(result, selectedBookCount,
//            isNoteType, destinationPath) → composite OK-gate boolean.
//   (2) Assemble the field-keyed errors dictionary:
//        - If ValidateData failed → one entry: errors[ErrorField] = ErrorKey
//          (where ErrorField is one of "projectId", "userName",
//          "destinationPath").
//        - If ValidateData passed but the book-count gate fails
//          (selectedBookCount == 0 AND NOT isNoteType) → one entry:
//          errors["selectedBooks"] = "%backup_atLeastOneBookRequired%".
//        - If destinationPath is empty → NO error key is set per TS-061 /
//          VAL-B04 (gate-only, no message).
//        - Otherwise → empty dictionary (full pass).
//   (3) Return { CanSubmit: IsOkGateOpen, Errors }. No envelope; no error
//       conditions; no I/O.
//
// PT9 anchors:
//   * Paratext/BackupRestore/BackupForm.cs:220-249 (ValidateData) — the
//     in-process 3-rule chain, ErrorProvider-side-effect form.
//   * Paratext/BackupRestore/BackupForm.cs:98-115 (EnableDisableControls,
//     gate at lines 112-114) — the composite OK-gate combining ValidateData
//     with the book-count + non-empty-dest checks.
//
// PT10 deltas vs PT9:
//   * PT9 attached errors to WinForms controls via ErrorProvider.SetError;
//     PT10 returns a field-keyed dictionary the React form's per-field
//     validation hints consume.
//   * PT9 surfaced pre-localized English; PT10 returns %backup_*% placeholders
//     resolved on the TS side (Localization-Guide.md backend pattern).
//   * Async-shaped wire entry: the contract is async-shaped
//     (Task<ValidateBackupResponse>) for wire-stability with the other M-###
//     methods. The actual work — two pure-function calls + dictionary
//     assembly — is synchronous; we wrap with Task.FromResult.
//   * Selected-books error key: PT9 had NO equivalent rule inside ValidateData
//     (the empty-book gate lived ONLY in the OK-gate disjunction at
//     EnableDisableControls:112-114). PT10 surfaces a dedicated
//     "selectedBooks" entry in the errors dictionary so the React form can
//     show a per-field hint under the BookChooser — a deliberate UX win
//     called out by the task spec ("errors map only contains keys for
//     failing fields").
//
// Maps to: strategic-plan-backend.md §CAP-010 (M-009 validateBackup);
//   data-contracts.md §2.9 / §3.13 / §4.9 (the pre-round-4 wire shape the
//   user's task spec carries forward — distinct from the post-round-4
//   IsDestinationPathWritable* contracts).
// Behaviors: BHV-308 (composite OK-gate).
// Invariants: INV-B01, INV-B02, INV-B03, INV-B04 / VAL-B01..VAL-B04.

internal sealed partial class BackupRestoreDataProvider
{
    /// <summary>
    /// Wire entry point for M-009 validateBackup (strategic-plan-backend.md
    /// §CAP-010). Translates <paramref name="request"/> into two pure-function
    /// calls against CAP-014's <see cref="BackupValidationService"/> and
    /// assembles the wire shape <see cref="ValidateBackupResponse"/>.
    /// </summary>
    /// <remarks>
    /// <para>
    /// Preconditions: <c>None</c> — the method is a pure probe. Empty /
    /// malformed values produce a <see cref="ValidateBackupResponse"/> with
    /// <c>CanSubmit=false</c> and the appropriate <c>Errors</c> entry rather
    /// than throwing.
    /// </para>
    /// <para>
    /// Postconditions:
    /// </para>
    /// <list type="bullet">
    ///   <item><see cref="ValidateBackupResponse.CanSubmit"/> equals
    ///     <see cref="BackupValidationService.IsOkGateOpen"/> applied to the
    ///     output of <see cref="BackupValidationService.ValidateData"/>.</item>
    ///   <item><see cref="ValidateBackupResponse.Errors"/> contains a
    ///     key/value entry ONLY for failing fields. The keys are
    ///     wire-stable: <c>projectId</c>, <c>userName</c>,
    ///     <c>destinationPath</c>, <c>selectedBooks</c>.</item>
    ///   <item>The empty-<c>destinationPath</c> edge case (TS-061 / VAL-B04)
    ///     produces <c>CanSubmit=false</c> AND NO <c>destinationPath</c>
    ///     key — gate-only, no message.</item>
    ///   <item>Side-effect free with respect to anything outside the in-process
    ///     return envelope.</item>
    /// </list>
    /// <para>
    /// Error conditions: <c>None</c> — the method never throws. All failure
    /// modes are encoded in the <see cref="ValidateBackupResponse.Errors"/>
    /// dictionary plus the <see cref="ValidateBackupResponse.CanSubmit"/>
    /// boolean.
    /// </para>
    /// </remarks>
    /// <param name="request">Validation request payload. See
    /// <see cref="ValidateBackupRequest"/>.</param>
    /// <param name="cancellationToken">Cancellation token from the JSON-RPC
    /// dispatcher. Currently unused — validation is two pure function calls.
    /// Reserved for future asynchronicity.</param>
    /// <returns>A populated <see cref="ValidateBackupResponse"/>.</returns>
    public Task<ValidateBackupResponse> ValidateBackupAsync(
        ValidateBackupRequest request,
        CancellationToken cancellationToken = default
    )
    {
        // Reserved for future asynchronicity — validation is two pure function calls.
        _ = cancellationToken;

        // Step 1 — first-failing-rule chain (CAP-014 / EXT-102).
        // ValidateData short-circuits at the first failure; ordering is
        // resource-project > empty userName > invalid dest-path.
        BackupValidationResult validation = BackupValidationService.ValidateData(
            request.IsProtectedText,
            request.UserName,
            request.DestinationPath
        );

        // Step 2 — composite OK-gate (CAP-014 / EXT-103). Combines the rule
        // chain's IsValid with the book-count rule (Notes-bypass per INV-B03)
        // and the non-empty destination requirement (VAL-B04 — gate-only).
        bool canSubmit = BackupValidationService.IsOkGateOpen(
            validation,
            request.SelectedBookCount,
            request.IsNoteType,
            request.DestinationPath
        );

        // Step 3 — assemble the field-keyed errors dictionary.
        // EXPLANATION:
        // The dictionary contains a key/value entry ONLY for failing fields.
        // Branches in priority order:
        //   (a) ValidateData failed → surface the single first-failing-rule
        //       entry (errors[ErrorField] = ErrorKey). First-failing-rule
        //       precedence is inherited from CAP-014 — rule 1 short-circuits
        //       before rule 2/3, so empty userName + invalid dest never both
        //       surface alongside a resource-project failure (Test #9 pins).
        //   (b) ValidateData passed but the book-count rule fails for a non-
        //       Notes project → surface a dedicated "selectedBooks" entry.
        //       This is a PT10-only wire-shape addition; PT9 enforced the
        //       book-count rule only as an OK-button gate, never via
        //       ErrorProvider. The React form consumes this entry to render a
        //       per-field hint under the BookChooser.
        //   (c) Empty destinationPath (VAL-B04 / TS-061) → NO error key. The
        //       OK gate is closed by IsOkGateOpen's non-empty check; this is
        //       the explicit "gate-only, no message" branch. Test #8 pins
        //       that the dictionary does NOT contain a destinationPath key.
        //   (d) Otherwise (full pass) → empty dictionary (no zero-value keys).
        var errors = new Dictionary<string, string>();
        if (!validation.IsValid)
        {
            errors[validation.ErrorField] = validation.ErrorKey;
        }
        else if (request.SelectedBookCount == 0 && !request.IsNoteType)
        {
            errors["selectedBooks"] = "%backup_atLeastOneBookRequired%";
        }

        return Task.FromResult(
            new ValidateBackupResponse { CanSubmit = canSubmit, Errors = errors }
        );
    }
}
