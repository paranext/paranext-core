using System.Xml;
using System.Xml.Linq;

namespace Paranext.DataProvider.EnhancedResources;

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleDataParser.cs:1-553
// Method: MarbleDataParser constructor (parsing logic)
// Maps to: EXT-016
/// <summary>
/// Parses Marble-enhanced XML (EmdrosDump/wg elements with 7 annotation attributes)
/// into structured MarbleToken arrays. NOT standard USX parsing.
///
/// Source: EXT-016, BHV-600, BHV-603
/// CAP-002: ParseMarbleTokens
/// </summary>
public static class MarbleTokenParser
{
    // EXPLANATION:
    // This parser walks Marble XML (EmdrosDump format) and produces a flat
    // array of MarbleToken with 11 token types. The algorithm:
    // 1. Validate input (null/empty -> INVALID_ARGUMENT, malformed -> INTERNAL)
    // 2. Parse XML with PreserveWhitespace to maintain BHV-603
    // 3. Find the <usx_book> element (BHV-600: skip everything before it)
    // 4. Emit a Book token from usx_book's code attribute
    // 5. Recursively walk child nodes of usx_book:
    //    - <chapter> -> Chapter token (self-closing)
    //    - <verse> -> Verse token (self-closing)
    //    - <para> -> ParagraphStart, recurse children, ParagraphEnd
    //    - <char> -> CharacterStart, recurse children, CharacterEnd
    //    - <wg> -> TextLink with 7 annotation attributes (semicolon-split)
    //    - <note> -> Note with inner XML as text
    //    - <ref> -> Reference with inner text
    //    - text nodes -> PlainText (whitespace preserved)
    // 6. Each token gets a sequential Index starting from 0.

    /// <summary>
    /// Parse Marble-enhanced XML into structured tokens. 11 token types.
    /// </summary>
    /// <param name="marbleXml">Marble XML string (EmdrosDump format)</param>
    /// <param name="resourceId">Resource identifier for context</param>
    /// <param name="bookNumber">Book number for the content</param>
    /// <param name="chapterNumber">Chapter number being parsed</param>
    /// <returns>Array of MarbleToken with correct types, text, and attributes</returns>
    /// <exception cref="InvalidOperationException">
    /// INVALID_ARGUMENT when marbleXml is null/empty.
    /// INTERNAL when XML is malformed.
    /// </exception>
    public static MarbleToken[] Parse(
        string marbleXml,
        string resourceId,
        int bookNumber,
        int chapterNumber
    )
    {
        if (string.IsNullOrEmpty(marbleXml))
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.InvalidArgument,
                "Marble XML must not be null or empty"
            );
        }

        XDocument doc;
        try
        {
            doc = XDocument.Parse(marbleXml, LoadOptions.PreserveWhitespace);
        }
        catch (XmlException ex)
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.Internal,
                $"Failed to parse Marble XML: {ex.Message}"
            );
        }

        // BHV-600: Find the usx_book element - all elements before it are skipped
        XElement? usxBook = doc.Descendants("usx_book").FirstOrDefault();
        if (usxBook == null)
        {
            return [];
        }

        List<MarbleToken> tokens = [];
        int index = 0;

        // Emit Book token from usx_book
        string bookCode = usxBook.Attribute("code")?.Value ?? "";
        tokens.Add(new MarbleToken(MarbleTokenType.Book, bookCode, index++));

        // Walk children of usx_book
        ProcessChildren(usxBook, tokens, ref index);

        return [.. tokens];
    }

    private static void ProcessChildren(XElement parent, List<MarbleToken> tokens, ref int index)
    {
        foreach (XNode node in parent.Nodes())
        {
            if (node is XText textNode)
            {
                string text = textNode.Value;
                if (string.IsNullOrEmpty(text))
                    continue;

                // BHV-603: Preserve whitespace, but skip formatting-only whitespace
                // (text nodes that are only whitespace AND contain newlines are XML
                // indentation/formatting, not significant content).
                // Inline spaces without newlines (e.g., " " between elements) are kept.
                if (string.IsNullOrWhiteSpace(text) && text.Contains('\n'))
                    continue;

                tokens.Add(new MarbleToken(MarbleTokenType.PlainText, text, index++));
            }
            else if (node is XElement element)
            {
                ProcessElement(element, tokens, ref index);
            }
        }
    }

    private static void ProcessElement(XElement element, List<MarbleToken> tokens, ref int index)
    {
        switch (element.Name.LocalName)
        {
            case "chapter":
                string chapterNum = element.Attribute("chapter")?.Value ?? "";
                tokens.Add(new MarbleToken(MarbleTokenType.Chapter, chapterNum, index++));
                break;

            case "verse":
                string verseNum = element.Attribute("pubnumber")?.Value ?? "";
                tokens.Add(new MarbleToken(MarbleTokenType.Verse, verseNum, index++));
                break;

            case "para":
                string paraStyle = element.Attribute("style")?.Value ?? "";
                tokens.Add(
                    new MarbleToken(
                        MarbleTokenType.ParagraphStart,
                        paraStyle,
                        index++,
                        Style: paraStyle
                    )
                );
                ProcessChildren(element, tokens, ref index);
                tokens.Add(new MarbleToken(MarbleTokenType.ParagraphEnd, paraStyle, index++));
                break;

            case "char":
                string charStyle = element.Attribute("style")?.Value ?? "";
                tokens.Add(
                    new MarbleToken(
                        MarbleTokenType.CharacterStart,
                        charStyle,
                        index++,
                        Style: charStyle
                    )
                );
                ProcessChildren(element, tokens, ref index);
                tokens.Add(new MarbleToken(MarbleTokenType.CharacterEnd, charStyle, index++));
                break;

            case "wg":
                ProcessWgElement(element, tokens, ref index);
                break;

            case "note":
                // Inner XML as text content
                string noteInnerXml = string.Concat(element.Nodes().Select(n => n.ToString()));
                tokens.Add(new MarbleToken(MarbleTokenType.Note, noteInnerXml, index++));
                break;

            case "ref":
                string refText = element.Value;
                tokens.Add(new MarbleToken(MarbleTokenType.Reference, refText, index++));
                break;

            default:
                // For unknown elements, just process their children
                ProcessChildren(element, tokens, ref index);
                break;
        }
    }

    private static void ProcessWgElement(XElement wg, List<MarbleToken> tokens, ref int index)
    {
        string text = wg.Value;
        string? strong = wg.Attribute("strong")?.Value;
        IList<string>? targetLinks = SplitLinks(wg.Attribute("target_links")?.Value);
        IList<string>? thematicLinks = SplitLinks(wg.Attribute("thematic_links")?.Value);
        IList<string>? lexicalLinks = SplitLinks(wg.Attribute("lexical_links")?.Value);
        IList<string>? imageLinks = SplitLinks(wg.Attribute("image_links")?.Value);
        IList<string>? mapLinks = SplitLinks(wg.Attribute("map_links")?.Value);

        tokens.Add(
            new MarbleToken(
                MarbleTokenType.TextLink,
                text,
                index++,
                StrongNumber: strong,
                TargetLinks: targetLinks,
                ThematicLinks: thematicLinks,
                LexicalLinks: lexicalLinks,
                ImageLinks: imageLinks,
                MapLinks: mapLinks
            )
        );
    }

    /// <summary>
    /// Splits a semicolon-delimited attribute value into a list.
    /// Empty or null attributes yield an empty list.
    /// </summary>
    private static IList<string>? SplitLinks(string? value)
    {
        if (string.IsNullOrEmpty(value))
        {
            return [];
        }

        return value.Split(';', StringSplitOptions.RemoveEmptyEntries).ToList();
    }
}
