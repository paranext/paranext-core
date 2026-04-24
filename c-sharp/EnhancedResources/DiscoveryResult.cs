// === NEW IN PT10 ===
// Reason: Return type for MarblePackageDiscoverer.Discover.
using Paratext.Data;

namespace Paranext.DataProvider.EnhancedResources;

internal sealed record DiscoveryResult(
    IReadOnlyList<ResourceScrText> BiblePackages,
    IReadOnlyDictionary<string, ResourceScrText> ResearchPackages,
    bool HaveVersion2Resources,
    int SkippedFileCount
)
{
    public static DiscoveryResult Empty { get; } =
        new(
            [],
            new Dictionary<string, ResourceScrText>(StringComparer.OrdinalIgnoreCase),
            HaveVersion2Resources: false,
            SkippedFileCount: 0
        );
}
