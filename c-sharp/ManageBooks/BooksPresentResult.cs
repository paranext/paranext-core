namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Result of GetBooksPresent operation.
/// </summary>
/// <param name="BookNumbers">Book numbers present in the project.</param>
/// <param name="Books">Detailed book information.</param>
public record BooksPresentResult(int[] BookNumbers, BookInfo[] Books);
