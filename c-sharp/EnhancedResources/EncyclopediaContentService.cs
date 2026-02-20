using System.Text;
using System.Text.RegularExpressions;
using Paratext.Data;
using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Service for encyclopedia content formatting.
/// Includes scripture reference formatting (BBBCCCVVV to clickable links),
/// encyclopedia article rendering (V1 and V2 formats), and image processing.
///
/// PT9 Source: Paratext/Marble/EncyclopediaTab.cs
/// Extractions: EXT-061, EXT-062, EXT-063, EXT-067, EXT-071
/// </summary>
internal static class EncyclopediaContentService
{
    /// <summary>Length of a standard BBBCCCVVV reference string.</summary>
    private const int BcvLength = 9;

    /// <summary>Prefix for encyclopedia-type links in LexicalLinks field.</summary>
    private const string EncyclopediaLinkPrefix = "MBL_ENC:";

    /// <summary>Regex pattern to match {S:BBBCCCVVV} scripture reference markers in article text.</summary>
    private static readonly Regex s_scriptureRefPattern =
        new(@"\{S:(\d{9,14})\}", RegexOptions.Compiled);

    /// <summary>Regex pattern to strip HTML tags from article text for teaser generation.</summary>
    private static readonly Regex s_htmlTagPattern = new("<[^>]+>", RegexOptions.Compiled);

    /// <summary>Regex pattern to collapse consecutive whitespace into a single space.</summary>
    private static readonly Regex s_whitespacePattern = new(@"\s+", RegexOptions.Compiled);

    /// <summary>Maximum character length for teaser text before truncation.</summary>
    private const int TeaserMaxLength = 150;

    /// <summary>Length of an extended BBBCCCVVVWWWWW reference string (with word offset).</summary>
    private const int BcvWithWordOffsetLength = 14;

    /// <summary>
    /// Converts BBBCCCVVV reference strings to clickable verse links.
    /// Input is a space-separated string of BBBCCCVVV references (9 or 14 chars each).
    /// Each valid reference produces an HTML anchor tag with goto: URL scheme.
    /// Ranges use hyphen separator: BBBCCCVVV-BBBCCCVVV.
    ///
    /// === PORTED FROM PT9 ===
    /// Source: PT9/Paratext/Marble/EncyclopediaTab.cs:537-584
    /// Method: EncyclopediaTab.FormatBCVRefs()
    /// Maps to: EXT-062
    ///
    /// EXPLANATION:
    /// This method parses space-separated BBBCCCVVV reference strings and converts
    /// each to an HTML anchor tag. The algorithm:
    /// 1. Split input on spaces (RemoveEmptyEntries handles consecutive spaces)
    /// 2. Filter to strings with length >= 9
    /// 3. Strip leading non-digit character if present and length > 9
    /// 4. Detect hyphen for range references, split into start and end
    /// 5. Validate length is exactly 9 or 14 chars, parse first 9 as BCV integer
    /// 6. Create VerseRef from BCV, map through versification
    /// 7. Format display as "BookName Chapter:Verse" with range suffix if applicable
    /// 8. Generate HTML: &lt;a href='goto:{vref}' title='Go To {ref}'&gt;{display}&lt;/a&gt;
    /// 9. Join with spaces, remove trailing space
    /// </summary>
    /// <param name="bbbcccvvv">Space-separated BBBCCCVVV reference strings.</param>
    /// <param name="versification">The versification system for mapping references.</param>
    /// <returns>HTML string with clickable verse links, or empty string if no valid refs.</returns>
    public static string FormatBCVRefs(string bbbcccvvv, ScrVers versification)
    {
        string[] bcvArr = bbbcccvvv.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        StringBuilder result = new StringBuilder();

        foreach (string s in bcvArr.Where(s => s.Length >= BcvLength))
        {
            string verseStr = StripLeadingNonDigit(s);
            string? rangeRefStr = SplitRange(ref verseStr);

            if (!TryCreateVerseRef(verseStr, versification, out VerseRef vref))
                continue;

            string longref = $"{CanonX.BookNumberToName(vref.BookNum)} {vref.Chapter}:{vref.Verse}";
            string displayref = longref + FormatRangeSuffix(rangeRefStr, vref, versification);

            result
                .Append($"<a href='goto:{vref.Text}' title='Go To {longref}'>{displayref}</a>")
                .Append(' ');
        }

        if (result.Length == 0)
            return "";

        result.Length -= 1; // remove trailing space
        return result.ToString();
    }

    /// <summary>
    /// Strips a leading non-digit character from the reference string when the string
    /// is longer than the standard BCV length. This handles encyclopedia markup prefixes
    /// like punctuation before references.
    /// </summary>
    private static string StripLeadingNonDigit(string s) =>
        !char.IsDigit(s[0]) && s.Length > BcvLength ? s.Substring(1) : s;

    /// <summary>
    /// Splits a verse string at the hyphen separator to extract the range end reference.
    /// Modifies <paramref name="verseStr"/> in place to contain only the start reference.
    /// Strips a leading non-digit from the range end if present.
    /// </summary>
    /// <returns>The range end reference string, or null if no range.</returns>
    private static string? SplitRange(ref string verseStr)
    {
        int hyphenIndex = verseStr.IndexOf('-');
        if (hyphenIndex <= 0)
            return null;

        string rangeRefStr = verseStr.Substring(hyphenIndex + 1);
        if (rangeRefStr.Length > 0 && !char.IsDigit(rangeRefStr[0]))
            rangeRefStr = rangeRefStr.Substring(1);
        verseStr = verseStr.Substring(0, hyphenIndex);
        return rangeRefStr;
    }

    /// <summary>
    /// Attempts to create a <see cref="VerseRef"/> from a BCV string.
    /// Validates the string length (9 or 14 chars), parses the first 9 chars as a BCV integer,
    /// creates the VerseRef, and maps it through the specified versification.
    /// </summary>
    /// <returns>True if a valid VerseRef was created; false if the string should be skipped.</returns>
    private static bool TryCreateVerseRef(string verseStr, ScrVers versification, out VerseRef vref)
    {
        vref = default;

        if (
            (verseStr.Length != BcvLength && verseStr.Length != BcvWithWordOffsetLength)
            || !int.TryParse(verseStr.Substring(0, BcvLength), out var bcv)
        )
            return false;

        try
        {
            vref = new VerseRef(bcv, ScrVers.Original);
        }
        catch (VerseRefException)
        {
            return false;
        }

        vref.ChangeVersification(versification);
        return true;
    }

    /// <summary>
    /// Computes the range display suffix for a verse reference.
    /// For within-chapter ranges, returns "-{endVerse}".
    /// For cross-chapter ranges, returns "-{endChapter}:{endVerse}".
    /// Returns empty string if no valid range end exists.
    /// </summary>
    private static string FormatRangeSuffix(
        string? rangeRefStr,
        VerseRef startRef,
        ScrVers versification
    )
    {
        if (
            rangeRefStr == null
            || (rangeRefStr.Length != BcvLength && rangeRefStr.Length != BcvWithWordOffsetLength)
        )
            return "";

        if (!int.TryParse(rangeRefStr.Substring(0, BcvLength), out var rangebcv))
            return "";

        try
        {
            VerseRef rangeRef = new VerseRef(rangebcv, ScrVers.Original);
            rangeRef.ChangeVersification(versification);

            return rangeRef.ChapterNum == startRef.ChapterNum
                ? $"-{rangeRef.VerseNum}"
                : $"-{rangeRef.ChapterNum}:{rangeRef.VerseNum}";
        }
        catch (VerseRefException)
        {
            // Invalid range end -- format start ref without range
            return "";
        }
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/EncyclopediaTab.cs:180-310
    // Method: EncyclopediaTab.LoadResources() orchestration
    // Maps to: EXT-061, EXT-063, EXT-071, CAP-010
    //
    // EXPLANATION:
    // This method orchestrates encyclopedia tab loading:
    // 1. Validate resource and book exist (same pattern as DictionaryService)
    // 2. Get scoped TextLink tokens that have MBL_ENC: prefixed LexicalLinks
    // 3. Apply optional word filter
    // 4. For each unique encyclopedia key, look up Thematic_Lexicon entry
    // 5. Render article HTML from sections/paragraphs
    // 6. Resolve {S:BBBCCCVVV} scripture references in article text
    // 7. Extract SourceText, Transliteration, ScriptureReferences from LanguageSets
    // 8. Deduplicate by article key
    // 9. Return EncyclopediaTabContent
    /// <summary>
    /// Loads the encyclopedia tab content for a given resource, verse, and scope.
    /// Orchestrates scope filtering (CAP-003), data access (CAP-028),
    /// V2 encyclopedia parsing (CAP-029), and scripture reference formatting (CAP-030).
    /// </summary>
    public static Task<EncyclopediaTabContent> LoadEncyclopediaTabAsync(
        MarbleDataAccess dataAccess,
        string resourceId,
        VerseReference verseRef,
        ScopeFilter scope,
        WordFilter? wordFilter
    )
    {
        var tokens = ValidateAndGetBookTokens(dataAccess, resourceId, verseRef);
        var linksInScope = GetEncyclopediaLinksInScope(tokens, verseRef, scope);
        linksInScope = ApplyWordFilter(linksInScope, wordFilter);

        var items = BuildEncyclopediaItems(linksInScope, dataAccess);
        var result = new EncyclopediaTabContent(items, HeaderHtml: "");
        return Task.FromResult(result);
    }

    /// <summary>
    /// Validates that the resource and book exist, returning the book's tokens.
    /// Throws RESOURCE_NOT_FOUND or BOOK_NOT_FOUND on failure.
    /// </summary>
    // === NEW IN PT10 ===
    // Reason: Shared validation pattern for tab loading methods
    // Maps to: CAP-010
    private static IReadOnlyList<MarbleToken> ValidateAndGetBookTokens(
        MarbleDataAccess dataAccess,
        string resourceId,
        VerseReference verseRef
    )
    {
        // Check if the resource is a known bible resource
        if (!dataAccess.AvailableBibles.Contains(resourceId))
            throw new Exception($"RESOURCE_NOT_FOUND: Resource '{resourceId}' not found");

        var tokens = dataAccess.GetBookTokens(resourceId, verseRef.Book);
        if (tokens == null || tokens.Count == 0)
            throw new Exception(
                $"BOOK_NOT_FOUND: Book {verseRef.Book} not available in resource '{resourceId}'"
            );

        bool hasMatchingBook = tokens.Any(t =>
            t.VerseRef != null && t.VerseRef.Book == verseRef.Book
        );
        if (!hasMatchingBook)
            throw new Exception(
                $"BOOK_NOT_FOUND: Book {verseRef.Book} not available in resource '{resourceId}'"
            );

        return tokens;
    }

    /// <summary>
    /// Gets encyclopedia-type TextLink tokens in scope.
    /// Filters for tokens that have LexicalLinks starting with MBL_ENC: prefix.
    /// Uses VerseRef-based filtering since test tokens carry VerseRef on the token.
    /// </summary>
    // === NEW IN PT10 ===
    // Reason: Encyclopedia-specific scope filtering with MBL_ENC prefix check
    // Maps to: CAP-010
    private static IReadOnlyList<MarbleToken> GetEncyclopediaLinksInScope(
        IReadOnlyList<MarbleToken> tokens,
        VerseReference verseRef,
        ScopeFilter scope
    )
    {
        var result = new List<MarbleToken>();
        VerseReference? lastVerseRef = null;

        foreach (var token in tokens)
        {
            if (token.Type == MarbleTokenType.Verse && token.VerseRef != null)
            {
                lastVerseRef = token.VerseRef;
                continue;
            }

            if (token.Type != MarbleTokenType.TextLink)
                continue;

            if (
                string.IsNullOrEmpty(token.LexicalLinks)
                || !token.LexicalLinks.StartsWith(EncyclopediaLinkPrefix, StringComparison.Ordinal)
            )
                continue;

            var tokenVerse = token.VerseRef ?? lastVerseRef;
            if (tokenVerse == null)
                continue;

            bool inScope = scope switch
            {
                ScopeFilter.CurrentVerse => tokenVerse.Book == verseRef.Book
                    && tokenVerse.Chapter == verseRef.Chapter
                    && tokenVerse.Verse == verseRef.Verse,
                ScopeFilter.CurrentSection => tokenVerse.Book == verseRef.Book
                    && tokenVerse.Chapter == verseRef.Chapter,
                _ => tokenVerse.Book == verseRef.Book && tokenVerse.Chapter == verseRef.Chapter,
            };

            if (inScope)
                result.Add(token);
        }

        return result;
    }

    /// <summary>
    /// Applies the optional word filter to restrict tokens to those matching the filter.
    /// Returns the input list unchanged when no filter is specified.
    /// </summary>
    // === NEW IN PT10 ===
    // Reason: Word filter support for encyclopedia tab
    // Maps to: CAP-010
    private static IReadOnlyList<MarbleToken> ApplyWordFilter(
        IReadOnlyList<MarbleToken> linksInScope,
        WordFilter? wordFilter
    )
    {
        if (wordFilter == null || linksInScope.Count == 0)
            return linksInScope;

        return MarbleDataParser.GetMatchingTokens(
            linksInScope,
            wordFilter,
            wordFilter.SourcePane == WordFilterSource.Scripture
        );
    }

    /// <summary>
    /// Builds deduplicated encyclopedia display items from the filtered token list.
    /// For each token with MBL_ENC: links, extracts the article key, looks up the
    /// encyclopedia entry, renders article HTML, and deduplicates by key.
    /// </summary>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/EncyclopediaTab.cs:220-310
    // Method: EncyclopediaTab.LoadResources() (item building portion)
    // Maps to: EXT-061, CAP-010
    private static IReadOnlyList<EncyclopediaDisplayItem> BuildEncyclopediaItems(
        IReadOnlyList<MarbleToken> linksInScope,
        MarbleDataAccess dataAccess
    )
    {
        var items = new List<EncyclopediaDisplayItem>();
        var seenKeys = new HashSet<string>(StringComparer.Ordinal);

        foreach (var token in linksInScope)
        {
            if (string.IsNullOrEmpty(token.LexicalLinks))
                continue;

            var articleKey = ExtractArticleKey(token.LexicalLinks);
            if (articleKey == null)
                continue;

            string entryId = EncyclopediaLinkPrefix + articleKey;
            if (!seenKeys.Add(entryId))
                continue;

            var entries = dataAccess.GetEncyclopediaEntries(entryId, "");
            if (entries.Count == 0)
                continue;

            var entry = entries[0];
            var item = BuildDisplayItem(entry, entryId);
            items.Add(item);
        }

        return items;
    }

    /// <summary>
    /// Extracts the article key from a MBL_ENC:KEY:BBBMMM link string.
    /// Returns the KEY portion.
    /// </summary>
    private static string? ExtractArticleKey(string lexicalLinks)
    {
        if (!lexicalLinks.StartsWith(EncyclopediaLinkPrefix, StringComparison.Ordinal))
            return null;

        // Format: MBL_ENC:KEY:BBBMMM
        var afterPrefix = lexicalLinks.Substring(EncyclopediaLinkPrefix.Length);
        var colonIdx = afterPrefix.IndexOf(':');
        if (colonIdx > 0)
            return afterPrefix.Substring(0, colonIdx);

        return afterPrefix;
    }

    /// <summary>
    /// Builds a single EncyclopediaDisplayItem from a Thematic_Lexicon entry.
    /// Renders article HTML from sections, extracts language set data,
    /// and resolves scripture references.
    /// </summary>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/EncyclopediaTab.cs:340-420
    // Method: EncyclopediaTab.GetArticleText() + FormatParagraph()
    // Maps to: EXT-063, CAP-010
    private static EncyclopediaDisplayItem BuildDisplayItem(
        Thematic_LexiconThemLex_Entry entry,
        string entryId
    )
    {
        string title = entry.Title ?? entryId;
        string fullArticleHtml = RenderArticleHtml(entry);
        string teaserHtml = GenerateTeaser(fullArticleHtml);
        bool hasImages = entry.BibleImages is { Length: > 0 };

        var (sourceText, transliteration) = ExtractLanguageSetData(entry);
        var scriptureRefs = ExtractScriptureReferences(entry);

        return new EncyclopediaDisplayItem(
            Id: $"enc-{entryId}",
            Title: title,
            Transliteration: transliteration,
            SourceText: sourceText,
            TeaserHtml: teaserHtml,
            FullArticleHtml: fullArticleHtml,
            ScriptureReferences: scriptureRefs,
            HasImages: hasImages,
            Expanded: false
        );
    }

    /// <summary>
    /// Renders the full article HTML from the entry's sections and paragraphs.
    /// Resolves {S:BBBCCCVVV} scripture reference patterns in text.
    /// </summary>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/EncyclopediaTab.cs:340-380
    // Method: EncyclopediaTab.GetArticleText()
    // Maps to: EXT-063, CAP-010
    private static string RenderArticleHtml(Thematic_LexiconThemLex_Entry entry)
    {
        if (entry.Sections is not { Length: > 0 })
            return "";

        var sb = new StringBuilder();

        foreach (var section in entry.Sections)
        {
            if (!string.IsNullOrEmpty(section.Heading))
                sb.Append($"<h3>{section.Heading}</h3>");

            if (section.Paragraphs != null)
            {
                foreach (var para in section.Paragraphs)
                    sb.Append($"<p>{ResolveScriptureRefs(para)}</p>");
            }
            else if (!string.IsNullOrEmpty(section.Content))
            {
                sb.Append($"<p>{ResolveScriptureRefs(section.Content)}</p>");
            }
        }

        return sb.ToString();
    }

    /// <summary>
    /// Resolves {S:BBBCCCVVV} patterns in article text to clickable scripture links
    /// using FormatBCVRefs (CAP-030).
    /// </summary>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/EncyclopediaTab.cs:400-420
    // Method: EncyclopediaTab.FormatParagraph() (scripture ref portion)
    // Maps to: EXT-063, CAP-010
    private static string ResolveScriptureRefs(string text)
    {
        if (string.IsNullOrEmpty(text))
            return text;

        return s_scriptureRefPattern.Replace(
            text,
            match =>
            {
                string bcvStr = match.Groups[1].Value;
                string formatted = FormatBCVRefs(bcvStr, ScrVers.Original);
                return string.IsNullOrEmpty(formatted) ? match.Value : formatted;
            }
        );
    }

    /// <summary>
    /// Generates a short teaser HTML from the full article HTML for expand/collapse preview.
    /// </summary>
    private static string GenerateTeaser(string fullArticleHtml)
    {
        if (string.IsNullOrEmpty(fullArticleHtml))
            return "";

        string plainText = s_htmlTagPattern.Replace(fullArticleHtml, " ").Trim();
        plainText = s_whitespacePattern.Replace(plainText, " ");

        return plainText.Length <= TeaserMaxLength
            ? plainText
            : plainText[..TeaserMaxLength] + "...";
    }

    /// <summary>
    /// Extracts source text (Lemma) and transliteration from the first language set.
    /// </summary>
    private static (string SourceText, string Transliteration) ExtractLanguageSetData(
        Thematic_LexiconThemLex_Entry entry
    )
    {
        if (entry.Sections is null)
            return ("", "");

        foreach (var section in entry.Sections)
        {
            if (section.LanguageSets is not { Length: > 0 })
                continue;

            var ls = section.LanguageSets[0];
            return (ls.Lemma ?? "", ls.Transliteration ?? "");
        }

        return ("", "");
    }

    /// <summary>
    /// Extracts scripture references from all language sets across all sections.
    /// Converts ulong references to VerseReference objects.
    /// </summary>
    private static IReadOnlyList<VerseReference> ExtractScriptureReferences(
        Thematic_LexiconThemLex_Entry entry
    )
    {
        if (entry.Sections is null)
            return Array.Empty<VerseReference>();

        var refs = new List<VerseReference>();

        foreach (var section in entry.Sections)
        {
            if (section.LanguageSets is null)
                continue;

            foreach (var ls in section.LanguageSets)
            {
                if (ls.References is null)
                    continue;

                foreach (var refVal in ls.References)
                {
                    int bcv = (int)(refVal % 1000000000UL);
                    int book = bcv / 1000000;
                    int chapter = (bcv % 1000000) / 1000;
                    int verse = bcv % 1000;

                    if (book > 0 && chapter > 0)
                        refs.Add(new VerseReference(book, chapter, verse));
                }
            }
        }

        return refs;
    }
}
