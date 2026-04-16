namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Stateless service for generating structured tooltip data for linked words.
/// Replaces PT9's HTML tooltip generation (MarbleForm.cs:2589-2670).
/// Returns TooltipData with gloss, POS, strong number, notes, morphology.
/// Source: EXT-002, CAP-014
/// </summary>
internal static class TooltipService
{
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleForm.cs:2589-2670
    // Method: MarbleForm.GetTooltipHtml() - restructured to return TooltipData instead of HTML
    // Maps to: EXT-002
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
        // Look up token by Index matching TokenId
        int tokenIndex = int.TryParse(input.TokenId, out int parsed) ? parsed : -1;

        MarbleToken? token = null;
        foreach (MarbleToken t in parsedTokens)
        {
            if (t.Index == tokenIndex)
            {
                token = t;
                break;
            }
        }

        if (token == null)
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.NotFound,
                $"Token '{input.TokenId}' not found"
            );
        }

        string lemma = token.Text;
        string? strongNumber = token.StrongNumber;

        // Resolve gloss via MarbleDataAccessService
        string? gloss = ResolveGloss(token, input.GlossLanguage, dataAccess);

        // Resolve POS via PartOfSpeechTranslator
        string? partOfSpeech = ResolvePosDisplay(token);

        return new TooltipData(
            Lemma: lemma,
            Gloss: gloss,
            PartOfSpeech: partOfSpeech,
            StrongNumber: strongNumber,
            Notes: [],
            Morphology: null
        );
    }

    private static string? ResolveGloss(
        MarbleToken token,
        string glossLanguage,
        MarbleDataAccessService dataAccess
    )
    {
        if (token.LexicalLinks == null || token.LexicalLinks.Count == 0)
            return null;

        IList<string> glosses = dataAccess.FindLocalizedGlossesForTerm(token.Text, glossLanguage);

        if (glosses.Count == 0)
            return null;

        return string.Join(", ", glosses);
    }

    private static string? ResolvePosDisplay(MarbleToken token)
    {
        if (string.IsNullOrEmpty(token.Style))
            return null;

        // Determine language from strong number prefix
        string language =
            token.StrongNumber != null && token.StrongNumber.StartsWith('H') ? "Hebrew" : "Greek";

        PosTranslateResult result = PartOfSpeechTranslator.Translate(token.Style, language, "long");

        return result.IsKnown ? result.DisplayString : null;
    }
}
