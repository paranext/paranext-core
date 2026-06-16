namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Input for getting a single dictionary entry by ID.
/// Source: Section 4.8 M-008, EXT-055
/// </summary>
public record DictionaryEntryInput(string EntryId, string GlossLanguage, string? SubItemId = null);
