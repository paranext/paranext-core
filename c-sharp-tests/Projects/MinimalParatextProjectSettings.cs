using System.Xml.Serialization;

namespace TestParanextDataProvider.Projects
{
    [XmlRoot("ScriptureText")]
    public class MinimalParatextProjectSettings
    {
        public string? Name { get; set; }
        public string? Guid { get; set; }
    }
}
