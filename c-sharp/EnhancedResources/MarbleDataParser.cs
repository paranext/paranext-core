using System.Xml;
using System.Xml.Linq;
using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Parses USX/Emdros-format XML into flat MarbleToken lists.
/// Foundational parser for the entire Enhanced Resources feature.
/// </summary>
/// <remarks>
/// Ported from PT9: Paratext/Marble/MarbleDataParser.cs:65-173
/// EXT-055, CAP-002, BHV-600
/// </remarks>
internal static class MarbleDataParser
{
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataParser.cs:47-173
    // Method: MarbleDataParser constructor + ConvertToTokens + ConvertNodeToTokens + CreateTextLink
    // Maps to: EXT-055, BHV-600
    /// <summary>
    /// Converts USX-like XML into a flat list of MarbleTokens.
    /// Handles: usx_book, chapter, para, row, char, cell, verse, note, wg (text links), ref.
    /// Extracts all link attributes from wg elements.
    /// </summary>
    /// <param name="xml">USX-like XML string from resource data (may include EmdrosDump wrapper)</param>
    /// <returns>Ordered list of tokens with types and link attributes. Empty list if input is null/empty.</returns>
    public static IReadOnlyList<MarbleToken> ConvertToTokens(string xml)
    {
        if (string.IsNullOrEmpty(xml))
            return Array.Empty<MarbleToken>();

        XDocument xdoc = XDocument.Parse(xml, LoadOptions.PreserveWhitespace);
        XElement? startElement = xdoc.Descendants("usx_book").FirstOrDefault();
        if (startElement == null)
            return Array.Empty<MarbleToken>();

        List<MarbleToken> tokens = new List<MarbleToken>();
        ProcessElement(startElement, tokens);
        return tokens;
    }

    private static void ProcessElement(XElement element, List<MarbleToken> tokens)
    {
        bool processChildElements = true;

        switch (element.Name.LocalName)
        {
            case "usx_book":
                tokens.Add(
                    new MarbleToken(
                        MarbleTokenType.Book,
                        GetAttr(element, "code"),
                        Style: null,
                        VerseRef: null
                    )
                );
                break;

            case "chapter":
            {
                string? chapterText = NullIfEmpty(GetAttr(element, "chapter"));
                if (chapterText == null)
                    chapterText = NullIfEmpty(GetAttr(element, "number"));
                tokens.Add(
                    new MarbleToken(
                        MarbleTokenType.Chapter,
                        chapterText,
                        Style: null,
                        VerseRef: null
                    )
                );
                processChildElements = false;
                break;
            }

            case "para":
            case "row":
                tokens.Add(
                    new MarbleToken(
                        MarbleTokenType.ParagraphStart,
                        Text: null,
                        Style: NullIfEmpty(GetAttr(element, "style")),
                        VerseRef: null
                    )
                );
                break;

            case "char":
            case "cell":
                tokens.Add(
                    new MarbleToken(
                        MarbleTokenType.CharacterStart,
                        Text: null,
                        Style: NullIfEmpty(GetAttr(element, "style")),
                        VerseRef: null
                    )
                );
                break;

            case "verse":
                tokens.Add(
                    new MarbleToken(
                        MarbleTokenType.Verse,
                        NullIfEmpty(GetAttr(element, "pubnumber")),
                        Style: null,
                        VerseRef: null
                    )
                );
                processChildElements = false;
                break;

            case "note":
                tokens.Add(
                    new MarbleToken(
                        MarbleTokenType.Note,
                        element.ToString(),
                        Style: null,
                        VerseRef: null
                    )
                );
                processChildElements = false;
                break;

            case "wg":
            {
                string targetLinks = GetAttr(element, "target_links");
                string strongs = GetAttr(element, "strongs");
                if (targetLinks != "" || strongs != "")
                {
                    tokens.Add(CreateTextLink(element));
                }
                else if (!element.IsEmpty)
                {
                    string innerText = element.Value;
                    if (!string.IsNullOrEmpty(innerText))
                    {
                        tokens.Add(
                            new MarbleToken(
                                MarbleTokenType.Text,
                                innerText,
                                Style: null,
                                VerseRef: null
                            )
                        );
                    }
                }
                processChildElements = false;
                break;
            }

            case "ref":
            {
                string verseRef = GetAttr(element, "loc");
                if (VerseRef.IsParseable(verseRef))
                {
                    VerseRef vr = new VerseRef(verseRef);
                    tokens.Add(
                        new MarbleToken(
                            MarbleTokenType.CrossRef,
                            element.Value,
                            Style: null,
                            VerseRef: new VerseReference(vr.BookNum, vr.ChapterNum, vr.VerseNum)
                        )
                    );
                }
                processChildElements = false;
                break;
            }

            case "optbreak":
            case "linkedReference":
            case "book":
            case "rem":
            case "table":
            case "figure":
            case "unmatched":
                processChildElements = false;
                break;
        }

        if (processChildElements)
        {
            foreach (XNode node in element.Nodes())
                ProcessNode(node, tokens);
        }

        // Paragraphs and character runs need an ending token
        if (element.Name.LocalName == "para" || element.Name.LocalName == "row")
        {
            tokens.Add(
                new MarbleToken(
                    MarbleTokenType.ParagraphEnd,
                    Text: null,
                    Style: NullIfEmpty(GetAttr(element, "style")),
                    VerseRef: null
                )
            );
        }

        if (element.Name.LocalName == "char" || element.Name.LocalName == "cell")
        {
            tokens.Add(
                new MarbleToken(
                    MarbleTokenType.CharacterEnd,
                    Text: null,
                    Style: NullIfEmpty(GetAttr(element, "style")),
                    VerseRef: null
                )
            );
        }
    }

    private static void ProcessNode(XNode node, List<MarbleToken> tokens)
    {
        if (node.NodeType == XmlNodeType.Text)
        {
            string nodeValue = node.ToString();
            // PT9: preserve whitespace that has non-whitespace chars OR has no newlines
            if (nodeValue.Any(c => !char.IsWhiteSpace(c)) || nodeValue.All(c => c != '\n'))
            {
                tokens.Add(
                    new MarbleToken(MarbleTokenType.Text, nodeValue, Style: null, VerseRef: null)
                );
            }
        }
        else if (node.NodeType == XmlNodeType.Element)
        {
            ProcessElement((XElement)node, tokens);
        }
    }

    private static MarbleToken CreateTextLink(XElement element)
    {
        return new MarbleToken(
            MarbleTokenType.TextLink,
            NullIfEmpty(element.Value),
            Style: null,
            VerseRef: null,
            TargetLinks: NullIfEmpty(GetAttr(element, "target_links")),
            Strong: NullIfEmpty(GetAttr(element, "strong")),
            LexicalLinks: NullIfEmpty(GetAttr(element, "lexical_links")),
            ThematicLinks: NullIfEmpty(GetAttr(element, "thematic_links")),
            TextualLinks: NullIfEmpty(GetAttr(element, "textual_links")),
            ImageLinks: NullIfEmpty(GetAttr(element, "image_links")),
            MapLinks: NullIfEmpty(GetAttr(element, "map_links"))
        );
    }

    private static string GetAttr(XElement element, string name)
    {
        return element.Attribute(name)?.Value ?? "";
    }

    private static string? NullIfEmpty(string value)
    {
        return string.IsNullOrEmpty(value) ? null : value;
    }
}
