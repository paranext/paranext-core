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

        var xdoc = XDocument.Parse(xml, LoadOptions.PreserveWhitespace);
        var startElement = xdoc.Descendants("usx_book").FirstOrDefault();
        if (startElement == null)
            return Array.Empty<MarbleToken>();

        var tokens = new List<MarbleToken>();
        ProcessElement(startElement, tokens);
        return tokens;
    }

    private static void ProcessElement(XElement element, List<MarbleToken> tokens)
    {
        bool processChildElements = true;

        switch (element.Name.LocalName)
        {
            case "usx_book":
                tokens.Add(SimpleToken(MarbleTokenType.Book, GetAttr(element, "code")));
                break;

            case "chapter":
                tokens.Add(
                    SimpleToken(
                        MarbleTokenType.Chapter,
                        NullIfEmpty(GetAttr(element, "chapter"))
                            ?? NullIfEmpty(GetAttr(element, "number"))
                    )
                );
                processChildElements = false;
                break;

            case "para":
            case "row":
                tokens.Add(StyledToken(MarbleTokenType.ParagraphStart, element));
                break;

            case "char":
            case "cell":
                tokens.Add(StyledToken(MarbleTokenType.CharacterStart, element));
                break;

            case "verse":
                tokens.Add(
                    SimpleToken(MarbleTokenType.Verse, NullIfEmpty(GetAttr(element, "pubnumber")))
                );
                processChildElements = false;
                break;

            case "note":
                tokens.Add(SimpleToken(MarbleTokenType.Note, element.ToString()));
                processChildElements = false;
                break;

            case "wg":
                HandleWordGroup(element, tokens);
                processChildElements = false;
                break;

            case "ref":
                HandleCrossReference(element, tokens);
                processChildElements = false;
                break;

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
        if (element.Name.LocalName is "para" or "row")
            tokens.Add(StyledToken(MarbleTokenType.ParagraphEnd, element));

        if (element.Name.LocalName is "char" or "cell")
            tokens.Add(StyledToken(MarbleTokenType.CharacterEnd, element));
    }

    private static void ProcessNode(XNode node, List<MarbleToken> tokens)
    {
        if (node.NodeType == XmlNodeType.Text)
        {
            string nodeValue = node.ToString();
            // PT9: preserve whitespace that has non-whitespace chars OR has no newlines
            if (nodeValue.Any(c => !char.IsWhiteSpace(c)) || nodeValue.All(c => c != '\n'))
                tokens.Add(SimpleToken(MarbleTokenType.Text, nodeValue));
        }
        else if (node.NodeType == XmlNodeType.Element)
        {
            ProcessElement((XElement)node, tokens);
        }
    }

    /// <summary>
    /// Handles a "wg" (word group) element: produces a TextLink if link attributes
    /// are present, otherwise produces a plain Text token if the element has content.
    /// </summary>
    private static void HandleWordGroup(XElement element, List<MarbleToken> tokens)
    {
        if (GetAttr(element, "target_links") != "" || GetAttr(element, "strongs") != "")
            tokens.Add(CreateTextLink(element));
        else if (!element.IsEmpty && !string.IsNullOrEmpty(element.Value))
            tokens.Add(SimpleToken(MarbleTokenType.Text, element.Value));
    }

    /// <summary>
    /// Handles a "ref" element: produces a CrossRef token if the loc attribute
    /// contains a parseable verse reference.
    /// </summary>
    private static void HandleCrossReference(XElement element, List<MarbleToken> tokens)
    {
        var loc = GetAttr(element, "loc");
        if (!VerseRef.IsParseable(loc))
            return;

        var vr = new VerseRef(loc);
        tokens.Add(
            new MarbleToken(
                MarbleTokenType.CrossRef,
                element.Value,
                Style: null,
                VerseRef: new VerseReference(vr.BookNum, vr.ChapterNum, vr.VerseNum)
            )
        );
    }

    private static MarbleToken CreateTextLink(XElement element) =>
        new(
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

    /// <summary>
    /// Creates a token with only type and text (no style or verse reference).
    /// Used for Book, Chapter, Verse, Note, and Text tokens.
    /// </summary>
    private static MarbleToken SimpleToken(MarbleTokenType type, string? text) =>
        new(type, text, Style: null, VerseRef: null);

    /// <summary>
    /// Creates a structural token with only type and style (no text or verse reference).
    /// Used for ParagraphStart/End and CharacterStart/End tokens.
    /// </summary>
    private static MarbleToken StyledToken(MarbleTokenType type, XElement element) =>
        new(type, Text: null, Style: NullIfEmpty(GetAttr(element, "style")), VerseRef: null);

    private static string GetAttr(XElement element, string name) =>
        element.Attribute(name)?.Value ?? "";

    private static string? NullIfEmpty(string value) => string.IsNullOrEmpty(value) ? null : value;
}
