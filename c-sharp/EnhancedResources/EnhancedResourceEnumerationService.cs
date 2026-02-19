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
    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextData/Plugins/Host.cs:52-63
    // Method: Host.AllEnhancedResources (iterates AvailableBibles, filters MarbleResource)
    // Maps to: CAP-001
    /// <summary>
    /// Returns metadata for all installed Enhanced Resources (MarbleResource projects).
    /// Only MarbleResource projects are returned (INV-006).
    /// Regular resources are excluded.
    /// </summary>
    /// <returns>
    /// List of <see cref="EnhancedResourceInfo"/> for each installed ER.
    /// Returns empty list (not null) when no ERs are installed.
    /// </returns>
    public static IReadOnlyList<EnhancedResourceInfo> GetAvailableEnhancedResources()
    {
        var result = new List<EnhancedResourceInfo>();

        foreach (ScrText scrText in ScrTextCollection.ScrTexts(IncludeProjects.Everything))
        {
            if (scrText.Settings.TranslationInfo.Type != ProjectType.MarbleResource)
                continue;

            string id = scrText.Settings.GetSetting("ResourceId") ?? "";
            string name = scrText.Settings.FullName ?? "";
            string shortName = scrText.Settings.GetSetting("ResourceShortName") ?? "";
            string language = scrText.Settings.GetSetting("ResourceLanguage") ?? "";
            string version = scrText.Settings.GetSetting("MarbleVersion") ?? "";
            string researchDataFlag = scrText.Settings.GetSetting("MarbleResearchData") ?? "F";
            bool hasResearchData = researchDataFlag == "T";

            result.Add(
                new EnhancedResourceInfo(
                    Id: id,
                    Name: name,
                    ShortName: shortName,
                    Language: language,
                    Version: version,
                    HasResearchData: hasResearchData,
                    IsInstalled: true,
                    HasUpdate: false
                )
            );
        }

        return result;
    }
}
