namespace Paranext.DataProvider.EnhancedResources;

// Data-shape record for CAP-008 entry registry. Production declares the shape so
// DictionaryService.GetDictionaryEntry can consume strongly typed entries.
// Populated data lives in c-sharp-tests/EnhancedResources/Fixtures/DictionaryFixtures.cs
// per N3 policy (patterns.csharp.testScaffoldingLocation).
internal record DictionaryEntryRecord(
    string Lemma,
    List<SenseRecord> Senses,
    IList<string> SemanticDomains,
    string Morphology,
    List<string> SubItemIds
);

internal record SenseRecord(string SenseId, List<GlossEntry> Glosses, string Definition)
{
    public int OccurrenceCount { get; init; } = 0;
}
