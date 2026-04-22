using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

// Data-shape record for source language search. Production declares the shape so
// SourceLanguageSearchService can consume strongly typed lexicon entries. Populated
// lexicon data lives in c-sharp-tests/EnhancedResources/Fixtures/SourceLanguageSearchFixtures.cs
// per N3 policy (patterns.csharp.testScaffoldingLocation).
internal record LexiconEntry(
    string Lemma,
    string Translit,
    string StrongNumber,
    string Gloss,
    string PartOfSpeech,
    IList<VerseRef> Occurrences
);
