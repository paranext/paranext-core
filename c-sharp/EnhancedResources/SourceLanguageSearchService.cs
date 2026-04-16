namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Source language search pipeline: input parsing (EXT-070), lemma matching (EXT-071),
/// occurrence finding (EXT-072/073), result formatting (EXT-074/075),
/// orchestration with ShowInContextLimit check (EXT-076), entry index parsing (EXT-077).
///
/// Context limit is 10,000 per FindSource.cs:26.
/// Source: EXT-070-077, BHV-451, BHV-T013, VAL-006, VAL-009
/// </summary>
internal static class SourceLanguageSearchService
{
    /// <summary>
    /// Executes the full source language search pipeline.
    /// Strips trailing base/meaning index notation. Matches lemmas against loaded lexicon.
    /// Finds occurrences across specified book range. Reports exceedsLimit when results
    /// exceed ShowInContextLimit (VAL-009). Special characters must not cause regex hang
    /// (BHV-T013).
    /// </summary>
    /// <param name="input">Search input with text, book range, resource ID, and context limit.</param>
    /// <param name="ct">Cancellation token.</param>
    /// <returns>Search results with matched lemmas, occurrence counts, and verse references.</returns>
    /// <exception cref="InvalidOperationException">
    /// INVALID_ARGUMENT when search text is empty.
    /// FAILED_PRECONDITION when no marble data is installed.
    /// </exception>
    public static Task<SourceLanguageSearchResult> ExecuteSearchAsync(
        SourceLanguageSearchInput input,
        CancellationToken ct
    )
    {
        throw new NotImplementedException(
            "CAP-012: SourceLanguageSearchService.ExecuteSearchAsync not yet implemented"
        );
    }
}
