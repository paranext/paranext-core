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

        // Single pass: track verse, filter by scope, extract matching links
        var scopedLinks = CollectScopedLinks(tokens, input, sectionBoundary);

        return new ScopeFilterResult(
            Links: scopedLinks,
            TotalLinkCount: totalLinkCount,
            IsEmpty: scopedLinks.Count == 0,
            SectionBoundary: sectionBoundary
        );
    }

    /// <summary>
    /// Single-pass collection of in-scope links. Tracks current verse from Verse tokens,
    /// applies scope filtering, link type matching, and optional text filter.
    /// </summary>
    private static List<MarbleLexicalLinkOutput> CollectScopedLinks(
        MarbleToken[] tokens,
        ScopeFilterInput input,
        SectionBoundary? sectionBoundary
    )
    {
        var result = new List<MarbleLexicalLinkOutput>();
        int currentVerse = 0;

        int sectionStart = sectionBoundary?.StartIndex ?? 0;
        int sectionEnd = sectionBoundary?.EndIndex ?? tokens.Length - 1;

        for (int i = 0; i < tokens.Length; i++)
        {
            MarbleToken token = tokens[i];

            // Track current verse from Verse tokens
            if (token.Type == MarbleTokenType.Verse && int.TryParse(token.Text, out int verseNum))
                currentVerse = verseNum;

            // Check scope inclusion
            if (
                !IsInScope(
                    input.Scope,
                    i,
                    currentVerse,
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

            var linkOutput = BuildLinkOutput(token, input.LinkType, linkList);
            if (linkOutput == null)
                continue;

            // Apply text filter (BHV-602)
            if (
                !string.IsNullOrEmpty(input.FilterText)
                && !LemmaMatchesFilter(linkList, input.FilterText)
            )
                continue;

            result.Add(linkOutput);
        }

        return result;
    }

    /// <summary>
    /// Determines whether a token at the given index is within the requested scope.
    /// </summary>
    private static bool IsInScope(
        ScopeEnum scope,
        int tokenIndex,
        int currentVerse,
        int targetVerse,
        int sectionStart,
        int sectionEnd
    )
    {
        return scope switch
        {
            ScopeEnum.CurrentVerse => currentVerse == targetVerse,
            ScopeEnum.CurrentSection => tokenIndex >= sectionStart && tokenIndex <= sectionEnd,
            ScopeEnum.CurrentChapter => true,
            _ => false,
        };
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleForm.cs:574-628
    // Method: MarbleForm section boundary detection logic
    // Maps to: EXT-006
    /// <summary>
    /// Detects section boundaries from ParagraphStart markers with section styles (s1, s2, etc.).
    /// Returns the boundary containing the given verse reference.
    /// </summary>
    private static SectionBoundary DetectSectionBoundary(
        MarbleToken[] tokens,
        SIL.Scripture.VerseRef currentRef
    )
    {
        // Find all section marker positions (ParagraphStart with s1/s2/s3/s4 styles)
        var sectionMarkerIndices = new List<int>();
        for (int i = 0; i < tokens.Length; i++)
        {
            if (tokens[i].Type == MarbleTokenType.ParagraphStart && IsSectionStyle(tokens[i].Style))
                sectionMarkerIndices.Add(i);
        }

        // Find which section contains the current verse
        int currentVerseTokenIndex = FindVerseTokenIndex(tokens, currentRef.VerseNum);

        if (currentVerseTokenIndex < 0)
        {
            // Verse not found - return boundary covering entire chapter
            return new SectionBoundary(0, tokens.Length - 1);
        }

        // Find the section boundary that contains this verse
        int sectionStart = 0;
        int sectionEnd = tokens.Length - 1;

        for (int i = 0; i < sectionMarkerIndices.Count; i++)
        {
            int markerIdx = sectionMarkerIndices[i];
            if (markerIdx <= currentVerseTokenIndex)
            {
                sectionStart = markerIdx;
            }
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
    /// Find the token index of a Verse token with the given verse number.
    /// </summary>
    private static int FindVerseTokenIndex(MarbleToken[] tokens, int verseNum)
    {
        for (int i = 0; i < tokens.Length; i++)
        {
            if (
                tokens[i].Type == MarbleTokenType.Verse
                && int.TryParse(tokens[i].Text, out int num)
                && num == verseNum
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
