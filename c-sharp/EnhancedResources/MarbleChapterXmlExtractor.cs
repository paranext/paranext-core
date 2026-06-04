// === NEW IN PT10 === Reason: M-019 chapter slice with stable token IDs.
// Walks the book USX with the SAME algorithm as MarbleTokenParser to keep
// token indices identical. Emits the target chapter's subtree, stamping each
// <wg> and <note> with id="<tokenIndex>" so the TS converter can round-trip
// IDs back through buildTooltipData / buildNoteData (which look up by index).
//
// Section 4.19 (data-contracts.md), FN-014 (forward-notes.md), FN-013 (wg-marker
// recognition: confirmed via @eten-tech-foundation/platform-editor recognized
// USFM markers list - wg is in there alongside w/wa/wh/wj).
using System.Globalization;
using System.Xml;
using System.Xml.Linq;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Extracts a single chapter's subtree from book-scoped marble USX, stamping
/// stable token IDs on <c>&lt;wg&gt;</c> and <c>&lt;note&gt;</c> elements so
/// that IDs round-trip with <see cref="MarbleTokenParser"/> indices.
/// </summary>
internal static class MarbleChapterXmlExtractor
{
    /// <summary>
    /// Returns the chapter subtree as a USX-shaped XML string with id attributes
    /// pre-injected on every <c>&lt;wg&gt;</c> and <c>&lt;note&gt;</c>; returns
    /// null when input is empty/malformed, when no <c>&lt;usx_book&gt;</c> root
    /// exists, or when the requested chapter is not present in the book.
    /// </summary>
    public static string? ExtractChapter(string? bookXml, int chapterNumber)
    {
        if (string.IsNullOrEmpty(bookXml))
            return null;

        XDocument doc;
        try
        {
            doc = XDocument.Parse(bookXml, LoadOptions.PreserveWhitespace);
        }
        catch (XmlException)
        {
            return null;
        }

        var usxBook = doc.Descendants("usx_book").FirstOrDefault();
        if (usxBook is null)
            return null;

        var output = new XElement("usx_book");
        if (usxBook.Attribute("code") is { } codeAttr)
            output.SetAttributeValue("code", codeAttr.Value);

        var ctx = new ExtractContext(chapterNumber);
        // Mirror MarbleTokenParser: index 0 is the implicit Book token.
        ctx.TokenIndex = 1;

        WalkChildren(usxBook, output, ctx);

        if (!ctx.AnyEmitted)
            return null;

        // SaveOptions.DisableFormatting keeps the XML compact; the TS converter
        // re-parses, so whitespace cosmetics don't matter.
        return output.ToString(SaveOptions.DisableFormatting);
    }

    private sealed class ExtractContext(int targetChapter)
    {
        public int TargetChapter { get; } = targetChapter;
        public int TokenIndex { get; set; }
        public bool InTarget { get; set; }
        public bool AnyEmitted { get; set; }
    }

    private static void WalkChildren(XElement parent, XElement output, ExtractContext ctx)
    {
        foreach (var node in parent.Nodes())
        {
            if (node is XText textNode)
            {
                var text = textNode.Value;
                if (string.IsNullOrEmpty(text))
                    continue;
                // Match MarbleTokenParser: skip XML formatting whitespace.
                if (string.IsNullOrWhiteSpace(text) && text.Contains('\n'))
                    continue;

                ctx.TokenIndex++; // PlainText token
                if (ctx.InTarget)
                {
                    output.Add(new XText(text));
                    ctx.AnyEmitted = true;
                }
            }
            else if (node is XElement element)
            {
                WalkElement(element, output, ctx);
            }
        }
    }

    private static void WalkElement(XElement element, XElement output, ExtractContext ctx)
    {
        switch (element.Name.LocalName)
        {
            case "chapter":
                HandleChapter(element, output, ctx);
                break;
            case "verse":
                HandleSingleTokenElement(element, output, ctx, deepCopy: true);
                break;
            case "para":
                HandleContainerElement(element, output, ctx);
                break;
            case "char":
                HandleContainerElement(element, output, ctx);
                break;
            case "wg":
                HandleWgOrNote(element, output, ctx);
                break;
            case "note":
                HandleWgOrNote(element, output, ctx);
                break;
            case "ref":
                HandleSingleTokenElement(element, output, ctx, deepCopy: true);
                break;
            default:
                // MarbleTokenParser: unknown elements emit no token but its children
                // are walked. Mirror that, but include a wrapper element when in
                // target so the surrounding structure is preserved.
                HandleUnknownElement(element, output, ctx);
                break;
        }
    }

    private static void HandleChapter(XElement element, XElement output, ExtractContext ctx)
    {
        var chapterNumStr =
            element.Attribute("chapter")?.Value ?? element.Attribute("number")?.Value ?? "";
        var isTarget =
            int.TryParse(
                chapterNumStr,
                NumberStyles.Integer,
                CultureInfo.InvariantCulture,
                out var n
            )
            && n == ctx.TargetChapter;

        ctx.TokenIndex++; // Chapter token

        if (isTarget)
        {
            ctx.InTarget = true;
            AppendShallowCopy(element, output);
            ctx.AnyEmitted = true;
        }
        else
        {
            ctx.InTarget = false;
        }
    }

    private static void HandleSingleTokenElement(
        XElement element,
        XElement output,
        ExtractContext ctx,
        bool deepCopy
    )
    {
        ctx.TokenIndex++;
        if (!ctx.InTarget)
            return;
        output.Add(deepCopy ? new XElement(element) : ShallowCopy(element));
        ctx.AnyEmitted = true;
    }

    private static void HandleContainerElement(
        XElement element,
        XElement output,
        ExtractContext ctx
    )
    {
        ctx.TokenIndex++; // ParagraphStart / CharacterStart
        XElement? containerOutput = null;
        if (ctx.InTarget)
        {
            containerOutput = ShallowCopy(element);
            output.Add(containerOutput);
            ctx.AnyEmitted = true;
        }
        // If we're not in the target chapter, containerOutput is null - children
        // walks must NOT emit, but they must still count tokens. Pass a throw-away
        // sink so accidental emits don't pollute the real output.
        WalkChildren(element, containerOutput ?? output, ctx);
        ctx.TokenIndex++; // ParagraphEnd / CharacterEnd
    }

    private static void HandleWgOrNote(XElement element, XElement output, ExtractContext ctx)
    {
        var tokenIndex = ctx.TokenIndex;
        ctx.TokenIndex++; // wg / note token

        if (!ctx.InTarget)
            return;

        var copy = new XElement(element);
        // SetAttributeValue replaces an existing id if present (defensive: source
        // XML rarely carries one). Use the "id" attribute name without namespace
        // to keep the editor-friendly shape.
        copy.SetAttributeValue("id", tokenIndex.ToString(CultureInfo.InvariantCulture));
        output.Add(copy);
        ctx.AnyEmitted = true;
    }

    private static void HandleUnknownElement(XElement element, XElement output, ExtractContext ctx)
    {
        if (ctx.InTarget)
        {
            var wrapper = ShallowCopy(element);
            output.Add(wrapper);
            WalkChildren(element, wrapper, ctx);
            ctx.AnyEmitted = true;
        }
        else
        {
            // Walk children to keep token counter aligned, but discard the wrapper.
            WalkChildren(element, output, ctx);
        }
    }

    private static void AppendShallowCopy(XElement element, XElement output) =>
        output.Add(ShallowCopy(element));

    private static XElement ShallowCopy(XElement element)
    {
        var copy = new XElement(element.Name);
        foreach (var attr in element.Attributes())
            copy.Add(new XAttribute(attr));
        return copy;
    }
}
