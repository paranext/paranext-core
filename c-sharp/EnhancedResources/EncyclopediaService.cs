namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Encyclopedia entry loading, image ID extraction. Returns structured
/// EncyclopediaLoadResult with display items for the Encyclopedia Tab.
/// Source: CAP-009, EXT-057, BHV-604
/// </summary>
internal static class EncyclopediaService
{
    // === STUB: Implementation pending (EXT-057) ===
    // Source: PT9/Paratext/Marble/EncyclopediaTab.cs
    // Method: EncyclopediaTab.LoadResources (~200 lines)

    /// <summary>
    /// Loads encyclopedia entries for the current scope. Handles V1/V2 format differences.
    /// Multi-language article selection with fallback chain (user > English > any).
    /// </summary>
    public static EncyclopediaLoadResult LoadResources(EncyclopediaLoadInput input)
    {
        throw new NotImplementedException(
            "CAP-009: EncyclopediaService.LoadResources not yet implemented"
        );
    }
}
