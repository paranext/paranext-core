using System;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace MarbleSchemaExtractor.Pocos
{
    //Image data classes

    #region BibleImages class
    [Serializable]
    public class BibleImages
    {
        [XmlElement("BibleImage", Form = System.Xml.Schema.XmlSchemaForm.Unqualified)]
        public BibleImage[] Images;
    }
    #endregion

    #region BibleImage class
    [Serializable]
    public class BibleImage
    {
        [XmlAttribute("Id")]
        public string Id;

        [XmlAttribute("Type")]
        public string MediaType;

        [XmlAttribute]
        public string VideoLanguage;

        [XmlElement("Collection")]
        public string Collection;

        [XmlElement("Path")]
        public string Path;

        [XmlElement("FileName")]
        public string FileName;

        [XmlElement("OriginalFileName")]
        public string OriginalFileName;

        [XmlElement("Format")]
        public string Format;

        [XmlElement("Authors")]
        public string Authors;

        [XmlElement("DateTime")]
        public string DateTime;

        [XmlElement("Copyright")]
        public string Copyright;

        [XmlArrayItem("Definition")]
        public List<ImageDefinition> Definitions;

        [XmlArrayItem("ThematicLink")]
        public List<string> ThematicLinks;

        [XmlArrayItem("Reference")]
        public List<string> References;

        [XmlElement("Width")]
        public string Width;

        [XmlElement("Height")]
        public string Height;

        [XmlElement("ResolutionHorizontal")]
        public int ResolutionHorizontal;

        [XmlElement("ResolutionVertical")]
        public int ResolutionVertical;

        public bool IsOnLine => Format == "MP4" || MediaType == "M3U8";
    }
    #endregion

    #region ImageDefinition class
    [Serializable]
    public class ImageDefinition
    {
        [XmlAttribute("LanguageCode")]
        public string LanguageCode;

        [XmlElement("Title")]
        public string Title;

        [XmlElement("Subject")]
        public string Subject;

        [XmlElement("Description")]
        public string Description;

        [XmlElement("LocalizedFileName")]
        public string LocalizedFileName;

        [XmlElement("Tags")]
        public string Tags;
    }
    #endregion

    #region BibleImageKeywords class
    [Serializable]
    public class BibleImageKeywords
    {
        [XmlAttribute("LanguageCode")]
        public string LanguageCode;

        [XmlArrayItem("Keyword")]
        public List<string> Keywords;
    }
    #endregion
}
