// === NEW IN PT10 ===
// Reason: Immutable data bundle delivered by MarbleDataLoader.
using Paratext.Data;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>Root of the loaded marble data. Populated by MarbleDataLoader.</summary>
internal sealed record MarbleData(
    IReadOnlyList<ResourceScrText> BiblePackages,
    IReadOnlyList<ResourceScrText> ResearchPackages,
    GlossData GlossData,
    LanguageMapping LanguageMapping,
    DictionaryData DictionaryData,
    EncyclopediaData EncyclopediaData,
    MediaData MediaData,
    SourceLanguageData SourceLanguageData
);
