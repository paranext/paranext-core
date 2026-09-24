using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Structured note data for footnotes, endnotes, and cross-references.
/// Replaces PT9's HTML note generation (MarbleForm.cs GetNoteHtml).
/// Frontend renders this as a React note component - no HTML generation.
/// Source: Section 4.15 M-015, EXT-010
/// </summary>
public record NoteData(
    /// <summary>
    /// Note type: "footnote", "endnote", or "cross-reference"
    /// Detected from the note style attribute ('f', 'fe', 'x').
    /// </summary>
    string CallerType,
    /// <summary>
    /// Caller marker character extracted from the caller attribute.
    /// Defaults to "-" when not found in noteXml (BHV-614).
    /// </summary>
    string CallerMarker,
    /// <summary>
    /// Note body text extracted from char elements. Plain text, no HTML.
    /// </summary>
    string Body,
    /// <summary>
    /// Verse references extracted from ref elements in the note XML.
    /// Empty list for footnotes/endnotes without ref elements.
    /// </summary>
    IList<VerseRef> References
);
