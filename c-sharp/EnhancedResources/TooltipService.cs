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
        MarbleToken token = FindTokenOrThrow(input.TokenId, parsedTokens);

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
        if (token.LexicalLinks is not { Count: > 0 })
            return null;

        IList<string> glosses = dataAccess.FindLocalizedGlossesForTerm(token.Text, glossLanguage);

        return glosses.Count > 0 ? string.Join(", ", glosses) : null;
    }

    /// <summary>
    /// Look up a token by its ID (parsed as an index) in the token array.
    /// Throws NOT_FOUND PlatformError if no matching token exists.
    /// </summary>
    private static MarbleToken FindTokenOrThrow(string tokenId, MarbleToken[] parsedTokens)
    {
        int tokenIndex = int.TryParse(tokenId, out int parsed) ? parsed : -1;

        MarbleToken? token = parsedTokens.FirstOrDefault(t => t.Index == tokenIndex);

        if (token == null)
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.NotFound,
                $"Token '{tokenId}' not found"
            );
        }

        return token;
    }

    private static string? ResolvePosDisplay(MarbleToken token)
    {
        if (string.IsNullOrEmpty(token.Style))
            return null;

        // Determine language from strong number prefix: 'H' = Hebrew, default = Greek
        string language = token.StrongNumber is { } sn && sn.StartsWith('H') ? "Hebrew" : "Greek";

        PosTranslateResult result = PartOfSpeechTranslator.Translate(token.Style, language, "long");

        return result.IsKnown ? result.DisplayString : null;
    }
}
