using Paratext.Data;
using PtxUtils;
using SIL.Scripture;

namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Shared utility methods for book management services.
/// </summary>
/// <remarks>
/// This class consolidates helper methods used across BookCreationService, ManageBooksService,
/// and other book management services to eliminate code duplication.
/// </remarks>
internal static class BookServiceHelpers
{
    /// <summary>
    /// First valid book number.
    /// </summary>
    public const int FirstBookNum = 1;

    /// <summary>
    /// Last valid book number (non-canonical books end at 123; 124+ are invalid).
    /// </summary>
    public const int LastBookNum = 123;

    /// <summary>
    /// Last canonical book number (Revelation = 66).
    /// </summary>
    public const int LastCanonicalBookNum = 66;

    /// <summary>
    /// First non-canonical book number (Tobit = 67).
    /// </summary>
    public const int FirstNonCanonicalBookNum = 67;

    /// <summary>
    /// Creates BookInfo for a book number.
    /// </summary>
    /// <param name="bookNum">The book number (1-123).</param>
    /// <returns>BookInfo with book details.</returns>
    public static BookInfo CreateBookInfo(int bookNum)
    {
        string bookId = GetBookId(bookNum);
        string bookName = GetBookName(bookNum);
        bool isCanonical = bookNum >= FirstBookNum && bookNum <= LastCanonicalBookNum;

        return new BookInfo(bookNum, bookId, bookName, isCanonical);
    }

    /// <summary>
    /// Gets the 3-letter book ID for a book number.
    /// </summary>
    /// <param name="bookNum">The book number.</param>
    /// <returns>Three-letter book ID (e.g., "GEN", "EXO") or fallback format.</returns>
    public static string GetBookId(int bookNum)
    {
        try
        {
            string bookId = Canon.BookNumberToId(bookNum);
            return !string.IsNullOrEmpty(bookId) ? bookId : $"B{bookNum:D2}";
        }
        catch (Exception ex)
        {
            Console.WriteLine(
                $"BookServiceHelpers: Could not get book ID for book {bookNum}: {ex.Message}"
            );
            return $"B{bookNum:D2}";
        }
    }

    /// <summary>
    /// Gets a book name for display.
    /// </summary>
    /// <param name="bookNum">The book number.</param>
    /// <returns>English book name or fallback format.</returns>
    public static string GetBookName(int bookNum)
    {
        try
        {
            return Canon.BookNumberToEnglishName(bookNum);
        }
        catch (Exception ex)
        {
            Console.WriteLine(
                $"BookServiceHelpers: Could not get book name for book {bookNum}: {ex.Message}"
            );
            return $"Book {bookNum}";
        }
    }

    /// <summary>
    /// Checks if a project is a Study Bible or Study Bible Additions project.
    /// Used to determine whether SBA-specific operations should be performed.
    /// </summary>
    /// <param name="scrText">The project to check.</param>
    /// <returns>True if the project is StudyBible or StudyBibleAdditions type.</returns>
    public static bool IsStudyBibleProject(ScrText scrText)
    {
        try
        {
            var projectType = scrText.Settings.TranslationInfo.Type;
            return projectType == ProjectType.StudyBible
                || projectType == ProjectType.StudyBibleAdditions;
        }
        catch
        {
            return false;
        }
    }

    /// <summary>
    /// Creates ProjectInfo from a ScrText, or a minimal ProjectInfo if ScrText is null.
    /// Used by comparison and copy target services to generate project metadata.
    /// </summary>
    /// <param name="scrText">The ScrText to extract info from (may be null).</param>
    /// <param name="projectId">The project ID to use if ScrText is null.</param>
    /// <returns>ProjectInfo with project metadata.</returns>
    public static ProjectInfo CreateProjectInfo(ScrText? scrText, string projectId)
    {
        if (scrText == null)
        {
            return new ProjectInfo(
                ProjectId: projectId,
                ProjectName: "Unknown",
                ProjectType: "Unknown",
                IsStudyBible: false
            );
        }

        var projectType = scrText.Settings.TranslationInfo.Type;
        bool isStudyBible =
            projectType == ProjectType.StudyBible || scrText.Settings.IsStudyBibleAdditions;

        return new ProjectInfo(
            ProjectId: scrText.Guid.ToString(),
            ProjectName: scrText.Name,
            ProjectType: projectType.ToString() ?? "Unknown",
            IsStudyBible: isStudyBible
        );
    }

    /// <summary>
    /// Finds a ScrText by project ID.
    /// </summary>
    /// <param name="projectId">Project ID (GUID string or HexId).</param>
    /// <returns>ScrText if found, null otherwise.</returns>
    public static ScrText? FindScrText(string projectId)
    {
        if (string.IsNullOrEmpty(projectId))
        {
            return null;
        }

        // Try to find by HexId first (most common case)
        try
        {
            HexId hexId = HexId.FromStr(projectId);
            return ScrTextCollection.GetById(hexId);
        }
        catch (Exception ex)
        {
            Console.WriteLine(
                $"BookServiceHelpers: Could not find project by HexId '{projectId}': {ex.Message}"
            );
        }

        // Fallback: try to find by iterating through all projects
        try
        {
            return ScrTextCollection
                .ScrTexts(IncludeProjects.Everything)
                .FirstOrDefault(st => st.Guid.ToString() == projectId);
        }
        catch (Exception ex)
        {
            Console.WriteLine(
                $"BookServiceHelpers: Could not find project by iteration for '{projectId}': {ex.Message}"
            );
            return null;
        }
    }
}
