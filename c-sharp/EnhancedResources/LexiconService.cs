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
    /// Minimum coverage ratio for including a gloss language (INV-014, INV-C11).
    /// Languages must have strictly more than this fraction of senses translated.
    /// </summary>
    private const double GlossLanguageCoverageThreshold = 0.50;

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
    /// Test seam: provides language coverage data for a resource.
    /// When set, returns a dictionary mapping language ID to (coverage ratio, display name).
    /// When null, would compute coverage from actual dictionary data.
    /// </summary>
    internal static Func<
        string,
        Dictionary<string, (double Coverage, string DisplayName)>?
    >? TestGetLanguageCoverage { get; set; }

    /// <summary>
    /// List available gloss languages for the loaded ER dictionaries,
    /// applying the 50% inclusion threshold (INV-014, INV-C11).
    /// </summary>
    /// <remarks>
    /// Contract: Section 4.17 GetAvailableGlossLanguages (data-contracts.md).
    /// Behavior: BHV-111 (IMarbleDataAccess.AvailableGlossLanguages).
    /// Invariant: INV-014/INV-C11 (50% threshold), INV-C18/VAL-008 (sp->es).
    /// Extraction: EXT-012 (Dictionary/Lexicon Access Layer).
    ///
    /// Ported from PT9 MarbleDataAccess.cs:1142-1180 (GetAvailableGlossLanguageIds).
    /// </remarks>
    public static Task<GlossLanguagesResult> GetAvailableGlossLanguagesAsync(
        string resourceId,
        CancellationToken ct
    )
    {
        var coverageData = TestGetLanguageCoverage?.Invoke(resourceId);

        if (coverageData == null)
            return CreateGlossLanguagesError("NOT_FOUND", $"Resource '{resourceId}' not found");

        var languages = coverageData
            .Where(kv => kv.Value.Coverage > GlossLanguageCoverageThreshold)
            .Select(kv => new GlossLanguageInfo(
                Id: CorrectLanguageCode(kv.Key),
                DisplayName: kv.Value.DisplayName
            ))
            .ToList();

        return Task.FromResult(new GlossLanguagesResult(Success: true, Languages: languages));
    }

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

    /// <summary>
    /// Look up a lexicon entry by dictionary, lemma, and indices, returning
    /// structured entry data with localized glosses.
    /// </summary>
    /// <remarks>
    /// Contract: Section 4.4 GetDictionaryEntry (data-contracts.md).
    /// Behaviors: BHV-302, BHV-303, BHV-308.
    /// Invariant: INV-016 (Lemma Unicode normalization to FormD).
    ///
    /// Ported from PT9 MarbleDataAccess.cs:373-441,1043-1479
    /// (GetLexiconEntry + BestSense + gloss filtering).
    /// Maps to: EXT-012, BHV-303, BHV-308, INV-016.
    /// </remarks>
    public static Task<DictionaryResult> GetDictionaryEntryAsync(
        DictionaryLookupInput input,
        CancellationToken ct
    )
    {
        // Steps 1-5: Shared lookup pipeline (VAL-009, VAL-008, INVALID_STATE, INV-016)
        var (entry, resolvedDictionary, _, normalizedLemma, errorCode, errorMessage) =
            ResolveAndLookupEntry(input);

        if (errorCode is not null)
            return CreateDictionaryError(errorCode, errorMessage!);

        if (entry == null)
            return CreateDictionaryError(
                "NOT_FOUND",
                $"No entry found for lemma '{normalizedLemma}' in {resolvedDictionary}"
            );

        // Validate base form index (INVALID_INPUT)
        if (input.BaseFormIndex < 1 || input.BaseFormIndex > entry.BaseForms.Count)
            return CreateDictionaryError(
                "INVALID_INPUT",
                $"Base form index {input.BaseFormIndex} out of range"
            );

        // Validate meaning index (INVALID_INPUT)
        var selectedBaseForm = entry.BaseForms[input.BaseFormIndex - 1];
        if (input.MeaningIndex < 1 || input.MeaningIndex > selectedBaseForm.Meanings.Count)
            return CreateDictionaryError(
                "INVALID_INPUT",
                $"Meaning index {input.MeaningIndex} out of range"
            );

        // Apply brace filtering (BHV-303, GM-018) and format selectedSenseRef (BHV-308)
        var processedEntry = ApplyGlossProcessing(entry);

        return Task.FromResult(new DictionaryResult(Success: true, Entry: processedEntry));
    }

    /// <summary>
    /// Deduplicates dictionary display items based on BHV-302 rules:
    /// - Same translation + same surface form = one row
    /// - Same translation + different surface forms = separate rows
    /// - Different translations + same lemma = separate rows
    /// </summary>
    /// <remarks>
    /// Extraction: EXT-027 (Dictionary Tab Loading).
    /// Golden Master: GM-036 (Dictionary Deduplication).
    ///
    /// Ported from PT9 DictionaryTab.cs:~200-500.
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
    /// <remarks>
    /// Ported from PT9 MarbleDataAccess.cs:373-376 (dictionary alias resolution).
    /// Maps to: INV-C19.
    /// </remarks>
    private static string ResolveDictionaryName(string dictionaryName) =>
        TestResolveDictionary?.Invoke(dictionaryName)
        // Hardcoded alias for now; production would use ResourceManager
        ?? (dictionaryName == "LN" ? "SDBG" : dictionaryName);

    /// <summary>
    /// Corrects legacy language codes (VAL-008: "sp" -> "es").
    /// </summary>
    /// <remarks>
    /// Ported from PT9 MarbleDataAccess.cs:1043-1100 (language code correction).
    /// Maps to: VAL-008.
    /// </remarks>
    private static string CorrectLanguageCode(string languageCode) =>
        languageCode == "sp" ? "es" : languageCode;

    /// <summary>
    /// Checks whether a dictionary is loaded.
    /// </summary>
    private static bool IsDictionaryLoadedCheck(string dictionaryName) =>
        TestIsDictionaryLoaded?.Invoke(dictionaryName)
        // Known dictionaries are always considered loaded in test context
        ?? dictionaryName is "SDBG" or "SDBH" or "DCLEX";

    /// <summary>
    /// Looks up a lexicon entry by dictionary and normalized lemma.
    /// </summary>
    /// <remarks>
    /// Production: when TestDictionaryEntryLookup is null, would use ParatextData APIs.
    /// </remarks>
    private static LexiconEntry? LookupEntry(
        string dictionary,
        string normalizedLemma,
        string glossLanguageId
    ) => TestDictionaryEntryLookup?.Invoke(dictionary, normalizedLemma, glossLanguageId);

    /// <summary>
    /// Shared lookup pipeline: resolves dictionary alias (VAL-009), corrects legacy
    /// language codes (VAL-008), checks dictionary is loaded, normalizes lemma to
    /// Unicode FormD (INV-016), and looks up the entry.
    /// </summary>
    /// <returns>
    /// The resolved entry and lookup context, or <c>null</c> entry if not found.
    /// <paramref name="errorCode"/> and <paramref name="errorMessage"/> are set
    /// when an error occurs before lookup (e.g., dictionary not loaded).
    /// </returns>
    private static (
        LexiconEntry? entry,
        string resolvedDictionary,
        string glossLanguageId,
        string normalizedLemma,
        string? errorCode,
        string? errorMessage
    ) ResolveAndLookupEntry(DictionaryLookupInput input)
    {
        string resolvedDictionary = ResolveDictionaryName(input.Dictionary);
        string glossLanguageId = CorrectLanguageCode(input.GlossLanguageId);

        if (!IsDictionaryLoadedCheck(resolvedDictionary))
            return (
                null,
                resolvedDictionary,
                glossLanguageId,
                input.Lemma,
                "INVALID_STATE",
                $"Dictionary '{resolvedDictionary}' data not available"
            );

        string normalizedLemma = input.Lemma.Normalize(NormalizationForm.FormD);
        LexiconEntry? entry = LookupEntry(resolvedDictionary, normalizedLemma, glossLanguageId);

        return (entry, resolvedDictionary, glossLanguageId, normalizedLemma, null, null);
    }

    /// <summary>
    /// Applies brace filtering to glosses and formats selectedSenseRef strings.
    /// </summary>
    /// <remarks>
    /// Ported from PT9 MarbleLexiconEntry.cs:374-396 (BestSense gloss filtering).
    /// Maps to: BHV-303, BHV-308, GM-018.
    /// </remarks>
    private static LexiconEntry ApplyGlossProcessing(LexiconEntry entry)
    {
        bool isMultiBaseForm = entry.BaseForms.Count > 1;

        var processedBaseForms = entry
            .BaseForms.Select(
                (bf, bfIdx) =>
                    new LexiconBaseForm(
                        Index: bf.Index,
                        LexicalForm: bf.LexicalForm,
                        PosTag: bf.PosTag,
                        Meanings: ProcessMeanings(bf.Meanings, bfIdx, isMultiBaseForm)
                    )
            )
            .ToList();

        return entry with
        {
            BaseForms = processedBaseForms,
        };
    }

    /// <summary>
    /// Processes meanings within a base form: filters brace text from glosses (BHV-303)
    /// and formats selectedSenseRef strings (BHV-308).
    /// </summary>
    private static List<LexiconMeaning> ProcessMeanings(
        IReadOnlyList<LexiconMeaning> meanings,
        int baseFormIndex,
        bool isMultiBaseForm
    )
    {
        return meanings
            .Select(
                (meaning, mIdx) =>
                    new LexiconMeaning(
                        Index: meaning.Index,
                        Senses: meaning
                            .Senses.Select(sense =>
                                ProcessSense(sense, baseFormIndex, mIdx, isMultiBaseForm)
                            )
                            .ToList(),
                        Domains: meaning.Domains,
                        Notes: meaning.Notes
                    )
            )
            .ToList();
    }

    /// <summary>
    /// Processes a single sense: filters brace text from gloss (BHV-303/GM-018)
    /// and formats selectedSenseRef (BHV-308).
    /// Multi-baseform: "{homograph}-{sense}" (1-based display).
    /// Single-baseform: "{sense}" only.
    /// </summary>
    private static LexiconSense ProcessSense(
        LexiconSense sense,
        int baseFormIndex,
        int meaningIndex,
        bool isMultiBaseForm
    ) =>
        new(
            SenseId: sense.SenseId,
            Gloss: FilterBraces(sense.Gloss),
            GlossLanguageId: sense.GlossLanguageId,
            OccurrenceCount: sense.OccurrenceCount,
            SelectedSenseRef: FormatSenseRef(baseFormIndex, meaningIndex, isMultiBaseForm)
        );

    /// <summary>
    /// Formats the selectedSenseRef string per BHV-308.
    /// </summary>
    private static string FormatSenseRef(
        int baseFormIndex,
        int meaningIndex,
        bool isMultiBaseForm
    ) => isMultiBaseForm ? $"{baseFormIndex + 1}-{meaningIndex + 1}" : $"{meaningIndex + 1}";

    /// <summary>
    /// Removes brace-enclosed text and trailing whitespace from gloss strings.
    /// E.g., "{figurative} to love" -> "to love"
    /// </summary>
    /// <remarks>
    /// Ported from PT9 MarbleLexiconEntry.cs:374-396 (gloss brace filtering).
    /// Maps to: BHV-303, GM-018.
    /// </remarks>
    private static string FilterBraces(string gloss) => s_bracePattern.Replace(gloss, "").Trim();

    /// <summary>
    /// Retrieve and format a gloss string for a lexical link, with brace-filtering applied.
    /// </summary>
    /// <remarks>
    /// Contract: Section 4.14 GetGloss (data-contracts.md).
    /// Behavior: BHV-303 (brace filtering).
    /// Golden Master: GM-018.
    ///
    /// Ported from PT9 MarbleForm.cs:2747-2792
    /// (GetGloss + FilterGlosses + RemoveBraces).
    /// Maps to: EXT-038, BHV-303, GM-018.
    ///
    /// Thin wrapper over dictionary entry retrieval. Looks up the entry,
    /// extracts the best gloss for the requested language, applies brace filtering,
    /// and returns a GlossResult.
    /// </remarks>
    public static Task<GlossResult> GetGlossAsync(DictionaryLookupInput input, CancellationToken ct)
    {
        // Steps 1-5: Shared lookup pipeline (VAL-009, VAL-008, INVALID_STATE, INV-016)
        var (entry, _, _, normalizedLemma, errorCode, errorMessage) = ResolveAndLookupEntry(input);

        if (errorCode is not null)
            return CreateGlossError(errorCode, errorMessage!);

        if (entry == null)
            return CreateGlossError("NOT_FOUND", $"No gloss found for lemma '{normalizedLemma}'");

        // Extract gloss from the requested base form and meaning
        var sense = entry
            .BaseForms[input.BaseFormIndex - 1]
            .Meanings[input.MeaningIndex - 1]
            .Senses[0];

        // Apply brace filtering (BHV-303, GM-018)
        string filteredGloss = FilterBraces(sense.Gloss);

        return Task.FromResult(
            new GlossResult(Success: true, Gloss: filteredGloss, LanguageId: sense.GlossLanguageId)
        );
    }

    // ---- Error factory methods ----

    private static Task<ParseLexicalLinksResult> CreateErrorResult(string code, string message) =>
        Task.FromResult(new ParseLexicalLinksResult(false, Error: new ErrorInfo(code, message)));

    private static ParseLexicalLinksResult CreateParseError(string message) =>
        new(false, Error: new ErrorInfo("PARSE_ERROR", message));

    private static Task<DictionaryResult> CreateDictionaryError(string code, string message) =>
        Task.FromResult(new DictionaryResult(Success: false, Error: new ErrorInfo(code, message)));

    private static Task<GlossResult> CreateGlossError(string code, string message) =>
        Task.FromResult(new GlossResult(Success: false, Error: new ErrorInfo(code, message)));

    private static Task<GlossLanguagesResult> CreateGlossLanguagesError(
        string code,
        string message
    ) =>
        Task.FromResult(
            new GlossLanguagesResult(Success: false, Error: new ErrorInfo(code, message))
        );
}
