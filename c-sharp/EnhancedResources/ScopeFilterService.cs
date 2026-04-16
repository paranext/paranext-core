namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Scope-based link filtering service. Filters lexical links by verse/section/chapter scope.
/// Section boundaries detected from ParagraphStart markers in the token stream.
/// Source: EXT-005, EXT-006, BHV-305, BHV-601, BHV-602
/// </summary>
internal static class ScopeFilterService
{
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
        {
            return new ScopeFilterResult(
                Links: new List<MarbleLexicalLinkOutput>(),
                TotalLinkCount: 0,
                IsEmpty: true
            );
        }

        // Validate scope enum value
        if (!Enum.IsDefined(typeof(ScopeEnum), input.Scope))
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.InvalidArgument,
                $"Unknown scope value: {input.Scope}"
            );
        }

        // Count total links of the requested type across all tokens (BHV-305)
        int totalLinkCount = CountLinksOfType(tokens, input.LinkType);

        // Determine which token indices are in scope
        var inScopeIndices = GetInScopeTokenIndices(tokens, input);

        // Extract TextLink tokens in scope with matching link type
        var scopedLinks = new List<MarbleLexicalLinkOutput>();
        foreach (int idx in inScopeIndices)
        {
            MarbleToken token = tokens[idx];
            if (token.Type != MarbleTokenType.TextLink)
                continue;

            IList<string>? linkList = GetLinksForType(token, input.LinkType);
            if (linkList == null || linkList.Count == 0)
                continue;

            // Build MarbleLexicalLinkOutput from the token
            var linkOutput = TokenToLinkOutput(token, input.LinkType, linkList);
            if (linkOutput == null)
                continue;

            // Apply text filter (BHV-602)
            if (!string.IsNullOrEmpty(input.FilterText))
            {
                if (!LemmaMatchesFilter(linkList, input.FilterText))
                    continue;
            }

            scopedLinks.Add(linkOutput);
        }

        // Compute section boundary if CurrentSection scope
        SectionBoundary? sectionBoundary = null;
        if (input.Scope == ScopeEnum.CurrentSection)
        {
            sectionBoundary = DetectSectionBoundary(tokens, input.CurrentRef);
        }

        return new ScopeFilterResult(
            Links: scopedLinks,
            TotalLinkCount: totalLinkCount,
            IsEmpty: scopedLinks.Count == 0,
            SectionBoundary: sectionBoundary
        );
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleForm.cs:574-628
    // Method: MarbleForm section boundary detection logic
    // Maps to: EXT-006
    /// <summary>
    /// Detects section boundaries from ParagraphStart markers with section styles (s1, s2, etc.).
    /// Returns the boundary containing the given verse reference.
    /// </summary>
    private static SectionBoundary? DetectSectionBoundary(
        MarbleToken[] tokens,
        SIL.Scripture.VerseRef currentRef
    )
    {
        // Find all section marker positions (ParagraphStart with s1/s2/s3/s4 styles)
        var sectionMarkerIndices = new List<int>();
        for (int i = 0; i < tokens.Length; i++)
        {
            if (tokens[i].Type == MarbleTokenType.ParagraphStart && IsSectionStyle(tokens[i].Style))
            {
                sectionMarkerIndices.Add(i);
            }
        }

        // Find which section contains the current verse
        int currentVerse = currentRef.VerseNum;
        int currentVerseTokenIndex = FindVerseTokenIndex(tokens, currentVerse);

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
    /// Get the token indices that are in scope for the given input.
    /// Tracks current verse by scanning Verse tokens.
    /// </summary>
    private static List<int> GetInScopeTokenIndices(MarbleToken[] tokens, ScopeFilterInput input)
    {
        var indices = new List<int>();
        int currentVerse = 0;

        // For section scope, compute the boundary first
        int sectionStart = 0;
        int sectionEnd = tokens.Length - 1;
        if (input.Scope == ScopeEnum.CurrentSection)
        {
            var boundary = DetectSectionBoundary(tokens, input.CurrentRef);
            if (boundary != null)
            {
                sectionStart = boundary.StartIndex;
                sectionEnd = boundary.EndIndex;
            }
        }

        for (int i = 0; i < tokens.Length; i++)
        {
            MarbleToken token = tokens[i];

            // Track current verse from Verse tokens
            if (token.Type == MarbleTokenType.Verse)
            {
                if (int.TryParse(token.Text, out int verseNum))
                {
                    currentVerse = verseNum;
                }
            }

            switch (input.Scope)
            {
                case ScopeEnum.CurrentVerse:
                    if (currentVerse == input.CurrentRef.VerseNum)
                    {
                        indices.Add(i);
                    }
                    break;

                case ScopeEnum.CurrentSection:
                    if (i >= sectionStart && i <= sectionEnd)
                    {
                        indices.Add(i);
                    }
                    break;

                case ScopeEnum.CurrentChapter:
                    // All tokens in the chapter are in scope
                    indices.Add(i);
                    break;
            }
        }

        return indices;
    }

    /// <summary>
    /// Count all TextLink tokens that have links of the specified type.
    /// </summary>
    private static int CountLinksOfType(MarbleToken[] tokens, MarbleLinkType linkType)
    {
        int count = 0;
        foreach (MarbleToken token in tokens)
        {
            if (token.Type != MarbleTokenType.TextLink)
                continue;

            IList<string>? links = GetLinksForType(token, linkType);
            if (links != null && links.Count > 0)
            {
                count++;
            }
        }
        return count;
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
            MarbleLinkType.Textual => token.TargetLinks, // Textual links stored in TargetLinks
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
    private static MarbleLexicalLinkOutput? TokenToLinkOutput(
        MarbleToken token,
        MarbleLinkType linkType,
        IList<string> linkList
    )
    {
        // Parse the first link entry for metadata
        string firstEntry = linkList[0];
        ParseLinkEntry(firstEntry, out string lemma, out string senseId, out string entryRef);

        return new MarbleLexicalLinkOutput(
            Lemma: lemma,
            SenseId: senseId,
            EntryReference: entryRef,
            LinkType: linkType,
            SourceText: token.Text ?? "",
            Transliteration: "", // Not available from token data
            StrongNumber: token.StrongNumber ?? ""
        );
    }

    /// <summary>
    /// Parse a link entry in format "DICT:lemma:senseId" (e.g., "SDBH:רֵאשִׁית:001001000")
    /// </summary>
    private static void ParseLinkEntry(
        string entry,
        out string lemma,
        out string senseId,
        out string entryRef
    )
    {
        entryRef = entry;
        lemma = "";
        senseId = "";

        string[] parts = entry.Split(':');
        if (parts.Length >= 2)
        {
            lemma = parts[1];
        }
        if (parts.Length >= 3)
        {
            senseId = parts[2];
        }
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
            {
                return true;
            }
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
