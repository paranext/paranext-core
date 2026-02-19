using System.Text;
using Paratext.Data;
using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Service for encyclopedia content formatting.
/// Includes scripture reference formatting (BBBCCCVVV to clickable links),
/// encyclopedia article rendering (V1 and V2 formats), and image processing.
///
/// PT9 Source: Paratext/Marble/EncyclopediaTab.cs
/// Extractions: EXT-061, EXT-062, EXT-063, EXT-067, EXT-071
/// </summary>
internal static class EncyclopediaContentService
{
    /// <summary>Length of a standard BBBCCCVVV reference string.</summary>
    private const int BcvLength = 9;

    /// <summary>Length of an extended BBBCCCVVVWWWWW reference string (with word offset).</summary>
    private const int BcvWithWordOffsetLength = 14;

    /// <summary>
    /// Converts BBBCCCVVV reference strings to clickable verse links.
    /// Input is a space-separated string of BBBCCCVVV references (9 or 14 chars each).
    /// Each valid reference produces an HTML anchor tag with goto: URL scheme.
    /// Ranges use hyphen separator: BBBCCCVVV-BBBCCCVVV.
    ///
    /// === PORTED FROM PT9 ===
    /// Source: PT9/Paratext/Marble/EncyclopediaTab.cs:537-584
    /// Method: EncyclopediaTab.FormatBCVRefs()
    /// Maps to: EXT-062
    ///
    /// EXPLANATION:
    /// This method parses space-separated BBBCCCVVV reference strings and converts
    /// each to an HTML anchor tag. The algorithm:
    /// 1. Split input on spaces (RemoveEmptyEntries handles consecutive spaces)
    /// 2. Filter to strings with length >= 9
    /// 3. Strip leading non-digit character if present and length > 9
    /// 4. Detect hyphen for range references, split into start and end
    /// 5. Validate length is exactly 9 or 14 chars, parse first 9 as BCV integer
    /// 6. Create VerseRef from BCV, map through versification
    /// 7. Format display as "BookName Chapter:Verse" with range suffix if applicable
    /// 8. Generate HTML: &lt;a href='goto:{vref}' title='Go To {ref}'&gt;{display}&lt;/a&gt;
    /// 9. Join with spaces, remove trailing space
    /// </summary>
    /// <param name="bbbcccvvv">Space-separated BBBCCCVVV reference strings.</param>
    /// <param name="versification">The versification system for mapping references.</param>
    /// <returns>HTML string with clickable verse links, or empty string if no valid refs.</returns>
    public static string FormatBCVRefs(string bbbcccvvv, ScrVers versification)
    {
        string[] bcvArr = bbbcccvvv.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        StringBuilder result = new StringBuilder();

        foreach (string s in bcvArr.Where(s => s.Length >= BcvLength))
        {
            string verseStr = StripLeadingNonDigit(s);
            string? rangeRefStr = SplitRange(ref verseStr);

            if (!TryCreateVerseRef(verseStr, versification, out VerseRef vref))
                continue;

            string longref = $"{CanonX.BookNumberToName(vref.BookNum)} {vref.Chapter}:{vref.Verse}";
            string displayref = longref + FormatRangeSuffix(rangeRefStr, vref, versification);

            result
                .Append($"<a href='goto:{vref.Text}' title='Go To {longref}'>{displayref}</a>")
                .Append(' ');
        }

        if (result.Length == 0)
            return "";

        result.Length -= 1; // remove trailing space
        return result.ToString();
    }

    /// <summary>
    /// Strips a leading non-digit character from the reference string when the string
    /// is longer than the standard BCV length. This handles encyclopedia markup prefixes
    /// like punctuation before references.
    /// </summary>
    private static string StripLeadingNonDigit(string s) =>
        !char.IsDigit(s[0]) && s.Length > BcvLength ? s.Substring(1) : s;

    /// <summary>
    /// Splits a verse string at the hyphen separator to extract the range end reference.
    /// Modifies <paramref name="verseStr"/> in place to contain only the start reference.
    /// Strips a leading non-digit from the range end if present.
    /// </summary>
    /// <returns>The range end reference string, or null if no range.</returns>
    private static string? SplitRange(ref string verseStr)
    {
        int hyphenIndex = verseStr.IndexOf('-');
        if (hyphenIndex <= 0)
            return null;

        string rangeRefStr = verseStr.Substring(hyphenIndex + 1);
        if (rangeRefStr.Length > 0 && !char.IsDigit(rangeRefStr[0]))
            rangeRefStr = rangeRefStr.Substring(1);
        verseStr = verseStr.Substring(0, hyphenIndex);
        return rangeRefStr;
    }

    /// <summary>
    /// Attempts to create a <see cref="VerseRef"/> from a BCV string.
    /// Validates the string length (9 or 14 chars), parses the first 9 chars as a BCV integer,
    /// creates the VerseRef, and maps it through the specified versification.
    /// </summary>
    /// <returns>True if a valid VerseRef was created; false if the string should be skipped.</returns>
    private static bool TryCreateVerseRef(string verseStr, ScrVers versification, out VerseRef vref)
    {
        vref = default;

        if (
            (verseStr.Length != BcvLength && verseStr.Length != BcvWithWordOffsetLength)
            || !int.TryParse(verseStr.Substring(0, BcvLength), out var bcv)
        )
            return false;

        try
        {
            vref = new VerseRef(bcv, ScrVers.Original);
        }
        catch (VerseRefException)
        {
            return false;
        }

        vref.ChangeVersification(versification);
        return true;
    }

    /// <summary>
    /// Computes the range display suffix for a verse reference.
    /// For within-chapter ranges, returns "-{endVerse}".
    /// For cross-chapter ranges, returns "-{endChapter}:{endVerse}".
    /// Returns empty string if no valid range end exists.
    /// </summary>
    private static string FormatRangeSuffix(
        string? rangeRefStr,
        VerseRef startRef,
        ScrVers versification
    )
    {
        if (
            rangeRefStr == null
            || (rangeRefStr.Length != BcvLength && rangeRefStr.Length != BcvWithWordOffsetLength)
        )
            return "";

        if (!int.TryParse(rangeRefStr.Substring(0, BcvLength), out var rangebcv))
            return "";

        try
        {
            VerseRef rangeRef = new VerseRef(rangebcv, ScrVers.Original);
            rangeRef.ChangeVersification(versification);

            return rangeRef.ChapterNum == startRef.ChapterNum
                ? $"-{rangeRef.VerseNum}"
                : $"-{rangeRef.ChapterNum}:{rangeRef.VerseNum}";
        }
        catch (VerseRefException)
        {
            // Invalid range end -- format start ref without range
            return "";
        }
    }
}
