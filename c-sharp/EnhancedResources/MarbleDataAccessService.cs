// TDD RED stub: Compilation-only stubs for RED phase testing.
// The implementer will replace this with the real implementation.
using Paratext.Data;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Core data access service for Enhanced Resources. Implements
/// IEnhancedResourceProvider and IMarbleDataAccess contracts.
/// Manages marble package discovery, lexicon loading, and
/// reference-to-meaning cache (~600K entries).
///
/// Source: CAP-001, EXT-051, data-contracts.md Section 4.1
/// TDD RED STUB - All methods throw NotImplementedException.
/// </summary>
internal class MarbleDataAccessService
{
    private static MarbleDataAccessService? s_default;

    /// <summary>
    /// Singleton access. INV-C11: Only one instance across application lifetime.
    /// </summary>
    public static MarbleDataAccessService Default => s_default ??= new MarbleDataAccessService();

    public bool HaveMarbleData => throw new NotImplementedException("RED stub: HaveMarbleData");

    public List<string> AvailableGlossLanguages =>
        throw new NotImplementedException("RED stub: AvailableGlossLanguages");

    public IEnumerable<ScrText> AvailableBibles =>
        throw new NotImplementedException("RED stub: AvailableBibles");

    public void Initialize()
    {
        throw new NotImplementedException("RED stub: Initialize");
    }

    public IList<string> FindLocalizedGlossesForTerm(string termLemma, string language)
    {
        throw new NotImplementedException("RED stub: FindLocalizedGlossesForTerm");
    }

    /// <summary>
    /// Returns a snapshot list of all enhanced resources. INV-C09: New list each call.
    /// </summary>
    public List<ScrText> GetAllEnhancedResources()
    {
        throw new NotImplementedException("RED stub: GetAllEnhancedResources");
    }

    /// <summary>
    /// Null-safe delegation for Host.AllEnhancedResources pattern.
    /// Returns empty list when provider is null. INV-C09 + TS-047.
    /// </summary>
    public static List<ScrText> GetAllEnhancedResourcesNullSafe(MarbleDataAccessService? provider)
    {
        if (provider == null)
            return [];

        return provider.GetAllEnhancedResources();
    }
}
