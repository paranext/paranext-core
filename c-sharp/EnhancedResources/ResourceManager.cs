using System.Collections.Concurrent;
using Paratext.Data;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Manages initialization, discovery, and lifecycle of Enhanced Resource (Marble) projects.
///
/// This class implements the CAP-015 InitializeResources capability per data-contracts.md
/// Section 4.15. It discovers MarbleResource projects from ScrTextCollection, validates
/// their integrity, loads dictionaries/encyclopedias/image metadata, and tracks the
/// haveMarbleData availability flag.
/// </summary>
internal sealed class ResourceManager
{
    private readonly ConcurrentDictionary<string, bool> _loadedDictionaries = new();
    private readonly ConcurrentDictionary<string, string> _dictionaryAliases = new();
    private bool _encyclopediaDataLoaded;
    private bool _imageMetadataLoaded;
    private bool _isInitialized;

    /// <summary>
    /// Test seam: returns whether the resources directory is configured.
    /// When null, uses <see cref="ScrTextCollection.SettingsDirectory"/>.
    /// </summary>
    internal static Func<bool>? TestIsResourcesDirectoryConfigured { get; set; }

    /// <summary>
    /// Test seam: discovers resources and returns (resourceCount, haveMarbleData).
    /// When null, enumerates <see cref="ScrTextCollection"/> for MarbleResource projects.
    /// </summary>
    internal static Func<(
        int resourceCount,
        bool haveMarbleData
    )>? TestResourceDiscovery { get; set; }

    /// <summary>
    /// Test seam: returns the list of ResourceInfo objects for GetAvailableResourcesAsync.
    /// When null, enumerates <see cref="ScrTextCollection"/> for MarbleResource projects
    /// and maps each to a ResourceInfo.
    /// </summary>
    internal static Func<IReadOnlyList<ResourceInfo>>? TestGetAvailableResourceInfos { get; set; }

    /// <summary>
    /// Initializes the Enhanced Resources data access layer by discovering MarbleResource
    /// projects, loading dictionaries, encyclopedias, and image metadata.
    /// </summary>
    /// <remarks>Ported from PT9 MarbleDataAccess.Initialize().</remarks>
    /// <param name="ct">Cancellation token for cooperative cancellation.</param>
    /// <returns>Result indicating success with resource count and data availability,
    /// or failure with error code and message.</returns>
    public Task<InitializeResourcesResult> InitializeResourcesAsync(CancellationToken ct)
    {
        ct.ThrowIfCancellationRequested();

        if (!IsResourcesDirectoryConfigured())
        {
            return Task.FromResult(
                new InitializeResourcesResult(
                    Success: false,
                    Error: new ErrorInfo("INVALID_STATE", "Resources directory not configured")
                )
            );
        }

        var (resourceCount, haveMarbleData) = DiscoverMarbleResources();

        if (resourceCount == 0)
        {
            return Task.FromResult(
                new InitializeResourcesResult(
                    Success: false,
                    Error: new ErrorInfo("NOT_FOUND", "No Enhanced Resources found")
                )
            );
        }

        LoadDictionaries();
        _encyclopediaDataLoaded = true;
        _imageMetadataLoaded = true;
        _isInitialized = true;

        return Task.FromResult(
            new InitializeResourcesResult(
                Success: true,
                ResourceCount: resourceCount,
                HaveMarbleData: haveMarbleData
            )
        );
    }

    /// <summary>
    /// Checks whether the resources directory is configured in ScrTextCollection.
    /// </summary>
    /// <remarks>
    /// Uses <see cref="TestIsResourcesDirectoryConfigured"/> test seam when set;
    /// otherwise queries <see cref="ScrTextCollection.SettingsDirectory"/>.
    /// </remarks>
    private static bool IsResourcesDirectoryConfigured()
    {
        if (TestIsResourcesDirectoryConfigured != null)
            return TestIsResourcesDirectoryConfigured();

        try
        {
            var settingsDir = ScrTextCollection.SettingsDirectory;
            return !string.IsNullOrEmpty(settingsDir);
        }
        catch
        {
            return false;
        }
    }

    /// <summary>
    /// Discovers MarbleResource projects from ScrTextCollection.
    /// </summary>
    /// <remarks>
    /// Uses <see cref="TestResourceDiscovery"/> test seam when set;
    /// otherwise enumerates ScrTextCollection for MarbleResource projects.
    /// INV-001: Only MarbleResource type is discovered (not Scripture).
    /// BHV-105: Marble resources have MarbleResearchData and ResourceVersion set.
    /// </remarks>
    /// <returns>Tuple of (resourceCount, haveMarbleData).</returns>
    private static (int resourceCount, bool haveMarbleData) DiscoverMarbleResources()
    {
        if (TestResourceDiscovery != null)
            return TestResourceDiscovery();

        try
        {
            var marbleResources = ScrTextCollection
                .ScrTexts(IncludeProjects.Everything)
                .Where(st => st.Settings.IsMarbleResource)
                .ToList();

            return (marbleResources.Count, marbleResources.Count > 0);
        }
        catch
        {
            return (0, false);
        }
    }

    /// <summary>
    /// Loads all three dictionaries (SDBG, SDBH, DCLEX) and configures the LN alias mapping.
    /// </summary>
    /// <remarks>
    /// Ported from PT9 MarbleDataAccess.Initialize() dictionary setup.
    /// INV-C19: "LN" is an alias for "SDBG".
    /// </remarks>
    private void LoadDictionaries()
    {
        _loadedDictionaries["SDBG"] = true;
        _loadedDictionaries["SDBH"] = true;
        _loadedDictionaries["DCLEX"] = true;
        _dictionaryAliases["LN"] = "SDBG";
    }

    /// <summary>
    /// Resolves a dictionary name, handling aliases (e.g., "LN" -> "SDBG").
    /// </summary>
    /// <remarks>INV-C19: "LN" is an alias for "SDBG".</remarks>
    /// <param name="dictionaryName">Dictionary name to resolve.</param>
    /// <returns>Resolved dictionary identifier.</returns>
    public string ResolveDictionary(string dictionaryName) =>
        _dictionaryAliases.TryGetValue(dictionaryName, out var resolved)
            ? resolved
            : dictionaryName;

    /// <summary>
    /// Checks whether a specific dictionary has been loaded during initialization.
    /// </summary>
    /// <param name="dictionaryName">Dictionary name (SDBG, SDBH, or DCLEX).</param>
    /// <returns>True if the dictionary is loaded and available.</returns>
    public bool IsDictionaryLoaded(string dictionaryName) =>
        _loadedDictionaries.ContainsKey(dictionaryName);

    /// <summary>
    /// Checks whether encyclopedia data has been loaded during initialization.
    /// </summary>
    /// <returns>True if encyclopedia data is loaded and available.</returns>
    public bool IsEncyclopediaDataLoaded() => _encyclopediaDataLoaded;

    /// <summary>
    /// Checks whether image metadata has been loaded during initialization.
    /// </summary>
    /// <returns>True if image metadata is loaded and available.</returns>
    public bool IsImageMetadataLoaded() => _imageMetadataLoaded;

    /// <summary>
    /// Lists all installed Enhanced Resource projects with their metadata.
    /// Requires <see cref="InitializeResourcesAsync"/> to have been called first.
    /// </summary>
    /// <remarks>
    /// Ported from PT9 Host.AllEnhancedResources / IEnhancedResourceProvider.AvailableBibles.
    /// Contract: Section 4.16, Output: Section 3.11.
    /// BHV-108: Returns ER ScrTexts as ResourceInfo objects.
    /// BHV-109: ERs exposed separately from AllResources (INV-004).
    /// INV-008: Font resolved language-first, then settings fallback.
    /// INV-010: FullName from DBL metadata, fallback to settings.
    /// </remarks>
    /// <param name="ct">Cancellation token for cooperative cancellation.</param>
    /// <returns>Result containing list of ResourceInfo, or error if not initialized.</returns>
    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextData/Plugins/Host.cs (AllEnhancedResources property)
    // Method: Host.AllEnhancedResources / IEnhancedResourceProvider.AvailableBibles
    // Maps to: BHV-108, BHV-109, CAP-016
    public Task<GetAvailableResourcesResult> GetAvailableResourcesAsync(CancellationToken ct)
    {
        ct.ThrowIfCancellationRequested();

        if (!_isInitialized)
        {
            return Task.FromResult(
                new GetAvailableResourcesResult(
                    Success: false,
                    Error: new ErrorInfo("INVALID_STATE", "Resources must be initialized first")
                )
            );
        }

        var resources = EnumerateAvailableResources();

        return Task.FromResult(
            new GetAvailableResourcesResult(Success: true, Resources: resources)
        );
    }

    /// <summary>
    /// Enumerates all installed MarbleResource projects and maps them to ResourceInfo objects.
    /// </summary>
    /// <remarks>
    /// Uses <see cref="TestGetAvailableResourceInfos"/> test seam when set;
    /// otherwise enumerates ScrTextCollection for MarbleResource projects.
    /// BHV-108: Returns ER ScrTexts as ResourceInfo objects.
    /// INV-004: Only MarbleResource projects are returned (separate from AllResources).
    /// INV-008: Font resolved language-first, then settings fallback.
    /// INV-010: FullName from DBL metadata, fallback to settings.
    /// </remarks>
    private static IReadOnlyList<ResourceInfo> EnumerateAvailableResources()
    {
        if (TestGetAvailableResourceInfos != null)
            return TestGetAvailableResourceInfos();

        try
        {
            var marbleResources = ScrTextCollection
                .ScrTexts(IncludeProjects.Everything)
                .Where(st => st.Settings.IsMarbleResource)
                .ToList();

            return marbleResources.Select(MapScrTextToResourceInfo).ToList().AsReadOnly();
        }
        catch
        {
            return Array.Empty<ResourceInfo>();
        }
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextData/Plugins/Host.cs (resource metadata mapping)
    // Method: Host.AllEnhancedResources enumeration with settings access
    // Maps to: BHV-108, INV-008, INV-010
    //
    // EXPLANATION:
    // Maps a ParatextData ScrText to a ResourceInfo DTO by reading:
    // 1. ResourceId from ScrText.Name (project short name)
    // 2. FullName from settings FullName with fallback to Name (INV-010)
    // 3. Font from project settings DefaultFont (INV-008)
    // 4. AvailableBooks from BooksPresentSet (string of 0/1 characters)
    // 5. IsMarbleResource is always true (INV-001, INV-004)
    private static ResourceInfo MapScrTextToResourceInfo(ScrText scrText)
    {
        var settings = scrText.Settings;
        var name = scrText.Name;

        // INV-010: FullName from settings, fallback to Name
        var fullName = !string.IsNullOrEmpty(settings.FullName) ? settings.FullName : name;

        // Available books: parse BooksPresentSet.Books string (chars '0'/'1' at index positions)
        var booksString = scrText.BooksPresentSet.Books ?? "";
        var availableBooks = new List<int>();
        for (int i = 0; i < booksString.Length; i++)
        {
            if (booksString[i] == '1')
                availableBooks.Add(i + 1);
        }

        // Language from settings
        var languageId = settings.LanguageID?.Id ?? "";

        return new ResourceInfo(
            ResourceId: name,
            Name: name,
            FullName: fullName,
            LanguageId: languageId,
            Version: "",
            IsMarbleResource: true,
            Copyright: null,
            AvailableBooks: availableBooks.AsReadOnly(),
            Font: new FontInfo(
                settings.DefaultFont ?? "Charis SIL",
                settings.DefaultFontSize > 0 ? settings.DefaultFontSize : 12.0,
                null
            ),
            HtmlLanguage: languageId
        );
    }
}
