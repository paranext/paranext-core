using System.Text.Json.Serialization;

namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Project type enumeration. Values are serialization contracts (INV-001).
/// Maps to BHV-100.
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum ProjectType
{
    Standard,
    BackTranslation,
    Daughter,
    Auxiliary,
    StudyBibleAdditions,
    TransliterationManual,
    TransliterationWithEncoder,
    ConsultantNotes,

    // Internal types (not user-selectable)
    Resource,
    GlobalConsultantNotes,
    GlobalAnthropologyNotes,
    MarbleResource,
    XmlResource,
    XmlDictionary,
    AuxiliaryResource,
    NotSelected,
}
