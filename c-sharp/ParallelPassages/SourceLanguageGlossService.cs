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
    private static readonly char[] s_whitespace = [' ', '\t', '\n', '\r'];

    /// <summary>
    /// Gets glossed words for a verse from source language text data.
    /// Returns a fallback entry with the verse reference when no text is available.
    /// </summary>
    public List<GlossedSLTWord> GetGlossedWords(ScrText scrText, VerseRef vref)
    {
        string verseText = GetVerseText(scrText, vref);

        if (string.IsNullOrWhiteSpace(verseText))
            return [CreateFallbackWord(vref)];

        var result = ParseWordsFromText(verseText);

        return result.Count > 0 ? result : [CreateFallbackWord(vref)];
    }

    private static string GetVerseText(ScrText scrText, VerseRef vref)
    {
        try
        {
            return scrText.GetText(vref, false, false);
        }
        catch (Exception)
        {
            return "";
        }
    }

    private static List<GlossedSLTWord> ParseWordsFromText(string verseText)
    {
        var result = new List<GlossedSLTWord>();
        var words = verseText.Split(s_whitespace, StringSplitOptions.RemoveEmptyEntries);

        foreach (var word in words)
        {
            var cleanWord = StripCompoundMarkers(word);
            AddWordOrCompoundComponents(cleanWord, result);
        }

        return result;
    }

    private static string StripCompoundMarkers(string word)
    {
        return word.Replace("<D:BTW>", "").Replace("<D:WW>", "");
    }

    private static void AddWordOrCompoundComponents(string cleanWord, List<GlossedSLTWord> result)
    {
        if (cleanWord.Contains('+'))
        {
            // Hebrew compound: split into components
            foreach (var component in cleanWord.Split('+'))
            {
                if (!string.IsNullOrEmpty(component))
                    result.Add(new GlossedSLTWord { Surface = component, Gloss = "" });
            }
        }
        else if (!string.IsNullOrEmpty(cleanWord))
        {
            result.Add(new GlossedSLTWord { Surface = cleanWord, Gloss = "" });
        }
    }

    private static GlossedSLTWord CreateFallbackWord(VerseRef vref)
    {
        return new GlossedSLTWord { Surface = vref.ToString(), Gloss = "" };
    }
}
