using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Projects;

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
/// it would fail in Paratext 9. The consequence deliberately differs, though: PT9's per-file
/// loads quietly serve an empty file in a corrupt one's place, costing one book silently, while
/// here one bad file fails the whole request, so corruption is visible and no partial payload
/// ever poses as complete data.
/// </summary>
public sealed record Pt9InterlinearProjectData(
    [property: JsonPropertyName("setups")] List<Pt9InterlinearSetup> Setups,
    [property: JsonPropertyName("books")] List<Pt9InterlinearBook> Books,
    [property: JsonPropertyName("lexicon")] Pt9Lexicon? Lexicon,
    [property: JsonPropertyName("wordAnalyses")] List<Pt9WordParse> WordAnalyses,
    [property: JsonPropertyName("hasAssociatedLexicalProject")] bool HasAssociatedLexicalProject
);

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
/// One verse's interlinear data. Only verses whose key parses as a verse reference are served;
/// PT9's own read drops the rest (e.g. Send/Receive conflict-marker keys), and so does this.
/// <c>ApprovedHash</c> is PT9's hash of the verse text at approval time; when absent the verse
/// was never approved.
/// </summary>
public sealed record Pt9InterlinearVerse(
    [property: JsonPropertyName("reference")] string Reference,
    [property: JsonPropertyName("approvedHash")] string? ApprovedHash,
    [property: JsonPropertyName("clusters")] List<Pt9InterlinearCluster> Clusters,
    [property: JsonPropertyName("punctuations")] List<Pt9InterlinearPunctuation> Punctuations
);

/// <summary>
/// One book's interlinear data for one gloss language. <c>GlossLanguage</c> and <c>BookId</c> come
/// from the file's own attributes, not from its file name. <c>FilePath</c> is the project-relative
/// path the book was parsed from - its key in the manifest. <c>IsCanonicalPath</c> is true when
/// that path is the one PT9's own reader loads this language and book from; a false value marks
/// Send/Receive merge residue or a hand-placed copy, so the same language and book can appear more
/// than once.
/// </summary>
public sealed record Pt9InterlinearBook(
    [property: JsonPropertyName("glossLanguage")] string? GlossLanguage,
    [property: JsonPropertyName("bookId")] string? BookId,
    [property: JsonPropertyName("verses")] List<Pt9InterlinearVerse> Verses,
    [property: JsonPropertyName("filePath")] string FilePath,
    [property: JsonPropertyName("isCanonicalPath")] bool IsCanonicalPath
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
/// One lexicon entry: the lexeme's morphological type (one of Phrase, Word, Lemma, Stem,
/// Prefix, Suffix, or Infix; an unknown name fails the file as corrupt), its form, its homograph
/// number, and its senses. <c>Id</c> is PT9's composed lexeme id - <c>Type:Form</c>, with
/// <c>:Homograph</c> appended only when it is not 1 - the exact string that cluster
/// <c>lexemeId</c>s and word-parse analyses reference, so joins need not re-derive the grammar.
/// </summary>
public sealed record Pt9LexiconEntry(
    [property: JsonPropertyName("id")] string Id,
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
/// Paratext versions stored inside Lexicon.xml. Served as PT9 reads it: forms corrected to the
/// project's normalization, <c>Language</c> the project's language id, empty legacy analyses
/// dropped.
/// </summary>
public sealed record Pt9Lexicon(
    [property: JsonPropertyName("language")] string? Language,
    [property: JsonPropertyName("entries")] List<Pt9LexiconEntry> Entries,
    [property: JsonPropertyName("legacyAnalyses")] List<Pt9WordParse> LegacyAnalyses
);

/// <summary>
/// One configured interlinearization, served with every field PT9 stores for it: its type name
/// (e.g. <c>Glossing</c>, <c>BackTranslation</c>), the gloss language id, the display fields the
/// user gave the language for setups created without a model text (name, font, size, direction),
/// the model text the interlinearization reads from, and the export half: whether and where
/// approved verses export. The model name is absent for a setup with no model text; the model id
/// serves whenever PT9 stored one, since a model-less setup mints an id as its settings key.
/// String fields that are empty in the project are absent here.
/// </summary>
public sealed record Pt9InterlinearSetup(
    [property: JsonPropertyName("type")] string Type,
    [property: JsonPropertyName("languageId")] string? LanguageId,
    [property: JsonPropertyName("languageName")] string? LanguageName,
    [property: JsonPropertyName("fontName")] string? FontName,
    [property: JsonPropertyName("fontSize")] int FontSize,
    [property: JsonPropertyName("rightToLeft")] bool RightToLeft,
    [property: JsonPropertyName("modelScrTextName")] string? ModelScrTextName,
    [property: JsonPropertyName("modelScrTextId")] string? ModelScrTextId,
    [property: JsonPropertyName("modelIsResource")] bool ModelIsResource,
    [property: JsonPropertyName("relatedLanguages")] bool RelatedLanguages,
    [property: JsonPropertyName("exportOnApprove")] bool ExportOnApprove,
    [property: JsonPropertyName("exportScrTextName")] string? ExportScrTextName,
    [property: JsonPropertyName("exportScrTextId")] string? ExportScrTextId
);
