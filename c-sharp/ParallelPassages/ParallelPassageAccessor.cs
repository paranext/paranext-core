namespace Paranext.DataProvider.ParallelPassages;

/// <summary>
/// Types representing parallel passage data loaded from ParallelPassages.xml.
/// </summary>
public enum ParallelPassageType
{
    NTtoOT,
    OTtoOT,
    NTtoNT,
}

/// <summary>
/// Represents a single parallel passage entry with head reference and parallel verses.
/// Created by loading and processing ParallelPassages.xml.
/// </summary>
public record ParallelPassageEntry
{
    /// <summary>Head verse reference string (e.g., "MAT 4:1")</summary>
    public required string HeadReference { get; init; }

    /// <summary>All verse references in this passage set</summary>
    public required List<string> Verses { get; init; }

    /// <summary>The type of parallel passage</summary>
    public required ParallelPassageType PassageType { get; init; }

    /// <summary>Unique key for deduplication</summary>
    public string Key => $"{HeadReference}|{string.Join(";", Verses)}";
}

/// <summary>
/// Loads and caches parallel passage data from ParallelPassages.xml.
/// Stub for TDD RED phase - implementation pending.
/// </summary>
public class ParallelPassageAccessor
{
    /// <summary>
    /// Loads all parallel passages, creating symmetrical pairs, deduplicating, and sorting.
    /// Caches the result using Lazy&lt;T&gt; for thread safety.
    /// </summary>
    public List<ParallelPassageEntry> GetAllPassages()
    {
        throw new NotImplementedException("CAP-010: Implementation pending");
    }
}
