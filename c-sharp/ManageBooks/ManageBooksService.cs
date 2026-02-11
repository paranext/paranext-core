using Paratext.Data;
using PtxUtils;
using SIL.Scripture;

namespace Paranext.DataProvider.ManageBooks;

// === NEW IN PT10 ===
// Reason: Service layer for manage-books PAPI commands
// Maps to: CAP-009

/// <summary>
/// Service providing book management operations.
/// </summary>
public static class ManageBooksService
{
    // Book number range: 1-66 canonical, 67-124 non-canonical (including deuterocanon and extras)
    private const int FirstBookNum = 1;
    private const int LastBookNum = 124;
    private const int LastCanonicalBookNum = 66;

    /// <summary>
    /// Gets books present in a project.
    /// </summary>
    /// <param name="projectId">Project ID (GUID string).</param>
    /// <returns>Books present result with book numbers and book info.</returns>
    public static BooksPresentResult GetBooksPresent(string projectId)
    {
        // Find the ScrText for this project
        ScrText? scrText = FindScrText(projectId);

        if (scrText == null)
        {
            return new BooksPresentResult([], []);
        }

        return GetBooksPresentFromScrText(scrText);
    }

    /// <summary>
    /// Gets books present from a ScrText instance.
    /// </summary>
    /// <param name="scrText">The scripture text instance.</param>
    /// <returns>Books present result.</returns>
    public static BooksPresentResult GetBooksPresentFromScrText(ScrText scrText)
    {
        var presentBooks = new List<int>();

        // Iterate through all possible book numbers and check if present
        // We check using BookFilePath and FileManager.Exists because BookPresent
        // may rely on cached BooksPresentSet which doesn't auto-update with DummyScrText
        for (int bookNum = FirstBookNum; bookNum <= LastBookNum; bookNum++)
        {
            try
            {
                // First try BookPresent as it's the canonical way
                if (scrText.BookPresent(bookNum))
                {
                    presentBooks.Add(bookNum);
                    continue;
                }

                // Fallback: Check if book file exists directly
                // This handles cases where BooksPresentSet isn't updated (e.g., in-memory tests)
                string bookFilePath = scrText.BookFilePath(bookNum);
                if (!string.IsNullOrEmpty(bookFilePath) && scrText.FileManager.Exists(bookFilePath))
                {
                    // Verify it has non-whitespace content using VerseRef
                    var verseRef = new VerseRef(bookNum, 0, 0, scrText.Settings.Versification);
                    string content = scrText.GetText(verseRef, false, false);
                    if (!string.IsNullOrWhiteSpace(content))
                    {
                        presentBooks.Add(bookNum);
                    }
                }
            }
            catch
            {
                // Skip books that cause errors (e.g., invalid book numbers)
            }
        }

        int[] bookNumbers = [.. presentBooks];
        BookInfo[] books = presentBooks.Select(CreateBookInfo).ToArray();

        return new BooksPresentResult(bookNumbers, books);
    }

    /// <summary>
    /// Creates BookInfo for a book number.
    /// </summary>
    private static BookInfo CreateBookInfo(int bookNum)
    {
        string bookId = GetBookId(bookNum);
        string bookName = GetBookName(bookNum);
        bool isCanonical = bookNum >= FirstBookNum && bookNum <= LastCanonicalBookNum;

        return new BookInfo(bookNum, bookId, bookName, isCanonical);
    }

    /// <summary>
    /// Gets the 3-letter book ID for a book number.
    /// </summary>
    private static string GetBookId(int bookNum)
    {
        try
        {
            string bookId = Canon.BookNumberToId(bookNum);
            return !string.IsNullOrEmpty(bookId) ? bookId : $"B{bookNum:D2}";
        }
        catch
        {
            return $"B{bookNum:D2}";
        }
    }

    /// <summary>
    /// Gets a book name for display.
    /// </summary>
    private static string GetBookName(int bookNum)
    {
        try
        {
            return Canon.BookNumberToEnglishName(bookNum);
        }
        catch
        {
            return $"Book {bookNum}";
        }
    }

    /// <summary>
    /// Finds a ScrText by project ID.
    /// </summary>
    private static ScrText? FindScrText(string projectId)
    {
        if (string.IsNullOrEmpty(projectId))
        {
            return null;
        }

        try
        {
            HexId hexId = HexId.FromStr(projectId);
            return ScrTextCollection.GetById(hexId);
        }
        catch
        {
            // If GetById fails, try to find by iterating
            try
            {
                return ScrTextCollection
                    .ScrTexts(IncludeProjects.Everything)
                    .FirstOrDefault(st => st.Guid.ToString() == projectId);
            }
            catch
            {
                return null;
            }
        }
    }
}
