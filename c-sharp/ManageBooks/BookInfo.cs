namespace Paranext.DataProvider.ManageBooks;

// === NEW IN PT10 ===
// Reason: Data contract for PAPI command response
// Maps to: CAP-009

/// <summary>
/// Basic book information.
/// </summary>
/// <param name="BookNum">Canonical book number (1-124).</param>
/// <param name="BookId">Three-letter book ID (GEN, EXO, etc.).</param>
/// <param name="BookName">Display name.</param>
/// <param name="IsCanonical">Whether in canonical range (1-66).</param>
public record BookInfo(int BookNum, string BookId, string BookName, bool IsCanonical);
