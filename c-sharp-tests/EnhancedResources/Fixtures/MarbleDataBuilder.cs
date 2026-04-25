using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;
using Paratext.Data;

namespace TestParanextDataProvider.EnhancedResources.Fixtures;

/// <summary>
/// Composes an end-to-end MarbleData record from per-domain fixtures. Test-assembly-only
/// helper - spec Section 15 "One-time test helper".
///
/// Defaults to every sub-record being the domain's .Empty singleton. Call With* to
/// replace slices as needed.
/// </summary>
[ExcludeFromCodeCoverage]
internal sealed class MarbleDataBuilder
{
    private IReadOnlyList<ResourceScrText> _biblePackages = [];
    private IReadOnlyList<ResourceScrText> _researchPackages = [];
    private GlossData _gloss = GlossData.Empty;
    private LanguageMapping _languageMapping = LanguageMapping.Empty;
    private DictionaryData _dictionary = DictionaryData.Empty;
    private EncyclopediaData _encyclopedia = EncyclopediaData.Empty;
    private MediaData _media = MediaData.Empty;
    private SourceLanguageData _sourceLanguage = SourceLanguageData.Empty;
    private IReadOnlyList<string> _missingRequiredPackages = [];
    private IReadOnlyDictionary<string, IMarblePackage> _biblePackagesByName = new Dictionary<
        string,
        IMarblePackage
    >(StringComparer.OrdinalIgnoreCase);

    public MarbleDataBuilder WithBiblePackages(IReadOnlyList<ResourceScrText> bibles)
    {
        _biblePackages = bibles;
        return this;
    }

    public MarbleDataBuilder WithResearchPackages(IReadOnlyList<ResourceScrText> research)
    {
        _researchPackages = research;
        return this;
    }

    public MarbleDataBuilder WithGlossData(GlossData gloss)
    {
        _gloss = gloss;
        return this;
    }

    public MarbleDataBuilder WithLanguageMapping(LanguageMapping mapping)
    {
        _languageMapping = mapping;
        return this;
    }

    public MarbleDataBuilder WithDictionary(DictionaryData dictionary)
    {
        _dictionary = dictionary;
        return this;
    }

    public MarbleDataBuilder WithEncyclopedia(EncyclopediaData encyclopedia)
    {
        _encyclopedia = encyclopedia;
        return this;
    }

    public MarbleDataBuilder WithMedia(MediaData media)
    {
        _media = media;
        return this;
    }

    public MarbleDataBuilder WithSourceLanguage(SourceLanguageData sourceLanguage)
    {
        _sourceLanguage = sourceLanguage;
        return this;
    }

    public MarbleDataBuilder WithMissingRequiredPackages(IReadOnlyList<string> packages)
    {
        _missingRequiredPackages = packages;
        return this;
    }

    public MarbleDataBuilder WithBiblePackagesByName(
        IReadOnlyDictionary<string, IMarblePackage> bibles
    )
    {
        _biblePackagesByName = bibles;
        return this;
    }

    public MarbleData Build() =>
        new(
            BiblePackages: _biblePackages,
            ResearchPackages: _researchPackages,
            GlossData: _gloss,
            LanguageMapping: _languageMapping,
            DictionaryData: _dictionary,
            EncyclopediaData: _encyclopedia,
            MediaData: _media,
            SourceLanguageData: _sourceLanguage,
            MissingRequiredPackages: _missingRequiredPackages,
            BiblePackagesByName: _biblePackagesByName
        );
}
