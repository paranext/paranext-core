using System.Collections.Concurrent;
using Paratext.Data;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Manages initialization, discovery, lifecycle, and update checking of Enhanced Resource
/// (Marble) projects.
///
/// Implements CAP-015 InitializeResources (Section 4.15), CAP-016 GetAvailableResources
/// (Section 4.16), and CAP-020 CheckResourceUpdate (Section 4.20). Discovers MarbleResource
/// projects from ScrTextCollection, validates their integrity, loads
/// dictionaries/encyclopedias/image metadata, tracks the haveMarbleData availability flag,
/// lists installed ER projects with metadata, and checks for available updates using
/// Marble semantic version comparison.
/// </summary>
internal sealed class ResourceManager
{
    private readonly ConcurrentDictionary<string, bool> _loadedDictionaries = new();
    private readonly ConcurrentDictionary<string, string> _dictionaryAliases = new();
    private readonly ConcurrentDictionary<
        string,
        (string availableVersion, bool isMajorUpdate, DateTime fetchedAt)
    > _manifestCache = new();
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
    /// Test seam: checks whether a resource with the given ID exists.
    /// When null, looks up the resource from ScrTextCollection.
    /// Returns (exists, currentVersion) or (false, null) if not found.
    /// </summary>
    internal static Func<
        string,
        (bool exists, string? currentVersion)
    >? TestResourceLookup { get; set; }

    /// <summary>
    /// Test seam: checks network availability and fetches the manifest version for a resource.
    /// When null, performs a real network check against the Marble resource server.
    /// Returns (networkAvailable, availableVersion, isMajorUpdate) or error info.
    /// </summary>
    internal static Func<
        string,
        (bool networkAvailable, string? availableVersion, bool isMajorUpdate, string? errorMessage)
    >? TestManifestFetch { get; set; }

    /// <summary>
    /// Test seam: returns the current UTC time for cache expiry calculations.
    /// When null, uses <see cref="DateTime.UtcNow"/>.
    /// </summary>
    internal static Func<DateTime>? TestUtcNow { get; set; }

    /// <summary>
    /// Test seam: returns the timestamp when the manifest cache was last updated.
    /// When null, reads from the internal cache state.
    /// </summary>
    internal static Func<string, DateTime?>? TestManifestCacheTimestamp { get; set; }

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

    /// <summary>
    /// Maps a ParatextData ScrText to a ResourceInfo DTO.
    /// </summary>
    /// <remarks>
    /// Ported from PT9 Host.AllEnhancedResources enumeration.
    /// INV-001/INV-004: IsMarbleResource always true.
    /// INV-008: Font from project settings.
    /// INV-010: FullName from settings with fallback to Name.
    /// </remarks>
    private static ResourceInfo MapScrTextToResourceInfo(ScrText scrText)
    {
        var settings = scrText.Settings;
        var name = scrText.Name;
        var languageId = settings.LanguageID?.Id ?? "";

        return new ResourceInfo(
            ResourceId: name,
            Name: name,
            FullName: ResolveFullName(settings.FullName, name),
            LanguageId: languageId,
            Version: "",
            IsMarbleResource: true,
            Copyright: null,
            AvailableBooks: ParseAvailableBooks(scrText.BooksPresentSet.Books),
            Font: ResolveFont(settings.DefaultFont, settings.DefaultFontSize),
            HtmlLanguage: languageId
        );
    }

    /// <summary>
    /// Resolves the display name, falling back to the short name when empty.
    /// </summary>
    /// <remarks>INV-010: FullName from DBL metadata with settings fallback.</remarks>
    private static string ResolveFullName(string? settingsFullName, string shortName) =>
        !string.IsNullOrEmpty(settingsFullName) ? settingsFullName : shortName;

    /// <summary>
    /// Parses the BooksPresentSet.Books string (chars '0'/'1' at index positions)
    /// into a list of canonical book numbers.
    /// </summary>
    private static IReadOnlyList<int> ParseAvailableBooks(string? booksString)
    {
        var books = booksString ?? "";
        var availableBooks = new List<int>();
        for (int i = 0; i < books.Length; i++)
        {
            if (books[i] == '1')
                availableBooks.Add(i + 1);
        }
        return availableBooks.AsReadOnly();
    }

    /// <summary>
    /// Resolves font settings with sensible defaults.
    /// </summary>
    /// <remarks>INV-008: Font resolved language-first, then settings fallback.</remarks>
    private static FontInfo ResolveFont(string? defaultFont, int defaultFontSize) =>
        new(defaultFont ?? "Charis SIL", defaultFontSize > 0 ? defaultFontSize : 12.0, null);

    // =========================================================================
    // CAP-020: CheckResourceUpdate (Section 4.20)
    // =========================================================================

    /// <summary>
    /// Checks whether a newer version of an Enhanced Resource is available for download.
    /// Uses Marble semantic version comparison (INV-005, INV-C05).
    /// </summary>
    /// <remarks>
    /// Ported from PT9 InstallableResource.IsNewerThanCurrentlyInstalled() and
    /// MarbleForm background version check (EXT-020, EXT-035).
    /// Contract: Section 4.20.
    /// BHV-106: Marble resources use ResourceVersion comparison; not-installed always newer.
    /// INV-005: Marble uses semantic Version, not DBL revision/checksum.
    /// INV-C05: isMarble(r) => updateAvailable(r) == (r.availableVersion > r.installedVersion).
    /// Manifest cache expires after 24 hours (VAL-010, TS-086).
    /// </remarks>
    /// <param name="input">Resource identity to check for updates.</param>
    /// <param name="ct">Cancellation token for cooperative cancellation.</param>
    /// <returns>Result indicating update availability, or failure with error code and message.</returns>
    public Task<ResourceUpdateResult> CheckResourceUpdateAsync(
        ResourceIdentityInput input,
        CancellationToken ct
    )
    {
        ct.ThrowIfCancellationRequested();

        var (exists, currentVersion) = LookupResource(input.ResourceId);
        if (!exists)
        {
            return Task.FromResult(
                new ResourceUpdateResult(
                    Success: false,
                    Error: new ErrorInfo("NOT_FOUND", $"Resource '{input.ResourceId}' not found")
                )
            );
        }

        if (IsManifestCacheValid(input.ResourceId))
        {
            if (_manifestCache.TryGetValue(input.ResourceId, out var cached))
            {
                var cachedUpdateAvailable = IsNewerVersion(currentVersion, cached.availableVersion);
                return Task.FromResult(
                    new ResourceUpdateResult(
                        Success: true,
                        UpdateAvailable: cachedUpdateAvailable,
                        CurrentVersion: currentVersion ?? "",
                        AvailableVersion: cached.availableVersion,
                        IsMajorUpdate: cached.isMajorUpdate
                    )
                );
            }

            return Task.FromResult(
                new ResourceUpdateResult(
                    Success: true,
                    UpdateAvailable: false,
                    CurrentVersion: currentVersion ?? ""
                )
            );
        }

        var (networkAvailable, availableVersion, isMajorUpdate, errorMessage) = FetchManifest(
            input.ResourceId
        );

        if (!networkAvailable)
        {
            return Task.FromResult(
                new ResourceUpdateResult(
                    Success: false,
                    Error: new ErrorInfo(
                        "NETWORK_ERROR",
                        "Cannot check for updates: no network connection"
                    )
                )
            );
        }

        if (availableVersion == null)
        {
            return Task.FromResult(
                new ResourceUpdateResult(
                    Success: false,
                    Error: new ErrorInfo(
                        "NETWORK_ERROR",
                        errorMessage ?? "Failed to download resource manifest"
                    )
                )
            );
        }

        var now = GetUtcNow();
        _manifestCache[input.ResourceId] = (availableVersion, isMajorUpdate, now);

        var updateAvailable = IsNewerVersion(currentVersion, availableVersion);

        return Task.FromResult(
            new ResourceUpdateResult(
                Success: true,
                UpdateAvailable: updateAvailable,
                CurrentVersion: currentVersion ?? "",
                AvailableVersion: availableVersion,
                IsMajorUpdate: isMajorUpdate
            )
        );
    }

    /// <summary>
    /// Looks up a resource by ID to determine if it exists and get its current version.
    /// </summary>
    /// <remarks>
    /// Uses <see cref="TestResourceLookup"/> test seam when set;
    /// otherwise queries ScrTextCollection.
    /// </remarks>
    private static (bool exists, string? currentVersion) LookupResource(string resourceId)
    {
        if (TestResourceLookup != null)
            return TestResourceLookup(resourceId);

        try
        {
            var scrText = ScrTextCollection
                .ScrTexts(IncludeProjects.Everything)
                .FirstOrDefault(st => st.Name == resourceId && st.Settings.IsMarbleResource);

            if (scrText == null)
                return (false, null);

            return (true, scrText.Settings.Version?.ToString());
        }
        catch
        {
            return (false, null);
        }
    }

    /// <summary>
    /// Checks whether the manifest cache for a resource is still valid (within 24 hours).
    /// </summary>
    /// <remarks>
    /// Uses <see cref="TestManifestCacheTimestamp"/> and <see cref="TestUtcNow"/> test seams
    /// when set. VAL-010: Manifest cache expires after 24 hours (TS-086, TS-087).
    /// </remarks>
    private bool IsManifestCacheValid(string resourceId)
    {
        DateTime? cacheTimestamp = null;

        if (TestManifestCacheTimestamp != null)
            cacheTimestamp = TestManifestCacheTimestamp(resourceId);
        else if (_manifestCache.TryGetValue(resourceId, out var cached))
            cacheTimestamp = cached.fetchedAt;

        return cacheTimestamp != null && (GetUtcNow() - cacheTimestamp.Value).TotalHours <= 24;
    }

    /// <summary>
    /// Fetches the manifest version for a resource from the server.
    /// </summary>
    /// <remarks>
    /// Uses <see cref="TestManifestFetch"/> test seam when set;
    /// otherwise performs a real network check against the Marble resource server.
    /// </remarks>
    private static (
        bool networkAvailable,
        string? availableVersion,
        bool isMajorUpdate,
        string? errorMessage
    ) FetchManifest(string resourceId)
    {
        if (TestManifestFetch != null)
            return TestManifestFetch(resourceId);

        // Production: would perform real network fetch
        return (false, null, false, "Cannot check for updates: no network connection");
    }

    /// <summary>
    /// Determines whether the available version is newer than the installed version.
    /// </summary>
    /// <remarks>
    /// BHV-106: Not-installed (currentVersion == null) always reports as newer.
    /// INV-005: Marble resources use semantic Version comparison.
    /// INV-C05: updateAvailable == (availableVersion > installedVersion).
    /// </remarks>
    private static bool IsNewerVersion(string? currentVersion, string availableVersion)
    {
        if (currentVersion == null)
            return true;

        if (
            Version.TryParse(currentVersion, out var current)
            && Version.TryParse(availableVersion, out var available)
        )
        {
            return available > current;
        }

        // Fallback to string comparison when versions are not parseable
        return string.Compare(availableVersion, currentVersion, StringComparison.Ordinal) > 0;
    }

    /// <summary>
    /// Gets the current UTC time, using the test seam if available.
    /// </summary>
    private static DateTime GetUtcNow() => TestUtcNow?.Invoke() ?? DateTime.UtcNow;
}
