namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: data-contracts.md §3.4 — the wire-stable projection of PT9's
//   `RestoreFileInfo` (LB-PD-08). PT9 held this state implicitly in
//   `RestoreForm.dgvFiles` DataGridView rows; PT10 emits a typed list of
//   `RestoreFileEntry` records the wire serializer can send to the React UI.
//
// The wire surface deliberately differs from PT10's INTERNAL
// `RestoreFileInfo` / `RestoreFilePlanRow` records:
//   * The internal `RestoreFilePlanRow` (CAP-017) is the column-styling/tooltip-
//     key projection consumed by the RestoreForm renderer; it carries
//     `Col1Style` / `Col2Style` / `TooltipKey` but no opaque session id, no CRC,
//     no `canViewDifferences` gate.
//   * `RestoreFileEntry` (THIS file, CAP-003) is the WIRE projection consumed
//     by `RestoreRequest.selectedFileIds` and `compareBackupFile({fileId})` — it
//     carries an opaque session-scoped `Id`, the wire-side ComparisonResult, the
//     auto-tick default (sourced per REVIEW-FLAG-2 from
//     `RestoreFileInfo.IsNormallyRestored`), the "view differences" gate
//     (BHV-320), the tooltip localize key, and source/destination CRCs for the
//     BHV-322 raw-CRC filter (REVIEW-FLAG-7).
//
// The two shapes are projected one to the other by the M-002 metadata builder
// (this is CAP-003's job): the builder uses `RestoreFilePlanService.Build` to
// get per-row column styles + tooltip key + auto-tick default, then composes
// them with a freshly-minted session-scoped `Id` and the source/destination
// CRCs into a `RestoreFileEntry`.
//
// Maps to: data-contracts.md §3.4 (C# block).

/// <summary>
/// One row in the RestoreForm file list, projected to a wire-stable shape.
/// Mirrors PT9 <c>RestoreFileInfo</c> (LB-PD-08) projected for JSON-RPC over
/// the WebSocket boundary.
/// </summary>
/// <remarks>
/// <see cref="Id"/> is session-scoped — caller passes it back via
/// <c>RestoreRequest.SelectedFileIds</c> and
/// <c>CompareBackupFileRequest.FileId</c>. Format is implementation-defined
/// (e.g., the ZIP-entry filename or a synthetic short id); CAP-003 fixes the
/// format in tests by asserting only that it is non-empty and stable within
/// the session.
/// </remarks>
internal sealed record RestoreFileEntry
{
    /// <summary>
    /// Opaque id stable within the session. Used by
    /// <c>RestoreRequest.SelectedFileIds</c>.
    /// </summary>
    public string Id { get; init; } = string.Empty;

    /// <summary>
    /// Display name for column 1 ("Files In Backup"). Per-file display string
    /// per PT9 <c>RestoreForm.ShowFileList</c> (BHV-318 / EXT-200).
    /// </summary>
    public string SourceDisplayName { get; init; } = string.Empty;

    /// <summary>
    /// Display name for column 2 ("Files On Hard Disk"). Empty/null when the
    /// file does not exist on disk.
    /// </summary>
    public string? DestinationDisplayName { get; init; }

    /// <summary>
    /// Per-file comparison state (BHV-108 / BHV-503 / INV-A07..A10).
    /// </summary>
    public ComparisonResult ComparisonResult { get; init; }

    /// <summary>
    /// PT9 <c>IsNormallyRestored</c> — controls the default
    /// <c>RestoreThisFile</c> checkbox (BHV-108 / INV-A08 / INV-A09). Sourced
    /// per REVIEW-FLAG-2 from <see cref="RestoreFileInfo.IsNormallyRestored"/>
    /// — NOT from PT9's per-state tooltip-switch defaults.
    /// </summary>
    public bool IsNormallyRestored { get; init; }

    /// <summary>
    /// Whether comparing this file against the current on-disk file is
    /// supported (BHV-320 source-property gate). Drives the "View differences"
    /// vs "Cannot compare" context-menu item.
    /// </summary>
    public bool CanViewDifferences { get; init; }

    /// <summary>
    /// Tooltip localize key (RestoreForm_18..24 mapping per BHV-319 / EXT-200).
    /// Empty string when the state has no tooltip
    /// (<see cref="ComparisonResult.Undetermined"/>,
    /// <see cref="ComparisonResult.SourceDoesNotExist"/>).
    /// </summary>
    public string TooltipKey { get; init; } = string.Empty;

    /// <summary>
    /// Source-side CRC for the BHV-322 Hide-Same-Files filter (REVIEW-FLAG-7).
    /// </summary>
    public uint SourceCrc { get; init; }

    /// <summary>
    /// Destination-side CRC — null when the destination file does not exist on
    /// disk (i.e., <see cref="ComparisonResult"/> is
    /// <see cref="ComparisonResult.DestDoesNotExist"/>).
    /// </summary>
    public uint? DestinationCrc { get; init; }
}
