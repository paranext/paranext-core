using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

[TestFixture]
[ExcludeFromCodeCoverage]
internal class MarbleLanguageMapBuilderTests
{
    [Test]
    public void Build_EmptyGlossData_ReturnsStaticPt9Mapping()
    {
        var map = MarbleLanguageMapBuilder.Build(GlossData.Empty);

        // PT9 GetEncyclopediaLanguage static mappings.
        Assert.That(map.Variants["zh-Hans"], Is.EqualTo("hns"));
        Assert.That(map.Variants["zh-Hant"], Is.EqualTo("hnt"));
        Assert.That(map.Variants["pt-BR"], Is.EqualTo("pt"));
        Assert.That(map.Variants["en-US"], Is.EqualTo("en"));
        Assert.That(map.Variants["en-UK"], Is.EqualTo("en"));
    }

    [Test]
    public void Build_GlossHasZhHansOnly_AddsZhHantAndZhFallbacks()
    {
        var gloss = new GlossData(
            ByLanguage: new Dictionary<
                string,
                IReadOnlyDictionary<string, IReadOnlyList<string>>
            >(),
            AvailableLanguages: ["zh-Hans", "en"]
        );

        var map = MarbleLanguageMapBuilder.Build(gloss);

        Assert.That(map.Variants["zh-Hant"], Is.EqualTo("zh-Hans"));
        Assert.That(map.Variants["zh"], Is.EqualTo("zh-Hans"));
    }

    [Test]
    public void Build_GlossHasBothChineseVariants_DoesNotOverrideZhHantToZhHans()
    {
        var gloss = new GlossData(
            ByLanguage: new Dictionary<
                string,
                IReadOnlyDictionary<string, IReadOnlyList<string>>
            >(),
            AvailableLanguages: ["zh-Hans", "zh-Hant", "en"]
        );

        var map = MarbleLanguageMapBuilder.Build(gloss);

        // PT9 static map still wins since zh-Hant is available directly.
        Assert.That(map.Variants["zh-Hant"], Is.EqualTo("hnt"));
        Assert.That(map.Variants["zh-Hans"], Is.EqualTo("hns"));
    }
}
