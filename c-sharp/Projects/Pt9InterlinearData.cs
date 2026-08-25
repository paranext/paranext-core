using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// One lexeme reference inside a PT9 interlinear cluster: the lexicon lexeme it selects and,
/// when the user chose a specific sense, the id of that sense. A corrupt cluster element can
/// carry no lexeme id; the reference is passed through as-is for the consumer to count and
/// drop.
/// </summary>
public sealed record Pt9InterlinearLexemeRef(
    [property: JsonPropertyName("lexemeId")] string? LexemeId,
    [property: JsonPropertyName("senseId")] string? SenseId
);

/// <summary>
/// One glossed cluster in a verse. <c>Index</c> and <c>Length</c> locate the cluster in the verse
/// text as PT9 recorded it; they index PT9's own string, not any text this provider returns.
/// </summary>
public sealed record Pt9InterlinearCluster(
    [property: JsonPropertyName("index")] int Index,
    [property: JsonPropertyName("length")] int Length,
    [property: JsonPropertyName("excluded")] bool Excluded,
    [property: JsonPropertyName("lexemes")] List<Pt9InterlinearLexemeRef> Lexemes
);

/// <summary>
/// One punctuation adjustment PT9 recorded for a verse's back translation output.
/// </summary>
public sealed record Pt9InterlinearPunctuation(
    [property: JsonPropertyName("index")] int Index,
    [property: JsonPropertyName("length")] int Length,
    [property: JsonPropertyName("beforeText")] string? BeforeText,
    [property: JsonPropertyName("afterText")] string? AfterText
);

/// <summary>
/// One verse's interlinear data. <c>ApprovedHash</c> is PT9's hash of the verse text at approval
/// time; when absent the verse was never approved.
/// </summary>
public sealed record Pt9InterlinearVerse(
    [property: JsonPropertyName("reference")] string Reference,
    [property: JsonPropertyName("approvedHash")] string? ApprovedHash,
    [property: JsonPropertyName("clusters")] List<Pt9InterlinearCluster> Clusters,
    [property: JsonPropertyName("punctuations")] List<Pt9InterlinearPunctuation> Punctuations
);

/// <summary>
/// One book's interlinear data for one gloss language. <c>GlossLanguage</c> and <c>BookId</c> come
/// from the file's own attributes, not from its file name.
/// </summary>
public sealed record Pt9InterlinearBook(
    [property: JsonPropertyName("glossLanguage")] string? GlossLanguage,
    [property: JsonPropertyName("bookId")] string? BookId,
    [property: JsonPropertyName("verses")] List<Pt9InterlinearVerse> Verses
);

/// <summary>
/// One gloss of a lexicon sense in one target language.
/// </summary>
public sealed record Pt9LexiconGloss(
    [property: JsonPropertyName("language")] string? Language,
    [property: JsonPropertyName("text")] string Text
);

/// <summary>
/// One sense of a lexicon entry, carrying the id that interlinear clusters reference.
/// </summary>
public sealed record Pt9LexiconSense(
    [property: JsonPropertyName("id")] string? Id,
    [property: JsonPropertyName("glosses")] List<Pt9LexiconGloss> Glosses
);

/// <summary>
/// One lexicon entry: the lexeme's morphological type (Word, Phrase, Stem, Prefix, Suffix, or
/// Lemma), its form, its homograph number, and its senses.
/// </summary>
public sealed record Pt9LexiconEntry(
    [property: JsonPropertyName("type")] string Type,
    [property: JsonPropertyName("form")] string Form,
    [property: JsonPropertyName("homograph")] int Homograph,
    [property: JsonPropertyName("senses")] List<Pt9LexiconSense> Senses
);

/// <summary>
/// The known morphological breakdowns of one surface word. Each analysis is an ordered list of
/// lexeme ids (e.g. <c>Stem:run</c>, <c>Suffix:s</c>).
/// </summary>
public sealed record Pt9WordParse(
    [property: JsonPropertyName("word")] string Word,
    [property: JsonPropertyName("analyses")] List<List<string>> Analyses
);

/// <summary>
/// The project's PT9 lexicon: gloss entries by lexeme plus the legacy word analyses that older
/// Paratext versions stored inside Lexicon.xml.
/// </summary>
public sealed record Pt9Lexicon(
    [property: JsonPropertyName("language")] string? Language,
    [property: JsonPropertyName("entries")] List<Pt9LexiconEntry> Entries,
    [property: JsonPropertyName("legacyAnalyses")] List<Pt9WordParse> LegacyAnalyses
);

/// <summary>
/// One configured interlinearization: its type name (e.g. <c>Glossing</c>,
/// <c>BackTranslation</c>), the gloss language id, the display name the user gave the language for
/// setups created without a model text, and the name and hex id of the model text the
/// interlinearization reads from. The model fields are absent for a setup with no model text.
/// </summary>
public sealed record Pt9InterlinearSetup(
    [property: JsonPropertyName("type")] string Type,
    [property: JsonPropertyName("languageId")] string? LanguageId,
    [property: JsonPropertyName("languageName")] string? LanguageName,
    [property: JsonPropertyName("modelScrTextName")] string? ModelScrTextName,
    [property: JsonPropertyName("modelScrTextId")] string? ModelScrTextId
);

/// <summary>
/// A Paratext project's complete PT9 interlinear data, parsed from the project's files:
/// interlinearization setups, per-language per-book cluster data, the lexicon, and stored word
/// analyses. <c>HasAssociatedLexicalProject</c> is true when the project's lexicon lives in an
/// associated external lexical project (e.g. FieldWorks) rather than in Lexicon.xml, so an empty
/// <c>Lexicon</c> does not mean the project has no gloss data; such a project's lexical data is
/// resolved through the platform's Lexicon extension rather than through this interface.
///
/// Files are read with PT9's own semantics, never more strictly: a duplicate verse reference,
/// lexicon key, or wordform keeps the last occurrence; a cluster missing its Range element gets
/// range (0, 0); and a malformed boolean or unknown enum name fails the whole file the same way
/// it would fail in Paratext 9.
/// </summary>
public sealed record Pt9InterlinearProjectData(
    [property: JsonPropertyName("setups")] List<Pt9InterlinearSetup> Setups,
    [property: JsonPropertyName("books")] List<Pt9InterlinearBook> Books,
    [property: JsonPropertyName("lexicon")] Pt9Lexicon? Lexicon,
    [property: JsonPropertyName("wordAnalyses")] List<Pt9WordParse> WordAnalyses,
    [property: JsonPropertyName("hasAssociatedLexicalProject")] bool HasAssociatedLexicalProject
);
