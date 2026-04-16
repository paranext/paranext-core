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

    // EXPLANATION:
    // This method parses USX note XML to extract structured NoteData:
    // 1. Validates input is not null/empty (INVALID_ARGUMENT error)
    // 2. Detects plain text vs XML input (plain text has no '<' character)
    // 3. For plain text: returns NoteData with body=input, caller='-', no refs
    // 4. For XML: parses the note element to extract:
    //    - callerType from style attribute ('f'->'footnote', 'fe'->'endnote', 'x'->'cross-reference')
    //    - callerMarker from caller attribute (default '-', trimmed)
    //    - body text from all char elements (concatenated inner text)
    //    - references from ref elements' loc attributes (parsed to VerseRef)
    // 5. Malformed XML throws INTERNAL error

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
        catch (Exception)
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
        var charElements = noteElement.Elements("char");
        var textParts = new List<string>();

        foreach (var charEl in charElements)
        {
            // Get inner text of char element (includes text from nested ref elements)
            string text = charEl.Value;
            if (!string.IsNullOrEmpty(text))
            {
                textParts.Add(text);
            }
        }

        return string.Join("", textParts);
    }

    // === NEW IN PT10 ===
    // Reason: PT9 generated HTML with anchor tags for refs; PT10 extracts structured VerseRef data
    // Maps to: CAP-015
    private static IList<VerseRef> ExtractReferences(XElement noteElement)
    {
        var refs = new List<VerseRef>();

        foreach (var refElement in noteElement.Descendants("ref"))
        {
            string? loc = refElement.Attribute("loc")?.Value;
            if (string.IsNullOrEmpty(loc))
                continue;

            VerseRef? verseRef = ParseLocAttribute(loc);
            if (verseRef.HasValue)
                refs.Add(verseRef.Value);
        }

        return refs;
    }

    // === NEW IN PT10 ===
    // Reason: Parses USX ref loc attribute format "BBB C:V" or "BBB C:V-V" to VerseRef
    // Maps to: CAP-015
    private static VerseRef? ParseLocAttribute(string loc)
    {
        // Format: "MAT 7:1-5" or "LUK 6:37"
        // Split into book and chapter:verse
        int spaceIndex = loc.IndexOf(' ');
        if (spaceIndex < 0)
            return null;

        string bookCode = loc[..spaceIndex];
        string rest = loc[(spaceIndex + 1)..];

        int colonIndex = rest.IndexOf(':');
        if (colonIndex < 0)
            return null;

        string chapterStr = rest[..colonIndex];
        string verseStr = rest[(colonIndex + 1)..];

        // Handle verse ranges like "1-5" - take the start verse
        int dashIndex = verseStr.IndexOf('-');
        if (dashIndex >= 0)
            verseStr = verseStr[..dashIndex];

        try
        {
            return new VerseRef(bookCode, chapterStr, verseStr, null);
        }
        catch
        {
            return null;
        }
    }
}
