// === NEW IN PT10 ===
// Reason: Combined output of MarbleLexiconLoader. PT9 derives dictionary data,
// gloss data, and source-language lemma data from the same SDBH/SDBG/DCLEX
// Lexicon_Main XML files (PT9 MarbleDataAccess.cs:1409 GetLemmaDictionary +
// FindReplaceForm.cs source-language search). Extracting them in one pass keeps
// downstream consumers from re-reading the packages.
namespace Paranext.DataProvider.EnhancedResources;

internal sealed record LexiconLoadResult(
    DictionaryData Dictionary,
    GlossData Gloss,
    SourceLanguageData SourceLanguage
);
