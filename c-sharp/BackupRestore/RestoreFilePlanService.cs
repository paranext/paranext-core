using System;
using System.Collections.Generic;
using System.Linq;
using Paratext.Data;

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
/// Builds the per-file restore plan and gates the user's checkbox-toggle interactions for the
/// RestoreForm file list. EXT-200 extraction (Worker pattern). Pure-decision-table logic — no
/// I/O, no state.
/// </summary>
/// <remarks>
/// <para>
/// <b>REVIEW-FLAG-2 anchor</b>: <see cref="RestoreFilePlanRow.ShouldRestore"/> is sourced from
/// <see cref="RestoreFileInfo.IsNormallyRestored"/> — NOT from PT9's per-state
/// <c>RestoreThisFile</c> defaults in the tooltip switch (RestoreForm.cs:623-668). PT9 itself
/// overrides those defaults at RestoreForm.cs:669; PT10 skips the intermediate step entirely.
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
    public List<RestoreFilePlanRow> Build(IEnumerable<RestoreFileInfo> allFiles)
    {
        return allFiles.Select(BuildRow).ToList();
    }

    private static RestoreFilePlanRow BuildRow(RestoreFileInfo file)
    {
        var (col1Style, col2Style) = MapColumnStyles(file.ComparisonResult);
        return new RestoreFilePlanRow(
            FileName: file.SourceFile?.FileName ?? string.Empty,
            // REVIEW-FLAG-2: source of truth is IsNormallyRestored, NOT per-state tooltip-switch
            // defaults (PT9 RestoreForm.cs:669 overrides those defaults with IsNormallyRestored
            // anyway; PT10 skips the intermediate step).
            ShouldRestore: file.IsNormallyRestored,
            State: file.ComparisonResult,
            Col1Style: col1Style,
            Col2Style: col2Style,
            TooltipKey: MapTooltipKey(file.ComparisonResult)
        );
    }

    // EXPLANATION:
    // Per-state column styling for the dgvFiles grid (PT9 RestoreForm.cs:579-616
    // SetRestorableItemAppearance). The three legal style strings are:
    //   "bold"    — Style.Font = boldFont
    //   "regular" — Style.Font = regularFont (or default — both render the same way)
    //   "grayed"  — Style.ForeColor = SystemColors.GrayText
    // PT9 mixes Font (bold/regular) and ForeColor (grayed) — the PT10 contract collapses these
    // into a single per-column style string because the React UI maps each value to a Tailwind
    // CSS class (extraction-plan.md §EXT-200 line 344-346).
    //
    // `SourceDoesNotExist` has NO `case` in the PT9 switch — falls through to the default
    // (regular/regular). Test-writer plan Resolved Ambiguity §3 documents the audit trail;
    // extraction-plan.md line 327 ("col2Bold = true") is a comment-level error in that artifact.
    private static (string Col1Style, string Col2Style) MapColumnStyles(
        PtwFileComparisonStates state
    )
    {
        return state switch
        {
            PtwFileComparisonStates.FilesAreSame => ("grayed", "grayed"),
            PtwFileComparisonStates.DestDoesNotExist => ("bold", "grayed"),
            PtwFileComparisonStates.Undetermined => ("regular", "regular"),
            PtwFileComparisonStates.SourceIsNewer => ("bold", "regular"),
            PtwFileComparisonStates.SourceIsOlder => ("regular", "bold"),
            PtwFileComparisonStates.FilesAreSameVersion => ("grayed", "grayed"),
            PtwFileComparisonStates.SourceIsHigherVersion => ("bold", "regular"),
            PtwFileComparisonStates.DestIsHigherVersion => ("grayed", "bold"),
            // Default covers SourceDoesNotExist + any future enum additions: both columns
            // retain default font (regular) and default color (no GrayText override).
            _ => ("regular", "regular"),
        };
    }

    // EXPLANATION:
    // Per-state tooltip Localize key (PT9 RestoreForm.cs:623-666
    // DetermineRestoreEligibilityZip). Keys are passed verbatim to the React-side localize hook
    // (the wire layer does NOT resolve them server-side here — the data provider returns the
    // key, and the React consumer looks up the user-visible string).
    //
    // `Undetermined` and `SourceDoesNotExist` have no PT9 tooltip — emit empty string.
    private static string MapTooltipKey(PtwFileComparisonStates state)
    {
        return state switch
        {
            PtwFileComparisonStates.DestDoesNotExist => "RestoreForm_18",
            PtwFileComparisonStates.FilesAreSame => "RestoreForm_19",
            PtwFileComparisonStates.FilesAreSameVersion => "RestoreForm_20",
            PtwFileComparisonStates.SourceIsHigherVersion => "RestoreForm_21",
            PtwFileComparisonStates.DestIsHigherVersion => "RestoreForm_22",
            PtwFileComparisonStates.SourceIsNewer => "RestoreForm_23",
            PtwFileComparisonStates.SourceIsOlder => "RestoreForm_24",
            // Undetermined (PT9 RestoreForm.cs:665 sets "") and SourceDoesNotExist (no PT9
            // case) both have no tooltip.
            _ => string.Empty,
        };
    }

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
    public bool OkToToggleOn(RestoreFileInfo file, Func<string, bool> downgradeConfirmCallback)
    {
        // PT9 parity (RestoreForm.cs:765-774): the prompt is gated on exactly one state.
        // For the other 8 states, toggling on is always allowed without confirmation.
        if (file.ComparisonResult != PtwFileComparisonStates.DestIsHigherVersion)
            return true;

        // VAL-B07: DestIsHigherVersion = "downgrade" — require user confirmation. The callback
        // receives the localize key "RestoreForm_33" (PT9 line 770) and returns Yes/No.
        return downgradeConfirmCallback("RestoreForm_33");
    }
}
