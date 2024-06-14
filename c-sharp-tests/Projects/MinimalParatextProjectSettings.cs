using System.Xml.Serialization;

namespace TestParanextDataProvider.Projects
{
    [XmlRoot("ScriptureText")]
    public class MinimalParatextProjectSettings
    {
        public string? Name { get; set; }
        public string? Guid { get; set; }
        public string? LanguageIsoCode { get; set; }
        public string? MinParatextVersion { get; set; }
    }
}
