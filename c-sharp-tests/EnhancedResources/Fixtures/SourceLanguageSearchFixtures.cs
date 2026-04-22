using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;
using SIL.Scripture;

namespace TestParanextDataProvider.EnhancedResources.Fixtures;

/// <summary>
/// Test fixtures for SourceLanguageSearchService. Provides the built-in "logos" and
/// "agape" lexicon entries previously embedded in SourceLanguageSearchService.cs.
/// N3 policy (patterns.csharp.testScaffoldingLocation).
/// </summary>
[ExcludeFromCodeCoverage]
internal static class SourceLanguageSearchFixtures
{
    /// <summary>
    /// Builds a fresh case-insensitive lexicon keyed by Latin transliteration.
    /// "logos" - Greek word appearing in multiple NT books.
    /// "agape" - Greek word for love.
    /// </summary>
    internal static Dictionary<string, List<LexiconEntry>> BuildDefaultLexicon()
    {
        var lexicon = new Dictionary<string, List<LexiconEntry>>(StringComparer.OrdinalIgnoreCase);

        lexicon["logos"] =
        [
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
        ];

        lexicon["agape"] =
        [
            new LexiconEntry(
                Lemma: "ἀγάπη",
                Translit: "agape",
                StrongNumber: "G0026",
                Gloss: "love",
                PartOfSpeech: "Noun",
                Occurrences:
                [
                    new VerseRef(46, 13, 1), // 1 Corinthians 13:1
                    new VerseRef(46, 13, 13), // 1 Corinthians 13:13
                    new VerseRef(48, 5, 22), // Galatians 5:22
                    new VerseRef(62, 4, 8), // 1 John 4:8
                ]
            ),
        ];

        return lexicon;
    }

    /// <summary>Applies default lexicon + marble-data flag to SourceLanguageSearchService.</summary>
    internal static void ApplyDefaults()
    {
        SourceLanguageSearchService.LexiconOverride = BuildDefaultLexicon();
        SourceLanguageSearchService.SetHaveMarbleData(true);
    }

    /// <summary>Clears the SourceLanguageSearchService overrides and resets the flag.</summary>
    internal static void Clear()
    {
        SourceLanguageSearchService.LexiconOverride = null;
        SourceLanguageSearchService.SetHaveMarbleData(true);
    }
}
