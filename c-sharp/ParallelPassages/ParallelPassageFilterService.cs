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

    /// <summary>
    /// Filters a single passage by type. For "All": NTtoOT always accepted;
    /// OTtoOT/NTtoNT only if no related NTtoOT exists (dedup).
    /// For "Gospels": NTtoNT AND all verses in Matt(40)/Mark(41)/Luke(42).
    /// Other filters match by PassageType directly.
    /// EXT-005: Passage Type Filtering.
    /// </summary>
    public bool AcceptPassage(
        ParallelPassageEntry passage,
        ParallelPassageFilter filter,
        ParallelPassageAccessor accessor
    )
    {
        return filter switch
        {
            ParallelPassageFilter.All => AcceptPassageAll(passage, accessor),
            ParallelPassageFilter.NTtoNT => passage.PassageType == ParallelPassageType.NTtoNT,
            ParallelPassageFilter.NTtoOT => passage.PassageType == ParallelPassageType.NTtoOT,
            ParallelPassageFilter.OTtoOT => passage.PassageType == ParallelPassageType.OTtoOT,
            ParallelPassageFilter.Gospels => AcceptPassageGospels(passage),
            _ => true,
        };
    }

    private static bool AcceptPassageAll(
        ParallelPassageEntry passage,
        ParallelPassageAccessor accessor
    )
    {
        // NTtoOT always accepted
        if (passage.PassageType == ParallelPassageType.NTtoOT)
            return true;

        // OTtoOT/NTtoNT: reject if a related NTtoOT exists (dedup)
        if (
            passage.PassageType == ParallelPassageType.OTtoOT
            || passage.PassageType == ParallelPassageType.NTtoNT
        )
        {
            var relatedNtToOt = accessor.FindRelatedPassage(passage, ParallelPassageType.NTtoOT);
            return relatedNtToOt == null;
        }

        return true;
    }

    private static bool AcceptPassageGospels(ParallelPassageEntry passage)
    {
        // Must be NTtoNT
        if (passage.PassageType != ParallelPassageType.NTtoNT)
            return false;

        // All verses must be in Matt(40), Mark(41), Luke(42)
        return passage.Verses.All(v =>
        {
            int bookNum = ParallelPassageAccessor.ParseBookNumber(v);
            return bookNum >= 40 && bookNum <= 42;
        });
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
