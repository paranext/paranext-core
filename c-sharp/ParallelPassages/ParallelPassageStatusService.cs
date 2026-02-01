using System.Collections.Concurrent;
using Paratext.Data;

namespace Paranext.DataProvider.ParallelPassages;

/// <summary>
/// Service that aggregates per-verse passage states into boolean summary flags.
/// EXT-001: Passage Status Aggregation.
/// </summary>
public class ParallelPassageStatusService
{
    /// <summary>
    /// Computes aggregated status for a passage set by querying ParallelPassageStatuses.GetPassageState()
    /// for each verse and combining the results into boolean flags.
    /// </summary>
    public StatusAggregation GetAggregatedStatus(ScrText scrText, ParallelPassageEntry passage)
    {
        // Query per-verse states and aggregate into boolean flags
        bool allIgnored = true;
        bool allTicked = true;
        bool anyOutdated = false;
        bool allChanged = true;
        bool allUnfinished = true;

        foreach (var verseRef in passage.Verses)
        {
            var state = GetPassageState(scrText, verseRef);

            if (state != InternalPassageState.IgnoredBook)
                allIgnored = false;
            if (state != InternalPassageState.Finished)
                allTicked = false;
            if (state == InternalPassageState.Outdated)
                anyOutdated = true;
            if (state != InternalPassageState.Outdated)
                allChanged = false;
            if (state != InternalPassageState.Unfinished)
                allUnfinished = false;
        }

        return new StatusAggregation(allIgnored, allTicked, anyOutdated, allChanged, allUnfinished);
    }

    /// <summary>
    /// Passage state enum matching ParatextData PassageStates.
    /// Used when ParallelPassageStatuses constructor is internal.
    /// </summary>
    internal enum InternalPassageState
    {
        Unfinished,
        Finished,
        Outdated,
        MissingText,
        IgnoredBook,
    }

    // In-memory state overrides until ParallelPassageStatuses is accessible.
    // Key: "{projectGuid}|{verseRef}"
    private static readonly ConcurrentDictionary<string, InternalPassageState> s_stateOverrides =
        new();

    internal static InternalPassageState GetPassageState(ScrText scrText, string verseRefStr)
    {
        try
        {
            int bookNum = ParallelPassageAccessor.ParseBookNumber(verseRefStr);
            var ignoredBooks = GetIgnoredBooks(scrText);
            if (ignoredBooks != null && ignoredBooks.Contains(bookNum))
                return InternalPassageState.IgnoredBook;

            // Check in-memory overrides
            string key = $"{scrText.Guid}|{verseRefStr}";
            if (s_stateOverrides.TryGetValue(key, out var overrideState))
                return overrideState;

            // Default: without ParallelPassageStatuses access, all are Unfinished
            return InternalPassageState.Unfinished;
        }
        catch (Exception)
        {
            return InternalPassageState.Unfinished;
        }
    }

    internal static void SetPassageState(
        ScrText scrText,
        string verseRefStr,
        InternalPassageState state
    )
    {
        string key = $"{scrText.Guid}|{verseRefStr}";
        s_stateOverrides[key] = state;
    }

    /// <summary>
    /// Returns set of ignored book numbers, or null if no books are ignored.
    /// ParallelPassagesBooks setting lists included books; absent books are ignored.
    /// Currently returns null (no books ignored) per INV-003.
    /// </summary>
    private static HashSet<int>? GetIgnoredBooks(ScrText scrText)
    {
        // ParallelPassageStatuses constructor is internal to ParatextData.
        // Until we can instantiate it, no books are ignored (INV-003).
        return null;
    }
}
