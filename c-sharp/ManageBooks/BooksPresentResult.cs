namespace Paranext.DataProvider.ManageBooks;

// === NEW IN PT10 ===
// Reason: Data contract for PAPI command response
// Maps to: CAP-009

/// <summary>
/// Result of GetBooksPresent operation.
/// </summary>
/// <param name="BookNumbers">Book numbers present in the project.</param>
/// <param name="Books">Detailed book information.</param>
public record BooksPresentResult(int[] BookNumbers, BookInfo[] Books);
