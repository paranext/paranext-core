namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Result of GetAvailableBooks operation.
/// </summary>
/// <param name="AvailableBooks">Books that can be created (not present in project).</param>
/// <param name="ExistingBooks">Books that already exist in the project.</param>
/// <param name="IsStudyBible">Whether the project is a Study Bible Additions project.</param>
public record AvailableBooksResult(
    BookInfo[] AvailableBooks,
    BookInfo[] ExistingBooks,
    bool IsStudyBible
);
