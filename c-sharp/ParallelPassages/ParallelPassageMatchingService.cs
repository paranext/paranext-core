namespace Paranext.DataProvider.ParallelPassages;

/// <summary>
/// A word with its degree of parallelism for display highlighting.
/// </summary>
public record HighlightedWord(string Text, DegreeOfParallelism Degree, string? Gloss = null);

/// <summary>
/// Calculates word-level parallelism between verse texts.
/// EXT-006: Multi-pass algorithm for consecutive word matching with sentence boundary exceptions.
/// </summary>
public class ParallelPassageMatchingService
{
    /// <summary>
    /// Calculates parallelism between two word lists using consecutive matching.
    /// Case-insensitive. Minimum consecutive words controlled by numberOfWordsToMatch.
    /// Single words at sentence boundaries (after period) can match.
    /// </summary>
    public List<HighlightedWord> CalculateParallelism(
        List<string> verse1Words,
        List<string> verse2Words,
        int numberOfWordsToMatch = 2
    )
    {
        // TODO: MP-3 implementation (CAP-006)
        throw new NotImplementedException("CAP-006: CalculateParallelism not yet implemented");
    }

    /// <summary>
    /// Applies expert annotations from GRKP/HEBP resources.
    /// Words are marked with ExpertClose or ExpertExact degree from annotations.
    /// </summary>
    public List<HighlightedWord> CalculateParallelismWithExpertAnnotations(
        List<string> words,
        Dictionary<string, DegreeOfParallelism> expertAnnotations
    )
    {
        // TODO: MP-3 implementation (CAP-006)
        throw new NotImplementedException(
            "CAP-006: CalculateParallelismWithExpertAnnotations not yet implemented"
        );
    }
}
