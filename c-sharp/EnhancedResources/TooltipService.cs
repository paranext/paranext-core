namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Stateless service for generating structured tooltip data for linked words.
/// Replaces PT9's HTML tooltip generation (MarbleForm.cs:2589-2670).
/// Returns TooltipData with gloss, POS, strong number, notes, morphology.
/// Source: EXT-002, CAP-014
/// </summary>
internal static class TooltipService
{
    /// <summary>
    /// Get structured tooltip data for a linked word identified by token ID.
    /// Looks up the token in parsedTokens, extracts annotations, resolves
    /// gloss via MarbleDataAccessService, and translates POS via PartOfSpeechTranslator.
    ///
    /// Token not found: throws InvalidOperationException with NOT_FOUND code.
    /// No gloss available: returns partial TooltipData with null Gloss (not an error).
    /// </summary>
    public static TooltipData GetTooltipData(
        TooltipInput input,
        MarbleToken[] parsedTokens,
        MarbleDataAccessService dataAccess
    )
    {
        throw new NotImplementedException(
            "CAP-014: TooltipService.GetTooltipData not yet implemented"
        );
    }
}
