using Paranext.DataProvider.Projects.DigitalBibleLibrary;
using Paratext.Data;
using Paratext.Data.Users;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Service for enumerating installed Enhanced Resources (marble resource zip files).
/// Scans the _Resources/ directory for marble bible files (.mbv1z/.mbv2z) and creates
/// ResourceScrText objects to read their metadata, matching PT9's MarbleDataAccess pattern.
/// </summary>
/// <remarks>
/// PT9 Source: Paratext/Marble/MarbleDataAccess.cs:698-709 (LoadMarbleResources + AddMarbleResource)
///             ParatextData/Plugins/Host.cs:52-63 (AllEnhancedResources).
/// Contract: data-contracts.md Method 1.
/// CAP-001: GetAvailableEnhancedResources.
///
/// PT9 marble resources are stored as zip files in _Resources/ and are never added to
/// ScrTextCollection. They must be loaded directly from the file system via ResourceScrText.
/// </remarks>
internal static class EnhancedResourceEnumerationService
{
    // Bible extensions to scan for (matching PT9 MarbleDataAccess)
    private static readonly string[] s_bibleExtensions =
    {
        MarbleDataAccess.MarbleBibleExtensionV2,
        MarbleDataAccess.MarbleBibleExtensionV1,
    };

    /// <summary>
    /// Returns metadata for all installed Enhanced Resources (marble bible zip files).
    /// Scans _Resources/ for .mbv1z and .mbv2z files, preferring V2 when both exist.
    /// Returns empty list (not null) when no ERs are installed.
    /// </summary>
    public static IReadOnlyList<EnhancedResourceInfo> GetAvailableEnhancedResources()
    {
        var results = new List<EnhancedResourceInfo>();
        string resourcesDir = ScrTextCollection.ResourcesDirectory;

        if (!Directory.Exists(resourcesDir))
            return results;

        // Track V2 resources to skip duplicate V1 files
        var v2Names = new HashSet<string>();

        foreach (string ext in s_bibleExtensions)
        {
            foreach (string filePath in Directory.GetFiles(resourcesDir, "*" + ext))
            {
                string shortName = Path.GetFileNameWithoutExtension(filePath);

                // Skip V1 if we already have V2 for this resource
                if (ext == MarbleDataAccess.MarbleBibleExtensionV1 && v2Names.Contains(shortName))
                    continue;

                if (ext == MarbleDataAccess.MarbleBibleExtensionV2)
                    v2Names.Add(shortName);

                try
                {
                    var projectName = new ProjectName(filePath);
                    var scrText = new ResourceScrText(
                        projectName,
                        RegistrationInfo.DefaultUser,
                        new DblResourcePasswordProvider(),
                        ignoreLoadErrors: true,
                        isDictionary: false,
                        isMarbleRsource: true
                    );

                    results.Add(
                        new EnhancedResourceInfo(
                            Id: string.IsNullOrEmpty(scrText.Settings.GetSetting("ResourceId"))
                                ? shortName
                                : scrText.Settings.GetSetting("ResourceId")!,
                            Name: scrText.Settings.FullName ?? "",
                            ShortName: shortName,
                            Language: scrText.Settings.GetSetting("ResourceLanguage") ?? "",
                            Version: scrText.Settings.GetSetting("MarbleVersion") ?? "",
                            HasResearchData: (
                                scrText.Settings.GetSetting("MarbleResearchData") ?? "F"
                            ) == "T",
                            IsInstalled: true,
                            HasUpdate: false
                        )
                    );
                }
                catch (Exception ex)
                {
                    Console.WriteLine(
                        $"Failed to read Enhanced Resource '{filePath}': {ex.Message}"
                    );
                }
            }
        }

        return results;
    }
}
