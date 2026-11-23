// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleForm.cs:2589-2670 (GetTooltipHtml restructured
// to return TooltipData instead of HTML). Maps to: EXT-002.

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
    /// Get raw tooltip data for a linked word identified by token ID. Returns raw fields
    /// only - the TS presenter handles all shaping (gloss filter, phrase detection, POS
    /// localization) and the markdown emitter handles localization. RenderingStatus is
    /// always null in phase 3a; phase 3b wires it against the user's tracked project.
    ///
    /// Token not found: throws PlatformError with NOT_FOUND.
    /// No gloss available: RawGlosses is empty.
    /// </summary>
    public TooltipData GetTooltipData(TooltipInput input)
    {
        var tokens = _bookTokens.GetTokens(input.ResourceId, input.CurrentReference.BookNum);
        MarbleToken token = FindTokenOrThrow(input.TokenId, tokens.ToArray());

        // SourceForm = surface text of the linked word as it appears in scripture.
        // PT9 reads this from MarbleToken.SourceText; PT10's MarbleToken stores it as Text.
        string sourceForm = token.Text;

        // Lemma = the dictionary form, parsed from the first LexicalLink ("DICT:LEMMA:ID").
        // PT9 reads this from MarbleLexicalLink.Lemma. Falls back to surface text if no link.
        string lemma = ParseLemmaFromLink(token.LexicalLinks?.FirstOrDefault()) ?? sourceForm;

        // PartOfSpeechRaw = the raw POS tag (e.g. "noun", "phrase"). PT9 reads this from
        // MarbleToken.PartOfSpeech; PT10 stores it in Style. The TS presenter decides
        // whether to apply localization and detects the "phrase" case.
        string partOfSpeechRaw = token.Style ?? string.Empty;

        // RawGlosses = unfiltered gloss list from the dictionary. PT9 calls FilterGlosses
        // (strips "{...}" annotations) before display; the TS presenter does that now.
        IReadOnlyList<string> rawGlosses = ResolveRawGlosses(token, input.GlossLanguage);

        return new TooltipData(
            SourceForm: sourceForm,
            Lemma: lemma,
            PartOfSpeechRaw: partOfSpeechRaw,
            RawGlosses: rawGlosses,
            RenderingStatus: null
        );
    }

    private IReadOnlyList<string> ResolveRawGlosses(MarbleToken token, string glossLanguage)
    {
        if (token.LexicalLinks is not { Count: > 0 } lexicalLinks)
            return [];

        var (dictionary, lemma) = ParseLexicalLink(lexicalLinks[0]);

        IList<string> glosses = _marbleData.FindLocalizedGlossesForTerm(
            lemma ?? token.Text,
            glossLanguage,
            dictionary
        );
        return glosses.ToArray();
    }

    /// <summary>
    /// Extract the lemma (middle segment) from a lexical-link string shaped "DICT:LEMMA:ID".
    /// Returns null when the link is null/empty, has fewer than 2 colon-delimited parts, or
    /// when the lemma segment itself is empty.
    /// </summary>
    /// <remarks>
    /// PT9's <c>MarbleLexicalLink.ParseOneLexicalLink</c> requires <c>parts.Length == 3</c> exactly.
    /// This implementation accepts <c>parts.Length &gt;= 2</c> (returns the middle segment) to be
    /// more forgiving of partial / malformed links. Real-world links are always 3-part, so the
    /// looser semantics are functionally moot - but worth knowing if PT9 parity is later audited
    /// at this level.
    /// </remarks>
    private static string? ParseLemmaFromLink(string? link)
    {
        if (string.IsNullOrEmpty(link))
            return null;
        var parts = link.Split(':');
        if (parts.Length < 2)
            return null;
        var lemma = parts[1];
        return string.IsNullOrEmpty(lemma) ? null : lemma;
    }

    private static (string? Dictionary, string? Lemma) ParseLexicalLink(string link)
    {
        if (string.IsNullOrEmpty(link))
            return (null, null);
        var parts = link.Split(':');
        if (parts.Length < 2)
            return (null, null);
        return (parts[0], parts[1]);
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
}
