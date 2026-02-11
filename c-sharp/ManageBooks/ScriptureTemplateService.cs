using System.Text;
using Paratext.Data;
using SIL.Scripture;

namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Service for generating Scripture templates (CV markers) based on versification.
/// </summary>
/// <remarks>
/// PT9 Source: ParatextBase/ScriptureTemplate.cs:257-340
/// Capability: CAP-029 (ChapterVerseTemplateGeneration)
/// </remarks>
public static class ScriptureTemplateService
{
    // Book number range constants (matching ManageBooksService)
    private const int FirstBookNum = 1;
    private const int LastBookNum = 123;

    // ESG (Esther Greek) book number - requires special handling (SUBFLOW-004)
    private const int ESG_BOOK_NUM = 84;

    /// <summary>
    /// Creates chapter and verse markers for a book based on the project's versification.
    /// </summary>
    /// <param name="scrText">The project to generate CV markers for.</param>
    /// <param name="bookNum">The canonical book number (1-based, e.g., 65 for Jude).</param>
    /// <returns>USFM string containing \c and \v markers.</returns>
    /// <exception cref="ArgumentNullException">Thrown when scrText is null.</exception>
    /// <exception cref="ArgumentOutOfRangeException">Thrown when bookNum is invalid.</exception>
    /// <remarks>
    /// === PORTED FROM PT9 ===
    /// Source: PT9/ParatextBase/ScriptureTemplate.cs:257-340
    /// Method: ScriptureTemplate.CreateCV()
    /// Maps to: EXT-015, BHV-T002
    ///
    /// EXPLANATION:
    /// This algorithm generates chapter/verse markers based on versification:
    /// 1. For each chapter (1 to lastChapter), outputs "\c N\n\p\n"
    /// 2. For each verse (1 to lastVerse), outputs "\v N\n"
    /// 3. Versification determines chapter/verse counts per book
    /// 4. ESG (Esther Greek, book 84) requires special template handling (deferred)
    /// </remarks>
    public static string CreateCV(ScrText scrText, int bookNum)
    {
        // Validate null argument
        if (scrText == null)
        {
            throw new ArgumentNullException(nameof(scrText));
        }

        // Validate book number range
        if (bookNum < FirstBookNum || bookNum > LastBookNum)
        {
            throw new ArgumentOutOfRangeException(
                nameof(bookNum),
                bookNum,
                $"Book number must be between {FirstBookNum} and {LastBookNum}."
            );
        }

        // Get versification from the project settings
        ScrVers versification = scrText.Settings.Versification;

        // Get the last chapter for this book in this versification
        int lastChapter = versification.GetLastChapter(bookNum);

        // If GetLastChapter returns 0 or negative, the book is not in this versification
        if (lastChapter <= 0)
        {
            throw new ArgumentOutOfRangeException(
                nameof(bookNum),
                bookNum,
                $"Book number {bookNum} is not valid for the project's versification."
            );
        }

        // Build the CV markers
        StringBuilder sb = new StringBuilder();

        for (int chapter = 1; chapter <= lastChapter; chapter++)
        {
            // Add chapter marker: \c N
            sb.AppendLine($"\\c {chapter}");

            // Add paragraph marker after chapter marker: \p
            sb.AppendLine("\\p");

            // Get the last verse for this chapter
            int lastVerse = versification.GetLastVerse(bookNum, chapter);

            // Add verse markers: \v N
            for (int verse = 1; verse <= lastVerse; verse++)
            {
                sb.AppendLine($"\\v {verse}");
            }
        }

        return sb.ToString();
    }
}
