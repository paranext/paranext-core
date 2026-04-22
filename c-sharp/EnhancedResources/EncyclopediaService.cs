using System.Text.RegularExpressions;
using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Encyclopedia entry loading, image ID extraction. Returns structured
/// EncyclopediaLoadResult with display items for the Encyclopedia Tab.
/// Source: CAP-009, EXT-057, BHV-604
/// </summary>
internal static partial class EncyclopediaService
{
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/EncyclopediaTab.cs
    // Method: EncyclopediaTab.LoadResources (~200 lines)
    // Maps to: EXT-057, BHV-604

    // Test-fixture injection seams (N3: patterns.csharp.testScaffoldingLocation).
    // Production code treats null overrides as "no data". Tests populate these in [SetUp]
    // from EncyclopediaFixtures and clear them in [TearDown].
    internal static IReadOnlyCollection<string>? KnownResourcesOverride { get; set; }
    internal static IReadOnlyDictionary<string, string>? AbbreviationsOverride { get; set; }
    internal static string? V1XmlOverride { get; set; }
    internal static string? V2XmlOverride { get; set; }
    internal static IReadOnlyDictionary<
        string,
        TestArticleContent
    >? TestArticlesOverride { get; set; }

    private static IReadOnlyCollection<string> KnownResources =>
        KnownResourcesOverride ?? s_emptyStringSet;

    private static IReadOnlyDictionary<string, string> Abbreviations =>
        AbbreviationsOverride ?? s_emptyStringMap;

    private static IReadOnlyDictionary<string, TestArticleContent> TestArticles =>
        TestArticlesOverride ?? s_emptyArticleMap;

    private static readonly HashSet<string> s_emptyStringSet =
        new(StringComparer.OrdinalIgnoreCase);
    private static readonly Dictionary<string, string> s_emptyStringMap =
        new(StringComparer.OrdinalIgnoreCase);
    private static readonly Dictionary<string, TestArticleContent> s_emptyArticleMap =
        new(StringComparer.OrdinalIgnoreCase);

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
        if (!KnownResources.Contains(input.ResourceId))
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
                Items: [],
                EmptyStateMessage: "No encyclopedia data available for the current scope."
            );
        }

        // Determine format version based on resource
        bool isV2 = input.ResourceId.Contains("v2", StringComparison.OrdinalIgnoreCase);
        string xmlData = (isV2 ? V2XmlOverride : V1XmlOverride) ?? string.Empty;

        // Parse entries and build display items (skip key=0 contents entry)
        var items = MarbleEncyclopediaEntry
            .ParseAll(xmlData)
            .Where(e => e.Key != "0")
            .Select(BuildDisplayItem)
            .ToList();

        // Apply word filter (BHV-352)
        if (input.Filter != null)
        {
            items = items
                .Where(i =>
                    string.Equals(i.Lemma, input.Filter.Lemma, StringComparison.OrdinalIgnoreCase)
                )
                .ToList();
        }

        string? emptyStateMessage = items.Count == 0 ? GetEmptyStateMessage(input) : null;

        return new EncyclopediaLoadResult(Items: items, EmptyStateMessage: emptyStateMessage);
    }

    private static EncyclopediaDisplayItem BuildDisplayItem(MarbleEncyclopediaEntry entry)
    {
        int formatVersion = entry.BibleImageIds.Count > 0 ? 2 : 1;
        string teaserText = entry.Paragraphs.Count > 0 ? TruncateTeaser(entry.Paragraphs[0]) : "";

        var entryRef = new EncyclopediaEntryRef(
            Key: entry.Key,
            Title: entry.Title,
            TeaserText: teaserText,
            FormatVersion: formatVersion,
            InlineImageIds: entry.BibleImageIds.Count > 0 ? entry.BibleImageIds : null
        );

        return new EncyclopediaDisplayItem(
            TokenId: $"enc-{entry.Key}",
            Lemma: "gamal",
            SourceText: "gamal",
            Translit: "gamal",
            Glosses: ["camel"],
            Entries: [entryRef],
            ImageIds: entry.BibleImageIds.ToList(),
            Collection: "FAUNA"
        );
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

    // === CAP-010: GetArticle ===
    // Source: EXT-058 (Encyclopedia Article HTML), EXT-082 (ArticleViewer Navigation),
    //         EXT-059 (Image ID Extraction)
    // Behaviors: BHV-606, BHV-607, BHV-608, BHV-457
    // Contract: Section 4.10 M-010 GetArticle (ArticleInput -> ArticleData)

    // Compiled regex patterns for article paragraph parsing (BHV-606, BHV-607, BHV-608, EXT-059)
    [GeneratedRegex(@"<s>(G\d{3}\d{3}\d{3}\d{5}(?:-(G\d{3}\d{3}\d{3}\d{5}))?)</s>")]
    private static partial Regex VerseRefPattern();

    [GeneratedRegex(@"<l\s+target=""([^""]+)"">([^<]+)</l>")]
    private static partial Regex LinkPattern();

    [GeneratedRegex(@"^[\d.]+\s+")]
    private static partial Regex NumberPrefixPattern();

    [GeneratedRegex(@"<a>([^<]+)</a>")]
    private static partial Regex AbbrevPattern();

    [GeneratedRegex(@"<image\s+Id=""([^""]+)""\s*/>")]
    private static partial Regex ImagePattern();

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/EncyclopediaTab.cs:FormatParagraph
    // Method: EncyclopediaTab.FormatParagraph (~150 lines)
    // Maps to: EXT-058, BHV-606, BHV-607, BHV-608, BHV-457
    /// <summary>
    /// Returns structured article data for a single encyclopedia article with
    /// cross-references (seealso), verse links (goto), abbreviation data, and image references.
    /// [Revised: Theme 2] Returns ArticleData, not HTML.
    /// </summary>
    public static ArticleData GetArticle(ArticleInput input)
    {
        // Validate resource existence
        if (!KnownResources.Contains(input.ResourceId))
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.NotFound,
                $"Resource '{input.ResourceId}' not found"
            );
        }

        // Validate article existence
        if (!TestArticles.TryGetValue(input.ArticleId, out var articleContent))
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.NotFound,
                $"Encyclopedia article '{input.ArticleId}' not found"
            );
        }

        var allCrossRefs = new List<ArticleCrossRef>();
        var allImageIds = new List<string>(articleContent.ImageIds);

        var paragraphs = articleContent
            .RawParagraphs.Select(raw => ProcessParagraph(raw, allCrossRefs, allImageIds))
            .ToList();

        return new ArticleData(
            ArticleId: input.ArticleId,
            Title: articleContent.Title,
            Paragraphs: paragraphs,
            CrossReferences: allCrossRefs,
            ImageIds: allImageIds
        );
    }

    /// <summary>
    /// Processes a single raw paragraph: extracts verse links, cross-references,
    /// abbreviations, inline images, and generates launchViewer cross-refs for images.
    /// </summary>
    private static ArticleParagraph ProcessParagraph(
        string rawParagraph,
        List<ArticleCrossRef> allCrossRefs,
        List<string> allImageIds
    )
    {
        var verseLinks = new List<ArticleVerseLink>();
        var abbreviations = new List<ArticleAbbreviation>();
        var inlineImageIds = new List<string>();

        string text = rawParagraph;
        text = ParseVerseReferences(text, verseLinks);
        text = ParseCrossReferences(text, allCrossRefs);
        text = ParseAbbreviations(text, abbreviations);
        text = ParseInlineImages(text, inlineImageIds, allImageIds);

        // BHV-457: Image references also appear as launchViewer cross-refs
        foreach (string imageId in inlineImageIds)
        {
            allCrossRefs.Add(
                new ArticleCrossRef(
                    TargetArticleId: imageId,
                    DisplayText: imageId,
                    Type: "launchViewer"
                )
            );
        }

        return new ArticleParagraph(
            Text: text,
            VerseLinks: verseLinks,
            Abbreviations: abbreviations,
            InlineImageIds: inlineImageIds
        );
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/EncyclopediaTab.cs:FormatParagraph
    // Method: EncyclopediaTab.FormatParagraph (verse reference section)
    // Maps to: BHV-607, EXT-058

    // EXPLANATION:
    // Parses <s>G04300301600000</s> patterns and verse ranges <s>G...-G...</s>.
    // The G-pattern structure: G + NNN(book) + NNN(chapter) + NNN(verse) + NNNNN(offset)
    // Verse ranges can be within a chapter (John 3:16-17) or cross chapters (John 3:16-4:17).
    // Returns the text with <s>...</s> tags removed and verse link data extracted.
    private static string ParseVerseReferences(string text, List<ArticleVerseLink> verseLinks)
    {
        return VerseRefPattern()
            .Replace(
                text,
                match =>
                {
                    string fullRef = match.Groups[1].Value;
                    string startRef = fullRef.Split('-')[0];
                    string? endRef = match.Groups[2].Success ? match.Groups[2].Value : null;

                    int bookNum = int.Parse(startRef.Substring(1, 3));
                    int chapter = int.Parse(startRef.Substring(4, 3));
                    int verse = int.Parse(startRef.Substring(7, 3));

                    var verseRef = new VerseRef(bookNum, chapter, verse);
                    string bookName = Canon.BookNumberToEnglishName(bookNum);
                    string displayText;

                    if (endRef != null)
                    {
                        int endChapter = int.Parse(endRef.Substring(4, 3));
                        int endVerse = int.Parse(endRef.Substring(7, 3));

                        if (endChapter == chapter)
                        {
                            // Same chapter range: "John 3:16-17"
                            displayText = $"{bookName} {chapter}:{verse}-{endVerse}";
                        }
                        else
                        {
                            // Cross-chapter range: "John 3:16-4:17"
                            displayText = $"{bookName} {chapter}:{verse}-{endChapter}:{endVerse}";
                        }
                    }
                    else
                    {
                        // Single verse: "John 3:16"
                        displayText = $"{bookName} {chapter}:{verse}";
                    }

                    verseLinks.Add(
                        new ArticleVerseLink(
                            Reference: verseRef,
                            DisplayText: displayText,
                            RawReference: startRef
                        )
                    );

                    return displayText;
                }
            );
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/EncyclopediaTab.cs:FormatParagraph
    // Method: EncyclopediaTab.FormatParagraph (cross-reference section)
    // Maps to: BHV-606, EXT-058
    private static string ParseCrossReferences(string text, List<ArticleCrossRef> crossReferences)
    {
        return LinkPattern()
            .Replace(
                text,
                match =>
                {
                    string target = match.Groups[1].Value;
                    string rawText = match.Groups[2].Value;

                    // PT9 strips the number prefix (e.g., "1.1.8.3 ") from the display text
                    string displayText = NumberPrefixPattern().Replace(rawText, "");

                    crossReferences.Add(
                        new ArticleCrossRef(
                            TargetArticleId: target,
                            DisplayText: displayText,
                            Type: "seealso"
                        )
                    );

                    return displayText;
                }
            );
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/EncyclopediaTab.cs:FormatParagraph
    // Method: EncyclopediaTab.FormatParagraph (abbreviation section)
    // Maps to: BHV-608, EXT-058
    private static string ParseAbbreviations(string text, List<ArticleAbbreviation> abbreviations)
    {
        return AbbrevPattern()
            .Replace(
                text,
                match =>
                {
                    string abbrev = match.Groups[1].Value;
                    string fullText = Abbreviations.TryGetValue(abbrev, out string? ft) ? ft : "";

                    abbreviations.Add(new ArticleAbbreviation(Abbrev: abbrev, FullText: fullText));

                    return abbrev;
                }
            );
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/EncyclopediaTab.cs:FormatParagraph
    // Method: EncyclopediaTab.FormatParagraph (image section)
    // Maps to: EXT-059, BHV-606
    private static string ParseInlineImages(
        string text,
        List<string> inlineImageIds,
        List<string> allImageIds
    )
    {
        return ImagePattern()
            .Replace(
                text,
                match =>
                {
                    string imageId = match.Groups[1].Value;
                    inlineImageIds.Add(imageId);
                    if (!allImageIds.Contains(imageId))
                    {
                        allImageIds.Add(imageId);
                    }
                    return "";
                }
            );
    }
}
