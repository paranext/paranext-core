using Paratext.Data;

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
        // TODO: MP-3 implementation (CAP-009)
        throw new NotImplementedException("CAP-009: FilterPassages not yet implemented");
    }
}
