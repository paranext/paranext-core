namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Basic book information.
/// </summary>
/// <param name="BookNum">Book number (1-123).</param>
/// <param name="BookId">Three-letter book ID (GEN, EXO, etc.).</param>
/// <param name="BookName">Display name.</param>
/// <param name="IsCanonical">Whether in canonical range (1-66).</param>
public record BookInfo(int BookNum, string BookId, string BookName, bool IsCanonical);
