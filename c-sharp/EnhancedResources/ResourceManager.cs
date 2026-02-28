namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Manages initialization, discovery, and lifecycle of Enhanced Resource (Marble) projects.
///
/// This is a TDD stub. All methods throw NotImplementedException.
/// The TDD Implementer agent will replace these with real implementations.
/// </summary>
public class ResourceManager
{
    /// <summary>
    /// Initialize the Enhanced Resources data access layer, loading all available ER resources,
    /// dictionaries, encyclopedias, and image metadata. (Contract: Section 4.15)
    /// </summary>
    /// <param name="ct">Cancellation token for cooperative cancellation.</param>
    /// <returns>Result indicating success with resource count and data availability,
    /// or failure with error code and message.</returns>
    public Task<InitializeResourcesResult> InitializeResourcesAsync(CancellationToken ct)
    {
        throw new NotImplementedException(
            "CAP-015: InitializeResourcesAsync not yet implemented. TDD RED phase."
        );
    }

    /// <summary>
    /// Resolves a dictionary name, handling aliases (e.g., "LN" -> "SDBG").
    /// (INV-C19: SDBG Alias Mapping)
    /// </summary>
    /// <param name="dictionaryName">Dictionary name to resolve.</param>
    /// <returns>Resolved dictionary identifier.</returns>
    public string ResolveDictionary(string dictionaryName)
    {
        throw new NotImplementedException(
            "CAP-015: ResolveDictionary not yet implemented. TDD RED phase."
        );
    }

    /// <summary>
    /// Checks whether a specific dictionary has been loaded during initialization.
    /// </summary>
    /// <param name="dictionaryName">Dictionary name (SDBG, SDBH, or DCLEX).</param>
    /// <returns>True if the dictionary is loaded and available.</returns>
    public bool IsDictionaryLoaded(string dictionaryName)
    {
        throw new NotImplementedException(
            "CAP-015: IsDictionaryLoaded not yet implemented. TDD RED phase."
        );
    }

    /// <summary>
    /// Checks whether encyclopedia data has been loaded during initialization.
    /// </summary>
    /// <returns>True if encyclopedia data is loaded and available.</returns>
    public bool IsEncyclopediaDataLoaded()
    {
        throw new NotImplementedException(
            "CAP-015: IsEncyclopediaDataLoaded not yet implemented. TDD RED phase."
        );
    }

    /// <summary>
    /// Checks whether image metadata has been loaded during initialization.
    /// </summary>
    /// <returns>True if image metadata is loaded and available.</returns>
    public bool IsImageMetadataLoaded()
    {
        throw new NotImplementedException(
            "CAP-015: IsImageMetadataLoaded not yet implemented. TDD RED phase."
        );
    }
}
