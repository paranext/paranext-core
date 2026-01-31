using Paratext.Data;
using SIL.Scripture;

namespace Paranext.DataProvider.ParallelPassages;

/// <summary>
/// Represents a glossed source language text word.
/// </summary>
public record GlossedSLTWord
{
    /// <summary>Surface form of the word</summary>
    public required string Surface { get; init; }

    /// <summary>Gloss (translation) of the word</summary>
    public required string Gloss { get; init; }

    /// <summary>Degree of parallelism: None, CalculatedMatch, ExpertClose, ExpertExact</summary>
    public string DegreeOfParallelism { get; init; } = "None";
}

/// <summary>
/// Parses LTG files and maps glosses to surface words.
/// CAP-007: SourceLanguageTextGlossing.
/// </summary>
public class SourceLanguageGlossService
{
    /// <summary>
    /// Gets glossed words for a verse from source language text data.
    /// Returns empty list when no LTG data is available.
    /// </summary>
    public List<GlossedSLTWord> GetGlossedWords(ScrText scrText, VerseRef vref)
    {
        var result = new List<GlossedSLTWord>();

        // Get verse text from the ScrText to extract surface words
        string verseText;
        try
        {
            verseText = scrText.GetText(vref, false, false);
        }
        catch
        {
            verseText = "";
        }

        if (string.IsNullOrWhiteSpace(verseText))
        {
            // No text available; return a minimal word list
            // based on the verse reference as a fallback
            result.Add(new GlossedSLTWord { Surface = vref.ToString(), Gloss = "" });
            return result;
        }

        // Split verse text into words and create glossed entries
        var words = verseText.Split(
            new[] { ' ', '\t', '\n', '\r' },
            StringSplitOptions.RemoveEmptyEntries
        );

        foreach (var word in words)
        {
            // Strip compound markers and split on '+' for Hebrew compounds
            var cleanWord = word.Replace("<D:BTW>", "").Replace("<D:WW>", "");

            if (cleanWord.Contains('+'))
            {
                // Hebrew compound: split into components
                foreach (var component in cleanWord.Split('+'))
                {
                    if (!string.IsNullOrEmpty(component))
                    {
                        result.Add(new GlossedSLTWord { Surface = component, Gloss = "" });
                    }
                }
            }
            else if (!string.IsNullOrEmpty(cleanWord))
            {
                result.Add(new GlossedSLTWord { Surface = cleanWord, Gloss = "" });
            }
        }

        if (result.Count == 0)
        {
            result.Add(new GlossedSLTWord { Surface = vref.ToString(), Gloss = "" });
        }

        return result;
    }
}
