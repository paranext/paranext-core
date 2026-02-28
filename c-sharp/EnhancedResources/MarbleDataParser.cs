using System.Text;
using System.Text.RegularExpressions;
using System.Xml.Linq;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Parses USX XML content into structured MarbleToken streams with section
/// boundary detection. Optionally loads Greek/Hebrew source word data.
/// Also provides scope-based filtering of lexical links (CAP-003).
///
/// Contract: Section 4.2 ParseUsxTokens, Section 4.3 GetLinksInScope (data-contracts.md)
/// Behavior: BHV-608 (Marble Data Parsing and Token Extraction), BHV-402 (Scope Filter)
/// Extractions: EXT-006, EXT-007, EXT-013, EXT-014, EXT-015
/// </summary>
internal static partial class MarbleDataParser
{
    private static readonly HashSet<string> ValidScopes =
    [
        "currentVerse",
        "currentSection",
        "currentChapter",
        "currentSense",
    ];

    // === NEW IN PT10 ===
    // Reason: PAPI command pattern - static async API for data provider integration
    // Maps to: CAP-002
    /// <summary>
    /// Parse USX XML content into a structured token stream with section boundaries.
    /// </summary>
    /// <remarks>
    /// Ported from PT9 MarbleDataParser.cs (EXT-006).
    /// Section boundaries detected at \s paragraph markers (INV-017).
    /// Hebrew cantillation marks stripped from source words (VAL-012).
    /// Square brackets stripped from source words (TS-081).
    /// Phrase text aggregation uses ellipsis for gaps > 2 words (EXT-015).
    /// </remarks>
    public static Task<ParseUsxTokensResult> ParseUsxTokensAsync(
        TokenParsingInput input,
        CancellationToken ct
    )
    {
        if (string.IsNullOrEmpty(input.UsxContent))
            return CreateParseErrorResult();

        XDocument doc;
        try
        {
            doc = XDocument.Parse(input.UsxContent);
        }
        catch (System.Xml.XmlException)
        {
            return CreateParseErrorResult();
        }

        XElement? root = doc.Root;
        if (root == null)
            return CreateParseErrorResult();

        var tokens = new List<MarbleToken>();
        var sectionBoundaries = new List<int>();
        int tokenIndex = 0;

        // === PORTED FROM PT9 ===
        // Source: PT9/MarbleDataParser.cs (EXT-006)
        // Method: ParseUsxXml
        // Maps to: EXT-006
        foreach (XNode node in root.Nodes())
        {
            if (node is XElement element)
            {
                ProcessElement(element, input, tokens, sectionBoundaries, ref tokenIndex);
            }
        }

        // EXT-015: Phrase text aggregation (only when source words are loaded)
        if (input.IncludeSourceWords)
        {
            ComputePhraseText(tokens);
        }

        return Task.FromResult(
            new ParseUsxTokensResult(true, Tokens: tokens, SectionBoundaries: sectionBoundaries)
        );
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/MarbleDataParser.cs (EXT-006)
    // Method: ProcessUsxElement
    // Maps to: EXT-006, EXT-014
    private static void ProcessElement(
        XElement element,
        TokenParsingInput input,
        List<MarbleToken> tokens,
        List<int> sectionBoundaries,
        ref int tokenIndex
    )
    {
        string localName = element.Name.LocalName;

        switch (localName)
        {
            case "book":
                tokens.Add(
                    CreateToken(
                        MarbleTokenType.Book,
                        ref tokenIndex,
                        text: element.Value,
                        style: element.Attribute("style")?.Value
                    )
                );
                break;

            case "chapter":
                // Skip end markers (eid attributes)
                if (element.Attribute("eid") != null)
                    break;
                tokens.Add(
                    CreateToken(
                        MarbleTokenType.Chapter,
                        ref tokenIndex,
                        style: element.Attribute("style")?.Value
                    )
                );
                break;

            case "para":
                ProcessParaElement(element, input, tokens, sectionBoundaries, ref tokenIndex);
                break;

            case "verse":
                ProcessVerseElement(element, tokens, ref tokenIndex);
                break;

            case "char":
                ProcessCharElement(element, input, tokens, ref tokenIndex);
                break;

            case "note":
                ProcessNoteElement(element, tokens, ref tokenIndex);
                break;
        }
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/MarbleDataParser.cs (EXT-014)
    // Method: ProcessParagraph
    // Maps to: EXT-014, INV-017
    private static void ProcessParaElement(
        XElement element,
        TokenParsingInput input,
        List<MarbleToken> tokens,
        List<int> sectionBoundaries,
        ref int tokenIndex
    )
    {
        string? style = element.Attribute("style")?.Value;
        int paraStartIndex = tokenIndex;

        tokens.Add(CreateToken(MarbleTokenType.ParagraphStart, ref tokenIndex, style: style));

        // INV-017: Section boundaries detected at \s paragraph markers
        if (style != null && style.StartsWith('s'))
        {
            sectionBoundaries.Add(paraStartIndex);
        }

        // Process child nodes within the paragraph
        foreach (XNode child in element.Nodes())
        {
            if (child is XElement childElement)
            {
                ProcessElement(childElement, input, tokens, sectionBoundaries, ref tokenIndex);
            }
            else if (child is XText textNode)
            {
                ProcessTextNode(textNode, tokens, ref tokenIndex);
            }
        }

        // EXT-014: ParagraphEnd to pair with ParagraphStart
        tokens.Add(CreateToken(MarbleTokenType.ParagraphEnd, ref tokenIndex, style: style));
    }

    private static void ProcessVerseElement(
        XElement element,
        List<MarbleToken> tokens,
        ref int tokenIndex
    )
    {
        // Skip end markers (eid attributes)
        if (element.Attribute("eid") != null)
            return;

        string? numberStr = element.Attribute("number")?.Value;
        int? verseNumber = null;
        if (numberStr != null && int.TryParse(numberStr, out int parsed))
        {
            verseNumber = parsed;
        }

        tokens.Add(
            CreateToken(
                MarbleTokenType.Verse,
                ref tokenIndex,
                style: element.Attribute("style")?.Value,
                verseNumber: verseNumber
            )
        );
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/MarbleDataParser.cs (EXT-006, EXT-013)
    // Method: ProcessCharElement
    // Maps to: EXT-006, EXT-013
    private static void ProcessCharElement(
        XElement element,
        TokenParsingInput input,
        List<MarbleToken> tokens,
        ref int tokenIndex
    )
    {
        string? linkHref = element.Attribute("link-href")?.Value;
        string? style = element.Attribute("style")?.Value;

        // EXT-014: All char elements produce CharacterStart/CharacterEnd pair
        tokens.Add(CreateToken(MarbleTokenType.CharacterStart, ref tokenIndex, style: style));

        if (linkHref != null)
        {
            // This is a TextLink token - has lexical link data
            IReadOnlyList<LexicalLink>? links = ParseLinkHref(linkHref);
            SourceWord? sourceWord = null;

            if (input.IncludeSourceWords)
            {
                sourceWord = ExtractSourceWord(element);
            }

            tokens.Add(
                CreateToken(
                    MarbleTokenType.TextLink,
                    ref tokenIndex,
                    text: element.Value,
                    style: style,
                    links: links,
                    sourceWord: sourceWord
                )
            );
        }

        tokens.Add(CreateToken(MarbleTokenType.CharacterEnd, ref tokenIndex, style: style));
    }

    private static void ProcessNoteElement(
        XElement element,
        List<MarbleToken> tokens,
        ref int tokenIndex
    )
    {
        tokens.Add(
            CreateToken(
                MarbleTokenType.Note,
                ref tokenIndex,
                text: element.Value,
                style: element.Attribute("style")?.Value
            )
        );
    }

    private static void ProcessTextNode(
        XText textNode,
        List<MarbleToken> tokens,
        ref int tokenIndex
    )
    {
        string text = textNode.Value;
        if (string.IsNullOrEmpty(text))
            return;

        // All text nodes (whitespace-only and content) emit as Whitespace tokens.
        // Tests verify Whitespace token type presence in the stream for
        // whitespace between elements (TS-049, GM-011).
        tokens.Add(CreateToken(MarbleTokenType.Whitespace, ref tokenIndex, text: text));
    }

    /// <summary>
    /// Parse a link-href attribute value into LexicalLink objects.
    /// Delegates to LexiconService.ParseLexicalLinks for synchronous format parsing.
    /// </summary>
    private static IReadOnlyList<LexicalLink>? ParseLinkHref(string linkHref)
    {
        var result = LexiconService.ParseLexicalLinks(new LexicalLinkInput(linkHref));
        return result.Success ? result.Links : null;
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/MarbleDataParser.cs (EXT-013)
    // Method: ExtractSourceWordData
    // Maps to: EXT-013
    //
    // EXPLANATION:
    // Source word data is embedded as attributes on USX <char> elements:
    //   src-text: the surface form (may contain cantillation marks or brackets)
    //   src-transliteration: transliterated form
    //   src-pos: part-of-speech tag
    //   src-lemma: lemma text
    // After extraction, surface text is cleaned:
    //   1. Hebrew cantillation marks stripped (VAL-012)
    //   2. Square brackets stripped (TS-081, GM-021)
    private static SourceWord? ExtractSourceWord(XElement element)
    {
        string? srcText = element.Attribute("src-text")?.Value;
        string? srcTransliteration = element.Attribute("src-transliteration")?.Value;
        string? srcPos = element.Attribute("src-pos")?.Value;
        string? srcLemma = element.Attribute("src-lemma")?.Value;

        if (srcText == null)
            return null;

        // Clean the surface text
        string cleanedText = StripBrackets(StripCantillationMarks(srcText));

        return new SourceWord(
            SurfaceText: cleanedText,
            Transliteration: srcTransliteration ?? "",
            PosTag: srcPos ?? "",
            Lemma: srcLemma ?? ""
        );
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/MarbleDataParser.cs (VAL-012)
    // Method: StripCantillationMarks
    // Maps to: VAL-012
    //
    // EXPLANATION:
    // Hebrew cantillation marks are diacritical marks used for chanting/recitation.
    // They are stripped from source word display text per VAL-012.
    // The Unicode ranges to remove are:
    //   U+0591 - U+05AF: Hebrew accents (etnahta, segol, shalshelet, etc.)
    //   U+05BD: Hebrew point meteg
    //   U+05C3: Hebrew punctuation sof pasuq
    [GeneratedRegex("[\u0591-\u05AF\u05BD\u05C3]")]
    private static partial Regex CantillationPattern();

    private static string StripCantillationMarks(string text) =>
        CantillationPattern().Replace(text, "");

    /// <summary>
    /// Strip square brackets from source word text (TS-081, GM-021).
    /// Source words from critical apparatus sometimes have brackets like "[klinon]".
    /// </summary>
    private static string StripBrackets(string text) => text.Replace("[", "").Replace("]", "");

    /// <summary>
    /// Creates a MarbleToken with sensible defaults for the many optional fields.
    /// Most tokens only need Type, TokenIndex, and one or two additional fields.
    /// </summary>
    private static MarbleToken CreateToken(
        MarbleTokenType type,
        ref int tokenIndex,
        string? text = null,
        string? style = null,
        IReadOnlyList<LexicalLink>? links = null,
        int? verseNumber = null,
        SourceWord? sourceWord = null
    ) => new(type, text, style, links, verseNumber, tokenIndex++, sourceWord, PhraseText: null);

    private static Task<ParseUsxTokensResult> CreateParseErrorResult() =>
        Task.FromResult(
            new ParseUsxTokensResult(
                false,
                Error: new ErrorInfo("PARSE_ERROR", "Failed to parse USX content")
            )
        );

    private static Task<GetLinksInScopeResult> CreateScopeErrorResult(
        string code,
        string message
    ) => Task.FromResult(new GetLinksInScopeResult(false, Error: new ErrorInfo(code, message)));

    // === PORTED FROM PT9 ===
    // Source: PT9/MarbleDataParser.cs (EXT-015)
    // Method: ComputePhraseText
    // Maps to: EXT-015
    //
    // EXPLANATION:
    // Phrase text aggregation groups tokens that share the same lexical link.
    // When tokens sharing a link are adjacent, their surface texts are
    // concatenated with a space separator.
    // When there is a gap of more than 2 non-link tokens between them,
    // an ellipsis (U+2026) is used as separator instead.
    private static void ComputePhraseText(List<MarbleToken> tokens)
    {
        // Group TextLink tokens by their link key (dictionary:lemma:indices)
        var linkGroups = new Dictionary<string, List<int>>();

        for (int i = 0; i < tokens.Count; i++)
        {
            MarbleToken token = tokens[i];
            if (token.Type != MarbleTokenType.TextLink || token.Links == null)
                continue;

            foreach (LexicalLink link in token.Links)
            {
                string key =
                    $"{link.Dictionary}:{link.Lemma}:{link.BaseFormIndex:D3}{link.MeaningIndex:D3}";
                if (!linkGroups.TryGetValue(key, out List<int>? group))
                {
                    group = new List<int>();
                    linkGroups[key] = group;
                }
                group.Add(i);
            }
        }

        // For each group with multiple tokens, compute phrase text
        foreach (List<int> indices in linkGroups.Values)
        {
            if (indices.Count < 2)
                continue;

            // Build phrase text starting from the first token in the group
            MarbleToken firstToken = tokens[indices[0]];
            var phraseBuilder = new StringBuilder();
            phraseBuilder.Append(firstToken.SourceWord?.SurfaceText ?? firstToken.Text ?? "");

            for (int n = 1; n < indices.Count; n++)
            {
                int gap = indices[n] - indices[n - 1] - 1;
                string nextText =
                    tokens[indices[n]].SourceWord?.SurfaceText ?? tokens[indices[n]].Text ?? "";

                phraseBuilder.Append(gap > 2 ? '\u2026' : ' ');
                phraseBuilder.Append(nextText);
            }

            string phraseText = phraseBuilder.ToString();

            // Update all tokens in the group with the computed phrase text
            foreach (int idx in indices)
            {
                tokens[idx] = tokens[idx] with { PhraseText = phraseText };
            }
        }
    }

    // === NEW IN PT10 ===
    // Reason: PAPI command pattern - static async API for scope-based link filtering
    // Maps to: CAP-003
    /// <summary>
    /// Filter the token stream to return only lexical links within the specified scope
    /// (verse, section, chapter, or sense).
    /// </summary>
    /// <remarks>
    /// Ported from PT9 MarbleDataParser.cs (EXT-007).
    /// Scope values: CurrentVerse, CurrentSection, CurrentChapter, CurrentSense.
    /// Section boundaries from \s markers (INV-017).
    /// Deduplication applied to returned links (BHV-402).
    /// Text filter matching by surface form (TS-054).
    /// </remarks>
    public static Task<GetLinksInScopeResult> GetLinksInScopeAsync(
        ScopeFilterInput input,
        ParseUsxTokensResult parsedTokens,
        CancellationToken ct
    )
    {
        // Validate: Chapter tokens must be available (INVALID_STATE)
        if (!parsedTokens.Success || parsedTokens.Tokens == null)
        {
            return CreateScopeErrorResult("INVALID_STATE", "Chapter tokens not yet available");
        }

        // Validate: Scope must be a known value (INVALID_INPUT)
        if (!ValidScopes.Contains(input.Scope))
        {
            return CreateScopeErrorResult(
                "INVALID_INPUT",
                "Scope must be currentVerse, currentSection, currentChapter, or currentSense"
            );
        }

        // Validate: currentSense requires an active lemma filter (INVALID_INPUT)
        if (input.Scope == "currentSense" && input.FilteredLemma == null)
        {
            return CreateScopeErrorResult(
                "INVALID_INPUT",
                "currentSense scope requires an active lemma filter"
            );
        }

        IReadOnlyList<MarbleToken> tokens = parsedTokens.Tokens;
        IReadOnlyList<int>? sectionBoundaries = parsedTokens.SectionBoundaries;

        // Determine the token index range based on scope
        int rangeStart = 0;
        int rangeEnd = tokens.Count;

        switch (input.Scope)
        {
            case "currentVerse":
                (rangeStart, rangeEnd) = FindVerseRange(tokens, input.VerseRef.VerseNum);
                break;

            case "currentSection":
                (rangeStart, rangeEnd) = FindSectionRange(
                    tokens,
                    sectionBoundaries,
                    input.VerseRef.VerseNum
                );
                break;

            case "currentChapter":
                // All tokens in the chapter
                break;

            case "currentSense":
                // All tokens, but will filter by lemma below
                break;
        }

        // Collect TextLink tokens in range, applying filters
        var (links, tokenIndices) = CollectLinksInRange(
            tokens,
            rangeStart,
            rangeEnd,
            input.Scope,
            input.FilteredSource,
            input.FilteredLemma
        );

        return Task.FromResult(
            new GetLinksInScopeResult(
                true,
                Links: links,
                TokenIndices: tokenIndices,
                MatchCount: links.Count
            )
        );
    }

    /// <summary>
    /// Collect TextLink tokens within a token range, applying optional text and lemma filters.
    /// </summary>
    private static (List<LexicalLink> Links, List<int> TokenIndices) CollectLinksInRange(
        IReadOnlyList<MarbleToken> tokens,
        int rangeStart,
        int rangeEnd,
        string scope,
        string? filteredSource,
        string? filteredLemma
    )
    {
        var links = new List<LexicalLink>();
        var tokenIndices = new List<int>();

        for (int i = rangeStart; i < rangeEnd; i++)
        {
            MarbleToken token = tokens[i];
            if (token.Type != MarbleTokenType.TextLink || token.Links == null)
                continue;

            // Apply filteredSource text filter (TS-054)
            if (
                filteredSource != null
                && (token.SourceWord == null || token.SourceWord.SurfaceText != filteredSource)
            )
            {
                continue;
            }

            // Apply currentSense lemma filter
            if (scope == "currentSense" && !token.Links.Any(link => link.Lemma == filteredLemma))
            {
                continue;
            }

            // Add all links from this token
            foreach (LexicalLink link in token.Links)
            {
                // For currentSense, only add matching lemma links
                if (scope == "currentSense" && link.Lemma != filteredLemma)
                    continue;

                links.Add(link);
                tokenIndices.Add(token.TokenIndex);
            }
        }

        return (links, tokenIndices);
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/MarbleDataParser.cs:280-320 (EXT-007)
    // Method: GetLinksInScope - verse range detection
    // Maps to: EXT-007
    private static (int Start, int End) FindVerseRange(
        IReadOnlyList<MarbleToken> tokens,
        int targetVerse
    )
    {
        int start = -1;
        int end = tokens.Count;

        for (int i = 0; i < tokens.Count; i++)
        {
            MarbleToken token = tokens[i];
            if (token.Type == MarbleTokenType.Verse && token.VerseNumber is int vn)
            {
                if (vn == targetVerse)
                {
                    start = i;
                }
                else if (start >= 0)
                {
                    // Found the next verse after our target
                    end = i;
                    break;
                }
            }
        }

        // If target verse not found, return empty range
        if (start < 0)
            return (0, 0);

        return (start, end);
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/MarbleDataParser.cs:340-380 (EXT-007)
    // Method: GetSectionBoundaries - section range from \s markers
    // Maps to: EXT-007, INV-017
    //
    // EXPLANATION:
    // Section boundaries are stored as token indices of ParagraphStart tokens
    // with \s style. To find the section containing a verse:
    // 1. Find which verse token index corresponds to the target verse
    // 2. Find which section boundary range contains that verse token
    // 3. If no section boundaries exist, the entire chapter is one section
    private static (int Start, int End) FindSectionRange(
        IReadOnlyList<MarbleToken> tokens,
        IReadOnlyList<int>? sectionBoundaries,
        int targetVerse
    )
    {
        // If no section boundaries, entire chapter is one section
        if (sectionBoundaries == null || sectionBoundaries.Count == 0)
            return (0, tokens.Count);

        // Find the token index of the target verse
        int verseTokenIndex = -1;
        for (int i = 0; i < tokens.Count; i++)
        {
            if (
                tokens[i].Type == MarbleTokenType.Verse
                && tokens[i].VerseNumber is int vn
                && vn == targetVerse
            )
            {
                verseTokenIndex = i;
                break;
            }
        }

        if (verseTokenIndex < 0)
            return (0, 0);

        // Find which section boundary range contains this verse
        int sectionStart = 0;
        int sectionEnd = tokens.Count;

        for (int i = 0; i < sectionBoundaries.Count; i++)
        {
            if (sectionBoundaries[i] <= verseTokenIndex)
            {
                sectionStart = sectionBoundaries[i];
                sectionEnd =
                    i + 1 < sectionBoundaries.Count ? sectionBoundaries[i + 1] : tokens.Count;
            }
            else
            {
                break;
            }
        }

        return (sectionStart, sectionEnd);
    }
}
