// === PORTED FROM PT9 ===
// Source: PT9/Paratext/EditMenu/FindReplaceForm.cs (~600 lines, UpdateSearchLabel + source search pipeline)
// Maps to: EXT-070-077, CAP-012
using System.Text.RegularExpressions;
using Paranext.DataProvider.Errors;
using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Source language search pipeline: input parsing (EXT-070), lemma matching (EXT-071),
/// occurrence finding (EXT-072/073), result formatting (EXT-074/075),
/// orchestration with ShowInContextLimit check (EXT-076), entry index parsing (EXT-077).
///
/// Context limit is 10,000 per FindSource.cs:26.
/// Source: EXT-070-077, BHV-451, BHV-T013, VAL-006, VAL-009
/// </summary>
internal sealed class SourceLanguageSearchService
{
    // Trailing notation pattern: matches ":N" at the end of a string where N is one or more digits.
    // Examples: "logos:2" -> "logos", "agape:1" -> "agape". Non-numeric suffixes like "a:b:c" stay.
    private static readonly Regex s_trailingNotation = new(@":\d+$", RegexOptions.Compiled);

    private readonly SourceLanguageData _data;
    private readonly MarbleDataAccessService _marbleData;

    public SourceLanguageSearchService(SourceLanguageData data, MarbleDataAccessService marbleData)
    {
        _data = data ?? throw new ArgumentNullException(nameof(data));
        _marbleData = marbleData ?? throw new ArgumentNullException(nameof(marbleData));
    }

    /// <summary>
    /// Executes the full source language search pipeline.
    /// Strips trailing base/meaning index notation. Matches lemmas against loaded lexicon.
    /// Finds occurrences across specified book range. Reports exceedsLimit when results
    /// exceed ShowInContextLimit (VAL-009). Special characters must not cause regex hang
    /// (BHV-T013).
    /// </summary>
    /// <exception cref="InvalidOperationException">
    /// INVALID_ARGUMENT when search text is empty.
    /// FAILED_PRECONDITION when no marble data is installed.
    /// </exception>
    public Task<SourceLanguageSearchResult> ExecuteSearchAsync(
        SourceLanguageSearchInput input,
        CancellationToken ct
    )
    {
        ct.ThrowIfCancellationRequested();

        // VAL-006: empty text is an input error.
        if (string.IsNullOrWhiteSpace(input.SearchText))
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.InvalidArgument,
                "Search text must not be empty"
            );
        }

        // Readiness check now routes through the injected MarbleDataAccessService -
        // there is no per-service haveMarbleData flag.
        if (!_marbleData.HaveMarbleData)
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.FailedPrecondition,
                "No Enhanced Resource data installed"
            );
        }

        var strippedText = StripTrailingNotation(input.SearchText);
        var matchedEntries = FindMatchingEntries(strippedText);

        if (matchedEntries.Count == 0)
            return Task.FromResult(NoMatchingLemmaResult());

        var results = new List<LemmaSearchResult>();
        foreach (var entry in matchedEntries)
        {
            var filteredOccurrences = FilterByBookRange(entry.Occurrences, input.BookRange);
            if (filteredOccurrences.Count > 0)
            {
                results.Add(
                    new LemmaSearchResult(
                        Lemma: entry.Lemma,
                        Translit: entry.Translit,
                        StrongNumber: entry.StrongNumber,
                        OccurrenceCount: filteredOccurrences.Count,
                        Occurrences: filteredOccurrences,
                        Gloss: entry.Gloss,
                        PartOfSpeech: entry.PartOfSpeech
                    )
                );
            }
        }

        if (results.Count == 0)
            return Task.FromResult(NoMatchingLemmaResult());

        var totalOccurrences = results.Sum(r => r.OccurrenceCount);
        var exceedsLimit = totalOccurrences > input.ShowInContextLimit;

        return Task.FromResult(
            new SourceLanguageSearchResult(
                Results: results,
                TotalOccurrences: totalOccurrences,
                ExceedsLimit: exceedsLimit,
                ErrorMessage: null
            )
        );
    }

    private static string StripTrailingNotation(string searchText) =>
        s_trailingNotation.Replace(searchText, string.Empty);

    private List<LexiconEntry> FindMatchingEntries(string searchText)
    {
        return _data.ByLemma.TryGetValue(searchText, out var entries) ? [.. entries] : [];
    }

    private static IList<VerseRef> FilterByBookRange(
        IList<VerseRef> occurrences,
        BookRange? bookRange
    ) =>
        bookRange == null
            ? occurrences
            : occurrences
                .Where(vr => vr.BookNum >= bookRange.Start && vr.BookNum <= bookRange.End)
                .ToList();

    private static SourceLanguageSearchResult NoMatchingLemmaResult() =>
        new(
            Results: new List<LemmaSearchResult>(),
            TotalOccurrences: 0,
            ExceedsLimit: false,
            ErrorMessage: "No matching lemma"
        );
}
