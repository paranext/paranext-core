// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleDataAccess.cs:220-757
// Reason: Package discovery across marble extensions, V1/V2 coexistence,
// V1-delete-on-V2, _resourcesById layout, corrupt-file skip.
using System.IO;
using Paranext.DataProvider.Projects.DigitalBibleLibrary;
using Paratext.Data;
using Paratext.Data.Users;

namespace Paranext.DataProvider.EnhancedResources;

internal sealed class MarblePackageDiscoverer
{
    // Extensions (PT9 MarbleDataAccess.cs:58-65)
    private const string BibleV1 = ".mbv1z";
    private const string BibleV2 = ".mbv2z";
    private const string ImagesV1 = ".miv1z";
    private const string ImagesV2 = ".miv2z";
    private const string Dictionary = ".mdv1z";
    private const string SourceLanguage = ".msv1z";
    private const string ImageIndex = ".mxv1z";
    private const string Encyclopedia = ".mev1z";

    private readonly string _resourcesDirectory;
    private readonly string _resourcesByIdDirectory;
    private readonly bool _skipV1Deletion;

    public MarblePackageDiscoverer(
        string resourcesDirectory,
        string resourcesByIdDirectory,
        bool skipV1Deletion
    )
    {
        _resourcesDirectory = resourcesDirectory;
        _resourcesByIdDirectory = resourcesByIdDirectory;
        _skipV1Deletion = skipV1Deletion;
    }

    public DiscoveryResult Discover()
    {
        if (!Directory.Exists(_resourcesDirectory))
            return DiscoveryResult.Empty;

        // Phase 1: detect V2 bibles by ShortName.
        var v2BibleShortNames = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        foreach (var path in EnumerateMarbleFiles(BibleV2))
            v2BibleShortNames.Add(Path.GetFileNameWithoutExtension(path));
        bool haveVersion2Resources = v2BibleShortNames.Count > 0;

        // Phase 2: compute the set of extensions to load. Bibles handled specially (V1
        // loaded only if no matching V2). Image packages only loaded as V2 if V2-mode.
        var extensionsToLoad = ComputeExtensionsToLoad(haveVersion2Resources);

        // Phase 3: enumerate all matching files and V1-filter bibles.
        var filesToLoad = new List<string>();
        foreach (var ext in extensionsToLoad)
            filesToLoad.AddRange(EnumerateMarbleFiles(ext));
        filesToLoad.AddRange(EnumerateFilteredV1Bibles(v2BibleShortNames));

        // Note: matches PT9 behavior in skipping .miv1z image binaries when V2
        // mode is on. We considered loading orphaned .miv1z image packages
        // (e.g. user has IMG_HD.miv1z + IMG_THMB.miv2z) so that "full" image
        // fetches could pull from IMG_HD instead of falling back to IMG_THMB,
        // but V1 image packages use the legacy descriptive-filename scheme
        // ("Bolen/Aaron - Jebel Haroun, ... tb053008887.jpg") while V2
        // IMAGES_V2.XML metadata carries only the new ID-based names
        // ("BOLEN/BOL-0328_fox.jpg"). Without parsing OriginalFileName /
        // OriginalPath from IMAGES_V2.XML and translating collection-name
        // case ("BOLEN" -> "Bolen") at fetch time, V1 files stay orphaned
        // even when loaded - so we leave them out for now.

        // Phase 4: delete V1 files that have V2 counterparts (guarded by skipV1Deletion).
        if (!_skipV1Deletion)
        {
            foreach (var v2Path in EnumerateMarbleFiles(BibleV2))
                TryDeleteV1Companion(v2Path, BibleV1);
            if (haveVersion2Resources)
            {
                foreach (var v2Path in EnumerateMarbleFiles(ImagesV2))
                    TryDeleteV1Companion(v2Path, ImagesV1);
            }
        }

        // Phase 5: construct ResourceScrText per file; classify.
        var bibles = new List<ResourceScrText>();
        var research = new Dictionary<string, ResourceScrText>(StringComparer.OrdinalIgnoreCase);
        int skipped = 0;

        foreach (var path in filesToLoad)
        {
            var scrText = TryConstructPackage(path);
            if (scrText is null)
            {
                skipped++;
                continue;
            }

            if (scrText.Settings.MarbleResearchData)
            {
                if (research.ContainsKey(scrText.Name))
                    Console.WriteLine(
                        $"Enhanced Resources: warning - duplicate research package '{scrText.Name}' (last wins)"
                    );
                research[scrText.Name] = scrText;
            }
            else
            {
                bibles.Add(scrText);
            }
        }

        return new DiscoveryResult(bibles, research, haveVersion2Resources, skipped);
    }

    private IEnumerable<string> EnumerateMarbleFiles(string extension)
    {
        foreach (var path in Directory.EnumerateFiles(_resourcesDirectory, "*" + extension))
            yield return path;
        if (Directory.Exists(_resourcesByIdDirectory))
        {
            foreach (var path in Directory.EnumerateFiles(_resourcesByIdDirectory, "*" + extension))
                yield return path;
        }
    }

    private static string[] ComputeExtensionsToLoad(bool haveVersion2Resources) =>
        [
            Dictionary,
            SourceLanguage,
            ImageIndex,
            Encyclopedia,
            BibleV2,
            haveVersion2Resources ? ImagesV2 : ImagesV1,
        ];

    private IEnumerable<string> EnumerateFilteredV1Bibles(HashSet<string> v2BibleShortNames)
    {
        foreach (var path in EnumerateMarbleFiles(BibleV1))
        {
            var shortName = Path.GetFileNameWithoutExtension(path);
            // ProjectName's two-step extension-strip handles {name}.{hexId}.{ext} files.
            var doubleStripped = Path.GetFileNameWithoutExtension(shortName);
            if (v2BibleShortNames.Contains(shortName) || v2BibleShortNames.Contains(doubleStripped))
                continue;
            yield return path;
        }
    }

    private void TryDeleteV1Companion(string v2Path, string v1Ext)
    {
        var v1Path = Path.ChangeExtension(v2Path, v1Ext);
        if (!File.Exists(v1Path))
            return;
        try
        {
            File.Delete(v1Path);
            Console.WriteLine($"Enhanced Resources: deleted superseded V1 file {v1Path}");
        }
        catch (Exception e)
        {
            Console.WriteLine($"Enhanced Resources: failed to delete {v1Path}: {e.Message}");
        }
    }

    private static ResourceScrText? TryConstructPackage(string path)
    {
        try
        {
            var projectName = new ProjectName(path);
            return new ResourceScrText(
                projectName,
                RegistrationInfo.DefaultUser,
                new DblResourcePasswordProvider(),
                ignoreLoadErrors: false,
                isDictionary: false,
                isMarbleRsource: true
            );
        }
        catch (Exception e)
        {
            Console.WriteLine($"Enhanced Resources: error loading ER {path}: {e.Message}");
            return null;
        }
    }
}
