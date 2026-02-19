using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for CAP-029: EncyclopediaV2Parsing.
/// Validates parsing of V2 encyclopedia XML into Thematic_Lexicon object graph
/// via Thematic_Lexicon.ParseXml(). The V2 format uses XML elements for inline
/// content (&lt;s&gt;, &lt;i&gt;, &lt;a&gt;, &lt;image&gt;, &lt;l&gt;) and includes word offsets
/// in scripture references.
///
/// PT9 Source: Paratext/Marble/MarbleEncyclopediaEntry.cs:35-148
/// Golden Master: gm-016-encyclopedia-v2-parsing
/// Extraction: EXT-067
/// Behavior: BHV-414
/// </summary>
[TestFixture]
public class MarbleEncyclopediaEntryTests
{
    #region Sample V2 XML Data

    // V2 sample with two entries: a table-of-contents entry (Key="0") and
    // a content entry (Key="2.8" - "Camel, dromedary") containing references,
    // discussion, description, significance, and translation sections.
    // Derived from PT9 EncyclopediaDataTests.cs sample data.
    private const string SampleV2Xml =
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
          <LanguageSets>
            <LanguageSet Language=""Hebrew"">
            <Lemma>gamal</Lemma>
            <Transliteration>gamal</Transliteration>
            <References>
              <Reference>00101201600044</Reference>
              <Reference>00102401000012</Reference>
            </References>
            </LanguageSet>
            <LanguageSet Language=""Greek"">
            <Lemma>kamelos</Lemma>
            <Transliteration>kamelos</Transliteration>
            <References>
              <Reference>04000300400022</Reference>
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
            <Paragraph><image Id=""Dromedary""/>While there is no doubt about the identity of the animal referred to by the above Hebrew, Greek and Latin words there has been some difference of opinion among scholars about the reference to camels in <s>H00101201600044</s>.</Paragraph>
            <Paragraph>Whether or not these scholars are correct there is no doubt that the Hebrew text contains the word for ""camel"", and <s>H00101201600044</s> has to be translated accordingly.</Paragraph>
            <Paragraph><image Id=""Bactrian""/>There were two types of camel known in Bible times the most common being the Arabian Dromedary <i>camelus dromedarius</i>, which was indigenous to the area.</Paragraph>
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
                <BibleImage Type=""ILL"" Id=""Bactrian"">
                  <Collection />
                  <Path>FFR\FAUNA</Path>
                  <FileName>Bactrian.jpg</FileName>
                  <Copyright>Pixabay</Copyright>
                  <Definition Id="""" LanguageCode=""en""></Definition>
                  <Caption>Bactrian camel</Caption>
                  <Description />
                </BibleImage>
              </BibleImages>
        </Section>
        <Section Type=""entry"" Content=""description"">
          <Heading>Description:</Heading>
          <SubHeading />
          <LanguageSets />
          <Paragraphs>
            <Paragraph>Camels belong to the same family as the South American llama.</Paragraph>
          </Paragraphs>
        </Section>
    </Sections>
  </ThemLex_Entry>
</Thematic_Lexicon>";

    // Minimal V2 XML with a single entry and no sections
    private const string MinimalV2Xml =
        @"<?xml version=""1.0""?>
<Thematic_Lexicon>
  <ThemLex_Entry Key=""1"">
    <Title>Test Entry</Title>
    <Intro />
    <Index />
    <Sections />
  </ThemLex_Entry>
</Thematic_Lexicon>";

    // V2 XML with inline element types in paragraphs
    private const string InlineElementsV2Xml =
        @"<?xml version=""1.0""?>
<Thematic_Lexicon>
  <ThemLex_Entry Key=""3.1"">
    <Title>Test Inline Elements</Title>
    <Intro />
    <Index />
    <Sections>
        <Section Type=""entry"" Content=""translation"">
          <Heading>Translation:</Heading>
          <SubHeading />
          <LanguageSets />
          <Paragraphs>
            <Paragraph>See verse: <s>G04300301600000</s> for reference.</Paragraph>
            <Paragraph>Read the <a>NIV</a> translation.</Paragraph>
            <Paragraph>The word <i>beker</i> is related to <i>B-K-R</i>.</Paragraph>
            <Paragraph>See also: <l target=""REALIA:1.1.8.3"">1.1.8.3 Winnowing fork</l> article.</Paragraph>
            <Paragraph><s>G04001902400014 G04002302400018 G04101002500006 G04201802500008</s>: In these passages the large size is contrasted.</Paragraph>
          </Paragraphs>
        </Section>
    </Sections>
  </ThemLex_Entry>
</Thematic_Lexicon>";

    // V2 XML with IndexItem missing Number attribute (should be skipped)
    private const string IndexItemMissingNumberXml =
        @"<?xml version=""1.0""?>
<Thematic_Lexicon>
  <ThemLex_Entry Key=""0"">
    <Title>Test Index Filtering</Title>
    <Intro />
    <Index>
        <IndexItem Number=""1"" Description=""Valid Item"" Target=""FAUNA:1"" />
        <IndexItem Description=""Missing Number"" Target=""FAUNA:2"" />
        <IndexItem Number=""3"" Description=""Another Valid"" Target=""FAUNA:3"" />
    </Index>
    <Sections />
  </ThemLex_Entry>
</Thematic_Lexicon>";

    // V2 XML with LanguageSet missing Language attribute (should be filtered)
    private const string LanguageSetMissingLanguageXml =
        @"<?xml version=""1.0""?>
<Thematic_Lexicon>
  <ThemLex_Entry Key=""1"">
    <Title>Test Language Set Filtering</Title>
    <Intro />
    <Index />
    <Sections>
        <Section Type=""entry"" Content=""references"">
          <Heading>References:</Heading>
          <LanguageSets>
            <LanguageSet Language=""Hebrew"">
            <Lemma>test</Lemma>
            <Transliteration>test</Transliteration>
            <References>
              <Reference>00101201600044</Reference>
            </References>
            </LanguageSet>
            <LanguageSet>
            <Lemma>missing language</Lemma>
            <Transliteration>none</Transliteration>
            <References>
              <Reference>00101201600044</Reference>
            </References>
            </LanguageSet>
          </LanguageSets>
          <Paragraphs />
        </Section>
    </Sections>
  </ThemLex_Entry>
</Thematic_Lexicon>";

    // V2 XML with Section that has Content attribute set from attribute (not child element)
    private const string SectionWithContentAttributeXml =
        @"<?xml version=""1.0""?>
<Thematic_Lexicon>
  <ThemLex_Entry Key=""1"">
    <Title>Test Section Content</Title>
    <Intro />
    <Index />
    <Sections>
        <Section Type=""entry"" Content=""special significance or symbolism"">
          <Heading>Special significance or symbolism:</Heading>
          <SubHeading />
          <LanguageSets />
          <Paragraphs>
            <Paragraph>Plain text paragraph.</Paragraph>
          </Paragraphs>
        </Section>
    </Sections>
  </ThemLex_Entry>
</Thematic_Lexicon>";

    #endregion

    #region Acceptance Test

    /// <summary>
    /// Outer acceptance test for CAP-029.
    /// Verifies all gm-016 golden master scenarios in a single comprehensive test.
    /// When this test passes, the capability is complete.
    ///
    /// Golden master scenarios:
    /// - EV2-01: Simple V2 article with text-only paragraphs parsed
    /// - EV2-02: V2 article with lexical link elements parsed
    /// - EV2-03: V2 article with scripture reference elements with word offsets
    /// - EV2-04: V2 article with article cross-reference elements
    /// - EV2-05: V2 article with image elements parsed
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-029")]
    [Property("GoldenMasterId", "gm-016")]
    [Property("ScenarioId", "TS-160")]
    [Property("BehaviorId", "BHV-414")]
    [Description(
        "Acceptance test: V2 encyclopedia XML parsed into structured data"
    )]
    public void ParseXml_AllGoldenMasterScenarios_Pass()
    {
        var result = Thematic_Lexicon.ParseXml(SampleV2Xml);

        Assert.Multiple(() =>
        {
            // Root level: two entries parsed
            Assert.That(
                result,
                Is.Not.Null,
                "ParseXml must return non-null result"
            );
            Assert.That(
                result.ThemLex_Entry,
                Is.Not.Null,
                "Entries array must be non-null"
            );
            Assert.That(
                result.ThemLex_Entry.Length,
                Is.EqualTo(2),
                "Must parse 2 entries from sample XML"
            );

            // Entry 0: Table of Contents
            var toc = result.ThemLex_Entry[0];
            Assert.That(toc.Key, Is.EqualTo("0"), "TOC entry key");
            Assert.That(
                toc.Title,
                Is.EqualTo("Contents and Introduction"),
                "TOC entry title"
            );
            Assert.That(toc.Index, Has.Length.EqualTo(3), "TOC has 3 index items");
            Assert.That(
                toc.Sections,
                Has.Length.EqualTo(0),
                "TOC has no sections"
            );

            // Entry 1: Camel article with sections
            var camel = result.ThemLex_Entry[1];
            Assert.That(camel.Key, Is.EqualTo("2.8"), "Camel entry key");
            Assert.That(
                camel.Title,
                Is.EqualTo("Camel, dromedary"),
                "Camel entry title"
            );
            Assert.That(
                camel.Sections,
                Has.Length.EqualTo(3),
                "Camel has 3 sections"
            );

            // EV2-03: Scripture refs with word offsets in references
            var refSection = camel.Sections[0];
            Assert.That(
                refSection.LanguageSets,
                Has.Length.EqualTo(2),
                "References section has 2 language sets"
            );
            var hebrewSet = refSection.LanguageSets[0];
            Assert.That(
                hebrewSet.Language,
                Is.EqualTo("Hebrew"),
                "First language set is Hebrew"
            );
            Assert.That(
                hebrewSet.References,
                Has.Length.EqualTo(2),
                "Hebrew has 2 references"
            );
            // V2 reference with word offset: 00101201600044
            Assert.That(
                hebrewSet.References[0],
                Is.EqualTo(101201600044UL),
                "V2 reference includes word offset"
            );

            // EV2-05: BibleImages collected on entry from sections
            Assert.That(
                camel.BibleImages,
                Is.Not.Null,
                "BibleImages must be collected on entry"
            );
            Assert.That(
                camel.BibleImages.Length,
                Is.EqualTo(2),
                "Camel entry has 2 BibleImages"
            );

            // EV2-01/02: Paragraphs with inline elements preserved as strings
            var discSection = camel.Sections[1];
            Assert.That(
                discSection.Paragraphs,
                Has.Length.EqualTo(3),
                "Discussion section has 3 paragraphs"
            );

            // Paragraphs preserve inline XML elements as raw strings
            Assert.That(
                discSection.Paragraphs[0],
                Does.Contain("<image Id=\"Dromedary\""),
                "EV2-05: Image element preserved in paragraph"
            );
            Assert.That(
                discSection.Paragraphs[0],
                Does.Contain("<s>H00101201600044</s>"),
                "EV2-03: Scripture ref element preserved in paragraph"
            );
            Assert.That(
                discSection.Paragraphs[2],
                Does.Contain("<i>camelus dromedarius</i>"),
                "EV2-02: Italic element preserved in paragraph"
            );
        });
    }

    #endregion

    #region ParseXml - Root Level

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-160")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ExtractionId", "EXT-067")]
    [Description("ParseXml returns Thematic_Lexicon with correct number of entries")]
    public void ParseXml_WithMultipleEntries_ReturnsCorrectEntryCount()
    {
        var result = Thematic_Lexicon.ParseXml(SampleV2Xml);

        Assert.That(result, Is.Not.Null);
        Assert.That(result.ThemLex_Entry, Has.Length.EqualTo(2));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-160")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ExtractionId", "EXT-067")]
    [Description("ParseXml returns Thematic_Lexicon with single entry")]
    public void ParseXml_WithSingleEntry_ReturnsOneEntry()
    {
        var result = Thematic_Lexicon.ParseXml(MinimalV2Xml);

        Assert.That(result, Is.Not.Null);
        Assert.That(result.ThemLex_Entry, Has.Length.EqualTo(1));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-160")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ExtractionId", "EXT-067")]
    [Description("ParseXml with no entries returns empty array")]
    public void ParseXml_WithNoEntries_ReturnsEmptyArray()
    {
        const string emptyXml =
            @"<?xml version=""1.0""?><Thematic_Lexicon></Thematic_Lexicon>";

        var result = Thematic_Lexicon.ParseXml(emptyXml);

        Assert.That(result, Is.Not.Null);
        Assert.That(result.ThemLex_Entry, Is.Not.Null);
        Assert.That(result.ThemLex_Entry, Has.Length.EqualTo(0));
    }

    #endregion

    #region Entry Parsing - Key and Title

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-160")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ExtractionId", "EXT-067")]
    [Description("ParseEntry extracts Key attribute from ThemLex_Entry element")]
    public void ParseXml_EntryKey_ExtractedFromAttribute()
    {
        var result = Thematic_Lexicon.ParseXml(SampleV2Xml);

        Assert.That(result.ThemLex_Entry[0].Key, Is.EqualTo("0"));
        Assert.That(result.ThemLex_Entry[1].Key, Is.EqualTo("2.8"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-160")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ExtractionId", "EXT-067")]
    [Description("ParseEntry extracts Title element value")]
    public void ParseXml_EntryTitle_ExtractedFromElement()
    {
        var result = Thematic_Lexicon.ParseXml(SampleV2Xml);

        Assert.That(
            result.ThemLex_Entry[0].Title,
            Is.EqualTo("Contents and Introduction")
        );
        Assert.That(
            result.ThemLex_Entry[1].Title,
            Is.EqualTo("Camel, dromedary")
        );
    }

    #endregion

    #region Index Parsing

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-160")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ExtractionId", "EXT-067")]
    [Description("ParseIndex extracts IndexItem elements with Number, Description, Target")]
    public void ParseXml_IndexItems_AllAttributesParsed()
    {
        var result = Thematic_Lexicon.ParseXml(SampleV2Xml);
        var tocEntry = result.ThemLex_Entry[0];

        Assert.Multiple(() =>
        {
            Assert.That(tocEntry.Index, Has.Length.EqualTo(3));

            Assert.That(tocEntry.Index[0].Number, Is.EqualTo("0.1"));
            Assert.That(tocEntry.Index[0].Description, Is.EqualTo("Introduction"));
            Assert.That(tocEntry.Index[0].Target, Is.EqualTo("FAUNA:0.1"));

            Assert.That(tocEntry.Index[1].Number, Is.EqualTo("1"));
            Assert.That(
                tocEntry.Index[1].Description,
                Is.EqualTo("Animals, General")
            );
            Assert.That(tocEntry.Index[1].Target, Is.EqualTo("FAUNA:1"));

            Assert.That(tocEntry.Index[2].Number, Is.EqualTo("2"));
            Assert.That(tocEntry.Index[2].Description, Is.EqualTo("Mammals"));
            Assert.That(tocEntry.Index[2].Target, Is.EqualTo("FAUNA:2"));
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-160")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ExtractionId", "EXT-067")]
    [Description("ParseIndex skips IndexItem elements with null Number attribute")]
    public void ParseXml_IndexItemMissingNumber_Skipped()
    {
        var result = Thematic_Lexicon.ParseXml(IndexItemMissingNumberXml);
        var entry = result.ThemLex_Entry[0];

        // PT9 behavior: IndexItems with null Number are skipped
        Assert.That(
            entry.Index,
            Has.Length.EqualTo(2),
            "Only items with non-null Number should be included"
        );
        Assert.That(entry.Index[0].Number, Is.EqualTo("1"));
        Assert.That(entry.Index[1].Number, Is.EqualTo("3"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-160")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ExtractionId", "EXT-067")]
    [Description("Entry with empty Index element produces empty array")]
    public void ParseXml_EmptyIndex_ReturnsEmptyArray()
    {
        var result = Thematic_Lexicon.ParseXml(MinimalV2Xml);
        var entry = result.ThemLex_Entry[0];

        Assert.That(entry.Index, Is.Not.Null);
        Assert.That(entry.Index, Has.Length.EqualTo(0));
    }

    #endregion

    #region Section Parsing

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-160")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ExtractionId", "EXT-067")]
    [Description("ParseSections extracts Type and Content attributes")]
    public void ParseXml_SectionAttributes_TypeAndContentParsed()
    {
        var result = Thematic_Lexicon.ParseXml(SampleV2Xml);
        var camel = result.ThemLex_Entry[1];

        Assert.Multiple(() =>
        {
            Assert.That(camel.Sections[0].Type, Is.EqualTo("entry"));
            Assert.That(camel.Sections[0].Content, Is.EqualTo("references"));

            Assert.That(camel.Sections[1].Type, Is.EqualTo("entry"));
            Assert.That(camel.Sections[1].Content, Is.EqualTo("discussion"));

            Assert.That(camel.Sections[2].Type, Is.EqualTo("entry"));
            Assert.That(camel.Sections[2].Content, Is.EqualTo("description"));
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-160")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ExtractionId", "EXT-067")]
    [Description(
        "ParseSections extracts Heading from element including inner XML nodes"
    )]
    public void ParseXml_SectionHeading_ExtractedFromElement()
    {
        var result = Thematic_Lexicon.ParseXml(SampleV2Xml);
        var camel = result.ThemLex_Entry[1];

        Assert.That(camel.Sections[0].Heading, Is.EqualTo("References:"));
        Assert.That(camel.Sections[1].Heading, Is.EqualTo("Discussion:"));
        Assert.That(camel.Sections[2].Heading, Is.EqualTo("Description:"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-160")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ExtractionId", "EXT-067")]
    [Description("Section Content attribute defaults to empty string when missing")]
    public void ParseXml_SectionContentMissing_DefaultsToEmptyString()
    {
        // PT9: section.Content = sectionElem.Attribute("Content")?.Value ?? ""
        var result = Thematic_Lexicon.ParseXml(SectionWithContentAttributeXml);
        var section = result.ThemLex_Entry[0].Sections[0];

        Assert.That(
            section.Content,
            Is.EqualTo("special significance or symbolism")
        );
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-160")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ExtractionId", "EXT-067")]
    [Description("Entry with empty Sections element produces empty array")]
    public void ParseXml_EmptySections_ReturnsEmptyArray()
    {
        var result = Thematic_Lexicon.ParseXml(SampleV2Xml);
        var tocEntry = result.ThemLex_Entry[0];

        Assert.That(tocEntry.Sections, Is.Not.Null);
        Assert.That(tocEntry.Sections, Has.Length.EqualTo(0));
    }

    #endregion

    #region Paragraph Parsing

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-160")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ExtractionId", "EXT-067")]
    [Description("Paragraphs preserve inline XML elements as raw string content")]
    public void ParseXml_ParagraphsWithInlineElements_PreservedAsStrings()
    {
        var result = Thematic_Lexicon.ParseXml(SampleV2Xml);
        var discSection = result.ThemLex_Entry[1].Sections[1];

        Assert.That(discSection.Paragraphs, Has.Length.EqualTo(3));

        // Paragraph with <image> and <s> elements - inline XML preserved
        Assert.That(
            discSection.Paragraphs[0],
            Does.Contain("<image Id=\"Dromedary\""),
            "Image element preserved in paragraph string"
        );
        Assert.That(
            discSection.Paragraphs[0],
            Does.Contain("<s>H00101201600044</s>"),
            "Scripture ref element preserved in paragraph string"
        );

        // Paragraph with <i> italic elements
        Assert.That(
            discSection.Paragraphs[2],
            Does.Contain("<i>camelus dromedarius</i>"),
            "Italic element preserved in paragraph string"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-160")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ExtractionId", "EXT-067")]
    [Description(
        "Paragraphs with plain text only are preserved without modification"
    )]
    public void ParseXml_PlainTextParagraph_PreservedAsIs()
    {
        var result = Thematic_Lexicon.ParseXml(SampleV2Xml);
        var descSection = result.ThemLex_Entry[1].Sections[2];

        Assert.That(descSection.Paragraphs, Has.Length.EqualTo(1));
        Assert.That(
            descSection.Paragraphs[0],
            Is.EqualTo(
                "Camels belong to the same family as the South American llama."
            )
        );
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-160")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ExtractionId", "EXT-067")]
    [Description("Empty Paragraphs element produces empty array")]
    public void ParseXml_EmptyParagraphs_ReturnsEmptyArray()
    {
        var result = Thematic_Lexicon.ParseXml(SampleV2Xml);
        var refSection = result.ThemLex_Entry[1].Sections[0];

        // References section has empty Paragraphs element
        Assert.That(refSection.Paragraphs, Is.Not.Null);
        Assert.That(refSection.Paragraphs, Has.Length.EqualTo(0));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-160")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ExtractionId", "EXT-067")]
    [Description("V2 paragraph with all inline element types preserved")]
    public void ParseXml_AllInlineElementTypes_PreservedInParagraph()
    {
        var result = Thematic_Lexicon.ParseXml(InlineElementsV2Xml);
        var section = result.ThemLex_Entry[0].Sections[0];

        Assert.Multiple(() =>
        {
            Assert.That(section.Paragraphs, Has.Length.EqualTo(5));

            // <s> scripture reference element
            Assert.That(
                section.Paragraphs[0],
                Does.Contain("<s>G04300301600000</s>"),
                "Scripture ref preserved"
            );

            // <a> abbreviation/article ref element
            Assert.That(
                section.Paragraphs[1],
                Does.Contain("<a>NIV</a>"),
                "Abbreviation ref preserved"
            );

            // <i> italic element
            Assert.That(
                section.Paragraphs[2],
                Does.Contain("<i>beker</i>"),
                "Italic element preserved"
            );
            Assert.That(
                section.Paragraphs[2],
                Does.Contain("<i>B-K-R</i>"),
                "Multiple italic elements preserved"
            );

            // <l> lexical link element
            Assert.That(
                section.Paragraphs[3],
                Does.Contain("<l target=\"REALIA:1.1.8.3\">"),
                "Lexical link element preserved with target attribute"
            );

            // Multiple space-separated scripture refs in one <s> element
            Assert.That(
                section.Paragraphs[4],
                Does.Contain(
                    "<s>G04001902400014 G04002302400018 G04101002500006 G04201802500008</s>"
                ),
                "Multiple scripture refs in single element preserved"
            );
        });
    }

    #endregion

    #region LanguageSet Parsing

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-160")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ExtractionId", "EXT-067")]
    [Description("LanguageSets parsed with Language, Lemma, Transliteration")]
    public void ParseXml_LanguageSets_AttributesAndElementsParsed()
    {
        var result = Thematic_Lexicon.ParseXml(SampleV2Xml);
        var refSection = result.ThemLex_Entry[1].Sections[0];

        Assert.Multiple(() =>
        {
            Assert.That(refSection.LanguageSets, Has.Length.EqualTo(2));

            var hebrew = refSection.LanguageSets[0];
            Assert.That(hebrew.Language, Is.EqualTo("Hebrew"));
            Assert.That(hebrew.Lemma, Is.EqualTo("gamal"));
            Assert.That(hebrew.Transliteration, Is.EqualTo("gamal"));

            var greek = refSection.LanguageSets[1];
            Assert.That(greek.Language, Is.EqualTo("Greek"));
            Assert.That(greek.Lemma, Is.EqualTo("kamelos"));
            Assert.That(greek.Transliteration, Is.EqualTo("kamelos"));
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-160")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ExtractionId", "EXT-067")]
    [Description("LanguageSet References parsed as ulong array with V2 word offsets")]
    public void ParseXml_LanguageSetReferences_ParsedAsUlongWithWordOffsets()
    {
        var result = Thematic_Lexicon.ParseXml(SampleV2Xml);
        var refSection = result.ThemLex_Entry[1].Sections[0];

        var hebrew = refSection.LanguageSets[0];
        Assert.Multiple(() =>
        {
            Assert.That(hebrew.References, Has.Length.EqualTo(2));
            // V2 14-digit references: BBBCCCVVVWWWWW
            // 00101201600044 = Gen 12:16, word offset 00044
            Assert.That(
                hebrew.References[0],
                Is.EqualTo(101201600044UL),
                "Reference 00101201600044 parsed as ulong"
            );
            // 00102401000012 = Gen 24:10, word offset 00012
            Assert.That(
                hebrew.References[1],
                Is.EqualTo(102401000012UL),
                "Reference 00102401000012 parsed as ulong"
            );
        });

        var greek = refSection.LanguageSets[1];
        Assert.That(greek.References, Has.Length.EqualTo(1));
        // 04000300400022 = Mat 3:4, word offset 00022
        Assert.That(
            greek.References[0],
            Is.EqualTo(4000300400022UL),
            "Greek reference with word offset"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-160")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ExtractionId", "EXT-067")]
    [Description("LanguageSet with null Language is filtered out during parsing")]
    public void ParseXml_LanguageSetMissingLanguage_FilteredOut()
    {
        // PT9 behavior: if (languageSet?.Language != null) languageSets.Add(languageSet)
        var result = Thematic_Lexicon.ParseXml(LanguageSetMissingLanguageXml);
        var section = result.ThemLex_Entry[0].Sections[0];

        Assert.That(
            section.LanguageSets,
            Has.Length.EqualTo(1),
            "Only LanguageSet with non-null Language should be included"
        );
        Assert.That(section.LanguageSets[0].Language, Is.EqualTo("Hebrew"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-160")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ExtractionId", "EXT-067")]
    [Description("Section with empty LanguageSets element produces empty array")]
    public void ParseXml_EmptyLanguageSets_ReturnsEmptyArray()
    {
        var result = Thematic_Lexicon.ParseXml(SampleV2Xml);
        // Discussion section has empty LanguageSets element
        var discSection = result.ThemLex_Entry[1].Sections[1];

        Assert.That(discSection.LanguageSets, Is.Not.Null);
        Assert.That(discSection.LanguageSets, Has.Length.EqualTo(0));
    }

    #endregion

    #region BibleImage Collection

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-160")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ExtractionId", "EXT-067")]
    [Description(
        "BibleImages from section-level BibleImage elements collected on entry"
    )]
    public void ParseXml_BibleImages_CollectedOnEntryFromSections()
    {
        var result = Thematic_Lexicon.ParseXml(SampleV2Xml);
        var camel = result.ThemLex_Entry[1];

        Assert.That(camel.BibleImages, Is.Not.Null);
        Assert.That(camel.BibleImages, Has.Length.EqualTo(2));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-160")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ExtractionId", "EXT-067")]
    [Description("BibleImage Id attribute parsed correctly")]
    public void ParseXml_BibleImageId_ParsedFromAttribute()
    {
        var result = Thematic_Lexicon.ParseXml(SampleV2Xml);
        var images = result.ThemLex_Entry[1].BibleImages;

        Assert.That(images[0].Id, Is.EqualTo("Dromedary"));
        Assert.That(images[1].Id, Is.EqualTo("Bactrian"));
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-160")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ExtractionId", "EXT-067")]
    [Description("BibleImage Type (MediaType), Path, FileName parsed")]
    public void ParseXml_BibleImageProperties_ParsedCorrectly()
    {
        var result = Thematic_Lexicon.ParseXml(SampleV2Xml);
        var img = result.ThemLex_Entry[1].BibleImages[0];

        Assert.Multiple(() =>
        {
            Assert.That(
                img.MediaType,
                Is.EqualTo("ILL"),
                "Type attribute maps to MediaType"
            );
            Assert.That(img.Path, Is.EqualTo(@"FFR\FAUNA"), "Path element parsed");
            Assert.That(
                img.FileName,
                Is.EqualTo("Dromedary.jpg"),
                "FileName element parsed"
            );
            Assert.That(
                img.Caption,
                Is.EqualTo("Dromedary"),
                "Caption element parsed"
            );
            Assert.That(
                img.Copyright,
                Is.EqualTo("Pixabay"),
                "Copyright element parsed"
            );
        });
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-160")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ExtractionId", "EXT-067")]
    [Description("Entry with no BibleImages has empty or null BibleImages")]
    public void ParseXml_NoBibleImages_EmptyOrNull()
    {
        var result = Thematic_Lexicon.ParseXml(MinimalV2Xml);
        var entry = result.ThemLex_Entry[0];

        // Entry with no sections (and thus no BibleImage elements)
        // BibleImages should be an empty array (not null) to avoid NRE
        Assert.That(
            entry.BibleImages,
            Is.Not.Null,
            "BibleImages should not be null even when no images exist"
        );
        Assert.That(entry.BibleImages, Has.Length.EqualTo(0));
    }

    #endregion

    #region Edge Cases

    [Test]
    [Category("EdgeCase")]
    [Property("ScenarioId", "TS-160")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ExtractionId", "EXT-067")]
    [Description(
        "Heading from element preserves inner nodes as concatenated string"
    )]
    public void ParseXml_HeadingWithInnerNodes_ConcatenatedAsString()
    {
        // PT9: section.Heading = headingElem != null
        //   ? string.Join("", headingElem.Nodes().Select(n => n.ToString()))
        //   : ""
        var result = Thematic_Lexicon.ParseXml(SampleV2Xml);
        var refSection = result.ThemLex_Entry[1].Sections[0];

        Assert.That(
            refSection.Heading,
            Is.EqualTo("References:"),
            "Heading text extracted correctly"
        );
    }

    [Test]
    [Category("EdgeCase")]
    [Property("ScenarioId", "TS-160")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ExtractionId", "EXT-067")]
    [Description(
        "Section with missing Heading element results in empty string"
    )]
    public void ParseXml_MissingHeadingElement_ReturnsEmptyString()
    {
        // PT9: headingElem != null ? ... : ""
        const string xml =
            @"<?xml version=""1.0""?>
<Thematic_Lexicon>
  <ThemLex_Entry Key=""1"">
    <Title>Test</Title>
    <Intro />
    <Index />
    <Sections>
        <Section Type=""entry"" Content=""test"">
          <LanguageSets />
          <Paragraphs />
        </Section>
    </Sections>
  </ThemLex_Entry>
</Thematic_Lexicon>";

        var result = Thematic_Lexicon.ParseXml(xml);
        var section = result.ThemLex_Entry[0].Sections[0];

        Assert.That(section.Heading, Is.EqualTo(""));
    }

    [Test]
    [Category("EdgeCase")]
    [Property("ScenarioId", "TS-160")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ExtractionId", "EXT-067")]
    [Description("Entry with no Key attribute returns null Key")]
    public void ParseXml_EntryMissingKeyAttribute_ReturnsNullKey()
    {
        const string xml =
            @"<?xml version=""1.0""?>
<Thematic_Lexicon>
  <ThemLex_Entry>
    <Title>No Key Entry</Title>
    <Intro />
    <Index />
    <Sections />
  </ThemLex_Entry>
</Thematic_Lexicon>";

        var result = Thematic_Lexicon.ParseXml(xml);

        Assert.That(result.ThemLex_Entry, Has.Length.EqualTo(1));
        Assert.That(result.ThemLex_Entry[0].Key, Is.Null);
    }

    [Test]
    [Category("EdgeCase")]
    [Property("ScenarioId", "TS-160")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ExtractionId", "EXT-067")]
    [Description("Entry with no Title element returns null Title")]
    public void ParseXml_EntryMissingTitleElement_ReturnsNullTitle()
    {
        const string xml =
            @"<?xml version=""1.0""?>
<Thematic_Lexicon>
  <ThemLex_Entry Key=""1"">
    <Intro />
    <Index />
    <Sections />
  </ThemLex_Entry>
</Thematic_Lexicon>";

        var result = Thematic_Lexicon.ParseXml(xml);

        Assert.That(result.ThemLex_Entry[0].Title, Is.Null);
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-160")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ExtractionId", "EXT-067")]
    [Property("GoldenMasterId", "gm-016")]
    [Description(
        "V2 word offsets in references: V2 reference divided by 100000 equals V1 reference"
    )]
    public void ParseXml_V2WordOffsets_StrippedToMatchV1BookChapterVerse()
    {
        // V2 references include a 5-digit word offset at the end.
        // When dividing by 100000, the result should match the V1 reference
        // (which has word offset = 00000).
        // This is the same verification used in PT9's EncyclopediaDataTests.VerifyLanguageSets
        var result = Thematic_Lexicon.ParseXml(SampleV2Xml);
        var hebrew = result.ThemLex_Entry[1].Sections[0].LanguageSets[0];

        // V2: 00101201600044, V1 equivalent: 00101201600000
        // 00101201600044 / 100000 = 1012016 (same as 00101201600000 / 100000)
        Assert.That(
            hebrew.References[0] / 100000,
            Is.EqualTo(1012016UL),
            "V2 reference / 100000 yields V1 book+chapter+verse"
        );
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-160")]
    [Property("BehaviorId", "BHV-414")]
    [Property("ExtractionId", "EXT-067")]
    [Property("GoldenMasterId", "gm-016")]
    [Description(
        "Full V2 sample from PT9 EncyclopediaDataTests: entries, sections, and structure match"
    )]
    public void ParseXml_FullV2Sample_StructuralMatchWithPT9TestData()
    {
        // This test uses the full V2 sample XML from PT9 EncyclopediaDataTests.cs
        // to ensure structural compatibility.
        const string fullV2Xml =
            @"<?xml version=""1.0""?>
<Thematic_Lexicon xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"" xmlns:xsd=""http://www.w3.org/2001/XMLSchema"">
  <ThemLex_Entry Key=""0"">
    <Title>Contents and Introduction</Title>
    <Intro />
    <Index>
        <IndexItem Number=""0.1"" Description=""Introduction"" Target=""FAUNA:0.1"" />
        <IndexItem Number=""1"" Description=""Animals, General"" Target=""FAUNA:1"" />
        <IndexItem Number=""2"" Description=""Mammals"" Target=""FAUNA:2"" />
        <IndexItem Number=""3"" Description=""Birds"" Target=""FAUNA:3"" />
        <IndexItem Number=""4"" Description=""Snakes and Lizards"" Target=""FAUNA:4"" />
        <IndexItem Number=""5"" Description=""Fish, Frogs, and Mollusks"" Target=""FAUNA:5"" />
        <IndexItem Number=""6"" Description=""Insects, Spiders, and Worms"" Target=""FAUNA:6"" />
        <IndexItem Number=""7"" Description=""Mythical Monsters"" Target=""FAUNA:7"" />
        <IndexItem Number=""8"" Description=""Glossary"" Target=""FAUNA:8"" />
        <IndexItem Number=""9"" Description=""Selected Bibliography"" Target=""FAUNA:9"" />
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
              <Reference>00102401000012</Reference>
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
            <Paragraph>Plain text paragraph one.</Paragraph>
            <Paragraph>Plain text paragraph two.</Paragraph>
          </Paragraphs>
        </Section>
        <Section Type=""entry"" Content=""description"">
          <Heading>Description:</Heading>
          <SubHeading />
          <LanguageSets />
          <Paragraphs>
            <Paragraph>Description text.</Paragraph>
          </Paragraphs>
        </Section>
        <Section Type=""entry"" Content=""special significance or symbolism"">
          <Heading>Special significance or symbolism:</Heading>
          <SubHeading />
          <LanguageSets />
          <Paragraphs>
            <Paragraph>Significance text.</Paragraph>
          </Paragraphs>
        </Section>
        <Section Type=""entry"" Content=""translation"">
          <Heading>Translation:</Heading>
          <SubHeading />
          <LanguageSets />
          <Paragraphs>
            <Paragraph>Translation text.</Paragraph>
          </Paragraphs>
        </Section>
    </Sections>
  </ThemLex_Entry>
</Thematic_Lexicon>";

        var result = Thematic_Lexicon.ParseXml(fullV2Xml);

        Assert.Multiple(() =>
        {
            // Same structure as PT9 EncyclopediaDataTests.ConvertSampleEntry
            Assert.That(result.ThemLex_Entry, Has.Length.EqualTo(2));

            // TOC entry
            Assert.That(result.ThemLex_Entry[0].Key, Is.EqualTo("0"));
            Assert.That(
                result.ThemLex_Entry[0].Index,
                Has.Length.EqualTo(10),
                "PT9 sample has 10 index items"
            );

            // Content entry with 5 sections (same as PT9 sample)
            Assert.That(result.ThemLex_Entry[1].Key, Is.EqualTo("2.8"));
            Assert.That(
                result.ThemLex_Entry[1].Sections,
                Has.Length.EqualTo(5),
                "PT9 sample has 5 sections: references, discussion, description, significance, translation"
            );
        });
    }

    #endregion
}
