// === STUB: CAP-005 WriteResourceXml, CAP-006 GenerateMultiPaneContent ===
// Source: EXT-006 (PT9/ParatextBase/TextCollection/TextCollectionControl.cs:262-322)
// Source: EXT-007 (PT9/ParatextBase/TextCollection/TextCollectionControl.cs:327-355)
// Maps to: BHV-601, BHV-113, BHV-114, BHV-106

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
        throw new NotImplementedException(
            "CAP-005: WriteResourceXml not yet implemented. " + "Awaiting TDD implementation phase."
        );
    }
}
