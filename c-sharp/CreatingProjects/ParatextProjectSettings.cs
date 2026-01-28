using System.Xml.Serialization;

namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Minimal Settings.xml representation for creating new Paratext projects on disk.
/// Format must match PT9's Settings.xml exactly for ParatextData to load the project.
/// Key differences from naive serialization:
/// - Versification is a numeric enum value (e.g., 4 for English), not the name
/// - Editable uses "T"/"F", not "true"/"false"
/// - Encoding is always 65001 (UTF-8)
/// </summary>
[XmlRoot("ScriptureText")]
public class ParatextProjectSettings
{
    public string? StyleSheet { get; set; }
    public int Versification { get; set; }
    public string? Language { get; set; }
    public string? MinParatextVersion { get; set; }
    public string? FullName { get; set; }
    public int Encoding { get; set; }

    /// <summary>
    /// PT9 uses "T"/"F" for boolean fields, not "true"/"false".
    /// </summary>
    [XmlElement("Editable")]
    public string? EditableText { get; set; }

    [XmlIgnore]
    public bool Editable
    {
        get => EditableText == "T";
        set => EditableText = value ? "T" : "F";
    }

    public string? Copyright { get; set; }
    public string? NormalizationForm { get; set; }
    public string? Name { get; set; }
    public string? Guid { get; set; }
    public string? LanguageIsoCode { get; set; }
    public string? TranslationInfo { get; set; }
    public int? UsfmVersion { get; set; }
}
