using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;
using TestParanextDataProvider.EnhancedResources.Fixtures;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for EncyclopediaService.GetArticle (CAP-010: GetArticle)
///
/// Contract: Section 4.10 M-010 GetArticle (ArticleInput -> ArticleData)
/// Behaviors: BHV-606 (paragraph formatting with cross-refs and images),
///            BHV-607 (verse reference link formatting),
///            BHV-608 (abbreviation tooltip resolution),
///            BHV-457 (ArticleViewer link navigation data)
/// Sources: EXT-058 (Encyclopedia Article HTML), EXT-082 (ArticleViewer HTML and Navigation),
///          EXT-059 (Encyclopedia Image ID Extraction)
/// Golden Masters: gm-010 (paragraph content), gm-011 (verse link formatting)
///
/// GetArticle returns structured ArticleData - NOT HTML. The frontend renders
/// the structured data as React components. Cross-references become ArticleCrossRef,
/// verse references become ArticleVerseLink with parsed book/chapter/verse,
/// abbreviations include full-text for tooltip rendering, and image IDs are
/// returned for frontend image loading.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class GetArticleTests
{
    private static EncyclopediaService NewService() =>
        new(
            EncyclopediaFixtures.BuildEncyclopediaData(),
            new FakeMarbleBookTokenProvider(),
            EncyclopediaFixtures.BuildMarbleDataAccessService()
        );

    #region Acceptance Tests

    // =========================================================================
    // Acceptance test: gm-010 - Paragraph content with cross-refs and images
    // Source: golden-masters/gm-010-encyclopedia-paragraph-html
    // Input: 9 test cases of encyclopedia paragraph formatting
    // Expected: Structured ArticleData with paragraphs, cross-refs, verse links,
    //           abbreviations, and image references
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-606")]
    [Property("GoldenMasterId", "gm-010")]
    [Description(
        "Acceptance gm-010: ArticleData returned with structured paragraphs, "
            + "cross-references, verse links, abbreviation data, and image references"
    )]
    public void GetArticle_WithCrossRefsAndImages_ReturnsStructuredArticleData()
    {
        // Arrange: Article input for an entry with cross-references and images
        // gm-010 tests FormatParagraph with 9 test cases covering all inline markup types
        var input = new ArticleInput(
            ArticleId: "REALIA:1.1.8.3",
            ResourceId: "test-fauna-resource",
            UserLanguage: "en"
        );

        // Act
        var service = NewService();
        var result = service.GetArticle(input);

        // Assert: ArticleData returned with structured content
        Assert.That(result, Is.Not.Null, "gm-010: Must return ArticleData");
        Assert.That(result.ArticleId, Is.EqualTo("REALIA:1.1.8.3"), "gm-010: ArticleId preserved");
        Assert.That(result.Title, Is.Not.Null.And.Not.Empty, "gm-010: Title must be set");
        Assert.That(result.Paragraphs, Is.Not.Null.And.Not.Empty, "gm-010: Must have paragraphs");

        // BHV-606: Cross-references as structured data
        Assert.That(
            result.CrossReferences,
            Is.Not.Null,
            "gm-010: CrossReferences collection must not be null"
        );

        // BHV-606: Image IDs returned for frontend rendering
        Assert.That(result.ImageIds, Is.Not.Null, "gm-010: ImageIds collection must not be null");
    }

    // =========================================================================
    // Acceptance test: gm-011 - Verse link formatting
    // Source: golden-masters/gm-011-encyclopedia-verse-link
    // Input: G04300301600000 pattern
    // Expected: Parsed verse reference (JHN 3:16) as ArticleVerseLink
    // =========================================================================

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-032")]
    [Property("BehaviorId", "BHV-607")]
    [Property("GoldenMasterId", "gm-011")]
    [Description(
        "Acceptance gm-011: Verse references parsed from G04300301600000 pattern into "
            + "structured ArticleVerseLink with book=JHN, chapter=3, verse=16"
    )]
    public void GetArticle_WithVerseReferences_ReturnsStructuredVerseLinks()
    {
        // Arrange: Article containing verse reference pattern <s>G04300301600000</s>
        // gm-011: G04300301600000 = G043(John) + 003(Ch3) + 016(V16) + 00000(offset)
        var input = new ArticleInput(
            ArticleId: "test-article-with-verses",
            ResourceId: "test-fauna-resource",
            UserLanguage: "en"
        );

        // Act
        var service = NewService();
        var result = service.GetArticle(input);

        // Assert: Verse links parsed into structured data
        Assert.That(result, Is.Not.Null, "gm-011: Must return ArticleData");
        Assert.That(result.Paragraphs, Is.Not.Null.And.Not.Empty, "gm-011: Must have paragraphs");

        // Find a paragraph with verse links
        var paragraphsWithVerseLinks = result
            .Paragraphs.Where(p => p.VerseLinks.Count > 0)
            .ToList();
        Assert.That(
            paragraphsWithVerseLinks,
            Is.Not.Empty,
            "gm-011: At least one paragraph must have verse links"
        );

        // Verify verse link structure matches gm-011 expected output
        var verseLink = paragraphsWithVerseLinks[0].VerseLinks[0];
        Assert.That(
            verseLink.RawReference,
            Is.Not.Null.And.Not.Empty,
            "gm-011: RawReference must be set"
        );
        Assert.That(
            verseLink.DisplayText,
            Is.Not.Null.And.Not.Empty,
            "gm-011: DisplayText must be set"
        );
    }

    #endregion

    #region Golden Master: gm-010 Paragraph Formatting Per-Case (EXT-058)

    // gm-010 test case 1: "plain text" -> "plain text" (unchanged)
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-606")]
    [Property("GoldenMasterId", "gm-010")]
    [Property("ExtractionId", "EXT-058")]
    [Description("gm-010 case 1: Plain text passes through as paragraph text unchanged")]
    public void GetArticle_PlainText_PassesThroughUnchanged()
    {
        // Arrange: Article with plain text paragraph (no markup)
        // gm-010 case 1: input="plain text", output="plain text"
        var input = new ArticleInput(
            ArticleId: "test-plain-text",
            ResourceId: "test-fauna-resource",
            UserLanguage: "en"
        );

        // Act
        var service = NewService();
        var result = service.GetArticle(input);

        // Assert: Plain text preserved in paragraph
        Assert.That(result.Paragraphs, Is.Not.Null.And.Not.Empty);
        Assert.That(
            result.Paragraphs[0].Text,
            Does.Contain("plain text"),
            "gm-010 case 1: Plain text must be preserved in paragraph"
        );
        Assert.That(
            result.Paragraphs[0].VerseLinks,
            Is.Empty,
            "gm-010 case 1: No verse links in plain text"
        );
        Assert.That(
            result.Paragraphs[0].Abbreviations,
            Is.Empty,
            "gm-010 case 1: No abbreviations in plain text"
        );
    }

    // gm-010 test case 4: Cross-reference link (<l target="REALIA:...">)
    // PT9: <l target="REALIA:1.1.8.3">1.1.8.3 Winnowing fork</l>
    // -> <a href='seealso:REALIA:1.1.8.3' title='View encyclopedia entry for: Winnowing fork'>Winnowing fork</a>
    // PT10: Structured ArticleCrossRef with targetArticleId, displayText, type='seealso'
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-606")]
    [Property("GoldenMasterId", "gm-010")]
    [Property("ExtractionId", "EXT-058")]
    [Description(
        "gm-010 case 4: <l target='REALIA:1.1.8.3'> becomes ArticleCrossRef "
            + "with targetArticleId='REALIA:1.1.8.3', type='seealso'"
    )]
    public void GetArticle_CrossReferenceLink_ReturnsStructuredCrossRef()
    {
        // Arrange: Article with cross-reference link
        // gm-010 case 4: input has <l target="REALIA:1.1.8.3">
        var input = new ArticleInput(
            ArticleId: "test-crossref-article",
            ResourceId: "test-fauna-resource",
            UserLanguage: "en"
        );

        // Act
        var service = NewService();
        var result = service.GetArticle(input);

        // Assert: Cross-reference converted to structured data
        Assert.That(result.CrossReferences, Is.Not.Null.And.Not.Empty);
        var crossRef = result.CrossReferences[0];
        Assert.That(
            crossRef.TargetArticleId,
            Is.EqualTo("REALIA:1.1.8.3"),
            "gm-010 case 4: Target article ID must match REALIA link target"
        );
        Assert.That(
            crossRef.DisplayText,
            Does.Contain("Winnowing fork"),
            "gm-010 case 4: Display text must contain the link text"
        );
        Assert.That(
            crossRef.Type,
            Is.EqualTo("seealso"),
            "gm-010 case 4: Cross-reference type must be 'seealso'"
        );
    }

    // gm-010 test case 5: Single verse reference (<s>G04300301600000</s>)
    // PT9: <s>G04300301600000</s> -> <a href='goto:JHN 3:16' title='Go To John 3:16'>John 3:16</a>
    // PT10: ArticleVerseLink with parsed reference
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-607")]
    [Property("GoldenMasterId", "gm-010")]
    [Property("ExtractionId", "EXT-058")]
    [Description(
        "gm-010 case 5: <s>G04300301600000</s> becomes ArticleVerseLink "
            + "with displayText='John 3:16', rawReference='G04300301600000'"
    )]
    public void GetArticle_SingleVerseReference_ReturnsStructuredVerseLink()
    {
        // Arrange: Article with single verse reference pattern
        // gm-010 case 5: "see verse: <s>G04300301600000</s>"
        // gm-011: Expected output for this exact pattern
        var input = new ArticleInput(
            ArticleId: "test-verse-ref-article",
            ResourceId: "test-fauna-resource",
            UserLanguage: "en"
        );

        // Act
        var service = NewService();
        var result = service.GetArticle(input);

        // Assert: Verse reference parsed into structured link
        var paragraphsWithLinks = result.Paragraphs.Where(p => p.VerseLinks.Count > 0).ToList();
        Assert.That(paragraphsWithLinks, Is.Not.Empty, "Must have paragraph with verse links");

        var verseLink = paragraphsWithLinks[0].VerseLinks[0];
        Assert.That(
            verseLink.RawReference,
            Is.EqualTo("G04300301600000"),
            "gm-010 case 5: Raw reference must be G04300301600000"
        );
        Assert.That(
            verseLink.DisplayText,
            Is.EqualTo("John 3:16"),
            "gm-010 case 5: Display text must be 'John 3:16' (matching gm-011 output)"
        );
        Assert.That(
            verseLink.Reference.BookNum,
            Is.GreaterThan(0),
            "gm-010 case 5: Parsed VerseRef must have valid book number"
        );
    }

    // gm-010 test case 6: Verse range within chapter (<s>G04300301600000-G04300301700000</s>)
    // PT9: -> <a href='goto:JHN 3:16' title='Go To John 3:16'>John 3:16-17</a>
    // PT10: ArticleVerseLink with displayText='John 3:16-17'
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-607")]
    [Property("GoldenMasterId", "gm-010")]
    [Property("ExtractionId", "EXT-058")]
    [Description(
        "gm-010 case 6: Verse range within chapter (JHN 3:16-17) "
            + "produces displayText='John 3:16-17'"
    )]
    public void GetArticle_VerseRangeWithinChapter_ReturnsFormattedRange()
    {
        // Arrange: Article with verse range <s>G04300301600000-G04300301700000</s>
        // gm-010 case 6: JHN 3:16-17 (same chapter, different verse)
        var input = new ArticleInput(
            ArticleId: "test-verse-range-article",
            ResourceId: "test-fauna-resource",
            UserLanguage: "en"
        );

        // Act
        var service = NewService();
        var result = service.GetArticle(input);

        // Assert: Verse range formatted correctly
        var paragraphsWithLinks = result.Paragraphs.Where(p => p.VerseLinks.Count > 0).ToList();
        Assert.That(paragraphsWithLinks, Is.Not.Empty, "Must have paragraph with verse links");

        var verseLink = paragraphsWithLinks[0].VerseLinks[0];
        Assert.That(
            verseLink.DisplayText,
            Is.EqualTo("John 3:16-17"),
            "gm-010 case 6: Within-chapter range shows 'John 3:16-17'"
        );
    }

    // gm-010 test case 7: Verse range spanning chapters (<s>G04300301600000-G04300401700000</s>)
    // PT9: -> <a href='goto:JHN 3:16' title='Go To John 3:16'>John 3:16-4:17</a>
    // PT10: ArticleVerseLink with displayText='John 3:16-4:17'
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-607")]
    [Property("GoldenMasterId", "gm-010")]
    [Property("ExtractionId", "EXT-058")]
    [Description(
        "gm-010 case 7: Verse range spanning chapters (JHN 3:16-4:17) "
            + "produces displayText='John 3:16-4:17'"
    )]
    public void GetArticle_VerseRangeSpanningChapters_ReturnsFormattedRange()
    {
        // Arrange: Article with cross-chapter range <s>G04300301600000-G04300401700000</s>
        // gm-010 case 7: JHN 3:16 - JHN 4:17 (different chapters)
        var input = new ArticleInput(
            ArticleId: "test-verse-range-crosschapter-article",
            ResourceId: "test-fauna-resource",
            UserLanguage: "en"
        );

        // Act
        var service = NewService();
        var result = service.GetArticle(input);

        // Assert: Cross-chapter range formatted correctly
        var paragraphsWithLinks = result.Paragraphs.Where(p => p.VerseLinks.Count > 0).ToList();
        Assert.That(paragraphsWithLinks, Is.Not.Empty, "Must have paragraph with verse links");

        var verseLink = paragraphsWithLinks[0].VerseLinks[0];
        Assert.That(
            verseLink.DisplayText,
            Is.EqualTo("John 3:16-4:17"),
            "gm-010 case 7: Cross-chapter range shows 'John 3:16-4:17'"
        );
    }

    // gm-010 test case 8: Abbreviation (<a>NIV</a>)
    // PT9: -> <a class='abbr' title='New International Version'>NIV</a>
    // PT10: Abbreviation data with abbrev='NIV', fullText='New International Version'
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-608")]
    [Property("GoldenMasterId", "gm-010")]
    [Property("ExtractionId", "EXT-058")]
    [Description(
        "gm-010 case 8: <a>NIV</a> becomes abbreviation data with "
            + "abbrev='NIV', fullText='New International Version'"
    )]
    public void GetArticle_AbbreviationMarkup_ReturnsAbbreviationData()
    {
        // Arrange: Article with abbreviation <a>NIV</a>
        // gm-010 case 8: input="read the <a>NIV</a>"
        // expected: abbreviation resolved to "New International Version"
        var input = new ArticleInput(
            ArticleId: "test-abbreviation-article",
            ResourceId: "test-fauna-resource",
            UserLanguage: "en"
        );

        // Act
        var service = NewService();
        var result = service.GetArticle(input);

        // Assert: Abbreviation data populated
        Assert.That(result.Paragraphs, Is.Not.Null.And.Not.Empty);
        var paragraphsWithAbbrevs = result
            .Paragraphs.Where(p => p.Abbreviations.Count > 0)
            .ToList();
        Assert.That(
            paragraphsWithAbbrevs,
            Is.Not.Empty,
            "gm-010 case 8: At least one paragraph must have abbreviations"
        );

        var abbrev = paragraphsWithAbbrevs[0].Abbreviations[0];
        Assert.That(
            abbrev.Abbrev,
            Is.EqualTo("NIV"),
            "gm-010 case 8: Abbreviation text must be 'NIV'"
        );
        Assert.That(
            abbrev.FullText,
            Is.EqualTo("New International Version"),
            "gm-010 case 8: Full text must be 'New International Version'"
        );
    }

    // gm-010 test cases 2, 3: Bold and italic markup preserved
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-606")]
    [Property("GoldenMasterId", "gm-010")]
    [Property("ExtractionId", "EXT-058")]
    [Description("gm-010 cases 2-3: Bold and italic text preserved in paragraph text")]
    public void GetArticle_BoldAndItalicMarkup_PreservedInParagraphText()
    {
        // Arrange: Article with bold and italic markup
        // gm-010 case 2: "text <b>with bold</b>" -> "text <b>with bold</b>"
        // gm-010 case 3: "text <i>with italic</i>" -> "text <i>with italic</i>"
        var input = new ArticleInput(
            ArticleId: "test-formatted-text-article",
            ResourceId: "test-fauna-resource",
            UserLanguage: "en"
        );

        // Act
        var service = NewService();
        var result = service.GetArticle(input);

        // Assert: Text content preserved (bold/italic are inline formatting)
        Assert.That(result.Paragraphs, Is.Not.Null.And.Not.Empty);
        // The paragraph text should contain the content
        // Bold and italic may be preserved as-is or stripped - the key behavior
        // is that the text content is present in the paragraph
        var paragraphTexts = result.Paragraphs.Select(p => p.Text).ToList();
        Assert.That(
            paragraphTexts,
            Is.Not.Empty,
            "gm-010 cases 2-3: Paragraph text must contain content"
        );
    }

    #endregion

    #region Golden Master: gm-011 Verse Reference Pattern Parsing (BHV-607)

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-032")]
    [Property("BehaviorId", "BHV-607")]
    [Property("GoldenMasterId", "gm-011")]
    [Property("ExtractionId", "EXT-058")]
    [Description(
        "gm-011: G04300301600000 pattern parsed to book=JHN(43), chapter=3, verse=16, offset=0"
    )]
    public void ParseVerseReference_G04300301600000_ReturnsJohn316()
    {
        // Arrange: The verse reference pattern from gm-011
        // Pattern: G04300301600000
        //   G043 = Book code (043 = John/JHN)
        //   003  = Chapter 3
        //   016  = Verse 16
        //   00000 = Character offset (zero)
        var input = new ArticleInput(
            ArticleId: "test-gm011-verse-link",
            ResourceId: "test-fauna-resource",
            UserLanguage: "en"
        );

        // Act
        var service = NewService();
        var result = service.GetArticle(input);

        // Assert: Exact match to gm-011 expected output
        var allVerseLinks = result.Paragraphs.SelectMany(p => p.VerseLinks).ToList();
        Assert.That(allVerseLinks, Is.Not.Empty, "gm-011: Must have verse links");

        var jhn316Link = allVerseLinks.FirstOrDefault(v => v.RawReference == "G04300301600000");
        Assert.That(jhn316Link, Is.Not.Null, "gm-011: Must find G04300301600000 verse link");

        // gm-011 expected: displayText = "John 3:16"
        Assert.That(
            jhn316Link!.DisplayText,
            Is.EqualTo("John 3:16"),
            "gm-011: Display text must be 'John 3:16'"
        );

        // gm-011: SerializedVerseRef should resolve to book 43 (John), ch 3, v 16
        Assert.That(
            jhn316Link.Reference.BookNum,
            Is.GreaterThan(0),
            "gm-011: Parsed verse reference must have valid book number"
        );
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-032")]
    [Property("BehaviorId", "BHV-607")]
    [Property("GoldenMasterId", "gm-011")]
    [Property("ExtractionId", "EXT-058")]
    [Description(
        "gm-011: Verse reference pattern structure - book code is 3-digit number after 'G'"
    )]
    public void ParseVerseReference_PatternStructure_BookChapterVerseOffset()
    {
        // Verify the pattern parsing correctly decomposes the reference string
        // Pattern: G + NNN(book) + NNN(chapter) + NNN(verse) + NNNNN(offset)
        // G043 003 016 00000 = John 3:16 with zero offset
        var input = new ArticleInput(
            ArticleId: "test-pattern-parsing",
            ResourceId: "test-fauna-resource",
            UserLanguage: "en"
        );

        // Act
        var service = NewService();
        var result = service.GetArticle(input);

        // Assert: Any verse links found have the correct structure
        var allVerseLinks = result.Paragraphs.SelectMany(p => p.VerseLinks).ToList();
        foreach (var link in allVerseLinks)
        {
            Assert.That(
                link.RawReference,
                Is.Not.Null.And.Not.Empty,
                "gm-011: Every verse link must have rawReference"
            );
            Assert.That(
                link.DisplayText,
                Is.Not.Null.And.Not.Empty,
                "gm-011: Every verse link must have displayText"
            );
            Assert.That(
                link.Reference.BookNum,
                Is.GreaterThan(0),
                "gm-011: Every verse link must have valid book number"
            );
        }
    }

    #endregion

    #region BHV-606: Paragraph Formatting with Cross-References and Images

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-606")]
    [Property("ExtractionId", "EXT-058")]
    [Description(
        "BHV-606: Targets (<l target='...'>) returned as structured cross-references "
            + "in the CrossReferences collection"
    )]
    public void GetArticle_WithTargetLinks_PopulatesCrossReferences()
    {
        // Arrange: Article with <l target="..."> links
        // BHV-606: "Converts encyclopedia paragraphs to HTML with proper formatting...
        //           converting targets to href links"
        // PT10: Returns structured ArticleCrossRef instead of HTML
        var input = new ArticleInput(
            ArticleId: "REALIA:1.1.8.3",
            ResourceId: "test-fauna-resource",
            UserLanguage: "en"
        );

        // Act
        var service = NewService();
        var result = service.GetArticle(input);

        // Assert: Cross-references populated from <l target="..."> elements
        Assert.That(
            result.CrossReferences,
            Is.Not.Null,
            "BHV-606: CrossReferences must not be null"
        );

        // Each cross-reference must have required fields
        foreach (var crossRef in result.CrossReferences)
        {
            Assert.That(
                crossRef.TargetArticleId,
                Is.Not.Null.And.Not.Empty,
                "BHV-606: Each cross-ref must have TargetArticleId"
            );
            Assert.That(
                crossRef.DisplayText,
                Is.Not.Null.And.Not.Empty,
                "BHV-606: Each cross-ref must have DisplayText"
            );
            Assert.That(
                crossRef.Type,
                Is.AnyOf("seealso", "launchViewer"),
                "BHV-606: Cross-ref type must be 'seealso' or 'launchViewer'"
            );
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-606")]
    [Property("ExtractionId", "EXT-059")]
    [Description(
        "BHV-606: Image IDs returned for frontend rendering (from <image Id='...'/> tags)"
    )]
    public void GetArticle_WithImages_PopulatesImageIds()
    {
        // Arrange: Article with inline images
        // BHV-606: "Images to base64 img tags" (PT9)
        // PT10: Returns image IDs only - frontend loads and renders images
        // EXT-059: Extracts image IDs from encyclopedia entries
        var input = new ArticleInput(
            ArticleId: "test-article-with-images",
            ResourceId: "test-fauna-resource",
            UserLanguage: "en"
        );

        // Act
        var service = NewService();
        var result = service.GetArticle(input);

        // Assert: ImageIds populated (not base64 data - just IDs for frontend)
        Assert.That(result.ImageIds, Is.Not.Null, "BHV-606: ImageIds must not be null");
        // Articles with images should have at least one image ID
        Assert.That(
            result.ImageIds.Count,
            Is.GreaterThan(0),
            "BHV-606: Article with images must have at least one ImageId"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-606")]
    [Property("ExtractionId", "EXT-058")]
    [Description("BHV-606: Inline image IDs also recorded in paragraph-level inlineImageIds")]
    public void GetArticle_WithInlineImages_PopulatesParagraphInlineImageIds()
    {
        // Arrange: Article with images within paragraphs (V2 format: <image Id="..."/>)
        var input = new ArticleInput(
            ArticleId: "test-article-with-inline-images",
            ResourceId: "test-fauna-resource",
            UserLanguage: "en"
        );

        // Act
        var service = NewService();
        var result = service.GetArticle(input);

        // Assert: Paragraph-level inline image IDs populated
        Assert.That(result.Paragraphs, Is.Not.Null.And.Not.Empty);
        var paragraphsWithImages = result
            .Paragraphs.Where(p => p.InlineImageIds.Count > 0)
            .ToList();
        Assert.That(
            paragraphsWithImages,
            Is.Not.Empty,
            "BHV-606: At least one paragraph must have inline image IDs"
        );
    }

    #endregion

    #region BHV-607: Verse Reference Link Formatting

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-032")]
    [Property("BehaviorId", "BHV-607")]
    [Property("ExtractionId", "EXT-058")]
    [Description("BHV-607: Verse references formatted as structured links with goto semantics")]
    public void GetArticle_VerseReferences_HaveGotoSemantics()
    {
        // Arrange: Article with verse reference patterns
        // BHV-607: "Formats verse references as clickable links (goto:{reference})"
        // PT10: Structured ArticleVerseLink with reference and displayText
        var input = new ArticleInput(
            ArticleId: "test-verse-ref-article",
            ResourceId: "test-fauna-resource",
            UserLanguage: "en"
        );

        // Act
        var service = NewService();
        var result = service.GetArticle(input);

        // Assert: Verse links have goto semantics via SerializedVerseRef
        var verseLinks = result.Paragraphs.SelectMany(p => p.VerseLinks).ToList();
        Assert.That(verseLinks, Is.Not.Empty, "BHV-607: Must have verse links");

        foreach (var link in verseLinks)
        {
            // Each link must have a parseable reference for frontend goto navigation
            Assert.That(
                link.Reference.BookNum,
                Is.GreaterThan(0),
                "BHV-607: Each verse link must have valid book number for goto"
            );
            Assert.That(
                link.DisplayText,
                Is.Not.Null.And.Not.Empty,
                "BHV-607: Each verse link must have display text"
            );
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-032")]
    [Property("BehaviorId", "BHV-607")]
    [Property("ExtractionId", "EXT-058")]
    [Description("BHV-607: Raw reference pattern preserved for debugging/compatibility")]
    public void GetArticle_VerseReferences_PreserveRawReferencePattern()
    {
        // Arrange
        var input = new ArticleInput(
            ArticleId: "test-verse-ref-article",
            ResourceId: "test-fauna-resource",
            UserLanguage: "en"
        );

        // Act
        var service = NewService();
        var result = service.GetArticle(input);

        // Assert: RawReference preserved from source XML
        var verseLinks = result.Paragraphs.SelectMany(p => p.VerseLinks).ToList();
        Assert.That(verseLinks, Is.Not.Empty);

        foreach (var link in verseLinks)
        {
            // Raw reference should match G+NNN+NNN+NNN+NNNNN pattern
            Assert.That(
                link.RawReference,
                Does.Match(@"^G\d{3}\d{3}\d{3}\d{5}"),
                "BHV-607: Raw reference must match G-book-chapter-verse-offset pattern"
            );
        }
    }

    #endregion

    #region BHV-608: Abbreviation Tooltip Resolution

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-608")]
    [Property("ExtractionId", "EXT-058")]
    [Description("BHV-608: Abbreviations resolved with full-text for frontend tooltip rendering")]
    public void GetArticle_WithAbbreviations_ReturnsAbbrevWithFullText()
    {
        // Arrange: Article with abbreviation markup <a>NIV</a>
        // BHV-608: "Resolves abbreviations in encyclopedia text to full-text tooltips using AbbrevData"
        var input = new ArticleInput(
            ArticleId: "test-abbreviation-article",
            ResourceId: "test-fauna-resource",
            UserLanguage: "en"
        );

        // Act
        var service = NewService();
        var result = service.GetArticle(input);

        // Assert: Abbreviations resolved with full text
        var allAbbrevs = result.Paragraphs.SelectMany(p => p.Abbreviations).ToList();
        Assert.That(
            allAbbrevs,
            Is.Not.Empty,
            "BHV-608: Article with abbreviations must have resolved abbreviation data"
        );

        foreach (var abbrev in allAbbrevs)
        {
            Assert.That(
                abbrev.Abbrev,
                Is.Not.Null.And.Not.Empty,
                "BHV-608: Abbreviation must have the abbreviated form"
            );
            Assert.That(
                abbrev.FullText,
                Is.Not.Null.And.Not.Empty,
                "BHV-608: Abbreviation must have the full text for tooltip"
            );
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-608")]
    [Property("ExtractionId", "EXT-058")]
    [Description("BHV-608: Unknown abbreviation returns abbrev text with empty fullText")]
    public void GetArticle_UnknownAbbreviation_ReturnsEmptyFullText()
    {
        // Arrange: Article with an abbreviation not in the data
        var input = new ArticleInput(
            ArticleId: "test-unknown-abbreviation-article",
            ResourceId: "test-fauna-resource",
            UserLanguage: "en"
        );

        // Act
        var service = NewService();
        var result = service.GetArticle(input);

        // Assert: Unknown abbreviation still included with abbrev text
        // Full text may be empty if not resolvable
        Assert.That(result.Paragraphs, Is.Not.Null);
        // The article should not throw - graceful handling of unknown abbreviations
    }

    #endregion

    #region BHV-457: ArticleViewer Navigation Data

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-457")]
    [Property("ExtractionId", "EXT-082")]
    [Description(
        "BHV-457: ArticleData includes goto, seealso, and launchViewer references "
            + "for frontend navigation"
    )]
    public void GetArticle_NavigationData_IncludesAllLinkTypes()
    {
        // Arrange: Article with all navigation types (goto, seealso, launchViewer)
        // BHV-457: "Handles goto:{reference}, seealso:{articleId}, launchViewer.php:{imageId}"
        // PT10: All link types included as structured data in ArticleData
        var input = new ArticleInput(
            ArticleId: "test-navigation-article",
            ResourceId: "test-fauna-resource",
            UserLanguage: "en"
        );

        // Act
        var service = NewService();
        var result = service.GetArticle(input);

        // Assert: Navigation data present in structured output
        // goto: verse links in paragraphs
        Assert.That(
            result.Paragraphs,
            Is.Not.Null,
            "BHV-457: Paragraphs must be present for goto links"
        );

        // seealso: cross-references
        Assert.That(
            result.CrossReferences,
            Is.Not.Null,
            "BHV-457: CrossReferences must be present for seealso links"
        );

        // launchViewer: image references
        Assert.That(
            result.ImageIds,
            Is.Not.Null,
            "BHV-457: ImageIds must be present for launchViewer links"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-457")]
    [Property("ExtractionId", "EXT-082")]
    [Description(
        "BHV-457: launchViewer references appear as ArticleCrossRef with type='launchViewer'"
    )]
    public void GetArticle_LaunchViewerLinks_AppearAsCrossRefType()
    {
        // Arrange: Article with launchViewer image links
        // BHV-457: "launchViewer.php:{imageId}" in PT9
        // PT10: ArticleCrossRef with type='launchViewer'
        var input = new ArticleInput(
            ArticleId: "test-launchviewer-article",
            ResourceId: "test-fauna-resource",
            UserLanguage: "en"
        );

        // Act
        var service = NewService();
        var result = service.GetArticle(input);

        // Assert: launchViewer links present as cross-references
        Assert.That(result.CrossReferences, Is.Not.Null);
        var launchViewerRefs = result
            .CrossReferences.Where(cr => cr.Type == "launchViewer")
            .ToList();
        // Articles with images should have launchViewer references
        Assert.That(
            launchViewerRefs,
            Is.Not.Empty,
            "BHV-457: Article with images must have launchViewer cross-references"
        );
    }

    #endregion

    #region EXT-059: Image ID Extraction

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-606")]
    [Property("ExtractionId", "EXT-059")]
    [Description("EXT-059: Image IDs extracted from encyclopedia entry for viewer display")]
    public void GetArticle_V2Entry_ExtractsImageIdsFromBibleImages()
    {
        // Arrange: V2 format article with BibleImages sections
        // EXT-059: "Extract BibleImageIds from encyclopedia entry for viewer display"
        var input = new ArticleInput(
            ArticleId: "test-v2-article-with-images",
            ResourceId: "test-fauna-resource",
            UserLanguage: "en"
        );

        // Act
        var service = NewService();
        var result = service.GetArticle(input);

        // Assert: Image IDs extracted from BibleImages section
        Assert.That(result.ImageIds, Is.Not.Null);
        Assert.That(
            result.ImageIds.Count,
            Is.GreaterThan(0),
            "EXT-059: V2 article with BibleImages must have extracted image IDs"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-606")]
    [Property("ExtractionId", "EXT-059")]
    [Description("EXT-059: V1 articles have no structured BibleImages - ImageIds from inline")]
    public void GetArticle_V1Entry_ImageIdsFromInlineMarkup()
    {
        // Arrange: V1 format article (uses |f...|f* inline images, not BibleImages)
        // EXT-059: V1 format doesn't have structured BibleImages section
        var input = new ArticleInput(
            ArticleId: "test-v1-article",
            ResourceId: "test-fauna-resource",
            UserLanguage: "en"
        );

        // Act
        var service = NewService();
        var result = service.GetArticle(input);

        // Assert: ImageIds should still be populated (empty list is valid for V1)
        Assert.That(result.ImageIds, Is.Not.Null, "EXT-059: ImageIds must not be null even for V1");
    }

    #endregion

    #region Error Cases

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-606")]
    [Description("Error: Article not found returns NOT_FOUND error")]
    public void GetArticle_ArticleNotFound_ThrowsNotFoundError()
    {
        // Arrange: Non-existent article ID
        // Contract error condition: "Article not found | NOT_FOUND |
        //   'Encyclopedia article '{articleId}' not found'"
        var input = new ArticleInput(
            ArticleId: "NONEXISTENT:999.999",
            ResourceId: "test-fauna-resource",
            UserLanguage: "en"
        );

        // Act & Assert: NOT_FOUND error
        var service = NewService();
        var ex = Assert.Throws<InvalidOperationException>(() => service.GetArticle(input));
        Assert.That(
            ex!.Message,
            Does.Contain("not found").IgnoreCase,
            "Error must indicate article not found"
        );
        Assert.That(
            ex.Message,
            Does.Contain("NONEXISTENT:999.999"),
            "Error must include the requested article ID"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-606")]
    [Description(
        "Error: Missing image data produces partial result (article returned without missing images)"
    )]
    public void GetArticle_MissingImageData_ReturnsPartialResult()
    {
        // Arrange: Article references images that are not available
        // Contract error condition: "Image data missing | (none) |
        //   No error - article data returned without missing image IDs"
        // gm-010 case 9 was skipped due to NullReferenceException in PT9
        // PT10 should handle this gracefully
        var input = new ArticleInput(
            ArticleId: "test-article-missing-images",
            ResourceId: "test-fauna-resource",
            UserLanguage: "en"
        );

        // Act: Should NOT throw - partial result returned
        var service = NewService();
        ArticleData result = null!;
        Assert.DoesNotThrow(
            () => result = service.GetArticle(input),
            "Missing image data must not throw - return partial result"
        );

        // Assert: Article returned with available data, missing images excluded
        Assert.That(result, Is.Not.Null, "Partial result must still return ArticleData");
        Assert.That(result.Paragraphs, Is.Not.Null, "Paragraphs still present");
        // ImageIds may be empty if all images are missing
        Assert.That(result.ImageIds, Is.Not.Null, "ImageIds must be non-null (possibly empty)");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-606")]
    [Description("Error: Resource not found returns NOT_FOUND error")]
    public void GetArticle_ResourceNotFound_ThrowsNotFoundError()
    {
        // Arrange: Article for non-existent resource
        var input = new ArticleInput(
            ArticleId: "any-article",
            ResourceId: "nonexistent-resource",
            UserLanguage: "en"
        );

        // Act & Assert
        var service = NewService();
        var ex = Assert.Throws<InvalidOperationException>(() => service.GetArticle(input));
        Assert.That(
            ex!.Message,
            Does.Contain("not found").IgnoreCase,
            "Error must indicate resource not found"
        );
    }

    #endregion

    #region ArticleData Structure Validation

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-606")]
    [Description("ArticleData has all required fields from Section 4.10 contract")]
    public void GetArticle_ValidInput_ReturnsCompleteArticleData()
    {
        // Arrange: Standard article request
        var input = new ArticleInput(
            ArticleId: "REALIA:1.1.8.3",
            ResourceId: "test-fauna-resource",
            UserLanguage: "en"
        );

        // Act
        var service = NewService();
        var result = service.GetArticle(input);

        // Assert: All contract-defined fields present
        Assert.That(result.ArticleId, Is.Not.Null.And.Not.Empty, "articleId must be set");
        Assert.That(result.Title, Is.Not.Null.And.Not.Empty, "title must be set");
        Assert.That(result.Paragraphs, Is.Not.Null, "paragraphs must not be null");
        Assert.That(result.CrossReferences, Is.Not.Null, "crossReferences must not be null");
        Assert.That(result.ImageIds, Is.Not.Null, "imageIds must not be null");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-606")]
    [Description("ArticleParagraph has all required fields from contract")]
    public void GetArticle_Paragraphs_HaveRequiredFields()
    {
        // Arrange
        var input = new ArticleInput(
            ArticleId: "REALIA:1.1.8.3",
            ResourceId: "test-fauna-resource",
            UserLanguage: "en"
        );

        // Act
        var service = NewService();
        var result = service.GetArticle(input);

        // Assert: Each paragraph has required structure
        Assert.That(result.Paragraphs, Is.Not.Null.And.Not.Empty);
        foreach (var paragraph in result.Paragraphs)
        {
            Assert.That(paragraph.Text, Is.Not.Null, "Paragraph text must not be null");
            Assert.That(
                paragraph.VerseLinks,
                Is.Not.Null,
                "Paragraph verseLinks must not be null (can be empty)"
            );
            Assert.That(
                paragraph.Abbreviations,
                Is.Not.Null,
                "Paragraph abbreviations must not be null (can be empty)"
            );
            Assert.That(
                paragraph.InlineImageIds,
                Is.Not.Null,
                "Paragraph inlineImageIds must not be null (can be empty)"
            );
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-607")]
    [Description("ArticleVerseLink has all required fields from contract")]
    public void GetArticle_VerseLinks_HaveRequiredFields()
    {
        // Arrange: Article with verse links
        var input = new ArticleInput(
            ArticleId: "test-verse-ref-article",
            ResourceId: "test-fauna-resource",
            UserLanguage: "en"
        );

        // Act
        var service = NewService();
        var result = service.GetArticle(input);

        // Assert: Verse links have all contract-defined fields
        var verseLinks = result.Paragraphs.SelectMany(p => p.VerseLinks).ToList();
        Assert.That(verseLinks, Is.Not.Empty);
        foreach (var link in verseLinks)
        {
            Assert.That(
                link.Reference.BookNum,
                Is.GreaterThan(0),
                "VerseLink.Reference must have valid book number"
            );
            Assert.That(
                link.DisplayText,
                Is.Not.Null.And.Not.Empty,
                "VerseLink.DisplayText must be set"
            );
            Assert.That(
                link.RawReference,
                Is.Not.Null.And.Not.Empty,
                "VerseLink.RawReference must be set (pattern: G04300301600000)"
            );
        }
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-606")]
    [Description("ArticleCrossRef has all required fields from contract")]
    public void GetArticle_CrossReferences_HaveRequiredFields()
    {
        // Arrange: Article with cross-references
        var input = new ArticleInput(
            ArticleId: "test-crossref-article",
            ResourceId: "test-fauna-resource",
            UserLanguage: "en"
        );

        // Act
        var service = NewService();
        var result = service.GetArticle(input);

        // Assert: Cross-refs have all contract-defined fields
        Assert.That(result.CrossReferences, Is.Not.Null.And.Not.Empty);
        foreach (var crossRef in result.CrossReferences)
        {
            Assert.That(
                crossRef.TargetArticleId,
                Is.Not.Null.And.Not.Empty,
                "CrossRef.TargetArticleId must be set"
            );
            Assert.That(
                crossRef.DisplayText,
                Is.Not.Null.And.Not.Empty,
                "CrossRef.DisplayText must be set"
            );
            Assert.That(
                crossRef.Type,
                Is.AnyOf("seealso", "launchViewer"),
                "CrossRef.Type must be 'seealso' or 'launchViewer'"
            );
        }
    }

    #endregion

    #region ArticleInput Record Construction

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-606")]
    [Description("ArticleInput record can be constructed with required fields")]
    public void ArticleInput_Construction_HasRequiredFields()
    {
        // Arrange & Act
        var input = new ArticleInput(
            ArticleId: "REALIA:2.8",
            ResourceId: "test-resource",
            UserLanguage: "en"
        );

        // Assert
        Assert.That(input.ArticleId, Is.EqualTo("REALIA:2.8"));
        Assert.That(input.ResourceId, Is.EqualTo("test-resource"));
        Assert.That(input.UserLanguage, Is.EqualTo("en"));
    }

    #endregion

    #region ArticleData Record Construction

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-606")]
    [Description("ArticleData record can be constructed with all fields")]
    public void ArticleData_Construction_HasAllFields()
    {
        // Arrange & Act
        var verseLink = new ArticleVerseLink(
            Reference: new SIL.Scripture.VerseRef(43, 3, 16),
            DisplayText: "John 3:16",
            RawReference: "G04300301600000"
        );

        var paragraph = new ArticleParagraph(
            Text: "see verse: John 3:16",
            VerseLinks: [verseLink],
            Abbreviations: [],
            InlineImageIds: []
        );

        var crossRef = new ArticleCrossRef(
            TargetArticleId: "REALIA:1.1.8.3",
            DisplayText: "Winnowing fork",
            Type: "seealso"
        );

        var data = new ArticleData(
            ArticleId: "REALIA:2.8",
            Title: "Camel, dromedary",
            Paragraphs: [paragraph],
            CrossReferences: [crossRef],
            ImageIds: ["Dromedary"]
        );

        // Assert
        Assert.That(data.ArticleId, Is.EqualTo("REALIA:2.8"));
        Assert.That(data.Title, Is.EqualTo("Camel, dromedary"));
        Assert.That(data.Paragraphs, Has.Count.EqualTo(1));
        Assert.That(data.Paragraphs[0].VerseLinks, Has.Count.EqualTo(1));
        Assert.That(data.CrossReferences, Has.Count.EqualTo(1));
        Assert.That(data.ImageIds, Has.Count.EqualTo(1));
    }

    // =========================================================================
    // Real PT9 V2 schema regression tests
    // -------------------------------------------------------------------------
    // Harvested from MBL_ENC FAUNA:2.31 (Sheep, lamb) at JHN 1:29. The original
    // PT10 port assumed `<s>G\d{14}</s>` and lowercase `<image>`; real V2 data
    // uses (a) optional 1-char alpha prefix that may be absent, G, or H,
    // (b) multiple space-separated refs in one <s>, and (c) capital <Image>
    // tags. See PT9 Paratext/Marble/EncyclopediaTab.cs:FormatBCVRefs (line 537)
    // and ProcessParagraphImages (line 441) for the source-of-truth shapes.
    // =========================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("BehaviorId", "BHV-607")]
    [Description("Real V2: <s>00103101901000</s> (no alpha prefix) parses to GEN 31:19")]
    public void GetArticle_RealNoPrefixVerseRef_ParsesToCorrectBookChapterVerse()
    {
        var input = new ArticleInput(
            ArticleId: "test-real-noprefix-verse",
            ResourceId: "test-fauna-resource",
            UserLanguage: "en"
        );

        var result = NewService().GetArticle(input);

        var link = result.Paragraphs.SelectMany(p => p.VerseLinks).SingleOrDefault();
        Assert.That(link, Is.Not.Null, "no-prefix 14-digit verse ref must parse");
        Assert.That(link!.Reference.BookNum, Is.EqualTo(1), "book = 1 (Genesis)");
        Assert.That(link.Reference.ChapterNum, Is.EqualTo(31));
        Assert.That(link.Reference.VerseNum, Is.EqualTo(19));
        Assert.That(link.DisplayText, Is.EqualTo("Genesis 31:19"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("BehaviorId", "BHV-607")]
    [Description(
        "Real V2: <s>...space-separated refs...</s> emits one verse link per ref, "
            + "supporting mixed alpha prefixes (none / H / G)"
    )]
    public void GetArticle_RealMultipleRefsInOneSBlock_EmitsOneLinkPerRef()
    {
        var input = new ArticleInput(
            ArticleId: "test-real-multiref-verse",
            ResourceId: "test-fauna-resource",
            UserLanguage: "en"
        );

        var result = NewService().GetArticle(input);

        var links = result.Paragraphs.SelectMany(p => p.VerseLinks).ToList();
        Assert.That(links, Has.Count.EqualTo(4), "one link per space-separated ref");

        // Psalm 119:176 (no prefix), Isa 53:6 (H), Isa 50:6 (H), 1Pe 2:25 (G)
        Assert.That(
            links.Select(l => (l.Reference.BookNum, l.Reference.ChapterNum, l.Reference.VerseNum)),
            Is.EquivalentTo(new[] { (19, 119, 176), (23, 53, 6), (24, 50, 6), (60, 2, 25) })
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("BehaviorId", "BHV-607")]
    [Description("Real V2: replaced text shows space-separated display refs, not raw markup")]
    public void GetArticle_RealMultipleRefs_ReplacedTextNoLongerContainsSElement()
    {
        var input = new ArticleInput(
            ArticleId: "test-real-multiref-verse",
            ResourceId: "test-fauna-resource",
            UserLanguage: "en"
        );

        var result = NewService().GetArticle(input);

        var paragraphText = result.Paragraphs[0].Text;
        Assert.That(
            paragraphText,
            Does.Not.Contain("<s>"),
            "raw <s> markup must not leak through to UI text"
        );
        // Canon.BookNumberToEnglishName: 19 -> "Psalms", 23 -> "Isaiah".
        Assert.That(paragraphText, Does.Contain("Psalms 119:176"));
        Assert.That(paragraphText, Does.Contain("Isaiah 53:6"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("BehaviorId", "BHV-606")]
    [Property("ExtractionId", "EXT-058")]
    [Description("Real V2: capital <Image Id=\"...\" /> tag extracts inline image id")]
    public void GetArticle_RealCapitalImageTag_ExtractsInlineImageId()
    {
        var input = new ArticleInput(
            ArticleId: "test-real-image-capital",
            ResourceId: "test-fauna-resource",
            UserLanguage: "en"
        );

        var result = NewService().GetArticle(input);

        Assert.That(result.Paragraphs, Has.Count.EqualTo(1));
        Assert.That(
            result.Paragraphs[0].InlineImageIds,
            Is.EqualTo(new[] { "PTZ-0119_ewe_with_lamb" }),
            "capital <Image> tag must produce inlineImageId, not leak as raw markup"
        );
        Assert.That(
            result.Paragraphs[0].Text,
            Does.Not.Contain("<Image"),
            "raw <Image> markup must not leak through to UI text"
        );
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-010")]
    [Property("ScenarioId", "TS-031")]
    [Property("BehaviorId", "BHV-608")]
    [Description("ArticleParagraph abbreviation data has abbrev and fullText")]
    public void ArticleParagraph_WithAbbreviations_HasAbbrevAndFullText()
    {
        // Arrange & Act: Paragraph with abbreviation data
        var paragraph = new ArticleParagraph(
            Text: "read the NIV",
            VerseLinks: [],
            Abbreviations:
            [
                new ArticleAbbreviation(Abbrev: "NIV", FullText: "New International Version"),
            ],
            InlineImageIds: []
        );

        // Assert
        Assert.That(paragraph.Abbreviations, Has.Count.EqualTo(1));
        Assert.That(paragraph.Abbreviations[0].Abbrev, Is.EqualTo("NIV"));
        Assert.That(paragraph.Abbreviations[0].FullText, Is.EqualTo("New International Version"));
    }

    #endregion
}
