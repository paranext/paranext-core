using Paranext.DataProvider.Errors;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Scope-based link filtering service. Filters lexical links by verse/section/chapter scope.
/// Section boundaries detected from ParagraphStart markers in the token stream.
/// Source: EXT-005, EXT-006, BHV-305, BHV-601, BHV-602
/// </summary>
internal static class ScopeFilterService
{
    private static readonly ScopeFilterResult s_emptyResult =
        new(Links: [], TotalLinkCount: 0, IsEmpty: true);

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleForm.cs:425-503
    // Method: MarbleBookTokens.GetLinksInScope()
    // Maps to: EXT-005, EXT-006
    /// <summary>
    /// Filter links by scope. Section boundaries detected from ParagraphStart
    /// markers. Full parameter signature maps to BHV-601 GetLinksInScope.
    /// Source: EXT-005, EXT-006, BHV-305, BHV-601
    /// </summary>
    public static ScopeFilterResult GetLinksForScope(ScopeFilterInput input, MarbleToken[] tokens)
    {
        if (tokens == null || tokens.Length == 0)
            return s_emptyResult;

        if (!Enum.IsDefined(typeof(ScopeEnum), input.Scope))
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.InvalidArgument,
                $"Unknown scope value: {input.Scope}"
            );
        }

        // Count total links of the requested type across all tokens (BHV-305)
        int totalLinkCount = tokens.Count(t =>
            t.Type == MarbleTokenType.TextLink && HasLinksOfType(t, input.LinkType)
        );

        // Compute section boundary once (only for section scope)
        SectionBoundary? sectionBoundary =
            input.Scope == ScopeEnum.CurrentSection
                ? DetectSectionBoundary(tokens, input.CurrentRef)
                : null;

        // Single pass: track verse, filter by scope, extract matching tokens, then map to outputs
        var scopedTokens = CollectScopedTokens(tokens, input, sectionBoundary);
        var scopedLinks = scopedTokens
            .Select(t => BuildLinkOutput(t, input.LinkType, GetLinksForType(t, input.LinkType)!))
            .Where(o => o != null)
            .Cast<MarbleLexicalLinkOutput>()
            .ToList();

        return new ScopeFilterResult(
            Links: scopedLinks,
            TotalLinkCount: totalLinkCount,
            IsEmpty: scopedLinks.Count == 0,
            SectionBoundary: sectionBoundary
        );
    }

    /// <summary>
    /// Public entry point returning the raw in-scope TextLink tokens for the given input.
    /// Used by service-internal display-item building that needs the full token (e.g., for
    /// thematic/image link processing) rather than the projected MarbleLexicalLinkOutput.
    /// Source: EXT-005, EXT-006, BHV-305, BHV-601
    /// </summary>
    public static IReadOnlyList<MarbleToken> GetScopedTokens(
        ScopeFilterInput input,
        MarbleToken[] tokens
    )
    {
        if (tokens == null || tokens.Length == 0)
            return Array.Empty<MarbleToken>();

        if (!Enum.IsDefined(typeof(ScopeEnum), input.Scope))
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.InvalidArgument,
                $"Unknown scope value: {input.Scope}"
            );
        }

        SectionBoundary? sectionBoundary =
            input.Scope == ScopeEnum.CurrentSection
                ? DetectSectionBoundary(tokens, input.CurrentRef)
                : null;

        return CollectScopedTokens(tokens, input, sectionBoundary);
    }

    /// <summary>
    /// Single-pass collection of in-scope TextLink tokens. Tracks current chapter/verse,
    /// applies scope filtering, link-type matching, and optional text filter.
    /// </summary>
    private static IReadOnlyList<MarbleToken> CollectScopedTokens(
        MarbleToken[] tokens,
        ScopeFilterInput input,
        SectionBoundary? sectionBoundary
    )
    {
        var result = new List<MarbleToken>();
        int currentVerse = 0;
        int currentChapter = 0;

        int sectionStart = sectionBoundary?.StartIndex ?? 0;
        int sectionEnd = sectionBoundary?.EndIndex ?? tokens.Length - 1;

        for (int i = 0; i < tokens.Length; i++)
        {
            MarbleToken token = tokens[i];

            // Track current chapter from Chapter tokens; reset verse on chapter change
            if (token.Type == MarbleTokenType.Chapter && int.TryParse(token.Text, out int chapNum))
            {
                currentChapter = chapNum;
                currentVerse = 0;
                continue;
            }

            // Track current verse from Verse tokens
            if (token.Type == MarbleTokenType.Verse && int.TryParse(token.Text, out int verseNum))
                currentVerse = verseNum;

            // Check scope inclusion
            if (
                !IsInScope(
                    input.Scope,
                    i,
                    currentChapter,
                    currentVerse,
                    input.CurrentRef.ChapterNum,
                    input.CurrentRef.VerseNum,
                    sectionStart,
                    sectionEnd
                )
            )
                continue;

            if (token.Type != MarbleTokenType.TextLink)
                continue;

            IList<string>? linkList = GetLinksForType(token, input.LinkType);
            if (linkList == null || linkList.Count == 0)
                continue;

            // Apply text filter (BHV-602)
            if (
                !string.IsNullOrEmpty(input.FilterText)
                && !LemmaMatchesFilter(linkList, input.FilterText)
            )
                continue;

            result.Add(token);
        }

        return result;
    }

    /// <summary>
    /// Determines whether a token at the given index is within the requested scope.
    /// </summary>
    private static bool IsInScope(
        ScopeEnum scope,
        int tokenIndex,
        int currentChapter,
        int currentVerse,
        int targetChapter,
        int targetVerse,
        int sectionStart,
        int sectionEnd
    )
    {
        bool sameChapter = currentChapter == targetChapter;
        return scope switch
        {
            ScopeEnum.CurrentVerse => sameChapter && currentVerse == targetVerse,
            ScopeEnum.CurrentSection => tokenIndex >= sectionStart && tokenIndex <= sectionEnd,
            ScopeEnum.CurrentChapter => sameChapter,
            _ => false,
        };
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleForm.cs:574-628
    // Method: MarbleForm section boundary detection logic
    // Maps to: EXT-006
    /// <summary>
    /// Detects section boundaries from ParagraphStart markers with section styles (s1, s2, etc.).
    /// Returns the boundary containing the given verse reference. The search is bounded to
    /// the current chapter so section detection cannot walk across a Chapter marker.
    /// </summary>
    private static SectionBoundary DetectSectionBoundary(
        MarbleToken[] tokens,
        SIL.Scripture.VerseRef currentRef
    )
    {
        // Find chapter-token indices to bound the search.
        var chapterIndicesByNum = new Dictionary<int, int>();
        for (int i = 0; i < tokens.Length; i++)
        {
            if (
                tokens[i].Type == MarbleTokenType.Chapter
                && int.TryParse(tokens[i].Text, out int n)
            )
                chapterIndicesByNum[n] = i;
        }

        int currentVerseTokenIndex = FindVerseTokenIndex(
            tokens,
            currentRef.ChapterNum,
            currentRef.VerseNum
        );

        // Determine chapter bounds [chapStart, chapEnd] for the current chapter.
        int chapStart = chapterIndicesByNum.TryGetValue(currentRef.ChapterNum, out var cs) ? cs : 0;
        int chapEnd = tokens.Length - 1;
        if (chapterIndicesByNum.TryGetValue(currentRef.ChapterNum + 1, out var nextCs))
            chapEnd = nextCs - 1;

        if (currentVerseTokenIndex < 0)
            return new SectionBoundary(chapStart, chapEnd);

        // Section markers within the current chapter only.
        var sectionMarkerIndices = new List<int>();
        for (int i = chapStart; i <= chapEnd; i++)
        {
            if (tokens[i].Type == MarbleTokenType.ParagraphStart && IsSectionStyle(tokens[i].Style))
                sectionMarkerIndices.Add(i);
        }

        int sectionStart = chapStart;
        int sectionEnd = chapEnd;

        for (int i = 0; i < sectionMarkerIndices.Count; i++)
        {
            int markerIdx = sectionMarkerIndices[i];
            if (markerIdx <= currentVerseTokenIndex)
                sectionStart = markerIdx;
            else
            {
                sectionEnd = markerIdx - 1;
                break;
            }
        }

        return new SectionBoundary(sectionStart, sectionEnd);
    }

    /// <summary>
    /// Check whether a token has links of the specified type.
    /// </summary>
    private static bool HasLinksOfType(MarbleToken token, MarbleLinkType linkType)
    {
        IList<string>? links = GetLinksForType(token, linkType);
        return links != null && links.Count > 0;
    }

    /// <summary>
    /// Get the link list from a token for the specified link type.
    /// </summary>
    private static IList<string>? GetLinksForType(MarbleToken token, MarbleLinkType linkType)
    {
        return linkType switch
        {
            MarbleLinkType.Lexical => token.LexicalLinks,
            MarbleLinkType.Thematic => token.ThematicLinks,
            MarbleLinkType.Textual => token.TargetLinks,
            MarbleLinkType.Image => token.ImageLinks,
            MarbleLinkType.Map => token.MapLinks,
            _ => null,
        };
    }

    /// <summary>
    /// Convert a TextLink token to a MarbleLexicalLinkOutput.
    /// Parses the first entry in the link list for lemma/senseId/entryReference.
    /// Format: "SDBH:lemma:senseId" or "SDBG:lemma:senseId"
    /// </summary>
    private static MarbleLexicalLinkOutput? BuildLinkOutput(
        MarbleToken token,
        MarbleLinkType linkType,
        IList<string> linkList
    )
    {
        string firstEntry = linkList[0];
        var (lemma, senseId, entryRef) = ParseLinkEntry(firstEntry);

        return new MarbleLexicalLinkOutput(
            Lemma: lemma,
            SenseId: senseId,
            EntryReference: entryRef,
            LinkType: linkType,
            SourceText: token.Text ?? "",
            Transliteration: "",
            StrongNumber: token.StrongNumber ?? ""
        );
    }

    /// <summary>
    /// Parse a link entry in format "DICT:lemma:senseId" (e.g., "SDBH:lemma:001001000").
    /// Returns (lemma, senseId, fullEntry as entryReference).
    /// </summary>
    private static (string Lemma, string SenseId, string EntryRef) ParseLinkEntry(string entry)
    {
        string[] parts = entry.Split(':');
        string lemma = parts.Length >= 2 ? parts[1] : "";
        string senseId = parts.Length >= 3 ? parts[2] : "";
        return (lemma, senseId, entry);
    }

    /// <summary>
    /// Check if any link entry's lemma matches the filter text (BHV-602).
    /// Link format: "SDBH:lemma:senseId"
    /// </summary>
    private static bool LemmaMatchesFilter(IList<string> linkList, string filterText)
    {
        foreach (string entry in linkList)
        {
            string[] parts = entry.Split(':');
            if (parts.Length >= 2 && parts[1] == filterText)
                return true;
        }
        return false;
    }

    /// <summary>
    /// Find the token index of a Verse token with the given verse number, scoped
    /// to the given chapter. Walks the token stream tracking the current chapter
    /// from Chapter tokens so verse-number collisions across chapters are resolved
    /// to the requested chapter's verse.
    /// </summary>
    private static int FindVerseTokenIndex(MarbleToken[] tokens, int targetChapter, int verseNum)
    {
        int currentChapter = 0;
        for (int i = 0; i < tokens.Length; i++)
        {
            if (
                tokens[i].Type == MarbleTokenType.Chapter
                && int.TryParse(tokens[i].Text, out int c)
            )
            {
                currentChapter = c;
                continue;
            }
            if (
                currentChapter == targetChapter
                && tokens[i].Type == MarbleTokenType.Verse
                && int.TryParse(tokens[i].Text, out int v)
                && v == verseNum
            )
            {
                return i;
            }
        }
        return -1;
    }

    /// <summary>
    /// Check if a paragraph style is a section heading style (s1, s2, s3, s4, etc.)
    /// </summary>
    private static bool IsSectionStyle(string? style)
    {
        if (string.IsNullOrEmpty(style))
            return false;

        return style.Length >= 2 && style[0] == 's' && char.IsDigit(style[1]);
    }
}
