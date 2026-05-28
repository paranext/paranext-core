namespace Paranext.DataProvider.BackupRestore;

// === PORTED FROM PT9 ===
// Source: Paratext/ToolsMenu/DiffToolConfigurationInfo.cs:240-249 (PT9 enum declaration)
// Maps to: data-contracts.md §3.8 line 808-810 (TypeScript wire form) /
//          line 840 (C# enum form)
// Behaviors: BHV-502 (DiffToolDisplayOptions flag enum)
// Extractions: EXT-204 (CompareToBackupBridgeService consumes this enum)
//
// PT10 deltas vs PT9:
//   * PT9 declares 5 values: None, ShowToolbar, ShowScrTextChooser,
//     ShowRevisionChooser, ShowUncommonControls. PT10 ships only the 2 values the
//     in-scope callers (Backup/Restore + future Manage Books) can produce. The
//     ScrText / Revision chooser options are out of scope for B/R Phase 3
//     (FN-003 Mercurial dependency — see forward-notes.md FN-001).
//   * PT9 declares it as a [Flags] enum (some callers combine ShowToolbar |
//     ShowUncommonControls). PT10 collapses the two PT9 flag combinations into
//     two discrete enum values (ShowToolbar / ShowToolbarAndUncommon) — what
//     matters at the React component boundary is the combined display behavior,
//     not the underlying flag bits.

/// <summary>
/// PT10 subset of PT9's <c>DiffToolDisplayOptions</c> flag enum
/// (<c>DiffToolConfigurationInfo.cs:240-249</c>). BHV-502 — PT10 ships only the 2 values
/// the in-scope callers (Backup/Restore + future Manage Books) can produce. See the
/// <c>// === PORTED FROM PT9 ===</c> block for the full PT9 → PT10 mapping.
/// </summary>
public enum DiffToolDisplayOptions
{
    /// <summary>
    /// Show the navigation toolbar only. PT9 parity: B/R + Parallel Passages + Text editor
    /// pass this value (<c>RestoreForm.cs:692</c>, <c>ParallelPassagesTool.cs:762-766</c>,
    /// <c>TextForm.cs:2166-2168</c>).
    /// </summary>
    ShowToolbar,

    /// <summary>
    /// Show the navigation toolbar plus uncommon-controls panel. PT9 parity: Manage Books
    /// (CopyBooksForm / ImportBooksForm) passes <c>ShowToolbar | ShowUncommonControls</c>
    /// (<c>CopyBooksForm.cs:227-229</c>, <c>ImportBooksForm.cs:192-194</c>). PT10 collapses
    /// the two PT9 flags into one value here because the combined display behavior is
    /// what matters at the React component boundary.
    /// </summary>
    ShowToolbarAndUncommon,
}
