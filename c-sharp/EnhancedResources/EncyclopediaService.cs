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
//
// Refactor 2026-04-24 (FU-CR2 fix): LoadResources is now token-driven. The service
// walks marble tokens for the current resource+book, applies scope filtering for
// thematic links, and joins each token's thematic IDs to encyclopedia entries via
// "{TYPE}:{Key}" keys. Replaces the prior placeholder that emitted hardcoded
// "gamal"/"camel"/"FAUNA" values for every entry.
internal sealed partial class EncyclopediaService(
    EncyclopediaData data,
    IMarbleBookTokenProvider bookTokens,
    MarbleDataAccessService marbleData
)
{
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/EncyclopediaTab.cs:LoadResources
    /// <summary>
    /// Loads encyclopedia entries for the current scope, joining marble tokens with
    /// thematic links to encyclopedia articles. Tokens are obtained from the book
    /// token provider, scope-filtered (BHV-601), and then matched against the
    /// per-(type, language) slice of <see cref="EncyclopediaData.EntriesByTypeAndLanguage"/>.
    /// Returns one display item per scoped token that has a thematic link.
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

        var bookTokensList = bookTokens.GetTokens(input.ResourceId, input.CurrentReference.BookNum);
        var scopeInput = new ScopeFilterInput(
            CurrentRef: input.CurrentReference,
            Scope: input.Scope,
            LinkType: MarbleLinkType.Thematic,
            FilterText: input.Filter?.Lemma ?? "",
            FilterSenses: input.Filter?.Senses ?? "",
            FilterClickOrigin: input.Filter?.ClickOrigin ?? FilterClickOrigin.ScripturePane,
            ResourceId: input.ResourceId
        );
        var scopedTokens = ScopeFilterService.GetScopedTokens(scopeInput, bookTokensList.ToArray());

        var typedEntries = SelectEntriesForLanguage(input.UserLanguage);
        var entryByArticleKey = new Dictionary<
            string,
            (EncyclopediaEntryType Type, MarbleEncyclopediaEntry Entry)
        >(StringComparer.OrdinalIgnoreCase);
        foreach (var (type, entry) in typedEntries)
        {
            var key = $"{type.ToString().ToUpperInvariant()}:{entry.Key}";
            if (!entryByArticleKey.ContainsKey(key))
                entryByArticleKey[key] = (type, entry);
        }

        var items = new List<EncyclopediaDisplayItem>();
        foreach (var token in scopedTokens)
        {
            var firstLexicalLink = token.LexicalLinks?.FirstOrDefault();
            if (string.IsNullOrEmpty(firstLexicalLink))
                continue;
            var (lemma, _, _) = ParseLexLinkEntry(firstLexicalLink);

            var thematicIds = token.ThematicLinks ?? [];
            if (thematicIds.Count == 0)
                continue;

            var firstThematicId = thematicIds[0];
            var colonIndex = firstThematicId.IndexOf(':');
            if (colonIndex <= 0)
                continue;
            var collection = firstThematicId.Substring(0, colonIndex);

            var entryRefs = new List<EncyclopediaEntryRef>();
            var imageIds = new List<string>();
            foreach (var id in thematicIds)
            {
                if (entryByArticleKey.TryGetValue(id, out var match))
                {
                    var teaser =
                        match.Entry.Paragraphs.Count > 0
                            ? TruncateTeaser(match.Entry.Paragraphs[0])
                            : "";
                    var formatVersion = match.Entry.BibleImageIds.Count > 0 ? 2 : 1;
                    entryRefs.Add(
                        new EncyclopediaEntryRef(
                            Key: match.Entry.Key,
                            Title: match.Entry.Title,
                            TeaserText: teaser,
                            FormatVersion: formatVersion,
                            InlineImageIds: match.Entry.BibleImageIds.Count > 0
                                ? match.Entry.BibleImageIds
                                : null
                        )
                    );
                    foreach (var img in match.Entry.BibleImageIds)
                        if (!imageIds.Contains(img))
                            imageIds.Add(img);
                }
                else
                {
                    entryRefs.Add(
                        new EncyclopediaEntryRef(
                            Key: id,
                            Title: $"Encyclopedia article {id} does not exist.",
                            TeaserText: "",
                            FormatVersion: 1
                        )
                    );
                }
            }

            items.Add(
                new EncyclopediaDisplayItem(
                    TokenId: token.Index.ToString(),
                    Lemma: lemma,
                    SourceText: token.Text ?? "",
                    Translit: "",
                    Glosses: marbleData.FindLocalizedGlossesForTerm(lemma, input.UserLanguage),
                    Entries: entryRefs,
                    ImageIds: imageIds,
                    Collection: collection
                )
            );
        }

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
    // falling back to English when the requested language has no slice. Each result
    // is paired with its EncyclopediaEntryType so callers can build the
    // "{TYPE}:{Key}" lookup key without losing type information.
    private IReadOnlyList<(
        EncyclopediaEntryType Type,
        MarbleEncyclopediaEntry Entry
    )> SelectEntriesForLanguage(string userLanguage)
    {
        var result = new List<(EncyclopediaEntryType, MarbleEncyclopediaEntry)>();
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
                foreach (var e in entries)
                    result.Add((entryType, e));
                continue;
            }
            if (byLanguage.TryGetValue("en", out var fallback) && fallback.Count > 0)
            {
                foreach (var e in fallback)
                    result.Add((entryType, e));
            }
        }
        return result;
    }

    private static (string Lemma, string SenseId, string EntryRef) ParseLexLinkEntry(string entry)
    {
        var parts = entry.Split(':');
        var lemma = parts.Length >= 2 ? parts[1] : "";
        var senseId = parts.Length >= 3 ? parts[2] : "";
        return (lemma, senseId, entry);
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
