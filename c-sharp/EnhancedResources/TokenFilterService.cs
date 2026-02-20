namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Public API service for token filter matching.
/// Wraps the internal Matches/MatchesTextFilter/GetMatchingTokens logic
/// for exposure via PAPI command: platformEnhancedResources.getMatchingTokens (Method 21).
///
/// exactMatch=true maps to FilterOrigin.ScripturePane (exact full link match).
/// exactMatch=false maps to FilterOrigin.DictionaryTab (partial match ignoring meaning index).
/// </summary>
/// <remarks>
/// Source: PT9/Paratext/Marble/DictionaryTab.cs GetMatchingTokens logic
/// Maps to: CAP-021, EXT-054, Method 21
/// </remarks>
internal static class TokenFilterService
{
    /// <summary>
    /// Match tokens against a word filter (used by dictionary tab for scope + word filtering).
    /// Public API for Method 21 (command:platformEnhancedResources.getMatchingTokens).
    ///
    /// Tokens are filtered by the WordFilter's lexical links. Exact match mode uses full link
    /// comparison (ScripturePane origin); partial match mode compares Dictionary+Lemma+BaseFormIndex
    /// only, ignoring meaning index (DictionaryTab origin).
    /// </summary>
    /// <param name="tokens">The tokens to filter (typically TextLink tokens from scope query).</param>
    /// <param name="filter">The word filter criteria including lemma, lexical links, and source pane.</param>
    /// <param name="exactMatch">True for ScripturePane (exact link match); false for DictionaryTab (base form match).</param>
    /// <returns>Tokens matching the filter. Empty list when no matches. Never null.</returns>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/DictionaryTab.cs GetMatchingTokens logic
    // Method: DictionaryTab.GetMatchingTokens() -> delegates to MarbleDataParser.GetMatchingTokens
    // Maps to: EXT-054, CAP-021
    public static IReadOnlyList<MarbleToken> GetMatchingTokens(
        IReadOnlyList<MarbleToken> tokens,
        WordFilter filter,
        bool exactMatch
    )
    {
        return MarbleDataParser.GetMatchingTokens(tokens, filter, exactMatch);
    }
}
