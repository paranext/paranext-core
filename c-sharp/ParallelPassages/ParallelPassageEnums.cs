namespace Paranext.DataProvider.ParallelPassages;

/// <summary>
/// Status-based filter for passage list display.
/// </summary>
public enum PassageFilterType
{
    All,
    Unchecked,
    ChangedText,
    MissingText,
}

/// <summary>
/// Degree of word-level parallelism between verses.
/// </summary>
public enum DegreeOfParallelism
{
    None,
    CalculatedMatch,
    ExpertClose,
    ExpertExact,
}
