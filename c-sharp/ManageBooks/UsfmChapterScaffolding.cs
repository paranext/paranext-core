using System.Text.RegularExpressions;

namespace Paranext.DataProvider.ManageBooks;

// === NEW IN PT10 ===
// Reason: PT10 redefines merge mode for Copy/Import from PT9's
// WriteChaptersToBook semantic (source chapters overwrite their dest
// counterparts) to "only write chapters that do not already exist in the
// destination". That requires deciding whether a destination chapter
// "exists", where chapters holding nothing or only create-books scaffolding
// count as non-existing. PT9 has no such mode, so this detector is new code;
// the scaffolding shapes it recognizes are exactly what PT9's
// ScriptureTemplate emits (ParatextBase/ScriptureTemplate.cs):
//   - CreateInitialLines: "\id GEN - Full Name", "\h Short", "\toc1-3 ..."
//   - CreateCV (GetCVs): "\c N " and "\v N " lines with no text
//   - CreateFromTemplate (ExtractTemplate): bare paragraph markers (\p, \q1,
//     \s, ...), "\v N" tokens, and literal " ... " pre-verse placeholders

/// <summary>
/// Decides whether a single chapter's USFM holds real content beyond
/// create-books scaffolding. Used by the Copy/Import merge mode ("Only
/// copy/import non-existing chapters") to decide whether a destination
/// chapter may be written: a chapter with nothing, or with only scaffolding
/// (chapter/verse markers without text, bare paragraph markers, book-name
/// headers, template "..." placeholders), counts as non-existing.
/// </summary>
public static class UsfmChapterScaffolding
{
    /// <summary>\id line including everything to end-of-line (metadata, never content).</summary>
    private static readonly Regex IdLinePattern =
        new(@"^\\id\b[^\r\n]*", RegexOptions.Compiled | RegexOptions.Multiline);

    /// <summary>
    /// Book-name header lines (\h, \h1-3, \toc1-3) including their text. The create-books
    /// scaffold generates these from BookNames, so their text does not count as user content.
    /// </summary>
    private static readonly Regex HeaderLinePattern =
        new(@"^\\(?:h\d?|toc\d?)\b[^\r\n]*", RegexOptions.Compiled | RegexOptions.Multiline);

    /// <summary>Verse marker with its verse number/bridge and optional ESG alternate number.</summary>
    private static readonly Regex VerseMarkerPattern =
        new(@"\\v\s+[0-9]+[a-z]?(?:[-,–][0-9]+[a-z]?)?(?:\s+\[[^\]]*\])?", RegexOptions.Compiled);

    /// <summary>Chapter marker with its chapter number token.</summary>
    private static readonly Regex ChapterMarkerPattern = new(@"\\c\s+\S+", RegexOptions.Compiled);

    /// <summary>Any remaining bare marker (\p, \q1, \s, \b, end markers like \f*).</summary>
    private static readonly Regex BareMarkerPattern = new(@"\\[a-z0-9]+\*?", RegexOptions.Compiled);

    /// <summary>PT9 CreateFromTemplate's literal pre-verse " ... " placeholder.</summary>
    private static readonly Regex PlaceholderPattern = new(@"\.{3,}", RegexOptions.Compiled);

    /// <summary>
    /// Returns true when the chapter holds anything beyond scaffolding — i.e. any text that
    /// survives after stripping the \id line, book-name header lines, chapter/verse number
    /// tokens, bare markers, and template placeholders.
    /// </summary>
    public static bool HasContentBeyondScaffolding(string? chapterUsfm)
    {
        if (string.IsNullOrWhiteSpace(chapterUsfm))
            return false;

        // Order matters: line-based metadata first, then \v (so verse numbers
        // are consumed together with their marker), then \c, then any leftover
        // bare markers, then placeholders.
        string text = IdLinePattern.Replace(chapterUsfm, string.Empty);
        text = HeaderLinePattern.Replace(text, string.Empty);
        text = VerseMarkerPattern.Replace(text, string.Empty);
        text = ChapterMarkerPattern.Replace(text, string.Empty);
        text = BareMarkerPattern.Replace(text, string.Empty);
        text = PlaceholderPattern.Replace(text, string.Empty);

        return text.Trim().Length > 0;
    }
}
