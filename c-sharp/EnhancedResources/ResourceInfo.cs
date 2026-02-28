namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Information about an installed Enhanced Resource project (Contract: Section 3.11).
/// </summary>
public record ResourceInfo(
    string ResourceId,
    string Name,
    string FullName,
    string LanguageId,
    string Version,
    bool IsMarbleResource,
    string? Copyright,
    IReadOnlyList<int> AvailableBooks,
    FontInfo Font,
    string HtmlLanguage
);
