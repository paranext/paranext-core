namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Input for structured note data lookup. Contains the note XML from USX
/// for extraction of caller, type, body text, and references.
/// Source: Section 4.15 M-015, EXT-010
/// </summary>
public record NoteInput(string NoteXml);
