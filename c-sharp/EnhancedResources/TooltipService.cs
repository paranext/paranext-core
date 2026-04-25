// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleForm.cs:2589-2670 (GetTooltipHtml restructured
// to return TooltipData instead of HTML). Maps to: EXT-002.
using Paranext.DataProvider.Errors;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Instance service for generating structured tooltip data for linked words.
/// Holds a MarbleDataAccessService for gloss resolution; stateless otherwise.
/// Returns TooltipData with gloss, POS, strong number, notes, morphology.
/// Source: EXT-002, CAP-014
/// </summary>
internal sealed class TooltipService
{
    private readonly MarbleDataAccessService _marbleData;
    private readonly IMarbleBookTokenProvider _bookTokens;

    public TooltipService(MarbleDataAccessService marbleData, IMarbleBookTokenProvider bookTokens)
    {
        _marbleData = marbleData ?? throw new ArgumentNullException(nameof(marbleData));
        _bookTokens = bookTokens ?? throw new ArgumentNullException(nameof(bookTokens));
    }

    /// <summary>
    /// Get structured tooltip data for a linked word identified by token ID.
    /// Token not found: throws PlatformError with NOT_FOUND.
    /// No gloss available: returns partial TooltipData with null Gloss.
    /// </summary>
    public TooltipData GetTooltipData(TooltipInput input)
    {
        var tokens = _bookTokens.GetTokens(input.ResourceId, input.CurrentReference.BookNum);
        MarbleToken token = FindTokenOrThrow(input.TokenId, tokens.ToArray());

        string lemma = token.Text;
        string? strongNumber = token.StrongNumber;
        string? gloss = ResolveGloss(token, input.GlossLanguage);
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

    private string? ResolveGloss(MarbleToken token, string glossLanguage)
    {
        if (token.LexicalLinks is not { Count: > 0 })
            return null;

        IList<string> glosses = _marbleData.FindLocalizedGlossesForTerm(token.Text, glossLanguage);
        return glosses.Count > 0 ? string.Join(", ", glosses) : null;
    }

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

        string language = token.StrongNumber is { } sn && sn.StartsWith('H') ? "Hebrew" : "Greek";
        PosTranslateResult result = PartOfSpeechTranslator.Translate(token.Style, language, "long");
        return result.IsKnown ? result.DisplayString : null;
    }
}
