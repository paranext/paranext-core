using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources.Fixtures;

/// <summary>
/// Builds an <see cref="EncyclopediaData"/> record for EncyclopediaService tests.
/// Replaces the prior static *Override / ApplyDefaults+Clear pattern; each test
/// constructs its own service instance with either <see cref="BuildEncyclopediaData"/>
/// or a record-`with` expression derived from it.
/// </summary>
[ExcludeFromCodeCoverage]
internal static class EncyclopediaFixtures
{
    internal const string V1CamelEntryXml =
        @"<ThemLex_Entry Key=""2.8"">
    <Title>Camel, dromedary</Title>
    <Intro />
    <Index />
    <Sections>
      <Section Type=""entry"" Content=""references"">
        <Heading>References:</Heading>
        <SubHeading />
        <LanguageSets>
          <LanguageSet Language=""Hebrew"">
            <Lemma>gamal</Lemma>
            <Transliteration>gamal</Transliteration>
            <References>
              <Reference>00101201600000</Reference>
            </References>
          </LanguageSet>
        </LanguageSets>
        <Paragraphs />
      </Section>
      <Section Type=""entry"" Content=""discussion"">
        <Heading>Discussion:</Heading>
        <SubHeading />
        <LanguageSets />
        <Paragraphs>
          <Paragraph>|f&lt;img width=250 src=""2Mammals/Dromedary.jpg"" title=""Dromedary""&gt;|f* While there is no doubt about the identity of the animal.</Paragraph>
        </Paragraphs>
      </Section>
    </Sections>
  </ThemLex_Entry>";

    internal const string V2CamelEntryXml =
        @"<ThemLex_Entry Key=""2.8"">
    <Title>Camel, dromedary</Title>
    <Intro />
    <Index />
    <Sections>
      <Section Type=""entry"" Content=""references"">
        <Heading>References:</Heading>
        <LanguageSets>
          <LanguageSet Language=""Hebrew"">
            <Lemma>gamal</Lemma>
            <Transliteration>gamal</Transliteration>
            <References>
              <Reference>00101201600044</Reference>
            </References>
          </LanguageSet>
        </LanguageSets>
        <Paragraphs />
      </Section>
      <Section Type=""entry"" Content=""discussion"">
        <Heading>Discussion:</Heading>
        <SubHeading />
        <LanguageSets />
        <Paragraphs>
          <Paragraph><image Id=""Dromedary""/>While there is no doubt about the identity of the animal.</Paragraph>
        </Paragraphs>
        <BibleImages>
          <BibleImage Type=""ILL"" Id=""Dromedary"">
            <Collection />
            <Path>FFR\FAUNA</Path>
            <FileName>Dromedary.jpg</FileName>
            <Copyright>Pixabay</Copyright>
            <Definition Id="""" LanguageCode=""en""></Definition>
            <Caption>Dromedary</Caption>
            <Description />
          </BibleImage>
        </BibleImages>
      </Section>
    </Sections>
  </ThemLex_Entry>";

    internal const string V1FaunaXml =
        @"<?xml version=""1.0""?>
<Thematic_Lexicon xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"" xmlns:xsd=""http://www.w3.org/2001/XMLSchema"">
  <ThemLex_Entry Key=""0"">
    <Title>Contents and Introduction</Title>
    <Intro />
    <Index>
      <IndexItem Number=""0.1"" Description=""Introduction"" Target=""FAUNA:0.1"" />
      <IndexItem Number=""1"" Description=""Animals, General"" Target=""FAUNA:1"" />
    </Index>
    <Sections />
  </ThemLex_Entry>"
        + V1CamelEntryXml
        + "</Thematic_Lexicon>";

    internal const string V2FaunaXml =
        @"<?xml version=""1.0""?>
<Thematic_Lexicon xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"" xmlns:xsd=""http://www.w3.org/2001/XMLSchema"">
  <ThemLex_Entry Key=""0"">
    <Title>Contents and Introduction</Title>
    <Intro />
    <Index>
      <IndexItem Number=""0.1"" Description=""Introduction"" Target=""FAUNA:0.1"" />
    </Index>
    <Sections />
  </ThemLex_Entry>"
        + V2CamelEntryXml
        + "</Thematic_Lexicon>";

    internal static readonly Dictionary<string, string> Abbreviations =
        new(StringComparer.OrdinalIgnoreCase)
        {
            { "NIV", "New International Version" },
            { "NRSV", "New Revised Standard Version" },
            { "ESV", "English Standard Version" },
        };

    /// <summary>
    /// Catalog of test articles consumed by EncyclopediaService.GetArticle tests.
    /// </summary>
    internal static Dictionary<string, ArticleContent> BuildTestArticles() =>
        new(StringComparer.OrdinalIgnoreCase)
        {
            ["REALIA:1.1.8.3"] = new ArticleContent(
                "Winnowing fork",
                [
                    "The winnowing fork was used for threshing grain.",
                    "see this article: <l target=\"REALIA:2.8\">2.8 Camel</l>",
                    "<image Id=\"WinnowingFork\"/>See image of winnowing fork.",
                ],
                ["WinnowingFork"],
                true
            ),
            ["test-article-with-verses"] = new ArticleContent(
                "Article with verses",
                ["see verse: <s>G04300301600000</s>"],
                [],
                false
            ),
            ["test-plain-text"] = new ArticleContent(
                "Plain text article",
                ["plain text"],
                [],
                false
            ),
            ["test-crossref-article"] = new ArticleContent(
                "Cross-reference article",
                ["see this article: <l target=\"REALIA:1.1.8.3\">1.1.8.3 Winnowing fork</l>"],
                [],
                false
            ),
            ["test-verse-ref-article"] = new ArticleContent(
                "Verse reference article",
                ["see verse: <s>G04300301600000</s>"],
                [],
                false
            ),
            ["test-verse-range-article"] = new ArticleContent(
                "Verse range article",
                ["see verse: <s>G04300301600000-G04300301700000</s>"],
                [],
                false
            ),
            ["test-verse-range-crosschapter-article"] = new ArticleContent(
                "Verse range cross-chapter article",
                ["see verse: <s>G04300301600000-G04300401700000</s>"],
                [],
                false
            ),
            ["test-abbreviation-article"] = new ArticleContent(
                "Abbreviation article",
                ["read the <a>NIV</a>"],
                [],
                false
            ),
            ["test-formatted-text-article"] = new ArticleContent(
                "Formatted text article",
                ["text <b>with bold</b>", "text <i>with italic</i>"],
                [],
                false
            ),
            ["test-gm011-verse-link"] = new ArticleContent(
                "GM-011 verse link",
                ["see verse: <s>G04300301600000</s>"],
                [],
                false
            ),
            ["test-pattern-parsing"] = new ArticleContent(
                "Pattern parsing test",
                ["see verse: <s>G04300301600000</s>"],
                [],
                false
            ),
            ["test-article-with-images"] = new ArticleContent(
                "Article with images",
                ["<image Id=\"Dromedary\"/>See the dromedary."],
                ["Dromedary"],
                true
            ),
            ["test-article-with-inline-images"] = new ArticleContent(
                "Article with inline images",
                ["<image Id=\"Dromedary\"/>See the dromedary."],
                ["Dromedary"],
                true
            ),
            ["test-navigation-article"] = new ArticleContent(
                "Navigation article",
                [
                    "see verse: <s>G04300301600000</s>",
                    "see this article: <l target=\"REALIA:2.8\">2.8 Camel</l>",
                    "<image Id=\"Camel\"/>See the camel image.",
                ],
                ["Camel"],
                true
            ),
            ["test-launchviewer-article"] = new ArticleContent(
                "Launch viewer article",
                ["<image Id=\"Dromedary\"/>See the dromedary."],
                ["Dromedary"],
                true
            ),
            ["test-v2-article-with-images"] = new ArticleContent(
                "V2 article with images",
                ["<image Id=\"Dromedary\"/>See the dromedary."],
                ["Dromedary"],
                true
            ),
            ["test-v1-article"] = new ArticleContent(
                "V1 article",
                ["While there is no doubt about the identity of the animal."],
                [],
                false
            ),
            ["test-article-missing-images"] = new ArticleContent(
                "Article with missing images",
                ["The animal is described here."],
                [],
                false
            ),
            ["test-unknown-abbreviation-article"] = new ArticleContent(
                "Unknown abbreviation article",
                ["read the <a>XYZ</a>"],
                [],
                false
            ),
        };

    /// <summary>
    /// Builds the default EncyclopediaData record used by tests. Populates Fauna under
    /// "en" with a V1 and a V2 entry (single entry each) so both format-version code
    /// paths produce data. Known resources include the V1 and V2 IDs plus an empty
    /// resource used by the empty-state tests.
    /// </summary>
    internal static EncyclopediaData BuildEncyclopediaData()
    {
        var v1CamelEntry = new MarbleEncyclopediaEntry(V1CamelEntryXml);
        var v2CamelEntry = new MarbleEncyclopediaEntry(V2CamelEntryXml);

        var faunaByLanguage = new Dictionary<string, IReadOnlyList<MarbleEncyclopediaEntry>>(
            StringComparer.OrdinalIgnoreCase
        )
        {
            ["en"] = new List<MarbleEncyclopediaEntry> { v1CamelEntry, v2CamelEntry },
        };

        var entriesByTypeAndLanguage = new Dictionary<
            EncyclopediaEntryType,
            IReadOnlyDictionary<string, IReadOnlyList<MarbleEncyclopediaEntry>>
        >
        {
            [EncyclopediaEntryType.Fauna] = faunaByLanguage,
        };

        return new EncyclopediaData(
            EntriesByTypeAndLanguage: entriesByTypeAndLanguage,
            ArticlesById: BuildTestArticles(),
            Abbreviations: new Dictionary<string, string>(
                Abbreviations,
                StringComparer.OrdinalIgnoreCase
            ),
            KnownResourceIds: new HashSet<string>(StringComparer.OrdinalIgnoreCase)
            {
                "test-fauna-resource",
                "test-fauna-resource-v2",
                "test-empty-resource",
            }
        );
    }
}
