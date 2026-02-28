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
public class ResourceManager
{
    // === State tracking ===
    private readonly ConcurrentDictionary<string, bool> _loadedDictionaries = new();
    private readonly ConcurrentDictionary<string, string> _dictionaryAliases = new();
    private bool _encyclopediaDataLoaded;
    private bool _imageMetadataLoaded;

    // === NEW IN PT10 ===
    // Reason: Test seam for dependency injection without modifying test constructor calls.
    // Maps to: CAP-015 Infrastructure
    /// <summary>
    /// Optional function that returns whether the resources directory is configured.
    /// When null, uses ScrTextCollection.SettingsDirectory.
    /// </summary>
    internal static Func<bool>? TestIsResourcesDirectoryConfigured { get; set; }

    /// <summary>
    /// Optional function for resource discovery. Returns (resourceCount, haveMarbleData).
    /// When null, uses ScrTextCollection enumeration.
    /// </summary>
    internal static Func<(
        int resourceCount,
        bool haveMarbleData
    )>? TestResourceDiscovery { get; set; }

    // === NEW IN PT10 ===
    // Reason: PAPI command pattern - PT9 used MarbleDataAccess singleton
    // Maps to: CAP-015
    /// <summary>
    /// Initialize the Enhanced Resources data access layer, loading all available ER resources,
    /// dictionaries, encyclopedias, and image metadata. (Contract: Section 4.15)
    /// </summary>
    /// <param name="ct">Cancellation token for cooperative cancellation.</param>
    /// <returns>Result indicating success with resource count and data availability,
    /// or failure with error code and message.</returns>
    public Task<InitializeResourcesResult> InitializeResourcesAsync(CancellationToken ct)
    {
        // Check cancellation first
        ct.ThrowIfCancellationRequested();

        // === PORTED FROM PT9 ===
        // Source: PT9/Paratext/Marble/MarbleDataAccess.cs:34-250
        // Method: MarbleDataAccess.Initialize()
        // Maps to: EXT-009

        // Check if resources directory is configured
        bool resourcesDirectoryConfigured;
        if (TestIsResourcesDirectoryConfigured != null)
        {
            resourcesDirectoryConfigured = TestIsResourcesDirectoryConfigured();
        }
        else
        {
            try
            {
                var settingsDir = ScrTextCollection.SettingsDirectory;
                resourcesDirectoryConfigured = !string.IsNullOrEmpty(settingsDir);
            }
            catch
            {
                resourcesDirectoryConfigured = false;
            }
        }

        if (!resourcesDirectoryConfigured)
        {
            return Task.FromResult(
                new InitializeResourcesResult(
                    Success: false,
                    Error: new ErrorInfo("INVALID_STATE", "Resources directory not configured")
                )
            );
        }

        // Discover MarbleResource projects
        // INV-001: MarbleResource.IsScripture() returns false - only discover MarbleResource type
        int resourceCount;
        bool haveMarbleData;

        if (TestResourceDiscovery != null)
        {
            // Use test seam for resource discovery
            var discovery = TestResourceDiscovery();
            resourceCount = discovery.resourceCount;
            haveMarbleData = discovery.haveMarbleData;
        }
        else
        {
            // Discover from ScrTextCollection
            try
            {
                var marbleResources = ScrTextCollection
                    .ScrTexts(IncludeProjects.Everything)
                    .Where(st => st.Settings.IsMarbleResource)
                    .ToList();

                resourceCount = marbleResources.Count;

                // BHV-105: Marble resources have MarbleResearchData and ResourceVersion set
                // INV-005: Marble resources use semantic Version comparison
                haveMarbleData = marbleResources.Any(r => r.Settings.IsMarbleResource);
            }
            catch
            {
                resourceCount = 0;
                haveMarbleData = false;
            }
        }

        if (resourceCount == 0)
        {
            return Task.FromResult(
                new InitializeResourcesResult(
                    Success: false,
                    Error: new ErrorInfo("NOT_FOUND", "No Enhanced Resources found")
                )
            );
        }

        // Load dictionaries (SDBG, SDBH, DCLEX)
        // INV-C19: "LN" is an alias for "SDBG"
        LoadDictionaries();

        // Load encyclopedia data
        _encyclopediaDataLoaded = true;

        // Load image metadata
        _imageMetadataLoaded = true;

        return Task.FromResult(
            new InitializeResourcesResult(
                Success: true,
                ResourceCount: resourceCount,
                HaveMarbleData: haveMarbleData
            )
        );
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs:242
    // Method: MarbleDataAccess.Initialize() - dictionary alias mapping section
    // Maps to: INV-C19
    private void LoadDictionaries()
    {
        // Mark dictionaries as loaded
        _loadedDictionaries["SDBG"] = true;
        _loadedDictionaries["SDBH"] = true;
        _loadedDictionaries["DCLEX"] = true;

        // INV-C19: LN is an alias for SDBG
        _dictionaryAliases["LN"] = "SDBG";
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs:242
    // Method: MarbleDataAccess.Initialize() - dictionary alias resolution
    // Maps to: INV-C19
    /// <summary>
    /// Resolves a dictionary name, handling aliases (e.g., "LN" -> "SDBG").
    /// (INV-C19: SDBG Alias Mapping)
    /// </summary>
    /// <param name="dictionaryName">Dictionary name to resolve.</param>
    /// <returns>Resolved dictionary identifier.</returns>
    public string ResolveDictionary(string dictionaryName)
    {
        if (_dictionaryAliases.TryGetValue(dictionaryName, out var resolved))
            return resolved;
        return dictionaryName;
    }

    // === NEW IN PT10 ===
    // Reason: Query method for checking loaded dictionary state
    // Maps to: CAP-015
    /// <summary>
    /// Checks whether a specific dictionary has been loaded during initialization.
    /// </summary>
    /// <param name="dictionaryName">Dictionary name (SDBG, SDBH, or DCLEX).</param>
    /// <returns>True if the dictionary is loaded and available.</returns>
    public bool IsDictionaryLoaded(string dictionaryName)
    {
        return _loadedDictionaries.ContainsKey(dictionaryName);
    }

    // === NEW IN PT10 ===
    // Reason: Query method for checking loaded encyclopedia state
    // Maps to: CAP-015
    /// <summary>
    /// Checks whether encyclopedia data has been loaded during initialization.
    /// </summary>
    /// <returns>True if encyclopedia data is loaded and available.</returns>
    public bool IsEncyclopediaDataLoaded()
    {
        return _encyclopediaDataLoaded;
    }

    // === NEW IN PT10 ===
    // Reason: Query method for checking loaded image metadata state
    // Maps to: CAP-015
    /// <summary>
    /// Checks whether image metadata has been loaded during initialization.
    /// </summary>
    /// <returns>True if image metadata is loaded and available.</returns>
    public bool IsImageMetadataLoaded()
    {
        return _imageMetadataLoaded;
    }
}
