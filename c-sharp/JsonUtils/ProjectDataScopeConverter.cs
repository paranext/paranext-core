using Newtonsoft.Json.Linq;
using Paranext.DataProvider.Projects;

namespace Paranext.DataProvider.JsonUtils;

internal static class ProjectDataScopeConverter
{
    private const string PROJECT_ID = "projectId";
    private const string PROJECT_NAME = "projectName";
    private const string EXTENSION_NAME = "extensionName";
    private const string DATA_TYPE = "dataType";
    private const string DATA_QUALIFIER = "dataQualifier";

    public static bool TryGetProjectDataScope(
        string jsonString,
        out ProjectDataScope? dataScope,
        out string errorMessage
    )
    {
        try
        {
            JObject parsedArgs = JObject.Parse(jsonString);
            dataScope = new ProjectDataScope()
            {
                ProjectID = Get(parsedArgs, PROJECT_ID),
                ProjectName = Get(parsedArgs, PROJECT_NAME),
                ExtensionName = Get(parsedArgs, EXTENSION_NAME),
                DataType = Get(parsedArgs, DATA_TYPE),
                DataQualifier = Get(parsedArgs, DATA_QUALIFIER)
            };
            if (
                (dataScope.ProjectID == null)
                && (dataScope.ProjectName == null)
                && (dataScope.ExtensionName == null)
                && (dataScope.DataType == null)
                && (dataScope.DataQualifier == null)
            )
            {
                throw new Exception("Data scope cannot be empty");
            }
        }
        catch (Exception ex)
        {
            dataScope = null;
            errorMessage = $"Failed to parse \"{jsonString}\" into ProjectDataScope: {ex}";
            return false;
        }

        errorMessage = "";
        return true;
    }

    private static string? Get(JObject jObject, string propertyName)
    {
        if (
            !jObject.TryGetValue(propertyName, out var property)
            || (property.Value<string>() == null)
        )
            return null;

        return property.Value<string>()!;
    }
}
