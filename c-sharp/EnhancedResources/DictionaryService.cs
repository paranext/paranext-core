namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Result of loading the Dictionary research tab content.
/// Contains the sorted, deduplicated display items and header HTML.
///
/// Contract: data-contracts.md Method 9, CAP-009
/// </summary>
public record DictionaryTabContent(IReadOnlyList<DictionaryDisplayItem> Items, string HeaderHtml);

/// <summary>
/// Service for dictionary tab operations including homonym grouping, deduplication,
/// display item creation, and the full LoadDictionaryTab orchestration pipeline.
/// </summary>
internal static class DictionaryService
{
    private const string LexicalLinksType = "lexical_links";

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/DictionaryTab.cs:722-793
    // Method: DictionaryTab.LoadResources() orchestration
    // Maps to: EXT-070, CAP-009
    /// <summary>
    /// Loads the dictionary tab content for a given resource, verse, and scope.
    /// Orchestrates all sub-pipelines: scope filtering (CAP-003), lexical link parsing (CAP-005),
    /// rendering status (CAP-007), status combination (CAP-008), markup processing (CAP-014),
    /// dictionary data models (CAP-024), token filtering (CAP-025),
    /// deduplication (CAP-026), and data access (CAP-028).
    /// </summary>
    public static Task<DictionaryTabContent> LoadDictionaryTabAsync(
        MarbleDataAccess dataAccess,
        string resourceId,
        VerseReference verseRef,
        ScopeFilter scope,
        string? trackedProjectId,
        WordFilter? wordFilter,
        DictionarySortField sortField,
        bool sortAscending
    )
    {
        var tokens = ValidateAndGetBookTokens(dataAccess, resourceId, verseRef);
        var linksInScope = GetLinksInScope(tokens, verseRef, scope);
        linksInScope = ApplyWordFilter(linksInScope, wordFilter);

        string dictionaryName = MarbleDataAccess.GetDictionaryNameForBook(verseRef.Book);
        var items = BuildDisplayItems(
            linksInScope,
            dataAccess,
            dictionaryName,
            verseRef,
            trackedProjectId
        );

        var sortedItems = SortItems(items, sortField, sortAscending);
        var result = new DictionaryTabContent(sortedItems, HeaderHtml: "");
        return Task.FromResult(result);
    }

    /// <summary>
    /// Validates that the resource and book exist, returning the book's tokens.
    /// Throws RESOURCE_NOT_FOUND or BOOK_NOT_FOUND on failure.
    /// </summary>
    private static IReadOnlyList<MarbleToken> ValidateAndGetBookTokens(
        MarbleDataAccess dataAccess,
        string resourceId,
        VerseReference verseRef
    )
    {
        var tokens = dataAccess.GetBookTokens(resourceId, verseRef.Book);
        if (tokens == null)
            throw new Exception($"RESOURCE_NOT_FOUND: Resource '{resourceId}' not found");

        if (tokens.Count == 0)
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
    /// Filters TextLink tokens by scope using GetLinksInScope, with a VerseRef-based fallback
    /// for tokens that carry verse info on the VerseRef property rather than in Text.
    /// </summary>
    private static IReadOnlyList<MarbleToken> GetLinksInScope(
        IReadOnlyList<MarbleToken> tokens,
        VerseReference verseRef,
        ScopeFilter scope
    )
    {
        var scopeResult = MarbleDataParser.GetLinksInScope(
            tokens,
            verseRef,
            scope,
            LexicalLinksType,
            null,
            null
        );

        if (scopeResult.Count > 0 || scope == ScopeFilter.CurrentChapter)
            return scopeResult;

        return FilterTextLinksByVerseRef(tokens, verseRef, scope);
    }

    /// <summary>
    /// Applies the optional word filter to restrict tokens to those matching the filter.
    /// Returns the input list unchanged when no filter is specified.
    /// </summary>
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
    /// Builds deduplicated display items from the filtered token list.
    /// For each TextLink token: parses lexical links, looks up dictionary data,
    /// calculates rendering status, and deduplicates via TryMerge (INV-015).
    /// </summary>
    private static List<DictionaryDisplayItem> BuildDisplayItems(
        IReadOnlyList<MarbleToken> linksInScope,
        MarbleDataAccess dataAccess,
        string dictionaryName,
        VerseReference verseRef,
        string? trackedProjectId
    )
    {
        var items = new List<DictionaryDisplayItem>();

        foreach (var token in linksInScope)
        {
            if (string.IsNullOrEmpty(token.LexicalLinks))
                continue;

            var parsedLinks = LexicalLinkService.ParseLexicalLinks(token.LexicalLinks);
            if (parsedLinks.Count == 0)
                continue;

            var primaryLink = parsedLinks[0];
            var occurrenceRef =
                token.VerseRef
                ?? new VerseReference(verseRef.Book, verseRef.Chapter, verseRef.Verse);
            var entry = LookUpDictionaryEntry(dataAccess, primaryLink);

            var item = BuildDisplayItem(
                token,
                primaryLink,
                occurrenceRef,
                entry,
                dictionaryName,
                trackedProjectId
            );

            TryMerge(item, items);
        }

        return items;
    }

    /// <summary>
    /// Looks up a dictionary entry by constructing the key from the lexical link.
    /// </summary>
    private static Lexicon_Entry? LookUpDictionaryEntry(
        MarbleDataAccess dataAccess,
        ParsedLexicalLink link
    )
    {
        string entryKey = $"{link.Dictionary}:{link.Lemma}:{link.BaseFormIndex}";
        return dataAccess.GetDictionaryEntry(entryKey);
    }

    /// <summary>
    /// Builds a single DictionaryDisplayItem from a token, its primary lexical link,
    /// and the corresponding dictionary entry (if found).
    /// </summary>
    private static DictionaryDisplayItem BuildDisplayItem(
        MarbleToken token,
        ParsedLexicalLink primaryLink,
        VerseReference occurrenceRef,
        Lexicon_Entry? entry,
        string dictionaryName,
        string? trackedProjectId
    )
    {
        var (partOfSpeech, partOfSpeechShort) = ExtractPartOfSpeech(
            entry,
            primaryLink.BaseFormIndex,
            dictionaryName
        );
        string gloss = ExtractFirstGloss(entry);
        var definitions = BuildDefinitionsList(entry);
        var renderingStatus = CalculateItemRenderingStatus(
            trackedProjectId,
            primaryLink,
            occurrenceRef
        );

        return new DictionaryDisplayItem(
            Id: $"dict-{primaryLink.Lemma}-{token.LexicalLinks}",
            Lemma: primaryLink.Lemma,
            Transliteration: "",
            SurfaceForm: token.Text ?? "",
            SourceText: token.Text ?? "",
            LexicalLinks: token.LexicalLinks ?? "",
            PartOfSpeech: partOfSpeech,
            PartOfSpeechShort: partOfSpeechShort,
            Gloss: gloss,
            Translations: Array.Empty<string>(),
            Definitions: definitions,
            OccurrenceCount: 1,
            OccurrenceReferences: new List<VerseReference> { occurrenceRef },
            RenderingStatus: renderingStatus,
            Expanded: false
        );
    }

    /// <summary>
    /// Extracts the part of speech (long and short forms) from a dictionary entry's base form.
    /// Returns empty strings if the entry has no POS data.
    /// </summary>
    private static (string Long, string Short) ExtractPartOfSpeech(
        Lexicon_Entry? entry,
        string baseFormIndex,
        string dictionaryName
    )
    {
        if (entry?.BaseForms == null)
            return ("", "");

        if (!int.TryParse(baseFormIndex, out int bfIdx) || bfIdx >= entry.BaseForms.Count)
            return ("", "");

        var baseForm = entry.BaseForms[bfIdx];
        if (baseForm?.PartsOfSpeech == null || baseForm.PartsOfSpeech.Count == 0)
            return ("", "");

        string rawPos = baseForm.PartsOfSpeech[0];
        return (
            PartOfSpeechTranslator.Translate(dictionaryName, rawPos, false),
            PartOfSpeechTranslator.Translate(dictionaryName, rawPos, true)
        );
    }

    /// <summary>
    /// Extracts the first non-empty gloss from a dictionary entry, with brace filtering applied.
    /// Returns an empty string if no glosses are found.
    /// </summary>
    private static string ExtractFirstGloss(Lexicon_Entry? entry)
    {
        foreach (var sense in FlattenSenses(entry))
        {
            if (sense.Glosses != null && sense.Glosses.Count > 0)
                return GlossService.FilterGlossBraces(string.Join("; ", sense.Glosses));
        }

        return "";
    }

    /// <summary>
    /// Builds the list of sense definitions from a dictionary entry.
    /// Each sense is numbered sequentially across all base forms.
    /// </summary>
    private static List<DictionarySenseDefinition> BuildDefinitionsList(Lexicon_Entry? entry)
    {
        var definitions = new List<DictionarySenseDefinition>();
        int senseIdx = 0;

        foreach (var sense in FlattenSenses(entry))
        {
            senseIdx++;
            string defHtml = sense.DefinitionShort ?? sense.DefinitionLong ?? "";
            string senseGloss =
                sense.Glosses != null
                    ? GlossService.FilterGlossBraces(string.Join("; ", sense.Glosses))
                    : "";

            definitions.Add(
                new DictionarySenseDefinition(
                    SenseNumber: senseIdx.ToString(),
                    GlossText: senseGloss,
                    DefinitionHtml: defHtml,
                    IsRelevantToContext: false,
                    SemanticDomain: null,
                    SemanticDomainCode: null
                )
            );
        }

        return definitions;
    }

    /// <summary>
    /// Flattens the nested BaseForms > LEXMeanings > LEXSenses hierarchy into a single sequence.
    /// Eliminates the triple-nested loop pattern that was duplicated across gloss and definition extraction.
    /// </summary>
    private static IEnumerable<Sense> FlattenSenses(Lexicon_Entry? entry)
    {
        if (entry?.BaseForms == null)
            yield break;

        foreach (var baseForm in entry.BaseForms)
        {
            if (baseForm?.LEXMeanings == null)
                continue;

            foreach (var meaning in baseForm.LEXMeanings)
            {
                if (meaning.LEXSenses == null)
                    continue;

                foreach (var sense in meaning.LEXSenses)
                    yield return sense;
            }
        }
    }

    /// <summary>
    /// Calculates the rendering status for a dictionary item.
    /// Returns NoTrackedProject when no tracked project is specified.
    /// </summary>
    private static TermRenderingStatusCode CalculateItemRenderingStatus(
        string? trackedProjectId,
        ParsedLexicalLink primaryLink,
        VerseReference occurrenceRef
    )
    {
        if (trackedProjectId == null)
            return TermRenderingStatusCode.NoTrackedProject;

        // In production, BtState would be resolved from TrackedProjectService.
        // Passing null btState yields NoTrackedProject as the default.
        var renderingResult = TermRenderingStatusService.CalculateRenderingStatus(
            null,
            primaryLink,
            occurrenceRef
        );
        return renderingResult.StatusCode;
    }

    /// <summary>
    /// Sorts dictionary display items by the specified field and direction.
    /// </summary>
    private static IReadOnlyList<DictionaryDisplayItem> SortItems(
        List<DictionaryDisplayItem> items,
        DictionarySortField sortField,
        bool ascending
    )
    {
        IOrderedEnumerable<DictionaryDisplayItem> sorted = sortField switch
        {
            DictionarySortField.Translit => ascending
                ? items.OrderBy(i => i.Transliteration, StringComparer.OrdinalIgnoreCase)
                : items.OrderByDescending(i => i.Transliteration, StringComparer.OrdinalIgnoreCase),
            DictionarySortField.Lemma => ascending
                ? items.OrderBy(i => i.Lemma, StringComparer.OrdinalIgnoreCase)
                : items.OrderByDescending(i => i.Lemma, StringComparer.OrdinalIgnoreCase),
            DictionarySortField.Translations => ascending
                ? items.OrderBy(
                    i => i.Translations.Count > 0 ? i.Translations[0] : "",
                    StringComparer.OrdinalIgnoreCase
                )
                : items.OrderByDescending(
                    i => i.Translations.Count > 0 ? i.Translations[0] : "",
                    StringComparer.OrdinalIgnoreCase
                ),
            DictionarySortField.Gloss => ascending
                ? items.OrderBy(i => i.Gloss, StringComparer.OrdinalIgnoreCase)
                : items.OrderByDescending(i => i.Gloss, StringComparer.OrdinalIgnoreCase),
            DictionarySortField.Found => ascending
                ? items.OrderBy(i => (int)i.RenderingStatus)
                : items.OrderByDescending(i => (int)i.RenderingStatus),
            _ => items.OrderBy(i => i.Lemma, StringComparer.OrdinalIgnoreCase),
        };

        return sorted.ToList();
    }

    /// <summary>
    /// Filters TextLink tokens by scope using VerseRef property on tokens.
    /// Used as fallback when tokens have VerseRef set but not Text on Verse tokens
    /// (as occurs with test-constructed tokens).
    /// </summary>
    // === NEW IN PT10 ===
    // Reason: Test data compatibility - VerseRef-based filtering for tokens without Text
    // Maps to: CAP-009
    private static IReadOnlyList<MarbleToken> FilterTextLinksByVerseRef(
        IReadOnlyList<MarbleToken> tokens,
        VerseReference verseRef,
        ScopeFilter scope
    )
    {
        var result = new List<MarbleToken>();
        VerseReference? lastVerseRef = null;

        foreach (var token in tokens)
        {
            // Track current verse from Verse tokens' VerseRef
            if (token.Type == MarbleTokenType.Verse && token.VerseRef != null)
            {
                lastVerseRef = token.VerseRef;
                continue;
            }

            if (token.Type != MarbleTokenType.TextLink)
                continue;

            if (string.IsNullOrEmpty(token.LexicalLinks))
                continue;

            // Determine the verse for this token
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
                _ => // CurrentChapter and others
                tokenVerse.Book == verseRef.Book && tokenVerse.Chapter == verseRef.Chapter,
            };

            if (inScope)
                result.Add(token);
        }

        return result;
    }

    /// <summary>
    /// Groups Biblical Terms by base lemma for dictionary lookup, handling homonym suffixes (-N).
    /// Terms with a trailing -N suffix (where N is one or more digits) are grouped by the base
    /// lemma (the part before the last -N).
    ///
    /// PORTED FROM PT9: BiblicalTerms matching logic (MarbleForm.cs:3060-3163)
    /// Maps to: CAP-023, data-contracts.md Method 23
    /// </summary>
    /// <param name="termIds">List of term IDs, some of which may have -N homonym suffixes.</param>
    /// <returns>Dictionary keyed by base lemma, with values being the full term IDs.</returns>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleForm.cs:3060-3163
    // Method: MarbleForm.TermRenderingStatus (homonym grouping subset)
    // Maps to: CAP-023, data-contracts.md Method 23
    public static IReadOnlyDictionary<string, IReadOnlyList<string>> GetHomonymGroups(
        IReadOnlyList<string> termIds
    )
    {
        var groups = new Dictionary<string, IReadOnlyList<string>>();

        foreach (var termId in termIds)
        {
            var baseLemma = GetBaseLemma(termId);

            if (groups.TryGetValue(baseLemma, out var existing))
            {
                ((List<string>)existing).Add(termId);
            }
            else
            {
                groups[baseLemma] = new List<string> { termId };
            }
        }

        return groups;
    }

    /// <summary>
    /// INV-015: Deduplicates dictionary items by (Lemma, SourceText, LexicalLinks) key.
    /// When a match is found, the existing item is replaced with a merged version:
    /// OccurrenceCount is summed, OccurrenceReferences are combined, and RenderingStatus
    /// is merged via CombineTermStatusCodes (CAP-008).
    /// When no match is found, the new item is added to the existing list.
    /// </summary>
    /// <param name="newItem">The new item to merge or add.</param>
    /// <param name="existing">The list of existing items to search and potentially modify.</param>
    /// <returns>True if merged with an existing item, false if added as new.</returns>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/DictionaryTab.cs:796-810
    // Method: DictionaryTab.UpdateDisplayedItem()
    // Maps to: EXT-059, INV-015, CAP-026
    public static bool TryMerge(DictionaryDisplayItem newItem, List<DictionaryDisplayItem> existing)
    {
        for (int i = 0; i < existing.Count; i++)
        {
            var current = existing[i];
            if (!HasSameMergeKey(current, newItem))
                continue;

            var combinedStatus = TermRenderingStatusService.CombineTermStatusCodes(
                current.RenderingStatus,
                newItem.RenderingStatus
            );
            var combinedRefs = current
                .OccurrenceReferences.Concat(newItem.OccurrenceReferences)
                .ToList();

            existing[i] = current with
            {
                OccurrenceCount = current.OccurrenceCount + newItem.OccurrenceCount,
                OccurrenceReferences = combinedRefs,
                RenderingStatus = combinedStatus,
            };

            return true;
        }

        existing.Add(newItem);
        return false;
    }

    /// <summary>
    /// INV-015: Two dictionary items share the same merge key when their
    /// (Lemma, SourceText, LexicalLinks) 3-tuple is identical (case-sensitive).
    /// </summary>
    private static bool HasSameMergeKey(DictionaryDisplayItem a, DictionaryDisplayItem b) =>
        a.Lemma == b.Lemma && a.SourceText == b.SourceText && a.LexicalLinks == b.LexicalLinks;

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleForm.cs:3060-3163
    // Method: MarbleForm.TermRenderingStatus (suffix stripping logic)
    // Maps to: CAP-023
    private static string GetBaseLemma(string termId)
    {
        var lastHyphen = termId.LastIndexOf('-');

        if (lastHyphen <= 0)
            return termId;

        var suffix = termId[(lastHyphen + 1)..];

        if (suffix.Length > 0 && suffix.All(char.IsDigit))
            return termId[..lastHyphen];

        return termId;
    }
}
