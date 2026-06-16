using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

// Data-shape record for source language search. Production declares the shape so
// SourceLanguageSearchService can consume strongly typed lexicon entries. Populated
// lexicon data lives in c-sharp-tests/EnhancedResources/Fixtures/SourceLanguageSearchFixtures.cs
// per N3 policy (patterns.csharp.testScaffoldingLocation).
//
// Translit is the empty string until PT9's GreekTrans / HebrewTrans utilities
// (PT9 modTransliteration; consumed at MarbleDataAccess.cs:1459-1479) are
// ported. Until then, UseTransliteration=true searches resolve via the empty
// SourceLanguageData.ByTranslit index and return zero matches.
internal record LexiconEntry(
    string Lemma,
    string Translit,
    string StrongNumber,
    string Gloss,
    string PartOfSpeech,
    IList<VerseRef> Occurrences
);
