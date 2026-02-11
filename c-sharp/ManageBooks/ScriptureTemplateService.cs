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
        // Validate null argument
        if (modelScrText == null)
        {
            throw new ArgumentNullException(nameof(modelScrText));
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

        // Get the model book text
        string modelText = modelScrText.GetText(new VerseRef(bookNum, 0, 0), false, false);

        // Strip footnotes and cross-references completely (they can span content)
        modelText = StripFootnotesAndCrossRefs(modelText);

        // Strip character styles (e.g., \nd...\nd*, \add...\add*)
        modelText = StripCharacterStyles(modelText);

        // Parse line by line and extract structure
        string[] lines = modelText.Split('\n');
        StringBuilder result = new StringBuilder();

        foreach (string rawLine in lines)
        {
            string line = rawLine.TrimEnd('\r');

            if (string.IsNullOrWhiteSpace(line))
            {
                continue;
            }

            string trimmedLine = line.TrimStart();

            // Check if line starts with a marker
            if (trimmedLine.StartsWith("\\"))
            {
                string marker = ExtractMarker(trimmedLine);
                string lowerMarker = marker.ToLowerInvariant();

                if (IsIdMarker(lowerMarker))
                {
                    // For \id, keep book code only (first 3 chars after \id)
                    string bookCode = ExtractBookCode(trimmedLine);
                    result.AppendLine($"\\id {bookCode}");
                }
                else if (IsChapterMarker(lowerMarker))
                {
                    // Keep chapter marker with number
                    string chapterNum = ExtractNumber(trimmedLine, "c");
                    result.AppendLine($"\\c {chapterNum}");
                }
                else if (IsVerseMarker(lowerMarker))
                {
                    // Keep verse marker with number
                    string verseNum = ExtractNumber(trimmedLine, "v");
                    result.AppendLine($"\\v {verseNum}");
                }
                else if (IsStructuralMarker(lowerMarker))
                {
                    // Keep structural marker without text
                    result.AppendLine($"\\{marker}");
                }
                // Non-structural markers are dropped
            }
        }

        return result.ToString();
    }

    /// <summary>
    /// Strips footnotes (\f...\f*) and cross-references (\x...\x*) from USFM text.
    /// </summary>
    private static string StripFootnotesAndCrossRefs(string text)
    {
        // Remove footnotes: \f ... \f*
        text = System.Text.RegularExpressions.Regex.Replace(
            text,
            @"\\f\s+[+\-]?\s*.*?\\f\*",
            "",
            System.Text.RegularExpressions.RegexOptions.Singleline
        );

        // Remove cross-references: \x ... \x*
        text = System.Text.RegularExpressions.Regex.Replace(
            text,
            @"\\x\s+[+\-]?\s*.*?\\x\*",
            "",
            System.Text.RegularExpressions.RegexOptions.Singleline
        );

        return text;
    }

    /// <summary>
    /// Strips character styles (e.g., \nd...\nd*, \add...\add*) from USFM text.
    /// </summary>
    private static string StripCharacterStyles(string text)
    {
        // Character style markers to strip: common ones like \nd, \add, \wj, \qt, \k, etc.
        // Pattern: \marker text \marker*
        // This removes the markers and their content
        text = System.Text.RegularExpressions.Regex.Replace(
            text,
            @"\\(nd|add|wj|qt|k|sls|dc|bk|pn|ord|no|it|bd|em|sc)\s+.*?\\(\1)\*",
            "",
            System.Text.RegularExpressions.RegexOptions.Singleline
        );

        // Also remove any remaining character style end markers that might be orphaned
        text = System.Text.RegularExpressions.Regex.Replace(
            text,
            @"\\(nd|add|wj|qt|k|sls|dc|bk|pn|ord|no|it|bd|em|sc)\*",
            ""
        );

        return text;
    }

    /// <summary>
    /// Extracts the marker name from a USFM line (e.g., "\\v 1 text" returns "v").
    /// </summary>
    private static string ExtractMarker(string line)
    {
        // Skip the backslash and extract the marker (up to space or end)
        int start = line.IndexOf('\\') + 1;
        int end = start;

        while (end < line.Length && !char.IsWhiteSpace(line[end]))
        {
            end++;
        }

        return line.Substring(start, end - start);
    }

    /// <summary>
    /// Extracts the book code from an \id line (e.g., "\\id MRK Mark - Model" returns "MRK").
    /// </summary>
    private static string ExtractBookCode(string line)
    {
        // Pattern: \id XXX [description]
        // Extract the 3-letter code after \id
        string[] parts = line.Split(new[] { ' ', '\t' }, StringSplitOptions.RemoveEmptyEntries);

        // parts[0] = "\id", parts[1] = "XXX"
        if (parts.Length >= 2)
        {
            return parts[1].ToUpperInvariant();
        }

        return "";
    }

    /// <summary>
    /// Extracts a number from a USFM marker line (e.g., "\\c 1" or "\\v 2").
    /// </summary>
    private static string ExtractNumber(string line, string markerType)
    {
        // Pattern: \c N or \v N
        string[] parts = line.Split(new[] { ' ', '\t' }, StringSplitOptions.RemoveEmptyEntries);

        if (parts.Length >= 2)
        {
            // Return the number portion (may be a verse range like "1-2")
            return parts[1];
        }

        return "1"; // Default if parsing fails
    }

    /// <summary>
    /// Checks if the marker is the \id marker.
    /// </summary>
    private static bool IsIdMarker(string marker)
    {
        return marker == "id";
    }

    /// <summary>
    /// Checks if the marker is a chapter marker (\c).
    /// </summary>
    private static bool IsChapterMarker(string marker)
    {
        return marker == "c";
    }

    /// <summary>
    /// Checks if the marker is a verse marker (\v).
    /// </summary>
    private static bool IsVerseMarker(string marker)
    {
        return marker == "v";
    }

    /// <summary>
    /// Checks if the marker is a structural marker that should be preserved.
    /// </summary>
    private static bool IsStructuralMarker(string marker)
    {
        // Paragraph markers
        if (
            marker == "p"
            || marker == "m"
            || marker == "pi"
            || marker == "pi1"
            || marker == "pi2"
            || marker == "pi3"
            || marker == "nb"
            || marker == "pc"
            || marker == "pr"
            || marker == "cls"
            || marker == "li"
            || marker == "li1"
            || marker == "li2"
            || marker == "li3"
        )
        {
            return true;
        }

        // Section heading markers
        if (
            marker == "s"
            || marker == "s1"
            || marker == "s2"
            || marker == "s3"
            || marker == "sr"
            || marker == "r"
            || marker == "sp"
            || marker == "d"
            || marker == "ms"
            || marker == "ms1"
            || marker == "ms2"
        )
        {
            return true;
        }

        // Poetry markers
        if (
            marker == "q"
            || marker == "q1"
            || marker == "q2"
            || marker == "q3"
            || marker == "qr"
            || marker == "qc"
            || marker == "qa"
            || marker == "qm"
            || marker == "qm1"
            || marker == "qm2"
        )
        {
            return true;
        }

        // Title markers
        if (
            marker == "mt"
            || marker == "mt1"
            || marker == "mt2"
            || marker == "mt3"
            || marker == "mte"
            || marker == "mte1"
            || marker == "mte2"
        )
        {
            return true;
        }

        // Header/TOC markers
        if (
            marker == "h"
            || marker == "h1"
            || marker == "h2"
            || marker == "h3"
            || marker == "toc1"
            || marker == "toc2"
            || marker == "toc3"
            || marker == "toca1"
            || marker == "toca2"
            || marker == "toca3"
        )
        {
            return true;
        }

        // Introduction markers
        if (
            marker == "imt"
            || marker == "imt1"
            || marker == "imt2"
            || marker == "is"
            || marker == "is1"
            || marker == "is2"
            || marker == "ip"
            || marker == "ipi"
            || marker == "im"
            || marker == "imi"
            || marker == "ipq"
            || marker == "imq"
            || marker == "ipr"
            || marker == "iq"
            || marker == "iq1"
            || marker == "iq2"
            || marker == "ili"
            || marker == "ili1"
            || marker == "ili2"
            || marker == "iot"
            || marker == "io"
            || marker == "io1"
            || marker == "io2"
            || marker == "iex"
            || marker == "ie"
        )
        {
            return true;
        }

        // Other structural markers
        if (marker == "b" || marker == "rem" || marker == "sts" || marker == "lit")
        {
            return true;
        }

        return false;
    }
}
