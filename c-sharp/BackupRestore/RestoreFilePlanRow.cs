using Paratext.Data;

namespace Paranext.DataProvider.BackupRestore;

// === PORTED FROM PT9 ===
// Source: NEW record introduced by CAP-017 (EXT-200) to replace PT9's RestoreForm.dgvFiles
//         DataGridView rows. PT9 holds the row data implicitly in WinForms grid cells; PT10
//         emits a typed list of RestoreFilePlanRow records that the wire serializer can send
//         to the React UI.
// Maps to: extraction-plan.md §EXT-200 line 275-281 (record shape);
//          backend-alignment.md §EXT-200 line 226-232 (record shape — matches extraction);
//          strategic-plan-backend.md §CAP-017 line 446 (record signature in contract block);
//          data-contracts.md §3.4 line 591-616 (wire-side `RestoreFileEntry` — similar shape
//          but projected for JSON serialization; the C# record here lives on the data-provider
//          side and is mapped to RestoreFileEntry at the wire boundary).
//
// EXPLANATION: Concrete record (not stub) — the record's shape IS part of the contract under
// test. The 6 properties cover:
//   * FileName        — display name in column 1 (carried from SourceFile.FileName)
//   * ShouldRestore   — checkbox default (sourced from RestoreFileInfo.IsNormallyRestored
//                       per REVIEW-FLAG-2 — NOT per-state tooltip-switch defaults)
//   * State           — the 9-state enum (read by the UI to apply per-state UX rules)
//   * Col1Style       — "bold" | "regular" | "grayed" (per-state, matches PT9
//                       SetRestorableItemAppearance at RestoreForm.cs:579-616)
//   * Col2Style       — same string enumeration as Col1Style
//   * TooltipKey      — Localize key "RestoreForm_18..24" (PT9 RestoreForm.cs:629-666); or
//                       empty string for Undetermined / SourceDoesNotExist
/// <summary>
/// One row in the per-file restore plan emitted by <see cref="RestoreFilePlanService.Build"/>.
/// Each row encodes the data needed to render and toggle a single file's checkbox in the
/// RestoreForm file list. Per the BHV-318 / BHV-319 rendering matrix and the REVIEW-FLAG-2
/// anchor (extraction-plan.md §EXT-200), <see cref="ShouldRestore"/> is sourced from the
/// underlying <c>RestoreFileInfo.IsNormallyRestored</c> — NOT the per-state defaults in PT9's
/// tooltip switch.
/// </summary>
/// <remarks>
/// <para>
/// <see cref="Col1Style"/> and <see cref="Col2Style"/> are <see cref="string"/> rather than an
/// enum to match data-contracts.md / extraction-plan.md / backend-alignment.md and the gm-001..gm-008
/// JSON output literals. The three legal values are
/// <c>"bold"</c>, <c>"regular"</c>, and <c>"grayed"</c>. The React-side UI maps each value to a
/// CSS class (extraction-plan.md §EXT-200 line 344-346 "System.Drawing.Color.Gray → Tailwind
/// text-muted CSS class on the React side").
/// </para>
/// <para>
/// <see cref="TooltipKey"/> is a Localize key (e.g. <c>"RestoreForm_18"</c>) — the React side
/// looks up the user-visible string via the localize hook. Empty string means no tooltip
/// (PT9 RestoreForm.cs:665 for <see cref="PtwFileComparisonStates.Undetermined"/>; the
/// 9th state <see cref="PtwFileComparisonStates.SourceDoesNotExist"/> also has no explicit
/// PT9 tooltip — see CAP-017 test-writer plan Resolved Ambiguity §6).
/// </para>
/// </remarks>
public sealed record RestoreFilePlanRow(
    string FileName,
    bool ShouldRestore,
    PtwFileComparisonStates State,
    string Col1Style,
    string Col2Style,
    string TooltipKey
);
