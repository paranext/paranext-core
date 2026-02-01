using Paratext.Data;
using static Paranext.DataProvider.ParallelPassages.ParallelPassageStatusService;

namespace Paranext.DataProvider.ParallelPassages;

/// <summary>
/// Filters parallel passages by status (All, Unchecked, ChangedText, MissingText)
/// and enforces the implicit 2+ book filter (INV-009).
/// EXT-009: Status-Based Passage Filtering.
/// </summary>
public class ParallelPassageFilterService
{
    /// <summary>
    /// Filters passages by the given status filter type.
    /// Always applies the implicit 2+ project book filter (INV-009).
    /// Status filters check HEAD reference only (INV-010).
    /// </summary>
    public List<ParallelPassageEntry> FilterPassages(
        List<ParallelPassageEntry> allPassages,
        PassageFilterType filterType,
        ScrText scrText
    )
    {
        var result = new List<ParallelPassageEntry>();

        foreach (var passage in allPassages)
        {
            // INV-009: Must have 2+ references in project books
            if (passage.Verses.Count < 2)
                continue;

            // INV-010: Status filters check HEAD reference only
            if (filterType != PassageFilterType.All)
            {
                var headState = GetHeadState(scrText, passage);
                bool accepted = filterType switch
                {
                    PassageFilterType.Unchecked => headState == InternalPassageState.Unfinished
                        || headState == InternalPassageState.Outdated,
                    PassageFilterType.ChangedText => headState == InternalPassageState.Outdated,
                    PassageFilterType.MissingText => headState == InternalPassageState.MissingText,
                    _ => true,
                };
                if (!accepted)
                    continue;
            }

            result.Add(passage);
        }

        return result;
    }

    private static InternalPassageState GetHeadState(ScrText scrText, ParallelPassageEntry passage)
    {
        try
        {
            int bookNum = ParallelPassageAccessor.ParseBookNumber(passage.HeadReference);
            var bookList = scrText.Settings.BooksPresentSet;
            if (bookList != null && !bookList.IsSelected(bookNum))
                return InternalPassageState.IgnoredBook;

            return InternalPassageState.Unfinished;
        }
        catch (Exception)
        {
            return InternalPassageState.Unfinished;
        }
    }
}
