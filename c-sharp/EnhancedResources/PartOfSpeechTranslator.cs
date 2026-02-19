using System.Text.Json;

namespace Paranext.DataProvider.EnhancedResources;

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/PartOfSpeechTranslator.cs:1-1138
// Method: PartOfSpeechTranslator (full class)
// Maps to: EXT-010, BHV-602
//
// EXPLANATION:
// This class translates morphological Part of Speech codes into human-readable
// descriptions. It supports two dictionaries:
// - SDBH (Hebrew): single-char codes with trailing 'H' trimmed before parsing.
//   Hebrew root codes are 2-char (ns, vb, aj, etc.) followed by category codes
//   parsed character-by-character per the tag_sequence for each root.
// - SDBG (Greek): hyphen-separated word codes. Greek root codes are 4-char
//   (noun, adjc, vfin, etc.) followed by category codes parsed sequentially.
//
// The algorithm:
// 1. Select Hebrew or Greek tag structures based on dictionary.
// 2. For Hebrew, trim trailing 'H' from the code.
// 3. Find the root POS code by matching against tag_options[part_of_speech].
// 4. Look up the root's translation in eng-long translations.
// 5. Walk the tag_sequence for that root, matching each category from remaining code.
// 6. Collect non-empty, non-"NA", non-"unknown" translations.
// 7. For short format, map long translations to short via longToShort dictionary.
// 8. Join with spaces, trim trailing dashes and spaces.
// 9. If root match fails, return original input unchanged.
//
// PT9 uses Newtonsoft.Json JObject - replaced with System.Text.Json JsonDocument.
// PT9 uses Localizer.Default[key] - replaced with direct default values (English).
internal static class PartOfSpeechTranslator
{
    private static readonly JsonDocument s_greekTagStructure;
    private static readonly JsonDocument s_greekTagTranslations;
    private static readonly JsonDocument s_hebrewTagStructure;
    private static readonly JsonDocument s_hebrewTagTranslations;
    private static readonly Dictionary<string, string> s_longToShortTranslations;

    static PartOfSpeechTranslator()
    {
        s_greekTagStructure = JsonDocument.Parse(GreekTagStructureJson);
        s_greekTagTranslations = JsonDocument.Parse(GreekTranslationsJson);
        s_hebrewTagStructure = JsonDocument.Parse(HebrewTagStructureJson);
        s_hebrewTagTranslations = JsonDocument.Parse(HebrewTranslationsJson);
        s_longToShortTranslations = BuildLongToShortValues();
    }

    /// <summary>
    /// Translates a POS code to a human-readable description.
    /// </summary>
    /// <param name="sourceDictionary">Either "SDBG" (Greek) or "SDBH" (Hebrew).</param>
    /// <param name="partOfSpeech">The morphological POS code to translate.</param>
    /// <param name="shortFormat">If true, return abbreviated form; otherwise long form.</param>
    /// <returns>
    /// Human-readable POS description, or the raw code unchanged if unrecognized.
    /// </returns>
    /// <exception cref="ArgumentException">Thrown when dictionary is not "SDBG" or "SDBH".</exception>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/PartOfSpeechTranslator.cs:32-38
    // Method: PartOfSpeechTranslator.Translate()
    // Maps to: EXT-010, BHV-602
    public static string Translate(string sourceDictionary, string partOfSpeech, bool shortFormat)
    {
        if (sourceDictionary is null)
            throw new ArgumentNullException(
                nameof(sourceDictionary),
                "sourceDictionary must be SDBG or SDBH"
            );

        if (sourceDictionary != "SDBH" && sourceDictionary != "SDBG")
            throw new ArgumentException(
                "sourceDictionary must be SDBG or SDBH",
                nameof(sourceDictionary)
            );

        if (string.IsNullOrEmpty(partOfSpeech))
            return partOfSpeech ?? "";

        bool isHebrew = sourceDictionary == "SDBH";
        string code = isHebrew ? partOfSpeech.TrimEnd('H') : partOfSpeech;
        JsonElement tagStructure = isHebrew
            ? s_hebrewTagStructure.RootElement
            : s_greekTagStructure.RootElement;
        JsonElement tagTranslations = isHebrew
            ? s_hebrewTagTranslations.RootElement
            : s_greekTagTranslations.RootElement;

        List<string>? standardForm = TranslateToStandardForm(code, tagStructure, tagTranslations);

        return standardForm != null
            ? LocalizeStandardForm(standardForm, shortFormat)
            : partOfSpeech;
    }

    #region Private helper methods

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/PartOfSpeechTranslator.cs:42-56
    // Method: PartOfSpeechTranslator.LocalizeStandardForm()
    // Maps to: EXT-010
    private static string LocalizeStandardForm(List<string> standardForm, bool shortFormat)
    {
        string result = string.Join(
            ' ',
            standardForm.Select(word =>
                shortFormat && s_longToShortTranslations.TryGetValue(word, out string? shortVal)
                    ? shortVal
                    : word
            )
        );

        return result.Trim('-', ' ');
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/PartOfSpeechTranslator.cs:58-84
    // Method: PartOfSpeechTranslator.TranslateToStandardForm()
    // Maps to: EXT-010
    private static List<string>? TranslateToStandardForm(
        string partOfSpeech,
        JsonElement tagStructure,
        JsonElement tagTranslations
    )
    {
        string tagRootName = tagStructure.GetProperty("tag_root").GetString()!;
        JsonElement rootOptions = tagStructure.GetProperty("tag_options").GetProperty(tagRootName);
        string curValue = partOfSpeech;

        if (FindOption(rootOptions, ref curValue, out string? rootOption))
        {
            string rootValue = rootOption!;
            List<string> result = [];

            string rootTranslationKey = "part_of_speech-" + rootValue;
            JsonElement engLong = tagTranslations.GetProperty("eng-long");
            string rootTranslation = engLong.TryGetProperty(rootTranslationKey, out JsonElement rt)
                ? rt.GetString() ?? rootValue
                : rootValue;
            result.Add(rootTranslation);

            JsonElement tagSequence = tagStructure.GetProperty("tag_sequence");
            if (tagSequence.TryGetProperty(rootValue, out JsonElement sequence))
            {
                foreach (JsonElement category in sequence.EnumerateArray())
                {
                    string categoryName = category.GetString()!;
                    JsonElement categoryOptions = tagStructure
                        .GetProperty("tag_options")
                        .GetProperty(categoryName);

                    if (FindOption(categoryOptions, ref curValue, out string? categoryOption))
                    {
                        string tagId = categoryName + "-" + categoryOption;
                        string? translation = engLong.TryGetProperty(tagId, out JsonElement tv)
                            ? tv.GetString()
                            : null;
                        if (
                            !string.IsNullOrEmpty(translation)
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

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/PartOfSpeechTranslator.cs:86-98
    // Method: PartOfSpeechTranslator.FindOption()
    // Maps to: EXT-010
    private static bool FindOption(
        JsonElement options,
        ref string curValue,
        out string? matchedOption
    )
    {
        matchedOption = null;
        foreach (JsonElement option in options.EnumerateArray())
        {
            string optionValue = option.GetString()!;
            if (Matches(optionValue, ref curValue))
            {
                matchedOption = optionValue;
                return true;
            }
        }
        return false;
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/PartOfSpeechTranslator.cs:100-109
    // Method: PartOfSpeechTranslator.Matches()
    // Maps to: EXT-010
    private static bool Matches(string compareValue, ref string curValue)
    {
        if (!curValue.StartsWith(compareValue, StringComparison.Ordinal))
            return false;

        curValue = curValue[compareValue.Length..];
        return true;
    }

    /// <summary>
    /// Returns true if the property name is a category heading in the translation JSON,
    /// e.g. "case-", "gender-", "tense-". These have a single trailing dash and no
    /// internal dashes. They are section labels, not actual translation values.
    /// </summary>
    private static bool IsCategoryHeading(string propertyName) =>
        propertyName.Length > 1 && propertyName[^1] == '-' && !propertyName[..^1].Contains('-');

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/PartOfSpeechTranslator.cs:1085-1116
    // Method: PartOfSpeechTranslator.GetLongToShortValues() + GetLongAndShortTranslations()
    // Maps to: EXT-010
    private static Dictionary<string, string> BuildLongToShortValues()
    {
        var allTranslations = GetLongAndShortTranslations(s_hebrewTagTranslations.RootElement)
            .Concat(GetLongAndShortTranslations(s_greekTagTranslations.RootElement));

        Dictionary<string, string> result = new();
        foreach (var (longVal, shortVal) in allTranslations)
            result[longVal] = shortVal;

        return result;
    }

    private static IEnumerable<(string Long, string Short)> GetLongAndShortTranslations(
        JsonElement tagTranslations
    )
    {
        JsonElement engLong = tagTranslations.GetProperty("eng-long");
        JsonElement engShort = tagTranslations.GetProperty("eng-short");

        foreach (JsonProperty prop in engLong.EnumerateObject())
        {
            string longTranslation = prop.Value.GetString() ?? "";
            if (string.IsNullOrEmpty(longTranslation))
                continue;

            string propertyName = prop.Name;
            // Skip category heading entries like "case-": "Case" -- these are section
            // labels in the JSON, not actual translation values. A category heading has
            // exactly one trailing dash and no internal dashes (e.g., "case-", "gender-").
            if (IsCategoryHeading(propertyName))
                continue;

            if (engShort.TryGetProperty(propertyName, out JsonElement shortElement))
            {
                string? shortTranslation = shortElement.GetString();
                if (!string.IsNullOrEmpty(shortTranslation))
                    yield return (longTranslation, shortTranslation);
            }
        }
    }

    #endregion

    #region Embedded JSON structures

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/PartOfSpeechTranslator.cs:113-443
    // Method: PartOfSpeechTranslator.GetGreekTagStructure()
    // Maps to: EXT-010
    private const string GreekTagStructureJson =
        @"
{
    ""tag_options"" : {
      ""case"" : [
         ""a"",
         ""d"",
         ""g"",
         ""-"",
         ""n"",
         ""v""
      ],
      ""case_possessed"" : [
            ""a"",
            ""d"",
            ""g"",
            ""-"",
            ""n"",
            ""v""
         ],
      ""declinable"" : [
            ""i"",
            ""-"",
            ""d""
         ],
      ""gender"" : [
            ""m"",
            ""n"",
            ""-"",
            ""f""
         ],
      ""gender_possessed"" : [
            ""m"",
            ""n"",
            ""-"",
            ""f""
         ],
      ""level"" : [
            ""--"",
            ""cp"",
            ""-p"",
            ""c-""
         ],
      ""location"" : [
            ""e"",
            ""b"",
            ""-"",
            ""p"",
            ""f""
         ],
      ""mood"" : [
            ""i"",
            ""-"",
            ""m"",
            ""o"",
            ""n"",
            ""p"",
            ""s"",
            ""r""
         ],
      ""number"" : [
            ""p"",
            ""s"",
            ""-""
         ],
      ""number_possessed"" : [
            ""p"",
            ""s"",
            ""-""
         ],
      ""part_of_speech"" : [
            ""adjc"",
            ""advb"",
            ""anum"",
            ""aram"",
            ""artc"",
            ""cndp"",
            ""conj"",
            ""hebr"",
            ""intj"",
            ""nlet"",
            ""noun"",
            ""nprp"",
            ""part"",
            ""pcir"",
            ""pcor"",
            ""pdem"",
            ""pidf"",
            ""pirg"",
            ""pnct"",
            ""ppos"",
            ""pprs"",
            ""prec"",
            ""prel"",
            ""prep"",
            ""prfl"",
            ""pstp"",
            ""vfin"",
            ""vinf"",
            ""vptc""
         ],
      ""person"" : [
            ""1"",
            ""3"",
            ""2"",
            ""-""
         ],
      ""separator_dash"" : [
            ""-""
         ],
      ""taxis"" : [
            ""c"",
            ""-"",
            ""s""
         ],
      ""tense"" : [
            ""-f"",
            ""-a"",
            ""2r"",
            ""--"",
            ""-l"",
            ""-i"",
            ""2f"",
            ""-p"",
            ""-r"",
            ""2l"",
            ""2a""
         ],
      ""voice"" : [
            ""a"",
            ""e"",
            ""d"",
            ""-"",
            ""m"",
            ""o"",
            ""n"",
            ""p""
         ]
   },
   ""tag_root"" : ""part_of_speech"",
   ""tag_sequence"" : {
         ""adjc"" : [
            ""separator_dash"",
            ""declinable"",
            ""case"",
            ""gender"",
            ""number""
         ],
         ""advb"" : [
               ""separator_dash"",
               ""declinable""
            ],
         ""anum"" : [
               ""separator_dash"",
               ""declinable""
            ],
         ""aram"" : [
               ""separator_dash"",
               ""declinable""
            ],
         ""artc"" : [
               ""separator_dash"",
               ""declinable"",
               ""case"",
               ""gender"",
               ""number""
            ],
         ""cndp"" : [
               ""separator_dash"",
               ""declinable""
            ],
         ""conj"" : [
               ""separator_dash"",
               ""declinable"",
               ""taxis"",
               ""location"",
               ""level""
            ],
         ""hebr"" : [
               ""separator_dash"",
               ""declinable""
            ],
         ""intj"" : [
               ""separator_dash"",
               ""declinable""
            ],
         ""nlet"" : [
               ""separator_dash"",
               ""declinable""
            ],
         ""noun"" : [
               ""separator_dash"",
               ""declinable"",
               ""case"",
               ""gender"",
               ""number""
            ],
         ""nprp"" : [
               ""separator_dash"",
               ""declinable"",
               ""case"",
               ""gender"",
               ""number""
            ],
         ""part"" : [
               ""separator_dash"",
               ""declinable""
            ],
         ""pcir"" : [
               ""separator_dash"",
               ""declinable"",
               ""person"",
               ""case"",
               ""gender"",
               ""number""
            ],
         ""pcor"" : [
               ""separator_dash"",
               ""declinable"",
               ""person"",
               ""case"",
               ""gender"",
               ""number""
            ],
         ""pdem"" : [
               ""separator_dash"",
               ""declinable"",
               ""person"",
               ""case"",
               ""gender"",
               ""number""
            ],
         ""pidf"" : [
               ""separator_dash"",
               ""declinable"",
               ""person"",
               ""case"",
               ""gender"",
               ""number""
            ],
         ""pirg"" : [
               ""separator_dash"",
               ""declinable"",
               ""person"",
               ""case"",
               ""gender"",
               ""number""
            ],
         ""pnct"" : [
               ""separator_dash"",
               ""declinable""
            ],
         ""ppos"" : [
               ""separator_dash"",
               ""declinable"",
               ""person"",
               ""number"",
               ""case_possessed"",
               ""gender_possessed"",
               ""number_possessed""
            ],
         ""pprs"" : [
               ""separator_dash"",
               ""declinable"",
               ""person"",
               ""case"",
               ""gender"",
               ""number""
            ],
         ""prec"" : [
               ""separator_dash"",
               ""declinable"",
               ""person"",
               ""case"",
               ""gender"",
               ""number""
            ],
         ""prel"" : [
               ""separator_dash"",
               ""declinable"",
               ""person"",
               ""case"",
               ""gender"",
               ""number""
            ],
         ""prep"" : [
               ""separator_dash"",
               ""declinable""
            ],
         ""prfl"" : [
               ""separator_dash"",
               ""declinable"",
               ""person"",
               ""case"",
               ""gender"",
               ""number""
            ],
         ""pstp"" : [
               ""separator_dash"",
               ""declinable""
            ],
         ""vfin"" : [
               ""separator_dash"",
               ""declinable"",
               ""tense"",
               ""voice"",
               ""mood"",
               ""person"",
               ""number""
            ],
         ""vinf"" : [
               ""separator_dash"",
               ""declinable"",
               ""tense"",
               ""voice""
            ],
         ""vptc"" : [
               ""separator_dash"",
               ""declinable"",
               ""tense"",
               ""voice"",
               ""mood"",
               ""case"",
               ""gender"",
               ""number""
            ]
      }
}";

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/PartOfSpeechTranslator.cs:446-689
    // Method: PartOfSpeechTranslator.GetGreekTranslations()
    // Maps to: EXT-010
    private const string GreekTranslationsJson =
        @"
{
    ""eng-long"" : {
         ""case-"" : ""Case"",
         ""case--"" : """",
         ""case-a"" : ""accusative"",
         ""case-d"" : ""dative"",
         ""case-g"" : ""genitive"",
         ""case-n"" : ""nominative"",
         ""case-v"" : ""vocative"",
         ""case_possessed-"" : ""Case of possessed part"",
         ""case_possessed--"" : """",
         ""case_possessed-a"" : ""accusative"",
         ""case_possessed-d"" : ""dative"",
         ""case_possessed-g"" : ""genitive"",
         ""case_possessed-n"" : ""nominative"",
         ""declinable-"" : ""Declinability"",
         ""declinable--"" : """",
         ""declinable-d"" : ""declinable"",
         ""declinable-i"" : ""indeclinable"",
         ""gender-"" : ""Gender"",
         ""gender--"" : """",
         ""gender-f"" : ""feminine"",
         ""gender-m"" : ""masculine"",
         ""gender-n"" : ""neuter"",
         ""gender_possessed-"" : ""Gender of possessed part"",
         ""gender_possessed--"" : """",
         ""gender_possessed-f"" : ""feminine"",
         ""gender_possessed-m"" : ""masculine"",
         ""gender_possessed-n"" : ""neuter"",
         ""level-"" : ""Level"",
         ""level--"" : """",
         ""level---"" : """",
         ""level--p"" : ""interphrasal"",
         ""level-c-"" : ""interclausal"",
         ""level-cp"" : ""both interclausal and interphrasal"",
         ""location-"" : ""Location"",
         ""location--"" : """",
         ""location-b"" : ""between"",
         ""location-e"" : ""fronted or between"",
         ""location-f"" : ""fronted"",
         ""location-p"" : ""postpositive"",
         ""mood-"" : ""Mood"",
         ""mood--"" : """",
         ""mood-i"" : ""indicative"",
         ""mood-m"" : ""imperative"",
         ""mood-n"" : ""infinitive"",
         ""mood-o"" : ""optative"",
         ""mood-p"" : ""participle"",
         ""mood-r"" : ""participle with imperatival force"",
         ""mood-s"" : ""subjunctive"",
         ""number-"" : ""Number"",
         ""number--"" : """",
         ""number-p"" : ""plural"",
         ""number-s"" : ""singular"",
         ""number_possessed-"" : ""Number of possessed part"",
         ""number_possessed--"" : """",
         ""number_possessed-p"" : ""plural"",
         ""number_possessed-s"" : ""singular"",
         ""part_of_speech-"" : ""Part of speech"",
         ""part_of_speech-adjc"" : ""adjective"",
         ""part_of_speech-advb"" : ""adverb"",
         ""part_of_speech-anum"" : ""indeclinable number"",
         ""part_of_speech-aram"" : ""aramaic word"",
         ""part_of_speech-artc"" : ""article"",
         ""part_of_speech-cndp"" : ""conditional particle"",
         ""part_of_speech-conj"" : ""conjunction"",
         ""part_of_speech-hebr"" : ""hebrew word"",
         ""part_of_speech-intj"" : ""interjection"",
         ""part_of_speech-nlet"" : ""indeclinable letter"",
         ""part_of_speech-noun"" : ""noun"",
         ""part_of_speech-nprp"" : ""proper noun"",
         ""part_of_speech-part"" : ""particle"",
         ""part_of_speech-pcir"" : ""correlative or interrogative pronoun"",
         ""part_of_speech-pcor"" : ""correlative pronoun"",
         ""part_of_speech-pdem"" : ""demonstrative pronoun"",
         ""part_of_speech-pidf"" : ""indefinite pronoun"",
         ""part_of_speech-pirg"" : ""interrogative pronoun"",
         ""part_of_speech-pnct"" : ""punctuation"",
         ""part_of_speech-ppos"" : ""possessive pronoun"",
         ""part_of_speech-pprs"" : ""personal pronoun"",
         ""part_of_speech-prec"" : ""reciprocal pronoun"",
         ""part_of_speech-prel"" : ""relative pronoun"",
         ""part_of_speech-prep"" : ""preposition"",
         ""part_of_speech-prfl"" : ""reflexive pronoun"",
         ""part_of_speech-pstp"" : ""postposition"",
         ""part_of_speech-vfin"" : ""v, finite"",
         ""part_of_speech-vinf"" : ""v, infinitive"",
         ""part_of_speech-vptc"" : ""v, participle"",
         ""person-"" : ""Person"",
         ""person--"" : """",
         ""person-1"" : ""1st person"",
         ""person-2"" : ""2nd person"",
         ""person-3"" : ""3rd person"",
         ""separator_dash--"" : """",
         ""taxis-"" : ""Taxis"",
         ""taxis--"" : """",
         ""taxis-c"" : ""coordinating"",
         ""taxis-s"" : ""subordinating"",
         ""tense-"" : ""Tense"",
         ""tense---"" : """",
         ""tense--a"" : ""aorist"",
         ""tense--f"" : ""future"",
         ""tense--i"" : ""imperfect"",
         ""tense--l"" : ""pluperfect"",
         ""tense--p"" : ""present"",
         ""tense--r"" : ""perfect"",
         ""tense-2a"" : ""2nd aorist"",
         ""tense-2f"" : ""2nd future"",
         ""tense-2l"" : ""2nd pluperfect"",
         ""tense-2r"" : ""2nd perfect"",
         ""voice-"" : ""Voice"",
         ""voice--"" : """",
         ""voice-a"" : ""active"",
         ""voice-d"" : ""middle deponent"",
         ""voice-e"" : ""middle or passive"",
         ""voice-m"" : ""middle"",
         ""voice-n"" : ""middle or passive deponent"",
         ""voice-o"" : ""passive deponent"",
         ""voice-p"" : ""passive""
      },
   ""eng-short"" : {
         ""case-"" : ""Case"",
         ""case--"" : """",
         ""case-a"" : ""acc"",
         ""case-d"" : ""dat"",
         ""case-g"" : ""gen"",
         ""case-n"" : ""nom"",
         ""case-v"" : ""voc"",
         ""case_possessed-"" : ""Case of possessed part"",
         ""case_possessed--"" : """",
         ""case_possessed-a"" : ""acc"",
         ""case_possessed-d"" : ""dat"",
         ""case_possessed-g"" : ""gen"",
         ""case_possessed-n"" : ""nom"",
         ""declinable-"" : ""Declinability"",
         ""declinable--"" : """",
         ""declinable-d"" : ""decl"",
         ""declinable-i"" : ""indecl"",
         ""gender-"" : ""Gender"",
         ""gender--"" : """",
         ""gender-f"" : ""f"",
         ""gender-m"" : ""m"",
         ""gender-n"" : ""n"",
         ""gender_possessed-"" : ""Gender of possessed part"",
         ""gender_possessed--"" : """",
         ""gender_possessed-f"" : ""f"",
         ""gender_possessed-m"" : ""m"",
         ""gender_possessed-n"" : ""n"",
         ""level-"" : ""Level"",
         ""level--"" : """",
         ""level---"" : """",
         ""level--p"" : ""interphrasal"",
         ""level-c-"" : ""interclausal"",
         ""level-cp"" : ""interclausal+interphrasal"",
         ""location-"" : ""Location"",
         ""location--"" : """",
         ""location-b"" : ""between"",
         ""location-e"" : ""fronted/between"",
         ""location-f"" : ""fronted"",
         ""location-p"" : ""postpositive"",
         ""mood-"" : ""Mood"",
         ""mood--"" : """",
         ""mood-i"" : ""ind"",
         ""mood-m"" : ""imp"",
         ""mood-n"" : ""inf"",
         ""mood-o"" : ""opt"",
         ""mood-p"" : ""ptc"",
         ""mood-r"" : ""ptc.imp."",
         ""mood-s"" : ""sbjv"",
         ""number-"" : ""Number"",
         ""number--"" : """",
         ""number-p"" : ""pl"",
         ""number-s"" : ""sg"",
         ""number_possessed-"" : ""Number of possessed part"",
         ""number_possessed--"" : """",
         ""number_possessed-p"" : ""pl"",
         ""number_possessed-s"" : ""sg"",
         ""part_of_speech-"" : ""Part of speech"",
         ""part_of_speech-adjc"" : ""adj"",
         ""part_of_speech-advb"" : ""adv"",
         ""part_of_speech-anum"" : ""indecl.num."",
         ""part_of_speech-aram"" : ""Aram."",
         ""part_of_speech-artc"" : ""art"",
         ""part_of_speech-cndp"" : ""cond"",
         ""part_of_speech-conj"" : ""cj"",
         ""part_of_speech-hebr"" : ""Heb."",
         ""part_of_speech-intj"" : ""intj"",
         ""part_of_speech-nlet"" : ""indecl.letter"",
         ""part_of_speech-noun"" : ""n"",
         ""part_of_speech-nprp"" : ""prop.n"",
         ""part_of_speech-part"" : ""ptcl"",
         ""part_of_speech-pcir"" : ""corr/inter.pron"",
         ""part_of_speech-pcor"" : ""corr.pron"",
         ""part_of_speech-pdem"" : ""dem.pron"",
         ""part_of_speech-pidf"" : ""indef.pron"",
         ""part_of_speech-pirg"" : ""inter.pron"",
         ""part_of_speech-pnct"" : ""punct"",
         ""part_of_speech-ppos"" : ""poss.pron"",
         ""part_of_speech-pprs"" : ""pers.pron"",
         ""part_of_speech-prec"" : ""recip.pron"",
         ""part_of_speech-prel"" : ""rel.pron"",
         ""part_of_speech-prep"" : ""prep"",
         ""part_of_speech-prfl"" : ""refl.pron"",
         ""part_of_speech-pstp"" : ""post"",
         ""part_of_speech-vfin"" : ""v"",
         ""part_of_speech-vinf"" : ""inf"",
         ""part_of_speech-vptc"" : ""ptcp"",
         ""person-"" : ""Person"",
         ""person--"" : """",
         ""person-1"" : ""1"",
         ""person-2"" : ""2"",
         ""person-3"" : ""3"",
         ""separator_dash--"" : """",
         ""taxis-"" : ""Taxis"",
         ""taxis--"" : """",
         ""taxis-c"" : ""coord."",
         ""taxis-s"" : ""subord."",
         ""tense-"" : ""Tense"",
         ""tense---"" : """",
         ""tense--a"" : ""aor"",
         ""tense--f"" : ""fut"",
         ""tense--i"" : ""ipfv"",
         ""tense--l"" : ""pluprf"",
         ""tense--p"" : ""prs"",
         ""tense--r"" : ""prf"",
         ""tense-2a"" : ""2aor"",
         ""tense-2f"" : ""2fut"",
         ""tense-2l"" : ""2pluprf"",
         ""tense-2r"" : ""2prf"",
         ""voice-"" : ""Voice"",
         ""voice--"" : """",
         ""voice-a"" : ""act"",
         ""voice-d"" : ""midd.dep."",
         ""voice-e"" : ""midd./pass."",
         ""voice-m"" : ""midd."",
         ""voice-n"" : ""midd./pass.dep."",
         ""voice-o"" : ""pass.dep."",
         ""voice-p"" : ""pass.""
      }
}";

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/PartOfSpeechTranslator.cs:691-879
    // Method: PartOfSpeechTranslator.GetHebrewTagStructure()
    // Maps to: EXT-010
    private const string HebrewTagStructureJson =
        @"
{
    ""tag_options"" : {
      ""gender"" : [
         ""-"",
         ""?"",
         ""f"",
         ""m""
      ],
      ""language"" : [
            ""A"",
            ""H""
         ],
      ""ng"" : [
            ""s?"",
            ""sf"",
            ""sm"",
            ""d?"",
            ""df"",
            ""dm"",
            ""p?"",
            ""pf"",
            ""pm""
         ],
      ""part_of_speech"" : [
            ""ar"",
            ""vb"",
            ""ns"",
            ""np"",
            ""ab"",
            ""pr"",
            ""cj"",
            ""pp"",
            ""pd"",
            ""pi"",
            ""ij"",
            ""ng"",
            ""ir"",
            ""aj""
         ],
      ""png"" : [
            ""???"",
            ""?sf"",
            ""?sm"",
            ""?pm"",
            ""?pf"",
            ""1s?"",
            ""2sm"",
            ""2sf"",
            ""3sm"",
            ""3sf"",
            ""1p?"",
            ""2pm"",
            ""2pf"",
            ""3p?"",
            ""3pm"",
            ""3pf""
         ],
      ""state"" : [
            ""-"",
            ""?"",
            ""a"",
            ""c"",
            ""e""
         ],
      ""suffix"" : [
            ""---"",
            ""???"",
            ""1s?"",
            ""2sm"",
            ""2sf"",
            ""3sm"",
            ""3sf"",
            ""1p?"",
            ""2pm"",
            ""2pf"",
            ""3pm"",
            ""3pf""
         ],
      ""verbal_stem"" : [
            ""----"",
            ""afel"",
            ""esht"",
            ""etpa"",
            ""etpe"",
            ""etta"",
            ""haf-"",
            ""hif-"",
            ""hit-"",
            ""hof-"",
            ""hotp"",
            ""hsht"",
            ""htpa"",
            ""htpe"",
            ""htpo"",
            ""nif-"",
            ""nit-"",
            ""pael"",
            ""pasq"",
            ""peal"",
            ""peil"",
            ""piel"",
            ""poal"",
            ""poel"",
            ""pual"",
            ""qal-"",
            ""shaf"",
            ""tif-""
         ],
      ""verbal_tense"" : [
            ""----"",
            ""impf"",
            ""impv"",
            ""infa"",
            ""infc"",
            ""perf"",
            ""ptca"",
            ""ptcp"",
            ""wayq"",
            ""weyq""
         ]
   },
   ""tag_root"" : ""part_of_speech"",
   ""tag_sequence"" : {
         ""ab"" : [
            ""language""
         ],
         ""aj"" : [
               ""ng"",
               ""state"",
               ""suffix"",
               ""language""
            ],
         ""ar"" : [
               ""language""
            ],
         ""cj"" : [
               ""language""
            ],
         ""ij"" : [
               ""suffix"",
               ""language""
            ],
         ""ir"" : [
               ""suffix"",
               ""language""
            ],
         ""ng"" : [
               ""language""
            ],
         ""np"" : [
               ""ng"",
               ""language""
            ],
         ""ns"" : [
               ""ng"",
               ""state"",
               ""suffix"",
               ""language""
            ],
         ""pd"" : [
               ""ng"",
               ""language""
            ],
         ""pi"" : [
               ""language""
            ],
         ""pp"" : [
               ""png"",
               ""language""
            ],
         ""pr"" : [
               ""suffix"",
               ""language""
            ],
         ""vb"" : [
               ""verbal_stem"",
               ""verbal_tense"",
               ""png"",
               ""state"",
               ""suffix"",
               ""language""
            ]
      }
}";

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/PartOfSpeechTranslator.cs:881-1082
    // Method: PartOfSpeechTranslator.GetHebrewTranslations()
    // Maps to: EXT-010
    private const string HebrewTranslationsJson =
        @"
{
    ""eng-long"" : {
         ""language-A"" : ""Aramaic"",
         ""language-H"" : ""Hebrew"",
         ""ng-d?"" : ""common dual"",
         ""ng-df"" : ""feminine dual"",
         ""ng-dm"" : ""masculine dual"",
         ""ng-p?"" : ""common plural"",
         ""ng-pf"" : ""feminine plural"",
         ""ng-pm"" : ""masculine plural"",
         ""ng-s?"" : ""common singular"",
         ""ng-sf"" : ""feminine singular"",
         ""ng-sm"" : ""masculine singular"",
         ""part_of_speech-ab"" : ""adverb"",
         ""part_of_speech-aj"" : ""adjective"",
         ""part_of_speech-ar"" : ""article"",
         ""part_of_speech-cj"" : ""conjunction"",
         ""part_of_speech-ij"" : ""interjection"",
         ""part_of_speech-ir"" : ""interrogative"",
         ""part_of_speech-ng"" : ""negative"",
         ""part_of_speech-np"" : ""proper noun"",
         ""part_of_speech-ns"" : ""noun"",
         ""part_of_speech-pd"" : ""demonstrative pronoun"",
         ""part_of_speech-pi"" : ""interrogative pronoun"",
         ""part_of_speech-pp"" : ""personal pronoun"",
         ""part_of_speech-pr"" : ""preposition"",
         ""part_of_speech-vb"" : ""verbal"",
         ""png-1p?"" : ""1st common plural"",
         ""png-1s?"" : ""1st common singular"",
         ""png-2pf"" : ""2nd feminine plural"",
         ""png-2pm"" : ""2nd masculine plural"",
         ""png-2sf"" : ""2nd feminine singular"",
         ""png-2sm"" : ""2nd masculine singular"",
         ""png-3p?"" : ""3rd common plural"",
         ""png-3pf"" : ""3rd feminine plural"",
         ""png-3pm"" : ""3rd masculine plural"",
         ""png-3sf"" : ""3rd feminine singular"",
         ""png-3sm"" : ""3rd masculine singular"",
         ""png-???"" : """",
         ""png-?pf"" : ""feminine plural"",
         ""png-?pm"" : ""masculine plural"",
         ""png-?sf"" : ""feminine singular"",
         ""png-?sm"" : ""masculine singular"",
         ""state--"" : """",
         ""state-?"" : """",
         ""state-a"" : ""absolute"",
         ""state-c"" : ""construct"",
         ""state-e"" : ""emphatic"",
         ""suffix----"" : """",
         ""suffix-1p?"" : ""suffix 1st common plural"",
         ""suffix-1s?"" : ""suffix 1st common singular"",
         ""suffix-2pf"" : ""suffix 2nd feminine plural"",
         ""suffix-2pm"" : ""suffix 2nd masculine plural"",
         ""suffix-2sf"" : ""suffix 2nd feminine singular"",
         ""suffix-2sm"" : ""suffix 2nd masculine singular"",
         ""suffix-3pf"" : ""suffix 3rd feminine plural"",
         ""suffix-3pm"" : ""suffix 3rd masculine plural"",
         ""suffix-3sf"" : ""suffix 3rd feminine singular"",
         ""suffix-3sm"" : ""suffix 3rd masculine singular"",
         ""suffix-???"" : """",
         ""verbal_stem-----"" : """",
         ""verbal_stem-afel"" : ""Af'el"",
         ""verbal_stem-esht"" : ""Eshtaf'al"",
         ""verbal_stem-etpa"" : ""Etpa''al"",
         ""verbal_stem-etpe"" : ""Etpe'el"",
         ""verbal_stem-etta"" : ""Ettaf'al"",
         ""verbal_stem-haf-"" : ""Haf'el"",
         ""verbal_stem-hif-"" : ""Hif'il"",
         ""verbal_stem-hit-"" : ""Hitpa''el"",
         ""verbal_stem-hof-"" : ""Hof'al"",
         ""verbal_stem-hotp"" : ""Hotpa''al"",
         ""verbal_stem-hsht"" : ""Hishtaf'al"",
         ""verbal_stem-htpa"" : ""Hitpa''al"",
         ""verbal_stem-htpe"" : ""Hitpe'el"",
         ""verbal_stem-htpo"" : ""Hitpo'el"",
         ""verbal_stem-nif-"" : ""Nif'al"",
         ""verbal_stem-nit-"" : ""Nitpa''el"",
         ""verbal_stem-pael"" : ""Pa''el"",
         ""verbal_stem-pasq"" : ""Qal passive"",
         ""verbal_stem-peal"" : ""Pe'al"",
         ""verbal_stem-peil"" : ""Pe'il"",
         ""verbal_stem-piel"" : ""Pi''el"",
         ""verbal_stem-poal"" : ""Po'al"",
         ""verbal_stem-poel"" : ""Po'el"",
         ""verbal_stem-pual"" : ""Pu''al"",
         ""verbal_stem-qal-"" : ""Qal"",
         ""verbal_stem-shaf"" : ""Shaf'el"",
         ""verbal_stem-tif-"" : ""Tif'al"",
         ""verbal_tense-----"" : """",
         ""verbal_tense-impf"" : ""imperfect"",
         ""verbal_tense-impv"" : ""imperative"",
         ""verbal_tense-infa"" : ""infinitive absolute"",
         ""verbal_tense-infc"" : ""infinitive construct"",
         ""verbal_tense-perf"" : ""perfect"",
         ""verbal_tense-ptca"" : ""active participle"",
         ""verbal_tense-ptcp"" : ""passive participle"",
         ""verbal_tense-wayq"" : ""consecutive imperfect"",
         ""verbal_tense-weyq"" : ""consecutive perfect""
      },
   ""eng-short"" : {
         ""language-A"" : ""Aram"",
         ""language-H"" : ""Heb"",
         ""ng-d?"" : ""c.du"",
         ""ng-df"" : ""f.du"",
         ""ng-dm"" : ""m.du"",
         ""ng-p?"" : ""c.pl"",
         ""ng-pf"" : ""f.pl"",
         ""ng-pm"" : ""m.pl"",
         ""ng-s?"" : ""c.sg"",
         ""ng-sf"" : ""f.sg"",
         ""ng-sm"" : ""m.s"",
         ""part_of_speech-ab"" : ""adv"",
         ""part_of_speech-aj"" : ""adj"",
         ""part_of_speech-ar"" : ""art"",
         ""part_of_speech-cj"" : ""cj"",
         ""part_of_speech-ij"" : ""intj"",
         ""part_of_speech-ir"" : ""inter"",
         ""part_of_speech-ng"" : ""neg"",
         ""part_of_speech-np"" : ""prop.n"",
         ""part_of_speech-ns"" : ""n"",
         ""part_of_speech-pd"" : ""dem.pron"",
         ""part_of_speech-pi"" : ""inter.pron"",
         ""part_of_speech-pp"" : ""pers.pron"",
         ""part_of_speech-pr"" : ""prep"",
         ""part_of_speech-vb"" : ""v"",
         ""png-1p?"" : ""1c.pl"",
         ""png-1s?"" : ""1c.sg"",
         ""png-2pf"" : ""2f.pl"",
         ""png-2pm"" : ""2m.pl"",
         ""png-2sf"" : ""2f.sg"",
         ""png-2sm"" : ""2m.sg"",
         ""png-3p?"" : ""3c.pl"",
         ""png-3pf"" : ""3f.pl"",
         ""png-3pm"" : ""3m.pl"",
         ""png-3sf"" : ""3f.sg"",
         ""png-3sm"" : ""3m.sg"",
         ""png-???"" : """",
         ""png-?pf"" : ""f.pl"",
         ""png-?pm"" : ""m.pl"",
         ""png-?sf"" : ""f.sg"",
         ""png-?sm"" : ""m.sg"",
         ""state--"" : """",
         ""state-?"" : """",
         ""state-a"" : ""abs"",
         ""state-c"" : ""cst"",
         ""state-e"" : ""emph"",
         ""suffix----"" : """",
         ""suffix-1p?"" : ""sfx.1c.pl"",
         ""suffix-1s?"" : ""sfx.1c.sg"",
         ""suffix-2pf"" : ""sfx.2f.pl"",
         ""suffix-2pm"" : ""sfx.2m.pl"",
         ""suffix-2sf"" : ""sfx.2f.sg"",
         ""suffix-2sm"" : ""sfx.2m.sg"",
         ""suffix-3pf"" : ""sfx.3f.pl"",
         ""suffix-3pm"" : ""sfx.3m.pl"",
         ""suffix-3sf"" : ""sfx.3f.sg"",
         ""suffix-3sm"" : ""sfx.3m.sg"",
         ""suffix-???"" : """",
         ""verbal_stem-----"" : """",
         ""verbal_stem-afel"" : ""Af'el"",
         ""verbal_stem-esht"" : ""Eshtaf'al"",
         ""verbal_stem-etpa"" : ""Etpa''al"",
         ""verbal_stem-etpe"" : ""Etpe'el"",
         ""verbal_stem-etta"" : ""Ettaf'al"",
         ""verbal_stem-haf-"" : ""Haf'el"",
         ""verbal_stem-hif-"" : ""Hif'il"",
         ""verbal_stem-hit-"" : ""Hitpa''el"",
         ""verbal_stem-hof-"" : ""Hof'al"",
         ""verbal_stem-hotp"" : ""Hotpa''al"",
         ""verbal_stem-hsht"" : ""Hishtaf'al"",
         ""verbal_stem-htpa"" : ""Hitpa''al"",
         ""verbal_stem-htpe"" : ""Hitpe'el"",
         ""verbal_stem-htpo"" : ""Hitpo'el"",
         ""verbal_stem-nif-"" : ""Nif'al"",
         ""verbal_stem-nit-"" : ""Nitpa''el"",
         ""verbal_stem-pael"" : ""Pa''el"",
         ""verbal_stem-pasq"" : ""Qal passive"",
         ""verbal_stem-peal"" : ""Pe'al"",
         ""verbal_stem-peil"" : ""Pe'il"",
         ""verbal_stem-piel"" : ""Pi''el"",
         ""verbal_stem-poal"" : ""Po'al"",
         ""verbal_stem-poel"" : ""Po'el"",
         ""verbal_stem-pual"" : ""Pu''al"",
         ""verbal_stem-qal-"" : ""Qal"",
         ""verbal_stem-shaf"" : ""Shaf'el"",
         ""verbal_stem-tif-"" : ""Tif'al"",
         ""verbal_tense-----"" : """",
         ""verbal_tense-impf"" : ""ipf"",
         ""verbal_tense-impv"" : ""imp"",
         ""verbal_tense-infa"" : ""inf.abs"",
         ""verbal_tense-infc"" : ""inf.cst"",
         ""verbal_tense-perf"" : ""prf"",
         ""verbal_tense-ptca"" : ""actv.ptcp"",
         ""verbal_tense-ptcp"" : ""pass.ptcp"",
         ""verbal_tense-wayq"" : ""ipf.cs"",
         ""verbal_tense-weyq"" : ""prf.cs""
      }
}";

    #endregion
}
