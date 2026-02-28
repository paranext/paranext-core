using System.Text;
using System.Text.RegularExpressions;
using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Service for lexical link parsing, dictionary lookups, gloss retrieval,
/// and abbreviation lookups.
///
/// Contract: Section 4.1 ParseLexicalLinks (data-contracts.md)
/// Contract: Section 4.4 GetDictionaryEntry (data-contracts.md)
/// Extraction: EXT-001 (Lexical Link Parsing and Format Handling)
/// Extraction: EXT-012 (Dictionary/Lexicon Access Layer)
/// Extraction: EXT-027 (Dictionary Tab Display Item Construction and Deduplication)
/// Behavior: BHV-302 (Lexical Link Data Model), BHV-303 (Lexicon Entry Data Models)
/// Behavior: BHV-308 (SelectedSense Reference String Generation)
/// </summary>
internal static class LexiconService
{
    /// <summary>
    /// Regex for removing brace-enclosed text from glosses.
    /// E.g., "{figurative} to love" -> "to love"
    /// </summary>
    private static readonly Regex s_bracePattern = new(@"\{[^}]*\}\s*", RegexOptions.Compiled);

    /// <summary>
    /// Test seam: looks up a lexicon entry by resolved dictionary and normalized lemma.
    /// When set, returns (entry, baseFormCount) or null if not found.
    /// When null, would use ParatextData APIs for real dictionary lookup.
    /// </summary>
    internal static Func<
        string,
        string,
        string,
        LexiconEntry?
    >? TestDictionaryEntryLookup { get; set; }

    /// <summary>
    /// Test seam: checks whether a dictionary is loaded.
    /// When set, returns the result of the function.
    /// When null, uses the ResourceManager singleton.
    /// </summary>
    internal static Func<string, bool>? TestIsDictionaryLoaded { get; set; }

    /// <summary>
    /// Test seam: resolves dictionary name aliases (e.g., "LN" -> "SDBG").
    /// When set, returns the result of the function.
    /// When null, uses the ResourceManager singleton.
    /// </summary>
    internal static Func<string, string>? TestResolveDictionary { get; set; }

    /// <summary>
    /// Parse semicolon-separated lexical link strings from USX character elements
    /// into structured <see cref="LexicalLink"/> objects.
    /// </summary>
    /// <remarks>
    /// Format: "Dictionary:Lemma:BBBMMM" where BBB and MMM are 3-digit zero-padded indices.
    /// Multiple links separated by semicolons.
    ///
    /// Ported from PT9 MarbleLexicalLink.cs:30-57 (EXT-001).
    /// PT9 silently drops malformed links; PT10 returns explicit error results per contract.
    /// </remarks>
    public static Task<ParseLexicalLinksResult> ParseLexicalLinksAsync(
        LexicalLinkInput input,
        CancellationToken ct
    )
    {
        if (string.IsNullOrEmpty(input.LinkString))
            return CreateErrorResult("INVALID_INPUT", "Link string must not be null or empty");

        string[] linkParts = input.LinkString.Split(';');
        var links = new List<LexicalLink>(linkParts.Length);

        foreach (string linkPart in linkParts)
        {
            ParseLexicalLinksResult? error = ParseSingleLink(linkPart, out LexicalLink? link);
            if (error is not null)
                return Task.FromResult(error);

            links.Add(link!);
        }

        return Task.FromResult(new ParseLexicalLinksResult(true, links));
    }

    /// <summary>
    /// Parse a single "Dictionary:Lemma:BBBMMM" link string into a <see cref="LexicalLink"/>.
    /// </summary>
    /// <returns>
    /// An error result if the link is malformed; <c>null</c> on success
    /// (with <paramref name="link"/> populated).
    /// </returns>
    private static ParseLexicalLinksResult? ParseSingleLink(string linkPart, out LexicalLink? link)
    {
        link = null;

        string[] parts = linkPart.Split(':');
        if (parts.Length != 3)
            return CreateParseError(
                "Invalid lexical link format: expected 'Dictionary:Lemma:BBBMMM'"
            );

        string indices = parts[2];
        if (
            indices.Length < 6
            || !int.TryParse(indices[..3], out int baseFormIndex)
            || !int.TryParse(indices[3..6], out int meaningIndex)
        )
            return CreateParseError("Invalid base form or meaning index in link");

        link = new LexicalLink(parts[0], parts[1], baseFormIndex, meaningIndex);
        return null;
    }

    /// <summary>
    /// Determines the dictionary name for a given book number based on testament.
    /// </summary>
    /// <remarks>
    /// Invariant INV-013: OT -> SDBH, NT -> SDBG, DC -> DCLEX.
    /// Ported from PT9 MarbleDataAccess.cs:373-376.
    /// </remarks>
    public static string GetDictionaryForBook(int bookNumber)
    {
        if (Canon.IsBookOT(bookNumber))
            return "SDBH";
        if (Canon.IsBookNT(bookNumber))
            return "SDBG";
        return "DCLEX";
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs:373-441,1043-1479
    // Method: MarbleDataAccess.GetLexiconEntry() + BestSense() + gloss filtering
    // Maps to: EXT-012, BHV-303, BHV-308, INV-016
    /// <summary>
    /// Look up a lexicon entry by dictionary, lemma, and indices, returning
    /// structured entry data with localized glosses.
    /// </summary>
    /// <remarks>
    /// Contract: Section 4.4 GetDictionaryEntry (data-contracts.md)
    /// Behaviors: BHV-302, BHV-303, BHV-308
    /// Invariant: INV-016 (Lemma Unicode normalization to FormD)
    /// </remarks>
    public static Task<DictionaryResult> GetDictionaryEntryAsync(
        DictionaryLookupInput input,
        CancellationToken ct
    )
    {
        // Step 1: Resolve dictionary alias (VAL-009: "LN" -> "SDBG")
        string resolvedDictionary = ResolveDictionaryName(input.Dictionary);

        // Step 2: Correct legacy language codes (VAL-008: "sp" -> "es")
        string glossLanguageId = CorrectLanguageCode(input.GlossLanguageId);

        // Step 3: Check dictionary is loaded (INVALID_STATE)
        if (!IsDictionaryLoadedCheck(resolvedDictionary))
        {
            return Task.FromResult(
                new DictionaryResult(
                    Success: false,
                    Error: new ErrorInfo(
                        "INVALID_STATE",
                        $"Dictionary '{resolvedDictionary}' data not available"
                    )
                )
            );
        }

        // Step 4: Normalize lemma to Unicode FormD (INV-016)
        string normalizedLemma = input.Lemma.Normalize(NormalizationForm.FormD);

        // Step 5: Look up entry
        LexiconEntry? entry = LookupEntry(resolvedDictionary, normalizedLemma, glossLanguageId);

        if (entry == null)
        {
            return Task.FromResult(
                new DictionaryResult(
                    Success: false,
                    Error: new ErrorInfo(
                        "NOT_FOUND",
                        $"No entry found for lemma '{normalizedLemma}' in {resolvedDictionary}"
                    )
                )
            );
        }

        // Step 6: Validate base form index (INVALID_INPUT)
        if (input.BaseFormIndex < 1 || input.BaseFormIndex > entry.BaseForms.Count)
        {
            return Task.FromResult(
                new DictionaryResult(
                    Success: false,
                    Error: new ErrorInfo(
                        "INVALID_INPUT",
                        $"Base form index {input.BaseFormIndex} out of range"
                    )
                )
            );
        }

        // Step 7: Validate meaning index (INVALID_INPUT)
        var selectedBaseForm = entry.BaseForms[input.BaseFormIndex - 1];
        if (input.MeaningIndex < 1 || input.MeaningIndex > selectedBaseForm.Meanings.Count)
        {
            return Task.FromResult(
                new DictionaryResult(
                    Success: false,
                    Error: new ErrorInfo(
                        "INVALID_INPUT",
                        $"Meaning index {input.MeaningIndex} out of range"
                    )
                )
            );
        }

        // Step 8: Apply brace filtering to glosses (BHV-303, GM-018)
        // Step 9: Format selectedSenseRef (BHV-308)
        var processedEntry = ApplyGlossProcessing(entry);

        return Task.FromResult(new DictionaryResult(Success: true, Entry: processedEntry));
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/DictionaryTab.cs:~200-500
    // Method: DictionaryTab deduplication logic
    // Maps to: EXT-027, BHV-302
    /// <summary>
    /// Deduplicates dictionary display items based on BHV-302 rules:
    /// - Same translation + same surface form = one row
    /// - Same translation + different surface forms = separate rows
    /// - Different translations + same lemma = separate rows
    /// </summary>
    /// <remarks>
    /// Extraction: EXT-027 (Dictionary Tab Loading)
    /// Golden Master: GM-036 (Dictionary Deduplication)
    /// </remarks>
    public static IReadOnlyList<DictionaryDisplayItem> DeduplicateDictionaryItems(
        IReadOnlyList<DictionaryDisplayItem> items
    )
    {
        return items
            .GroupBy(item => (item.Lemma, item.SurfaceText, item.Translation))
            .Select(group => group.First())
            .ToList();
    }

    /// <summary>
    /// Resolves dictionary name aliases (VAL-009: "LN" -> "SDBG").
    /// </summary>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs:373-376
    // Method: MarbleDataAccess dictionary alias resolution
    // Maps to: INV-C19
    private static string ResolveDictionaryName(string dictionaryName)
    {
        if (TestResolveDictionary != null)
            return TestResolveDictionary(dictionaryName);

        // Hardcoded alias for now; production would use ResourceManager
        return dictionaryName == "LN" ? "SDBG" : dictionaryName;
    }

    /// <summary>
    /// Corrects legacy language codes (VAL-008: "sp" -> "es").
    /// </summary>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleDataAccess.cs:1043-1100
    // Method: MarbleDataAccess language code correction
    // Maps to: VAL-008
    private static string CorrectLanguageCode(string languageCode) =>
        languageCode == "sp" ? "es" : languageCode;

    /// <summary>
    /// Checks whether a dictionary is loaded.
    /// </summary>
    private static bool IsDictionaryLoadedCheck(string dictionaryName)
    {
        if (TestIsDictionaryLoaded != null)
            return TestIsDictionaryLoaded(dictionaryName);

        // Known dictionaries are always considered loaded in test context
        return dictionaryName is "SDBG" or "SDBH" or "DCLEX";
    }

    /// <summary>
    /// Looks up a lexicon entry by dictionary and normalized lemma.
    /// </summary>
    private static LexiconEntry? LookupEntry(
        string dictionary,
        string normalizedLemma,
        string glossLanguageId
    )
    {
        if (TestDictionaryEntryLookup != null)
            return TestDictionaryEntryLookup(dictionary, normalizedLemma, glossLanguageId);

        // Production: would use ParatextData APIs
        return null;
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleLexiconEntry.cs:374-396
    // Method: MarbleLexiconEntry.BestSense() gloss filtering
    // Maps to: BHV-303, BHV-308, GM-018
    /// <summary>
    /// Applies brace filtering to glosses and formats selectedSenseRef strings.
    /// </summary>
    private static LexiconEntry ApplyGlossProcessing(LexiconEntry entry)
    {
        bool isMultiBaseForm = entry.BaseForms.Count > 1;

        var processedBaseForms = new List<LexiconBaseForm>(entry.BaseForms.Count);
        for (int bfIdx = 0; bfIdx < entry.BaseForms.Count; bfIdx++)
        {
            var bf = entry.BaseForms[bfIdx];
            var processedMeanings = new List<LexiconMeaning>(bf.Meanings.Count);

            for (int mIdx = 0; mIdx < bf.Meanings.Count; mIdx++)
            {
                var meaning = bf.Meanings[mIdx];
                var processedSenses = new List<LexiconSense>(meaning.Senses.Count);

                foreach (var sense in meaning.Senses)
                {
                    // BHV-303/GM-018: Filter braces from gloss
                    string filteredGloss = FilterBraces(sense.Gloss);

                    // BHV-308: Format selectedSenseRef
                    // Multi-baseform: "{homograph}-{sense}" (1-based display)
                    // Single-baseform: "{sense}" only
                    string selectedSenseRef = isMultiBaseForm
                        ? $"{bfIdx + 1}-{mIdx + 1}"
                        : $"{mIdx + 1}";

                    processedSenses.Add(
                        new LexiconSense(
                            SenseId: sense.SenseId,
                            Gloss: filteredGloss,
                            GlossLanguageId: sense.GlossLanguageId,
                            OccurrenceCount: sense.OccurrenceCount,
                            SelectedSenseRef: selectedSenseRef
                        )
                    );
                }

                processedMeanings.Add(
                    new LexiconMeaning(
                        Index: meaning.Index,
                        Senses: processedSenses,
                        Domains: meaning.Domains,
                        Notes: meaning.Notes
                    )
                );
            }

            processedBaseForms.Add(
                new LexiconBaseForm(
                    Index: bf.Index,
                    LexicalForm: bf.LexicalForm,
                    PosTag: bf.PosTag,
                    Meanings: processedMeanings
                )
            );
        }

        return new LexiconEntry(
            EntryId: entry.EntryId,
            Lemma: entry.Lemma,
            Dictionary: entry.Dictionary,
            BaseForms: processedBaseForms
        );
    }

    /// <summary>
    /// Removes brace-enclosed text and trailing whitespace from gloss strings.
    /// E.g., "{figurative} to love" -> "to love"
    /// </summary>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/MarbleLexiconEntry.cs:374-396
    // Method: Gloss brace filtering
    // Maps to: BHV-303, GM-018
    private static string FilterBraces(string gloss) => s_bracePattern.Replace(gloss, "").Trim();

    private static Task<ParseLexicalLinksResult> CreateErrorResult(string code, string message) =>
        Task.FromResult(new ParseLexicalLinksResult(false, Error: new ErrorInfo(code, message)));

    private static ParseLexicalLinksResult CreateParseError(string message) =>
        new(false, Error: new ErrorInfo("PARSE_ERROR", message));
}
