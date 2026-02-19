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
        string[] bcvArr = bbbcccvvv.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
        StringBuilder refstr = new StringBuilder();
        foreach (string s in bcvArr.Where(s => s.Length >= 9))
        {
            string verseStr = !char.IsDigit(s[0]) && s.Length > 9 ? s.Substring(1) : s;
            int hyphenIndex = verseStr.IndexOf('-');
            string? rangeRefStr = null;
            if (hyphenIndex > 0)
            {
                rangeRefStr = verseStr.Substring(hyphenIndex + 1);
                if (rangeRefStr.Length > 0 && !char.IsDigit(rangeRefStr[0]))
                    rangeRefStr = rangeRefStr.Substring(1);
                verseStr = verseStr.Substring(0, hyphenIndex);
            }

            if (
                (verseStr.Length != 9 && verseStr.Length != 14)
                || !int.TryParse(verseStr.Substring(0, 9), out var bcv)
            )
                continue;

            VerseRef vref;
            try
            {
                vref = new VerseRef(bcv, ScrVers.Original);
            }
            catch (VerseRefException)
            {
                continue;
            }
            vref.ChangeVersification(versification);
            string longref =
                CanonX.BookNumberToName(vref.BookNum) + " " + vref.Chapter + ":" + vref.Verse;
            string displayref = longref;
            if (rangeRefStr != null && (rangeRefStr.Length == 9 || rangeRefStr.Length == 14))
            {
                if (int.TryParse(rangeRefStr.Substring(0, 9), out var rangebcv))
                {
                    try
                    {
                        VerseRef rangeRef = new VerseRef(rangebcv, ScrVers.Original);
                        rangeRef.ChangeVersification(versification);
                        if (rangeRef.ChapterNum == vref.ChapterNum)
                            displayref += $"-{rangeRef.VerseNum}";
                        else
                            displayref += $"-{rangeRef.ChapterNum}:{rangeRef.VerseNum}";
                    }
                    catch (VerseRefException)
                    {
                        // Invalid range end -- format start ref without range
                    }
                }
            }
            string link = string.Format(
                "<a href='{0}' title='{1}'>{2}</a>",
                "goto:" + vref.Text,
                "Go To " + longref,
                displayref
            );
            refstr.Append(link + " ");
        }

        if (refstr.Length == 0)
            return "";

        refstr.Length -= 1; // remove last space
        return refstr.ToString();
    }
}
