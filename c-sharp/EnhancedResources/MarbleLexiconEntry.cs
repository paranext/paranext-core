using System.Xml.Serialization;

namespace Paranext.DataProvider.EnhancedResources;

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleLexiconEntry.cs:1-436
// Method: MarbleLexiconEntry (full file -- data models)
// Maps to: EXT-015, CAP-024

#region LexEntryKey class

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleLexiconEntry.cs:11-28
// Method: LexEntryKey constructor
// Maps to: EXT-015
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
        string[] parts = entryId.Split(':');
        if (parts.Length != 3)
            throw new ArgumentException(
                "Entry key must be in form: Dictionary:Lemma:Index",
                nameof(entryId)
            );

        Dictionary = parts[0];
        Lemma = parts[1];
        Index = parts[2];
    }
}

#endregion

#region Lexicon_Main class

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleLexiconEntry.cs:34-38
// Method: Lexicon_Main class
// Maps to: EXT-015
/// <summary>
/// Root element for SDBH (Hebrew) lexicon XML. Extends List of Lexicon_Entry.
/// </summary>
[Serializable]
[XmlRoot("Lexicon")]
public class Lexicon_Main : List<Lexicon_Entry> { }

#endregion

#region Lexicon_Entry class

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleLexiconEntry.cs:42-87
// Method: Lexicon_Entry class
// Maps to: EXT-015
/// <summary>
/// A single SDBH lexicon entry.
/// </summary>
[Serializable]
public class Lexicon_Entry
{
    [XmlAttribute("Id")]
    public string? MainId;

    [XmlAttribute("Lemma")]
    public string? Lemma;

    [XmlAttribute("Version")]
    public string? Version;

    [XmlArrayItem("Strong")]
    public List<string>? StrongCodes;

    [XmlArrayItem("Author")]
    public List<string>? Authors;

    [XmlArrayItem("AlternateLemma")]
    public List<string>? AlternateLemmas;

    [XmlArrayItem("Note")]
    public List<Lexicon_Note>? Notes;

    [XmlArrayItem("Localization")]
    public List<Lexicon_Localization>? Localizations;

    [XmlArrayItem("Date")]
    public List<string>? Dates;

    [XmlArrayItem("BaseForm")]
    public List<Lexicon_BaseForm>? BaseForms;

    public Lexicon_BaseForm? GetBaseForm(int baseFormIndex)
    {
        if (BaseForms == null || baseFormIndex < 0 || baseFormIndex >= BaseForms.Count)
            return null;
        return BaseForms[baseFormIndex];
    }

    public Lexicon_LexicalMeaning? GetMeaningForCode(string entryCode)
    {
        return BaseForms
            ?.SelectMany(bf => bf.LEXMeanings ?? Enumerable.Empty<Lexicon_LexicalMeaning>())
            .FirstOrDefault(lm => lm.LEXEntryCode == entryCode);
    }
}

#endregion

#region Lexicon_Localization class

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleLexiconEntry.cs:91-98
// Method: Lexicon_Localization class
// Maps to: EXT-015
/// <summary>
/// Localization metadata for a lexicon entry.
/// </summary>
public class Lexicon_Localization
{
    [XmlAttribute("LanguageCode")]
    public string? LanguageCode;

    [XmlElement("DateTime")]
    public string? DateTime;
}

#endregion

#region Lexicon_MeaningOfName class

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleLexiconEntry.cs:101-109
// Method: Lexicon_MeaningOfName class
// Maps to: EXT-015
/// <summary>
/// Meaning-of-name data for a lexicon entry.
/// </summary>
public class Lexicon_MeaningOfName
{
    [XmlAttribute("LanguageCode")]
    public string? LanguageCode;

    [XmlElement("Meaning")]
    public string? Meaning;
}

#endregion

#region Lexicon_Note class

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleLexiconEntry.cs:113-127
// Method: Lexicon_Note class
// Maps to: EXT-015
/// <summary>
/// A note attached to a lexicon entry (SDBH format).
/// </summary>
public class Lexicon_Note
{
    [XmlAttribute("Caller")]
    public int Caller;

    [XmlAttribute("LanguageCode")]
    public string? LanguageCode;

    [XmlArrayItem("Reference")]
    public List<string>? References;

    [XmlElement("Content")]
    public string? Content;
}

#endregion

#region Lexicon_BaseForm class

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleLexiconEntry.cs:130-162
// Method: Lexicon_BaseForm class
// Maps to: EXT-015
/// <summary>
/// A base form within a lexicon entry.
/// </summary>
public class Lexicon_BaseForm
{
    [XmlAttribute("Id")]
    public string? BaseFormID;

    [XmlArrayItem("PartOfSpeech")]
    public List<string>? PartsOfSpeech;

    [XmlArrayItem("Etymology")]
    public List<string>? Etymologies;

    [XmlArrayItem("RelatedLemma")]
    public List<Lexicon_RelatedWord>? RelatedLemmas;

    [XmlArrayItem("RelatedName")]
    public List<Lexicon_RelatedWord>? RelatedNames;

    [XmlArrayItem("MeaningOfName")]
    public List<Lexicon_MeaningOfName>? MeaningsOfName;

    [XmlArrayItem("CrossReference")]
    public List<string>? CrossReference;

    [XmlArrayItem("LEXMeaning")]
    public List<Lexicon_LexicalMeaning>? LEXMeanings;

    public Lexicon_LexicalMeaning? GetLexMeaning(int lexMeaningIndex)
    {
        if (LEXMeanings == null || lexMeaningIndex < 0 || lexMeaningIndex >= LEXMeanings.Count)
            return null;
        return LEXMeanings[lexMeaningIndex];
    }
}

#endregion

#region Lexicon_RelatedWord class

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleLexiconEntry.cs:165-169
// Method: Lexicon_RelatedWord class
// Maps to: EXT-015
/// <summary>
/// A related word reference.
/// </summary>
public class Lexicon_RelatedWord
{
    public string? Word;
}

#endregion

#region Lexicon_LexicalMeaning class

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleLexiconEntry.cs:173-233
// Method: Lexicon_LexicalMeaning class
// Maps to: EXT-015
/// <summary>
/// A lexical meaning within a base form.
/// </summary>
public class Lexicon_LexicalMeaning
{
    [XmlAttribute("Id")]
    public string? LEXID;

    [XmlAttribute("IsBiblicalTerm")]
    public string? LEXIsBiblicalTerm;

    [XmlAttribute("EntryCode")]
    public string? LEXEntryCode;

    [XmlArrayItem("LEXDomain")]
    public List<string>? LEXDomains;

    [XmlArrayItem("LEXSubDomain")]
    public List<string>? LEXSubDomains;

    [XmlArrayItem("LEXForm")]
    public List<string>? LEXForms;

    [XmlArrayItem("LEXValency")]
    public List<string>? LEXValencies;

    [XmlArrayItem("LEXCollocation")]
    public List<string>? LEXCollocations;

    [XmlArrayItem("LEXSynonym")]
    public List<string>? LEXSynonyms;

    [XmlArrayItem("LEXAntonym")]
    public List<string>? LEXAntonyms;

    [XmlArrayItem("LEXCrossReference")]
    public List<string>? LEXCrossReferences;

    [XmlArrayItem("LEXSense")]
    public List<Sense>? LEXSenses;

    [XmlArrayItem("LEXLink")]
    public List<Link>? LEXLinks;

    [XmlArrayItem("LEXImage")]
    public List<string>? LEXImages;

    [XmlArrayItem("LEXCoordinates")]
    public List<string>? LEXCoordinates;

    [XmlArrayItem("LEXReference")]
    public List<string>? LEXReferences;

    [XmlArrayItem("LEXCoreDomain")]
    public List<string>? LEXCoreDomains;

    [XmlArray("ContextualMeanings")]
    [XmlArrayItem("ContextualMeaning")]
    public List<Lexicon_ContextualMeaning>? CONMeanings;
}

#endregion

#region Lexicon_ContextualMeaning class

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleLexiconEntry.cs:237-274
// Method: Lexicon_ContextualMeaning class
// Maps to: EXT-015
/// <summary>
/// A contextual meaning within a lexical meaning.
/// </summary>
public class Lexicon_ContextualMeaning
{
    [XmlAttribute("Id")]
    public string? CONID;

    [XmlArrayItem("CONDomain")]
    public List<string>? CONDomains;

    [XmlArrayItem("CONForm")]
    public List<string>? CONForms;

    [XmlArrayItem("CONValency")]
    public List<string>? CONValencies;

    [XmlArrayItem("CONCollocation")]
    public List<string>? CONCollocations;

    [XmlArrayItem("CONSynonym")]
    public List<string>? CONSynonyms;

    [XmlArrayItem("CONAntonym")]
    public List<string>? CONAntonyms;

    [XmlArrayItem("CONCrossReference")]
    public List<string>? CONCrossReferences;

    [XmlArrayItem("CONSense")]
    public List<Sense>? CONSenses;

    [XmlArrayItem("CONLink")]
    public List<Link>? CONLinks;

    [XmlArrayItem("CONImage")]
    public List<string>? CONImages;

    [XmlArrayItem("CONReference")]
    public List<string>? CONReferences;
}

#endregion

#region Link class

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleLexiconEntry.cs:278-283
// Method: Link class
// Maps to: EXT-015
/// <summary>
/// A cross-reference or resource link.
/// </summary>
public class Link
{
    public string? TargetString;
    public string? TargetResource;
}

#endregion

#region Sense class

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleLexiconEntry.cs:286-302
// Method: Sense class
// Maps to: EXT-015
/// <summary>
/// A language-specific sense with definitions and glosses.
/// </summary>
public class Sense
{
    [XmlAttribute("LanguageCode")]
    public string? LanguageCode;

    [XmlElement("DefinitionLong")]
    public string? DefinitionLong;

    [XmlElement("DefinitionShort")]
    public string? DefinitionShort;

    [XmlArrayItem("Gloss")]
    public List<string>? Glosses;

    [XmlElement("Comments")]
    public string? Comments;
}

#endregion

#region Lexicon_Entry_Index class

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleLexiconEntry.cs:305-317
// Method: Lexicon_Entry_Index class
// Maps to: EXT-015
/// <summary>
/// Index entry for lemma lookup.
/// </summary>
[Serializable]
public class Lexicon_Entry_Index
{
    [XmlAttribute("Lemma")]
    public string? Lemma;

    [XmlAttribute("LemmaSimplified")]
    public string? LemmaSimplified;

    [XmlArrayItem("EntryLink")]
    public List<string>? EntryLinks;
}

#endregion

#region Lexicon_Domain_Index class

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleLexiconEntry.cs:320-329
// Method: Lexicon_Domain_Index class
// Maps to: EXT-015
/// <summary>
/// Index entry for domain lookup.
/// </summary>
[Serializable]
public class Lexicon_Domain_Index
{
    [XmlAttribute("DomainCode")]
    public string? DomainCode;

    [XmlArrayItem("EntryLink")]
    public List<string>? EntryLink;
}

#endregion

// === SDBG (Greek / Louw-Nida) Types ===

#region SDBG_Main class

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleLexiconEntry.cs:335-339
// Method: SDBG_Main class
// Maps to: EXT-015
/// <summary>
/// Root element for SDBG (Greek) lexicon XML.
/// </summary>
[Serializable]
[XmlRoot("LN_Lexicon")]
public class SDBG_Main : List<SDBG_Entry> { }

#endregion

#region SDBG_Entry class

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleLexiconEntry.cs:342-360
// Method: SDBG_Entry class
// Maps to: EXT-015
/// <summary>
/// A single SDBG entry.
/// </summary>
[Serializable]
public class SDBG_Entry
{
    [XmlAttribute("Id")]
    public string? MainId;

    [XmlAttribute("Lemma")]
    public string? Lemma;

    [XmlArrayItem("AlternateLemma")]
    public List<string>? AlternateLemmas;

    [XmlArrayItem("Subentry")]
    public List<LN_Subentry>? SubEntries;

    [XmlArrayItem("Note")]
    public List<LN_Note>? Notes;
}

#endregion

#region LN_Subentry class

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleLexiconEntry.cs:363-398
// Method: LN_Subentry class
// Maps to: EXT-015
/// <summary>
/// A Louw-Nida sub-entry within a SDBG entry.
/// </summary>
public class LN_Subentry
{
    [XmlAttribute("SubId")]
    public string? SubId;

    [XmlElement("PartOfSpeech")]
    public string? PartOfSpeech;

    [XmlArrayItem("IncludedLemmaSet")]
    public List<LN_Included>? IncludedLemmaSets;

    [XmlElement("Entry")]
    public string? Entry;

    [XmlElement("Domain")]
    public string? Domain;

    [XmlElement("SubDomain")]
    public string? SubDomain;

    [XmlArrayItem("Sense")]
    public List<Sense>? Senses;

    [XmlArrayItem("Link")]
    public List<Link>? Links;

    [XmlArrayItem("Additional")]
    public List<LN_Additional>? Additionals;

    [XmlElement("ReferTo")]
    public string? ReferTo;

    [XmlArrayItem("Reference")]
    public List<string>? References;
}

#endregion

#region LN_Additional class

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleLexiconEntry.cs:401-409
// Method: LN_Additional class
// Maps to: EXT-015
/// <summary>
/// Additional text data within a sub-entry.
/// </summary>
public class LN_Additional
{
    [XmlAttribute("Type")]
    public string? Type;

    [XmlElement("Text")]
    public string? Text;
}

#endregion

#region LN_Included class

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleLexiconEntry.cs:412-420
// Method: LN_Included class
// Maps to: EXT-015
/// <summary>
/// Included lemma data within a sub-entry.
/// </summary>
public class LN_Included
{
    [XmlElement("IncludedLemma")]
    public string? IncludedLemma;

    [XmlElement("IncludedPartOfSpeech")]
    public string? IncludedPartOfSpeech;
}

#endregion

#region LN_Note class

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Marble/MarbleLexiconEntry.cs:423-434
// Method: LN_Note class
// Maps to: EXT-015
/// <summary>
/// A note within a SDBG entry.
/// Note: PT9 has a typo -- property is named 'Calle' instead of 'Caller'.
/// This is preserved for backward compatibility with existing XML data.
/// </summary>
public class LN_Note
{
    [XmlAttribute("Caller")]
    public int Calle; // Preserving PT9 typo: 'Calle' instead of 'Caller'

    [XmlAttribute("LanguageCode")]
    public string? LanguageCode;

    [XmlElement("Content")]
    public string? Content;
}

#endregion
