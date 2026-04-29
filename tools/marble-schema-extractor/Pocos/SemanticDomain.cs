using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Xml.Serialization;

namespace MarbleSchemaExtractor.Pocos
{
    #region SemanticLexicalDomains class
    [Serializable]
    [XmlRoot("Domains")]
    public class SemanticLexicalDomains
    {
        [XmlElement("SemanticDomain", typeof(SemanticLexicalDomain))]
        public List<SemanticLexicalDomain> SemanticDomains;
    }
    #endregion

    #region SemanticLexicalDomain class
    [Serializable]
    public class SemanticLexicalDomain
    {
        [XmlArrayItem("SemanticDomainLocalization")]
        public List<SemanticDomainLocalization> SemanticDomainLocalizations;

        public string Level;
        public string Code;
    }
    #endregion

    #region SemanticDomainLocalization class
    [Serializable]
    public class SemanticDomainLocalization
    {
        [XmlAttribute]
        public string LanguageCode;

        public string Label;
        public string Description;
        public string Opposite;
        public string Comment;
    }
    #endregion

    #region EntryCodeRange class
    public class EntryCodeRange
    {
        private int majorCode;
        private int startMinorCode;
        private int endMinorCode;

        public EntryCodeRange(string startCode)
        {
            Version code = Version.Parse(startCode);
            majorCode = code.Major;
            startMinorCode = endMinorCode = code.Minor;
        }

        public void UpdateRange(string entryCode)
        {
            Version code = Version.Parse(entryCode);
            Debug.Assert(majorCode == code.Major, "domain has inconsistent major codes");

            if (code.Minor < startMinorCode)
                startMinorCode = code.Minor;
            else if (code.Minor > endMinorCode)
                endMinorCode = code.Minor;
        }

        public override string ToString()
        {
            return startMinorCode == endMinorCode
                ? $"{majorCode}.{startMinorCode}"
                : $"{majorCode}.{startMinorCode}-{endMinorCode}";
        }
    }
    #endregion
}
