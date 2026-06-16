// === NEW IN PT10 ===
// Reason: Per-dictionary slice of DictionaryData.
namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Data extracted from a single marble dictionary package (SDBG, SDBH, or DCLEX).
/// </summary>
internal sealed record DictionaryPerPackage(
    IReadOnlyDictionary<string, DictionaryEntryRecord> EntriesById,
    IReadOnlyDictionary<
        string,
        (IReadOnlyList<string> Glosses, IReadOnlyList<string> Domains)
    > Lexicon
);
