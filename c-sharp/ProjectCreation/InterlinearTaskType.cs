using System.Text.Json.Serialization;

namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Interlinear task types.
/// Maps to BHV-113, BHV-206.
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum InterlinearTaskType
{
    Glossing,
    GlossingWithoutModel,
    BackTranslation,
    Adaptation,
}
