using Paranext.DataProvider.ParatextUtils;

namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 CONTRACT ===
// Source: .context/features/manage-books/data-contracts.md Section 3.2
//   [Revised: 2026-04-30, Theme 2 — AlertEntry[] for warnings/errors]
// Maps to: EXT-002 (BHV-402, BHV-407)
//
// Theme 2 (2026-04-30): replaces the original `List<string>` warnings/errors
// with `AlertEntry[]` so CreateBooks shares the structured Theme-8 alert shape
// already used by ImportBooksResult. AlertCapture wraps the CreateBooks
// orchestrator so any ParatextData Alert.Show calls during model lookup,
// permission checks, or PutText surface as captured AlertEntry records.
// LastCreatedBookNum is int? — serializer emits it as undefined / field omission
// when null (matches the TypeScript `lastCreatedBookNum?: number` optional).

/// <summary>
/// Result of a book creation operation. LastCreatedBookNum is the book
/// number of the most recent successful create, used for post-dialog
/// navigation (INV-026 / INV-C13). Null/undefined when nothing was created.
///
/// <para>See data-contracts.md Section 3.2 for the wire contract and
/// data-contracts.md Section 3.9 (ImportBooksResult) for the
/// <see cref="AlertEntry"/> shape definition shared with this record.</para>
/// </summary>
/// <param name="Success">Whether the overall create succeeded — true when
///   no error-level alerts were captured AND at least one book was created
///   (or zero books requested).</param>
/// <param name="LastCreatedBookNum">Highest canonical book number created
///   in this call, or null when no book was created.</param>
/// <param name="Warnings">Captured non-fatal alerts
///   (Information, Warning, Question levels).</param>
/// <param name="Errors">Captured fatal alerts (Error level).</param>
/// <param name="CreatedCount">Number of books actually created.</param>
public record CreateBooksResult(
    bool Success,
    int? LastCreatedBookNum,
    AlertEntry[] Warnings,
    AlertEntry[] Errors,
    int CreatedCount
);
