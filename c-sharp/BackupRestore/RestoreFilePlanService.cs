using System;
using System.Collections.Generic;

namespace Paranext.DataProvider.BackupRestore;

// === PORTED FROM PT9 ===
// Source: Paratext/BackupRestore/RestoreForm.cs:461-504 (ShowFileList),
//                                              :579-616 (SetRestorableItemAppearance),
//                                              :623-670 (DetermineRestoreEligibilityZip),
//                                              :765-774 (OkToRestoreFile)
// Complexity: Complex (132 LOC across 4 PT9 methods; 9-state × 2-column × 3-style matrix +
//             downgrade-confirm gate).
// Maps to: data-contracts.md §3.4 / §3.5 (RestoreFileEntry + ComparisonResult enum);
//          extraction-plan.md §EXT-200 line 261-347 (extraction stub);
//          backend-alignment.md §EXT-200 line 217-236 (final contract signature);
//          strategic-plan-backend.md §CAP-017 line 439-456 (acceptance test + REVIEW-FLAG-2 anchor).
// Behaviors: BHV-318 (per-state column rendering),
//            BHV-319 (auto-tick + downgrade-confirm flow),
//            BHV-322 (raw-CRC Hide-Same-Files filter — service exposes the data, UI applies the filter).
// Invariants: INV-A09 (auto-tick set = {DestDoesNotExist, SourceIsNewer, SourceIsHigherVersion}
//             — sourced from RestoreFileInfo.IsNormallyRestored per REVIEW-FLAG-2),
//             VAL-B07 (DestIsHigherVersion toggle requires downgrade confirmation).
//
// EXPLANATION: Worker pattern per backend-alignment.md §EXT-200 line 217 ("EXT-200
// (RestoreFilePlanService) is the exception — it owns the per-row plan + downgrade-callback
// orchestration → instance Worker"). Instance class (not static) so a single instance can
// hold per-session state (currently none, but reserved for future "always allow downgrades
// for this session" toggles — see VAL-B07 rationale in business-rules.md).
//
// REVIEW-FLAG-2 ANCHOR (extraction-plan.md §EXT-200 line 288-290):
// "PT10 MUST use IsNormallyRestored as source of truth for the ShouldRestore field. DO NOT
//  use the per-state defaults shown in the tooltip switch — those are tooltip-only."
// The implementer MUST source `RestoreFilePlanRow.ShouldRestore` from
// `RestoreFileInfo.IsNormallyRestored` — NOT from the per-state RestoreThisFile defaults
// PT9 sets in DetermineRestoreEligibilityZip (RestoreForm.cs:623-668). PT9's line 669
// (`sdfi.RestoreThisFile = sdfi.IsNormallyRestored;`) overrides those defaults; PT10 should
// skip the intermediate step entirely.

/// <summary>
/// Builds the per-file restore plan + gates the user's checkbox-toggle interactions on the
/// RestoreForm file list. EXT-200 extraction (Worker pattern). RED-state stub — the actual
/// implementation is owned by the implementer agent per the CAP-017 strategic plan.
/// </summary>
/// <remarks>
/// <para>
/// <b>RED-state stub</b>: Both <see cref="Build"/> and <see cref="OkToToggleOn"/> currently
/// throw <see cref="NotImplementedException"/>. The implementer's job is to fill in the body
/// such that the CAP-017 tests pass.
/// </para>
/// <para>
/// <b>REVIEW-FLAG-2 anchor</b>: The implementer MUST source
/// <see cref="RestoreFilePlanRow.ShouldRestore"/> from
/// <see cref="RestoreFileInfo.IsNormallyRestored"/> — NOT from PT9's per-state
/// <c>RestoreThisFile</c> defaults in the tooltip switch (RestoreForm.cs:623-668).
/// </para>
/// </remarks>
internal sealed class RestoreFilePlanService
{
    /// <summary>
    /// Builds a per-row file plan from a sequence of <see cref="RestoreFileInfo"/> entries.
    /// One row per input file, in input order. Each row carries the filename + the per-column
    /// style (bold/regular/grayed) + the tooltip key + the auto-tick default.
    /// </summary>
    /// <param name="allFiles">All files to include in the restore plan, in the desired
    /// display order. PT9 parity: <c>RestoreForm.ShowFileList</c> sorts the input via
    /// <c>RestoreFileInfo.CompareTo</c> (identical files sort after modified files —
    /// INV-A10); the caller of <c>Build</c> is responsible for that ordering.</param>
    /// <returns>One <see cref="RestoreFilePlanRow"/> per input file, in input order.</returns>
    public List<RestoreFilePlanRow> Build(IEnumerable<RestoreFileInfo> allFiles) =>
        throw new NotImplementedException(
            "RED-state stub — implementer (CAP-017) fills in the 9-state matrix + IsNormallyRestored auto-tick."
        );

    /// <summary>
    /// Checks whether a user's attempt to tick a row's checkbox should be allowed. For 8 of
    /// the 9 comparison states the answer is unconditionally <c>true</c>. The only state
    /// requiring confirmation is <see cref="Paratext.Data.PtwFileComparisonStates.DestIsHigherVersion"/>
    /// — restoring a lower-version backup file over a higher-version on-disk file is a
    /// "downgrade" per VAL-B07, and the user must confirm via the downgrade prompt.
    /// </summary>
    /// <param name="file">The file whose checkbox the user is attempting to tick on.</param>
    /// <param name="downgradeConfirmCallback">Invoked once with the localize key
    /// <c>"RestoreForm_33"</c> (the PT9 prompt at RestoreForm.cs:770) when confirmation is
    /// required. Returns <c>true</c> if the user confirmed (Yes), <c>false</c> otherwise (No).
    /// MUST NOT be invoked when the state does NOT require confirmation.</param>
    /// <returns><c>true</c> if the toggle-on is allowed; <c>false</c> if the user declined the
    /// downgrade prompt.</returns>
    public bool OkToToggleOn(RestoreFileInfo file, Func<string, bool> downgradeConfirmCallback) =>
        throw new NotImplementedException(
            "RED-state stub — implementer (CAP-017) fills in the DestIsHigherVersion downgrade gate."
        );
}
