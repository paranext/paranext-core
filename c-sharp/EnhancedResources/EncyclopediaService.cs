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
            FilterText: "",
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
        var seenLemmas = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        foreach (var token in scopedTokens)
        {
            var firstLexicalLink = token.LexicalLinks?.FirstOrDefault();
            if (string.IsNullOrEmpty(firstLexicalLink))
                continue;
            var (lemma, _, _, dictionary) = ParseLexLinkEntry(firstLexicalLink);

            if (!seenLemmas.Add(lemma))
                continue;

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
                    // The composite "TYPE:KEY" id is what readArticle (and
                    // EncyclopediaData.ArticlesById) looks up. Built the same
                    // way the lookup map was populated above.
                    var articleId = $"{match.Type.ToString().ToUpperInvariant()}:{match.Entry.Key}";
                    entryRefs.Add(
                        new EncyclopediaEntryRef(
                            ArticleId: articleId,
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
                    // Unknown thematic link - the original id IS the article id
                    // the caller would pass to readArticle (where it would 404).
                    entryRefs.Add(
                        new EncyclopediaEntryRef(
                            ArticleId: id,
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
                    Glosses: marbleData.FindLocalizedGlossesForTerm(
                        lemma,
                        input.UserLanguage,
                        dictionary
                    ),
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

    // PT9 lexical_links carry "Dict:Lemma:Indices" (PT9 MarbleLexicalLink.cs:37-47).
    // The Dictionary slot is the authoring research dictionary (SDBH/SDBG/DCLEX)
    // used to route gloss lookups; absent for malformed legacy data.
    private static (
        string Lemma,
        string SenseId,
        string EntryRef,
        string? Dictionary
    ) ParseLexLinkEntry(string entry)
    {
        var parts = entry.Split(':');
        var dictionary = parts.Length >= 1 && parts[0].Length > 0 ? parts[0] : null;
        var lemma = parts.Length >= 2 ? parts[1] : "";
        var senseId = parts.Length >= 3 ? parts[2] : "";
        return (lemma, senseId, entry, dictionary);
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

    // Verse-ref envelope: <s>...</s> can contain ONE OR MORE space-separated refs.
    // Each ref is a 9- or 14-digit BCV string optionally prefixed with a single
    // non-digit character (commonly G/H, never required); ranges use 'a-b'.
    // PT9 source-of-truth: EncyclopediaTab.cs:FormatBCVRefs (line 537). The
    // original PT10 port assumed `G\d{14}` literally, which silently dropped
    // every Old Testament ref (no prefix) and every multi-ref block.
    [GeneratedRegex(@"<s>([^<]+)</s>")]
    private static partial Regex VerseRefEnvelopePattern();

    [GeneratedRegex(@"<l\s+target=""([^""]+)"">([^<]+)</l>")]
    private static partial Regex LinkPattern();

    [GeneratedRegex(@"^[\d.]+\s+")]
    private static partial Regex NumberPrefixPattern();

    [GeneratedRegex(@"<a>([^<]+)</a>")]
    private static partial Regex AbbrevPattern();

    // PT9 ProcessParagraphImages (line 441) accepts both <image> and <Image>
    // with either Id or id attribute - real V2 data is mixed-case.
    [GeneratedRegex(@"<image\s+id=""([^""]+)""\s*/?>", RegexOptions.IgnoreCase)]
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

    /// <summary>
    /// Parses verse-reference markup. Mirrors PT9 EncyclopediaTab.FormatBCVRefs:
    ///   * `<s>` content is split on whitespace and each token is processed
    ///     independently - one verse link per token, joined back with spaces.
    ///   * Each token may optionally start with one non-digit (G/H/etc.) which
    ///     is metadata only and stripped before parsing.
    ///   * Stripped form must be exactly 9 or 14 digits; first 9 digits encode
    ///     BBBCCCVVV; trailing 5 are an in-verse character offset (ignored here).
    ///   * Range form is `start-end`; both halves follow the same rules.
    ///
    /// Tokens that fail validation are dropped silently (matches PT9's
    /// `continue` on length mismatch). The returned text contains the
    /// space-separated display strings replacing the original `<s>...</s>`.
    /// </summary>
    private static string ParseVerseReferences(string text, List<ArticleVerseLink> verseLinks)
    {
        return VerseRefEnvelopePattern()
            .Replace(
                text,
                match =>
                {
                    var inner = match.Groups[1].Value;
                    var displays = new List<string>();
                    foreach (
                        var rawToken in inner.Split(' ', StringSplitOptions.RemoveEmptyEntries)
                    )
                    {
                        if (TryParseSingleVerseRef(rawToken, out var verseLink))
                        {
                            verseLinks.Add(verseLink);
                            displays.Add(verseLink.DisplayText);
                        }
                    }
                    return displays.Count > 0 ? string.Join(" ", displays) : match.Value;
                }
            );
    }

    private static bool TryParseSingleVerseRef(string rawToken, out ArticleVerseLink verseLink)
    {
        verseLink = default!;

        var hyphenIdx = rawToken.IndexOf('-');
        var startRaw = hyphenIdx > 0 ? rawToken[..hyphenIdx] : rawToken;
        var endRaw = hyphenIdx > 0 ? rawToken[(hyphenIdx + 1)..] : null;

        if (!TryDecodeBcv(startRaw, out var startBcv))
            return false;
        var (bookNum, chapter, verse) = startBcv;
        if (bookNum is < 1 or > 99)
            return false;

        var bookName = Canon.BookNumberToEnglishName(bookNum);
        string displayText;
        if (endRaw is not null && TryDecodeBcv(endRaw, out var endBcv))
        {
            displayText =
                endBcv.Chapter == chapter
                    ? $"{bookName} {chapter}:{verse}-{endBcv.Verse}"
                    : $"{bookName} {chapter}:{verse}-{endBcv.Chapter}:{endBcv.Verse}";
        }
        else
        {
            displayText = $"{bookName} {chapter}:{verse}";
        }

        verseLink = new ArticleVerseLink(
            Reference: new VerseRef(bookNum, chapter, verse),
            DisplayText: displayText,
            // Preserve the original token (including any alpha prefix) so the
            // FE can correlate the link back to its source markup.
            RawReference: startRaw
        );
        return true;
    }

    /// <summary>
    /// Decode the leading 9 digits of a BCV-style ref into (book, chapter, verse).
    /// Strips an optional 1-char non-digit prefix when length > 9. Accepts only
    /// the 9- or 14-digit forms PT9 produces.
    /// </summary>
    private static bool TryDecodeBcv(string raw, out (int Book, int Chapter, int Verse) bcv)
    {
        bcv = default;
        if (string.IsNullOrEmpty(raw))
            return false;

        var s = raw.Length > 9 && !char.IsDigit(raw[0]) ? raw[1..] : raw;
        if (s.Length != 9 && s.Length != 14)
            return false;
        if (!int.TryParse(s[..9], out var packed))
            return false;

        var book = packed / 1_000_000;
        var chapter = packed / 1_000 % 1_000;
        var verse = packed % 1_000;
        bcv = (book, chapter, verse);
        return true;
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
