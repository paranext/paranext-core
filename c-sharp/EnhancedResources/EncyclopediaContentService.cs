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
    /// </summary>
    /// <param name="bbbcccvvv">Space-separated BBBCCCVVV reference strings.</param>
    /// <param name="versification">The versification system for mapping references.</param>
    /// <returns>HTML string with clickable verse links, or empty string if no valid refs.</returns>
    public static string FormatBCVRefs(string bbbcccvvv, ScrVers versification) =>
        throw new NotImplementedException();
}
