using System.Text;
using System.Text.RegularExpressions;
using System.Xml.Linq;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Parses USX XML content into structured MarbleToken streams with section
/// boundary detection. Optionally loads Greek/Hebrew source word data.
///
/// Contract: Section 4.2 ParseUsxTokens (data-contracts.md)
/// Behavior: BHV-608 (Marble Data Parsing and Token Extraction)
/// Extractions: EXT-006, EXT-013, EXT-014, EXT-015
/// </summary>
internal static partial class MarbleDataParser
{
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
    /// Delegates to LexiconService.ParseLexicalLinksAsync for format parsing.
    /// </summary>
    private static IReadOnlyList<LexicalLink>? ParseLinkHref(string linkHref)
    {
        var result = LexiconService
            .ParseLexicalLinksAsync(new LexicalLinkInput(linkHref), CancellationToken.None)
            .Result;
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
}
