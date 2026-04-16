namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Gloss lookup function: maps GlossLookupInput to GlossLookupResult
/// by delegating to MarbleDataAccessService. This logic will be exposed
/// on EnhancedResourceNetworkObject as the findLocalizedGlosses function.
///
/// Source: CAP-006, EXT-051, data-contracts.md Section 4.6, BHV-105
/// </summary>
internal static class GlossLookupFunction
{
    /// <summary>
    /// Execute the gloss lookup: maps GlossLookupInput through the service
    /// and wraps the result in GlossLookupResult with metadata.
    /// </summary>
    public static GlossLookupResult Execute(
        MarbleDataAccessService dataAccess,
        GlossLookupInput input
    )
    {
        throw new NotImplementedException(
            "CAP-006: GlossLookupFunction.Execute not yet implemented. "
                + "Implementer must map GlossLookupInput through "
                + "MarbleDataAccessService.FindLocalizedGlossesForTerm and return GlossLookupResult."
        );
    }
}
