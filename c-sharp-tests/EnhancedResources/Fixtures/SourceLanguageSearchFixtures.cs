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
    /// Builds a SourceLanguageData record with proper dual indexing:
    /// ByLemma keyed by native script (e.g. "λόγος"), ByTranslit keyed by
    /// Latin transliteration (e.g. "logos"). The same LexiconEntry instances
    /// appear in both indexes.
    /// <para>
    /// Production currently populates only ByLemma (NFD-normalized) via
    /// MarbleLexiconLoader; ByTranslit is empty until PT9's GreekTrans /
    /// HebrewTrans utilities (PT9 modTransliteration, consumed at
    /// MarbleDataAccess.cs:1459-1479) are ported. These fixtures still
    /// populate both so SourceLanguageSearchService can be unit-tested in
    /// isolation against the full ByLemma-or-ByTranslit selection logic.
    /// </para>
    /// Entries:
    /// "λόγος" / "logos" - Greek word appearing in multiple NT books.
    /// "ἀγάπη" / "agape" - Greek word for love.
    /// </summary>
    internal static SourceLanguageData BuildSourceLanguageData() =>
        new(ByLemma: BuildIndexBy(e => e.Lemma), ByTranslit: BuildIndexBy(e => e.Translit));

    private static IReadOnlyDictionary<string, IReadOnlyList<LexiconEntry>> BuildIndexBy(
        Func<LexiconEntry, string> keySelector
    )
    {
        var dict = new Dictionary<string, List<LexiconEntry>>(StringComparer.OrdinalIgnoreCase);
        foreach (var entry in DefaultEntries())
        {
            var key = keySelector(entry);
            if (!dict.TryGetValue(key, out var bucket))
            {
                bucket = [];
                dict[key] = bucket;
            }
            bucket.Add(entry);
        }
        return dict.ToDictionary(
            kv => kv.Key,
            kv => (IReadOnlyList<LexiconEntry>)kv.Value.AsReadOnly(),
            StringComparer.OrdinalIgnoreCase
        );
    }

    private static IEnumerable<LexiconEntry> DefaultEntries()
    {
        yield return new LexiconEntry(
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
        );
        yield return new LexiconEntry(
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
        );
    }
}
