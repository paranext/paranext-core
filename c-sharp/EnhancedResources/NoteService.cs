using System.Xml.Linq;
using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Stateless service for generating structured note data from USX note XML.
/// Replaces PT9's HTML note generation (MarbleForm.cs GetNoteHtml, GetCallerType).
/// Returns NoteData with caller type, caller marker, body text, and references.
/// Source: EXT-010, CAP-015
/// </summary>
internal static class NoteService
{
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleForm.cs (~100 lines)
    // Methods: GetNoteHtml, GetCallerType - restructured to return NoteData instead of HTML
    // Maps to: EXT-010

    /// <summary>
    /// Get structured note data from USX note XML.
    /// Extracts caller type from style attribute ('f' -> footnote, 'fe' -> endnote, 'x' -> cross-reference).
    /// Extracts caller marker from caller attribute (default '-' when missing, BHV-614).
    /// Extracts body text from char elements.
    /// Extracts verse references from ref elements.
    ///
    /// Null/empty XML: throws InvalidOperationException with INVALID_ARGUMENT code.
    /// Malformed XML: throws InvalidOperationException with INTERNAL code.
    /// </summary>
    public static NoteData GetNoteData(NoteInput input)
    {
        if (string.IsNullOrEmpty(input.NoteXml))
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.InvalidArgument,
                "Note XML must not be empty"
            );
        }

        // Plain text (non-XML) - legacy format
        if (!input.NoteXml.TrimStart().StartsWith('<'))
        {
            return new NoteData(
                CallerType: "footnote",
                CallerMarker: "-",
                Body: input.NoteXml,
                References: []
            );
        }

        // Parse XML
        XElement noteElement;
        try
        {
            noteElement = XElement.Parse(input.NoteXml);
        }
        catch (System.Xml.XmlException)
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.Internal,
                "Failed to parse note XML"
            );
        }

        string callerType = MapStyleToCallerType(noteElement.Attribute("style")?.Value ?? "");

        string callerMarker = ExtractCallerMarker(noteElement);

        string body = ExtractBodyText(noteElement);

        IList<VerseRef> references = ExtractReferences(noteElement);

        return new NoteData(
            CallerType: callerType,
            CallerMarker: callerMarker,
            Body: body,
            References: references
        );
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleForm.cs
    // Method: GetCallerType - maps note style to caller type string
    // Maps to: BHV-614
    private static string MapStyleToCallerType(string style)
    {
        return style switch
        {
            "f" => "footnote",
            "fe" => "endnote",
            "x" => "cross-reference",
            _ => "footnote",
        };
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleForm.cs
    // Method: GetCallerType - extracts caller attribute, defaults to '-'
    // Maps to: BHV-614
    private static string ExtractCallerMarker(XElement noteElement)
    {
        string? caller = noteElement.Attribute("caller")?.Value?.Trim();
        return string.IsNullOrEmpty(caller) ? "-" : caller;
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleForm.cs
    // Method: GetNoteHtml - extracted char element text concatenation
    // Maps to: BHV-613
    private static string ExtractBodyText(XElement noteElement)
    {
        return string.Concat(
            noteElement.Elements("char").Select(c => c.Value).Where(t => !string.IsNullOrEmpty(t))
        );
    }

    // === NEW IN PT10 ===
    // Reason: PT9 generated HTML with anchor tags for refs; PT10 extracts structured VerseRef data
    // Maps to: CAP-015
    private static List<VerseRef> ExtractReferences(XElement noteElement)
    {
        return noteElement
            .Descendants("ref")
            .Select(r => r.Attribute("loc")?.Value)
            .Where(loc => !string.IsNullOrEmpty(loc))
            .Select(loc => ParseLocAttribute(loc!))
            .Where(vr => vr.HasValue)
            .Select(vr => vr!.Value)
            .ToList();
    }

    // === NEW IN PT10 ===
    // Reason: Parses USX ref loc attribute format "BBB C:V" or "BBB C:V-V" via
    // VerseRef.TryParse, which handles both single refs and ranges.
    // Maps to: CAP-015
    private static VerseRef? ParseLocAttribute(string loc)
    {
        return VerseRef.TryParse(loc, out var vref) ? vref : null;
    }
}
