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
        throw new NotImplementedException(
            "CAP-015: NoteService.GetNoteData not yet implemented - TDD RED phase"
        );
    }
}
