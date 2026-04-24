using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;
using SIL.Scripture;

namespace TestParanextDataProvider.EnhancedResources.Fixtures;

/// <summary>
/// Fixtures for SourceLanguageSearchService tests. Exposes a single builder that
/// returns a SourceLanguageData record; tests construct the service directly.
/// N3 policy (patterns.csharp.testScaffoldingLocation): fixture data lives in
/// c-sharp-tests, services receive it via constructor injection.
/// </summary>
[ExcludeFromCodeCoverage]
internal static class SourceLanguageSearchFixtures
{
    /// <summary>
    /// Builds a SourceLanguageData record keyed by Latin transliteration:
    /// "logos" - Greek word appearing in multiple NT books.
    /// "agape" - Greek word for love.
    /// </summary>
    internal static SourceLanguageData BuildSourceLanguageData()
    {
        var byLemma = new Dictionary<string, IReadOnlyList<LexiconEntry>>(
            StringComparer.OrdinalIgnoreCase
        )
        {
            ["logos"] = new List<LexiconEntry>
            {
                new LexiconEntry(
                    Lemma: "λόγος",
                    Translit: "logos",
                    StrongNumber: "G3056",
                    Gloss: "word, message, reason",
                    PartOfSpeech: "Noun",
                    Occurrences:
                    [
                        new VerseRef(43, 1, 1), // John 1:1
                        new VerseRef(43, 1, 14), // John 1:14
                        new VerseRef(66, 19, 13), // Revelation 19:13
                        new VerseRef(40, 13, 19), // Matthew 13:19
                        new VerseRef(41, 4, 14), // Mark 4:14
                        new VerseRef(42, 8, 11), // Luke 8:11
                        new VerseRef(44, 6, 4), // Acts 6:4
                    ]
                ),
            },
            ["agape"] = new List<LexiconEntry>
            {
                new LexiconEntry(
                    Lemma: "ἀγάπη",
                    Translit: "agape",
                    StrongNumber: "G0026",
                    Gloss: "love",
                    PartOfSpeech: "Noun",
                    Occurrences:
                    [
                        new VerseRef(46, 13, 1),
                        new VerseRef(46, 13, 13),
                        new VerseRef(48, 5, 22),
                        new VerseRef(62, 4, 8),
                    ]
                ),
            },
        };

        return new SourceLanguageData(byLemma);
    }
}
