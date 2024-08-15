using System.Text.Json;
using System.Text.Json.Serialization;
using Paranext.DataProvider.Projects;

namespace Paranext.DataProvider.JsonUtils;

internal class ProjectDataScopeConverter : JsonConverter<ProjectDataScope>
{
    private const string PROJECT_ID = "projectId";
    private const string PROJECT_NAME = "projectName";
    private const string EXTENSION_NAME = "extensionName";
    private const string DATA_TYPE = "dataType";
    private const string DATA_QUALIFIER = "dataQualifier";

    public override ProjectDataScope Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options
    )
    {
        string? projectId = null;
        string? projectName = null;
        string? extensionName = null;
        string? dataType = null;
        string? dataQualifier = null;
        string? lastPropertyName = null;
        while (reader.Read())
        {
            switch (reader.TokenType)
            {
                case JsonTokenType.StartObject:
                case JsonTokenType.EndObject:
                case JsonTokenType.StartArray:
                case JsonTokenType.EndArray:
                    break;
                case JsonTokenType.PropertyName:
                    lastPropertyName = reader.GetString();
                    break;
                case JsonTokenType.Number:
                case JsonTokenType.True:
                case JsonTokenType.False:
                    lastPropertyName = null;
                    break;
                case JsonTokenType.String:
                    switch (lastPropertyName)
                    {
                        case PROJECT_ID:
                            projectId = reader.GetString();
                            break;
                        case PROJECT_NAME:
                            projectName = reader.GetString();
                            break;
                        case EXTENSION_NAME:
                            extensionName = reader.GetString();
                            break;
                        case DATA_TYPE:
                            dataType = reader.GetString();
                            break;
                        case DATA_QUALIFIER:
                            dataQualifier = reader.GetString();
                            break;
                    }
                    lastPropertyName = null;
                    break;
            }
        }

        return new ProjectDataScope
        {
            ProjectID = projectId,
            ProjectName = projectName,
            ExtensionName = extensionName,
            DataType = dataType,
            DataQualifier = dataQualifier
        };
    }

    public override void Write(
        Utf8JsonWriter writer,
        ProjectDataScope value,
        JsonSerializerOptions options
    )
    {
        writer.WriteStartObject();
        if (!string.IsNullOrEmpty(value.ProjectID))
            writer.WriteString(PROJECT_ID, value.ProjectID);
        if (!string.IsNullOrEmpty(value.ProjectName))
            writer.WriteString(PROJECT_NAME, value.ProjectName);
        if (!string.IsNullOrEmpty(value.ExtensionName))
            writer.WriteString(EXTENSION_NAME, value.ExtensionName);
        if (!string.IsNullOrEmpty(value.DataType))
            writer.WriteString(DATA_TYPE, value.DataType);
        if (!string.IsNullOrEmpty(value.DataQualifier))
            writer.WriteString(DATA_QUALIFIER, value.DataQualifier);
        writer.WriteEndObject();
    }
}
