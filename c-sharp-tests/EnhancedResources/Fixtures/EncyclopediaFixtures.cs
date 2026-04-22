using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources.Fixtures;

/// <summary>
/// Test fixtures for EncyclopediaService. Holds the V1/V2 XML fixture documents, the
/// catalog of test articles, the known-resource set, and the abbreviation map previously
/// embedded in EncyclopediaService.cs. N3 policy
/// (patterns.csharp.testScaffoldingLocation).
/// </summary>
[ExcludeFromCodeCoverage]
internal static class EncyclopediaFixtures
{
    internal static readonly HashSet<string> KnownResources =
        new(StringComparer.OrdinalIgnoreCase)
        {
            "test-fauna-resource",
            "test-fauna-resource-v2",
            "test-empty-resource",
        };

    internal static readonly Dictionary<string, string> Abbreviations =
        new(StringComparer.OrdinalIgnoreCase)
        {
            { "NIV", "New International Version" },
            { "NRSV", "New Revised Standard Version" },
            { "ESV", "English Standard Version" },
        };

    // V1 format test data (matching test XML constants in EncyclopediaServiceTests).
    internal const string V1Xml =
        @"<?xml version=""1.0""?>
<Thematic_Lexicon xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"" xmlns:xsd=""http://www.w3.org/2001/XMLSchema"">
  <ThemLex_Entry Key=""0"">
    <Title>Contents and Introduction</Title>
    <Intro />
    <Index>
      <IndexItem Number=""0.1"" Description=""Introduction"" Target=""FAUNA:0.1"" />
      <IndexItem Number=""1"" Description=""Animals, General"" Target=""FAUNA:1"" />
      <IndexItem Number=""2"" Description=""Mammals"" Target=""FAUNA:2"" />
    </Index>
    <Sections />
  </ThemLex_Entry>
  <ThemLex_Entry Key=""2.8"">
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
  </ThemLex_Entry>
</Thematic_Lexicon>";

    internal const string V2Xml =
        @"<?xml version=""1.0""?>
<Thematic_Lexicon xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"" xmlns:xsd=""http://www.w3.org/2001/XMLSchema"">
  <ThemLex_Entry Key=""0"">
    <Title>Contents and Introduction</Title>
    <Intro />
    <Index>
      <IndexItem Number=""0.1"" Description=""Introduction"" Target=""FAUNA:0.1"" />
    </Index>
    <Sections />
  </ThemLex_Entry>
  <ThemLex_Entry Key=""2.8"">
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
  </ThemLex_Entry>
</Thematic_Lexicon>";

    /// <summary>
    /// Catalog of test articles consumed by EncyclopediaService.GetArticle tests.
    /// Each value is (title, raw paragraphs, image IDs, isV2).
    /// </summary>
    internal static Dictionary<string, TestArticleContent> BuildTestArticles() =>
        new(StringComparer.OrdinalIgnoreCase)
        {
            ["REALIA:1.1.8.3"] = new TestArticleContent(
                "Winnowing fork",
                [
                    "The winnowing fork was used for threshing grain.",
                    "see this article: <l target=\"REALIA:2.8\">2.8 Camel</l>",
                    "<image Id=\"WinnowingFork\"/>See image of winnowing fork.",
                ],
                ["WinnowingFork"],
                true
            ),
            ["test-article-with-verses"] = new TestArticleContent(
                "Article with verses",
                ["see verse: <s>G04300301600000</s>"],
                [],
                false
            ),
            ["test-plain-text"] = new TestArticleContent(
                "Plain text article",
                ["plain text"],
                [],
                false
            ),
            ["test-crossref-article"] = new TestArticleContent(
                "Cross-reference article",
                ["see this article: <l target=\"REALIA:1.1.8.3\">1.1.8.3 Winnowing fork</l>"],
                [],
                false
            ),
            ["test-verse-ref-article"] = new TestArticleContent(
                "Verse reference article",
                ["see verse: <s>G04300301600000</s>"],
                [],
                false
            ),
            ["test-verse-range-article"] = new TestArticleContent(
                "Verse range article",
                ["see verse: <s>G04300301600000-G04300301700000</s>"],
                [],
                false
            ),
            ["test-verse-range-crosschapter-article"] = new TestArticleContent(
                "Verse range cross-chapter article",
                ["see verse: <s>G04300301600000-G04300401700000</s>"],
                [],
                false
            ),
            ["test-abbreviation-article"] = new TestArticleContent(
                "Abbreviation article",
                ["read the <a>NIV</a>"],
                [],
                false
            ),
            ["test-formatted-text-article"] = new TestArticleContent(
                "Formatted text article",
                ["text <b>with bold</b>", "text <i>with italic</i>"],
                [],
                false
            ),
            ["test-gm011-verse-link"] = new TestArticleContent(
                "GM-011 verse link",
                ["see verse: <s>G04300301600000</s>"],
                [],
                false
            ),
            ["test-pattern-parsing"] = new TestArticleContent(
                "Pattern parsing test",
                ["see verse: <s>G04300301600000</s>"],
                [],
                false
            ),
            ["test-article-with-images"] = new TestArticleContent(
                "Article with images",
                ["<image Id=\"Dromedary\"/>See the dromedary."],
                ["Dromedary"],
                true
            ),
            ["test-article-with-inline-images"] = new TestArticleContent(
                "Article with inline images",
                ["<image Id=\"Dromedary\"/>See the dromedary."],
                ["Dromedary"],
                true
            ),
            ["test-navigation-article"] = new TestArticleContent(
                "Navigation article",
                [
                    "see verse: <s>G04300301600000</s>",
                    "see this article: <l target=\"REALIA:2.8\">2.8 Camel</l>",
                    "<image Id=\"Camel\"/>See the camel image.",
                ],
                ["Camel"],
                true
            ),
            ["test-launchviewer-article"] = new TestArticleContent(
                "Launch viewer article",
                ["<image Id=\"Dromedary\"/>See the dromedary."],
                ["Dromedary"],
                true
            ),
            ["test-v2-article-with-images"] = new TestArticleContent(
                "V2 article with images",
                ["<image Id=\"Dromedary\"/>See the dromedary."],
                ["Dromedary"],
                true
            ),
            ["test-v1-article"] = new TestArticleContent(
                "V1 article",
                ["While there is no doubt about the identity of the animal."],
                [],
                false
            ),
            ["test-article-missing-images"] = new TestArticleContent(
                "Article with missing images",
                ["The animal is described here."],
                [],
                false
            ),
            ["test-unknown-abbreviation-article"] = new TestArticleContent(
                "Unknown abbreviation article",
                ["read the <a>XYZ</a>"],
                [],
                false
            ),
        };

    /// <summary>Applies default fixture data to the EncyclopediaService overrides.</summary>
    internal static void ApplyDefaults()
    {
        EncyclopediaService.KnownResourcesOverride = new HashSet<string>(
            KnownResources,
            StringComparer.OrdinalIgnoreCase
        );
        EncyclopediaService.AbbreviationsOverride = new Dictionary<string, string>(
            Abbreviations,
            StringComparer.OrdinalIgnoreCase
        );
        EncyclopediaService.V1XmlOverride = V1Xml;
        EncyclopediaService.V2XmlOverride = V2Xml;
        EncyclopediaService.TestArticlesOverride = BuildTestArticles();
    }

    /// <summary>Clears every EncyclopediaService override.</summary>
    internal static void Clear()
    {
        EncyclopediaService.KnownResourcesOverride = null;
        EncyclopediaService.AbbreviationsOverride = null;
        EncyclopediaService.V1XmlOverride = null;
        EncyclopediaService.V2XmlOverride = null;
        EncyclopediaService.TestArticlesOverride = null;
    }
}
