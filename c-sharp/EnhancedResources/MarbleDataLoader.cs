// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleDataAccess.cs (AddMarbleResource, DiscoverPackages,
//         BuildLanguageAndReferenceMapsAsync; requiredDataProjects constants)
// Reason: Top-level orchestration of marble package discovery and per-domain
// XML extraction. Returns a MarbleData record assembled from the per-domain
// loader outputs; never throws for routine failures.
using System.IO;
using Paratext.Data;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Production implementation of IMarbleDataLoader. Discovers marble packages in
/// ScrTextCollection.ResourcesDirectory + _resourcesById, runs per-domain loaders
/// in a fixed order, and assembles the MarbleData record. Catches catastrophic
/// failures at the top level and returns null; per-file failures are caught deeper
/// in individual loaders / the discoverer.
/// </summary>
internal class MarbleDataLoader : IMarbleDataLoader
{
    // Required package short-names (PT9 MarbleDataAccess.cs requiredDataProjects).
    // Missing entries are logged as "ready=false - missing required packages ..." but
    // the loader still returns a MarbleData record with whatever partial content
    // loaded successfully. HaveMarbleData is derived in MarbleDataAccessService from
    // availableBibles.Count > 0.
    private static readonly string[] RequiredDataProjects =
    [
        "MBL_ENC",
        "IMG_INDX",
        "IMG_THMB",
        "SDBG",
        "SDBH",
        "GNT",
        "BHS",
    ];

    private readonly string _resourcesDirectory;
    private readonly string _resourcesByIdDirectory;
    private readonly bool _skipV1Deletion;

    /// <summary>
    /// Default production constructor. Reads directories from ScrTextCollection.
    /// </summary>
    public MarbleDataLoader()
        : this(
            ScrTextCollection.ResourcesDirectory,
            Path.Combine(ScrTextCollection.SettingsDirectory, "_resourcesById"),
            skipV1Deletion: false
        ) { }

    /// <summary>
    /// Test / smoke-check constructor. Accepts explicit directory paths and the
    /// skipV1Deletion flag so tests can run without touching the user's disk.
    /// </summary>
    public MarbleDataLoader(
        string resourcesDirectory,
        string resourcesByIdDirectory,
        bool skipV1Deletion
    )
    {
        _resourcesDirectory = resourcesDirectory;
        _resourcesByIdDirectory = resourcesByIdDirectory;
        _skipV1Deletion = skipV1Deletion;
    }

    public Task<MarbleData?> LoadAsync()
    {
        try
        {
            return Task.FromResult<MarbleData?>(LoadCore());
        }
        catch (Exception e)
        {
            // Catastrophic failure - log with full stack, return null. Services
            // stay unpublished and PAPI handlers will return FAILED_PRECONDITION.
            Console.WriteLine($"Enhanced Resources: load failed - {e}");
            return Task.FromResult<MarbleData?>(null);
        }
    }

    /// <summary>
    /// Core orchestration method. Protected virtual so test doubles can override
    /// it to exercise the catastrophic-failure path in <see cref="LoadAsync"/>
    /// (Directory APIs on .NET 8 Linux don't reliably throw for invalid paths,
    /// so a subclass seam is the stable way to force an exception).
    /// </summary>
    protected virtual MarbleData LoadCore()
    {
        Console.WriteLine($"Enhanced Resources: scanning {_resourcesDirectory}");

        // Phase 1: Discover packages.
        var discoverer = new MarblePackageDiscoverer(
            _resourcesDirectory,
            _resourcesByIdDirectory,
            _skipV1Deletion
        );
        var discovery = discoverer.Discover();

        Console.WriteLine(
            $"Enhanced Resources: discovered {discovery.BiblePackages.Count} bible packages, "
                + $"{discovery.ResearchPackages.Count} research packages"
        );
        if (discovery.HaveVersion2Resources)
            Console.WriteLine("Enhanced Resources: V2 mode (have at least one .mbv2z)");
        if (discovery.SkippedFileCount > 0)
            Console.WriteLine(
                $"Enhanced Resources: skipped {discovery.SkippedFileCount} files due to load errors"
            );

        return CreateMarbleData(discovery);
    }

    /// <summary>
    /// Post-discovery composition path. Wraps research packages, runs per-domain loaders,
    /// computes the missing-required-projects list, emits summary logs, and assembles
    /// the <see cref="MarbleData"/> record. Protected so test doubles can drive it with
    /// a synthetic <see cref="DiscoveryResult"/>.
    /// </summary>
    protected MarbleData CreateMarbleData(DiscoveryResult discovery)
    {
        // Phase 2: Wrap research packages as IMarblePackage for per-domain loaders.
        var researchPackages = new Dictionary<string, IMarblePackage>(
            StringComparer.OrdinalIgnoreCase
        );
        foreach (var (shortName, scrText) in discovery.ResearchPackages)
            researchPackages[shortName] = new MarblePackage(scrText);

        // Phase 3: Per-domain loaders. Each is individually try-catched so one
        // domain failure doesn't fell the rest.
        var knownBibleIds = new HashSet<string>(
            discovery.BiblePackages.Select(b => b.Name),
            StringComparer.OrdinalIgnoreCase
        );
        var (dictionaryData, glossData) = SafeLoadLexicon(researchPackages);
        var encyclopediaData = SafeLoadEncyclopedia(researchPackages, discovery, knownBibleIds);
        var mediaData = SafeLoadMediaIndex(researchPackages, discovery);
        var sourceLanguageData = SafeLoadSourceLanguages(researchPackages);
        var languageMapping = MarbleLanguageMapBuilder.Build(glossData);

        // Phase 4: Required-projects check (PT9 parity).
        var missingRequired = RequiredDataProjects
            .Where(name => !discovery.ResearchPackages.ContainsKey(name))
            .ToList();
        if (missingRequired.Count > 0)
        {
            Console.WriteLine(
                "Enhanced Resources: ready=false - missing required packages: "
                    + string.Join(", ", missingRequired)
            );
        }

        // Phase 5: Summary log and record assembly.
        var haveData = discovery.BiblePackages.Count > 0 && missingRequired.Count == 0;
        if (haveData)
        {
            Console.WriteLine(
                $"Enhanced Resources: ready - {discovery.BiblePackages.Count} bible packages, "
                    + $"{glossData.AvailableLanguages.Count} gloss languages"
            );
        }
        else if (discovery.BiblePackages.Count == 0 && discovery.ResearchPackages.Count == 0)
        {
            Console.WriteLine("Enhanced Resources: no marble data installed");
        }

        // The MarbleData record always includes the BiblePackages list as passed
        // through; the factory's MarbleDataAccessService HaveMarbleData derives from
        // availableBibles.Count > 0. Required-projects-missing manifests as the
        // summary log line above and as empty research-derived fields downstream.
        return new MarbleData(
            BiblePackages: discovery.BiblePackages,
            ResearchPackages: [.. discovery.ResearchPackages.Values],
            GlossData: glossData,
            LanguageMapping: languageMapping,
            DictionaryData: dictionaryData,
            EncyclopediaData: encyclopediaData,
            MediaData: mediaData,
            SourceLanguageData: sourceLanguageData,
            MissingRequiredPackages: missingRequired
        );
    }

    private static (DictionaryData, GlossData) SafeLoadLexicon(
        IReadOnlyDictionary<string, IMarblePackage> research
    )
    {
        try
        {
            return MarbleLexiconLoader.Load(research);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Enhanced Resources: lexicon load failed - {e.Message}");
            return (DictionaryData.Empty, GlossData.Empty);
        }
    }

    private static EncyclopediaData SafeLoadEncyclopedia(
        IReadOnlyDictionary<string, IMarblePackage> research,
        DiscoveryResult discovery,
        IReadOnlySet<string> knownResourceIds
    )
    {
        try
        {
            return MarbleEncyclopediaLoader.Load(
                research,
                discovery.HaveVersion2Resources,
                knownResourceIds
            );
        }
        catch (Exception e)
        {
            Console.WriteLine($"Enhanced Resources: encyclopedia load failed - {e.Message}");
            return EncyclopediaData.Empty;
        }
    }

    private static MediaData SafeLoadMediaIndex(
        IReadOnlyDictionary<string, IMarblePackage> research,
        DiscoveryResult discovery
    )
    {
        try
        {
            // MarbleImageIndexLoader filters the passed-in map to image-binary project
            // names internally, so we can forward the full research-package map.
            return MarbleImageIndexLoader.Load(research, research, discovery.HaveVersion2Resources);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Enhanced Resources: image index load failed - {e.Message}");
            return MediaData.Empty;
        }
    }

    private static SourceLanguageData SafeLoadSourceLanguages(
        IReadOnlyDictionary<string, IMarblePackage> research
    )
    {
        try
        {
            return MarbleSourceLanguageLoader.Load(research);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Enhanced Resources: source-language load failed - {e.Message}");
            return SourceLanguageData.Empty;
        }
    }
}
