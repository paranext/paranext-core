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
internal static partial class GlossService
{
    /// <summary>
    /// Pre-compiled regex matching content within curly braces using lazy quantifier.
    /// </summary>
    [GeneratedRegex(@"\{.*?\}")]
    private static partial Regex BraceContentRegex();

    /// <summary>
    /// Strips content within curly braces (metadata markers) from gloss text.
    /// Content between { and } inclusive is removed. Remaining text is returned
    /// without whitespace collapsing (double spaces may remain where braces were).
    /// </summary>
    /// <param name="rawGloss">The raw gloss text potentially containing {metadata} markers.</param>
    /// <returns>The gloss text with all {content} removed.</returns>
    public static string FilterGlossBraces(string rawGloss) =>
        BraceContentRegex().Replace(rawGloss, string.Empty);

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs:387-430
    // Method: MarbleDataAccess.FindLocalizedGlossesForTerm
    // Maps to: EXT-014, CAP-016
    /// <summary>
    /// Looks up localized glosses for a Biblical Term from Marble dictionaries.
    /// Delegates to MarbleDataAccess.FindLocalizedGlossesForTerm for the actual lookup.
    /// Returns null if the term is not found in the dictionary data.
    /// </summary>
    /// <param name="dataAccess">The MarbleDataAccess instance providing dictionary data.</param>
    /// <param name="termId">The term identifier to look up.</param>
    /// <param name="language">The language code for localized glosses.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>A GlossResult containing glosses and language, or null if term not found.</returns>
    /// <exception cref="InvalidOperationException">Thrown when no Marble data is available (NO_DATA).</exception>
    public static Task<GlossResult?> FindLocalizedGlossesForTermAsync(
        MarbleDataAccess dataAccess,
        string termId,
        string language,
        CancellationToken cancellationToken = default
    )
    {
        cancellationToken.ThrowIfCancellationRequested();

        if (!dataAccess.HaveMarbleData)
            throw new InvalidOperationException("No Marble dictionary data available");

        if (string.IsNullOrEmpty(termId) || string.IsNullOrEmpty(language))
            return Task.FromResult<GlossResult?>(null);

        var glosses = dataAccess.FindLocalizedGlossesForTerm(termId, language);

        if (glosses.Count == 0)
            return Task.FromResult<GlossResult?>(null);

        return Task.FromResult<GlossResult?>(new GlossResult(glosses, language));
    }

    // === TDD STUB: CAP-017 ===
    // Source: PT9/BiblicalTerms/AdditionalGlossesHelper.cs:22-121
    // Maps to: BHV-109, BHV-115, CAP-017
    // Contract: data-contracts.md Method 17
    /// <summary>
    /// Enumerates available gloss languages from installed Marble dictionaries.
    /// Returns sorted list of language codes. Returns empty list when no Marble data
    /// is available.
    /// </summary>
    /// <param name="dataAccess">The MarbleDataAccess instance providing dictionary data.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>Sorted list of available gloss language codes.</returns>
    public static Task<IReadOnlyList<string>> GetAvailableGlossLanguagesAsync(
        MarbleDataAccess dataAccess,
        CancellationToken cancellationToken = default
    )
    {
        throw new NotImplementedException(
            "CAP-017: GetAvailableGlossLanguagesAsync not yet implemented"
        );
    }
}
