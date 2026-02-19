using System.Text.RegularExpressions;

namespace Paranext.DataProvider.EnhancedResources;

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleForm.cs:2747-2777
// Methods: RemoveBraces, FilterGlosses
// Maps to: EXT-007, CAP-015
//
// EXPLANATION:
// Strips content within curly braces (metadata markers) from gloss text.
// MARBLE dictionary glosses contain metadata in {braces} that is not intended
// for display. This service removes all {content} using lazy regex matching.
//
// PT9 uses: Regex.Replace(gloss_str, @"\{.*?\}", string.Empty)
// The lazy match (.*?) ensures each {brace pair} is removed individually,
// not greedy across multiple pairs.

/// <summary>
/// Service for gloss text processing, including brace metadata filtering
/// and localized gloss lookup.
/// </summary>
internal static class GlossService
{
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleForm.cs:2747-2777
    // Method: MarbleForm.RemoveBraces()
    // Maps to: EXT-007, CAP-015
    /// <summary>
    /// Strips content within curly braces (metadata markers) from gloss text.
    /// Content between { and } inclusive is removed. Remaining text is returned
    /// without whitespace collapsing (double spaces may remain where braces were).
    /// </summary>
    /// <param name="rawGloss">The raw gloss text potentially containing {metadata} markers.</param>
    /// <returns>The gloss text with all {content} removed.</returns>
    public static string FilterGlossBraces(string rawGloss) =>
        Regex.Replace(rawGloss, @"\{.*?\}", string.Empty);
}
