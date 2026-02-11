using System.Text;
using Paratext.Data;
using SIL.Scripture;

namespace Paranext.DataProvider.ManageBooks;

/// <summary>
/// Service for generating Scripture templates (CV markers) based on versification
/// and extracting templates from model projects.
/// </summary>
/// <remarks>
/// PT9 Source: ParatextBase/ScriptureTemplate.cs
/// Capabilities:
/// - CAP-029 (ChapterVerseTemplateGeneration): Lines 257-340
/// - CAP-030 (ModelTextTemplateExtraction): Lines 129-216
/// </remarks>
internal static class ScriptureTemplateService
{
    // Book number range constants (matching ManageBooksService)
    private const int FirstBookNum = 1;
    private const int LastBookNum = 123;

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

    /// <summary>
    /// Extracts a template from a model project's book, preserving structure but stripping content.
    /// </summary>
    /// <param name="modelScrText">The model project containing the source book.</param>
    /// <param name="bookNum">The canonical book number (1-based).</param>
    /// <returns>USFM template string with markers but no content.</returns>
    /// <exception cref="ArgumentNullException">Thrown when modelScrText is null.</exception>
    /// <exception cref="ArgumentOutOfRangeException">Thrown when bookNum is invalid.</exception>
    /// <remarks>
    /// === PORTED FROM PT9 ===
    /// Source: PT9/ParatextBase/ScriptureTemplate.cs:129-216
    /// Method: ScriptureTemplate.ExtractTemplate()
    /// Maps to: EXT-016, BHV-T003, CAP-030
    ///
    /// EXPLANATION:
    /// This algorithm extracts structural markers from a model book while stripping text content:
    /// 1. Get the model book's USFM text via ScrText.GetText()
    /// 2. Parse line by line, identifying USFM markers
    /// 3. Preserve structural markers (\id, \c, \v, \p, \s, \q, etc.)
    /// 4. Keep chapter and verse numbers
    /// 5. Strip all text content after markers
    /// 6. Return the resulting template
    ///
    /// Structural markers preserved:
    /// - \id (book ID only, no description)
    /// - \c (chapter number preserved)
    /// - \v (verse number preserved)
    /// - \p, \m, \pi, \nb, \pc, \pr (paragraph markers)
    /// - \s, \s1, \s2, \s3 (section heading markers, no text)
    /// - \q, \q1, \q2, \q3 (poetry markers, no text)
    /// - \mt, \mt1, \mt2 (main title markers, no text)
    /// - \h, \toc1, \toc2, \toc3 (header/TOC markers, no text)
    ///
    /// Markers stripped completely:
    /// - \f...\f* (footnotes)
    /// - \x...\x* (cross references)
    /// - Character styles (\nd, \add, etc.)
    /// </remarks>
    public static string ExtractTemplate(ScrText modelScrText, int bookNum)
    {
        // TODO: Implement - this is a stub for TDD RED phase
        // The implementation should:
        // 1. Call modelScrText.GetText(new VerseRef(bookNum, 0, 0), false, false)
        // 2. Process each line to extract structure
        // 3. Return the template string
        throw new NotImplementedException(
            "CAP-030: ExtractTemplate not yet implemented - RED phase"
        );
    }
}
