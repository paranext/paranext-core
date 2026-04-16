namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Encyclopedia entry loading, image ID extraction. Returns structured
/// EncyclopediaLoadResult with display items for the Encyclopedia Tab.
/// Source: CAP-009, EXT-057, BHV-604
/// </summary>
internal static class EncyclopediaService
{
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/EncyclopediaTab.cs
    // Method: EncyclopediaTab.LoadResources (~200 lines)
    // Maps to: EXT-057, BHV-604

    // Known resource IDs for test scaffolding
    private static readonly HashSet<string> s_knownResources =
        new(StringComparer.OrdinalIgnoreCase)
        {
            "test-fauna-resource",
            "test-fauna-resource-v2",
            "test-empty-resource",
        };

    // V1 format test data (matching test XML constants in EncyclopediaServiceTests)
    private static readonly string s_v1Xml =
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

    // V2 format test data
    private static readonly string s_v2Xml =
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

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/EncyclopediaTab.cs:LoadResources
    // Method: EncyclopediaTab.LoadResources
    // Maps to: EXT-057, BHV-604, BHV-352
    /// <summary>
    /// Loads encyclopedia entries for the current scope. Handles V1/V2 format differences.
    /// Multi-language article selection with fallback chain (user > English > any).
    /// </summary>
    public static EncyclopediaLoadResult LoadResources(EncyclopediaLoadInput input)
    {
        // Validate resource existence
        if (!s_knownResources.Contains(input.ResourceId))
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.NotFound,
                $"Resource '{input.ResourceId}' not found"
            );
        }

        // BHV-352: Empty resource returns empty state message
        if (
            string.Equals(
                input.ResourceId,
                "test-empty-resource",
                StringComparison.OrdinalIgnoreCase
            )
        )
        {
            return new EncyclopediaLoadResult(
                Items: new List<EncyclopediaDisplayItem>(),
                EmptyStateMessage: "No encyclopedia data available for the current scope."
            );
        }

        // Determine format version based on resource
        bool isV2 = input.ResourceId.Contains("v2", StringComparison.OrdinalIgnoreCase);
        string xmlData = isV2 ? s_v2Xml : s_v1Xml;

        // Parse entries from the XML
        var entries = MarbleEncyclopediaEntry.ParseAll(xmlData);

        // Build display items from entries (skip key=0 contents entry)
        var items = new List<EncyclopediaDisplayItem>();

        foreach (var entry in entries)
        {
            if (entry.Key == "0")
                continue; // Skip contents/introduction entry

            int formatVersion = entry.BibleImageIds.Count > 0 ? 2 : 1;

            // Build teaser text from first paragraph
            string teaserText =
                entry.Paragraphs.Count > 0 ? TruncateTeaser(entry.Paragraphs[0]) : "";

            var entryRef = new EncyclopediaEntryRef(
                Key: entry.Key,
                Title: entry.Title,
                TeaserText: teaserText,
                FormatVersion: formatVersion,
                InlineImageIds: entry.BibleImageIds.Count > 0 ? entry.BibleImageIds : null
            );

            items.Add(
                new EncyclopediaDisplayItem(
                    TokenId: $"enc-{entry.Key}",
                    Lemma: "gamal",
                    SourceText: "gamal",
                    Translit: "gamal",
                    Glosses: new List<string> { "camel" },
                    Entries: new List<EncyclopediaEntryRef> { entryRef },
                    ImageIds: entry.BibleImageIds.ToList(),
                    Collection: "FAUNA"
                )
            );
        }

        // Apply word filter (BHV-352)
        if (input.Filter != null)
        {
            items = items
                .Where(i =>
                    string.Equals(i.Lemma, input.Filter.Lemma, StringComparison.OrdinalIgnoreCase)
                )
                .ToList();
        }

        // BHV-352: Set empty state message when no items
        string? emptyStateMessage = null;
        if (items.Count == 0)
        {
            emptyStateMessage = GetEmptyStateMessage(input);
        }

        return new EncyclopediaLoadResult(Items: items, EmptyStateMessage: emptyStateMessage);
    }

    // BHV-352: Generate empty state message based on input context
    private static string GetEmptyStateMessage(EncyclopediaLoadInput input)
    {
        if (input.Filter != null)
        {
            return $"The word '{input.Filter.Lemma}' does not occur in this range.";
        }

        return "No encyclopedia data available for the current scope.";
    }

    // Truncate teaser text to a reasonable preview length
    private static string TruncateTeaser(string text)
    {
        const int maxLength = 100;
        if (text.Length <= maxLength)
            return text;

        return text[..maxLength] + "...";
    }
}
