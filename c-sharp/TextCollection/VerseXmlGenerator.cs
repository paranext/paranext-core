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
    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextBase/TextCollection/TextCollectionControl.cs:262-322
    // Method: TextCollectionControl.WriteResourceXml()
    // Maps to: EXT-006, BHV-601
    //
    // EXPLANATION:
    // This method generates an XML block for a single text at a verse reference.
    // The algorithm:
    // 1. Resolve ScrText from project ID (PT10 adaptation: uses ScrTextCollection.GetById)
    // 2. Resolve joined text for the book (HEB/GRK -> testament-appropriate text)
    // 3. Map verse reference to the project's versification
    // 4. Handle edge cases: intro verse (ch 0 -> v1), past-end-of-chapter (clamp)
    // 5. Get USFM tokens for the verse, excluding footnotes and SBA markers
    // 6. Convert filtered USFM to USX XML
    // 7. Wrap in resource > verseusx > usx structure with font/direction attributes
    /// <summary>
    /// Generates XML block for a single text at a verse reference.
    /// Core rendering contract (BHV-601) producing:
    /// <![CDATA[
    /// <resource abbrev="..." verseref="..." align="..." direction="...">
    ///   <verseusx name="..." fontname="..." fontsize="..." language="...">
    ///     <usx version="3.0">content</usx>
    ///   </verseusx>
    /// </resource>
    /// ]]>
    /// </summary>
    /// <param name="item">The text collection item (project + zoom).</param>
    /// <param name="verseRef">The verse reference to render.</param>
    /// <returns>XML string with resource element.</returns>
    public static string WriteResourceXml(TextCollectionItem item, VerseRef verseRef)
    {
        // Resolve ScrText from project ID (PT10 adaptation)
        ScrText scrText;
        try
        {
            scrText = ScrTextCollection.GetById(HexId.FromStr(item.ScrTextId));
        }
        catch (Exception ex)
        {
            throw new Exception($"Project not found: {item.ScrTextName} ({item.ScrTextId})", ex);
        }

        if (scrText == null)
        {
            throw new Exception($"Project not found: {item.ScrTextName} ({item.ScrTextId})");
        }

        // Resolve joined text for the book (BHV-114: HEB/GRK -> testament-appropriate)
        ScrText textForBook = scrText.GetJoinedText(verseRef.BookNum);

        // Build XML using XmlWriter (matching PT9 pattern)
        StringBuilder xmlsb = new StringBuilder();
        XmlWriterSettings settings = new XmlWriterSettings
        {
            OmitXmlDeclaration = true,
            ConformanceLevel = ConformanceLevel.Fragment,
        };
        using (XmlWriter xw = XmlWriter.Create(xmlsb, settings))
        {
            xw.WriteStartElement("resource");
            xw.WriteAttributeString("abbrev", scrText.Name);

            // Convert to scripture text's versification
            VerseRef vr = new VerseRef(verseRef);
            vr.ChangeVersificationWithRanges(textForBook.Settings.Versification);

            // Show verse 1 when intro requested (TS-043)
            if (vr.VerseNum == 0)
                vr.VerseNum = 1;

            xw.WriteAttributeString("verseref", vr.ToLocalizedString());

            // Determine direction and font from language data
            bool isRightToLeft = textForBook.RightToLeft;
            string defaultFont = textForBook.Language.FontName;
            int defaultFontSize = textForBook.Language.FontSize;

            xw.WriteAttributeString("align", isRightToLeft ? "right" : "left");
            xw.WriteAttributeString("direction", isRightToLeft ? "rtl" : "ltr");

            // If past end of chapter, go to last verse (TS-044)
            if (vr.LastVerse < vr.VerseNum)
                vr.VerseNum = vr.LastVerse;

            // Get text of verse, filtering out footnotes and SBA markers (TS-047)
            string verseText = string.Empty;
            if (vr.Valid)
            {
                var tokensList = textForBook.Parser.GetVerseTokensList(
                    textForBook.Parser.GetUsfmTokens(vr, true),
                    vr,
                    vr,
                    false
                );
                foreach (var tokens in tokensList)
                {
                    var verseStringBuilder = new StringBuilder();
                    var tokensExcludeType = new[] { UsfmTokenType.Verse };
                    var viewableTokens = UsfmTokenUtils.ExcludeTokens(
                        tokens.Tokens,
                        token => token.IsFootNoteMarker() || token.IsStudyBibleMarker()
                    );
                    foreach (
                        var t in viewableTokens.Where(x => !tokensExcludeType.Contains(x.Type))
                    )
                        verseStringBuilder.Append(t.ToUsfm());
                    verseText += verseStringBuilder.ToString();
                }
            }

            xw.WriteStartElement("verseusx");
            xw.WriteAttributeString("name", scrText.Name);
            xw.WriteAttributeString("fontname", defaultFont);
            xw.WriteAttributeString(
                "fontsize",
                ((int)(defaultFontSize * item.Zoom)).ToString(CultureInfo.InvariantCulture)
            );
            xw.WriteAttributeString("language", textForBook.Settings.LanguageID.Id);
            xw.WriteRaw(
                UsfmToUsx.ConvertToXmlString(
                    textForBook,
                    textForBook.ScrStylesheet(vr.BookNum),
                    verseText,
                    false
                )
            );
            xw.WriteEndElement(); // verseusx

            xw.WriteEndElement(); // resource
        }

        return xmlsb.ToString();
    }
}
