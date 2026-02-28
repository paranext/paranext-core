using System.Text;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Translates part-of-speech tags from SDBH (Hebrew) and SDBG (Greek) formats
/// to human-readable text in both long and short forms.
///
/// Contract: Section 4.8 TranslatePartOfSpeech (data-contracts.md)
/// Behavior: BHV-610 (Part-of-Speech Translation System)
/// Extraction: EXT-008 (POS Translation Worker B1)
///
/// PT9 Source: Paratext.Marble.PartOfSpeechTranslator
/// </summary>
internal static class PosTranslationService
{
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/PartOfSpeechTranslator.cs:11-1138
    // Method: PartOfSpeechTranslator (static class)
    // Maps to: EXT-008, BHV-610

    #region Static tag data (ported from PT9 embedded JSON)

    // Greek tag structure: tag_options maps category -> ordered list of option codes
    private static readonly Dictionary<string, string[]> s_greekTagOptions =
        new()
        {
            { "case", new[] { "a", "d", "g", "-", "n", "v" } },
            { "case_possessed", new[] { "a", "d", "g", "-", "n", "v" } },
            { "declinable", new[] { "i", "-", "d" } },
            { "gender", new[] { "m", "n", "-", "f" } },
            { "gender_possessed", new[] { "m", "n", "-", "f" } },
            { "level", new[] { "--", "cp", "-p", "c-" } },
            { "location", new[] { "e", "b", "-", "p", "f" } },
            { "mood", new[] { "i", "-", "m", "o", "n", "p", "s", "r" } },
            { "number", new[] { "p", "s", "-" } },
            { "number_possessed", new[] { "p", "s", "-" } },
            {
                "part_of_speech",
                new[]
                {
                    "adjc",
                    "advb",
                    "anum",
                    "aram",
                    "artc",
                    "cndp",
                    "conj",
                    "hebr",
                    "intj",
                    "nlet",
                    "noun",
                    "nprp",
                    "part",
                    "pcir",
                    "pcor",
                    "pdem",
                    "pidf",
                    "pirg",
                    "pnct",
                    "ppos",
                    "pprs",
                    "prec",
                    "prel",
                    "prep",
                    "prfl",
                    "pstp",
                    "vfin",
                    "vinf",
                    "vptc",
                }
            },
            { "person", new[] { "1", "3", "2", "-" } },
            { "separator_dash", new[] { "-" } },
            { "taxis", new[] { "c", "-", "s" } },
            { "tense", new[] { "-f", "-a", "2r", "--", "-l", "-i", "2f", "-p", "-r", "2l", "2a" } },
            { "voice", new[] { "a", "e", "d", "-", "m", "o", "n", "p" } },
        };

    // Greek tag_sequence: root POS -> ordered list of categories to parse
    private static readonly Dictionary<string, string[]> s_greekTagSequence =
        new()
        {
            { "adjc", new[] { "separator_dash", "declinable", "case", "gender", "number" } },
            { "advb", new[] { "separator_dash", "declinable" } },
            { "anum", new[] { "separator_dash", "declinable" } },
            { "aram", new[] { "separator_dash", "declinable" } },
            { "artc", new[] { "separator_dash", "declinable", "case", "gender", "number" } },
            { "cndp", new[] { "separator_dash", "declinable" } },
            { "conj", new[] { "separator_dash", "declinable", "taxis", "location", "level" } },
            { "hebr", new[] { "separator_dash", "declinable" } },
            { "intj", new[] { "separator_dash", "declinable" } },
            { "nlet", new[] { "separator_dash", "declinable" } },
            { "noun", new[] { "separator_dash", "declinable", "case", "gender", "number" } },
            { "nprp", new[] { "separator_dash", "declinable", "case", "gender", "number" } },
            { "part", new[] { "separator_dash", "declinable" } },
            {
                "pcir",
                new[] { "separator_dash", "declinable", "person", "case", "gender", "number" }
            },
            {
                "pcor",
                new[] { "separator_dash", "declinable", "person", "case", "gender", "number" }
            },
            {
                "pdem",
                new[] { "separator_dash", "declinable", "person", "case", "gender", "number" }
            },
            {
                "pidf",
                new[] { "separator_dash", "declinable", "person", "case", "gender", "number" }
            },
            {
                "pirg",
                new[] { "separator_dash", "declinable", "person", "case", "gender", "number" }
            },
            { "pnct", new[] { "separator_dash", "declinable" } },
            {
                "ppos",
                new[]
                {
                    "separator_dash",
                    "declinable",
                    "person",
                    "number",
                    "case_possessed",
                    "gender_possessed",
                    "number_possessed",
                }
            },
            {
                "pprs",
                new[] { "separator_dash", "declinable", "person", "case", "gender", "number" }
            },
            {
                "prec",
                new[] { "separator_dash", "declinable", "person", "case", "gender", "number" }
            },
            {
                "prel",
                new[] { "separator_dash", "declinable", "person", "case", "gender", "number" }
            },
            { "prep", new[] { "separator_dash", "declinable" } },
            {
                "prfl",
                new[] { "separator_dash", "declinable", "person", "case", "gender", "number" }
            },
            { "pstp", new[] { "separator_dash", "declinable" } },
            {
                "vfin",
                new[]
                {
                    "separator_dash",
                    "declinable",
                    "tense",
                    "voice",
                    "mood",
                    "person",
                    "number",
                }
            },
            { "vinf", new[] { "separator_dash", "declinable", "tense", "voice" } },
            {
                "vptc",
                new[]
                {
                    "separator_dash",
                    "declinable",
                    "tense",
                    "voice",
                    "mood",
                    "case",
                    "gender",
                    "number",
                }
            },
        };

    // Greek translations: tag id -> English long form
    private static readonly Dictionary<string, string> s_greekLongTranslations =
        new()
        {
            { "case--", "" },
            { "case-a", "accusative" },
            { "case-d", "dative" },
            { "case-g", "genitive" },
            { "case-n", "nominative" },
            { "case-v", "vocative" },
            { "case_possessed--", "" },
            { "case_possessed-a", "accusative" },
            { "case_possessed-d", "dative" },
            { "case_possessed-g", "genitive" },
            { "case_possessed-n", "nominative" },
            { "declinable--", "" },
            { "declinable-d", "declinable" },
            { "declinable-i", "indeclinable" },
            { "gender--", "" },
            { "gender-f", "feminine" },
            { "gender-m", "masculine" },
            { "gender-n", "neuter" },
            { "gender_possessed--", "" },
            { "gender_possessed-f", "feminine" },
            { "gender_possessed-m", "masculine" },
            { "gender_possessed-n", "neuter" },
            { "level---", "" },
            { "level--p", "interphrasal" },
            { "level-c-", "interclausal" },
            { "level-cp", "both interclausal and interphrasal" },
            { "location--", "" },
            { "location-b", "between" },
            { "location-e", "fronted or between" },
            { "location-f", "fronted" },
            { "location-p", "postpositive" },
            { "mood--", "" },
            { "mood-i", "indicative" },
            { "mood-m", "imperative" },
            { "mood-n", "infinitive" },
            { "mood-o", "optative" },
            { "mood-p", "participle" },
            { "mood-r", "participle with imperatival force" },
            { "mood-s", "subjunctive" },
            { "number--", "" },
            { "number-p", "plural" },
            { "number-s", "singular" },
            { "number_possessed--", "" },
            { "number_possessed-p", "plural" },
            { "number_possessed-s", "singular" },
            { "part_of_speech-adjc", "adjective" },
            { "part_of_speech-advb", "adverb" },
            { "part_of_speech-anum", "indeclinable number" },
            { "part_of_speech-aram", "aramaic word" },
            { "part_of_speech-artc", "article" },
            { "part_of_speech-cndp", "conditional particle" },
            { "part_of_speech-conj", "conjunction" },
            { "part_of_speech-hebr", "hebrew word" },
            { "part_of_speech-intj", "interjection" },
            { "part_of_speech-nlet", "indeclinable letter" },
            { "part_of_speech-noun", "noun" },
            { "part_of_speech-nprp", "proper noun" },
            { "part_of_speech-part", "particle" },
            { "part_of_speech-pcir", "correlative or interrogative pronoun" },
            { "part_of_speech-pcor", "correlative pronoun" },
            { "part_of_speech-pdem", "demonstrative pronoun" },
            { "part_of_speech-pidf", "indefinite pronoun" },
            { "part_of_speech-pirg", "interrogative pronoun" },
            { "part_of_speech-pnct", "punctuation" },
            { "part_of_speech-ppos", "possessive pronoun" },
            { "part_of_speech-pprs", "personal pronoun" },
            { "part_of_speech-prec", "reciprocal pronoun" },
            { "part_of_speech-prel", "relative pronoun" },
            { "part_of_speech-prep", "preposition" },
            { "part_of_speech-prfl", "reflexive pronoun" },
            { "part_of_speech-pstp", "postposition" },
            { "part_of_speech-vfin", "v, finite" },
            { "part_of_speech-vinf", "v, infinitive" },
            { "part_of_speech-vptc", "v, participle" },
            { "person--", "" },
            { "person-1", "1st person" },
            { "person-2", "2nd person" },
            { "person-3", "3rd person" },
            { "separator_dash--", "" },
            { "taxis--", "" },
            { "taxis-c", "coordinating" },
            { "taxis-s", "subordinating" },
            { "tense---", "" },
            { "tense--a", "aorist" },
            { "tense--f", "future" },
            { "tense--i", "imperfect" },
            { "tense--l", "pluperfect" },
            { "tense--p", "present" },
            { "tense--r", "perfect" },
            { "tense-2a", "2nd aorist" },
            { "tense-2f", "2nd future" },
            { "tense-2l", "2nd pluperfect" },
            { "tense-2r", "2nd perfect" },
            { "voice--", "" },
            { "voice-a", "active" },
            { "voice-d", "middle deponent" },
            { "voice-e", "middle or passive" },
            { "voice-m", "middle" },
            { "voice-n", "middle or passive deponent" },
            { "voice-o", "passive deponent" },
            { "voice-p", "passive" },
        };

    // Hebrew tag structure: tag_options maps category -> ordered list of option codes
    private static readonly Dictionary<string, string[]> s_hebrewTagOptions =
        new()
        {
            { "gender", new[] { "-", "?", "f", "m" } },
            { "language", new[] { "A", "H" } },
            { "ng", new[] { "s?", "sf", "sm", "d?", "df", "dm", "p?", "pf", "pm" } },
            {
                "part_of_speech",
                new[]
                {
                    "ar",
                    "vb",
                    "ns",
                    "np",
                    "ab",
                    "pr",
                    "cj",
                    "pp",
                    "pd",
                    "pi",
                    "ij",
                    "ng",
                    "ir",
                    "aj",
                }
            },
            {
                "png",
                new[]
                {
                    "???",
                    "?sf",
                    "?sm",
                    "?pm",
                    "?pf",
                    "1s?",
                    "2sm",
                    "2sf",
                    "3sm",
                    "3sf",
                    "1p?",
                    "2pm",
                    "2pf",
                    "3p?",
                    "3pm",
                    "3pf",
                }
            },
            { "state", new[] { "-", "?", "a", "c", "e" } },
            {
                "suffix",
                new[]
                {
                    "---",
                    "???",
                    "1s?",
                    "2sm",
                    "2sf",
                    "3sm",
                    "3sf",
                    "1p?",
                    "2pm",
                    "2pf",
                    "3pm",
                    "3pf",
                }
            },
            {
                "verbal_stem",
                new[]
                {
                    "----",
                    "afel",
                    "esht",
                    "etpa",
                    "etpe",
                    "etta",
                    "haf-",
                    "hif-",
                    "hit-",
                    "hof-",
                    "hotp",
                    "hsht",
                    "htpa",
                    "htpe",
                    "htpo",
                    "nif-",
                    "nit-",
                    "pael",
                    "pasq",
                    "peal",
                    "peil",
                    "piel",
                    "poal",
                    "poel",
                    "pual",
                    "qal-",
                    "shaf",
                    "tif-",
                }
            },
            {
                "verbal_tense",
                new[]
                {
                    "----",
                    "impf",
                    "impv",
                    "infa",
                    "infc",
                    "perf",
                    "ptca",
                    "ptcp",
                    "wayq",
                    "weyq",
                }
            },
        };

    // Hebrew tag_sequence: root POS -> ordered list of categories to parse
    private static readonly Dictionary<string, string[]> s_hebrewTagSequence =
        new()
        {
            { "ab", new[] { "language" } },
            { "aj", new[] { "ng", "state", "suffix", "language" } },
            { "ar", new[] { "language" } },
            { "cj", new[] { "language" } },
            { "ij", new[] { "suffix", "language" } },
            { "ir", new[] { "suffix", "language" } },
            { "ng", new[] { "language" } },
            { "np", new[] { "ng", "language" } },
            { "ns", new[] { "ng", "state", "suffix", "language" } },
            { "pd", new[] { "ng", "language" } },
            { "pi", new[] { "language" } },
            { "pp", new[] { "png", "language" } },
            { "pr", new[] { "suffix", "language" } },
            { "vb", new[] { "verbal_stem", "verbal_tense", "png", "state", "suffix", "language" } },
        };

    // Hebrew translations: tag id -> English long form
    private static readonly Dictionary<string, string> s_hebrewLongTranslations =
        new()
        {
            { "language-A", "Aramaic" },
            { "language-H", "Hebrew" },
            { "ng-d?", "common dual" },
            { "ng-df", "feminine dual" },
            { "ng-dm", "masculine dual" },
            { "ng-p?", "common plural" },
            { "ng-pf", "feminine plural" },
            { "ng-pm", "masculine plural" },
            { "ng-s?", "common singular" },
            { "ng-sf", "feminine singular" },
            { "ng-sm", "masculine singular" },
            { "part_of_speech-ab", "adverb" },
            { "part_of_speech-aj", "adjective" },
            { "part_of_speech-ar", "article" },
            { "part_of_speech-cj", "conjunction" },
            { "part_of_speech-ij", "interjection" },
            { "part_of_speech-ir", "interrogative" },
            { "part_of_speech-ng", "negative" },
            { "part_of_speech-np", "proper noun" },
            { "part_of_speech-ns", "noun" },
            { "part_of_speech-pd", "demonstrative pronoun" },
            { "part_of_speech-pi", "interrogative pronoun" },
            { "part_of_speech-pp", "personal pronoun" },
            { "part_of_speech-pr", "preposition" },
            { "part_of_speech-vb", "verbal" },
            { "png-1p?", "1st common plural" },
            { "png-1s?", "1st common singular" },
            { "png-2pf", "2nd feminine plural" },
            { "png-2pm", "2nd masculine plural" },
            { "png-2sf", "2nd feminine singular" },
            { "png-2sm", "2nd masculine singular" },
            { "png-3p?", "3rd common plural" },
            { "png-3pf", "3rd feminine plural" },
            { "png-3pm", "3rd masculine plural" },
            { "png-3sf", "3rd feminine singular" },
            { "png-3sm", "3rd masculine singular" },
            { "png-???", "" },
            { "png-?pf", "feminine plural" },
            { "png-?pm", "masculine plural" },
            { "png-?sf", "feminine singular" },
            { "png-?sm", "masculine singular" },
            { "state--", "" },
            { "state-?", "" },
            { "state-a", "absolute" },
            { "state-c", "construct" },
            { "state-e", "emphatic" },
            { "suffix----", "" },
            { "suffix-1p?", "suffix 1st common plural" },
            { "suffix-1s?", "suffix 1st common singular" },
            { "suffix-2pf", "suffix 2nd feminine plural" },
            { "suffix-2pm", "suffix 2nd masculine plural" },
            { "suffix-2sf", "suffix 2nd feminine singular" },
            { "suffix-2sm", "suffix 2nd masculine singular" },
            { "suffix-3pf", "suffix 3rd feminine plural" },
            { "suffix-3pm", "suffix 3rd masculine plural" },
            { "suffix-3sf", "suffix 3rd feminine singular" },
            { "suffix-3sm", "suffix 3rd masculine singular" },
            { "suffix-???", "" },
            { "verbal_stem-----", "" },
            { "verbal_stem-afel", "Af'el" },
            { "verbal_stem-esht", "Eshtaf'al" },
            { "verbal_stem-etpa", "Etpa''al" },
            { "verbal_stem-etpe", "Etpe'el" },
            { "verbal_stem-etta", "Ettaf'al" },
            { "verbal_stem-haf-", "Haf'el" },
            { "verbal_stem-hif-", "Hif'il" },
            { "verbal_stem-hit-", "Hitpa''el" },
            { "verbal_stem-hof-", "Hof'al" },
            { "verbal_stem-hotp", "Hotpa''al" },
            { "verbal_stem-hsht", "Hishtaf'al" },
            { "verbal_stem-htpa", "Hitpa''al" },
            { "verbal_stem-htpe", "Hitpe'el" },
            { "verbal_stem-htpo", "Hitpo'el" },
            { "verbal_stem-nif-", "Nif'al" },
            { "verbal_stem-nit-", "Nitpa''el" },
            { "verbal_stem-pael", "Pa''el" },
            { "verbal_stem-pasq", "Qal passive" },
            { "verbal_stem-peal", "Pe'al" },
            { "verbal_stem-peil", "Pe'il" },
            { "verbal_stem-piel", "Pi''el" },
            { "verbal_stem-poal", "Po'al" },
            { "verbal_stem-poel", "Po'el" },
            { "verbal_stem-pual", "Pu''al" },
            { "verbal_stem-qal-", "Qal" },
            { "verbal_stem-shaf", "Shaf'el" },
            { "verbal_stem-tif-", "Tif'al" },
            { "verbal_tense-----", "" },
            { "verbal_tense-impf", "imperfect" },
            { "verbal_tense-impv", "imperative" },
            { "verbal_tense-infa", "infinitive absolute" },
            { "verbal_tense-infc", "infinitive construct" },
            { "verbal_tense-perf", "perfect" },
            { "verbal_tense-ptca", "active participle" },
            { "verbal_tense-ptcp", "passive participle" },
            { "verbal_tense-wayq", "consecutive imperfect" },
            { "verbal_tense-weyq", "consecutive perfect" },
        };

    #endregion

    // === NEW IN PT10 ===
    // Reason: PAPI async pattern; wraps PT9 synchronous Translate() in Task
    // Maps to: CAP-008
    /// <summary>
    /// Translates a POS tag to a human-readable string.
    ///
    /// SDBH (Hebrew): character-based codes (e.g., "nspmaH" = "noun masculine plural absolute")
    /// SDBG (Greek): hyphen-separated (e.g., "noun-dans" = "noun declinable accusative neuter singular")
    ///
    /// Preconditions: None (POS translation data is embedded/static)
    /// Postconditions: Returns human-readable POS description with components.
    /// </summary>
    public static Task<PosTranslationResult> TranslatePartOfSpeechAsync(
        PosTranslationInput input,
        CancellationToken ct
    )
    {
        // Validate dictionary
        if (input.Dictionary != "SDBH" && input.Dictionary != "SDBG")
        {
            return Task.FromResult(
                new PosTranslationResult(
                    Success: false,
                    Translation: null,
                    Components: null,
                    Error: new ErrorInfo("INVALID_INPUT", "Dictionary must be 'SDBH' or 'SDBG'")
                )
            );
        }

        // Validate POS tag
        if (string.IsNullOrEmpty(input.PosTag))
        {
            return Task.FromResult(
                new PosTranslationResult(
                    Success: false,
                    Translation: null,
                    Components: null,
                    Error: new ErrorInfo(
                        "PARSE_ERROR",
                        $"Unknown POS tag '' for dictionary '{input.Dictionary}'"
                    )
                )
            );
        }

        // Translate the POS tag
        List<string>? standardForm = TranslateToStandardForm(input.Dictionary, input.PosTag);

        if (standardForm == null)
        {
            return Task.FromResult(
                new PosTranslationResult(
                    Success: false,
                    Translation: null,
                    Components: null,
                    Error: new ErrorInfo(
                        "PARSE_ERROR",
                        $"Unknown POS tag '{input.PosTag}' for dictionary '{input.Dictionary}'"
                    )
                )
            );
        }

        // Build translation string and components
        string translation = BuildTranslationString(standardForm, input.ShortFormat);
        List<PosComponent> components = BuildComponents(standardForm);

        return Task.FromResult(
            new PosTranslationResult(
                Success: true,
                Translation: translation,
                Components: components,
                Error: null
            )
        );
    }

    #region Private helper methods

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/PartOfSpeechTranslator.cs:32-39
    // Method: PartOfSpeechTranslator.Translate()
    // Maps to: EXT-008
    private static List<string>? TranslateToStandardForm(string dictionary, string posTag)
    {
        if (dictionary == "SDBH")
        {
            // For Hebrew, ignore final H since that is for Hebrew
            string trimmed = posTag.TrimEnd('H');
            return ParseTag(
                trimmed,
                s_hebrewTagOptions,
                s_hebrewTagSequence,
                s_hebrewLongTranslations
            );
        }
        else
        {
            return ParseTag(posTag, s_greekTagOptions, s_greekTagSequence, s_greekLongTranslations);
        }
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/PartOfSpeechTranslator.cs:58-84
    // Method: PartOfSpeechTranslator.TranslateToStandardForm()
    // Maps to: EXT-008
    //
    // EXPLANATION:
    // This algorithm parses a POS tag string by:
    // 1. Finding the root part-of-speech by matching the start of the tag against known options
    // 2. Looking up the translation for the root POS
    // 3. For each category in the tag_sequence for that root POS, trying to match the
    //    remaining tag string against that category's options
    // 4. If a match is found, looking up the translation and adding non-empty/non-NA values
    // 5. Returns null if the root POS cannot be matched
    private static List<string>? ParseTag(
        string posTag,
        Dictionary<string, string[]> tagOptions,
        Dictionary<string, string[]> tagSequence,
        Dictionary<string, string> translations
    )
    {
        string[] rootOptions = tagOptions["part_of_speech"];
        string curValue = posTag;

        string? rootOption = FindOption(rootOptions, ref curValue);
        if (rootOption == null)
            return null;

        List<string> result = new();
        string rootTranslationKey = "part_of_speech-" + rootOption;
        string rootTranslation = translations.TryGetValue(rootTranslationKey, out string? rootTrans)
            ? rootTrans
            : rootOption;
        result.Add(rootTranslation);

        if (!tagSequence.TryGetValue(rootOption, out string[]? categories))
            return result;

        foreach (string category in categories)
        {
            if (!tagOptions.TryGetValue(category, out string[]? categoryOptions))
                continue;

            string? matchedOption = FindOption(categoryOptions, ref curValue);
            if (matchedOption != null)
            {
                string tagId = category + "-" + matchedOption;
                if (
                    translations.TryGetValue(tagId, out string? translation)
                    && !string.IsNullOrEmpty(translation)
                    && translation != "NA"
                    && translation != "unknown"
                )
                {
                    result.Add(translation);
                }
            }
        }

        return result;
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/PartOfSpeechTranslator.cs:86-98
    // Method: PartOfSpeechTranslator.FindOption()
    // Maps to: EXT-008
    private static string? FindOption(string[] options, ref string curValue)
    {
        foreach (string option in options)
        {
            if (curValue.StartsWith(option, StringComparison.Ordinal))
            {
                curValue = curValue.Substring(option.Length);
                return option;
            }
        }
        return null;
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/PartOfSpeechTranslator.cs:42-56
    // Method: PartOfSpeechTranslator.LocalizeStandardForm()
    // Maps to: EXT-008
    private static string BuildTranslationString(List<string> standardForm, bool shortFormat)
    {
        StringBuilder result = new();
        foreach (string word in standardForm)
        {
            string outputForm = word;
            if (shortFormat)
            {
                outputForm = s_longToShort.TryGetValue(word, out string? shortForm)
                    ? shortForm
                    : word;
            }
            result.Append(outputForm);
            result.Append(' ');
        }

        return result.ToString().Trim('-', ' ');
    }

    // === NEW IN PT10 ===
    // Reason: PosComponent contract type does not exist in PT9
    // Maps to: CAP-008
    private static List<PosComponent> BuildComponents(List<string> standardForm)
    {
        // Split each standard form entry by spaces to get individual words,
        // since some entries like "masculine plural" contain multiple words
        // but should be individual components
        List<PosComponent> components = new();
        foreach (string entry in standardForm)
        {
            string[] words = entry.Split(' ');
            foreach (string word in words)
            {
                if (string.IsNullOrEmpty(word))
                    continue;

                string abbreviation = s_longToShort.TryGetValue(word, out string? shortForm)
                    ? shortForm
                    : word;
                components.Add(new PosComponent(word, abbreviation, word));
            }
        }
        return components;
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/PartOfSpeechTranslator.cs:1085-1116
    // Method: PartOfSpeechTranslator.GetLongToShortValues() + GetLongAndShortTranslations()
    // Maps to: EXT-008
    //
    // EXPLANATION:
    // Builds a mapping from long-form English translations to short-form abbreviations.
    // Iterates through both Hebrew and Greek translation tables, matching eng-long entries
    // to their eng-short counterparts. Skips empty translations and category heading items
    // (e.g., "case-": "Case") which are identified by having a trailing dash and no
    // internal dashes in the trimmed name.
    private static Dictionary<string, string> BuildLongToShortMap()
    {
        Dictionary<string, string> result = new();

        AddLongToShortEntries(result, s_hebrewLongTranslations, s_hebrewShortTranslations);
        AddLongToShortEntries(result, s_greekLongTranslations, s_greekShortTranslations);

        return result;
    }

    private static void AddLongToShortEntries(
        Dictionary<string, string> result,
        Dictionary<string, string> longTranslations,
        Dictionary<string, string> shortTranslations
    )
    {
        foreach (var kvp in longTranslations)
        {
            string longTranslation = kvp.Value;
            if (string.IsNullOrEmpty(longTranslation))
                continue;

            string propertyName = kvp.Key;
            // Skip category heading items (e.g., "case-": "Case")
            string trimmedName = propertyName.Trim('-');
            if (
                propertyName.Substring(0, propertyName.Length - 1) == trimmedName
                && !trimmedName.Contains('-')
            )
                continue;

            if (
                shortTranslations.TryGetValue(propertyName, out string? shortTranslation)
                && !string.IsNullOrEmpty(shortTranslation)
            )
            {
                result[longTranslation] = shortTranslation;
            }
        }
    }

    // Hebrew short translations
    private static readonly Dictionary<string, string> s_hebrewShortTranslations =
        new()
        {
            { "language-A", "Aram" },
            { "language-H", "Heb" },
            { "ng-d?", "c.du" },
            { "ng-df", "f.du" },
            { "ng-dm", "m.du" },
            { "ng-p?", "c.pl" },
            { "ng-pf", "f.pl" },
            { "ng-pm", "m.pl" },
            { "ng-s?", "c.sg" },
            { "ng-sf", "f.sg" },
            { "ng-sm", "m.s" },
            { "part_of_speech-ab", "adv" },
            { "part_of_speech-aj", "adj" },
            { "part_of_speech-ar", "art" },
            { "part_of_speech-cj", "cj" },
            { "part_of_speech-ij", "intj" },
            { "part_of_speech-ir", "inter" },
            { "part_of_speech-ng", "neg" },
            { "part_of_speech-np", "prop.n" },
            { "part_of_speech-ns", "n" },
            { "part_of_speech-pd", "dem.pron" },
            { "part_of_speech-pi", "inter.pron" },
            { "part_of_speech-pp", "pers.pron" },
            { "part_of_speech-pr", "prep" },
            { "part_of_speech-vb", "v" },
            { "png-1p?", "1c.pl" },
            { "png-1s?", "1c.sg" },
            { "png-2pf", "2f.pl" },
            { "png-2pm", "2m.pl" },
            { "png-2sf", "2f.sg" },
            { "png-2sm", "2m.sg" },
            { "png-3p?", "3c.pl" },
            { "png-3pf", "3f.pl" },
            { "png-3pm", "3m.pl" },
            { "png-3sf", "3f.sg" },
            { "png-3sm", "3m.sg" },
            { "png-???", "" },
            { "png-?pf", "f.pl" },
            { "png-?pm", "m.pl" },
            { "png-?sf", "f.sg" },
            { "png-?sm", "m.sg" },
            { "state--", "" },
            { "state-?", "" },
            { "state-a", "abs" },
            { "state-c", "cst" },
            { "state-e", "emph" },
            { "suffix----", "" },
            { "suffix-1p?", "sfx.1c.pl" },
            { "suffix-1s?", "sfx.1c.sg" },
            { "suffix-2pf", "sfx.2f.pl" },
            { "suffix-2pm", "sfx.2m.pl" },
            { "suffix-2sf", "sfx.2f.sg" },
            { "suffix-2sm", "sfx.2m.sg" },
            { "suffix-3pf", "sfx.3f.pl" },
            { "suffix-3pm", "sfx.3m.pl" },
            { "suffix-3sf", "sfx.3f.sg" },
            { "suffix-3sm", "sfx.3m.sg" },
            { "suffix-???", "" },
            { "verbal_stem-----", "" },
            { "verbal_stem-afel", "Af'el" },
            { "verbal_stem-esht", "Eshtaf'al" },
            { "verbal_stem-etpa", "Etpa''al" },
            { "verbal_stem-etpe", "Etpe'el" },
            { "verbal_stem-etta", "Ettaf'al" },
            { "verbal_stem-haf-", "Haf'el" },
            { "verbal_stem-hif-", "Hif'il" },
            { "verbal_stem-hit-", "Hitpa''el" },
            { "verbal_stem-hof-", "Hof'al" },
            { "verbal_stem-hotp", "Hotpa''al" },
            { "verbal_stem-hsht", "Hishtaf'al" },
            { "verbal_stem-htpa", "Hitpa''al" },
            { "verbal_stem-htpe", "Hitpe'el" },
            { "verbal_stem-htpo", "Hitpo'el" },
            { "verbal_stem-nif-", "Nif'al" },
            { "verbal_stem-nit-", "Nitpa''el" },
            { "verbal_stem-pael", "Pa''el" },
            { "verbal_stem-pasq", "Qal passive" },
            { "verbal_stem-peal", "Pe'al" },
            { "verbal_stem-peil", "Pe'il" },
            { "verbal_stem-piel", "Pi''el" },
            { "verbal_stem-poal", "Po'al" },
            { "verbal_stem-poel", "Po'el" },
            { "verbal_stem-pual", "Pu''al" },
            { "verbal_stem-qal-", "Qal" },
            { "verbal_stem-shaf", "Shaf'el" },
            { "verbal_stem-tif-", "Tif'al" },
            { "verbal_tense-----", "" },
            { "verbal_tense-impf", "ipf" },
            { "verbal_tense-impv", "imp" },
            { "verbal_tense-infa", "inf.abs" },
            { "verbal_tense-infc", "inf.cst" },
            { "verbal_tense-perf", "prf" },
            { "verbal_tense-ptca", "actv.ptcp" },
            { "verbal_tense-ptcp", "pass.ptcp" },
            { "verbal_tense-wayq", "ipf.cs" },
            { "verbal_tense-weyq", "prf.cs" },
        };

    // Greek short translations
    private static readonly Dictionary<string, string> s_greekShortTranslations =
        new()
        {
            { "case--", "" },
            { "case-a", "acc" },
            { "case-d", "dat" },
            { "case-g", "gen" },
            { "case-n", "nom" },
            { "case-v", "voc" },
            { "case_possessed--", "" },
            { "case_possessed-a", "acc" },
            { "case_possessed-d", "dat" },
            { "case_possessed-g", "gen" },
            { "case_possessed-n", "nom" },
            { "declinable--", "" },
            { "declinable-d", "decl" },
            { "declinable-i", "indecl" },
            { "gender--", "" },
            { "gender-f", "f" },
            { "gender-m", "m" },
            { "gender-n", "n" },
            { "gender_possessed--", "" },
            { "gender_possessed-f", "f" },
            { "gender_possessed-m", "m" },
            { "gender_possessed-n", "n" },
            { "level---", "" },
            { "level--p", "interphrasal" },
            { "level-c-", "interclausal" },
            { "level-cp", "interclausal+interphrasal" },
            { "location--", "" },
            { "location-b", "between" },
            { "location-e", "fronted/between" },
            { "location-f", "fronted" },
            { "location-p", "postpositive" },
            { "mood--", "" },
            { "mood-i", "ind" },
            { "mood-m", "imp" },
            { "mood-n", "inf" },
            { "mood-o", "opt" },
            { "mood-p", "ptc" },
            { "mood-r", "ptc.imp." },
            { "mood-s", "sbjv" },
            { "number--", "" },
            { "number-p", "pl" },
            { "number-s", "sg" },
            { "number_possessed--", "" },
            { "number_possessed-p", "pl" },
            { "number_possessed-s", "sg" },
            { "part_of_speech-adjc", "adj" },
            { "part_of_speech-advb", "adv" },
            { "part_of_speech-anum", "indecl.num." },
            { "part_of_speech-aram", "Aram." },
            { "part_of_speech-artc", "art" },
            { "part_of_speech-cndp", "cond" },
            { "part_of_speech-conj", "cj" },
            { "part_of_speech-hebr", "Heb." },
            { "part_of_speech-intj", "intj" },
            { "part_of_speech-nlet", "indecl.letter" },
            { "part_of_speech-noun", "n" },
            { "part_of_speech-nprp", "prop.n" },
            { "part_of_speech-part", "ptcl" },
            { "part_of_speech-pcir", "corr/inter.pron" },
            { "part_of_speech-pcor", "corr.pron" },
            { "part_of_speech-pdem", "dem.pron" },
            { "part_of_speech-pidf", "indef.pron" },
            { "part_of_speech-pirg", "inter.pron" },
            { "part_of_speech-pnct", "punct" },
            { "part_of_speech-ppos", "poss.pron" },
            { "part_of_speech-pprs", "pers.pron" },
            { "part_of_speech-prec", "recip.pron" },
            { "part_of_speech-prel", "rel.pron" },
            { "part_of_speech-prep", "prep" },
            { "part_of_speech-prfl", "refl.pron" },
            { "part_of_speech-pstp", "post" },
            { "part_of_speech-vfin", "v" },
            { "part_of_speech-vinf", "inf" },
            { "part_of_speech-vptc", "ptcp" },
            { "person--", "" },
            { "person-1", "1" },
            { "person-2", "2" },
            { "person-3", "3" },
            { "separator_dash--", "" },
            { "taxis--", "" },
            { "taxis-c", "coord." },
            { "taxis-s", "subord." },
            { "tense---", "" },
            { "tense--a", "aor" },
            { "tense--f", "fut" },
            { "tense--i", "ipfv" },
            { "tense--l", "pluprf" },
            { "tense--p", "prs" },
            { "tense--r", "prf" },
            { "tense-2a", "2aor" },
            { "tense-2f", "2fut" },
            { "tense-2l", "2pluprf" },
            { "tense-2r", "2prf" },
            { "voice--", "" },
            { "voice-a", "act" },
            { "voice-d", "midd.dep." },
            { "voice-e", "midd./pass." },
            { "voice-m", "midd." },
            { "voice-n", "midd./pass.dep." },
            { "voice-o", "pass.dep." },
            { "voice-p", "pass." },
        };

    // Long-to-short translation mapping (built from both Hebrew and Greek tables)
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/PartOfSpeechTranslator.cs:1085-1116
    // Method: PartOfSpeechTranslator.GetLongToShortValues()
    // Maps to: EXT-008
    //
    // NOTE: This field MUST be declared after s_hebrewLongTranslations,
    // s_hebrewShortTranslations, s_greekLongTranslations, and s_greekShortTranslations
    // because C# initializes static fields in declaration order.
    private static readonly Dictionary<string, string> s_longToShort = BuildLongToShortMap();

    #endregion
}
