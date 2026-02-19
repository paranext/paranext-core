using System.Xml.Serialization;

namespace Paranext.DataProvider.EnhancedResources;

// === STUB FILE FOR TDD RED PHASE ===
// These are minimal stubs to allow tests to compile.
// The TDD Implementer will replace these with the full implementation
// ported from PT9/Paratext/Marble/MarbleLexiconEntry.cs:1-436 (EXT-015).
// All tests should FAIL against these stubs.

/// <summary>
/// Parses a lexicon entry ID in the format "Dictionary:Lemma:Index".
/// </summary>
public class LexEntryKey
{
    public string Dictionary { get; }
    public string Lemma { get; }
    public string Index { get; }

    public LexEntryKey(string entryId)
    {
        // Stub: no validation, no parsing
        Dictionary = string.Empty;
        Lemma = string.Empty;
        Index = string.Empty;
    }
}

/// <summary>
/// Root element for SDBH (Hebrew) lexicon XML. Extends List of Lexicon_Entry.
/// </summary>
[Serializable]
[XmlRoot("StubRoot")] // Wrong root name -- tests will fail
public class Lexicon_Main : List<Lexicon_Entry> { }

/// <summary>
/// A single SDBH lexicon entry.
/// </summary>
[Serializable]
public class Lexicon_Entry
{
    public string? MainId;
    public string? Lemma;
    public string? Version;
    public List<string>? StrongCodes;
    public List<string>? Authors;
    public List<string>? AlternateLemmas;
    public List<Lexicon_Note>? Notes;
    public List<Lexicon_Localization>? Localizations;
    public List<string>? Dates;
    public List<Lexicon_BaseForm>? BaseForms;

    public Lexicon_BaseForm? GetBaseForm(int baseFormIndex)
    {
        // Stub: always returns null
        return null;
    }

    public Lexicon_LexicalMeaning? GetMeaningForCode(string entryCode)
    {
        // Stub: always returns null
        return null;
    }
}

/// <summary>
/// Localization metadata for a lexicon entry.
/// </summary>
public class Lexicon_Localization
{
    public string? LanguageCode;
    public string? DateTime;
}

/// <summary>
/// Meaning-of-name data for a lexicon entry.
/// </summary>
public class Lexicon_MeaningOfName
{
    public string? LanguageCode;
    public string? Meaning;
}

/// <summary>
/// A note attached to a lexicon entry.
/// </summary>
public class Lexicon_Note
{
    public int Caller;
    public string? LanguageCode;
    public List<string>? References;
    public string? Content;
}

/// <summary>
/// A base form within a lexicon entry.
/// </summary>
public class Lexicon_BaseForm
{
    public string? BaseFormID;
    public List<string>? PartsOfSpeech;
    public List<string>? Etymologies;
    public List<Lexicon_RelatedWord>? RelatedLemmas;
    public List<Lexicon_RelatedWord>? RelatedNames;
    public List<Lexicon_MeaningOfName>? MeaningsOfName;
    public List<string>? CrossReference;
    public List<Lexicon_LexicalMeaning>? LEXMeanings;

    public Lexicon_LexicalMeaning? GetLexMeaning(int lexMeaningIndex)
    {
        // Stub: always returns null
        return null;
    }
}

/// <summary>
/// A related word reference.
/// </summary>
public class Lexicon_RelatedWord
{
    public string? Word;
}

/// <summary>
/// A lexical meaning within a base form.
/// </summary>
public class Lexicon_LexicalMeaning
{
    public string? LEXID;
    public string? LEXIsBiblicalTerm;
    public string? LEXEntryCode;
    public List<string>? LEXDomains;
    public List<string>? LEXSubDomains;
    public List<string>? LEXForms;
    public List<string>? LEXValencies;
    public List<string>? LEXCollocations;
    public List<string>? LEXSynonyms;
    public List<string>? LEXAntonyms;
    public List<string>? LEXCrossReferences;
    public List<Sense>? LEXSenses;
    public List<Link>? LEXLinks;
    public List<string>? LEXImages;
    public List<string>? LEXCoordinates;
    public List<string>? LEXReferences;
    public List<string>? LEXCoreDomains;
    public List<Lexicon_ContextualMeaning>? CONMeanings;
}

/// <summary>
/// A contextual meaning within a lexical meaning.
/// </summary>
public class Lexicon_ContextualMeaning
{
    public string? CONID;
    public List<string>? CONDomains;
    public List<string>? CONForms;
    public List<string>? CONValencies;
    public List<string>? CONCollocations;
    public List<string>? CONSynonyms;
    public List<string>? CONAntonyms;
    public List<string>? CONCrossReferences;
    public List<Sense>? CONSenses;
    public List<Link>? CONLinks;
    public List<string>? CONImages;
    public List<string>? CONReferences;
}

/// <summary>
/// A cross-reference or resource link.
/// </summary>
public class Link
{
    public string? TargetString;
    public string? TargetResource;
}

/// <summary>
/// A language-specific sense with definitions and glosses.
/// </summary>
public class Sense
{
    public string? LanguageCode;
    public string? DefinitionLong;
    public string? DefinitionShort;
    public List<string>? Glosses;
    public string? Comments;
}

/// <summary>
/// Index entry for lemma lookup.
/// </summary>
[Serializable]
public class Lexicon_Entry_Index
{
    public string? Lemma;
    public string? LemmaSimplified;
    public List<string>? EntryLinks;
}

/// <summary>
/// Index entry for domain lookup.
/// </summary>
[Serializable]
public class Lexicon_Domain_Index
{
    public string? DomainCode;
    public List<string>? EntryLink;
}

// === SDBG (Greek / Louw-Nida) Types ===

/// <summary>
/// Root element for SDBG (Greek) lexicon XML.
/// </summary>
[Serializable]
[XmlRoot("StubLNRoot")] // Wrong root name -- tests will fail
public class SDBG_Main : List<SDBG_Entry> { }

/// <summary>
/// A single SDBG entry.
/// </summary>
[Serializable]
public class SDBG_Entry
{
    public string? MainId;
    public string? Lemma;
    public List<string>? AlternateLemmas;
    public List<LN_Subentry>? SubEntries;
    public List<LN_Note>? Notes;
}

/// <summary>
/// A Louw-Nida sub-entry within a SDBG entry.
/// </summary>
public class LN_Subentry
{
    public string? SubId;
    public string? PartOfSpeech;
    public List<LN_Included>? IncludedLemmaSets;
    public string? Entry;
    public string? Domain;
    public string? SubDomain;
    public List<Sense>? Senses;
    public List<Link>? Links;
    public List<LN_Additional>? Additionals;
    public string? ReferTo;
    public List<string>? References;
}

/// <summary>
/// Additional text data within a sub-entry.
/// </summary>
public class LN_Additional
{
    public string? Type;
    public string? Text;
}

/// <summary>
/// Included lemma data within a sub-entry.
/// </summary>
public class LN_Included
{
    public string? IncludedLemma;
    public string? IncludedPartOfSpeech;
}

/// <summary>
/// A note within a SDBG entry.
/// </summary>
public class LN_Note
{
    public int Calle; // Preserving PT9 typo: 'Calle' instead of 'Caller'
    public string? LanguageCode;
    public string? Content;
}
