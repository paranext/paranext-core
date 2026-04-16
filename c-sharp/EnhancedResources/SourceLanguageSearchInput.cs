namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Input for source language search. Trailing base/meaning index notation
/// is stripped from SearchText before matching (EXT-070).
/// Source: EXT-070-077, BHV-451, VAL-006
/// </summary>
public record SourceLanguageSearchInput(
    string SearchText,
    BookRange? BookRange,
    string ResourceId,
    int ShowInContextLimit
);

public record BookRange(int Start, int End);
