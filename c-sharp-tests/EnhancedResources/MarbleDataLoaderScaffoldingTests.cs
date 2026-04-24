using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

[TestFixture]
[ExcludeFromCodeCoverage]
internal class MarbleDataLoaderScaffoldingTests
{
    [Test]
    public async Task LoadAsync_Stub_ReturnsNull()
    {
        var loader = new MarbleDataLoader();
        var result = await loader.LoadAsync();
        Assert.That(result, Is.Null);
    }

    [Test]
    public void EmptyRecords_AreReusableSingletons()
    {
        // Hoist one reference per record so NUnit2009 can see distinct expressions
        // on each side of Is.SameAs; the intent is still "two reads yield the same
        // instance" (cached singleton, not a fresh allocation per access).
        var dictionaryEmpty = DictionaryData.Empty;
        var encyclopediaEmpty = EncyclopediaData.Empty;
        var mediaEmpty = MediaData.Empty;
        var sourceLanguageEmpty = SourceLanguageData.Empty;
        var glossEmpty = GlossData.Empty;
        var languageMappingEmpty = LanguageMapping.Empty;

        Assert.That(DictionaryData.Empty, Is.SameAs(dictionaryEmpty));
        Assert.That(EncyclopediaData.Empty, Is.SameAs(encyclopediaEmpty));
        Assert.That(MediaData.Empty, Is.SameAs(mediaEmpty));
        Assert.That(SourceLanguageData.Empty, Is.SameAs(sourceLanguageEmpty));
        Assert.That(GlossData.Empty, Is.SameAs(glossEmpty));
        Assert.That(LanguageMapping.Empty, Is.SameAs(languageMappingEmpty));
    }
}
