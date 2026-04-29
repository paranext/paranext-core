using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Serialization;

namespace MarbleSchemaExtractor.Pocos
{
    #region LexEntryKey class
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

    // This code is a direct conversion of the VB code in the Marble Demo

    #region Lexicon_Main class
    [Serializable]
    [XmlRoot("Lexicon")]
    public class Lexicon_Main : List<Lexicon_Entry> { }
    #endregion

    #region Lexicon_Entry class
    [Serializable]
    public class Lexicon_Entry
    {
        [XmlAttribute("Id")]
        public string MainId;

        [XmlAttribute("Lemma")]
        public string Lemma;

        [XmlAttribute("Version")]
        public string Version;

        [XmlArrayItem("Strong")]
        public List<string> StrongCodes;

        [XmlArrayItem("Author")]
        public List<string> Authors;

        [XmlArrayItem("AlternateLemma")]
        public List<string> AlternateLemmas;

        [XmlArrayItem("Note")]
        public List<Lexicon_Note> Notes;

        [XmlArrayItem("Localization")]
        public List<Lexicon_Localization> Localizations;

        [XmlArrayItem("Date")]
        public List<string> Dates;

        [XmlArrayItem("BaseForm")]
        public List<Lexicon_BaseForm> BaseForms;

        public Lexicon_BaseForm GetBaseForm(int baseFormIndex)
        {
            if (BaseForms == null || baseFormIndex < 0 || baseFormIndex >= BaseForms.Count)
                return null;
            return BaseForms[baseFormIndex];
        }

        public Lexicon_LexicalMeaning GetMeaningForCode(string entryCode)
        {
            return BaseForms
                .SelectMany(bf => bf.LEXMeanings)
                .FirstOrDefault(lm => lm.LEXEntryCode == entryCode);
        }
    }
    #endregion

    #region Lexicon_Localization class
    public class Lexicon_Localization
    {
        [XmlAttribute("LanguageCode")]
        public string LanguageCode;

        [XmlElement("DateTime")]
        public string DateTime;
    }
    #endregion

    #region Lexicon_MeaningOfName class
    public class Lexicon_MeaningOfName
    {
        [XmlAttribute("LanguageCode")]
        public string LanguageCode;

        [XmlElement("Meaning")]
        public string Meaning;
    }
    #endregion

    #region Lexicon_Note class
    public class Lexicon_Note
    {
        [XmlAttribute("Caller")]
        public int Caller;

        [XmlAttribute("LanguageCode")]
        public string LanguageCode;

        [XmlArrayItem("Reference")]
        public List<string> References;

        [XmlElement("Content")]
        public string Content;
    }
    #endregion

    #region Lexicon_BaseForm class
    public class Lexicon_BaseForm
    {
        [XmlAttribute("Id")]
        public string BaseFormID;

        [XmlArrayItem("PartOfSpeech")]
        public List<string> PartsOfSpeech;

        [XmlArrayItem("Etymology")]
        public List<string> Etymologies;

        [XmlArrayItem("RelatedLemma")]
        public List<Lexicon_RelatedWord> RelatedLemmas;

        [XmlArrayItem("RelatedName")]
        public List<Lexicon_RelatedWord> RelatedNames;

        [XmlArrayItem("MeaningOfName")]
        public List<Lexicon_MeaningOfName> MeaningsOfName;

        [XmlArrayItem("CrossReference")]
        public List<string> CrossReference;

        [XmlArrayItem("LEXMeaning")]
        public List<Lexicon_LexicalMeaning> LEXMeanings;

        public Lexicon_LexicalMeaning GetLexMeaning(int lexMeaningIndex)
        {
            if (LEXMeanings == null || lexMeaningIndex < 0 || lexMeaningIndex >= LEXMeanings.Count)
                return null;
            return LEXMeanings[lexMeaningIndex];
        }
    }
    #endregion

    #region Lexicon_RelatedLemma class
    public class Lexicon_RelatedWord
    {
        public string Word;
    }
    #endregion

    #region Lexicon_LexicalMeaning class
    public class Lexicon_LexicalMeaning
    {
        [XmlAttribute("Id")]
        public string LEXID;

        [XmlAttribute("IsBiblicalTerm")]
        public string LEXIsBiblicalTerm;

        [XmlAttribute("EntryCode")]
        public string LEXEntryCode;

        [XmlArrayItem("LEXDomain")]
        public List<string> LEXDomains;

        [XmlArrayItem("LEXSubDomain")]
        public List<string> LEXSubDomains;

        [XmlArrayItem("LEXForm")]
        public List<string> LEXForms;

        [XmlArrayItem("LEXValency")]
        public List<string> LEXValencies;

        [XmlArrayItem("LEXCollocation")]
        public List<string> LEXCollocations;

        [XmlArrayItem("LEXSynonym")]
        public List<string> LEXSynonyms;

        [XmlArrayItem("LEXAntonym")]
        public List<string> LEXAntonyms;

        [XmlArrayItem("LEXCrossReference")]
        public List<string> LEXCrossReferences;

        [XmlArrayItem("LEXSense")]
        public List<Sense> LEXSenses;

        [XmlArrayItem("LEXLink")]
        public List<Link> LEXLinks;

        [XmlArrayItem("LEXImage")]
        public List<string> LEXImages;

        [XmlArrayItem("LEXCoordinates")]
        public List<string> LEXCoordinates;

        [XmlArrayItem("LEXReference")]
        public List<string> LEXReferences;

        [XmlArrayItem("LEXCoreDomain")]
        public List<string> LEXCoreDomains;

        [XmlArrayItem("ContextualMeaning")]
        public List<Lexicon_ContextualMeaning> CONMeanings;
    }
    #endregion

    #region Lexicon_ContextualMeaning class
    public class Lexicon_ContextualMeaning
    {
        [XmlAttribute("Id")]
        public string CONID;

        [XmlArrayItem("CONDomain")]
        public List<string> CONDomains;

        [XmlArrayItem("CONForm")]
        public List<string> CONForms;

        [XmlArrayItem("CONValency")]
        public List<string> CONValencies;

        [XmlArrayItem("CONCollocation")]
        public List<string> CONCollocations;

        [XmlArrayItem("CONSynonym")]
        public List<string> CONSynonyms;

        [XmlArrayItem("CONAntonym")]
        public List<string> CONAntonyms;

        [XmlArrayItem("CONCrossReference")]
        public List<string> CONCrossReferences;

        [XmlArrayItem("CONSense")]
        public List<Sense> CONSenses;

        [XmlArrayItem("CONLink")]
        public List<Link> CONLinks;

        [XmlArrayItem("CONImage")]
        public List<string> CONImages;

        [XmlArrayItem("CONReference")]
        public List<string> CONReferences;
    }
    #endregion

    #region Link class
    public class Link
    {
        public string TargetString;
        public string TargetResource;
    }
    #endregion

    #region Sense class
    public class Sense
    {
        [XmlAttribute("LanguageCode")]
        public string LanguageCode;

        [XmlElement("DefinitionLong")]
        public string DefinitionLong;

        [XmlElement("DefinitionShort")]
        public string DefinitionShort;

        [XmlArrayItem("Gloss")]
        public List<string> Glosses;

        [XmlElement("Comments")]
        public string Comments;
    }
    #endregion

    #region Lexicon_Entry_Index class
    [Serializable]
    public class Lexicon_Entry_Index
    {
        [XmlAttribute("Lemma")]
        public string Lemma;

        [XmlAttribute("LemmaSimplified")]
        public string LemmaSimplified;

        [XmlArrayItem("EntryLink")]
        public List<string> EntryLinks;
    }
    #endregion

    #region Lexicon_Domain_Index class
    [Serializable]
    public class Lexicon_Domain_Index
    {
        [XmlAttribute("DomainCode")]
        public string DomainCode;

        [XmlArrayItem("EntryLink")]
        public List<string> EntryLink;
    }
    #endregion

    // This code is a direct conversion of the VB code in the Marble Demo for the LN dictionary modified a little to read the SDBG.XML file

    #region SDBG_Main class
    [Serializable]
    [XmlRoot("LN_Lexicon")]
    public class SDBG_Main : List<SDBG_Entry> { }
    #endregion

    #region SDBG_Entry class
    [Serializable]
    public class SDBG_Entry
    {
        [XmlAttribute("Id")]
        public string MainId;

        [XmlAttribute("Lemma")]
        public string Lemma;

        [XmlArrayItem("AlternateLemma")]
        public List<string> AlternateLemmas;

        [XmlArrayItem("Subentry")]
        public List<LN_Subentry> SubEntries;

        [XmlArrayItem("Note")]
        public List<LN_Note> Notes;
    }
    #endregion

    #region LN_Subentry class
    public class LN_Subentry
    {
        [XmlAttribute("SubId")]
        public string SubId;

        [XmlElement("PartOfSpeech")]
        public string PartOfSpeech;

        [XmlArrayItem("IncludedLemmaSet")]
        public List<LN_Included> IncludedLemmaSets;

        [XmlElement("Entry")]
        public string Entry;

        [XmlElement("Domain")]
        public string Domain;

        [XmlElement("SubDomain")]
        public string SubDomain;

        [XmlArrayItem("Sense")]
        public List<Sense> Senses;

        [XmlArrayItem("Link")]
        public List<Link> Links;

        [XmlArrayItem("Additional")]
        public List<LN_Additional> Additionals;

        [XmlElement("ReferTo")]
        public string ReferTo;

        [XmlArrayItem("Reference")]
        public List<string> References;
    }
    #endregion

    #region LN_Additional class
    public class LN_Additional
    {
        [XmlAttribute("Type")]
        public string Type;

        [XmlElement("Text")]
        public string Text;
    }
    #endregion

    #region LN_Included class
    public class LN_Included
    {
        [XmlElement("IncludedLemma")]
        public string IncludedLemma;

        [XmlElement("IncludedPartOfSpeech")]
        public string IncludedPartOfSpeech;
    }
    #endregion

    #region LN_Note class
    public class LN_Note
    {
        [XmlAttribute("Caller")]
        public int Calle;

        [XmlAttribute("LanguageCode")]
        public string LanguageCode;

        [XmlElement("Content")]
        public string Content;
    }
    #endregion
}
