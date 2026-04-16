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
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs:1-1998
    // Method: MarbleDataAccess.FindLocalizedGlossesForTerm (gloss lookup delegation)
    // Maps to: EXT-051, CAP-006
    /// <summary>
    /// Execute the gloss lookup: maps GlossLookupInput through the service
    /// and wraps the result in GlossLookupResult with metadata.
    /// </summary>
    public static GlossLookupResult Execute(
        MarbleDataAccessService dataAccess,
        GlossLookupInput input
    )
    {
        if (!dataAccess.HaveMarbleData)
        {
            return new GlossLookupResult(
                Glosses: [],
                ActualLanguage: string.Empty,
                AvailableLanguages: [],
                HaveMarbleData: false
            );
        }

        IList<string> glosses = dataAccess.FindLocalizedGlossesForTerm(
            input.TermId,
            input.PreferredLanguage
        );

        string actualLanguage = dataAccess.ResolveLanguage(input.TermId, input.PreferredLanguage);

        return new GlossLookupResult(
            Glosses: glosses,
            ActualLanguage: actualLanguage,
            AvailableLanguages: dataAccess.AvailableGlossLanguages,
            HaveMarbleData: true
        );
    }
}
