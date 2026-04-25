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
    /// "en" with a V1 entry keyed "camel_001" and a V2 entry keyed "camel_002" so the
    /// token-driven service can disambiguate format-version code paths via thematic
    /// links (FAUNA:camel_001 vs FAUNA:camel_002). Known resources include the V1 and
    /// V2 IDs plus an empty resource used by the empty-state tests.
    /// </summary>
    internal static EncyclopediaData BuildEncyclopediaData()
    {
        // Distinct keys per format so a token's thematic link can target a specific
        // entry. The parser-level golden master tests still use V1CamelEntryXml /
        // V2CamelEntryXml directly (Key="2.8") and are unaffected.
        var v1CamelEntry = new MarbleEncyclopediaEntry(
            V1CamelEntryXml.Replace("Key=\"2.8\"", "Key=\"camel_001\"")
        );
        var v2CamelEntry = new MarbleEncyclopediaEntry(
            V2CamelEntryXml.Replace("Key=\"2.8\"", "Key=\"camel_002\"")
        );

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

    /// <summary>
    /// Builds a single-token book token fixture targeting Genesis 1:1 with a thematic
    /// link to "FAUNA:camel_001" - the V1 entry produced by <see cref="BuildEncyclopediaData"/>.
    /// Used by the FU-CR2 regression test to verify token-driven Lemma/SourceText/Collection.
    /// </summary>
    internal static FakeMarbleBookTokenProvider BuildBookTokenProviderWithFaunaCamel(
        string resourceId,
        int bookNum
    )
    {
        var tokens = new[]
        {
            new MarbleToken(MarbleTokenType.Book, "GEN", 0),
            new MarbleToken(MarbleTokenType.Chapter, "1", 1),
            new MarbleToken(MarbleTokenType.Verse, "1", 2),
            new MarbleToken(
                MarbleTokenType.TextLink,
                "gamal",
                3,
                LexicalLinks: ["SDBH:gamal:001"],
                ThematicLinks: ["FAUNA:camel_001"]
            ),
        };
        return new FakeMarbleBookTokenProvider().With(resourceId, bookNum, tokens);
    }

    /// <summary>
    /// Builds the default token provider for EncyclopediaService tests using the V1/V2
    /// fauna fixture. Registers a token sequence at GEN 12:16 for both
    /// "test-fauna-resource" (linking FAUNA:camel_001 -> V1 entry, no images) and
    /// "test-fauna-resource-v2" (linking FAUNA:camel_002 -> V2 entry, with image).
    /// Matches the verse used by the existing acceptance/contract tests.
    /// </summary>
    internal static FakeMarbleBookTokenProvider BuildDefaultEncyclopediaBookTokens()
    {
        var v1Tokens = new[]
        {
            new MarbleToken(MarbleTokenType.Book, "GEN", 0),
            new MarbleToken(MarbleTokenType.Chapter, "12", 1),
            new MarbleToken(MarbleTokenType.Verse, "16", 2),
            new MarbleToken(
                MarbleTokenType.TextLink,
                "gamal",
                3,
                LexicalLinks: ["SDBH:gamal:001"],
                ThematicLinks: ["FAUNA:camel_001"]
            ),
        };
        var v2Tokens = new[]
        {
            new MarbleToken(MarbleTokenType.Book, "GEN", 0),
            new MarbleToken(MarbleTokenType.Chapter, "12", 1),
            new MarbleToken(MarbleTokenType.Verse, "16", 2),
            new MarbleToken(
                MarbleTokenType.TextLink,
                "gamal",
                3,
                LexicalLinks: ["SDBH:gamal:001"],
                ThematicLinks: ["FAUNA:camel_002"]
            ),
        };
        return new FakeMarbleBookTokenProvider()
            .With("test-fauna-resource", 1, v1Tokens)
            .With("test-fauna-resource-v2", 1, v2Tokens);
    }

    /// <summary>
    /// Builds a <see cref="MarbleDataAccessService"/> with a minimal English gloss map:
    /// "gamal" -> ["camel"]. HaveMarbleData returns true via a sentinel ResourceScrText
    /// so FindLocalizedGlossesForTerm bypasses the early-return guard.
    /// </summary>
    internal static MarbleDataAccessService BuildMarbleDataAccessService()
    {
        var glossByLanguage = new Dictionary<
            string,
            IReadOnlyDictionary<string, IReadOnlyList<string>>
        >(StringComparer.OrdinalIgnoreCase)
        {
            ["en"] = new Dictionary<string, IReadOnlyList<string>>(StringComparer.Ordinal)
            {
                ["gamal"] = new List<string> { "camel" },
            },
        };
        var glossData = new GlossData(glossByLanguage, ["en"]);
        return new MarbleDataAccessService(
            glossData,
            LanguageMapping.Empty,
            [MarbleTestHelper.CreateFakeMarbleScrText("test-fauna-resource")]
        );
    }
}
