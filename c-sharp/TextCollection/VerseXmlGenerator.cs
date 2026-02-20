// === PORTED FROM PT9 ===
// Source: PT9/ParatextBase/TextCollection/TextCollectionControl.cs:262-322
// Method: TextCollectionControl.WriteResourceXml()
// Maps to: EXT-006, BHV-601, BHV-113, BHV-114

using System.Globalization;
using System.Text;
using System.Xml;
using Paratext.Data;
using PtxUtils;
using SIL.Scripture;

namespace Paranext.DataProvider.TextCollection;

/// <summary>
/// Generates verse XML for the Text Collection multi-pane display.
/// WriteResourceXml produces a single &lt;resource&gt; element per text.
/// GenerateMultiPaneContent combines multiple resource elements with CSS.
/// </summary>
internal static class VerseXmlGenerator
{
    /// <summary>
    /// Generates an XML block for a single text at a verse reference.
    /// <para>
    /// Algorithm:
    /// 1. Resolve ScrText from project ID, then resolve joined text for the book
    /// 2. Map verse reference to the project's versification (with edge case handling)
    /// 3. Get USFM tokens, excluding footnotes and SBA markers
    /// 4. Convert filtered USFM to USX XML
    /// 5. Wrap in resource &gt; verseusx &gt; usx structure with font/direction attributes
    /// </para>
    /// <para>
    /// Core rendering contract (BHV-601) producing:
    /// <![CDATA[
    /// <resource abbrev="..." verseref="..." align="..." direction="...">
    ///   <verseusx name="..." fontname="..." fontsize="..." language="...">
    ///     <usx version="3.0">content</usx>
    ///   </verseusx>
    /// </resource>
    /// ]]>
    /// </para>
    /// </summary>
    /// <param name="item">The text collection item (project + zoom).</param>
    /// <param name="verseRef">The verse reference to render.</param>
    /// <returns>XML string with resource element.</returns>
    public static string WriteResourceXml(TextCollectionItem item, VerseRef verseRef)
    {
        ScrText scrText = ResolveScrText(item);
        ScrText textForBook = scrText.GetJoinedText(verseRef.BookNum);

        VerseRef mappedVerse = MapVerseToProjectVersification(verseRef, textForBook);
        string filteredUsfm = GetFilteredVerseUsfm(textForBook, mappedVerse);

        return BuildResourceXml(scrText, textForBook, item.Zoom, mappedVerse, filteredUsfm);
    }

    /// <summary>
    /// Resolves a ScrText from the item's project ID.
    /// PT10 adaptation: uses ScrTextCollection.GetById instead of direct ScrText reference.
    /// </summary>
    private static ScrText ResolveScrText(TextCollectionItem item)
    {
        ScrText? scrText;
        try
        {
            scrText = ScrTextCollection.GetById(HexId.FromStr(item.ScrTextId));
        }
        catch (Exception ex)
        {
            throw new Exception($"Project not found: {item.ScrTextName} ({item.ScrTextId})", ex);
        }

        if (scrText == null)
            throw new Exception($"Project not found: {item.ScrTextName} ({item.ScrTextId})");

        return scrText;
    }

    /// <summary>
    /// Maps a verse reference to the project's versification system and handles
    /// edge cases: intro verses (chapter 0 maps to verse 1) and past-end-of-chapter
    /// (clamped to last verse).
    /// </summary>
    private static VerseRef MapVerseToProjectVersification(VerseRef verseRef, ScrText textForBook)
    {
        VerseRef mappedVerse = new(verseRef);
        mappedVerse.ChangeVersificationWithRanges(textForBook.Settings.Versification);

        // Show verse 1 when intro requested (TS-043)
        if (mappedVerse.VerseNum == 0)
            mappedVerse.VerseNum = 1;

        // Clamp to last verse if past end of chapter (TS-044)
        if (mappedVerse.LastVerse < mappedVerse.VerseNum)
            mappedVerse.VerseNum = mappedVerse.LastVerse;

        return mappedVerse;
    }

    /// <summary>
    /// Gets the USFM text for a verse, filtering out footnotes and SBA markers (TS-047).
    /// Returns empty string if the verse reference is invalid.
    /// </summary>
    private static string GetFilteredVerseUsfm(ScrText textForBook, VerseRef mappedVerse)
    {
        if (!mappedVerse.Valid)
            return string.Empty;

        var tokensList = textForBook.Parser.GetVerseTokensList(
            textForBook.Parser.GetUsfmTokens(mappedVerse, true),
            mappedVerse,
            mappedVerse,
            false
        );

        StringBuilder usfmBuilder = new();
        UsfmTokenType[] excludedTokenTypes = [UsfmTokenType.Verse];

        foreach (var tokens in tokensList)
        {
            var viewableTokens = UsfmTokenUtils.ExcludeTokens(
                tokens.Tokens,
                token => token.IsFootNoteMarker() || token.IsStudyBibleMarker()
            );

            foreach (var token in viewableTokens.Where(t => !excludedTokenTypes.Contains(t.Type)))
                usfmBuilder.Append(token.ToUsfm());
        }

        return usfmBuilder.ToString();
    }

    /// <summary>
    /// Builds the resource XML element with verseusx child containing USX content.
    /// </summary>
    private static string BuildResourceXml(
        ScrText scrText,
        ScrText textForBook,
        double zoom,
        VerseRef mappedVerse,
        string filteredUsfm
    )
    {
        StringBuilder xmlBuilder = new();
        XmlWriterSettings writerSettings =
            new() { OmitXmlDeclaration = true, ConformanceLevel = ConformanceLevel.Fragment };

        using XmlWriter writer = XmlWriter.Create(xmlBuilder, writerSettings);

        bool isRightToLeft = textForBook.RightToLeft;
        int fontSize = (int)(textForBook.Language.FontSize * zoom);

        writer.WriteStartElement("resource");
        writer.WriteAttributeString("abbrev", scrText.Name);
        writer.WriteAttributeString("verseref", mappedVerse.ToLocalizedString());
        writer.WriteAttributeString("align", isRightToLeft ? "right" : "left");
        writer.WriteAttributeString("direction", isRightToLeft ? "rtl" : "ltr");

        writer.WriteStartElement("verseusx");
        writer.WriteAttributeString("name", scrText.Name);
        writer.WriteAttributeString("fontname", textForBook.Language.FontName);
        writer.WriteAttributeString("fontsize", fontSize.ToString(CultureInfo.InvariantCulture));
        writer.WriteAttributeString("language", textForBook.Settings.LanguageID.Id);
        writer.WriteRaw(
            UsfmToUsx.ConvertToXmlString(
                textForBook,
                textForBook.ScrStylesheet(mappedVerse.BookNum),
                filteredUsfm,
                false
            )
        );
        writer.WriteEndElement(); // verseusx
        writer.WriteEndElement(); // resource
        writer.Flush();

        return xmlBuilder.ToString();
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextBase/TextCollection/TextCollectionControl.cs:327-355
    // Method: TextCollectionControl.ReloadMulti()
    // Maps to: EXT-007, BHV-T016, CAP-006

    /// <summary>
    /// Generates combined XML and CSS for all items in the multi-pane.
    /// Iterates items calling WriteResourceXml per item. Generates CSS per
    /// unique language using ScrText properties.
    /// </summary>
    /// <param name="items">All TC items to render.</param>
    /// <param name="verseRef">The verse reference to render.</param>
    /// <returns>MultiPaneContent with combined XML, CSS, and resource count.</returns>
    public static MultiPaneContent GenerateMultiPaneContent(
        IList<TextCollectionItem> items,
        VerseRef verseRef
    )
    {
        if (items.Count == 0)
            throw new Exception("Items list must not be empty");

        StringBuilder xmlBuilder = new();
        foreach (TextCollectionItem item in items)
            xmlBuilder.Append(WriteResourceXml(item, verseRef));

        string css = GenerateCssForItems(items);

        return new MultiPaneContent(xmlBuilder.ToString(), css, items.Count);
    }

    /// <summary>
    /// Generates CSS for all unique languages in the item list.
    /// Groups items by language ID and generates per-language CSS rules
    /// for font family, size, and direction.
    /// </summary>
    private static string GenerateCssForItems(IList<TextCollectionItem> items)
    {
        StringBuilder cssBuilder = new();
        HashSet<string> processedLanguages = new();

        foreach (TextCollectionItem item in items)
        {
            ScrText scrText = ResolveScrText(item);
            ScrText textForBook = scrText.GetJoinedText(1);
            string languageId = textForBook.Settings.LanguageID.Id;

            if (processedLanguages.Add(languageId))
            {
                cssBuilder.AppendLine(
                    $".{languageId} {{ font-family: '{textForBook.Language.FontName}'; "
                        + $"font-size: {(int)(textForBook.Language.FontSize * item.Zoom)}pt; "
                        + $"direction: {(textForBook.RightToLeft ? "rtl" : "ltr")}; }}"
                );
            }
        }

        return cssBuilder.ToString();
    }
}
