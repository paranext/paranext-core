namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// A single row in the Media/Maps research tab.
/// Contains image metadata, reference range, and collection info.
///
/// Contract: data-contracts.md (MediaDisplayItem)
/// CAP-011, BHV-415
/// </summary>
public record MediaDisplayItem(
    string Id,
    string CollectionName,
    string ReferenceRange,
    string FilePath,
    bool Expanded
);

/// <summary>
/// Result of loading the Media or Maps research tab content.
/// Contains the display items and header HTML.
///
/// Contract: data-contracts.md Method 11/12, CAP-011, CAP-012
/// </summary>
public record MediaTabContent(IReadOnlyList<MediaDisplayItem> Items, string HeaderHtml);
