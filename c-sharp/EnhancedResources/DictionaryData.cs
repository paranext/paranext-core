// === NEW IN PT10 ===
// Reason: Backing record for DictionaryService. Keeps SDBG/SDBH/DCLEX data separate
// because DCLEX may overlap with both (apocrypha spans Greek and Hebrew).
namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// ByDictionary keyed by ShortName ("SDBG" / "SDBH" / "DCLEX") -> per-package data.
/// KnownResourceIds: set of marble bible resource IDs that expose this dictionary.
/// UninitializedResourceIds: resource IDs known to exist but whose lexicon failed
/// to load.
/// </summary>
internal sealed record DictionaryData(
    IReadOnlyDictionary<string, DictionaryPerPackage> ByDictionary,
    IReadOnlySet<string> KnownResourceIds,
    IReadOnlySet<string> UninitializedResourceIds
)
{
    public static DictionaryData Empty { get; } =
        new(
            new Dictionary<string, DictionaryPerPackage>(),
            new HashSet<string>(StringComparer.OrdinalIgnoreCase),
            new HashSet<string>(StringComparer.OrdinalIgnoreCase)
        );
}
