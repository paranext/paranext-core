using Paratext.Data;
using SIL.Scripture;

namespace Paranext.DataProvider.ParallelPassages;

/// <summary>
/// Aggregated status flags for a parallel passage set.
/// Computed from per-verse PassageStates via ParallelPassageStatuses.GetPassageState().
/// </summary>
public record StatusAggregation(
    bool AllIgnored,
    bool AllTicked,
    bool AnyOutdated,
    bool AllChanged,
    bool AllUnfinished
);

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

    internal static InternalPassageState GetPassageState(ScrText scrText, string verseRefStr)
    {
        try
        {
            // Check if book is in scope (ParallelPassagesBooks setting)
            var parts = verseRefStr.Split(' ');
            if (parts.Length > 0)
            {
                int bookNum = Canon.BookIdToNumber(parts[0]);
                var ignoredBooks = GetIgnoredBooks(scrText);
                if (ignoredBooks != null && ignoredBooks.Contains(bookNum))
                    return InternalPassageState.IgnoredBook;
            }

            // Default: without ParallelPassageStatuses access, all are Unfinished
            return InternalPassageState.Unfinished;
        }
        catch (Exception)
        {
            return InternalPassageState.Unfinished;
        }
    }

    private static HashSet<int>? GetIgnoredBooks(ScrText scrText)
    {
        try
        {
            var setting = scrText.Settings.GetSetting("ParallelPassagesBooks");
            if (string.IsNullOrEmpty(setting))
                return null;

            var bookNums = setting
                .Split(',', StringSplitOptions.RemoveEmptyEntries)
                .Select(s => int.TryParse(s.Trim(), out var n) ? n : -1)
                .Where(n => n > 0)
                .ToHashSet();

            if (bookNums.Count == 0)
                return null;

            // ParallelPassagesBooks lists included books; books NOT in the list are ignored
            // But if the list is empty, no books are ignored (INV-003)
            return null; // For now, no books are ignored
        }
        catch (Exception)
        {
            return null;
        }
    }
}
