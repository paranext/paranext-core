using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Xml.Linq;
using System.Xml.Serialization;
using PtxUtils;

namespace MarbleSchemaExtractor.Pocos
{
    /// <remarks/>
    [Serializable]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [XmlType(AnonymousType = true)]
    [XmlRoot(Namespace = "", IsNullable = false)]
    public class Thematic_Lexicon
    {
        private Thematic_LexiconThemLex_Entry[] themLex_EntryField;

        /// <remarks/>
        [XmlElement("ThemLex_Entry")]
        public Thematic_LexiconThemLex_Entry[] ThemLex_Entry
        {
            get { return themLex_EntryField; }
            set { themLex_EntryField = value; }
        }

        public static Thematic_Lexicon ParseXml(string encyclopediaXml)
        {
            var doc = XDocument.Parse(encyclopediaXml);

            var entries = new List<Thematic_LexiconThemLex_Entry>();
            foreach (var entry in doc.Descendants("ThemLex_Entry"))
                entries.Add(ParseEntry(entry));

            var result = new Thematic_Lexicon();
            result.ThemLex_Entry = entries.ToArray();

            return result;
        }

        [XmlIgnore]
        public int DataVersion { get; private set; } = 1;

        #region private helper methods
        private static Thematic_LexiconThemLex_Entry ParseEntry(XElement entry)
        {
            var result = new Thematic_LexiconThemLex_Entry();
            var bibleImages = new List<BibleImage>();

            result.Key = entry.Attribute("Key")?.Value;
            result.Title = entry.Element("Title")?.Value;
            result.Index = ParseIndex(entry);
            result.Sections = ParseSections(entry, bibleImages);
            result.BibleImages = bibleImages.ToArray();

            return result;
        }

        private static Thematic_LexiconThemLex_EntryIndexItem[] ParseIndex(XElement entry)
        {
            var indexItems = new List<Thematic_LexiconThemLex_EntryIndexItem>();
            foreach (var indexItem in entry.Descendants("IndexItem"))
            {
                var item = new Thematic_LexiconThemLex_EntryIndexItem();
                item.Number = indexItem.Attribute("Number")?.Value;
                if (item.Number == null)
                    continue;
                item.Description = indexItem.Attribute("Description")?.Value;
                item.Target = indexItem.Attribute("Target")?.Value;
                indexItems.Add(item);
            }

            return indexItems.ToArray();
        }

        private static Thematic_LexiconThemLex_EntrySection[] ParseSections(
            XElement entry,
            List<BibleImage> bibleImages
        )
        {
            var sections = new List<Thematic_LexiconThemLex_EntrySection>();

            foreach (var sectionElem in entry.Descendants("Section"))
            {
                var section = new Thematic_LexiconThemLex_EntrySection();
                section.Type = sectionElem.Attribute("Type")?.Value;
                section.Content = sectionElem.Attribute("Content")?.Value ?? "";
                var headingElem = sectionElem.Element("Heading");
                section.Heading =
                    headingElem != null
                        ? string.Join("", headingElem.Nodes().Select(n => n.ToString()))
                        : "";

                var paragraphs = new List<string>();
                foreach (var paragraphElem in sectionElem.Descendants("Paragraph"))
                {
                    // can't just take the value since there are sub-elements for formatting
                    paragraphs.Add(
                        string.Join("", paragraphElem.Nodes().Select(n => n.ToString()))
                    );
                }

                section.Paragraphs = paragraphs.ToArray();

                section.LanguageSets = ParseLanguageSets(sectionElem);

                ParseBibleImages(sectionElem, bibleImages);

                sections.Add(section);
            }

            return sections.ToArray();
        }

        private static Thematic_LexiconThemLex_EntrySectionLanguageSet[] ParseLanguageSets(
            XElement sectionElem
        )
        {
            var languageSets = new List<Thematic_LexiconThemLex_EntrySectionLanguageSet>();
            foreach (var languageSetElem in sectionElem.Descendants("LanguageSet"))
            {
                try
                {
                    var languageSet =
                        Memento.FromXmlString<Thematic_LexiconThemLex_EntrySectionLanguageSet>(
                            languageSetElem.ToString()
                        );
                    // currently not using language set data, so just skip sets that don't have a language - probably
                    // failed to parse because of unexpected data in the Transliteration field.
                    if (languageSet?.Language != null)
                        languageSets.Add(languageSet);
                }
                catch (Exception e)
                {
                    Trace.TraceWarning($"Unable to parse LanguageSet element: {e}");
                }
            }

            return languageSets.ToArray();
        }

        private static void ParseBibleImages(XElement sectionElem, List<BibleImage> bibleImages)
        {
            foreach (var imageElem in sectionElem.Descendants("BibleImage"))
            {
                bibleImages.Add(Memento.FromXmlString<BibleImage>(imageElem.ToString()));
            }
        }
        #endregion
    }

    /// <remarks/>
    [Serializable]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [XmlType(AnonymousType = true)]
    public class Thematic_LexiconThemLex_Entry
    {
        private string titleField;

        private object introField;

        private Thematic_LexiconThemLex_EntryIndexItem[] indexField;

        private Thematic_LexiconThemLex_EntrySection[] sectionsField;

        private string keyField;

        /// <remarks/>
        public string Title
        {
            get { return titleField; }
            set { titleField = value; }
        }

        /// <remarks/>
        public object Intro
        {
            get { return introField; }
            set { introField = value; }
        }

        /// <remarks/>
        [XmlArrayItem("IndexItem", IsNullable = false)]
        public Thematic_LexiconThemLex_EntryIndexItem[] Index
        {
            get { return indexField; }
            set { indexField = value; }
        }

        /// <remarks/>
        [XmlArrayItem("Section", IsNullable = false)]
        public Thematic_LexiconThemLex_EntrySection[] Sections
        {
            get { return sectionsField; }
            set { sectionsField = value; }
        }

        /// <remarks/>
        [XmlAttribute]
        public string Key
        {
            get { return keyField; }
            set { keyField = value; }
        }

        /// <summary>
        /// This is available in V2 of the data which is not fully processed with serialization
        /// The images are on the last section of the data, but it is more convenient to have
        /// them on the entry.
        /// </summary>
        [XmlIgnore]
        public BibleImage[] BibleImages;
    }

    /// <remarks/>
    [Serializable]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [XmlType(AnonymousType = true)]
    public class Thematic_LexiconThemLex_EntryIndexItem
    {
        private string numberField;

        private string descriptionField;

        private string targetField;

        /// <remarks/>
        [XmlAttribute]
        public string Number
        {
            get { return numberField; }
            set { numberField = value; }
        }

        /// <remarks/>
        [XmlAttribute]
        public string Description
        {
            get { return descriptionField; }
            set { descriptionField = value; }
        }

        /// <remarks/>
        [XmlAttribute]
        public string Target
        {
            get { return targetField; }
            set { targetField = value; }
        }
    }

    /// <remarks/>
    [Serializable]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [XmlType(AnonymousType = true)]
    public class Thematic_LexiconThemLex_EntrySection
    {
        private string headingField;

        private string subHeadingField;

        private Thematic_LexiconThemLex_EntrySectionLanguageSet[] languageSetsField;

        private string[] paragraphsField;

        private string typeField;

        private string contentField;

        /// <remarks/>
        public string Heading
        {
            get { return headingField; }
            set { headingField = value; }
        }

        /// <remarks/>
        public string SubHeading
        {
            get { return subHeadingField; }
            set { subHeadingField = value; }
        }

        /// <remarks/>
        [XmlArrayItem("LanguageSet", IsNullable = false)]
        public Thematic_LexiconThemLex_EntrySectionLanguageSet[] LanguageSets
        {
            get { return languageSetsField; }
            set { languageSetsField = value; }
        }

        /// <remarks/>
        [XmlArrayItem("Paragraph", IsNullable = false)]
        public string[] Paragraphs
        {
            get { return paragraphsField; }
            set { paragraphsField = value; }
        }

        /// <remarks/>
        [XmlAttribute]
        public string Type
        {
            get { return typeField; }
            set { typeField = value; }
        }

        /// <remarks/>
        [XmlAttribute]
        public string Content
        {
            get { return contentField; }
            set { contentField = value; }
        }
    }

    /// <remarks/>
    [Serializable]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [XmlType(AnonymousType = true)]
    [XmlRoot("LanguageSet")]
    public class Thematic_LexiconThemLex_EntrySectionLanguageSet
    {
        private string lemmaField;

        private string transliterationField;

        private ulong[] referencesField;

        private string languageField;

        /// <remarks/>
        public string Lemma
        {
            get { return lemmaField; }
            set { lemmaField = value; }
        }

        /// <remarks/>
        public string Transliteration
        {
            get { return transliterationField; }
            set { transliterationField = value; }
        }

        /// <remarks/>
        [XmlArrayItem("Reference", IsNullable = false)]
        public ulong[] References
        {
            get { return referencesField; }
            set { referencesField = value; }
        }

        /// <remarks/>
        [XmlAttribute]
        public string Language
        {
            get { return languageField; }
            set { languageField = value; }
        }
    }
}
