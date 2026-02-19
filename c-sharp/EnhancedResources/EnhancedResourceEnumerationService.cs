using Paratext.Data;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Service for enumerating installed Enhanced Resources (MarbleResource projects).
/// Filters ScrTextCollection to return only MarbleResource projects, mapping each
/// to an <see cref="EnhancedResourceInfo"/> with full metadata.
/// </summary>
/// <remarks>
/// PT9 Source: ParatextData/Plugins/Host.cs:52-63 (AllEnhancedResources),
///             IEnhancedResourceProvider.cs:5-10 (AvailableBibles).
/// Contract: data-contracts.md Method 1.
/// CAP-001: GetAvailableEnhancedResources.
/// </remarks>
internal static class EnhancedResourceEnumerationService
{
    /// <summary>
    /// Returns metadata for all installed Enhanced Resources (MarbleResource projects).
    /// Only MarbleResource projects are returned (INV-006).
    /// Regular resources are excluded.
    /// </summary>
    /// <returns>
    /// List of <see cref="EnhancedResourceInfo"/> for each installed ER.
    /// Returns empty list (not null) when no ERs are installed.
    /// </returns>
    public static IReadOnlyList<EnhancedResourceInfo> GetAvailableEnhancedResources() =>
        ScrTextCollection
            .ScrTexts(IncludeProjects.Everything)
            .Where(s => s.Settings.TranslationInfo.Type == ProjectType.MarbleResource)
            .Select(s => new EnhancedResourceInfo(
                Id: s.Settings.GetSetting("ResourceId") ?? "",
                Name: s.Settings.FullName ?? "",
                ShortName: s.Settings.GetSetting("ResourceShortName") ?? "",
                Language: s.Settings.GetSetting("ResourceLanguage") ?? "",
                Version: s.Settings.GetSetting("MarbleVersion") ?? "",
                HasResearchData: (s.Settings.GetSetting("MarbleResearchData") ?? "F") == "T",
                IsInstalled: true,
                HasUpdate: false
            ))
            .ToList();
}
