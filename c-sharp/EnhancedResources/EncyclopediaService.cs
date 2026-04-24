using System.Text.RegularExpressions;
using Paranext.DataProvider.Errors;
using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/EncyclopediaTab.cs (LoadResources, FormatParagraph, GetArticle)
// Maps to: CAP-009 (LoadEncyclopediaResources), CAP-010 (GetArticle),
//          EXT-057, EXT-058, EXT-059, BHV-604, BHV-606, BHV-607, BHV-608, BHV-457, BHV-352
//
// Refactor 2026-04-24: Converted from static class with *Override test seams to
// instance class with primary-constructor-injected EncyclopediaData record. See
// ADR patterns.csharp.serviceComposition. Data arrives pre-split by
// (EncyclopediaEntryType, languageCode) from MarbleEncyclopediaLoader.
internal sealed partial class EncyclopediaService(EncyclopediaData data)
{
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/EncyclopediaTab.cs:LoadResources
    /// <summary>
    /// Loads encyclopedia entries for the current scope, filtered by entry type
    /// (Flora/Fauna/Realia) and user language. Resolves the per-(type, language) slice
    /// of <see cref="EncyclopediaData.EntriesByTypeAndLanguage"/>, applies the optional
    /// word filter, and returns display items for the Encyclopedia Tab.
    /// </summary>
    public EncyclopediaLoadResult LoadResources(EncyclopediaLoadInput input)
    {
        if (!data.KnownResourceIds.Contains(input.ResourceId))
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.NotFound,
                $"Resource '{input.ResourceId}' not found"
            );
        }

        var entries = SelectEntriesForLanguage(input.UserLanguage);

        var items = entries.Where(e => e.Key != "0").Select(BuildDisplayItem).ToList();

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

    // Selects the union of Flora/Fauna/Realia entries for the requested language,
    // falling back to English when the requested language has no slice.
    private IReadOnlyList<MarbleEncyclopediaEntry> SelectEntriesForLanguage(string userLanguage)
    {
        var result = new List<MarbleEncyclopediaEntry>();
        foreach (
            var entryType in new[]
            {
                EncyclopediaEntryType.Flora,
                EncyclopediaEntryType.Fauna,
                EncyclopediaEntryType.Realia,
            }
        )
        {
            if (!data.EntriesByTypeAndLanguage.TryGetValue(entryType, out var byLanguage))
                continue;

            if (byLanguage.TryGetValue(userLanguage, out var entries) && entries.Count > 0)
            {
                result.AddRange(entries);
                continue;
            }
            if (byLanguage.TryGetValue("en", out var fallback) && fallback.Count > 0)
            {
                result.AddRange(fallback);
            }
        }
        return result;
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

    private static string GetEmptyStateMessage(EncyclopediaLoadInput input) =>
        input.Filter != null
            ? $"The word '{input.Filter.Lemma}' does not occur in this range."
            : "No encyclopedia data available for the current scope.";

    private static string TruncateTeaser(string text)
    {
        const int maxLength = 100;
        return text.Length <= maxLength ? text : text[..maxLength] + "...";
    }

    // ========================================================================
    // CAP-010: GetArticle
    // ========================================================================

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
    /// <summary>
    /// Returns structured article data for a single encyclopedia article with
    /// cross-references (seealso), verse links (goto), abbreviation data, and
    /// image references. Theme 2: returns ArticleData, not HTML.
    /// </summary>
    public ArticleData GetArticle(ArticleInput input)
    {
        if (!data.KnownResourceIds.Contains(input.ResourceId))
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.NotFound,
                $"Resource '{input.ResourceId}' not found"
            );
        }

        if (!data.ArticlesById.TryGetValue(input.ArticleId, out var articleContent))
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

    private ArticleParagraph ProcessParagraph(
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
                        displayText =
                            endChapter == chapter
                                ? $"{bookName} {chapter}:{verse}-{endVerse}"
                                : $"{bookName} {chapter}:{verse}-{endChapter}:{endVerse}";
                    }
                    else
                    {
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

    private static string ParseCrossReferences(string text, List<ArticleCrossRef> crossReferences)
    {
        return LinkPattern()
            .Replace(
                text,
                match =>
                {
                    string target = match.Groups[1].Value;
                    string rawText = match.Groups[2].Value;
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

    private string ParseAbbreviations(string text, List<ArticleAbbreviation> abbreviations)
    {
        return AbbrevPattern()
            .Replace(
                text,
                match =>
                {
                    string abbrev = match.Groups[1].Value;
                    string fullText = data.Abbreviations.TryGetValue(abbrev, out string? ft)
                        ? ft
                        : "";

                    abbreviations.Add(new ArticleAbbreviation(Abbrev: abbrev, FullText: fullText));
                    return abbrev;
                }
            );
    }

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
