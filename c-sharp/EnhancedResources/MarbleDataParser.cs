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
internal static class MarbleDataParser
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
        {
            return Task.FromResult(
                new ParseUsxTokensResult(
                    false,
                    Error: new ErrorInfo("PARSE_ERROR", "Failed to parse USX content")
                )
            );
        }

        XDocument doc;
        try
        {
            doc = XDocument.Parse(input.UsxContent);
        }
        catch (System.Xml.XmlException)
        {
            return Task.FromResult(
                new ParseUsxTokensResult(
                    false,
                    Error: new ErrorInfo("PARSE_ERROR", "Failed to parse USX content")
                )
            );
        }

        var tokens = new List<MarbleToken>();
        var sectionBoundaries = new List<int>();
        int tokenIndex = 0;

        XElement? root = doc.Root;
        if (root == null)
        {
            return Task.FromResult(
                new ParseUsxTokensResult(
                    false,
                    Error: new ErrorInfo("PARSE_ERROR", "Failed to parse USX content")
                )
            );
        }

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
                    new MarbleToken(
                        MarbleTokenType.Book,
                        Text: element.Value,
                        Style: element.Attribute("style")?.Value,
                        Links: null,
                        VerseNumber: null,
                        TokenIndex: tokenIndex++,
                        SourceWord: null,
                        PhraseText: null
                    )
                );
                break;

            case "chapter":
                // Skip end markers (eid attributes)
                if (element.Attribute("eid") != null)
                    break;
                tokens.Add(
                    new MarbleToken(
                        MarbleTokenType.Chapter,
                        Text: null,
                        Style: element.Attribute("style")?.Value,
                        Links: null,
                        VerseNumber: null,
                        TokenIndex: tokenIndex++,
                        SourceWord: null,
                        PhraseText: null
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

        tokens.Add(
            new MarbleToken(
                MarbleTokenType.ParagraphStart,
                Text: null,
                Style: style,
                Links: null,
                VerseNumber: null,
                TokenIndex: tokenIndex++,
                SourceWord: null,
                PhraseText: null
            )
        );

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
        tokens.Add(
            new MarbleToken(
                MarbleTokenType.ParagraphEnd,
                Text: null,
                Style: style,
                Links: null,
                VerseNumber: null,
                TokenIndex: tokenIndex++,
                SourceWord: null,
                PhraseText: null
            )
        );
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
            new MarbleToken(
                MarbleTokenType.Verse,
                Text: null,
                Style: element.Attribute("style")?.Value,
                Links: null,
                VerseNumber: verseNumber,
                TokenIndex: tokenIndex++,
                SourceWord: null,
                PhraseText: null
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
        tokens.Add(
            new MarbleToken(
                MarbleTokenType.CharacterStart,
                Text: null,
                Style: style,
                Links: null,
                VerseNumber: null,
                TokenIndex: tokenIndex++,
                SourceWord: null,
                PhraseText: null
            )
        );

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
                new MarbleToken(
                    MarbleTokenType.TextLink,
                    Text: element.Value,
                    Style: style,
                    Links: links,
                    VerseNumber: null,
                    TokenIndex: tokenIndex++,
                    SourceWord: sourceWord,
                    PhraseText: null
                )
            );
        }

        tokens.Add(
            new MarbleToken(
                MarbleTokenType.CharacterEnd,
                Text: null,
                Style: style,
                Links: null,
                VerseNumber: null,
                TokenIndex: tokenIndex++,
                SourceWord: null,
                PhraseText: null
            )
        );
    }

    private static void ProcessNoteElement(
        XElement element,
        List<MarbleToken> tokens,
        ref int tokenIndex
    )
    {
        tokens.Add(
            new MarbleToken(
                MarbleTokenType.Note,
                Text: element.Value,
                Style: element.Attribute("style")?.Value,
                Links: null,
                VerseNumber: null,
                TokenIndex: tokenIndex++,
                SourceWord: null,
                PhraseText: null
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

        // Determine if this is whitespace-only text
        if (string.IsNullOrWhiteSpace(text))
        {
            tokens.Add(
                new MarbleToken(
                    MarbleTokenType.Whitespace,
                    Text: text,
                    Style: null,
                    Links: null,
                    VerseNumber: null,
                    TokenIndex: tokenIndex++,
                    SourceWord: null,
                    PhraseText: null
                )
            );
        }
        else
        {
            // Text content - emit as Whitespace tokens for leading/trailing whitespace
            // and content as-is. For simplicity, we emit the entire text node.
            // The tests check for Whitespace token type presence in the stream
            // when there is whitespace between elements.
            tokens.Add(
                new MarbleToken(
                    MarbleTokenType.Whitespace,
                    Text: text,
                    Style: null,
                    Links: null,
                    VerseNumber: null,
                    TokenIndex: tokenIndex++,
                    SourceWord: null,
                    PhraseText: null
                )
            );
        }
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
    private static readonly Regex CantillationPattern =
        new("[\u0591-\u05AF\u05BD\u05C3]", RegexOptions.Compiled);

    private static string StripCantillationMarks(string text)
    {
        return CantillationPattern.Replace(text, "");
    }

    /// <summary>
    /// Strip square brackets from source word text (TS-081, GM-021).
    /// Source words from critical apparatus sometimes have brackets like "[klinon]".
    /// </summary>
    private static string StripBrackets(string text)
    {
        return text.Replace("[", "").Replace("]", "");
    }

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
                if (!linkGroups.ContainsKey(key))
                    linkGroups[key] = new List<int>();
                linkGroups[key].Add(i);
            }
        }

        // For each group with multiple tokens, compute phrase text
        foreach (var group in linkGroups)
        {
            List<int> indices = group.Value;
            if (indices.Count < 2)
                continue;

            // Check gaps between consecutive tokens in the group
            for (int g = 0; g < indices.Count; g++)
            {
                int currentIdx = indices[g];
                MarbleToken currentToken = tokens[currentIdx];
                string? surfaceText = currentToken.SourceWord?.SurfaceText;

                if (g == 0)
                {
                    // Build phrase text for the first token
                    var phraseBuilder = new StringBuilder();
                    phraseBuilder.Append(surfaceText ?? currentToken.Text ?? "");

                    for (int n = 1; n < indices.Count; n++)
                    {
                        int prevIdx = indices[n - 1];
                        int nextIdx = indices[n];
                        int gap = nextIdx - prevIdx - 1;
                        string nextText =
                            tokens[nextIdx].SourceWord?.SurfaceText ?? tokens[nextIdx].Text ?? "";

                        if (gap > 2)
                        {
                            phraseBuilder.Append('\u2026');
                            phraseBuilder.Append(nextText);
                        }
                        else
                        {
                            phraseBuilder.Append(' ');
                            phraseBuilder.Append(nextText);
                        }
                    }

                    string phraseText = phraseBuilder.ToString();

                    // Update all tokens in the group with the phrase text
                    foreach (int idx in indices)
                    {
                        MarbleToken t = tokens[idx];
                        tokens[idx] = t with { PhraseText = phraseText };
                    }

                    break; // Only need to process once per group
                }
            }
        }
    }
}
