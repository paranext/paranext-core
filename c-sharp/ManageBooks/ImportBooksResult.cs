using Paranext.DataProvider.ParatextUtils;

namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 CONTRACT ===
// Source: .context/features/manage-books/data-contracts.md Section 3.9
//   ImportBooksResult [Revised: 2026-04-14, Theme 8 — richer AlertEntry shape]
// Maps to: EXT-010 (BHV-105, BHV-405)
//
// STUB — Test Writer RED skeleton for CAP-010. Record type carries no runtime
// logic; implementer may keep this file as-is.
//
// Theme 8 replaces PT9's fire-and-forget Alert.Show surface with a structured
// AlertEntry[] list populated by AlertCapture during the import. Callers on
// the wire read Warnings and Errors to display per-file messages.

/// <summary>
/// Wire result for
/// <c>ManageBooksService.ImportBooksAsync(ImportBooksInput)</c> and the
/// underlying <c>ImportBooksOrchestrator.ImportBooks</c>. Success means the
/// import completed with zero error-level alerts; partial-success imports
/// (some files skipped with encoding errors, etc.) still return
/// <c>Success=true</c> with warnings populated, matching PT9 BHV-106
/// partial-success semantics.
///
/// <para>See data-contracts.md Section 3.9 for the wire contract and
/// <c>AlertCapture</c> for how <paramref name="Warnings"/> and
/// <paramref name="Errors"/> are populated from captured ParatextData
/// alerts.</para>
/// </summary>
/// <param name="Success">Whether the overall import succeeded — true when
///   zero error-level alerts were captured; false if a fatal precondition
///   fails AND is surfaced as an error, or if ImportSfmText.ImportBooks
///   returned false (e.g., WriteLock failure that survived the service
///   guard).</param>
/// <param name="ImportedCount">Number of books successfully imported.</param>
/// <param name="Warnings">Captured non-fatal alerts
///   (<see cref="PtxUtils.AlertLevel.Information"/>,
///   <see cref="PtxUtils.AlertLevel.Warning"/>,
///   <see cref="PtxUtils.AlertLevel.Question"/>).</param>
/// <param name="Errors">Captured fatal alerts
///   (<see cref="PtxUtils.AlertLevel.Error"/>).</param>
public record ImportBooksResult(
    bool Success,
    int ImportedCount,
    AlertEntry[] Warnings,
    AlertEntry[] Errors
);
