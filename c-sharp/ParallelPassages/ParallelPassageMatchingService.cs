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
        if (verse1Words.Count == 0)
            return [];

        // Build a set of words in verse2 for quick lookup (case-insensitive)
        var verse2Set = new HashSet<string>(verse2Words.Select(w => w.ToLowerInvariant()));

        // Find consecutive runs of matching words
        var matched = new bool[verse1Words.Count];

        // Pass 1: Find all positions where verse1 word exists in verse2 (case-insensitive)
        var wordInVerse2 = new bool[verse1Words.Count];
        for (int i = 0; i < verse1Words.Count; i++)
            wordInVerse2[i] = verse2Set.Contains(verse1Words[i].ToLowerInvariant());

        // Pass 2: Mark consecutive runs of numberOfWordsToMatch or more
        int runStart = -1;
        int runLength = 0;
        for (int i = 0; i <= verse1Words.Count; i++)
        {
            if (i < verse1Words.Count && wordInVerse2[i])
            {
                if (runStart < 0)
                    runStart = i;
                runLength++;
            }
            else
            {
                if (runLength >= numberOfWordsToMatch)
                {
                    for (int j = runStart; j < runStart + runLength; j++)
                        matched[j] = true;
                }
                runStart = -1;
                runLength = 0;
            }
        }

        // Pass 3: Sentence boundary exception - single word after period can match
        for (int i = 0; i < verse1Words.Count; i++)
        {
            if (matched[i] || !wordInVerse2[i])
                continue;

            // Check if this word is at a sentence boundary (previous word ends with '.')
            if (i > 0 && verse1Words[i - 1].EndsWith('.'))
                matched[i] = true;
            // Also check if it's the last word and ends with punctuation (sentence-final)
            else if (i == verse1Words.Count - 1 && verse1Words[i].EndsWith('.'))
            {
                // Check if corresponding word in verse2 is also at sentence boundary
                if (
                    verse2Words.Any(w =>
                        w.StartsWith(
                            verse1Words[i].TrimEnd('.'),
                            StringComparison.OrdinalIgnoreCase
                        )
                    )
                )
                    matched[i] = true;
            }
        }

        var result = new List<HighlightedWord>();
        for (int i = 0; i < verse1Words.Count; i++)
        {
            result.Add(
                new HighlightedWord(
                    verse1Words[i],
                    matched[i] ? DegreeOfParallelism.CalculatedMatch : DegreeOfParallelism.None
                )
            );
        }

        return result;
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
        var result = new List<HighlightedWord>();
        foreach (var word in words)
        {
            var degree = expertAnnotations.TryGetValue(word, out var d)
                ? d
                : DegreeOfParallelism.None;
            result.Add(new HighlightedWord(word, degree));
        }
        return result;
    }
}
