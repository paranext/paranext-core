using Paranext.DataProvider.ParatextUtils;

namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 CONTRACT ===
// Source: .context/features/manage-books/data-contracts.md Section 3.4
//   [Revised: 2026-04-30, Theme 2 — AlertEntry[] for warnings/errors]
// Maps to: EXT-006 (BHV-403, BHV-600, BHV-601)
//
// Theme 2 (2026-04-30): replaces the original `List<string>` warnings/errors
// with `AlertEntry[]` so CopyBooks shares the structured Theme-8 alert shape
// already used by ImportBooksResult. AlertCapture wraps the CopyBooks
// orchestrator so any ParatextData Alert.Show calls during the per-book
// GetText/PutText loop and CopyCustomVersification surface as captured
// AlertEntry records. Per-book domain errors (encoding-conversion failures,
// LockNotObtained translations) are wrapped in an AlertEntry with the
// book id as the caption to coexist with captured ParatextData alerts.

/// <summary>
/// Result of a book copy operation. See data-contracts.md Section 3.4
/// for the formal contract. <c>LastCopiedBookNum</c> is the highest
/// canonical book number that was successfully copied (INV-C13); it is
/// omitted (null) when no book was copied.
///
/// <para>See data-contracts.md Section 3.9 (ImportBooksResult) for the
/// <see cref="AlertEntry"/> shape definition shared with this record.</para>
/// </summary>
/// <param name="Success">Whether the overall copy succeeded — true when
///   no error-level alerts were captured.</param>
/// <param name="LastCopiedBookNum">Highest canonical book number copied
///   in this call, or null when no book was copied.</param>
/// <param name="Warnings">Captured non-fatal alerts
///   (Information, Warning, Question levels).</param>
/// <param name="Errors">Captured fatal alerts (Error level) plus
///   wrapped per-book domain errors (encoding/lock failures).</param>
/// <param name="CopiedCount">Number of books successfully copied.</param>
public record CopyBooksResult(
    bool Success,
    int? LastCopiedBookNum,
    AlertEntry[] Warnings,
    AlertEntry[] Errors,
    int CopiedCount
);
