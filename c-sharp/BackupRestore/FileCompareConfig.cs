namespace Paranext.DataProvider.BackupRestore;

// === PORTED FROM PT9 ===
// Source: Paratext/ToolsMenu/DiffToolConfigurationInfo.cs:161-181 ForGetPutTexts (factory)
//         Paratext/ToolsMenu/DiffToolConfigurationInfo.cs:240-249 DiffToolDisplayOptions
//         Paratext/BackupRestore/RestoreForm.cs:680-694 CompareFiles (consumer)
// Maps to: data-contracts.md §3.8 line 822-842 (CompareBackupFileResult / FileCompareConfig /
//          DiffToolDisplayOptions / CompareBackupFileErrorCode)
// Behaviors: BHV-500 (ForGetPutTexts canonical factory), BHV-501 (single-anchor invariant),
//            BHV-502 (DiffToolDisplayOptions flag enum), BHV-320 (entry point via right-click)
// Invariants: INV-C01 (read-only diff — all 5 PT9 callers pass null IPutText; PT10 ships
//             read-only-only equivalent — structurally enforced by this record having no
//             putter fields), INV-C02 (PT9 anchors both panes to one ScrText; PT10 should
//             NOT replicate — this record has no ScrText field).
// Extractions: EXT-204 (CompareToBackupBridgeService — FN-001 cross-feature surface)
//
// PT10 deltas vs PT9:
//   * PT9 returned a heavyweight `DiffToolConfigurationInfo` instance with IGetText /
//     IPutText / ScrText references baked in (5+ fields wide). PT10 returns a thin
//     `FileCompareConfig` record carrying only the data the React DifferencesToolView
//     component needs to render. The PT9 IGetText/IPutText instances are replaced by
//     opaque `LeftSourceToken` / `RightSourceToken` strings — the React component passes
//     these back to a `getCompareSourceContent` command (M-011) to fetch text content
//     on demand.
//   * PT9 used VerseRef directly; PT10 splits into three primitive fields
//     (`InitialBookId`, `InitialChapter`, `InitialVerse`) for JSON wire-friendliness.
//   * PT9 enum `DiffToolDisplayOptions` has 5 values (None, ShowToolbar, ShowScrTextChooser,
//     ShowRevisionChooser, ShowUncommonControls). PT10 ships only the two values the
//     Backup/Restore flow can produce (ShowToolbar, ShowToolbarAndUncommon — the latter
//     for Manage Books-style callers in future ports). The ScrText/Revision chooser
//     options are out of scope for B/R Phase 3 (FN-003 Mercurial dependency, see
//     forward-notes.md FN-001).

/// <summary>
/// Configuration for the "View differences between backup and current" feature, returned by
/// <see cref="CompareToBackupBridgeService.BuildCompareConfig"/> and consumed by the
/// B/R-owned React <c>DifferencesToolView</c> component (Phase 3, FN-001).
/// </summary>
/// <remarks>
/// <para>
/// <b>Read-only diff (INV-C01)</b>: The record has no putter / writer fields at all — all 5 PT9
/// callers of <c>DiffToolConfigurationInfo.ForGetPutTexts</c> pass <c>null</c> IPutText, so PT10
/// ships a read-only-only equivalent. The structural absence of putter fields IS the invariant
/// enforcement.
/// </para>
/// <para>
/// <b>Single-anchor avoided (INV-C02)</b>: The record has no ScrText fields. PT9's
/// <c>DiffToolConfigurationInfo.ForGetPutTexts</c> sets <c>info.ScrText1 = info.ScrText2 = scrText</c>
/// — an implementation quirk for the memento/title path. PT10 should NOT replicate this; the
/// record carries only the data the diff renderer needs.
/// </para>
/// <para>
/// <b>Source tokens</b>: <see cref="LeftSourceToken"/> and <see cref="RightSourceToken"/> are
/// opaque handles the React DifferencesToolView component uses to fetch file content on demand
/// via the M-011 <c>getCompareSourceContent</c> command. The format is internal to the backend;
/// the wire shape is <c>tok-src-{sessionId}-{fileId}</c> / <c>tok-dst-{sessionId}-{fileId}</c>
/// per CAP-020 / strategic-plan-backend.md §CAP-020. Within a session, the tokens are stable
/// across repeated calls with the same inputs (deterministic).
/// </para>
/// <para>
/// <b>Initial verse-ref</b>: Split into three primitives instead of a <see cref="SIL.Scripture.VerseRef"/>
/// for JSON wire-friendliness. PT9 parity: <c>RestoreForm.cs:681</c> constructs
/// <c>new VerseRef(sdfi.SourceFile.BookNum, 1, 0, ...)</c>; PT10 keeps the (chapter=1, verse=0)
/// pair byte-for-byte to preserve the diff renderer's initial anchor.
/// </para>
/// </remarks>
public sealed record FileCompareConfig
{
    /// <summary>
    /// Left-pane label localize key. PT9 source: <c>RestoreForm_25</c> ("File from Zip").
    /// Opaque to the C# layer — the React component resolves the key via the localization
    /// service. The leading <c>%</c> and trailing <c>%</c> are the
    /// Platform.Bible localize-key wire marker.
    /// </summary>
    public string LeftLabelKey { get; init; } = string.Empty;

    /// <summary>
    /// Right-pane label localize key. PT9 source: <c>RestoreForm_26</c> ("File in Project").
    /// Opaque to the C# layer — see <see cref="LeftLabelKey"/>.
    /// </summary>
    public string RightLabelKey { get; init; } = string.Empty;

    /// <summary>
    /// Initial book id (3-letter abbreviation per ParatextData <c>Canon.BookNumberToId</c>) for
    /// the diff display's initial verse anchor. PT9 parity: derived from
    /// <c>sdfi.SourceFile.BookNum</c> in <c>RestoreForm.cs:681</c>. Empty when the source
    /// file is a non-book entry (e.g., settings.xml, custom styles).
    /// </summary>
    public string InitialBookId { get; init; } = string.Empty;

    /// <summary>
    /// Initial chapter for the diff display's verse anchor. PT9 parity: hard-coded
    /// <c>1</c> in <c>new VerseRef(BookNum, 1, 0, ...)</c> at <c>RestoreForm.cs:681</c>.
    /// </summary>
    public int InitialChapter { get; init; }

    /// <summary>
    /// Initial verse for the diff display's verse anchor. PT9 parity: hard-coded
    /// <c>0</c> in <c>new VerseRef(BookNum, 1, 0, ...)</c> at <c>RestoreForm.cs:681</c>.
    /// Zero means "before verse 1" — the renderer anchors at the chapter heading.
    /// </summary>
    public int InitialVerse { get; init; }

    /// <summary>
    /// Opaque session-scoped token for the LEFT (source / ZIP-side) file content. The
    /// React DifferencesToolView component passes this token to the M-011
    /// <c>getCompareSourceContent</c> command to fetch the file's text on demand.
    /// Format: <c>tok-src-{sessionId}-{fileId}</c> per CAP-020 acceptance test spec.
    /// </summary>
    public string LeftSourceToken { get; init; } = string.Empty;

    /// <summary>
    /// Opaque session-scoped token for the RIGHT (destination / on-disk) file content.
    /// See <see cref="LeftSourceToken"/>. Format:
    /// <c>tok-dst-{sessionId}-{fileId}</c> per CAP-020 acceptance test spec.
    /// </summary>
    public string RightSourceToken { get; init; } = string.Empty;

    /// <summary>
    /// Display options for the diff renderer. PT9 parity: <c>RestoreForm.cs:692</c> passes
    /// <c>DiffToolDisplayOptions.ShowToolbar</c>. PT10's B/R flow always produces
    /// <see cref="DiffToolDisplayOptions.ShowToolbar"/>; the other value
    /// (<see cref="DiffToolDisplayOptions.ShowToolbarAndUncommon"/>) exists for future
    /// non-B/R callers (e.g., Manage Books).
    /// </summary>
    public DiffToolDisplayOptions DisplayOptions { get; init; } =
        DiffToolDisplayOptions.ShowToolbar;
}
