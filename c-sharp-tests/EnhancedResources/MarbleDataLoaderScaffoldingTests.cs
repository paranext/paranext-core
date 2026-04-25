using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

[TestFixture]
[ExcludeFromCodeCoverage]
internal class MarbleDataLoaderScaffoldingTests
{
    [Test]
    public async Task LoadAsync_DefaultConstructor_DoesNotThrow()
    {
        // Default constructor reads ScrTextCollection.ResourcesDirectory; in CI,
        // that directory may or may not exist. Either way, LoadAsync should
        // complete without throwing.
        var loader = new MarbleDataLoader();

        var result = await loader.LoadAsync();

        // Result may be null (ScrTextCollection not initialized on a bare CI box)
        // or a MarbleData with empty contents. Both are acceptable. The invariant
        // is "no unhandled exception escapes".
        Assert.Pass(
            result is null
                ? "LoadAsync returned null (expected when ScrTextCollection is uninitialized)"
                : "LoadAsync returned a MarbleData record"
        );
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
