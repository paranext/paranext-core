using Paratext.Data;
using SIL.Scripture;

namespace Paranext.DataProvider.BackupRestore;

// === PORTED FROM PT9 ===
// Source: Paratext/BackupRestore/RestoreForm.cs:680-694 (RestoreForm.CompareFiles consumer)
//         Paratext/ToolsMenu/DiffToolConfigurationInfo.cs:161-181 (ForGetPutTexts shared factory)
// Maps to: data-contracts.md §3.8 line 822-842 (FileCompareConfig / DiffToolDisplayOptions);
//          data-contracts.md §9 line 2268 (file table — CompareToBackupBridgeService.cs);
//          extraction-plan.md §EXT-204 line 432-488 (extraction stub + PT9 source);
//          strategic-plan-backend.md §CAP-020 line 496-513 (acceptance + token format spec).
// Behaviors: BHV-320 (dgvFiles right-click "View differences" click handler — entry point),
//            BHV-500 (FN-001 ForGetPutTexts canonical factory — PT10 read-only equivalent),
//            BHV-501 (FN-001 single-anchor invariant — PT10 should NOT replicate),
//            BHV-502 (DiffToolDisplayOptions flag enum — Restore uses ShowToolbar).
// Invariants: INV-C01 (read-only diff — structurally enforced by FileCompareConfig having no
//             putter fields; all 5 PT9 callers pass null IPutText, PT10 ships read-only
//             equivalent without parity loss),
//             INV-C02 (PT9 anchors both panes to one ScrText; PT10 should NOT replicate —
//             FileCompareConfig carries no ScrText fields).
// Scenarios: TS-085 (right-click happy path — non-DestDoesNotExist canViewDifferences row),
//            TS-086 (edge case — FilesAreSame; UI suffixes label; service still returns config),
//            TS-087 (edge case — DestDoesNotExist; CAP-005 throws CANNOT_COMPARE before
//            reaching this service in production; CAP-020 stays robust for defensive callers),
//            TS-097 (FN-001 — all 5 callers pass null IPutText; PT10 read-only equivalent),
//            TS-098 (FN-001 — ScrText1 == ScrText2 single-anchor; PT10 does NOT replicate).
// Extractions: EXT-204 (Complex — FN-001 cross-feature with Manage Books)
//
// PT9 source (for reference) — RestoreForm.cs:680-694 (CompareFiles):
//   public void CompareFiles(RestoreFileInfo sdfi)
//   {
//       VerseRef vref = new VerseRef(sdfi.SourceFile.BookNum, 1, 0, restorer.SourceSettings.Versification);
//       using (DifferencesToolForm form = new DifferencesToolForm(false))
//       {
//           DiffToolConfigurationInfo configuration = DiffToolConfigurationInfo.ForGetPutTexts(
//               restorer.ScrTextDestination,
//               Localizer.Str("RestoreForm_25", "File from Zip"),
//               sdfi.SourceFile, null,                  // null IPutText → read-only diff
//               Localizer.Str("RestoreForm_26", "File in Project"),
//               sdfi.DestinationFile, null,             // null IPutText → read-only diff
//               vref,
//               DiffToolDisplayOptions.ShowToolbar);
//           form.Setup(configuration);
//           form.ShowDialog();
//       }
//   }
//
// PT9 source (for reference) — DiffToolConfigurationInfo.cs:161-181 (ForGetPutTexts):
//   public static DiffToolConfigurationInfo ForGetPutTexts(
//       ScrText scrText,
//       string paneCaption1, IGetText textGetter1, IPutText textPutter1,
//       string paneCaption2, IGetText textGetter2, IPutText textPutter2,
//       VerseRef initialVerseRef,
//       DiffToolDisplayOptions displayOptions,
//       bool navToolbarEnabled = true)
//   {
//       var info = new DiffToolConfigurationInfo { ... };
//       info.ScrText1 = info.ScrText2 = scrText;          // ← INV-C02 single-anchor quirk
//       info.PaneCaption1 = paneCaption1;
//       info.GetText1 = textGetter1; info.PutText1 = textPutter1;  // null IPutText (INV-C01)
//       info.PaneCaption2 = paneCaption2;
//       info.GetText2 = textGetter2; info.PutText2 = textPutter2;  // null IPutText (INV-C01)
//       info.InitialVerseRef = initialVerseRef;
//       info.DisplayOptions = displayOptions;
//       info.NavToolbarEnabled = navToolbarEnabled;
//       return info;
//   }
//
// PT10 deltas vs PT9:
//   * PT9 returns the heavyweight DiffToolConfigurationInfo carrying IGetText / IPutText /
//     ScrText references. PT10 returns a thin FileCompareConfig record carrying only the data
//     the React DifferencesToolView component needs (label keys, source tokens, initial verse
//     ref split into bookId/chapter/verse primitives, displayOptions). The PT9 IGetText
//     instances are replaced by opaque LeftSourceToken / RightSourceToken strings — the
//     React component passes these back to a `getCompareSourceContent` command (M-011) to
//     fetch text content on demand.
//   * PT9 took `restorer.SourceSettings.Versification` implicitly from the Restorer instance;
//     PT10 is a stateless static so the caller passes `ScrVers sourceVersification` explicitly.
//   * PT9's `Localizer.Str("RestoreForm_25", "File from Zip")` resolved the string in-process;
//     PT10 returns the localize key as `"%restoreForm_fileFromZip%"` and the React renderer
//     resolves it via the localization service.
//   * INV-C01 (no putters): PT9's API has the null-IPutText pattern across all 5 callers;
//     PT10 doesn't have putter fields at all (structural enforcement).
//   * INV-C02 (single-anchor): PT9 sets `info.ScrText1 = info.ScrText2 = scrText`; PT10's
//     FileCompareConfig has NO ScrText fields — the `destination` parameter is used only as
//     a reserved hook for future sourceVersification defaulting if the caller passes null.
//   * Token format: `tok-src-{sessionId}-{fileId}` / `tok-dst-{sessionId}-{fileId}` where
//     `fileId = selectedRow.SourceFile.FileName` (the unique stable id within a session per
//     the ZIP central directory). Strategic-plan-backend.md §CAP-020 line 502.

/// <summary>
/// Builds the <see cref="FileCompareConfig"/> for the "View differences between backup and
/// current" feature, consumed by the B/R-owned React <c>DifferencesToolView</c> component
/// (Phase 3 / Decision 23 / FN-001 cross-feature surface).
/// </summary>
/// <remarks>
/// <para>
/// COMPLEX (FN-001 cross-feature): PT9's <c>DiffToolConfigurationInfo.ForGetPutTexts</c> is
/// called by 5 PT9 features (Backup-Restore, Manage Books copy, Manage Books import, Parallel
/// Passages, Text editor). PT10 chooses to ship a B/R-owned single React component that the
/// other features can adopt later (per @VVdovikov PR #264 RM-P2-002 / Decision 23). This
/// service is the B/R-side feed.
/// </para>
/// <para>
/// SIMPLE BODY (despite cross-feature complexity at the requirements layer): the production
/// implementation is a one-shot record-construction with no branches. The complexity lives
/// in the type design (FileCompareConfig) and the cross-feature coordination — both of which
/// are documented above.
/// </para>
/// </remarks>
internal static class CompareToBackupBridgeService
{
    /// <summary>
    /// Constructs the <see cref="FileCompareConfig"/> for a single dgvFiles row's "View differences"
    /// invocation. PT9 parity entry point: <c>RestoreForm.CompareFiles(sdfi)</c>
    /// (<c>RestoreForm.cs:680-694</c>).
    /// </summary>
    /// <param name="selectedRow">
    /// The row the user right-clicked. PT9 parity:
    /// the <c>sdfi</c> parameter to <c>RestoreForm.CompareFiles</c>. Must have a non-null
    /// <see cref="RestoreFileInfo.SourceFile"/> (PT9 invariant — only non-DestDoesNotExist
    /// rows reach this method per BHV-320; CAP-005 throws <c>CANNOT_COMPARE</c> for the
    /// DestDoesNotExist edge before this is called). When
    /// <see cref="RestoreFileInfo.DestinationFile"/> is null, the right-side token is still
    /// computed defensively (TS-087 — service stays robust).
    /// </param>
    /// <param name="destination">
    /// The destination project's <see cref="ScrText"/>. PT9 parity:
    /// <c>restorer.ScrTextDestination</c>. Reserved as a hook for future
    /// sourceVersification defaulting; for CAP-020 the record carries no <see cref="ScrText"/>
    /// fields (INV-C02 — PT10 does NOT replicate PT9's single-anchor quirk).
    /// </param>
    /// <param name="sourceVersification">
    /// The versification of the SOURCE (ZIP-side) file. PT9 parity:
    /// <c>restorer.SourceSettings.Versification</c>. Used internally to construct the
    /// initial <c>VerseRef</c>; the output exposes only the (bookId, chapter, verse) primitives.
    /// </param>
    /// <param name="sessionId">
    /// The opening restore session's id (M-002 <c>openRestoreSession</c> return value).
    /// Embedded into the output tokens so they are session-scoped — the source-token-map
    /// in the session registry can resolve them back to the source/dest file streams.
    /// </param>
    /// <returns>
    /// A populated <see cref="FileCompareConfig"/>. The result is consumed by the React
    /// DifferencesToolView component (Phase 3).
    /// </returns>
    public static FileCompareConfig BuildCompareConfig(
        RestoreFileInfo selectedRow,
        ScrText destination,
        ScrVers sourceVersification,
        string sessionId
    )
    {
        // EXPLANATION:
        // Pure record-construction over the inputs — no branches. The file-header block
        // above documents PT9 parity, BHV/INV/TS labels, and the token-format spec; the
        // notes below cover only the body-specific executable choices.
        //
        // The two locals factor a single null-safe dereference of `selectedRow.SourceFile`
        // — TS-087 defensive (the type allows null even though only non-DestDoesNotExist
        // rows reach this method in production per BHV-320). The `?? 0` and `?? ""`
        // defaults are both harmless: `Canon.BookNumberToId(0)` returns "" (non-book ZIP
        // entries like settings.xml), and an empty-string filename yields a still-unique
        // session-scoped token of the form `tok-src-{sessionId}-`.
        //
        // BOTH tokens key off `SourceFile.FileName` (NOT `DestinationFile.FileName`) —
        // TS-087 requires the right-token to remain computable when DestinationFile is
        // null. The gm-031 golden master also pins this source-side keying.
        int sourceBookNum = selectedRow.SourceFile?.BookNum ?? 0;
        string sourceFileName = selectedRow.SourceFile?.FileName ?? string.Empty;

        return new FileCompareConfig
        {
            LeftLabelKey = "%restoreForm_fileFromZip%",
            RightLabelKey = "%restoreForm_fileInProject%",
            InitialBookId = Canon.BookNumberToId(sourceBookNum),
            InitialChapter = 1,
            InitialVerse = 0,
            LeftSourceToken = $"tok-src-{sessionId}-{sourceFileName}",
            RightSourceToken = $"tok-dst-{sessionId}-{sourceFileName}",
            DisplayOptions = DiffToolDisplayOptions.ShowToolbar,
        };
    }
}
