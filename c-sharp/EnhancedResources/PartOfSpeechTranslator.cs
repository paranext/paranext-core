// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/PartOfSpeechTranslator.cs:1-1138
// Maps to: EXT-052, BHV-615

using System.Text;
using Paranext.DataProvider.Errors;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Translates compound POS (Part-of-Speech) tag strings into human-readable long or short
/// form English strings. 28 Greek codes and 14 Hebrew codes. Hebrew trailing 'H' stripped
/// before lookup. Localization keys follow EnhancedResource.PartOfSpeech.{form} pattern.
///
/// <para>Algorithm: match root POS code against tag_options, look up tag_sequence for
/// sub-categories, match each sub-category option, translate via long-form table,
/// map to short form if requested, join with spaces.</para>
///
/// <para>PT9 used embedded JSON (JObject/Newtonsoft.Json) for lookup tables. This port uses
/// static C# dictionaries to avoid the JSON dependency while preserving identical behavior.</para>
/// </summary>
internal static class PartOfSpeechTranslator
{
    private const string MarbleLocIdPrefix = "EnhancedResource.PartOfSpeech.";

    // === Greek tag structure ===
    private static readonly Dictionary<string, List<string>> s_greekTagOptions;
    private static readonly Dictionary<string, List<string>> s_greekTagSequence;
    private static readonly Dictionary<string, string> s_greekLongTranslations;

    // === Hebrew tag structure ===
    private static readonly Dictionary<string, List<string>> s_hebrewTagOptions;
    private static readonly Dictionary<string, List<string>> s_hebrewTagSequence;
    private static readonly Dictionary<string, string> s_hebrewLongTranslations;

    // === Long-to-short mapping ===
    private static readonly Dictionary<string, string> s_longToShortTranslations;

    // === Short translations (for localization key generation) ===
    private static readonly Dictionary<string, string> s_greekShortTranslations;
    private static readonly Dictionary<string, string> s_hebrewShortTranslations;

    // PT10-only: single-letter shortcut codes (e.g., "N" for noun) that expand to full PT9 codes
    private static readonly Dictionary<
        string,
        (string FullCode, string? DisplayLabel)
    > s_greekShortcutCodes;
    private static readonly Dictionary<
        string,
        (string FullCode, string? DisplayLabel)
    > s_hebrewShortcutCodes;

    static PartOfSpeechTranslator()
    {
        s_greekTagOptions = BuildGreekTagOptions();
        s_greekTagSequence = BuildGreekTagSequence();
        s_greekLongTranslations = BuildGreekLongTranslations();
        s_greekShortTranslations = BuildGreekShortTranslations();

        s_hebrewTagOptions = BuildHebrewTagOptions();
        s_hebrewTagSequence = BuildHebrewTagSequence();
        s_hebrewLongTranslations = BuildHebrewLongTranslations();
        s_hebrewShortTranslations = BuildHebrewShortTranslations();

        s_longToShortTranslations = BuildLongToShortValues();

        s_greekShortcutCodes = BuildGreekShortcutCodes();
        s_hebrewShortcutCodes = BuildHebrewShortcutCodes();
    }

    /// <summary>
    /// Translates a compound POS tag string into human-readable long or short form.
    /// </summary>
    /// <param name="tag">Compound POS tag code (e.g., "noun-dans", "nspmaH")</param>
    /// <param name="language">"Greek" or "Hebrew"</param>
    /// <param name="form">"long" or "short"</param>
    /// <returns>Translation result with display string, known flag, and localization key</returns>
    public static PosTranslateResult Translate(string tag, string language, string form)
    {
        if (string.IsNullOrEmpty(tag))
        {
            throw PlatformErrorCodes.WithCode(
                PlatformErrorCodes.InvalidArgument,
                "POS tag must not be empty"
            );
        }

        bool isHebrew = language == "Hebrew";
        bool shortFormat = form == "short";

        string effectiveTag = isHebrew ? tag.TrimEnd('H') : tag;

        // If stripping H left an empty tag, return unknown
        if (effectiveTag.Length == 0)
        {
            return new PosTranslateResult("", false, "");
        }

        var tagOptions = isHebrew ? s_hebrewTagOptions : s_greekTagOptions;
        var tagSequence = isHebrew ? s_hebrewTagSequence : s_greekTagSequence;
        var longTranslations = isHebrew ? s_hebrewLongTranslations : s_greekLongTranslations;

        List<string>? standardForm = TranslateToStandardForm(
            effectiveTag,
            tagOptions,
            tagSequence,
            longTranslations
        );

        // PT10 shortcut codes: single-letter convenience mappings (e.g., "N" -> "noun")
        standardForm ??= TryExpandShortcut(
            effectiveTag,
            isHebrew,
            tagOptions,
            tagSequence,
            longTranslations
        );

        if (standardForm == null)
        {
            return new PosTranslateResult("", false, "");
        }

        string displayString = LocalizeStandardForm(standardForm, shortFormat);
        string localizationKey = BuildLocalizationKey(standardForm, shortFormat);

        return new PosTranslateResult(displayString, true, localizationKey);
    }

    #region Core Algorithm

    private static string LocalizeStandardForm(List<string> standardForm, bool shortFormat)
    {
        var result = new StringBuilder();
        foreach (string word in standardForm)
        {
            string displayWord = word;
            if (shortFormat)
            {
                displayWord = s_longToShortTranslations.TryGetValue(word, out string? shortVal)
                    ? shortVal
                    : word;
            }

            result.Append(displayWord);
            result.Append(' ');
        }

        return result.ToString().Trim('-', ' ');
    }

    private static string BuildLocalizationKey(List<string> standardForm, bool shortFormat)
    {
        // Use the first word (root POS) for the localization key
        if (standardForm.Count > 0)
        {
            string suffix = shortFormat ? ".Short" : ".Long";
            return MarbleLocIdPrefix + standardForm[0] + suffix;
        }

        return "";
    }

    private static List<string>? TranslateToStandardForm(
        string partOfSpeech,
        Dictionary<string, List<string>> tagOptions,
        Dictionary<string, List<string>> tagSequence,
        Dictionary<string, string> longTranslations
    )
    {
        List<string> rootOptions = tagOptions["part_of_speech"];
        string curValue = partOfSpeech;

        if (FindOption(rootOptions, ref curValue, out string? rootOption) && rootOption != null)
        {
            string rootValue = rootOption;
            var result = new List<string>();

            // Look up root translation
            string rootKey = "part_of_speech-" + rootValue;
            string rootTranslation =
                longTranslations.TryGetValue(rootKey, out string? rt) && rt != null
                    ? rt
                    : rootValue;
            result.Add(rootTranslation);

            // Process sub-categories in sequence
            if (tagSequence.TryGetValue(rootValue, out List<string>? sequence) && sequence != null)
            {
                foreach (string category in sequence)
                {
                    if (
                        !tagOptions.TryGetValue(category, out List<string>? categoryOptions)
                        || categoryOptions == null
                    )
                        continue;

                    if (FindOption(categoryOptions, ref curValue, out string? categoryOption))
                    {
                        string tagId = category + "-" + categoryOption;
                        if (
                            longTranslations.TryGetValue(tagId, out string? translation)
                            && !string.IsNullOrEmpty(translation)
                            && translation != "NA"
                            && translation != "unknown"
                        )
                        {
                            result.Add(translation);
                        }
                    }
                }
            }

            return result;
        }

        return null;
    }

    private static bool FindOption(
        List<string> options,
        ref string curValue,
        out string? matchedOption
    )
    {
        matchedOption = null;
        foreach (string option in options)
        {
            if (Matches(option, ref curValue))
            {
                matchedOption = option;
                return true;
            }
        }

        return false;
    }

    private static bool Matches(string compareValue, ref string curValue)
    {
        if (curValue.StartsWith(compareValue, StringComparison.Ordinal))
        {
            curValue = curValue[compareValue.Length..];
            return true;
        }

        return false;
    }

    #endregion

    #region Shortcut Code Expansion

    /// <summary>
    /// PT10 shortcut codes: maps single-letter convenience codes (e.g., "N" for noun) to full
    /// multi-character PT9 POS codes. When a shortcut has a custom DisplayLabel, it replaces
    /// the root translation (e.g., "V" -> "verb" instead of "v, finite").
    /// </summary>
    private static List<string>? TryExpandShortcut(
        string effectiveTag,
        bool isHebrew,
        Dictionary<string, List<string>> tagOptions,
        Dictionary<string, List<string>> tagSequence,
        Dictionary<string, string> longTranslations
    )
    {
        var shortcuts = isHebrew ? s_hebrewShortcutCodes : s_greekShortcutCodes;
        if (!shortcuts.TryGetValue(effectiveTag, out var shortcut))
            return null;

        List<string>? standardForm = TranslateToStandardForm(
            shortcut.FullCode,
            tagOptions,
            tagSequence,
            longTranslations
        );

        if (standardForm != null && shortcut.DisplayLabel != null && standardForm.Count > 0)
        {
            standardForm[0] = shortcut.DisplayLabel;
        }

        return standardForm;
    }

    private static Dictionary<
        string,
        (string FullCode, string? DisplayLabel)
    > BuildGreekShortcutCodes()
    {
        return new Dictionary<string, (string, string?)>
        {
            ["N"] = ("noun", null),
            ["V"] = ("vfin", "verb"),
            ["A"] = ("adjc", null),
            ["D"] = ("advb", null),
            ["P"] = ("prep", null),
        };
    }

    private static Dictionary<
        string,
        (string FullCode, string? DisplayLabel)
    > BuildHebrewShortcutCodes()
    {
        return new Dictionary<string, (string, string?)>
        {
            ["n"] = ("ns", null),
            ["V"] = ("vb", null),
            ["v"] = ("vb", null),
        };
    }

    #endregion

    #region Long-to-Short Mapping

    private static Dictionary<string, string> BuildLongToShortValues()
    {
        var result = new Dictionary<string, string>();

        // Hebrew first, then Greek (Greek can override)
        AddLongToShortTranslations(s_hebrewLongTranslations, s_hebrewShortTranslations, result);
        AddLongToShortTranslations(s_greekLongTranslations, s_greekShortTranslations, result);

        return result;
    }

    private static void AddLongToShortTranslations(
        Dictionary<string, string> longTranslations,
        Dictionary<string, string> shortTranslations,
        Dictionary<string, string> result
    )
    {
        foreach (var (key, longTranslation) in longTranslations)
        {
            if (string.IsNullOrEmpty(longTranslation))
                continue;

            // Skip category heading keys (e.g., "case-", "gender-") - these have exactly
            // one dash as the last character and represent category labels, not option codes.
            if (key.Length > 1 && key[^1] == '-' && !key.AsSpan(0, key.Length - 1).Contains('-'))
                continue;

            if (
                shortTranslations.TryGetValue(key, out string? shortTranslation)
                && !string.IsNullOrEmpty(shortTranslation)
            )
            {
                result[longTranslation] = shortTranslation;
            }
        }
    }

    #endregion

    #region Greek Data

    private static Dictionary<string, List<string>> BuildGreekTagOptions()
    {
        return new Dictionary<string, List<string>>
        {
            ["case"] = new() { "a", "d", "g", "-", "n", "v" },
            ["case_possessed"] = new() { "a", "d", "g", "-", "n", "v" },
            ["declinable"] = new() { "i", "-", "d" },
            ["gender"] = new() { "m", "n", "-", "f" },
            ["gender_possessed"] = new() { "m", "n", "-", "f" },
            ["level"] = new() { "--", "cp", "-p", "c-" },
            ["location"] = new() { "e", "b", "-", "p", "f" },
            ["mood"] = new() { "i", "-", "m", "o", "n", "p", "s", "r" },
            ["number"] = new() { "p", "s", "-" },
            ["number_possessed"] = new() { "p", "s", "-" },
            ["part_of_speech"] = new()
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
            },
            ["person"] = new() { "1", "3", "2", "-" },
            ["separator_dash"] = new() { "-" },
            ["taxis"] = new() { "c", "-", "s" },
            ["tense"] = new() { "-f", "-a", "2r", "--", "-l", "-i", "2f", "-p", "-r", "2l", "2a" },
            ["voice"] = new() { "a", "e", "d", "-", "m", "o", "n", "p" },
        };
    }

    private static Dictionary<string, List<string>> BuildGreekTagSequence()
    {
        return new Dictionary<string, List<string>>
        {
            ["adjc"] = new() { "separator_dash", "declinable", "case", "gender", "number" },
            ["advb"] = new() { "separator_dash", "declinable" },
            ["anum"] = new() { "separator_dash", "declinable" },
            ["aram"] = new() { "separator_dash", "declinable" },
            ["artc"] = new() { "separator_dash", "declinable", "case", "gender", "number" },
            ["cndp"] = new() { "separator_dash", "declinable" },
            ["conj"] = new() { "separator_dash", "declinable", "taxis", "location", "level" },
            ["hebr"] = new() { "separator_dash", "declinable" },
            ["intj"] = new() { "separator_dash", "declinable" },
            ["nlet"] = new() { "separator_dash", "declinable" },
            ["noun"] = new() { "separator_dash", "declinable", "case", "gender", "number" },
            ["nprp"] = new() { "separator_dash", "declinable", "case", "gender", "number" },
            ["part"] = new() { "separator_dash", "declinable" },
            ["pcir"] = new()
            {
                "separator_dash",
                "declinable",
                "person",
                "case",
                "gender",
                "number",
            },
            ["pcor"] = new()
            {
                "separator_dash",
                "declinable",
                "person",
                "case",
                "gender",
                "number",
            },
            ["pdem"] = new()
            {
                "separator_dash",
                "declinable",
                "person",
                "case",
                "gender",
                "number",
            },
            ["pidf"] = new()
            {
                "separator_dash",
                "declinable",
                "person",
                "case",
                "gender",
                "number",
            },
            ["pirg"] = new()
            {
                "separator_dash",
                "declinable",
                "person",
                "case",
                "gender",
                "number",
            },
            ["pnct"] = new() { "separator_dash", "declinable" },
            ["ppos"] = new()
            {
                "separator_dash",
                "declinable",
                "person",
                "number",
                "case_possessed",
                "gender_possessed",
                "number_possessed",
            },
            ["pprs"] = new()
            {
                "separator_dash",
                "declinable",
                "person",
                "case",
                "gender",
                "number",
            },
            ["prec"] = new()
            {
                "separator_dash",
                "declinable",
                "person",
                "case",
                "gender",
                "number",
            },
            ["prel"] = new()
            {
                "separator_dash",
                "declinable",
                "person",
                "case",
                "gender",
                "number",
            },
            ["prep"] = new() { "separator_dash", "declinable" },
            ["prfl"] = new()
            {
                "separator_dash",
                "declinable",
                "person",
                "case",
                "gender",
                "number",
            },
            ["pstp"] = new() { "separator_dash", "declinable" },
            ["vfin"] = new()
            {
                "separator_dash",
                "declinable",
                "tense",
                "voice",
                "mood",
                "person",
                "number",
            },
            ["vinf"] = new() { "separator_dash", "declinable", "tense", "voice" },
            ["vptc"] = new()
            {
                "separator_dash",
                "declinable",
                "tense",
                "voice",
                "mood",
                "case",
                "gender",
                "number",
            },
        };
    }

    private static Dictionary<string, string> BuildGreekLongTranslations()
    {
        return new Dictionary<string, string>
        {
            ["case-"] = "Case",
            ["case--"] = "",
            ["case-a"] = "accusative",
            ["case-d"] = "dative",
            ["case-g"] = "genitive",
            ["case-n"] = "nominative",
            ["case-v"] = "vocative",
            ["case_possessed-"] = "Case of possessed part",
            ["case_possessed--"] = "",
            ["case_possessed-a"] = "accusative",
            ["case_possessed-d"] = "dative",
            ["case_possessed-g"] = "genitive",
            ["case_possessed-n"] = "nominative",
            ["declinable-"] = "Declinability",
            ["declinable--"] = "",
            ["declinable-d"] = "declinable",
            ["declinable-i"] = "indeclinable",
            ["gender-"] = "Gender",
            ["gender--"] = "",
            ["gender-f"] = "feminine",
            ["gender-m"] = "masculine",
            ["gender-n"] = "neuter",
            ["gender_possessed-"] = "Gender of possessed part",
            ["gender_possessed--"] = "",
            ["gender_possessed-f"] = "feminine",
            ["gender_possessed-m"] = "masculine",
            ["gender_possessed-n"] = "neuter",
            ["level-"] = "Level",
            ["level--"] = "",
            ["level---"] = "",
            ["level--p"] = "interphrasal",
            ["level-c-"] = "interclausal",
            ["level-cp"] = "both interclausal and interphrasal",
            ["location-"] = "Location",
            ["location--"] = "",
            ["location-b"] = "between",
            ["location-e"] = "fronted or between",
            ["location-f"] = "fronted",
            ["location-p"] = "postpositive",
            ["mood-"] = "Mood",
            ["mood--"] = "",
            ["mood-i"] = "indicative",
            ["mood-m"] = "imperative",
            ["mood-n"] = "infinitive",
            ["mood-o"] = "optative",
            ["mood-p"] = "participle",
            ["mood-r"] = "participle with imperatival force",
            ["mood-s"] = "subjunctive",
            ["number-"] = "Number",
            ["number--"] = "",
            ["number-p"] = "plural",
            ["number-s"] = "singular",
            ["number_possessed-"] = "Number of possessed part",
            ["number_possessed--"] = "",
            ["number_possessed-p"] = "plural",
            ["number_possessed-s"] = "singular",
            ["part_of_speech-"] = "Part of speech",
            ["part_of_speech-adjc"] = "adjective",
            ["part_of_speech-advb"] = "adverb",
            ["part_of_speech-anum"] = "indeclinable number",
            ["part_of_speech-aram"] = "aramaic word",
            ["part_of_speech-artc"] = "article",
            ["part_of_speech-cndp"] = "conditional particle",
            ["part_of_speech-conj"] = "conjunction",
            ["part_of_speech-hebr"] = "hebrew word",
            ["part_of_speech-intj"] = "interjection",
            ["part_of_speech-nlet"] = "indeclinable letter",
            ["part_of_speech-noun"] = "noun",
            ["part_of_speech-nprp"] = "proper noun",
            ["part_of_speech-part"] = "particle",
            ["part_of_speech-pcir"] = "correlative or interrogative pronoun",
            ["part_of_speech-pcor"] = "correlative pronoun",
            ["part_of_speech-pdem"] = "demonstrative pronoun",
            ["part_of_speech-pidf"] = "indefinite pronoun",
            ["part_of_speech-pirg"] = "interrogative pronoun",
            ["part_of_speech-pnct"] = "punctuation",
            ["part_of_speech-ppos"] = "possessive pronoun",
            ["part_of_speech-pprs"] = "personal pronoun",
            ["part_of_speech-prec"] = "reciprocal pronoun",
            ["part_of_speech-prel"] = "relative pronoun",
            ["part_of_speech-prep"] = "preposition",
            ["part_of_speech-prfl"] = "reflexive pronoun",
            ["part_of_speech-pstp"] = "postposition",
            ["part_of_speech-vfin"] = "v, finite",
            ["part_of_speech-vinf"] = "v, infinitive",
            ["part_of_speech-vptc"] = "v, participle",
            ["person-"] = "Person",
            ["person--"] = "",
            ["person-1"] = "1st person",
            ["person-2"] = "2nd person",
            ["person-3"] = "3rd person",
            ["separator_dash--"] = "",
            ["taxis-"] = "Taxis",
            ["taxis--"] = "",
            ["taxis-c"] = "coordinating",
            ["taxis-s"] = "subordinating",
            ["tense-"] = "Tense",
            ["tense---"] = "",
            ["tense--a"] = "aorist",
            ["tense--f"] = "future",
            ["tense--i"] = "imperfect",
            ["tense--l"] = "pluperfect",
            ["tense--p"] = "present",
            ["tense--r"] = "perfect",
            ["tense-2a"] = "2nd aorist",
            ["tense-2f"] = "2nd future",
            ["tense-2l"] = "2nd pluperfect",
            ["tense-2r"] = "2nd perfect",
            ["voice-"] = "Voice",
            ["voice--"] = "",
            ["voice-a"] = "active",
            ["voice-d"] = "middle deponent",
            ["voice-e"] = "middle or passive",
            ["voice-m"] = "middle",
            ["voice-n"] = "middle or passive deponent",
            ["voice-o"] = "passive deponent",
            ["voice-p"] = "passive",
        };
    }

    private static Dictionary<string, string> BuildGreekShortTranslations()
    {
        return new Dictionary<string, string>
        {
            ["case-"] = "Case",
            ["case--"] = "",
            ["case-a"] = "acc",
            ["case-d"] = "dat",
            ["case-g"] = "gen",
            ["case-n"] = "nom",
            ["case-v"] = "voc",
            ["case_possessed-"] = "Case of possessed part",
            ["case_possessed--"] = "",
            ["case_possessed-a"] = "acc",
            ["case_possessed-d"] = "dat",
            ["case_possessed-g"] = "gen",
            ["case_possessed-n"] = "nom",
            ["declinable-"] = "Declinability",
            ["declinable--"] = "",
            ["declinable-d"] = "decl",
            ["declinable-i"] = "indecl",
            ["gender-"] = "Gender",
            ["gender--"] = "",
            ["gender-f"] = "f",
            ["gender-m"] = "m",
            ["gender-n"] = "n",
            ["gender_possessed-"] = "Gender of possessed part",
            ["gender_possessed--"] = "",
            ["gender_possessed-f"] = "f",
            ["gender_possessed-m"] = "m",
            ["gender_possessed-n"] = "n",
            ["level-"] = "Level",
            ["level--"] = "",
            ["level---"] = "",
            ["level--p"] = "interphrasal",
            ["level-c-"] = "interclausal",
            ["level-cp"] = "interclausal+interphrasal",
            ["location-"] = "Location",
            ["location--"] = "",
            ["location-b"] = "between",
            ["location-e"] = "fronted/between",
            ["location-f"] = "fronted",
            ["location-p"] = "postpositive",
            ["mood-"] = "Mood",
            ["mood--"] = "",
            ["mood-i"] = "ind",
            ["mood-m"] = "imp",
            ["mood-n"] = "inf",
            ["mood-o"] = "opt",
            ["mood-p"] = "ptc",
            ["mood-r"] = "ptc.imp.",
            ["mood-s"] = "sbjv",
            ["number-"] = "Number",
            ["number--"] = "",
            ["number-p"] = "pl",
            ["number-s"] = "sg",
            ["number_possessed-"] = "Number of possessed part",
            ["number_possessed--"] = "",
            ["number_possessed-p"] = "pl",
            ["number_possessed-s"] = "sg",
            ["part_of_speech-"] = "Part of speech",
            ["part_of_speech-adjc"] = "adj",
            ["part_of_speech-advb"] = "adv",
            ["part_of_speech-anum"] = "indecl.num.",
            ["part_of_speech-aram"] = "Aram.",
            ["part_of_speech-artc"] = "art",
            ["part_of_speech-cndp"] = "cond",
            ["part_of_speech-conj"] = "cj",
            ["part_of_speech-hebr"] = "Heb.",
            ["part_of_speech-intj"] = "intj",
            ["part_of_speech-nlet"] = "indecl.letter",
            ["part_of_speech-noun"] = "n",
            ["part_of_speech-nprp"] = "prop.n",
            ["part_of_speech-part"] = "ptcl",
            ["part_of_speech-pcir"] = "corr/inter.pron",
            ["part_of_speech-pcor"] = "corr.pron",
            ["part_of_speech-pdem"] = "dem.pron",
            ["part_of_speech-pidf"] = "indef.pron",
            ["part_of_speech-pirg"] = "inter.pron",
            ["part_of_speech-pnct"] = "punct",
            ["part_of_speech-ppos"] = "poss.pron",
            ["part_of_speech-pprs"] = "pers.pron",
            ["part_of_speech-prec"] = "recip.pron",
            ["part_of_speech-prel"] = "rel.pron",
            ["part_of_speech-prep"] = "prep",
            ["part_of_speech-prfl"] = "refl.pron",
            ["part_of_speech-pstp"] = "post",
            ["part_of_speech-vfin"] = "v",
            ["part_of_speech-vinf"] = "inf",
            ["part_of_speech-vptc"] = "ptcp",
            ["person-"] = "Person",
            ["person--"] = "",
            ["person-1"] = "1",
            ["person-2"] = "2",
            ["person-3"] = "3",
            ["separator_dash--"] = "",
            ["taxis-"] = "Taxis",
            ["taxis--"] = "",
            ["taxis-c"] = "coord.",
            ["taxis-s"] = "subord.",
            ["tense-"] = "Tense",
            ["tense---"] = "",
            ["tense--a"] = "aor",
            ["tense--f"] = "fut",
            ["tense--i"] = "ipfv",
            ["tense--l"] = "pluprf",
            ["tense--p"] = "prs",
            ["tense--r"] = "prf",
            ["tense-2a"] = "2aor",
            ["tense-2f"] = "2fut",
            ["tense-2l"] = "2pluprf",
            ["tense-2r"] = "2prf",
            ["voice-"] = "Voice",
            ["voice--"] = "",
            ["voice-a"] = "act",
            ["voice-d"] = "midd.dep.",
            ["voice-e"] = "midd./pass.",
            ["voice-m"] = "midd.",
            ["voice-n"] = "midd./pass.dep.",
            ["voice-o"] = "pass.dep.",
            ["voice-p"] = "pass.",
        };
    }

    #endregion

    #region Hebrew Data

    private static Dictionary<string, List<string>> BuildHebrewTagOptions()
    {
        return new Dictionary<string, List<string>>
        {
            ["gender"] = new() { "-", "?", "f", "m" },
            ["language"] = new() { "A", "H" },
            ["ng"] = new() { "s?", "sf", "sm", "d?", "df", "dm", "p?", "pf", "pm" },
            ["part_of_speech"] = new()
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
            },
            ["png"] = new()
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
            },
            ["state"] = new() { "-", "?", "a", "c", "e" },
            ["suffix"] = new()
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
            },
            ["verbal_stem"] = new()
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
            },
            ["verbal_tense"] = new()
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
            },
        };
    }

    private static Dictionary<string, List<string>> BuildHebrewTagSequence()
    {
        return new Dictionary<string, List<string>>
        {
            ["ab"] = new() { "language" },
            ["aj"] = new() { "ng", "state", "suffix", "language" },
            ["ar"] = new() { "language" },
            ["cj"] = new() { "language" },
            ["ij"] = new() { "suffix", "language" },
            ["ir"] = new() { "suffix", "language" },
            ["ng"] = new() { "language" },
            ["np"] = new() { "ng", "language" },
            ["ns"] = new() { "ng", "state", "suffix", "language" },
            ["pd"] = new() { "ng", "language" },
            ["pi"] = new() { "language" },
            ["pp"] = new() { "png", "language" },
            ["pr"] = new() { "suffix", "language" },
            ["vb"] = new() { "verbal_stem", "verbal_tense", "png", "state", "suffix", "language" },
        };
    }

    private static Dictionary<string, string> BuildHebrewLongTranslations()
    {
        return new Dictionary<string, string>
        {
            ["language-A"] = "Aramaic",
            ["language-H"] = "Hebrew",
            ["ng-d?"] = "common dual",
            ["ng-df"] = "feminine dual",
            ["ng-dm"] = "masculine dual",
            ["ng-p?"] = "common plural",
            ["ng-pf"] = "feminine plural",
            ["ng-pm"] = "masculine plural",
            ["ng-s?"] = "common singular",
            ["ng-sf"] = "feminine singular",
            ["ng-sm"] = "masculine singular",
            ["part_of_speech-ab"] = "adverb",
            ["part_of_speech-aj"] = "adjective",
            ["part_of_speech-ar"] = "article",
            ["part_of_speech-cj"] = "conjunction",
            ["part_of_speech-ij"] = "interjection",
            ["part_of_speech-ir"] = "interrogative",
            ["part_of_speech-ng"] = "negative",
            ["part_of_speech-np"] = "proper noun",
            ["part_of_speech-ns"] = "noun",
            ["part_of_speech-pd"] = "demonstrative pronoun",
            ["part_of_speech-pi"] = "interrogative pronoun",
            ["part_of_speech-pp"] = "personal pronoun",
            ["part_of_speech-pr"] = "preposition",
            ["part_of_speech-vb"] = "verbal",
            ["png-1p?"] = "1st common plural",
            ["png-1s?"] = "1st common singular",
            ["png-2pf"] = "2nd feminine plural",
            ["png-2pm"] = "2nd masculine plural",
            ["png-2sf"] = "2nd feminine singular",
            ["png-2sm"] = "2nd masculine singular",
            ["png-3p?"] = "3rd common plural",
            ["png-3pf"] = "3rd feminine plural",
            ["png-3pm"] = "3rd masculine plural",
            ["png-3sf"] = "3rd feminine singular",
            ["png-3sm"] = "3rd masculine singular",
            ["png-???"] = "",
            ["png-?pf"] = "feminine plural",
            ["png-?pm"] = "masculine plural",
            ["png-?sf"] = "feminine singular",
            ["png-?sm"] = "masculine singular",
            ["state--"] = "",
            ["state-?"] = "",
            ["state-a"] = "absolute",
            ["state-c"] = "construct",
            ["state-e"] = "emphatic",
            ["suffix----"] = "",
            ["suffix-1p?"] = "suffix 1st common plural",
            ["suffix-1s?"] = "suffix 1st common singular",
            ["suffix-2pf"] = "suffix 2nd feminine plural",
            ["suffix-2pm"] = "suffix 2nd masculine plural",
            ["suffix-2sf"] = "suffix 2nd feminine singular",
            ["suffix-2sm"] = "suffix 2nd masculine singular",
            ["suffix-3pf"] = "suffix 3rd feminine plural",
            ["suffix-3pm"] = "suffix 3rd masculine plural",
            ["suffix-3sf"] = "suffix 3rd feminine singular",
            ["suffix-3sm"] = "suffix 3rd masculine singular",
            ["suffix-???"] = "",
            ["verbal_stem-----"] = "",
            ["verbal_stem-afel"] = "Af'el",
            ["verbal_stem-esht"] = "Eshtaf'al",
            ["verbal_stem-etpa"] = "Etpa''al",
            ["verbal_stem-etpe"] = "Etpe'el",
            ["verbal_stem-etta"] = "Ettaf'al",
            ["verbal_stem-haf-"] = "Haf'el",
            ["verbal_stem-hif-"] = "Hif'il",
            ["verbal_stem-hit-"] = "Hitpa''el",
            ["verbal_stem-hof-"] = "Hof'al",
            ["verbal_stem-hotp"] = "Hotpa''al",
            ["verbal_stem-hsht"] = "Hishtaf'al",
            ["verbal_stem-htpa"] = "Hitpa''al",
            ["verbal_stem-htpe"] = "Hitpe'el",
            ["verbal_stem-htpo"] = "Hitpo'el",
            ["verbal_stem-nif-"] = "Nif'al",
            ["verbal_stem-nit-"] = "Nitpa''el",
            ["verbal_stem-pael"] = "Pa''el",
            ["verbal_stem-pasq"] = "Qal passive",
            ["verbal_stem-peal"] = "Pe'al",
            ["verbal_stem-peil"] = "Pe'il",
            ["verbal_stem-piel"] = "Pi''el",
            ["verbal_stem-poal"] = "Po'al",
            ["verbal_stem-poel"] = "Po'el",
            ["verbal_stem-pual"] = "Pu''al",
            ["verbal_stem-qal-"] = "Qal",
            ["verbal_stem-shaf"] = "Shaf'el",
            ["verbal_stem-tif-"] = "Tif'al",
            ["verbal_tense-----"] = "",
            ["verbal_tense-impf"] = "imperfect",
            ["verbal_tense-impv"] = "imperative",
            ["verbal_tense-infa"] = "infinitive absolute",
            ["verbal_tense-infc"] = "infinitive construct",
            ["verbal_tense-perf"] = "perfect",
            ["verbal_tense-ptca"] = "active participle",
            ["verbal_tense-ptcp"] = "passive participle",
            ["verbal_tense-wayq"] = "consecutive imperfect",
            ["verbal_tense-weyq"] = "consecutive perfect",
        };
    }

    private static Dictionary<string, string> BuildHebrewShortTranslations()
    {
        return new Dictionary<string, string>
        {
            ["language-A"] = "Aram",
            ["language-H"] = "Heb",
            ["ng-d?"] = "c.du",
            ["ng-df"] = "f.du",
            ["ng-dm"] = "m.du",
            ["ng-p?"] = "c.pl",
            ["ng-pf"] = "f.pl",
            ["ng-pm"] = "m.pl",
            ["ng-s?"] = "c.sg",
            ["ng-sf"] = "f.sg",
            ["ng-sm"] = "m.s",
            ["part_of_speech-ab"] = "adv",
            ["part_of_speech-aj"] = "adj",
            ["part_of_speech-ar"] = "art",
            ["part_of_speech-cj"] = "cj",
            ["part_of_speech-ij"] = "intj",
            ["part_of_speech-ir"] = "inter",
            ["part_of_speech-ng"] = "neg",
            ["part_of_speech-np"] = "prop.n",
            ["part_of_speech-ns"] = "n",
            ["part_of_speech-pd"] = "dem.pron",
            ["part_of_speech-pi"] = "inter.pron",
            ["part_of_speech-pp"] = "pers.pron",
            ["part_of_speech-pr"] = "prep",
            ["part_of_speech-vb"] = "v",
            ["png-1p?"] = "1c.pl",
            ["png-1s?"] = "1c.sg",
            ["png-2pf"] = "2f.pl",
            ["png-2pm"] = "2m.pl",
            ["png-2sf"] = "2f.sg",
            ["png-2sm"] = "2m.sg",
            ["png-3p?"] = "3c.pl",
            ["png-3pf"] = "3f.pl",
            ["png-3pm"] = "3m.pl",
            ["png-3sf"] = "3f.sg",
            ["png-3sm"] = "3m.sg",
            ["png-???"] = "",
            ["png-?pf"] = "f.pl",
            ["png-?pm"] = "m.pl",
            ["png-?sf"] = "f.sg",
            ["png-?sm"] = "m.sg",
            ["state--"] = "",
            ["state-?"] = "",
            ["state-a"] = "abs",
            ["state-c"] = "cst",
            ["state-e"] = "emph",
            ["suffix----"] = "",
            ["suffix-1p?"] = "sfx.1c.pl",
            ["suffix-1s?"] = "sfx.1c.sg",
            ["suffix-2pf"] = "sfx.2f.pl",
            ["suffix-2pm"] = "sfx.2m.pl",
            ["suffix-2sf"] = "sfx.2f.sg",
            ["suffix-2sm"] = "sfx.2m.sg",
            ["suffix-3pf"] = "sfx.3f.pl",
            ["suffix-3pm"] = "sfx.3m.pl",
            ["suffix-3sf"] = "sfx.3f.sg",
            ["suffix-3sm"] = "sfx.3m.sg",
            ["suffix-???"] = "",
            ["verbal_stem-----"] = "",
            ["verbal_stem-afel"] = "Af'el",
            ["verbal_stem-esht"] = "Eshtaf'al",
            ["verbal_stem-etpa"] = "Etpa''al",
            ["verbal_stem-etpe"] = "Etpe'el",
            ["verbal_stem-etta"] = "Ettaf'al",
            ["verbal_stem-haf-"] = "Haf'el",
            ["verbal_stem-hif-"] = "Hif'il",
            ["verbal_stem-hit-"] = "Hitpa''el",
            ["verbal_stem-hof-"] = "Hof'al",
            ["verbal_stem-hotp"] = "Hotpa''al",
            ["verbal_stem-hsht"] = "Hishtaf'al",
            ["verbal_stem-htpa"] = "Hitpa''al",
            ["verbal_stem-htpe"] = "Hitpe'el",
            ["verbal_stem-htpo"] = "Hitpo'el",
            ["verbal_stem-nif-"] = "Nif'al",
            ["verbal_stem-nit-"] = "Nitpa''el",
            ["verbal_stem-pael"] = "Pa''el",
            ["verbal_stem-pasq"] = "Qal passive",
            ["verbal_stem-peal"] = "Pe'al",
            ["verbal_stem-peil"] = "Pe'il",
            ["verbal_stem-piel"] = "Pi''el",
            ["verbal_stem-poal"] = "Po'al",
            ["verbal_stem-poel"] = "Po'el",
            ["verbal_stem-pual"] = "Pu''al",
            ["verbal_stem-qal-"] = "Qal",
            ["verbal_stem-shaf"] = "Shaf'el",
            ["verbal_stem-tif-"] = "Tif'al",
            ["verbal_tense-----"] = "",
            ["verbal_tense-impf"] = "ipf",
            ["verbal_tense-impv"] = "imp",
            ["verbal_tense-infa"] = "inf.abs",
            ["verbal_tense-infc"] = "inf.cst",
            ["verbal_tense-perf"] = "prf",
            ["verbal_tense-ptca"] = "actv.ptcp",
            ["verbal_tense-ptcp"] = "pass.ptcp",
            ["verbal_tense-wayq"] = "ipf.cs",
            ["verbal_tense-weyq"] = "prf.cs",
        };
    }

    #endregion
}
